import assert from "node:assert/strict";
import test from "node:test";
import { meta2026, meta2026CanonicalValuation } from "../src/data/analyses/meta/meta-2026";

test("Meta risk/reward uses the approved 2027 valuation horizon and exact model values", () => {
  const zones = meta2026.v11?.riskRewardZones;
  assert.ok(zones);
  assert.equal(meta2026.v11?.valuationDate, "2027-12-31");
  assert.equal(zones.valuationDate, "2027-12-31");
  assert.equal(meta2026CanonicalValuation.weightedFairValue, 764.405);
  assert.deepEqual(zones.zones.map((zone) => zone.priceLabel), ["Under 575 USD", "575–675 USD", "Från 675 USD"]);
});

test("Meta member presentation contains approved static scale inputs", () => {
  const insight = meta2026.v11?.riskRewardZones?.memberInsight;
  assert.ok(insight);
  assert.equal(insight.assessmentLabel, "Balanserad risk/reward");
  assert.deepEqual(insight.markers?.map((marker) => marker.label), ["▼ Kurs 592 USD", "Vårt värde 764 USD"]);
  assert.deepEqual(insight.scenarioSpread?.points.map((point) => point.annualPotentialLabel), ["−11,4 %/år", "+20,0 %/år", "+51,2 %/år"]);
  assert.deepEqual(insight.scenarioSpread?.rangeSharesPct, [47.56305998344787, 52.436940016552114]);
});
