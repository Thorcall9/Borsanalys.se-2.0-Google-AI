import assert from "node:assert/strict";
import {
  NEW_WAVE_V112_REFERENCE_PRICE,
  NEW_WAVE_V112_VALUATION_DATE,
  newWaveGroupV112RiskRewardZones,
  newWaveGroupV112Scenarios,
  newWaveGroupV112WeightedFairValue,
  newWaveGroupV112YearsToValuation,
} from "../src/data/analyses/new-wave-group/new-wave-group-v11-2-model.js";
import { newWaveGroupV112 } from "../src/data/analyses/new-wave-group/new-wave-group-v11-2.js";
import { analyses } from "../src/data/analyses/index.js";

const tolerance = 1e-9;
const probability = newWaveGroupV112Scenarios.reduce(
  (sum, scenario) => sum + scenario.probability,
  0,
);
const weighted = newWaveGroupV112Scenarios.reduce(
  (sum, scenario) => sum + scenario.probability * scenario.fairValue,
  0,
);

assert.ok(Math.abs(probability - 1) < tolerance, "Scenario probabilities must total 100%");
assert.ok(
  newWaveGroupV112Scenarios.every(
    (scenario) =>
      Math.abs(scenario.revenue * scenario.ebitMargin - scenario.ebit) < tolerance &&
      Math.abs(scenario.ebit * scenario.netIncomeConversion - scenario.netIncome) < tolerance &&
      Math.abs(scenario.netIncome / scenario.sharesMillions - scenario.eps) < tolerance &&
      Math.abs(scenario.eps * scenario.peMultiple - scenario.fairValue) < tolerance,
  ),
  "Every scenario must follow the documented valuation bridge",
);
assert.ok(Math.abs(weighted - newWaveGroupV112WeightedFairValue) < tolerance);
assert.ok(Math.abs(newWaveGroupV112WeightedFairValue - 123.6048) < 0.001);
assert.ok(Math.abs(newWaveGroupV112YearsToValuation - 2.288843258) < 0.000000001);
assert.equal(NEW_WAVE_V112_REFERENCE_PRICE, 91.35);
assert.equal(NEW_WAVE_V112_VALUATION_DATE, "2028-12-31");
assert.equal(newWaveGroupV112RiskRewardZones.status, "DRAFT");
assert.equal(newWaveGroupV112RiskRewardZones.visibility, "MEMBER");
assert.equal(newWaveGroupV112.slug, "new-wave-group-september-2026");
assert.equal(newWaveGroupV112.published, false);
assert.equal(newWaveGroupV112.templateVersion, "v11");
assert.equal(newWaveGroupV112.v11?.publicationStatus, "NOT_PUBLISH_READY");
assert.equal(newWaveGroupV112.v11?.recommendationStatus, "DRAFT");
assert.equal(newWaveGroupV112.v11?.riskRewardZones?.status, "DRAFT");
assert.equal(analyses["new-wave-group-september-2026"], newWaveGroupV112);
assert.equal(analyses["new-wave-group-april-2026"].slug, "new-wave-group-april-2026");
