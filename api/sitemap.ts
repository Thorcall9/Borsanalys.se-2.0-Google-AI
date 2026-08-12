import type { VercelRequest, VercelResponse } from '@vercel/node';
import { analyses, isPublishedAnalysis } from '../src/data/analyses/index.js';
import { guides } from '../src/data/guides.js';
import { stocks } from '../src/data/stocks.js';

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
  '/aktieinnehav-och-intressekonflikter',
  '/verktyg',
  '/verktyg/rantakalkylator',
  '/verktyg/malsparandekalkylator',
  '/verktyg/dcf-kalkylator',
  '/verktyg/utdelningskalkylator',
  '/om-oss',
];

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[character] || character));
}

function toLastmod(value?: string) {
  return value?.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
}

function uniqueEntries(entries: SitemapEntry[]) {
  const paths = new Set<string>();
  return entries.filter((entry) => {
    if (paths.has(entry.path)) return false;
    paths.add(entry.path);
    return true;
  });
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = uniqueEntries([
    ...staticRoutes.map((path) => ({ path })),
    ...Object.values(analyses).filter(isPublishedAnalysis).map((analysis) => ({
      path: `/analys/${analysis.slug}`,
      lastmod: toLastmod(analysis.date),
    })),
    ...Object.values(guides).map((guide) => ({
      path: `/guider/${guide.slug}`,
      lastmod: toLastmod(guide.publishedDate),
    })),
    ...Object.values(stocks).map((stock) => ({ path: `/aktier/${stock.slug}` })),
  ]);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ path, lastmod }) => `  <url><loc>${escapeXml(new URL(path, baseUrl).toString())}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(xml);
}
