import type { VercelRequest, VercelResponse } from '@vercel/node';
import { enforceMethods, escapeHtml, rateLimit } from './_security';

const tickerPattern = /^[a-z0-9.-]{1,20}$/i;
const sourcePattern = /^[a-z0-9_-]{1,40}$/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!enforceMethods(req, res, ['GET'])) return;
  if (!rateLimit(req, res, 'vote', { windowMs: 60 * 1000, max: 1 })) return;

  // Capture stock and source from query
  const { stock, source } = req.query;

  if (!stock || typeof stock !== 'string' || !tickerPattern.test(stock.trim())) {
    return res.status(400).send(`
      <html>
        <head><title>Börsanalys.se - Röstning</title></head>
        <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; color: #333; margin: 0; background: #fff5f5;">
          <h1 style="color: #c53030;">Oops! Ingen aktie hittades.</h1>
          <p>Vi kunde inte registrera din röst eftersom vi inte vet vilken aktie det gäller.</p>
          <a href="https://borsanalys.se" style="margin-top: 20px; color: #2b6cb0; text-decoration: none; font-weight: bold;">Tillbaka till start</a>
        </body>
      </html>
    `);
  }

  const normalizedStock = stock.trim().toLowerCase();
  const voteSource = typeof source === 'string' && sourcePattern.test(source) ? source : 'email';
  const displayStock = escapeHtml(normalizedStock.toUpperCase());

  try {
    // Dynamic Prisma import for better Serverless Function compatibility
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Save the vote
    await prisma.vote.create({
      data: {
        stock: normalizedStock,
        source: voteSource
      }
    });

    await prisma.$disconnect();

    // Return the "Thank You" HTML page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <html>
        <head>
          <title>Tack för din röst!</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; color: #2d3748; margin: 0; background: #f7fafc;">
          <div style="background: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); max-width: 90%; width: 400px;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📈</div>
            <h1 style="color: #1a365d; margin-bottom: 1rem; font-size: 1.5rem;">Tack för din röst!</h1>
            <p style="line-height: 1.6; margin-bottom: 2rem;">Vi har registrerat ditt intresse för <strong>${displayStock}</strong>. Vi använder detta för att prioritera nästa analys.</p>
            <a href="https://borsanalys.se" style="display: inline-block; background: #2b6cb0; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: background 0.2s;">Tillbaka till Börsanalys.se</a>
          </div>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error('Voting Error production:', error);
    return res.status(500).send("Ett oväntat fel uppstod vid röstningen. Försök igen senare. Kontrollera DATABASE_URL.");
  }
}
