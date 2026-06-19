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
  title: string;
  listTitle?: string;
  ticker: string;
  isin?: string;
  author?: string;
  date: string;
  market: string;
  sector: string;
  recommendation: "KÖP" | "AVVAKTA" | "SÄLJ" | "BEVAKA";
  price: string;
  pe: string;
  yield: string;
  marketCap?: string;
  discount?: string;
  summary: string;
  image?: string; // URL to analysis image
  
  // Custom View Logic
  deepDiveComponent?: "Nvidia" | "NovoNordisk" | "Evolution" | "Investor" | "Volvo" | "Swedbank" | "NewWave" | "Handelsbanken" | "Ericsson" | "AQGroup" | "Nibe" | "Nordea" | "Axfood";
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
  scenarios: { label: string; value: string; change: string; type: "bull" | "base" | "bear"; description?: string; probability?: string }[];
  businessModel?: string;
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
