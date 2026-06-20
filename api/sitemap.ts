import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  const baseUrl = 'https://www.borsanalys.se';

  const urls = [
    '',
    '/analyser',
    '/borsskola',
    '/makro',
    '/om-oss',
    '/analyser/nvidia',
    '/analyser/microsoft',
    '/analys/abb-q1-2026'
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
