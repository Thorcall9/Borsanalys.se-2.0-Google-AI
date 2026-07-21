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

test('SEO imports shared structured-data helpers and exposes article metadata', async () => {
  const seo = await source('src/components/SEO.tsx');
  assert.match(seo, /from ["']\.\.\/lib\/seo\/structuredData["']/);
  assert.match(seo, /jsonLd\?: Record<string, unknown> \| Record<string, unknown>\[\]/);
  assert.match(seo, /publishedTime\?: string/);
  assert.match(seo, /modifiedTime\?: string/);
  assert.match(seo, /application\/ld\+json/);
});

test('structured-data helpers define the required JSON-LD contracts', async () => {
  const structuredData = await source('src/lib/seo/structuredData.ts');
  assert.match(structuredData, /buildBreadcrumbJsonLd/);
  assert.match(structuredData, /buildArticleJsonLd/);
  assert.match(structuredData, /buildWebsiteJsonLd/);
  assert.match(structuredData, /serializeJsonLd/);
  assert.match(structuredData, /https:\/\/schema\.org/);
  assert.match(structuredData, /JSON\.stringify/);
  assert.match(structuredData, /\\u003c/);
});

test('SEO defaults to the local OG image and structured URLs pin the production origin', async () => {
  const seo = await source('src/components/SEO.tsx');
  const structuredData = await source('src/lib/seo/structuredData.ts');
  const ogImage = new URL('public/og-image.png', root);

  assert.doesNotMatch(seo, /picsum\.photos/);
  await assert.doesNotReject(() => readFile(ogImage));
  assert.match(seo, /ogImage = "\/og-image\.png"/);
  assert.match(structuredData, /const url = new URL\(SITE_ORIGIN\)/);
  assert.match(structuredData, /const input = new URL\(path, SITE_ORIGIN\)/);
});

test('sitemap imports the shared analysis registry and excludes legacy routes', async () => {
  const sitemap = await source('api/sitemap.ts');
  assert.match(sitemap, /data\/analyses/);
  assert.match(sitemap, /analyses/);
  assert.doesNotMatch(sitemap, /\/analyser\/nvidia/);
  assert.doesNotMatch(sitemap, /\/makro/);
});
