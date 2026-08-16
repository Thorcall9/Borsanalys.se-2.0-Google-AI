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
