import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const trackedSources = [
  "src/App.tsx",
  "src/pages/StockChecklist.tsx",
  "src/components/AnalysisProgress.tsx",
  "src/components/community/SavedChecklists.tsx",
];

const sources = await Promise.all(
  trackedSources.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8"))
);

test("recommendation reason is never sent to analytics", () => {
  for (const source of sources) assert.doesNotMatch(source, /recommendationReason/);
});
