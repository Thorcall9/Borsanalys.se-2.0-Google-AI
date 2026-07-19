import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const source = async (path) => readFile(new URL(path, root), 'utf8');

test('Vercel config has no global SPA fallback and has verified legacy redirects', async () => {
  const vercel = await source('vercel.json');
  assert.doesNotMatch(vercel, /"source":\s*"\/\(\.\*\)"/);
  assert.match(vercel, /"source":\s*"\/integritetspolicy"/);
  assert.match(vercel, /"source":\s*"\/analyser\/investor2025q2"/);
});

test('React app has an explicit catch-all NotFound route', async () => {
  const app = await source('src/App.tsx');
  assert.match(app, /import NotFound from ["']\.\/pages\/NotFound["']/);
  assert.match(app, /<Route path="\*" element=\{<NotFound \/>\} \/>/);
});

test('unknown analysis slugs preserve their URL and render noindex 404', async () => {
  const analysis = await source('src/pages/Analysis.tsx');
  assert.doesNotMatch(analysis, /<Navigate to="\/analys" replace \/>/);
  assert.match(analysis, /<NotFound/);
});

test('SEO normalizes the production canonical and supports noindex', async () => {
  const seo = await source('src/components/SEO.tsx');
  assert.match(seo, /https:\/\/www\.borsanalys\.se/);
  assert.match(seo, /parsed\.pathname|searchParams|URLSearchParams/);
  assert.match(seo, /hash/);
  assert.match(seo, /noindex, nofollow/);
  assert.match(seo, /og:url/);
});

test('sitemap imports the shared analysis registry and excludes legacy routes', async () => {
  const sitemap = await source('api/sitemap.ts');
  assert.match(sitemap, /data\/analyses/);
  assert.match(sitemap, /analyses/);
  assert.doesNotMatch(sitemap, /\/analyser\/nvidia/);
  assert.doesNotMatch(sitemap, /\/makro/);
});
