import { Request, Response } from 'express';
import { auth } from './lib/firebaseAdmin.js';


export default async function watchlistHandler(req: Request, res: Response) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

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

    // 2. Identify or Create User in Prisma database
    let dbUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!dbUser) {
      // Check if user exists with the same email but has no firebaseUid linked yet
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        // Link Firebase UID to existing user
        dbUser = await prisma.user.update({
          where: { id: existingUserByEmail.id },
          data: { firebaseUid },
        });
      } else {
        // Create new user
        dbUser = await prisma.user.create({
          data: {
            email,
            name: name || null,
            firebaseUid,
          },
        });
      }
    }

    const userId = dbUser.id;
    const method = req.method;

    // 3. GET: Get watchlist for user
    if (method === 'GET') {
      const watchlist = await prisma.watchlist.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(watchlist);
    }

    // 4. POST: Add share to watchlist
    if (method === 'POST') {
      const { ticker } = req.body;
      if (!ticker) {
        return res.status(400).json({ error: 'Ticker saknas i förfrågan.' });
      }

      const entry = await prisma.watchlist.upsert({
        where: {
          userId_ticker: {
            userId,
            ticker: ticker.toUpperCase(),
          },
        },
        update: {}, // Do nothing if it already exists
        create: {
          userId,
          ticker: ticker.toUpperCase(),
        },
      });
      return res.json({ success: true, message: `${ticker.toUpperCase()} tillagd`, entry });
    }

    // 5. DELETE: Remove share from watchlist
    if (method === 'DELETE') {
      const { ticker } = req.body;
      if (!ticker) {
        return res.status(400).json({ error: 'Ticker saknas i förfrågan.' });
      }

      await prisma.watchlist.deleteMany({
        where: {
          userId,
          ticker: ticker.toUpperCase(),
        },
      });
      return res.json({ success: true, message: `${ticker.toUpperCase()} borttagen` });
    }

    return res.status(405).json({ error: `Metod ${method} tillåts inte` });
  } catch (error: any) {
    console.error('[WATCHLIST API ERROR]', error);
    return res.status(500).json({ error: 'Internt serverfel i watchlist' });
  } finally {
    await prisma.$disconnect();
  }
}
