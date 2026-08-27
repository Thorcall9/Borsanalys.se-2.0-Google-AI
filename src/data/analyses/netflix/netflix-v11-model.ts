/** Canonical Netflix v11.2 preview dossier. USD bn unless stated otherwise. */
export type EvidenceClass = "FACT" | "DERIVED" | "ASSUMPTION" | "ANALYSIS" | "NOT_DECISION_GRADE";

export const NETFLIX_ANALYSIS_ID = "netflix-nflx-2026-08-14";
export const NETFLIX_COMPANY_ID = "netflix-inc";
export const NETFLIX_ANALYSIS_DATE = "2026-08-14";
export const NETFLIX_SOURCE_CUTOFF_DATE = "2026-08-14";
export const NETFLIX_VALUATION_DATE = "2028-12-31";
export const NETFLIX_REFERENCE_PRICE = 78.24;
export const NETFLIX_VALUATION_YEARS = (Date.parse(`${NETFLIX_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${NETFLIX_ANALYSIS_DATE}T00:00:00Z`)) / (365.25 * 24 * 60 * 60 * 1000);
const NETFLIX_SHARE_BRIDGE_OPENING_SHARES = 4.221;

const scenarios = [
  { id: "bear" as const, label: "Försiktigt", probability: 0.25, revenue: { subscription: 55.4, advertising: 2.4, other: 0.3 }, ebitMargin: 0.305, netFinance: -0.6, taxRate: 0.18, dilutedShares: 4.051, peMultiple: 18, multipleRationale: "ANTAGANDE: 18× P/E förutsätter att tillväxt och reklamutfall har normaliserats och att marknaden värderar Netflix som ett mognare mediebolag.", repurchases: 18, repurchasePrice: 90, sbcShares: 0.03, contentAmortization: 19.0, contentPayments: 19.4, contentLiabilityChange: 0, capex: 0.6, workingCapital: 0.2, description: "Svagare medlems- och prisutveckling, annonser under plan och en mognare multipel." },
  { id: "base" as const, label: "Huvudscenario", probability: 0.55, revenue: { subscription: 57.5, advertising: 3.6, other: 0.3 }, ebitMargin: 0.34, netFinance: -0.5, taxRate: 0.18, dilutedShares: 3.951, peMultiple: 23, multipleRationale: "ANTAGANDE: 23× P/E förutsätter uthållig ensiffrig till låg tvåsiffrig vinsttillväxt efter 2028, fortsatt marginaldisciplin och att innehållsekonomin inte försämras.", repurchases: 30, repurchasePrice: 100, sbcShares: 0.03, contentAmortization: 21.0, contentPayments: 22.0, contentLiabilityChange: 0.3, capex: 0.8, workingCapital: 0.4, description: "Monetiseringen fortsätter, reklam växer från 2026 års nivå och operationell hävstång består." },
  { id: "bull" as const, label: "Positivt", probability: 0.20, revenue: { subscription: 59.3, advertising: 4.1, other: 0.3 }, ebitMargin: 0.36, netFinance: -0.4, taxRate: 0.18, dilutedShares: 4.005, peMultiple: 28, multipleRationale: "ANTAGANDE: 28× P/E kräver att pris, planmix, reklam och innehållsekonomi fortsätter utvecklas tydligt bättre än i huvudscenariot även efter 2028.", repurchases: 27.1, repurchasePrice: 110, sbcShares: 0.03, contentAmortization: 22.0, contentPayments: 22.5, contentLiabilityChange: 0.5, capex: 1.0, workingCapital: 0.5, description: "Pris, planmix, reklam och innehållseffektivitet levererar samtidigt; multipelpremien består." },
];

export const netflixScenarios = scenarios.map((input) => {
  const revenue = input.revenue.subscription + input.revenue.advertising + input.revenue.other;
  const ebit = revenue * input.ebitMargin;
  const preTaxIncome = ebit + input.netFinance;
  const cashTax = preTaxIncome * input.taxRate;
  const normalizedNetIncome = preTaxIncome - cashTax;
  const normalizedEps = normalizedNetIncome / input.dilutedShares;
  const fairValue = normalizedEps * input.peMultiple;
  const totalPotentialPct = fairValue / NETFLIX_REFERENCE_PRICE - 1;
  const annualizedCagrPct = Math.pow(fairValue / NETFLIX_REFERENCE_PRICE, 1 / NETFLIX_VALUATION_YEARS) - 1;
  const repurchasedShares = input.repurchases / input.repurchasePrice;
  const endingSharesCheck = NETFLIX_SHARE_BRIDGE_OPENING_SHARES - repurchasedShares + input.sbcShares;
  const normalizedFcf = ebit - cashTax + input.netFinance + input.contentAmortization - input.contentPayments + input.contentLiabilityChange - input.capex - input.workingCapital;
  return { ...input, revenueMix: input.revenue, revenue, normalizedOtherIncome: 0, ebit, preTaxIncome, cashTax, taxExpense: cashTax, normalizedNetIncome, normalizedEps, fairValue, totalPotentialPct, annualizedCagrPct, repurchasedShares, endingSharesCheck, normalizedFcf, fcfMargin: normalizedFcf / revenue, fcfToEbit: normalizedFcf / ebit, repurchasesToFcf: input.repurchases / (normalizedFcf * 3) };
});

const weightedFairValue = netflixScenarios.reduce((sum, scenario) => sum + scenario.fairValue * scenario.probability, 0);

/**
 * Separat v11.2-underlag för MEMBER-modulen. Det är medvetet DRAFT och är
 * inte kopplat till publicerad frontend eller rekommendation innan redaktionellt
 * godkännande. Alla tal härleds från samma referenskurs, scenarier och
 * värderingsdatum som den publicerade värderingen.
 */
const NETFLIX_RISK_REWARD_REFERENCE_YEARS = (Date.parse(`${NETFLIX_VALUATION_DATE}T00:00:00Z`) - Date.parse("2026-08-13T00:00:00Z")) / (365.25 * 24 * 60 * 60 * 1000);
const netflixBearFairValue = netflixScenarios.find((scenario) => scenario.id === "bear")!.fairValue;
const netflixBullFairValue = netflixScenarios.find((scenario) => scenario.id === "bull")!.fairValue;
const netflixRiskRewardAt = (price: number) => ({
  testedPrice: price,
  totalValuePotentialPct: weightedFairValue / price - 1,
  annualizedValuePotentialPct: Math.pow(weightedFairValue / price, 1 / NETFLIX_RISK_REWARD_REFERENCE_YEARS) - 1,
  bearDownsidePct: netflixBearFairValue / price - 1,
});

export const netflixRiskRewardZonesDraft = {
  status: "DRAFT" as const,
  visibility: "MEMBER" as const,
  title: "När blir risk/reward mer attraktiv?",
  method: "Zonerna väger annualiserad potential till sannolikhetsvägt värde, Bear-nedsida, scenario-spridning, MEDEL–HÖG risk och tesernas bevisläge. De är inte en separat värderingsmodell och ändrar inte rekommendationen.",
  valuationDate: NETFLIX_VALUATION_DATE,
  calculation: {
    referencePrice: NETFLIX_REFERENCE_PRICE,
    referenceDate: "2026-08-13",
    valuationDate: NETFLIX_VALUATION_DATE,
    yearsToValuation: NETFLIX_RISK_REWARD_REFERENCE_YEARS,
    probabilityWeightedValue: weightedFairValue,
    bearValue: netflixBearFairValue,
    bullValue: netflixBullFairValue,
    upsideDownsideRatioFormula: "(probability_weighted_value / tested_price - 1) / abs(bear_value / tested_price - 1); kontrollvariabel, aldrig ensam beslutsregel.",
    testPoints: [60, 65, 68, 70, NETFLIX_REFERENCE_PRICE, 80, 85, 90, weightedFairValue].map(netflixRiskRewardAt),
  },
  analysis: {
    riskRewardClassification: "BALANCED" as const,
    companySpecificRiskFactors: [
      { factor: "Reklam", relevance: "Reklam växer från en låg bas och måste bli materiell utan att försämra pris- eller planmix.", claimIds: ["nflx-monetization"] },
      { factor: "Innehållsekonomi och kassaflöde", relevance: "Högre innehållsbetalningar har redan visat att rapporterad FCF kan svänga; WBD-ersättningen får inte tolkas som återkommande kapacitet.", claimIds: ["nflx-q2-fcf", "nflx-wbd", "nflx-content-obligations"] },
      { factor: "Multipel och marginal", relevance: "Huvudscenariot kräver fortsatt marginalexpansion och en bibehållen kvalitetsmultipel trots att verksamheten mognar.", claimIds: ["nflx-q2-revenue"] },
    ],
    thesisStatusRelevance: "Reklam- och marginaltesen är på väg, men inte tillräckligt bekräftad för att den nuvarande Bear-nedsidan ska ge en tydlig säkerhetsmarginal.",
    scenarioUncertainty: "Bear, sannolikhetsvägt värde och Bull spänner över olika utfall för medlems-/prisdrivare, reklam, marginal och P/E. Det separata stresstestet ingår inte i zonbedömningen.",
    requiredRiskCompensation: "Med MEDEL–HÖG risk behöver Netflix vid en attraktiv zon erbjuda ungefär 15 % annualiserad potential eller mer och en Bear-nedsida som är klart mindre än vid referenskursen.",
    boundaryRationale: "68 USD skiljer en tydligare riskkompensation från ett balanserat läge. 85 USD skiljer ett läge med fortsatt men begränsad potential från ett läge där Bear-nedsidan och multipelrisken dominerar.",
    counterfactualBoundaryTest: {
      lowerThanAttractive: "64,60 USD ger cirka +17,5 %/år och Bear cirka −3,4 %; tydligt mer attraktivt än 68 USD.",
      reference: "78,24 USD ger cirka +8,4 %/år och Bear cirka −20,3 %; balanserat men med begränsad säkerhetsmarginal.",
      higherThanWeak: "89,25 USD ger cirka +2,7 %/år och Bear cirka −30,1 %; tydligt svagare risk/reward än vid 85 USD.",
    },
    canonicalRefs: ["valuation.weightedFairValue", "scenarios.bear.fairValue", "scenarios.bull.fairValue", "identity.marketReference", "identity.valuationDate", "risk.label"],
  },
  boundaries: [
    { boundaryId: "attractive-upper", canonicalPrice: { value: 68, currency: "USD", fullPrecision: true }, annualizedValuePotentialPct: netflixRiskRewardAt(68).annualizedValuePotentialPct, bearDownsidePct: netflixRiskRewardAt(68).bearDownsidePct, rationale: "Vid och under 68 USD ger den sannolikhetsvägda potentialen omkring 15 %/år och Bear-nedsidan är väsentligt mindre än vid referenskursen.", counterfactualBoundaryTest: "70 USD ger cirka +13,6 %/år och Bear cirka −10,9 %; ersättningen är då inte lika tydligt attraktiv.", risk: "MEDEL_HÖG" as const },
    { boundaryId: "balanced-upper", canonicalPrice: { value: 85, currency: "USD", fullPrecision: true }, annualizedValuePotentialPct: netflixRiskRewardAt(85).annualizedValuePotentialPct, bearDownsidePct: netflixRiskRewardAt(85).bearDownsidePct, rationale: "Vid 85 USD återstår omkring 4,7 %/år samtidigt som Bear-nedsidan är omkring −26,6 %; det är för tunt för att vara balanserat med Netflix riskprofil.", counterfactualBoundaryTest: "80,75 USD ger cirka +7,0 %/år och Bear cirka −22,8 %; begränsat men ännu inte tydligt svagt.", risk: "MEDEL_HÖG" as const },
  ],
  zones: [
    { zone: "ATTRACTIVE" as const, priceInterval: { min: null, max: 68, currency: "USD", minInclusive: false, maxInclusive: true }, presentation: { title: "Attraktiv risk/reward", priceLabel: "68 USD eller lägre" }, rationale: "Under eller vid 68 USD ger potential och Bear-skydd materiell kompensation för reklam-, innehålls- och multipelrisken." },
    { zone: "BALANCED" as const, priceInterval: { min: 68, max: 85, currency: "USD", minInclusive: false, maxInclusive: false }, presentation: { title: "Balanserad risk/reward", priceLabel: "Över 68 till under 85 USD" }, rationale: "Potentialen är relevant, men beror på att reklam, marginal och kassakonvertering bevisas samtidigt." },
    { zone: "WEAK" as const, priceInterval: { min: 85, max: null, currency: "USD", minInclusive: true, maxInclusive: false }, presentation: { title: "Svag risk/reward", priceLabel: "85 USD eller högre" }, rationale: "Den återstående potentialen är för liten relativt Bear-nedsida, innehållsekonomi och multipelrisk." },
  ],
  presentation: {
    memberInsight: {
      identityLabel: "Netflix · NFLX",
      referencePriceLabel: "78,24 USD",
      referenceDateLabel: "13 aug 2026",
      assessmentLabel: "Balanserad risk/reward",
      assessmentRationale: "Referenskursen lämnar relevant potential, men Bear-nedsidan och kravet på fortsatt marginal- och reklamleverans ger begränsad säkerhetsmarginal. Balanserad risk/reward är en zonbedömning, inte en egen rekommendation; den canonical rekommendationen är fortsatt BEVAKA.",
      zoneSharesPct: [35, 35, 30],
      markers: [
        { id: "reference", positionPct: 56, label: "▼ Kurs 78,24 USD", placement: "above" as const, align: "center" as const },
        { id: "weighted-fair-value", positionPct: 85, label: "Vårt värde 94,92 USD", placement: "below" as const, align: "end" as const },
      ],
      scenarioSpread: {
        label: "Scenariospann till 31 december 2028",
        points: [
          { label: "Bear", valueLabel: "62,38 USD", annualPotentialLabel: "−9,1 %/år" },
          { label: "Sannolikhetsvägt", valueLabel: "94,92 USD", annualPotentialLabel: "+8,4 %/år" },
          { label: "Bull", valueLabel: "129,17 USD", annualPotentialLabel: "+23,4 %/år" },
        ],
        rangeSharesPct: [48.72, 51.28],
        distanceLabel: "Bear → sannolikhetsvägt: 32,55 USD · sannolikhetsvägt → Bull: 34,25 USD",
      },
      footerNote: "Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.",
    },
  },
  recalculationDependencies: ["identity.marketReference.price", "identity.marketReference.asOf", "identity.valuationDate", "valuation.weightedFairValue", "scenarios"],
  supportsUserScenarioRecalculation: false,
} as const;

export const netflixFacts = {
  q2Revenue: 12.559938, q2Ebit: 4.189303, q2EbitMargin: 0.334, q2NetIncome: 3.401414, q2OperatingCashFlow: 1.743812,
  q2Capex: 0.218644, q2ReportedFcf: 1.525168, h1OperatingCashFlow: 7.034017, h1Capex: 0.438, h1ReportedFcf: 6.596017,
  wbdTerminationFee: 2.8, contentObligations: 25.106705, contentDueNext12Months: 11.939734, contentDueYears1to3: 9.546875,
  contentDueYears3to5: 2.996885, contentDueAfter5Years: 0.623211, h1Repurchases: 5.9, h1RepurchasedShares: 0.066431786,
  q2WeightedAverageDilutedShares: 4.2613, shareBridgeOpeningShares: NETFLIX_SHARE_BRIDGE_OPENING_SHARES, q2RepurchaseAuthorizationRemaining: 27.1, q2Liquidity: 9.131464, q2DebtDueNext12Months: 3.149, fy2026RevenueGuidanceMidpoint: 51.2, fy2026OperatingMarginGuide: 0.315, fy2026ReportedFcfGuide: 12.5,
} as const;

export const netflixDerived = {
  h1AverageRepurchasePrice: netflixFacts.h1Repurchases / netflixFacts.h1RepurchasedShares,
  q2OperatingCashFlowChangePct: netflixFacts.q2OperatingCashFlow / 2.423258 - 1,
} as const;

export const netflixCapitalAllocationCheck = {
  positiveScenarioUsesVerifiedAuthorization: netflixScenarios.find((scenario) => scenario.id === "bull")!.repurchases <= netflixFacts.q2RepurchaseAuthorizationRemaining,
  note: "ANALYSIS: Det positiva scenariot begränsas till det verifierade återköpsmandatet per Q2 2026 och inkluderar fortsatt aktiebaserad ersättning. Det förutsätter inte en framtida mandatförnyelse.",
} as const;

export const netflixWbdNormalization = {
  reportedFcfGuide: netflixFacts.fy2026ReportedFcfGuide,
  preTaxTerminationFee: netflixFacts.wbdTerminationFee,
  assumedTaxRange: [0.18, 0.21] as const,
  afterTaxFeeRange: [netflixFacts.wbdTerminationFee * 0.79, netflixFacts.wbdTerminationFee * 0.82] as const,
  normalizedFcfGuideRange: [netflixFacts.fy2026ReportedFcfGuide - netflixFacts.wbdTerminationFee * 0.82, netflixFacts.fy2026ReportedFcfGuide - netflixFacts.wbdTerminationFee * 0.79] as const,
  status: "NOT_DECISION_GRADE" as const,
  note: "Skatteeffekten för den mottagna uppsägningsersättningen är inte separat verifierad i Q2 2026 10-Q. Intervallet är en ASSUMPTION, används inte som återkommande FCF-kapacitet och får inte bära värderingen ensam.",
} as const;

/** Deliberately outside Bear/Base/Bull: it tests a full-thesis break, not a probability-weighted outcome. */
export const netflixStressTest = (() => {
  const revenue = 55.0;
  const ebitMargin = 0.28;
  const ebit = revenue * ebitMargin;
  const netFinance = -0.7;
  const taxRate = 0.18;
  const dilutedShares = 4.15;
  const peMultiple = 16;
  const normalizedEps = (ebit + netFinance) * (1 - taxRate) / dilutedShares;
  const fairValue = normalizedEps * peMultiple;
  return { revenue, ebitMargin, ebit, netFinance, taxRate, dilutedShares, peMultiple, normalizedEps, fairValue, totalPotentialPct: fairValue / NETFLIX_REFERENCE_PRICE - 1 };
})();

export const netflixV112Dossier = {
  version: { versionId: "netflix-v11.2-2026-08-14-r3", parentVersionId: "netflix-v11.2-2026-08-14-r2", status: "PUBLISH_READY" as const, immutable: true },
  identity: { analysisId: NETFLIX_ANALYSIS_ID, companyId: NETFLIX_COMPANY_ID, analysisDate: NETFLIX_ANALYSIS_DATE, sourceCutoffDate: NETFLIX_SOURCE_CUTOFF_DATE, valuationDate: NETFLIX_VALUATION_DATE, valuationYearLabel: "2028E", marketReference: { price: NETFLIX_REFERENCE_PRICE, currency: "USD", asOf: "2026-08-13", sourceRef: "NFLX-close-2026-08-13" } },
  recommendation: "BEVAKA" as const,
  risk: { label: "MEDEL–HÖG" as const, rationale: "Finansiell risk begränsas av FCF och likviditet, men affärs-, prognos-, kassaflödes- och multipelrisken är väsentlig när pris, reklam, innehållsbetalningar och marginal ska leverera samtidigt." },
  insight: "+21 % till 2028 är attraktivt, men inte tillräckligt asymmetriskt. Det motsvarar cirka 8,5 % per år och kräver fortsatt marginalexpansion samt en bibehållen kvalitetsmultipel. När det försiktiga scenariot samtidigt innebär omkring 20 % nedsida blir säkerhetsmarginalen för liten för KÖP. Vi blir mer positiva om aktien faller och marginal- samt reklamtesen samtidigt bekräftas i kommande rapporter.",
  claims: [
    { id: "nflx-q2-revenue", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q", text: "Q2 2026-omsättningen var 12,560 md USD och rörelsemarginalen 33,4 %." },
    { id: "nflx-wbd", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q, Note 6 Acquisitions", text: "WBD-ersättningen uppstod när det planerade förvärvet av WBD:s streaming- och studioverksamhet avbröts efter att WBD valde att ingå ett konkurrerande avtal med Paramount Skydance. Uppsägningsersättningen på 2,8 md USD redovisades utanför EBIT och har exkluderats ur normaliserat resultat." },
    { id: "nflx-q2-weighted-shares", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q, Note 3 Earnings per Share", text: "Q2 2026:s vägda genomsnittliga utspädda aktieantal var 4,2613 miljarder aktier." },
    { id: "nflx-capital-allocation", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q, Stock Repurchases and Liquidity and Capital Resources", text: "Per 30 juni 2026 återstod 27,1 md USD av återköpsmandatet; likviditet var 9,131 md USD och förfallande kapitalbelopp och ränta kommande tolv månader var 3,149 md USD." },
    { id: "nflx-content-obligations", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q, Note 9", text: "Innehållsåtaganden var 25,107 md USD, varav 11,940 md USD förfaller inom 12 månader." },
    { id: "nflx-q2-fcf", class: "FACT" as EvidenceClass, source: "Netflix Q2 2026 Form 10-Q", text: "Q2 rapporterad FCF var cirka 1,525 md USD; OCF föll 28 % och högre innehållsbetalningar var en viktig motvind." },
    { id: "nflx-monetization", class: "ANALYSIS" as EvidenceClass, source: "Netflix Q2 2026 shareholder letter", text: "Intäktstillväxt relativt aggregerad tittartid är ett bolagsnivåmått, inte ett isolerat ARPU- eller retentionmått." },
  ],
  sources: [
    { id: "NFLX-Q1-2026-10Q", document: "Netflix Q1 2026 Form 10-Q", date: "2026-04-17" },
    { id: "NFLX-Q2-2026-10Q", document: "Netflix Q2 2026 Form 10-Q", date: "2026-07-17", primarySourceDetail: "Note 3 Earnings per Share; Note 6 Acquisitions (terminated WBD transaction and termination fee)" },
    { id: "NFLX-Q2-2026-letter", document: "Netflix Q2 2026 shareholder letter", date: "2026-07-16" },
  ],
  disclaimer: {
    centralDisclaimerVersion: "v11.2-2026-08",
    shortDisclaimerId: "standard-short-v11.2",
    fullDisclaimerUrl: "/villkor",
  },
  disclosures: {
    confirmedAt: "2026-08-14",
    directHolding: "Inget direkt innehav i Netflix.",
    indirectExposure: "Indirekt exponering kan förekomma via breda globala fonder.",
    compensationOrEngagement: "Ingen ersättning, inget uppdrag och ingen annan kommersiell relation till Netflix har erhållits.",
  },
  scenarios: netflixScenarios.map((scenario) => ({ ...scenario, valuationDate: NETFLIX_VALUATION_DATE })),
  valuation: { weightedFairValue, totalPotentialPct: weightedFairValue / NETFLIX_REFERENCE_PRICE - 1, annualizedPotentialPct: Math.pow(weightedFairValue / NETFLIX_REFERENCE_PRICE, 1 / NETFLIX_VALUATION_YEARS) - 1, yearsToValuation: NETFLIX_VALUATION_YEARS },
  riskRewardZonesDraft: netflixRiskRewardZonesDraft,
  publicationBlockers: [],
} as const;

export function validateNetflixValuation() {
  const probability = netflixScenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
  const weighted = netflixScenarios.reduce((sum, scenario) => sum + scenario.fairValue * scenario.probability, 0);
  return {
    probability, weighted,
    scenariosMatchRevenue: netflixScenarios.every((s) => Math.abs(s.revenueMix.subscription + s.revenueMix.advertising + s.revenueMix.other - s.revenue) < 1e-9),
    scenariosMatchEbit: netflixScenarios.every((s) => Math.abs(s.revenue * s.ebitMargin - s.ebit) < 1e-9),
    scenariosMatchEps: netflixScenarios.every((s) => Math.abs(s.normalizedNetIncome / s.dilutedShares - s.normalizedEps) < 1e-9),
    scenariosMatchValue: netflixScenarios.every((s) => Math.abs(s.normalizedEps * s.peMultiple - s.fairValue) < 1e-9),
    scenarioShareBridgesMatch: netflixScenarios.every((s) => Math.abs(s.endingSharesCheck - s.dilutedShares) < 0.002),
    repurchasesAreFcfFeasible: netflixScenarios.every((s) => s.repurchasesToFcf <= 0.8),
    positiveSharesUseVerifiedAuthorization: netflixCapitalAllocationCheck.positiveScenarioUsesVerifiedAuthorization,
    weightedMatches: Math.abs(weighted - weightedFairValue) < 1e-9,
  };
}
