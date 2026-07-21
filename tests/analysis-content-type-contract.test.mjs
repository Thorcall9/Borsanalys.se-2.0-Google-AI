import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const indexSource = await readFile(
  new URL("../src/data/analyses/index.ts", import.meta.url),
  "utf8"
);
const axfoodQ1Source = await readFile(
  new URL("../src/data/analyses/axfood/axfood-q1-2026.ts", import.meta.url),
  "utf8"
);
const axfoodQ2Source = await readFile(
  new URL("../src/data/analyses/axfood/axfood-q2-2026.ts", import.meta.url),
  "utf8"
);
const dataSources = await Promise.all(
  [
    "abb/abb-q1-2026.ts",
    "alphabet/alphabet.ts",
    "apple/apple.ts",
    "aq-group/aq-group.ts",
    "axfood/axfood-q1-2026.ts",
    "axfood/axfood-q2-2026.ts",
  "ericsson/ericsson-2025.ts",
  "ericsson/ericsson.ts",
    "evolution/evolution-2025.ts",
    "handelsbanken/handelsbanken-2025.ts",
    "investor/investor-ab.ts",
    "inwido/inwido-2026.ts",
    "microsoft/microsoft.ts",
    "new-wave-group/new-wave-group.ts",
    "nibe/nibe-2026.ts",
    "nordea/nordea-bank-2026.ts",
    "novo-nordisk/novo-nordisk.ts",
    "nvidia/nvidia-fy2026.ts",
    "plejd/plejd-q1-2026.ts",
    "revolutionrace/revolutionrace-2026.ts",
    "revolutionrace/revolutionrace-iciw.ts",
    "saab/saab-2026.ts",
    "sbb/sbb.ts",
    "swedbank/swedbank-2025.ts",
    "volvo/volvo.ts",
  ].map((path) => readFile(new URL(`../src/data/analyses/${path}`, import.meta.url), "utf8"))
);
const typeSource = await readFile(
  new URL("../src/types/analysis.ts", import.meta.url),
  "utf8"
);
const hookSource = await readFile(
  new URL("../src/hooks/useAnalysisFilters.ts", import.meta.url),
  "utf8"
);
const pageSource = await readFile(
  new URL("../src/pages/Analysis.tsx", import.meta.url),
  "utf8"
);
const cardSource = await readFile(
  new URL("../src/components/analysis/AnalysisCard.tsx", import.meta.url),
  "utf8"
);
const vercelSource = await readFile(
  new URL("../vercel.json", import.meta.url),
  "utf8"
);

test("the shared model requires the explicit publication content types", () => {
  assert.match(typeSource, /type ContentType = ['"]analysis['"] \| ['"]report-commentary['"] \| ['"]market-update['"] \| ['"]guide['"] \| ['"]other['"]/);
  assert.match(typeSource, /contentType: ContentType/);
  assert.doesNotMatch(typeSource, /contentType\?:/);
});

test("report comments and market updates are explicitly classified", () => {
  const reportComments = dataSources.filter((source) => /contentType: ['"]report-commentary['"]/.test(source));
  const marketUpdates = dataSources.filter((source) => /contentType: ['"]market-update['"]/.test(source));
  const analyses = dataSources.filter((source) => /contentType: ['"]analysis['"]/.test(source));
  assert.equal(reportComments.length, 1);
  assert.equal(marketUpdates.length, 1);
  assert.equal(analyses.length, dataSources.length - 2);
  assert.match(axfoodQ2Source, /slug: ['"]axfood-q2-2026['"]/);
  assert.match(axfoodQ2Source, /contentType: ['"]report-commentary['"]/);
  assert.match(axfoodQ1Source, /slug: ['"]axfood-q1-2026['"]/);
  assert.match(axfoodQ1Source, /contentType: ['"]analysis['"]/);
});

test("the archive filter uses the Swedish typ parameter and no production fallback", () => {
  assert.match(hookSource, /PARAM_TYPE = ['"]typ['"]/);
  assert.match(hookSource, /analys: ['"]analysis['"]/);
  assert.match(hookSource, /rapportkommentar: ['"]report-commentary['"]/);
  assert.match(hookSource, /analysis: ['"]analys['"]/);
  assert.match(hookSource, /['"]rapportkommentar['"]/);
  assert.match(hookSource, /back\/forward buttons/);
  assert.match(hookSource, /\[searchParams\]/);
  assert.doesNotMatch(hookSource, /a\.contentType \|\| ['"]analysis['"]/);
});

test("the archive keeps the shared /analys route and canonical", () => {
  assert.match(pageSource, /title="Analysarkiv/);
  assert.match(pageSource, /canonical=["']\/analys["']/);
  assert.doesNotMatch(pageSource, /rapportkommentar\//);
  assert.match(vercelSource, /\/analys/);
  assert.match(vercelSource, /\/analyser/);
});

test("the common analysis card exposes both content types without separate markup", () => {
  assert.match(hookSource, /analysis: ['"]ANALYS['"]/);
  assert.match(hookSource, /['"]report-commentary['"]: ['"]RAPPORTKOMMENTAR['"]/);
  assert.match(cardSource, /contentType/);
  assert.match(cardSource, /CONTENT_TYPE_BADGE_LABELS/);
  assert.match(cardSource, /to=\{`\/analys\/\$\{a\.slug\}`\}/);
});

test("the score sort is percentage-based and the upside sort is removed", () => {
  assert.match(hookSource, /SortOption = 'latest' \| 'updated' \| 'score'/);
  assert.match(hookSource, /score: 'Högst poäng'/);
  assert.doesNotMatch(hookSource, /Högst uppsida/);
  assert.doesNotMatch(hookSource, /'upside'/);
});
