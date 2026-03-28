import React, { useState, useEffect } from 'react';
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
  ChartCard
} from './index';
import { fetchWithCache } from '../../services/stockService';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Target, Wallet, Info, Zap } from 'lucide-react';

const ACCENT_COLOR = "#10B981"; // Emerald green

const investorData = {
  ticker: "INVE-B.ST",
  companyName: "Investor AB",
  analysisPrice: 330.40,
  marketCap: "~1 010 mdr kr",
  nav: "355 kr",
  totalNav: "1 087 mdr kr",
  discount: "−7%",
  sector: "Investmentbolag",
  scores: {
    affarsmodell: 5,
    strategiskMoat: 5,
    finansiellKvalitet: 4,
    vardering: 4,
    tillvaxtutsikter: 4,
    riskprofil: 4,
    esgMakro: 4,
    aiObservationer: 3
  }
};

const sections = [
  { id: 'overview', title: 'I. Företagsöversikt', number: 'I' },
  { id: 'strategy', title: 'II. Portföljanalys & Strategi', number: 'II' },
  { id: 'financials', title: 'III. Finansiell analys', number: 'III' },
  { id: 'valuation', title: 'IV. Värdering & Substansvärde', number: 'IV' },
  { id: 'growth', title: 'V. Tillväxtmotorer & Triggers', number: 'V' },
  { id: 'risk', title: 'VI. Riskprofil', number: 'VI' },
  { id: 'esg', title: 'VII. ESG & Makro', number: 'VII' },
  { id: 'ai', title: 'VIII. AI-observationer', number: 'VIII' },
  { id: 'summary', title: 'IX. Sammanfattning & Beslut', number: 'IX' },
  { id: 'scenarios', title: 'X. Scenarier', number: 'X' }
];

const SCORE_LABELS: Record<string, string> = {
  affarsmodell: "I. Företagsöversikt",
  strategiskMoat: "II. Portföljanalys & Strategi",
  finansiellKvalitet: "III. Finansiell analys",
  vardering: "IV. Värdering & Substansvärde",
  tillvaxtutsikter: "V. Tillväxtmotorer & Triggers",
  riskprofil: "VI. Riskprofil",
  esgMakro: "VII. ESG & Makro",
  aiObservationer: "VIII. AI-observationer"
};

const ScoreBadge = ({ score }: { score?: number | string }) => {
  if (score === undefined) return null;
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest mb-4">
      Betyg: {score}/5
    </div>
  );
};

export default function InvestorDeepDive({ 
  isInWatchlist, 
  isWatchlistLoading, 
  onToggleWatchlist 
}: {
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
}) {
  // const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWithCache(investorData.ticker);
        setLiveData(data);
      } catch (err) {
        console.error("Failed to fetch Investor live data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  */

  return (
    <AnalysisLayout 
      ticker={investorData.ticker} 
      companyName={investorData.companyName} 
      stockSlug="investor-ab"
      accentColor={ACCENT_COLOR}
      sections={sections}
      theme="light"
      isInWatchlist={isInWatchlist}
      isWatchlistLoading={isWatchlistLoading}
      onToggleWatchlist={onToggleWatchlist}
      analysisPrice={investorData.analysisPrice}
      // currentPrice={liveData?.price}
      // livePrice={liveData?.price ? `${liveData.price.toFixed(2)} SEK` : undefined}
      // liveChange={liveData?.change_percent}
      date="2026-03-26"
    >
      <div className="max-w-5xl mx-auto">
        {/* CUSTOM HERO SECTION (Based on user HTML) */}
        <div className="mb-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10">
              Aktieanalys · Börsanalys.se
            </div>
            
            <h1 className="text-7xl font-black tracking-tighter mb-4 leading-none">{investorData.companyName}</h1>
            <p className="text-xl text-white/60 font-medium tracking-tight mb-12 max-w-2xl">
              Wallenbergsfärens flaggskepp – en kvalitetsaktie för tålmodiga ägare
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-12 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Börskurs (B)</div>
                <div className="text-xl font-black">{investorData.analysisPrice.toFixed(2)} kr</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Börsvärde</div>
                <div className="text-xl font-black">{investorData.marketCap}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Just. substansvärde</div>
                <div className="text-xl font-black text-orange-400">{investorData.nav}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Premie/rabatt</div>
                <div className="text-xl font-black">{investorData.discount} rabatt</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Analysdatum</div>
                <div className="text-xl font-black">27 mars 2026</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Rekommendation</div>
                <div className="text-xl font-black text-primary">KÖP</div>
              </div>
            </div>
          </div>
        </div>

        {/* VERDICT BANNER (Based on user HTML) */}
        <div className="mb-20 bg-emerald-500 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-emerald-500/20">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-inner">
              <div className="flex flex-col items-center leading-none">
                <span className="text-[10px] font-black text-emerald-500 uppercase mb-1">Vår bedömning</span>
                <span className="text-4xl font-black text-emerald-600">KÖP</span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white tracking-tighter">Investor AB</h3>
              <p className="text-white/80 font-medium tracking-tight">Långsiktig hörnsten i varje portfölj</p>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="text-center md:text-right">
              <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Riktkurs</div>
              <div className="text-3xl font-black text-white tracking-tighter">395 kr</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center md:text-right">
              <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Utdelning</div>
              <div className="text-3xl font-black text-white tracking-tighter">5,20 kr <span className="text-sm opacity-60 font-normal">(2026e)</span></div>
            </div>
          </div>
        </div>

        {/* JSON BLOCK & SCORECARD (New from user) */}
        <div className="mb-20 space-y-8">
          {/* JSON Block */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 font-mono text-sm overflow-hidden shadow-2xl border border-white/5">
            <pre className="text-white/90 whitespace-pre-wrap break-all leading-relaxed">
              {`{
  "slug": "investor-ab-2025",
  "name": "Investor AB",
  "ticker": "INVE B",
  "isin": "SE0015811955",
  "date": "2026-03-26",
  "author": "Carl Fredrik Thor",
  "scores": {
    "affarsmodell": 5,
    "strategiskMoat": 5,
    "finansiellKvalitet": 4,
    "vardering": 4,
    "tillvaxtutsikter": 4,
    "riskprofil": 4,
    "esgMakro": 4,
    "aiObservationer": 3
  },
  "totaltPoang": 33,
  "maxPoang": 40,
  "rating": 0.825,
  "sammanfattning": {
    "beslut": "Köp",
    "motivering": "Historiskt bevisad substanstillväxt, exceptionell moat via Wallenberg-arv, handel nära historisk rabatt mot NAV och stadigt stigande utdelning.",
    "malpris": "395 kr"
  }
}`}
            </pre>
          </div>

          {/* SCORECARD */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-black/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Totalt betyg</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter text-slate-900">33</span>
                  <span className="text-3xl font-black text-gray-200">/</span>
                  <span className="text-3xl font-black text-gray-400">40</span>
                </div>
              </div>
              
              <div className="flex-1 w-full max-w-md">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-lg font-black text-slate-900 tracking-tight">82,5% – Stark kvalitetsaktie</div>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1">
                  <div 
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                    style={{ width: '82.5%' }} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
              {[
                { label: "I. Affärsmodell", score: 5 },
                { label: "II. Strategisk Moat", score: 5 },
                { label: "III. Finansiell Kvalitet", score: 4 },
                { label: "IV. Värdering", score: 4 },
                { label: "V. Tillväxtutsikter", score: 4 },
                { label: "VI. Riskprofil", score: 4 },
                { label: "VII. ESG & Makro", score: 4 },
                { label: "VIII. AI-obs.", score: 3 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div 
                          key={star} 
                          className={`w-3 h-3 rounded-full ${star <= item.score ? 'bg-emerald-500' : 'bg-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {item.score}<span className="text-gray-300">/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION I: FÖRETAGSÖVERSIKT & AFFÄRSMODELL */}
        <section id="overview" className="scroll-mt-24 mb-20">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT & AFFÄRSMODELL" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.affarsmodell} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investor AB grundades 1916 av familjen Wallenberg och är idag ett av Nordens största investmentbolag, med ett justerat substansvärde (det samlade marknadsvärdet på alla innehav minus skulder) på <strong>1 087 miljarder kronor</strong> per den 31 december 2025. Bolagets aktier är noterade på Nasdaq Stockholm och handlas i två klasser – A-aktier med full rösträtt och B-aktier (den vanligast handlade) med tiondels rösträtt.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Affärsidén är enkel men kraftfull: <strong>bygga starka och hållbara företag för att skapa värde för aktieägare och samhälle.</strong> Till skillnad från en vanlig aktiefond är Investor en aktiv ägare – man sitter i styrelser, utser VD och driver strategiska initiativ. Det gör att Investor kan påverka sina innehav på ett sätt som en passiv fondförvaltare aldrig kan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Sektor", value: "Investmentbolag", sub: "Finansiella tjänster" },
              { label: "Geografi", value: "Global", sub: "Tyngdpunkt Norden & Nordamerika" },
              { label: "VD & Koncernchef", value: "Christian Cederholm", sub: "Sedan 2023" },
              { label: "Största ägare", value: "FAM AB", sub: "Wallenberg-sfären" }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{card.label}</div>
                <div className="text-lg font-black text-slate-900 leading-tight mb-1">{card.value}</div>
                <div className="text-xs text-gray-500 font-medium">{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Tre affärsområden</h3>
            <p className="text-sm text-gray-600 mb-6">Investor är organiserat i tre ben som kompletterar varandra väl:</p>

            <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-black/5">
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px]">Affärsområde</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right">Andel NAV</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px]">Vad ingår</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right">Avkastning 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Noterade Bolag</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">~71%</td>
                    <td className="px-6 py-4 text-gray-600">ABB, Atlas Copco, Saab, SEB, AstraZeneca m.fl. (13 st)</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">+22%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Patricia Industries</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">~19%</td>
                    <td className="px-6 py-4 text-gray-600">Mölnlycke, Laborie, Nova Biomedical, Permobil m.fl.</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">−9%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Investeringar i EQT</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">~10%</td>
                    <td className="px-6 py-4 text-gray-600">Aktier i EQT AB + fondinvesteringar</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">+15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 flex gap-6 items-start">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Target className="text-primary w-6 h-6" />
              </div>
              <p className="text-sm leading-relaxed text-white/80 italic">
                Wallenberg-familjen kontrollerar bolagets röster via A-aktier, vilket ger extremt långsiktigt ägarperspektiv. Insider- och kontrollägandet är en av Investors starkaste konkurrensfördelar – det tar bort kvartalspress och möjliggör investeringar med 10–20 års horisont.
              </p>
            </div>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION II: STRATEGISK ANALYS & MOAT */}
        <section id="strategy" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.strategiskMoat} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investor har en av de starkaste konkurrenspositionerna bland europeiska investmentbolag. Moaten (det engelska begreppet för bestående konkurrensfördel – som en vallgrav runt ett slott) är bred och mångdimensionell.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Wallenberg-arvet skapar ett unikt varumärke och nätverk: hundra år av aktiv ägarkultur i Norden ger Investor tillgång till deal flow, styrelsetalanger och politiska relationer som inga konkurrenter kan replikera. Kapitalets tålmodighet – kombinerat med Wallenbergs starka röststyrka – gör att Investor kan ta positioner och stanna under marknadsoro utan tvång att sälja.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">SWOT-analys</h3>
            <SwotGrid data={{
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
              ]
            }} />
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION III: FINANSIELL ANALYS */}
        <section id="financials" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.finansiellKvalitet} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Som investmentbolag är de mest relevanta nyckeltalen substansvärdetillväxt, totalavkastning och utdelningsutveckling – snarare än traditionella P/E-tal eller rörelsemarginaler. Investor redovisar dock även konsoliderade siffror för sina helägda dotterbolag i Patricia Industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ChartCard 
              title="Justerat substansvärde per aktie (kr)" 
              type="line" 
              data={{
                labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026E', '2027E'],
                datasets: [
                  {
                    label: 'Just. NAV/aktie (kr)',
                    data: [165, 175, 245, 195, 265, 317, 355, null, null],
                    borderColor: '#0d2137',
                    backgroundColor: 'rgba(13,33,55,0.08)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#0d2137',
                    pointRadius: 4,
                  },
                  {
                    label: 'Estimat',
                    data: [null, null, null, null, null, null, 355, 395, 440],
                    borderColor: '#e85d27',
                    borderDash: [6, 4],
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.3,
                    pointBackgroundColor: '#e85d27',
                    pointRadius: 4,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: '#eee' }, ticks: { callback: (v: any) => v + ' kr' } },
                  x: { grid: { display: false } }
                }
              }}
            />
            <ChartCard 
              title="Totalavkastning – Investor B vs. SIXRX (genomsnittlig per år)" 
              type="bar" 
              data={{
                labels: ['1 år', '5 år', '10 år', '20 år'],
                datasets: [
                  {
                    label: 'Investor B (%/år)',
                    data: [14.9, 19.4, 18.3, 15.1],
                    backgroundColor: '#0d2137',
                  },
                  {
                    label: 'SIXRX (%/år)',
                    data: [12.7, 9.4, 10.8, 10.0],
                    backgroundColor: '#e85d27',
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                  y: { grid: { color: '#eee' }, ticks: { callback: (v: any) => v + '%' } },
                  x: { grid: { display: false } }
                }
              }}
            />
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Nyckeltal – koncernen (Patricia Industries)</h3>
            <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-black/5">
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px]">Nyckeltal</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right">2023</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right">2024</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right">2025</th>
                    <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] text-right italic">2026E</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Nettoomsättning (Mkr)</td>
                    <td className="px-6 py-4 text-right font-mono">~58 000</td>
                    <td className="px-6 py-4 text-right font-mono">63 196</td>
                    <td className="px-6 py-4 text-right font-mono">64 826</td>
                    <td className="px-6 py-4 text-right font-mono italic">~68 000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Omsättningstillväxt</td>
                    <td className="px-6 py-4 text-right font-mono">~5%</td>
                    <td className="px-6 py-4 text-right font-mono">~9%</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600">+2,6%</td>
                    <td className="px-6 py-4 text-right font-mono italic">~5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Justerad EBITA-marginal</td>
                    <td className="px-6 py-4 text-right font-mono">~21%</td>
                    <td className="px-6 py-4 text-right font-mono">20,5%</td>
                    <td className="px-6 py-4 text-right font-mono">20,5%</td>
                    <td className="px-6 py-4 text-right font-mono italic">~21%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">EPS (kr, konsoliderat)</td>
                    <td className="px-6 py-4 text-right font-mono">~45</td>
                    <td className="px-6 py-4 text-right font-mono">37,00</td>
                    <td className="px-6 py-4 text-right font-mono">51,42</td>
                    <td className="px-6 py-4 text-right font-mono italic">~40–50</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Nettoskuldsättningsgrad</td>
                    <td className="px-6 py-4 text-right font-mono">&lt;2%</td>
                    <td className="px-6 py-4 text-right font-mono">1,2%</td>
                    <td className="px-6 py-4 text-right font-mono">2,1%</td>
                    <td className="px-6 py-4 text-right font-mono italic">~2–3%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Utdelning per aktie (kr)</td>
                    <td className="px-6 py-4 text-right font-mono">4,80</td>
                    <td className="px-6 py-4 text-right font-mono">5,20</td>
                    <td className="px-6 py-4 text-right font-mono">5,60</td>
                    <td className="px-6 py-4 text-right font-mono italic">~6,00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-900">Substansvärdetillväxt</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600">+20%</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600">+20%</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600">+14%</td>
                    <td className="px-6 py-4 text-right font-mono italic">~10–14%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[11px] text-gray-400 italic">
              Kursiverade 2026E-siffror är estimat. EPS för investmentbolag är starkt påverkat av orealiserade värdeförändringar i portföljen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ChartCard 
              title="Utdelning per aktie (kr) – Historisk och estimat" 
              type="bar" 
              data={{
                labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026E'],
                datasets: [
                  {
                    label: 'Utdelning (kr/aktie)',
                    data: [2.80, 3.10, 3.40, 3.75, 4.00, 4.40, 4.60, 4.80, 5.20, 5.60, 6.00],
                    backgroundColor: (ctx: any) => ctx.dataIndex >= 10 ? 'rgba(232,93,39,0.4)' : '#0d2137',
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: '#eee' }, ticks: { callback: (v: any) => v + ' kr' }, beginAtZero: true },
                  x: { grid: { display: false } }
                }
              }}
            />
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-900 mb-2 uppercase tracking-widest text-[10px]">Analyskommentar</h4>
                  <p className="text-sm leading-relaxed text-emerald-800">
                    <strong>Patricia Industries marginaler håller trots valutamotvind.</strong> Den organiska omsättningstillväxten i konstant valuta uppgick till 4% helåret 2025 och EBITA-marginalen på rullande 12 månader låg stabilt kring 20,5%. Det bekräftar att underliggande operationell kvalitet är intakt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">Kassaflöde och balans</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Investors kassaflöde från den löpande verksamheten uppgick till 22,2 miljarder kronor 2025. Totala investeringar uppgick till 29 miljarder, finansierade via kassaflödet och låneupptagning. Nettoskuldsättningsgraden landade på 2,1% – klart inom målintervallet 0–10%. Bruttokassan uppgick till 27,1 miljarder kronor och den genomsnittliga löptiden på skulden är imponerande 9,2 år, vilket minimerar refinansieringsrisken.
            </p>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION IV: VÄRDERING */}
        <section id="valuation" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.vardering} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investmentbolag värderas primärt utifrån förhållandet mellan aktiekursen och det underliggande substansvärdet per aktie (NAV). En kurs lägre än NAV kallas "substansrabatt" och är historiskt sett en köpsignal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Just. NAV/aktie</div>
              <div className="text-lg font-black text-slate-900 tracking-tight">355 kr</div>
              <div className="text-[10px] text-slate-400 italic">Per 31 dec 2025</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aktiekurs (B)</div>
              <div className="text-lg font-black text-slate-900 tracking-tight">330,40 kr</div>
              <div className="text-[10px] text-slate-400 italic">~26 mars 2026</div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Substansrabatt</div>
              <div className="text-lg font-black text-emerald-600 tracking-tight">−7%</div>
              <div className="text-[10px] text-emerald-400 italic">Kurs vs. just. NAV</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direktavkastning</div>
              <div className="text-lg font-black text-slate-900 tracking-tight">1,7%</div>
              <div className="text-[10px] text-slate-400 italic">5,60 kr / 330 kr</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">10-årig utd.tillväxt</div>
              <div className="text-lg font-black text-slate-900 tracking-tight">~8% / år</div>
              <div className="text-[10px] text-slate-400 italic">Genomsnitt</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Förvaltningskostn.</div>
              <div className="text-lg font-black text-slate-900 tracking-tight">0,07%</div>
              <div className="text-[10px] text-slate-400 italic">Av justerat NAV</div>
            </div>
          </div>

          <div className="mb-12">
            <ChartCard 
              title="Substansrabatt/premie – Aktiekurs vs. justerat NAV (kr)" 
              type="line" 
              data={{
                labels: ['Q1 22', 'Q2 22', 'Q3 22', 'Q4 22', 'Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25'],
                datasets: [
                  {
                    label: 'Justerat NAV/aktie',
                    data: [215, 185, 175, 195, 215, 240, 255, 265, 280, 295, 300, 317, 315, 314, 336, 355],
                    borderColor: '#0d2137',
                    backgroundColor: 'rgba(13,33,55,0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                  },
                  {
                    label: 'Aktiekurs (B)',
                    data: [218, 182, 168, 192, 210, 235, 248, 268, 272, 283, 280, 293, 288, 280, 294, 330],
                    borderColor: '#e85d27',
                    borderDash: [4, 3],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                  y: { grid: { color: '#eee' }, ticks: { callback: (v: any) => v + ' kr' } },
                  x: { grid: { display: false } }
                }
              }}
            />
          </div>

          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Historiskt har Investor handlats i intervallet −5% till +15% jämfört med sitt justerade substansvärde. Det nuvarande läget med en rabatt på 7% representerar ett relativt attraktivt inträde. Direktavkastningen på 1,7% är modest, men räknar man in substanstillväxten (historiskt ca 14–16% per år på 5 år) är totalavkastningspotentialen hög.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-xl text-white">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Info className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">Viktig notering</h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong>Det rapporterade substansvärdet (311 kr/aktie) är lägre än det justerade (355 kr/aktie).</strong> Skillnaden beror på att Patricia Industries dotterbolag bokförs till historiskt anskaffningsvärde i den rapporterade balansräkningen, medan de justerade värdena speglar bedömda marknadsvärden baserade på EV/EBITDA-multiplar för jämförbara noterade bolag. Analytiker och marknaden använder normalt det justerade värdet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION V: TILLVÄXTMOTORER */}
        <section id="growth" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.tillvaxtutsikter} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investors tillväxt drivs av en kombination av organisk tillväxt i portföljbolagen, strategiska förvärv och multipelexpansion när marknaderna värderar upp bolagen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">1. Patricia Industries – operationell hävstång</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Den organiska omsättningstillväxten i Patricia Industries uppgick till 4% i konstant valuta 2025, trots ett utmanande makroklimat. En normalisering av växelkursen (SEK/USD) skulle snabbt lyfta de rapporterade siffrorna markant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Target className="text-emerald-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">2. Nova Biomedical – ny plattform</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Advanced Instruments förvärv av Nova Biomedical för 2,2 mdr USD skapar en global life science-plattform med 31% EBITDA-marginal. Synergieffekterna har ännu inte fullt materialiserats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-orange-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">3. Noterade Bolag – Saab-effekten</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Saab steg 133% under 2025. Investor ökade också sin position i Ericsson med över 23 miljoner B-aktier – en tydlig insidersignal om tilltro till kursutvecklingen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <Wallet className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">4. EQT och alternativa tillgångar</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      EQT-plattformen genererade 15% totalavkastning 2025. Investeringen i Fortnox via EQT X ger exponering mot snabbväxande bolag utanför börsen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="text-purple-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">5. AI-integration i portföljen</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Permobil, Mölnlycke och Tre Skandinavien implementerar AI för kundanpassning och tjänster. Dessa initiativ bör lyfta marginalerna på 2–5 års sikt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider between Growth and Risk */}
        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION VI: RISKPROFIL */}
        <section id="risk" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 border border-orange-200 rounded-full text-[10px] font-black text-orange-700 uppercase tracking-widest mb-4">
            Risknivå: MEDEL · {investorData.scores.riskprofil}/5
          </div>
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investor är ett av de lägst-risk-profilerade sätten att investera i en diversifierad portfölj av nordiska och globala kvalitetsbolag. Diversifieringen är bred, skuldsättningen låg och kassaflödet stabilt. Ändå finns risker som investerare bör känna till:
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm mb-12">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-black/5">
                  <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] w-1/4">Risk</th>
                  <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] w-1/2">Bedömning</th>
                  <th className="px-6 py-4 font-black text-slate-900 uppercase tracking-widest text-[10px] w-1/4">Hantering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Valutarisk (USD/EUR vs SEK)</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">Hög exponering. Patricia Industries rapporterar i SEK men bolagen tjänar i USD/EUR. En stark krona dämpar rapporterade vinster.</td>
                  <td className="px-6 py-4 text-gray-500 italic">Operationell effektivisering i bolagen.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Portföljkoncentration</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">ABB (23%), Atlas Copco (17%) och Saab (11%) utgör ~51% av Noterade Bolag.</td>
                  <td className="px-6 py-4 text-gray-500 italic">Diversifiering via Patricia och EQT.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Geopolitik & tullar</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">Portföljbolagen är globala och exponerade mot handelskonflikter och protektionism.</td>
                  <td className="px-6 py-4 text-gray-500 italic">Aktiv ägarstyrning och global närvaro.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Ränterisk</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">Skulder om 50,5 mdr kr. AA-kreditbetyg håller räntekostnaden nere.</td>
                  <td className="px-6 py-4 text-gray-500 italic">Lång löptid (9,2 år) minimerar behovet.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Atlas Antibodies</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">Omsättningen sjunker. Nedskrivning av goodwill 1,4 mdr kr Q4 2025.</td>
                  <td className="px-6 py-4 text-gray-500 italic">Litet innehav (~0,1% av NAV).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-orange-900 mb-2 uppercase tracking-widest text-[10px]">Riskbedömning</h4>
                <p className="text-sm leading-relaxed text-orange-800">
                  Investor är en av de mest robusta placeringarna på Stockholmsbörsen. Den största risken är en bred global konjunkturnedgång som slår mot de cykliska verkstadsbolagen, men Investors extremt starka balansräkning och låga belåning gör att de kan agera offensivt även i kriser.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION VII: ESG & MAKRO */}
        <section id="esg" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="VII" title="ESG & MAKRO" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.esgMakro} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Investor har sedan länge ett strukturerat hållbarhetsarbete. Under 2025 skärpte man hållbarhetsmålen för 2030 med ytterligare fokus på Scope 3-utsläpp (indirekta utsläpp i hela värdekedjan), där man anser att de största klimatpåverkningarna och affärsmöjligheterna finns.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mölnlycke, Investors största onoterade dotterbolag, erhöll platinastatus i Ecovadis hållbarhetsranking för andra året i rad – det är bland de 1% högst rankade företagen globalt. Piab Group lanserade PFAS-fria filter, vilket möter hårdnande global miljöreglering proaktivt. Permobil bidrar direkt till FN:s hållbarhetsmål 3 (god hälsa) och 10 (minskad ojämlikhet) via sina rörlighetslösningar.
            </p>
            <p className="text-gray-600 leading-relaxed">
              På makrosidan gynnas Investor av globala megatrender som åldrande befolkning (Mölnlycke, Permobil), digitalisering (Tre Skandinavien, EQT/Fortnox), grön omställning (Piab Groups energieffektiva produkter) och försvarssatsningar (Saab). Motvinden kommer från geopolitiska handelsfriktioner och en styrkt krona.
            </p>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION VIII: AI-OBSERVATIONER */}
        <section id="ai" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER 🔍" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={investorData.scores.aiObservationer} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              Sentimentet kring Investor är i stort sett neutralt-positivt. Insiderhandeln under 2025 är ett tydligt positivt datamönster: Investor ökade sitt ägande i Ericsson med sammanlagt ~23 miljoner aktier och i Atlas Copco med ~4,4 miljoner aktier – båda köpen skedde på nivåer som ledningen uppenbarligen ansåg attraktiva.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Den statistiska observationen att Investor genererat 19,4% genomsnittlig årlig totalavkastning de senaste 5 åren och 18,3% de senaste 10 åren (mot SIXRX 9,4% och 10,8% respektive) är starkt. Avvikelsen mot index förklaras av den framgångsrika aktiva ägarmodellen och koncentrationen till bolag med stark pricing power.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ett varningstecken som förtjänar uppmärksamhet: Patricia Industries justerade substansvärde sjönk med 22 miljarder under 2025 (mot en uppgång på 55 miljarder 2024), primärt drivet av valuta. Om kronförstärkningen fortsätter in i 2026 kan detta segment fortsätta dra på totalavkastningen.
            </p>
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION IX: SAMMANFATTNING */}
        <section id="summary" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="IX" title="SAMMANFATTNING & BESLUT" accentColor={ACCENT_COLOR} />
          
          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-gray-600 leading-relaxed">
              <strong>Är Investor ett kvalitetsbolag?</strong> Ja, utan tvekan. Med 110 år av bevisad kapitalallokering, de lägsta förvaltningskostnaderna i sektorn, AA- kreditbetyg och ett av Nordens starkaste ägarvarumärken utgör Investor ett av de absolut solidaste valen på Stockholmsbörsen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Är aktien rimligt värderad?</strong> Ja, och möjligen något undervärderad. Handel på −7% rabatt mot justerat substansvärde, i kombination med att 5-årsavkastningen överstiger SIXRX med nästan 10 procentenheter per år, talar för en aktie som snarare bör handlas till premie.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Passar aktien för ett 5–10 års innehav?</strong> Absolutt. Investors affärsmodell belönar tålmodiga investerare. Utdelningstillväxten på genomsnittligt 8% per år de senaste 10 åren skapar ett starkt kassaflöde för innehavare som återinvesterar.
            </p>
          </div>

          <div className="mb-10">
            <VerdictBox 
              verdict="KÖP"
              target="395 kr"
              description="Riktkurs 395 kronor (12 månaders sikt), baserat på ett antagande om att rabatten mot justerat substansvärde kvarstår på 5–7% medan NAV/aktie fortsätter att växa i takt med den historiska 14–16%-takten. Utdelningen på 5,60 kr bidrar med ytterligare 1,7%. Katalysator: Q1-rapport 21 april 2026 och valutaförbättringar i USD/SEK."
              date="2026-03-26"
            />
          </div>
        </section>

        <div className="my-24 md:my-32 border-t-2 border-slate-100 w-full" />

        {/* SECTION X: SCENARIER */}
        <section id="scenarios" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="X" title="SCENARIER: BULL, BASE & BEAR CASE" accentColor={ACCENT_COLOR} />
          
          <ScenarioCards 
            scenarios={[
              {
                type: 'bull',
                icon: "🚀",
                title: "Bull Case",
                probability: "25%",
                price: "450 kr",
                change: "+36%",
                description: "USD/SEK återhämtar sig, Patricia Industries lyfter. Saab, ABB och Atlas Copco fortsätter starkt. Substansvärdet når 400–420 kr/aktie. Marknaden börjar prisa in premie mot NAV istället för rabatt. EQT-börsen lyfter hela affärsområdet."
              },
              {
                type: 'base',
                icon: "📈",
                title: "Base Case",
                probability: "50%",
                price: "395 kr",
                change: "+20%",
                description: "Stabil substansvärdetillväxt om 10–12%. Valutaeffekter neutraliseras gradvis. Patricia Industries organisk tillväxt 3–5% i konstant valuta. Rabatten mot NAV kvarstår runt 5–7%. Utdelning om 6,00 kr 2026."
              },
              {
                type: 'bear',
                icon: "📉",
                title: "Bear Case",
                probability: "25%",
                price: "280 kr",
                change: "-15%",
                description: "Global recession. Börskurserna i Noterade Bolag faller 20–30%. Kronförstärkning fortsätter slå mot Patricia Industries. EQT-aktien korrigerar. Rabatten mot NAV vidgas till 15–20%. Utdelning bibehållen men kurs pressad."
              }
            ]}
          />
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="text-2xl font-black text-white tracking-tighter">
              börs<span className="text-emerald-500">analys</span>.se
            </div>
            <div className="text-sm text-slate-400 font-mono">
              Analys: Investor AB (INVE B)<br />
              Publicerad: 26 mars 2026 · Av Carl Fredrik Thor
            </div>
          </div>
          <div className="text-[11px] leading-relaxed text-slate-500 max-w-4xl">
            Denna analys är framtagen i informationssyfte och utgör inte individuell investeringsrådgivning. Aktier kan både stiga och falla i värde och det är inte säkert att du får tillbaka investerat kapital. Historisk avkastning är inte en garanti för framtida avkastning. Börsanalys.se äger inga aktier i Investor AB vid publiceringstillfället. Gör alltid din egen analys och konsultera en licensierad rådgivare om du är osäker.
          </div>
        </div>
      </footer>
    </AnalysisLayout>
  );
}
