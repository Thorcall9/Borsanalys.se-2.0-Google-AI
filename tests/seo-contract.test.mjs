import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const source = async (path) => readFile(new URL(path, root), 'utf8');

test('Vercel config has no global SPA fallback and only verified legacy redirects', async () => {
  const vercel = JSON.parse(await source('vercel.json'));
  const redirects = vercel.redirects || [];

  assert.doesNotMatch(JSON.stringify(vercel), /"source":\s*"\/\(\.\*\)"/);
  assert.deepEqual(
    redirects.find((redirect) => redirect.source === '/integritetspolicy'),
    { source: '/integritetspolicy', destination: '/integritet', permanent: true },
  );
  assert.deepEqual(
    redirects.find((redirect) => redirect.source === '/analyser/investor2025q2'),
    { source: '/analyser/investor2025q2', destination: '/analys/investor-ab', permanent: true },
  );
  assert.deepEqual(
    redirects.find((redirect) => redirect.source === '/analys/rvrc-2026'),
    { source: '/analys/rvrc-2026', destination: '/analys/revolutionrace-2026', permanent: true },
  );
  assert.equal(redirects.some((redirect) => /:\w+\*/.test(redirect.source)), false);
});

test('React app has an explicit catch-all NotFound route', async () => {
  const app = await source('src/App.tsx');
  assert.match(app, /import NotFound from ["']\.\/pages\/NotFound["']/);
  assert.match(app, /<Route path="\*" element=\{<NotFound \/>\} \/>/);
});

test('unknown analysis slugs preserve their URL and render noindex 404', async () => {
  const [analysis, notFound] = await Promise.all([
    source('src/pages/Analysis.tsx'),
    source('src/pages/NotFound.tsx'),
  ]);
  assert.doesNotMatch(analysis, /<Navigate to="\/analys" replace \/>/);
  assert.match(analysis, /<NotFound/);
  assert.match(notFound, /<SEO title="Sidan hittades inte" noindex nofollow \/>/);
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

test('SEO defaults to the local SVG social card and structured URLs pin the production origin', async () => {
  const seo = await source('src/components/SEO.tsx');
  const structuredData = await source('src/lib/seo/structuredData.ts');
  const ogDefault = await source('public/og-default.svg');

  assert.doesNotMatch(seo, /picsum\.photos/);
  assert.match(ogDefault, /viewBox="0 0 1200 630"/);
  assert.match(seo, /ogImage = "\/og-default\.svg"/);
  assert.match(structuredData, /const url = new URL\(SITE_ORIGIN\)/);
  assert.match(structuredData, /const input = new URL\(path, SITE_ORIGIN\)/);
});

test('the explicit route-specific social asset is a genuine PNG', async () => {
  const ogImage = new URL('public/og-image.png', root);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ogImageBytes = await readFile(ogImage);

  assert.deepEqual(ogImageBytes.subarray(0, pngSignature.length), pngSignature);
});

test('fallback metadata and crawler policy use the approved public OG asset', async () => {
  const [index, robots, vercelSource, previewServer] = await Promise.all([
    source('index.html'),
    source('public/robots.txt'),
    source('vercel.json'),
    source('scripts/serve-vercel-preview.mjs'),
  ]);
  const vercel = JSON.parse(vercelSource);
  const ogDefault = await source('public/og-default.svg');

  assert.match(ogDefault, /viewBox="0 0 1200 630"/);
  assert.match(index, /<html lang="sv">/);
  assert.match(index, /<title>Börsanalys\.se - Professionella aktieanalyser<\/title>/);
  assert.match(index, /<meta name="description" content="Professionella aktieanalyser drivna av data och AI\. En minimalistisk och kraftfull plattform för moderna investerare\." \/>/);
  assert.match(index, /<link rel="canonical" href="https:\/\/www\.borsanalys\.se\/" \/>/);
  assert.match(index, /<meta property="og:type" content="website" \/>/);
  assert.match(index, /<meta property="og:url" content="https:\/\/www\.borsanalys\.se\/" \/>/);
  assert.match(index, /<meta property="og:title" content="Börsanalys\.se - Professionella aktieanalyser" \/>/);
  assert.match(index, /<meta property="og:description" content="Professionella aktieanalyser drivna av data och AI\. En minimalistisk och kraftfull plattform för moderna investerare\." \/>/);
  assert.match(index, /<meta property="og:image" content="\/og-default\.svg" \/>/);
  assert.match(index, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(index, /<meta name="twitter:title" content="Börsanalys\.se - Professionella aktieanalyser" \/>/);
  assert.match(index, /<meta name="twitter:description" content="Professionella aktieanalyser drivna av data och AI\. En minimalistisk och kraftfull plattform för moderna investerare\." \/>/);
  assert.match(index, /<meta name="twitter:image" content="\/og-default\.svg" \/>/);

  for (const directive of [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /profil',
    'Disallow: /mina-checklistor',
    'Disallow: /api/',
    'Sitemap: https://www.borsanalys.se/sitemap.xml',
  ]) {
    assert.match(robots, new RegExp(`^${directive.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
  }

  assert.deepEqual(
    vercel.rewrites.find((rewrite) => rewrite.source === '/robots.txt'),
    { source: '/robots.txt', destination: '/robots.txt' },
  );
  assert.match(previewServer, /vercel\.json/);
  assert.match(previewServer, /robotsRewrite/);
});

test('sitemap derives canonical public URLs from all shared registries', async () => {
  const sitemap = await source('api/sitemap.ts');
  assert.match(sitemap, /data\/analyses/);
  assert.match(sitemap, /data\/guides/);
  assert.match(sitemap, /data\/stocks/);
  assert.match(sitemap, /analyses/);
  assert.match(sitemap, /guides/);
  assert.match(sitemap, /stocks/);
  assert.match(sitemap, /Object\.values\(analyses\)/);
  assert.match(sitemap, /Object\.values\(guides\)/);
  assert.match(sitemap, /Object\.values\(stocks\)/);
  assert.match(sitemap, /https:\/\/www\.borsanalys\.se/);
  assert.match(sitemap, /escapeXml\(new URL\(path, baseUrl\)\.toString\(\)\)/);
  assert.match(sitemap, /<lastmod>/);
  assert.match(sitemap, /['"]\/innehav['"]/);
  assert.match(sitemap, /['"]\/aktieinnehav-och-intressekonflikter['"]/);
  assert.match(sitemap, /uniqueEntries/);
  assert.doesNotMatch(sitemap, /\/analyser\/nvidia/);
  assert.doesNotMatch(sitemap, /\/borsskolan/);
  assert.doesNotMatch(sitemap, /\/admin/);
  assert.doesNotMatch(sitemap, /\/api/);
  assert.doesNotMatch(sitemap, /\/profil/);
  assert.doesNotMatch(sitemap, /\/mina-checklistor/);
  assert.doesNotMatch(sitemap, /\/preview/);
  assert.doesNotMatch(sitemap, /\/makro/);
});

test('public routes derive metadata and structured data from their registries', async () => {
  const [home, analysis, guideDetail, stockHub] = await Promise.all([
    source('src/pages/Home.tsx'),
    source('src/pages/Analysis.tsx'),
    source('src/pages/GuideDetail.tsx'),
    source('src/components/StockHub.tsx'),
  ]);

  assert.match(home, /buildWebsiteJsonLd/);
  assert.match(home, /canonical="\/"/);
  assert.match(analysis, /buildArticleJsonLd/);
  assert.match(analysis, /buildBreadcrumbJsonLd/);
  assert.match(analysis, /title=\{analysis\.title\}/);
  assert.match(analysis, /description=\{analysis\.summary\}/);
  assert.match(analysis, /const analysisPath = `\/analys\/\$\{analysis\.slug\}`/);
  assert.match(analysis, /canonical=\{analysisPath\}/);
  assert.match(analysis, /publishedTime=\{analysis\.date\}/);
  const v10Branch = analysis
    .split('if (analysis.templateVersion === "v10") {')[1]
    .split('// Use the new comprehensive analysis template')[0];
  assert.match(v10Branch, /<ComprehensiveAnalysisV10/);
  assert.match(v10Branch, /\{analysisMeta\}/);
  assert.match(guideDetail, /buildArticleJsonLd/);
  assert.match(guideDetail, /buildBreadcrumbJsonLd/);
  assert.match(guideDetail, /title=\{guide\.seoTitle \|\| guide\.title\}/);
  assert.match(guideDetail, /description=\{guide\.metaDescription \|\| guide\.excerpt\}/);
  assert.match(guideDetail, /const guidePath = `\/guider\/\$\{guide\.slug\}`/);
  assert.match(guideDetail, /canonical=\{guidePath\}/);
  assert.match(guideDetail, /publishedTime=\{guide\.publishedDate\}/);
  assert.match(stockHub, /buildBreadcrumbJsonLd/);
  assert.match(stockHub, /title=\{stock\.name\}/);
  assert.match(stockHub, /description=\{stock\.description\}/);
  assert.match(stockHub, /const stockPath = `\/aktier\/\$\{stock\.slug\}`/);
  assert.match(stockHub, /canonical=\{stockPath\}/);
});

test('delayed deep-dive components leave SEO ownership to the analysis route', async () => {
  const deepDives = await Promise.all([
    source('src/components/analysis/NibeDeepDive.tsx'),
    source('src/components/analysis/ABBDeepDive.tsx'),
  ]);

  for (const deepDive of deepDives) {
    assert.doesNotMatch(deepDive, /import SEO from ["']\.\.\/SEO["']/);
    assert.doesNotMatch(deepDive, /<SEO\b/);
  }
});

test('RevolutionRace aliases use the shared registry entry and canonical article metadata', async () => {
  const [app, preview, registry, revolutionRace] = await Promise.all([
    source('src/App.tsx'),
    source('src/pages/RvrcPreview.tsx'),
    source('src/data/analyses/index.ts'),
    source('src/data/analyses/revolutionrace/revolutionrace-2026.ts'),
  ]);

  const canonicalRoute = app.indexOf('<Route path="/analys/revolutionrace-2026" element={<RvrcPreview />} />');
  const aliasRoute = app.indexOf('<Route path="/analys/rvrc-2026" element={<RvrcPreview />} />');
  const dynamicRoute = app.indexOf('<Route path="/analys/:slug" element={<Analysis />} />');

  assert.ok(canonicalRoute !== -1 && canonicalRoute < dynamicRoute);
  assert.ok(aliasRoute !== -1 && aliasRoute < dynamicRoute);
  assert.match(registry, /"revolutionrace-2026": revolutionRace2026/);
  assert.match(revolutionRace, /slug: "revolutionrace-2026"/);
  assert.match(preview, /import \{ analyses \} from ["']\.\.\/data\/analyses["']/);
  assert.match(preview, /const rvrcAnalysis = analyses\["revolutionrace-2026"\]/);
  assert.match(preview, /title=\{rvrcAnalysis\.title\}/);
  assert.match(preview, /description=\{rvrcAnalysis\.summary\}/);
  assert.match(preview, /canonical="\/analys\/revolutionrace-2026"/);
  assert.match(preview, /ogType="article"/);
  assert.match(preview, /ogImage="\/og-image\.png"/);
  assert.match(preview, /publishedTime=\{rvrcAnalysis\.date\}/);
  assert.match(preview, /buildArticleJsonLd\(/);
  assert.match(preview, /buildBreadcrumbJsonLd\(/);
});

test('SBB keeps an ISO registry date and its existing visible date label', async () => {
  const [analysisType, sbb, archive, comprehensiveAnalysis, disclaimer] = await Promise.all([
    source('src/types/analysis.ts'),
    source('src/data/analyses/sbb/sbb.ts'),
    source('src/components/analysis/AnalysisArchive.tsx'),
    source('src/components/analysis/ComprehensiveAnalysis.tsx'),
    source('src/components/analysis/AnalysisDisclaimer.tsx'),
  ]);

  assert.match(analysisType, /displayDate\?: string/);
  assert.match(sbb, /date: "2026-04-17"/);
  assert.match(sbb, /displayDate: "17 april 2026"/);
  assert.doesNotMatch(sbb, /date: "17 april 2026"/);
  assert.match(archive, /analysis\.displayDate \|\| analysis\.date/);
  assert.match(comprehensiveAnalysis, /data\.displayDate \|\| data\.date/);
  assert.match(disclaimer, /analysisDate=\{analysisData\.displayDate \|\| analysisData\.date\}/);
});

test('public index pages declare stable canonical metadata while private pages remain noindex', async () => {
  const [guides, terminology, macro, tools, about, contact, app, checklists] = await Promise.all([
    source('src/pages/Guides.tsx'),
    source('src/pages/Terminology.tsx'),
    source('src/pages/MacroDashboard.tsx'),
    source('src/pages/Tools.tsx'),
    source('src/pages/About.tsx'),
    source('src/pages/Contact.tsx'),
    source('src/App.tsx'),
    source('src/pages/MyChecklists.tsx'),
  ]);

  for (const page of [guides, terminology, macro, tools, about, contact]) {
    assert.match(page, /import SEO from ["']\.\.\/components\/SEO["']/);
    assert.match(page, /<SEO/);
    assert.match(page, /ogImage="\/og-image\.png"/);
  }

  assert.match(guides, /canonical="\/guider"/);
  assert.match(terminology, /canonical="\/skola"/);
  assert.match(macro, /canonical="\/marknad"/);
  assert.match(tools, /canonical=\{location\.pathname\}/);
  assert.match(about, /canonical="\/om-oss"/);
  assert.match(contact, /canonical="\/kontakt"/);
  assert.match(app, /<SEO title=\{title\} noindex nofollow \/>/);
  assert.match(checklists, /<SEO title="Mina checklistor" noindex nofollow \/>/);
});
