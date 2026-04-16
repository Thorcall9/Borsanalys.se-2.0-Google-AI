import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, AlertTriangle, TrendingUp, Info, Target, Wallet, Truck, Zap, ShieldCheck, Cpu, BarChart3 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import AdUnit from "../AdUnit";
import MultiplexAd from "../MultiplexAd";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";
import EditorialReadNext from "./EditorialReadNext";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#10B981", // Emerald green (matching Investor)
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
  {ar:"2019",v:432,e:false},{ar:"2020",v:338,e:false},{ar:"2021",v:372,e:false},
  {ar:"2022",v:473,e:false},{ar:"2023",v:553,e:false},{ar:"2024",v:568,e:false},
  {ar:"2025",v:479,e:false},{ar:"2026e",v:510,e:true},
];

const divData = [
  {ar:"2018",v:10.0,e:false},{ar:"2019",v:0,e:false},{ar:"2020",v:15.0,e:false},
  {ar:"2021",v:13.0,e:false},{ar:"2022",v:14.0,e:false},{ar:"2023",v:18.0,e:false},
  {ar:"2024",v:18.0,e:false},{ar:"2025e",v:13.0,e:true},{ar:"2026e",v:14.0,e:true},
];

const marginData = [
  {ar:"2019",v:11.1},{ar:"2020",v:8.4},{ar:"2021",v:11.0},
  {ar:"2022",v:10.7},{ar:"2023",v:12.0},{ar:"2024",v:12.2},
  {ar:"2025",v:10.7},
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:5,max:5},
  {key:"Finansiell Kvalitet",val:4,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxtutsikter",val:4,max:5},
  {key:"Riskprofil ⚠",val:3,max:5,inv:true},
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

function Card({children,mb=0}: any){
  return <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-5 p-4 md:p-6" style={{marginBottom:mb}}>{children}</div>;
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

function ScenarioCard({label,color,bg,prob,pris,upside,assumptions,requirements}){
  const [h,hP]=useHover();
  return(
    <div {...hP} style={{background:h?bg:T.surface,border:`1.5px solid ${h?color+"44":T.border}`,borderRadius:14,padding:20,transition:"all 0.22s ease",transform:h?"translateY(-4px)":"none",boxShadow:h?T.shadowLg:T.shadow,cursor:"default"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontWeight:800,color,fontSize:14}}>{label}</span>
        <Tag color={color} bg={color+"18"}>{prob}</Tag>
      </div>
      <div style={{fontSize:26,fontWeight:900,color,marginBottom:4,letterSpacing:-1}}>{pris}</div>
      <div style={{fontSize:11,color:T.muted,marginBottom:14}}>{upside} · 12 månader</div>
      
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:800,color:T.muted,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>Antaganden</div>
        <div style={{fontSize:12,color:T.ink,lineHeight:1.5,fontWeight:500}}>{assumptions}</div>
      </div>

      <div style={{background:color+"10",borderRadius:8,padding:"10px 12px",fontSize:12,color:T.sub,lineHeight:1.6}}>
        <div style={{fontSize:10,fontWeight:800,color,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Kräver</div>
        {requirements}
      </div>
    </div>
  );
}

interface VolvoDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

interface VolvoDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function VolvoDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: VolvoDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#10B981] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#10B981] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  AB Volvo
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">VOLV-B • VOLV-A</span>
                <span className="text-sm font-medium opacity-90">Industri • Fordon • Stockholm</span>
                
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
            <span className="text-sm font-bold tracking-tight">3.9 / 5.0 – Viktat betyg</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">322,4 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~660 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal</span>
              <div className="text-2xl font-black text-slate-900">19,0</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">4,04%</div>
              <span className="text-xs text-slate-500 mt-1 block">Total direktavkastning</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#10B981]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">345 kr</div>
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
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#10B981]' : 'text-slate-500'}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#10B981]' : 'bg-slate-400') 
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
                {( [
                  ["Bakgrund & Struktur","AB Volvo är en global ledare inom transport- och infrastrukturlösningar, noterad på Nasdaq Stockholm med tickern VOLV B. Bolaget designar, tillverkar och marknadsför lastbilar, bussar, anläggningsmaskiner samt marina och industriella motorer under varumärkena Volvo Trucks, Renault Trucks, Mack och Volvo CE."],
                  ["Affärsidé & Modell", <span>En central del av affärsmodellen är den <strong>breda serviceverksamheten</strong> — finansiering, försäkring, reservdelar och underhåll — som strukturellt balanserar de naturliga fluktuationerna i fordonsförsäljningen.</span>],
                  ["2025 Resultat & Utmaningar", "Helåret 2025 var utmanande med en nettoomsättning som sjönk 9% till 479,2 mdr SEK. Den justerade rörelsemarginalen föll till 10,7% och det operativa kassaflödet halverades till 21,8 mdr SEK. Trots detta visade serviceförsäljningen styrka med 5% tillväxt i Q4."],
                  ["Ägarstruktur","Industrivärden och Geely kvarstår som de största strategiska ägarna, vilket ger en stabil och långsiktig ägarbas för bolagets framtida utveckling."],
                ] as [string, React.ReactNode][]).map(([t,b])=>(
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
                Bakom de utmanande siffrorna för 2025 döljer sig en stark underliggande affär. Serviceförsäljningen ökade 5% i konstant valuta under Q4 och anläggningsmaskiner förbättrade marginalen till 13,9%. Volvo avslutar året med en nettokassa om 63,0 mdr SEK och bibehåller sin marknadsledande position i Europa för tunga lastbilar.
              </p>
            </div>
          </FadeIn>
        </div>

        <AdUnit slot="7332946752" />

        {/* ── STRATEGI & RISK ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Volvos konkurrensfördel vilar på tre pelare. Varumärkesstyrkan — globalt erkänd för säkerhet, kvalitet och hållbarhet — möjliggör en prispremie, särskilt i premiumsegmentet. I Europa tog Volvo Lastvagnar marknadsandel 19,0% (17,9%) under FY2025 och bibehöll marknadsledarskapet. Renault Trucks förbättrade till 9,4% (9,1%). Serviceaffären skapar höga byteskostnader via ett globalt nät av återförsäljare och underhållsavtal — Q4 visade serviceförsäljning +5% i konstant valuta trots svag fordonsmarknad.
                </p>
                <p style={{margin:"12px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Den teknologiska bredden är sällsynt: Coretura-JV med Daimler Truck (etablerat Q2 2025) delar kostnaden för en standardiserad mjukvaruplattform, Waabi-partnerskapet tog ett avgörande kliv i Q4 när Waabi Driver integrerades med Volvo VNL Autonomous, och Volvo Penta lanserade i januari 2026 sin första naturgasmotor G17 — riktad mot den snabbväxande datacentersektorn.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  ["Varumärke","Starka globala varumärken som Volvo, Mack och Renault.","★★★★☆"],
                  ["Servicenätverk","Oöverträffad global närvaro för service och delar.","★★★★★"],
                  ["Teknologi","Ledande inom batterielektriska och vätgaslösningar.","★★★★☆"],
                  ["Skalfördelar","En av världens största inköpare av komponenter.","★★★★☆"],
                  ["Switching Costs","Djup integration i kundernas logistikflöden.","★★★☆☆"],
                  ["Finansiell styrka","Möjliggör massiva FoU-investeringar över tid.","★★★★★"],
                ].map(([m,d,s])=><MoatCard key={m} title={m} desc={d} stars={s}/>)}
              </div>

              <div style={{marginTop: 32, display: "flex", flexDirection: "column", gap: 24}}>
                <div style={{padding: "16px 20px", background: T.bg, borderRadius: 12, borderLeft: `4px solid ${T.accent}`}}>
                  <div style={{fontSize: 11, fontWeight: 800, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8}}>LASTBILAR (67% AV INDUSTRI)</div>
                  <p style={{margin: 0, fontSize: 13.5, color: T.sub, lineHeight: 1.7}}>
                    Marknadsandel Europa tunga 19,0% — marknadsledare år 2. Nordamerika tufft (-15% leveranser FY2025). Mack Pioneer levererad Q4. Justerad marginal 9,8% FY2025.
                  </p>
                </div>

                <div style={{padding: "16px 20px", background: T.bg, borderRadius: 12, borderLeft: `4px solid ${T.gold}`}}>
                  <div style={{fontSize: 11, fontWeight: 800, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8}}>ANLÄGGNINGSMASKINER (18%)</div>
                  <p style={{margin: 0, fontSize: 13.5, color: T.sub, lineHeight: 1.7}}>
                    SDLG avyttrat sep 2025. Swecon-förvärv slutfört jan 2026. Justerad marginal 13,9% Q4 (11,8% Q4 2024) — tydlig förbättring. Orderingång +18% ex-SDLG.
                  </p>
                </div>

                <div style={{padding: "16px 20px", background: T.bg, borderRadius: 12, borderLeft: `4px solid ${T.accent}`}}>
                  <div style={{fontSize: 11, fontWeight: 800, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8}}>VOLVO PENTA (4%)</div>
                  <p style={{margin: 0, fontSize: 13.5, color: T.sub, lineHeight: 1.7}}>
                    Justerad marginal 17,4% FY2025 (17,2% FY2024) — bolagets starkaste. Leveranser +30% Q4. Stark efterfrågan generatoraggregat från datacenter och energisäkerhet.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* RELATED ANALYSIS CALLOUT */}
        {data.relatedAnalysis && <EditorialCallout {...data.relatedAnalysis} />}

        {/* ── FINANSIELL ── */}
        <div id="finansiell">
          <FadeIn delay={200}>
            <Card mb={20}>
              <SectionLabel number="III" title="Finansiell Analys"/>
              
              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Volvo har under de senaste åren uppvisat en imponerande finansiell disciplin. Trots utmaningar i leveranskedjor har bolaget lyckats bibehålla tvåsiffriga rörelsemarginaler och generera starka kassaflöden.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Nettoomsättning (Mdr SEK)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Stark tillväxt driven av pris och volym</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,700]}/>
                      <Tooltip content={<ChartTip unit=" Mdr"/>}/>
                      <Bar dataKey="v" name="Omsättning" radius={[5,5,0,0]}>
                        {revenueData.map((d,i)=><Cell key={i} fill={d.e?"transparent":T.accent} stroke={d.e?T.accent:"none"} strokeWidth={d.e?2:0} strokeDasharray={d.e?"5 3":"0"}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Rörelsemarginal (%)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Justerad rörelsemarginal</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={marginData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,15]}/>
                      <Tooltip content={<ChartTip unit="%"/>}/>
                      <Line type="monotone" dataKey="v" name="Marginal" stroke={T.accent} strokeWidth={3} dot={{fill:T.accent, r:4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:"24px 0 16px"}}>Finansiella nyckeltal</h3>
              <div style={{overflowX:"auto", marginBottom:8}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Nyckeltal","2023","2024","2025e","2026e"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Nyckeltal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Nettoomsättning (Mdr)","552,8","568,2","479,2","~510"],
                      ["Rörelsemarginal (just.)","12,0%","12,2%","10,7%","~11,5%"],
                      ["Vinst per aktie (kr)","24,50","23,80","~21,00","~23,50"],
                      ["Direktavkastning","6,3%","6,2%","4,04%","~4,5%"],
                      ["Nettokassa (Mdr)","83","~90","66","~75"],
                      ["ROE (%)","25,4%","24,8%","~20,0%","~22,0%"],
                    ].map(([label,...vals],ri)=>(
                      <tr key={label} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:600}}>{label}</td>
                        {vals.map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",textAlign:"right",color:ci===3?T.accent:T.sub,fontWeight:ci===3?700:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 style={{fontSize:14, fontWeight:800, color:T.ink, marginBottom:16, textTransform:"uppercase", letterSpacing:0.5}}>Utdelningsdetaljer 2026</h3>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
                    <thead>
                      <tr style={{textAlign:"left", color:T.muted, borderBottom:`1px solid ${T.border}`}}>
                        <th style={{padding:8}}>Typ</th>
                        <th style={{padding:8}}>Belopp</th>
                        <th style={{padding:8}}>Direktavk.</th>
                        <th style={{padding:8}}>X-dag</th>
                        <th style={{padding:8}}>Utbetalning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{padding:8}}>Ordinarie</td>
                        <td style={{padding:8}}>8,50 kr</td>
                        <td style={{padding:8}}>2,64%</td>
                        <td style={{padding:8}}>2026-04-09</td>
                        <td style={{padding:8}}>2026-04-15</td>
                      </tr>
                      <tr>
                        <td style={{padding:8}}>Extrautdelning</td>
                        <td style={{padding:8}}>4,50 kr</td>
                        <td style={{padding:8}}>1,40%</td>
                        <td style={{padding:8}}>2026-04-09</td>
                        <td style={{padding:8}}>2026-04-15</td>
                      </tr>
                      <tr style={{fontWeight:700, borderTop:`1px solid ${T.border}`}}>
                        <td style={{padding:8}}>Totalt</td>
                        <td style={{padding:8}}>13,00 kr</td>
                        <td style={{padding:8}}>4,04%</td>
                        <td style={{padding:8, color:T.muted}} colSpan={2}>Räknat på kurs 322,40 kr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Utdelning per aktie (kr)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Historisk och estimat</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={divData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<ChartTip unit=" kr"/>}/>
                      <Bar dataKey="v" name="Utdelning" radius={[4,4,0,0]}>
                        {divData.map((d,i)=><Cell key={i} fill={d.e?T.gold+"66":T.accent}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{background:T.accentL, borderRadius:16, padding:20, border:`1px solid ${T.accent}22`}}>
                  <div style={{display:"flex", gap:12, alignItems:"flex-start"}}>
                    <div style={{width:32, height:32, background:T.accent, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                      <TrendingUp size={18} color="#fff" style={{margin:"auto"}}/>
                    </div>
                    <div>
                      <div style={{fontSize:11, fontWeight:800, color:T.accent, textTransform:"uppercase", letterSpacing:0.5, marginBottom:6}}>Analyskommentar</div>
                      <p style={{margin:0, fontSize:13, color:T.ink, lineHeight:1.6}}>
                        <strong>Volvos kassaflöde är exceptionellt starkt.</strong> Bolaget har lyckats höja priserna för att kompensera för inflation och bibehålla marginalerna. Den stora nettokassan ger utrymme för både fortsatta investeringar i el-teknik och generösa extrautdelningar framöver.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── VÄRDERING ── */}
        <div id="vardering">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Värdering & Jämförelse"/>
              
              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Vid 322,40 kr handlas Volvo till P/E 19,1x på FY2025-vinsten — hög för ett cykliskt bolag i nedgångsfas, men marknaden prissätter en tydlig vinståterhämtning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  ["Aktiekurs (Apr 2026)", "322,40 kr", "Marknadspris"],
                  ["P/E FY2025", "19,1x", "Baserat på 16,94 kr"],
                  ["P/E 2026E", "15,5x", "Baserat på 20,91 kr"],
                  ["Direktavkastning", "4,04%", "Totalutdelning", true],
                ].map(([l,v,s,acc], i)=>(
                  <div key={i} style={{background:acc?T.accentL:T.bg, border:`1px solid ${acc?T.accent+"33":T.border}`, borderRadius:12, padding:14}}>
                    <div style={{fontSize:10, fontWeight:800, color:acc?T.accent:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4}}>{l}</div>
                    <div style={{fontSize:18, fontWeight:900, color:acc?T.accent:T.ink, letterSpacing:-0.5}}>{v}</div>
                    <div style={{fontSize:10, color:T.muted, fontStyle:"italic", marginTop:2}}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{overflowX:"auto", marginBottom:24}}>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`1px solid ${T.border}`}}>
                      <th style={{textAlign:"left", padding:"12px 8px", color:T.muted, fontWeight:600}}>Nyckeltal</th>
                      <th style={{textAlign:"right", padding:"12px 8px", color:T.muted, fontWeight:600}}>2024</th>
                      <th style={{textAlign:"right", padding:"12px 8px", color:T.muted, fontWeight:600}}>2025</th>
                      <th style={{textAlign:"right", padding:"12px 8px", color:T.muted, fontWeight:600}}>2026e</th>
                      <th style={{textAlign:"right", padding:"12px 8px", color:T.muted, fontWeight:600}}>2027e</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["EPS (kr)", "24,78", "16,94", "20,91", "24,19"],
                      ["P/E (vid 322,40 kr)", "13,1x", "19,1x", "15,5x", "13,4x"],
                      ["EV/EBIT", "10,6x", "16,1x", "—", "—"],
                      ["Utdelning (kr)", "18,50", "13,00", "16,17e", "18,30e"],
                      ["Direktavkastning (%)", "5,7%", "4,04%", "5,0%e", "5,7%e"],
                      ["ROE (%)", "27,1%", "18,5%", "—", "—"],
                    ].map(([label, ...values], i) => (
                      <tr key={i} style={{borderBottom:i===5?"none":`1px solid ${T.border}66`}}>
                        <td style={{padding:"12px 8px", fontWeight:500, color:T.ink}}>{label}</td>
                        {values.map((v, j) => (
                          <td key={j} style={{padding:"12px 8px", textAlign:"right", color:j>=2?T.accent:T.sub, fontWeight:j>=2?600:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{background:T.bg, borderRadius:16, padding:24, border:`1px solid ${T.border}`, marginBottom:24}}>
                <p style={{margin:0, fontSize:14, color:T.ink, lineHeight:1.7}}>
                  Om analytikerkonsensus om EPS 20,91 kr för 2026 levereras landar P/E på 15,5x — i linje med historiskt snitt. Nettokassan om 63,0 mdr SEK (ca 31 kr per aktie) utgör ett starkt golv på nedsidan. Eget kapital per aktie är 87,7 kr vilket ger P/B 3,7x — premiumvärdering motiverad av historiskt hög ROE men sträcker sig vid 322,40 kr.
                </p>
              </div>

              <div style={{background:T.accentL, borderRadius:16, padding:24, border:`1px solid ${T.accent}33`}}>
                <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
                  <div style={{width:40, height:40, background:T.accent, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <AlertTriangle size={20} color="#fff" style={{margin:"auto"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11, fontWeight:800, color:T.accent, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Analytikerkonsensus & Risker</div>
                    <p style={{margin:0, fontSize:13.5, color:T.ink, lineHeight:1.7}}>
                      Analytikerkonsensus (2026e EPS 20,91 kr) förutsätter en vinståterhämtning på +23% från FY2025. Det kräver att Nordamerika normaliseras och marginalen återgår mot 11-12%. Q1 2026 förväntas fortsatt tufft — tarifftryck på -1 mdr SEK och svagt Nordamerika. En besvikelse i Q1 kan skapa ett bättre ingångsläge.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>


        {/* ── TILLVÄXTMOTORER ── */}
        <div id="growth">
          <FadeIn delay={400}>
            <Card mb={20}>
              <SectionLabel number="V" title="Tillväxtmotorer & Triggers"/>
              
              <div style={{display:"grid", gridTemplateColumns:"1fr", gap:20, marginBottom: 32}}>
                {[
                  {
                    icon: <TrendingUp size={20} color={T.accent}/>,
                    bg: T.accentL,
                    title: "Cyklisk återhämtning — Nordamerika och Europa",
                    body: "VD Lundstedt konstaterade i Q4-rapporten att stabilisering sker på flera marknader och i vissa fall små förbättringar. Europeisk orderingång ökade +11% under Q4. Den nordamerikanska marknaden förväntas vara svag H1 2026 men normaliseras gradvis när EPA 2027-klarhet ges och lageruppbyggnad hos återförsäljare pågår. Den brasilianska marknaden kyls av räntor, men Volvo bibehåller 23,2% marknadsandel."
                  },
                  {
                    icon: <Target size={20} color="#10B981"/>,
                    bg: "#ECFDF5",
                    title: "Swecon — Vertikal integration i Europa",
                    body: "Swecon-förvärvet slutfördes den 31 januari 2026 och ger Volvo CE direkt kontroll över detaljhandelsledet i Sverige, Tyskland och Baltikum. Stärker kundrelationerna, accelererar serviceaffären och bör gradvis förbättra marginalerna i dessa nyckelmarknader. Finansierat delvis av SDLG-avyttringen om 8 mdr SEK (slutfört sep 2025)."
                  },
                  {
                    icon: <Zap size={20} color="#F59E0B"/>,
                    bg: "#FFFBEB",
                    title: "Volvo Penta — Datacenter och energisäkerhet",
                    body: "Volvo Penta levererade justerad marginal 17,4% FY2025 och leveranser +30% Q4 — driven av stark efterfrågan på generatoraggregat från Nordamerika och datacenters. I januari 2026 lanserades naturgasmotor G17 — ett strategiskt drag mot den snabbväxande energiinfrastrukturmarknaden. CoPilot-systemet lanserat för smart fordonshantering."
                  },
                  {
                    icon: <Cpu size={20} color="#6366F1"/>,
                    bg: "#EEF2FF",
                    title: "Autonoma lastbilar — Waabi och Volvo VNL",
                    body: "I oktober 2025 integrerades Waabi Driver framgångsrikt med Volvo VNL Autonomous — en milstolpe inom fysisk AI för autonoma lastbilstransporter. I november levererades första helt nya Mack Pioneer till en nordamerikansk kund. I januari 2026 levererade Volvo 125 nya VNL-lastbilar till Highlight Motor Group i Kanada — största ordern hittills för detta flaggskepp."
                  },
                  {
                    icon: <BarChart3 size={20} color="#EC4899"/>,
                    bg: "#FDF2F8",
                    title: "Anläggningsmaskiner — Tydlig marginalförbättring",
                    body: "Anläggningsmaskiner visade 13,9% justerad marginal Q4 (11,8% Q4 2024) — driven av positiv produktmix och förbättrad serviceaffär. Orderingång +18% ex-SDLG. Ny monteringsfabrik för bandgravmaskiner bekräftad i Eskilstuna. Nya elektriska L120-hjullastare levererade till europeiska och asiatiska marknader."
                  }
                ].map((item, i)=>(
                  <div key={i} style={{display:"flex", gap:16, background:item.bg, borderRadius:16, padding:20, border:`1px solid ${item.bg === T.accentL ? T.accent + "22" : "rgba(0,0,0,0.05)"}`}}>
                    <div style={{width:44, height:44, background:"#fff", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{fontSize:15, fontWeight:800, color:T.ink, marginBottom:6}}>{item.title}</div>
                      <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.65}}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── RISKPROFIL ── */}
        <div id="risk">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* STYRKOR */}
                <div style={{background:"#F0FDF4", borderRadius:16, padding:20, border:"1px solid #DCFCE7"}}>
                  <div style={{fontSize:11, fontWeight:800, color:"#166534", textTransform:"uppercase", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:8}}>
                    <ShieldCheck size={14}/> STYRKOR
                  </div>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13, color:"#166534", lineHeight:1.7}}>
                    <li>Stark premiumposition — marknadsandel 19,0% i Europa (tunga lastbilar) FY2025</li>
                    <li>Nettokassa 63,0 mdr SEK — exceptionell finansiell styrka</li>
                    <li>Serviceaffären visar motståndskraft — tillväxt +5% Q4</li>
                    <li>Volvo Penta: justerad marginal 17,4% — stabil kassaflödesgenerator</li>
                    <li>Coretura-JV med Daimler Truck delar kostnaden för mjukvaruplattform</li>
                    <li>Generös utdelning: 13 kr per aktie för FY2025 (4,04%)</li>
                  </ul>
                </div>

                {/* SVAGHETER */}
                <div style={{background:"#FEF2F2", borderRadius:16, padding:20, border:"1px solid #FEE2E2"}}>
                  <div style={{fontSize:11, fontWeight:800, color:"#991B1B", textTransform:"uppercase", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:8}}>
                    <AlertTriangle size={14}/> SVAGHETER
                  </div>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13, color:"#991B1B", lineHeight:1.7}}>
                    <li>Lastbilsmarginal under press — 9,8% FY2025 vs 12,7% FY2024</li>
                    <li>Operativt kassaflöde industriverksamheten halverades FY2025</li>
                    <li>Nettokassa minskade kraftigt pga utdelning på 37,6 mdr</li>
                    <li>Nordamerika fortsatt svagt — leveranser -15% FY2025</li>
                    <li>Valutamotvind systematisk — negativ påverkan -2,1 mdr SEK Q4</li>
                  </ul>
                </div>

                {/* MÖJLIGHETER */}
                <div style={{background:"#EFF6FF", borderRadius:16, padding:20, border:"1px solid #DBEAFE"}}>
                  <div style={{fontSize:11, fontWeight:800, color:"#1E40AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:8}}>
                    <TrendingUp size={14}/> MÖJLIGHETER
                  </div>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13, color:"#1E40AF", lineHeight:1.7}}>
                    <li>Cyklisk uppgångsfas närmar sig — stabilisering på flera marknader</li>
                    <li>Swecon-förvärvet stärker vertikal integration och serviceandel</li>
                    <li>Anläggningsmaskiner vänder — marginal 13,9% Q4</li>
                    <li>Volvo Penta: naturgasmotor G17 lanserades jan 2026</li>
                    <li>Autonoma lastbilar — Waabi Driver integrerat med Volvo VNL</li>
                    <li>Infrastrukturinvesteringar globalt driver anläggningsmaskiner</li>
                  </ul>
                </div>

                {/* HOT */}
                <div style={{background:"#FFFBEB", borderRadius:16, padding:20, border:"1px solid #FEF3C7"}}>
                  <div style={{fontSize:11, fontWeight:800, color:"#92400E", textTransform:"uppercase", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:8}}>
                    <Info size={14}/> HOT
                  </div>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13, color:"#92400E", lineHeight:1.7}}>
                    <li>Tariffer och handelspolitik — Q1 2026 förväntas -1 mdr SEK</li>
                    <li>Nordamerikansk lastbilsmarknad — EPA 2027-regler skapar paus</li>
                    <li>Lastbilskartellen — 6 mdr SEK i avsättningar, solidariskt ansvar</li>
                    <li>Stärkande krona — SEK/USD gick från 11,00 till 9,17 under 2025</li>
                    <li>Avgaskomponent-reservering — resterande del fortfarande osäker</li>
                  </ul>
                </div>
              </div>

              {/* DEEP DIVES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{background:T.bg, borderRadius:16, padding:24, border:`1px solid ${T.border}`}}>
                  <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:12}}>Lastbilskartellen — Den svårkvantifierbara risken</div>
                  <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.7}}>
                    EU-kommissionens bötesbeslut (juli 2016) lade fast att Volvo deltog i en konkurrensöverträdelse 1997-2011. Volvo betalade böter på 670 miljoner euro. Därefter har ca 3 000 skadeståndskrav inkommit från kunder i mer än 20 länder, inklusive krav på lastbilar sålda av andra tillverkare (solidariskt ansvar). Avsättningar om 6 mdr SEK gjordes i Q2 2023, och vid årets slut 2025 uppgick totala eventualförpliktelser till 14,4 mdr SEK. Volvo konstaterar självt att "ett ogynnsamt utfall kan väsentligt påverka finansiellt resultat."
                  </p>
                </div>

                <div style={{background:T.bg, borderRadius:16, padding:24, border:`1px solid ${T.border}`}}>
                  <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:12}}>Tariffer och handelspolitik — Q1 2026 förväntas tufft</div>
                  <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.7}}>
                    Volvo belyser i risknotesen att tariffer och handelshinder "kraftigt ökat osäkerheten" och kan "störa befintliga leverantörskedjor." Nettoeffekten från tariffer var -800 Mkr i Q4 2025 och förväntas bli -1 mdr SEK i Q1 2026. En stärkande SEK lade på ytterligare -2,1 mdr SEK på rörelseresultatet under Q4. SEK/USD gick från 11,00 vid årsskiftet 2024 till 9,17 vid årsskiftet 2025. Situationen "förändras snabbt och är komplex att analysera."
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── ESG ── */}
        <div id="esg">
          <FadeIn delay={600}>
            <Card mb={20}>
              <SectionLabel number="VII" title="ESG & Makro"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ["🌱","Miljö (E)","5/5","Ledande inom fossilfria transporter och cirkulära modeller.",T.green,T.greenL],
                  ["👥","Socialt (S)","4/5","Starkt fokus på säkerhet och arbetsmiljö globalt.",T.accent,T.accentL],
                  ["🏛️","Styrning (G)","4/5","Stabil ägarstruktur och tydlig strategisk inriktning.",T.green,T.greenL],
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

        {/* ── SEGMENTANALYS ── */}
        <div id="segmentanalys">
          <FadeIn delay={700}>
            <Card mb={20}>
              <SectionLabel number="VIII" title="Segmentanalys"/>
              
              <div className="overflow-x-auto -mx-4 md:mx-0 mb-6">
                <table className="w-full border-collapse text-xs md:text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                      <th className="p-3 text-left font-bold text-slate-900">Segment</th>
                      <th className="p-3 text-right font-bold text-slate-900">Omss. FY2025 (mdr)</th>
                      <th className="p-3 text-right font-bold text-slate-900">Just. marginal FY2025</th>
                      <th className="p-3 text-right font-bold text-slate-900">Just. marginal Q4 2025</th>
                      <th className="p-3 text-left font-bold text-slate-900">Trend & Kommentar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Lastbilar", "323,5", "9,8%", "9,5%", "Ned från 12,7%. Europa stark, Nordamerika svagt. Mack Pioneer levererad."],
                      ["Anläggningsmaskiner", "81,6", "13,3%", "13,9%", "Q4 förbättring tydlig. Swecon slutfört jan 2026. SDLG borta."],
                      ["Bussar", "25,1", "9,1%", "9,0%", "Stabilt. Elbuss +55% FY2025. Tariffer påverkar nordamerikanska bussar negativt."],
                      ["Volvo Penta", "20,6", "17,4%", "11,9%", "Starkt FY (+5% resultat). Q4 lägre pga ogynnsam mix. Datacenter driver tillväxt."],
                      ["Financial Services", "26,5", "14,8%*", "13,4%*", "Portfölj +2% i konstant valuta. Ökade kreditreserveringar syns."],
                      ["Totalt", "479,2", "10,7%", "10,3%", "Stabilisering Q4. Q1 2026 fortsatt tufft pga tariffer och svagt Nordamerika."],
                    ].map(([s, o, m, q, t], i) => (
                      <tr key={i} className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${s === "Totalt" ? "bg-slate-50/80 font-bold" : ""}`}>
                        <td className="p-3 text-slate-900">{s}</td>
                        <td className="p-3 text-right text-slate-700">{o}</td>
                        <td className="p-3 text-right text-slate-700">{m}</td>
                        <td className="p-3 text-right text-slate-700">{q}</td>
                        <td className="p-3 text-slate-500 leading-relaxed">{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-400 italic mb-8">* Financial Services marginal beräknad på justerat rörelseresultat / nettoomsättning.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">RT</div>
                    <h3 className="text-sm font-bold text-slate-900">Renault Trucks — Positiv överraskning</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Renault Trucks var en positiv överraskning: orderingången ökade +15% och leveranserna +11% under Q4, med marknadsandel för tunga lastbilar i Europa förbättrad till 9,4% (9,1%).
                  </p>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">DF</div>
                    <h3 className="text-sm font-bold text-slate-900">Dongfeng — Kinesisk återhämtning</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dongfeng Commercial Vehicles (ej konsoliderat) levererade +20% till 32 848 lastbilar under Q4 och +21% helåret — en stark indikation på kinesisk efterfrågehämtning.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">AI Observation</div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < 3 ? "#10B981" : "none"} color={i < 3 ? "#10B981" : "rgba(255,255,255,0.2)"} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3">3/5 — AI-indikationer & Marknadssentiment</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    AI-indikationer pekar på en marknad som redan prisar in återhämtning, vilket begränsar kortsiktig uppsida. Samtidigt visar serviceaffärens motståndskraft och orderingång i elektrifiering positiva underliggande signaler. Ingen tydlig negativ avvikelse, men heller inget "edge-case" fynd.
                  </p>
                </div>
                <BarChart3 className="absolute -right-8 -bottom-8 text-white/5 w-48 h-48" />
              </div>
            </Card>
          </FadeIn>
        </div>


        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={800}>
            <Card mb={20}>
              <SectionLabel number="IX" title="Sammanfattning & Investeringsbeslut"/>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
                <div className="space-y-6">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    AB Volvo är ett kvalitetsbolag med stark premiumposition, robust balansräkning (63 mdr SEK nettokassa) och en tydlig strategi för den teknologiska omställningen. Serviceaffären ger strukturell stabilitet, Volvo Penta levererar rekordhöga marginaler och anläggningsmaskiner visar tydlig förbättring. Den generösa utdelningen om 13 kr (4,04% direktavkastning) är ett konkret bevis på finansiell styrka.
                  </p>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    Aktiekursen 322,40 kr speglar redan mycket av den cykliska återhämtningen — P/E 19,1x på FY2025-vinst och 15,5x på 2026e ger begränsat uppside i bascaset. Q1 2026 förväntas tufft med -1 mdr SEK i tarifftryck och svagt Nordamerika. En besvikelse i Q1-rapporten (24 april 2026) kan skapa ett bättre ingångsläge under 300 kr, där direktavkastningen på ordinarie utdelning (8,50 kr) överstiger 2,8%.
                  </p>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tre nyckeltal att följa</div>
                    <ul className="space-y-2">
                      {[
                        "Lastbilsmarginal återvänder mot 11-12% under H2 2026.",
                        "Operativt kassaflöde industri återhämtar sig mot 35-40 mdr SEK.",
                        "Kartellkostnaderna hålls inom avsatta 6 mdr SEK."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                          <span className="text-emerald-500 font-bold">({i+1})</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Slutsats</div>
                      <p className="text-sm text-slate-800 font-medium">
                        <strong>BEVAKA</strong> — Riktkurs 345 kr (+7%). Volvo är ett långsiktigt stabilt innehav men kurs 322,40 kr ger begränsat utrymme. Befintliga ägare bör behålla och ta emot 13 kr i utdelning. För nya investerare: avvakta Q1-rapporten 24 april 2026.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-600 text-white rounded-2xl p-8 text-center shadow-lg md:sticky md:top-24 min-w-[240px]">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Rekommendation</div>
                  <div className="text-4xl font-black mb-6 tracking-tighter">BEVAKA</div>
                  <div className="h-px bg-white/20 mb-6" />
                  <div className="text-3xl font-black mb-1">345 kr</div>
                  <div className="text-xs opacity-80 mb-6 uppercase tracking-wider">Riktkurs (12m)</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Uppsida</span>
                      <span className="font-bold">+6%</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">Utdelning</span>
                      <span className="font-bold">4,0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Totalavk.</span>
                      <span className="font-bold text-emerald-300">~10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {data.nextSteps && (
          <EditorialReadNext recommendations={data.nextSteps} />
        )}

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={900}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier (Bull/Base/Bear)"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 mb-8">
                {[
                  {
                    label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"390 kr",upside:"+20%",
                    assumptions:"Marginal återhämtar sig mot 12% Nordamerika normaliseras H2 2026 EPS 2026e 20,91 kr levereras",
                    requirements:"Nordamerikansk lastbilsmarknad normaliseras efter EPA 2027-klarhet, Swecon-integration lyfter serviceandelen, valutamotvinden minskar och kartellkostnaderna hålls inom avsatt belopp. P/E expansion mot 18-19x på 2026e-vinst."
                  },
                  {
                    label:"📊 Base Case",color:T.gold,bg:T.goldL,prob:"50%",pris:"345 kr",upside:"+6%",
                    assumptions:"Marginal ~10,5-11% FY2026 EPS ~20 kr Utdelning 13 kr bibehålls",
                    requirements:"Stabil europeisk marknad, gradvis normalisering i Nordamerika H2 2026, Swecon bidrar positivt, kassaflöde återhämtar sig mot 30-35 mdr och kartellkostnader hålls inom avsatt ram. Värdering 16-17x P/E på 2026e-vinst."
                  },
                  {
                    label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"25%",pris:"230 kr",upside:"-29%",
                    assumptions:"Marginal faller under 9% Kartellkostnader överstiger 6 mdr Nordamerika försvagas ytterligare",
                    requirements:"Global recession pressar lastbilar och anläggningsmaskiner simultant, tariffer eskalerar, kartelldomslut med solidariskt ansvar överstiger avsättningar kraftigt och SEK fortsätter stärkas mot USD/EUR."
                  },
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Det sannolikhetsviktade utfallet landar kring <strong>330 kr</strong> — nära nuvarande kurs. Tre fokusområden dominerar osäkerheten för 2026: (1) Nordamerikansk normalisering efter EPA 2027-klarhet. (2) Kartellkostnader — hålls avsättningarna? (3) Valutautvecklingen — en försvagad krona mot USD/EUR är den enklaste positiva katalysatorn för Volvo.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  Lundstedts budskap från Q4-rapporten är tydligt: stabilisering syns, framtiden är osäker, men Volvo är väl positionerat när marknaderna går in i nästa cykliska uppgång.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>


        {nextAnalysis && (
          <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16 mb-8 text-left">
            <NextAnalysisButton analysis={nextAnalysis} />
          </div>
        )}
        
        <MultiplexAd />
        <AnalysisDisclaimer theme="light" />
      </div>
    </div>
  );
}
