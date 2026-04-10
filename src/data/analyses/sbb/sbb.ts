import { AnalysisData } from "../../../types/analysis";

export const sbb: AnalysisData = {
  slug: "sbb",
  title: "SBB",
  ticker: "SBB-B.ST",
  market: "Large Cap Stockholm",
  sector: "Fastigheter",
  recommendation: "SÄLJ",
  price: "3,45 kr",
  pe: "N/A",
  yield: "0%",
  marketCap: "5,2 Bkr",
  summary: "Samhällsbyggnadsbolaget i Norden (SBB) äger och förvaltar samhällsfastigheter i Norden. Bolaget har under den senaste tiden drabbats hårt av stigande räntor och en hög skuldsättning, vilket lett till stora nedskrivningar och inställda utdelningar.",
  date: "2026-02-20",
  investmentCase: "Investeringscaset i SBB handlar idag om krishantering och överlevnad. Bolaget fokuserar på att sälja tillgångar för att stärka balansräkningen och minska skuldsättningen.",
  marketOverview: "Fastighetsmarknaden i Norden har varit under press pga stigande räntor. Samhällsfastigheter anses generellt stabila, men SBB:s höga belåning har gjort dem sårbara.",
  growth: "Tillväxt är inte i fokus för närvarande. Prioritet ligger på att avyttra fastigheter och förenkla bolagsstrukturen.",
  financialAnalysis: "Mycket ansträngd finansiell ställning med hög skuldsättning och pressad likviditet. Bolaget arbetar med omfattande försäljningar för att möta kommande obligationsförfall.",
  competitiveAdvantages: [
    "Stor portfölj av samhällsfastigheter med stabila hyresgäster",
    "Långa hyresavtal (ofta 10+ år)",
    "Viss politisk förankring i hyresrelationerna"
  ],
  risks: [
    "Fortsatt höga räntor försvårar refinansiering",
    "Ytterligare nedskrivningar av fastighetsvärden",
    "Likviditetsbrist vid uteblivna försäljningar"
  ],
  valuation: "Värderingen är extremt osäker och beror helt på bolagets förmåga att hantera sin skuld. Aktien handlas till en stor rabatt mot bokfört värde, vilket speglar marknadens misstro.",
  conclusion: "SBB är en högriskplacering där osäkerheten kring balansräkningen dominerar. Vi rekommenderar försiktighet och upprepar sälj.",
  esg: "SBB har haft höga ambitioner inom social hållbarhet, men de finansiella problemen har överskuggat detta arbete på senare tid.",
  aiObservations: "AI-analys av kassaflöden och skuldstruktur indikerar fortsatt hög risk. Sentimentet är mycket negativt och volatiliteten förväntas förbli hög.",
  employees: "~500",
  geography: "Huvudsakligen Sverige, Norge och Finland med fokus på kommunala och statliga hyresgäster.",
  managementOverview: "Leiv Synnes — VD: Tog över i maj 2023 med uppdraget att städa upp i balansräkningen. Lennart Schuss — Ordförande.",
  ownershipStructure: "Ilija Batljan (grundare) är fortfarande en betydande ägare, men hans inflytande har minskat i takt med att nya investerare kommit in.",
  strengths: [
    "Stark position inom samhällsfastigheter",
    "Långa hyresavtal med offentliga hyresgäster",
    "Viss diversifiering i portföljen"
  ],
  weaknesses: [
    "Mycket hög skuldsättning",
    "Lågt förtroende från kapitalmarknaden",
    "Komplex bolagsstruktur"
  ],
  opportunities: [
    "Försäljning av tillgångar för att minska skulder",
    "Omstrukturering av balansräkningen",
    "Sänkta räntor framöver"
  ],
  threats: [
    "Ytterligare kreditbetygssänkningar",
    "Likviditetskris",
    "Fortsatta fall i fastighetsvärden"
  ],
  scenarios: [
    { label: "Bull Case", value: "8 kr", change: "+130%", type: "bull" },
    { label: "Base Case", value: "4 kr", change: "+15%", type: "base" },
    { label: "Bear Case", value: "1 kr", change: "-70%", type: "bear" },
  ],
  scores: {
    affarsmodell: 2,
    strategiskMoat: 2,
    finansiellKvalitet: 1,
    vardering: 4,
    tillvaxtutsikter: 2,
    riskprofil: 1,
    esgMakro: 2,
    aiObservationer: 2
  }
};
