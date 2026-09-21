import type { AnalysisData } from "../../../types/analysis.js";
import {
  NEW_WAVE_V112_ANALYSIS_DATE,
  NEW_WAVE_V112_REFERENCE_DATE,
  NEW_WAVE_V112_REFERENCE_PRICE,
  NEW_WAVE_V112_SOURCE_CUTOFF_DATE,
  NEW_WAVE_V112_VALUATION_DATE,
  newWaveGroupV112RiskRewardZones,
  newWaveGroupV112Scenarios,
  newWaveGroupV112WeightedFairValue,
  newWaveGroupV112YearsToValuation,
} from "./new-wave-group-v11-2-model.js";

const percent = (value: number, digits = 1) =>
  `${value >= 0 ? "+" : "−"}${Math.abs(value * 100).toFixed(digits).replace(".", ",")} %`;

const money = (value: number, digits = 2) =>
  `${value.toFixed(digits).replace(".", ",")} SEK`;

const [bear, base, bull] = newWaveGroupV112Scenarios;
const totalPotential = newWaveGroupV112WeightedFairValue / NEW_WAVE_V112_REFERENCE_PRICE - 1;
const annualPotential =
  Math.pow(
    newWaveGroupV112WeightedFairValue / NEW_WAVE_V112_REFERENCE_PRICE,
    1 / newWaveGroupV112YearsToValuation,
  ) - 1;

export const newWaveGroupV112: AnalysisData = {
  contentType: "analysis",
  slug: "new-wave-group-september-2026",
  templateVersion: "v11",
  title: "New Wave Group AB",
  listTitle: "New Wave Group – v11.2-utkast",
  ticker: "NEWA B",
  isin: "SE0000426546",
  disclosureKey: "newWave",
  date: NEW_WAVE_V112_ANALYSIS_DATE,
  displayDate: "17 september 2026",
  published: false,
  market: "Large Cap Stockholm",
  sector: "Profilkläder, sport & fritid, gåvor och heminredning",
  recommendation: "KÖP",
  recommendationReason:
    "Cirka 14,1 % annualiserad värdepotential stöder KÖP i utkastet, men rekommendationen är inte publiceringsgodkänd. Organisk tillväxt, marginalnormalisering, förvärvsintegration och kapitalbindning måste följas vidare.",
  price: "91,35 kr",
  pe: "Ej primärt beslutsmått",
  yield: "Ej beslutsbärande",
  marketCap: "Ej låst i v11.2-dossiern",
  sharesCount: "132,687 miljoner aktier",
  upside: Number((totalPotential * 100).toFixed(0)),
  summary:
    "New Wave Group kombinerar en internationell varumärkesportfölj med inköps- och distributionsskala. Caset bygger på kontrollerad marginal- och kapacitetsnormalisering, inte på att bolagets långsiktiga 20-procentsmål nås redan 2028.",
  investmentCase:
    "Den avgörande frågan är om New Wave kan lyfta vinsten per aktie mot historiska nivåer när efterfrågan normaliseras och lager-, IT- och logistikinvesteringar belastar mindre, utan att högre skuldsättning och förvärvsintegration försämrar kapitalavkastningen.",
  financialAnalysis:
    "Omsättningen var 10 019 MSEK och EBIT-marginalen 11,4 % under 2025. H1 2026 ökade omsättningen till 4 940 MSEK och EBIT till 494 MSEK, motsvarande 10,0 % marginal. Soliditeten var 51,8 %, nettoskuldsättningsgraden 49,7 % och kassaflödet från löpande verksamhet 305 MSEK.",
  valuation:
    "Omsättning 2028E → EBIT-marginal → normaliserat resultat efter skatt → EPS → P/E. Bear/Base/Bull använder samma värdedatum den 31 december 2028 och vägs 25/55/20 procent.",
  valuationMotivation:
    "Bear/Base/Bull antar 10,5/12,5/14,5 % EBIT-marginal, samtliga under toppåren 2022–2023 och klart under bolagets 20-procentsmål. En gemensam vinstkonvertering på 68,0 % används som explicit modellantagande och ska omprövas vid nästa rapport.",
  growth:
    "Tillväxten drivs av Cotton Classics, uhlsport, Dallas-logistiken, automation och möjlig återhämtning i organisk efterfrågan. Q2:s organiska tillväxt på 2,2 % visar samtidigt att bevisläget fortfarande är tidigt.",
  riskAnalysis:
    "MEDEL–HÖG risk. De viktigaste riskerna är svag organisk efterfrågan, fortsatt kostnadstryck från IT och logistik, integrationsrisk i Cotton Classics och uhlsport, valutaexponering samt hög kapitalbindning i lager.",
  managementAnalysis:
    "Grundarledd koncern med Torsten Jansson som vd och betydande ägarinflytande. Det stödjer långsiktighet men innebär också koncentrerat beslutsinflytande.",
  aiSummary:
    "Marginalnormalisering är den centrala värdedrivaren. Modellen kräver inte historisk toppmarginal, men den kräver att investeringar och förvärv börjar ge bättre resultat och kassaflöde fram till 2028.",
  overviewPoints: [
    {
      title: "Vår syn",
      body: `Sannolikhetsvägt värde är ${money(newWaveGroupV112WeightedFairValue)} den 31 december 2028, motsvarande ${percent(annualPotential)} per år från referenskursen den 17 september 2026.`,
    },
    {
      title: "Investment insight",
      body: "Caset är en kontrollerad marginal- och kapacitetsnormalisering. Base kräver 12,5 % EBIT-marginal, inte bolagets långsiktiga mål på 20 %.",
    },
    {
      title: "Datastatus",
      body: "Bolags- och rapportdata kommer främst från New Wave Groups årsredovisning, Q2-rapport, nyckeltal, flerårsöversikt och förvärvsinformation. Referenskursen är sekundär marknadsdata.",
    },
  ],
  financialTimeline: [
    { year: "2023", highlight: "16,6 %", description: "EBIT-marginal på 1 577 MSEK EBIT och 9 513 MSEK omsättning." },
    { year: "2025", highlight: "11,4 %", description: "Omsättning 10 019 MSEK, EBIT 1 141 MSEK och EPS 5,90 SEK." },
    { year: "H1 2026", highlight: "10,0 %", description: "Omsättning 4 940 MSEK, EBIT 494 MSEK och EPS 2,49 SEK." },
  ],
  financialTables: [
    {
      title: "Rapporterad historik",
      headers: ["Period", "Omsättning", "EBIT", "EBIT-marginal", "EPS"],
      rows: [
        ["2021", "6 719 MSEK", "1 006 MSEK", "15,0 %", "5,70 SEK"],
        ["2022", "8 844 MSEK", "1 505 MSEK", "17,0 %", "8,80 SEK"],
        ["2023", "9 513 MSEK", "1 577 MSEK", "16,6 %", "8,40 SEK"],
        ["2024", "9 529 MSEK", "1 262 MSEK", "13,2 %", "6,60 SEK"],
        ["2025", "10 019 MSEK", "1 141 MSEK", "11,4 %", "5,90 SEK"],
        ["H1 2026", "4 940 MSEK", "494 MSEK", "10,0 %", "2,49 SEK"],
      ],
      footer: "Källa: New Wave Group, årsredovisning 2025, flerårsöversikt och Q2 2026. H1 är inte ett helår.",
    },
  ],
  valuationTables: [
    {
      title: "Full värderingsbrygga – 2028E",
      headers: ["Scenario", "Normaliserad EPS", "P/E", "Värde", "Omsättning", "EBIT-marginal"],
      rows: newWaveGroupV112Scenarios.map((scenario) => [
        scenario.label,
        money(scenario.eps),
        `${scenario.peMultiple.toFixed(1).replace(".", ",")}x`,
        money(scenario.fairValue),
        `${scenario.revenue.toLocaleString("sv-SE")} MSEK`,
        `${(scenario.ebitMargin * 100).toFixed(1).replace(".", ",")} %`,
      ]),
      footer:
        "ASSUMPTION: omsättning, EBIT-marginal, 68,0 % vinstkonvertering och P/E. DERIVED: EBIT, resultat efter skatt, EPS och värde. Gemensamt värdedatum: 2028-12-31.",
    },
  ],
  valuationTargetYear: 2028,
  scenarios: newWaveGroupV112Scenarios.map((scenario) => ({
    type: scenario.id,
    label: scenario.label,
    value: money(scenario.fairValue),
    change: percent(scenario.totalPotentialPct, 0),
    probability: `${(scenario.probability * 100).toFixed(0)} %`,
    description: scenario.description,
    operatingLadder: {
      revenueBn: scenario.revenue / 1_000,
      operatingMarginPct: scenario.ebitMargin * 100,
      operatingIncomeBn: scenario.ebit / 1_000,
      taxRatePct: (1 - scenario.netIncomeConversion) * 100,
      taxAndOtherBn: (scenario.ebit - scenario.netIncome) / 1_000,
      normalizedNetIncomeBn: scenario.netIncome / 1_000,
      dilutedSharesBn: scenario.sharesMillions / 1_000,
      normalizedEps: scenario.eps,
      revenueGrowthFromLatestAnnualPct: (scenario.revenue / 10_019 - 1) * 100,
    },
  })),
  historicalFundament: {
    currency: "SEK",
    moneySuffix: "MdSEK",
    marginLabel: "EBIT-marginal",
    adjustedOperatingMargin: {
      label: "Rapporterad EBIT-marginal",
      rangePct: [11.4, 17.0],
      annual: [
        { period: "2021", marginPct: 15.0 },
        { period: "2022", marginPct: 17.0 },
        { period: "2023", marginPct: 16.6 },
        { period: "2024", marginPct: 13.2 },
        { period: "2025", marginPct: 11.4 },
      ],
      latest: { period: "H1 2026", marginPct: 10.0 },
      comparisonNote: "2028E-scenarierna ligger mellan 10,5 och 14,5 %, under historiska toppnivåer och bolagets 20-procentsmål.",
      reportedHistoryNote: "H1 2026 är en delårsperiod och jämförs inte som helår.",
    },
    cashFlowLabel: "Kassaflöde från löpande verksamhet",
    cashFlowDescription: "Kassaflödet påverkas tydligt av lager och den pågående investeringsfasen.",
    annual: [
      { period: "2021", revenueBn: 6.719, operatingIncomeBn: 1.006, operatingMarginPct: 15.0, cashFlowBn: 1.207, classification: "FACT", source: { document: "New Wave Group flerårsöversikt", locator: "2021" } },
      { period: "2022", revenueBn: 8.844, operatingIncomeBn: 1.505, operatingMarginPct: 17.0, cashFlowBn: -0.360, classification: "FACT", source: { document: "New Wave Group flerårsöversikt", locator: "2022" } },
      { period: "2023", revenueBn: 9.513, operatingIncomeBn: 1.577, operatingMarginPct: 16.6, cashFlowBn: 0.964, classification: "FACT", source: { document: "New Wave Group flerårsöversikt", locator: "2023" } },
      { period: "2024", revenueBn: 9.529, operatingIncomeBn: 1.262, operatingMarginPct: 13.2, cashFlowBn: 1.278, classification: "FACT", source: { document: "New Wave Group flerårsöversikt", locator: "2024" } },
      { period: "2025", revenueBn: 10.019, operatingIncomeBn: 1.141, operatingMarginPct: 11.4, cashFlowBn: 0.653, classification: "FACT", source: { document: "New Wave Group årsredovisning 2025", locator: "Flerårsöversikt" } },
    ],
    latest: { period: "H1 2026", revenueBn: 4.940, operatingIncomeBn: 0.494, operatingMarginPct: 10.0, cashFlowBn: 0.305, classification: "FACT", source: { document: "New Wave Group Q2 2026", locator: "H1-nyckeltal" } },
    derived: {
      revenueCagr2019To2025Pct: 10.5,
      operatingMarginRange2019To2025Pct: [11.4, 17.0],
      formula: "Femårig omsättnings-CAGR avser 2021–2025: (10 019 / 6 719)^(1/4) − 1.",
    },
  },
  v11: {
    analysisId: "nwg-newa-b-2026-09-17",
    versionId: "NWG-2026-09-17-v1",
    publicationStatus: "NOT_PUBLISH_READY",
    recommendationStatus: "DRAFT",
    sourceCutoffDate: NEW_WAVE_V112_SOURCE_CUTOFF_DATE,
    valuationDate: NEW_WAVE_V112_VALUATION_DATE,
    valuationYearLabel: "2028E",
    currency: "SEK",
    valueSuffix: "SEK",
    headline: "Marginalåterhämtningen kan ge uppsida – men måste fortfarande bevisas",
    dek: "New Wave växer genom förvärv och bygger kapacitet, medan den organiska tillväxten och kassaflödet ännu är ojämna. Värderingen blir attraktiv om marginalen normaliseras en bit, utan att bolaget behöver nå sitt långsiktiga mål.",
    weightedFairValue: newWaveGroupV112WeightedFairValue.toFixed(2).replace(".", ","),
    currentPrice: money(NEW_WAVE_V112_REFERENCE_PRICE),
    marketReferenceDate: NEW_WAVE_V112_REFERENCE_DATE,
    upside: percent(totalPotential),
    annualPotential: `${percent(annualPotential)} per år`,
    valuePotentialLabel: "Total värdepotential",
    weightedValueLabel: "Sannolikhetsvägt värde 2028E",
    valuationChainLabel: "Omsättning → EBIT-marginal → normaliserat resultat → EPS → P/E → värde",
    epsBridgeEnabled: true,
    normalizationNote:
      "Vinstkonverteringen 68,0 % är ett gemensamt modellantagande nära 2025 års 68,6 % och H1 2026 års 66,8 %. Det är inte ett rapporterat mål och ska omprövas vid varje uppdatering.",
    riskLabel: "MEDEL–HÖG RISK",
    ownershipDisclosure:
      "Intresseupplysning: Analysförfattaren har en position i New Wave Group. Innehavet kan innebära en intressekonflikt.",
    riskRewardZones: {
      status: newWaveGroupV112RiskRewardZones.status,
      visibility: newWaveGroupV112RiskRewardZones.visibility,
      title: "När blir risk/reward mer attraktiv?",
      introduction:
        "Zonerna är beräknade från samma värderingsdatum, sannolikhetsvägda värde och Bear-värde, men är ännu inte redaktionellt godkända.",
      valuationDate: newWaveGroupV112RiskRewardZones.valuationDate,
      zones: newWaveGroupV112RiskRewardZones.zones.map((zone) => ({ ...zone })),
      disclaimer:
        "DRAFT: zonerna får inte visas publikt eller användas som personliga köp- eller säljrekommendationer före redaktionellt godkännande.",
    },
    positiveReasons: [
      { title: "Skalan är redan byggd", body: "New Wave har varumärken, inköpsorganisation och distribution över Europa och Nordamerika. Det ger operationell hävstång när volymerna förbättras." },
      { title: "Bruttomarginalen håller emot", body: "Q2 2026 nådde bruttomarginalen 50,0 %, även om Cotton Classics lägre marginal var en motverkande faktor." },
      { title: "Base kräver ingen full måluppfyllelse", body: "Base antar 12,5 % EBIT-marginal 2028, klart under både historiska toppnivåer och bolagets långsiktiga mål på 20 %." },
    ],
    cautionReasons: [
      { title: "Organisk tillväxt är ännu låg", body: "Q2:s organiska tillväxt i lokal valuta var 2,2 %, medan förvärvad tillväxt stod för en betydligt större del." },
      { title: "Investeringarna binder kapital", body: "IT, lager, Dallas-logistik och automation kan fortsätta belasta kassaflöde och resultat om efterfrågan inte fyller den nya kapaciteten." },
      { title: "Förvärven måste integreras", body: "Cotton Classics har lägre bruttomarginal och uhlsports slutliga finansiering, balanspåverkan och integrationsramar var inte klara vid source cutoff." },
    ],
    insightHeadline: "Caset kräver en normalisering – inte en återgång till rekordmarginal",
    insightBody:
      "Marknaden värderar New Wave som om marginalpressen blir mer bestående än tillfällig. Det är inte orimligt, men modellen visar att en begränsad återhämtning till 12,5 % EBIT-marginal kan ge ett tydligt värdeutfall utan att 2022–2023 års toppnivåer eller bolagets 20-procentsmål behöver nås.",
    theses: [
      { status: "Under bevakning", title: "Efterfrågan normaliseras tillräckligt för att fylla ny kapacitet", signal: "Organisk tillväxt i lokal valuta var positiv men endast 2,2 % i Q2 2026.", next: "Q3 ska visa om organisk tillväxt breddas utan att främst bäras av förvärv." },
      { status: "Under bevakning", title: "Investeringarna ger marginallyft efter 2027", signal: "Q2 EBIT-marginal var 11,3 %, medan automation väntas belasta fram till slutet av 2027.", next: "Kostnadsutveckling, kapacitetsutnyttjande och marginal i USA och Europa." },
      { status: "Obekräftad", title: "Cotton Classics och uhlsport blir värdeskapande plattformsförvärv", signal: "Cotton Classics driver tillväxt men har lägre bruttomarginal. Fullständig uhlsport-data saknades vid cutoff.", next: "Tillträdesdata, köpeskilling, balanspåverkan och första integrationsramar." },
      { status: "Under bevakning", title: "Balansräkningen behåller handlingsutrymme", signal: "Soliditeten var 51,8 %, medan nettoskuldsättningsgraden hade ökat till 49,7 %.", next: "Nettoskuld, lager och kassaflöde efter investeringar och förvärv." },
    ],
    monitors: [
      { focus: "Organisk tillväxt", latest: "2,2 % i lokal valuta Q2", next: "Bredare acceleration i Q3", why: "Avgör om ny kapacitet kan fyllas utan fortsatt förvärvsberoende." },
      { focus: "EBIT-marginal", latest: "11,3 % Q2 och 10,0 % H1", next: "Förbättring utan stöd av engångsposter", why: "Marginalnormaliseringen är modellens viktigaste värdedrivare." },
      { focus: "Kassaflöde och lager", latest: "305 MSEK operativt kassaflöde H1", next: "Bättre kassakonvertering och kontrollerad lagerutveckling", why: "Testar om tillväxten skapar värde eller främst binder kapital." },
      { focus: "uhlsport", latest: "Cirka 67 MEUR omsättning 2025 och mindre redovisad förlust", next: "Slutliga villkor och integrationsram", why: "Påverkar både förvärvstesen och balansräkningens risk." },
    ],
    valuationCheck:
      `Bear/Base/Bull ger ${money(bear.fairValue)}/${money(base.fairValue)}/${money(bull.fairValue)}. Sannolikheterna 25/55/20 procent ger ${money(newWaveGroupV112WeightedFairValue)}.`,
    valuationLimitation:
      "Modellen är inte en DCF och fångar inte separat förändringar i rörelsekapital, köpeskillingar eller valuta. Vinstkonverteringen på 68,0 % är gemensam för alla scenarier och därför en särskild känslighet att ompröva.",
    valuationSummary:
      "Ett Bear med fortsatt marginalpress, ett Base med begränsad normalisering och ett Bull som fortfarande ligger under historisk toppmarginal.",
    valuationGrowthContext:
      "Omsättning 2028E är 11,3/13,1/14,3 MdSEK i Bear/Base/Bull. EBIT-marginalen är 10,5/12,5/14,5 %, jämfört med 11,4 % år 2025 och 16,6–17,0 % under 2022–2023.",
    historyMarginLabel: "EBIT-marginal",
    classificationSummary:
      "Rapporterade New Wave-tal är FACT; historiska jämförelser och värden är DERIVED; 2028E-inputs och 68,0 % vinstkonvertering är ASSUMPTION; rekommendation och tesstatus är ANALYSIS.",
    nextReportWindow: "Q3 2026 väntas den 11 november 2026.",
    riskAndMethod:
      "Publiceringsblockerare: central disclaimerkonfiguration saknas och risk/reward-zonerna är DRAFT. Dossiern förblir därför NOT_PUBLISH_READY. MEDEL–HÖG risk speglar marginal-, integrations-, valuta-, lager- och skuldrisk.",
    sourceSummary:
      "New Wave Group årsredovisning 2025, Q2 2026, bolagets nyckeltal, flerårsöversikt, finansiella mål och pressmeddelande om uhlsport; daterad sekundär marknadskurs den 17 september 2026.",
  },
};
