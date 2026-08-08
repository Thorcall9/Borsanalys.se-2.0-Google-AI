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
  summary: "Visa fortsätter växa med hög lönsamhet och stark kassagenerering. Värderingen lämnar däremot begränsad säkerhetsmarginal när litigation hanteras som en återkommande kostnad.",
  v11: {
    headline: "Visa: nätverkskvaliteten är bevisad – värderingen kräver fortsatt tillväxt",
    dek: "Betalningsvolym, cross-border och processade transaktioner växer starkt. Nästa fråga är om vinsttillväxten räcker för att försvara en hög multipel och återkommande litigation-belastning.",
    weightedFairValue: "394",
    currentPrice: "362,50 USD",
    upside: "+8,7 %",
    annualPotential: "Sannolikhetsvägd CAGR: +8,7 %",
    riskLabel: "Medelrisk",
    positiveReasons: [
      { title: "Volymtillväxten är bred", body: "Q3 FY2026 betalningsvolym ökade 10 %, cross-border exklusive intra-Europe 12 % och processade transaktioner 10 %." },
      { title: "Marginalen är mycket hög", body: "TTM-rörelsemarginalen är härledd till cirka 60,7 %." },
      { title: "Kassagenereringen är stark", body: "TTM FCF uppgår till cirka 21,0 md USD enligt CFO minus kapitalutgifter." }
    ],
    cautionReasons: [
      { title: "Litigation återkommer", body: "Rättsliga avsättningar har påverkat flera kvartal och behålls därför delvis i normaliserad EPS." },
      { title: "Kostnaderna växer snabbt", body: "Q3 FY2026 ökade GAAP-rörelsekostnaderna 19 % mot 14 % intäktstillväxt." },
      { title: "Säkerhetsmarginalen är begränsad", body: "TTM P/E är cirka 30,8x och Base-potentialen cirka 8,0 %." }
    ],
    insightHeadline: "Visa levererar kvalitet; värderingen kräver fortsatt bevis",
    insightBody: "Volymdriven intäktstillväxt, hög marginal och starkt kassaflöde visar att nätverksmodellen fungerar. För aktien är frågan om framtida vinsttillväxt räcker för dagens multipel.",
    theses: [
      { status: "Stärkt", title: "Volymtillväxten förblir robust", signal: "Q3: betalningsvolym +10 %, cross-border +12 %, transaktioner +10 %.", next: "Fortsatt stabil tillväxt i Q4 och FY2027." },
      { status: "Stärkt", title: "Visa konverterar volym till intäkt", signal: "Q3-intäkt +14 %.", next: "Intäkt växer i linje med eller över volym." },
      { status: "Försvagad", title: "Rättslig och kostnadsmässig belastning är hanterbar", signal: "Q3 litigation provision 237 MUSD och opex +19 %.", next: "Inga nya stora avsättningar och lägre opex-tillväxt." }
    ],
    monitors: [
      { focus: "Payments volume", latest: "+10 %", next: "Fortsatt tvåsiffrig tillväxt", why: "Testar volymtesen." },
      { focus: "Cross-border", latest: "+12 %", next: "Stabil tillväxt", why: "Testar internationell tillväxt." },
      { focus: "Litigation", latest: "237 MUSD Q3", next: "Lägre eller stabil belastning", why: "Testar normaliserad EPS." }
    ],
    valuationCheck: "TTM P/E cirka 30,8x, EV/EBIT cirka 26,1x och FCF-avkastning cirka 3,0 %.",
    valuationLimitation: "Scenarierna är känsliga för litigation, EPS-tillväxt och vilken P/E-multipel marknaden accepterar.",
    riskAndMethod: "Rapporterade data är FACT; TTM-mått och FCF är DERIVED; scenarier och multiplar är ASSUMPTION; litigation normaliseras delvis och exponeras öppet.",
    sourceSummary: "Visa FY2025 Annual Report, Q1–Q4 FY2025, Q1–Q3 FY2026 Earnings Releases, Q3 FY2026 Earnings Call och Google Finance-kurs 7 augusti 2026."
  },
  valuation: "Värderingen använder FY2027 EPS-scenarier och P/E. Litigation belastar Base-EPS genom en normaliserad kostnad.",
  valuationTargetYear: 2027,
  valuationTables: [{
    title: "FY2027 scenariovärdering",
    headers: ["Scenario", "EPS", "P/E", "Rimligt värde", "Sannolikhet", "CAGR"],
    rows: [["Bear", "$12,00", "25x", "$300", "25%", "−8,6%"], ["Base", "$13,50", "29x", "$392", "50%", "+7,9%"], ["Bull", "$15,00", "33x", "$495", "25%", "+36,6%"]],
    footer: "Sannolikhetsvägt värde: 394 USD per aktie. CAGR är annualiserad kursavkastning till FY2027 och exkluderar utdelning."
  }],
  scenarios: [
    { label: "Bull", value: "$495", change: "+36,6%", cagr: "+36,6%", type: "bull", probability: "25%", description: "Volymtillväxten håller, litigation minskar och premiumvärderingen försvaras." },
    { label: "Base", value: "$392", change: "+8,0%", cagr: "+7,9%", type: "base", probability: "50%", description: "Betalningsvolym och value-added services växer vidare, men multipeln normaliseras något." },
    { label: "Bear", value: "$300", change: "−17,2%", cagr: "−17,2%", type: "bear", probability: "25%", description: "Volymtillväxten bromsar, litigation förblir hög och multipeln komprimeras." }
  ]
};
