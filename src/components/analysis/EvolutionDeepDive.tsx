"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  ScenarioCards,
  AlertBox,
  ProgressBar,
  Card,
  SwotGrid,
} from "./index";
import { fetchWithCache } from "../../services/stockService";
import { analyses } from "../../data/analyses";
import SEO from "../SEO";
import AdZone from "../AdZone";
import type { AnalysisSection, Scenario, TableRow } from "./index";

const ACCENT = "#10B981";

const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",    title: "Översikt" },
  { id: "moat",       number: "II",   title: "Strategisk Moat" },
  { id: "financials", number: "III",  title: "Finansiell analys" },
  { id: "valuation",  number: "IV",   title: "Värdering & PEG" },
  { id: "growth",     number: "V",    title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",   title: "Riskprofil & UKGC" },
  { id: "segments",   number: "VII",  title: "Segmentanalys" },
  { id: "margins",    number: "VIII", title: "Marginaldjupdykning" },
  { id: "allocation", number: "IX",   title: "Kapitalallokering" },
  { id: "esg",        number: "X",    title: "ESG & Makro" },
  { id: "ai",         number: "XI",   title: "AI-observationer" },
  { id: "summary",    number: "XII",  title: "Sammanfattning & Beslut" },
  { id: "scenarios",  number: "XIII", title: "Scenarier: Bull, Base & Bear" },
];

interface EvolutionDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
}

export default function EvolutionDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading 
}: EvolutionDeepDiveProps) {
  // const [liveData, setLiveData] = useState<any>(null);

  const analysisData = analyses["evolution-2025"];
  const analysisPrice = useMemo(() => {
    if (!analysisData?.price) return 577;
    const cleanPrice = analysisData.price.replace(/[^\d,.]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? 577 : parsed;
  }, [analysisData?.price]);

  /*
  useEffect(() => {
    const getLiveData = async () => {
      try {
        const data = await fetchWithCache("EVO.ST");
        if (data) {
          setLiveData(data);
        }
      } catch (error) {
        console.error("Failed to fetch live data for Evolution:", error);
      }
    };
    getLiveData();
  }, []);

  const priceStats = useMemo(() => {
    if (!liveData) return null;
    const currentPrice = liveData.regularMarketPrice;
    const diff = currentPrice - analysisPrice;
    const percent = (diff / analysisPrice) * 100;
    return {
      currentPrice,
      diff,
      percent,
      isPositive: diff >= 0
    };
  }, [liveData, analysisPrice]);
  */

  const financialData: TableRow[] = [
    { key: "Nettoomsättning (MEUR)", "2023": "1 804", "2024": "2 063", "2025": "2 067", "2026e": "2 231", "2027e": "2 360" },
    { key: "Omsättningstillväxt", "2023": "+16,4%", "2024": "+14,5%", "2025": "+0,2%", "2026e": "+8,0%", "2027e": "+5,8%" },
    { key: "Just. EBITDA-marginal", "2023": "70,4%", "2024": "68,4%", "2025": "66,1%", "2026e": "~66%", "2027e": "~66%" },
    { key: "Rörelsemarginal EBIT", "2023": "63,8%", "2024": "64,1%", "2025": "59,4%", "2026e": "58,6%", "2027e": "58,5%" },
    { key: "EPS (EUR, före utsp.)", "2023": "5,19", "2024": "5,94", "2025": "5,24", "2026e": "5,7", "2027e": "5,8" },
    { key: "EPS-tillväxt", "2023": "+15%", "2024": "+14%", "2025": "-11,8%", "2026e": "+8,7%", "2027e": "+1,8%" },
    { key: "Op. kassaflöde (MEUR)", "2023": "1 278", "2024": "1 301", "2025": "1 255", "2026e": "1 313", "2027e": "1 419" },
    { key: "ROE", "2023": "~31%", "2024": "31,6%", "2025": "26,3%", "2026e": "—", "2027e": "—" },
    { key: "Soliditet", "2023": "~75%", "2024": "74,3%", "2025": "73,8%", "2026e": "—", "2027e": "—" },
  ];

  const columns = [
    { key: "key", label: "Nyckeltal" },
    { key: "2023", label: "FY2023" },
    { key: "2024", label: "FY2024" },
    { key: "2025", label: "FY2025" },
    { key: "2026e", label: "FY2026e" },
    { key: "2027e", label: "FY2027e" },
  ];

  const valuationMultiples = [
    { metric: "P/E (nuläge)", value: "9,95x" },
    { metric: "EV/EBITDA", value: "7,5x" },
    { metric: "EV/EBIT", value: "8,5x" },
    { metric: "P/S", value: "5,0x" },
    { metric: "Earnings Yield", value: "10,1%" },
    { metric: "Direktavkastning 2026e", value: "5,3%" },
  ];

  const valuationColumns = [
    { key: "metric", label: "Multipel" },
    { key: "value", label: "Värde" },
  ];

  const pegData = [
    { year: "2026e", eps: "5,7", growth: "+8,7%", pe: "9,6x", peg: "1,4", signal: "Rimligt" },
    { year: "2027e", eps: "5,8", growth: "+1,8%", pe: "9,4x", peg: "3,4", signal: "⚠ Dyrt" },
    { year: "2028e", eps: "6,0", growth: "+3,4%", pe: "9,0x", peg: "2,6", signal: "Högt" },
  ];

  const pegColumns = [
    { key: "year", label: "År" },
    { key: "eps", label: "EPS (EUR)" },
    { key: "growth", label: "EPS-tillväxt" },
    { key: "pe", label: "P/E" },
    { key: "peg", label: "PEG" },
    { key: "signal", label: "Signal" },
  ];

  const scenarios: Scenario[] = [
    {
      type: "bull",
      icon: "🚀",
      title: "Bull Case",
      probability: "25%",
      price: "880 kr",
      change: "+53%",
      description: "Asien normaliseras snabbare än väntat, USA-tillväxten accelererar genom nya delstatsregleringar och marginalerna återhämtar sig mot 68%."
    },
    {
      type: "base",
      icon: "⚖️",
      title: "Base Case",
      probability: "55%",
      price: "720 kr",
      change: "+25%",
      description: "Stabil tillväxt i USA och LatAm kompenserar för regulatorisk motvind i Europa. Marginalerna stabiliseras kring 66%."
    },
    {
      type: "bear",
      icon: "⚠️",
      title: "Bear Case",
      probability: "20%",
      price: "400 kr",
      change: "-31%",
      description: "UKGC drar in licensen eller utfärdar extrema böter. Smittorisk till andra marknader och permanent marginalpress."
    }
  ];

  const SCORE_LABELS: Record<string, string> = {
    affarsmodell: "I. Företagsöversikt",
    strategiskMoat: "II. Strategisk analys & Moat",
    finansiellKvalitet: "III. Finansiell analys",
    vardering: "IV. Värdering & Jämförelse",
    tillvaxtutsikter: "V. Tillväxtmotorer & Triggers",
    riskprofil: "VI. Riskprofil",
  };

  const scoresList = [
    { key: "affarsmodell", label: "I. Företagsöversikt", score: 5 },
    { key: "strategiskMoat", label: "II. Strategisk analys & Moat", score: 5 },
    { key: "finansiellKvalitet", label: "III. Finansiell analys", score: 4 },
    { key: "vardering", label: "IV. Värdering & Jämförelse", score: 4 },
    { key: "tillvaxtutsikter", label: "V. Tillväxtmotorer & Triggers", score: 4 },
    { key: "riskprofil", label: "VI. Riskprofil", score: 3 },
  ];

  const riskMatrixData = [
    { risk: "Regulatorisk risk (UKGC)", level: "Hög" },
    { risk: "Asien-volatilitet", level: "Hög" },
    { risk: "Cyberbrottslighet", level: "Medel" },
    { risk: "Valutarisk", level: "Medel" },
    { risk: "Finansiell risk", level: "Låg" },
    { risk: "Konkurrensrisk", level: "Låg" },
  ];

  const riskMatrixColumns = [
    { key: "risk", label: "Risk" },
    { key: "level", label: "Nivå" },
  ];

  const segmentData: TableRow[] = [
    { region: "Europa", share: "~35%", revenue: "177,6 MEUR", yoy: "-6,5%", comment: "Ringfencing pressar, men QoQ +1,1%" },
    { region: "Asien", share: "~38%", revenue: "193,6 MEUR", yoy: "QoQ +", comment: "Vänder upp i Q4/25" },
    { region: "Nordamerika", share: "~15%", revenue: "77,1 MEUR", yoy: "+9,2%", comment: "Snabbast växande" },
    { region: "LatAm", share: "~8%", revenue: "43,2 MEUR", yoy: "+15,3%", comment: "Brasilien-katalysator" },
  ];

  const segmentColumns = [
    { key: "region", label: "Region" },
    { key: "share", label: "Andel" },
    { key: "revenue", label: "Intäkt Q4/25" },
    { key: "yoy", label: "YoY" },
    { key: "comment", label: "Kommentar" },
  ];

  const efficiencyData: TableRow[] = [
    { key: "Anställda (FTE, periodsslut)", "2023": "15 600", "2024": "15 381", "2025": "16 243" },
    { key: "Nettoomsättning (MEUR)", "2023": "1 804", "2024": "2 063", "2025": "2 067" },
    { key: "Intäkt per anställd (kEUR)", "2023": "115,6", "2024": "97,1", "2025": "92,0" },
    { key: "Personalkostnad (MEUR)", "2023": "372", "2024": "438", "2025": "477" },
    { key: "Just. EBITDA-marginal", "2023": "70,4%", "2024": "68,4%", "2025": "66,1%" },
  ];

  const efficiencyColumns = [
    { key: "key", label: "Nyckeltal" },
    { key: "2023", label: "FY2023" },
    { key: "2024", label: "FY2024" },
    { key: "2025", label: "FY2025" },
  ];

  const summaryScores = [
    { category: "I. Affärsmodell", score: "5", max: "5" },
    { category: "II. Strategisk Moat", score: "5", max: "5" },
    { category: "III. Finansiell Kvalitet", score: "4", max: "5" },
    { category: "IV. Värdering", score: "4", max: "5" },
    { category: "V. Tillväxtutsikter", score: "3", max: "5" },
    { category: "VI. Riskprofil (inverterad)", score: "3", max: "5" },
    { category: "VII. ESG & Makro", score: "3", max: "5" },
    { category: "VIII. AI-observationer", score: "4", max: "5" },
    { category: "Totalpoäng", score: "31", max: "40", isTotal: true },
    { category: "Rating", score: "77,5%", max: "100%", isTotal: true },
  ];

  const evKalkylData = [
    { scenario: "Bull Case", target: "SEK 880", return: "+53%", prob: "25%", contribution: "+13%" },
    { scenario: "Base Case", target: "SEK 720", return: "+25%", prob: "55%", contribution: "+14%" },
    { scenario: "Bear Case", target: "SEK 400", return: "-31%", prob: "20%", contribution: "-6%" },
    { scenario: "Förväntad avkastning (EV)", target: "", return: "", prob: "100%", contribution: "+21%", isTotal: true },
  ];

  const evKalkylColumns = [
    { key: "scenario", label: "Scenario" },
    { key: "target", label: "Målkurs" },
    { key: "return", label: "Avkastning" },
    { key: "prob", label: "Sannolikhet" },
    { key: "contribution", label: "Vägt bidrag" },
  ];

  return (
    <AnalysisLayout
      companyName="Evolution AB"
      ticker="EVO"
      stockSlug="evolution-2025"
      subtitle="Köp nu eller vänta? En djupanalys av världens starkaste live casino-monopol"
      date="21 mars 2026"
      sections={sections}
      accentColor={ACCENT}
      isInWatchlist={isInWatchlist}
      isWatchlistLoading={isWatchlistLoading}
      onToggleWatchlist={onToggleWatchlist}
      // livePrice={liveData ? `${liveData.regularMarketPrice.toFixed(2)} SEK` : undefined}
      // liveChange={liveData ? `${liveData.regularMarketChange > 0 ? '+' : ''}${liveData.regularMarketChangePercent.toFixed(2)}%` : undefined}
      analysisPrice={analysisPrice}
      // currentPrice={liveData?.regularMarketPrice}
      currency="SEK"
    >
      <SEO 
        title="Evolution AB: Köp nu eller vänta? En djupanalys av världens starkaste live casino-monopol" 
        description="En omfattande analys av Evolution AB. Vi granskar affärsmodell, vallgravar, finansiell kvalitet och värdering för att ge ett välgrundat investeringsbeslut."
        ogType="article"
      />

      {/* Main Title Header */}
      <div className="mb-16 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              Nasdaq Stockholm: EVO · iGaming / B2B Live Casino
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              Evolution AB: Köp nu eller vänta? <br />
              <span className="text-primary">En djupanalys av världens starkaste live casino-monopol</span>
            </h1>
          </div>
        </div>
      </div>

      {/* I. Översikt */}
      <section id="overview" className="space-y-12">
        <SectionHeader number="I" title="Översikt" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="TICKER / BÖRS" value="EVO" trend="Nasdaq Stockholm" />
          <MetricCard label="ANSTÄLLDA" value="22 475" trend="Globalt" />
          <MetricCard label="HUVUDKONTOR" value="Stockholm" trend="Sverige" />
          <MetricCard label="GRUNDAT" value="2006" trend="Riga, Lettland" />
        </div>

        <div className="mb-12 bg-card border border-border rounded-[2.5rem] p-10">
          <h3 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-8">Analysens nyckelområden</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {scoresList.map((item) => (
              <div key={item.key}>
                <ProgressBar 
                  label={item.label} 
                  val={`${item.score}/5`} 
                  progress={(item.score / 5) * 100} 
                  accentColor={ACCENT} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="AFFÄRSIDÉ & HISTORIK" accentColor={ACCENT}>
            Evolution är världens ledande B2B-leverantör av live casino-lösningar till speloperatörer. Grundat 2006 i en liten studio i Lettland har bolaget vuxit till en global aktör med 870+ operatörskunder, 22 475 anställda och studior på fyra kontinenter. Affärsmodellen är provisionsbaserad — Evolution tar en andel av de spelintäkter (GGR) som operatörernas spelare genererar, vilket skapar återkommande, skalbara intäkter utan direkt kundanskaffningskostnad. Moderbolaget är baserat i Stockholm och noterat på Nasdaq Stockholm under tickern EVO.
          </Card>
          <Card title="MARKNADSLÄGE 2025" accentColor={ACCENT}>
            2025 var ett utmanande år: omsättningstillväxten kollapsade till +0,2%, EPS föll 11,8% och utdelningen ställdes in helt. Men bakom rubrikerna döljer sig ett bolag med 818 MEUR i likvida medel, noll räntebärande skulder och ett operativt kassaflöde på 1 255 MEUR per år. Kursen på ~577 kr ger ett P/E på under 10x — historiskt exceptionellt lågt för ett bolag med Evolutions kvalitetsprofil.
          </Card>
        </div>

        <AlertBox 
          type="info"
          title="Analytikerns notering"
          message="Köprekommendationen bygger på riskjusterad analys. Marknaden prisar i dagsläget in ett brittiskt worst-case-scenario med hög sannolikhet — vi bedömer sannolikheten som betydligt lägre. Säkerhetsmarginalen ligger i gapet mellan marknadens rädsla och den operationella verkligheten. Läs riskanalysen (sektion VI) noggrant innan du tar position."
        />
      </section>

      {/* II. Strategisk Moat */}
      <section id="moat" className="pt-24 space-y-12">
        <SectionHeader number="II" title="Strategisk Moat" />

        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="II. Strategisk Moat-betyg" 
              val="5/5" 
              progress={100} 
              accentColor={ACCENT} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="OPERATÖRER" value="870+" trend="Globalt" />
          <MetricCard label="MARKNADSANDEL" value="DOMINERANDE" trend="B2B Live Casino" />
          <MetricCard label="HASBRO AVTAL" value="EXKLUSIVT" trend="Från 2025" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="TEKNOLOGI & PRODUKTPORTFÖLJ" accentColor={ACCENT}>
            Evolutions moat är djup och mångdimensionell. Teknologiplattformen med låg latens och hög videokvalitet kräver enorma investeringar och år av tuning för att replikera. Produktportföljen — Lightning Roulette, Crazy Time, MONOPOLY Live — har blivit egna varumärken som spelare aktivt söker, vilket driver lojalitet hos operatörerna långt bortom vad en vanlig leverantör uppnår.
          </Card>
          <Card title="SWITCHING COSTS & NÄTVERK" accentColor={ACCENT}>
            Switching costs är höga: en operatör som byter live casino-leverantör riskerar att tappa spelare som är vana vid specifika Evolution-titlar. Det självförstärkande ekosystemet med 870+ operatörer gör att intäkterna växer med marknadens tillväxt snarare än att behöva erövras aktivt. Varje ny operatör som ansluter ökar nätverkets värde för alla befintliga kunder.
            <br /><br />
            Hasbro-partnerskapet (exklusivt flerårigt avtal, ingånget 2025) tillför ytterligare ett differentieringslager — ikoniska varumärken som MONOPOLY, Game Night och fler kommande titlar som konkurrenter inte kan replikera. VD Martin Carlesund beskriver produktplanen för 2026 som “inget mindre än spektakulär”.
          </Card>
        </div>

        <div className="pt-12">
          <SwotGrid 
            title="SWOT-analys: Evolution AB"
            data={{
              strengths: [
                "Dominerande B2B-position — 870+ operatörer, extremt höga switching costs och nätverkseffekter",
                "EBITDA-marginaler >66% — strukturellt högre än i princip alla jämförbara spelbolag",
                "Nettokassa: 818 MEUR i likvida medel, noll räntebärande skulder — finansiell ointaglighet",
                "Kontinuerlig produktinnovation: 110+ nya spel 2025, Hasbro-exklusivavtal (MONOPOLY m.fl.)",
                "Insiderägande 41,6% — ledningen har starkt skin in the game"
              ],
              weaknesses: [
                "Omsättningstillväxt kollapsade till +0,2% 2025 — från +14,5% året före",
                "EPS-tillväxt 2–4% per år framåt (2026–2028e) motiverar inte premiumvärdering",
                "Personalstyrkan växer snabbare än intäkterna — intäkt per anställd sjönk -5,3% 2025",
                "Asien-intäkter volatila och cyberbrottslighet mot videoströmmar ej fullt löst",
                "Utdelningen inställd 2025 — skrämde bort utdelningsinriktade institutionella ägare"
              ],
              opportunities: [
                "USA: Evolution nu i alla 7 stater, Ezugi återlanserat med mål att bli näst störst",
                "Brasilien: Studio öppnad i São Paulo — perfekt timing vid marknadens reglering 2025",
                "Hasbro-partnerskap: MONOPOLY Filthy Rich, Game Night — unik IP-differentiering",
                "Andel reglerade marknader ökade till 47% (Q4/25) — strukturell stabilitet",
                "Galaxy Gaming-förvärvet tillför sidebet-teknologi och USA-djup"
              ],
              threats: [
                "UKGC-granskning (dec 2024): binär risk — böter till licensindragning är möjliga utfall",
                "Contagion-risk: UKGC-sanktion kan trigga granskning i Ontario, New Jersey m.fl.",
                "Ringfencing i Europa pressar Europa-intäkter (–6,5% YoY Q3/25)",
                "PEG-tal på 3,4 för 2027e — dyrt relativt tillväxt om inte EPS accelererar",
                "Konkurrens från Playtech Live och Pragmatic Play Live på europeiska marknader"
              ]
            }}
          />
        </div>
      </section>

      {/* III. Finansiell analys */}
      <section id="financials" className="pt-24 space-y-12">
        <SectionHeader number="III" title="Finansiell Analys" />

        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="III. Finansiell kvalitetsbetyg" 
              val="4/5" 
              progress={80} 
              accentColor={ACCENT} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="NETTOKASSA" value="818 MEUR" trend="Enastående" />
          <MetricCard label="ROE" value="26.3%" trend="FY2025" />
          <MetricCard label="SOLIDITET" value="73.8%" trend="Stark" />
        </div>

        <FinancialTable 
          title="Resultatutveckling"
          data={financialData}
          columns={columns}
          accentColor={ACCENT}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="BALANSRÄKNING & LIKVIDITET" accentColor={ACCENT}>
            Balansräkningen är i enastående skick. De 194 MEUR i långfristiga skulder utgörs nästan uteslutande av leasingskulder — räntebärande skuld är i praktiken noll. Med 818 MEUR i likvida medel och en obligationsportfölj på 104 MEUR har bolaget en nettokassaposition som ger enorm finansiell flexibilitet.
          </Card>
          <Card title="KAPITALEFFEKTIVITET" accentColor={ACCENT}>
            ROE på 26% och ROCE på 26% är starka absoluta tal — men observera att de föll från 31,6% 2024. Faller ROE under 20% är det en tydlig signal om försämrad kapitaleffektivitet att bevaka.
          </Card>
        </div>
      </section>

      <AdZone id="evo-financials-after" type="banner" />

      {/* IV. Värdering & PEG */}
      <section id="valuation" className="pt-24 space-y-12">
        <SectionHeader number="IV" title="Värdering & PEG" />

        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="IV. Värderingsbetyg" 
              val="4/5" 
              progress={80} 
              accentColor={ACCENT} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <FinancialTable 
              title="Värderingsmultiplar"
              data={valuationMultiples}
              columns={valuationColumns}
              accentColor={ACCENT}
            />
            <div className="p-8 bg-muted/30 rounded-3xl border border-border">
              <p className="text-sm leading-relaxed">
                Evolution handlas till historiskt låga multiplar. P/E på ~10x för ett bolag med 66%+ EBITDA-marginal, nettokassa och dominerande marknadsposition är exceptionellt. Historiska multiplar har legat på 20–30x P/E under tillväxtåren. En Earnings Yield på 10,1% innebär att bolaget ger mer vinstavkastning än en statsobligation med mångfalt bättre underliggande kvalitet.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
              <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-amber-600">PEG-varning: 2027e signalerar dyrt relativt tillväxt</h4>
              <p className="text-sm leading-relaxed text-amber-900/80">
                PEG-talet (Price/Earnings to Growth) sätter P/E i relation till EPS-tillväxttakten. Under 1 = billigt, över 2 = dyrt relativt tillväxt.
              </p>
            </div>
            
            <FinancialTable 
              title="PEG-analys"
              data={pegData}
              columns={pegColumns}
              accentColor="#d97706"
            />

            <div className="p-8 bg-muted/30 rounded-3xl border border-border">
              <p className="text-sm leading-relaxed">
                PEG 3,4 för 2027e är en tydlig varningsflagga. Köprekommendationen bygger på att 2026 levererar över förväntan och att tillväxten sedan accelererar bortom konsensus. Om EPS-tillväxten stannar på 2% per år bör målpriset revideras ned ytterligare.
                <br /><br />
                Direktavkastningen på 5,3% (2026e) är en viktig stödnivå som lockar tillbaka utdelningsinriktade institutionella ägare som sålde vid utdelningsindragningen 2025. Återkomsten av utdelningen är i sig en katalysator.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center pt-8">
          <div className="flex-1 space-y-6">
            <div className="text-6xl font-black tracking-tighter text-primary">P/E 9.9x</div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuvarande värdering innebär en extrem pessimism. 
              Earnings Yield på över 10% är exceptionellt för ett bolag med denna kvalitet.
            </p>
          </div>
          <div className="w-full md:w-72 p-8 bg-primary text-primary-foreground rounded-[2.5rem] text-center">
            <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Vårt Base Case</div>
            <div className="text-4xl font-black mb-2">720 SEK</div>
            <div className="text-sm font-bold opacity-80">+25% Uppsida</div>
          </div>
        </div>
      </section>

      {/* V. Tillväxtmotorer */}
      <section id="growth" className="pt-24 space-y-12">
        <SectionHeader number="V" title="Tillväxtmotorer" />

        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="V. Tillväxtbetyg" 
              val="3/5" 
              progress={60} 
              accentColor={ACCENT} 
            />
          </div>
          <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Estimaten talar tydligt: omsättningstillväxt 8% → 6% → 4% och EPS-tillväxt 2–4% per år. USA och LatAm är reella möjligheter men ännu inte bevisade i siffrorna. Potential räknas inte som leverans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="USA MARKNAD" value="< 20%" trend="Potential" />
          <MetricCard label="LATAM" value="~40 MEUR" trend="Per kvartal" />
          <MetricCard label="REGLERAT" value="47%" trend="Q4/25" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="USA — DET STORA PRISET, ÄNNU EJ INPRISAT" accentColor={ACCENT}>
            Evolution är nu representerat i alla 7 US-stater med online casino. Ezugi återlanserades i New Jersey med målet att bli näst störst. Ny studio planeras i Grand Rapids, Michigan. Online casino i USA är fortfarande under 20% av spelmarknaden jämfört med 50–80% i Europa. Potentialen är enorm men tar tid att materialiseras.
          </Card>
          <Card title="LATINAMERIKA — BRASILIEN ACCELERERAR" accentColor={ACCENT}>
            Brasilien reglerade online-spel 2025 vilket öppnar en av världens folkrikaste marknader. Evolution öppnade studio i São Paulo — en “perfekt timing” enligt VD Carlesund. LatAm växer med +6% YoY i Q3/25 och är nu en stabil pelare på ~40 MEUR per kvartal. Colombia och Mexico öppnar successivt.
          </Card>
          <Card title="HASBRO-EXKLUSIVAVTAL — UNIK IP-DIFFERENTIERING" accentColor={ACCENT}>
            Exklusivt flerårigt licensavtal med Hasbro ingångett i mitten av 2025. Spel under utveckling: MONOPOLY Filthy Rich, Game Night och flera RNG-titlar. Dessa varumärken kan konkurrenter inte replikera — det är en strukturell fördel som stärker moaten ytterligare.
          </Card>
          <Card title="REGLERADE MARKNADER — STRUKTURELL RYGVIND" accentColor={ACCENT}>
            Andel reglerade marknader ökade från 41% (Q4/24) till 47% (Q4/25). Reglerade marknader är mer stabila, förutsägbara och ger lägre long-tail regulatorisk risk. Trenden gynnar Evolution på 3–5 års sikt trots kortsiktig intäktspåverkan av ringfencing.
          </Card>
        </div>
      </section>

      {/* VI. Riskprofil & UKGC */}
      <section id="risk" className="pt-24 space-y-12">
        <SectionHeader number="VI" title="Riskprofil & UKGC" />
        
        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="VI. Riskprofil-betyg (5 = Låg risk)" 
              val="3/5" 
              progress={60} 
              accentColor="#dc2626" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="RISKNIVÅ" value="Medel–Hög" trend="Binär risk" />
          <MetricCard label="RISKBETYG" value="3/5" trend="Inverterad skala" />
          <MetricCard label="FINANSIELL RISK" value="Låg" trend="Noll skulder" />
        </div>

        <AlertBox 
          type="warning"
          title="Binär risk: UK Gambling Commission (UKGC)"
          message="UKGC inledde en granskning av Evolutions maltesiska holdingbolag i december 2024 under sektion 116 av Gambling Act 2005. Utfallet är fortfarande okänt och Evolution samarbetar fullt ut. Risken är binär — antingen böter och åtgärdsplaner, eller licensindragning i värsta fall."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <Card title="CONTAGION-RISK" accentColor="#dc2626">
              Om UKGC drar licensen — vad händer med licenser i USA, Ontario och Malta? Varje jurisdiktion granskar självständigt men en UKGC-sanktion ökar granskningstrycket globalt. Historiskt har regulatorer i New Jersey och Ontario agerat oberoende, men en allvarlig UKGC-dom skapar prejudikat som kan spilla över.
            </Card>
            
            <Card title="VÅR SANNOLIKHETSBEDÖMNING" accentColor="#dc2626">
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span>Fullständig licensindragning</span>
                  <span className="font-bold">5–10%</span>
                </li>
                <li className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span>Betydande böter (50–300 MEUR)</span>
                  <span className="font-bold">30–35%</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span>Liten sanktion eller ingen påföljd</span>
                  <span className="font-bold">55–65%</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground italic">
                Marknaden verkar prisa in det mellersta scenariot tyngre än vi gör — det är den asymmetri vi nyttjar. Investerare med låg risktolerans bör minska positionsstorleken snarare än att avvakta helt.
              </p>
            </Card>
          </div>

          <div className="space-y-8">
            <FinancialTable 
              title="Riskmatris"
              data={riskMatrixData}
              columns={riskMatrixColumns}
              accentColor="#dc2626"
            />
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 text-primary">Asien & Cyberbrottslighet</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Asien: Q4/25 visade QoQ-tillväxt för första gången på länge (189 → 194 MEUR) — ett tecken på att bekämpningsarbetet mot cyberbrottslighet börjar bära frukt.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 text-primary">Finansiell Stabilitet</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Finansiell risk är praktiskt taget obefintlig: noll räntebärande skulder, 818 MEUR i kassa, soliditet 73,8%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VII. Segmentanalys */}
      <section id="segments" className="pt-24 space-y-12">
        <SectionHeader number="VII" title="Segmentanalys" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <MetricCard label="LIVE CASINO ANDEL" value="86%" trend="Kärnprodukt" />
          <MetricCard label="RNG ANDEL" value="14%" trend="Underpresterar" />
        </div>

        <FinancialTable 
          title="Intäkter per geografi (Q4/25)"
          data={segmentData}
          columns={segmentColumns}
          accentColor={ACCENT}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="LIVE CASINO — MOTORN" accentColor={ACCENT}>
            Live casino (1 773 MEUR, 86% av intäkterna) är kärnprodukten med de högsta marginalerna. Det är här Evolutions moat är som starkast och där nätverkseffekterna skapar störst barriärer för konkurrenter.
          </Card>
          <Card title="RNG — UTMANINGEN" accentColor={ACCENT}>
            RNG (294 MEUR, 14%) växer med endast 2,3% och fortsätter att underprestera mot målen. Medan Nolimit City presterar starkt, bidrar övriga RNG-varumärken (NetEnt, Red Tiger) svagt till tillväxten. Ledningen fokuserar på att vända trenden genom tätare integration och nya spelsläpp.
          </Card>
        </div>
      </section>

      {/* VIII. Marginaldjupdykning */}
      <section id="margins" className="pt-24 space-y-12">
        <SectionHeader number="VIII" title="Marginaldjupdykning" />
        
        <div className="p-10 bg-card border border-border rounded-[2.5rem] space-y-6">
          <p className="text-lg leading-relaxed">
            Från 68,4% justerad EBITDA-marginal 2024 till 66,1% 2025 — en minskning med 2,3 procentenheter som representerar ~47 MEUR i “borttappat” EBITDA vid oförändrad omsättning. Det avslöjar en identitetskris: är Evolution ett mjukvarubolag (höga marginaler, skalning utan proportionell kostnadsökning) eller ett personalintensivt tjänsteföretag (varje nytt bord kräver 20–30 croupierer i roterande skift)?
          </p>
        </div>

        <FinancialTable 
          title="Effektivitetstabell"
          data={efficiencyData}
          columns={efficiencyColumns}
          accentColor={ACCENT}
        />

        <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
          <p className="text-sm leading-relaxed text-amber-900/80">
            Tabellen avslöjar problemet tydligt: intäkt per anställd sjunker (-5,3% 2025) medan personalkostnaderna stiger (+8,9%). Det är ett effektivitetsproblem som måste adresseras för att marginaltrenden ska vändas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card title="1. LÖNEINFLATION" accentColor={ACCENT}>
            Personalkostnader ökade +8,9% 2025 mot omsättningstillväxt på +0,2%. Evolutions flesta croupierer sitter i Lettland, Georgien och Malta där lönerna inflationstrycks. “Resource mix optimization” nämns explicit i Q3-rapporten — ledningen är medveten men processen tar tid.
          </Card>
          <Card title="2. REVENUEMIX" accentColor={ACCENT}>
            Snabb tillväxt i Asien och LatAm sker till stor del via aggregatorer — mellanhänder som tar en cut av GGR. Det ger lägre nettomarginal per spel jämfört med Evolutions europeiska direktoperatörer (Bet365, William Hill etc.). Andelen reglerade marknader är strukturellt positivt på lång sikt men innebär kortsiktigt att de historiskt lönsammaste marknaderna tappar andel.
          </Card>
          <Card title="3. RNG-SEGMENTET" accentColor={ACCENT}>
            RNG (294 MEUR, +2,3% 2025) levererar sämre marginal än Live casino och kräver spelstudio-investeringar. Nolimit City är stark, men övriga RNG-varumärken drar ned snittet. Inga tecken på vändning i närtid.
          </Card>
        </div>

        <AlertBox 
          type="info"
          title="Ledningens guide 2026"
          message="EBITDA-marginal i linje med 2025 (66–68%). Ledningen förväntar sig ingen marginalåterhämtning — det är ärligt och sätter realistiska förväntningar. Om marginalerna mot förmodan håller 67%+ under H1/26 är det en positiv överraskning."
        />
      </section>

      {/* IX. Kapitalallokering */}
      <section id="allocation" className="pt-24 space-y-12">
        <SectionHeader number="IX" title="Kapitalallokering" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="FRITT KASSAFLÖDE" value="~1 120 MEUR" trend="FY2025" />
          <MetricCard label="ÅTERKÖP 2025" value="500 MEUR" trend="Genomfört" />
          <MetricCard label="DIREKTAVKASTNING 2026e" value="5,3%" trend="Prognos" />
        </div>

        <div className="p-10 bg-card border border-border rounded-[2.5rem] space-y-6">
          <h3 className="text-2xl font-black tracking-tighter">Kapitalallokeringens psykologi vs. Matematik</h3>
          <p className="text-lg leading-relaxed">
            Att ett moget, kassaflödesstarkt bolag som Evolution helt ställer in utdelningen väcker legitimt oro. Marknaden tolkar ofta det som dolda problem — kommande böter, fryst kassa, eller försvagat kassaflöde.
          </p>
          <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl">
            <p className="text-sm leading-relaxed">
              <strong>Siffrorna dödar den myten:</strong> Operativt kassaflöde 1 255 MEUR minus kapex 135 MEUR ger ~1 120 MEUR fritt kassaflöde. Mer än nog för att betala utdelning (~572 MEUR) och återköp (~500 MEUR) samtidigt. Kassan är inte fryst. Det finns inga dolda likviditetsproblem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="AKTIEÅTERKÖP — LEDNINGENS FAVORITVERKTYG" accentColor={ACCENT}>
            500 MEUR i återköp 2025 till snittpris ~752 SEK. Nuläge ~577 SEK — ledningen köpte dyrare än nuläget, ett tecken på övertygelse om undervärdering. Återköp är skattemässigt effektivare än utdelning och ökar EPS för kvarvarande ägare.
          </Card>
          <Card title="STRATEGISKA FÖRVÄRV (M&A)" accentColor={ACCENT}>
            Galaxy Gaming-förvärv (~85 MUSD) pågår. Nolimit City earn-out betalt. BTG-tilläggsköpeskilling förlängd till 2031 (reducerades med 51,7 MEUR). Kassan är redo för nästa förvärv.
          </Card>
          <Card title="STUDIOEXPANSION" accentColor={ACCENT}>
            Filippinerna, Brasilien, Grand Rapids (Michigan) — toppmoderna studios kräver kapital upfront men genererar intäkter i 10–15 år. Capex 2025: ~135 MEUR, under guidens 140 MEUR — kostnadsmedvetenhet syns i siffrorna.
          </Card>
          <Card title="DEN PSYKOLOGISKA KOSTNADEN" accentColor={ACCENT}>
            Pensionsfonder och utdelningsfonder kräver utdelning för att hålla aktier. Inställd utdelning skapar onödig volatilitet och skrämmer bort defensiva institutionella ägare — oavsett hur rationell matematiken är. Återkomsten av utdelningen 2026e (~30 kr per aktie, 5,3% direktavkastning) är en viktig katalysator för att återlocka dessa ägare.
          </Card>
        </div>
      </section>

      {/* X. ESG & Makro */}
      <section id="esg" className="pt-24 space-y-12">
        <SectionHeader number="X" title="ESG & Makro" />
        
        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="X. ESG & Makro-betyg" 
              val="3/5" 
              progress={60} 
              accentColor={ACCENT} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="ESG-BETYG" value="3/5" trend="Neutral" />
          <MetricCard label="REGLERAT" value="47%" trend="Q4/25" />
          <MetricCard label="INSIDERÄGANDE" value="41,6%" trend="Starkt" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="MILJÖ (E)" accentColor={ACCENT}>
            Energikrävande studionätverk globalt. Neutral ESG-profil — inte en ledstjärna i klimatfrågan men heller inte en flaggstång. Evolution publicerar ESG-rapporter men sektorn som helhet möter strukturella utmaningar med institutionella ESG-investerare.
          </Card>
          <Card title="SOCIALT (S)" accentColor={ACCENT}>
            Spelberoende är en reell samhällsrisk. Bolaget investerar i ansvarsfulla spelverktyg och samarbetar med reglerade operatörer. Ökad andel reglerade marknader (47% Q4/25) är strukturellt positivt för ansvarsfullt spelande och minskar exponeringen mot gråmarknadsproblem.
          </Card>
          <Card title="STYRNING (G)" accentColor={ACCENT}>
            Transparent rapportering, insiderägande 41,6%, aktiv IR-kommunikation med marknaden. Rättsprocessen mot Black Cube och Playtech (stämd för ärekränkning och affärsskada) pågår och förväntas löpa under 2026. Den stärker snarare trovärdigheten — bolaget kämpar för sin rätt.
          </Card>
          <Card title="MAKRO" accentColor={ACCENT}>
            Online casino är relativt konjunkturokänsligt — spel är en form av underhållning som håller sig bra även i svagare ekonomier. Räntorna påverkar inte Evolution direkt (noll räntebärande skuld). EUR-rapportering med global exponering ger naturlig valutadiversifiering. Reglering av nya marknader är en strukturell medvind.
          </Card>
        </div>
      </section>

      {/* XI. AI-observationer */}
      <section id="ai" className="pt-24 space-y-12">
        <SectionHeader number="XI" title="AI-observationer" />
        
        <div className="bg-card border border-border rounded-[2.5rem] p-10">
          <div className="max-w-md">
            <ProgressBar 
              label="XI. AI-observationsbetyg" 
              val="4/5" 
              progress={80} 
              accentColor={ACCENT} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard label="AI-BETYG" value="4/5" trend="Starkt" />
          <MetricCard label="SENTIMENT" value="Positivt" trend="Q4/25" />
          <MetricCard label="KATALYSATOR" value="UKGC" trend="Asymmetrisk" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="SENTIMENT & TONALITET" accentColor={ACCENT}>
            Martin Carlesunds kommunikation har en karakteristisk balans: ärlig om utmaningar (“vi är inte nöjda”), men konsekvent framåtblickande. Formuleringen “stolta, men inte nöjda” i Q4-rapporten är ett sentiment-mönster som historiskt föregått starka återhämtningsperioder för bolaget.
          </Card>
          <Card title="DATAAVVIKELSE: ASIEN Q4" accentColor={ACCENT}>
            Asien visade positiv QoQ-tillväxt för första gången på länge i Q4/25 (från 189 MEUR till 194 MEUR). Detta stämmer inte överens med det fortsatt negativa sentimentet kring regionen — en potentiell positiv avvikelse som marknaden inte fullt ut prisat in.
          </Card>
          <Card title="AKTIEÅTERKÖP SOM INSIDARSIGNAL" accentColor={ACCENT}>
            Ledningen genomförde återköp på 500 MEUR under 2025 till ett genomsnittspris om ~752 SEK/aktie. Nuläget ~577 SEK innebär att ledningen köpte aktier dyrare än nuläget. Det är en av de tydligaste insidarsignalerna om att ledningen bedömer aktien som strukturellt undervärderad.
          </Card>
          <Card title="REGULATORISK KATALYSATOR" accentColor={ACCENT}>
            UKGC-utfallet är den enskilt viktigaste okända faktorn. Ett positivt besked — liten eller ingen sanktion — kan fungera som en stark positiv katalysator. Marknaden prisar i dagsläget in ett negativt scenario med hög vikt, vilket ger asymmetrisk uppsida vid ett bra utfall.
          </Card>
        </div>
      </section>

      {/* XII. Sammanfattning & Investeringsbeslut */}
      <section id="summary" className="pt-24 space-y-12">
        <SectionHeader number="XII" title="Sammanfattning & Investeringsbeslut" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <FinancialTable 
              title="Poängsammanställning"
              data={summaryScores}
              columns={[
                { key: "category", label: "Kategori" },
                { key: "score", label: "Betyg" },
                { key: "max", label: "Maxbetyg" },
              ]}
              accentColor={ACCENT}
            />
            
            <div className="p-8 bg-card border border-border rounded-[2.5rem] space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">Investeringsfrågornas svar</h4>
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-sm mb-1">Är det ett kvalitetsbolag?</p>
                  <p className="text-sm text-muted-foreground">Ja, tveklöst. Evolution är en av de tydligaste moats på börsen med nätverkseffekter, switching costs och regulatoriska barriärer som gör konkurrens nästan omöjlig på kort sikt.</p>
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">Är det rimligt värderat?</p>
                  <p className="text-sm text-muted-foreground">Mer än rimligt — P/E på ~10x för ett bolag som historiskt handlats till 20–30x, med ROE på 26% och stark kassagenerering, ger en bred säkerhetsmarginal.</p>
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">Passar det för 5–10 år?</p>
                  <p className="text-sm text-muted-foreground">Ja, med förbehåll. Global reglering av online-spel är en strukturell megatrend som gynnar Evolution. USA är i sin linda, LatAm accelererar. Men investeraren måste acceptera att EPS-tillväxten de närmaste åren är måttlig (2–4%) och att UKGC-risken är binär och oförutsägbar.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <FinancialTable 
              title="Riskjusterad förväntad avkastning (EV-kalkyl)"
              data={evKalkylData}
              columns={evKalkylColumns}
              accentColor={ACCENT}
            />

            <div className="p-10 bg-primary text-primary-foreground rounded-[2.5rem] space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Rekommendation</div>
                  <h3 className="text-4xl font-black tracking-tighter">KÖP</h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Målpris</div>
                  <div className="text-3xl font-black tracking-tighter">720 SEK</div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                <p className="text-sm leading-relaxed opacity-90">
                  <strong>Motivering:</strong> P/E ~10x för ett kvalitetsbolag med dominerande marknadsposition, 66%+ EBITDA-marginal, nettokassa och strukturella tillväxtmöjligheter i USA och LatAm. UKGC-risken är binär och reell — hantera med positionsstorlek snarare än avvaktning.
                </p>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Tre saker att bevaka:</p>
                  <ul className="text-sm space-y-1 opacity-90 list-disc pl-4">
                    <li>UKGC-utfallet — det viktigaste okända</li>
                    <li>USA och LatAm-tillväxttakt i Q1/26-rapporten (22 april 2026)</li>
                    <li>Om EPS-tillväxt accelererar bortom 2027e-konsensus på 1,8%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* XIII. Scenarier: Bull, Base & Bear Case */}
      <section id="scenarios" className="pt-24 pb-24 space-y-12">
        <SectionHeader number="XIII" title="Scenarier: Bull, Base & Bear Case" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-card border border-border rounded-[2.5rem] space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="flex justify-between items-start">
              <span className="text-4xl">🚀</span>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Bull Case</div>
                <div className="text-2xl font-black tracking-tighter text-emerald-600">880 SEK</div>
                <div className="text-[10px] font-bold text-emerald-600/70">+53% Uppsida</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold border-b border-border pb-2">
                <span className="text-muted-foreground">Sannolikhet</span>
                <span className="text-emerald-600">25%</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Asien normaliseras snabbt och återgår till strukturell tillväxt. USA-expansionen accelererar med Ezugi som stark andraaktör vid sidan av Evolution-varumärket. Hasbro-spelen (MONOPOLY Filthy Rich, Game Night) blir megahits och driver GGR-tillväxt utöver förväntningarna. UKGC-utfallet är litet eller utan påföljd — en börskatalysator. Marginalerna stabiliseras kring 67–68%. Marknaden tilldelar P/E-expansion mot 13–15x när tillväxten bevisas i siffrorna.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card border border-border rounded-[2.5rem] space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="flex justify-between items-start">
              <span className="text-4xl">⚖️</span>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Base Case</div>
                <div className="text-2xl font-black tracking-tighter text-emerald-600">720 SEK</div>
                <div className="text-[10px] font-bold text-emerald-600/70">+25% Uppsida</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold border-b border-border pb-2">
                <span className="text-muted-foreground">Sannolikhet</span>
                <span className="text-emerald-600">55%</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                EPS-tillväxt på 2–4% per år (2026–2028e) i linje med konsensus. Marginalen håller 66–67%. UKGC ger en hanterbar böter (50–150 MEUR) utan licenspåverkan. USA växer stadigt men långsammare än hoppats. LatAm bidrar allt mer. P/E normaliseras mot 11–12x under 12–18 månader. Direktavkastning på 5,3–5,7% ger kursstöd och lockar tillbaka defensiva fonder.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card border border-border rounded-[2.5rem] space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-rose-500/10 transition-colors" />
            <div className="flex justify-between items-start">
              <span className="text-4xl">⚠️</span>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Bear Case</div>
                <div className="text-2xl font-black tracking-tighter text-rose-600">400 SEK</div>
                <div className="text-[10px] font-bold text-rose-600/70">-31% Nedsida</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold border-b border-border pb-2">
                <span className="text-muted-foreground">Sannolikhet</span>
                <span className="text-rose-600">20%</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                UKGC-sanktion med smittorisk till övriga licenser — granskning inleds i Ontario och/eller New Jersey. Asien försämras igen efter kortvarig återhämtning i Q4/25. Marginalerna faller under 58% och bekräftar strukturell press snarare än tillfällig nedgång. EPS-tillväxt uteblir helt. Marknaden kontraherar P/E mot 7–8x. Sänkt guidance för 2026 utlöser kraftig nedgång.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border">
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed italic max-w-4xl">
            Disclaimer: Denna analys är producerad av börsanalys.se och utgör inte finansiell rådgivning. All investering innebär risk och historisk avkastning är ingen garanti för framtida resultat. Analysen baseras på offentliga rapporter och bör kompletteras med din egen research innan investeringsbeslut fattas. Estimat är framtaget ur historiskt perspektiv och framtida beräkningar enligt AI modellen.
            <br />
            börsanalys.se — Carl Fredrik Thor — 21 mars 2026
          </p>
        </div>
      </section>
    </AnalysisLayout>
  );
}
