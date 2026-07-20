import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { CANONICAL_RECOMMENDATIONS, RECOMMENDATION_FILTER_OPTIONS } from "../src/lib/recommendation.ts";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [hookSource, panelSource, searchSource] = await Promise.all([
  read("src/hooks/useAnalysisFilters.ts"),
  read("src/components/analysis/FilterPanel.tsx"),
  read("src/components/GlobalSearch.tsx"),
]);

test("recommendation filter contains Alla and only canonical v10 values", () => {
  assert.deepEqual(RECOMMENDATION_FILTER_OPTIONS, ["Alla", ...CANONICAL_RECOMMENDATIONS]);
  assert.match(panelSource, /RECOMMENDATION_FILTER_OPTIONS/);
  assert.doesNotMatch(panelSource, /AVVAKTA|SÄLJ|BEHÅLL|NEUTRAL/);
});

test("filter and URL state do not normalize legacy labels at runtime", () => {
  assert.match(hookSource, /RECOMMENDATION_FILTER_OPTIONS/);
  assert.match(hookSource, /VALID_RECOMMENDATIONS/);
  assert.doesNotMatch(hookSource, /BUY_VARIANTS|HOLD_VARIANTS|WATCH_VARIANTS|SELL_VARIANTS/);
  assert.doesNotMatch(hookSource, /AVVAKTA|SÄLJ|BEHÅLL|NEUTRAL/);
});

test("global search uses the shared badge configuration", () => {
  assert.match(searchSource, /RECOMMENDATION_BADGE_CLASSES/);
  assert.doesNotMatch(searchSource, /recommendation === ["']SÄLJ/);
  assert.doesNotMatch(searchSource, /recommendation === ["']AVVAKTA/);
});
