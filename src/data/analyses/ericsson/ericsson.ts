import { AnalysisData } from "../../../types/analysis.js";

export const ericsson: AnalysisData = {
  slug: "ericsson",
  title: "Ericsson AB",
  listTitle: "Ericsson",
  ticker: "ERIC-B.ST",
  market: "Large Cap Stockholm",
  sector: "Teknik / Telekom",
  recommendation: "BEVAKA",
  price: "63.40 kr",
  pe: "14.2x",
  yield: "4.73%",
  marketCap: "212 Bkr",
  summary: "Ericsson är en världsledande leverantör av utrustning och tjänster för mobil kommunikation. Bolaget står i centrum för den globala 5G-utrullningen och genomgår en strategisk transformation mot mjukvarubaserade nätverk (Open RAN) och företagssegmentet genom förvärvet av Vonage.",
  date: "2026-04-10",
  investmentCase: "Det stora 'caset' i Ericsson just nu kretsar kring det historiska AT&T-avtalet värt 14 miljarder USD, vilket validerar bolagets ledarskap inom Open RAN. Samtidigt pressas marginalerna av en avvaktande marknad i Nordamerika och Indien. Värderingen är historiskt låg, men kassaflödet och skuldsättningen kräver noggrann bevakning under 2026.",
  marketOverview: "Telekommarknaden är i en cyklisk svacka efter de initiala 5G-investeringarna. Operatörerna fokuserar nu på kostnadsbesparingar och effektivisering, vilket drabbar hårdvaruförsäljningen. Open RAN förväntas dock driva nästa våg av arkitekturskiften.",
  growth: "Drivs av expansionen inom Open RAN, ökade marknadsandelar i USA (tack vare AT&T) och potentialen i Enterprise-segmentet via Vonage-plattformen för nätverks-API:er.",
  financialAnalysis: "Nettoomsättningen har varit under press under 2025/2026. Den justerade rörelsemarginalen påverkas av mixförändringar och höga integrationskostnader. Utdelningen på 3.00 SEK föreslås bibehållas, vilket ger en hög direktavkastning, men kräver en stabilisering av kassaflödet.",
  competitiveAdvantages: [
    "Ledande position inom 5G-teknologi med en massiv patentportfölj.",
    "Strategiskt partnerskap med AT&T som skapar ett långsiktigt fundament i USA.",
    "Oligopolsituation: Endast ett fåtal globala aktörer (Nokia, Huawei) kan leverera i denna skala.",
    "Växande portfölj inom nätverksmjukvara och API:er genom Vonage."
  ],
  risks: [
    "Geopolitiska spänningar som påverkar leveranskedjor och marknadstillträde.",
    "Hög skuldsättning efter Vonage-förvärvet och pressat kassaflöde.",
    "Intensiv konkurrens från framförallt Nokia och nya Open RAN-utmanare.",
    "Historik av regulatoriska problem och efterlevnadsrisker."
  ],
  valuation: "Vid nuvarande kursnivåer handlas Ericsson till P/E 14x, vilket är i den lägre änden av historiska intervall. Direktavkastningen på nära 5% fungerar som en krockkudde, men multiplarna väntas vara dämpade tills marknaden ser en tydlig vändning i nätverksinvesteringarna.",
  conclusion: "Ericsson är ett bolag med hög teknisk kvalitet men signifikant finansiell och operativ risk. AT&T-affären är en game-changer, men kortsiktig motvind dominerar fortfarande. Vi väljer att bevaka aktien i väntan på bättre kassaflödesgenerering.",
  esg: "Ericsson arbetar aktivt med att minska energiförbrukningen i mobilnäten, vilket är deras största miljöavtryck och en viktig säljaspekt för operatörer.",
  aiObservations: "Bolaget integrerar AI för att optimera nätverksprestanda och automatiserad felavhjälpning, vilket ses som en kritisk differentieringsfaktor framåt.",
  employees: "~99 000",
  geography: "Nordamerika (35%), Europa & Latinamerika (25%), Sydostasien & Indien (20%), Övriga (20%)",
  managementOverview: "Börje Ekholm har lett bolaget genom en svår period av uppstädning och strategiskt skifte. Fokus ligger nu på exekvering av Enterprise-strategin.",
  ownershipStructure: "Investor AB och Industrivärden är de dominerande ägarna, vilket ger en stabil och långsiktig ägarbas.",
  scenarios: [
    { label: "Bull Case", value: "95 kr", change: "+50%", type: "bull", description: "Snabb återhämtning i 5G-investeringar och framgångsrik monetarisering av Vonage-API:er." },
    { label: "Base Case", value: "72 kr", change: "+14%", type: "base", description: "Stabilisering av marginalerna och gradvis utrullning av Open RAN-projekt." },
    { label: "Bear Case", value: "45 kr", change: "-29%", type: "bear", description: "Långvarig recession i telekombranschen och fortsatta nedskrivningar av förvärv." },
  ],
  aiDrivenData: {
    isAIDriven: true,
    slug: "ericsson",
    name: "Ericsson AB",
    ticker: "ERIC-B.ST",
    totaltPoang: 6.0,
    maxPoang: 10,
    scores: {
      affarsmodell: 3,
      strategiskMoat: 4,
      finansiellKvalitet: 2,
      vardering: 4,
      tillvaxtutsikter: 3,
      riskprofil: 2,
      esgMakro: 3,
      aiObservationer: 3
    },
    overview: {
      borskurs: "63.40 kr",
      borsvarde: "212 Bkr",
      bransch: "Telekom",
      geografi: "Global",
      affarsmodell: "Försäljning av telekomutrustning och tjänster.",
      ledning: "Börje Ekholm"
    }
  },
  scores: {
    affarsmodell: 3,
    strategiskMoat: 4,
    finansiellKvalitet: 2,
    vardering: 4,
    tillvaxtutsikter: 3,
    riskprofil: 2,
    esgMakro: 3,
    aiObservationer: 3
  },
  nextSteps: [
    {
      slug: "volvo",
      title: "AB Volvo",
      label: "Industriellt sammanhang",
      reason: "Se hur Ericssons 5G-lösningar blir en del av det framtida ekosystemet för autonoma fordon och industriell automation hos Volvo."
    },
    {
      slug: "investor-ab",
      title: "Investor AB",
      label: "Strategisk ägare",
      reason: "Förstå hur Wallenbergsfärens flaggskepp navigerar den långsiktiga produktutvecklingen och ägarstyrningen i Ericsson."
    }
  ],
  deepDiveComponent: "Ericsson"
};
