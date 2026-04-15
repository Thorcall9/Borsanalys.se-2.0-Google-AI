import { SectionHeader, FinancialTable, MetricCard, VerdictBox } from "./index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, TrendingUp, CheckCircle2, Zap, Info } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import AdUnit from "../AdUnit";
import MultiplexAd from "../MultiplexAd";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#10B981", // Emerald green for Evolution
  accentL: "#ECFDF5",
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
  {ar:"2021",v:1068,e:false},{ar:"2022",v:1457,e:false},{ar:"2023",v:1804,e:false},
  {ar:"2024",v:2063,e:false},{ar:"2025",v:2067,e:false},{ar:"2026e",v:2231,e:true},{ar:"2027e",v:2360,e:true},
];

const epsData = [
  {ar:"2021",v:3.07,e:false},{ar:"2022",v:4.51,e:false},{ar:"2023",v:5.19,e:false},
  {ar:"2024",v:5.94,e:false},{ar:"2025",v:5.24,e:false},{ar:"2026e",v:5.70,e:true},{ar:"2027e",v:5.80,e:true},
];

const ACCENT = T.accent;

const segmentColumns = [
  { key: 'region', label: 'Region' },
  { key: 'revenue', label: 'Intäkter (MEUR)' },
  { key: 'growth', label: 'Tillväxt YoY' },
  { key: 'share', label: 'Andel' }
];

const segmentData = [
  { region: 'Europa', revenue: '782', growth: '-6.5%', share: '38%' },
  { region: 'Asien', revenue: '715', growth: '+4.2%', share: '35%' },
  { region: 'Nordamerika', revenue: '286', growth: '+8.1%', share: '14%' },
  { region: 'Latinamerika', revenue: '158', growth: '+12.4%', share: '8%' },
  { region: 'Övriga', revenue: '122', growth: '+2.1%', share: '5%' }
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:5,max:5},
  {key:"Finansiell",val:4,max:5},
  {key:"Värdering",val:4,max:5},
  {key:"Tillväxt",val:3,max:5},
  {key:"Risk ⚠",val:3,max:5,inv:true},
  {key:"ESG & Makro",val:3,max:5},
  {key:"Marginaler",val:4,max:5},
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

function Card({children, mb=0, p="24px 26px", title, accentColor}: {children: any, mb?: number, p?: string, title?: string, accentColor?: string}){
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:16,padding:p,boxShadow:T.shadow,marginBottom:mb}}>
      {title && (
        <div style={{fontSize:11,fontWeight:700,color:accentColor||T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
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

interface EvolutionDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

interface EvolutionDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function EvolutionDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: EvolutionDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#10B981] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#10B981] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">KÖP</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  Evolution AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">EVO</span>
                <span className="text-sm font-medium opacity-90">iGaming • B2B Live Casino • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#10B981] border-white' 
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
              <span className="text-4xl font-black tracking-tighter">31/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '77.5%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">77,5 % – Undervärderat monopol</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">577,00 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~125 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E (2026e)</span>
              <div className="text-2xl font-black text-slate-900">9,6x</div>
              <span className="text-xs text-[#10B981] font-bold mt-1 block">Historiskt lågt</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">EBITDA-marginal</span>
              <div className="text-2xl font-black text-slate-900">66%</div>
              <span className="text-xs text-slate-500 mt-1 block">Världsklass</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#10B981]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">720 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">12 månaders sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#10B981]">
                <Star size={80} fill="currentColor" />
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
                  className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#10B981]/30 transition-colors"
                >
                  {isWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                  <span className="text-xs font-bold text-slate-600">{key.replace(' ⚠', '')}</span>
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#10B981]' : (val <= 2 ? 'text-red-500' : 'text-slate-500')}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#10B981]' : (val <= 2 ? 'bg-red-400' : 'bg-slate-400')) 
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
          <FadeIn>
            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {[
                  ["Bakgrund & Struktur","Evolution grundades 2006 och är idag världens ledande B2B-leverantör av live casino-lösningar. Bolaget driver studior globalt och levererar mjukvara och tjänster till över 870 operatörskunder."],
                  ["Affärsmodell","Provisionsbaserad modell där Evolution tar en andel av operatörernas spelintäkter (GGR). Detta skapar skalbara intäkter med extremt höga marginaler och begränsad kapitalbindning."],
                  ["Ledning","VD Martin Carlesund har lett bolaget genom en enorm expansionsfas. Ledningen och styrelsen har betydande insiderägande (41,6%), vilket skapar starkt intressegemenskap med aktieägarna."],
                  ["Marknadsläge 2025","Ett utmanande år med avstannad tillväxt och inställd utdelning. Men bakom rubrikerna finns ett bolag med noll skulder och ett fritt kassaflöde på över 1,1 miljarder EUR per år."],
                ].map(([t,b])=>(
                  <div key={t}>
                    <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>{t}</div>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>{b}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`}}>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Analytikerns bedömning</div>
              <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                Evolution handlas idag till värderingar vi aldrig tidigare sett för ett bolag av denna kaliber. Marknaden prisar in ett "worst-case" scenario kring UKGC-granskningen. Vi bedömer att säkerhetsmarginalen vid P/E 10x är enorm, givet bolagets monopol-liknande ställning och finansiella styrka.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── STRATEGI & RISK ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
                {[
                  ["Styrkor",T.green,T.greenL,[
                    "Dominerande B2B-position — 870+ operatörer, extremt höga switching costs och nätverkseffekter",
                    "EBITDA-marginaler >66% — strukturellt högre än i princip alla jämförbara spelbolag",
                    "Nettokassa: 818 MEUR i likvida medel, noll räntebärande skulder — finansiell ointaglighet",
                    "Kontinuerlig produktinnovation: 110+ nya spel 2025, Hasbro-exklusivavtal (MONOPOLY m.fl.)",
                    "Insiderägande 41,6% — ledningen har starkt skin in the game"
                  ]],
                  ["Svagheter",T.gold,T.goldL,[
                    "Omsättningstillväxt kollapsade till +0,2% 2025 — från +14,5% året före",
                    "EPS-tillväxt 2–4% per år framåt (2026–2028e) motiverar inte premiumvärdering",
                    "Personalstyrkan växer snabbare än intäkterna — intäkt per anställd sjönk -5,3% 2025",
                    "Asien-intäkter volatila och cyberbrottslighet mot videoströmmar ej fullt löst",
                    "Utdelningen inställd 2025 — skrämde bort utdelningsinriktade institutionella ägare"
                  ]],
                  ["Möjligheter",T.accent,T.accentL,[
                    "USA: Evolution nu i alla 7 stater, Ezugi återlanserat med mål att bli näst störst",
                    "Brasilien: Studio öppnad i São Paulo — perfekt timing vid marknadens reglering 2025",
                    "Hasbro-partnerskap: MONOPOLY Filthy Rich, Game Night — unik IP-differentiering",
                    "Andel reglerade marknader ökade till 47% (Q4/25) — strukturell stabilitet",
                    "Galaxy Gaming-förvärvet tillför sidebet-teknologi och USA-djup"
                  ]],
                  ["Hot",T.red,T.redL,[
                    "UKGC-granskning (dec 2024): binär risk — böter till licensindragning är möjliga utfall",
                    "Contagion-risk: UKGC-sanktion kan trigga granskning i Ontario, New Jersey m.fl.",
                    "Ringfencing i Europa pressar Europa-intäkter (–6,5% YoY Q3/25)",
                    "PEG-tal på 3,4 för 2027e — dyrt relativt tillväxt om inte EPS accelererar",
                    "Konkurrens från Playtech Live och Pragmatic Play Live på europeiska marknader"
                  ]],
                ].map(([title,color,bg,items]: [string, string, string, string[]])=>(
                  <div key={title} style={{background:bg,border:`1.5px solid ${color}22`,borderRadius:12,padding:16}}>
                    <div style={{fontSize:13,fontWeight:700,color,marginBottom:10}}>{title}</div>
                    <ul style={{margin:0,paddingLeft:16}}>
                      {items.map((item: string,i: number)=><li key={i} style={{color:T.sub,fontSize:13,marginBottom:6,lineHeight:1.6}}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div style={{marginBottom:24, padding:20, background:T.bg, borderRadius:12, border:`1px solid ${T.border}`}}>
                <div style={{fontSize:12, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Teknologi & Produktportfölj</div>
                <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:16}}>
                  Evolutions moat är djup och mångdimensionell. Teknologiplattformen med låg latens och hög videokvalitet kräver enorma investeringar och år av tuning för att replikera. Produktportföljen — Lightning Roulette, Crazy Time, MONOPOLY Live — har blivit egna varumärken som spelare aktivt söker, vilket driver lojalitet hos operatörerna långt bortom vad en vanlig leverantör uppnår.
                </p>
                
                <div style={{fontSize:12, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Switching Costs & Nätverk</div>
                <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:16}}>
                  Switching costs är höga: en operatör som byter live casino-leverantör riskerar att tappa spelare som är vana vid specifika Evolution-titlar. Det självförstärkande ekosystemet med 870+ operatörer gör att intäkterna växer med marknadens tillväxt snarare än att behöva erövras aktivt. Varje ny operatör som ansluter ökar nätverkets värde för alla befintliga kunder.
                </p>

                <div style={{background:T.surface, padding:14, borderRadius:8, borderLeft:`4px solid ${T.accent}`, boxShadow:T.shadow}}>
                  <p style={{margin:0, fontSize:13, color:T.ink, lineHeight:1.6, fontStyle:"italic"}}>
                    Hasbro-partnerskapet (exklusivt flerårigt avtal, ingånget 2025) tillför ytterligare ett differentieringslager — ikoniska varumärken som MONOPOLY, Game Night och fler kommande titlar som konkurrenter inte kan replikera. VD Martin Carlesund beskriver produktplanen för 2026 som "inget mindre än spektakulär".
                  </p>
                </div>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  ["Nätverkseffekt","870+ operatörer skapar ett oslagbart ekosystem.","★★★★★"],
                  ["Switching Costs","Operatörer riskerar att tappa spelare vid byte.","★★★★★"],
                  ["Innovation","Lightning-serien och Hasbro-IP är unika.","★★★★★"],
                  ["Skalfördelar","Global studio-infrastruktur ger lägst styckkostnad.","★★★★★"],
                  ["Varumärke","Evolution är guldstandarden för live casino.","★★★★☆"],
                  ["Regulatoriskt","Licenser i alla reglerade stater i USA.","★★★★☆"],
                ].map(([m,d,s])=><MoatCard key={m} title={m} desc={d} stars={s}/>)}
              </div>
            </Card>
          </FadeIn>
        </div>

        <AdUnit slot="7332946752" />

        {/* ── FINANSIELL ── */}
        <div id="finansiell">
          <FadeIn delay={200}>
            <Card mb={20}>
              <SectionLabel number="III" title="Finansiell Analys"/>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Omsättningsutveckling (MEUR)</div>
              <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Fylld = historisk · Blå kontur = estimat</div>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={revenueData} margin={{top:4,right:16,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,3000]}/>
                  <Tooltip content={<ChartTip unit=" MEUR"/>}/>
                  <Bar dataKey="v" name="Omsättning" radius={[5,5,0,0]}>
                    {revenueData.map((d,i)=><Cell key={i} fill={d.e?"transparent":T.accent} stroke={d.e?T.accent:"none"} strokeWidth={d.e?2:0} strokeDasharray={d.e?"5 3":"0"}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div style={{height:1,background:T.border,margin:"24px 0"}}/>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Vinst per aktie (EUR)</div>
              <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Streckad punkt = estimat</div>
              <ResponsiveContainer width="100%" height={170}>
                <LineChart data={epsData} margin={{top:4,right:16,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,8]}/>
                  <Tooltip content={<ChartTip unit=" EUR"/>}/>
                  <Line type="monotone" dataKey="v" name="EPS" stroke={T.accent} strokeWidth={2.5}
                    dot={(props: any)=>{const{cx,cy,payload}=props;return<circle key={cx} cx={cx} cy={cy} r={4} fill={payload.e?"transparent":T.accent} stroke={T.accent} strokeWidth={2} strokeDasharray={payload.e?"4 2":"0"}/>;}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:"0 0 16px"}}>Nyckeltalstabell</h3>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Nyckeltal","2023","2024","2025","2026e","2027e"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Nyckeltal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Omsättning (MEUR)","1 804","2 063","2 067","2 231","2 360"],
                      ["EBITDA-marginal","70,4%","68,4%","66,1%","~66%","~66%"],
                      ["Vinst/aktie (EUR)","5,19","5,94","5,24","5,70","5,80"],
                      ["EPS-tillväxt","+15%","+14%","−11,8%","+8,7%","+1,8%"],
                      ["Op. kassaflöde (MEUR)","1 278","1 301","1 255","1 313","1 419"],
                      ["ROE","~31%","31,6%","26,3%","—","—"],
                    ].map(([label,...vals],ri)=>(
                      <tr key={label} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:600}}>{label}</td>
                        {vals.map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",textAlign:"right",color:ci>=3?T.accent:T.sub,fontWeight:ci>=3?700:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card mb={20}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <div style={{fontSize:12, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Balansräkning & Likviditet</div>
                  <p style={{fontSize:14, color:T.sub, lineHeight:1.7}}>
                    Balansräkningen är i enastående skick. De 194 MEUR i långfristiga skulder utgörs nästan uteslutande av leasingskulder — räntebärande skuld är i praktiken noll. Med 818 MEUR i likvida medel och en obligationsportfölj på 104 MEUR har bolaget en nettokassaposition som ger enorm finansiell flexibilitet.
                  </p>
                </div>
                <div>
                  <div style={{fontSize:12, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Kapitaleffektivitet</div>
                  <p style={{fontSize:14, color:T.sub, lineHeight:1.7}}>
                    ROE på 26% och ROCE på 26% är starka absoluta tal — men observera att de föll från 31,6% 2024. Faller ROE under 20% är det en tydlig signal om försämrad kapitaleffektivitet att bevaka.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── TILLVÄXT ── */}
        <div id="tillvaxt">
          <FadeIn delay={400}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Tillväxtmotorer & Triggers"/>
              
              <div style={{marginBottom: 24}}>
                <p style={{fontSize: 14, color: T.sub, lineHeight: 1.7, margin: 0}}>
                  Estimaten talar tydligt: omsättningstillväxt 8% → 6% → 4% och EPS-tillväxt 2–4% per år. USA och LatAm är reella möjligheter men ännu inte bevisade i siffrorna. Potential räknas inte som leverans.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                {[
                  { label: "USA MARKNAD", value: "< 20%", sub: "POTENTIAL" },
                  { label: "LATAM", value: "~40 MEUR", sub: "PER KVARTAL" },
                  { label: "REGLERAT", value: "47%", sub: "Q4/25" },
                ].map((m, i) => (
                  <div key={i} style={{background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, textAlign: "center"}}>
                    <div style={{fontSize: 10, fontWeight: 800, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4}}>{m.label}</div>
                    <div style={{fontSize: 20, fontWeight: 900, color: T.ink}}>{m.value}</div>
                    <div style={{fontSize: 10, fontWeight: 700, color: T.sub, marginTop: 2}}>{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    title: "USA — DET STORA PRISET, ÄNNU EJ INPRISAT",
                    body: "Evolution är nu representerat i alla 7 US-stater med online casino. Ezugi återlanserades i New Jersey med målet att bli näst störst. Ny studio planeras i Grand Rapids, Michigan. Online casino i USA är fortfarande under 20% av spelmarknaden jämfört med 50–80% i Europa. Potentialen är enorm men tar tid att materialiseras."
                  },
                  {
                    title: "LATINAMERIKA — BRASILIEN ACCELERERAR",
                    body: "Brasilien reglerade online-spel 2025 vilket öppnar en av världens folkrikaste marknader. Evolution öppnade studio i São Paulo — en “perfekt timing” enligt VD Carlesund. LatAm växer med +6% YoY i Q3/25 och är nu en stabil pelare på ~40 MEUR per kvartal. Colombia och Mexico öppnar successivt."
                  },
                  {
                    title: "HASBRO-EXKLUSIVAVTAL — UNIK IP-DIFFERENTIERING",
                    body: "Exklusivt flerårigt licensavtal med Hasbro ingångett i mitten av 2025. Spel under utveckling: MONOPOLY Filthy Rich, Game Night och flera RNG-titlar. Dessa varumärken kan konkurrenter inte replikera — det är en strukturell fördel som stärker moaten ytterligare."
                  },
                  {
                    title: "REGLERADE MARKNADER — STRUKTURELL RYGVIND",
                    body: "Andel reglerade marknader ökade från 41% (Q4/24) till 47% (Q4/25). Reglerade marknader är mer stabila, förutsägbara och ger lägre long-tail regulatorisk risk. Trenden gynnar Evolution på 3–5 års sikt trots kortsiktig intäktspåverkan av ringfencing."
                  }
                ].map((item, i) => (
                  <div key={i} style={{background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20}}>
                    <div style={{fontSize: 12, fontWeight: 800, color: T.ink, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10}}>{item.title}</div>
                    <p style={{margin: 0, fontSize: 13, color: T.sub, lineHeight: 1.6}}>{item.body}</p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── VÄRDERING ── */}
        <div id="vardering">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="V" title="Värderingsanalys & PEG"/>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 style={{fontSize:14, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Värderingsmultiplar</h3>
                  <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
                    <tbody>
                      {[
                        ["P/E (nuläge)", "9,95x"],
                        ["EV/EBITDA", "7,5x"],
                        ["EV/EBIT", "8,5x"],
                        ["P/S", "5,0x"],
                        ["Earnings Yield", "10,1%"],
                        ["Direktavkastning 2026e", "5,3%"],
                      ].map(([l, v], i) => (
                        <tr key={l} style={{borderBottom: i === 5 ? "none" : `1px solid ${T.border}`}}>
                          <td style={{padding:"8px 0", color:T.sub}}>{l}</td>
                          <td style={{padding:"8px 0", textAlign:"right", fontWeight:700, color:T.ink}}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                  <p style={{margin:0, fontSize:14, color:T.sub, lineHeight:1.7}}>
                    Evolution handlas till historiskt låga multiplar. P/E på ~10x för ett bolag med 66%+ EBITDA-marginal, nettokassa och dominerande marknadsposition är exceptionellt. Historiska multiplar har legat på 20–30x P/E under tillväxtåren. En Earnings Yield på 10,1% innebär att bolaget ger mer vinstavkastning än en statsobligation med mångfalt bättre underliggande kvalitet.
                  </p>
                </div>
              </div>

              <div style={{background:T.redL, border:`1px solid ${T.red}22`, borderRadius:12, padding:20, marginBottom:24}}>
                <h3 style={{fontSize:14, fontWeight:800, color:T.red, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>PEG-VARNING: 2027E SIGNALERAR DYRT RELATIVT TILLVÄXT</h3>
                <p style={{fontSize:13, color:T.sub, lineHeight:1.6, marginBottom:16}}>
                  PEG-talet (Price/Earnings to Growth) sätter P/E i relation till EPS-tillväxttakten. Under 1 = billigt, över 2 = dyrt relativt tillväxt.
                </p>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:12, background:T.surface, borderRadius:8, overflow:"hidden"}}>
                  <thead>
                    <tr style={{background:T.bg, borderBottom:`1px solid ${T.border}`}}>
                      {["ÅR", "EPS (EUR)", "EPS-TILLVÄXT", "P/E", "PEG", "SIGNAL"].map(h => (
                        <th key={h} style={{padding:"10px", textAlign:h==="ÅR"?"left":"right", color:T.muted, fontWeight:700, fontSize:10}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["2026e", "5,7", "+8,7%", "9,6x", "1,4", "Rimligt"],
                      ["2027e", "5,8", "+1,8%", "9,4x", "3,4", "⚠ Dyrt"],
                      ["2028e", "6,0", "+3,4%", "9,0x", "2,6", "Högt"],
                    ].map(([ar, eps, tillv, pe, peg, sig], i) => (
                      <tr key={ar} style={{borderBottom: i === 2 ? "none" : `1px solid ${T.border}`}}>
                        <td style={{padding:"10px", fontWeight:700}}>{ar}</td>
                        <td style={{padding:"10px", textAlign:"right"}}>{eps}</td>
                        <td style={{padding:"10px", textAlign:"right"}}>{tillv}</td>
                        <td style={{padding:"10px", textAlign:"right"}}>{pe}</td>
                        <td style={{padding:"10px", textAlign:"right", fontWeight:700, color: peg === "3,4" ? T.red : T.ink}}>{peg}</td>
                        <td style={{padding:"10px", textAlign:"right", fontWeight:700, color: sig.includes("⚠") ? T.red : T.sub}}>{sig}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{fontSize:13, color:T.sub, lineHeight:1.7, marginTop:16, fontStyle:"italic"}}>
                  PEG 3,4 för 2027e är en tydlig varningsflagga. Köprekommendationen bygger på att 2026 levererar över förväntan och att tillväxten sedan accelererar bortom konsensus. Om EPS-tillväxten stannar på 2% per år bör målpriset revideras ned ytterligare.
                </p>
              </div>

              <div style={{background:T.greenL, border:`1.5px solid ${T.green}33`, borderRadius:14, padding:"16px 20px", borderLeft:`4px solid ${T.green}`, marginBottom: 20}}>
                <p style={{margin:0, color:T.ink, fontSize:14, lineHeight:1.85}}>
                  <strong>Värderingskonklusionen:</strong> Evolution handlas till ett P/E på under 10x för 2026e. Direktavkastningen på 5,3% (2026e) är en viktig stödnivå som lockar tillbaka utdelningsinriktade institutionella ägare som sålde vid utdelningsindragningen 2025. Återkomsten av utdelningen är i sig en katalysator.
                </p>
              </div>

              <div style={{background:T.accentL, border:`1.5px solid ${T.accent}33`, borderRadius:14, padding:"18px 22px", borderLeft:`4px solid ${T.accent}`}}>
                <div style={{fontSize:11, fontWeight:800, color:T.accent, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Finansiell Stabilitet</div>
                <p style={{margin:0, color:T.ink, fontSize:14, lineHeight:1.8}}>
                  Evolution har noll räntebärande skulder. Med en kassa på 818 MEUR och en soliditet på 72% är bolaget finansiellt ointagligt. Detta gör att de kan rida ut även en stormig regulatorisk period utan att riskera verksamheten.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* RELATED ANALYSIS CALLOUT */}
        {data.relatedAnalysis && <EditorialCallout {...data.relatedAnalysis} />}

        {/* ── RISK ── */}
        <div id="risk">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div style={{background:T.redL, border:`1.5px solid ${T.red}33`, borderRadius:12, padding:20, borderLeft:`4px solid ${T.red}`}}>
                  <div style={{fontSize:11, fontWeight:800, color:T.red, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Risknivå: Medel–Hög</div>
                  <div style={{fontSize:28, fontWeight:900, color:T.ink, marginBottom:4}}>3/5</div>
                  <div style={{fontSize:12, color:T.sub, fontWeight:600}}>Riskbetyg (Inverterad skala: 5 = Låg risk)</div>
                </div>
                <div style={{background:T.greenL, border:`1.5px solid ${T.green}33`, borderRadius:12, padding:20, borderLeft:`4px solid ${T.green}`}}>
                  <div style={{fontSize:11, fontWeight:800, color:T.green, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Finansiell Risk: Låg</div>
                  <div style={{fontSize:28, fontWeight:900, color:T.ink, marginBottom:4}}>Noll skulder</div>
                  <div style={{fontSize:12, color:T.sub, fontWeight:600}}>818 MEUR i kassan · Soliditet 72%</div>
                </div>
              </div>

              <div style={{marginBottom:32}}>
                <h3 style={{fontSize:14, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Binär Risk: UK Gambling Commission (UKGC)</h3>
                <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:16}}>
                  UKGC inledde en granskning av Evolutions maltesiska holdingbolag i december 2024 under sektion 116 av Gambling Act 2005. Utfallet är fortfarande okänt och Evolution samarbetar fullt ut. Risken är binär — antingen böter och åtgärdsplaner, eller licensindragning i värsta fall.
                </p>
                
                <div style={{background:T.bg, borderRadius:12, padding:20, border:`1px solid ${T.border}`}}>
                  <h4 style={{fontSize:13, fontWeight:700, color:T.ink, marginBottom:10}}>Contagion-risk (Smittorisk)</h4>
                  <p style={{fontSize:13, color:T.sub, lineHeight:1.6, margin:0}}>
                    Om UKGC drar licensen — vad händer med licenser i USA, Ontario och Malta? Varje jurisdiktion granskar självständigt men en UKGC-sanktion ökar granskningstrycket globalt. Historiskt har regulatorer i New Jersey och Ontario agerat oberoende, men en allvarlig UKGC-dom skapar prejudikat som kan spilla över.
                  </p>
                </div>
              </div>

              <div style={{marginBottom:32}}>
                <h3 style={{fontSize:14, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:16}}>Vår Sannolikhetsbedömning</h3>
                <div style={{display: "flex", flexDirection: "column", gap: 12}}>
                  {[
                    { label: "Liten sanktion eller ingen åtgärd", prob: "55–65%", color: T.green, width: "60%" },
                    { label: "Betydande böter (50–300 MEUR)", prob: "30–35%", color: T.gold, width: "33%" },
                    { label: "Fullständig licensindragning", prob: "5–10%", color: T.red, width: "8%" },
                  ].map((item, i) => (
                    <div key={i} style={{marginBottom:16}}>
                      <div style={{display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6}}>
                        <span style={{fontWeight:600, color:T.ink}}>{item.label}</span>
                        <span style={{fontWeight:800, color:item.color}}>{item.prob}</span>
                      </div>
                      <div style={{height:8, background:T.border, borderRadius:4, overflow:"hidden"}}>
                        <div style={{height:"100%", background:item.color, width:item.width, borderRadius:4}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 style={{fontSize:14, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Risk-Reward Matrix</h3>
                  <p style={{fontSize:13, color:T.sub, lineHeight:1.7}}>
                    UKGC är den största enskilda riskfaktorn. Marknaden prisar idag in ca 30-40% sannolikhet för ett "bad outcome". Om utfallet blir enbart böter (vilket är historiskt vanligast för stora bolag) finns en enorm uppsida i multipel-expansion.
                  </p>
                </div>
                <div>
                  <h3 style={{fontSize:14, fontWeight:800, color:T.ink, textTransform:"uppercase", letterSpacing:0.5, marginBottom:12}}>Asien & Cyberbrottslighet</h3>
                  <p style={{fontSize:13, color:T.sub, lineHeight:1.7}}>
                    Asien-intäkterna har varit volatila. Cyberbrottslighet i form av "video scraping" och otillåten användning av Evolutions strömmar har pressat marginalerna. Evolution har implementerat nya tekniska skydd under 2025 för att motverka detta, vilket förväntas stabilisera Asien-segmentet.
                  </p>
                </div>
              </div>

              <div style={{background:T.accentL, border:`1.5px solid ${T.accent}33`, borderRadius:14, padding:"18px 22px", borderLeft:`4px solid ${T.accent}`}}>
                <div style={{fontSize:11, fontWeight:800, color:T.accent, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Finansiell Stabilitet</div>
                <p style={{margin:0, color:T.ink, fontSize:14, lineHeight:1.8}}>
                  Evolution har noll räntebärande skulder. Med en kassa på 818 MEUR och en soliditet på 72% är bolaget finansiellt ointagligt. Detta gör att de kan rida ut även en stormig regulatorisk period utan att riskera verksamheten.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

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
              <p className="text-sm leading-relaxed text-gray-600">
                Live casino (1 773 MEUR, 86% av intäkterna) är kärnprodukten med de högsta marginalerna. Här har Evolution en monopol-liknande ställning. Tillväxten drivs av nya bord, innovativa spelshower och expansion i USA och LatAm.
              </p>
            </Card>
            <Card title="RNG — UTMANINGEN" accentColor={ACCENT}>
              <p className="text-sm leading-relaxed text-gray-600">
                RNG-segmentet (slumpvalsspel) utgör 14% av intäkterna och har underpresterat under 2025. Målet är att nå tvåsiffrig tillväxt, men hittills har integrationen av förvärvade bolag som NetEnt tagit längre tid än väntat.
              </p>
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
            title="Marginalutveckling & Personalkostnader"
            columns={[
              { key: 'metric', label: 'Nyckeltal' },
              { key: 'y2023', label: '2023' },
              { key: 'y2024', label: '2024' },
              { key: 'y2025', label: '2025 (Est)' }
            ]}
            data={[
              { metric: 'EBITDA-marginal (%)', y2023: '70.5%', y2024: '68.4%', y2025: '66.1%' },
              { metric: 'Personalkostnader (MEUR)', y2023: '345', y2024: '412', y2025: '488' },
              { metric: 'Anställda (Antal)', y2023: '17 400', y2024: '19 200', y2025: '21 500' },
              { metric: 'Intäkt per anställd (KEUR)', y2023: '103', y2024: '106', y2025: '98' }
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-muted/30 rounded-3xl space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Varför marginalerna pressas</h4>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm">
                  <span className="text-primary font-bold">01.</span>
                  <span>Lönesinflation i Baltikum och Georgien (huvudhubbar).</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-primary font-bold">02.</span>
                  <span>Skifte mot lokala studios i USA/Brasilien med högre personalkostnader.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-primary font-bold">03.</span>
                  <span>Ökad andel RNG (slumpvalsspel) som har lägre marginaler än Live.</span>
                </li>
              </ul>
            </div>
            <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Analytikerns kommentar</h4>
              <p className="text-sm leading-relaxed italic">
                “Evolution har blivit ett offer för sin egen framgång. För att växa i reglerade marknader tvingas de bygga lokala studios, vilket bryter den digitala skalbarheten. 66% är fortfarande världsklass, men trenden är oroväckande om den inte planar ut 2026.”
              </p>
            </div>
          </div>
        </section>

        {/* IX. Kapitalallokering & Utdelning */}
        <section id="allocation" className="pt-24 space-y-12">
          <SectionHeader number="IX" title="Kapitalallokering & Utdelning" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricCard label="FRITT KASSAFLÖDE" value="~1 120 MEUR" trend="FY2025" />
            <MetricCard label="ÅTERKÖP 2025" value="500 MEUR" trend="GENOMFÖRT" />
            <MetricCard label="DIREKTAVKASTNING 2026E" value="5,3%" trend="PROGNOS" />
          </div>

          <Card title="Kapitalallokeringens psykologi vs. Matematik" accentColor={ACCENT}>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-600">
                Att ett kassaflödesstarkt bolag som Evolution pausar utdelningen väcker naturligt oro. Marknaden tolkar det ofta som en signal om underliggande problem.
              </p>
              <p className="text-sm leading-relaxed text-gray-600 font-bold">
                Kassaflödet säger dock något annat. Med ett fritt kassaflöde på cirka 1 120 MEUR finns tydlig kapacitet att finansiera både utdelning och återköp. Beslutet framstår därför som strategiskt snarare än finansiellt.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="AKTIEÅTERKÖP — LEDNINGENS FAVORITVERKTYG" accentColor={ACCENT}>
              <p className="text-sm leading-relaxed text-gray-600">
                Samtidigt har bolaget genomfört återköp om 500 MEUR till betydligt högre kurser än dagens nivå. Det signalerar förtroende från ledningen – men är inte i sig ett bevis på undervärdering.
              </p>
            </Card>
            <Card title="STRATEGISKA FÖRVÄRV (M&A)" accentColor={ACCENT}>
              <p className="text-sm leading-relaxed text-gray-600">
                Galaxy Gaming-förvärv (~85 MUSD) pågår. Nolimit City earn-out betalt. BTG-tilläggsköpeskilling förlängd till 2031 (reducerades med 51,7 MEUR). Kassan är redo för nästa förvärv.
              </p>
            </Card>
            <Card title="STUDIOEXPANSION" accentColor={ACCENT}>
              <p className="text-sm leading-relaxed text-gray-600">
                Filippinerna, Brasilien, Grand Rapids (Michigan) — toppmoderna studios kräver kapital upfront men genererar intäkter i 10–15 år. Capex 2025: ~135 MEUR, under guidens 140 MEUR — kostnadsmedvetenhet syns i siffrorna.
              </p>
            </Card>
            <Card title="DEN PSYKOLOGISKA KOSTNADEN" accentColor={ACCENT}>
              <p className="text-sm leading-relaxed text-gray-600">
                Pensionsfonder och utdelningsfonder kräver utdelning för att hålla aktier. Inställd utdelning skapar onödig volatilitet och skrämmer bort defensiva institutionella ägare — oavsett hur rationell matematiken är. Återkomsten av utdelningen 2026e (~30 kr per aktie, 5,3% direktavkastning) är en viktig katalysator för att återlocka dessa ägare.
              </p>
            </Card>
          </div>
        </section>

        {/* X. ESG & Makro */}
        <div id="esg">
          <FadeIn delay={600}>
            <Card mb={20}>
              <SectionLabel number="X" title="ESG & Makro"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  ["🌱","Miljö (E)","3/5","Neutral profil. Fokus på energieffektiva studios globalt.",T.muted,T.bg],
                  ["👥","Socialt (S)","3/5","Spelansvar är centralt. Samarbete med reglerade operatörer.",T.gold,T.goldL],
                  ["🏛️","Styrning (G)","5/5","Starkt insiderägande (41,6%) och transparent rapportering.",T.green,T.greenL],
                ].map(([icon,label,score,body,color,bg])=>(
                  <div key={label} style={{background:bg,border:`1.5px solid ${color}22`,borderRadius:12,padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <span style={{fontSize:20}}>{icon}</span>
                      <Tag color={color} bg={color+"22"}>{score}</Tag>
                    </div>
                    <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:6}}>{label}</div>
                    <div style={{color:T.sub,fontSize:13,lineHeight:1.6}}>{body}</div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* XI. Sammanfattning & Investeringsbeslut */}
        <section id="summary" className="pt-24 space-y-16">
          <SectionHeader number="XI" title="SAMMANFATTNING & INVESTERINGSBESLUT" />
          
          {/* Visual Score Summary */}
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] blur-[120px] opacity-20 -mr-32 -mt-32" />
            
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="74" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={465} 
                  strokeDashoffset={465 * (1 - 0.775)} 
                  className="text-[#10B981]" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black tracking-tighter">31</span>
                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">av 40</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left relative z-10">
              <div className="text-[10px] font-black tracking-[0.3em] uppercase text-[#10B981] mb-3">Total Rating</div>
              <h3 className="text-4xl font-black tracking-tight mb-4">77.5% Kvalitetsscore</h3>
              <p className="text-base text-white/60 leading-relaxed max-w-xl">
                Evolution presterar på en exceptionell nivå inom affärsmodell och moat, men tyngs av kortsiktig tillväxtoro och regulatoriska risker. Sektionerna I–VIII summerade ger 31 av 40 möjliga poäng.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Status</span>
                  <span className="text-sm font-bold text-[#10B981]">Undervärderat Monopol</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Säkerhetsmarginal</span>
                  <span className="text-sm font-bold">Bred (P/E 10x)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Beräkning</span>
                  <span className="text-[10px] font-mono text-white/30">5+5+4+4+3+3+3+4 = 31</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Point Breakdown */}
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Poängsammanställning</h3>
                <span className="text-[10px] font-bold text-slate-400">MAX 5p PER KATEGORI</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "I. Affärsmodell", score: 5 },
                  { label: "II. Strategisk Moat", score: 5 },
                  { label: "III. Finansiell Kvalitet", score: 4 },
                  { label: "IV. Värdering", score: 4 },
                  { label: "V. Tillväxtutsikter", score: 3 },
                  { label: "VI. Riskprofil (inverterad)", score: 3 },
                  { label: "VII. ESG & Makro", score: 3 },
                  { label: "VIII. AI-observationer", score: 4 },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                      <span className="text-sm font-black text-slate-900">{item.score}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 delay-${i * 100}`}
                        style={{ 
                          width: `${(item.score / 5) * 100}%`,
                          backgroundColor: item.score >= 4 ? '#10B981' : (item.score <= 2 ? '#EF4444' : '#94A3B8')
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-base font-black text-slate-900 uppercase tracking-tight">Totalpoäng</span>
                  <span className="text-2xl font-black text-[#10B981]">31 / 40</span>
                </div>
              </div>
            </div>

            {/* Investment Questions */}
            <div className="space-y-6">
              <Card title="INVESTERINGSFRÅGORNAS SVAR" accentColor={ACCENT}>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l-2 border-slate-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Är det ett kvalitetsbolag?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ja, tveklöst. Evolution är en av de tydligaste moats på börsen med nätverkseffekter, switching costs och regulatoriska barriärer som gör konkurrens nästan omöjlig på kort sikt.
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-slate-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Är det rimligt värderat?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Mer än rimligt — P/E på ~10x för ett bolag som historiskt handlats till 20–30x, med ROE på 26% och stark kassagenerering, ger en bred säkerhetsmarginal.
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-slate-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Passar det för 5–10 år?</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ja, med förbehåll. Global reglering av online-spel är en strukturell megatrend som gynnar Evolution. USA är i sin linda, LatAm accelererar. Men investeraren måste acceptera att EPS-tillväxten de närmaste åren är måttlig (2–4%) och att UKGC-risken är binär och oförutsägbar.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* EV Calculation Table */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Riskjusterad förväntad avkastning (EV-kalkyl)</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">12 månaders sikt</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { scenario: 'Bull Case', target: '880 kr', return: '+53%', prob: '25%', contribution: '+13%', color: '#10B981', bg: '#F0FDF4' },
                { scenario: 'Base Case', target: '720 kr', return: '+25%', prob: '55%', contribution: '+14%', color: '#F59E0B', bg: '#FFFBEB' },
                { scenario: 'Bear Case', target: '400 kr', return: '-31%', prob: '20%', contribution: '-6%', color: '#EF4444', bg: '#FEF2F2' },
                { scenario: 'Förväntad avkastning', target: 'EV', return: '', prob: '100%', contribution: '+21%', color: '#0F172A', bg: '#F8FAFC', highlight: true },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-3xl border transition-all hover:shadow-lg ${item.highlight ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-100 bg-white'}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50" style={{ color: item.highlight ? '#FFF' : item.color }}>
                    {item.scenario}
                  </div>
                  <div className="text-2xl font-black tracking-tighter mb-1">{item.target}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold opacity-60">{item.prob} Sannolikhet</span>
                    <span className={`text-sm font-black ${item.highlight ? 'text-[#10B981]' : ''}`} style={{ color: !item.highlight ? item.color : undefined }}>
                      {item.contribution}
                    </span>
                  </div>
                  {!item.highlight && (
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Potential: {item.return}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <VerdictBox 
                verdict="KÖP"
                target="720 SEK"
                description="P/E ~10x för ett kvalitetsbolag med dominerande marknadsposition, 66%+ EBITDA-marginal, nettokassa och strukturella tillväxtmöjligheter i USA och LatAm. UKGC-risken är binär och reell — hantera med positionsstorlek snarare än avvaktning."
                date="29 mars 2026"
                accentColor={ACCENT}
              />
            </div>
            <Card title="TRE SAKER ATT BEVAKA" accentColor={ACCENT}>
              <ul className="space-y-6">
                <li className="flex gap-4 group">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-[#10B981] transition-colors leading-none">01</span>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block">UKGC-utfallet</span>
                    <span className="text-xs text-slate-500 leading-relaxed block">Det enskilt viktigaste okända för bolagets kortsiktiga framtid.</span>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-[#10B981] transition-colors leading-none">02</span>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block">USA & LatAm-tillväxt</span>
                    <span className="text-xs text-slate-500 leading-relaxed block">Bevaka Q1/26-rapporten den 22 april för tecken på acceleration.</span>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-[#10B981] transition-colors leading-none">03</span>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block">EPS-acceleration</span>
                    <span className="text-xs text-slate-500 leading-relaxed block">Om vinsttillväxten kan bryta konsensus på 1,8% bortom 2027e.</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </section>


        {/* XII. Scenarier (Bull/Base/Bear) */}
        <section id="scenarios" className="pt-24 pb-20">
          <FadeIn delay={900}>
            <Card mb={20}>
              <SectionHeader number="XII" title="Scenarier (Bull/Base/Bear)" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {[
                  {label:"🚀 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"880 kr",
                    triggers:["USA-tillväxt accelererar","Asien normaliseras helt","Marginaler återhämtar sig mot 68%"],
                    note:"Normaliserat P/E 16-18x vid högre tillväxt."},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"55%",pris:"720 kr",
                    triggers:["Stabil tillväxt i USA/LatAm","UKGC-granskning löses utan licensindragning","Marginaler kring 66%"],
                    note:"P/E 13-14x, återinförd utdelning 2026e."},
                  {label:"⚠️ Bear Case",color:T.red,bg:T.redL,prob:"20%",pris:"400 kr",
                    triggers:["UKGC drar in licensen","Contagion-risk till USA","Permanent marginalpress"],
                    note:"P/E 7-8x, osäkerhet kring framtida licenser."},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>

            {nextAnalysis && (
              <div className="mt-10 mb-10 text-left">
                <NextAnalysisButton analysis={nextAnalysis} />
              </div>
            )}
            <MultiplexAd />
            <AnalysisDisclaimer theme="light" />
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
