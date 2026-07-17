import { Request, Response } from 'express';
import { auth, initError } from './lib/firebaseAdmin.js';
import { prisma } from '../src/lib/prisma.js';
import { analyses } from '../src/data/analyses/index.js';

export default async function savedAnalysesHandler(req: Request, res: Response) {
  if (initError) {
    console.error('Firebase Admin initieringsfel:', initError);
    return res.status(500).json({ 
      error: 'Firebase Admin initieringsfel'
    });
  }

  try {
    // 1. Extract Bearer Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Behörighet saknas. Logga in igen.' });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (err: any) {
      console.error('Firebase token verification failed:', err.message);
      return res.status(401).json({ error: 'Ogiltig eller utgången inloggning. Logga in igen.' });
    }

    const { uid: firebaseUid, email, name } = decodedToken;
    if (!email) {
      return res.status(400).json({ error: 'E-post saknas i inloggningsuppgifterna.' });
    }

    // 2. Identify or Create User in Prisma database via firebaseUid
    let dbUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!dbUser) {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        dbUser = await prisma.user.update({
          where: { id: existingUserByEmail.id },
          data: { firebaseUid },
        });
      } else {
        dbUser = await prisma.user.create({
          data: {
            email,
            name: name || null,
            firebaseUid,
          },
        });
      }
    }

    // Securely retrieve the authenticated user's ID. Do NOT accept userId from the request body.
    const userId = dbUser.id;
    const method = req.method;

    // 3. GET: Get saved analyses for the authenticated user
    if (method === 'GET') {
      const savedAnalyses = await prisma.savedAnalysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(savedAnalyses);
    }

    // 4. POST: Save an analysis
    if (method === 'POST') {
      const { slug: rawSlug } = req.body;
      if (!rawSlug || typeof rawSlug !== 'string' || !rawSlug.trim()) {
        return res.status(400).json({ error: 'Ogiltigt eller saknat slug-fält.' });
      }

      const slug = rawSlug.trim().toLowerCase();

      // Server-side validation against our static analyses list
      // This prevents the client from manipulating titles and tickers.
      const matchedAnalysis = analyses[slug as keyof typeof analyses];
      if (!matchedAnalysis) {
        return res.status(400).json({ error: 'Analysen hittades inte i systemet.' });
      }

      const title = matchedAnalysis.title;
      const ticker = matchedAnalysis.ticker.toUpperCase();

      const entry = await prisma.savedAnalysis.upsert({
        where: {
          userId_slug: {
            userId,
            slug,
          },
        },
        update: {}, // Do nothing if it already exists
        create: {
          userId,
          slug,
          title,
          ticker,
        },
      });
      return res.json({ success: true, message: 'Analys sparad', entry });
    }

    // 5. DELETE: Remove saved analysis
    if (method === 'DELETE') {
      const { slug: rawSlug } = req.body;
      if (!rawSlug || typeof rawSlug !== 'string' || !rawSlug.trim()) {
        return res.status(400).json({ error: 'Ogiltigt eller saknat slug-fält.' });
      }

      const slug = rawSlug.trim().toLowerCase();

      await prisma.savedAnalysis.deleteMany({
        where: {
          userId,
          slug,
        },
      });
      return res.json({ success: true, message: 'Sparad analys borttagen' });
    }

    return res.status(405).json({ error: `Metod ${method} tillåts inte` });
  } catch (error: any) {
    console.error('[SAVED ANALYSES API ERROR]', error);
    return res.status(500).json({ 
      error: 'Internt serverfel i sparade analyser'
    });
  }
}
