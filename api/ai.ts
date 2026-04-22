import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CONSOLIDATED AI API (Insights, Outlook)
 * Reducing Vercel Serverless Function count.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;
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
      return res.status(200).send(text); // Returning raw JSON string from AI
    }

    // 2. Event Insight Logic
    if (type === 'event-insight') {
      const { title, description } = req.body;
      if (!title || !description) return res.status(400).json({ error: "Missing title or description" });

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const prompt = `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${title} - ${description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`;
      
      const result = await model.generateContent(prompt);
      
      await prisma.$disconnect();
      return res.status(200).json({ insight: result.response.text() || "Kunde inte generera insikt." });
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid AI service type requested." });
  } catch (err: any) {
    console.error(`[AI API ERROR - ${type}]`, err.message);
    return res.status(500).json({ error: "Kunde inte generera AI-analys." });
  }
}
