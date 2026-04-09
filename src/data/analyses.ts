export interface AIDrivenAnalysis {
  isAIDriven: true;
  slug: string;
  name: string;
  ticker: string;
  isin: string;
  date: string;
  author: string;
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number; // 1=hög risk, 5=låg
    esgMakro: number;
    aiObservationer: number;
  };
  totaltPoang: number;
  maxPoang: number;
  rating: number;
  overview: {
    borskurs: string;
    borsvarde: string;
    bransch: string;
    geografi: string;
    affarside: string;
    affarsmodell: string;
    ledning: string;
    agarstruktur: string;
  };
  strategiskMoat: {
    swot: {
      styrkor: string[];
      svagheter: string[];
      möjligheter: string[];
      hot: string[];
    };
    moat: string[];
  };
  finansiellAnalys: {
    resultatrakning: {
      omsattningstillvaxt: string;
      vinsttillvaxt: string;
      rorelsemarginal: string;
    };
    nyckeltal: {
      roe: string;
      roce: string;
      utdelning: string;
    };
    vardering: {
      pe: string;
      evEbit: string;
      direktavkastning: string;
    };
  };
  tillvaxtdrivare: string[];
  esgMakro: {
    esgProfil: string;
    makropaverkan: string;
  };
  sammanfattning: {
    beslut: string;
    motivering: string;
    malpris: string;
  };
  scenarier: {
    bullCase: string;
    baseCase: string;
    bearCase: string;
  };
}

export interface AnalysisData {
  slug: string;
  title: string;
  ticker: string;
  market: string;
  sector: string;
  recommendation: "KÖP" | "AVVAKTA" | "SÄLJ" | "BEVAKA";
  price: string;
  pe: string;
  yield: string;
  marketCap?: string;
  discount?: string;
  summary: string;
  date?: string; // Format: YYYY-MM-DD
  listTitle?: string;
  
  // Standardized structure from roadmap
  investmentCase?: string;
  marketOverview?: string;
  growth?: string;
  financialAnalysis?: string;
  competitiveAdvantages?: string[];
  risks?: string[];
  valuation?: string;
  conclusion?: string;
  esg?: string;
  aiObservations?: string;
  employees?: string;
  geography?: string;
  managementOverview?: string;
  ownershipStructure?: string;

  // Detailed Analysis Sections
  riskRewardMatrix?: string;
  ukgcRiskDeepDive?: string;
  capitalAllocation?: string;
  marginTrends?: string;

  // Legacy fields (keeping for compatibility)
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
  scenarios: { label: string; value: string; change: string; type: "bull" | "base" | "bear" }[];
  businessModel?: string;
  management?: string;
  advantages?: string[];
  motivation?: string;

  // AI Driven Data
  aiDrivenData?: AIDrivenAnalysis;
  scores?: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro: number;
    aiObservationer: number;
  };
}

export const analyses: Record<string, AnalysisData> = {
  "investor-ab": {
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
      "Koncentrationsrisk mot ett fåtal stora innehav (t.ex. Atlas Copco)",
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
    }
  },
  "sbb": {
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
    summary: "Samhällsbyggnadsbolaget i Norden (SBB) äger och förvaltar samhällsfastigheter i Norden. Bolaget har under den senaste tiden drabbats hårt av stigande räntor och en hög skuldsättning, vilket lett till stora nedskrivningar och inställda utdelningar.",
    date: "2026-02-20",
    investmentCase: "Investeringscaset i SBB handlar idag om krishantering och överlevnad. Bolaget fokuserar på att sälja tillgångar för att stärka balansräkningen och minska skuldsättningen.",
    marketOverview: "Fastighetsmarknaden i Norden har varit under press pga stigande räntor. Samhällsfastigheter anses generellt stabila, men SBB:s höga belåning har gjort dem sårbara.",
    growth: "Tillväxt är inte i fokus för närvarande. Prioritet ligger på att avyttra fastigheter och förenkla bolagsstrukturen.",
    financialAnalysis: "Mycket ansträngd finansiell ställning med hög skuldsättning och pressad likviditet. Bolaget arbetar med omfattande försäljningar för att möta kommande obligationsförfall.",
    competitiveAdvantages: [
      "Stor portfölj av samhällsfastigheter med stabila hyresgäster",
      "Långa hyresavtal (ofta 10+ år)",
      "Viss politisk förankring i hyresrelationerna"
    ],
    risks: [
      "Fortsatt höga räntor försvårar refinansiering",
      "Ytterligare nedskrivningar av fastighetsvärden",
      "Likviditetsbrist vid uteblivna försäljningar"
    ],
    valuation: "Värderingen är extremt osäker och beror helt på bolagets förmåga att hantera sin skuld. Aktien handlas till en stor rabatt mot bokfört värde, vilket speglar marknadens misstro.",
    conclusion: "SBB är en högriskplacering där osäkerheten kring balansräkningen dominerar. Vi rekommenderar försiktighet och upprepar sälj.",
    esg: "SBB har haft höga ambitioner inom social hållbarhet, men de finansiella problemen har överskuggat detta arbete på senare tid.",
    aiObservations: "AI-analys av kassaflöden och skuldstruktur indikerar fortsatt hög risk. Sentimentet är mycket negativt och volatiliteten förväntas förbli hög.",
    employees: "~500",
    geography: "Huvudsakligen Sverige, Norge och Finland med fokus på kommunala och statliga hyresgäster.",
    managementOverview: "Leiv Synnes — VD: Tog över i maj 2023 med uppdraget att städa upp i balansräkningen. Lennart Schuss — Ordförande.",
    ownershipStructure: "Ilija Batljan (grundare) är fortfarande en betydande ägare, men hans inflytande har minskat i takt med att nya investerare kommit in.",
    strengths: [
      "Stark position inom samhällsfastigheter",
      "Långa hyresavtal med offentliga hyresgäster",
      "Viss diversifiering i portföljen"
    ],
    weaknesses: [
      "Mycket hög skuldsättning",
      "Lågt förtroende från kapitalmarknaden",
      "Komplex bolagsstruktur"
    ],
    opportunities: [
      "Försäljning av tillgångar för att minska skulder",
      "Omstrukturering av balansräkningen",
      "Sänkta räntor framöver"
    ],
    threats: [
      "Ytterligare kreditbetygssänkningar",
      "Likviditetskris",
      "Fortsatta fall i fastighetsvärden"
    ],
    scenarios: [
      { label: "Bull Case", value: "8 kr", change: "+130%", type: "bull" },
      { label: "Base Case", value: "4 kr", change: "+15%", type: "base" },
      { label: "Bear Case", value: "1 kr", change: "-70%", type: "bear" },
    ],
    scores: {
      affarsmodell: 2,
      strategiskMoat: 2,
      finansiellKvalitet: 1,
      vardering: 4,
      tillvaxtutsikter: 2,
      riskprofil: 1,
      esgMakro: 2,
      aiObservationer: 2
    }
  },
  "nvidia-fy2026": {
    slug: "nvidia-fy2026",
    title: "NVIDIA Corporation",
    ticker: "NVDA",
    market: "NASDAQ",
    sector: "Halvledare & AI-infrastruktur",
    recommendation: "BEVAKA",
    price: "~178 USD",
    pe: "22.00x (2026e)",
    yield: "0,02%",
    marketCap: "~4 338 Mdr USD",
    summary: "NVIDIA designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA) och nätverkslösningar (NVLink, InfiniBand) för datacenters, gaming och autonoma fordon. Bolaget rider på en sekulär supercykel inom AI-infrastruktur där Blackwell-plattformen och CUDA-ekosystemet skapar en oövervinnerlig vallgrav.",
    date: "2026-03-20",
    strengths: [
      "CUDA-ekosystem, starkaste moat i tech",
      "73,6% bruttomarginal (Non-GAAP Q3)",
      "ROE 101%, ROIC 93% — extrem kapitaleffektivitet",
      "Data Center dominans: ~90% av omsättningen",
      "Blackwell-arkitekturens snabba ramp",
      "Rekordfritt kassaflöde varje kvartal"
    ],
    weaknesses: [
      "Kina-exponering (H20 = strukturell $8B/kv risk)",
      "Kundkoncentration: ~50% av DC-rev från CSPs",
      "Bruttomarginal under press vid systemövergångar",
      "Fabless-modell = sårbarhet mot TSMC-störningar",
      "Insynsägande svagt sjunkande"
    ],
    opportunities: [
      "Agentic AI = ny, massiv inferenscykel",
      "Automotive/robotics: mångårig tillväxtmotor",
      "Sovereign AI: länder bygger egna AI-infrastrukturer",
      "DGX Spark (desktop AI) öppnar ny marknad",
      "Blackwell Ultra → Rubin-arkitektur pipeline",
      "Ethernet for AI: ny nätverksmarknad"
    ],
    threats: [
      "US exportkontroller (H20-ban, eskalering risk)",
      "AMD MI300X, Intel Gaudi — växande alternativ",
      "Custom ASIC (Google TPU, Amazon Trainium)",
      "Kina inhemsk konkurrens (Huawei Ascend)",
      "TSMC supply-chain sårbarhet (geopolitik Taiwan)",
      "Regulatoriska antitrust-risker (EU/USA)"
    ],
    scenarios: [
      { label: "Bull Case", value: "$320", change: "+76%", type: "bull" },
      { label: "Base Case", value: "$230", change: "+26%", type: "base" },
      { label: "Bear Case", value: "$120", change: "-34%", type: "bear" },
    ],
    scores: {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 3,
      tillvaxtutsikter: 5,
      riskprofil: 2,
      esgMakro: 3,
      aiObservationer: 4
    },
    employees: "42 000",
    geography: "Global verksamhet men kritisk exponering mot Asien för tillverkning (TSMC Taiwan). Kina utgör en hög-risksmarknad efter H20-exportkontrollerna (april 2025). USA och Europa dominerar kundbasen.",
    managementOverview: "Jensen Huang — VD & Medgrundare: Medgrundade NVIDIA 1993. En av techbranschens mest framgångsrika VD:ar med 30+ år av konsekventa strategiska vägval. Colette Kress — CFO: Erfaren teknisk CFO med gedigen track record.",
    ownershipStructure: "Insynsägande: 3,79%. Institutionellt ägande (est.): >65%. ⚠️ Insynsägande sjönk från 4,01% (FY24) till 3,79% (FY25) — en marginell minskning att bevaka.",
    businessModel: "NVIDIA designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA/ekosystem) och nätverkslösningar (NVLink, InfiniBand) för datacenters, gaming och autonoma fordon. Intäktsmodellen bygger på tre ben: (1) Hårdvaruförsäljning (GPU-system som HGX, DGX, GB200/GB300 Blackwell), (2) Mjukvara & plattform (CUDA-ekosystem som skapar inlåsning), samt (3) Tjänster & moln (DGX Cloud). Fabless-modellen innebär att tillverkning outsourcas till TSMC, vilket ger hög ROIC med lågt kapitalbehov.",
    investmentCase: "NVIDIA är hjärtat i den industriella revolutionen för AI. Med en PEG-värdering som fortfarande ser rimlig ut ställt mot tillväxten och en oöverträffad marknadsposition, anser vi att aktien är ett kärninnehav för den långsiktiga investeraren.",
    financialAnalysis: "Finansiell prestation i världsklass. Marginaler och kassaflöden som liknar mjukvarubolag trots att det är en hårdvaruverksamhet. Bruttomarginal ~75%, EBIT-marginal ~62%.",
    valuation: "Värderingen är ansträngd i absoluta tal (P/E ~36x fwd). Även om PEG-talet ser attraktivt ut (0.85), krävs det att den explosiva tillväxten fortsätter oförminskat för att motivera dagens multiplar.",
    growth: "Sovereign AI (nationella datacenter), Agentic AI (autonoma agenter) och Automotive (NVIDIA Drive) är de främsta tillväxtmotorerna framåt.",
    esg: "Fokus på energieffektivitet i chip-design (Blackwell är betydligt mer effektiv än Hopper). Utmaningar finns kring energiförbrukning i gigantiska datacenter.",
    aiObservations: "AI-driven analys av sentiment, insiderhandel och tekniska trender indikerar en stabil position för bolaget i nuvarande marknadsklimat. Blackwell-arkitekturen visar på en 30x förbättring i inferens-prestanda.",
    conclusion: "NVIDIA är ett av de starkaste kvalitetsbolagen på marknaden. AI-supercykeln, CUDA-ekosystemets oövervinnerliga vallgrav och Blackwell-arkitekturens dominans skapar en sällsynt kombination av extremt hög tillväxt och exceptionell lönsamhet."
  },
  "apple": {
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
  },
  "microsoft": {
    slug: "microsoft",
    title: "Microsoft Corporation",
    ticker: "MSFT",
    market: "NASDAQ",
    sector: "Mjukvara / Molntjänster",
    recommendation: "KÖP",
    price: "$415,20",
    pe: "32.00",
    yield: "0,75%",
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
    conclusion: "Microsoft kombinerar stabilitet med hög tillväxtpotential. Med en ledande position inom både molnet och AI är bolaget väl positionerat för framtiden. Vi rekommenderar köp.",
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
  },
  "novo-nordisk": {
    slug: "novo-nordisk",
    title: "Novo Nordisk A/S",
    ticker: "NOVO-B.CO",
    market: "Copenhagen",
    sector: "Hälsovård / Läkemedel",
    recommendation: "KÖP",
    price: "845,20 DKK",
    pe: "38.00",
    yield: "1,2%",
    marketCap: "3.8 TDKK",
    summary: "Novo Nordisk är världsledande inom diabetesvård och har revolutionerat marknaden för fetmabehandling med sina GLP-1-läkemedel (Ozempic och Wegovy). Bolaget upplever en enorm efterfrågan som för närvarande överstiger produktionskapaciteten.",
    date: "2026-03-05",
    investmentCase: "Marknaden för fetmabehandling förväntas växa explosivt under det kommande decenniet. Novo Nordisk har ett försteg med sina beprövade produkter och en stark pipeline av nya läkemedel. Bolagets förmåga att skala upp produktionen är nyckeln till framtida tillväxt.",
    marketOverview: "Diabetes och fetma är globala hälsoutmaningar som kräver långsiktig behandling. Novo Nordisk kontrollerar en betydande del av GLP-1-marknaden, men konkurrensen från Eli Lilly ökar.",
    growth: "Tillväxten drivs av den globala utrullningen av Wegovy och ökad användning av Ozempic. Bolaget investerar kraftigt i nya produktionsanläggningar för att möta efterfrågan.",
    financialAnalysis: "Mycket hög lönsamhet och starkt kassaflöde. Novo Nordisk har en konservativ balansräkning och en historik av att leverera stabil utdelningstillväxt och aktieåterköp.",
    competitiveAdvantages: [
      "Ledande expertis inom peptidforskning",
      "Starka varumärken (Ozempic, Wegovy)",
      "Omfattande klinisk data som stödjer produkternas effekt",
      "Storskalig produktionskapacitet för biologiska läkemedel"
    ],
    risks: [
      "Prispress från försäkringsbolag och myndigheter",
      "Konkurrens från Eli Lilly (Zepbound)",
      "Produktionsstörningar eller kapacitetsbrist",
      "Biverkningar som kan upptäckas vid långtidsanvändning"
    ],
    valuation: "Värderingen är hög i ett historiskt perspektiv, men vi anser att den är motiverad givet den unika tillväxtmöjligheten inom fetmabehandling.",
    conclusion: "Novo Nordisk är ett av världens bäst skötta läkemedelsbolag med en unik exponering mot en av de största tillväxtmarknaderna inom hälsovård. Vi upprepar köp.",
    esg: "Novo Nordisk har en stark ESG-profil med fokus på tillgång till hälsovård och miljöansvar (Circular for Zero). De rankas ofta högt i hållbarhetsindex.",
    aiObservations: "AI-analys av kliniska studier och marknadsefterfrågan indikerar fortsatt stark tillväxt för GLP-1-segmentet. Kapacitetsutbyggnaden är den kritiska faktorn.",
    strengths: ["Marknadsledande inom GLP-1", "Stark pipeline", "Hög lönsamhet"],
    weaknesses: ["Kapacitetsbegränsningar", "Beroende av ett fåtal storsäljare"],
    opportunities: ["Expansion inom fetmabehandling", "Nya indikationer för GLP-1"],
    threats: ["Konkurrens från Eli Lilly", "Prispress från myndigheter"],
    scenarios: [
      { label: "Bull Case", value: "1 100 DKK", change: "+30%", type: "bull" },
      { label: "Base Case", value: "920 DKK", change: "+9%", type: "base" },
      { label: "Bear Case", value: "700 DKK", change: "-17%", type: "bear" },
    ],
    scores: {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 2,
      tillvaxtutsikter: 5,
      riskprofil: 4,
      esgMakro: 4,
      aiObservationer: 4
    }
  },
  "volvo": {
    slug: "volvo",
    title: "AB Volvo",
    listTitle: "AB Volvo",
    ticker: "VOLV-B.ST",
    market: "Large Cap Stockholm",
    sector: "Industri / Fordon",
    recommendation: "BEVAKA",
    price: "322.40 kr",
    pe: "19.1x",
    yield: "4,04%",
    marketCap: "660 Bkr",
    summary: "AB Volvo är en global ledare inom transport- och infrastrukturlösningar, noterad på Nasdaq Stockholm med tickern VOLV B. Bolaget designar, tillverkar och marknadsför lastbilar, bussar, anläggningsmaskiner samt marina och industriella motorer under varumärkena Volvo Trucks, Renault Trucks, Mack och Volvo CE. En central del av affärsmodellen är den breda serviceverksamheten — finansiering, försäkring, reservdelar och underhåll — som strukturellt balanserar de naturliga fluktuationerna i fordonsförsäljningen.",
    date: "2026-03-31",
    investmentCase: "Helåret 2025 var utmanande: nettoomsättningen sjönk 9% till 479,2 mdr SEK (526,8 mdr), den justerade rörelsemarginalen föll till 10,7% (12,5%) och det operativa kassaflödet i industriverksamheten halverades till 21,8 mdr SEK (45,3 mdr). Bakom dessa siffror döljer sig dock en stark underliggande affär — serviceförsäljningen ökade 5% i konstant valuta under Q4 och anläggningsmaskiner förbättrade marginalen till 13,9% (11,8%) under kvartalet. Volvo avslutar 2025 med en nettokassa om 63,0 mdr SEK och är marknadsledande i Europa för tunga lastbilar för andra året i rad.",
    marketOverview: "Marknaden för tunga lastbilar har svalnat under 2025, men den långsiktiga trenden mot elektrifiering och autonoma lösningar kvarstår. Volvo positionerar sig för att leda detta skifte trots kortsiktig motvind i efterfrågan.",
    growth: "Starka drivkrafter i form av cyklisk återhämtning (H2 2026), vertikal integration genom Swecon-förvärvet och en spännande nisch i Volvo Penta (datacenter/energi). Elektrifieringen (orderingång +18%) ger en strukturell tillväxtresa långt bortom konjunkturen.",
    financialAnalysis: "Nettoomsättningen sjönk 9% under 2025 till 479,2 mdr SEK. Justerad rörelsemarginal föll till 10,7% (12,5%). Operativt kassaflöde halverades till 21,8 mdr SEK. Styrelsen föreslår en total utdelning om 13,00 kr (8,50 + 4,50), vilket ger en direktavkastning på 4,04% vid kurs 322,40 kr. Nettokassan uppgår till 63,0 mdr SEK.",
    competitiveAdvantages: [
      "LASTBILAR (67% AV INDUSTRI): Marknadsandel Europa tunga 19,0% — marknadsledare år 2. Nordamerika tufft (-15% leveranser FY2025). Mack Pioneer levererad Q4. Justerad marginal 9,8% FY2025.",
      "ANLÄGGNINGSMASKINER (18%): SDLG avyttrat sep 2025. Swecon-förvärv slutfört jan 2026. Justerad marginal 13,9% Q4 (11,8% Q4 2024) — tydlig förbättring. Orderingång +18% ex-SDLG.",
      "VOLVO PENTA (4%): Justerad marginal 17,4% FY2025 (17,2% FY2024) — bolagets starkaste. Leveranser +30% Q4. Stark efterfrågan generatoraggregat från datacenter och energisäkerhet.",
      "Varumärkesstyrka: Globalt erkänd för säkerhet, kvalitet och hållbarhet. I Europa tog Volvo Lastvagnar marknadsandel 19,0% (17,9%) under FY2025.",
      "Teknologisk bredd: Coretura-JV med Daimler Truck (etablerat Q2 2025) och Waabi-partnerskapet för autonoma lösningar."
    ],
    risks: [
      "Lastbilsmarginal under press (9,8% FY2025) och svagt Nordamerika",
      "Tariffer och handelspolitik — förväntad effekt -1 mdr SEK Q1 2026",
      "Lastbilskartellen — eventualförpliktelser om 14,4 mdr SEK",
      "Valutamotvind (SEK/USD 9,17) — systematisk negativ påverkan"
    ],
    valuation: "Vid 322,40 kr handlas Volvo till P/E 19,1x på FY2025-vinsten — hög för ett cykliskt bolag i nedgångsfas, men marknaden prissätter en tydlig vinståterhämtning. Om analytikerkonsensus om EPS 20,91 kr för 2026 levereras landar P/E på 15,5x — rimligt relativt historiskt snitt. Nettokassan om 63,0 mdr SEK (ca 31 kr per aktie) utgör ett starkt golv på nedsidan. Eget kapital per aktie är 87,7 kr vilket ger P/B 3,7x — premiumvärdering motiverad av historiskt hög ROE men sträcker sig vid nuvarande vinstnivå.",
    conclusion: "Volvo är en global ledare med en extremt robust serviceaffär som nu utgör en strukturell krockkudde. Q1 2026 väntas tufft med förväntad tarifftryckseffekt om -1 mdr SEK och fortsatt svagt Nordamerika. Givet den nuvarande marknadssituationen och den begränsade uppsidan till vår riktkurs väljer vi att bevaka aktien.",
    esg: "Volvo fortsätter att driva på för fossilfria transporter och cirkulära lösningar, vilket är centralt för deras långsiktiga strategi.",
    aiObservations: "AI-analys av produktionseffektivitet visar på potential för ytterligare kostnadsbesparingar genom ökad automatisering och mjukvaruoptimering.",
    employees: "~104 000",
    geography: "Global närvaro med tyngdpunkt i Europa och Nordamerika.",
    managementOverview: "Martin Lundstedt — VD: Har visat prov på god kostnadskontroll i en nedgång och driver transformationen mot mjukvarudefinierade fordon.",
    ownershipStructure: "Industrivärden garanterar långsiktighet och 'skin in the game'. Geely kvarstår som en stor strategisk ägare.",
    scenarios: [
      { label: "Bull Case", value: "410 kr", change: "+26%", type: "bull" },
      { label: "Base Case", value: "345 kr", change: "+6%", type: "base" },
      { label: "Bear Case", value: "260 kr", change: "-20%", type: "bear" },
    ],
    scores: {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 4,
      vardering: 3,
      tillvaxtutsikter: 4,
      riskprofil: 3,
      esgMakro: 4,
      aiObservationer: 3
    }
  },
  "alphabet": {
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
  },
  "evolution-2025": {
    slug: "evolution-2025",
    title: "Evolution AB",
    ticker: "EVO.ST",
    market: "Nasdaq Stockholm",
    sector: "iGaming / B2B Live Casino",
    recommendation: "KÖP",
    price: "577 kr",
    pe: "9,95x",
    yield: "5,3%",
    marketCap: "115 Mdr EUR",
    summary: "P/E under 10x, 66% EBITDA-marginal och 818 MEUR i kassan — men UKGC-granskning och stagnerande tillväxt skapar ovisshet. Vi går igenom allt du behöver veta inför investeringsbeslutet.",
    date: "2026-03-21",
    investmentCase: "Köprekommendationen bygger på en riskjusterad förväntad avkastning (EV) på +21%. Marknaden prisar i dagsläget in ett brittiskt worst-case-scenario med hög sannolikhet — vi bedömer sannolikheten som betydligt lägre. Säkerhetsmarginalen ligger i gapet mellan marknadens rädsla och den operationella verkligheten. P/E under 10x, 66% EBITDA-marginal och 818 MEUR i kassan skapar en attraktiv risk/reward.",
    marketOverview: "Evolution är världens ledande B2B-leverantör av live casino-lösningar till speloperatörer. Grundat 2006 i en liten studio i Lettland har bolaget vuxit till en global aktör med 870+ operatörskunder, 22 475 anställda och studior på fyra kontinenter. Affärsmodellen är provisionsbaserad — Evolution tar en andel av de spelintäkter (GGR) som operatörernas spelare genererar, vilket skapar återkommande, skalbara intäkter utan direkt kundanskaffningskostnad. Moderbolaget är baserat i Stockholm och noterat på Nasdaq Stockholm under tickern EVO. 2025 var ett utmanande år: omsättningstillväxten kollapsade till +0,2%, EPS föll 11,8% och utdelningen ställdes in helt. Men bakom rubrikerna döljer sig ett bolag med 818 MEUR i likvida medel, noll räntebärande skulder och ett operativt kassaflöde på 1 255 MEUR per år. Kursen på ~577 kr ger ett P/E på under 10x — historiskt exceptionellt lågt för ett bolag med Evolutions kvalitetsprofil.",
    growth: "Tillväxten drivs av USA-expansion (nu i alla 7 stater), Brasilien (studio öppnad i São Paulo), och Hasbro-partnerskapet (MONOPOLY Filthy Rich m.fl.). EPS-tillväxten väntas bli måttlig (2–4% per år 2026–2028e) i linje med konsensus, men med potential för acceleration bortom 2027e.",
    financialAnalysis: "Exceptionell lönsamhet med en EBITDA-marginal på 66,1% (2025). Balansräkningen är i enastående skick. De 194 MEUR i långfristiga skulder utgörs nästan uteslutande av leasingskulder — räntebärande skuld är i praktiken noll. Med 818 MEUR i likvida medel och en obligationsportfölj på 104 MEUR har bolaget en nettokassaposition som ger enorm finansiell flexibilitet. Kapitaleffektivitet: ROE på 26% och ROCE på 26% är starka absoluta tal — men observera att de föll från 31,6% 2024. Faller ROE under 20% är det en tydlig signal om försämrad kapitaleffektivitet att bevaka.",
    marginTrends: "Marginalen föll från 68,4% till 66,1% under 2025. Detta beror på löneinflation i studionätverket, en förändrad revenuemix med fler aggregatorer i Asien/LatAm, samt underprestation i RNG-segmentet. Intäkt per anställd sjönk -5,3% under året.",
    ukgcRiskDeepDive: "UKGC inledde en granskning av Evolutions maltesiska holdingbolag i december 2024 under sektion 116 av Gambling Act 2005. Utfallet är fortfarande okänt och Evolution samarbetar fullt ut. Risken är binär — antingen böter och åtgärdsplaner, eller licensindragning i värsta fall. Vår sannolikhetsbedömning: Fullständig licensindragning (5–10%), Betydande böter (30–35%), Liten sanktion eller ingen åtgärd (55–65%).",
    capitalAllocation: "Återköp på 500 MEUR genomfördes 2025 till snittpris 752 SEK. Utdelningen väntas återinföras 2026e (~30 kr/aktie, 5,3% direktavkastning), vilket är en viktig katalysator för institutionella ägare.",
    competitiveAdvantages: [
      "Nätverkseffekter (870+ operatörer)",
      "Switching costs (djup integration)",
      "IP & spelbibliotek (Hasbro, Lightning-serien)",
      "Regulatorisk licens-moat (svårreplikerad global portfölj)"
    ],
    risks: [
      "UKGC-granskning (binär risk)",
      "Contagion-risk vid UK-sanktioner",
      "Asien-volatilitet och cyberbrottslighet",
      "Löneinflation i personalintensiva studior"
    ],
    valuation: "Evolution handlas till historiskt låga multiplar med ett P/E på ~10x (nuläge) och en Earnings Yield på 10,1%. Detta är exceptionellt för ett bolag med 66%+ EBITDA-marginal och nettokassa. Dock signalerar PEG-talet för 2027e (3,4) att aktien är dyr relativt den förväntade tillväxten om inte EPS-tillväxten accelererar bortom nuvarande konsensus på ~2%.",
    conclusion: "Evolution AB är ett enastående kvalitetsbolag som straffas för kortsiktiga utmaningar. Säkerhetsmarginalen vid P/E 10x är tillräcklig för att motivera ett köp, men PEG-varningsflaggan för 2027e kräver bevakning av tillväxttakten. Direktavkastningen på 5,3% (2026e) fungerar som en viktig katalysator för att locka tillbaka institutionellt kapital.",
    esg: "Neutral ESG-profil med sociala utmaningar kring spelberoende. Stabil styrning (G) med 41,6% insiderägande och transparent rapportering.",
    aiObservations: "Sentiment-mönstret 'stolta, men inte nöjda' föregår ofta återhämtning. Asien Q4-dataavvikelse (positiv QoQ) är ej fullt prisad. Aktieåterköp på 500 MEUR vid 752 SEK signalerar stark ledningsövertygelse.",
    employees: "22 475",
    geography: "Europa, Asien, Nordamerika, Latinamerika",
    managementOverview: "Martin Carlesund (VD) och Joakim Andersson (CFO) – erfaret team med starkt track record av skalning och finansiell disciplin.",
    ownershipStructure: "Insiderägande 41,6%. Största kund utgör ~12% av nettoomsättningen.",
    businessModel: "Provisionsbaserade intäkter (GGR) från 870+ operatörskunder. Extremt skalbar Live-modell (86% av intäkter) kombinerat med RNG (14%).",
    strengths: [
      "Dominerande B2B-position",
      "EBITDA-marginaler >66%",
      "Nettokassa 818 MEUR",
      "Produktinnovation (Hasbro)",
      "Insiderägande 41,6%"
    ],
    weaknesses: [
      "Omsättningstillväxt kollapsade till +0,2% 2025",
      "Låg EPS-tillväxt 2-4% (2026-2028e)",
      "Sjunkande intäkt per anställd",
      "Asien-volatilitet",
      "Utdelning inställd 2025"
    ],
    opportunities: [
      "USA-expansion (alla 7 stater)",
      "Brasilien studio i São Paulo",
      "Hasbro-partnerskap (MONOPOLY m.fl.)",
      "Reglerade marknader (47%)",
      "Galaxy Gaming-förvärv"
    ],
    threats: [
      "UKGC-granskning",
      "Contagion-risk",
      "Ringfencing i Europa",
      "PEG 3.4 för 2027e",
      "Konkurrens från Playtech/Pragmatic"
    ],
    scenarios: [
      { label: "Bull Case (25%)", value: "880 kr", change: "+53%", type: "bull" },
      { label: "Base Case (55%)", value: "720 kr", change: "+25%", type: "base" },
      { label: "Bear Case (20%)", value: "400 kr", change: "-31%", type: "bear" },
    ],
    scores: {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 4,
      vardering: 4,
      tillvaxtutsikter: 3,
      riskprofil: 3,
      esgMakro: 3,
      aiObservationer: 4
    },
    aiDrivenData: {
      isAIDriven: true,
      slug: "evolution-2025",
      name: "Evolution AB",
      ticker: "EVO.ST",
      isin: "SE0018538068",
      date: "21 mars 2026",
      author: "Carl Fredrik Thor",
      scores: {
        affarsmodell: 5,
        strategiskMoat: 5,
        finansiellKvalitet: 4,
        vardering: 4,
        tillvaxtutsikter: 3,
        riskprofil: 3,
        esgMakro: 3,
        aiObservationer: 4
      },
      totaltPoang: 31,
      maxPoang: 40,
      rating: 0.775,
      overview: {
        borskurs: "577 SEK",
        borsvarde: "~115 Mdr EUR",
        bransch: "Live Casino / iGaming",
        geografi: "Europa, Asien, Nordamerika, Latinamerika",
        affarside: "Världsledande B2B-leverantör av live casino-lösningar",
        affarsmodell: "Provisionsbaserade intäkter (GGR) från 870+ operatörskunder",
        ledning: "Martin Carlesund (VD), Joakim Andersson (CFO)",
        agarstruktur: "Insiderägande 41,6%. Största kund utgör ~12% av nettoomsättningen"
      },
      strategiskMoat: {
        swot: {
          styrkor: ["Dominerande B2B-position", "EBITDA-marginaler >66%", "Nettokassa 818 MEUR", "Produktinnovation (Hasbro)", "Insiderägande 41,6%"],
          svagheter: ["Omsättningstillväxt kollapsade till +0,2% 2025", "Låg EPS-tillväxt 2-4%", "Sjunkande intäkt per anställd", "Asien-volatilitet"],
          möjligheter: ["USA-expansion", "Brasilien studio", "Hasbro-partnerskap", "Reglerade marknader (47%)"],
          hot: ["UKGC-granskning", "Contagion-risk", "Ringfencing i Europa", "PEG 3.4 för 2027e"]
        },
        moat: ["Nätverkseffekter (870+ operatörer)", "Switching costs", "IP & spelbibliotek", "Regulatorisk licens-moat"]
      },
      finansiellAnalys: {
        resultatrakning: {
          omsattningstillvaxt: "+0,2% 2025",
          vinsttillvaxt: "EPS 5,24 EUR (2025), -11,8%",
          rorelsemarginal: "59,4% (2025)"
        },
        nyckeltal: {
          roe: "26,3% (2025)",
          roce: "26% (2025)",
          utdelning: "Inställd 2025. 2026e: ~30 kr (~5,3% DA)"
        },
        vardering: {
          pe: "9,95x",
          evEbit: "8,5x",
          direktavkastning: "5,3% (2026e)"
        }
      },
      tillvaxtdrivare: ["USA", "Brasilien", "Hasbro", "Reglerade marknader"],
      esgMakro: {
        esgProfil: "Neutral ESG-profil med sociala utmaningar kring spelberoende.",
        makropaverkan: "Konjunkturokänsligt spelande, EUR-rapportering."
      },
      sammanfattning: {
        beslut: "KÖP",
        motivering: "P/E ~10x för ett kvalitetsbolag med dominerande marknadsposition, 66%+ EBITDA-marginal, nettokassa och strukturella tillväxtmöjligheter i USA och LatAm. UKGC-risken är binär och reell — hantera med positionsstorlek snarare än avvaktning.",
        malpris: "720 SEK"
      },
      scenarier: {
        bullCase: "Asien normaliseras, USA accelererar – aktie mot 880 kr (25%)",
        baseCase: "Stabil tillväxt, marginal 66-67% – aktie mot 720 kr (55%)",
        bearCase: "UKGC-sanktioner + fortsatt Asien-nedgång – aktie mot 400 kr (20%)"
      }
    }
  },
  "swedbank-2025": {
    slug: "swedbank-2025",
    title: "Swedbank AB",
    ticker: "SWED A",
    market: "Large Cap Stockholm",
    sector: "Bank / Finans",
    recommendation: "BEVAKA",
    price: "320 SEK",
    pe: "11.01",
    yield: "7.43%",
    marketCap: "366 Mdkr",
    summary: "Solid lönsamhet, låg K/I-kvot och god direktavkastning. Framåtblickande P/E 12x och fallande EPS-estimat motiverar försiktighet vid nuvarande kurs. Tydligare köpläge vid 290-300 kr.",
    date: "2026-04-08",
    investmentCase: "Swedbank har en stabil och beprövad affärsmodell, levererar på sina finansiella mål, har exceptionell kostnadskontroll med K/I-kvot 0,36, en robust balansräkning och stark utdelningsförmåga. Banken har navigerat genom räntecykeln väl och levererat på sitt '15/25'-mål. Förvärven av Stabelo och Entercard stärker den framtida intjäningsförmågan inom bolån och korttjänster, vilket balanserar räntekänsligheten.",
    marketOverview: "Swedbank är en av Sveriges och Nordens absolut största banker med 7,3 miljoner privatkunder. Sverige står för 71% av intäkterna och Baltikum för 25%. Banken är marknadsledare i Baltikum och har en unik position via sparbanksrörelsen i Sverige. Konkurrensen är mogen men stabil, där Swedbank utmärker sig genom sin digitala mognad och effektiva kostnadsstruktur.",
    growth: "Tillväxten drivs primärt av volymökning i bolån (Stabelo) och expansion på de baltiska hemmamarknaderna där kreditvolymerna växte 12-16% under 2025. Entercard-integrationen bidrar med transaktionsbaserade intäkter. AI-driven effektivisering är en central del av 'Swedbank 15/27'-planen för att bibehålla marknadsledande kostnadseffektivitet.",
    financialAnalysis: "Nettointäkterna 2025 sjönk 7% till 68 736 Mkr till följd av ett 11% lägre räntenetto när räntorna normaliserades. Trots detta förbättrades rörelsemarginalen till 31,86% och K/I-kvoten hölls på 0,36. EPS landade på 29,14 kr. Balansräkningen är mycket robust med en CET1-kvot på 17,8%, vilket gett utrymme för både ordinarie- och specialutdelningar.",
    competitiveAdvantages: [
      "Sparbanksekosystemet: Unikt distributionsnät med 209 kontor och lokal förankring",
      "Kostnadsledarskap: K/I-kvot på 0,36 är bland de lägsta i Europa",
      "Marknadsdominans Baltikum: Ledande position och 'mest älskade varumärke'",
      "Höga byteskostnader: Djup integration av privatkunders vardagsekonomi"
    ],
    risks: [
      "Räntemarginaltryck: Varje räntesänkning pressar det dominerande räntenettot",
      "Regulatorisk osäkerhet: Pågående FI-granskning av kundkännedomsprocesser",
      "Geopolitik: Exponeringen mot Baltikum innebär strukturell risk vid regional instabilitet",
      "Kreditkvalitet: Eventuell press på högt belånade svenska hushåll vid sämre konjunktur"
    ],
    valuation: "P/E 11x på 2025-vinsten och 12x på 2026-estimat signalerar att marknaden korrekt prissatt en vinstnedgång. P/B 1,59x är rimligt men inte billigt. Den normaliserade direktavkastningen på 7,4% (2026e) är dock mycket attraktiv för utdelningsinvesterare.",
    conclusion: "Swedbank är ett kvalitetsbolag med stark lönsamhet och generös utdelning. Vid nuvarande kurs 320 kr ser vi dock begränsad kortsiktig uppsida givet fallande EPS-estimat. En säkerhetsmarginal i värderingen nås vid 290-300 kr.",
    esg: "S&P AA- betyg med fokus på förbättrad governance. Sustainable Asset Registry översteg 165 mdkr 2025. Mest hållbara bankvarumärke i Sverige 2025. Rapportering enligt CSRD för andra året i rad.",
    aiObservations: "Sentimentbilden är neutral. Aktien har backat 12% från toppen i takt med räntesänkningsförväntningar. Insideraktivitet präglas främst av återköpsprogrammet. FI-granskningen är en varningssignal att bevaka för kortsiktig volatilitet.",
    employees: "18 638",
    geography: "Sverige (71%), Baltikum (25%), Övriga (4%)",
    managementOverview: "VD Jens Henriksson (sedan 2019) och CFO Jon Lidefelt. Har levererat på '15/25'-målet och etablerat ett högt förtroende genom effektiv krishantering och finansiell disciplin.",
    ownershipStructure: "Domineras av Sparbanksstiftelserna (13,3% av rösterna) samt institutionella jättar som Alecta och AMF, vilket ger en stabil och långsiktig ägarbas.",
    scenarios: [
      { label: "Bull Case", value: "380-420 SEK", change: "+19-31%", type: "bull" },
      { label: "Base Case", value: "300-360 SEK", change: "-6% till +12%", type: "base" },
      { label: "Bear Case", value: "260-280 SEK", change: "-19% till -12%", type: "bear" }
    ],
    businessModel: "Fullservicebank med fokus på privatpersoner och företag. Intäkter genereras främst via räntenetto, provisionsnetto (fondförvaltning via Robur, kort, rådgivning) och handelsintäkter.",
    strengths: ["Stark varumärkesposition i Baltikum", "Låg K/I-kvot 0,36", "ROE >15%", "Skalbar digitalinfrastruktur"],
    weaknesses: ["Beroende av räntemarginal", "Tappad bolånemarknadsandel Sverige", "Historiska regulatoriska bekymmer"],
    opportunities: ["Entercard/Stabelo-synergier", "Bolånetillväxt vid lägre räntor", "Baltisk kreditexpansion", "AI-effektivisering"],
    threats: ["Räntemarginaltryck", "US DFS-utredning", "FI-granskning", "Fintech-konkurrens"],
    scores: {
      affarsmodell: 4,
      strategiskMoat: 4,
      finansiellKvalitet: 4,
      vardering: 3,
      tillvaxtutsikter: 3,
      riskprofil: 4,
      esgMakro: 4,
      aiObservationer: 3
    },
    aiDrivenData: {
      isAIDriven: true,
      slug: "swedbank-2025",
      name: "Swedbank AB",
      ticker: "SWED A",
      isin: "SE0000242455",
      date: "2026-04-08",
      author: "Carl Fredrik Thor",
      scores: {
        affarsmodell: 4,
        strategiskMoat: 4,
        finansiellKvalitet: 4,
        vardering: 3,
        tillvaxtutsikter: 3,
        riskprofil: 4,
        esgMakro: 4,
        aiObservationer: 3
      },
      totaltPoang: 29,
      maxPoang: 40,
      rating: 0.725,
      overview: {
        borskurs: "320.0 SEK",
        borsvarde: "ca 366 mdkr",
        bransch: "Bankverksamhet / Finansiella tjänster",
        geografi: "Sverige (71%), Baltikum (25%), Övriga (4%)",
        affarside: "Erbjuda privatpersoner och företag finansiella tjänster i Norden och Baltikum",
        affarsmodell: "Fullservicebank med intäkter från räntenetto, provisionsnetto och kapitalförvaltning via Swedbank Robur",
        ledning: "VD Jens Henriksson sedan 2019, CFO Jon Lidefelt. Levererade Swedbank 15/25 i tid.",
        agarstruktur: "Sparbanksstiftelserna ca 13% av rösterna, domineras av institutionella ägare"
      },
      strategiskMoat: {
        swot: {
          styrkor: ["Stark varumärkesposition i Baltikum", "Låg K/I-kvot 0,36", "ROE >15%", "Skalbar digitalinfrastruktur"],
          svagheter: ["Beroende av räntemarginal", "Tappad bolånemarknadsandel Sverige", "Historiska regulatoriska bekymmer"],
          möjligheter: ["Entercard/Stabelo-synergier", "Bolånetillväxt vid lägre räntor", "Baltisk kreditexpansion", "AI-effektivisering"],
          hot: ["Räntemarginaltryck", "US DFS-utredning", "FI-granskning", "Fintech-konkurrens"]
        },
        moat: ["Varumärke och kundlojalitet", "Sparbanksekosystem", "Höga byteskostnader", "Ledande digital plattform Baltikum"]
      },
      finansiellAnalys: {
        resultatrakning: {
          omsattningstillvaxt: "Nettointäkter -7% 2025 vs 2024 (68 736 vs 74 104 Mkr). Räntenetto -11%.",
          vinsttillvaxt: "EPS 29,14 kr 2025 vs 30,98 kr 2024 (-6%). Estimat 2026e: 26,94 kr.",
          rorelsemarginal: "Rörelsemarginal 31,86% (2025) vs 27,70% (2024). K/I-kvot 0,36."
        },
        nyckeltal: {
          roe: "14,74% (2025), 16,70% (2024), 18,3% (2023)",
          roce: "14,74% (2025)",
          utdelning: "29,80 kr/aktie 2025 inkl. 9,35 kr specialutdelning. 2026e: 24,19 kr, DA 7,43%"
        },
        vardering: {
          pe: "12,1x (estimerad 2026)",
          evEbit: "N/A",
          direktavkastning: "7,43%"
        }
      },
      tillvaxtdrivare: ["Entercard/Stabelo-synergier", "Bolånetillväxt vid lägre räntor", "Baltisk kreditexpansion", "AI-effektivisering"],
      esgMakro: {
        esgProfil: "Efter compliance-smällen fokuseras allt på best-practice-ESG; hög CSRD rapportering. S&P AA- kreditbetyg.",
        makropaverkan: "Riksbanksräntan och KPI styr oavkortat storbankens räntenetto. BN-tillväxt 2,5% 2026e estimeras för Sverige."
      },
      sammanfattning: {
        beslut: "Bevaka/Köp",
        motivering: "Solid lönsamhet, låg K/I-kvot och god direktavkastning. Framåtblickande P/E 12x och fallande EPS-estimat motiverar försiktighet vid nuvarande kurs. Tydligare köpläge vid 290-300 kr.",
        malpris: "320-360 SEK (12 månader)"
      },
      scenarier: {
        bullCase: "ROE 15-16%, synergier levereras, EPS 31-33 kr 2027. Kurs 380-420 SEK.",
        baseCase: "ROE 14-15%, stabil kostnadskvot, EPS 27-29 kr. Kurs 300-360 SEK.",
        bearCase: "ROE under 13%, räntepressens fortsättning, FI-böter. EPS 23-25 kr. Kurs 260-280 SEK."
      }
    }
  }
};
