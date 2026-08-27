import assert from "node:assert/strict";
import test from "node:test";
import { visa } from "../src/data/analyses/visa/visa";

test("Visa risk/reward uses the corrected FY2027 valuation horizon", () => {
  const zones = visa.v11?.riskRewardZones;
  assert.ok(zones);
  assert.equal(visa.v11?.valuationDate, "2027-09-30");
  assert.equal(zones.valuationDate, "2027-09-30");
  assert.equal(zones.status, "APPROVED");
  assert.equal(zones.visibility, "MEMBER");
  assert.deepEqual(zones.zones.map((zone) => zone.id), ["ATTRACTIVE", "BALANCED", "WEAK"]);
  assert.deepEqual(zones.zones.map((zone) => zone.priceLabel), ["Under 335 USD", "335–375 USD", "Från 375 USD"]);
  assert.equal(visa.scenarios.find((scenario) => scenario.label === "Bull")?.cagr, "+31,2%");
});

test("Visa member presentation contains only canonical scale inputs", () => {
  const insight = visa.v11?.riskRewardZones?.memberInsight;
  assert.ok(insight);
  assert.equal(insight.referencePriceLabel, "362,50 USD");
  assert.equal(insight.assessmentRationale, "Visa håller mycket hög affärskvalitet, men referenskursen lämnar begränsad säkerhetsmarginal när Bear-nedsida, litigation, reglering, A2A/open banking och multipelrisk vägs in.");
  assert.deepEqual(insight.markers?.map((marker) => marker.label), ["▼ Kurs 363 USD", "Vårt värde 395 USD"]);
  assert.deepEqual(insight.scenarioSpread?.points.map((point) => point.annualPotentialLabel), ["−15,2 %/år", "+7,7 %/år", "+31,2 %/år"]);
  assert.deepEqual(insight.scenarioSpread?.rangeSharesPct, [48.58974358974359, 51.41025641025641]);
});
