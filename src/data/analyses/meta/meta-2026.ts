import { AnalysisData } from "../../../types/analysis.js";

/**
 * Låst v11.2-beräkningsunderlag. Fair values är härledda från den precision
 * som lagras i normaliserad EPS och P/E; den publika analysen visar hela USD.
 */
export const meta2026CanonicalValuation = {
  referencePrice: 592.10,
  referenceDate: "2026-08-07",
  valuationDate: "2027-12-31",
  valuationDays: 511,
  valuationYears: 511 / 365.25,
  scenarios: {
    bear: { fairValue: 500.040, probability: 0.25 },
    base: { fairValue: 750.860, probability: 0.50 },
    bull: { fairValue: 1055.860, probability: 0.25 },
  },
  weightedFairValue: 764.405,
} as const;

export const meta2026: AnalysisData = {
  slug: "meta-q2-2026",
  title: "Meta Platforms, Inc.",
  listTitle: "Meta Platforms",
  ticker: "META",
  market: "NASDAQ",
  sector: "Internet / AI",
  recommendation: "KÖP",
  price: "$592,10",
  pe: "~20,0x",
  yield: "0,91%",
  marketCap: "~$1,5T",
  date: "2026-08-08",
  published: true,
  v11: {
    valuationDate: meta2026CanonicalValuation.valuationDate,
    headline: "Meta: stark annonsmotor – men AI-investeringarna måste betala sig",
    dek: "Annonser växer i både volym och pris. Nästa prövning är om AI-kapaciteten ger avkastning utan att kapitalbindningen blir permanent.",
    weightedFairValue: "764",
    currentPrice: "592,10 USD",
    marketReferenceDate: "2026-08-07",
    upside: "+29 %",
    annualPotential: "Årlig potential: cirka 20 %",
    epsBridgeEnabled: true,
    normalizationNote: "Normaliserad EPS är vår uppskattning av uthållig vinst per aktie. AI-investeringar, forskning och capex ligger kvar som ekonomiska kostnader i modellen.",
    valuationChainLabel: "Omsättning → rörelsemarginal → normaliserad EPS → P/E → värde",
    valuationGrowthContext: "Omsättningsantagandet motsvarar cirka 21,2 % CAGR från FY2025 till FY2027E, jämfört med 18,9 % historisk CAGR 2019–2025.",
    riskLabel: "Hög risk",
    riskRewardZones: {
      status: "APPROVED",
      visibility: "MEMBER",
      title: "När blir risk/reward mer attraktiv?",
      introduction: "Tre priszoner visar hur säkerhetsmarginalen förändras. Bedömningen väger annualiserad potential, Bear-nedsida, scenario-spread och de delar av AI-caset som fortfarande måste bevisas.",
      valuationDate: meta2026CanonicalValuation.valuationDate,
      zones: [
        {
          id: "ATTRACTIVE",
          title: "Attraktiv risk/reward",
          priceLabel: "Under 575 USD",
          annualPotentialLabel: "Cirka +22,6 %/år eller högre",
          bearDownsideLabel: "Bear-nedsida: cirka −13,0 % eller mindre",
          rationale: "Förbättrad säkerhetsmarginal: potentialen och Bear-skyddet kompenserar tydligt för Metas höga risk, AI-capex och fortsatt obevisade kapitalavkastning.",
        },
        {
          id: "BALANCED",
          title: "Balanserad risk/reward",
          priceLabel: "575–675 USD",
          annualPotentialLabel: "Cirka +22,6 till +9,3 %/år",
          bearDownsideLabel: "Bear-nedsida: cirka −13,0 till −25,9 %",
          rationale: "Potentialen är fortsatt relevant, men säkerhetsmarginalen beror på att annonsmotorn fortsätter bära hög AI-kapitalintensitet och att avkastningen faktiskt bevisas.",
        },
        {
          id: "WEAK",
          title: "Svag risk/reward",
          priceLabel: "Från 675 USD",
          annualPotentialLabel: "Cirka +9,3 %/år eller lägre",
          bearDownsideLabel: "Bear-nedsida: minst cirka −25,9 %",
          rationale: "Begränsad säkerhetsmarginal: den återstående potentialen är för liten relativt scenario-spreaden, stora AI-åtaganden, regulatorisk risk och multipelberoende.",
        },
      ],
      disclaimer: "Risk/reward-zonerna är en redaktionell bedömning av säkerhetsmarginal och ändrar inte automatiskt rekommendationen KÖP.",
      memberInsight: {
        companyLabel: "Meta Platforms",
        ticker: "META",
        identityLabel: "Meta · META",
        referencePriceLabel: "592,10 USD",
        referenceDateLabel: "7 aug 2026",
        assessmentLabel: "Balanserad risk/reward",
        assessmentNote: "Referenspunkten är kursen vid analystillfället, inte en köp- eller säljsignal.",
        assessmentRationale: "Vid referenskursen är den annualiserade potentialen relevant, men Metas höga kapitalintensitet, stora avtalsåtaganden och ännu obevisade AI-avkastning begränsar säkerhetsmarginalen.",
        zoneSharesPct: [25, 33.33333333333333, 41.66666666666667],
        marker: {
          zoneId: "BALANCED",
          positionPct: 30.7,
          label: "Kurs vid analystillfället",
          note: "592,10 USD · 7 aug 2026",
        },
        markers: [
          { id: "reference", positionPct: 30.7, label: "▼ Kurs 592 USD", placement: "above", align: "center" },
          { id: "weighted-fair-value", positionPct: 88.135, label: "Vårt värde 764 USD", placement: "below", align: "end" },
        ],
        scenarioSpread: {
          label: "Scenariospann till 31 december 2027",
          points: [
            { label: "Bear", valueLabel: "500 USD", annualPotentialLabel: "−11,4 %/år" },
            { label: "Sannolikhetsvägt", valueLabel: "764 USD", annualPotentialLabel: "+20,0 %/år" },
            { label: "Bull", valueLabel: "1 056 USD", annualPotentialLabel: "+51,2 %/år" },
          ],
          rangeSharesPct: [47.56305998344787, 52.436940016552114],
          distanceLabel: "Bear → sannolikhetsvägt: 264,37 USD · sannolikhetsvägt → Bull: 291,46 USD",
        },
        footerNote: "Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.",
      },
    },
    positiveReasons: [
      { title: "Annonsmotorn levererar på två fronter", body: "Annonsvisningar ökade 14 % och pris per annons 12 % i Q2." },
      { title: "Global skala ger distributionskraft", body: "Family DAP uppgick till 3,60 miljarder i juni." },
      { title: "Q2 innehöll identifierade engångskostnader", body: "Begränsat justerad rörelsemarginal var 36,8 %." }
    ],
    cautionReasons: [
      { title: "AI-investeringarna är mycket stora", body: "FCF var 0,784 md USD efter 31,1 md USD i Q2-capex." },
      { title: "Åtagandena begränsar flexibiliteten", body: "349,31 md USD i avtal för främst AI-kapacitet och datacenter. Det är inte skuld, men binder framtida kassaflöde." },
      { title: "Avkastningstidpunkten är okänd", body: "Ledningen har inte kvantifierat ROI för AI-infrastruktur." }
    ],
    insightHeadline: "AI-caset är en kapitalavkastningsfråga",
    insightBody: "Efterfrågan är inte huvudfrågan: både annonsvolym och pris växer. Vägen till fortsatt tillväxt går främst via bättre AI-rekommendationer och annonsmonetisering, medan WhatsApp och nya AI-produkter är mindre men växande komplement. Frågan är om annonsmotorn kan finansiera ett större infrastrukturnät utan ett varaktigt tapp i marginal, FCF och kapitalallokering.",
    theses: [
      { status: "Stärkt", title: "Annonsmotorn bär investeringarna", signal: "Annonsvisningar ökade 14 % och pris per annons 12 % i Q2.", next: "Både pris och visningar fortsätter vara positiva." },
      { status: "Ej bekräftad", title: "AI återställer kapitalavkastningen", signal: "Begränsat justerad marginal var 36,8 %, men FCF var bara 0,784 md USD efter Q2-capex.", next: "Marginal ≥35 % och tydligt bättre FCF." },
      { status: "Ej bekräftad", title: "Reality Labs hålls disciplinerad", signal: "Förlusten är fortsatt en av de centrala resultatriskerna.", next: "Förlust ≤4,0 md USD per kvartal." }
    ],
    monitors: [
      { focus: "Annonsvisningar", latest: "+14 %", next: "Fortsatt positiv utveckling", why: "Visar att annonsmotorn fortsätter bära investeringarna." },
      { focus: "Pris per annons", latest: "+12 %", next: "Fortsatt positiv utveckling", why: "Visar fortsatt monetiseringsstyrka." },
      { focus: "Justerad rörelsemarginal", latest: "36,8 %", next: "≥35 %", why: "Testar om AI-investeringarna kan absorberas." },
      { focus: "Reality Labs", latest: "−4,62 md USD", next: "Förlust ≤4,0 md USD", why: "Testar kapitaldisciplinen utanför kärnaffären." }
    ],
    valuationCheck: "TTM justerad P/E är cirka 20x; TTM FCF-avkastning cirka 2,5 %.",
    valuationLimitation: "FCF är pressat av AI-capex och ska inte tolkas som ett normaliserat kassaflöde.",
    riskAndMethod: "Huvudriskerna är kapitalintensitet, annonskonjunktur och betydande juridiska/regulatoriska förfaranden. De 349,31 md USD i icke uppsägningsbara avtalsåtaganden avser främst framtida AI-kapacitet och datacenter. De är inte räntebärande nettoskuld, men begränsar hur fritt Meta kan styra framtida kassaflöden.",
    sourceSummary: "Metas årsrapporter FY2019–FY2025, Q2 2026 Form 10-Q, kvartalsrapporter och earnings call-transkript samt META-stängningskurs 7 augusti 2026."
  },
  summary: "Annonsmotorn växer starkt, men AI-investeringarnas kapitalavkastning är avgörande för nästa fas i caset.",
  investmentCase: "Meta kombinerar en global annonsplattform med AI-driven förbättring av rekommendationer och annonsresultat. Q2 visade fortsatt stark volym- och prisutveckling, medan stora infrastrukturåtaganden gör marginal- och FCF-återhämtningen till den centrala bevakningsfrågan.",
  marketOverview: "Family daily active people nådde 3,60 miljarder i juni 2026. Intäktsbasen domineras av Family of Apps, där annonsintäkterna steg 27 procent i Q2.",
  businessModel: "Digital annonsering på Facebook, Instagram, Messenger och WhatsApp, kompletterad av betalda meddelanden, prenumerationer och nya AI-produkter. Reality Labs är den långsiktiga optionsdelen men fortsätter att redovisa förluster.",
  competitiveAdvantages: [
    "3,60 miljarder Family daily active people ger en exceptionell distributionsyta.",
    "Annonsvisningar ökade 14 procent och genomsnittligt annonspris 12 procent i Q2 2026.",
    "AI förbättrar rekommendationer och annonsresultat i kärnprodukterna."
  ],
  financialAnalysis: "Omsättningen steg 28 procent till 60,8 md USD i Q2. Rapporterad rörelsemarginal var 31 procent, men 36,8 procent före 2,4 md USD i legala kostnader och 1,18 md USD i avgångskostnader. Fritt kassaflöde var 0,8 md USD efter 31,1 md USD i capex inklusive leasingamorteringar.",
  growth: "Tillväxten drivs av förbättrade rekommendationer, annonsverktyg och fortsatt monetisering av WhatsApp. Family of Apps other revenue passerade 1 md USD i Q2 och växte 73 procent, främst via betalda meddelanden och prenumerationer.",
  valuation: "Scenariomodellen använder 2027 års normaliserade EPS och P/E. Bear/Base/Bull ger 500 / 751 / 1 056 USD per aktie, med ett sannolikhetsvägt värde på 764 USD. Modellen är känslig för marginalåterhämtning och kapitalintensitet.",
  risks: [
    "349,31 md USD i icke uppsägningsbara avtalsåtaganden, där cirka 81,65 md USD förfaller 2027.",
    "Meta har inte gett specifik 2027-capex eller en definitiv tidpunkt för ROI på AI-infrastruktur.",
    "Legala och regulatoriska processer kan ge kostnader eller begränsa affärsmodellen.",
    "Reality Labs redovisade 4,62 md USD i rörelseförlust i Q2."
  ],
  conclusion: "KÖP. Den operativa annonsmotorn är stark och det sannolikhetsvägda värdet på 764 USD innebär 29 procents uppsida. Rekommendationen förutsätter dock att marginal och fritt kassaflöde återhämtas när AI-investeringarna skalar.",
  motivation: "Den sannolikhetsvägda uppsidan motiverar köp, men positionen bör hanteras med hänsyn till hög risk och tydliga bevakningspunkter för marginal, FCF och AI-åtaganden.",
  watchItems: [
    "Annonsvisningar och pris per annons ska fortsätta vara positiva.",
    "Begränsat justerad rörelsemarginal och FCF bör återhämta sig.",
    "2026-capex och 2027-åtaganden bör inte öka utan tydligare ROI-disclosure.",
    "Reality Labs-förlusten bör begränsas."
  ],
  historicalFundament: {
    recentQuarters: [
      { period: "Q3 2025", revenueUsdBn: 51.242, operatingMarginPct: 40.1, freeCashFlowUsdBn: 10.620, yearOnYear: { revenueGrowthPct: 26.2, operatingMarginChangePp: -2.8, freeCashFlowGrowthPct: -31.6 }, classification: "FACT", source: { document: "Meta Q3 2025 Results", locator: "Financial Highlights and Condensed Consolidated Statements of Cash Flows" } },
      { period: "Q4 2025", revenueUsdBn: 59.893, operatingMarginPct: 41.3, freeCashFlowUsdBn: 14.080, yearOnYear: { revenueGrowthPct: 23.8, operatingMarginChangePp: -7.0, freeCashFlowGrowthPct: 7.1 }, classification: "FACT", source: { document: "Meta Q4/FY 2025 Results", locator: "Financial Highlights and Condensed Consolidated Statements of Cash Flows" } },
      { period: "Q1 2026", revenueUsdBn: 56.311, operatingMarginPct: 40.6, freeCashFlowUsdBn: 12.390, yearOnYear: { revenueGrowthPct: 33.1, operatingMarginChangePp: -0.9, freeCashFlowGrowthPct: 19.9 }, classification: "FACT", source: { document: "Meta Q1 2026 Results", locator: "Financial Highlights and Condensed Consolidated Statements of Cash Flows" } },
      { period: "Q2 2026", revenueUsdBn: 60.801, operatingMarginPct: 30.9, freeCashFlowUsdBn: 0.784, yearOnYear: { revenueGrowthPct: 28.0, operatingMarginChangePp: -12.3, freeCashFlowGrowthPct: -90.8 }, classification: "FACT", source: { document: "Meta Q2 2026 Results", locator: "Financial Highlights and Condensed Consolidated Statements of Cash Flows" } }
    ],
    annual: [
      { period: "2019", revenueUsdBn: 70.697, operatingIncomeUsdBn: 28.986, operatingMarginPct: 41.0, operatingCashFlowUsdBn: 36.314, freeCashFlowUsdBn: 13.962, classification: "FACT", source: { document: "Meta (Facebook) Annual Report FY 2019", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2020", revenueUsdBn: 85.965, operatingIncomeUsdBn: 32.671, operatingMarginPct: 38.0, operatingCashFlowUsdBn: 38.747, freeCashFlowUsdBn: 26.307, classification: "FACT", source: { document: "Meta (Facebook) Annual Report FY 2020", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2021", revenueUsdBn: 117.929, operatingIncomeUsdBn: 46.753, operatingMarginPct: 39.7, operatingCashFlowUsdBn: 57.683, freeCashFlowUsdBn: 38.293, classification: "FACT", source: { document: "Meta (Facebook) Annual Report FY 2021", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2022", revenueUsdBn: 116.609, operatingIncomeUsdBn: 28.944, operatingMarginPct: 24.8, operatingCashFlowUsdBn: 50.475, freeCashFlowUsdBn: 13.606, classification: "FACT", source: { document: "Meta Annual Report FY 2022", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2023", revenueUsdBn: 134.902, operatingIncomeUsdBn: 46.751, operatingMarginPct: 34.7, operatingCashFlowUsdBn: 71.113, freeCashFlowUsdBn: 40.232, classification: "FACT", source: { document: "Meta Annual Report FY 2023", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2024", revenueUsdBn: 164.501, operatingIncomeUsdBn: 69.380, operatingMarginPct: 42.2, operatingCashFlowUsdBn: 91.328, freeCashFlowUsdBn: 53.024, classification: "FACT", source: { document: "Meta Annual Report FY 2024", locator: "Consolidated Statements of Income and Cash Flows" } },
      { period: "2025", revenueUsdBn: 200.966, operatingIncomeUsdBn: 83.276, operatingMarginPct: 41.4, operatingCashFlowUsdBn: 115.800, freeCashFlowUsdBn: 46.994, classification: "FACT", source: { document: "Meta Annual Report FY 2025", locator: "Consolidated Statements of Income and Cash Flows" } }
    ],
    latest: { period: "LTM Q2 2026", revenueUsdBn: 228.247, operatingIncomeUsdBn: 86.927, operatingMarginPct: 38.1, freeCashFlowUsdBn: 37.874, classification: "DERIVED", source: { document: "Meta Q3 2025–Q2 2026 quarterly reports", locator: "Sum of reported quarterly financial highlights" } },
    derived: { revenueCagr2019To2025Pct: 18.9, operatingMarginRange2019To2025Pct: [24.8, 42.2], latestAnnualYearOnYear: { period: "FY2025", comparedWithPeriod: "FY2024", revenueGrowthPct: 22.2, operatingMarginChangePp: -0.8, freeCashFlowGrowthPct: -11.4 }, formula: "Revenue CAGR = (FY2025 revenue / FY2019 revenue)^(1/6) − 1. Operating-margin range uses reported FY2019–FY2025 margins." }
  },
  overviewPoints: [
    { title: "Beslut", body: "KÖP — 29 % sannolikhetsvägd uppsida, med hög risk kring kapitalavkastningen." },
    { title: "Kurs", body: "$592,10 per 7 augusti 2026" },
    { title: "Sannolikhetsvägt värde", body: "$764 per aktie (2027)" },
    { title: "Största osäkerhet", body: "AI-capex, avtalade kapacitetsåtaganden och tidpunkt för ROI." }
  ],
  financialTables: [{
    title: "Q2 2026 — nyckeltal", headers: ["Mått", "Q2 2026", "Förändring"], rows: [
      ["Omsättning", "$60,8 md", "+28%"], ["Annonsvisningar", "—", "+14%"], ["Pris per annons", "—", "+12%"],
      ["Rapporterad rörelsemarginal", "31,0%", "−12,0 pp"], ["Begränsat justerad marginal", "36,8%", "—"], ["Fritt kassaflöde", "$0,8 md", "—"]
    ]
  }],
  valuationTables: [{
    title: "2027 scenariovärdering", headers: ["Scenario", "EPS", "P/E", "Rimligt värde", "Sannolikhet"], rows: [
      ["Bear", "$27,78", "18x", "$500", "25%"], ["Base", "$34,13", "22x", "$751", "50%"], ["Bull", "$40,61", "26x", "$1 056", "25%"]
    ], footer: "Sannolikhetsvägt värde: $764 per aktie."
  }],
  valuationTargetYear: 2027,
  riskTables: [{
    title: "Centrala risker", headers: ["Risk", "Tidigt varningstecken"], rows: [
      ["Kapitalintensitet", "Svagt FCF samtidigt som capex- eller åtagandeprofilen höjs"],
      ["Annonsmonetisering", "Pris eller annonsvisningar blir negativa YoY"],
      ["Legal/regulatorisk", "Nya materiella avgifter, domar eller produktrestriktioner"]
    ]
  }],
  scenarios: [
    { label: "Bull", value: "$1 056", change: "+78%", type: "bull", probability: "25%", description: "Hög tillväxt och marginal nära tidigare nivåer.", operatingLadder: { revenueUsdBn: 315, operatingMarginPct: 39, operatingIncomeUsdBn: 122.85, normalizedFinanceAndOtherUsdBn: 0, taxRatePct: 16, taxAndOtherUsdBn: 19.70, normalizedNetIncomeUsdBn: 103.15, dilutedSharesBn: 2.54, normalizedEpsUsd: 40.61, revenueGrowthFromLatestAnnualPct: 25.2 } },
    { label: "Base", value: "$751", change: "+27%", type: "base", probability: "50%", description: "Stark annonsmonetisering och delvis återställd marginal.", operatingLadder: { revenueUsdBn: 295, operatingMarginPct: 35, operatingIncomeUsdBn: 103.25, normalizedFinanceAndOtherUsdBn: 0, taxRatePct: 16, taxAndOtherUsdBn: 16.56, normalizedNetIncomeUsdBn: 86.69, dilutedSharesBn: 2.54, normalizedEpsUsd: 34.13, revenueGrowthFromLatestAnnualPct: 21.2 } },
    { label: "Bear", value: "$500", change: "−16%", type: "bear", probability: "25%", description: "Hög kapitalintensitet och uthålligt lägre marginal.", operatingLadder: { revenueUsdBn: 280, operatingMarginPct: 30, operatingIncomeUsdBn: 84, normalizedFinanceAndOtherUsdBn: 0, taxRatePct: 16, taxAndOtherUsdBn: 13.44, normalizedNetIncomeUsdBn: 70.56, dilutedSharesBn: 2.54, normalizedEpsUsd: 27.78, revenueGrowthFromLatestAnnualPct: 18.0 } }
  ],
  scores: { affarsmodell: 5, strategiskMoat: 5, finansiellKvalitet: 3, vardering: 3, tillvaxtutsikter: 4, riskprofil: 2, esgMakro: 2, aiObservationer: 3 }
};
