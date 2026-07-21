import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const read = (path) => fs.readFile(new URL("../" + path, import.meta.url), "utf8");

test("market update is part of the canonical analysis model and archive filters", async () => {
  const [types, filters, archive, panel, registry] = await Promise.all([
    read("src/types/analysis.ts"),
    read("src/hooks/useAnalysisFilters.ts"),
    read("src/components/analysis/AnalysisArchive.tsx"),
    read("src/components/analysis/FilterPanel.tsx"),
    read("src/data/analyses/index.ts"),
  ]);

  assert.match(types, /export type ContentType = .*"market-update"/);
  assert.match(types, /relatedAnalysisSlug\?: string/);
  assert.match(filters, /market-update/);
  assert.match(filters, /Marknadsuppdateringar/);
  assert.match(archive, /Marknadsuppdateringar/);
  assert.match(panel, /market-update/);
  assert.match(registry, /revolutionrace-iciw/);
});

test("RVRC market update uses the existing full RevolutionRace analysis as its relation", async () => {
  const [update, base] = await Promise.all([
    read("src/data/analyses/revolutionrace/revolutionrace-iciw.ts"),
    read("src/data/analyses/revolutionrace/revolutionrace-2026.ts"),
  ]);

  assert.match(update, /contentType:\s*"market-update"/);
  assert.match(update, /relatedAnalysisSlug:\s*"revolutionrace-2026"/);
  assert.match(base, /contentType:\s*"analysis"/);
});
