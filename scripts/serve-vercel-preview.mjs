#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { tsImport } from 'tsx/esm/api';

const root = process.cwd();
const port = Number(process.env.PORT || 4176);
const indexHtml = await readFile(join(root, 'dist/index.html'), 'utf8');
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const robotsRewrite = vercel.rewrites?.find((rewrite) => rewrite.source === '/robots.txt');
if (robotsRewrite?.destination !== '/robots.txt') {
  throw new Error('vercel.json must explicitly rewrite /robots.txt to /robots.txt');
}
const robots = await readFile(join(root, 'public', robotsRewrite.destination.slice(1)), 'utf8');
const { default: sitemapHandler } = await tsImport('../api/sitemap.ts', import.meta.url);

const redirects = new Map((vercel.redirects || []).map(({ source, destination }) => [source, destination]));

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

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);
  const pathname = url.pathname;

  if (redirects.has(pathname)) {
    response.writeHead(301, { Location: redirects.get(pathname) });
    response.end();
    return;
  }
  if (pathname === robotsRewrite.source) {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(robots);
    return;
  }
  if (pathname === '/sitemap.xml') {
    const sitemapResponse = {
      setHeader: (name, value) => response.setHeader(name, value),
      status: (status) => {
        response.statusCode = status;
        return sitemapResponse;
      },
      send: (body) => response.end(body),
    };
    sitemapHandler(request, sitemapResponse);
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
