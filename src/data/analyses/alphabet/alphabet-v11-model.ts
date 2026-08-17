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
// Annualisering ska alltid börja på datumet för den prövade referenskursen,
// inte på det senare analysdatumet.
export const ALPHABET_VALUATION_YEARS = (Date.parse(`${ALPHABET_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${ALPHABET_REFERENCE_DATE}T00:00:00Z`)) / (365.25 * 24 * 60 * 60 * 1000);
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

const alphabetRiskRewardBoundaries = [
  {
    boundaryId: "attractive-to-balanced",
    canonicalPrice: { value: 290.21784151594767, currency: "USD" },
    annualizedValuePotential: 0.12696081465025522,
    bearDownside: -0.1662051859526944,
    risk: "MEDEL_HÖG" as const,
    rationale: "Vid denna nivå är den annualiserade värdepotentialen cirka 12,7 % samtidigt som Bear-nedsidan är cirka 16,6 %. Det ger tillräcklig ersättning för Alphabets MEDEL–HÖGA risk: AI-capex, Search-monetisering, multipelberoende och tesen om kapitalavkastning kräver fortsatt bevis. Över nivån försämras både värdepotentialen och Bear-skyddet snabbt.",
    derivedClaimIds: ["alphabet-d-risk-reward-zones"],
  },
  {
    boundaryId: "balanced-to-weak",
    canonicalPrice: { value: 332.4240880424018, currency: "USD" },
    annualizedValuePotential: 0.06500062925891048,
    bearDownside: -0.27206800017111166,
    risk: "MEDEL_HÖG" as const,
    rationale: "Vid denna nivå återstår cirka 6,5 % annualiserad värdepotential medan Bear-nedsidan är cirka 27,2 %. Den kvarvarande ersättningen är då för liten för scenario-spreaden, den fortsatt obevisade kapitalavkastningen på AI-investeringarna och beroendet av en högre framtida multipel. Svag risk/reward uppstår därför före det sannolikhetsvägda värdet.",
    derivedClaimIds: ["alphabet-d-risk-reward-zones"],
  },
] as const;

/** Canonical MEMBER-zoner. Frontend ska endast presentera dessa redan härledda värden. */
export const alphabetRiskRewardZones = {
  status: "APPROVED" as const,
  visibility: "MEMBER" as const,
  method: "Fasta redaktionella zoner som väger samman annualiserad värdepotential, Bear-nedsida, scenario-spridning, MEDEL–HÖG risk, tesstatus och multipel-/modellrisk. Zonerna är inte personliga råd.",
  valuationDate: ALPHABET_VALUATION_DATE,
  canonicalRefs: {
    weightedFairValue: "alphabet-d-weighted-fair-value",
    annualizedValuePotential: "alphabet-d-annualized-value-potential",
    bearFairValue: "alphabet-d-weighted-fair-value",
    risk: "alphabet-n-risk",
    marketReference: "alphabet-f-market-reference",
  },
  boundaries: alphabetRiskRewardBoundaries,
  zones: [
    {
      zone: "ATTRACTIVE" as const,
      priceInterval: { min: null, max: 290.21784151594767, currency: "USD", minInclusive: false, maxInclusive: false },
      boundaryRefs: ["attractive-to-balanced"],
      rationale: "Förbättrad säkerhetsmarginal: potentialen och Bear-skyddet kompenserar tydligt för Alphabets MEDEL–HÖGA risk och för att centrala teser fortsatt måste bevisas.",
      derivedClaimIds: ["alphabet-d-risk-reward-zones"],
      presentation: { title: "Attraktiv risk/reward", priceLabel: "Under 290,22 USD", annualPotentialLabel: "Cirka +12,7 %/år eller högre", bearDownsideLabel: "Bear-nedsida: cirka −16,6 % eller mindre" },
    },
    {
      zone: "BALANCED" as const,
      priceInterval: { min: 290.21784151594767, max: 332.4240880424018, currency: "USD", minInclusive: true, maxInclusive: false },
      boundaryRefs: ["attractive-to-balanced", "balanced-to-weak"],
      rationale: "Värderingen kan fortfarande vara rimlig, men säkerhetsmarginalen är inte tillräckligt stark för ett MEDEL–HÖG-riskcase med fortsatt AI-capex, tes- och multipelosäkerhet.",
      derivedClaimIds: ["alphabet-d-risk-reward-zones"],
      presentation: { title: "Balanserad risk/reward", priceLabel: "290,22–332,42 USD", annualPotentialLabel: "Cirka +12,7 till +6,5 %/år", bearDownsideLabel: "Bear-nedsida: cirka −16,6 till −27,2 %" },
    },
    {
      zone: "WEAK" as const,
      priceInterval: { min: 332.4240880424018, max: null, currency: "USD", minInclusive: true, maxInclusive: false },
      boundaryRefs: ["balanced-to-weak"],
      rationale: "Begränsad säkerhetsmarginal: den annualiserade värdepotentialen är för liten i förhållande till Bear-nedsidan, scenario-spridningen och de fortfarande obevisade delarna av Alphabet-caset.",
      derivedClaimIds: ["alphabet-d-risk-reward-zones"],
      presentation: { title: "Svag risk/reward", priceLabel: "Från 332,42 USD", annualPotentialLabel: "Cirka +6,5 %/år eller lägre", bearDownsideLabel: "Bear-nedsida: minst cirka −27,2 %" },
    },
  ],
  marketReferenceAssessment: {
    zone: "WEAK" as const,
    label: "Referenskursen vid analystillfället ligger i svag risk/reward",
    rationale: "Vid 353,47 USD den 7 augusti 2026 var den annualiserade värdepotentialen cirka 3,8 % medan Bear-nedsidan var cirka 31,5 %, vilket gav begränsad säkerhetsmarginal för ett MEDEL–HÖG-riskcase.",
  },
  recalculationDependencies: ["alphabet-d-weighted-fair-value", "alphabet-d-annualized-value-potential", "alphabet-n-risk", "alphabet-f-market-reference"],
  supportsUserScenarioRecalculation: false,
} as const;

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
  version: { versionId: "alphabet-v11.2-2026-08-17", parentVersionId: "alphabet-v11.2-2026-08-08", immutable: true, status: "PUBLISH_READY" as const },
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
    { id: "alphabet-f-market-reference", class: "FACT" as EvidenceClass, sourceRefs: ["GOOG-close-2026-08-07"], text: "GOOG:s referenskurs var 353,47 USD vid stängning den 7 augusti 2026." },
    { id: "alphabet-d-weighted-fair-value", class: "DERIVED" as EvidenceClass, sourceRefs: ["eps-bridge-reconstruction"], text: "Bear/Base/Bull ger 241,98/392,01/552,95 USD per aktie och sannolikhetsvägt värde 386,69 USD vid 2028-12-31." },
    { id: "alphabet-d-annualized-value-potential", class: "DERIVED" as EvidenceClass, sourceRefs: ["alphabet-f-market-reference", "alphabet-d-weighted-fair-value"], text: "Från 353,47 USD den 7 augusti 2026 till 386,69 USD den 31 december 2028 är total värdepotential 9,40 % och annualiserad värdepotential 3,812 % över 877 dagar / 365,25 = 2,40110 år." },
    { id: "alphabet-n-risk", class: "ANALYSIS" as EvidenceClass, sourceRefs: ["q2-2026-cloud", "q2-2026-search", "q2-2026-fcf", "eps-bridge-reconstruction"], text: "Alphabet bedöms ha MEDEL–HÖG risk eftersom AI-capex, Search-monetisering, framtida kapitalavkastning och en del av multipeln fortsatt kräver bevis, trots stark Cloud-tillväxt och en mycket stark balansräkning." },
    { id: "alphabet-d-risk-reward-zones", class: "DERIVED" as EvidenceClass, sourceRefs: ["alphabet-d-weighted-fair-value", "alphabet-d-annualized-value-potential", "alphabet-n-risk"], text: "Risk/reward-zonerna använder samma 2028-12-31-värdedatum som huvudvärderingen. Vid 290,217842 USD är annualiserad värdepotential 12,70 % och Bear-nedsidan 16,62 %; vid 332,424088 USD är motsvarande 6,50 % och 27,21 %." },
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
  riskRewardZones: alphabetRiskRewardZones,
  historicalContext: alphabetHistoricalContext,
  capitalFacts: alphabetCapitalFacts,
  changeTracking: [
    { fieldPath: "valuation_date", oldValue: "2027E label", newValue: ALPHABET_VALUATION_DATE, reason: "Modellen använde redan 2028; etiketten korrigeras till canonical datum/år." },
    { fieldPath: "valuation.scenarios", oldValue: "Hårdkodade visningsvärden", newValue: "Spårbar EPS × P/E-bridge", reason: "v11.2 kräver resultat- och värderingsdrivare för varje scenario." },
    { fieldPath: "valuation.annualizedPotentialPct", oldValue: "3,816 % från analysdatum 2026-08-08", newValue: "3,812 % från referensdatum 2026-08-07", reason: "v11.2 kräver annualisering från market_reference.as_of. Publik avrundning är oförändrat +4 %/år." },
    { fieldPath: "valuation.riskRewardZones", oldValue: null, newValue: "alphabet-v11.2-2026-08-17", reason: "Godkända MEMBER-zoner läggs ovanpå befintlig värdering efter en kvalitativ bedömning av annualiserad potential, Bear-nedsida, scenario-spread, tesstatus och MEDEL–HÖG risk." },
  ],
  eventDelta: { eventId: "alphabet-risk-reward-2026-08-17", comparedToVersion: "alphabet-v11.2-2026-08-08", factChanges: [], assumptionChanges: [], thesisChanges: [], valuationChanges: ["Annualisering korrigerad från market_reference.as_of", "APPROVED MEMBER-risk/reward-zoner lagda ovanpå oförändrad Bear/Base/Bull-värdering"], decisionChange: null },
} as const;

export function validateAlphabetValuation() {
  const probability = alphabetScenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
  const weighted = alphabetScenarios.reduce((sum, scenario) => sum + scenario.fairValue * scenario.probability, 0);
  const [attractiveBoundary, weakBoundary] = alphabetRiskRewardZones.boundaries;
  const annualizedAt = (price: number) => Math.pow(alphabetProbabilityWeightedValue / price, 1 / ALPHABET_VALUATION_YEARS) - 1;
  const bearDownsideAt = (price: number) => Math.min(alphabetScenarios[0].fairValue / price - 1, 0);
  return {
    probability,
    weighted,
    scenariosMatchEbit: alphabetScenarios.every((scenario) => Math.abs(scenario.revenue * scenario.ebitMargin - scenario.ebit) < 1e-9),
    scenariosMatchPreTax: alphabetScenarios.every((scenario) => Math.abs(scenario.ebit + scenario.normalizedOtherIncome + scenario.netInterest - scenario.preTaxIncome) < 1e-9),
    scenariosMatchNetIncome: alphabetScenarios.every((scenario) => Math.abs(scenario.preTaxIncome - scenario.taxExpense - scenario.normalizedNetIncome) < 1e-9),
    scenariosMatchEps: alphabetScenarios.every((scenario) => Math.abs(scenario.netIncomeAvailableToCommon / scenario.dilutedShares - scenario.normalizedEps) < 1e-9),
    scenariosMatchEpsTimesPe: alphabetScenarios.every((scenario) => Math.abs(scenario.normalizedEps * scenario.peMultiple - scenario.fairValue) < 1e-9),
    weightedMatches: Math.abs(weighted - alphabetProbabilityWeightedValue) < 1e-9,
    annualizationStartsAtReferenceDate: Math.abs(ALPHABET_VALUATION_YEARS - ((Date.parse(`${ALPHABET_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${ALPHABET_REFERENCE_DATE}T00:00:00Z`)) / (365.25 * 24 * 60 * 60 * 1000))) < 1e-12,
    riskRewardBoundariesMatch: [attractiveBoundary, weakBoundary].every((boundary) =>
      Math.abs(annualizedAt(boundary.canonicalPrice.value) - boundary.annualizedValuePotential) < 1e-9 &&
      Math.abs(bearDownsideAt(boundary.canonicalPrice.value) - boundary.bearDownside) < 1e-9,
    ),
    riskRewardZonesAreOrdered: alphabetRiskRewardZones.zones[0].priceInterval.max === alphabetRiskRewardZones.zones[1].priceInterval.min &&
      alphabetRiskRewardZones.zones[1].priceInterval.max === alphabetRiskRewardZones.zones[2].priceInterval.min,
  };
}
