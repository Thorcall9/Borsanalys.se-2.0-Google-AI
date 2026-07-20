import test from "node:test";
import assert from "node:assert/strict";
import {
  CANONICAL_RECOMMENDATIONS,
  RECOMMENDATION_DEFINITIONS,
  isCanonicalRecommendation,
  assertCanonicalRecommendation,
} from "../src/lib/recommendation.ts";
import { mapLegacyRecommendationForMigration } from "./helpers/legacyRecommendationMigration.mjs";

test("v10 exposes exactly three canonical recommendations", () => {
  assert.deepEqual(CANONICAL_RECOMMENDATIONS, ["KÖP", "BEVAKA", "AVSTÅ"]);
  assert.deepEqual(Object.keys(RECOMMENDATION_DEFINITIONS), ["KÖP", "BEVAKA", "AVSTÅ"]);
});

test("canonical validation rejects legacy or unrelated values", () => {
  assert.equal(isCanonicalRecommendation("KÖP"), true);
  assert.equal(isCanonicalRecommendation("BEVAKA"), true);
  assert.equal(isCanonicalRecommendation("AVSTÅ"), true);
  assert.equal(isCanonicalRecommendation("AVVAKTA"), false);
  assert.equal(isCanonicalRecommendation("SÄLJ"), false);
  assert.equal(isCanonicalRecommendation(undefined), false);
  assert.doesNotThrow(() => assertCanonicalRecommendation("BEVAKA"));
  assert.throws(() => assertCanonicalRecommendation("AVVAKTA", "Apple"), /Apple/);
});

test("migration helper only maps explicitly reviewed legacy analyses", () => {
  assert.equal(
    mapLegacyRecommendationForMigration({ slug: "apple", recommendation: "AVVAKTA" }),
    "BEVAKA"
  );
  assert.equal(
    mapLegacyRecommendationForMigration({ slug: "axfood-q1-2026", recommendation: "AVVAKTA" }),
    "BEVAKA"
  );
  assert.equal(
    mapLegacyRecommendationForMigration({ slug: "unreviewed", recommendation: "AVVAKTA" }),
    null
  );
});
