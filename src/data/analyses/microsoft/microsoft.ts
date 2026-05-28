import { AnalysisData } from "../../../types/analysis.js";

export const microsoft: AnalysisData = {
  slug: "microsoft",
  title: "Microsoft Corporation",
  disclosureKey: "microsoft",
  ticker: "MSFT",
  market: "NASDAQ",
  sector: "Mjukvara / Molntjänster",
  recommendation: "KÖP",
  price: "$415,20",
  pe: "32.00",
  yield: "0,75%",
  relatedAnalysis: {
    slug: "alphabet",
    title: "Tech-sektorns giganter",
    label: "Relaterad analys",
    text: "Hur står sig Microsoft mot den andra giganten inom moln och AI? Läs vår analys av Alphabet.",
    cta: "Läs analys av Alphabet",
    accentColor: "#EA4335"
  },
  nextSteps: [
    {
      slug: "alphabet",
      title: "Alphabet",
      label: "AI-kriget",
      reason: "Jämför Microsofts offensiva molnsatsning med sökjätten Alphabet för att se vem som drar mest nytta av den generativa AI-vågen."
    },
    {
      slug: "nvidia-fy2026",
      title: "NVIDIA",
      label: "Hårdvaruledaren",
      reason: "Sätt Microsofts mjukvarudominans i perspektiv genom att analysera bolaget som levererar den nödvändiga beräkningskraften bakom kulisserna."
    }
  ],
  marketCap: "$3.1T",
  summary: "Microsoft är en global ledare inom mjukvara och molntjänster. Genom Azure och integrationen av OpenAI:s teknik i Office-paketet (Copilot) har bolaget tagit en tätposition i AI-racet.",
  date: "2026-03-12",
  investmentCase: "Microsoft drar nytta av den pågående digitaliseringen och flytten till molnet. Azure fortsätter att ta marknadsandelar, och AI-integrationen i deras produktportfölj förväntas öka genomsnittlig intäkt per användare (ARPU) avsevärt.",
  marketOverview: "Marknaden för molntjänster (Cloud) växer stadigt, där Microsoft och Amazon (AWS) är de dominerande aktörerna. AI-boomen har skapat en ny våg av efterfrågan på beräkningskraft och intelligenta mjukvaruverktyg.",
  growth: "Azure är den främsta tillväxtmotorn med tillväxttal kring 30%. Copilot-integrationen i Microsoft 365 börjar nu bidra till tillväxten inom produktivitetsegmentet.",
  financialAnalysis: "Exceptionell lönsamhet med rörelsemarginaler över 40%. Microsoft har en AAA-kreditvärdering och en mycket disciplinerad kapitalallokering med fokus på både tillväxtinvesteringar och aktieägaravkastning.",
  competitiveAdvantages: [
    "Dominerande ställning inom företagsprogramvara",
    "Azure - en av världens största molnplattformar",
    "Strategiskt partnerskap med OpenAI",
    "Starka nätverkseffekter i Office-ekosystemet"
  ],
  risks: [
    "Hård konkurrens från Amazon och Google",
    "Höga förväntningar på AI-intäkter",
    "Regulatorisk granskning av uppköp och AI-samarbeten"
  ],
  valuation: "Värderingen är hög men motiverad av bolagets starka marknadsposition och tillväxtutsikter inom AI. Vi ser Microsoft som en vinnare i den nya teknologiska eran.",
  conclusion: "Microsoft kombinerar stabilitet med hög tillväxt potential. Med en ledande position inom både molnet och AI är bolaget väl positionerat för framtiden. Vi rekommenderar köp.",
  esg: "Microsoft har som mål att vara koldioxidnegativa till 2030. De investerar tungt i förnybar energi för sina datacenter och främjar ansvarsfull AI-utveckling.",
  aiObservations: "AI-analys visar att Microsoft är det bolag som snabbast lyckats monetärisera generativ AI genom Copilot. Azure tar marknadsandelar från konkurrenterna.",
  employees: "~221 000",
  geography: "Global verksamhet med stark närvaro på alla kontinenter. USA är den största marknaden men internationell tillväxt är stark.",
  managementOverview: "Satya Nadella — VD: Har transformerat bolaget till en moln- och AI-ledare sedan 2014. Amy Hood — CFO: Känd för stark finansiell kontroll.",
  ownershipStructure: "Institutionellt ägande dominerar (Vanguard, BlackRock). Grundaren Bill Gates har minskat sitt innehav betydligt över tid.",
  strengths: ["Azure", "AI-ledarskap", "Företagsdominans"],
  weaknesses: ["Beroende av PC-marknaden (Windows)"],
  opportunities: ["Generativ AI", "Gaming (Activision Blizzard)"],
  threats: ["AWS-konkurrens", "Regleringar"],
  scenarios: [
    { label: "Bull Case", value: "$520", change: "+25%", type: "bull" },
    { label: "Base Case", value: "$450", change: "+8%", type: "base" },
    { label: "Bear Case", value: "$360", change: "-13%", type: "bear" },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 3,
    tillvaxtutsikter: 4,
    riskprofil: 5,
    esgMakro: 4,
    aiObservationer: 4
  }
};
