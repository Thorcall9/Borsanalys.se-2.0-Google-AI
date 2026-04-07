import type { Request, Response } from 'express';
import { prisma } from '../src/lib/prisma.ts';

export default async function handler(req: Request, res: Response) {
  // Tillåt endast GET-anrop
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Hämta all makrodata, sorterat på senaste uppdateringen
    const data = await prisma.macroMarketData.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    // 2. Formatera om datan till ett objekt (Key-Value) för smidigare användning i frontend
    const formattedData: Record<string, { value: number; trend: string; updatedAt: Date }> = {};

    data.forEach(item => {
      // Vi sparar endast den senaste versionen av varje unik nyckel (t.ex. US10Y)
      if (!formattedData[item.key]) {
        formattedData[item.key] = {
          value: item.value,
          trend: item.trend || 'flat',
          updatedAt: item.updatedAt
        };
      }
    });

    // 3. Sätt Cache-headers (valfritt men bra för prestanda)
    // Säger till Vercel att cacha detta i 5 minuter (300 sek)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json(formattedData);
  } catch (err: any) {
    console.error("[MACRO API ERROR]", err.message);
    return res.status(500).json({ error: "Kunde inte hämta makrodata från databasen." });
  }
}
