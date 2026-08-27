import assert from "node:assert/strict";
import test from "node:test";
import {
  ALPHABET_ANALYSIS_DATE,
  ALPHABET_REFERENCE_DATE,
  ALPHABET_VALUATION_DATE,
  alphabetRiskRewardZones,
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
  assert.equal(result.annualizationStartsAtReferenceDate, true);
});

test("Alphabet v11.2 risk/reward zones use the canonical valuation without frontend calculation", () => {
  const result = validateAlphabetValuation();

  assert.equal(ALPHABET_REFERENCE_DATE, "2026-08-07");
  assert.equal(alphabetRiskRewardZones.status, "APPROVED");
  assert.equal(alphabetRiskRewardZones.visibility, "MEMBER");
  assert.equal(alphabetRiskRewardZones.valuationDate, ALPHABET_VALUATION_DATE);
  assert.equal(alphabetRiskRewardZones.zones.length, 3);
  assert.deepEqual(alphabetRiskRewardZones.zones.map((zone) => zone.zone), ["ATTRACTIVE", "BALANCED", "WEAK"]);
  assert.deepEqual(alphabetRiskRewardZones.presentation.gauge.breakpointLabels, ["290,22 USD", "332,42 USD"]);
  assert.equal(alphabetRiskRewardZones.presentation.gauge.referenceMarkerPct, 98);
  assert.deepEqual(alphabetRiskRewardZones.presentation.gauge.scenarioSpread.points.map((point) => point.annualPotentialLabel), ["−14,6 %/år", "+3,8 %/år", "+20,5 %/år"]);
  assert.deepEqual(alphabetRiskRewardZones.presentation.memberInsight.zoneSharesPct, [32, 39, 29]);
  assert.deepEqual(alphabetRiskRewardZones.presentation.memberInsight.markers.map((marker) => marker.label), ["▼ Kurs 353 USD", "Vårt värde 387 USD"]);
  assert.deepEqual(alphabetRiskRewardZones.presentation.gauge.scenarioSpread.rangeSharesPct, [46.5, 53.5]);
  assert.equal(alphabetRiskRewardZones.presentation.memberInsight.assessmentRationale, "Begränsad säkerhetsmarginal mot vårt sannolikhetsvägda värde samtidigt som Bear-nedsidan är betydande.");
  assert.equal(alphabetRiskRewardZones.marketReferenceAssessment.presentationHeadline, "Begränsad säkerhetsmarginal – rekommendationen är fortsatt BEVAKA.");
  assert.equal(result.riskRewardBoundariesMatch, true);
  assert.equal(result.riskRewardZonesAreOrdered, true);
  assert.ok(Math.abs(alphabetV112Dossier.valuation.annualizedPotentialPct - 0.038117630492266574) < 1e-12);
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
