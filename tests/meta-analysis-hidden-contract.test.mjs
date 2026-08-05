import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, page, app, search, rss, component, canonical, meta] = await Promise.all([
  readFile(new URL("../src/data/analyses/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/pages/Analysis.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/GlobalSearch.tsx", import.meta.url), "utf8"),
  readFile(new URL("../api/rss.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/components/analysis/MetaDeepDive.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/data/analyses/meta/meta-analysis-content.md", import.meta.url), "utf8"),
  readFile(new URL("../src/data/analyses/meta/meta-2026.ts", import.meta.url), "utf8"),
]);

assert.match(index, /"meta": meta2026/);
assert.match(index, /published !== false/);
assert.match(page, /Meta: lazyDeepDive\("Meta"\)/);
assert.match(meta, /published: true/);
assert.match(app, /<Route path="\/analyser\/:slug" element={<Analysis \/>} \/>/);
assert.match(search, /filter\(isPublishedAnalysis\)/);
assert.match(rss, /filter\(isPublishedAnalysis\)/);
assert.match(component, /Meta Platforms/);
assert.match(component, /metaMarkdown/);
assert.match(component, /Meta-intäktsflöde Q2 2026/);
assert.match(component, /<svg/);
assert.match(component, /data-testid="meta-revenue-sankey"/);
assert.match(component, /min-w-\[980px\]/);
assert.match(component, /Reality Labs revenue/);
assert.match(component, /Övriga FoA-kostnader/);
assert.match(component, /Finans, skatt & övrigt/);
assert.match(component, /INTÄKTSKÄLLOR/);
assert.match(component, /SEGMENTRESULTAT/);
assert.match(component, /AnalysisLayout/);
assert.match(component, /META_V11_TRACEABILITY/);
for (const heading of [
  "Snabböversikt",
  "Investeringstes på 30 sekunder",
  "Företagsöversikt och ledning",
  "Affärsmodell och intäktsflöde",
  "Konkurrensfördelar, bransch och peers",
  "Finansiell utveckling och vinstkvalitet",
  "Scorecard",
  "Fundamental värdering",
  "Kurszoner: 12 månader och fem år",
  "Potentiella kursdrivare",
  "Riskprofil, stresstest och tesbrytare",
  "Bevakningsplan",
  "Slutsats och investeringsbeslut",
  "Normaliseringsbrygga Q2 2026",
]) assert.match(canonical, new RegExp(heading));
for (const value of ["16/20", "9/15", "25/35", "612,50 USD", "1 066,05 USD", "12,73 %", "BEVAKA", "Advertising", "FoA other revenue", "Nettoresultat", "Capex", "FCF", "OCF"]) assert.match(canonical, new RegExp(value));
