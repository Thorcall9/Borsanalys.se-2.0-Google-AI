import { AnalysisData } from "../../../types/analysis.js";

export const novoNordisk: AnalysisData = {
  slug: "novo-nordisk",
  title: "Novo Nordisk A/S",
  disclosureKey: "novoNordisk",
  ticker: "NOVO-B.CO",
  market: "Copenhagen",
  sector: "Hälsovård / Läkemedel",
  recommendation: "KÖP",
  price: "845,20 DKK",
  pe: "38.00",
  yield: "1,2%",
  relatedAnalysis: {
    slug: "evolution-2025",
    title: "Globala tillväxtstjärnor",
    label: "Relaterad analys",
    text: "Novo Nordisk leder läkemedelsvärlden, men hur ser caset ut i den nordiska tillväxtmaskinen Evolution?",
    cta: "Läs analys av Evolution",
    accentColor: "#0D1B2A"
  },
  marketCap: "3.8 TDKK",
  summary: "Novo Nordisk är världsledande inom diabetesvård och har revolutionerat marknaden för fetmabehandling med sina GLP-1-läkemedel (Ozempic och Wegovy). Bolaget upplever en enorm efterfrågan som för närvarande överstiger produktionskapaciteten.",
  date: "2026-03-05",
  investmentCase: "Marknaden för fetmabehandling förväntas växa explosivt under det kommande decenniet. Novo Nordisk har ett försteg med sina beprövade produkter och en stark pipeline av nya läkemedel. Bolagets förmåga att skala upp produktionen är nyckeln till framtida tillväxt.",
  marketOverview: "Diabetes och fetma är globala hälsoutmaningar som kräver långsiktig behandling. Novo Nordisk kontrollerar en betydande del av GLP-1-marknaden, men konkurrensen från Eli Lilly ökar.",
  growth: "Tillväxten drivs av den globala utrullningen av Wegovy och ökad användning av Ozempic. Bolaget investerar kraftigt i nya produktionsanläggningar för att möta efterfrågan.",
  financialAnalysis: "Mycket hög lönsamhet och starkt kassaflöde. Novo Nordisk har en konservativ balansräkning och en historik av att leverera stabil utdelningstillväxt och aktieåterköp.",
  competitiveAdvantages: [
    "Ledande expertis inom peptidforskning",
    "Starka varumärken (Ozempic, Wegovy)",
    "Omfattande klinisk data som stödjer produkternas effekt",
    "Storskalig produktionskapacitet för biologiska läkemedel"
  ],
  risks: [
    "Prispress från försäkringsbolag och myndigheter",
    "Konkurrens från Eli Lilly (Zepbound)",
    "Produktionsstörningar eller kapacitetsbrist",
    "Biverkningar som kan upptäckas vid långtidsanvändning"
  ],
  valuation: "Värderingen är hög i ett historiskt perspektiv, men vi anser att den är motiverad givet den unika tillväxtmöjligheten inom fetmabehandling.",
  conclusion: "Novo Nordisk är ett av världens bäst skötta läkemedelsbolag med en unik exponering mot en av de största tillväxtmarknaderna inom hälsovård. Vi upprepar köp.",
  esg: "Novo Nordisk har en stark ESG-profil med fokus på tillgång till hälsovård och miljöansvar (Circular for Zero). De rankas ofta högt i hållbarhetsindex.",
  aiObservations: "AI-analys av kliniska studier och marknadsefterfrågan indikerar fortsatt stark tillväxt för GLP-1-segmentet. Kapacitetsutbyggnaden är den kritiska faktorn.",
  strengths: ["Marknadsledande inom GLP-1", "Stark pipeline", "Hög lönsamhet"],
  weaknesses: ["Kapacitetsbegränsningar", "Beroende av ett fåtal storsäljare"],
  opportunities: ["Expansion inom fetmabehandling", "Nya indikationer för GLP-1"],
  threats: ["Konkurrens från Eli Lilly", "Prispress från myndigheter"],
  scenarios: [
    { label: "Bull Case", value: "1 100 DKK", change: "+30%", type: "bull" },
    { label: "Base Case", value: "920 DKK", change: "+9%", type: "base" },
    { label: "Bear Case", value: "700 DKK", change: "-17%", type: "bear" },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 2,
    tillvaxtutsikter: 5,
    riskprofil: 4,
    esgMakro: 4,
    aiObservationer: 4
  },
  nextSteps: [
    {
      slug: "nvidia-fy2026",
      title: "NVIDIA",
      label: "Hårdvaruledaren",
      reason: "Medan Novo Nordisk leder den medicinska revolutionen, se hur NVIDIA driver den beräkningskraft som behövs för modern läkemedelsforskning och molekylär modellering."
    },
    {
      slug: "apple",
      title: "Apple",
      label: "Konsumentfokus",
      reason: "Jämför Novo Nordisks dominans inom hälsovård med Apples växande ekosystem för personlig hälsa och biometrisk data."
    }
  ],
  deepDiveComponent: "NovoNordisk"
};
