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
  Gift
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
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
  {ar:"2024", v:9710},
  {ar:"2025", v:10019},
  {ar:"2026e", v:10850, e:true},
];

const marginData = [
  {ar:"2021", v:14.9},
  {ar:"2022", v:17.1},
  {ar:"2023", v:13.2},
  {ar:"2024", v:12.8},
  {ar:"2025", v:11.4},
  {ar:"2026e", v:12.5, e:true},
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell Kvalitet",val:4,max:5},
  {key:"Värdering",val:4,max:5},
  {key:"Tillväxtutsikter",val:5,max:5},
  {key:"Riskprofil",val:3,max:5},
  {key:"ESG & Makro",val:3,max:5},
  {key:"AI-obs.",val:4,max:5},
];

function useHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [h,setH]=useState(false);
  return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];
}

function Tag({children,color=T.accent,bg=T.accentL}){
  return <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,background:bg,color,fontSize:11,fontWeight:700,letterSpacing:0.3}}>{children}</span>;
}

function FadeIn({children,delay=0}){
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay+30);return()=>clearTimeout(t);},[delay]);
  return <div style={{opacity:v?1:0,transform:v?"none":"translateY(8px)",transition:"all 0.35s ease"}}>{children}</div>;
}

function Card({children,mb=0}: any){
  return <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-5 p-4 md:p-6" style={{marginBottom:mb}}>{children}</div>;
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
      {payload.map((p,i)=><div key={i} style={{color:T.sub}}>{p.name}: <strong style={{color:T.ink}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}{unit}</strong></div>)}
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
                  New Wave Group
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">NEWA B</span>
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
              <span className="text-4xl font-black tracking-tighter">32/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '80%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">4.0 / 5.0 – Kvalitetsbetyg</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">116,40 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Nasdaq Stockholm</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~15,4 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (2025)</span>
              <div className="text-2xl font-black text-slate-900">15,2</div>
              <span className="text-xs text-slate-500 mt-1 block">EV/EBIT ~13x</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">2,6%</div>
              <span className="text-xs text-green-600 font-bold mt-1 block">Hög utdelningskapacitet</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#1E40AF]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">145 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">Base Case 12m</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#1E40AF]">
                <TrendingUp size={80} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        
        {/* I. INVESTMENT CASE */}
        <FadeIn>
          <Card>
            <SectionLabel number="I" title="Investment Case" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-lg font-medium text-slate-700 leading-relaxed">
                  New Wave Group är en unik kombination av en <strong className="text-slate-900">tillväxtmaskin</strong> och en stabil kassaflödesgenerator. Under Torsten Janssons ledning har bolaget transformerats till en global aktör med tre starka ben.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Trophy className="text-blue-600 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-blue-900">Teamwear USA</h4>
                      <p className="text-sm text-blue-800">Den stora tillväxtmotorn. Genom Craft och Cutter & Buck vinner man mark i världens största sportmarknad.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <ShieldCheck className="text-emerald-600 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-emerald-900">Operationell Excellens</h4>
                      <p className="text-sm text-emerald-800">Logistik och lagerstyrning är i världsklass, vilket möjliggör hög servicegrad och stabila marginaler.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Nyckeltal Trend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip content={<ChartTip unit=" Mkr" />} />
                    <Bar dataKey="v" name="Omsättning" fill="#1E40AF" radius={[4, 4, 0, 0]}>
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.e ? "#94A3B8" : "#1E40AF"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* II. BUSINESS DIVISIONS */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Företag</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Marknadsledande inom profilprodukter i Europa. Här bygger man långsiktiga relationer genom hög service och ett brett sortiment av baskläder och presentreklam.
              </p>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Andel av omsättning</span>
                <span className="text-lg font-black text-blue-600">~45%</span>
              </div>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Sport & Fritid</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Innehåller flaggskeppet Craft. Fokus på funktionella kläder för både elit och motionär. USA-expansionen drivs främst inom detta segment.
              </p>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Andel av omsättning</span>
                <span className="text-lg font-black text-rose-600">~42%</span>
              </div>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Gift size={24} />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Gåvor & Hem</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Varumärken som Orrefors, Kosta Boda och Sagaform. Fokus på design och premiumgåvor till företag och privatpersoner.
              </p>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Andel av omsättning</span>
                <span className="text-lg font-black text-amber-600">~13%</span>
              </div>
            </Card>
          </div>
        </FadeIn>

        {/* III. FINANCIALS */}
        <FadeIn delay={200}>
          <Card>
            <SectionLabel number="II" title="Finansiell Styrka" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Rörelsemarginal (%)</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={marginData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[10, 20]} />
                    <Tooltip content={<ChartTip unit="%" />} />
                    <Line 
                      type="monotone" 
                      dataKey="v" 
                      stroke="#E11D48" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: "#E11D48", strokeWidth: 0 }} 
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Marginalutveckling</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Efter rekordåren 2021-2022 har marginalerna normaliserats, men New Wave opererar nu på en strukturellt högre nivå än historiskt snitt på ~7-8%. Målet är 15%, men även 12% vore mycket starkt för branschen.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Soliditet</div>
                    <div className="text-xl font-black">53.0%</div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Kassaflöde (2025)</div>
                    <div className="text-xl font-black">653 Mkr</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* IV. STRATEGY & SCENARIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <SectionLabel number="III" title="Strategisk Analys" />
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  New Wave Groups största tillgång är <strong className="text-slate-900">Torsten Jansson</strong>. Hans förmåga att se möjligheter där andra ser hinder, parat med en extremt kostnadseffektiv logistikapparat, utgör bolagets "moat". 
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  USA-expansionen är nu i en kritisk men lovande fas. Genom att använda Cutter & Bucks befintliga återförsäljarnätverk för att sälja in Craft, lyckas man expandera med relativt låg kapitalbindning och risk jämfört med att bygga allt från grunden.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-100">
                  <h5 className="font-bold mb-1 flex items-center gap-2">
                    <TrendingUp size={16} /> Marknadsandelar
                  </h5>
                  <p className="text-xs">Vinner terräng i USA inom Teamwear.</p>
                </div>
                <div className="p-4 bg-blue-50 text-blue-900 rounded-xl border border-blue-100">
                  <h5 className="font-bold mb-1 flex items-center gap-2">
                    <Globe size={16} /> Global Plattform
                  </h5>
                  <p className="text-xs">Skalbar modell som fungerar i 20+ länder.</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="text-[10px] font-black text-rose-600 uppercase mb-2">Bear Case</div>
                <div className="text-2xl font-black">90 kr</div>
                <div className="text-xs text-slate-400 mt-1">-23% Nedsida</div>
              </div>
              <div className="p-6 bg-white border-2 border-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="text-[10px] font-black text-slate-900 uppercase mb-2">Base Case</div>
                <div className="text-2xl font-black">135 kr</div>
                <div className="text-xs text-slate-400 mt-1">+16% Uppsida</div>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="text-[10px] font-black text-emerald-600 uppercase mb-2">Bull Case</div>
                <div className="text-2xl font-black">165 kr</div>
                <div className="text-xs text-slate-400 mt-1">+42% Uppsida</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Rating & Analyst Notes</h4>
              <div className="space-y-6">
                {allScores.slice(0, 5).map(score => (
                  <div key={score.key}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>{score.key}</span>
                      <span className="text-blue-600">{score.val}/{score.max}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${(score.val / score.max) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="p-6 bg-[#1E40AF] text-white rounded-2xl shadow-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Target size={18} /> Slutsats
              </h4>
              <p className="text-sm leading-relaxed opacity-90">
                New Wave Group är billigt. Vid P/E 15 och en historik av hög tillväxt får man USA-optionen nästan gratis. Vi ser ett utmärkt läge att kliva in i aktien på nuvarande nivåer.
              </p>
              <div className="mt-6 pt-6 border-t border-white/20 text-center font-black text-xl tracking-tighter">
                KÖP – 145 kr
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM AD & NAVIGATION */}
        <div className="space-y-12">
          <AdUnit slot="8273645192" />
          <NextAnalysisButton analysis={nextAnalysis} />
        </div>
      </div>
    </div>
  );
}
