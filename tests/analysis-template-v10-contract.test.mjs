import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const componentUrl = new URL("../src/components/analysis/analysisTemplateV10.ts", import.meta.url);
const pageUrl = new URL("../src/pages/Analysis.tsx", import.meta.url);

test("v10 section contract has the ten PDF sections in order", async () => {
  const source = await readFile(componentUrl, "utf8");
  const expected = [
    ["company-management", "I", "Företag & ledning"],
    ["business-model", "II", "Affärsmodell"],
    ["industry-moat", "III", "Bransch & moat"],
    ["financial-quality", "IV", "Finansiell kvalitet"],
    ["scorecard", "V", "Scorecard"],
    ["fundamental-valuation", "VI", "Fundamental värdering"],
    ["catalysts", "VII", "Kursdrivare"],
    ["risks", "VIII", "Risker"],
    ["thesis-changers", "IX", "Tesförändrare"],
    ["investment-decision", "X", "Investeringsbeslut"],
  ];

  assert.match(source, /export const V10_ANALYSIS_SECTIONS/);
  assert.equal((source.match(/id: "/g) || []).length, 10);
  let previousIndex = -1;
  for (const [id, number, title] of expected) {
    assert.match(source, new RegExp(`id: "${id}"`));
    assert.match(source, new RegExp(`number: "${number}"`));
    const titleIndex = source.indexOf(`title: "${title}"`);
    assert.notEqual(titleIndex, -1);
    assert.ok(titleIndex > previousIndex);
    previousIndex = titleIndex;
  }
});

test("analysis routing selects v10 only for explicitly versioned analyses", async () => {
  const source = await readFile(pageUrl, "utf8");
  assert.match(source, /templateVersion\s*===\s*["']v10["']/);
  assert.match(source, /ComprehensiveAnalysisV10/);
  assert.match(source, /ComprehensiveAnalysis/);
});
