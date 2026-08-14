export type EvidenceClass = "FACT" | "DERIVED" | "ASSUMPTION" | "ANALYSIS";

type ScenarioInput = {
  id: "bear" | "base" | "bull";
  label: string;
  probability: number;
  revenue: number;
  ebitMargin: number;
  normalizedOtherIncome: number;
  netInterest: number;
  taxRate: number;
  preferredDividends: number;
  minorityInterest: number;
  dilutedShares: number;
  peMultiple: number;
  description: string;
  multipleRationale: string;
};

export const ALPHABET_VALUATION_DATE = "2028-12-31";
export const ALPHABET_REFERENCE_DATE = "2026-08-07";
export const ALPHABET_ANALYSIS_DATE = "2026-08-08";
export const ALPHABET_SOURCE_CUTOFF_DATE = "2026-08-07";
export const ALPHABET_REFERENCE_PRICE = 353.47;
export const ALPHABET_VALUATION_YEARS = (Date.parse(`${ALPHABET_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${ALPHABET_ANALYSIS_DATE}T00:00:00Z`)) / (365.25 * 24 * 60 * 60 * 1000);
export const ALPHABET_LTM_REVENUE = 445.867;

/**
 * Alla belopp är miljarder USD utom EPS, P/E och aktieantal (miljarder aktier).
 * FACT och DERIVED nedan kommer från Alphabets Q2 2026-underlag. Framtida
 * scenariofält är redaktionella ASSUMPTIONs. Den äldre Alphabet-vyn sparade
 * endast EPS/P/E/slutvärde; dessa mellanled är därför en explicit v11.2-
 * rekonstruktion, inte återställda historiska modellinputs.
 */
const inputs: ScenarioInput[] = [
  {
    id: "bear", label: "Försiktigt", probability: 0.25,
    revenue: 526, ebitMargin: 0.30, normalizedOtherIncome: 0, netInterest: 3,
    taxRate: 0.18, preferredDividends: 0, minorityInterest: 0, dilutedShares: 12.5, peMultiple: 22.94,
    description: "AI-efterfrågan består men Cloud normaliseras snabbare. Search växer långsammare när AI förändrar monetiseringen, medan avskrivningar, svag FCF-konvertering och utspädning pressar EPS per aktie.",
    multipleRationale: "Lägre tillväxt, högre kapitalintensitet och risk för utspädning motiverar en tydlig normalisering av P/E.",
  },
  {
    id: "base", label: "Huvudscenario", probability: 0.55,
    revenue: 587, ebitMargin: 0.33, normalizedOtherIncome: 0, netInterest: 3.5,
    taxRate: 0.18, preferredDividends: 0, minorityInterest: 0, dilutedShares: 12.45, peMultiple: 30.18,
    description: "Cloud växer fortsatt starkt men normaliseras från dagens extrema takt. Search fortsätter växa och marginalen förblir hög, men strukturellt högre capex begränsar FCF-konverteringen.",
    multipleRationale: "Hög kvalitet och fortsatt EPS-tillväxt motiverar en premie, men den är begränsad av högre kapitalintensitet och osäkerhet om FCF.",
  },
  {
    id: "bull", label: "Positivt", probability: 0.20,
    revenue: 660, ebitMargin: 0.36, normalizedOtherIncome: 0, netInterest: 4,
    taxRate: 0.175, preferredDividends: 0, minorityInterest: 0, dilutedShares: 12.4, peMultiple: 34.40,
    description: "Cloud fortsätter växa kraftigt med hög marginal och AI ökar Search-användningen utan sämre monetisering. Capex-ökningen visar sig vara front-loaded, vilket ger en kraftig FCF-inflektion och fortsatt EPS-tillväxt.",
    multipleRationale: "Hög Cloud-lönsamhet, fungerande Search-monetisering och en synlig FCF-inflektion motiverar en högre kvalitets- och tillväxtpremie.",
  },
];

export const alphabetScenarios = inputs.map((input) => {
  const ebit = input.revenue * input.ebitMargin;
  const normalizedNetFinancialResult = input.normalizedOtherIncome + input.netInterest;
  const preTaxIncome = ebit + normalizedNetFinancialResult;
  const taxExpense = preTaxIncome * input.taxRate;
  const normalizedNetIncome = preTaxIncome - taxExpense;
  const netIncomeAvailableToCommon = normalizedNetIncome - input.preferredDividends - input.minorityInterest;
  const normalizedEps = netIncomeAvailableToCommon / input.dilutedShares;
  const fairValue = normalizedEps * input.peMultiple;
  const totalPotentialPct = fairValue / ALPHABET_REFERENCE_PRICE - 1;
  const annualizedCagrPct = Math.pow(fairValue / ALPHABET_REFERENCE_PRICE, 1 / ALPHABET_VALUATION_YEARS) - 1;
  const revenueGrowthCagr = Math.pow(input.revenue / 402.836, 1 / 3) - 1;

  return { ...input, normalizedNetFinancialResult, ebit, preTaxIncome, taxExpense, normalizedNetIncome, netIncomeAvailableToCommon, normalizedEps, fairValue, totalPotentialPct, annualizedCagrPct, revenueGrowthCagr };
});

export const alphabetProbabilityWeightedValue = alphabetScenarios.reduce((sum, scenario) => sum + scenario.fairValue * scenario.probability, 0);
export const alphabetWeightedTotalPotentialPct = alphabetProbabilityWeightedValue / ALPHABET_REFERENCE_PRICE - 1;
export const alphabetWeightedAnnualizedCagrPct = Math.pow(alphabetProbabilityWeightedValue / ALPHABET_REFERENCE_PRICE, 1 / ALPHABET_VALUATION_YEARS) - 1;

export const alphabetHistoricalContext = {
  revenue: [
    { period: "2022", value: 282.836, growth: null },
    { period: "2023", value: 307.394, growth: 0.087 },
    { period: "2024", value: 350.018, growth: 0.139 },
    { period: "2025", value: 402.836, growth: 0.151 },
    { period: "LTM Q2 2026", value: 445.867, growth: 0.201 },
  ],
  ebitMargin: [
    { period: "2022", value: 0.265 }, { period: "2023", value: 0.274 }, { period: "2024", value: 0.321 }, { period: "2025", value: 0.320 }, { period: "LTM Q2 2026", value: 0.331 },
  ],
} as const;

export const alphabetCapitalFacts = {
  capex2024: 52.5,
  capex2025: 91.4,
  capex2026GuidanceLow: 175,
  capex2026GuidanceHigh: 185,
  ttmCapex: 132.4,
  ttmFcf: 53.3,
  q2Fcf: -5.855,
  q2OperatingCashFlow: 39.069,
  q2Capex: 44.924,
  q2CashAndMarketableSecurities: 242.5,
  dilutedShares2026: 12.102,
  shareDilutionAssumption: "ASSUMPTION: 12,4–12,5 md utspädda aktier 2028. Antagandet fångar effekten av finansiering och möjliga konvertibler; slutlig konvertering och ATM-utnyttjande är inte verifierade.",
  normalizationPolicy: "ASSUMPTION: orealiserade värdeförändringar i aktieinnehav normaliseras bort (0 USD i normalizedOtherIncome). Netto ränteintäkter, skatt och utspädning är redaktionella scenarioinputs eftersom tidigare Alphabet-vy saknade en EPS-bridge.",
  preferredPolicy: "ASSUMPTION: preferred-utdelning och minoritetsintresse sätts till 0 USD i 2028-scenarierna. Modellens utspädda aktieantal fångar i stället konvertibel-/finansieringseffekten; detta ska omprövas när konverteringsvillkoren är fullt verifierade.",
} as const;

/** Canonical v11.2 dossier. Frontend consumes these fields but never recalculates value or potential. */
export const alphabetV112Dossier = {
  version: { versionId: "alphabet-v11.2-2026-08-08", parentVersionId: "alphabet-v11.1-2026-08-08", immutable: true, status: "PUBLISH_READY" as const },
  identity: {
    analysisId: "alphabet-googl", companyId: "alphabet-inc", analysisDate: ALPHABET_ANALYSIS_DATE,
    sourceCutoffDate: ALPHABET_SOURCE_CUTOFF_DATE, valuationDate: ALPHABET_VALUATION_DATE, valuationYearLabel: "2028E",
    marketReference: { price: ALPHABET_REFERENCE_PRICE, currency: "USD", asOf: ALPHABET_REFERENCE_DATE, sourceRef: "GOOG-close-2026-08-07" },
  },
  accessLevel: "PUBLIC" as const,
  valuationModelType: "earnings_multiple" as const,
  interactiveValuation: "unsupported" as const,
  interactiveReason: "Normaliserad EPS och aktieutspädning kräver redaktionell bedömning; inget värderingslabb publiceras ännu.",
  recommendation: "BEVAKA" as const,
  risk: { label: "MEDEL–HÖG" as const, rationale: "Risknivån speglar främst avkastningen på AI-investeringarna, Search-monetisering och värderingen. Alphabets likviditet är fortsatt mycket stark." },
  insight: "AI-caset är en kapitalavkastningsfråga. Search och Cloud visar stark omsättnings- och EBIT-tillväxt, men capex växer snabbare. Aktieägarvärdet avgörs av när investeringarna ger tydlig hävstång i normaliserad EBIT och fritt kassaflöde.",
  claims: [
    { id: "q2-2026-cloud", class: "FACT" as EvidenceClass, sourceRefs: ["Alphabet-Q2-2026-release", "Alphabet-Q2-2026-slides"], text: "Google Cloud omsatte 24,768 md USD, växte 82 % och hade 8,814 md USD i rörelseresultat i Q2 2026." },
    { id: "q2-2026-search", class: "FACT" as EvidenceClass, sourceRefs: ["Alphabet-Q2-2026-release"], text: "Google Search & other växte 17 % i Q2 2026." },
    { id: "q2-2026-fcf", class: "FACT" as EvidenceClass, sourceRefs: ["Alphabet-Q2-2026-release"], text: "Q2 2026-operativt kassaflöde var 39,069 md USD, capex 44,924 md USD och fritt kassaflöde −5,855 md USD." },
    { id: "q2-2026-other-income", class: "FACT" as EvidenceClass, sourceRefs: ["Alphabet-Q2-2026-release"], text: "Q2 2026 other income inkluderade 98,0 md USD i nettovinst, främst orealiserade vinster på aktieinnehav." },
    { id: "ltm-history", class: "DERIVED" as EvidenceClass, sourceRefs: ["Alphabet-Q2-2026-release", "Alphabet-2025-annual-report"], text: "LTM Q2 2026 omsättning var 445,867 md USD och EBIT-marginal cirka 33,1 %." },
    { id: "eps-bridge-reconstruction", class: "ASSUMPTION" as EvidenceClass, sourceRefs: [], text: "Den publicerade v11.1-modellen hade låsta scenario-EPS/P/E/slutvärden men saknade finansnetto, skatt, preferred/minoritet och utspädda aktier. Dessa mellanled dokumenteras nu uttryckligen som redaktionella scenarioantaganden." },
  ],
  sources: [
    { id: "Alphabet-Q2-2026-release", document: "Alphabet Q2 2026 earnings release", date: "2026-07-22" },
    { id: "Alphabet-Q2-2026-slides", document: "Alphabet Q2 2026 earnings slides", date: "2026-07-22" },
    { id: "Alphabet-2025-annual-report", document: "Alphabet 2024 annual report / historical series supplied", date: "2025-01-01" },
    { id: "GOOG-close-2026-08-07", document: "GOOG closing price", date: ALPHABET_REFERENCE_DATE },
  ],
  scenarios: alphabetScenarios.map((scenario) => ({ ...scenario, valuationDate: ALPHABET_VALUATION_DATE })),
  valuation: {
    weightedFairValue: alphabetProbabilityWeightedValue,
    totalPotentialPct: alphabetWeightedTotalPotentialPct,
    annualizedPotentialPct: alphabetWeightedAnnualizedCagrPct,
    yearsToValuation: ALPHABET_VALUATION_YEARS,
  },
  historicalContext: alphabetHistoricalContext,
  capitalFacts: alphabetCapitalFacts,
  changeTracking: [
    { fieldPath: "valuation_date", oldValue: "2027E label", newValue: ALPHABET_VALUATION_DATE, reason: "Modellen använde redan 2028; etiketten korrigeras till canonical datum/år." },
    { fieldPath: "valuation.scenarios", oldValue: "Hårdkodade visningsvärden", newValue: "Spårbar EPS × P/E-bridge", reason: "v11.2 kräver resultat- och värderingsdrivare för varje scenario." },
  ],
  eventDelta: { eventId: "alphabet-q2-2026", comparedToVersion: "alphabet-v11.1-2026-08-08", factChanges: ["Q2 2026 Cloud, Search, kapitalallokering och FCF"], assumptionChanges: ["Explicit utspädningsantagande 2028"], thesisChanges: ["Cloud och Search stärks; kapitalavkastning kvarstår ej bekräftad"], valuationChanges: ["CAGR och scenariobryggor beräknas från explicit datum"], decisionChange: null },
} as const;

export function validateAlphabetValuation() {
  const probability = alphabetScenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
  const weighted = alphabetScenarios.reduce((sum, scenario) => sum + scenario.fairValue * scenario.probability, 0);
  return {
    probability,
    weighted,
    scenariosMatchEbit: alphabetScenarios.every((scenario) => Math.abs(scenario.revenue * scenario.ebitMargin - scenario.ebit) < 1e-9),
    scenariosMatchPreTax: alphabetScenarios.every((scenario) => Math.abs(scenario.ebit + scenario.normalizedOtherIncome + scenario.netInterest - scenario.preTaxIncome) < 1e-9),
    scenariosMatchNetIncome: alphabetScenarios.every((scenario) => Math.abs(scenario.preTaxIncome - scenario.taxExpense - scenario.normalizedNetIncome) < 1e-9),
    scenariosMatchEps: alphabetScenarios.every((scenario) => Math.abs(scenario.netIncomeAvailableToCommon / scenario.dilutedShares - scenario.normalizedEps) < 1e-9),
    scenariosMatchEpsTimesPe: alphabetScenarios.every((scenario) => Math.abs(scenario.normalizedEps * scenario.peMultiple - scenario.fairValue) < 1e-9),
    weightedMatches: Math.abs(weighted - alphabetProbabilityWeightedValue) < 1e-9,
  };
}
