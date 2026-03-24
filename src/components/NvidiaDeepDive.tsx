import React from 'react';
import { 
  AnalysisLayout, 
  SectionHeader, 
  MetricCard, 
  RatingBox, 
  Card, 
  SwotGrid, 
  ScenarioCards, 
  VerdictBox, 
  ProgressBar,
  ChartCard,
  SpiderChart
} from './analysis';

const ACCENT_COLOR = "#76b900";

const nvidiaData = {
  ticker: "NVDA",
  companyName: "NVIDIA Corporation",
  currentPrice: "~178 USD",
  marketCap: "~4 338 Mdr USD",
  isin: "US67066G1040",
  sector: "Halvledare & AI-infrastruktur",
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 5,
    vardering: 3,
    tillvaxtutsikter: 5,
    riskprofil: 2,
    esgMakro: 3,
    aiObservationer: 4
  }
};

const sections = [
  { id: 'overview', title: 'I. Företagsöversikt', number: 'I' },
  { id: 'strategy', title: 'II. Strategisk analys & Moat', number: 'II' },
  { id: 'financials', title: 'III. Finansiell analys', number: 'III' },
  { id: 'valuation', title: 'IV. Värdering & Jämförelse', number: 'IV' },
  { id: 'growth', title: 'V. Tillväxtmotorer & Triggers', number: 'V' },
  { id: 'risk', title: 'VI. Riskprofil', number: 'VI' },
  { id: 'esg', title: 'VII. ESG & Makro', number: 'VII' },
  { id: 'ai', title: 'VIII. AI-observationer', number: 'VIII' },
  { id: 'summary', title: 'IX. Sammanfattning', number: 'IX' },
  { id: 'scenarios', title: 'X. Scenarier', number: 'X' }
];

interface NvidiaDeepDiveProps {
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
}

export default function NvidiaDeepDive({ 
  isInWatchlist, 
  isWatchlistLoading, 
  onToggleWatchlist 
}: NvidiaDeepDiveProps) {
  const jsonOverview = {
    company: nvidiaData.companyName,
    ticker: nvidiaData.ticker,
    isin: nvidiaData.isin,
    sector: nvidiaData.sector,
    analysis_date: "2026-03-20",
    scores: nvidiaData.scores,
    recommendation: "BEVAKA",
    rating: "32/40 = 80%",
    target_price: "210–220 USD"
  };

  return (
    <AnalysisLayout 
      ticker={nvidiaData.ticker} 
      companyName={nvidiaData.companyName} 
      stockSlug="nvidia"
      accentColor={ACCENT_COLOR}
      sections={sections}
      theme="light"
      isInWatchlist={isInWatchlist}
      isWatchlistLoading={isWatchlistLoading}
      onToggleWatchlist={onToggleWatchlist}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* HEADER INFO */}
        <div className="mb-12 space-y-2">
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            NASDAQ: {nvidiaData.ticker} · ISIN: {nvidiaData.isin} · {nvidiaData.sector}
          </div>
          <h1 className="text-5xl font-serif font-bold tracking-tight">{nvidiaData.companyName}</h1>
        </div>

        {/* SECTION I: FÖRETAGSÖVERSIKT */}
        <section id="overview" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Betyg: {nvidiaData.scores.affarsmodell}/5
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MetricCard label="BÖRSKURS (~)" value={nvidiaData.currentPrice} trend="20 Mars 2026" />
            <MetricCard label="BÖRSVÄRDE" value={nvidiaData.marketCap} trend="Nuvarande" />
            <MetricCard label="P/E (NUVARANDE)" value="36,2x" trend="Trailing" />
            <MetricCard label="P/E 2026E" value="21,6x" trend="Forward" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <Card title="OM BOLAGET" accentColor={ACCENT_COLOR}>
              <p className="leading-relaxed text-sm text-gray-600">
                NVIDIA grundades 1993 av Jensen Huang, Chris Malachowsky och Curtis Priem och är idag världens ledande företag inom accelererad beräkning och AI-infrastruktur. Bolaget är noterat på Nasdaq under ticker NVDA med ett börsvärde runt 4 300 miljarder USD – ett av de tre största bolagen i världen sett till marknadsvärde.
              </p>
              <p className="leading-relaxed text-sm text-gray-600 mt-4">
                Från att ursprungligen ha fokuserat på grafikchip för spel (GPU:er) har NVIDIA byggt upp en dominant position inom datacenters, AI-träning och AI-inferens. Idag genererar Data Center-segmentet ensamt över 90% av bolagets intäkter.
              </p>
            </Card>
            <Card title="BOLAGSDATA" accentColor={ACCENT_COLOR}>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Börs</span>
                  <span className="text-sm font-bold">NASDAQ (NVDA)</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Grundat</span>
                  <span className="text-sm font-bold">1993, Delaware</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">HQ</span>
                  <span className="text-sm font-bold">Santa Clara, CA</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Anställda</span>
                  <span className="text-sm font-bold">~42 000 (FY2026)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Räkenskapsår</span>
                  <span className="text-sm font-bold">Avslutas januari</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <Card title="GEOGRAFISK SPRIDNING (FY2026 Q2)" accentColor={ACCENT_COLOR}>
              <div className="space-y-4">
                <ProgressBar label="USA" val="~50%" progress={50} accentColor={ACCENT_COLOR} />
                <ProgressBar label="Singapore (fakturering)" val="~22%" progress={22} accentColor={ACCENT_COLOR} />
                <ProgressBar label="Taiwan" val="~17%" progress={17} accentColor={ACCENT_COLOR} />
                <ProgressBar label="Kina inkl. HK" val="~6%" progress={6} accentColor="#ef4444" />
                <ProgressBar label="Övriga" val="~5%" progress={5} accentColor="#94a3b8" />
              </div>
            </Card>
            
            <Card title="AFFÄRSIDÉ & AFFÄRSMODELL" accentColor={ACCENT_COLOR}>
              <p className="leading-relaxed text-sm text-gray-600">
                NVIDIAs kärnidé är att tillhandahålla hårdvara, mjukvara och plattformar som dramatiskt påskyndar beräkningsintensiva arbetsuppgifter – från att träna stora AI-modeller till att köra dem i realtid (inferens). Tänk på det som att NVIDIA säljer "spaden" i AI-guldruschen.
              </p>
              <p className="leading-relaxed text-sm text-gray-600 mt-4">
                Intäktsmodellen bygger på hårdvara (GPU:er, nätverkschip, servrar), men NVIDIA har successivt byggt ett ekosystem av mjukvara och tjänster runt sin CUDA-plattform. Det skapar höga byteskostnader (switching costs): när ett företag byggt sin AI-infrastruktur på CUDA är det kostsamt och tidskrävande att byta leverantör.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <Card title="ENKELT FÖRKLARAT" accentColor={ACCENT_COLOR}>
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-sm text-emerald-800 leading-relaxed italic">
                  NVIDIA säljer de kraftfulla chip som krävs för att träna och köra AI. ChatGPT, Gemini, Claude och de flesta andra stora AI-modeller tränas på NVIDIA-hårdvara. Det gör NVIDIA till ryggraden i AI-revolutionen.
                </p>
              </div>
            </Card>
            
            <Card title="LEDNING & ÄGARSTRUKTUR" accentColor={ACCENT_COLOR}>
              <p className="leading-relaxed text-sm text-gray-600 mb-4">
                Jensen Huang, grundare och VD, har lett bolaget sedan starten 1993 och äger en betydande andel av aktierna – ett tydligt tecken på att han har "skin in the game".
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Insiderägande (FY2026)</span>
                  <span className="text-sm font-bold">~3,8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Största ägare</span>
                  <span className="text-sm font-bold">Vanguard, BlackRock</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-10">
            <SpiderChart scores={nvidiaData.scores} accentColor={ACCENT_COLOR} />
          </div>
        </section>

        {/* SECTION II: STRATEGISK ANALYS & MOAT */}
        <section id="strategy" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              ⭐ 5/5
            </div>
          </div>
          
          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600 italic">
                NVIDIAs konkurrensfördelar är exceptionella och sannolikt de starkaste inom halvledarsektorn. Det handlar inte om en enskild fördel utan om ett helt ekosystem av sammanlänkade vallgravar som förstärker varandra.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="TEKNOLOGISK LEDNING" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Blackwell Ultra-plattformen dominerar AI-inferens</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Vera Rubin-plattformen på väg (nästa generations)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> NVLink-arkitektur för GPU-kluster</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> 30+ år av GPU-optimering – svår att kopiera snabbt</li>
              </ul>
            </Card>
            <Card title="CUDA-EKOSYSTEMET" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Över 5 miljoner CUDA-utvecklare globalt</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Tusentals bibliotek och ramverk byggda för CUDA</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Extrema byteskostnader för kunder</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> 20+ år av ekosystemsuppbyggnad</li>
              </ul>
            </Card>
            <Card title="NÄTVERKSEFFEKTER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Fler användare → fler ramverk → fler användare</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Standardplattform för AI-forskning</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Strategiska partnerskap: AWS, Google, Azure, Meta</li>
              </ul>
            </Card>
            <Card title="SKALFÖRDELAR" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> R&D på $18,5 mdr FY2026 – mångdubbelt mer än konkurrenter</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Produktcykel ned till 1 år (Blackwell → Rubin)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Volymer som sänker tillverkningskostnad per enhet</li>
              </ul>
            </Card>
          </div>

          <div className="mb-10">
            <Card title="MARKNADSLÄGE" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                AI-infrastrukturmarknaden befinner sig i en explosiv tillväxtfas. De stora molntjänstleverantörerna – Amazon AWS, Microsoft Azure, Google Cloud och Oracle – investerar hundratals miljarder dollar i att bygga ut AI-datacenter. I Q4 FY2026 stod stora molnbolag ensamma för ungefär hälften av NVIDIAs datacenter-intäkter på rekordnivån 62,3 miljarder USD.
              </p>
            </Card>
          </div>

          <SwotGrid data={{
            strengths: [
              "Dominerande marknadsandel i AI-GPU:er",
              "CUDA-monopol i praktiken",
              "Exceptionell lönsamhet (55%+ nettomarginal)",
              "Starka partnerskap med hyperscalers",
              "Visionaries VD med lång track record"
            ],
            weaknesses: [
              "Extremt beroende av TSMC för tillverkning",
              "Stark koncentration till Data Center (~90%)",
              "Hög kundkoncentration (topp 2 = 39% av intäkterna)",
              "H20-incident visade sårbarhet för exportkontroller"
            ],
            opportunities: [
              "Agentic AI – ny stor marknad som exploderar",
              "Fysisk AI & robotik (Cosmos, Isaac)",
              "Autonoma fordon (DRIVE-plattformen)",
              "Läkemedelsupptäckt via AI (BioNeMo)",
              "Sovereign AI – länder bygger egna AI-fabriker"
            ],
            threats: [
              "AMD, Intel och egentillverkade chip (Apple, Google TPU)",
              "Kinesiska konkurrenter (Huawei Ascend)",
              "Ökande exportrestriktioner från USA",
              "Open-source AI kan minska beräkningsbehov",
              "Kunderna bygger egna chip (Microsoft, Google, Amazon)"
            ]
          }} />

          <div className="mt-10">
            <RatingBox 
              rating={nvidiaData.scores.strategiskMoat} 
              description="5/5 — NVIDIAs vallgrav är en av de djupaste i teknikvärlden, bestående av både överlägsen hårdvara och det oumbärliga CUDA-ekosystemet." 
            />
          </div>
        </section>

        {/* SECTION III: FINANSIELL ANALYS */}
        <section id="financials" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              ⭐ 5/5
            </div>
          </div>

          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIAs finansiella utveckling de senaste åren är närmast historielös för ett bolag i denna storleksklass. Intäkterna ökade med 65% under FY2026 till 215,9 miljarder USD – ett belopp som är större än de flesta länders BNP. Lönsamheten är på toppnivå globalt.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ChartCard 
              title="Omsättning & EBIT (Mdr USD)" 
              type="bar" 
              data={{
                labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
                datasets: [
                  {
                    label: 'Omsättning',
                    data: [130.5, 215.9, 365.6, 480.7],
                    backgroundColor: ACCENT_COLOR,
                    borderRadius: 4,
                  },
                  {
                    label: 'EBIT',
                    data: [81.5, 130.4, 240.8, 318.2],
                    backgroundColor: '#1a1a1a',
                    borderRadius: 4,
                  }
                ]
              }} 
            />
            <ChartCard 
              title="Vinst per aktie (EPS, USD)" 
              type="line" 
              data={{
                labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
                datasets: [{
                  label: 'EPS',
                  data: [2.96, 4.92, 8.28, 11.11],
                  borderColor: ACCENT_COLOR,
                  backgroundColor: 'rgba(118,185,0,0.05)',
                  fill: true,
                  tension: 0.3
                }]
              }} 
            />
          </div>

          <div className="mb-10 overflow-x-auto">
            <Card title="RESULTATRÄKNING – NYCKELTAL" accentColor={ACCENT_COLOR}>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">Mått</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2024</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2025</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2026e</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2027e</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="py-3 text-gray-600">Omsättning (Mdr USD)</td>
                    <td className="py-3">130,5</td>
                    <td className="py-3 font-bold text-emerald-600">215,9</td>
                    <td className="py-3 font-bold text-emerald-600">365,6</td>
                    <td className="py-3 font-bold text-emerald-600">480,7</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">EBIT (Mdr USD)</td>
                    <td className="py-3">81,5</td>
                    <td className="py-3">130,4</td>
                    <td className="py-3">240,8</td>
                    <td className="py-3">318,2</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Nettoresultat (Mdr USD)</td>
                    <td className="py-3">72,9</td>
                    <td className="py-3">120,1</td>
                    <td className="py-3">199,9</td>
                    <td className="py-3">264,1</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Vinst per aktie (EPS)</td>
                    <td className="py-3">2,96</td>
                    <td className="py-3">4,92</td>
                    <td className="py-3 font-bold text-emerald-600">8,28</td>
                    <td className="py-3 font-bold text-emerald-600">11,11</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Rörelsemarginal</td>
                    <td className="py-3">62,4%</td>
                    <td className="py-3">60,4%</td>
                    <td className="py-3 text-gray-400 italic">~65%e</td>
                    <td className="py-3 text-gray-400 italic">~66%e</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Nettomarginal</td>
                    <td className="py-3">55,9%</td>
                    <td className="py-3">55,6%</td>
                    <td className="py-3 text-gray-400 italic">~54%e</td>
                    <td className="py-3 text-gray-400 italic">~55%e</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ChartCard 
              title="Marginaler (%) – EBIT & Netto" 
              type="line" 
              data={{
                labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
                datasets: [
                  {
                    label: 'EBIT-marginal',
                    data: [62.4, 60.4, 65, 66],
                    borderColor: ACCENT_COLOR,
                    tension: 0.3
                  },
                  {
                    label: 'Nettomarginal',
                    data: [55.9, 55.6, 54, 55],
                    borderColor: '#3b82f6',
                    tension: 0.3
                  }
                ]
              }} 
            />
            <div className="flex flex-col justify-center">
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">Vad betyder marginalerna?</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  En rörelsemarginal på 60%+ innebär att av varje 100 kr NVIDIA tjänar i intäkter behåller bolaget 60 kr efter att ha betalat sina rörelsekostnader. Det är extremt högt – till järelse har ett vanligt tillverkningsbolag ofta 5–15%.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <Card title="BALANSRÄKNING & KASSAFLÖDE" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600 mb-6">
                NVIDIA är i en exceptionell finansiell position. Vid utgången av FY2026 hade bolaget 62,6 miljarder USD i kassa och värdepapper mot en nettoskuld som i praktiken är minimal (långfristiga skulder på 7,5 mdr USD). Det fria kassaflödet uppgick till 96,6 miljarder USD under FY2026 – pengar som bolaget kan använda för återköp, utdelningar och investeringar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChartCard 
                  title="Kassaflöde – Operativt (Mdr USD)" 
                  type="bar" 
                  data={{
                    labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
                    datasets: [{
                      label: 'Operativt Kassaflöde',
                      data: [40, 60, 96.6, 120],
                      backgroundColor: ACCENT_COLOR,
                      borderRadius: 4,
                    }]
                  }} 
                />
                <div className="space-y-4">
                  <div className="p-4 bg-black/5 rounded-xl">
                    <div className="text-[10px] text-gray-400 uppercase mb-1">Kassa & Värdepapper</div>
                    <div className="text-xl font-bold">$62.6B</div>
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl">
                    <div className="text-[10px] text-gray-400 uppercase mb-1">Fritt Kassaflöde (FY26)</div>
                    <div className="text-xl font-bold text-emerald-600">$96.6B</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-10">
            <Card title="LÖNSAMHETSNYCKELTAL" accentColor={ACCENT_COLOR}>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">Nyckeltal</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2024</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2025</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">Kommentar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="py-3 text-gray-600">ROE (avkastning på eget kapital)</td>
                    <td className="py-3">119%</td>
                    <td className="py-3 font-bold text-emerald-600">101%</td>
                    <td className="py-3 text-xs text-gray-500">Extremt högt – branschnorm ~15–25%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">ROCE</td>
                    <td className="py-3">119%</td>
                    <td className="py-3">101%</td>
                    <td className="py-3 text-xs text-gray-500">Kapitalet arbetar mycket effektivt</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">ROIC</td>
                    <td className="py-3">103%</td>
                    <td className="py-3">94%</td>
                    <td className="py-3 text-xs text-gray-500">Varje investerad krona ger nästan 1 kr tillbaka</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">ROA (avkastning på tillgångar)</td>
                    <td className="py-3">82%</td>
                    <td className="py-3">75%</td>
                    <td className="py-3 text-xs text-gray-500">Exceptionellt för ett tillgångsintensivt bolag</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <h4 className="text-sm font-bold text-emerald-900 mb-2">Förenklat</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  ROE på 101% betyder att för varje 100 kr aktieägarna har investerat genererar NVIDIA 101 kr i vinst per år. Det är närmast unikt och visar att bolaget inte behöver binda mycket kapital för att producera enorma vinster.
                </p>
              </div>
            </Card>
          </div>

          <div className="mb-10">
            <Card title="KAPITALÅTERFÖRING TILL AKTIEÄGARE" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                Under FY2026 återförde NVIDIA 41,1 miljarder USD till aktieägarna via aktieåterköp och utdelningar. Styrelsen godkände i augusti 2025 ytterligare 60 miljarder USD i återköpsmandat. Utdelningen är symbolisk (0,04 USD/aktie), men bolagets verkliga kapitalåterföring sker primärt via återköp – vilket ökar värdet per kvarvarande aktie.
              </p>
            </Card>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.finansiellKvalitet} 
            description="5/5 — Finansiellt i en klass för sig med extrem kassaflödesgenerering och marginaler som saknar motstycke för ett bolag av denna storlek." 
          />
        </section>

        {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
        <section id="valuation" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-amber-50 border border-amber-100 rounded text-[10px] font-bold text-amber-600 uppercase tracking-wider">
              ⭐ 3/5
            </div>
          </div>

          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                Värderingen är den punkt där NVIDIA delar investerarkollektivet. Bolaget är onekligen dyrt i absoluta tal, men till skillnad från många högt värderade bolag backas priset upp av en faktisk och explosiv vinsttillväxt.
              </p>
            </Card>
          </div>

          <div className="mb-10">
            <ChartCard 
              title="P/E-talets utveckling – Historiskt och estimat (forward)" 
              type="line" 
              data={{
                labels: ['FY2024', 'FY2025', 'Nuvarande', '2026e', '2027e'],
                datasets: [{
                  label: 'P/E-tal',
                  data: [48.5, 38.3, 36.2, 21.6, 16.1],
                  borderColor: ACCENT_COLOR,
                  backgroundColor: 'rgba(118,185,0,0.05)',
                  fill: true,
                  tension: 0.3
                }]
              }} 
            />
          </div>

          <div className="mb-10 overflow-x-auto">
            <Card title="VÄRDERINGSMULTIPLAR" accentColor={ACCENT_COLOR}>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">Multipel</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2024</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">FY2025</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">Nuvarande</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">2026e</th>
                    <th className="py-3 font-mono text-[10px] text-gray-400 uppercase">2027e</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="py-3 text-gray-600">P/E</td>
                    <td className="py-3">48,5x</td>
                    <td className="py-3">38,3x</td>
                    <td className="py-3">36,2x</td>
                    <td className="py-3 font-bold text-emerald-600">21,6x</td>
                    <td className="py-3 font-bold text-emerald-600">16,1x</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">EV/EBIT</td>
                    <td className="py-3">43,0x</td>
                    <td className="py-3">34,9x</td>
                    <td className="py-3">34,8x</td>
                    <td className="py-3 text-gray-400">–</td>
                    <td className="py-3 text-gray-400">–</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">EV/EBITDA</td>
                    <td className="py-3">42,0x</td>
                    <td className="py-3">34,1x</td>
                    <td className="py-3">34,0x</td>
                    <td className="py-3 text-gray-400">–</td>
                    <td className="py-3 text-gray-400">–</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">P/S</td>
                    <td className="py-3">27,1x</td>
                    <td className="py-3">21,3x</td>
                    <td className="py-3">20,3x</td>
                    <td className="py-3 text-gray-400">–</td>
                    <td className="py-3 text-gray-400">–</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Direktavkastning</td>
                    <td className="py-3">0,02%</td>
                    <td className="py-3">0,02%</td>
                    <td className="py-3">0,02%</td>
                    <td className="py-3">0,03%</td>
                    <td className="py-3">0,08%</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <div className="mb-10 p-6 bg-amber-50 border border-amber-100 rounded-2xl">
            <h4 className="text-sm font-bold text-amber-900 mb-2">Värderingsanalys</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Det P/E-tal som ser dyrt ut idag (36x) faller dramatiskt när man tar hänsyn till analytikernas vinstestimat. Om estimaten håller handlas aktien på P/E 16x på 2027 års vinster – det är i linje med eller under snittet för S&P 500. Frågan är om estimaten håller.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-sm leading-relaxed text-gray-600">
              PEG-talet (P/E delat på vinsttillväxt) är ett bättre mått för snabbväxande bolag. Med en EPS-tillväxt på ~70% och P/E 36x ger det ett PEG under 0,5x – under 1,0x brukar generellt betraktas som attraktivt. Det antyder att aktien inte är så dyr som den ser ut vid en snabb titt.
            </p>
            <p className="text-xs italic text-gray-400">
              PEG-tal: Om P/E är 36 och vinsttillväxten är 70% per år, PEG = 36/70 = 0,51. Under 1,0 anses ofta "billigt" i relation till tillväxten.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.vardering} 
            description="3/5 — Värderingen är ansträngd men givet tillväxten framstår P/E 21x på 2026 års estimat som rimligt för ett bolag med denna marknadsposition." 
          />
        </section>

        {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
        <section id="growth" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              ⭐ 5/5
            </div>
          </div>

          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIAs tillväxt drivs av flera parallella megatrender som förstärker varandra. Det är sällsynt att ett bolag har så många och starka strukturella medvindar simultaneously.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="AGENTIC AI – NY TILLVÄXTVÅG" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> AI-agenter som fattar beslut autonomt kräver massiv inferenskapacitet</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Jensen Huang: "Enterprise adoption of agents is skyrocketing"</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Inferens kräver mer GPU-kapacitet per användare än träning</li>
              </ul>
            </Card>
            <Card title="BLACKWELL ULTRA & VERA RUBIN" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Blackwell Ultra: 50x bättre inferensprestanda vs Hopper</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Vera Rubin: nästa plattform, ytterligare 10x lägre kostnad/token</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Ettårigt produktcykelschema håller NVIDIA steget före</li>
              </ul>
            </Card>
            <Card title="FYSISK AI & ROBOTIK" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> NVIDIA Cosmos – plattform för fysisk AI och robotutveckling</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Isaac GR00T – open-source modell för humanoidrobotar</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Partners: Boston Dynamics, Caterpillar, LG, Franka Robotics</li>
              </ul>
            </Card>
            <Card title="AUTONOMA FORDON & HÄLSOVÅRD" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> DRIVE Thor-plattformen: BYD, XPENG, Lucid m.fl.</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Partnerskap med Mercedes-Benz (CLA-modellen)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> BioNeMo: AI för läkemedelsupptäckt (Lilly-partnerskap)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Sovereign AI: länder bygger egna nationella AI-fabriker</li>
              </ul>
            </Card>
          </div>

          <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <h4 className="text-sm font-bold text-emerald-900 mb-2">Q1 FY2027-guidning</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              <strong>Q1 FY2027-guidning:</strong> NVIDIA guidar för 78 miljarder USD i intäkter för Q1 FY2027 – upp från 68,1 miljarder i Q4 FY2026. Det indikerar fortsatt stark tillväxt och tyder på att efterfrågan är robust. Notera att bolaget inte räknar med någon intäkt från Kina i sin prognos.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.tillvaxtutsikter} 
            description="5/5 — AI-revolutionen är bara i sin början med Sovereign AI och Blackwell-arkitekturen som starka framtida tillväxtdrivare." 
          />
        </section>

        {/* SECTION VI: RISKPROFIL */}
        <section id="risk" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-red-50 border border-red-100 rounded text-[10px] font-bold text-red-600 uppercase tracking-wider">
              ⚠️ 2/5 (inverterad)
            </div>
          </div>

          <div className="mb-10 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <h4 className="text-sm font-bold text-red-900 mb-2">Obs: Riskbetyget är inverterat</h4>
            <p className="text-xs text-red-800 leading-relaxed">
              <strong>Obs:</strong> Riskbetyget är inverterat – 5 = låg risk, 1 = hög risk. NVIDIA får 2/5, vilket speglar att bolaget har betydande men hanterbara risker trots sin starka position.
            </p>
          </div>

          <div className="mb-10">
            <Card title="EXPORTKONTROLLER & GEOPOLITIK – DEN VIKTIGASTE RISKEN" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600 mb-4">
                Den enskilt största risken för NVIDIA är USA:s exportrestriktioner mot Kina. I april 2025 tvingades NVIDIA skriva ner H20-lager med 4,5 miljarder USD när USA kräver licens för export av H20 till Kina. Kina är en av de snabbast växande AI-marknaderna och NVIDIA har i praktiken stängts ute från datacenter-segmentet där. Bolaget anger explicit i sin Q1 FY2027-guidning att ingen Kinaförsäljning är inräknad.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="REGULATORISKA RISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> Löpande exportrestriktioner kan utvidgas</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> EU AI Act – potentiell påverkan på AI-distribution</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Antitrust-utredningar i EU, USA, Sydkorea, Japan</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Tariffrisker i global leveranskedja</li>
              </ul>
            </Card>
            <Card title="OPERATIVA RISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> Fabless-modell: beroende av TSMC (Taiwan)</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Taiwan-risken om geopolitisk konflikt uppstår</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Kundkoncentration: 2 kunder = 39% av Q2-intäkterna</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Snabba produktövergångar skapar lagerrisk</li>
              </ul>
            </Card>
            <Card title="KONKURRENSRISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> AMD MI300-serien vinner mark inom AI-inferens</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Googles TPU, Amazons Trainium – egna chip</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Open-source AI kan minska beräkningsbehov per token</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> DeepSeek-effekten: mer effektiva modeller</li>
              </ul>
            </Card>
            <Card title="MAKRORISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> AI-investeringscykel kan vändas om ROI inte levereras</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Ränteförändringar påverkar högt värderade bolag</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Energibrist kan begränsa datacenterutbyggnad</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Rättsprocesser (pågående SEC-relaterade mål)</li>
              </ul>
            </Card>
          </div>

          <div className="mb-10">
            <p className="text-sm leading-relaxed text-gray-600">
              Risknivå sammanfattning: <strong>Hög</strong> – inte för att bolaget är svagt, utan för att det är ett högt värderat bolag i en bransch med snabb teknologiutveckling, geopolitisk exponering och regulatorisk osäkerhet.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.riskprofil} 
            description="2/5 — (Inverterat betyg: 2 innebär hög risk). Geopolitiskt beroende av Taiwan och TSMC utgör en betydande 'single point of failure'." 
          />
        </section>

        {/* SECTION VII: ESG & MAKRO */}
        <section id="esg" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="VII" title="ESG & MAKRO" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              ⭐ 3/5
            </div>
          </div>

          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIAs ESG-profil är blandad. Å ena sidan är bolaget en ledande aktör i att möjliggöra energieffektiv AI-beräkning – deras GPU:er levererar dramatiskt mer prestanda per watt jämfört med äldre lösningar. Å andra sidan är datacenter en av de snabbast växande förbrukarna av el globalt, och AI-träning och inferens är energiintensiva processer.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="MILJÖ (E)" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Energieffektivitetsledare (Grace Hopper topp Green500)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Indirekt hög energiförbrukning via kundernas datacenter</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Earth-2: öppna klimatmodeller för väder och klimat</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Planerar utöka USA-baserad tillverkning</li>
              </ul>
            </Card>
            <Card title="SOCIALT & STYRNING (S/G)" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Stark bolagsstyrning med erfaret styre</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Jensen Huang – transparens och tydlig vision</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Hög aktiebaserad kompensation (~6,4 mdr USD FY2026)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Pågående rättsprocesser (aktieklass-mål från 2018)</li>
              </ul>
            </Card>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Makropåverkan</h3>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIA gynnas kraftigt av den globala megatrenden mot AI-digitalisering. Hyperscalers investerar hundratals miljarder per år i AI-infrastruktur och NVIDIA är den primära leverantören. Sovereign AI – länder som vill ha egna nationella AI-kapaciteter – är en ny och växande marknad som öppnar sig parallellt.
              </p>
              <p className="text-sm leading-relaxed text-gray-600">
                Negativa makrofaktorer inkluderar geopolitiska spänningar (speciellt USA-Kina), potentiell AI-bubble-oro om investeringscykeln vänder, samt energiinfrastrukturens kapacitetsbegränsningar som kan bromsa datacenter-utbyggnad.
              </p>
            </div>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.esgMakro} 
            description="3/5 — Fokus på energieffektivitet i chip-design är centralt, men energifrågan för datacenter förblir en utmaning för hela sektorn." 
          />
        </section>

        {/* SECTION VIII: AI-OBSERVATIONER */}
        <section id="ai" className="scroll-mt-24 mb-20">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader number="VIII" title="AI-OBSERVATIONER 🔍" accentColor={ACCENT_COLOR} />
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              ⭐ 4/5
            </div>
          </div>

          <div className="mb-10">
            <Card accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                Sentimentet kring NVIDIA är fortsatt övervägande positivt bland analytiker och institutionella investerare, men det finns intressanta signaler att ta upp:
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="POSITIVA SIGNALER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Q4 FY2026 slog estimat med god marginal</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Q1 FY2027-guidning på 78 mdr USD (vs estimat ~73 mdr)</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Återköpsprogram på 71 mdr USD indikerar ledningens tilltro</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Meta-partnerskap: "miljoner Blackwell och Rubin GPU:er"</li>
                <li className="flex gap-2"><span className="text-emerald-500">•</span> Anthropic-investering – strategisk positionering</li>
              </ul>
            </Card>
            <Card title="VARNINGSSIGNALER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> Bruttomarginal föll från 75% till 71% under FY2026 (Blackwell-övergång)</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Lageruppbyggnad: inventarier steg från 10 till 21 mdr USD</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Produktövergångar skapar ofta temporär lagerrisk</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> En direktör sålde aktier (A. Brooke Seawell, juli 2025)</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> H20-fallet visar hur snabbt regulatoriska beslut kan påverka</li>
              </ul>
            </Card>
          </div>

          <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <h4 className="text-sm font-bold text-blue-900 mb-2">Mönsteranalys</h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Mönsteranalys:</strong> NVIDIA har konsekvent guidat konservativt och sedan slagit sina egna prognoser. I Q2 FY2025 guidade bolaget 28 mdr USD och levererade 30 mdr. Q4 FY2026: intäkter på 68,1 mdr mot guidning 37,5 mdr. Det skapar en "beat-and-raise"-kultur som historiskt drivit aktien. Om det mönstret bryts bör det tas som ett allvarligt varningstecken.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.aiObservationer} 
            description="4/5 — Dominant inom både träning och inferens. Blackwell och Spectrum-X stärker positionen ytterligare." 
          />
        </section>

        {/* SECTION IX: SAMMANFATTNING & INVESTERINGSBESLUT */}
        <section id="summary" className="scroll-mt-24 mb-20">
          <SectionHeader number="IX" title="SAMMANFATTNING & INVESTERINGSBESLUT" accentColor={ACCENT_COLOR} />
          
          <div className="flex flex-col md:flex-row gap-8 items-center bg-black/5 p-8 rounded-3xl mb-12">
            <div className="text-6xl font-serif font-bold text-[#1a1a1a]">32</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">av 40 möjliga poäng</h3>
              <p className="text-sm text-gray-500">Rating: 80% &nbsp;·&nbsp; Sektioner I–VIII summerade</p>
              <p className="text-xs font-mono text-gray-400 mt-2">5+5+5+3+5+2+3+4 = 32/40</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Är NVIDIA ett kvalitetsbolag?</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Utan tvekan ja. NVIDIA är ett av de finaste bolag som existerar ur ett kvalitetsperspektiv: exceptionell affärsmodell, dominant moat, unik teknik, visionär VD och finansiella nyckeltal som hör till de bästa i världen. Bolaget växer omsättningen med 65% och har en nettomarginal på 55% – det är extremt ovanligt för ett bolag i denna storlek.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Är det rimligt värderat?</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Det beror på tidshorisonten. På dagens multiplar (P/E ~36x) är aktien inte billig i absoluta termer. Men om estimaten för FY2026-FY2027 håller – EPS på 8,28 respektive 11,11 USD – faller P/E-talet snabbt till mer rimliga nivåer. Risken är att estimaten är för optimistiska, speciellt om AI-investeringscykeln bromsar eller om fler exportrestriktioner träder i kraft.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Passar för 5–10 år?</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Ja, för en långsiktig investerare med risktolerans är NVIDIA ett av de starkaste strukturella casen på börsen. AI är inte en kortlivad trend – det är en industriell revolution. NVIDIA är positionerat som ryggraden i denna infrastruktur. Den som köper idag och håller 5–10 år har goda förutsättningar att se stark avkastning, men måste vara beredd på volatilitet längs vägen.
              </p>
            </div>
          </div>

          <VerdictBox 
            verdict="BEVAKA" 
            target="210–220 USD" 
            description="Exceptionellt bolag med hög värdering och reella risker." 
            date="2026-03-20"
            accentColor={ACCENT_COLOR}
          />

          <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <p className="text-sm leading-relaxed text-emerald-900">
              Vi rekommenderar att bevaka aktien vid kurskorrigeringar, speciellt om P/E på forward 12 månader faller under 20x eller om ny negativ regulatorisk nyhet driver ned kursen temporärt. För den som redan äger NVIDIA är caset intakt – men att köpa på nuvarande nivåer kräver övertygelse om att AI-investeringarna håller i sig.
            </p>
          </div>
        </section>

        {/* SECTION X: SCENARIER */}
        <section id="scenarios" className="scroll-mt-24 mb-32">
          <SectionHeader number="X" title="SCENARIER: BULL, BASE & BEAR CASE 📈📉" accentColor={ACCENT_COLOR} />
          
          <div className="mb-10">
            <ScenarioCards scenarios={[
              {
                type: 'bull',
                icon: '🚀',
                title: 'BULL CASE',
                probability: '25%',
                price: '280–320 USD',
                change: '+57%–80% Potential',
                description: 'AI-investeringarna accelererar ytterligare. Agentic AI och fysisk AI skapar ny massiv efterfrågan. Vera Rubin-plattformen lanseras med stor framgång. Exportrestriktioner lättas och Kina-marknaden öppnas delvis. Bolaget levererar över estimat, P/E komprimeras inte och marknaden belönar tillväxten med premiumvärdering. Utdelning börjar växa snabbare.'
              },
              {
                type: 'base',
                icon: '📊',
                title: 'BASE CASE',
                probability: '55%',
                price: '210–220 USD',
                change: '+18%–24% Potential',
                description: 'Stabil tillväxt i linje med estimaten. FY2027 EPS når 10–11 USD. P/E komprimeras sakta mot 18–20x på forward-basis. Exportrestriktionerna består men expanderar inte. Blackwell Ultra och Vera Rubin levererar som utlovat. Aktiekursen stiger gradvis i takt med vinsttillväxten. Återköpsprogrammet fortsätter ge stöd.'
              },
              {
                type: 'bear',
                icon: '📉',
                title: 'BEAR CASE',
                probability: '20%',
                price: '100–130 USD',
                change: '-27%–44% Risk',
                description: 'AI-investeringscykeln inbromsas. Hyperscalers drar ned CAPEX kraftigt. Open-source AI minskar beräkningsbehov drastiskt. USA utvidgar exportrestriktioner till fler marknader. Kunderna börjar använda egenutvecklade chip i ökad utsträckning. Bruttomarginal pressas ned av Blackwell-systemkomplexitet. P/E komprimeras till 12–15x på nedreviderade estimat.'
              }
            ]} />
          </div>

          <div className="mb-10">
            <ChartCard 
              title="Scenarioprisintervall (USD per aktie)" 
              type="bar" 
              data={{
                labels: ['Bear Case', 'Nuvarande kurs', 'Base Case', 'Bull Case'],
                datasets: [{
                  label: 'Kurs (USD)',
                  data: [115, 178, 215, 300],
                  backgroundColor: [
                    'rgba(224,82,82,0.7)',
                    'rgba(136,136,136,0.7)',
                    'rgba(82,168,224,0.7)',
                    'rgba(118,185,0,0.7)'
                  ],
                  borderColor: ['#e05252','#888','#52a8e0','#76b900'],
                  borderWidth: 1,
                  borderRadius: 6
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw} USD` } }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: '#9ca3af', font: { family: 'monospace', size: 10 } }
                  },
                  y: {
                    min: 0,
                    max: 350,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { 
                      color: '#9ca3af', 
                      font: { family: 'monospace', size: 10 },
                      callback: (v: any) => '$' + v
                    }
                  }
                }
              }}
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 pt-12 border-t border-black/5 pb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-900">Analys av Carl Fredrik Thor</div>
              <div className="text-xs text-gray-400 font-mono uppercase tracking-widest">börsanalys.se · 20 mars 2026</div>
            </div>
            <div className="max-w-md text-[10px] text-gray-400 leading-relaxed text-left md:text-right">
              Denna analys är inte finansiell rådgivning. Investering innebär alltid risk och historisk avkastning är ingen garanti för framtida avkastning. Gör alltid din egen analys innan du fattar investeringsbeslut.
            </div>
          </div>
        </footer>
      </div>
    </AnalysisLayout>
  );
}
