import assert from "node:assert/strict";
import test from "node:test";
import {
  ALPHABET_ANALYSIS_DATE,
  ALPHABET_VALUATION_DATE,
  alphabetV112Dossier,
  validateAlphabetValuation,
} from "../src/data/analyses/alphabet/alphabet-v11-model";

test("Alphabet v11.2 valuation has one explicit horizon and a complete bridge", () => {
  const result = validateAlphabetValuation();

  assert.equal(ALPHABET_ANALYSIS_DATE, "2026-08-08");
  assert.equal(ALPHABET_VALUATION_DATE, "2028-12-31");
  assert.equal(alphabetV112Dossier.identity.valuationYearLabel, "2028E");
  assert.equal(result.probability, 1);
  assert.equal(result.scenariosMatchEbit, true);
  assert.equal(result.scenariosMatchPreTax, true);
  assert.equal(result.scenariosMatchNetIncome, true);
  assert.equal(result.scenariosMatchEps, true);
  assert.equal(result.scenariosMatchEpsTimesPe, true);
  assert.equal(result.weightedMatches, true);
});

test("Alphabet v11.2 keeps reported investment gains out of normalised EPS", () => {
  for (const scenario of alphabetV112Dossier.scenarios) {
    assert.equal(scenario.normalizedOtherIncome, 0);
    assert.ok(scenario.dilutedShares >= 12.4);
    assert.equal(scenario.preTaxIncome - scenario.taxExpense, scenario.normalizedNetIncome);
    assert.equal(scenario.preferredDividends, 0);
    assert.equal(scenario.minorityInterest, 0);
    assert.ok(scenario.fairValue > 0);
  }
});
