import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const methodologyUrl = new URL("../src/components/Methodology/data.ts", import.meta.url);
const mindmapUrl = new URL("../src/components/Mindmap.tsx", import.meta.url);

test("homepage methodology uses the RevolutionRace 35-point explanation model", async () => {
  const methodology = await readFile(methodologyUrl, "utf8");
  const mindmap = await readFile(mindmapUrl, "utf8");

  for (const heading of [
    "Företagsöversikt",
    "Affärsmodell",
    "Konkurrensfördelar",
    "Finansiell utveckling",
    "Fundamental värdering",
    "Potentiella kursdrivare",
    "Risker",
  ]) {
    assert.match(methodology, new RegExp(heading));
  }

  assert.match(methodology, /sju kategorierna till 25\/35 poäng/);
  assert.match(mindmap, /25/);
  assert.match(mindmap, /\/ 35/);
  assert.doesNotMatch(methodology, /Strategisk analys & Moat/);
  assert.doesNotMatch(methodology, /ESG & Makro/);
  assert.doesNotMatch(methodology, /AI-observationer/);
  assert.doesNotMatch(mindmap, />\s*32\s*</);
  assert.doesNotMatch(mindmap, /\/ 40/);
});
