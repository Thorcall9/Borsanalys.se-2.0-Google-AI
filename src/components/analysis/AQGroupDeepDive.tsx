import { SectionHeader, FinancialTable, MetricCard, VerdictBox, SwotGrid, ScenarioCards, RatingBox, Card as AnalysisCard, ProgressBar, FadeIn as AnalysisFadeIn, ChartCard, EditorialReadNext } from "./index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, TrendingUp, CheckCircle2, Zap, Info, Building2, Users, Globe, Target, ShieldCheck, PieChart } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import NordnetCTA from "./NordnetCTA";
import { AnalysisData } from "../../data/analyses";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#3B82F6", // Blue for AQ Group (Industry/Stability)
  accentL: "#EFF6FF",
  red:     "#D9363E",
  redL:    "#FEF0F0",
  green:   "#10B981",
  greenL:  "#ECFDF5",
  gold:    "#B07D2A",
  goldL:   "#FDF6E7",
  shadow:  "0 1px 3px rgba(13,27,42,0.06),0 4px 16px rgba(13,27,42,0.06)",
  shadowMd:"0 4px 24px rgba(13,27,42,0.10)",
  shadowLg:"0 8px 40px rgba(13,27,42,0.13)",
};

const revenueData = [
  {ar:"2023",v:8329,e:false},{ar:"2024",v:8554,e:false},{ar:"2025",v:9071,e:false},
  {ar:"2026e",v:9650,e:true}
];

const epsData = [
  {ar:"2023",v:6.45,e:false},{ar:"2024",v:7.27,e:false},{ar:"2025",v:7.38,e:false},
  {ar:"2026e",v:8.18,e:true},{ar:"2027e",v:9.08,e:true}
];

const financialRows = [
  { label: "Nettoomsättning (Mkr)", "2024": "8 554", "2025": "9 071", "Q1_2026": "2 358", "2026e": "9 650e" },
  { label: "EBIT (Mkr)", "2024": "840", "2025": "840", "Q1_2026": "225", "2026e": "932e" },
  { label: "EBT-marginal (%)", "2024": "9,6", "2025": "9,2", "Q1_2026": "9,4", "2026e": "≈9,5–10,0e" },
  { label: "EBITDA (Mkr)", "2024": "1 146", "2025": "1 177", "Q1_2026": "309", "2026e": "1 283e" },
  { label: "EPS (kr)", "2024": "7,27", "2025": "7,38", "Q1_2026": "1,95", "2026e": "8,18e" },
  { label: "ROE (%)", "2024": "16,3", "2025": "14,9", "Q1_2026": "14,9", "2026e": "≈15e" },
  { label: "ROCE (%)", "2024": "16,3", "2025": "14,9", "Q1_2026": "13,0", "2026e": "≈14,5e" },
  { label: "Soliditet (%)", "2024": "67", "2025": "68", "Q1_2026": "68", "2026e": "≥65e" },
  { label: "Nettokassa (Mkr)", "2024": "610", "2025": "847", "Q1_2026": "1 095", "2026e": "≈1 200e" },
  { label: "Op. kassaflöde (Mkr)", "2024": "1 197", "2025": "921", "Q1_2026": "339", "2026e": "917e" },
  { label: "Utdelning (kr)", "2024": "1,60", "2025": "1,80", "Q1_2026": "–", "2026e": "1,96e" },
];

const financialColumns = [
  { key: 'label', label: 'Nyckeltal' },
  { key: '2024', label: '2024' },
  { key: '2025', label: '2025' },
  { key: 'Q1_2026', label: 'Q1 2026' },
  { key: '2026e', label: '2026e' }
];

const valuationRows = [
  { m: "P/E", "2024": "19,2x", "2025": "26,7x", "nuv": "29,1x", "2026e": "26,3x" },
  { m: "EV/EBIT", "2024": "15,3x", "2025": "21,0x", "nuv": "22,4x", "2026e": "–" },
  { m: "P/S", "2024": "1,5x", "2025": "2,0x", "nuv": "2,3x", "2026e": "–" },
  { m: "Direktavk. (%)", "2024": "1,1%", "2025": "0,9%", "nuv": "0,8%", "2026e": "0,9%e" },
];

const valuationColumns = [
  { key: 'm', label: 'Multipel' },
  { key: '2024', label: '2024' },
  { key: '2025', label: '2025' },
  { key: 'nuv', label: 'Nuläge' },
  { key: '2026e', label: '2026e' }
];

const allScores = [
  {key:"Affärsmodell",val:4,max:5},
  {key:"Strategisk Moat",val:3,max:5},
  {key:"Finansiell",val:4,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxt",val:4,max:5},
  {key:"Risk ⚠",val:4,max:5},
  {key:"ESG & Makro",val:4,max:5},
  {key:"AI-obs.",val:4,max:5},
];

const SCORE_LABELS: Record<string, string> = {
  affarsmodell: "I. Företagsöversikt",
  strategiskMoat: "II. Strategisk analys & Moat",
  finansiellKvalitet: "III. Finansiell analys",
  vardering: "IV. Värdering & Jämförelse",
  tillvaxtutsikter: "V. Tillväxtmotorer & Triggers",
  riskprofil: "VI. Riskprofil",
  esgMakro: "VII. ESG & Makro",
  aiObservationer: "VIII. AI-observationer"
};

const ChartTip=({active,payload,label,unit=""}: any)=>{
  if(!active||!payload?.length)return null;
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 14px",boxShadow:T.shadowMd,fontSize:13}}>
      <div style={{fontWeight:700,color:T.ink,marginBottom:6}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:T.sub}}>{p.name}: <strong style={{color:T.ink}}>{typeof p.value==="number"?p.value.toLocaleString():p.value}{unit}</strong></div>)}
    </div>
  );
};

interface AQGroupDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function AQGroupDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: AQGroupDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#1E3A8A] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#1E3A8A] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <div className="flex flex-col items-center leading-none">
                   <span className="text-[10px] font-black opacity-60 mb-0.5">BEVAKA</span>
                   <span className="text-xl font-black tracking-tighter">KÖP</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  AQ Group AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">AQ</span>
                <span className="text-sm font-medium opacity-90">Industri • System & Komponenter • Västerås</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#1E3A8A] border-white' 
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  <Star size={14} fill={isInWatchlist ? "currentColor" : "none"} />
                  {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end w-full md:w-64">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tighter">30/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">75 % – Stabil tillväxtresa</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">~214 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap Stockholm</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">19,7 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">SEK</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E (2026e)</span>
              <div className="text-2xl font-black text-slate-900">26,3x</div>
              <span className="text-xs text-blue-600 font-bold mt-1 block">Premium för kvalitet</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nettokassa</span>
              <div className="text-2xl font-black text-slate-900">~1,1 Mdr</div>
              <span className="text-xs text-green-600 font-bold mt-1 block">Exkl. leasing</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-blue-600/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Målpris (Base)</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">235–260 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">12 månaders sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-blue-600">
                <TrendingUp size={80} strokeWidth={3} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. ANALYSIS CATEGORIES */}
      <div className="w-full py-8 px-6 md:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allScores.map(({key, val, max}) => (
              <div 
                key={key}
                className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-blue-600/30 transition-colors"
              >
                <span className="text-xs font-bold text-slate-600">{key}</span>
                <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-blue-600' : 'text-slate-500'}`}>
                  {val}/{max}
                </span>
                <div className="flex gap-1 ml-2">
                  {[...Array(max)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < val 
                          ? (val >= 4 ? 'bg-blue-600' : 'bg-slate-400') 
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-24">

        <NordnetCTA variant="high" />

        {/* ── I. FÖRETAGSÖVERSIKT ── */}
        <section id="oversikt" className="scroll-mt-24">
          <AnalysisFadeIn>
             <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor="#1E3A8A" />
             <RatingBox rating={4} description="AQ:s affärsmodell har bevisats under tre decennier, stöds av starkt insiderägande och en decentraliserad struktur." />
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <AnalysisCard accentColor="#1E3A8A">
                    <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                            AQ är en av Nordens ledande tillverkare av kundanpassade industriella komponenter och system med över tre decennier av obruten lönsamhet. Bolaget grundades 1994 i Västerås av Per Olof Andersson och Claes Mellgren och har utvecklats till en global koncern med verksamhet i 17 länder och cirka 7 800 anställda.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm italic">
                            Grundarna har byggt bolaget genom en uttalat decentraliserad och kostnadseffektiv modell. Viktiga förvärv som bulgariska och estniska enheter har lagt grunden för dagens globala kapacitet, medan förvärv som Trafotek (2019) och mdexx/Riedel (2025) förstärker rollen som systempartner.
                        </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <MetricCard label="Segment Komponent" value="85%" trend="Omsättning" />
                        <MetricCard label="Segment System" value="15%" trend="Omsättning" />
                    </div>
                </AnalysisCard>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Building2 size={14} /> Ledning & Styrelse
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            Koncernen leds av <strong>James Ahrgren</strong> (VD) och <strong>Christina Hegg</strong> (CFO). Inför årsstämman 2026 föreslogs <strong>Åsa Landén Ericsson</strong> som ny styrelseordförande, vilket markerar ett generationsskifte i ett av börsens mest välskötta bolag.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                            <Users size={12} /> Stort insiderägande (Grundare ~34%)
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Globe size={14} /> Marknadsposition
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            AQ:s framgång vilar på att vara en "World Class"-partner till krävande industrikunder. Med notering på Nasdaq Stockholm Large Cap och en bevisad förmåga att växa med lönsamhet, är man idag en nyckelspelare i den globala elektrifieringen.
                        </p>
                    </div>
                </div>
             </div>
          </AnalysisFadeIn>
        </section>

        {/* ── II. STRATEGISK ANALYS & MOAT ── */}
        <section id="strategi" className="scroll-mt-24">
             <AnalysisFadeIn delay={100}>
                <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor="#1E3A8A" />
                <RatingBox rating={3} description="AQ saknar i mångt och mycket egen IP, men deras vallgrav vilar på förtroende, bytenströsklar och operativ effektivitet." />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <AnalysisCard title="Strategiska Vallgravar" accentColor="#1E3A8A">
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                AQ:s vallgrav vilar på tre pelare som gör bolaget oumbärligt för sina kunder:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded-lg shrink-0"><ShieldCheck className="text-blue-600" size={20} /></div>
                                    <div>
                                        <div className="font-bold text-sm">Förtroende & Pålitlighet</div>
                                        <div className="text-xs text-slate-500">För kunder som ABB och Volvo är kostnaden för produktionsstopp långt högre än priset på enskilda komponenter.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded-lg shrink-0"><Target className="text-blue-600" size={20} /></div>
                                    <div>
                                        <div className="font-bold text-sm">Höga Bytenströsklar</div>
                                        <div className="text-xs text-slate-500">När AQ integrerats i kundens design och försörjningskedja är tröskeln för att byta leverantör mycket hög.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded-lg shrink-0"><Zap className="text-blue-600" size={20} /></div>
                                    <div>
                                        <div className="font-bold text-sm">Operativ Effektivitet</div>
                                        <div className="text-xs text-slate-500">Produktion i lågkostnadsländer kombinerat med svensk kvalitetskontroll skapar en svårslagen kostnadsposition.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </AnalysisCard>
                    <AnalysisCard title="Marknadsfokus & Megatrender" accentColor="#1E3A8A">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {["Datacenter", "Försvar", "Elektrifiering", "Energiinfrastruktur"].map(t => (
                                <span key={t} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{t}</span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            AQ drar nytta av megatrender som AI-expansion och europeisk försvarsupprustning. Bolagets förmåga att snabbt ställa om produktionen till nya tillväxtområden har historiskt varit en av deras största styrkor.
                        </p>
                    </AnalysisCard>
                </div>

                <SwotGrid data={{
                    strengths: ["30 år obruten vinstvåg", "Nettokassa >1 Mdr (finansiellt ointaglig)", "Decentraliserad 'World Class' modell", "Bred teknisk bas & hög precision", "Starkt insiderägande (34%)"],
                    weaknesses: ["Låg organisk tillväxt 2024-25", "Marginalpress i mdexx/Riedel", "Kvalitetsbrister transformatorer Q4/25", "Kundkoncentration (~18% top 2)", "Beroende av nyckelrekryteringar"],
                    opportunities: ["AI-explosion & datacenter", "Europeisk försvarsupprustning", "Global nätmodernisering", "Värdeskapande förvärv", "Elektrifiering av tunga fordon"],
                    threats: ["Handelstullar & Geopolitik", "Råvaruprisinflation (koppar/Al)", "Ökad konkurrens transformatorer", "Cyklisk avmattning i fordon/pack", "Kompetensbrist i tillväxtregioner"]
                }} />
             </AnalysisFadeIn>
        </section>

        {/* ── III. FINANSIELL ANALYS ── */}
        <section id="finansiellt" className="scroll-mt-24">
            <AnalysisFadeIn delay={200}>
                <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor="#1E3A8A" />
                <RatingBox rating={4} description="Exceptionell balansräkning och stark ROE/ROCE. Nettokassan ger stor förvärvskapacitet." />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                   <ChartCard 
                    title="Omsättning (Mkr)" 
                    type="bar" 
                    data={{
                        labels: revenueData.map(d => d.ar),
                        datasets: [{
                            label: 'Omsättning',
                            data: revenueData.map(d => d.v),
                            backgroundColor: revenueData.map(d => d.e ? '#93C5FD' : '#1E3A8A'),
                            borderRadius: 4
                        }]
                    }}
                   />
                   <ChartCard 
                    title="EPS - Vinst per aktie (kr)" 
                    type="line" 
                    data={{
                        labels: epsData.map(d => d.ar),
                        datasets: [{
                            label: 'EPS',
                            data: epsData.map(d => d.v),
                            borderColor: '#3B82F6',
                            tension: 0.3,
                            fill: true,
                            backgroundColor: 'rgba(59, 130, 246, 0.05)'
                        }]
                    }}
                   />
                </div>

                <FinancialTable 
                    title="Finansiella Nyckeltal"
                    columns={financialColumns}
                    data={financialRows}
                    accentColor="#1E3A8A"
                />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-3">Omsättning & Likviditet</h4>
                        <p className="text-sm text-blue-900 leading-relaxed">
                            Omsättningen föll något under 2025, men detta berodde främst på lägre råvarupriser och valutaeffekter snarare än tappade marknadsandelar. Soliditeten på 68 % och en nettokassa som passerade 1 miljard kr under våren 2026 gör bolaget finansiellt ointagligt.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Kassaflödesanalys</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Rörelsekassaflödet var lägre 2025 pga lageruppbyggnad men visar en tydlig normalisering under början av 2026. Detta ger AQ en betydande förvärvskapacitet utan att behöva belåna sig ytterligare.
                        </p>
                    </div>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── IV. VÄRDERING & JÄMFÖRELSE ── */}
        <section id="vardering" className="scroll-mt-24">
            <AnalysisFadeIn delay={300}>
                <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor="#1E3A8A" />
                <RatingBox rating={3} description="Värderingen är rimlig men inte låg. AQ handlas till premiummultiplar som kräver tillväxt." />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                            AQ värderas med P/E omkring 29x på nuvarande vinster – en betydande premie jämfört med historiska multiplar (15–20x). Denna premie reflekterar bolagets unika vinsthistorik och exponering mot AI-infrastruktur.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                <span className="text-sm font-medium text-slate-500">P/E Nuläget</span>
                                <span className="text-sm font-black">29,1x</span>
                            </div>
                            <div className="flex justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                                <span className="text-sm font-medium text-blue-600">P/E (2027e)</span>
                                <span className="text-sm font-black text-blue-600">23,7x</span>
                            </div>
                        </div>
                    </div>

                    <FinancialTable 
                        title="Värderingsmultiplar"
                        columns={valuationColumns}
                        data={valuationRows}
                        accentColor="#1E3A8A"
                    />
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── V. TILLVÄXT ── */}
        <section id="tillvaxt" className="scroll-mt-24">
             <AnalysisFadeIn delay={400}>
                <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor="#1E3A8A" />
                <RatingBox rating={4} description="Tillväxtutsikterna är starka med tre strukturella drivare och en robust pipeline för värdeskapande förvärv." />
                
                <div className="space-y-8 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnalysisCard title="Datacenter & AI-infrastruktur" accentColor="#1E3A8A">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Transformatorsidan går in i en ny era. I Q3 2025 erhöll AQ en order om 15 mEUR mellanspänningstransformatorer till datacenter; under Q4 2025 följdes detta upp av en avsiktsförklaring om leverans av 200 enheter i USA. Den snabba utbyggnaden av AI-datacenter kräver mycket högre kraftdensitet, vilket driver efterfrågan på specialtransformatorer och vätskekylda induktorer.
                            </p>
                        </AnalysisCard>
                        <AnalysisCard title="Försvarsupprustning" accentColor="#1E3A8A">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Geopolitiska spänningar har ökat försvarsbudgetar i Europa och Nordamerika. AQ levererar kablage, mekanik och kompletta system till militära applikationer. Segementet växer snabbt och erbjuder högre marginaler och långa kontrakt. Förvärvet av brittiska Rockford Components 2024 breddade exponeringen mot försvarskablage.
                            </p>
                        </AnalysisCard>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnalysisCard title="Elektrifiering" accentColor="#1E3A8A">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Industriell elektrifiering och modernisering av elnätet innebär stark efterfrågan på transformatorer, induktorer och frekvensomriktare. EU:s mål om 42 % förnybar energiproduktion och stora satsningar på smarta elnät utgör fundamentala drivkrafter för AQ.
                            </p>
                        </AnalysisCard>
                        <AnalysisCard title="Förvärv" accentColor="#1E3A8A">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                AQ:s nettokassa och förvärvshistorik pekar på fortsatt tillväxt via förvärv. Bolaget siktar på 5 % förvärvstillväxt per år. Den disciplinerade inställningen innebär att man väljer kvalitet framför volym. De senaste förvärven (mdexx/Riedel) stärker positionen inom transformatorer ytterligare.
                            </p>
                        </AnalysisCard>
                    </div>

                    <div className="p-8 bg-blue-50 border border-blue-100 rounded-2xl">
                        <h4 className="text-sm font-bold text-[#1E3A8A] mb-3">Vår bedömning: 4/5</h4>
                        <p className="text-sm text-blue-900 leading-relaxed">
                            Tillväxtutsikterna är starka med tre strukturella drivare och en robust pipeline för värdeskapande förvärv. Den utmaning som återstår är att nå det egna målet om 10 % organisk tillväxt – 2025 landade man på 2 % organisk tillväxt, men Q4 2025 och Q1 2026 visar att acceleration är möjlig.
                        </p>
                    </div>
                </div>
             </AnalysisFadeIn>
        </section>

        {/* ── VI. RISKPROFIL ── */}
        <section id="risk" className="scroll-mt-24">
            <AnalysisFadeIn delay={500}>
                <SectionHeader number="VI" title="RISKPROFIL" accentColor="#1E3A8A" />
                <RatingBox rating={4} description="Generellt låg risk tack vare en urstark balansräkning, nettokassa och geografisk diversifiering." />

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                            <tr>
                                <th className="px-6 py-4">Riskfaktor</th>
                                <th className="px-6 py-4 text-center">Sannolikhet</th>
                                <th className="px-6 py-4 text-center">Påverkan</th>
                                <th className="px-6 py-4">Kommentar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                             {[
                                { f: "Valutarisk", s: "Hög", p: "Medel", c: "Naturlig hedging via lokal produktion, men omräkningseffekter kvarstår." },
                                { f: "Handels/US-tullar", s: "Medel", p: "Medel", c: "Enheter i USA/Mexiko kan påverkas, men lokal produktion skyddar delvis." },
                                { f: "Råvarupriser", s: "Medel", p: "Medel", c: "Fluktuationer på koppar/aluminium påverkar marginalerna tills indexjusteringar slår igenom." },
                                { f: "Förvärvsintegration", s: "Medel", p: "Medel", c: "Att få mdexx/Riedel att nå EBT-målet på 8 % tar tid och resurser." },
                                { f: "Geopolitisk risk", s: "Låg", p: "Hög", c: "Verksamhet i Kina och Indien innebär exponering mot skiftande politiska klimat." },
                                { f: "Kvalitetsproblem", s: "Låg-Medel", p: "Medel", c: "Åtgärder efter reklamationer i transformatorenheten (Q4 25) kan tynga kortsiktigt." }
                             ].map((r, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 font-bold">{r.f}</td>
                                    <td className="px-6 py-4 text-center"><span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-bold">{r.s}</span></td>
                                    <td className="px-6 py-4 text-center"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">{r.p}</span></td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">{r.c}</td>
                                </tr>
                             ))}
                        </tbody>
                    </table>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── VII-VIII. ESG & AI ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24">
             <div id="esg">
                <SectionHeader number="VII" title="ESG & MAKRO" accentColor="#1E3A8A" />
                <div className="mt-4 p-6 bg-green-50/50 border border-green-100 rounded-2xl h-full">
                    <p className="text-sm text-green-900 leading-relaxed">
                        AQ rapporterar enligt CSRD och har tydliga mål för Scope 1, 2 och 3. Miljöeffektiva åtgärder som installation av solpaneler på fabriker i Bulgarien och Litauen, samt nya energieffektiva målningsanläggningar, minskar bolagets koldioxidavtryck. Bolagets komponenter är dessutom en förutsättning för den gröna omställningen (smartgrid/EV). Jämställdhetsarbetet fortgår, och det föreslagna ordförandeskiftet 2026 ses som ett steg mot en mer modern styrningsmodell.
                    </p>
                </div>
             </div>
             <div id="ai">
                 <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor="#1E3A8A" />
                 <div className="mt-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl h-full">
                    <div className="space-y-4">
                        <p className="text-sm text-blue-900 leading-relaxed italic">
                            "Sentimentanalys indikerar en positiv förändring under andra halvåret 2025. Fokus har skiftat från marknadsförsiktighet till exekvering av orderboken."
                        </p>
                        <p className="text-xs text-blue-800 leading-relaxed">
                            Organisk tillväxt i Q4 2025 (8,6%) och Q1 2026 (6,3%) bekräftar accelerationen. Historiska mönster visar att Q2 och Q4 är starkast, medan Q3 ofta är svagare. Insider-transaktioner under våren 2026 via optionsprogram är en historiskt stark köpsignal.
                        </p>
                    </div>
                </div>
             </div>
        </section>

        {/* ── IX. SAMMANFATTNING ── */}
        <section id="sammanfattning" className="scroll-mt-24">
            <SectionHeader number="IX" title="INVESTERINGSBESLUT" accentColor="#1E3A8A" />
            <VerdictBox 
                verdict="BEVAKA / KÖP"
                target="235–260 kr"
                date="23 april 2026"
                description="Kombinationen av extremt stabil vinsthistorik och stark medvind från AI-expansion och försvar gör AQ till ett högkvalitativt val för den långsiktige investeraren. Vid rekyler ner mot 200 kr är aktien mycket köpvärd."
            />
            
            <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm max-w-3xl mx-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <tr>
                            <th className="px-6 py-4">Investeringsfråga</th>
                            <th className="px-6 py-4">Svar & Kommentar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="px-6 py-4 font-bold">1. Är det ett kvalitetsbolag?</td>
                            <td className="px-6 py-4 text-slate-600">Ja – Obruten vinsthistoria sedan 1994, nettokassa och ROE kring 15 %.</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold">2. Är den rimligt värderad?</td>
                            <td className="px-6 py-4 text-slate-600">Delvis – P/E 29x är högt historiskt, men reflekterar en ny tillväxtfas.</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold">3. Är det ett lämpligt innehav?</td>
                            <td className="px-6 py-4 text-slate-600">Ja – För den långsiktige som söker exponering mot industriell infrastruktur.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="mt-8 text-xs text-slate-400 italic text-center">
                Intressekonflikt: Undertecknad (Carl Fredrik Thor) äger aktier i AQ Group AB per 23 april 2026.
            </p>
        </section>

        <NordnetCTA variant="low" />

        {/* ── X. SCENARIER ── */}
        <section id="scenarier" className="scroll-mt-24 pb-12">
            <SectionHeader number="X" title="SCENARIER: BULL, BASE & BEAR" accentColor="#1E3A8A" />
            <div className="mt-8">
                <ScenarioCards scenarios={[
                    { 
                        type: 'bull', 
                        icon: "🚀", 
                        title: "Bull Case", 
                        price: "290–320 kr", 
                        probability: "25%", 
                        change: "+35–50%", 
                        description: "Datacenter-affären eskalerar med dubbelsiffrig organisk tillväxt (12-15 %) och marginaler > 10 %. P/E-multipel > 30x välkomnas." 
                    },
                    { 
                        type: 'base', 
                        icon: "📈", 
                        title: "Base Case", 
                        price: "235–260 kr", 
                        probability: "50%", 
                        change: "+10–20%", 
                        description: "Organisk tillväxt 5–7 %, marginalen förbättras gradvis. EPS 8,18 kr (2026e) och 9,08 kr (2027e). P/E 24-26x." 
                    },
                    { 
                        type: 'bear', 
                        icon: "📉", 
                        title: "Bear Case", 
                        price: "165–185 kr", 
                        probability: "25%", 
                        change: "-15–25%", 
                        description: "Konjunkturavmattning pressar orderboken; kvalitetsproblem fortsätter att tynga transformatorenheten och EBT-marginalen faller under 8 %." 
                    }
                ]} />
            </div>
        </section>

        <AnalysisDisclaimer />
        
        <div className="pt-12 border-t border-slate-200">
            {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        </div>

      </div>
    </div>
  );
}
