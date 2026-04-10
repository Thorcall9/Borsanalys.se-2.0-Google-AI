import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, Loader2 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell, ComposedChart
} from "recharts";
import AdUnit from "../AdUnit";
import MultiplexAd from "../MultiplexAd";
import NextAnalysisButton from "../analysis/NextAnalysisButton";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#0057FF",
  accentL: "#EBF1FF",
  red:     "#D9363E",
  redL:    "#FEF0F0",
  green:   "#0D7A4E",
  greenL:  "#EDFAF3",
  gold:    "#B07D2A",
  goldL:   "#FDF6E7",
  shadow:  "0 1px 3px rgba(13,27,42,0.06),0 4px 16px rgba(13,27,42,0.06)",
  shadowMd:"0 4px 24px rgba(13,27,42,0.10)",
  shadowLg:"0 8px 40px rgba(13,27,42,0.13)",
};

const omsData = [
  {ar:"2021",v:140.8,e:false},{ar:"2022",v:177.0,e:false},{ar:"2023",v:232.3,e:false},
  {ar:"2024",v:290.4,e:false},{ar:"2025",v:309.1,e:false},{ar:"2026e",v:311.3,e:true},{ar:"2027e",v:332.2,e:true},
];
const epsData = [
  {ar:"2021",v:10.40,e:false},{ar:"2022",v:12.26,e:false},{ar:"2023",v:18.67,e:false},
  {ar:"2024",v:22.67,e:false},{ar:"2025",v:23.05,e:false},{ar:"2026e",v:22.6,e:true},{ar:"2027e",v:23.8,e:true},
];
const margData = [
  {ar:"2021",brutto:83.2,ebit:41.7,netto:33.9},{ar:"2022",brutto:83.9,ebit:42.3,netto:31.4},
  {ar:"2023",brutto:84.6,ebit:44.2,netto:36.0},{ar:"2024",brutto:84.7,ebit:44.2,netto:34.8},
  {ar:"2025",brutto:81.0,ebit:41.3,netto:33.1},
];
const peData = [
  {ar:"2024",v:27.52,e:false},{ar:"2025",v:14.10,e:false},
  {ar:"Nu",v:10.24,e:"nu"},{ar:"2026e",v:10.47,e:true},{ar:"2027e",v:9.9,e:true},
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell",val:4,max:5},
  {key:"Värdering",val:4,max:5},
  {key:"Tillväxt",val:3,max:5},
  {key:"Risk ⚠",val:2,max:5,inv:true},
  {key:"ESG & Makro",val:4,max:5},
  {key:"AI-obs.",val:3,max:5},
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

function ScorePill({label,val,max,color}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{display:"flex",alignItems:"center",gap:8,background:h?color+"18":T.bg,border:`1.5px solid ${h?color+"55":T.border}`,borderRadius:24,padding:"6px 14px",transition:"all 0.18s ease",cursor:"default"}}>
      <span style={{fontSize:12,color:h?T.ink:T.sub,fontWeight:600,transition:"color 0.18s"}}>{label}</span>
      <span style={{fontSize:12,fontWeight:800,color}}>{val}/{max}</span>
    </div>
  );
}

function TabBtn({label,active,onClick}){
  const [h,hP]=useHover();
  return(
    <button onClick={onClick} {...hP} style={{background:"none",border:"none",cursor:"pointer",padding:"14px 20px",fontSize:13.5,fontWeight:600,color:active?T.ink:h?T.sub:T.muted,borderBottom:`2px solid ${active?T.accent:"transparent"}`,transition:"all 0.18s ease",letterSpacing:0.1,whiteSpace:"nowrap"}}>
      {label}
    </button>
  );
}

function KopBadge(){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{display:"inline-flex",alignItems:"center",gap:8,background:h?T.green:T.greenL,border:`1.5px solid ${h?T.green:T.green+"44"}`,borderRadius:24,padding:"7px 18px",transition:"all 0.2s ease",cursor:"default"}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:h?"#fff":T.green,transition:"background 0.2s"}}/>
      <span style={{fontSize:14,fontWeight:800,color:h?"#fff":T.green,letterSpacing:0.5}}>KÖP</span>
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

interface NovoNordiskDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function NovoNordiskDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: NovoNordiskDeepDiveProps){
  const { ticker } = useParams();
  const [mounted,setMounted]=useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const t=setTimeout(()=>setMounted(true),50);
    return()=>clearTimeout(t);
  },[]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!ticker) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/analysis/${ticker}`);
        if (response.ok) {
          const data = await response.json();
          setAnalysisData(data);
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [ticker]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00A86B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#00A86B] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Assessment & Title */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#00A86B] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">{analysisData?.verdict || "KÖP"}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  {analysisData?.companyName || "Novo Nordisk A/S"}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">{analysisData?.ticker || "NOVO-B • NVO"}</span>
                <span className="text-sm font-medium opacity-90">Läkemedel • Diabetes & Fetma • Köpenhamn</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#00A86B] border-white' 
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  <Star size={14} fill={isInWatchlist ? "currentColor" : "none"} />
                  {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Total Score */}
          <div className="flex flex-col items-start md:items-end w-full md:w-64">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tighter">{analysisData?.totalRating || "33"}/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: `${((analysisData?.totalRating || 33) / 40) * 100}%` }} />
            </div>
            <span className="text-sm font-bold tracking-tight">{((analysisData?.totalRating || 33) / 40 * 100).toFixed(1).replace('.', ',')} % – {analysisData?.totalRating >= 30 ? "Stark kvalitetsaktie" : "Intressant case"}</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">~DKK 236</div>
              <span className="text-xs text-slate-500 mt-1 block">Mars 2026 estimat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~DKK 1 050 Mdr</div>
              <span className="text-xs text-red-500 font-bold mt-1 block">−62% från ATH</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E 2026E</span>
              <div className="text-2xl font-black text-slate-900">~10,4x</div>
              <span className="text-xs text-[#00A86B] font-bold mt-1 block">Historiskt lågt</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavk.</span>
              <div className="text-2xl font-black text-slate-900">~4,8%</div>
              <span className="text-xs text-slate-500 mt-1 block">2026 estimat</span>
            </div>

            {/* PAYWALL */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#00A86B]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">395 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">vårat base case för 2026</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#00A86B]">
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
              const pct = val / max;
              const isWarning = key.includes('⚠');
              return (
                <div 
                  key={key}
                  className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#00A86B]/30 transition-colors"
                >
                  {isWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                  <span className="text-xs font-bold text-slate-600">{key.replace(' ⚠', '')}</span>
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#00A86B]' : 'text-slate-500'}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#00A86B]' : 'bg-slate-400') 
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
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
                {[
                  ["Bakgrund & Struktur", analysisData?.analysisText || "Novo Nordisk grundades 1923 i Danmark och är världens ledande läkemedelsbolag inom diabetes och fetma. Bolaget kontrolleras av Novo Nordisk Foundation via Novo Holdings – en stiftelsestruktur som omöjliggör fientliga uppköp och skapar ett genuint långsiktigt perspektiv."],
                  ["Affärsmodell","Patentskyddade receptläkemedel med återkommande intäkter – patienter tar medicinen kontinuerligt, likt en prenumeration. Bruttomarginalen på ~81% reflekterar unik prissättningsmakt. GLP-1-klassen (Ozempic®, Wegovy®, Rybelsus®) genererar merparten av DKK 309 Mdr omsättning 2025."],
                  ["Ledning","Maziar Mike Doustdar tillträdde som VD 2025, med bakgrund som EVP International Operations. Styrelseordförande Lars Rebien Sørensen är en av Europas mest erfarna läkemedelsledare med 16 år som VD i bolaget."],
                  ["Ägarstruktur","Novo Holdings äger alla A-aktier (100 röster/aktie) och ~28% av B-aktierna = röstmajoritet. A-aktierna kan ej avyttras per stiftelsens stadgar. Free float av B-aktier är 94,1%. Stabilt ankare som eliminerar kortsiktig spekulationsrisk."],
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
                Novo Nordisk är ett av de högst kvalitativa bolagen på den globala börsen. Nedgången under 2025 (−48%) drevs av tre faktorer: <strong>MFN-avtalet i USA, ökad konkurrens från Eli Lillys tirzepatide</strong> och en besvikande CagriSema-data (22,7% viktnedgång – kliniskt imponerande men lägre än orealistiska förväntningar). Det är viktigt att skilja tillfällig motvind från strukturell försämring. P/E ~10× är sällan skådat för ett bolag med denna uthållighet – marknaden prisar in permanent skada som sannolikt är överdrivet pessimistisk.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── STRATEGI & RISK ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24}}>
                {[
                  ["💪 Styrkor",T.green,T.greenL,["Global marknadsledare GLP-1 (59,6% branded volymandel)","Semaglutide – världens mest sålda läkemedelsmolekyl","Unik stiftelsestruktur – extremt långsiktigt ägande","ROE ~61%, ROIC ~38% – exceptionell lönsamhet"]],
                  ["⚠️ Svagheter",T.gold,T.goldL,["Hög koncentrationsrisk – semaglutide = merparten av intäkterna","Fallande bruttomarginal 2025 (84,7% → 81,0%)","Ny VD med begränsat track record i rollen","Negativ omsättningstillväxt 2026e"]],
                  ["🚀 Möjligheter",T.accent,T.accentL,["CagriSema FDA-ansökan inlämnad – 22,7% viktnedgång fas 3","Wegovy-piller godkänt jan 2026 – öppnar 100M+ patienter","Zenagamtide (amycretin) i fas 3 – nästa generations GLP-1","~1 miljard potentiella patienter globalt i fetma"]],
                  ["🔥 Hot",T.red,T.redL,["MFN-avtal pressar US-realiserade priser","Ozempic patentexpiry EU 2026 – generika","Eli Lilly/tirzepatide tar aktivt marknadsandelar","Medicaid-nedskärningar minskar täckning"]],
                ].map(([title,color,bg,items]: [string, string, string, string[]])=>(
                  <div key={title} style={{background:bg,border:`1.5px solid ${color}22`,borderRadius:12,padding:16}}>
                    <div style={{fontSize:13,fontWeight:700,color,marginBottom:10}}>{title}</div>
                    <ul style={{margin:0,paddingLeft:16}}>
                      {items.map((item: string,i: number)=><li key={i} style={{color:T.sub,fontSize:13,marginBottom:6,lineHeight:1.6}}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[
                  ["Immateriella tillgångar","Patent 2026–2032 (USA). Ozempic/Wegovy starkt skyddade.","★★★★★"],
                  ["Switching costs","Patienter och läkare byter sällan fungerande behandling.","★★★★☆"],
                  ["Kostnadsfördel","Vertikal integration via Catalent-fabrikerna.","★★★★☆"],
                  ["Skalfördelar","DKK 309 Mdr ger prismakt gentemot betalare och distributörer.","★★★★★"],
                  ["Varumärke","Ozempic® är ett globalt pop-kulturellt fenomen.","★★★★★"],
                  ["Nätverkseffekter","Real-world data och läkarrelationer växer med skalan.","★★★☆☆"],
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
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Omsättning (MDKK)</div>
              <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Fylld = historisk · Blå kontur = estimat</div>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={omsData} margin={{top:4,right:16,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,400]}/>
                  <Tooltip content={<ChartTip unit=" MDKK"/>}/>
                  <Bar dataKey="v" name="Omsättning" radius={[5,5,0,0]}>
                    {omsData.map((d,i)=><Cell key={i} fill={d.e?"transparent":T.accent} stroke={d.e?T.accent:"none"} strokeWidth={d.e?2:0} strokeDasharray={d.e?"5 3":"0"}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div style={{height:1,background:T.border,margin:"24px 0"}}/>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Vinst per aktie – EPS (DKK)</div>
              <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Streckad punkt = estimat</div>
              <ResponsiveContainer width="100%" height={170}>
                <LineChart data={epsData} margin={{top:4,right:16,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,30]}/>
                  <Tooltip content={<ChartTip unit=" DKK"/>}/>
                  <Line type="monotone" dataKey="v" name="EPS" stroke={T.accent} strokeWidth={2.5}
                    dot={(props: any)=>{const{cx,cy,payload}=props;return<circle key={cx} cx={cx} cy={cy} r={4} fill={payload.e?"transparent":T.accent} stroke={T.accent} strokeWidth={2} strokeDasharray={payload.e?"4 2":"0"}/>;}}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div style={{height:1,background:T.border,margin:"24px 0"}}/>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:12}}>Marginaler (%)</div>
              <ResponsiveContainer width="100%" height={170}>
                <LineChart data={margData} margin={{top:4,right:16,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[25,90]}/>
                  <Tooltip content={<ChartTip unit="%"/>}/>
                  <Line type="monotone" dataKey="brutto" name="Bruttomarginal" stroke="#0D9488" strokeWidth={2} dot={{r:3,fill:"#0D9488"}}/>
                  <Line type="monotone" dataKey="ebit" name="EBIT-marginal" stroke={T.accent} strokeWidth={2} dot={{r:3,fill:T.accent}}/>
                  <Line type="monotone" dataKey="netto" name="Nettomarginal" stroke={T.gold} strokeWidth={2} dot={{r:3,fill:T.gold}}/>
                </LineChart>
              </ResponsiveContainer>
              <div style={{display:"flex",gap:16,marginTop:10}}>
                {[["Bruttomarginal","#0D9488"],["EBIT-marginal",T.accent],["Nettomarginal",T.gold]].map(([l,c])=>(
                  <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:T.sub}}>
                    <div style={{width:20,height:2,background:c,borderRadius:2}}/>{l}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:"0 0 16px"}}>Nyckeltalstabell</h3>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Nyckeltal","2021","2022","2023","2024","2025","2026e","2027e"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Nyckeltal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Omsättning (MDKK)","140 800","177 000","232 300","290 400","309 064","311 300","332 200"],
                      ["EBIT (MDKK)","58 644","74 809","102 574","128 339","127 658","128 291","139 663"],
                      ["EPS (DKK)","10,40","12,26","18,67","22,67","23,05","22,6","23,8"],
                      ["EBIT-marginal","41,7%","42,3%","44,2%","44,2%","41,3%","41,2%","42,1%"],
                      ["ROE","–","–","–","80,8%","60,7%","–","–"],
                      ["Utdelning (DKK)","5,20","6,20","9,40","11,40","11,70","11,4","12,1"],
                      ["Direktavk.","–","–","–","1,8%","3,6%","~4,8%","~5,1%"],
                    ].map(([label,...vals],ri)=>(
                      <tr key={label} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:600}}>{label}</td>
                        {vals.map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",textAlign:"right",color:ci>=5?T.accent:T.sub,fontWeight:ci>=5?700:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{fontSize:11,color:T.muted,margin:"10px 0 0",fontStyle:"italic"}}>Blå = estimat (medel Börsdata + S&P-konsensus)</p>
            </Card>
          </FadeIn>
        </div>

        {/* ── VÄRDERING ── */}
        <div id="vardering">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Värdering & Multiplar"/>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>P/E-tal – historik & estimat</div>
              <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Sektorssnitt pharma ~20–25×. Grön = nuläge.</div>
              <ResponsiveContainer width="100%" height={190}>
                <ComposedChart data={peData} margin={{top:4,right:60,bottom:0,left:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,35]}/>
                  <Tooltip content={<ChartTip unit="×"/>}/>
                  <ReferenceLine y={22} stroke={T.border} strokeDasharray="5 3" label={{value:"Sektor ~22×",fill:T.muted,fontSize:11,position:"right"}}/>
                  <Bar dataKey="v" name="P/E" radius={[5,5,0,0]}>
                    {peData.map((d,i)=><Cell key={i} fill={d.e==="nu"?T.green:d.e?"transparent":T.accent} stroke={d.e===true?T.accent:"none"} strokeWidth={d.e===true?2:0} strokeDasharray={d.e===true?"5 3":"0"}/>)}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card mb={20}>
              <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:"0 0 16px"}}>Värderingsmultiplar</h3>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Multipel","2024","2025","Nu","2026e","Sektor","Signal"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Multipel"||h==="Signal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["P/E","27,5×","14,1×","10,2×","10,4×","~22×","Historiskt lågt"],
                      ["EV/EBIT","20,5×","11,5×","12,1×","~9×","~18×","Underprisad"],
                      ["P/S","9,6×","4,7×","3,4×","~3,4×","~5×","Rabatt mot sektor"],
                      ["PEG","–","–","~1,1×","1,1×","~1,7×","Attraktiv"],
                      ["Direktavk.","1,8%","3,6%","~5,0%","~4,8%","~2,5%","Dubbelt sektorn"],
                    ].map(([label,...vals],ri)=>(
                      <tr key={label} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:600}}>{label}</td>
                        {vals.slice(0,4).map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",textAlign:"right",color:ci===2?T.green:T.sub,fontWeight:ci===2?800:400}}>{v}</td>
                        ))}
                        <td style={{padding:"9px 12px",textAlign:"right",color:T.muted}}>{vals[4]}</td>
                        <td style={{padding:"9px 12px"}}><Tag color={T.green} bg={T.greenL}>{vals[5]}</Tag></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div style={{background:T.greenL,border:`1.5px solid ${T.green}33`,borderRadius:14,padding:"16px 20px",borderLeft:`4px solid ${T.green}`}}>
              <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                <strong>Värderingskonklusionen:</strong> Novo Nordisk handlas till ~50% rabatt mot sin egen historik och ~50% under pharma-sektorn på P/E-basis. PEG 1,1× indikerar att marknaden inte prisar in framtida tillväxt alls. Med ett <strong>riktkurs DKK 340–380</strong> (12 månader, base case) är uppsidan ~44–61%.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── TILLVÄXT ── */}
        <div id="tillvaxt">
          <FadeIn delay={400}>
            <Card mb={20}>
              <SectionLabel number="V" title="Tillväxtmotorer & Triggers"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  ["💊","CagriSema – FDA-ansökan inlämnad","22,7% viktnedgång fas 3. Potentiellt godkänd 2026. Ny blockbuster."],
                  ["🍊","Wegovy-piller (25mg oral)","FDA-godkänd jan 2026. Öppnar 100M+ patienter som föredrar tabletter."],
                  ["🔬","Zenagamtide fas 3 – 2026","GLP-1 + amylin. Fas 2: 14,5% viktnedgång på 36 veckor."],
                  ["🌍","Internationell expansion","APAC +19% CER, EUCAN +16% CER. Låg obesity-penetration = stor runway."],
                  ["🏥","MASH via Akero Therapeutics","Fas 3-program inom leversjukdom – stor marknad utan standardbehandling."],
                  ["🤖","AI-accelererad R&D","AI integreras i pipeline-beslut och tillverkningsplanering."],
                ].map(([icon,title,body])=><TriggerCard key={title} icon={icon} title={title} body={body}/>)}
              </div>
            </Card>
          </FadeIn>
        </div>


        {/* ── RISK ── */}
        <div id="risk">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              <div style={{background:T.redL,border:`1.5px solid ${T.red}33`,borderRadius:10,padding:"12px 16px",marginBottom:16,borderLeft:`4px solid ${T.red}`}}>
                <span style={{fontSize:13,fontWeight:700,color:T.red}}>Risknivå: HÖG · Score 2/5</span>
                <span style={{color:T.sub,fontSize:13,marginLeft:8}}>– bolagskvalitet och investeringsrisk är två olika saker</span>
              </div>
              {[
                ["HÖG",T.red,"MFN-prisstyrning USA","Most Favoured Nations-avtalet pressar realiserade priser med 10–20% om fullt implementerat."],
                ["HÖG",T.red,"Patent-expiration semaglutide","Ozempic & Rybelsus EU 2026. Generisk konkurrens urholkar priser internationellt."],
                ["MEDEL",T.gold,"Eli Lilly / tirzepatide","Mounjaro/Zepbound vinner marknadsandelar. Novo tappade 3,6 pp i diabetes 2025."],
                ["MEDEL",T.gold,"Pipeline-miss","CagriSema mötte höga förväntningar. Framtida studier kan underperforma."],
                ["LÅG",T.green,"Valutarisk USD/DKK","~55% av omsättningen i USD. Bolaget hedgar aktivt."],
                ["LÅG",T.green,"ESG/Compliance","Illegala compounding-produkter skapar safety-utmaningar men är hanterbara."],
              ].map(([niv,col,titel,desc])=>(
                <div key={titel} style={{display:"flex",gap:16,padding:"13px 0",borderBottom:`1px solid ${T.border}`,alignItems:"flex-start"}}>
                  <Tag color={col} bg={col+"18"}>{niv}</Tag>
                  <div>
                    <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:3}}>{titel}</div>
                    <div style={{color:T.sub,fontSize:13,lineHeight:1.6}}>{desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </FadeIn>
        </div>

        {/* ── ESG ── */}
        <div id="esg">
          <FadeIn delay={600}>
            <Card mb={20}>
              <SectionLabel number="VII" title="ESG & Makro"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                {[
                  ["🌱","Miljö (E)","3/5","GHG-utsläpp ökade +19% 2025 p.g.a. Catalent. Plast per patient sjunker −5%. Kapitalintensiva fabriksinvesteringar ökar avtryck kortsiktigt.",T.gold,T.goldL],
                  ["👥","Socialt (S)","5/5","45,6 Mn patienter nåddes. NovoCare-apoteksnätverk. Triple bottom line är inbyggt i kulturen.",T.green,T.greenL],
                  ["🏛️","Styrning (G)","4/5","Stiftelseägande ger exceptionellt långsiktigt perspektiv. Robust compliance-kultur.",T.accent,T.accentL],
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

        {/* ── AI ── */}
        <div id="ai">
          <FadeIn delay={700}>
            <Card mb={20}>
              <SectionLabel number="VIII" title="AI-observationer"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[
                  ["📰 Sentimentanalys","Sentimentet har skiftat från extremt negativt (CagriSema Q4 2024) till försiktigt positivt i Q1 2026 efter Wegovy-piller-godkännandet. Inga signifikanta insider-köp – neutralt."],
                  ["📊 Värderingsavvikelse","EPS 2025 ökade +1,7% men aktien föll −48%. Multipel-komprimering (P/E 40×→14×) skapar potentiell mean-reversion-möjlighet."],
                  ["⚠️ Varningssignal","Utdelningstillväxt föll 21%→2,6% och aktieåterköp drogs ned DKK 20→1,4 Mdr. Ledningen prioriterar balansräkningens styrning."],
                  ["🔍 Strukturell observation","Egna estimat (~DKK 311 Mdr 2026) mer optimistiska än bolagets guidance. Volymer förväntas kompensera prissänkningar. 2027-recovery ser trovärdig ut."],
                ].map(([title,body])=>(
                  <div key={title} style={{background:T.bg,border:`1.5px solid ${T.border}`,borderRadius:12,padding:16}}>
                    <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:8}}>{title}</div>
                    <div style={{color:T.sub,fontSize:13,lineHeight:1.7}}>{body}</div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={800}>
            <Card mb={20}>
              <SectionLabel number="IX" title="Sammanfattning & Investeringsbeslut"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"start"}}>
                <div>
                  {[
                    ["Är Novo Nordisk ett kvalitetsbolag?","Ja. Dominans i sin marknad, exceptionell lönsamhet, stark kassaflödesgenerering och djup pipeline. Stiftelseägarens stabilitet är svårreplikerad."],
                    ["Är det rimligt värderat?","P/E ~10× är anmärkningsvärt lågt. Reflekterar en pandemi av pessimism kring MFN, patent-loss och konkurrens – risker som är reella men sannolikt överdrivet inprissatta."],
                    ["Kan man hålla det 5–10 år?","Ja. Fetma-marknaden är strukturell (~1 miljard potentiella patienter). WHO erkänner GLP-1. Pipeline är djup. Stiftelseägaren garanterar stabilitet."],
                  ].map(([q,a])=>(
                    <div key={q} style={{marginBottom:16}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>→ {q}</div>
                      <div style={{fontSize:13,color:T.sub,lineHeight:1.7}}>{a}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:T.greenL,border:`1.5px solid ${T.green}44`,borderRadius:16,padding:"22px 26px",textAlign:"center",flexShrink:0,minWidth:180}}>
                  <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Rekommendation</div>
                  <div style={{fontSize:36,fontWeight:900,color:T.green,letterSpacing:-1}}>KÖP</div>
                  <div style={{height:1,background:T.green+"22",margin:"12px 0"}}/>
                  <div style={{fontSize:22,fontWeight:800,color:T.ink}}>DKK 340–380</div>
                  <div style={{fontSize:11,color:T.sub,marginTop:4}}>Riktkurs · 12 månader</div>
                  <div style={{marginTop:12,fontSize:12,color:T.sub}}>+44–61% + ~4,8% direktavk.</div>
                  <div style={{marginTop:10,fontSize:13,color:T.gold,fontWeight:700}}>29/40 · 72,5%</div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>


        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={900}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier (Bull/Base/Bear)"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginTop:20}}>
                {[
                  {label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"DKK 450+",
                    triggers:["CagriSema godkänd Q3 2026","MFN begränsas av domstol","Wegovy-piller >20% marknadsandel","Zenagamtide fas 3 stark data"],
                    note:"Omsättning DKK 370+ Mdr 2027, EBIT-marginal >46%, P/E re-rating 18–20×"},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"50%",pris:"DKK 340–380",
                    triggers:["Volymtillväxt kompenserar prissänkningar","CagriSema godkänd gradvis","International Operations driver tillväxt","Stabil pipeline"],
                    note:"Omsättning DKK 332 Mdr 2027, EBIT-marginal 42%, EPS DKK 23–24"},
                  {label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"25%",pris:"DKK 160–200",
                    triggers:["MFN slår kraftigt på US-intäkter","Tirzepatide tar dominant ställning","CagriSema FDA-reject","Generika slår hårdare"],
                    note:"Omsättning <DKK 280 Mdr 2027, EBIT-marginal <38%, P/E 8–9×"},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>

            <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px"}}>
              <p style={{margin:0,color:T.muted,fontSize:12,lineHeight:1.7}}>
                <strong style={{color:T.sub}}>Disclaimer:</strong> Denna analys är framtagen av börsanalys.se för informationsändamål och utgör inte finansiell rådgivning. Historisk avkastning garanterar inte framtida avkastning. Investering i aktier innebär alltid risk. Konsultera alltid en licensierad finansiell rådgivare innan investeringsbeslut.
              </p>
            </div>
            {nextAnalysis && (
              <div className="mt-10 mb-10 text-left">
                <NextAnalysisButton analysis={nextAnalysis} />
              </div>
            )}
            <MultiplexAd />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
