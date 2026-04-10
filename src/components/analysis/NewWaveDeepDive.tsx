import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Users,
  Globe,
  ShoppingBag,
  Trophy,
  Gift,
  AlertTriangle,
  Scale,
  TrendingDown
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from "recharts";
import AdUnit from "../AdUnit";
import NextAnalysisButton from "./NextAnalysisButton";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0F172A",
  sub:     "#475569",
  muted:   "#94A3B8",
  border:  "#E2E8F0",
  bg:      "#F8FAFC",
  surface: "#FFFFFF",
  accent:  "#1E40AF", // Deep Blue
  accentL: "#EFF6FF",
  red:     "#E11D48", // Craft Red
  redL:    "#FFF1F2",
  green:   "#10B981",
  greenL:  "#ECFDF5",
  gold:    "#B45309",
  goldL:   "#FFFBEB",
  shadow:  "0 1px 3px rgba(15,23,42,0.06),0 4px 16px rgba(15,23,42,0.06)",
  shadowMd:"0 4px 24px rgba(15,23,42,0.10)",
};

const revenueData = [
  {ar:"2021", v:6720},
  {ar:"2022", v:8819},
  {ar:"2023", v:9529},
  {ar:"2024", v:9529}, // Corrected 2024 to 9529 as per user text (note: user text said 2024 was 9529, 2025 was 10019)
  {ar:"2025", v:10019},
  {ar:"2026e", v:10950, e:true},
  {ar:"2027e", v:12100, e:true},
];

const marginData = [
  {ar:"2021", v:14.9},
  {ar:"2022", v:17.1},
  {ar:"2023", v:13.2},
  {ar:"2024", v:13.2},
  {ar:"2025", v:11.4},
  {ar:"2026e", v:12.8, e:true},
  {ar:"2027e", v:14.2, e:true},
];

const valuationData = [
  {ar:"2024", pe:14.64},
  {ar:"2025", pe:19.42},
  {ar:"Nu", pe:16.85},
  {ar:"2026e", pe:13.35, e:true},
  {ar:"2027e", pe:10.57, e:true},
];

const allScores = [
  {key:"Affärsmodell",val:4,max:5},
  {key:"Strategisk Moat",val:3,max:5},
  {key:"Finansiell Kvalitet",val:4,max:5},
  {key:"Värdering",val:4,max:5},
  {key:"Tillväxtutsikter",val:4,max:5},
  {key:"Riskprofil",val:3,max:5},
  {key:"ESG & Makro",val:3,max:5},
  {key:"AI-obs.",val:4,max:5},
];

function FadeIn({children,delay=0}){
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay+30);return()=>clearTimeout(t);},[delay]);
  return <div style={{opacity:v?1:0,transform:v?"none":"translateY(8px)",transition:"all 0.35s ease"}}>{children}</div>;
}

function Card({children,mb=0, className=""}: any){
  return <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm mb-5 p-4 md:p-6 ${className}`} style={{marginBottom:mb}}>{children}</div>;
}

function SectionLabel({number,title}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
      <div style={{width:30,height:30,borderRadius:8,background:T.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,flexShrink:0}}>{number}</div>
      <h2 style={{margin:0,fontSize:16,fontWeight:800,color:T.ink,letterSpacing:-0.3}}>{title}</h2>
    </div>
  );
}

const ChartTip=({active,payload,label,unit=""}: any)=>{
  if(!active||!payload?.length)return null;
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 14px",boxShadow:T.shadowMd,fontSize:13}}>
      <div style={{fontWeight:700,color:T.ink,marginBottom:6}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:T.sub}}>{p.name}: <strong style={{color:T.ink}}>{typeof p.value==="number"?p.value.toFixed(2):p.value}{unit}</strong></div>)}
    </div>
  );
};

interface NewWaveDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function NewWaveDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: NewWaveDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#1E40AF] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#1E40AF] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">KÖP</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  New Wave Group AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">NWG B</span>
                <span className="text-sm font-medium opacity-90">Sällanköpsvaror • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#1E40AF] border-white' 
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
              <span className="text-4xl font-black tracking-tighter">29/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '72.5%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">3.6 / 5.0 – Rating 72.5%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        
        {/* 2. WARNING BOX */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-4 text-amber-900">
          <AlertTriangle size={24} className="shrink-0 mt-1" />
          <p className="text-sm font-medium leading-relaxed">
            <strong>Intressekonflikt:</strong> Analysförfattaren har en position i det analyserade bolaget. Analysen är inte finansiell rådgivning.
          </p>
        </div>

        {/* 3. KEY METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
            <div className="text-2xl font-black text-slate-900">99,60 kr</div>
            <span className="text-xs text-slate-500 mt-1 block">Nasdaq Stockholm</span>
          </Card>
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
            <div className="text-2xl font-black text-slate-900">13,2 Mdr</div>
            <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
          </Card>
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (trailing)</span>
            <div className="text-2xl font-black text-slate-900">16,85</div>
            <span className="text-xs text-slate-500 mt-1 block">2026e: 13,3x | 2027e: 10,6x</span>
          </Card>
          <Card className="p-6 border-2 border-primary/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs (Base)</span>
            <div className="text-2xl font-black text-primary">130-145 kr</div>
            <span className="text-xs text-green-600 font-bold mt-1 block">~38% Uppsida</span>
          </Card>
        </div>

        {/* I. FÖRETAGSÖVERSIKT */}
        <FadeIn>
          <Card>
            <SectionLabel number="I" title="Företagsöversikt" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  New Wave Group är en svensk varumärkeskoncern som utvecklar, förvärvar och distribuerar produkter inom tre huvudsegment: <strong>Företag</strong>, <strong>Sport & Fritid</strong> samt <strong>Gåvor & Heminredning</strong>. Affärsidén är att skapa synergier genom samordning av design, inköp, marknadsföring, lager och distribution, samtidigt som produkterna säljs både via profilmarknaden och detaljhandeln.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Bolaget omsatte 10 019 MSEK under 2025, för första gången över 10 miljarder kronor. Nordamerika och Sverige är de viktigaste marknaderna, och varumärken som Craft, Cutter & Buck och Clique utgör grundbultarna.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">VD</div>
                    <div className="text-sm font-bold">Torsten Jansson</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Huvudägare</div>
                    <div className="text-sm font-bold">Torsten Jansson (89% röst.)</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Omsättning per marknad (2025)</h4>
                <div className="space-y-4 w-full">
                  {[
                    { l: "Europa (exkl. Sve/Ben)", v: "25%", c: T.accent },
                    { l: "Nordamerika", v: "24%", c: T.green },
                    { l: "Sverige", v: "20%", c: T.gold },
                    { l: "Benelux", v: "15%", c: T.red },
                    { l: "Övriga Norden", v: "11%", c: T.muted },
                    { l: "Övriga Världen", v: "6%", c: "#CBD5E1" }
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{m.l}</span>
                        <span>{m.v}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: m.v, backgroundColor: m.c }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* II. STRATEGISK ANALYS & MOAT */}
        <FadeIn delay={100}>
          <Card>
            <SectionLabel number="II" title="Strategisk Analys & Moat" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Bolagets styrka ligger i kombinationen av varumärken, distributionsnärvaro, inköpsskala och lokal försäljningsorganisation. Moaten förstärktes ytterligare under 2025 genom förvärvet av <strong>Cotton Classics</strong>, som stärker NWG i Centraleuropa (Tyskland, Österrike, Tjeckien).
                </p>
                <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <ShieldCheck size={18} /> Strategisk Plattform
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2 list-disc pl-4">
                    <li>Marknadsledande inom profilprodukter i Europa</li>
                    <li>Global sourcing-apparat med egna kontor i Asien</li>
                    <li>Säljer via både profil och retail för riskspridning</li>
                    <li>Stark bruttomarginal på ~50% trots svag marknad</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <h4 className="text-xs font-black text-emerald-900 uppercase mb-4 uppercase tracking-widest">Styrkor</h4>
                  <ul className="text-xs text-emerald-800 space-y-2">
                    <li className="flex gap-2"><span>•</span> Bred varumärkesportfölj</li>
                    <li className="flex gap-2"><span>•</span> Skalfördelar i inköp</li>
                    <li className="flex gap-2"><span>•</span> Grundarledd kultur</li>
                    <li className="flex gap-2"><span>•</span> Stabil bruttomarginal</li>
                  </ul>
                </div>
                <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl">
                  <h4 className="text-xs font-black text-rose-900 uppercase mb-4 uppercase tracking-widest">Svagheter</h4>
                  <ul className="text-xs text-rose-800 space-y-2">
                    <li className="flex gap-2"><span>•</span> Kapitalintensiv modell</li>
                    <li className="flex gap-2"><span>•</span> Valutaexponering</li>
                    <li className="flex gap-2"><span>•</span> Höga lagernivåer</li>
                    <li className="flex gap-2"><span>•</span> Begränsade switching costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* III. FINANSIELL ANALYS */}
        <FadeIn delay={200}>
          <Card>
            <SectionLabel number="III" title="Finansiell Analys" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Omsättning Trend (MSEK)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <Tooltip content={<ChartTip unit=" MSEK" />} />
                      <Bar dataKey="v" name="Omsättning" fill={T.accent} radius={[4, 4, 0, 0]}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.e ? T.muted : T.accent} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Rörelsemarginal Trend (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={marginData}>
                      <defs>
                        <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={T.red} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={T.red} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[8, 18]} />
                      <Tooltip content={<ChartTip unit="%" />} />
                      <Area type="monotone" dataKey="v" name="Marginal" stroke={T.red} strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Operations & Profitability</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    2025 var ett blandat år. Omsättningen nådde rekordnivåer (10 019 MSEK), men rörelseresultatet sjönk till 1 141 MSEK från 1 262 MSEK 2024. Justerat för en engångskostnad om 66 MSEK (PPP-lån) var EBIT-marginalen dock stabilare än på ytan.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Nettoskulden steg till 3 082 MSEK pga Cotton Classics-förvärvet och strategisk lageruppbyggnad. Soliditeten på 53,0% är dock fortsatt trygg över målet på 40%.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { l: "ROE", v: "11.15%" },
                    { l: "Utdelning", v: "3.00 kr" },
                    { l: "Soliditet", v: "53.0%" },
                    { l: "Kassaflöde (Op)", v: "653 Mkr" }
                  ].map((m, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{m.l}</div>
                      <div className="text-xl font-black">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* IV. VÄRDERING & JÄMFÖRELSE */}
        <FadeIn delay={300}>
          <Card>
            <SectionLabel number="IV" title="Värdering & Jämförelse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  På nuvarande kurs 99,60 SEK handlas aktien till en tydlig skillnad mellan trailing och framåtblickande värdering. Om 2027e EPS kring 9,41 SEK infrias är P/E 10,6x mycket attraktivt för ett bolag med NWG:s historik och marknadsposition.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trailing P/E (2025)</span>
                    <span className="text-lg font-black">16,85x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Forward P/E (2026e)</span>
                    <span className="text-lg font-black">13,35x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Forward P/E (2027e)</span>
                    <span className="text-lg font-black">10,57x</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 text-center">P/E-Multipel Historik & Prognos</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={valuationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 25]} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="pe" name="P/E-tal" fill={T.accent} radius={[4, 4, 0, 0]}>
                      {valuationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.e ? T.green : entry.ar === "Nu" ? T.gold : T.accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* V & VI: TILLVÄXT & RISK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <SectionLabel number="V" title="Tillväxtmotorer & Triggers" />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Cotton Classics Integration</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Stärker positionen i Centraleuropa (Tyskland/Österrike) och bidrar med ~1,3 Mdr i årlig omsättning vid fullt år.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Craft Shoe Expansion</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Nyah skoerbjudanden för inomhussporter väntas 2026/2027, vilket öppnar en helt ny produktkategori.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Logistikinvesteringar</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Nya stora lager i Irland och USA 2026 ökar leveransförmågan och servicenivån i tillväxtmarknader.</p>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <SectionLabel number="VI" title="Riskprofil" />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Valutarisk</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Kronans styrka mot USD är en motvind. Valutaeffekter påverkade omsättningen negativt med -413 MSEK under 2025.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Skuldsättning & Lager</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Nettoskulden över 3 Mdr lämnar mindre felmarginal. Fortsatt svag marknad kan tynga kassaflödet via rörelsekapital.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Retail-efterfrågan</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">En osäker återhämtning i detaljhandeln och sportbutiker kan förlänga perioden med dämpad organisk tillväxt.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* VII & VIII: ESG & AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <SectionLabel number="VII" title="ESG & Makro" />
            <p className="text-sm text-slate-600 leading-relaxed">
              NWG arbetar med egen sourcingorganisation och personal på plats i inköpsländer för att kontrollera arbetsvillkor (Amfori BSCI) och transparens. Makrobilden präglas av cyklisk konsumtionsvilja och valutaexponering. Neutralt till svagt positivt ESG-case.
            </p>
          </Card>
          <Card>
            <SectionLabel number="VIII" title="AI-observationer 🔍" />
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Vår analys visar att bruttomarginalstabiliteten på 49,0% är det viktigaste måttet. Det tyder på att EBIT-fallet är temporärt och drivet av investeringar (PPP-post, ERP, logistik) snarare än försämrad konkurrenskraft. Marknaden underskattar normaliseringspotentialen.
            </p>
          </Card>
        </div>

        {/* IX: SAMMANFATTNING & BESLUT */}
        <FadeIn delay={400}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-[#1E40AF] text-white p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10">
                  <SectionLabel number="IX" title={<span className="text-white">Investeringsbeslut</span>} />
                  <div className="space-y-6">
                    <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                      "New Wave Group är just nu ett kvalitetsbolag i en tillfälligt pressad fas. När investeringarna i logistik, ERP och expansion börjar ge effekt, ser vinstbanan betydligt bättre ut än vad 2025 års siffror antyder."
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-white/20">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Slutsats</div>
                        <div className="text-3xl font-black">KÖP</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Målpris</div>
                        <div className="text-3xl font-black">130–145 kr</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Potential</div>
                        <div className="text-3xl font-black">+38%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <Target size={240} />
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono text-center">Score: 29 / 40</div>
                <div className="space-y-6">
                  {allScores.slice(0, 5).map(score => (
                    <div key={score.key}>
                      <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wide">
                        <span>{score.key}</span>
                        <span className="text-primary">{score.val}/{score.max}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(score.val / score.max) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </FadeIn>

        {/* X: SCENARIER */}
        <FadeIn delay={500}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Bear Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">75–85 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Långvarig svag retail, valuta fortsätter slå mot rapporterade siffror, integration av Cotton Classics blir tyngre än väntat.</p>
            </div>
            <div className="p-8 bg-white border-4 border-primary rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Base Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">130–145 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Normalisering av marginaler och successiv vinståterhämtning 2026-2027. Multiplar återgår till historiska snitt kring 14-15x.</p>
              <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
                <Target size={120} />
              </div>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Bull Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">160–180 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Cotton Classics integreras snabbare, Craft expansion i USA överraskar, marknaden förbättras från H2 2026. EBIT närmar sig 15%.</p>
            </div>
          </div>
        </FadeIn>

        {/* BOTTOM AD & NAVIGATION */}
        <div className="space-y-12">
          <AdUnit slot="8273645192" />
          <NextAnalysisButton analysis={nextAnalysis} />
        </div>
      </div>
    </div>
  );
}
