import { AnalysisData } from "../../../types/analysis.js";

export const visa: AnalysisData = {
  slug: "visa",
  title: "Visa Inc.",
  listTitle: "Visa",
  ticker: "V",
  date: "2026-08-10",
  published: true,
  market: "NYSE",
  sector: "Betalningsnätverk",
  recommendation: "BEVAKA",
  price: "$362,50",
  pe: "30,8x",
  yield: "0,93%",
  marketCap: "$694,6 md",
  summary: "Visa är ett bolag av mycket hög kvalitet, men dagens värdering lämnar begränsad säkerhetsmarginal. God aktieavkastning kräver fortsatt hög vinsttillväxt och en bibehållen värderingspremie.",
  v11: {
    valuationDate: "2026-08-07",
    headline: "Visa: nätverkskvaliteten är bevisad – värderingen kräver fortsatt tillväxt",
    dek: "Betalningsvolym, cross-border och processade transaktioner växer starkt. Nästa fråga är om vinsttillväxten räcker för att försvara en hög multipel och återkommande litigation-belastning.",
    weightedFairValue: "394,75",
    currentPrice: "362,50 USD",
    upside: "+8,9 %",
    annualPotential: "Sannolikhetsvägd CAGR till 30 september 2027: +7,7 %",
    valuePotentialLabel: "Total värdepotential",
    riskLabel: "Medelrisk",
    positiveReasons: [
      { title: "Volymtillväxten är bred", body: "Q3 FY2026 betalningsvolym ökade 10 %, cross-border exklusive intra-Europe 12 % och processade transaktioner 10 %." },
      { title: "Marginalen är mycket hög", body: "TTM-rörelsemarginalen är härledd till cirka 60,7 %." },
      { title: "Kassagenereringen är stark", body: "TTM FCF uppgår till cirka 21,0 md USD enligt CFO minus kapitalutgifter." }
    ],
    cautionReasons: [
      { title: "Litigation återkommer", body: "Visa har historiskt haft återkommande juridiska kostnader kopplade till sin marknadsposition och interchange-modell. Vi antar därför en försiktig löpande belastning; större framtida förlikningar är en separat nedsiderisk och 237 MUSD i Q3 ska inte läsas som en exakt normalnivå." },
      { title: "Kostnadssidan behöver bevisas", body: "Q3 FY2026 ökade GAAP-rörelsekostnaderna 19 % mot 14 % intäktstillväxt. Nästa rapport behöver visa om detta främst var juridiska och tillfälliga kostnader, eller början på lägre operativ hävstång." },
      { title: "Konkurrensen pressar ekonomin gradvis", body: "Visa riskerar sannolikt inte att ersättas snabbt. Den större risken är att reglering, A2A/open banking, lokala betalningsnät och digitala plånböcker som äger kundrelationen gradvis pressar ekonomin per transaktion." },
      { title: "Säkerhetsmarginalen är begränsad", body: "Visa kan fortsätta vara ett bra bolag även om aktien utvecklas svagt. P/E omkring 30,8x och FCF-avkastning omkring 3,0 % förutsätter redan fortsatt stark tillväxt." }
    ],
    insightHeadline: "Visa är ett kvalitetsbolag – men värderingen lämnar liten säkerhetsmarginal",
    insightBody: "Visa kan fortsätta vara ett mycket bra bolag även om aktien utvecklas svagt. Kärnan är att P/E omkring 30,8x och FCF-avkastning omkring 3,0 % redan förutsätter fortsatt stark vinsttillväxt och en hög värderingspremie. Risken är inte främst att Visa slutar växa, utan att vinsttillväxten normaliseras samtidigt som marknaden accepterar en lägre P/E-multipel. Då kan multipelkompression äta upp en stor del av vinsten från EPS-tillväxten.",
    theses: [
      { status: "Stärkt", title: "Volymtillväxten förblir robust", signal: "Q3: betalningsvolym +10 %, cross-border +12 %, transaktioner +10 %.", next: "Fortsatt stabil tillväxt i Q4 och FY2027." },
      { status: "Stärkt", title: "Visa konverterar volym till intäkt", signal: "Q3-intäkt +14 %.", next: "Intäkt växer i linje med eller över volym." },
      { status: "Försvagad", title: "Rättslig och kostnadsmässig belastning är hanterbar", signal: "Q3 litigation provision 237 MUSD och GAAP-rörelsekostnader +19 %.", next: "Nästa rapport visar lägre juridisk belastning och om kostnadstillväxten åter understiger intäktstillväxten." }
    ],
    monitors: [
      { focus: "Payments volume", latest: "+10 %", next: "Fortsatt tvåsiffrig tillväxt", why: "Testar volymtesen." },
      { focus: "Cross-border", latest: "+12 %", next: "Stabil tillväxt", why: "Testar internationell tillväxt." },
      { focus: "Litigation", latest: "237 MUSD Q3", next: "Ingen större ny förlikning och lägre löpande belastning", why: "Testar den försiktiga normaliseringen av EPS." }
    ],
    valuationCheck: "TTM P/E cirka 30,8x, EV/EBIT cirka 26,1x och FCF-avkastning cirka 3,0 %. Måtten avser rapporterad TTM-vinst och FCF; justerad EBIT används inte i samma jämförelse.",
    valuationLimitation: "Scenarierna är känsliga för litigation, EPS-tillväxt och vilken P/E-multipel marknaden accepterar.",
    riskAndMethod: "Rapporterade data är FACT; TTM-mått och FCF är DERIVED; scenarier och multiplar är ASSUMPTION; litigation normaliseras delvis och exponeras öppet.",
    sourceSummary: "Visa FY2025 Annual Report, Q1–Q4 FY2025, Q1–Q3 FY2026 Earnings Releases, Q3 FY2026 Earnings Call och Google Finance-kurs 7 augusti 2026."
  },
  valuation: "Värderingen använder FY2027 EPS-scenarier och P/E. Litigation belastar Base-EPS genom en normaliserad kostnad.",
  valuationTargetYear: 2027,
  valuationTables: [{
    title: "FY2027 scenariovärdering",
    headers: ["Scenario", "Omsättningstillväxt", "EPS", "P/E", "Rimligt värde", "Sannolikhet", "CAGR"],
    rows: [["Bear", "SAKNAS", "$12,00", "25x", "$300", "25%", "−15,2% CAGR"], ["Base", "SAKNAS", "$13,50", "29x", "$392", "50%", "+7,1% CAGR"], ["Bull", "≈ tvåsiffrig", "$15,00", "33x", "$495", "25%", "+31,2% CAGR"]],
    footer: "Sannolikhetsvägt värde: 394,75 USD per aktie (300 × 25% + 392 × 50% + 495 × 25%). Total värdepotential är +8,9%; sannolikhetsvägd CAGR är +7,7% från kursen 7 augusti 2026 till 30 september 2027, exklusive utdelning. Omsättningstillväxt är inte kvantifierad i Base/Bear och visas därför som SAKNAS."
  }],
  scenarios: [
    { label: "Bull", value: "$495", change: "+36,6%", cagr: "+31,5%", type: "bull", probability: "25%", description: "Volymtillväxten håller, litigation minskar och premiumvärderingen försvaras.", valuationBridge: { paymentVolume: "Tvåsiffrig volym- och cross-border-tillväxt", revenues: "Value-added services lyfter intäkterna", normalizedEps: "$15,00", pe: "33x", fairValue: "$15,00 × 33 = $495", whatWeAssume: "Betalningsvolym och cross-border fortsätter växa med omkring tvåsiffriga tal. Value-added services blir en större intäktsmotor och litigation minskar.", whyThisValuation: "Marknaden fortsätter betala en premium för Visa eftersom bolaget visar att både tillväxten och marginalen är mer uthålliga än befarat.", whatMustBeProven: "Stabil tvåsiffrig intäkts- och EPS-tillväxt, lägre juridiska kostnader och återställd operativ hävstång." } },
    { label: "Base", value: "$392", change: "+8,1%", cagr: "+7,1%", type: "base", probability: "50%", description: "Betalningsvolym och value-added services växer vidare, men multipeln normaliseras något.", valuationBridge: { paymentVolume: "Fortsatt god volymtillväxt; cross-border positiv", revenues: "Volym, cross-border och tjänster ger god tillväxt", normalizedEps: "$13,50", pe: "29x", fairValue: "$13,50 × 29 = $391,50 ≈ $392", whatWeAssume: "Omsättningen växer fortsatt i god takt när betalningsvolym, cross-border och value-added services utvecklas positivt. Marginalen förblir hög, men litigation och högre kostnader begränsar resultatlyftet.", whyThisValuation: "Visa fortsätter växa, men aktien värderas redan högt. Därför räknar vi med viss multipelkompression även om vinsten ökar.", whatMustBeProven: "Intäkterna behöver fortsätta växa snabbare än kostnaderna, samtidigt som inga större nya rättsliga belastningar tillkommer." } },
    { label: "Bear", value: "$300", change: "−17,2%", cagr: "−15,2%", type: "bear", probability: "25%", description: "Volymtillväxten bromsar, litigation förblir hög och multipeln komprimeras.", valuationBridge: { paymentVolume: "Lägre volymtillväxt; cross-border normaliseras", revenues: "Kostnader växer snabbare än intäkterna", normalizedEps: "$12,00", pe: "25x", fairValue: "$12,00 × 25 = $300", whatWeAssume: "Betalningsvolymen bromsar, cross-border normaliseras och kostnaderna fortsätter växa snabbare än intäkterna. Litigation förblir en återkommande belastning.", whyThisValuation: "När tillväxten blir mer normal accepterar marknaden sannolikt inte längre samma höga P/E-multipel.", whatMustBeProven: "Visa kan fortfarande vara ett bra bolag, men en svagare kombination av EPS-tillväxt och multipel kan ändå ge klart negativ aktieavkastning.", whatBreaksThesis: "Visa kan fortfarande vara ett bra bolag, men en svagare kombination av EPS-tillväxt och multipel kan ändå ge klart negativ aktieavkastning." } }
  ]
};
