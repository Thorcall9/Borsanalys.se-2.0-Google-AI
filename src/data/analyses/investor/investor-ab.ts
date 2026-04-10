import { AnalysisData } from "../../../types/analysis";

export const investorAb: AnalysisData = {
  slug: "investor-ab",
  title: "Investor AB",
  ticker: "INVE-B.ST",
  market: "Large Cap Stockholm",
  sector: "Investmentbolag",
  recommendation: "KÖP",
  price: "245,20 kr",
  pe: "14.00",
  yield: "1,8%",
  marketCap: "750 Bkr",
  discount: "14,2%",
  summary: "Affärsidén är enkel men kraftfull: **bygga starka och hållbara företag för att skapa värde för aktieägare och samhälle**. Till skillnad från en vanlig aktiefond är Investor en aktiv ägare – man sitter i styrelser, utser VD och driver strategiska initiativ. Det gör att Investor kan påverka sina innehav på ett sätt som en passiv fondförvaltare aldrig kan.",
  businessModel: "Affärsidén är enkel men kraftfull: bygga starka och hållbara företag för att skapa värde för aktieägare och samhälle. Till skillnad från en vanlig aktiefond är Investor en aktiv ägare – man sitter i styrelser, utser VD och driver strategiska initiativ. Det gör att Investor kan påverka sina innehav på ett sätt som en passiv fondförvaltare aldrig kan.",
  date: "2026-03-26",
  investmentCase: "Investor erbjuder en unik exponering mot gräddan av svenskt näringsliv till en rabatt mot substansvärdet. Genom att äga Investor får man del av deras aktiva ägande i bolag som Atlas Copco, ABB och SEB, samt den onoterade portföljen Patricia Industries som historiskt levererat mycket stark avkastning.",
  marketOverview: "Investmentbolagssektorn i Sverige är välutvecklad och Investor är den obestridda ledaren. Marknaden präglas av fokus på substansvärde och substansrabatt. Investor gynnas av sin storlek och sitt goda rykte som ger dem tillgång till attraktiva investeringsmöjligheter.",
  growth: "Tillväxten i Investor drivs främst av värdetillväxten i portföljbolagen. Patricia Industries (onoterat) är en viktig tillväxtmotor där kassaflöden återinvesteras i nya och befintliga plattformsbolag. Dessutom bidrar utdelningar från de noterade kärninnehaven till kapital för nya investeringar.",
  financialAnalysis: "Investor har en mycket stark balansräkning med låg skuldsättning (leverage) väl inom deras målintervall. Förvaltningskostnaden är extremt låg (ca 0,09%), vilket är betydligt lägre än nästan alla aktiefonder. Detta skapar en långsiktig ränta-på-ränta effekt för aktieägarna.",
  competitiveAdvantages: [
    "Långsiktigt och aktivt ägande med 'evig' tidshorisont",
    "Unikt nätverk och tillgång till talang och affärsmöjligheter",
    "Extremt låg förvaltningskostnad",
    "Stark balansräkning som möjliggör investeringar i sämre tider"
  ],
  risks: [
    "Beroende av den globala industrikonjunkturen",
    "Koncentrationsrisk mot ett fåtal stora innehav (t.eg. Atlas Copco)",
    "Förändringar i substansrabatten kan påverka aktiekursen negativt"
  ],
  valuation: "Investor handlas historiskt till en substansrabatt. Vid nuvarande nivåer anser vi att rabatten är attraktiv givet kvaliteten på innehaven och den historiska överavkastningen mot index. Vi ser Investor som en basplacering i varje långsiktig portfölj.",
  conclusion: "Investor AB fortsätter att leverera värde genom sin beprövade modell för aktivt ägande. Med en välbalanserad portfölj och en effektiv organisation är bolaget väl positionerat för fortsatt substansvärdestillväxt. Vi upprepar vår köprekommendation.",
  esg: "Investor fokuserar på ansvarsfullt ägande och hållbarhet i portföljbolagen. De ställer höga krav på sina innehav gällande klimatpåverkan och bolagsstyrning.",
  aiObservations: "AI-analys av portföljbolagens utveckling visar på en stabil trend. Substansrabatten ligger nära historiska snitt, vilket ger en trygg ingångspunkt.",
  employees: "~100 (Investor AB), >300 000 i portföljbolagen",
  geography: "Huvudsakligen Norden och Europa, men global exponering genom portföljbolagens verksamhet.",
  managementOverview: "Johan Forssell — VD: Har lett bolaget sedan 2015 med stort fokus på Patricia Industries. Jacob Wallenberg — Ordförande: Representerar den femte generationen av ägarfamiljen.",
  ownershipStructure: "Wallenbergstiftelserna (via FAM och Knut & Alice Wallenbergs Stiftelse) är största ägare med röstmajoritet, vilket garanterar långsiktighet.",
  strengths: [
    "110 år av aktiv ägarkultur och bevisad track record",
    "Extremt låga förvaltningskostnader (0,07% av NAV)",
    "Diversifierad portfölj av världsledande bolag",
    "AA- kreditbetyg (S&P) och Aa3 (Moody's)",
    "Stark balansräkning: skuldsättningsgrad 2,1%"
  ],
  weaknesses: [
    "Patricia Industries tyngd av valutamotvind (USD/EUR vs SEK)",
    "Atlas Antibodies under strukturell press",
    "Koncentration till svenska/nordiska företag",
    "Substansvärdet påverkas av börspsvängningar"
  ],
  opportunities: [
    "Patricia Industries – operationell hävstång när USD återhämtar sig",
    "EQT-plattformen ger tillgång till global private equity-tillväxt",
    "AI-integration hos portföljbolagen (Permobil, Mölnlycke m.fl.)",
    "Förvärvsplatform för nya plattformsbolag"
  ],
  threats: [
    "Ökad tullbelastning på globala portföljbolag",
    "Fortsatt kronförstärkning dämpar Patricia Industries-vinster",
    "Geopolitisk osäkerhet och svag global efterfrågan",
    "Ökande konkurrens om private equity-deals"
  ],
  scenarios: [
    { label: "Bull Case", value: "320 kr", change: "+30%", type: "bull" },
    { label: "Base Case", value: "275 kr", change: "+12%", type: "base" },
    { label: "Bear Case", value: "210 kr", change: "-14%", type: "bear" },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 4,
    finansiellKvalitet: 4,
    vardering: 4,
    tillvaxtutsikter: 5,
    riskprofil: 2,
    esgMakro: 3,
    aiObservationer: 5
  },
  deepDiveComponent: "Investor"
};
