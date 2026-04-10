import type { Request, Response } from 'express';
import { prisma } from '../../src/lib/prisma';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request, res: Response) {
  // 1. Basic Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Comprehensive Key Check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[CRITICAL] GEMINI_API_KEY is missing in serverless environment");
      return res.status(500).json({ 
        error: "Miljövariabel saknas: GEMINI_API_KEY",
        suggestion: "Kontrollera inställningarna i din Vercel Dashboard."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash for maximum production stability on Vercel
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Database Context
    let macroContext = "US10Y: 4.34%, SE10Y: 2.85%, USD/SEK: 9.56, EUR/SEK: 10.95, OMX30: 2905, KPI: 0.5%";
    try {
      const macroRows = await prisma.macroMarketData.findMany({ 
        orderBy: { updatedAt: 'desc' },
        take: 20 
      });
      const seen = new Set<string>();
      const unique = macroRows.filter(d => { if (seen.has(d.key)) return false; seen.add(d.key); return true; });
      if (unique.length > 0) {
        macroContext = unique.map(d => `${d.key}: ${d.value} (${d.trend || 'flat'})`).join(", ");
      }
    } catch (dbErr: any) {
      console.warn(`[WARNING] Database fetch failed in serverless: ${dbErr.message}`);
      // Fallback is already set
    }

    const today = new Date().toLocaleDateString('sv-SE');
    const prompt = `Du är en erfaren makroekonomisk analytiker för Börsanalys.se.
Aktuella indikatorer (${today}): ${macroContext}.
Analysera konjunkturcykeln (6 faser: early_recovery, expansion, overheating, late_cycle, slowdown, recession).
Returnera EXAKT JSON:
{
  "outlook": "3-4 meningar på svenska...",
  "suggestedPhaseId": "expansion|late_cycle|etc",
  "confidence": 0-100,
  "upcomingDates": [{"date": "DD Mån", "title": "Händelse"}]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // 4. Robust Parsing
    let jsonData = null;
    try {
      const cleanedText = text.replace(/```json\n?|```/g, "").trim();
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      jsonData = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedText);
    } catch (parseErr) {
      console.error("[ERROR] AI JSON Parse failed:", text.substring(0, 50));
      throw new Error("Kunde inte tolka AI-svaret.");
    }

    const validPhases = ['early_recovery', 'expansion', 'overheating', 'late_cycle', 'slowdown', 'recession'];
    const suggestedPhaseId = validPhases.includes(jsonData.suggestedPhaseId) ? jsonData.suggestedPhaseId : "late_cycle";

    return res.status(200).json({
      outlook: jsonData.outlook || "Analys genererades.",
      suggestedPhaseId,
      confidence: jsonData.confidence || 75,
      upcomingDates: Array.isArray(jsonData.upcomingDates) ? jsonData.upcomingDates : []
    });

  } catch (err: any) {
    console.error("[MACRO OUTLOOK FATAL]", err.message);
    return res.status(500).json({
      error: `Serverfel: ${err.message}`,
      type: "SERVERLESS_CRASH"
    });
  }
}
