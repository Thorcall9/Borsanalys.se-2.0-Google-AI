export type NvidiaEvidenceClass = "FACT" | "DERIVED" | "ASSUMPTION" | "ANALYSIS" | "NOT_DECISION_GRADE";

export const NVIDIA_ANALYSIS_DATE = "2026-08-28";
export const NVIDIA_SOURCE_CUTOFF_DATE = "2026-08-28";
export const NVIDIA_REFERENCE_DATE = "2026-08-27";
export const NVIDIA_REFERENCE_PRICE = 227.98;
export const NVIDIA_VALUATION_DATE = "2028-01-30";
export const NVIDIA_VALUATION_YEARS =
  (Date.parse(`${NVIDIA_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${NVIDIA_REFERENCE_DATE}T00:00:00Z`)) /
  (365.25 * 24 * 60 * 60 * 1000);

const scenarioInputs = [
  {
    id: "bear" as const,
    label: "Bear",
    probability: 0.30,
    revenue: 520,
    revenuePath: { fy2027: 392, fy2028: 520, fy2029: 610 },
    operatingMargin: 0.52,
    normalizedFinanceAndOther: 1,
    taxRate: 0.18,
    dilutedShares: 24.0,
    peMultiple: 16,
    fcfMargin: 0.38,
    description:
      "AI-capex bromsar efter den nuvarande leveransvågen, konkurrens och kundfinansiering pressar marginalen och marknaden värderar NVIDIA som ett mer cykliskt halvledarbolag.",
    revenuePathRationale:
      "FY2027E 392 → FY2028E 520 md USD (+32,7 %). Rubin levererar, men energibrist, kundfinansiering och långsammare datacenterfärdigställanden gör att utfallet hamnar tydligt under ledningens cirka 70-procentiga tillväxtutsikt. Kapacitetsåtaganden och svagare volymabsorption pressar marginal och kassakonvertering.",
    probabilityRationale:
      "30 % speglar att ett tydligt svagare FY2028-utfall är reellt när kundkoncentration, exportkontroller, finansieringsåtaganden och ett snabbt arkitekturtempo verkar samtidigt.",
    multipleRationale:
      "16x P/E avser en regim med klart lägre tillväxt, sämre kassakonvertering och mindre tilltro till att dagens marginalnivå är uthållig.",
  },
  {
    id: "base" as const,
    label: "Base",
    probability: 0.50,
    revenue: 680,
    revenuePath: { fy2027: 402, fy2028: 680, fy2029: 900 },
    operatingMargin: 0.60,
    normalizedFinanceAndOther: 2,
    taxRate: 0.17,
    dilutedShares: 23.5,
    peMultiple: 22,
    fcfMargin: 0.46,
    description:
      "Rubin och en bredare efterfrågemix ger fortsatt snabb tillväxt, men marginal och kassakonvertering normaliseras när system-, minnes- och finansieringskostnader växer.",
    revenuePathRationale:
      "FY2027E 402 → FY2028E 680 md USD (+69,2 %). Rubin skalar, ACIE och hyperscale växer parallellt och omsättningen landar nära ledningens supply-constrained utsikt om cirka 70 % tillväxt, medan marginalen normaliseras från R12-nivån.",
    probabilityRationale:
      "50 % är huvudvikten eftersom rapporten och ledningens FY2028-utsikt styrker efterfrågan och produktutförandet. Utsikten är samtidigt preliminär och förutsätter att bolaget faktiskt kan säkra den leveranskapacitet som krävs.",
    multipleRationale:
      "22x P/E kräver fortsatt strukturell tillväxt och hög avkastning på ekosysteminvesteringarna, men ger ingen toppmultipel för dagens extraordinära tillväxttakt.",
  },
  {
    id: "bull" as const,
    label: "Bull",
    probability: 0.20,
    revenue: 780,
    revenuePath: { fy2027: 412, fy2028: 780, fy2029: 1100 },
    operatingMargin: 0.65,
    normalizedFinanceAndOther: 3,
    taxRate: 0.17,
    dilutedShares: 23.2,
    peMultiple: 27,
    fcfMargin: 0.51,
    description:
      "AI-fabriker skalar globalt, Rubin försvarar plattformspremien och tredje parts kapital absorberar merparten av finansieringsbehovet utan att NVIDIAs kassaflöde eller marginal urholkas.",
    revenuePathRationale:
      "FY2027E 412 → FY2028E 780 md USD (+89,3 %). Kundernas efterfrågesignaler omsätts i nästan dubblerad försäljning när Rubin, inferens, sovereign AI och ACIE skalar samtidigt och utökad leveranskapacitet minskar flaskhalsarna.",
    probabilityRationale:
      "20 % eftersom utfallet kräver att tillväxt, marginal, kassakonvertering, kundekonomi och multipel levererar samtidigt på en redan mycket stor intäktsbas.",
    multipleRationale:
      "27x P/E förutsätter att NVIDIA fortfarande uppfattas som en strukturell plattformsledare med synlig tillväxt även efter FY2028.",
  },
] as const;

export const nvidiaScenarios = scenarioInputs.map((input) => {
  const operatingIncome = input.revenue * input.operatingMargin;
  const preTaxIncome = operatingIncome + input.normalizedFinanceAndOther;
  const taxExpense = preTaxIncome * input.taxRate;
  const normalizedNetIncome = preTaxIncome - taxExpense;
  const normalizedEps = normalizedNetIncome / input.dilutedShares;
  const fairValue = normalizedEps * input.peMultiple;
  const normalizedFcf = input.revenue * input.fcfMargin;
  const fcfPerShare = normalizedFcf / input.dilutedShares;

  return {
    ...input,
    operatingIncome,
    preTaxIncome,
    taxExpense,
    normalizedNetIncome,
    normalizedEps,
    fairValue,
    normalizedFcf,
    fcfPerShare,
    priceToFcf: fairValue / fcfPerShare,
    revenueGrowthFromFy2027Pct: input.revenue / input.revenuePath.fy2027 - 1,
    totalPotentialPct: fairValue / NVIDIA_REFERENCE_PRICE - 1,
    annualizedPotentialPct: Math.pow(fairValue / NVIDIA_REFERENCE_PRICE, 1 / NVIDIA_VALUATION_YEARS) - 1,
  };
});

export const nvidiaWeightedFairValue = nvidiaScenarios.reduce(
  (sum, scenario) => sum + scenario.probability * scenario.fairValue,
  0,
);

const downsideStressInput = {
  revenue: 450,
  operatingMargin: 0.50,
  normalizedFinanceAndOther: 0.5,
  taxRate: 0.165,
  dilutedShares: 23.8,
  peMultiple: 15,
  fcfMargin: 0.32,
} as const;

const downsideStressOperatingIncome = downsideStressInput.revenue * downsideStressInput.operatingMargin;
const downsideStressPreTaxIncome = downsideStressOperatingIncome + downsideStressInput.normalizedFinanceAndOther;
const downsideStressNetIncome = downsideStressPreTaxIncome * (1 - downsideStressInput.taxRate);
const downsideStressEps = downsideStressNetIncome / downsideStressInput.dilutedShares;

export const nvidiaDownsideStressTest = {
  ...downsideStressInput,
  label: "Fördjupat balansräkningsstress",
  role: "SENSITIVITY_ONLY" as const,
  probability: null,
  includedInWeightedFairValue: false,
  operatingIncome: downsideStressOperatingIncome,
  preTaxIncome: downsideStressPreTaxIncome,
  normalizedNetIncome: downsideStressNetIncome,
  normalizedEps: downsideStressEps,
  fairValue: downsideStressEps * downsideStressInput.peMultiple,
  normalizedFcf: downsideStressInput.revenue * downsideStressInput.fcfMargin,
  rationale:
    "Testar en snabbare capex-inbromsning där delar av leverantörs- och kapacitetsåtagandena påverkar volymabsorption, lager, marginal och kassakonvertering samtidigt. Det är en intern känslighetskontroll, inte ett fjärde scenario och ingår inte i sannolikhetsvikten.",
} as const;

export const nvidiaReported = {
  fy2025: { revenue: 130.497, operatingIncome: 81.453, freeCashFlow: 60.724 },
  fy2026: { revenue: 215.938, operatingIncome: 130.387, freeCashFlow: 96.575 },
  h1Fy2026: { revenue: 90.805, operatingIncome: 50.078, freeCashFlow: 39.585 },
  h1Fy2027: { revenue: 177.837, operatingIncome: 117.270, freeCashFlow: 69.895 },
  h1Fy2027WorkingCapitalCashFlow: { accountsReceivable: -24.590, inventory: -10.204 },
  q1Fy2027: { revenue: 81.615, operatingIncome: 53.536, freeCashFlow: 48.554 },
  q2Fy2027: {
    revenue: 96.221,
    dataCenterRevenue: 89.023,
    hyperscaleRevenue: 48.710,
    acieRevenue: 40.313,
    operatingIncome: 63.734,
    nonGaapNetIncome: 53.954,
    freeCashFlow: 21.341,
    operatingCashFlow: 24.077,
    accountsReceivable: 63.059,
    inventory: 31.575,
    dilutedShares: 24.285,
  },
  q3Fy2027RevenueGuidance: 108,
  supplyAndCapacityCommitments: { current: 279, priorQuarter: 119 },
  contractualCommitmentsTotal: 366,
  guarantees: { aiCloudLandPowerShell: 3.5, sbEnergy: 105, grossMaximum: 108.5 },
} as const;

export const nvidiaLtm = {
  revenue: nvidiaReported.fy2026.revenue - nvidiaReported.h1Fy2026.revenue + nvidiaReported.h1Fy2027.revenue,
  operatingIncome:
    nvidiaReported.fy2026.operatingIncome - nvidiaReported.h1Fy2026.operatingIncome + nvidiaReported.h1Fy2027.operatingIncome,
  freeCashFlow:
    nvidiaReported.fy2026.freeCashFlow - nvidiaReported.h1Fy2026.freeCashFlow + nvidiaReported.h1Fy2027.freeCashFlow,
};

const NVIDIA_ATTRACTIVE_BOUNDARY_PRICE = 197.82044444444452;
const NVIDIA_WEAK_BOUNDARY_PRICE = 246.7632435665177;
const NVIDIA_RISK_REWARD_SCALE_MIN = 120;
const NVIDIA_RISK_REWARD_SCALE_MAX = 340;

const riskRewardMetricsAt = (testedPrice: number) => {
  const totalValuePotentialPct = nvidiaWeightedFairValue / testedPrice - 1;
  const annualizedValuePotentialPct =
    Math.pow(nvidiaWeightedFairValue / testedPrice, 1 / NVIDIA_VALUATION_YEARS) - 1;
  const bearCaseValueChangePct = nvidiaScenarios[0].fairValue / testedPrice - 1;
  const bearDownsidePct = Math.min(bearCaseValueChangePct, 0);
  return {
    testedPrice,
    totalValuePotentialPct,
    annualizedValuePotentialPct,
    bearCaseValueChangePct,
    bearDownsidePct,
    upsideDownsideRatio:
      bearDownsidePct < 0 ? totalValuePotentialPct / Math.abs(bearDownsidePct) : null,
  };
};

const attractiveBoundaryMetrics = riskRewardMetricsAt(NVIDIA_ATTRACTIVE_BOUNDARY_PRICE);
const weakBoundaryMetrics = riskRewardMetricsAt(NVIDIA_WEAK_BOUNDARY_PRICE);
const counterfactualFactor = 0.075;
const riskRewardScaleSpan = NVIDIA_RISK_REWARD_SCALE_MAX - NVIDIA_RISK_REWARD_SCALE_MIN;
const bearToWeightedDistance = nvidiaWeightedFairValue - nvidiaScenarios[0].fairValue;
const weightedToBullDistance = nvidiaScenarios[2].fairValue - nvidiaWeightedFairValue;
const scenarioDistance = bearToWeightedDistance + weightedToBullDistance;

export const nvidiaRiskRewardZones = {
  status: "APPROVED" as const,
  visibility: "MEMBER" as const,
  method:
    "Fasta redaktionella zoner som väger samman annualiserad värdepotential, Bear-nedsida, scenario-spridning, MEDEL–HÖG risk, kassaflödeskvalitet, kundkoncentration och kredit-/garantiåtaganden. Ingen enskild procentsats eller kvot styr gränserna.",
  valuationDate: NVIDIA_VALUATION_DATE,
  calculation: {
    referencePrice: NVIDIA_REFERENCE_PRICE,
    referenceDate: NVIDIA_REFERENCE_DATE,
    valuationDate: NVIDIA_VALUATION_DATE,
    probabilityWeightedValue: nvidiaWeightedFairValue,
    bearValue: nvidiaScenarios[0].fairValue,
    upsideDownsideRatioFormula:
      "total_value_potential / abs(bear_downside); kontrollvariabel, aldrig ensam beslutsregel",
    testPoints: [
      145,
      160,
      NVIDIA_ATTRACTIVE_BOUNDARY_PRICE * (1 - counterfactualFactor),
      NVIDIA_ATTRACTIVE_BOUNDARY_PRICE,
      NVIDIA_ATTRACTIVE_BOUNDARY_PRICE * (1 + counterfactualFactor),
      NVIDIA_REFERENCE_PRICE,
      200,
      NVIDIA_WEAK_BOUNDARY_PRICE * (1 - counterfactualFactor),
      NVIDIA_WEAK_BOUNDARY_PRICE,
      NVIDIA_WEAK_BOUNDARY_PRICE * (1 + counterfactualFactor),
      240,
      260,
      nvidiaWeightedFairValue,
    ].map(riskRewardMetricsAt),
  },
  analysis: {
    risk: "MEDEL_HÖG" as const,
    companySpecificRiskFactors: [
      "FY2028-värdet kräver fortsatt exceptionell omsättningstillväxt från en redan mycket stor bas; ledningens cirka 70-procentiga utsikt minskar men eliminerar inte prognosrisken.",
      "Bear-värdet ligger långt under övriga scenarier och visar hög scenario- och multipelrisk.",
      "Kundkoncentration, långa betalningsvillkor och svag Q2-kassakonvertering försämrar Bear-skyddet.",
      "Leverantörs- och kapacitetsåtaganden på 279 md USD kan ge asymmetrisk marginal- och lagerrisk om efterfrågan eller datacenterbyggen försenas.",
      "AI-cloud-åtaganden och maximal bruttoexponering på 108,5 md USD i garantier kan flytta kredit- och motpartsrisk till NVIDIA.",
      "Exportkontroller, Kina och snabba arkitekturövergångar ökar prognososäkerheten.",
    ],
    thesisStatusRelevance:
      "Rubin- och efterfrågeteserna är stärkta, men kassakonvertering och ekosystemfinansiering är fortsatt under bevakning.",
    scenarioUncertainty:
      "Scenariospannet 148,37–492,63 USD är mycket brett och FY2028-omsättningen är modellens minst bevisade input, trots ledningens preliminära utsikt.",
    requiredRiskCompensation:
      "MEDEL–HÖG risk kräver både hög kvarvarande värdepotential och tydligt bättre Bear-skydd för ATTRACTIVE. Relevant uppsida utan sådant skydd klassas BALANCED; WEAK kan börja före sannolikhetsvägt värde.",
  },
  boundaries: [
    {
      boundaryId: "attractive-to-balanced",
      canonicalPrice: { value: NVIDIA_ATTRACTIVE_BOUNDARY_PRICE, currency: "USD" },
      ...attractiveBoundaryMetrics,
      risk: "MEDEL_HÖG" as const,
      rationale:
        "Vid gränsen är annualiserad värdepotential cirka 34,6 %, Bear-nedsidan cirka 25,0 % och total potential cirka 52,8 %. Sammantaget ger det tydlig kompensation för den korta horisonten, scenario-spreaden, kassaflödesrisken samt kredit- och garantiåtagandena.",
      counterfactualBoundaryTest: {
        lower: riskRewardMetricsAt(NVIDIA_ATTRACTIVE_BOUNDARY_PRICE * (1 - counterfactualFactor)),
        higher: riskRewardMetricsAt(NVIDIA_ATTRACTIVE_BOUNDARY_PRICE * (1 + counterfactualFactor)),
        conclusion:
          "Cirka 7,5 % lägre förbättras både Bear-skydd och annualiserad potential tydligt och utfallet är klart ATTRACTIVE. Cirka 7,5 % högre passerar Bear-nedsidan 30 % medan finansierings- och kassaflödesteserna fortfarande är obevisade; då är BALANCED mer försvarbart.",
      },
      canonicalRefs: ["nvda-d-valuation", "nvda-n-risk", "nvda-f-working-capital", "nvda-f-supply-commitments", "nvda-f-guarantees"],
    },
    {
      boundaryId: "balanced-to-weak",
      canonicalPrice: { value: NVIDIA_WEAK_BOUNDARY_PRICE, currency: "USD" },
      ...weakBoundaryMetrics,
      risk: "MEDEL_HÖG" as const,
      rationale:
        "Vid gränsen återstår cirka 15,3 % annualiserad värdepotential och cirka 22,5 % total potential, medan Bear-nedsidan har vuxit till cirka 39,9 %. Över nivån är ersättningen för den breda scenario-, multipel- och finansieringsrisken för begränsad.",
      counterfactualBoundaryTest: {
        lower: riskRewardMetricsAt(NVIDIA_WEAK_BOUNDARY_PRICE * (1 - counterfactualFactor)),
        higher: riskRewardMetricsAt(NVIDIA_WEAK_BOUNDARY_PRICE * (1 + counterfactualFactor)),
        conclusion:
          "Cirka 7,5 % lägre finns fortfarande drygt 21 % annualiserad potential och bättre relation mellan uppsida och Bear-nedsida, vilket stödjer BALANCED. Cirka 7,5 % högre faller potentialen under 10 % per år samtidigt som Bear-nedsidan överstiger 43 %, vilket tydligt stödjer WEAK.",
      },
      canonicalRefs: ["nvda-d-valuation", "nvda-n-risk", "nvda-f-concentration", "nvda-f-supply-commitments", "nvda-f-guarantees"],
    },
  ],
  zones: [
    {
      zone: "ATTRACTIVE" as const,
      priceInterval: { min: null, max: NVIDIA_ATTRACTIVE_BOUNDARY_PRICE, currency: "USD", minInclusive: false, maxInclusive: false },
      boundaryRefs: ["attractive-to-balanced"],
      rationale:
        "Materiellt förbättrad säkerhetsmarginal och tydligare Bear-skydd kompenserar för NVIDIAs MEDEL–HÖGA scenario-, kassaflödes- och finansieringsrisk.",
      presentation: {
        title: "Attraktiv risk/reward",
        priceLabel: "Under cirka 198 USD",
        annualPotentialLabel: "Cirka +34,6 %/år eller högre",
        bearDownsideLabel: "Bear-nedsida: cirka −25,0 % eller mindre",
      },
    },
    {
      zone: "BALANCED" as const,
      priceInterval: { min: NVIDIA_ATTRACTIVE_BOUNDARY_PRICE, max: NVIDIA_WEAK_BOUNDARY_PRICE, currency: "USD", minInclusive: true, maxInclusive: false },
      boundaryRefs: ["attractive-to-balanced", "balanced-to-weak"],
      rationale:
        "Potentialen är relevant, men Bear-skyddet är inte tillräckligt starkt för ATTRACTIVE när kundkoncentration, kassakonvertering och garantiåtaganden vägs in.",
      presentation: {
        title: "Balanserad risk/reward",
        priceLabel: "Cirka 198–247 USD",
        annualPotentialLabel: "Cirka +34,6 till +15,3 %/år",
        bearDownsideLabel: "Bear-nedsida: cirka −25,0 till −39,9 %",
      },
    },
    {
      zone: "WEAK" as const,
      priceInterval: { min: NVIDIA_WEAK_BOUNDARY_PRICE, max: null, currency: "USD", minInclusive: true, maxInclusive: false },
      boundaryRefs: ["balanced-to-weak"],
      rationale:
        "Återstående potential är för liten i förhållande till Bear-nedsidan, scenario-spreaden och de ännu obevisade delarna av finansierings- och kassaflödestesen.",
      presentation: {
        title: "Svag risk/reward",
        priceLabel: "Från cirka 247 USD",
        annualPotentialLabel: "Cirka +15,3 %/år eller lägre",
        bearDownsideLabel: "Bear-nedsida: minst cirka −39,9 %",
      },
    },
  ],
  marketReferenceAssessment: {
    zone: "BALANCED" as const,
    label: "Referenskursen vid analystillfället ligger i balanserad risk/reward",
    rationale:
      "Vid 227,98 USD är den annualiserade värdepotentialen cirka 21,9 %, samtidigt som Bear-nedsidan är cirka 34,9 % och finansierings-/kassaflödestesen fortsatt obevisad. Potentialen är relevant men Bear-skyddet är ännu inte tillräckligt för attraktiv risk/reward.",
  },
  presentation: {
    title: "När blir risk/reward mer attraktiv?",
    introduction:
      "Tre priszoner visar hur säkerhetsmarginalen förändras. Bedömningen väger annualiserad potential, Bear-nedsida, scenario-spread, kassaflödeskvalitet samt kredit- och garantiåtaganden.",
    disclaimer:
      "Risk/reward-zonerna är Börsanalys.se:s fasta redaktionella bedömning. KÖP-rekommendationen bygger på helheten i värdepotential, scenarier och risk – inte på zonen ensam.",
    memberInsight: {
      companyLabel: "NVIDIA",
      ticker: "NVDA",
      identityLabel: "NVIDIA · NVDA",
      referencePriceLabel: "227,98 USD",
      referenceDateLabel: "27 aug 2026",
      assessmentLabel: "Balanserad risk/reward",
      assessmentNote: "Referenspunkten är kursen vid analystillfället, inte en köp- eller säljsignal.",
      assessmentRationale:
        "Cirka 22 % annualiserad värdepotential är relevant, men cirka 35 % Bear-nedsida och ännu obevisad kassakonvertering samt finansieringsrisk håller bedömningen i balanserad risk/reward.",
      zoneSharesPct: [
        ((NVIDIA_ATTRACTIVE_BOUNDARY_PRICE - NVIDIA_RISK_REWARD_SCALE_MIN) / riskRewardScaleSpan) * 100,
        ((NVIDIA_WEAK_BOUNDARY_PRICE - NVIDIA_ATTRACTIVE_BOUNDARY_PRICE) / riskRewardScaleSpan) * 100,
        ((NVIDIA_RISK_REWARD_SCALE_MAX - NVIDIA_WEAK_BOUNDARY_PRICE) / riskRewardScaleSpan) * 100,
      ],
      markers: [
        { id: "reference" as const, positionPct: ((NVIDIA_REFERENCE_PRICE - NVIDIA_RISK_REWARD_SCALE_MIN) / riskRewardScaleSpan) * 100, label: "▼ Kurs 228 USD", placement: "above" as const, align: "center" as const },
        { id: "weighted-fair-value" as const, positionPct: ((nvidiaWeightedFairValue - NVIDIA_RISK_REWARD_SCALE_MIN) / riskRewardScaleSpan) * 100, label: "Vårt värde 302 USD", placement: "below" as const, align: "end" as const },
      ],
      scenarioSpread: {
        label: "Scenariospann till 30 januari 2028",
        points: [
          { label: "Bear", valueLabel: "148 USD", annualPotentialLabel: "−26,0 %/år" },
          { label: "Sannolikhetsvägt", valueLabel: "302 USD", annualPotentialLabel: "+21,9 %/år" },
          { label: "Bull", valueLabel: "493 USD", annualPotentialLabel: "+71,6 %/år" },
        ],
        rangeSharesPct: [
          (bearToWeightedDistance / scenarioDistance) * 100,
          (weightedToBullDistance / scenarioDistance) * 100,
        ],
        distanceLabel: "Bear → sannolikhetsvägt: 154 USD · sannolikhetsvägt → Bull: 190 USD",
      },
      footerNote:
        "Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.",
    },
  },
  recalculationDependencies: ["nvda-d-valuation", "nvda-n-risk", "nvda-f-working-capital", "nvda-f-concentration", "nvda-f-supply-commitments", "nvda-f-guarantees"],
  supportsUserScenarioRecalculation: false,
} as const;

export const nvidiaV112Dossier = {
  version: {
    versionId: "nvidia-q2-fy2027-v11.2-r7",
    parentVersionId: "nvidia-q2-fy2027-v11.2-r6",
    status: "PUBLISH_READY" as const,
    publicationApprovedAt: "2026-08-31",
    immutable: true,
  },
  identity: {
    analysisId: "nvidia-nvda-q2-fy2027",
    companyId: "nvidia-corp",
    analysisDate: NVIDIA_ANALYSIS_DATE,
    sourceCutoffDate: NVIDIA_SOURCE_CUTOFF_DATE,
    valuationDate: NVIDIA_VALUATION_DATE,
    valuationYearLabel: "FY2028E",
    marketReference: {
      price: NVIDIA_REFERENCE_PRICE,
      currency: "USD",
      asOf: NVIDIA_REFERENCE_DATE,
      sourceRef: "NVDA-close-2026-08-27",
    },
  },
  accessLevel: "PUBLIC" as const,
  valuationModelType: "earnings_multiple" as const,
  interactiveValuation: "SUPPORTED" as const,
  recommendation: { value: "KÖP" as const, status: "APPROVED" as const },
  risk: {
    label: "MEDEL_HÖG" as const,
    rationale:
      "Den operativa kvaliteten är mycket hög, men värdet är känsligt för en ovanligt stor intäktsprognos, kundkoncentration, exportkontroller, arkitekturövergångar, 279 md USD i leverantörs- och kapacitetsåtaganden samt växande kredit- och garantiåtaganden.",
  },
  insight:
    "Rapporten flyttar inte bara upp intäktsnivån. Den flyttar också en del av risken från ren chip-efterfrågan till finansiering och förhandssäkrad kapacitet för hela AI-infrastrukturen. NVIDIA kan skapa en större marknad genom investeringar, molnåtaganden, garantier och 279 md USD i leverantörs- och kapacitetsåtaganden, men samma mekanism gör volymabsorption, kassakonvertering och motpartsrisk till centrala bevispunkter.",
  claims: [
    { id: "nvda-f-q2-revenue", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q", "NVDA-Q2-FY2027-presentation"], text: "Q2 FY2027 omsättning var 96,221 md USD och Data Center omsatte 89,023 md USD." },
    { id: "nvda-f-q2-margin", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "GAAP-rörelseresultatet var 63,734 md USD, motsvarande 66,2 % rörelsemarginal." },
    { id: "nvda-f-q3-guide", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-presentation"], text: "Q3 FY2027-guidningen är 108 md USD ±2 % med 74,0 % ±50 bp icke-GAAP-bruttomarginal och utan antagen Data Center compute-omsättning från Kina." },
    { id: "nvda-f-fy2028-outlook", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-call"], text: "På Q2-konferenssamtalet uppgav CFO Colette Kress en preliminär förväntan om cirka 70 % omsättningstillväxt FY2028 och beskrev utsikten som begränsad av tillgänglig leveranskapacitet. Det är en ledningsutsikt, inte ett rapporterat utfall eller en garanti." },
    { id: "nvda-f-rubin", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-presentation"], text: "NVIDIA uppgav att produktionsleveranser av Vera Rubin inleddes i början av augusti 2026." },
    { id: "nvda-f-q2-fcf", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-presentation"], text: "Q2 FY2027 fritt kassaflöde var 21,341 md USD och operativt kassaflöde 24,077 md USD." },
    { id: "nvda-d-ltm-fcf", class: "DERIVED" as NvidiaEvidenceClass, sourceRefs: ["NVDA-FY2026-results", "NVDA-Q1-FY2027-presentation", "NVDA-Q2-FY2027-presentation"], text: "R12 till Q2 FY2027 fritt kassaflöde var 126,885 md USD: 96,575 - 26,135 - 13,450 + 48,554 + 21,341." },
    { id: "nvda-f-working-capital", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "Kundfordringar var 63,059 md USD och lager 31,575 md USD. Under H1 FY2027 band ökningen i kundfordringar 24,590 md USD och lagerökningen 10,204 md USD i kassaflödet; bolaget kan ge investeringsklassade kunder betalningsvillkor från 90 dagar upp till ett år." },
    { id: "nvda-f-concentration", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "En direktkund stod för 16 % av Q2-intäkterna och tre direktkunder stod för 16 %, 15 % respektive 13 % av H1-intäkterna." },
    { id: "nvda-f-ecosystem", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "Per 26 juli 2026 redovisade NVIDIA 99 md USD i aktieinvesteringar, 25 md USD i investeringsåtaganden och 36 md USD i AI-cloud-åtaganden." },
    { id: "nvda-f-supply-commitments", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "Leverantörs- och kapacitetsåtaganden steg från 119 md USD föregående kvartal till 279 md USD den 26 juli 2026. Totala redovisade kontraktsåtaganden var 366 md USD; vissa leverantörsavtal kan vara uppsägningsbara, omplanerbara eller justerbara." },
    { id: "nvda-f-guarantees", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q", "NVDA-SB-Energy-8K"], text: "Maximal bruttoexponering för garantier var 108,5 md USD: 105,0 md USD för SB Energy och 3,5 md USD för andra AI-cloud-avtal. SB Energy-garantierna aktiveras villkorat och stegvis över nio faser, med första förväntade fas i FY2029. OpenAI har avtalat om ersättning och skadeslöshållande för vissa förluster, men NVIDIA varnar för att belopp kanske inte återvinns snabbt eller fullt ut." },
    { id: "nvda-f-investment-gains", class: "FACT" as NvidiaEvidenceClass, sourceRefs: ["NVDA-Q2-FY2027-10Q"], text: "Q2:s other income, net var 7,773 md USD och H1-kassaflödesanalysen redovisade 23,707 md USD i nettovinster från aktierelaterade värdepapper." },
    { id: "nvda-a-scenarios", class: "ASSUMPTION" as NvidiaEvidenceClass, sourceRefs: ["nvda-f-q2-revenue", "nvda-f-q3-guide", "nvda-f-fy2028-outlook", "nvda-f-working-capital", "nvda-f-supply-commitments", "nvda-f-guarantees"], text: "FY2028-scenarierna antar 520/680/780 md USD i omsättning, 52/60/65 % rörelsemarginal, 24,0/23,5/23,2 md aktier och 16/22/27x P/E. Ledningens cirka 70-procentiga tillväxtutsikt är ankare för Base, inte ett garanterat utfall." },
    { id: "nvda-a-revenue-path", class: "ASSUMPTION" as NvidiaEvidenceClass, sourceRefs: ["nvda-f-q2-revenue", "nvda-f-q3-guide", "nvda-f-fy2028-outlook", "nvda-f-rubin", "nvda-f-supply-commitments"], text: "Omsättningsbanan FY2027E→FY2028E är 392→520 md USD i Bear (+32,7 %), 402→680 md USD i Base (+69,2 %) och 412→780 md USD i Bull (+89,3 %). Skillnaden drivs av genomförandet av Rubin/ACIE/hyperscale, tillgänglig datacenter- och leveranskapacitet, kundfinansiering och volymabsorption mot leverantörsåtagandena." },
    { id: "nvda-d-downside-stress", class: "DERIVED" as NvidiaEvidenceClass, sourceRefs: ["nvda-f-supply-commitments", "nvda-f-working-capital", "nvda-a-scenarios"], text: `En separat, oviktad känslighetskontroll med 450 md USD omsättning, 50 % rörelsemarginal, 32 % FCF-marginal och 15x P/E ger cirka ${nvidiaDownsideStressTest.fairValue.toFixed(2)} USD. Den ingår inte i Bear/Base/Bull eller sannolikhetsvägt värde.` },
    { id: "nvda-d-valuation", class: "DERIVED" as NvidiaEvidenceClass, sourceRefs: ["nvda-a-scenarios", "NVDA-close-2026-08-27"], text: "Bear/Base/Bull ger cirka 148/319/493 USD och ett sannolikhetsvägt värde på 302,33 USD vid 30 januari 2028." },
    { id: "nvda-d-risk-reward-zones", class: "DERIVED" as NvidiaEvidenceClass, sourceRefs: ["nvda-d-valuation", "nvda-f-working-capital", "nvda-f-concentration", "nvda-f-supply-commitments", "nvda-f-guarantees"], text: "APPROVED MEMBER-zoner använder samma värderingsdatum. Vid 197,820444 USD är annualiserad potential cirka 34,6 % och Bear-nedsida cirka 25,0 %; vid 246,763244 USD är motsvarande cirka 15,3 % och 39,9 %. Frontend visar gränserna som cirka 198 respektive 247 USD utan att ändra canonical intervall." },
    { id: "nvda-n-decision", class: "ANALYSIS" as NvidiaEvidenceClass, sourceRefs: ["nvda-d-valuation", "nvda-d-downside-stress", "nvda-f-q3-guide", "nvda-f-fy2028-outlook", "nvda-f-supply-commitments", "nvda-f-guarantees", "nvda-d-ltm-fcf"], text: "KÖP är redaktionellt godkänd: den omkalibrerade FY2028-modellen ger cirka 22 % annualiserad värdepotential och balanserad risk/reward vid referenskursen. MEDEL–HÖG risk, cirka 35 % Bear-nedsida och ett separat stressvärde på cirka 119 USD motiverar fortsatt tydlig försiktighet." },
  ],
  sources: [
    { id: "NVDA-Q2-FY2027-10Q", document: "NVIDIA Form 10-Q, Q2 FY2027", date: "2026-08-27", suppliedFile: "NVDA-2027-Q2-10Q-Final-including-exhibits.pdf" },
    { id: "NVDA-Q2-FY2027-presentation", document: "NVIDIA Q2 FY2027 Quarterly Presentation", date: "2026-08-26", suppliedFile: "NVDA-F2Q27-Quarterly-Presentation-final-1.pdf" },
    { id: "NVDA-Q2-FY2027-call", document: "NVIDIA Q2 FY2027 conference call", date: "2026-08-26", url: "https://investor.nvidia.com/events-and-presentations/events-and-presentations/event-details/2026/NVIDIA-2nd-Quarter-FY27-Financial-Results/default.aspx" },
    { id: "NVDA-Q1-FY2027-10Q", document: "NVIDIA Form 10-Q, Q1 FY2027", date: "2026-05-20", suppliedFile: "927dc2d6-a76c-4006-9f34-8769b2c665fb.pdf" },
    { id: "NVDA-Q1-FY2027-presentation", document: "NVIDIA Q1 FY2027 Quarterly Presentation", date: "2026-05-20", suppliedFile: "NVDA-F1Q27-Quarterly-Presentation-FINAL.pdf" },
    { id: "NVDA-FY2026-Q2-10Q", document: "NVIDIA Form 10-Q, Q2 FY2026", date: "2025-08-27", suppliedFile: "Q2 nvidia.pdf" },
    { id: "NVDA-FY2026-Q3-10Q", document: "NVIDIA Form 10-Q, Q3 FY2026", date: "2025-11-19", suppliedFile: "Q3 nvidia.pdf" },
    { id: "NVDA-FY2026-results", document: "NVIDIA Q4 and FY2026 results", date: "2026-02-25", suppliedFile: "Q4 nvidia.pdf" },
    { id: "NVDA-FY2025-Q1-results", document: "NVIDIA Q1 FY2025 results", date: "2024-05-22", suppliedFile: "Q1 nvidia.pdf" },
    { id: "NVDA-SB-Energy-8K", document: "NVIDIA Form 8-K, SB Energy agreements", date: "2026-08-17", url: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000069/nvda-20260817.htm" },
    { id: "NVDA-close-2026-08-27", document: "NVDA historical close", date: NVIDIA_REFERENCE_DATE, url: "https://www.investing.com/equities/nvidia-corp-historical-data" },
  ],
  scenarios: nvidiaScenarios.map((scenario) => ({ ...scenario, valuationDate: NVIDIA_VALUATION_DATE })),
  stressTests: [nvidiaDownsideStressTest],
  horizonPolicy: {
    selectedRationale:
      "FY2028 används eftersom 30 januari 2028 är NVIDIAs naturliga nästa hela räkenskapsårsslut och ger fem mellanliggande kvartalsrapporter samt FY2028-utfallet som slutlig validering. Den kortare horisonten är ett dokumenterat avsteg från normal riktning på cirka 2–3 år.",
    rollRule:
      "Rulla canonical värderingsår till FY2029 vid Q1 FY2028-uppdateringen, när mindre än ett år återstår till FY2028-slutet. FY2028 behålls då som operativ kontrollpunkt, inte som konkurrerande huvudvärde.",
    antiCherryPickingRule:
      "Värderingsdatum får inte flyttas enbart för att skapa högre potential eller ändra rekommendation.",
  },
  valuation: {
    weightedFairValue: nvidiaWeightedFairValue,
    totalPotentialPct: nvidiaWeightedFairValue / NVIDIA_REFERENCE_PRICE - 1,
    annualizedPotentialPct: Math.pow(nvidiaWeightedFairValue / NVIDIA_REFERENCE_PRICE, 1 / NVIDIA_VALUATION_YEARS) - 1,
    yearsToValuation: NVIDIA_VALUATION_YEARS,
    fcfRole: "Rimlighetskontroll, inte separat DCF",
  },
  riskRewardZones: nvidiaRiskRewardZones,
  disclaimer: {
    centralDisclaimerVersion: "v11.2-2026-08",
    shortDisclaimerId: "standard-short-v11.2",
    fullDisclaimerUrl: "/villkor",
  },
  disclosures: {
    status: "HOLDING_CONFIRMED" as const,
    confirmedAt: "2026-08-29",
    directHolding: true,
    indirectExposure: true,
    holdingText: "Författaren äger NVIDIA-aktier direkt och har även indirekt ekonomisk exponering mot NVIDIA.",
    commercialRelationship: "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till NVIDIA Corporation i samband med denna analys.",
    commercialRelationshipConfirmedAt: "2026-08-31",
  },
  publicationBlockers: [],
  changeTracking: [
    { fieldPath: "historical.ltmFreeCashFlow", oldValue: 167.75, newValue: nvidiaLtm.freeCashFlow, reason: "R12 räknas om från NVIDIAs egna kvartalsvisa FCF-uppgifter." },
    { fieldPath: "historical.ltmFcfPerShare", oldValue: 6.91, newValue: nvidiaLtm.freeCashFlow / nvidiaReported.q2Fy2027.dilutedShares, reason: "R12-FCF dividerat med Q2:s utspädda aktieantal." },
    { fieldPath: "risk.sbEnergyGuarantees", oldValue: null, newValue: 105, reason: "Q2 FY2027 10-Q och 8-K redovisar den villkorade garantin." },
    { fieldPath: "valuation.scenarios", oldValue: "255/391/583 USD", newValue: "157/356/631 USD", reason: "Bear görs till ett verkligt negativt utfall och hela EPS-bryggan byggs om från omsättning, rörelsemarginal, finansnetto, skatt och aktier." },
    { fieldPath: "valuation.riskRewardZones", oldValue: "DRAFT", newValue: "APPROVED", reason: "Två bolagsspecifika gränser godkänns efter verifierade testpunkter, kontrafaktiska tester ±7,5 %, kontroll av frontendavrundning och analys av scenario-, kassaflödes-, koncentrations- och finansieringsrisk." },
    { fieldPath: "valuation.valuationDate", oldValue: "2029-01-31", newValue: NVIDIA_VALUATION_DATE, reason: "Horisonten flyttas till NVIDIAs naturliga FY2028-slut för att vara jämförbar med övriga analyser och kunna prövas rapport för rapport." },
    { fieldPath: "valuation.scenarios", oldValue: "157/356/631 USD vid FY2029", newValue: "134/277/453 USD vid FY2028", reason: "Samtliga scenarier byggs om från FY2028-omsättning och samma explicita värderingsdatum." },
    { fieldPath: "recommendation", oldValue: "KÖP (DRAFT)", newValue: "BEVAKA (DRAFT)", reason: "Den kortare och mer uppföljningsbara horisonten ger cirka 12 % annualiserad potential mot cirka 41 % Bear-nedsida vid referenskursen." },
    { fieldPath: "risk.supplyAndCapacityCommitments", oldValue: null, newValue: 279, reason: "Q2 FY2027 10-Q visar att leverantörs- och kapacitetsåtaganden steg från 119 till 279 md USD." },
    { fieldPath: "risk.grossGuaranteeExposure", oldValue: 105, newValue: 108.5, reason: "Canonical risk skiljer nu 105 md USD i SB Energy-garantier från 3,5 md USD i andra AI-cloud-garantier." },
    { fieldPath: "valuation.revenuePathRationale", oldValue: "implicit", newValue: "FY2027E→FY2028E per scenario", reason: "Omsättningsantagandena kopplas explicit till Rubin, ACIE/hyperscale, datacenterkapacitet, kundfinansiering och volymabsorption." },
    { fieldPath: "valuation.downsideStress", oldValue: null, newValue: nvidiaDownsideStressTest.fairValue, reason: "En separat oviktad balansräkningsstress dokumenterar ett korrelerat svagare utfall utan att skapa ett fjärde scenario." },
    { fieldPath: "valuation.riskRewardZones.presentationPrecision", oldValue: "cents", newValue: "approximately whole USD", reason: "Frontend tar bort falsk precision utan att flytta canonical zongränser." },
    { fieldPath: "valuation.horizonPolicy", oldValue: null, newValue: "roll at Q1 FY2028", reason: "Kortare FY2028-horisont motiveras och får en förutbestämd rullningsregel som motverkar cherry-picking." },
    { fieldPath: "valuation.scenarios", oldValue: "134/277/453 USD vid FY2028", newValue: "148/319/493 USD vid FY2028", reason: "Ledningens preliminära cirka 70-procentiga FY2028-utsikt gör den tidigare Bull-omsättningen till ett rimligare Base-ankare. Alla tre scenarier och risk/reward-zoner räknas därför om, medan sannolikheterna 30/50/20 behålls." },
    { fieldPath: "recommendation", oldValue: "BEVAKA (DRAFT)", newValue: "KÖP (APPROVED)", reason: "Cirka 22 % annualiserad värdepotential och balanserad risk/reward vid referenskursen ger ett tillräckligt starkt helhetscase för KÖP, samtidigt som MEDEL–HÖG risk och Bear-nedsidan redovisas tydligt." },
    { fieldPath: "version.status", oldValue: "NOT_PUBLISH_READY", newValue: "PUBLISH_READY", reason: "Rekommendation, snapshot, ägarupplysning, risk/reward-zoner och kommersiell relationsupplysning är godkända; tester och produktionsbygge passerar." },
  ],
  eventDelta: {
    eventId: "nvidia-q2-fy2027-publication-approval",
    comparedToVersion: "nvidia-q2-fy2027-v11.2-r6",
    factChanges: [],
    assumptionChanges: [],
    thesisChanges: [],
    valuationChanges: [],
    decisionChange: "Dossiern ändras från NOT_PUBLISH_READY till PUBLISH_READY efter slutlig kontroll av rekommendation, upplysningar, modell, risk/reward-zoner och frontend. KÖP (APPROVED) och MEDEL_HÖG risk är oförändrade.",
  },
} as const;

export function validateNvidiaValuation() {
  const probability = nvidiaScenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
  const weighted = nvidiaScenarios.reduce((sum, scenario) => sum + scenario.probability * scenario.fairValue, 0);
  const [attractiveBoundary, weakBoundary] = nvidiaRiskRewardZones.boundaries;
  return {
    probability,
    weighted,
    scenariosMatchOperatingIncome: nvidiaScenarios.every(
      (scenario) => Math.abs(scenario.revenue * scenario.operatingMargin - scenario.operatingIncome) < 1e-9,
    ),
    scenariosMatchNetIncome: nvidiaScenarios.every(
      (scenario) => Math.abs((scenario.operatingIncome + scenario.normalizedFinanceAndOther) * (1 - scenario.taxRate) - scenario.normalizedNetIncome) < 1e-9,
    ),
    scenariosMatchEps: nvidiaScenarios.every(
      (scenario) => Math.abs(scenario.normalizedNetIncome / scenario.dilutedShares - scenario.normalizedEps) < 1e-9,
    ),
    scenariosMatchValue: nvidiaScenarios.every(
      (scenario) => Math.abs(scenario.normalizedEps * scenario.peMultiple - scenario.fairValue) < 1e-9,
    ),
    scenariosMatchFcf: nvidiaScenarios.every(
      (scenario) => Math.abs(scenario.revenue * scenario.fcfMargin - scenario.normalizedFcf) < 1e-9,
    ),
    weightedMatches: Math.abs(weighted - nvidiaWeightedFairValue) < 1e-9,
    annualizationStartsAtReferenceDate:
      Math.abs(
        NVIDIA_VALUATION_YEARS -
          (Date.parse(`${NVIDIA_VALUATION_DATE}T00:00:00Z`) - Date.parse(`${NVIDIA_REFERENCE_DATE}T00:00:00Z`)) /
            (365.25 * 24 * 60 * 60 * 1000),
      ) < 1e-12,
    ltmFcfMatchesQuarterBridge:
      Math.abs(nvidiaLtm.freeCashFlow - (96.575 - 26.135 - 13.450 + 48.554 + 21.341)) < 1e-9,
    downsideStressMatches:
      Math.abs(nvidiaDownsideStressTest.operatingIncome - nvidiaDownsideStressTest.revenue * nvidiaDownsideStressTest.operatingMargin) < 1e-9 &&
      Math.abs(nvidiaDownsideStressTest.normalizedEps * nvidiaDownsideStressTest.peMultiple - nvidiaDownsideStressTest.fairValue) < 1e-9 &&
      nvidiaDownsideStressTest.includedInWeightedFairValue === false,
    scenarioRevenuePathsMatch: nvidiaScenarios.every(
      (scenario) => Math.abs(scenario.revenue / scenario.revenuePath.fy2027 - 1 - scenario.revenueGrowthFromFy2027Pct) < 1e-12,
    ),
    riskRewardBoundariesMatch: [attractiveBoundary, weakBoundary].every((boundary) => {
      const metrics = riskRewardMetricsAt(boundary.canonicalPrice.value);
      return Math.abs(metrics.annualizedValuePotentialPct - boundary.annualizedValuePotentialPct) < 1e-12 &&
        Math.abs(metrics.bearDownsidePct - boundary.bearDownsidePct) < 1e-12;
    }),
    riskRewardZonesAreOrdered:
      nvidiaRiskRewardZones.zones[0].priceInterval.max === nvidiaRiskRewardZones.zones[1].priceInterval.min &&
      nvidiaRiskRewardZones.zones[1].priceInterval.max === nvidiaRiskRewardZones.zones[2].priceInterval.min,
    riskRewardCounterfactualsAreComplete: nvidiaRiskRewardZones.boundaries.every((boundary) =>
      boundary.counterfactualBoundaryTest.lower.testedPrice < boundary.canonicalPrice.value &&
      boundary.counterfactualBoundaryTest.higher.testedPrice > boundary.canonicalPrice.value,
    ),
    riskRewardPresentationDoesNotMoveBoundaries:
      nvidiaRiskRewardZones.zones[0].presentation.priceLabel.includes("198") &&
      nvidiaRiskRewardZones.zones[1].presentation.priceLabel.includes("247") &&
      nvidiaRiskRewardZones.zones[0].priceInterval.max === NVIDIA_ATTRACTIVE_BOUNDARY_PRICE &&
      nvidiaRiskRewardZones.zones[1].priceInterval.max === NVIDIA_WEAK_BOUNDARY_PRICE,
  };
}
