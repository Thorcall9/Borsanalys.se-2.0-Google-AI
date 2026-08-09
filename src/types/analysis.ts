import type { Recommendation } from "../lib/recommendation.js";

export interface Scenario {
  type: 'bull' | 'base' | 'bear';
  label: string;
  value: string;
  change: string;
  probability?: string;
  description?: string;
}

export interface AIDrivenAnalysis {
  isAIDriven?: boolean;
  slug: string;
  name: string;
  ticker: string;
  isin?: string;
  author?: string;
  date?: string;
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro?: number;
    aiObservationer: number;
    vdAnalys?: number;
  };
  totaltPoang?: number;
  maxPoang?: number;
  rating?: number;
  overview: {
    borskurs: string | number;
    borsvarde: string;
    antalAktier?: string;
    bransch: string;
    geografi: string;
    affarside?: string;
    affarsmodell: string;
    ledning: string;
    agarstruktur?: string;
    sources?: string;
  };
  strategiskMoat?: {
    swot: {
      styrkor: string[];
      svagheter: string[];
      mojligheter?: string[];
      möjligheter?: string[];
      hot: string[];
    };
    moat: string[];
  };
  finansiellAnalys?: {
    resultatrakning: {
      omsattningstillvaxt?: string | number;
      epsTillvaxt?: string | number;
      vinsttillvaxt?: string | number;
      rorelsemarginal?: string | number;
      nettomarginal?: string | number;
      kapitalisering?: string;
    };
    balansrakning?: {
      soliditet: string | number;
      nettoskuldEbitda: string | number;
      rantetackningsgrad?: string | number;
      nettoskuldNettokassa?: string | number;
    };
    kassaflode?: {
      operativtKassaflode: string | number;
      frittKassaflode: string | number;
      fcfKommentar?: string;
    };
    nyckeltal: {
      roe: string | number;
      roce: string | number;
      utdelning: string | number;
    };
    vardering: {
      pe?: string | number;
      pb?: string | number;
      peHistoriskt5ar?: string | number;
      evEbit?: string | number;
      evEbitda?: string | number;
      ps?: string | number;
      peg?: string | number;
      direktavkastning?: string | number;
      rimligtVarde?: string;
      varderingsbedomning?: string;
    };
  };
  vdAnalys?: {
    tonOchTransparens?: string;
    strategiskKontinuitet?: string;
    framatblickandeFokus?: string;
    kapitalallokering?: string;
    makroOchBranschkommentarer?: string;
  };
  valuation?: {
    text: string;
    score: string;
  };
  growthTriggers?: {
    text: string;
    score: string;
  };
  tillvaxtdrivare?: string[];
  riskProfile?: {
    text: string;
    score: string;
    level: string;
  };
  esgMakro?: {
    text?: string;
    score?: string;
    esgProfil?: string;
    makropaverkan?: string;
  };
  aiObservationer?: {
    sentiment?: string;
    insidertransaktioner?: string;
    analytikerkonsensus?: string;
    avvikelser?: string;
    text?: string;
    score?: string;
  };
  aiObservations?: any;
  sammanfattning?: {
    beslut: string;
    motivering: string;
    malpris: string;
    kopzon?: string;
    riskniva?: string;
    varderingsbedomning?: string;
    kvalitetsbedomning?: string;
    langsiktigtInnehav?: string;
    bevakaFramat?: string[];
    text?: string;
  };
  scenarier?: {
    bullCase: string;
    baseCase: string;
    bearCase: string;
  };
}

export interface AnalysisData {
  slug: string;
  templateVersion?: "legacy" | "v10" | "v11";
  title: string;
  listTitle?: string;
  ticker: string;
  isin?: string;
  author?: string;
  date: string;
  displayDate?: string;
  market: string;
  sector: string;
  recommendation: Recommendation;
  recommendationReason?: string;
  price: string;
  pe: string;
  dividend?: string;
  yield: string;
  marketCap?: string;
  discount?: string;
  summary: string;
  image?: string; // URL to analysis image
  v11Preview?: {
    headline: string;
    dek: string;
    weightedFairValue: string;
    currentPrice: string;
    upside: string;
    annualPotential: string;
    riskLabel: string;
    positiveReasons: { title: string; body: string }[];
    cautionReasons: { title: string; body: string }[];
    insightHeadline: string;
    insightBody: string;
    theses: { status: string; title: string; signal: string; next: string }[];
    monitors: { focus: string; latest: string; next: string; why: string }[];
    valuationCheck: string;
    valuationLimitation: string;
    riskAndMethod: string;
    sourceSummary: string;
  };

  // Content type and filtering metadata
  contentType: ContentType;
  relatedAnalysisSlug?: string;
  tags?: string[];
  reportPeriod?: string;
  reportSummary?: string;
  viewChange?: 'unchanged' | 'upgraded' | 'downgraded' | 'new';
  upside?: number;
  updatedAt?: string;
  score?: number;
  maxScore?: number;
  /** Hidden analyses can be directly reviewed without appearing in discovery surfaces. */
  published?: boolean;
  
  // Custom View Logic
  deepDiveComponent?: "Nvidia" | "NovoNordisk" | "Evolution" | "Investor" | "Volvo" | "Swedbank" | "NewWave" | "Handelsbanken" | "Ericsson" | "AQGroup" | "Nibe" | "Nordea" | "Axfood" | "ABB" | "Plejd" | "Meta" | "Microsoft";
  disclosureKey?: string;

  // Standardized structure from roadmap
  investmentCase?: string;
  marketOverview?: string;
  growth?: string;
  financialAnalysis?: string;
  competitiveAdvantages?: string[];
  risks?: string[];
  valuation?: string;
  conclusion?: string;
  kopzon?: string;
  esg?: string;
  aiObservations?: string;
  employees?: string;
  sharesCount?: string;
  geography?: string;
  managementOverview?: string;
  ownershipStructure?: string;
  longTermInvolvement?: string;
  watchItems?: string[];
  overviewPoints?: { title: string; body: string | React.ReactNode }[];
  financialTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  financialTimeline?: { year: string; highlight: string; description: string }[];
  valuationTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  valuationMotivation?: string;
  growthPoints?: { title: string; body: string }[];
  growthTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  growthMotivation?: string;
  riskTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  riskMotivation?: string;
  riskAnalysis?: string;
  managementAnalysis?: string;
  managementTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  managementMotivation?: string;
  aiSummary?: string;
  aiTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  aiMotivation?: string;
  summaryQnA?: { question: string; answer: string }[];
  watchTable?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  totalScore?: string;
  rating?: string;
  targetPrice?: string;
  buyZone?: string;
  devilsAdvocateTables?: { title: string; headers: string[]; rows: (string | number)[][]; footer?: string }[];
  historicalFundament?: {
    recentQuarters?: {
      period: string;
      revenueUsdBn: number;
      operatingMarginPct: number;
      freeCashFlowUsdBn: number;
      yearOnYear?: { revenueGrowthPct: number; operatingMarginChangePp: number; freeCashFlowGrowthPct: number };
      classification: "FACT" | "DERIVED";
      source: { document: string; locator: string };
    }[];
    annual: {
      period: string;
      revenueUsdBn: number;
      operatingIncomeUsdBn: number;
      operatingMarginPct: number;
      operatingCashFlowUsdBn: number;
      freeCashFlowUsdBn: number;
      classification: "FACT" | "DERIVED";
      source: { document: string; locator: string };
    }[];
    latest?: {
      period: string;
      revenueUsdBn: number;
      operatingIncomeUsdBn: number;
      operatingMarginPct: number;
      freeCashFlowUsdBn: number;
      classification: "FACT" | "DERIVED";
      source: { document: string; locator: string };
    };
    derived?: {
      revenueCagr2019To2025Pct: number;
      operatingMarginRange2019To2025Pct: [number, number];
      latestAnnualYearOnYear?: { period: string; comparedWithPeriod: string; revenueGrowthPct: number; operatingMarginChangePp: number; freeCashFlowGrowthPct: number };
      formula: string;
    };
  };

  // Detailed Analysis Sections
  riskRewardMatrix?: string;
  ukgcRiskDeepDive?: string;
  capitalAllocation?: string;
  marginTrends?: string;
  strategyMoat?: string;

  // Legacy fields (keeping for compatibility)
  analystVerdict?: string;
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  scenarios: { label: string; value: string; change: string; type: "bull" | "base" | "bear"; description?: string; probability?: string; operatingLadder?: { revenueUsdBn: number; operatingMarginPct: number; operatingIncomeUsdBn: number; normalizedFinanceAndOtherUsdBn: number; taxRatePct: number; dilutedSharesBn: number; normalizedEpsUsd: number; revenueGrowthFromLatestAnnualPct?: number } }[];
  valuationTargetYear?: number;
  businessModel?: string;
  affarsmodell?: {
    sankey?: {
      period: string;
      currency: string;
      nodes: {
        id: string;
        label: string;
        type: "revenueSource" | "revenue" | "profit" | "cost";
        amount?: number;
        shareOfRevenue?: number;
        margin?: number;
        organicGrowth?: string;
        segmentMargin?: string;
      }[];
      links: {
        source: string;
        target: string;
        value: number;
      }[];
      financialFlow?: {
        id: string;
        label: string;
        value: number;
        margin?: number;
      }[];
    };
  };
  management?: string;
  advantages?: string[];
  motivation?: string;
  financialMotivation?: string;
  financialQualityWhyNot5?: string;

  // AI Driven Data
  aiDrivenData?: AIDrivenAnalysis;
  relatedAnalysis?: {
    slug: string;
    title: string;
    label: string;
    text: string;
    cta: string;
    accentColor: string;
  };
  nextSteps?: {
    slug: string;
    title?: string;
    reason?: string;
    label?: string;
  }[];
  scores?: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro?: number;
    aiObservationer: number;
    vdAnalys?: number;
  };
}

export type ContentType = "analysis" | "report-commentary" | "market-update" | "guide" | "other";
