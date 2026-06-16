import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { enforceBodyLimit, enforceMethods, rateLimit, requireCronSecret } from './_security';

/**
 * CONSOLIDATED ADMIN API (Votes, Event Generation, Macro Updates)
 * Fixed for Production compatibility by using dynamic Prisma imports.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  if (!enforceMethods(req, res, ['GET', 'POST'])) return;
  if (!enforceBodyLimit(req, res, 5 * 1024)) return;
  if (!rateLimit(req, res, `admin-${String(type || 'unknown')}`, { windowMs: 15 * 60 * 1000, max: 60 })) return;
  if (!requireCronSecret(req, res)) return;

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 1. Admin Votes Results
    if (type === 'votes') {
      const votes = await prisma.vote.groupBy({
        by: ['stock'],
        _count: { stock: true },
        orderBy: { _count: { stock: 'desc' }}
      });
      const result = votes.map(v => ({ stock: v.stock, count: v._count.stock }));
      await prisma.$disconnect();
      return res.status(200).json(result);
    }

    // 2. Generate Events Logic
    if (type === 'generate-events') {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const prompt = `Skapa 3 högaktuella marknadshändelser för den svenska börsen just nu. Svara i JSON-format med ett "events" array innehållande title, impact (positive/negative/neutral), description, whyItMatters, swedishCompanies, usCompanies, winners.`;
      
      const result = await model.generateContent(prompt);
      const text = (await result.response).text().trim().replace(/```json\n?|```/g, "");
      const parsed = JSON.parse(text);
      const events = parsed.events;

      if (Array.isArray(events)) {
        for (const event of events) {
          await prisma.marketEvent.create({ data: event });
        }
      }
      await prisma.$disconnect();
      return res.status(200).json({ success: true, count: events?.length });
    }

    // 3. Update Macro Logic
    if (type === 'update-macro') {
      // Logic would be triggered here
      await prisma.$disconnect();
      return res.status(200).json({ message: "Macro update triggered" });
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid admin service type requested." });
  } catch (err: any) {
    console.error(`[ADMIN API ERROR - ${type}]`, err);
    return res.status(500).json({ error: "Internt admin-fel. Kontrollera DATABASE_URL." });
  }
}
