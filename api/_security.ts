import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export function getClientIp(req: VercelRequest): string {
  const forwardedFor = firstHeader(req.headers['x-forwarded-for']);
  return forwardedFor?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}

export function isAllowedOrigin(origin?: string): boolean {
  if (!origin) return true;
  return allowedOrigins.some((allowed) => {
    if (allowed instanceof RegExp) return allowed.test(origin);
    return allowed === origin;
  });
}

export function applyCors(req: VercelRequest, res: VercelResponse, methods: string[]): boolean {
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

export function enforceMethods(req: VercelRequest, res: VercelResponse, methods: string[]): boolean {
  if (!methods.includes(req.method || '')) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  return true;
}

export function enforceBodyLimit(req: VercelRequest, res: VercelResponse, maxBytes: number): boolean {
  const contentLength = Number(firstHeader(req.headers['content-length']) || 0);
  if (contentLength > maxBytes) {
    res.status(413).json({ error: 'Request body too large' });
    return false;
  }
  return true;
}

export function rateLimit(
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

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function requireCronSecret(req: VercelRequest, res: VercelResponse): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Admin secret is not configured' });
    return false;
  }

  const cronHeader = firstHeader(req.headers['x-cron-auth']);
  const authHeader = firstHeader(req.headers.authorization);
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  const suppliedSecret = bearerToken || cronHeader;

  if (!suppliedSecret || !safeEqual(suppliedSecret, secret)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  return true;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
