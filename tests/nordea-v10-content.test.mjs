import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { nordea2026 } from "../src/data/analyses/nordea/nordea-bank-2026.ts";

const renderer = fs.readFileSync(
  new URL("../src/components/analysis/ComprehensiveAnalysisV10.tsx", import.meta.url),
  "utf8",
);

test("v10 renders every populated Nordea content block", () => {
  const requiredFields = [
    "managementAnalysis",
    "managementTables",
    "managementMotivation",
    "financialTimeline",
    "financialMotivation",
    "growthTables",
    "growthMotivation",
    "esg",
    "aiTables",
    "aiMotivation",
  ];

  for (const field of requiredFields) {
    assert.ok(nordea2026[field], `Nordea should provide ${field}`);
    assert.match(renderer, new RegExp(`data\\.${field}\\b`), `v10 should render ${field}`);
  }
});
