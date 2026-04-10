import { AnalysisData } from "../../../types/analysis";

export const alphabet: AnalysisData = {
  slug: "alphabet",
  title: "Alphabet Inc.",
  ticker: "GOOGL",
  market: "NASDAQ",
  sector: "Internet / AI",
  recommendation: "KÖP",
  price: "$307",
  pe: "~28.00x",
  yield: "0,45%",
  marketCap: "$3.9T",
  summary: "Alphabet är moderbolaget till Google och YouTube. Bolaget dominerar den digitala annonsmarknaden och är en ledande aktör inom AI-forskning och molntjänster genom Google Cloud. Med sju produkter som har över 2 miljarder användare var har bolaget en oöverträffad vallgrav.",
  date: "2026-03-15",
  investmentCase: "Googles sökdominans fortsätter att generera enorma kassaflöden som finansierar investeringar i AI (Gemini) och molntjänster. Google Cloud (GCP) har nått en kritisk massa med stigande marginaler (20,7%) och en tillväxttakt på 32%. Waymo representerar en massiv framtida optionalitet inom autonom körning.",
  businessModel: "Alphabet verkar via tre primära segment: Google Services (Search, YouTube, Android, Ads), Google Cloud (GCP, Vertex AI, Workspace) och Other Bets (Waymo, Calico, Wing). Intäkterna kommer främst från digital annonsering, molntjänster och prenumerationer.",
  managementOverview: "Sundar Pichai (VD): Har lett Google sedan 2015 och Alphabet sedan 2019. Ruth Porat (CFO/President): Tidigare CFO, nu President och CIO, känd för sin finansiella disciplin.",
  ownershipStructure: "Dual-class aktiestruktur där grundarna Larry Page och Sergey Brin innehar röstmajoritet genom B-aktier, vilket möjliggör långsiktigt fokus men begränsar minoritetsägares inflytande.",
  employees: "~187 000",
  geography: "Global verksamhet med huvudkontor i Mountain View, Kalifornien. Intäkterna är väl diversifierade globalt med USA som största enskilda marknad.",
  financialAnalysis: "Alphabet har en exceptionell balansräkning med $95Mdr i nettokassa. Trots massiva CapEx-investeringar (~$85Mdr 2025) för AI-infrastruktur, förblir kassaflödesgenereringen mycket stark. EBIT-marginalen ligger kring 33%.",
  valuation: "Värderingen på ~28x P/E är rimlig givet bolagets kvalitet och tillväxtutsikter. Rabatten mot Microsoft ger en säkerhetsmarginal för den långsiktige investeraren. Forward P/E 2026e ligger kring 27x.",
  growth: "Tillväxten drivs av Google Cloud, YouTube Subscriptions (270M+ prenumeranter) och AI-drivna annonslösningar. Waymo genomför nu ~450 000 betalda resor per vecka.",
  esg: "Ambitiöst hållbarhetsarbete med målet om net-zero till 2030 (MSCI ESG-rating: AAA). Utmaningar finns kring energibehovet för AI-datacenter.",
  aiObservations: "Sentimentet har skiftat till positivt. Marknaden ser nu Alphabet som en AI-vinnare. Sök har visat sig vara mer resilient än väntat mot AI-disruption.",
  conclusion: "Alphabet kombinerar ett historiskt starkt sökmonopol med en snabbväxande Cloud-affär och världsledande AI-kapacitet. Vi ser Alphabet som en av de främsta vinnarna i AI-eran.",
  motivation: "Alphabet kombinerar ett historiskt starkt sökmonopol med en snabbväxande Cloud-affär och världsledande AI-kapacitet. Vi ser Alphabet som en av de främsta vinnarna i AI-eran.",
  strengths: [
    "Dominans inom sök och annonsering — ~90% global marknadsandel",
    "Full-stack AI-ledarskap: Gemini 2.5, TPU Ironwood (gen. 7), DeepMind",
    "Massiva nätverkseffekter — 7 produkter med över 2 miljarder användare",
    "GCP-marginal 20,7% (Q2 2025) — snabb lönsamhetsexpansion",
    "Exceptionell balansräkning: $95Mdr nettokassa, nästintill skuldfri"
  ],
  weaknesses: [
    "~75% av intäkterna från annonsering — koncentrationsrisk",
    "Google Cloud är #3 bakom AWS och Azure",
    "CapEx exploderar: ~$85Mdr 2025, pressar FCF kortsiktigt",
    "Other Bets (inkl. Waymo) genererar operativa förluster >$1Mdr/kvartal",
    "Dual-class aktiestruktur begränsar minoritetsägares inflytande"
  ],
  opportunities: [
    "AI Overview Ads: bevisad monetarisering av generativ sökning",
    "GCP: målsättning $100Mdr ARR — 32% tillväxt i Q2 2025",
    "Waymo: ~450 000 betalda resor/vecka, potentiellt $100Mdr+ värde",
    "YouTube Subscriptions: 270M+ prenumeranter, stark tillväxtmotor"
  ],
  threats: [
    "Regulatorisk press och antitrust-utredningar (USA/EU)",
    "AI-disruption av sökmarknaden (Perplexity, OpenAI)",
    "Minskad annonsbudget vid lågkonjunktur",
    "Hård konkurrens inom molntjänster (Azure, AWS)"
  ],
  scenarios: [
    { label: "Bull Case", value: "$420", change: "+37%", type: "bull" },
    { label: "Base Case", value: "$340", change: "+11%", type: "base" },
    { label: "Bear Case", value: "$250", change: "-18%", type: "bear" },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 4,
    tillvaxtutsikter: 4,
    riskprofil: 4,
    esgMakro: 4,
    aiObservationer: 4
  }
};
