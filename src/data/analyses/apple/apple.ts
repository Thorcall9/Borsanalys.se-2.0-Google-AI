import { AnalysisData } from "../../../types/analysis";

export const apple: AnalysisData = {
  slug: "apple",
  title: "Apple Inc.",
  ticker: "AAPL",
  market: "NASDAQ",
  sector: "Konsumentelektronik",
  recommendation: "AVVAKTA",
  price: "$228,10",
  pe: "31.00",
  yield: "0,45%",
  marketCap: "$3.5T",
  summary: "Apple är världens ledande varumärke inom konsumentelektronik. Med ett ekosystem av hårdvara, mjukvara och tjänster har bolaget skapat en unik kundlojalitet. Fokus ligger nu på AI-integration (Apple Intelligence) och tillväxt inom tjänstesektorn.",
  date: "2026-03-10",
  investmentCase: "Apples styrka ligger i deras enorma installerade bas av enheter och förmågan att monetärisera dessa genom tjänster som App Store, iCloud och Apple Music. Apple Intelligence förväntas driva en ny uppgraderingscykel för iPhone, vilket är bolagets viktigaste intäktskälla.",
  marketOverview: "Smartphonemarknaden är mogen, men premiumsegmentet där Apple dominerar fortsätter att visa styrka. Konkurrensen från kinesiska aktörer ökar, men Apples ekosystem fungerar som en kraftfull vallgrav.",
  growth: "Tillväxten drivs främst av tjänstesektorn som har högre marginaler än hårdvaran. Framtida tillväxt förväntas även från nya produktkategorier som Vision Pro och expansion inom hälsovårdstjänster.",
  financialAnalysis: "Apple har en av världens starkaste balansräkningar och genererar ett enormt fritt kassaflöde. Bolaget är känt för sina omfattande aktieåterköp och stabila utdelningstillväxt.",
  competitiveAdvantages: [
    "Världens starkaste varumärke",
    "Sömlöst ekosystem (iOS, macOS, watchOS)",
    "Hög kundlojalitet och 'switching costs'",
    "Kontroll över både hårdvara och mjukvara"
  ],
  risks: [
    "Beroende av iPhone-försäljning",
    "Regulatoriska utmaningar kring App Store (antitrust)",
    "Geopolitiska risker i Kina (tillverkning och marknad)",
    "Långsammare innovationstakt jämfört med konkurrenter inom AI"
  ],
  valuation: "Värderingen är historiskt hög med ett P/E-tal över 30. Marknaden prisar in en framgångsrik AI-cykel, men vi ser begränsad uppsida på kort sikt givet den mogna marknaden.",
  conclusion: "Apple är ett fantastiskt bolag, men vid nuvarande värdering ser vi risk/reward som balanserad. Vi rekommenderar avvakta i väntan på tydligare bevis för AI-drivna försäljningsökningar.",
  esg: "Apple leder branschen inom hållbarhet med mål om koldioxidneutralitet för hela värdekedjan till 2030. Fokus på återvunna material och etisk tillverkning.",
  aiObservations: "AI-analys av patentportföljen visar på en kraftig ökning av AI-relaterade innovationer. Sentimentet är försiktigt positivt inför lanseringen av Apple Intelligence.",
  employees: "~161 000",
  geography: "Global verksamhet med USA, Europa och Kina som viktigaste marknader. Tillverkning huvudsakligen i Asien.",
  managementOverview: "Tim Cook — VD: Har framgångsrikt lett bolaget sedan 2011 med fokus på operativ excellens och tjänstetillväxt. Luca Maestri — CFO.",
  ownershipStructure: "Huvudsakligen institutionellt ägande (Vanguard, BlackRock, Berkshire Hathaway) med en stabil ägarbas.",
  strengths: ["Varumärke", "Ekosystem", "Kassaflöde"],
  weaknesses: ["iPhone-beroende", "Regulatorisk press"],
  opportunities: ["Apple Intelligence", "Tjänstetillväxt"],
  threats: ["Kina-konkurrens", "Antitrust-lagstiftning"],
  scenarios: [
    { label: "Bull Case", value: "$280", change: "+23%", type: "bull" },
    { label: "Base Case", value: "$235", change: "+3%", type: "base" },
    { label: "Bear Case", value: "$180", change: "-21%", type: "bear" },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 3,
    tillvaxtutsikter: 2,
    riskprofil: 5,
    esgMakro: 4,
    aiObservationer: 4
  }
};
