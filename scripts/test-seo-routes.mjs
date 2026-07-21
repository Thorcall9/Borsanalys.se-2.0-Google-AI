#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const [index, seo, ogDefault] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('src/components/SEO.tsx', root), 'utf8'),
  readFile(new URL('public/og-default.svg', root), 'utf8'),
]);

assert.match(ogDefault, /viewBox="0 0 1200 630"/);
assert.match(index, /<meta property="og:image" content="\/og-default\.svg" \/>/);
assert.match(index, /<meta name="twitter:image" content="\/og-default\.svg" \/>/);
assert.match(seo, /ogImage = "\/og-default\.svg"/);

const vercel = JSON.parse(await readFile(new URL('vercel.json', root), 'utf8'));
const robotsRewrite = vercel.rewrites.find((rewrite) => rewrite.source === '/robots.txt');

assert.deepEqual(robotsRewrite, { source: '/robots.txt', destination: '/robots.txt' });
const expectedRobots = await readFile(new URL(`public${robotsRewrite.destination}`, root), 'utf8');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:4173').replace(/\/$/, '');
const routes = [
  { path: '/', status: 200, html: true },
  { path: '/analys', status: 200, html: true },
  {
    path: '/analys/volvo',
    status: 200,
    html: true,
    initialSeo: { canonical: 'https://www.borsanalys.se/analys/volvo' },
  },
  { path: '/analys/volvo/', status: 200, html: true },
  { path: '/analys/volvo?utm_source=test', status: 200, html: true },
  { path: '/analys/evolution', status: 200, html: true },
  { path: '/analys/helt-pahittad', status: 404, html: false, noindex: true },
  {
    path: '/guider/grunderna-i-aktieanalys',
    status: 200,
    html: true,
    initialSeo: { canonical: 'https://www.borsanalys.se/guider/grunderna-i-aktieanalys' },
  },
  {
    path: '/aktier/saab',
    status: 200,
    html: true,
    initialSeo: { canonical: 'https://www.borsanalys.se/aktier/saab' },
  },
  { path: '/marknad', status: 200, html: true },
  { path: '/profil', status: 200, html: true, noindex: true },
  { path: '/admin/subscribers', status: 200, html: true, noindex: true },
  { path: '/aktieinnehav-och-intressekonflikter', status: 200, html: true },
  { path: '/integritet', status: 200, html: true },
  { path: '/integritetspolicy', status: 301, location: '/integritet' },
  { path: '/analyser/investor2025q2', status: 301, location: '/analys/investor-ab' },
  { path: '/analys/rvrc-2026', status: 301, location: '/analys/revolutionrace-2026' },
  { path: '/analyser/helt-pahittad', status: 404, html: false },
  { path: '/verktyg/rantakalkylator', status: 200, html: true },
  { path: '/api/newsletter', status: 404, html: false },
  { path: '/api/newsletter/signup', status: 405, html: false },
  { path: '/api/helt-pahittad', status: 404, html: false },
  { path: '/services-store-test', status: 404, html: false },
  { path: '/en-helt-pahittad-sida-12345', status: 404, html: false },
  { path: '/sitemap.xml', status: 200, xml: true },
  {
    path: robotsRewrite.source,
    status: 200,
    robots: [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin/',
      'Disallow: /profil',
      'Disallow: /mina-checklistor',
      'Disallow: /api/',
      'Sitemap: https://www.borsanalys.se/sitemap.xml',
    ],
  },
];

function hasTagWithAttribute(html, tag, attribute, value) {
  return new RegExp(`<${tag}\\b(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*>`, 'i').test(html);
}

function initialHtmlSignals(body) {
  const title = body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() || null;
  const canonical = body.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1] || null;
  const h1Count = (body.match(/<h1\b[^>]*>/gi) || []).length;
  const robots = body.match(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/i)?.[1] || null;

  return {
    shell: /<div\s+id=["']root["']>\s*<\/div>/i.test(body),
    title,
    description: hasTagWithAttribute(body, 'meta', 'name', 'description'),
    canonical,
    h1Count,
    jsonLd: hasTagWithAttribute(body, 'script', 'type', 'application/ld\\+json'),
    noindex: /\bnoindex\b/i.test(robots || ''),
  };
}

const result = [];
const failures = [];
for (const expected of routes) {
  const response = await fetch(`${baseUrl}${expected.path}`, { redirect: 'manual' });
  const body = await response.text();
  const location = response.headers.get('location');
  const contentType = response.headers.get('content-type') || '';
  const initialHtml = initialHtmlSignals(body);

  if (expected.location) {
    assert.ok([301, 308].includes(response.status), `${expected.path}: unexpected redirect status ${response.status}`);
  } else {
    assert.equal(response.status, expected.status, `${expected.path}: unexpected status`);
  }
  if (expected.location) assert.equal(location, expected.location, `${expected.path}: unexpected redirect`);
  if (expected.html) assert.match(contentType, /text\/html/, `${expected.path}: expected HTML`);
  if (expected.xml) {
    assert.match(contentType, /application\/xml|text\/xml/, `${expected.path}: expected XML`);
    assert.match(body, /<urlset[\s>]/, `${expected.path}: expected sitemap XML`);
  }
  if (expected.robots) {
    assert.match(contentType, /text\/plain/, `${expected.path}: expected robots text`);
    assert.equal(body, expectedRobots, `${expected.path}: response must match ${robotsRewrite.destination}`);
    for (const directive of expected.robots) {
      assert.match(body, new RegExp(`^${directive.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'), `${expected.path}: missing ${directive}`);
    }
  }
  if (expected.html === false) assert.equal(initialHtml.shell, false, `${expected.path}: must not return SPA HTML`);
  if (expected.initialSeo) {
    if (!initialHtml.title) failures.push(`${expected.path}: initial HTML is missing <title>`);
    if (!initialHtml.description) failures.push(`${expected.path}: initial HTML is missing meta[name="description"]`);
    if (initialHtml.canonical !== expected.initialSeo.canonical) {
      failures.push(`${expected.path}: initial canonical must be ${expected.initialSeo.canonical}, received ${initialHtml.canonical || 'none'}`);
    }
    if (initialHtml.h1Count !== 1) failures.push(`${expected.path}: initial HTML must contain exactly one H1, received ${initialHtml.h1Count}`);
    if (!initialHtml.jsonLd) failures.push(`${expected.path}: initial HTML is missing JSON-LD`);
  }
  if (expected.noindex && !initialHtml.noindex && response.status !== 404) {
    failures.push(`${expected.path}: initial HTML must declare noindex`);
  }
  result.push({ path: expected.path, status: response.status, location, contentType, initialHtml });
}

for (const redirect of routes.filter((route) => route.location)) {
  const response = await fetch(`${baseUrl}${redirect.path}`, { redirect: 'follow' });
  assert.equal(new URL(response.url).pathname, redirect.location, `${redirect.path}: follow destination mismatch`);
  assert.equal(response.status, 200, `${redirect.path}: followed redirect must resolve to 200`);
}

const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

assert.ok(sitemapUrls.length > 0, 'sitemap must contain public URLs');
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'sitemap must not contain duplicate URLs');
for (const sitemapUrl of sitemapUrls) {
  assert.match(sitemapUrl, /^https:\/\/www\.borsanalys\.se\//, 'sitemap URLs must use the canonical origin');
}
for (const forbidden of [
  '/analyser/',
  '/borsskolan/',
  '/api/',
  '/preview/',
  '/admin/',
  '/profil',
  '/mina-checklistor',
  '/services-store-',
]) {
  assert.equal(sitemap.includes(forbidden), false, `sitemap contains forbidden prefix ${forbidden}`);
}
assert.equal(sitemap.includes('/analys/volvo'), true, 'sitemap must include Volvo analysis');
assert.equal(sitemap.includes('/analys/investor-ab'), true, 'sitemap must include Investor analysis');
assert.equal(sitemap.includes('/guider/grunderna-i-aktieanalys'), true, 'sitemap must include a guide route');
assert.equal(sitemap.includes('/aktier/saab'), true, 'sitemap must include a stock route');
assert.equal(sitemapUrls.includes('https://www.borsanalys.se/innehav'), true, 'sitemap must retain the public holdings route');
assert.equal(sitemapUrls.includes('https://www.borsanalys.se/aktieinnehav-och-intressekonflikter'), true, 'sitemap must include the public holdings and conflicts route');
assert.match(sitemap, /<lastmod>2026-03-31<\/lastmod>/, 'sitemap must include stable analysis dates when available');
assert.match(sitemap, /<lastmod>2026-03-15<\/lastmod>/, 'sitemap must include stable guide dates when available');

console.log(JSON.stringify({ baseUrl, routes: result }, null, 2));
assert.equal(failures.length, 0, `Initial HTML SEO failures:\n${failures.join('\n')}`);
