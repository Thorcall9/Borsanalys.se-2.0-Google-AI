import type { Request, Response } from 'express';
import { prisma } from '../../src/lib/prisma.ts';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("[ERROR] GEMINI_API_KEY is missing in serverless function!");
      return res.status(500).json({ error: "Systemfel: API-nyckel saknas." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using Gemini 2.5 Flash-Lite as established in this workspace for stability
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // Hämta live makrodata som kontext
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
      console.warn(`[WARNING] Database fetch failed (using fallback): ${dbErr.message}`);
    }

    const today = new Date().toLocaleDateString('sv-SE');
    const prompt = `Du är en erfaren makroekonomisk analytiker som skriver på svenska för investerare på Börsanalys.se.
Aktuella makroindikatorer (${today}): ${macroContext}.

Analysera var vi befinner oss i konjunkturcykeln och vad det innebär för aktiemarknaden.
Vi använder en 6-fasmodell:
- early_recovery (Tidig återhämtning)
- expansion (Expansion)
- overheating (Överhettning)
- late_cycle (Sen cykel)
- slowdown (Avmattning)
- recession (Recession)

Svara EXAKT i detta JSON-format utan någon annan text eller markdown:
{
  "outlook": "[3-4 meningar på svenska om makroläget och vad investerare bör tänka på just nu. Var professionell och initierad.]",
  "suggestedPhaseId": "early_recovery|expansion|overheating|late_cycle|slowdown|recession",
  "confidence": [HELTAL mellan 0-100],
  "upcomingDates": [{"date": "DD Månad", "title": "Händelse"}]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // 1. Better JSON Extraction (handle markdown blocks or preamble)
    let jsonData = null;
    try {
      const cleanedText = text.replace(/```json\n?|```/g, "").trim();
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        jsonData = JSON.parse(cleanedText);
      }
    } catch (parseErr) {
      console.error(`[ERROR] AI JSON Parse failed. Text: ${text.substring(0, 100)}`);
      throw new Error("Kunde inte tolka AI-svaret som JSON.");
    }

    // 2. Data Validation & Formatting
    const validPhases = ['early_recovery', 'expansion', 'overheating', 'late_cycle', 'slowdown', 'recession'];
    const suggestedPhaseId = validPhases.includes(jsonData.suggestedPhaseId) ? jsonData.suggestedPhaseId : "late_cycle";
    
    let numericConfidence = 75;
    if (jsonData.confidence !== undefined) {
      numericConfidence = parseInt(String(jsonData.confidence), 10);
      if (isNaN(numericConfidence)) numericConfidence = 75;
    }

    return res.status(200).json({
      outlook: jsonData.outlook || "Makroanalys genererades.",
      suggestedPhaseId,
      confidence: numericConfidence,
      upcomingDates: Array.isArray(jsonData.upcomingDates) ? jsonData.upcomingDates : []
    });

  } catch (err: any) {
    console.error("[MACRO OUTLOOK ERROR]", err.message);
    return res.status(500).json({
      error: `Serverfel: ${err.message}`
    });
  }
}
