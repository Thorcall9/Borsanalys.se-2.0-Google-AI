import { Request, Response } from 'express';
import { prisma } from '../src/lib/prisma.ts';

/**
 * Minimal Watchlist MVP
 * Hanterar GET (lista), POST (lägg till) och DELETE (ta bort)
 * Hårdkodat userId = 1 enligt önskemål.
 */

const USER_ID = 1;

async function ensureUserExists() {
  // Säkerställer att användare med ID 1 finns så att relationer fungerar
  await prisma.user.upsert({
    where: { id: USER_ID },
    update: {},
    create: {
      id: USER_ID,
      email: 'user1@borsanalys.se',
      name: 'Demo User',
    },
  });
}

export default async function watchlistHandler(req: Request, res: Response) {
  try {
    // 1. Förberedelse
    await ensureUserExists();
    const method = req.method;

    // 2. GET: Hämta hela bevakningslistan
    if (method === 'GET') {
      const watchlist = await prisma.watchlist.findMany({
        where: { userId: USER_ID },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(watchlist);
    }

    // 3. POST: Lägg till aktie (ticker i body)
    if (method === 'POST') {
      const { ticker } = req.body;
      if (!ticker) return res.status(400).json({ error: 'Ticker saknas i request body' });

      const entry = await prisma.watchlist.upsert({
        where: {
          userId_ticker: {
            userId: USER_ID,
            ticker: ticker.toUpperCase(),
          },
        },
        update: {}, // Gör ingenting om den redan finns
        create: {
          userId: USER_ID,
          ticker: ticker.toUpperCase(),
        },
      });
      return res.json({ success: true, message: `${ticker.toUpperCase()} tillagd`, entry });
    }

    // 4. DELETE: Ta bort aktie (ticker i body)
    if (method === 'DELETE') {
      const { ticker } = req.body;
      if (!ticker) return res.status(400).json({ error: 'Ticker saknas i request body' });

      // Vi använder deleteMany för att undvika 404-fel om den inte finns
      await prisma.watchlist.deleteMany({
        where: {
          userId: USER_ID,
          ticker: ticker.toUpperCase(),
        },
      });
      return res.json({ success: true, message: `${ticker.toUpperCase()} borttagen` });
    }

    // Fel metod
    return res.status(405).json({ error: `Metod ${method} tillåts inte` });
  } catch (error: any) {
    console.error('[WATCHLIST API ERROR]', error);
    return res.status(500).json({ error: 'Internt serverfel i watchlist' });
  }
}
