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
  summary: "SBB befinner sig i en existentiell kamp mot en massiv skuldbörda och fallande fastighetsvärden. Medan bolaget desperat genomför avyttringar för att möta miljardförfall i obligationsmarknaden, förblir riskprofilen extrem och förtroendet från kapitalmarknaden svårt sargat.",
  date: "2026-02-20",
  
  marketOverview: "Samhällsbyggnadsbolaget (SBB) blev under åren av nollränta en av Nordens mest aggressiva fastighetsaktörer, med en portfölj fokuserad på samhällsfastigheter och hyresreglerade bostäder. Affärsmodellen byggde på billig finansiering via obligationsmarknaden och snabb expansion genom förvärv. När räntecykeln vände tvärt under 2022-2023 blottades en sårbarhet som har lett till en av de största kriserna i modern svensk fastighetshistoria.\n\nMarknaden för samhällsfastigheter anses i grunden stabil med långa hyresavtal mot offentliga hyresgäster, men SBB:s finansiella struktur med hög belåning och komplexa korsägande har gjort att bolaget tvingats sälja sina mest värdefulla tillgångar (exempelvis utbildningsfastigheterna till Brookfield) för att överleva. Detta har skapat en krympande kärna där de kvarvarande tillgångarna ofta är mindre likvida eller kräver betydande investeringar.",
  
  investmentCase: "Investeringscaset i SBB idag är inte en tillväxtresa utan en ren distresed asset-situation. Det handlar om krishantering, tillgångsförsäljningar och försök att återvinna ett investment grade-betyg som för tillfället känns mycket avlägset.\n\nFör en spekulativ investerare vilar caset på att bolaget lyckas sälja tillräckligt mycket tillgångar för att amortera ned skulderna utan att helt radera ut eget kapital. Dock ser vi att räntekostnaderna fortfarande äter upp en för stor del av driftnettot, och risken för ytterligare utspädning genom nyemissioner eller konvertering av skuld till aktier är överhängande.",
  
  competitiveAdvantages: [
    "Samhällskritiska tillgångar: Hyresgäster med hög kreditvärdighet (stat/kommun)",
    "Långa avtal: Indexreglerade hyresavtal som ger ett visst inflationsskydd",
    "Stora portföljer: Möjlighet att paketera och sälja specifika segment",
    "Ny ledning: Fokus på 'städning' och renodling av balansräkningen"
  ],
  
  financialAnalysis: "SBB:s finansiella ställning är extremt ansträngd. Den justerade belåningsgraden (LTV) ligger på nivåer som tvingar fram försäljningar oavsett marknadsklimat. Räntetäckningsgraden är pressad och bolaget står inför betydande obligationsförfall under 2026-2027. Nedskrivningar av fastighetsvärden har raderat stora delar av det bokförda egna kapitalet under de senaste 24 månaderna.",
  
  growth: "Tillväxt är för närvarande helt lagt på is. Fokus ligger uteslutande på 'deleveraging' (skuldminskning) genom avyttringar och att förenkla den snåriga bolagsstrukturen bestående av dotterbolag och intressebolag.",
  
  valuation: "Traditionella nyckeltal som P/E är irrelevanta eftersom vinsten är negativ. Aktien handlas till en gigantisk rabatt mot substansvärdet (NAV), men denna rabatt speglar marknadens bedömning att de bokförda värdena inte är realistiska i en stressad försäljningssituation.",
  
  risks: [
    "Refinansieringsrisk: Enorma skulder som förfaller inom kort",
    "Likviditetsrisk: Beroende av att försäljningsprocesser går i lås",
    "Nedskrivningsrisk: Fastighetsmarknaden kan fortsätta nedåt",
    "Förtroenderisk: Svårighet att attrahera nytt kapital på rimliga villkor"
  ],
  
  esg: "SBB har historiskt profilerat sig inom social hållbarhet (byggande av skolor och äldreboenden), men de akuta finansiella problemen har gjort att ESG-arbetet hamnat i skuggan av den operationella överlevnaden.",
  
  aiObservations: "Varningslamporna lyser rött i nästan alla matematiska modeller för konkursrisk (t.ex. Altman Z-score). Sentimentet i sociala medier är mycket volatilt, med en hög grad av 'retail'-spekulation vilket skapar kraftiga rörelser som inte alltid är fundamentalt drivna.",
  
  conclusion: "SBB är inte en investering för den medvetne spararen, utan ett spekulativt objekt för de som tror på en lyckad rekonstruktion. Riskerna överväger fundamentalt sett möjligheterna. Vi ser ingen anledning att äga aktien och upprepar sälj.",
  
  employees: "~500",
  geography: "Sverige (82%), Norge (11%), Finland (5%), Danmark (2%)",
  managementOverview: "Leiv Synnes (VD) har sedan 2023 arbetat under extrem press för att rädda bolaget. Hans bakgrund från Akelius ger viss trovärdighet, men uppgiften är monumental.",
  ownershipStructure: "Ilija Batljan (grundare) innehar fortfarande en stor post, men hans inflytande har minskat kraftigt efter röstsvaga emissioner och påtryckningar från långivare.",
  
  scenarios: [
    { label: "Bull Case", value: "8 kr", change: "+130%", type: "bull", description: "Snabb räntesänkning och lyckad försäljning av hela utbildningsportföljen." },
    { label: "Base Case", value: "4 kr", change: "+15%", type: "base", description: "Långsam stabilisering men med fortsatt hög risk för utspädning." },
    { label: "Bear Case", value: "1 kr", change: "-70%", type: "bear", description: "Likviditetskris vid obligationsförfall leder till fullständig rekonstruktion." },
  ],
  
  scores: {
    affarsmodell: 1,
    strategiskMoat: 2,
    finansiellKvalitet: 1,
    vardering: 4,
    tillvaxtutsikter: 1,
    riskprofil: 1,
    esgMakro: 2,
    aiObservationer: 2
  },
  nextSteps: [
    {
      slug: "investor-ab",
      title: "Investor AB",
      label: "Trygghet & Kvalitet",
      reason: "Efter att ha analyserat riskerna i SBB, se hur en av Sveriges mest stabila ägarmaskiner navigerar marknaden med en helt annan finansiell disciplin."
    },
    {
      slug: "volvo",
      title: "AB Volvo",
      label: "Industriellt fokus",
      reason: "Växla från fastighetssektorns utmaningar till verkstadsindustrins globala dominans och de kassaflöden som driver svensk industri framåt."
    }
  ]
};
