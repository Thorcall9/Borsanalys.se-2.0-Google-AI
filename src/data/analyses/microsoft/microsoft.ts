import { AnalysisData } from "../../../types/analysis.js";

export const microsoft: AnalysisData = {
  slug: "microsoft",
  title: "Microsoft Corporation",
  disclosureKey: "microsoft",
  ticker: "MSFT",
  market: "NASDAQ",
  sector: "Mjukvara / molntjänster",
  recommendation: "KÖP",
  price: "$499,99",
  pe: "28,9x",
  yield: "0,71%",
  marketCap: "$3,7T",
  date: "2026-08-09",
  published: true,
  deepDiveComponent: "Microsoft",
  v11Preview: {
    headline: "Microsoft: AI-efterfrågan är stark – avkastningen på kapaciteten avgör nästa steg",
    dek: "Azure och den kommersiella orderboken stödjer tillväxten. Nästa prövning är om den stora datacenterinvesteringen kan ge uthållig marginal och fritt kassaflöde.",
    weightedFairValue: "683",
    currentPrice: "499,99 USD",
    upside: "+37 %",
    annualPotential: "Årlig potential: cirka 18 %",
    riskLabel: "Medelrisk",
    positiveReasons: [
      { title: "Azure-efterfrågan är fortsatt stark", body: "Azure and other cloud services växte 43 % i FY2026 Q4; enligt ledningen överstiger efterfrågan fortsatt kapaciteten." },
      { title: "Den kommersiella orderboken har vuxit", body: "Commercial RPO var 678 md USD vid FY2026-slutet, en ökning med 84 %." },
      { title: "AI-produkterna har kommersiell räckvidd", body: "Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten enligt bolaget." }
    ],
    cautionReasons: [
      { title: "Capex har ökat kraftigt", body: "Kassacapex var 115,9 md USD i FY2026, från 64,6 md USD året före." },
      { title: "Fritt kassaflöde har pressats", body: "FCF enligt vår konsekventa definition var 67,0 md USD i FY2026, ned från 71,6 md USD." },
      { title: "AI-ROI är inte segmenterat", body: "Microsoft redovisar inte separat Copilot-lönsamhet eller AI-avkastning på datacenterinvesteringar." }
    ],
    insightHeadline: "Avkastning på kapacitet är nästa värdedrivare",
    insightBody: "Efterfrågan är väl belagd genom Azure-tillväxt och RPO. För aktien är nästa steg därför inte om AI kan säljas, utan om den nya kapaciteten omsätts till uthållig marginal och FCF.",
    theses: [
      { status: "Ny", title: "Azure kan hålla hög tillväxt när kapaciteten byggs ut", signal: "Azure växte 43 % i Q4 FY2026.", next: "Tillväxt på minst 40 % i FY2027 Q1." },
      { status: "Ny", title: "AI-capex kan omsättas utan varaktigt svagare kapitalavkastning", signal: "Cloud-bruttomarginal 66 %; FY2026 FCF 67 md USD.", next: "Stabilare marginal och FCF medan capex växer." },
      { status: "Ny", title: "Kommersiell AI kan monetiseras ovanpå installerad bas", signal: "RPO 678 md USD; >30m Copilot-säten.", next: "Fortsatt RPO- och adoptionsbevis." }
    ],
    monitors: [
      { focus: "Azure-tillväxt", latest: "+43 %", next: "Minst 40 %", why: "Testar om den starka molnefterfrågan håller i sig." },
      { focus: "Cloud-marginal", latest: "66 %", next: "Stabilisering", why: "Testar avkastningen på AI-kapaciteten." },
      { focus: "Capex och FCF", latest: "$115,9 md / $67,0 md", next: "Capex inom guidning och bättre FCF", why: "Avgör kapitalintensiteten i caset." },
      { focus: "Kommersiell AI", latest: "RPO $678 md", next: "Fortsatt RPO- och adoptionsbevis", why: "Visar om AI-monetiseringen breddas." }
    ],
    valuationCheck: "FY2026 justerat P/E är 28,9x; EV/EBIT 23,7x och FCF-avkastning 1,8 %.",
    valuationLimitation: "FCF är pressat av capex och fångar inte separat AI-ROI eller framtida lease-åtaganden.",
    riskAndMethod: "Huvudriskerna är kapitalavkastning, Azure-utförande och AI-monetisering. Rapporterade data är FACT; FCF och normaliserad EPS är DERIVED; FY2028-scenarier är ASSUMPTION; investeringsinsikten är ANALYSIS.",
    sourceSummary: "Microsoft FY2026 Form 10-K, FY2026 Q1–Q3 Forms 10-Q, FY2026 Q4 earnings call-transkript samt Google Finance-stängningskurs 7 augusti 2026."
  },
  summary: "Azure-efterfrågan och den kommersiella orderboken är starka. Nästa värdedrivare är om AI-kapaciteten kan omsättas i uthållig marginal och fritt kassaflöde.",
  investmentCase: "Azure växte 43 procent i FY2026 Q4 och Commercial RPO var 678 md USD vid räkenskapsårets slut. Det stödjer fortsatt omsättningstillväxt när kapaciteten byggs ut.",
  growth: "Microsoft Cloud omsatte 214,4 md USD i FY2026, upp 27 procent. Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten, men bolaget redovisar inte separat Copilot-omsättning eller lönsamhet.",
  financialAnalysis: "FY2026 omsatte Microsoft 331,8 md USD och redovisade 155,2 md USD i rörelseresultat. Kassacapex ökade till 115,9 md USD och vår konsekventa FCF-definition gav 67,0 md USD, vilket gör kapitalavkastningen central.",
  competitiveAdvantages: [
    "Azure växte 43% i Q4 FY2026 och efterfrågan översteg enligt ledningen fortsatt tillgänglig kapacitet.",
    "Commercial RPO var 678 md USD, upp 84% vid FY2026-slutet.",
    "Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten."
  ],
  risks: [
    "Högre capex utan motsvarande FCF eller marginalförbättring kan ge multipelkompression.",
    "Azure-tillväxt under 30% under två kvartal skulle utmana tillväxttesen.",
    "Microsoft redovisar inte separat AI-ROI eller Copilot-lönsamhet."
  ],
  valuation: "Värderingen bygger på normaliserad FY2028 EPS i tre P/E-scenarier. Det sannolikhetsvägda värdet är 683 USD per aktie, motsvarande 37% över referenskursen 499,99 USD den 7 augusti 2026.",
  conclusion: "KÖP. Den stora frågan är avkastningen på AI-kapaciteten, men verifierad Azure-tillväxt och RPO ger stöd för att det sannolikhetsvägda värdet överstiger kursen.",
  aiObservations: "AI är både tillväxtmotor och investeringsrisk: stark Azure-efterfrågan och Copilot-adoption möter högre datacenterinvesteringar och en Microsoft Cloud-bruttomarginal på 66%.",
  watchItems: [
    "Azure-tillväxt bör ligga på minst 40% i FY2027 Q1.",
    "Capex bör hållas inom guidning samtidigt som Microsoft Cloud-bruttomarginalen stabiliseras.",
    "Commercial RPO och Copilot-adoption behöver ge fortsatt monetiseringsbevis."
  ],
  overviewPoints: [
    { title: "Beslut", body: "KÖP — sannolikhetsvägt värde 683 USD och 37% indikerad potential." },
    { title: "Kurs", body: "499,99 USD per 7 augusti 2026, 16:00 EDT." },
    { title: "Största fråga", body: "Om AI-kapacitet kan ge uthållig marginal och fritt kassaflöde." },
    { title: "Risknivå", body: "Medel — kapitalintensiteten är hög, men efterfrågan är verifierad." }
  ],
  historicalFundament: {
    annual: [
      { period: "FY2024", revenueUsdBn: 245.122, operatingIncomeUsdBn: 109.433, operatingMarginPct: 44.6, operatingCashFlowUsdBn: 118.548, freeCashFlowUsdBn: 74.071, classification: "FACT", source: { document: "Microsoft FY2026 Form 10-K", locator: "FY2024 comparative statements" } },
      { period: "FY2025", revenueUsdBn: 281.724, operatingIncomeUsdBn: 128.528, operatingMarginPct: 45.6, operatingCashFlowUsdBn: 136.162, freeCashFlowUsdBn: 71.611, classification: "FACT", source: { document: "Microsoft FY2026 Form 10-K", locator: "FY2025 comparative statements" } },
      { period: "FY2026", revenueUsdBn: 331.839, operatingIncomeUsdBn: 155.237, operatingMarginPct: 46.8, operatingCashFlowUsdBn: 182.935, freeCashFlowUsdBn: 66.987, classification: "FACT", source: { document: "Microsoft FY2026 Form 10-K", locator: "MD&A and Cash Flows Statements" } }
    ],
    latest: { period: "FY2026", revenueUsdBn: 331.839, operatingIncomeUsdBn: 155.237, operatingMarginPct: 46.8, freeCashFlowUsdBn: 66.987, classification: "DERIVED", source: { document: "Microsoft FY2026 Form 10-K", locator: "CFO minus additions to property and equipment" } }
  },
  financialTables: [{
    title: "FY2026 — relevanta faktamått", headers: ["Mått", "Utfall", "Varför det spelar roll"], rows: [
      ["Azure and other cloud services", "+41% FY / +43% Q4", "Huvuddrivare för tillväxttesen"],
      ["Microsoft Cloud-bruttomarginal", "66%", "Testar AI-investeringens marginaleffekt"],
      ["Commercial RPO", "$678 md", "Stöd för kommersiell efterfrågan"],
      ["FCF enligt analysdefinition", "$67,0 md", "Kapitalavkastning efter cash capex"]
    ]
  }],
  valuationTables: [{
    title: "FY2028 scenariovärdering", headers: ["Scenario", "EPS", "P/E", "Rimligt värde", "Sannolikhet"], rows: [
      ["Bear", "$19,14", "25x", "$479", "25%"],
      ["Base", "$22,60", "30x", "$678", "50%"],
      ["Bull", "$25,62", "35x", "$897", "25%"]
    ], footer: "Sannolikhetsvägt värde: 683 USD per aktie."
  }],
  valuationTargetYear: 2028,
  valuationMotivation: "P/E används på normaliserad EPS eftersom FY2026-FCF är kraftigt påverkat av kapacitetsinvesteringar. FY2026 justerat P/E är 28,9x; EV/EBIT 23,7x och FCF-avkastning 1,8% är sekundära kontroller.",
  riskTables: [{
    title: "Centrala risker", headers: ["Risk", "Tidigt varningstecken"], rows: [
      ["Kapitalavkastning", "Fallande FCF och Cloud-marginal samtidigt som capex ökar"],
      ["Azure-utförande", "Azure-tillväxt under 30% under två kvartal"],
      ["AI-monetisering", "Stagnerande RPO/Copilot-bevis utan lönsamhetsförbättring"]
    ]
  }],
  scenarios: [
    { label: "Bull", value: "$897", change: "+79%", type: "bull", probability: "25%", description: "AI-kapacitet och Copilot skalar med stark marginal.", operatingLadder: { revenueUsdBn: 475, operatingMarginPct: 47, operatingIncomeUsdBn: 223.25, normalizedFinanceAndOtherUsdBn: 1.5, taxRatePct: 17, dilutedSharesBn: 7.28, normalizedEpsUsd: 25.62, revenueGrowthFromLatestAnnualPct: 19.7 } },
    { label: "Base", value: "$678", change: "+36%", type: "base", probability: "50%", description: "Azure-tillväxt och kommersiell AI monetiseras med stabil marginal.", operatingLadder: { revenueUsdBn: 440, operatingMarginPct: 45.5, operatingIncomeUsdBn: 200.2, normalizedFinanceAndOtherUsdBn: 1, taxRatePct: 18, dilutedSharesBn: 7.30, normalizedEpsUsd: 22.60, revenueGrowthFromLatestAnnualPct: 15.1 } },
    { label: "Bear", value: "$479", change: "−4%", type: "bear", probability: "25%", description: "Azure avtar och AI-capex håller nere marginalen.", operatingLadder: { revenueUsdBn: 400, operatingMarginPct: 43, operatingIncomeUsdBn: 172, normalizedFinanceAndOtherUsdBn: 1, taxRatePct: 19, dilutedSharesBn: 7.32, normalizedEpsUsd: 19.14, revenueGrowthFromLatestAnnualPct: 9.8 } }
  ],
  scores: { affarsmodell: 5, strategiskMoat: 5, finansiellKvalitet: 4, vardering: 3, tillvaxtutsikter: 4, riskprofil: 3, esgMakro: 3, aiObservationer: 4 }
};
