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
  v11: {
    headline: "Microsoft: AI-efterfrågan är stark – avkastningen på kapaciteten avgör nästa steg",
    dek: "Azure och den kommersiella orderboken bevisar efterfrågan. Huvudfrågan är om AI-kapaciteten kan ge stigande cloud-bruttoresultat och fritt kassaflöde per investerad dollar.",
    weightedFairValue: "683",
    currentPrice: "499,99 USD",
    upside: "+37 %",
    annualPotential: "Årlig potential: cirka 18 %",
    riskLabel: "Medelrisk med förhöjd capex- och koncentrationsrisk",
    positiveReasons: [
      { title: "Azure-efterfrågan är fortsatt stark", body: "Azure and other cloud services växte 43 % i FY2026 Q4; enligt ledningen överstiger efterfrågan fortsatt kapaciteten." },
      { title: "Den kommersiella orderboken bekräftar kontrakterad efterfrågan", body: "Commercial RPO var 678 md USD vid FY2026-slutet. RPO är kontrakterad framtida omsättning, inte bevis på kassaflöde eller marginal." },
      { title: "Copilot har räckvidd – men monetiseringen är ännu oprövad", body: "Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten. Det bevisar inte hög ARPU, förnyelsegrad eller marginal efter inferenskostnader." }
    ],
    cautionReasons: [
      { title: "Cloud-marginalen är avkastningstestet", body: "Microsoft Cloud-bruttomarginalen var 66 % och har pressats av AI-infrastruktur och högre AI-användning. Stabilisering kring 64–65 % stödjer caset; under 64 % försvagar det." },
      { title: "FCF-pressen kan fortsätta", body: "Kassacapex var 115,9 md USD i FY2026 och FY2027-investeringarna väntas fortsatt höga, inklusive finance leases. Frågan är om operativt kassaflöde växer snabbare än ekonomisk capex." },
      { title: "OpenAI koncentrerar RPO och AI-ROI saknas", body: "Cirka 45 % av Commercial RPO i FY2026 Q2 var kopplad till OpenAI. Microsoft redovisar inte separat Copilot-lönsamhet eller AI-avkastning på datacenterinvesteringar." }
    ],
    insightHeadline: "Orderboken är bevisad – kapitalavkastningen är inte det",
    insightBody: "RPO visar kontrakterad framtida omsättning, men cirka 45 % av Commercial RPO i FY2026 Q2 var kopplad till OpenAI. Det viktiga nästa beviset är bred RPO-tillväxt exklusive OpenAI, cloud-bruttomarginal som håller 64–65 % och ett operativt kassaflöde som växer snabbare än kassacapex och finance leases.",
    theses: [
      { status: "Ny", title: "Azure kan hålla hög tillväxt när kapaciteten byggs ut", signal: "Azure växte 43 % i Q4 FY2026.", next: "Tillväxt på minst 40 % i FY2027 Q1." },
      { status: "Ny", title: "AI-capex kan omsättas till varaktig kapitalavkastning", signal: "Cloud-bruttomarginal 66 %; kassacapex 115,9 md USD; FY2026 FCF 67,0 md USD.", next: "Cloud-bruttomarginal minst stabil kring 64–65 % och operativt kassaflöde som växer snabbare än kassacapex inklusive finance leases." },
      { status: "Ny", title: "Kommersiell AI kan monetiseras brett, inte bara genom OpenAI", signal: "FY2026 Q2 Commercial RPO 625 md USD, varav cirka 45 % kopplad till OpenAI; >30m Copilot-säten.", next: "RPO-tillväxt exklusive OpenAI samt nettotillskott, ARPU/usage-baserad intäkt och bevarad marginal efter inferenskostnader." }
    ],
    monitors: [
      { focus: "Azure-tillväxt", latest: "+43 %", next: "Minst 40 %", why: "Testar om den starka molnefterfrågan håller i sig." },
      { focus: "Microsoft Cloud-bruttomarginal", latest: "66 %", next: "≥64–65 %; <64 % är negativt", why: "Det mest direkta testet av om AI-kapacitet ger avkastning, bättre än koncernens EBIT-marginal." },
      { focus: "Ekonomisk capex och FCF", latest: "$115,9 md cash capex / $67,0 md FCF", next: "Operativt kassaflöde växer snabbare än cash capex + finance leases", why: "GPU- och serverinvesteringar kan både hålla FCF pressat och ge fördröjt avskrivningstryck i EBIT." },
      { focus: "RPO exklusive OpenAI", latest: "≈$344 md i FY2026 Q2; total RPO $625 md", next: "Separat tillväxttal SAKNAS – vill se fortsatt tillväxt exklusive OpenAI", why: "Stark RPO exklusive OpenAI är beviset för bred företagsefterfrågan." },
      { focus: "Copilot-monetisering", latest: ">30m betalda säten", next: "Nettotillskott, ARPU/usage-intäkt och bevarad marginal efter inferens", why: "Adoption är inte samma sak som lönsam monetisering." }
    ],
    valuationCheck: "FY2026 justerat P/E är 28,9x; EV/EBIT 23,7x och FCF-avkastning 1,8 %. Positivt scenario använder 35x – en premievärdering som kräver både hög vinsttillväxt och multipel-expansion.",
    valuationLimitation: "FCF enligt vår definition exkluderar icke-kontant uppkomst av finance leases. Ekonomisk capex är därför högre än kassacapex; fullständigt FY2026-belopp för finance-lease-tillägg är SAKNAS i analyserat primärunderlag.",
    valuationSummary: "35x P/E i positivt scenario är inte neutralt: det måste förtjänas genom hög EPS-tillväxt, hållbar cloud-marginal och förbättrad FCF-konvertering från dagens justerade P/E på 28,9x.",
    valuationGrowthContext: "Positivt scenario: 19,7 % årlig omsättningstillväxt FY2026–FY2028; räknat från FY2025 är CAGR cirka 19,1 %. Inga historiska multipelintervall antas.",
    riskAndMethod: "KÖP gäller endast om huvudscenariot fortsatt bygger på cloud-bruttomarginal stabil kring 64–65 %, bred RPO-tillväxt exklusive OpenAI och förbättrad FCF-konvertering. Annars är risknivån medelrisk med förhöjd capex- och koncentrationsrisk. Rapporterade data är FACT; RPO exklusive OpenAI är en ungefärlig härledning; FCF och normaliserad EPS är DERIVED; FY2028-scenarier är ASSUMPTION; investeringsinsikten är ANALYSIS.",
    sourceSummary: "Microsoft FY2026 Form 10-K, FY2026 Q1–Q3 Forms 10-Q, FY2026 Q4 earnings call-transkript samt Google Finance-stängningskurs 7 augusti 2026."
  },
  summary: "Azure-efterfrågan och den kommersiella orderboken är starka. Nästa värdedrivare är om AI-kapaciteten kan omsättas i uthållig marginal och fritt kassaflöde.",
  investmentCase: "Azure växte 43 procent i FY2026 Q4 och Commercial RPO var 678 md USD vid räkenskapsårets slut. RPO är kontrakterad framtida omsättning, inte ett kassaflödes- eller marginalbevis. Huvudscenariot kräver bred RPO-tillväxt exklusive OpenAI.",
  growth: "Microsoft Cloud omsatte 214,4 md USD i FY2026, upp 27 procent. Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten, men adoption bevisar inte ARPU, förnyelsegrad eller marginal efter inferenskostnader.",
  financialAnalysis: "FY2026 omsatte Microsoft 331,8 md USD och redovisade 155,2 md USD i rörelseresultat. Kassacapex ökade till 115,9 md USD och vår FCF-definition gav 67,0 md USD. Kapitalintensiteten ska bedömas mot både kassacapex och finance leases; GPU- och serverinvesteringar kan även ge fördröjt avskrivningstryck i EBIT.",
  competitiveAdvantages: [
    "Azure växte 43% i Q4 FY2026 och efterfrågan översteg enligt ledningen fortsatt tillgänglig kapacitet.",
    "Commercial RPO var 678 md USD vid FY2026-slutet, men är kontrakterad framtida omsättning – inte ett marginal- eller FCF-bevis.",
    "Microsoft 365 Copilot passerade 30 miljoner betalda företagssäten, men ARPU, förnyelsegrad och marginal redovisas inte separat."
  ],
  risks: [
    "Cloud-bruttomarginal under 64% och FCF som inte förbättras mot ekonomisk capex kan ge multipelkompression.",
    "Azure-tillväxt under 30% under två kvartal skulle utmana tillväxttesen.",
    "RPO-koncentration till OpenAI samt frånvaro av separat AI-ROI, Copilot-ARPU och lönsamhet ökar osäkerheten."
  ],
  valuation: "Värderingen bygger på normaliserad FY2028 EPS i tre P/E-scenarier. Det sannolikhetsvägda värdet är 683 USD per aktie, motsvarande 37% över referenskursen 499,99 USD den 7 augusti 2026.",
  conclusion: "Efterfrågan på AI är bevisad genom Azure och den kommersiella orderboken. Det som återstår att bevisa är att Microsoft kan omvandla den nya kapaciteten till stigande bruttoresultat och fritt kassaflöde per investerad dollar. Risken är att bolaget investerar som en infrastrukturleverantör men fortsatt värderas som ett kapitallätt mjukvarubolag.",
  aiObservations: "AI är både tillväxtmotor och investeringsrisk: Azure-efterfrågan är bevisad, men cloud-bruttomarginal, FCF-konvertering och Copilot-monetisering efter inferenskostnader avgör kapitalavkastningen.",
  watchItems: [
    "Azure-tillväxt bör ligga på minst 40% i FY2027 Q1.",
    "Microsoft Cloud-bruttomarginal behöver stabiliseras kring minst 64–65%; under 64% försvagar det huvudscenariot.",
    "RPO-tillväxt exklusive OpenAI samt Copilot-nettotillskott, ARPU/usage-intäkt och marginal efter inferens behöver ge monetiseringsbevis.",
    "Operativt kassaflöde ska växa snabbare än kassacapex och finance leases; FY2027-investeringar väntas fortsatt höga."
  ],
  overviewPoints: [
    { title: "Beslut", body: "KÖP — sannolikhetsvägt värde 683 USD och 37% indikerad potential." },
    { title: "Kurs", body: "499,99 USD per 7 augusti 2026, 16:00 EDT." },
    { title: "Största fråga", body: "Om AI-kapacitet kan ge uthållig marginal och fritt kassaflöde." },
    { title: "Risknivå", body: "Medelrisk med förhöjd capex- och koncentrationsrisk — efterfrågan är verifierad, kapitalavkastningen är inte." }
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
      ["Microsoft Cloud-bruttomarginal", "66%", "Direkt test av AI-kapacitetens avkastning; ≥64–65% stödjer huvudscenariot, <64% försvagar det"],
      ["Commercial RPO", "$678 md", "Kontrakterad framtida omsättning, inte kassaflöde eller marginalbevis"],
      ["RPO exklusive OpenAI", "≈$344 md i Q2 FY2026", "Separat tillväxttal SAKNAS; fortsatt tillväxt är beviset för bred företagsefterfrågan"],
      ["Ekonomisk capex och FCF", "$115,9 md cash capex / $67,0 md FCF", "Operativt kassaflöde måste växa snabbare än cash capex + finance leases"]
    ]
  }],
  valuationTables: [{
    title: "FY2028 scenariovärdering", headers: ["Scenario", "EPS", "P/E", "Rimligt värde", "Sannolikhet"], rows: [
      ["Bear", "$19,14", "25x", "$479", "25%"],
      ["Base", "$22,60", "30x", "$678", "50%"],
      ["Bull", "$25,62", "35x (premie)", "$897", "25%"]
    ], footer: "Sannolikhetsvägt värde: 683 USD per aktie."
  }],
  valuationTargetYear: 2028,
  valuationMotivation: "P/E används på normaliserad EPS eftersom FY2026-FCF är kraftigt påverkat av kapacitetsinvesteringar. FY2026 justerat P/E är 28,9x; EV/EBIT 23,7x och FCF-avkastning 1,8% är sekundära kontroller. 35x i Bull är en premievärdering som kräver både hög vinsttillväxt och multipel-expansion från 28,9x, inte ett neutralt antagande.",
  riskTables: [{
    title: "Centrala risker", headers: ["Risk", "Tidigt varningstecken"], rows: [
      ["Kapitalavkastning", "Cloud-bruttomarginal under 64% eller operativt kassaflöde växer långsammare än cash capex + finance leases"],
      ["Azure-utförande", "Azure-tillväxt under 30% under två kvartal"],
      ["RPO-koncentration", "RPO exklusive OpenAI växer svagt; separat tillväxttal SAKNAS idag"],
      ["AI-monetisering", "Copilot-säten ökar utan ARPU/usage-intäkt eller bevarad marginal efter inferenskostnader"]
    ]
  }],
  scenarios: [
    { label: "Bull", value: "$897", change: "+79%", cagr: "+34,0%", type: "bull", probability: "25%", description: "Azure, bred RPO exklusive OpenAI och Copilot monetiseras med hög vinsttillväxt; 35x P/E är en premievärdering som kräver multipel-expansion från 28,9x.", operatingLadder: { revenueUsdBn: 475, operatingMarginPct: 47, operatingIncomeUsdBn: 223.25, normalizedFinanceAndOtherUsdBn: 1.5, taxRatePct: 17, dilutedSharesBn: 7.28, normalizedEpsUsd: 25.62, revenueGrowthFromLatestAnnualPct: 19.7 } },
    { label: "Base", value: "$678", change: "+36%", cagr: "+16,5%", type: "base", probability: "50%", description: "KÖP-scenariot förutsätter cloud-bruttomarginal stabil kring 64–65 %, bred RPO-tillväxt exklusive OpenAI och förbättrad FCF-konvertering.", operatingLadder: { revenueUsdBn: 440, operatingMarginPct: 45.5, operatingIncomeUsdBn: 200.2, normalizedFinanceAndOtherUsdBn: 1, taxRatePct: 18, dilutedSharesBn: 7.30, normalizedEpsUsd: 22.60, revenueGrowthFromLatestAnnualPct: 15.1 } },
    { label: "Bear", value: "$479", change: "−4%", cagr: "−1,1%", type: "bear", probability: "25%", description: "Azure avtar och AI-capex håller nere marginalen.", operatingLadder: { revenueUsdBn: 400, operatingMarginPct: 43, operatingIncomeUsdBn: 172, normalizedFinanceAndOtherUsdBn: 1, taxRatePct: 19, dilutedSharesBn: 7.32, normalizedEpsUsd: 19.14, revenueGrowthFromLatestAnnualPct: 9.8 } }
  ],
  scores: { affarsmodell: 5, strategiskMoat: 5, finansiellKvalitet: 4, vardering: 3, tillvaxtutsikter: 4, riskprofil: 3, esgMakro: 3, aiObservationer: 4 }
};
