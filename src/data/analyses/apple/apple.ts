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
  relatedAnalysis: {
    slug: "nvidia-fy2026",
    title: "Hårdvaruledare",
    label: "Relaterad analys",
    text: "Apple dominerar konsumentledet, men vem driver beräkningskraften bakom kulisserna? Läs analysen av Nvidia.",
    cta: "Läs analys av Nvidia",
    accentColor: "#76B900"
  },
  marketCap: "$3.5T",
  summary: "Apple står inför en brytpunkt där integrationen av 'Apple Intelligence' förväntas driva nästa stora uppgraderingscykel. Medan ekosystemet är starkare än någonsin, sätter en historiskt hög värdering och regulatorisk press i EU och USA ribban högt för framtida överavkastning.",
  date: "2026-03-10",
  
  marketOverview: "Apple är inte bara ett hårdvarubolag; det är världens mest framgångsrika ekosystem av mjukvara, tjänster och lojala användare. Med över 2,2 miljarder aktiva enheter globalt har bolaget skapat en digital vallgrav som är närmast ogenomtränglig. Marknaden för smartphones är mogen, men Apples förmåga att successivt flytta upp sina kunder i premiumsegmentet har gjort att de kan bibehålla en exceptionell lönsamhet trots mättnad.\n\nFokus skiftar nu mot AI-integration genom Apple Intelligence, vilket förväntas bli den primära drivkraften för att konvertera den enorma installerade basen av iPhone 12-15 användare till de senaste modellerna. Samtidigt växer tjänstesektorn (App Store, iCloud, Services) dubbelt så snabbt som hårdvaran och har marginaler som närmar sig 75%, vilket förändrar Apples fundamentala vinstprofil.",
  
  investmentCase: "Kärnan i investment caset för Apple är den 'svänghjulseffekt' som uppstår när användare dras djupare in i ekosystemet. Varje ny tjänst (Apple Vision Pro, Apple Watch, AirPods) ökar byteskostnaderna. Apple Intelligence är inte en separat produkt, utan ett lager av nytta som gör ekosystemet än mer klibbigt.\n\nVi ser tre huvudsakliga katalysatorer: 1. Accelererad iPhone-försäljning drivet av AI-funktionalitet som kräver senaste chippen. 2. Fortsatt expansion av tjänstmarginalerna när annonsintäkter och prenumerationer växer. 3. Den enorma kassaflödesmaskinen som tillåter aggressiva aktieåterköp, vilket historiskt har adderat 2-3% till EPS-tillväxten årligen.",
  
  competitiveAdvantages: [
    "Världens starkaste varumärke: Skapar exceptionell prissättningskraft",
    "Sömlöst ekosystem: 'Walled garden' som ger extremt låg churn",
    "Vertikal integration: Egendesignade chip (M- och A-serien) ger prestandafördelar",
    "Installerard bas: 2,2 miljarder enheter som genererar återkommande intäkter",
    "Apple Intelligence: En privat och djupt integrerad AI-upplevelse"
  ],
  
  financialAnalysis: "Apple genererade ett kassaflöde från den löpande verksamheten på över 110 miljarder dollar under senaste året. Bruttomarginalerna har expanderat från 38% till nära 46% under de senaste fem åren, drivet av tjänstemixen. Balansräkningen är 'net-cash neutral', vilket innebär att bolaget fortsätter att återföra nästan allt fritt kassaflöde till aktieägarna via utdelningar och återköp.",
  
  growth: "Långsiktig tillväxt vilar på förmågan att monetärisera den befintliga basen ytterligare. Vi ser stor potential inom hälsovårdstjänster och den spatiala datormarknaden (Vision Pro), även om de senare ännu är i ett tidigt skede. AI-drivna annonsintäkter i App Store är en annan underskattad tillväxtmotor.",
  
  valuation: "Vid ett P/E-tal på 31x handlas Apple till en betydande premie mot sitt historiska snitt på 22-24x. Marknaden prisar in en felfri exekvering av AI-strategin. Även om kvaliteten i bolaget motiverar en premie, ser vi risk för multipelkontraktion om iPhone-volymerna inte accelererar som förväntat under 2026.",
  
  risks: [
    "Beroende av iPhone: Står fortfarande för över hälften av intäkterna",
    "Regulatoriskt motstånd: Antitrust-lagar i EU (DMA) och USA hotar App Store-marginalerna",
    "Kina-exponering: Både som tillverkningsnav och kritisk källmarknad",
    "AI-konkurrens: Google och Microsoft har ett försprång inom molnbaserad AI"
  ],
  
  esg: "Apple leder branschen med sitt 'Apple 2030' mål – koldioxidneutralitet för hela värdekedjan. De använder nu 100% återvunnen kobolt i batterier och har eliminerat plast i förpackningar.",
  
  aiObservations: "AI-analys av användardata visar ett högt sug efter Apple Intelligence, men också en viss väntan hos konsumenterna. Sentimentet på sociala medier är splittrat mellan entusiasm för nya funktioner och frustration över begränsad bakåtkompatibilitet.",
  
  conclusion: "Apple är ett av världens absolut bästa bolag, men vid nuvarande värdering är risk/reward inte tillräckligt attraktiv för ett nytt köp. Vi rekommenderar avvakta och väntar på en bättre ingångsnivå eller tydligare bevis på AI-drivna volymökningar.",
  
  employees: "~161 000",
  geography: "Amerika (42%), Europa (25%), Kina (18%), Japan (7%), Övriga Asien (8%)",
  managementOverview: "Tim Cook (VD) har lett en fenomenal expansion av tjänsteintäkter. Luca Maestri (CFO) orkestrerar bolagets marknadsledande kapitalallokering.",
  ownershipStructure: "Institutionellt dominerat med Berkshire Hathaway (Warren Buffett) som största enskilda aktieägare, vilket signalerar långsiktig stabilitet.",
  
  scenarios: [
    { label: "Bull Case", value: "$280", change: "+23%", type: "bull", description: "AI-cykeln blir den största någonsin, tjänstemarginaler överraskar på uppsidan." },
    { label: "Base Case", value: "$235", change: "+3%", type: "base", description: "Stabil tillväxt i ekosystemet, måttlig acceleration av iPhone-försäljningen." },
    { label: "Bear Case", value: "$180", change: "-21%", type: "bear", description: "Regulatoriska bakslag minskar App Store intäkter, svag efterfrågan i Kina." },
  ],
  
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 2,
    tillvaxtutsikter: 3,
    riskprofil: 4,
    esgMakro: 4,
    aiObservationer: 4
  },
  nextSteps: [
    {
      slug: "alphabet",
      title: "Alphabet",
      label: "AI-kriget",
      reason: "Medan Apple fokuserar på on-device AI, se hur sökjätten Alphabet bygger den infrastrukturella ryggraden för nästa generations intelligenta tjänster."
    },
    {
      slug: "nvidia-fy2026",
      title: "NVIDIA",
      label: "Hårdvaruledaren",
      reason: "Förstå bolaget som levererar de chip som gör Apples och Alphabets visioner möjliga – en djupdykning i AI-revolutionens motorrum."
    }
  ]
};
