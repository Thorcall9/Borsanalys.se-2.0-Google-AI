import type { VercelRequest, VercelResponse } from '@vercel/node';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function firstHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getClientIp(req: VercelRequest): string {
  const forwardedFor = firstHeader(req.headers['x-forwarded-for']);
  return forwardedFor?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}

function enforceMethods(req: VercelRequest, res: VercelResponse, methods: string[]): boolean {
  if (!methods.includes(req.method || '')) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  return true;
}

function enforceBodyLimit(req: VercelRequest, res: VercelResponse, maxBytes: number): boolean {
  const contentLength = Number(firstHeader(req.headers['content-length']) || 0);
  if (contentLength > maxBytes) {
    res.status(413).json({ error: 'Request body too large' });
    return false;
  }
  return true;
}

function configError(message: string): Error {
  const error = new Error(message);
  error.name = 'ADMIN_CONFIG_ERROR';
  return error;
}

function rateLimit(
  req: VercelRequest,
  res: VercelResponse,
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

async function safeEqual(a: string, b: string): Promise<boolean> {
  const { timingSafeEqual } = await import('node:crypto');
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

async function requireCronSecret(req: VercelRequest, res: VercelResponse): Promise<boolean> {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Admin secret is not configured' });
    return false;
  }

  const cronHeader = firstHeader(req.headers['x-cron-auth']);
  const authHeader = firstHeader(req.headers.authorization);
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  const suppliedSecret = bearerToken || cronHeader;

  if (!suppliedSecret || !(await safeEqual(suppliedSecret, secret))) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  return true;
}

/**
 * CONSOLIDATED ADMIN API (Votes, Event Generation, Macro Updates)
 * Fixed for Production compatibility by using dynamic Prisma imports.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  if (!enforceMethods(req, res, ['GET', 'POST'])) return;
  if (!enforceBodyLimit(req, res, 5 * 1024)) return;
  if (!rateLimit(req, res, `admin-${String(type || 'unknown')}`, { windowMs: 15 * 60 * 1000, max: 60 })) return;
  if (!(await requireCronSecret(req, res))) return;

  try {
    // 1. Admin Votes Results
    if (type === 'votes') {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      try {
        const votes = await prisma.vote.groupBy({
          by: ['stock'],
          _count: { stock: true },
          orderBy: { _count: { stock: 'desc' }}
        });
        const result = votes.map(v => ({ stock: v.stock, count: v._count.stock }));
        return res.status(200).json(result);
      } finally {
        await prisma.$disconnect();
      }
    }

    // 2. Generate Events Logic
    if (type === 'generate-events') {
      if (!process.env.GEMINI_API_KEY) {
        throw configError("GEMINI_API_KEY is not configured");
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const prompt = `Skapa 3 högaktuella marknadshändelser för den svenska börsen just nu. Svara i JSON-format med ett "events" array innehållande title, impact (positive/negative/neutral), description, whyItMatters, swedishCompanies, usCompanies, winners.`;
      
      const result = await model.generateContent(prompt);
      const text = (await result.response).text().trim().replace(/```json\n?|```/g, "");
      const parsed = JSON.parse(text);
      const events = parsed.events;

      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      try {
        if (Array.isArray(events)) {
          for (const event of events) {
            await prisma.marketEvent.create({ data: event });
          }
        }
        return res.status(200).json({ success: true, count: events?.length });
      } finally {
        await prisma.$disconnect();
      }
    }

    // 3. Update Macro Logic
    if (type === 'update-macro') {
      const { updateAllMacroData } = await import('../src/lib/macroUpdater.ts');
      const result = await updateAllMacroData();
      return res.status(200).json(result);
    }

    return res.status(400).json({ error: "Invalid admin service type requested." });
  } catch (err: any) {
    console.error(`[ADMIN API ERROR - ${type}]`, err);
    if (err?.name === 'ADMIN_CONFIG_ERROR') {
      return res.status(500).json({ code: "AI_CONFIG_MISSING", error: err.message });
    }
    return res.status(500).json({ error: "Internt admin-fel. Kontrollera DATABASE_URL." });
  }
}
