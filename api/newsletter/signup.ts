import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Strict email validation with Zod
  const emailSchema = z.string().email({ message: 'Ogiltig e-postadress. Vänligen kontrollera formatet.' });
  const parsed = emailSchema.safeParse(req.body?.email);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const email = parsed.data;

  try {
    // Save to Neon (via Prisma) — requires DATABASE_URL env var in Vercel
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    await prisma.$disconnect();

    // Send welcome email via Resend — requires RESEND_API_KEY env var in Vercel
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Börsanalys.se <info@borsanalys.se>',
          to: email,
          subject: 'Välkommen till Börsanalys.se!',
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
              <h1 style="color: #10B981; font-size: 28px; font-weight: 900; margin-bottom: 16px; letter-spacing: -0.5px;">Välkommen!</h1>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
                Tack för att du prenumererar på Börsanalys.se. Du kommer nu att få veckobrevet varje söndag med de senaste analyserna och marknadsuppdateringarna.
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                Vi fokuserar på kvalitet, djupanalys och att alltid ge dig ett faktabaserat, relevant underlag för dina investeringsbeslut.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 24px;" />
              <p style="color: #94a3b8; font-size: 13px;">
                Med vänliga hälsningar,<br/>
                <strong>Carl Fredrik Thor</strong><br/>
                Börsanalys.se
              </p>
            </div>
          `,
        }),
      });
    }

    return res.status(200).json({ success: true, message: 'Tack för din anmälan! Du får ett välkomstmail inom kort.' });
  } catch (error: any) {
    console.error('[Newsletter Signup Error]', error);
    return res.status(500).json({ error: 'Kunde inte slutföra anmälan. Kontrollera att DATABASE_URL är konfigurerad i Vercel.' });
  }
}
