import assert from "node:assert/strict";
import test from "node:test";
import { nvidiaQ2Fy2027 } from "../src/data/analyses/nvidia/nvidia-q2-fy2027";
import {
  NVIDIA_REFERENCE_DATE,
  NVIDIA_VALUATION_DATE,
  nvidiaDownsideStressTest,
  nvidiaLtm,
  nvidiaRiskRewardZones,
  nvidiaScenarios,
  nvidiaV112Dossier,
  validateNvidiaValuation,
} from "../src/data/analyses/nvidia/nvidia-q2-fy2027-model";

test("NVIDIA Q2 FY2027 valuation is internally consistent", () => {
  const validation = validateNvidiaValuation();
  assert.equal(validation.probability, 1);
  assert.equal(validation.scenariosMatchOperatingIncome, true);
  assert.equal(validation.scenariosMatchNetIncome, true);
  assert.equal(validation.scenariosMatchEps, true);
  assert.equal(validation.scenariosMatchValue, true);
  assert.equal(validation.scenariosMatchFcf, true);
  assert.equal(validation.weightedMatches, true);
  assert.equal(validation.annualizationStartsAtReferenceDate, true);
  assert.equal(validation.ltmFcfMatchesQuarterBridge, true);
  assert.equal(validation.riskRewardBoundariesMatch, true);
  assert.equal(validation.riskRewardZonesAreOrdered, true);
  assert.equal(validation.riskRewardCounterfactualsAreComplete, true);
  assert.equal(validation.riskRewardPresentationDoesNotMoveBoundaries, true);
  assert.equal(validation.downsideStressMatches, true);
  assert.equal(validation.scenarioRevenuePathsMatch, true);
});

test("R12 FCF is rebuilt only from NVIDIA primary-source quarters", () => {
  assert.ok(Math.abs(nvidiaLtm.freeCashFlow - 126.885) < 1e-9);
  assert.ok(nvidiaV112Dossier.sources.every((source) => source.document.length > 0));
  assert.doesNotMatch(nvidiaQ2Fy2027.financialAnalysis ?? "", /167[,.]75|6[,.]91/);
  assert.match(nvidiaQ2Fy2027.financialAnalysis ?? "", /126,885/);
  assert.match(nvidiaQ2Fy2027.v11?.sourceSummary ?? "", /NVIDIA Q2 FY2027 Form 10-Q/);
});

test("Bear is a real downside outcome and all scenarios share one valuation date", () => {
  assert.equal(NVIDIA_VALUATION_DATE, "2028-01-30");
  assert.equal(nvidiaV112Dossier.identity.valuationYearLabel, "FY2028E");
  assert.ok(nvidiaScenarios[0].fairValue < nvidiaV112Dossier.identity.marketReference.price);
  assert.ok(nvidiaScenarios[1].fairValue > nvidiaV112Dossier.identity.marketReference.price);
  assert.ok(nvidiaScenarios[2].fairValue > nvidiaScenarios[1].fairValue);
  assert.ok(nvidiaV112Dossier.scenarios.every((scenario) => scenario.valuationDate === NVIDIA_VALUATION_DATE));
  assert.equal(nvidiaV112Dossier.identity.marketReference.asOf, NVIDIA_REFERENCE_DATE);
});

test("FY2028 scenarios are recalibrated around management's supply-constrained outlook", () => {
  assert.deepEqual(nvidiaScenarios.map((scenario) => scenario.revenue), [520, 680, 780]);
  assert.deepEqual(nvidiaScenarios.map((scenario) => scenario.operatingMargin), [0.52, 0.60, 0.65]);
  assert.deepEqual(nvidiaScenarios.map((scenario) => scenario.peMultiple), [16, 22, 27]);
  assert.ok(Math.abs(nvidiaScenarios[1].revenueGrowthFromFy2027Pct - (680 / 402 - 1)) < 1e-12);
  const outlookClaim = nvidiaV112Dossier.claims.find((claim) => claim.id === "nvda-f-fy2028-outlook");
  assert.equal(outlookClaim?.class, "FACT");
  assert.match(outlookClaim?.text ?? "", /preliminär/i);
  assert.match(outlookClaim?.text ?? "", /inte.*garanti/i);
});

test("the analysis passes the v11.2 publication gate", () => {
  assert.equal(nvidiaQ2Fy2027.templateVersion, "v11");
  assert.equal(nvidiaQ2Fy2027.published, true);
  assert.equal(nvidiaV112Dossier.version.status, "PUBLISH_READY");
  assert.equal(nvidiaV112Dossier.recommendation.value, "KÖP");
  assert.equal(nvidiaV112Dossier.recommendation.status, "APPROVED");
  assert.equal(nvidiaQ2Fy2027.v11?.publicationStatus, "PUBLISH_READY");
  assert.equal(nvidiaQ2Fy2027.v11?.recommendationStatus, "APPROVED");
  assert.equal(nvidiaRiskRewardZones.status, "APPROVED");
  assert.equal(nvidiaQ2Fy2027.v11?.riskRewardZones?.status, "APPROVED");
  assert.equal(nvidiaQ2Fy2027.v11?.riskRewardZones?.zones.length, 3);
  assert.deepEqual(nvidiaV112Dossier.publicationBlockers, []);
  assert.match(nvidiaV112Dossier.disclosures.commercialRelationship, /inte mottagit ersättning/i);
});

test("direct and indirect NVIDIA ownership is disclosed", () => {
  assert.equal(nvidiaV112Dossier.disclosures.status, "HOLDING_CONFIRMED");
  assert.equal(nvidiaV112Dossier.disclosures.directHolding, true);
  assert.equal(nvidiaV112Dossier.disclosures.indirectExposure, true);
  assert.match(nvidiaQ2Fy2027.v11?.ownershipDisclosure ?? "", /äger NVIDIA-aktier direkt/i);
  assert.match(nvidiaQ2Fy2027.v11?.ownershipDisclosure ?? "", /indirekt ekonomisk exponering/i);
});

test("risk/reward zones use canonical prices and complete counterfactual tests", () => {
  const [attractive, balanced, weak] = nvidiaRiskRewardZones.zones;
  assert.equal(attractive.zone, "ATTRACTIVE");
  assert.equal(balanced.zone, "BALANCED");
  assert.equal(weak.zone, "WEAK");
  assert.equal(attractive.priceInterval.max, balanced.priceInterval.min);
  assert.equal(balanced.priceInterval.max, weak.priceInterval.min);
  assert.ok(nvidiaRiskRewardZones.boundaries.every((boundary) =>
    boundary.counterfactualBoundaryTest.lower.testedPrice < boundary.canonicalPrice.value &&
    boundary.counterfactualBoundaryTest.higher.testedPrice > boundary.canonicalPrice.value,
  ));
  assert.match(nvidiaRiskRewardZones.marketReferenceAssessment.label, /balanserad risk\/reward/i);
});

test("capacity commitments and gross guarantees are explicit without being treated as realized losses", () => {
  const dossier = JSON.stringify(nvidiaV112Dossier);
  assert.match(dossier, /279 md USD/);
  assert.match(dossier, /119 md USD/);
  assert.match(dossier, /366 md USD/);
  assert.match(dossier, /108,5 md USD/);
  assert.match(dossier, /SB Energy/);
  assert.match(dossier, /OpenAI/);
  assert.match(dossier, /villkorat och stegvis/);
});

test("the downside stress is separate from Bear Base Bull and the weighted value", () => {
  assert.equal(nvidiaDownsideStressTest.probability, null);
  assert.equal(nvidiaDownsideStressTest.includedInWeightedFairValue, false);
  assert.ok(Math.abs(nvidiaDownsideStressTest.fairValue - 118.67174369747897) < 1e-9);
  assert.equal(nvidiaV112Dossier.scenarios.length, 3);
  assert.equal(nvidiaV112Dossier.stressTests.length, 1);
});

test("presentation rounds zones without changing canonical boundaries", () => {
  const [attractive, balanced, weak] = nvidiaRiskRewardZones.zones;
  assert.match(attractive.presentation.priceLabel, /cirka 198/i);
  assert.match(balanced.presentation.priceLabel, /198–247/);
  assert.match(weak.presentation.priceLabel, /cirka 247/i);
  assert.equal(attractive.priceInterval.max, 197.82044444444452);
  assert.equal(balanced.priceInterval.max, 246.7632435665177);
});
