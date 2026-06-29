import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Plejd analysis follows the deep-dive four-file pattern", async () => {
  const [data, component, componentIndex, analysisPage] = await Promise.all([
    source("src/data/analyses/plejd/plejd-q1-2026.ts"),
    source("src/components/analysis/PlejdDeepDive.tsx"),
    source("src/components/analysis/index.ts"),
    source("src/pages/Analysis.tsx"),
  ]);

  assert.match(data, /deepDiveComponent:\s*["']Plejd["']/);
  assert.match(component, /Plejd_aktieanalys_superanalys\.md\?raw/);
  assert.match(component, /plejd_sankey_Q1_2026\.html\?raw/);
  assert.match(component, /srcDoc=\{sanitizedSankeyHtml\}/);
  assert.match(componentIndex, /PlejdDeepDive/);
  assert.match(analysisPage, /import PlejdDeepDive/);
  assert.match(analysisPage, /Plejd:\s*PlejdDeepDive/);
});

test("Plejd component keeps the original markdown as the content source", async () => {
  const [markdown, component] = await Promise.all([
    source("analyses/Plejd_aktieanalys_superanalys.md"),
    source("src/components/analysis/PlejdDeepDive.tsx"),
  ]);

  assert.ok(markdown.includes("## Slutlig Bedömning"));
  assert.match(component, /const markdownSource\s*=\s*plejdMarkdown/);
  assert.doesNotMatch(component, /Plejd AB har etablerat en särställning/);
});
