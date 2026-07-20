import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const methodologyUrl = new URL("../src/components/Methodology/data.ts", import.meta.url);
const methodologySectionUrl = new URL("../src/components/MethodologySection.tsx", import.meta.url);
const homeUrl = new URL("../src/pages/Home.tsx", import.meta.url);

test("homepage methodology section uses the RevolutionRace 35-point explanation model", async () => {
  const methodology = await readFile(methodologyUrl, "utf8");
  const methodologySection = await readFile(methodologySectionUrl, "utf8");
  const home = await readFile(homeUrl, "utf8");

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

  assert.match(methodologySection, /METHODOLOGY_STEPS\.slice\(0, 7\)/);
  assert.match(methodology, /sju kategorierna till 25\/35 poäng/);
  assert.match(home, /25\/35 poäng/);
  assert.doesNotMatch(methodology, /Strategisk analys & Moat/);
  assert.doesNotMatch(methodology, /ESG & Makro/);
  assert.doesNotMatch(methodology, /AI-observationer/);
  assert.doesNotMatch(methodologySection, /Strategisk analys & Moat/);
  assert.doesNotMatch(methodologySection, /ESG & Makro/);
  assert.doesNotMatch(methodologySection, /AI-observationer/);
  assert.doesNotMatch(home, /32\/40/);
});
