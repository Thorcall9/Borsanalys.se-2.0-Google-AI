import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const allowedOrigins = [
  'https://borsanalys.se',
  'https://www.borsanalys.se',
  'http://localhost:3000',
  'http://localhost:5173',
  /^https:\/\/borsanalys(-[a-zA-Z0-9-]+)?\.vercel\.app$/,
];

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

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) return true;
  return allowedOrigins.some((allowed) => {
    if (allowed instanceof RegExp) return allowed.test(origin);
    return allowed === origin;
  });
}

function applyCors(req: VercelRequest, res: VercelResponse, methods: string[]): boolean {
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Cron-Auth');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }

  return true;
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

/**
 * CONSOLIDATED AI API (Insights, Outlook)
 * Fixed for Production compatibility by using dynamic Prisma imports.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;
  const allowedMethods = type === 'event-insight' ? ['POST', 'OPTIONS'] : ['GET', 'POST', 'OPTIONS'];
  if (!applyCors(req, res, allowedMethods)) return;
  if (!enforceMethods(req, res, allowedMethods.filter(method => method !== 'OPTIONS'))) return;
  if (!enforceBodyLimit(req, res, 5 * 1024)) return;
  if (!rateLimit(req, res, `ai-${String(type || 'unknown')}`, { windowMs: 60 * 60 * 1000, max: 30 })) return;

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    // 1. Macro Outlook Logic
    if (type === 'macro-outlook') {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

      // Fetch context
      const macroRows = await prisma.macroMarketData.findMany({ 
        orderBy: { updatedAt: 'desc' },
        take: 20 
      });
      const seen = new Set();
      const unique = macroRows.filter(d => { if (seen.has(d.key)) return false; seen.add(d.key); return true; });
      const macroContext = unique.map(d => `${d.key}: ${d.value} (${d.trend || 'flat'})`).join(", ");

      const today = new Date().toLocaleDateString('sv-SE');
      const prompt = `Du är en erfaren makroekonomisk analytiker som skriver på svenska för investerare på Börsanalys.se.
Aktuella makroindikatorer (${today}): ${macroContext}.
Analysera var vi befinner oss i konjunkturcykeln och svara i JSON-format med "outlook", "suggestedPhaseId", "confidence" och "upcomingDates".`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim().replace(/```json\n?|```/g, "");
      
      await prisma.$disconnect();
      return res.status(200).send(text);
    }

    // 2. Event Insight Logic
    if (type === 'event-insight') {
      const insightSchema = z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(1000),
      });
      const parsed = insightSchema.safeParse(req.body);
      if (!parsed.success) {
        await prisma.$disconnect();
        return res.status(400).json({ error: "Ogiltig input", details: parsed.error.issues });
      }

      const { title, description } = parsed.data;
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const prompt = `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${title} - ${description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`;
      
      const result = await model.generateContent(prompt);
      
      await prisma.$disconnect();
      return res.status(200).json({ insight: result.response.text() || "Kunde inte generera insikt." });
    }

    await prisma.$disconnect();
    return res.status(400).json({ error: "Invalid AI service type requested." });
  } catch (err: any) {
    console.error(`[AI API ERROR - ${type}]`, err);
    return res.status(500).json({ error: "Kunde inte generera AI-analys. Kontrollera GEMINI_API_KEY och databas." });
  }
}
