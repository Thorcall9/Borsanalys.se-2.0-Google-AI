import type { Request, Response } from 'express';
import { prisma } from '../../src/lib/prisma.ts';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request, res: Response) {
  // Enkel auth-check (använd samma som för makrouppdatering)
  const authHeader = req.headers['x-cron-auth'];
  if (!process.env.CRON_SECRET || authHeader !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Hämta dagsfärsk makro-data för kontext
    const macroData = await prisma.macroMarketData.findMany();
    const context = macroData.map(d => `${d.key}: ${d.value}`).join(", ");

    const prompt = `Analysera det aktuella globala marknadsläget baserat på dagens datum (${new Date().toLocaleDateString('sv-SE')}) och dessa indikatorer: ${context}.
    Identifiera de 3 viktigaste händelserna/teman som påverkar börsen just nu. 
    Svara ENDAST med ett JSON-objekt som innehåller en array "events" med 3 objekt.
    Varje objekt ska ha:
    - title: Kort slagkraftig rubrik
    - impact: Antingen "positive", "negative" eller "neutral"
    - description: En sammanfattning på 2-3 meningar om händelsen.
    - whyItMatters: Varför detta är kritiskt för investerare.
    - swedishCompanies: Exempel på svenska bolag som påverkas ( t.ex. "Svenska storbanker och fastighetsbolag").
    - usCompanies: Exempel på amerikanska bolag/sektorer som påverkas.
    - winners: Vilka sektorer/tillgångar som gynnas.
    Svara på svenska.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Rensa eventuell markdown-formatering om den smugit sig in
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(text);
    const events = parsed.events;

    // Spara händelserna i databasen
    if (Array.isArray(events)) {
      // Vi kan välja att rensa gamla händelser eller bara lägga till nya
      // Här väljer vi att lägga till nya händelser
      for (const event of events) {
        await prisma.marketEvent.create({
          data: {
            title: event.title,
            impact: event.impact,
            description: event.description,
            whyItMatters: event.whyItMatters,
            swedishCompanies: event.swedishCompanies,
            usCompanies: event.usCompanies,
            winners: event.winners
          }
        });
      }
    }

    return res.status(200).json({ success: true, count: events.length });
  } catch (err: any) {
    console.error("[GENERATE EVENTS ERROR]", err.message);
    return res.status(500).json({ error: "Kunde inte generera marknadshändelser med AI." });
  }
}
