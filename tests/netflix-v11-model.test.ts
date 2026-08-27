import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { alphabetV112Dossier } from "../src/data/analyses/alphabet/alphabet-v11-model";
import { netflix2026 } from "../src/data/analyses/netflix/netflix-2026";
import {
  NETFLIX_ANALYSIS_DATE,
  NETFLIX_REFERENCE_PRICE,
  NETFLIX_VALUATION_DATE,
  netflixFacts,
  netflixCapitalAllocationCheck,
  netflixRiskRewardZonesDraft,
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
  assert.match(claim?.text ?? "", /Paramount Skydance/);
  assert.match(claim?.text ?? "", /utanför EBIT/);
  assert.match(claim?.text ?? "", /exkluderats ur normaliserat resultat/);
  assert.equal(netflixWbdNormalization.status, "NOT_DECISION_GRADE");
  assert.ok(netflixWbdNormalization.normalizedFcfGuideRange[0] < netflixWbdNormalization.reportedFcfGuide);
  assert.equal(netflixFacts.wbdTerminationFee, 2.8);
});

test("Netflix share-repurchase bridge is internally feasible against scenario FCF", () => {
  const result = validateNetflixValuation();
  assert.equal(result.scenarioShareBridgesMatch, true);
  assert.equal(result.repurchasesAreFcfFeasible, true);
  assert.equal(result.positiveSharesUseVerifiedAuthorization, true);
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

test("Netflix public bridge exposes EPS, not scenario FCF or buyback mechanics", () => {
  const preview = readFileSync(new URL("../src/pages/AlphabetV11Preview.tsx", import.meta.url), "utf8");
  assert.match(preview, /Logga in för att se hur vi räknat/);
  assert.match(preview, /user && showMethod/);
  assert.match(preview, /openLoginModal/);
  assert.match(preview, /Visa EPS-bryggan/);
  assert.match(preview, /Dölj EPS-bryggan/);
  assert.doesNotMatch(preview, /showFcfDetail|showShareDetail/);
  assert.doesNotMatch(preview, /Visa\/Dölj FCF och innehåll|Visa\/Dölj aktieantal och återköp/);
  assert.match(preview, /\{formatNumber\(activeScenario\.revenue\)\} md USD/);
  assert.match(preview, /Utspädda aktier 2028E/);
  assert.match(preview, /netflixWbdExplanation/);
  assert.doesNotMatch(preview, /P\/FCF/);
});

test("Netflix public copy uses Swedish scenario terms and separates the stress test", () => {
  const preview = readFileSync(new URL("../src/pages/AlphabetV11Preview.tsx", import.meta.url), "utf8");
  assert.match(preview, /Multipelantagande:/);
  assert.match(preview, /operationell hävstång/);
  assert.match(preview, /Omsättning \/ medlems- och planmixsignaler/);
  assert.match(preview, /Ej sannolikhetsvägd känslighetsanalys vid ett tesbrott/);
  assert.match(preview, /Marginalerna har förbättrats kraftigt/);
  assert.match(preview, /Reklam blir en materiell intäktsmotor och kan utvecklas till en betydande vinstdrivare/);
  assert.match(preview, /Pris, planmix och reklam lyfter monetiseringen snabbare än tittandet/);
  assert.match(preview, /känslighetsanalysen ingår inte i sannolikhetsvärdet/);
});

test("Netflix uses the verified Q2 weighted-average diluted-share comparison and caps the positive case", () => {
  assert.equal(netflixFacts.q2WeightedAverageDilutedShares, 4.2613);
  const reductions = netflixScenarios.map((scenario) => Math.round((1 - scenario.dilutedShares / netflixFacts.q2WeightedAverageDilutedShares) * 100));
  assert.deepEqual(reductions, [5, 7, 6]);
  const positiveScenario = netflixScenarios.find((scenario) => scenario.id === "bull");
  assert.ok(positiveScenario);
  assert.equal(positiveScenario?.repurchases, netflixFacts.q2RepurchaseAuthorizationRemaining);
  assert.equal(netflixCapitalAllocationCheck.positiveScenarioUsesVerifiedAuthorization, true);
});

test("Netflix scenario outputs use exact revenue mix and complete EPS arithmetic", () => {
  for (const scenario of netflixScenarios) {
    assert.equal(scenario.revenue, scenario.revenueMix.subscription + scenario.revenueMix.advertising + scenario.revenueMix.other);
    assert.equal(scenario.ebit, scenario.revenue * scenario.ebitMargin);
    assert.equal(scenario.preTaxIncome, scenario.ebit + scenario.normalizedOtherIncome + scenario.netFinance);
    assert.equal(scenario.taxExpense, scenario.preTaxIncome * scenario.taxRate);
    assert.equal(scenario.normalizedNetIncome, scenario.preTaxIncome - scenario.taxExpense);
    assert.equal(scenario.normalizedEps, scenario.normalizedNetIncome / scenario.dilutedShares);
    assert.equal(scenario.fairValue, scenario.normalizedEps * scenario.peMultiple);
  }
});

test("Netflix is publish-ready with the required compliance confirmation", () => {
  assert.equal(netflixV112Dossier.version.status, "PUBLISH_READY");
  assert.deepEqual(netflixV112Dossier.publicationBlockers, []);
  assert.equal(netflixV112Dossier.disclaimer.centralDisclaimerVersion, "v11.2-2026-08");
  assert.equal(netflixV112Dossier.disclaimer.shortDisclaimerId, "standard-short-v11.2");
  assert.equal(netflixV112Dossier.disclaimer.fullDisclaimerUrl, "/villkor");
  assert.equal(netflixV112Dossier.disclosures.confirmedAt, "2026-08-14");
  assert.match(netflixV112Dossier.disclosures.directHolding, /Inget direkt innehav/);
  assert.match(netflixV112Dossier.disclosures.indirectExposure, /globala fonder/);
  assert.match(netflixV112Dossier.disclosures.compensationOrEngagement, /Ingen ersättning/);
});

test("Netflix archive potential uses the canonical weighted valuation", () => {
  assert.equal(netflix2026.published, true);
  assert.equal(netflix2026.upside, Math.round(netflixV112Dossier.valuation.totalPotentialPct * 100));
  assert.equal(netflix2026.upside, 21);
});

test("Netflix risk/reward draft uses the existing valuation without changing publication", () => {
  const draft = netflixRiskRewardZonesDraft;
  assert.equal(draft.status, "DRAFT");
  assert.equal(draft.visibility, "MEMBER");
  assert.equal(draft.valuationDate, NETFLIX_VALUATION_DATE);
  assert.equal(draft.calculation.referencePrice, NETFLIX_REFERENCE_PRICE);
  assert.equal(draft.calculation.probabilityWeightedValue, netflixV112Dossier.valuation.weightedFairValue);
  assert.equal(draft.zones.length, 3);
  assert.deepEqual(draft.zones.map((zone) => zone.zone), ["ATTRACTIVE", "BALANCED", "WEAK"]);
  assert.equal(draft.zones[0].priceInterval.max, 68);
  assert.equal(draft.zones[1].priceInterval.min, 68);
  assert.equal(draft.zones[1].priceInterval.max, 85);
  assert.equal(draft.zones[2].priceInterval.min, 85);
  assert.equal(draft.presentation.memberInsight.assessmentLabel, "Balanserad risk/reward");
  assert.deepEqual(draft.presentation.memberInsight.scenarioSpread.points.map((point) => point.annualPotentialLabel), ["−9,1 %/år", "+8,4 %/år", "+23,4 %/år"]);
  assert.equal(netflixV112Dossier.version.status, "PUBLISH_READY");
});

test("company dossiers do not leak company-specific scenario fields or WBD notes", () => {
  const alphabet = JSON.stringify(alphabetV112Dossier);
  const netflix = JSON.stringify(netflixV112Dossier);
  assert.doesNotMatch(alphabet, /NFLX|Netflix|WBD|78\.24|4\.005/);
  assert.doesNotMatch(netflix, /GOOG|Alphabet|Google Cloud|Search & other/);
  assert.equal(netflixV112Dossier.identity.companyId, "netflix-inc");
  assert.equal(alphabetV112Dossier.identity.companyId, "alphabet-inc");
});
