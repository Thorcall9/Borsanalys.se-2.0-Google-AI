import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod';
import { applyCors, enforceBodyLimit, enforceMethods, rateLimit } from './_security';

/**
 * CONSOLIDATED AI API (Insights, Outlook)
 * Fixed for Production compatibility by using dynamic Prisma imports.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;
  const allowedMethods = type === 'event-insight' ? ['POST', 'OPTIONS'] : ['GET', 'POST', 'OPTIONS'];
  if (!applyCors(req, res, allowedMethods)) return;
  if (!enforceMethods(req, res, allowedMethods.filter(method => method !== 'OPTIONS'))) return;
  if (!enforceBodyLimit(req, res, 5 * 1024)) return;
  if (!rateLimit(req, res, `ai-${String(type || 'unknown')}`, { windowMs: 60 * 60 * 1000, max: 30 })) return;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 1. Macro Outlook Logic
    if (type === 'macro-outlook') {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

      // Fetch context
      const macroRows = await prisma.macroMarketData.findMany({ 
        orderBy: { updatedAt: 'desc' },
        take: 20 
      });
      const seen = new Set();
      const unique = macroRows.filter(d => { if (seen.has(d.key)) return false; seen.add(d.key); return true; });
      const macroContext = unique.map(d => `${d.key}: ${d.value} (${d.trend || 'flat'})`).join(", ");

      const today = new Date().toLocaleDateString('sv-SE');
      const prompt = `Du är en erfaren makroekonomisk analytiker som skriver på svenska för investerare på Börsanalys.se.
Aktuella makroindikatorer (${today}): ${macroContext}.
Analysera var vi befinner oss i konjunkturcykeln och svara i JSON-format med "outlook", "suggestedPhaseId", "confidence" och "upcomingDates".`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim().replace(/```json\n?|```/g, "");
      
      await prisma.$disconnect();
      return res.status(200).send(text);
    }

    // 2. Event Insight Logic
    if (type === 'event-insight') {
      const insightSchema = z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(1000),
      });
      const parsed = insightSchema.safeParse(req.body);
      if (!parsed.success) {
        await prisma.$disconnect();
        return res.status(400).json({ error: "Ogiltig input", details: parsed.error.issues });
      }

      const { title, description } = parsed.data;
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const prompt = `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${title} - ${description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`;
      
      const result = await model.generateContent(prompt);
      
      await prisma.$disconnect();
      return res.status(200).json({ insight: result.response.text() || "Kunde inte generera insikt." });
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid AI service type requested." });
  } catch (err: any) {
    console.error(`[AI API ERROR - ${type}]`, err);
    return res.status(500).json({ error: "Kunde inte generera AI-analys. Kontrollera GEMINI_API_KEY och databas." });
  }
}
