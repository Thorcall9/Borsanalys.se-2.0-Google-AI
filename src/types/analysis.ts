export interface AIDrivenAnalysis {
  isAIDriven: true;
  slug: string;
  name: string;
  ticker: string;
  isin?: string;
  date?: string;
  author?: string;
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number; // 1=hög risk, 5=låg
    esgMakro: number;
    aiObservationer: number;
  };
  totaltPoang?: number;
  maxPoang?: number;
  rating?: number;
  overview: {
    borskurs: string | number;
    borsvarde: string;
    bransch: string;
    geografi: string;
    affarside?: string;
    affarsmodell: string;
    ledning: string;
    agarstruktur?: string;
    antalAktier?: string;
    sources?: string;
  };
  strategiskMoat?: {
    swot: {
      styrkor: string[];
      svagheter: string[];
      möjligheter: string[];
      hot: string[];
    };
    moat: string[];
  };
  finansiellAnalys?: {
    resultatrakning: {
      omsattningstillvaxt: string;
      vinsttillvaxt: string;
      rorelsemarginal: string;
      kapitalisering?: string;
    };
    nyckeltal: {
      roe: string;
      roce: string;
      utdelning: string;
    };
    vardering: {
      pe: string;
      pb?: string;
      evEbit: string;
      direktavkastning: string;
    };
  };
  tillvaxtdrivare?: string[];
  esgMakro?: {
    esgProfil?: string;
    makropaverkan?: string;
    text?: string;
    score?: string;
  };
  sammanfattning?: {
    text?: string;
    beslut: string;
    motivering: string;
    malpris: string;
  };
  valuation?: {
    text: string;
    score: string;
  };
  growthTriggers?: {
    text: string;
    score: string;
  };
  riskProfile?: {
    text: string;
    score: string;
    level: string;
  };
  aiObservations?: {
    text: string;
    score: string;
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
  market: string;
  sector: string;
  recommendation: "KÖP" | "AVVAKTA" | "SÄLJ" | "BEVAKA";
  price: string;
  pe: string;
  yield: string;
  marketCap?: string;
  discount?: string;
  summary: string;
  date?: string; // Format: YYYY-MM-DD
  
  // Custom View Logic
  deepDiveComponent?: "Nvidia" | "NovoNordisk" | "Evolution" | "Investor" | "Volvo" | "Swedbank" | "NewWave" | "Handelsbanken" | "Ericsson";

  // Standardized structure from roadmap
  investmentCase?: string;
  marketOverview?: string;
  growth?: string;
  financialAnalysis?: string;
  competitiveAdvantages?: string[];
  risks?: string[];
  valuation?: string;
  conclusion?: string;
  esg?: string;
  aiObservations?: string;
  employees?: string;
  geography?: string;
  managementOverview?: string;
  ownershipStructure?: string;

  // Detailed Analysis Sections
  riskRewardMatrix?: string;
  ukgcRiskDeepDive?: string;
  capitalAllocation?: string;
  marginTrends?: string;

  // Legacy fields (keeping for compatibility)
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  scenarios: { label: string; value: string; change: string; type: "bull" | "base" | "bear"; description?: string }[];
  businessModel?: string;
  management?: string;
  advantages?: string[];
  motivation?: string;

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
    esgMakro: number;
    aiObservationer: number;
  };
}
