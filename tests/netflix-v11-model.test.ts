import assert from "node:assert/strict";
import test from "node:test";
import { alphabetV112Dossier } from "../src/data/analyses/alphabet/alphabet-v11-model";
import {
  NETFLIX_ANALYSIS_DATE,
  NETFLIX_REFERENCE_PRICE,
  NETFLIX_VALUATION_DATE,
  netflixFacts,
  netflixScenarios,
  netflixStressTest,
  netflixV112Dossier,
  netflixWbdNormalization,
  validateNetflixValuation,
} from "../src/data/analyses/netflix/netflix-v11-model";

test("Netflix v11.2 valuation bridge is arithmetically consistent", () => {
  const result = validateNetflixValuation();
  assert.equal(NETFLIX_ANALYSIS_DATE, "2026-08-14");
  assert.equal(NETFLIX_VALUATION_DATE, "2028-12-31");
  assert.equal(result.probability, 1);
  assert.equal(result.scenariosMatchRevenue, true);
  assert.equal(result.scenariosMatchEbit, true);
  assert.equal(result.scenariosMatchEps, true);
  assert.equal(result.scenariosMatchValue, true);
  assert.equal(result.weightedMatches, true);
  assert.ok(netflixV112Dossier.valuation.totalPotentialPct > 0);
  assert.ok(netflixV112Dossier.valuation.annualizedPotentialPct > 0);
});

test("Netflix keeps WBD outside EBIT and non-recurring FCF out of recurring capacity", () => {
  const claim = netflixV112Dossier.claims.find((item) => item.id === "nflx-wbd");
  assert.match(claim?.text ?? "", /Interest and other income/);
  assert.match(claim?.text ?? "", /inte i EBIT/);
  assert.equal(netflixWbdNormalization.status, "NOT_DECISION_GRADE");
  assert.ok(netflixWbdNormalization.normalizedFcfGuideRange[0] < netflixWbdNormalization.reportedFcfGuide);
  assert.equal(netflixFacts.wbdTerminationFee, 2.8);
});

test("Netflix share-repurchase bridge is internally feasible against scenario FCF", () => {
  const result = validateNetflixValuation();
  assert.equal(result.scenarioShareBridgesMatch, true);
  assert.equal(result.repurchasesAreFcfFeasible, true);
  for (const scenario of netflixScenarios) {
    assert.ok(scenario.repurchasesToFcf > 0);
    assert.ok(scenario.repurchasesToFcf <= 0.8);
    assert.ok(scenario.normalizedFcf > 0);
  }
});

test("Netflix stress test is separate from probability-weighted scenarios", () => {
  assert.equal(netflixStressTest.revenue, 55);
  assert.ok(Math.abs(netflixStressTest.ebit - 15.4) < 1e-9);
  assert.equal(netflixStressTest.peMultiple, 16);
  assert.ok(netflixStressTest.fairValue < NETFLIX_REFERENCE_PRICE);
  assert.ok(netflixStressTest.totalPotentialPct < -0.3);
});

test("company dossiers do not leak company-specific scenario fields or WBD notes", () => {
  const alphabet = JSON.stringify(alphabetV112Dossier);
  const netflix = JSON.stringify(netflixV112Dossier);
  assert.doesNotMatch(alphabet, /NFLX|Netflix|WBD|78\.24|3\.856/);
  assert.doesNotMatch(netflix, /GOOG|Alphabet|Google Cloud|Search & other/);
  assert.equal(netflixV112Dossier.identity.companyId, "netflix-inc");
  assert.equal(alphabetV112Dossier.identity.companyId, "alphabet-inc");
});
