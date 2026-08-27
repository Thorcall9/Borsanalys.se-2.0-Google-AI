import assert from "node:assert/strict";
import test from "node:test";
import { microsoft } from "../src/data/analyses/microsoft/microsoft";

test("Microsoft risk/reward preserves the approved model and zones", () => {
  const zones = microsoft.v11?.riskRewardZones;
  assert.ok(zones);
  assert.equal(microsoft.v11?.valuationDate, "2028-12-31");
  assert.equal(zones.valuationDate, "2028-12-31");
  assert.equal(zones.status, "APPROVED");
  assert.equal(zones.visibility, "MEMBER");
  assert.deepEqual(zones.zones.map((zone) => zone.priceLabel), ["Under 465 USD", "465–585 USD", "Från 585 USD"]);
  assert.equal(microsoft.scenarios.find((scenario) => scenario.label === "Bear")?.cagr, "−1,8%");
  assert.equal(microsoft.scenarios.find((scenario) => scenario.label === "Base")?.cagr, "+13,5%");
  assert.equal(microsoft.scenarios.find((scenario) => scenario.label === "Bull")?.cagr, "+27,6%");
});

test("Microsoft member presentation uses pre-approved canonical scale inputs", () => {
  const insight = microsoft.v11?.riskRewardZones?.memberInsight;
  assert.ok(insight);
  assert.equal(insight.referencePriceLabel, "499,99 USD");
  assert.equal(insight.assessmentLabel, "Balanserad risk/reward");
  assert.deepEqual(insight.markers?.map((marker) => marker.label), ["▼ Kurs 500 USD", "Vårt värde 683 USD"]);
  assert.deepEqual(insight.scenarioSpread?.points.map((point) => point.annualPotentialLabel), ["−1,8 %/år", "+13,9 %/år", "+27,6 %/år"]);
  assert.deepEqual(insight.scenarioSpread?.rangeSharesPct, [48.80382775119617, 51.19617224880383]);
});
