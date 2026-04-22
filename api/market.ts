import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * CONSOLIDATED MARKET API (Sentiment, Macro, Events)
 * Fixed for Production compatibility by using dynamic Prisma imports.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  try {
    // Dynamic Prisma import inside the handler (best practice for Vercel Serverless)
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 1. Fear & Greed Index Proxy
    if (type === 'sentiment') {
      const apiKey = process.env.RAPIDAPI_KEY;
      if (!apiKey) {
        await prisma.$disconnect();
        return res.status(500).json({ error: "RAPIDAPI_KEY is not set" });
      }

      const response = await fetch("https://fear-and-greed-index.p.rapidapi.com/v1/fgi", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      });

      if (!response.ok) throw new Error(`RapidAPI error ${response.status}`);
      const data = await response.json();
      await prisma.$disconnect();
      return res.status(200).json(data);
    }

    // 2. Macro Market Data
    if (type === 'macro') {
      const macroData = await prisma.macroMarketData.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 30
      });

      const seen = new Set();
      const formattedData = macroData
        .filter(d => {
          if (seen.has(d.key)) return false;
          seen.add(d.key);
          return true;
        })
        .map(d => ({
          key: d.key,
          value: d.value,
          trend: d.trend,
          updatedAt: d.updatedAt
        }));

      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
      await prisma.$disconnect();
      return res.status(200).json(formattedData);
    }

    // 3. Market Events
    if (type === 'events') {
      const events = await prisma.marketEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3
      });

      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      await prisma.$disconnect();
      return res.status(200).json(events);
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid market data type requested." });
  } catch (err: any) {
    console.error(`[MARKET API ERROR - ${type}]`, err);
    return res.status(500).json({ error: "Internt serverfel vid hämtning av marknadsdata. Kontrollera DATABASE_URL." });
  }
}
