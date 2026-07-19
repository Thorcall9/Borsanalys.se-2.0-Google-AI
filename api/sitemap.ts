import type { VercelRequest, VercelResponse } from '@vercel/node';
import { analyses } from '../src/data/analyses/index.js';

const baseUrl = 'https://www.borsanalys.se';
const staticRoutes = [
  '/',
  '/analys',
  '/aktiechecklista',
  '/guider',
  '/skola',
  '/marknad',
  '/kontakt',
  '/villkor',
  '/integritet',
  '/innehav',
  '/verktyg',
  '/om-oss',
];

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[character] || character));
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = [
    ...staticRoutes,
    ...Object.keys(analyses).map((slug) => `/analys/${slug}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(`${baseUrl}${url}`)}</loc></url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(xml);
}
