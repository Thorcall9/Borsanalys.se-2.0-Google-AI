import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

function routeIsCovered(route, source) {
  if (source === route) return true;
  if (source.endsWith('/:path*')) {
    const prefix = source.slice(0, -'/:path*'.length);
    return route === prefix || route.startsWith(`${prefix}/`);
  }
  return false;
}

test('every React route in App.tsx has an explicit Vercel SPA rewrite', async () => {
  const [app, vercelSource] = await Promise.all([
    readFile(new URL('src/App.tsx', root), 'utf8'),
    readFile(new URL('vercel.json', root), 'utf8'),
  ]);
  const config = JSON.parse(vercelSource);
  const rewriteSources = config.rewrites
    .filter((rewrite) => rewrite.destination === '/index.html')
    .map((rewrite) => rewrite.source);
  const reactRoutes = [...app.matchAll(/<Route path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route !== '*');

  assert.ok(reactRoutes.length > 0, 'App.tsx route list must not be empty');
  for (const route of reactRoutes) {
    assert.ok(
      rewriteSources.some((source) => routeIsCovered(route, source)),
      `${route} has no Vercel rewrite to /index.html`,
    );
  }
  assert.equal(rewriteSources.includes('/(.*)'), false, 'global SPA rewrite must remain absent');
});
