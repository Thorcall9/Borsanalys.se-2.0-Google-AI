#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4176);
const indexHtml = await readFile(join(root, 'dist/index.html'), 'utf8');
const robots = await readFile(join(root, 'public/robots.txt'), 'utf8');
const analysesSource = await readFile(join(root, 'src/data/analyses/index.ts'), 'utf8');
const analysisSlugs = [...analysesSource.matchAll(/^\s*"([^"]+)":\s*\w+/gm)].map((match) => match[1]);

const redirects = new Map([
  ['/integritetspolicy', '/integritet'],
  ['/analyser/investor2025q2', '/analys/investor-ab'],
]);

function isSpaRoute(pathname) {
  return pathname === '/'
    || pathname === '/analys'
    || pathname.startsWith('/analys/')
    || pathname.startsWith('/aktier/')
    || pathname === '/guider'
    || pathname.startsWith('/guider/')
    || pathname.startsWith('/borsskolan/')
    || ['/skola', '/marknad', '/kontakt', '/villkor', '/integritet', '/innehav', '/intressekonflikter', '/aktieinnehav-och-intressekonflikter', '/verktyg', '/om-oss', '/profil', '/admin/subscribers'].includes(pathname)
    || pathname.startsWith('/verktyg/');
}

function sitemapXml() {
  const urls = [
    '/', '/analys', '/guider', '/skola', '/marknad', '/kontakt', '/villkor', '/integritet', '/innehav', '/verktyg', '/om-oss',
    ...analysisSlugs.map((slug) => `/analys/${slug}`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>https://www.borsanalys.se${url}</loc></url>`).join('')}</urlset>`;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);
  const pathname = url.pathname;

  if (redirects.has(pathname)) {
    response.writeHead(301, { Location: redirects.get(pathname) });
    response.end();
    return;
  }
  if (pathname === '/robots.txt') {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(robots);
    return;
  }
  if (pathname === '/sitemap.xml') {
    response.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    response.end(sitemapXml());
    return;
  }
  if (pathname === '/api/newsletter/signup') {
    response.writeHead(request.method === 'POST' ? 500 : 405, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: request.method === 'POST' ? 'Local preview does not persist newsletter signups' : 'Method not allowed' }));
    return;
  }
  if (pathname.startsWith('/api/')) {
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'API Route not found' }));
    return;
  }
  if (isSpaRoute(pathname)) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(indexHtml);
    return;
  }

  const assetPath = normalize(join(root, 'dist', pathname));
  if (assetPath.startsWith(join(root, 'dist')) && pathname !== '/') {
    try {
      const file = await stat(assetPath);
      if (file.isFile()) {
        response.writeHead(200, { 'Content-Type': { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' }[extname(assetPath)] || 'application/octet-stream' });
        response.end(await readFile(assetPath));
        return;
      }
    } catch {}
  }
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not Found');
});

server.listen(port, '127.0.0.1', () => console.log(`Local Vercel routing harness: http://127.0.0.1:${port}`));
