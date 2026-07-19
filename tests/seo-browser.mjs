import assert from 'node:assert/strict';

export async function runSeoBrowserChecks(tab, baseUrl) {
  const checks = [];
  for (const path of ['/analys/volvo', '/analys/volvo?utm_source=test', '/analys/volvo/', '/analys/helt-pahittad', '/admin/subscribers']) {
    await tab.goto(`${baseUrl}${path}`);
    await tab.playwright.waitForTimeout(1200);
    const result = await tab.playwright.evaluate(() => ({
      url: location.href,
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || null,
      canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((element) => element.getAttribute('href')),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') || null,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || null,
      hasMain: Boolean(document.querySelector('main')),
    }));

    if (path === '/analys/volvo' || path === '/analys/volvo?utm_source=test' || path === '/analys/volvo/') {
      assert.equal(result.canonical.length, 1, `${path}: expected exactly one canonical`);
      assert.equal(result.canonical[0], 'https://www.borsanalys.se/analys/volvo', `${path}: canonical mismatch`);
      assert.equal(result.ogUrl, result.canonical[0], `${path}: og:url mismatch`);
      assert.match(result.title, /Volvo.*Analys/, `${path}: title mismatch`);
      assert.equal(result.hasMain, true, `${path}: analysis content missing`);
    }
    if (path === '/analys/helt-pahittad') {
      assert.equal(result.robots, 'noindex, follow', `${path}: expected noindex follow`);
      assert.equal(result.canonical.length, 0, `${path}: must not have canonical`);
      assert.equal(result.ogUrl, null, `${path}: must not have og:url`);
      assert.equal(result.hasMain, true, `${path}: expected explicit React 404`);
    }
    if (path === '/admin/subscribers') {
      assert.equal(result.robots, 'noindex, nofollow', `${path}: expected noindex nofollow`);
      assert.equal(result.canonical.length, 0, `${path}: must not have canonical`);
      assert.equal(result.ogUrl, null, `${path}: must not have og:url`);
    }
    checks.push({ path, ...result });
  }
  return checks;
}
