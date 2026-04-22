import type { Request, Response } from 'express';
import { prisma } from '../src/lib/prisma.ts';

/**
 * CONSOLIDATED MARKET API (Sentiment, Macro, Events)
 * Reducing Vercel Serverless Function count.
 */
export default async function handler(req: Request, res: Response) {
  const { type } = req.query;

  try {
    // 1. Fear & Greed Index Proxy
    if (type === 'sentiment') {
      const apiKey = process.env.RAPIDAPI_KEY;
      if (!apiKey) return res.status(500).json({ error: "RAPIDAPI_KEY is not set" });

      const response = await fetch("https://fear-and-greed-index.p.rapidapi.com/v1/fgi", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      });

      if (!response.ok) throw new Error(`RapidAPI error ${response.status}`);
      const data = await response.json();
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
      return res.status(200).json(formattedData);
    }

    // 3. Market Events
    if (type === 'events') {
      const events = await prisma.marketEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3
      });

      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.status(200).json(events);
    }

    return res.status(400).json({ error: "Invalid market data type requested." });
  } catch (err: any) {
    console.error(`[MARKET API ERROR - ${type}]`, err.message);
    return res.status(500).json({ error: "Internt serverfel vid hämtning av marknadsdata." });
  }
}
