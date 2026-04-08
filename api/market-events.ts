import type { Request, Response } from 'express';
import { prisma } from '../src/lib/prisma.ts';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const events = await prisma.marketEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(events);
  } catch (err: any) {
    console.error("[MARKET EVENTS API ERROR]", err.message);
    return res.status(500).json({ error: "Kunde inte hämta marknadshändelser." });
  }
}
