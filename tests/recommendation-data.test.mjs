import test from "node:test";
import assert from "node:assert/strict";
import { analyses } from "../src/data/analyses/index.ts";
import { CANONICAL_RECOMMENDATIONS } from "../src/lib/recommendation.ts";
import { readFile } from "node:fs/promises";

const registeredAnalyses = Object.values(analyses);

test("all registered analyses use only canonical v10 recommendations", () => {
  const invalid = registeredAnalyses.filter(
    (analysis) => !CANONICAL_RECOMMENDATIONS.includes(analysis.recommendation)
  );
  assert.deepEqual(invalid, []);
});

test("the reviewed legacy analyses are migrated to BEVAKA", () => {
  assert.equal(analyses.apple.recommendation, "BEVAKA");
  assert.equal(analyses["axfood-q1-2026"].recommendation, "BEVAKA");
});

test("only the reviewed analyses have an authored recommendation reason", () => {
  const withReasons = registeredAnalyses.filter((analysis) => analysis.recommendationReason);
  assert.deepEqual(
    withReasons.map((analysis) => analysis.slug).sort(),
    ["apple", "axfood-q1-2026"]
  );
});

test("recommendation remains an authored field separate from score", async () => {
  const scoreSource = await readFile(new URL("../src/lib/score.ts", import.meta.url), "utf8");
  assert.doesNotMatch(scoreSource, /recommendation/);
  assert.equal(analyses["axfood-q2-2026"].recommendation, "BEVAKA");
  assert.equal(analyses["axfood-q2-2026"].score, 26);
  assert.equal(analyses["axfood-q2-2026"].maxScore, 40);
});
