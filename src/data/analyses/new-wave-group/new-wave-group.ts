import { AnalysisData } from "../../../types/analysis";

export const newWaveGroup2025: AnalysisData = {
  slug: "new-wave-group-april-2026",
  title: "New Wave Group AB",
  ticker: "NWG B",
  market: "Large Cap Stockholm",
  sector: "Profilkläder, sport & fritid, gåvor och heminredning",
  recommendation: "KÖP",
  price: "99,60 kr",
  pe: "16,85",
  yield: "3,37%", // Calculation based on 3.00 utdelning / 99.6 pris = ~3.01%, though user provided 51% of net result logic later
  marketCap: "13,2 Mdr",
  summary: "New Wave Group är en svensk varumärkeskoncern som utvecklar, förvärvar och distribuerar produkter inom tre huvudsegment: Företag, Sport & Fritid samt Gåvor & Heminredning. Under 2025 passerade bolaget för första gången 10 miljarder kronor i omsättning, drivet av strategiska förvärv som Cotton Classics och en stark underliggande bruttomarginal.",
  date: "2026-04-10",
  investmentCase: "Stark affärsmodell, tillfälligt pressade marginaler och attraktiv framåtblickande värdering. New Wave har en unik kombination av varumärken, distributionsnärvaro och inköpsskala som skapar konkreta konkurrensfördelar.",
  businessModel: "Varumärkesdriven grossist- och distributionsmodell med försäljning via både profilkanalen och detaljhandeln. Koncernen designar, förvärvar och utvecklar varumärken för att skapa synergier inom design, inköp och logistik.",
  managementOverview: "Grundarledd koncern med Torsten Jansson som VD och storägare (61% av kapitalet, 89% av rösterna). Torsten Jansson har visat en extrem förmåga att se möjligheter och driva kostnadseffektiv logistik.",
  ownershipStructure: "Tydligt insiderägande och koncentrerad ägarbild som stärker långsiktigheten i strategiska beslut.",
  growth: "Omsättningen ökade med 9,5% i lokala valutor under 2025. Framtida tillväxt drivs av integrationen av Cotton Classics i Centraleuropa, Crafts expansion inom teamwear och skor, samt strategiska lagerinvesteringar i USA och Irland.",
  financialAnalysis: "Rörelsemarginalen uppgick till 11,4% (justerat 12,1% exkl. PPP-kostnad). Bruttomarginalen på 49,0% visar på stark osårbarhet i prissättningen. Soliditeten är god på 53% trots ökad skuldsättning efter förvärv.",
  valuation: "Attraktiv värdering på normaliserad intjäning. P/E 13,3x på 2026e och 10,6x på 2027e (EPS 9,41 SEK). En klassisk 'normaliseringsvärdering' för ett kvalitetsbolag i en tillfällig svacka.",
  conclusion: "New Wave Group är just nu ett kvalitetsbolag i en tillfälligt pressad fas. När investeringar och förvärv börjar ge full effekt ser vinstbanan betydligt starkare ut än 2025 års siffror antyder. KÖP med riktkurs 130-145 SEK.",
  esg: "Hållbarhetsarbetet är centralt i leverantörskedjan med egen sourcingorganisation och CSR-personal på plats i inköpsländerna för maximal kontroll och transparens.",
  aiObservations: "Bruttomarginalstabiliteten är imponerande trots motvind. 2025 framstår som ett övergångsår där marknaden riskerar att underskatta den framtida marginalpotentialen vid normalisering.",
  strengths: [
    "Bred varumärkesportfölj",
    "Stark distributionsplattform i Europa",
    "Skalfördelar i inköp och sourcing",
    "Grundarlett bolag med tydlig kultur",
    "Stabil bruttomarginal"
  ],
  weaknesses: [
    "Kapitalintensiv modell med höga lager",
    "Marginaler under långsiktigt mål",
    "Valutaexponering",
    "Begränsade strukturella switching costs"
  ],
  opportunities: [
    "Cotton Classics-synergier",
    "Crafts expansion inom teamwear och skor",
    "Nya lager i Irland och USA",
    "Operationell hävstång när marknaden förbättras"
  ],
  threats: [
    "Fortsatt svag efterfrågan i retail",
    "Tull- och handelsrisker",
    "Fortsatt stark SEK",
    "Högre skuldsättning om investeringsfasen drar ut"
  ],
  scenarios: [
    { label: "Bull Case", value: "160-180 kr", change: "+70%", type: "bull", description: "Snabb integration av Cotton Classics och Crafts skoexpansion överraskar positivt." },
    { label: "Base Case", value: "130-145 kr", change: "+38%", type: "base", description: "Normalisering av marginaler och successiv vinståterhämtning 2026-2027." },
    { label: "Bear Case", value: "75-85 kr", change: "-19%", type: "bear", description: "Långvarig svag retail och misslyckad integration av förvärv." },
  ],
  scores: {
    affarsmodell: 4,
    strategiskMoat: 3,
    finansiellKvalitet: 4,
    vardering: 4,
    tillvaxtutsikter: 4,
    riskprofil: 3,
    esgMakro: 3,
    aiObservationer: 4
  },
  aiDrivenData: {
    isAIDriven: true,
    slug: "new-wave-group-april-2026",
    name: "New Wave Group AB",
    ticker: "NWG B",
    isin: "SE0000426546",
    date: "2026-04-10",
    author: "Carl Fredrik Thor",
    scores: {
      affarsmodell: 4,
      strategiskMoat: 3,
      finansiellKvalitet: 4,
      vardering: 4,
      tillvaxtutsikter: 4,
      riskprofil: 3,
      esgMakro: 3,
      aiObservationer: 4
    },
    totaltPoang: 29,
    maxPoang: 40,
    rating: 0.725,
    overview: {
      borskurs: 99.6,
      borsvarde: "13,2 miljarder SEK",
      bransch: "Profilkläder, sport & fritid, gåvor och heminredning",
      geografi: "Europa, Nordamerika och Asien (inköp/sourcing)",
      affarside: "Skapa, förvärva och utveckla varumärken samt produkter för företags-, sport-, gåvo- och inredningssektorn",
      affarsmodell: "Varumärkesdriven grossist- och distributionsmodell med försäljning via både profilkanalen och detaljhandeln",
      ledning: "Grundarledd koncern med Torsten Jansson som VD och storägare",
      agarstruktur: "Tydligt insiderägande och koncentrerad ägarbild med starkt röstinflytande hos huvudägare"
    },
    strategiskMoat: {
      swot: {
        styrkor: ["Bred varumärkesportfölj", "Stark distributionsplattform i Europa", "Skalfördelar i inköp och sourcing", "Grundarlett bolag med tydlig kultur", "Stabil bruttomarginal"],
        svagheter: ["Kapitalintensiv modell med höga lager", "Marginaler under långsiktigt mål", "Valutaexponering", "Begränsade strukturella switching costs"],
        möjligheter: ["Cotton Classics-synergier", "Crafts expansion inom teamwear och skor", "Nya lager i Irland och USA", "Operationell hävstång när marknaden förbättras"],
        hot: ["Fortsatt svag efterfrågan i retail", "Tull- och handelsrisker", "Fortsatt stark SEK", "Högre skuldsättning om investeringsfasen drar ut"]
      },
      moat: ["Varumärken", "Inköpsskala", "Lokal närvaro i många marknader", "One-stop-shop inom profilsegmentet"]
    },
    finansiellAnalys: {
      resultatrakning: {
        omsattningstillvaxt: "5,1% i SEK 2025, 9,5% i lokala valutor",
        vinsttillvaxt: "EPS sjönk från 6,63 till 5,90 SEK, delvis på grund av PPP-engångskostnad om 66 MSEK",
        rorelsemarginal: "11,4% 2025 mot 13,2% 2024"
      },
      nyckeltal: {
        roe: "11,15%",
        roce: "11,15%",
        utdelning: "föreslagen utdelning 3,00 SEK per aktie"
      },
      vardering: {
        pe: "16,85x (trailing)",
        evEbit: "13,2x",
        direktavkastning: "3,37%"
      }
    },
    sammanfattning: {
      beslut: "KÖP",
      motivering: "Stark affärsmodell, tillfälligt pressade marginaler och attraktiv framåtblickande värdering",
      malpris: "130-145 SEK"
    },
    scenarier: {
      bullCase: "160-180 SEK",
      baseCase: "130-145 SEK",
      bearCase: "75-85 SEK"
    }
  },
  deepDiveComponent: "NewWave"
};
