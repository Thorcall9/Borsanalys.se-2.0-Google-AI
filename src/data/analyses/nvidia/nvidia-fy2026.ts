import { AnalysisData } from "../../../types/analysis.js";

export const nvidiaFy2026: AnalysisData = {
  slug: "nvidia-fy2026",
  title: "NVIDIA Corporation",
  disclosureKey: "nvidia",
  ticker: "NVDA",
  market: "NASDAQ",
  sector: "Halvledare & AI-infrastruktur",
  recommendation: "BEVAKA",
  price: "~178 USD",
  pe: "22.00x (2026e)",
  yield: "0,02%",
  relatedAnalysis: {
    slug: "apple",
    title: "Hårdvaruledare",
    label: "Relaterad analys",
    text: "Nvidia leder AI-revolutionen i datacentret, men hur står det till med hårdvarukungen Apple? Läs vår analys.",
    cta: "Läs analys av Apple",
    accentColor: "#8e8e93"
  },
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
    { label: "Bull Case", value: "280–320 USD", change: "+57%–80%", type: "bull" },
    { label: "Base Case", value: "210–220 USD", change: "+18%–24%", type: "base" },
    { label: "Bear Case", value: "100–130 USD", change: "-27%–44%", type: "bear" },
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
  conclusion: "NVIDIA är ett av de starkaste kvalitetsbolagen på marknaden. AI-supercykeln, CUDA-ekosystemets oövervinnerliga vallgrav och Blackwell-arkitekturens dominans skapar en sällsynt genomgång av extremt hög tillväxt och exceptionell lönsamhet.",
  nextSteps: [
    {
      slug: "microsoft",
      title: "Microsoft",
      label: "Mjukvaruledaren",
      reason: "Medan NVIDIA levererar hårdvaran, se hur Microsoft skalar upp mjukvaru- och molnerbjudandet genom sin strategiska OpenAI-integration."
    },
    {
      slug: "alphabet",
      title: "Alphabet",
      label: "AI-infrastruktur",
      reason: "Jämför NVIDIAs dominans med Alphabets egna chip-utveckling (TPU) och hur sökjätten positionerar sig för att minska beroendet av externa leverantörer."
    }
  ],
  deepDiveComponent: "Nvidia"
};
