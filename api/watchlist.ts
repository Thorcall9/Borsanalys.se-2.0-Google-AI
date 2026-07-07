import { Request, Response } from 'express';
import { prisma } from '../src/lib/prisma.ts';

/**
 * Minimal Watchlist MVP
 * Hanterar GET (lista), POST (lägg till) och DELETE (ta bort)
 * Hårdkodat userId = 1 enligt önskemål (anonym, delad bevakningslista).
 */

const allowedOrigins = [
  'https://borsanalys.se',
  'https://www.borsanalys.se',
  'http://localhost:3000',
  'http://localhost:5173',
  /^https:\/\/borsanalys(-[a-zA-Z0-9-]+)?\.vercel\.app$/,
];

const tickerPattern = /^[a-z0-9.-]{1,20}$/i;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function firstHeader(value: unknown): string | undefined {
  return Array.isArray(value) ? value[0] : (value as string | undefined);
}

function getClientIp(req: Request): string {
  const forwardedFor = firstHeader(req.headers['x-forwarded-for']);
  return forwardedFor?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) return true;
  return allowedOrigins.some((allowed) => {
    if (allowed instanceof RegExp) return allowed.test(origin);
    return allowed === origin;
  });
}

function applyCors(req: Request, res: Response, methods: string[]): boolean {
  const origin = firstHeader(req.headers.origin);
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }

  return true;
}

function enforceMethods(req: Request, res: Response, methods: string[]): boolean {
  if (!methods.includes(req.method || '')) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  return true;
}

function enforceBodyLimit(req: Request, res: Response, maxBytes: number): boolean {
  const contentLength = Number(firstHeader(req.headers['content-length']) || 0);
  if (contentLength > maxBytes) {
    res.status(413).json({ error: 'Request body too large' });
    return false;
  }
  return true;
}

function rateLimit(
  req: Request,
  res: Response,
  namespace: string,
  options: { windowMs: number; max: number },
): boolean {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(req)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return true;
  }

  current.count += 1;
  if (current.count > options.max) {
    res.setHeader('Retry-After', String(Math.ceil((current.resetAt - now) / 1000)));
    res.status(429).json({ error: 'För många anrop. Vänligen försök igen senare.' });
    return false;
  }

  return true;
}

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
  const allMethods = ['GET', 'POST', 'DELETE', 'OPTIONS'];
  if (!applyCors(req, res, allMethods)) return;
  if (!enforceMethods(req, res, allMethods.filter((m) => m !== 'OPTIONS'))) return;
  if (!enforceBodyLimit(req, res, 2 * 1024)) return;
  if (!rateLimit(req, res, 'watchlist', { windowMs: 60 * 1000, max: 30 })) return;

  const method = req.method;

  // Validera indata innan någon DB-anrop görs
  let normalizedTicker = '';
  if (method === 'POST' || method === 'DELETE') {
    const { ticker } = req.body ?? {};
    if (typeof ticker !== 'string' || !tickerPattern.test(ticker.trim())) {
      return res.status(400).json({ error: 'Ogiltig eller saknad ticker' });
    }
    normalizedTicker = ticker.trim().toUpperCase();
  }

  try {
    // 1. Förberedelse
    await ensureUserExists();

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
      const entry = await prisma.watchlist.upsert({
        where: {
          userId_ticker: {
            userId: USER_ID,
            ticker: normalizedTicker,
          },
        },
        update: {}, // Gör ingenting om den redan finns
        create: {
          userId: USER_ID,
          ticker: normalizedTicker,
        },
      });
      return res.json({ success: true, message: `${normalizedTicker} tillagd`, entry });
    }

    // 4. DELETE: Ta bort aktie (ticker i body)
    if (method === 'DELETE') {
      // Vi använder deleteMany för att undvika 404-fel om den inte finns
      await prisma.watchlist.deleteMany({
        where: {
          userId: USER_ID,
          ticker: normalizedTicker,
        },
      });
      return res.json({ success: true, message: `${normalizedTicker} borttagen` });
    }

    // Fel metod
    return res.status(405).json({ error: `Metod ${method} tillåts inte` });
  } catch (error: any) {
    console.error('[WATCHLIST API ERROR]', error);
    return res.status(500).json({ error: 'Internt serverfel i watchlist' });
  }
}
