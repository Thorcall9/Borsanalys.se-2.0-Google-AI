import { AnalysisData } from "../../../types/analysis";

export const nibe2026: AnalysisData = {
  slug: "nibe-industrier-2026",
  title: "NIBE Industrier AB",
  ticker: "NIBE B",
  deepDiveComponent: "Nibe",
  market: "NASDAQ STOCKHOLM LARGE CAP",
  sector: "Industrivaror & Tjänster",
  recommendation: "BEVAKA",
  price: "41 kr",
  pe: "34.2",
  yield: "0.0085",
  marketCap: "82,6 mdkr",
  date: "2026-04-30",
  summary:
    "Smålandsk värmepumpjätte med exceptionell ledning och megatrender i ryggen. Marginalåterhämtning pågår men nuvarande kurs på 41 kr lämnar obefintlig säkerhetsmarginal – BEVAKA tills bättre ingångspunkt.",

  businessModel:
    "NIBE tillverkar och marknadsför energieffektiva klimatlösningar via tre segment: Climate Solutions (värmepumpar, 66 %), Element (industrikomponenter, 28 %) och Stoves (kaminer, 8 %). Försäljning sker via ett djupt nätverk av utbildade installatörer med hög lojalitet.",

  investmentCase:
    "Global marknadsledare i värmepumpar med extremt stark VD (Gerteric Lindquist, sedan 1989) och kontinentbaserad tillverkning som skyddar mot tullar. Megatrend kring energiomställning, men värderingen kräver felfri återhämtning.",

  financialAnalysis:
    "Omsättning 2025: 40 841 Mkr (+0,8 %, organiskt +5,3 % i fast valuta). Rörelsemarginal: 10,5 % justerat (mot historisk ~14 %). ROE: 8,5 %. Nettoskuld: 17,1 mdkr (2,7x EBITDA). FCF: ca 1,9 mdkr.",

  valuation:
    "P/E 34,2x på 2025 justerat EPS (1,20 kr). 2026e P/E ~26,5x vid EPS 1,55 kr. Historiskt 5-årssnitt: 48,6x (pandemi-snedvridet). EV/EBIT 24,5x. Direktavkastning 0,85 %.",

  growth:
    "Megatrender: REPowerEU, elektrifiering, AI-datacenter (NIBE Element). Expansion kommersiell fastighet och kylning. Förvärvsmaskin redo att starta om när Nettoskuld/EBITDA < 2,0x.",

  risks: [
    "Politisk osäkerhet kring gröna subventioner i Europa och USA",
    "Handelskrig och tullar (Stoves: Kanada→USA-produktion)",
    "Räntekänslighet i bygg- och renoveringsmarknaden",
    "Konkurrens från asiatiska HVAC-jättar (Daikin, kinesiska aktörer)",
    "Stoves i utdragen marginalpress (4,1 % EBIT)",
  ],

  esg: "Kärnan i NIBEs affärside är energieffektivitet och elektrifiering – bolaget bidrar direkt till energiomställningen. Rapporterar enligt svenska standarder.",

  aiObservations:
    "Insiderköp från CFO ger visst stöd. Analytikerkonsensus neutralt-positivt (7 av 13 köp, snittriktkurs ~43–44 kr). Värderingen förblir historiskt utmanande relativt nuvarande vinstnivå.",

  conclusion:
    "NIBE har klarat stålbadet med svarta siffror. Climate Solutions har återtagit 13 % EBIT-marginal (15,7 % i Q4). Stoves och skuldsättning är de kvarstående utmaningarna. Till 41 kr är marginalåterhämtningen redan inprisad.",

  employees: "20 000+",
  geography: "Europa exkl Norden (45%), Nordamerika (31%), Norden (18%), Övriga (6%)",
  managementOverview:
    "Gerteric Lindquist, VD sedan 1989. Decentraliserad styrmodell med hög lokal autonomi. Exceptionell förvärvshistorik.",
  ownershipStructure:
    "Familjen Lindkvist (A-aktier, röststark), Robur, AMF och tunga institutioner.",

  strengths: [
    "Global marknadsledare med oerhört starka lokala varumärken.",
    "Kontinentbaserad tillverkning som minskar sårbarhet för tullar.",
    "Stort nätverk av lojala installatörer som skapar höga byteskostnader.",
    "Exceptionell förvärvshistorik och integration.",
  ],
  weaknesses: [
    "Cyklisk sårbarhet för räntor och byggmarknad (smärtsamt bevisat 2024).",
    "NIBE Stoves befinner sig i utdragen marginalpress.",
    "Förhöjd skuldsättning begränsar kortsiktigt förvärvsutrymmet.",
  ],
  opportunities: [
    "Megatrend kring Europas energiomställning och REPowerEU.",
    "Stark tillväxt inom kommersiell ventilation och kyla.",
    "Halvledar- och AI-datacenterboom driver NIBE Elements affär.",
    "Normaliserade lagernivåer och sänkta räntor framåt.",
  ],
  threats: [
    "Politiska svängningar kring gröna subventioner i Europa.",
    "Handelskrig och tullar, särskilt mellan USA och Kanada.",
    "Prispress från asiatiska HVAC-jättar på den europeiska marknaden.",
  ],

  scenarios: [
    {
      label: "Bull Case",
      value: "50 kr",
      change: "+22%",
      type: "bull",
      description:
        "Europas omställning accelererar kraftigt, Stoves vänder och M&A-motorn drar igång storförvärv. EPS 1,80 kr × 28x.",
    },
    {
      label: "Base Case",
      value: "40 kr",
      change: "-2%",
      type: "base",
      description:
        "Stabil och lugn volymtillväxt. Marginalerna normaliseras helt under 2027. EPS 1,55 kr × 26x.",
    },
    {
      label: "Bear Case",
      value: "26 kr",
      change: "-37%",
      type: "bear",
      description:
        "Tysklands tvärnit smittar Europa. Priskrig bryter ut och tullar förstör Stoves export. EPS 1,20 kr × 22x.",
    },
  ],

  scores: {
    affarsmodell: 4,
    strategiskMoat: 4,
    finansiellKvalitet: 3,
    vardering: 2,
    tillvaxtutsikter: 4,
    riskprofil: 3,
    vdAnalys: 4,
    aiObservationer: 3,
  },

  aiDrivenData: {
    isAIDriven: true,
    slug: "nibe-industrier-2026",
    name: "NIBE Industrier AB",
    ticker: "NIBE B",
    isin: "SE0015988019",
    date: "2026-04-30",
    author: "Carl Fredrik Thor",
    scores: {
      affarsmodell: 4,
      strategiskMoat: 4,
      finansiellKvalitet: 3,
      vardering: 2,
      tillvaxtutsikter: 4,
      riskprofil: 3,
      vdAnalys: 4,
      aiObservationer: 3,
    },
    totaltPoang: 27,
    maxPoang: 40,
    rating: 0.68,
    overview: {
      borskurs: 41.0,
      borsvarde: "82,6 mdkr",
      bransch: "Industrivaror & Tjänster / Klimat- och energilösningar",
      geografi: "Europa exkl Norden (45%), Nordamerika (31%), Norden (18%), Övriga (6%)",
      affarside:
        "NIBE utvecklar, tillverkar och marknadsför energieffektiva klimatlösningar – framför allt värmepumpar – och elektriska industrikomponenter för den globala energiomställningen.",
      affarsmodell:
        "Produktförsäljning med ett växande inslag av serviceavtal (Climate Solutions), underleverantörskomponenter (Element) och konsumentprodukter (Stoves) via ett utbrett återförsäljarnätverk.",
      ledning:
        "Extremt stark och stabil ledning med Gerteric Lindquist som VD sedan 1989. Decentraliserad styrningsmodell med hög lokal autonomi.",
      agarstruktur:
        "Stabilt svenskt industriellt ägararv med familjen Lindkvist som röststark huvudägare via A-aktier, kompletterat av tunga institutioner.",
    },
    strategiskMoat: {
      swot: {
        styrkor: [
          "Global marknadsledare med oerhört starka lokala varumärken.",
          "Kontinentbaserad tillverkning som minskar sårbarhet för tullar.",
          "Stort nätverk av lojala installatörer som skapar höga byteskostnader.",
          "Exceptionell förvärvshistorik och integration.",
        ],
        svagheter: [
          "Cyklisk sårbarhet för räntor och byggmarknad (smärtsamt bevisat 2024).",
          "NIBE Stoves befinner sig i utdragen marginalpress.",
          "Förhöjd skuldsättning begränsar kortsiktigt förvärvsutrymmet.",
        ],
        möjligheter: [
          "Megatrenden kring Europas energiomställning och REPowerEU.",
          "Stark tillväxt inom kommersiell ventilation och kyla.",
          "Halvledar- och AI-datacenterboom driver NIBE Elements affär.",
          "Normaliserade lagernivåer och sänkta räntor framåt.",
        ],
        hot: [
          "Politiska svängningar kring gröna subventioner i Europa.",
          "Handelskrig och tullar, särskilt mellan USA och Kanada.",
          "Prispress från asiatiska HVAC-jättar på den europeiska marknaden.",
        ],
      },
      moat: [
        "Starka regionala varumärken med extrem installatörslojalitet.",
        "Skalfördelar i inköp och produktion som mindre konkurrenter saknar.",
        "Nätverkseffekt via egna utbildningscentra (t.ex. NIBE World of Energy).",
      ],
    },
    finansiellAnalys: {
      resultatrakning: {
        omsattningstillvaxt: "0,8% totalt 2025 (organiskt 5,3% i fast valuta)",
        epsTillvaxt: "Justerad EPS upp till 1,20 kr 2025 från 0,80 kr 2024",
        rorelsemarginal: "10,5% (2025 justerat) mot historiskt snitt på ~14%",
        nettomarginal: "5,6% (2025 rapporterat)",
      },
      balansrakning: {
        soliditet: "46,6%",
        nettoskuldEbitda: "2,7x",
        rantetackningsgrad: "3,4x (före jmf-störande poster)",
        nettoskuldNettokassa: "Nettoskuld 17,1 mdkr",
      },
      kassaflode: {
        operativtKassaflode: "2,9 mdkr (enligt årsredovisningens definition)",
        frittKassaflode: "ca 1,9 mdkr (kassaflöde efter investeringar)",
        fcfKommentar:
          "Kassaflödet från löpande verksamhet före rörelsekapital landade på starka 4,2 mdkr, understött av en lyckosam lagerreduktion under året.",
      },
      nyckeltal: {
        roe: "8,5% (2025 justerat)",
        roce: "8,2% (2025)",
        utdelning: "0,35 kr föreslagen, motsvarande cirka 29% av justerad vinst",
      },
      vardering: {
        pe: 34.2,
        peHistoriskt5ar: 48.6,
        evEbit: 24.5,
        evEbitda: 15.9,
        ps: 2.0,
        peg: 2.3,
        direktavkastning: 0.85,
        rimligtVarde: "36–44 kr",
        varderingsbedomning: "Hög",
      },
    },
    vdAnalys: {
      tonOchTransparens:
        "Total transparens. Kvantifierar exakt hur många miljoner man missade marginalmålen med i underpresterande segment.",
      strategiskKontinuitet:
        "Extremt konsekvent. Återkommer ständigt till de historiska marginalintervallen och den decentraliserade modellen.",
      framatblickandeFokus:
        "Tydlig riktning, men brister i specifika framåtblickande KPI:er med exakta tidsramar.",
      kapitalallokering:
        "Trovärdig. Slutför 10-miljardersinvesteringen och hanterar utdelningen mycket ansvarsfullt.",
      makroOchBranschkommentarer:
        "Krass och nyanserad. Erkänner öppet att valutamotvind och tullar stökar till det, utan att använda det som en universell ursäkt.",
    },
    aiObservationer: {
      sentiment: "Neutralt till svagt positivt efter tecken på marginalåterhämtning.",
      insidertransaktioner:
        "Försiktigt positiva signaler. Flera insiderköp (bl.a. från CFO) ger visst stöd.",
      analytikerkonsensus:
        "Övervägande neutral till lätt positiv (7 av 13 rekommenderar köp), med genomsnittlig riktkurs kring 43–44 kr.",
      avvikelser:
        "Värderingen förblir historiskt utmanande relativt den faktiska vinstnivån för stunden.",
    },
    sammanfattning: {
      beslut: "Bevaka",
      motivering:
        "NIBE är ett absolut kvalitetsbolag vars finansiella svacka ser ut att bottna ur. Omsättning och marginaler har vänt uppåt, men till nuvarande aktiekurs (ca 41 kr) är mycket av återhämtningen redan inprisad. Utan en tydligare säkerhetsmarginal eller snabbare marginallyft i de svagare segmenten rekommenderas investerare att avvakta ett bättre ingångsläge.",
      malpris: "36–44 kr",
      riskniva: "Medel",
      varderingsbedomning: "Hög",
      kvalitetsbedomning: "Hög",
      langsiktigtInnehav: "Ja",
      bevakaFramat: [
        "Volymutvecklingen för värmepumpar i Europa, särskilt Tyskland.",
        "Skuldsättningen (Nettoskuld/EBITDA) – en nedgång mot 2,0x öppnar för nya storförvärv.",
        "Marginalåterhämtningen i problembarnet NIBE Stoves.",
      ],
    },
    scenarier: {
      bullCase: {
        antaganden:
          "Europas omställning accelererar kraftigt, Stoves vänder och M&A-motorn drar igång storförvärv.",
        epsEstimat: "1.80 kr",
        multipel: "28x",
        riktkurs: "50 kr",
        sannolikhet: "25%",
      },
      baseCase: {
        antaganden:
          "Stabil och lugn volymtillväxt. Marginalerna normaliseras helt under 2027.",
        epsEstimat: "1.55 kr",
        multipel: "26x",
        riktkurs: "40 kr",
        sannolikhet: "55%",
      },
      bearCase: {
        antaganden:
          "Tysklands tvärnit smittar Europa. Priskrig bryter ut och tullar förstör Stoves export.",
        epsEstimat: "1.20 kr",
        multipel: "22x",
        riktkurs: "26 kr",
        sannolikhet: "20%",
      },
    },
  },
};
