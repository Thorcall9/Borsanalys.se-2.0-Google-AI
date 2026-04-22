import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CONSOLIDATED ADMIN API (Votes, Event Generation, Macro Updates)
 * Reducing Vercel Serverless Function count.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  // Simple secret check for protected admin routes (using CRON_SECRET or similar)
  const authHeader = req.headers["x-cron-auth"] || req.headers["authorization"];
  const secret = process.env.CRON_SECRET;
  
  // Note: For public endpoints like votes, we might skip auth or use a different check.
  // Here we'll check auth for sensitive actions like generating events or updating macro.

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 1. Admin Votes Results (Public or Protected)
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

    // --- PROTECTED ROUTES BELOW ---
    if (secret && authHeader !== secret && type !== 'votes') {
       await prisma.$disconnect();
       return res.status(401).json({ error: "Unauthorized" });
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

    // 3. Update Macro Logic (Place-holder for cron/manual trigger)
    if (type === 'update-macro') {
      // In a real scenario, this would call the updateAllMacroData logic
      // For this consolidated route, we'd trigger the background sync logic
      await prisma.$disconnect();
      return res.status(200).json({ message: "Macro update triggered (Background)" });
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid admin service type requested." });
  } catch (err: any) {
    console.error(`[ADMIN API ERROR - ${type}]`, err.message);
    return res.status(500).json({ error: "Internt admin-fel." });
  }
}
