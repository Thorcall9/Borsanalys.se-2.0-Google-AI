import type { Request, Response } from 'express';
import { prisma } from '../../src/lib/prisma.ts';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Hämta live makrodata som kontext om möjligt
    let macroContext = "Makrodata ej tillgänglig.";
    try {
      const macroData = await prisma.macroMarketData.findMany({
        orderBy: { updatedAt: 'desc' }
      });
      if (macroData.length > 0) {
        // Ta senaste unika värden per nyckel
        const seen = new Set<string>();
        const unique = macroData.filter(d => {
          if (seen.has(d.key)) return false;
          seen.add(d.key);
          return true;
        });
        macroContext = unique
          .map(d => `${d.key}: ${d.value} (trend: ${d.trend || 'flat'})`)
          .join(", ");
      }
    } catch (_) {
      // Fallback till statisk kontext om DB är otillgänglig
      macroContext = "US10Y: 4.34%, SE10Y: 2.85%, USDSEK: 9.56, EURSEK: 10.95, OMX30: 2905, KPI: 0.5%";
    }

    const today = new Date().toLocaleDateString('sv-SE');

    const prompt = `Du är en erfaren makroekonomisk analytiker som skriver för svenska investerare.
Dagens datum är ${today}. Aktuella makroindikatorer: ${macroContext}.

Generera en kortfattad men slagkraftig makroanalys (max 4 meningar) som besvarar:
1. Var befinner vi oss i konjunkturcykeln?
2. Vad är den viktigaste makrofaktorn för svenska investerare just nu?
3. Vilka tillgångsslag gynnas i detta läge?

Svara ENDAST med ett JSON-objekt med dessa fält (inga radbrytningar i strängarna):
{
  "outlook": "[din makroanalys på svenska, 3-4 meningar]",
  "suggestedPhaseId": "[en av: recovery, overheating, stagflation, reflation]",
  "upcomingDates": [
    { "date": "DD Månad", "title": "Händelse" }
  ]
}

upcomingDates ska innehålla 3-4 verkliga kommande makrohändelser (räntebeslut, KPI-publicering m.m.) baserat på ${today}.
Svara på svenska.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Rensa markdown-kodblock om de smugit sig in
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(text);

    return res.status(200).json({
      outlook: parsed.outlook || "Kunde inte generera makroanalys.",
      suggestedPhaseId: parsed.suggestedPhaseId || null,
      upcomingDates: parsed.upcomingDates || []
    });

  } catch (err: any) {
    console.error("[MACRO OUTLOOK ERROR]", err.message);
    return res.status(500).json({
      error: "Kunde inte generera makroöversikt. Försök igen om en stund."
    });
  }
}
