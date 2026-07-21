#!/usr/bin/env node

const baseUrl = process.argv[2]?.replace(/\/$/, '');

if (!baseUrl) {
  throw new Error('Usage: node scripts/inspect-seo-html.mjs <base-url>');
}

const routes = [
  '/analys/volvo',
  '/guider/grunderna-i-aktieanalys',
  '/aktier/saab',
  '/marknad',
  '/profil',
  '/analys/helt-pahittad',
];

function hasTagWithAttribute(html, tag, attribute, value) {
  return new RegExp(`<${tag}\\b(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*>`, 'i').test(html);
}

function readMetaContent(html, name) {
  return html.match(new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name}["'])[^>]*\\bcontent=["']([^"']+)["'][^>]*>`, 'i'))?.[1] || null;
}

async function inspect(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
  const html = await response.text();
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() || null;
  const canonical = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1] || null;

  return {
    path,
    status: response.status,
    contentType: response.headers.get('content-type') || null,
    spaShell: /<div\s+id=["']root["']>\s*<\/div>/i.test(html),
    title: { present: Boolean(title), value: title },
    description: { present: hasTagWithAttribute(html, 'meta', 'name', 'description'), value: readMetaContent(html, 'description') },
    canonical: { present: Boolean(canonical), value: canonical },
    h1: { present: /<h1\b[^>]*>/i.test(html), count: (html.match(/<h1\b[^>]*>/gi) || []).length },
    jsonLd: hasTagWithAttribute(html, 'script', 'type', 'application/ld\\+json'),
    noindex: /\bnoindex\b/i.test(readMetaContent(html, 'robots') || ''),
  };
}

console.log(JSON.stringify({ baseUrl, routes: await Promise.all(routes.map(inspect)) }, null, 2));
