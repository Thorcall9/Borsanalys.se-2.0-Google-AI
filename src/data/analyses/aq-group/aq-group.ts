import { AnalysisData } from "../../../types/analysis";

export const aqGroup: AnalysisData = {
  slug: "aq-group",
  title: "AQ Group AB",
  ticker: "AQ",
  deepDiveComponent: 'AQGroup',
  market: "NASDAQ STOCKHOLM LARGE CAP",
  sector: "Industriell tillverkning",
  recommendation: "BEVAKA",
  price: "~214 kr",
  pe: "29,09",
  yield: "0,84%",
  marketCap: "~19,7 Mdr kr",
  date: "2026-04-23",
  summary: "Exceptionellt kvalitetsbolag med 30 år obruten vinst, stark nettokassa och exponering mot datacenter, försvar och elektrifiering. Premievärderingen P/E ~29x ger dock begränsad uppsida vid nuvarande kurs.",
  
  businessModel: "AQ är en global industriell kontraktstillverkare med produktion i 17 länder och 7 800+ anställda. Affärsmodellen är kontraktsbaserad: kunderna beställer specifika komponenter och AQ tillverkar enligt spec i sina fabriker. Intäkterna är projektdrivna och volymberoende. Stabiliteten i intäktsflödet uppnås via bred kunddiversifiering, lång kundrelationer och en decentraliserad struktur av 50+ dotterbolag.",
  
  investmentCase: "Trettio år utan ett enda förlustår. Bolaget drar nytta av megatrender som AI-infrastrukturinvesteringar (datacenter), europeisk försvarsupprustning och industriell elektrifiering. Nettokassan på över 1 miljard SEK ger stark förvärvskapacitet.",
  
  financialAnalysis: "AQ:s finansiella profil är extremt stark. Trettio år utan ett enda förlustår. Soliditeten ligger på 68% och bolaget har en nettokassa på 1 095 Mkr (exkl. leasing). \n\nFinansiellt nyckeltal | 2024 | 2025 | Q1 2026 | 2026e\n---|---|---|---|---\nOmsättning (Mkr) | 8 554 | 9 071 | 2 358 | 9 650e\nEBIT (Mkr) | 840 | 840 | 225 | 932e\nEBT-marginal (%) | 9,6 | 9,2 | 9,4 | ≈9,5–10,0e\nEPS (kr) | 7,27 | 7,38 | 1,95 | 8,18e\n\nRörelsekassaflödet var lägre 2025 men bekräftar normalisering i Q1 2026.",
  
  valuation: "AQ handlas till P/E om 29x på löpande EPS – 42 % över bolagets eget 5-årssnitt. Premiet motiveras delvis av Large Cap-flytten, datacenter-omvärderingen och förvärvskapaciteten.\n\nMultipel | 2024 | 2025 | Nuv. | 2026e | 2027e\n---|---|---|---|---|---\nP/E | 19,25 | 26,72 | 29,1 | 26,2 | 23,6\nDirektavkastning (%) | 1,14 | 0,91 | 0,84 | 0,92e | 1,00e\n\nPEG-talet på ~3,6x överstiger tydligt den industriella normen. Värderingen kräver att allt går rätt.",
  
  growth: "Tre samverkande megatrender driver tillväxten: Datacenter och AI (LOI 200 transformatorer + 15 mEUR aktiv orderbok), Europeisk försvar (kablage/mekanik) och Industriell elektrifiering (frekvensomriktare/traktionssystem). Dessutom finns en M&A kapacitet på ~1 miljard SEK.",
  
  risks: [
    "Valutarisk EUR/CNY/USD komprimerar omsättning",
    "US-tullar drabbar USA/Mexiko-produktion (6 % av försäljning)",
    "Europeisk konjunkturavmattning",
    "mdexx-integration misslyckas / tar tid",
    "Kvalitetsreklamationer transformatorer"
  ],
  
  esg: "AQ rapporterar enligt CSRD och har tydliga mål. Affärsverksamheten bidrar starkt till elektrifiering. Styrelseuppgradering 2026 signalerar professionalisering inför ökad institutionell uppmärksamhet.",
  
  aiObservations: "Sentimentanalys indikerar en positiv förändring sedan Large Cap-flytten januari 2026. Optionsprogram nyttjas till 100%. P/E-expansion från ~17x till ~29x utan proportionerlig EPS-acceleration är den tydligaste varningssignalen.",
  
  conclusion: "AQ Group är ett exceptionellt kvalitetsbolag med stark affärsmodell, nettokassa >1 Mdr, och transparent ledning. P/E om 29x prisar in ett nästan optimistiskt scenario som base case. Aktien är en bevaka tills kursen ger bättre ingångspunkt eller EPS-tillväxten accelererar.",
  
  employees: "7 800+",
  geography: "17 länder, tyngdpunkt Europa (85%, varav Sverige 27%)",
  managementOverview: "Grundar-VD James Ahrgren med stark transparens och öppenhet. ~37% insiderägande (Grundarna + ledning). Optionsprogram direktkopplar belöning till aktiekurs.",
  ownershipStructure: "Per Olof Andersson och Claes Mellgren (eget innehav) + Nordea Fonder, Swedbank Robur.",
  
  strengths: [
    "30 år utan ett enda förlustår",
    "Nettokassa >1 Mdr ger förvärvskapacitet",
    "Decentraliserat dotterbolagsystem",
    "Produktion i 17 länder – geopolitisk/valutahedge",
    "Transformatorkompetens i rätt marknad",
    "Stark ledningskultur och insiderägande"
  ],
  weaknesses: [
    "Organisk tillväxt 2 % (2025) – under 10 %-målet",
    "Förvärvsvolym understiger 5 %-målet",
    "mdexx/Riedel fortfarande under AQ-marginalmålet",
    "Kvalitetsreklamationer transformatorer Q4 2025",
    "Kapacitetsunderskott kablage USA/Mexiko"
  ],
  opportunities: [
    "Datacenter: LOI 200 transformatorer + 15 mEUR orderbok",
    "Europeisk försvarsupprustning",
    "Industriell elektrifiering",
    "Förvärv till lägre priser i osäkert makroklimat",
    "Large Cap-uppflyttning ökar institutionellt kapital"
  ],
  threats: [
    "US-tullar drabbar USA/Mexiko-produktion",
    "Valutamotvind EUR och CNY",
    "Geopolitisk eskalation",
    "Konkurrens från asiatiska transformatortillverkare"
  ],
  
  scenarios: [
    { label: "Bull Case", value: "290 kr", change: "+35%", type: "bull", description: "Organisk tillväxt 10%+, mdexx når 8% EBT, datacenter-orderbok skalas till 50+ mEUR, förvärv genomförs" },
    { label: "Base Case", value: "240 kr", change: "+12%", type: "base", description: "Organisk tillväxt 5–7%, mdexx förbättras gradvis, datacenter-leverans juni 2026, 1–2 mindre förvärv" },
    { label: "Bear Case", value: "170 kr", change: "-21%", type: "bear", description: "Europeisk recession, mdexx integrationsproblem, datacenter-ordrar försenas, P/E-kompression" }
  ],
  
  scores: {
    affarsmodell: 4,
    strategiskMoat: 3,
    finansiellKvalitet: 4,
    vardering: 3,
    tillvaxtutsikter: 4,
    riskprofil: 4,
    esgMakro: 4, // Keeping this for the generic analysis interface 
    aiObservationer: 4
  },
  
  aiDrivenData: {
    isAIDriven: true,
    slug: "aq-group",
    name: "AQ Group AB",
    ticker: "AQ",
    isin: "SE0000772956",
    date: "2026-04-23",
    author: "Carl Fredrik Thor",
    scores: {
      affarsmodell: 4,
      strategiskMoat: 3,
      finansiellKvalitet: 4,
      vardering: 3,
      tillvaxtutsikter: 4,
      riskprofil: 4,
      esgMakro: 4,
      aiObservationer: 4
    },
    totaltPoang: 30,
    maxPoang: 40,
    rating: 0.75,
    overview: {
      borskurs: 214.0,
      borsvarde: "~19,7 mdkr",
      bransch: "Industriell tillverkning",
      geografi: "17 länder, tyngdpunkt Europa",
      affarside: "Tillverkar kundanpassade komponenter och system till krävande industrikunder.",
      affarsmodell: "Kontraktsbaserad volymproduktion; intäkter per levererat projekt till industrikund.",
      ledning: "Grundar-VD James Ahrgren; ~37% insider-kontroll; optionsprogram 2024/2027.",
      agarstruktur: "Per Olof Andersson och Claes Mellgren (eget innehav) + Nordea Fonder, Swedbank Robur."
    },
    strategiskMoat: {
      swot: {
        styrkor: [
          "30 år utan ett enda förlustår",
          "Nettokassa >1 Mdr ger förvärvskapacitet",
          "Decentraliserat dotterbolagsystem",
          "Produktion i 17 länder",
          "Transformatorkompetens i rätt marknad",
          "Stark ledningskultur"
        ],
        svagheter: [
          "Organisk tillväxt 2 % (2025)",
          "Förvärvsvolym understiger 5 %-målet",
          "mdexx/Riedel under marginalmål",
          "Kvalitetsreklamationer transformatorer Q4 2025",
          "Kapacitetsunderskott kablage USA/Mexiko"
        ],
        möjligheter: [
          "Datacenter: LOI 200 transformatorer + 15 mEUR orderbok",
          "Europeisk försvarsupprustning",
          "Industriell elektrifiering",
          "Förvärv till lägre priser i osäkert makroklimat"
        ],
        hot: [
          "US-tullar drabbar USA/Mexiko",
          "Valutamotvind EUR och CNY",
          "Geopolitisk eskalation",
          "Global minimiskatt (Pelare II)"
        ]
      },
      moat: ["Kostnadseffektivitet via lågkostnadsproduktion", "Teknisk kompetens i induktiva komponenter", "Leveranskvalitet och kundlojalitet"]
    },
    finansiellAnalys: {
      resultatrakning: {
        omsattningstillvaxt: "CAGR ~7% senaste 5 åren",
        vinsttillvaxt: "CAGR ~9% 2021–2025",
        rorelsemarginal: "9,0–10,0% senaste 5 åren"
      },
      nyckeltal: {
        roe: "14,9%",
        roce: "13,0%",
        utdelning: "1,80 kr (2025), 24% av EPS"
      },
      vardering: {
        pe: "29.09x",
        evEbit: "22.45x",
        direktavkastning: "0.84%"
      }
    },
    sammanfattning: {
      beslut: "Bevaka",
      motivering: "AQ är ett exceptionellt kvalitetsbolag med trettio år obruten vinst och rätt positionering mot megatrender. P/E om 29x ger dock begränsad säkerhetsmarginal.",
      malpris: "225–260 kr (base–bull 12 mån)"
    }
  }
};
