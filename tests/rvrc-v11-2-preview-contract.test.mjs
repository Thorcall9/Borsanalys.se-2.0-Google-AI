import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const previewRoute = "/preview/revolutionrace-v11-2-2026";

test("RVRC v11.2 is an unlisted preview with the v11.2 analysis-detail structure", async () => {
  const [app, page, analysisIndex, sitemap, vercelConfig, source] = await Promise.all([
    readFile(new URL("src/App.tsx", root), "utf8"),
    readFile(new URL("src/pages/RvrcV112Preview.tsx", root), "utf8"),
    readFile(new URL("src/data/analyses/index.ts", root), "utf8"),
    readFile(new URL("api/sitemap.ts", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
    readFile(new URL("analyses/RVRC/RVRC_aktieanalys_v11_2_september2026.md", root), "utf8"),
  ]);

  assert.match(app, /RvrcV112Preview/);
  assert.match(app, new RegExp(`<Route path="${previewRoute}" element={<RvrcV112Preview />} />`));
  assert.doesNotMatch(page, /AnalysisLayout/);
  assert.match(page, /noIndex/);
  assert.match(page, /Investment Snapshot/);
  assert.match(page, /Sannolikhetsvägt värde/);
  assert.match(page, /Total värdepotential/);
  assert.match(page, /Annualiserad värdepotential/);
  assert.match(page, /KÖP.*MEDEL–HÖG RISK/);
  assert.match(page, /73,1 kr/);
  assert.match(page, /EV\/EBIT – sekundär värderingskontroll/);
  assert.match(page, /Vad händer om balansräkningen avviker\?/);
  assert.match(page, /Bekräftad – MEDIUM confidence/);
  assert.match(page, /md:hidden/);
  assert.match(page, /md:block/);
  assert.match(page, /Varför caset är intressant/);
  assert.match(page, /Börsanalys\.se:s insikt/);
  assert.match(page, /Vad måste bevisas för att caset ska fungera\?/);
  assert.match(page, /Tre utfall – inte en falsk exakt riktkurs/);
  assert.match(page, /Se hur vi har räknat/);
  assert.match(page, /När blir risk\/reward mer attraktiv\?/);
  assert.match(page, /Det här följer vi först/);
  assert.match(page, /Skapa gratis konto/);
  assert.match(page, /const isMember = Boolean\(user\)/);
  assert.match(page, /isMember &&/);
  assert.match(page, /Fördjupning och spårbarhet/);
  assert.match(page, /M&A, earn-out och balansräkning/);
  assert.match(page, /Q1-scorecard/);
  assert.match(page, /isMember &&/);
  assert.match(source, /"totalValuePotential": 0\.485/);
  assert.match(source, /"visibility": "MEMBER"/);
  assert.match(source, /MarketScreener, RVRC Holding – Forecast Balance Sheet/);
  assert.match(source, /kontroll den 25 september 2026/);
  assert.match(page, /MarketScreener, Forecast Balance Sheet/);
  assert.match(page, /kontrollerad 25 september 2026/);
  const obsolete = /NOT_DECISION_GRADE|EV\/EBIT används inte|EV\/EBIT är inte beslutsgrundande|återaktivera EV\/EBIT|kan EV\/EBIT återaktiveras/i;
  assert.doesNotMatch(page, obsolete);
  assert.doesNotMatch(source, obsolete);
  const canonical = JSON.parse(source.match(/```json\s*([\s\S]*?)```/)[1]);
  assert.equal(canonical.method, "Normaliserad EPS × P/E");
  assert.equal(canonical.recommendation, "KÖP");
  assert.equal(canonical.risk, "MEDEL_HÖG");
  assert.equal(canonical.marketReference, 49.22);
  assert.equal(canonical.marketReferenceDate, "2026-09-23");
  assert.equal(canonical.valuationDate, "2029-06-30");
  assert.deepEqual([canonical.scenarios.bear.probability, canonical.scenarios.base.probability, canonical.scenarios.bull.probability], [0.30, 0.55, 0.15]);
  assert.deepEqual([canonical.scenarios.bear.value, canonical.scenarios.base.value, canonical.scenarios.bull.value], [45.5, 80, 102.8]);
  assert.equal(canonical.evEbitConfidence, "MEDIUM");
  for (const scenario of ["bear", "base", "bull"]) {
    const ev = canonical.evEbitCrossCheck[scenario];
    const pe = canonical.scenarios[scenario];
    assert.equal(ev.ebitMsek * ev.evEbit, ev.enterpriseValueMsek);
    assert.equal(ev.enterpriseValueMsek + ev.netCashMsek + ev.nciPutMsek, ev.equityValueMsek);
    assert.ok(Math.abs(ev.equityValueMsek / ev.dilutedSharesMillion - ev.valuePerShare) < 0.051);
    assert.ok(Math.abs(pe.eps * pe.pe - pe.value) < 0.051);
  }
  const weightedPe = Object.values(canonical.scenarios).reduce((sum, scenario) => sum + scenario.probability * scenario.value, 0);
  assert.equal(Math.round(weightedPe * 10) / 10, canonical.weightedTerminalValue);
  assert.deepEqual(canonical.priceZones, { attractiveMax: 53.4, balancedMin: 53.4, balancedMax: 60.6, weakMin: 60.6 });
  assert.equal(canonical.hurdleRate, 0.12);
  assert.doesNotMatch(analysisIndex, /revolutionrace-v11-2-2026/);
  assert.doesNotMatch(sitemap, /revolutionrace-v11-2-2026/);
  assert.match(vercelConfig, /"source": "\/preview\/:path\*"/);
});
