import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, TrendingUp, CheckCircle2, Zap, Info } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import { 
  SectionHeader, 
  MetricCard, 
  RatingBox, 
  Card as AnalysisCard, 
  SwotGrid, 
  ProgressBar, 
  FadeIn as AnalysisFadeIn,
  ChartCard,
  FinancialTable,
  ScenarioCards,
  AlertBox,
  VerdictBox
} from "./analysis";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#76B900", // NVIDIA Green
  accentL: "#F0F9E6",
  red:     "#D9363E",
  redL:    "#FEF0F0",
  green:   "#76B900",
  greenL:  "#F0F9E6",
  gold:    "#B07D2A",
  goldL:   "#FDF6E7",
  shadow:  "0 1px 3px rgba(13,27,42,0.06),0 4px 16px rgba(13,27,42,0.06)",
  shadowMd:"0 4px 24px rgba(13,27,42,0.10)",
  shadowLg:"0 8px 40px rgba(13,27,42,0.13)",
};

const revenueData = [
  {ar:"FY2023",v:27.0,e:false},{ar:"FY2024",v:60.9,e:false},{ar:"FY2025",v:130.5,e:false},
  {ar:"FY2026e",v:215.9,e:true},{ar:"FY2027e",v:365.6,e:true},{ar:"FY2028e",v:480.7,e:true},
];

const epsData = [
  {ar:"FY2023",v:0.83,e:false},{ar:"FY2024",v:2.96,e:false},{ar:"FY2025",v:4.92,e:false},
  {ar:"FY2026e",v:8.28,e:true},{ar:"FY2027e",v:11.11,e:true},{ar:"FY2028e",v:13.50,e:true},
];

const nvidiaData = {
  currentPrice: "~178 USD",
  marketCap: "~4 338 Mdr USD",
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

const ScoreBadge = ({ score }: { score?: number }) => {
  if (score === undefined) return null;
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#76B900]/10 border border-[#76B900]/20 rounded-full text-[10px] font-black text-[#76B900] uppercase tracking-widest">
      Betyg: {score}/5
    </div>
  );
};

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:5,max:5},
  {key:"Finansiell",val:5,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxt",val:5,max:5},
  {key:"Risk ⚠",val:2,max:5,inv:true},
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

function Card({children,mb=0,p="24px 26px"}){
  return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:p,boxShadow:T.shadow,marginBottom:mb}}>{children}</div>;
}

function SectionLabel({number,title}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
      <div style={{width:30,height:30,borderRadius:8,background:T.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,flexShrink:0,fontFamily:"Georgia,serif"}}>{number}</div>
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

function StatCard({label,value,sub,accent=false}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{background:h?T.accentL:T.surface,border:`1.5px solid ${h?T.accent+"55":T.border}`,borderRadius:14,padding:"20px 22px",transition:"all 0.2s cubic-bezier(.4,0,.2,1)",transform:h?"translateY(-3px)":"none",boxShadow:h?T.shadowMd:T.shadow,cursor:"default"}}>
      <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>{label}</div>
      <div style={{fontSize:23,fontWeight:900,color:accent?T.accent:T.ink,letterSpacing:-0.5,lineHeight:1}}>{value}</div>
      {sub&&<div style={{fontSize:12,color:T.sub,marginTop:6}}>{sub}</div>}
    </div>
  );
}

function MoatCard({title,desc,stars}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{background:h?T.accentL:T.bg,border:`1.5px solid ${h?T.accent+"44":T.border}`,borderRadius:10,padding:14,transition:"all 0.18s ease",transform:h?"translateY(-2px)":"none",boxShadow:h?T.shadowMd:"none",cursor:"default"}}>
      <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:4}}>{title}</div>
      <div style={{color:T.gold,fontSize:12,marginBottom:6}}>{stars}</div>
      <div style={{color:T.sub,fontSize:12,lineHeight:1.6}}>{desc}</div>
    </div>
  );
}

function TriggerCard({icon,title,body}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{background:h?T.accentL:T.bg,border:`1.5px solid ${h?T.accent+"44":T.border}`,borderRadius:12,padding:16,transition:"all 0.2s ease",transform:h?"translateY(-2px)":"none",boxShadow:h?T.shadowMd:"none",cursor:"default"}}>
      <div style={{fontSize:20,marginBottom:8}}>{icon}</div>
      <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:6}}>{title}</div>
      <div style={{color:T.sub,fontSize:13,lineHeight:1.6}}>{body}</div>
    </div>
  );
}

function ScenarioCard({label,color,bg,prob,pris,triggers,note}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{background:h?bg:T.surface,border:`1.5px solid ${h?color+"44":T.border}`,borderRadius:14,padding:20,transition:"all 0.22s ease",transform:h?"translateY(-4px)":"none",boxShadow:h?T.shadowLg:T.shadow,cursor:"default"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontWeight:800,color,fontSize:14}}>{label}</span>
        <Tag color={color} bg={color+"18"}>{prob}</Tag>
      </div>
      <div style={{fontSize:26,fontWeight:900,color,marginBottom:4,letterSpacing:-1}}>{pris}</div>
      <div style={{fontSize:11,color:T.muted,marginBottom:14}}>Riktkurs · 12 månader</div>
      <ul style={{margin:"0 0 14px",paddingLeft:16}}>
        {triggers.map((t,i)=><li key={i} style={{color:T.sub,fontSize:12,marginBottom:5,lineHeight:1.5}}>{t}</li>)}
      </ul>
      <div style={{background:color+"10",borderRadius:8,padding:"10px 12px",fontSize:12,color:T.sub,lineHeight:1.6}}>{note}</div>
    </div>
  );
}

interface NvidiaDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
}

export default function NvidiaDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading 
}: NvidiaDeepDiveProps){
  const ACCENT_COLOR = T.accent;
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#1a1a1a] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-[#76B900] text-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-xl font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  NVIDIA Corporation
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#76B900] px-2 py-0.5 rounded text-xs font-bold tracking-wide">NVDA</span>
                <span className="text-sm font-medium opacity-90">Halvledare • AI-infrastruktur • Santa Clara</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-[#76B900] text-white border-[#76B900]' 
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
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-[#76B900] h-full rounded-full" style={{ width: '80%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">80,0 % – AI-revolutionens ryggrad</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">~178 USD</div>
              <span className="text-xs text-slate-500 mt-1 block">NASDAQ: NVDA</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~4 338 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">USD · Megacap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E (2026e)</span>
              <div className="text-2xl font-black text-slate-900">22,0x</div>
              <span className="text-xs text-[#76B900] font-bold mt-1 block">Forward P/E</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nettomarginal</span>
              <div className="text-2xl font-black text-slate-900">55%</div>
              <span className="text-xs text-slate-500 mt-1 block">Exceptionell</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#76B900]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">215 USD</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">12 månaders sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#76B900]">
                <Zap size={80} fill="currentColor" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. ANALYSIS CATEGORIES */}
      <div className="w-full py-8 px-6 md:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allScores.map(({key, val, max, inv}) => {
              const isWarning = key.includes('⚠');
              return (
                <div 
                  key={key}
                  className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#76B900]/30 transition-colors"
                >
                  {isWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                  <span className="text-xs font-bold text-slate-600">{key.replace(' ⚠', '')}</span>
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#76B900]' : (val <= 2 ? 'text-red-500' : 'text-slate-500')}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#76B900]' : (val <= 2 ? 'bg-red-400' : 'bg-slate-400')) 
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">

        {/* ── ÖVERSIKT ── */}
        <div id="oversikt">
          <AnalysisFadeIn>
            <section id="overview" className="scroll-mt-24 mb-20">
              <div className="mb-6">
                <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={T.accent} />
              </div>
              
              <ScoreBadge score={nvidiaData.scores.affarsmodell} />

              {/* Bar charts for scores */}
              <div className="mb-12 bg-card border border-border rounded-[2.5rem] p-10">
                <h3 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-8">Analysens nyckelområden</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
                  {Object.entries(nvidiaData.scores).map(([key, score]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{SCORE_LABELS[key] || key}</span>
                        <span className="text-sm font-black text-[#76B900]">{score}/5</span>
                      </div>
                      <ProgressBar label={SCORE_LABELS[key] || key} val={`${score}/5`} progress={(score / 5) * 100} accentColor="#76B900" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AnalysisCard title="FÖRETAGSÖVERSIKT" accentColor={T.accent}>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    NVIDIA designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA) och nätverkslösningar (NVLink, InfiniBand) för datacenters, gaming och autonoma fordon. Bolaget rider på en sekulär supercykel inom AI-infrastruktur där Blackwell-plattformen och CUDA-ekosystemet skapar en oövervinnerlig vallgrav.
                  </p>
                </AnalysisCard>
                <AnalysisCard title="DATA & GEOGRAFI" accentColor={T.accent}>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Global verksamhet men kritisk exponering mot Asien för tillverkning (TSMC Taiwan). Kina utgör en hög-risksmarknad efter H20-exportkontrollerna (april 2025). USA och Europa dominerar kundbasen.
                  </p>
                </AnalysisCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AnalysisCard title="AFFÄRSMODELL & EKOSYSTEM" accentColor={T.accent}>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    NVIDIA säljer 'spaden' i AI-guldruschen. Genom att kombinera överlägsen hårdvara (GPU:er) med mjukvaruplattformen CUDA skapar de ett ekosystem med extremt höga byteskostnader. Fabless-modellen innebär att tillverkning outsourcas till TSMC, vilket ger hög ROIC med lågt kapitalbehov.
                  </p>
                </AnalysisCard>
                <AnalysisCard title="LEDNING & STYRNING" accentColor={T.accent}>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Jensen Huang — VD & Medgrundare: Medgrundade NVIDIA 1993. En av techbranschens mest framgångsrika VD:ar med 30+ år av konsekventa strategiska vägval. Colette Kress — CFO: Erfaren teknisk CFO med gedigen track record.
                  </p>
                </AnalysisCard>
              </div>

              <RatingBox 
                rating={5} 
                accentColor={T.accent}
                description="5/5 — Exceptionell affärsmodell med monopol-liknande ställning inom AI-infrastruktur." 
              />
            </section>
          </AnalysisFadeIn>
        </div>

        {/* ── STRATEGI & RISK ── */}
        <div id="strategi">
          <AnalysisFadeIn delay={100}>
            <section id="strategy" className="scroll-mt-24 mb-20">
              <div className="mb-6">
                <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={T.accent} />
              </div>
              
              <ScoreBadge score={nvidiaData.scores.strategiskMoat} />
              
              <div className="mb-10">
                <AnalysisCard accentColor={T.accent}>
                  <p className="text-sm leading-relaxed text-gray-600 italic">
                    NVIDIAs konkurrensfördelar är exceptionella och sannolikt de starkaste inom halvledarsektorn. Det handlar inte om en enskild fördel utan om ett helt ekosystem av sammanlänkade vallgravar som förstärker varandra.
                  </p>
                </AnalysisCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <AnalysisCard title="TEKNOLOGISK LEDNING" accentColor={T.accent}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2"><span className="text-primary">•</span> Blackwell Ultra-plattformen dominerar AI-inferens</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Vera Rubin-plattformen på väg (nästa generations)</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> NVLink-arkitektur för GPU-kluster</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> 30+ år av GPU-optimering – svår att kopiera snabbt</li>
                  </ul>
                </AnalysisCard>
                <AnalysisCard title="CUDA-EKOSYSTEMET" accentColor={T.accent}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2"><span className="text-primary">•</span> Över 5 miljoner CUDA-utvecklare globalt</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Tusentals bibliotek och ramverk byggda för CUDA</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Extrema byteskostnader för kunder</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> 20+ år av ekosystemsuppbyggnad</li>
                  </ul>
                </AnalysisCard>
                <AnalysisCard title="NÄTVERKSEFFEKTER" accentColor={T.accent}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2"><span className="text-primary">•</span> Fler användare → fler ramverk → fler användare</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Standardplattform för AI-forskning</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Strategiska partnerskap: AWS, Google, Azure, Meta</li>
                  </ul>
                </AnalysisCard>
                <AnalysisCard title="SKALFÖRDELAR" accentColor={T.accent}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2"><span className="text-primary">•</span> R&D på $18,5 mdr FY2026 – mångdubbelt mer än konkurrenter</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Produktcykel ned till 1 år (Blackwell → Rubin)</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Volymer som sänker tillverkningskostnad per enhet</li>
                  </ul>
                </AnalysisCard>
              </div>

              <div className="mb-10">
                <AnalysisCard title="MARKNADSLÄGE" accentColor={T.accent}>
                  <p className="text-sm leading-relaxed text-gray-600">
                    AI-infrastrukturmarknaden befinner sig i en explosiv tillväxtfas. De stora molntjänstleverantörerna – Amazon AWS, Microsoft Azure, Google Cloud och Oracle – investerar hundratals miljarder dollar i att bygga ut AI-datacenter. I Q4 FY2026 stod stora molnbolag ensamma för ungefär hälften av NVIDIAs datacenter-intäkter på rekordnivån 62,3 miljarder USD.
                  </p>
                </AnalysisCard>
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
                  accentColor={T.accent}
                  description="5/5 — (Fokus: Konkurrensfördelar och marknadstrender). NVIDIAs vallgrav är en av de djupaste i teknikvärlden, bestående av både överlägsen hårdvara och det oumbärliga CUDA-ekosystemet." 
                />
              </div>
            </section>
          </AnalysisFadeIn>
        </div>

        {/* SECTION III: FINANSIELL ANALYS */}
        <section id="financials" className="scroll-mt-24 mb-20">
          <div className="mb-6">
            <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
          </div>

          <ScoreBadge score={nvidiaData.scores.finansiellKvalitet} />

          <div className="mb-10">
            <AnalysisCard accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIAs finansiella utveckling de senaste åren är närmast historielös för ett bolag i denna storleksklass. Intäkterna ökade med 65% under FY2026 till 215,9 miljarder USD – ett belopp som är större än de flesta länders BNP. Lönsamheten är på toppnivå globalt.
              </p>
            </AnalysisCard>
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
            <AnalysisCard title="RESULTATRÄKNING – NYCKELTAL" accentColor={ACCENT_COLOR}>
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
                    <td className="py-3 font-bold text-primary">215,9</td>
                    <td className="py-3 font-bold text-primary">365,6</td>
                    <td className="py-3 font-bold text-primary">480,7</td>
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
                    <td className="py-3 font-bold text-primary">8,28</td>
                    <td className="py-3 font-bold text-primary">11,11</td>
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
            </AnalysisCard>
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
                    borderColor: '#059669',
                    tension: 0.3
                  }
                ]
              }} 
            />
            <div className="flex flex-col justify-center">
              <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                <h4 className="text-sm font-bold text-primary mb-2">Vad betyder marginalerna?</h4>
                <p className="text-xs text-primary/80 leading-relaxed">
                  En rörelsemarginal på 60%+ innebär att av varje 100 kr NVIDIA tjänar i intäkter behåller bolaget 60 kr efter att ha betalat sina rörelsekostnader. Det är extremt högt – till järelse har ett vanligt tillverkningsbolag ofta 5–15%.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <AnalysisCard title="BALANSRÄKNING & KASSAFLÖDE" accentColor={ACCENT_COLOR}>
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
                    <div className="text-xl font-bold text-primary">$96.6B</div>
                  </div>
                </div>
              </div>
            </AnalysisCard>
          </div>

          <div className="mb-10">
            <AnalysisCard title="LÖNSAMHETSNYCKELTAL" accentColor={ACCENT_COLOR}>
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
                    <td className="py-3 font-bold text-primary">101%</td>
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
              <div className="mt-6 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                <h4 className="text-sm font-bold text-primary mb-2">Förenklat</h4>
                <p className="text-xs text-primary/80 leading-relaxed">
                  ROE på 101% betyder att för varje 100 kr aktieägarna har investerat genererar NVIDIA 101 kr i vinst per år. Det är närmast unikt och visar att bolaget inte behöver binda mycket kapital för att producera enorma vinster.
                </p>
              </div>
            </AnalysisCard>
          </div>

          <div className="mb-10">
            <AnalysisCard title="KAPITALÅTERFÖRING TILL AKTIEÄGARE" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                Under FY2026 återförde NVIDIA 41,1 miljarder USD till aktieägarna via aktieåterköp och utdelningar. Styrelsen godkände i augusti 2025 ytterligare 60 miljarder USD i återköpsmandat. Utdelningen är symbolisk (0,04 USD/aktie), men bolagets verkliga kapitalåterföring sker primärt via återköp – vilket ökar värdet per kvarvarande aktie.
              </p>
            </AnalysisCard>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.finansiellKvalitet} 
            description="5/5 — (Fokus: Vinsttillväxt, balansräkning och kassaflöde). Finansiellt i en klass för sig med extrem kassaflödesgenerering och marginaler som saknar motstycke för ett bolag av denna storlek." 
          />
        </section>

        {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
        <section id="valuation" className="scroll-mt-24 mb-20">
          <div className="mb-6">
            <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
          </div>

          <ScoreBadge score={nvidiaData.scores.vardering} />

          <div className="mb-10">
            <AnalysisCard accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                Värderingen är den punkt där NVIDIA delar investerarkollektivet. Bolaget är onekligen dyrt i absoluta tal, men till skillnad från många högt värderade bolag backas priset upp av en faktisk och explosiv vinsttillväxt.
              </p>
            </AnalysisCard>
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
            <AnalysisCard title="VÄRDERINGSMULTIPLAR" accentColor={ACCENT_COLOR}>
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
                    <td className="py-3">49.00x</td>
                    <td className="py-3">38.00x</td>
                    <td className="py-3">36.00x</td>
                    <td className="py-3 font-bold text-primary">22.00x</td>
                    <td className="py-3 font-bold text-primary">16.00x</td>
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
            </AnalysisCard>
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
            description="3/5 — (Fokus: Multiplar som P/E, EV/EBIT och PEG). Värderingen är ansträngd men givet tillväxten framstår P/E 21x på 2026 års estimat som rimligt för ett bolag med denna marknadsposition." 
          />
        </section>

        {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
        <section id="growth" className="scroll-mt-24 mb-20">
          <div className="mb-6">
            <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
          </div>

          <ScoreBadge score={nvidiaData.scores.tillvaxtutsikter} />

          <div className="mb-10">
            <AnalysisCard accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600">
                NVIDIAs tillväxt drivs av flera parallella megatrender som förstärker varandra. Det är sällsynt att ett bolag har så många och starka strukturella medvindar simultaneously.
              </p>
            </AnalysisCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <AnalysisCard title="AGENTIC AI – NY TILLVÄXTVÅG" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-primary">•</span> AI-agenter som fattar beslut autonomt kräver massiv inferenskapacitet</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Jensen Huang: "Enterprise adoption of agents is skyrocketing"</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Inferens kräver mer GPU-kapacitet per användare än träning</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="BLACKWELL ULTRA & VERA RUBIN" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-primary">•</span> Blackwell Ultra: 50x bättre inferensprestanda vs Hopper</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Vera Rubin: nästa plattform, ytterligare 10x lägre kostnad/token</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Ettårigt produktcykelschema håller NVIDIA steget före</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="FYSISK AI & ROBOTIK" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-primary">•</span> NVIDIA Cosmos – plattform för fysisk AI och robotutveckling</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Isaac GR00T – open-source modell för humanoidrobotar</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Partners: Boston Dynamics, Caterpillar, LG, Franka Robotics</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="AUTONOMA FORDON & HÄLSOVÅRD" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-primary">•</span> DRIVE Thor-plattformen: BYD, XPENG, Lucid m.fl.</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Partnerskap med Mercedes-Benz (CLA-modellen)</li>
                <li className="flex gap-2"><span className="text-primary">•</span> BioNeMo: AI för läkemedelsupptäckt (Lilly-partnerskap)</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Sovereign AI: länder bygger egna nationella AI-fabriker</li>
              </ul>
            </AnalysisCard>
          </div>

          <div className="mb-10 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
            <h4 className="text-sm font-bold text-primary mb-2">Q1 FY2027-guidning</h4>
            <p className="text-xs text-primary/80 leading-relaxed">
              <strong>Q1 FY2027-guidning:</strong> NVIDIA guidar för 78 miljarder USD i intäkter för Q1 FY2027 – upp från 68,1 miljarder i Q4 FY2026. Det indikerar fortsatt stark tillväxt och tyder på att efterfrågan är robust. Notera att bolaget inte räknar med någon intäkt från Kina i sin prognos.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.tillvaxtutsikter} 
            description="5/5 — (Fokus: Expansion, innovation och katalysatorer). AI-revolutionen är bara i sin början med Sovereign AI och Blackwell-arkitekturen som starka framtida tillväxtdrivare." 
          />
        </section>

        {/* SECTION VI: RISKPROFIL */}
        <section id="risk" className="scroll-mt-24 mb-20">
          <div className="mb-6">
            <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
          </div>

          <ScoreBadge score={2} />

          <div className="mb-10 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <h4 className="text-sm font-bold text-red-900 mb-2">Obs: Riskbetyget är inverterat</h4>
            <p className="text-xs text-red-800 leading-relaxed">
              <strong>Obs:</strong> Riskbetyget är inverterat – 5 = låg risk, 1 = hög risk. NVIDIA får 2/5, vilket speglar att bolaget har betydande men hanterbara risker trots sin starka position.
            </p>
          </div>

          <div className="mb-10">
            <AnalysisCard title="EXPORTKONTROLLER & GEOPOLITIK – DEN VIKTIGASTE RISKEN" accentColor={ACCENT_COLOR}>
              <p className="text-sm leading-relaxed text-gray-600 mb-4">
                Den enskilt största risken för NVIDIA är USA:s exportrestriktioner mot Kina. I april 2025 tvingades NVIDIA skriva ner H20-lager med 4,5 miljarder USD när USA kräver licens för export av H20 till Kina. Kina är en av de snabbast växande AI-marknaderna och NVIDIA har i praktiken stängts ute från datacenter-segmentet där. Bolaget anger explicit i sin Q1 FY2027-guidning att ingen Kinaförsäljning är inräknad.
              </p>
            </AnalysisCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <AnalysisCard title="REGULATORISKA RISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> Löpande exportrestriktioner kan utvidgas</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> EU AI Act – potentiell påverkan på AI-distribution</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Antitrust-utredningar i EU, USA, Sydkorea, Japan</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Tariffrisker i global leveranskedja</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="OPERATIVA RISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> Fabless-modell: beroende av TSMC (Taiwan)</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Taiwan-risken om geopolitisk konflikt uppstår</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Kundkoncentration: 2 kunder = 39% av Q2-intäkterna</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Snabba produktövergångar skapar lagerrisk</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="KONKURRENSRISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> AMD MI300-serien vinner mark inom AI-inferens</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Googles TPU, Amazons Trainium – egna chip</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Open-source AI kan minska beräkningsbehov per token</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> DeepSeek-effekten: mer effektiva modeller</li>
              </ul>
            </AnalysisCard>
            <AnalysisCard title="MAKRORISKER" accentColor={ACCENT_COLOR}>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-red-500">•</span> AI-investeringscykel kan vändas om ROI inte levereras</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Ränteförändringar påverkar högt värderade bolag</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Energibrist kan begränsa datacenterutbyggnad</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Rättsprocesser (pågående SEC-relaterade mål)</li>
              </ul>
            </AnalysisCard>
          </div>

          <div className="mb-10">
            <p className="text-sm leading-relaxed text-gray-600">
              Risknivå sammanfattning: <strong>Hög</strong> – inte för att bolaget är svagt, utan för att det är ett högt värderat bolag i en bransch med snabb teknologiutveckling, geopolitisk exponering och regulatorisk osäkerhet.
            </p>
          </div>

          <RatingBox 
            rating={nvidiaData.scores.riskprofil} 
            description="2/5 — (Fokus: Branschspecifika och generella risker. Inverterad skala). (Inverterat betyg: 2 innebär hög risk). Geopolitiskt beroende av Taiwan och TSMC utgör en betydande 'single point of failure'." 
          />
        </section>

        {/* SECTION VII: ESG & MAKRO */}
        <section id="esg" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="VII" title="ESG & MAKRO" accentColor={T.accent} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: '🌱', label: 'Miljö (E)', score: '3/5', body: 'Hög energiförbrukning i datacenter är en utmaning för sektorn.', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: '👥', label: 'Socialt (S)', score: '3/5', body: 'Fokus på ansvarsfull AI-utveckling och etiska riktlinjer.', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: '🏛️', label: 'Styrning (G)', score: '4/5', body: 'Jensen Huangs ledarskap och starka styrelse ger trygghet.', color: 'text-[#76B900]', bg: 'bg-[#76B900]/10' }
            ].map((item) => (
              <div key={item.label} className={`p-6 rounded-3xl border border-black/5 ${item.bg}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full bg-white/50 ${item.color}`}>{item.score}</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{item.label}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION VIII: AI-OBSERVATIONER */}
        <section id="ai" className="scroll-mt-24 mb-32 pt-16 border-t-4 border-slate-900/5">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor={T.accent} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              { title: '📰 Sentimentanalys', body: 'Marknaden pendlar mellan extrem eufori och djup rädsla för en AI-bubbla.' },
              { title: '📊 Insiderhandel', body: 'Jensen Huang säljer regelbundet via 10b5-1 planer, men behåller lejonparten.' },
              { title: '🔍 Avkastningshistorik', body: 'NVIDIA har varit världens bäst presterande aktie senaste 10 åren.' },
              { title: '⚠️ Observation', body: 'DeepSeek-effekten visar att mer effektiva modeller kan minska beräkningsbehovet.' }
            ].map((obs) => (
              <div key={obs.title} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{obs.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{obs.body}</p>
              </div>
            ))}
          </div>
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

          <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
            <p className="text-sm leading-relaxed text-primary/80">
              Vi rekommenderar att bevaka aktien vid kurskorrigeringar, speciellt om P/E på forward 12 månader faller under 20x eller om ny negativ regulatorisk nyhet driver ned kursen temporärt. För den som redan äger NVIDIA är caset intakt – men att köpa på nuvarande nivåer kräver övertygelse om att AI-investeringarna håller i sig.
            </p>
          </div>
        </section>

        {/* SECTION X: SCENARIER (BULL, BASE & BEAR CASE) */}
        <section id="scenarios" className="scroll-mt-24 mb-32">
          <SectionHeader number="X" title="SCENARIER (BULL, BASE & BEAR CASE)" accentColor={ACCENT_COLOR} />
          
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
                    'rgba(16,185,129,0.7)',
                    'rgba(118,185,0,0.7)'
                  ],
                  borderColor: ['#e05252','#888','#10B981','#76b900'],
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

          <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-500">DISCLAIMER:</span> Denna analys är framtagen av börsanalys.se för informationsändamål och utgör inte finansiell rådgivning. Historisk avkastning garanterar inte framtida avkastning. Investering i aktier innebär alltid risk.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
