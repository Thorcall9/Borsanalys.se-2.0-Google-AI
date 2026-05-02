import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star, AlertTriangle, TrendingUp, Info, Target, Landmark, Zap, ShieldCheck, PieChart, BarChart3, Users } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import NordnetCTA from "./NordnetCTA";
import AdUnit from "./AdUnit";
import EditorialCallout from "./EditorialCallout";
import EditorialReadNext from "./EditorialReadNext";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#EE7023", // Swedbank Orange
  accentL: "#FFF7ED",
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
  {ar:"2022", v:47997},
  {ar:"2023", v:73426},
  {ar:"2024", v:74104},
  {ar:"2025", v:68736},
  {ar:"2026e", v:64500, e:true},
];

const epsData = [
  {ar:"2022", v:19.49},
  {ar:"2023", v:30.34},
  {ar:"2024", v:30.86},
  {ar:"2025", v:28.98},
  {ar:"2026e", v:26.50, e:true},
];

const roeData = [
  {ar:"2022", v:13.3},
  {ar:"2023", v:18.3},
  {ar:"2024", v:17.1},
  {ar:"2025", v:15.2},
  {ar:"2026e", v:13.5, e:true},
];

const allScores = [
  {key:"Affärsmodell",val:4,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell Kvalitet",val:4,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxtutsikter",val:3,max:5},
  {key:"Riskprofil ⚠",val:4,max:5,inv:true},
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
      {payload.map((p,i)=><div key={i} style={{color:T.sub}}>{p.name}: <strong style={{color:T.ink}}>{typeof p.value==="number"?p.value.toFixed(2):p.value}{unit}</strong></div>)}
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
        <div style={{fontSize:12,color:T.ink,lineHeight:1.6,fontWeight:500}}>{assumptions}</div>
      </div>

      <div style={{background:color+"10",borderRadius:8,padding:"10px 12px",fontSize:12,color:T.sub,lineHeight:1.6}}>
        <div style={{fontSize:10,fontWeight:800,color,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Kräver</div>
        {requirements}
      </div>
    </div>
  );
}

interface SwedbankDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function SwedbankDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: SwedbankDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#EE7023] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#EE7023] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  Swedbank AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">SWED A</span>
                <span className="text-sm font-medium opacity-90">Bank / Finans • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#EE7023] border-white' 
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
            <span className="text-sm font-bold tracking-tight">3.6 / 5.0 – Kvalitetsbetyg</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">321,10 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~361 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (2025)</span>
              <div className="text-2xl font-black text-slate-900">11,1</div>
              <span className="text-xs text-slate-500 mt-1 block">Normaliserat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">9,3%</div>
              <span className="text-xs text-[#EE7023] font-bold mt-1 block">Inkl. specialutdelning</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#EE7023]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">330-360 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">12 månaders sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#EE7023]">
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
                  className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#EE7023]/30 transition-colors"
                >
                  {isWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                  <span className="text-xs font-bold text-slate-600">{key.replace(' ⚠', '')}</span>
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#EE7023]' : 'text-slate-500'}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#EE7023]' : 'bg-slate-400') 
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

        <NordnetCTA variant="high" />

        {/* ── ÖVERSIKT ── */}
        <div id="oversikt">
          <FadeIn>
            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {( [
                  ["Bakgrund & Struktur","Swedbank är en nordisk universalbank med tyngdpunkt i Sverige och Baltikum. Banken erbjuder utlåning, sparande, betalningar, kort, kapitalförvaltning, försäkring och företagsfinansiering. Under 2025 kom 71 procent av intäkterna från Sverige, 25 procent från Baltikum sammantaget och 4 procent från övriga marknader."],
                  ["Kunder & Marknader", <span>Banken har nära <strong>7,3 miljoner privatkunder</strong> och 545 000 företagskunder. Marknadsledare i Baltikum för sjunde året i rad med omkring 5,7 miljoner digitala interaktioner per dag.</span>],
                  ["Affärsmodell", "Universalbank som är navet i kundens ekonomi. Intäkter från räntenetto, provisionsnetto (Robur), kapitalförvaltning, betalningar och företagsaffär. Modellen skapar höga byteskostnader."],
                  ["Organisation", "Verksamheten är organiserad i fyra affärsområden: Swedish Banking, Baltic Banking, Corporates and Institutions samt Premium and Private Banking."],
                  ["Ledning & Sanering", "VD Jens Henriksson (sedan 2019) har fört banken från sanering till att leverera på finansiella mål. 'Swedbank 15/27' siktar på minst 15 procents avkastning på eget kapital."],
                  ["Ägarstruktur & Personal", "Sparbanksgruppen är största ägare (13,2%) följt av Folksam och Swedbank Robur. Totalt antal anställda uppgick till 18 638 vid utgången av 2025."],
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
                Swedbank är ett kvalitetsbolag med stark marknadsposition, låg kostnadsbas, mycket stark kreditkvalitet och robust kapitalisering. För en bank är det främst lönsamhet, kapitalstyrka och utdelningskapacitet som bär caset. Vid nuvarande nivå är aktien en bra bas i en portfölj för utdelningsinvesterare, men ett tydligare köpläge uppstår vid kursfall mot 290–300 kr.
              </p>
            </div>
          </FadeIn>
        </div>


        {/* ── STRATEGI & MOAT ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Moaten bygger på fem huvudpelare: ett mycket starkt varumärke, Sparbanksekosystemets unika distributionskraft, en av Europas lägsta kostnadskvoter (K/I 0,36), ledande digital distribution och strategiska strukturaffärer. Swedbank är djupt förankrad i svenska hushåll och har en ledande marknadsposition i Baltikum, där kredittillväxten varit klart högre än i Sverige.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Distributionen via sparbankerna ger lokal närvaro som konkurrenter har svårt att replikera, vilket syns tydligt i både bolån och SME-affären. K/I-talet på 0,36 är ett tydligt kvalitetsbevis och mycket starkt i nordisk storbankskontext. Mot slutet av 2025 besvarades 86% av kundsamtalen i Sverige inom tre minuter, vilket stärker kundupplevelsen och tillgängligheten.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Förvärven av <strong>Stabelo</strong> och <strong>Entercard</strong> under 2025 är strategiskt viktiga. Stabelo stärker bolåneerbjudandet mot digitala kunder medan Entercard gör Swedbank till ägare av en mycket stor kort- och konsumentkreditaffär, vilket diversifierar intäkterna bort från ränteberoendet.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  ["Varumärke","Urstark position i Sverige och ohotad etta i Baltikum.","★★★★★"],
                  ["Sparbanksekosystem","Unikt nätverk för distribution och kundinsikt.","★★★★★"],
                  ["Kostnadsledarskap","En av Europas lägsta kostnadskvoter (K/I 0,36).","★★★★★"],
                  ["Switching Costs","Hög tröghet tack vare helhetserbjudanden (bolån/lön).","★★★★☆"],
                  ["Digital Plattform","Ledande användarvänlighet och digital mognad.","★★★★☆"],
                  ["Robur","Kapitallätta intäkter från ledande fondförvaltning.","★★★★☆"],
                ].map(([m,d,s])=><MoatCard key={m} title={m} desc={d} stars={s}/>)}
              </div>

              <div style={{marginTop: 32}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Styrkor */}
                  <div style={{background:"#F0FDF4", borderRadius:12, padding:16, border:"1px solid #DCFCE7"}}>
                    <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:8}}>💪 Styrkor</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.7}}>
                      <li>Låg kostnadskvot – K/I 0,36, bland de lägsta i Europa</li>
                      <li>Dominerande position i Baltikum, mest älskade varumärket i regionen</li>
                      <li>Lojal kundbas med höga byteskostnader</li>
                    </ul>
                  </div>
                  {/* Svagheter */}
                  <div style={{background:"#FEF2F2", borderRadius:12, padding:16, border:"1px solid #FEE2E2"}}>
                    <div style={{fontWeight:700, color:"#991B1B", fontSize:13, marginBottom:8}}>⚠️ Svagheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#991B1B", lineHeight:1.7}}>
                      <li>Ränteberoendet – intäkterna är starkt exponerade mot räntemarginalutvecklingen</li>
                      <li>Historiska regulatoriska bekymmer påverkar fortfarande varumärke och riskbild</li>
                    </ul>
                  </div>
                  {/* Möjligheter */}
                  <div style={{background:"#EFF6FF", borderRadius:12, padding:16, border:"1px solid #DBEAFE"}}>
                    <div style={{fontWeight:700, color:"#1D4ED8", fontSize:13, marginBottom:8}}>🚀 Möjligheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#1D4ED8", lineHeight:1.7}}>
                      <li>Förvärvssynergier från Stabelo och Entercard</li>
                      <li>AI-driven effektivisering håller kostnaderna nere</li>
                      <li>Bolånevolymer förväntas accelerera vid sjunkande räntor</li>
                    </ul>
                  </div>
                  {/* Hot */}
                  <div style={{background:"#FFFBEB", borderRadius:12, padding:16, border:"1px solid #FDE68A"}}>
                    <div style={{fontWeight:700, color:"#92400E", fontSize:13, marginBottom:8}}>🔴 Hot</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#92400E", lineHeight:1.7}}>
                      <li>Fintech-disruptörer utmanar framför allt bolåne- och betalningsaffären</li>
                      <li>Räntemarginaltryck vid fortsatta centralbanksräntesänkningar</li>
                      <li>Kvarvarande regulatorisk exponering – Department of Financial Services i New York utreder fortfarande Swedbank trots att DOJ avslutade sin utredning utan åtgärd i januari 2026</li>
                    </ul>
                  </div>
                </div>

                {/* SWOT-sammanfattning */}
                <div style={{marginTop:20, background:T.accentL, border:`1.5px solid ${T.accent}33`, borderRadius:12, padding:"16px 20px", borderLeft:`4px solid ${T.accent}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>SWOT sammanfattat</div>
                  <p style={{margin:0, color:T.ink, fontSize:13.5, lineHeight:1.85}}>
                    <strong>Styrkor:</strong> låg kostnadskvot, ledande position i Baltikum och lojal kundbas. <strong>Svagheter:</strong> ränteberoendet och historiska regulatoriska bekymmer. <strong>Möjligheter:</strong> förvärvssynergier, AI-driven effektivisering och bolånevolymer vid sjunkande räntor. <strong>Hot:</strong> fintech-disruptörer, räntemarginaltryck och kvarvarande regulatorisk exponering – Department of Financial Services i New York utreder fortfarande Swedbank trots att DOJ avslutade sin utredning utan åtgärd i januari 2026.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
        
        {/* Sector Comparison Callout */}
        {data.relatedAnalysis && <EditorialCallout {...data.relatedAnalysis} />}

        {/* ── FINANSIELL ── */}
        <div id="finansiell">
          <FadeIn delay={200}>
            <Card mb={20}>
              <SectionLabel number="III" title="Finansiell Analys"/>
              
              {/* Kontext-ingress */}
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:28}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  För banker är räntenetto, provisionsnetto, ROE och kreditkvalitet de viktigaste måtten. 2025 levererade Swedbank 68 736 Mkr i intäkter (-7% mot 2024), drivet av ett lägre räntenetto (44 000 Mkr) i ett sjunkande ränteklimat.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Bilden är en tydlig normalisering efter rekordåren 2022-2023. <strong>Kostnadssidan</strong> förblev dock urstark med sänkta kostnader (24 532 Mkr) trots investeringar. <strong>K/I-talet på 0,36</strong> är ett av bankens främsta kvalitetsbevis.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Lönsamheten hölls hög med ett ROE på <strong>15,2%</strong>. Kreditförlustnivån var mycket stark (0,00%), vilket visar på en mycket välskött portfölj. Kapitaliseringen är robust med en CET1-kvot på 17,8%. Det totala kärnprimärkapitalkravet inklusive Pelare 2-vägledning var 14,8%, vilket ger en buffert på 3,0 procentenheter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Avkastning på eget kapital (ROE %)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Enastående uthållighet</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={roeData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[10,20]}/>
                      <Tooltip content={<ChartTip unit="%"/>}/>
                      <Line type="monotone" dataKey="v" name="ROE" stroke={T.accent} strokeWidth={3} dot={{fill:T.accent, r:4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Vinst per aktie (SEK)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={epsData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<ChartTip unit=" kr"/>}/>
                      <Bar dataKey="v" name="EPS" fill={T.accent} radius={[4,4,0,0]}>
                        {epsData.map((d,i)=><Cell key={i} fill={d.e?T.accent+"88":T.accent}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Nettointäkter (Mkr)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={revenueData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[40000, 80000]}/>
                      <Tooltip content={<ChartTip unit=" Mkr"/>}/>
                      <Bar dataKey="v" name="Intäkter" fill={T.ink} radius={[4,4,0,0]}>
                        {revenueData.map((d,i)=><Cell key={i} fill={d.e?"#5C6B7A":T.ink}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Kvartalsvisa utfall 2025 */}
              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Kvartalsvis bild 2025</div>
              <div style={{overflowX:"auto", marginBottom:28}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Kvartal","Totala intäkter","ROE","EPS","Kommentar"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Kvartal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Q2 2025","16 962 Mkr","15,4%","6,99 kr","Räntenetto sekventiellt ned 5%"],
                      ["Q3 2025","17 105 Mkr","16,0%","7,53 kr","Starkast kvartal – provisionsnetto upp 6% seq."],
                      ["Q4 2025","17 340 Mkr","14,7%","7,22 kr","Förvärvseffekter + VAT-återbäring 963 Mkr"],
                    ].map(([q,...vals],ri)=>(
                      <tr key={q} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:700}}>{q}</td>
                        {vals.map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",textAlign:"right",color:ci===1?T.accent:T.sub,fontWeight:ci===1?700:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Nyckeltalstabell */}
              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Historiska nyckeltal</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Viktiga tal","2023","2024","2025","2026e"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Viktiga tal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["ROE (%)","18,3%","17,1%","15,2%","13,5%"],
                      ["P/E-tal","10,5","10,3","11,1","12,1"],
                      ["K/I-kvot","0,33","0,34","0,36","0,40"],
                      ["Utdelning (kr)","15,10","15,70","29,80*","24,19"],
                      ["CET1-kvot (%)","19,0%","19,0%","17,8%","17,5%"],
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
              <p style={{fontSize:11, color:T.muted, fontStyle:"italic", marginTop:8}}>* Inklusive specialutdelning om 9,35 kr.</p>

              {/* Historisk femårsutveckling */}
              <div style={{marginTop:28}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Historisk femårsutveckling</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    ["2021","~20 Mdkr","Räntorna fortfarande låga. Pandemireservationer reverserades och lyfte resultatet.", T.sub],
                    ["2022","Kraftig uppgång","Vinsten steg markant när styrräntorna började stiga – bankernas gyllene era inleddes.", T.sub],
                    ["2023 🏆","ROE 18,3% · K/I 0,33","Rekordår. Alla viktiga mål uppnåddes och slogs med god marginal.", T.green],
                    ["2024","Vinst 34,9 Mdkr · ROE 17,1%","Fortsatt starkt men räntenormalisering påbörjad. K/I-kvoten höll trots press.", T.sub],
                    ["2025","Vinst 32,8 Mdkr · ROE 15,2%","Normalisering fortsätter, men banken levererade fortsatt över sitt lönsamhetsmål. Förvärven skapar nya intäktsströmmar.", T.accent],
                    ["2026e","Vinst ~30,3 Mdkr · EPS 26,94 kr","Ytterligare normalisering väntas. Synergier från Stabelo/Entercard börjar leverera.", T.sub],
                  ].map(([år,rubrik,text,color])=>(
                    <div key={år} style={{background:color===T.green?T.greenL:color===T.accent?T.accentL:T.bg, border:`1px solid ${color}22`, borderRadius:12, padding:14}}>
                      <div style={{fontSize:10,fontWeight:800,color,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>{år}</div>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>{rubrik}</div>
                      <div style={{fontSize:12,color:T.sub,lineHeight:1.6}}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{marginTop:24, background:T.bg, border:`1px solid ${T.border}`, borderRadius:14, padding:20}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:10}}>Balansräkning, kapital & likviditet</div>
                <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                  Totala tillgångar uppgick till <strong>3 063 Mdkr</strong> vid utgången av 2025. <strong>CET1-kvoten</strong> var 17,8% mot ett totalt kärnprimärkapitalkrav inklusive Pelare 2-vägledning på 14,8% – en buffert på 3,0 procentenheter. Kreditförlustnivån var <strong>0,00%</strong> för helåret 2025, vilket signalerar mycket stark kreditkvalitet. Eget kapital uppgick till 225 826 Mkr.
                </p>
                <p style={{margin:"12px 0 0",fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                  För banker är traditionell kassaflödesanalys mindre central än för industribolag. Viktigare är kapitalstyrka, kreditkvalitet och likviditet. Swedbank avslutade året med en likviditetsreserv på 523 Mdkr, LCR på 184% och NSFR på 124%, vilket understryker den finansiella motståndskraften.
                </p>
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
                Swedbank värderas till cirka P/E 11,1x på 2025 års vinst och framåtblickande P/E om cirka 12,1x för 2026, vilket speglar en förväntad vinstnormalisering när räntenettot krymper. P/B-talet på omkring 1,6x signalerar en kvalitetsbank som fortfarande handlas över bokfört värde, men utan någon tydlig premiumeufori.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {[
                  ["P/E (2025)", "11,1x", "På 2025 EPS 28,98 kr"],
                  ["P/E (2026e)", "12,1x", "EPS-estimat 26,50 kr"],
                  ["P/B", "1,6x", "Normaliserad värdering", true],
                  ["Direktavkastning", "9,3%", "Inkl. specialutdelning 2025"],
                  ["DA (2026e)", "7,5%", "Normaliserad, 24,19 kr/aktie"],
                  ["CET1-kvot", "17,8%", "+3,0%-enh. buffert"],
                ].map(([l,v,s,acc], i) => (
                  <div key={i} style={{background:acc?T.accentL:T.bg, border:`1px solid ${acc?T.accent+"33":T.border}`, borderRadius:12, padding:14}}>
                    <div style={{fontSize:10, fontWeight:800, color:acc?T.accent:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4}}>{l}</div>
                    <div style={{fontSize:18, fontWeight:900, color:acc?T.accent:T.ink, letterSpacing:-0.5}}>{v}</div>
                    <div style={{fontSize:10, color:T.muted, fontStyle:"italic", marginTop:2}}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{background:T.ink, borderRadius:16, padding:24, color:"#fff", boxShadow:T.shadowLg}}>
                <div style={{fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Analytikerns värderingskommentar</div>
                <p style={{margin:0, fontSize:13.5, color:"rgba(255,255,255,0.8)", lineHeight:1.7}}>
                  Vid 321 kr är Swedbank rimligt värderad. P/E 11,1x och P/B 1,6x speglar en kvalitetsbank som väger tungt i en portfölj. Den höga direktavkastningen på 9,3% inkluderar en extrautdelning och ska därför inte ses som en uthållig normalnivå, utan som kapitalåterföring från en stark balansräkning. Vi ser en rimlig uppsida mot <strong>330-360 kr</strong>.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── TILLVÄXT ── */}
        <div id="tillvaxt">
          <FadeIn delay={400}>
            <Card mb={20}>
              <SectionLabel number="V" title="Tillväxtmotorer & Triggers"/>
              
              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Trots ett utmanande ränteläge 2025–2026 finns konkreta tillväxtkatalysatorer som kan lyfta Swedbanks intjäning och aktiekurs på 2–3 års sikt.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    icon: "🏠",
                    bg: "#EFF6FF",
                    title: "1. Stabelo & bolånesynergier",
                    body: "Förvärvet av Stabelo tillförde 17 miljarder kronor i bolånestock och fördubblade Swedbanks marknadsandel av nya bolån i egna kanaler. Vid sjunkande räntor förväntas bolånevolymerna accelerera markant, vilket direkt lyfter räntenettot."
                  },
                  {
                    icon: "💳",
                    bg: "#ECFDF5",
                    title: "2. Entercard – Nordens största kortverksamhet",
                    body: "Förvärvet av Barclays andel i Entercard skapade Nordens och Baltikums största kortverksamhet. Transaktionsbaserade intäkter diversifierar bort från ränteberoendet och ger stabila avgiftsflöden."
                  },
                  {
                    icon: "🌍",
                    bg: "#FFFBEB",
                    title: "3. Baltikum – attraktiv tillväxtmix",
                    body: "Kredittillväxten i Baltikum var klart högre än i Sverige under 2025. Swedbanks ledande ställning i regionen ger banken en attraktiv kombination av tillväxt, skala och stark marknadsposition."
                  },
                  {
                    icon: "🤖",
                    bg: "#F5F3FF",
                    title: "4. Digitalisering & AI-effektivisering",
                    body: "Ledningen guidar för en kostnadsbas på 27,5 Mdkr för 2026. Digitalisering, AI-stöd och processautomation kan bidra till att hålla K/I-kvoten i schack trots löneökningar och ökade IT-investeringar."
                  },
                  {
                    icon: "📉",
                    bg: "#FEF2F2",
                    title: "5. Räntecykelns normalisering",
                    body: "På kort sikt pressas räntenettot av lägre räntor, men högre volymer inom bolån, kort och Baltikum kan gradvis dämpa effekten över tid."
                  }
                ].map((item, i) => (
                  <div key={i} style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:16, padding:20, display:"flex", gap:16, alignItems:"flex-start"}}>
                    <div style={{width:40, height:40, background:item.bg, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:20}}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:6}}>{item.title}</div>
                      <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.6}}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── RISK ── */}
        <div id="risk">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              
              <div style={{display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", background:T.goldL, border:`1px solid ${T.gold}33`, borderRadius:20, marginBottom:20}}>
                <span style={{fontSize:10, fontWeight:900, color:T.gold, textTransform:"uppercase", letterSpacing:0.5}}>Risknivå: MEDEL · 4/5</span>
              </div>

              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Swedbanks regulatoriska historia kräver att investerare bevakar myndighetskontakter noga. Trots sanerat varumärke och högt kreditbetyg (AA- hos S&P) finns kvarvarande risker som motiverar en bevakningsrekommendation vid nuvarande kurs.
              </p>

              <div style={{overflowX:"auto", marginBottom:24}}>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`, background:T.bg}}>
                      <th style={{padding:"12px", textAlign:"left", color:T.ink, fontWeight:800, textTransform:"uppercase", fontSize:10, letterSpacing:0.5}}>Risk</th>
                      <th style={{padding:"12px", textAlign:"left", color:T.ink, fontWeight:800, textTransform:"uppercase", fontSize:10, letterSpacing:0.5}}>Bedömning</th>
                      <th style={{padding:"12px", textAlign:"left", color:T.ink, fontWeight:800, textTransform:"uppercase", fontSize:10, letterSpacing:0.5}}>Hantering</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["DFS-utredning", "Department of Financial Services (NY) utreder fortfarande Swedbank trots att DOJ avslutade sin utredning utan åtgärd i januari 2026. Skapar osäkerhet kring eventuella böter.", "Aktiv dialog med regulatorer, stärkt compliance-funktion."],
                      ["Pensionsmyndighetens krav", "Krav om 2 790 Mkr kopplat till Optimus High Yield är en separat juridisk riskpost att bevaka, även om banken bestrider kravet.", "Banken har bestridit kravet och inte gjort någon reservering."],
                      ["Räntemarginaltryck", "Riksbankens sänkningar pressar räntenettot, som föll 11% 2025 och väntas sjunka ytterligare 2026.", "Volymtillväxt och avgiftsintäkter ska kompensera."],
                      ["Fastighetsexponering", "Den svenska bolåneportföljen är stor och känslig för ett svagare bostadsmarknadsscenario, även om kreditkvaliteten 2025 var mycket stark.", "Konservativ amorteringskultur och mycket stark kreditförlustnivå."],
                      ["Geopolitik Baltikum", "Säkerhetssituationen i regionen är förhöjd. En destabilisering skulle minska investeringsviljan och öka kreditriskerna.", "Baltiska bankerna är välkapitaliserade med god likviditet."],
                    ].map(([r, b, h], i) => (
                      <tr key={i} style={{borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"12px", fontWeight:700, color:T.ink}}>{r}</td>
                        <td style={{padding:"12px", color:T.sub, lineHeight:1.5}}>{b}</td>
                        <td style={{padding:"12px", color:T.muted, fontStyle:"italic"}}>{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{background:T.goldL, borderRadius:16, padding:24, border:`1px solid ${T.gold}22`}}>
                <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
                  <div style={{width:40, height:40, background:T.gold, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <AlertTriangle size={20} color="#fff" style={{margin:"auto"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11, fontWeight:800, color:T.gold, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Viktigaste riskfaktorn just nu</div>
                    <p style={{margin:0, fontSize:13.5, color:T.ink, lineHeight:1.7}}>
                      Department of Financial Services (NY) utreder fortfarande Swedbank trots att DOJ avslutade sin utredning utan åtgärd i januari 2026. Regulatorisk risk och AML-bagaget är de enskilt största hoten mot multipeln kortsiktigt.
                    </p>
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  ["🌱","Miljö (E)","4/5","Rapporterar enligt CSRD och har tydligt fokus på hållbar finansiering, grön utlåning och klimatmål. Utsågs till Sveriges mest hållbara bankvarumärke 2025.",T.green,T.greenL],
                  ["👥","Socialt (S)","4/5","Finansiell utbildning för över 110 000 barn 2025. Stark lokal förankring via sparbanksekosystemet.",T.accent,T.accentL],
                  ["🏛️","Styrning (G)","4/5","S&P uppgraderade till AA- med stabil outlook. Transparent styrning och tydliga ESG-mål post-skandal.",T.green,T.greenL],
                ].map(([icon,label,score,body,color,bg]) => (
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
              <div style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:14, padding:20}}>
                <div style={{fontSize:11, fontWeight:700, color:T.muted, letterSpacing:0.5, textTransform:"uppercase", marginBottom:10}}>Makropåverkan</div>
                <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.8}}>
                  Riksbankens räntesänkningscykel är den dominerande makrovariabeln. CET1-kvoten på 17,8% – 3,0 procentenheter över det totala kärnprimärkapitalkravet inklusive Pelare 2-vägledning – ger en god buffert mot regulatoriska kapitalkrav och möjliggör fortsatt utdelning. En svagare svensk konjunktur ökar kreditriskerna men Swedbanks mycket starka kreditkvalitet dämpar effekten.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── AI ── */}
        <div id="ai">
          <FadeIn delay={700}>
            <Card mb={20}>
              <SectionLabel number="VIII" title="AI-observationer"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["📰 Sentimentanalys","Sentimentbilden är lätt negativ till neutral efter 12% kursnedgång från toppen. Marknaden prissätter en vinstnormalisering korrekt – inga tecken på överhettning, men heller inget momentum."],
                  ["📊 Insiderhandel & ägardata","Sparbanksstiftelserna håller en stabil ägarandel. Inga alarmerande insidersälj registrerade. Institutionella ägare som Alecta och AMF kvarstår som förtroendesignal."],
                  ["🔍 Kreditkvalitet","Revision av kreditportföljdata visar exceptionell kvalitet: kreditförlustnivå på 0,00% och Stage 2-lån på låga nivåer. En positiv outlier bland europeiska banker."],
                  ["⚠️ Regulatorisk flagga","Department of Financial Services (NY) utreder fortfarande Swedbank trots att DOJ avslutade sin utredning utan åtgärd i januari 2026."],
                ].map(([title,body]) => (
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
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  {[
                    ["Är Swedbank ett kvalitetsbolag?","Ja. Stark marknadsposition, låg kostnadsbas, mycket stark kreditkvalitet och robust kapitalisering gör Swedbank till ett kvalitetsbolag för utdelningsinvesterare."],
                    ["Är det rimligt värderat?","Ja. På cirka 11,1x årsvinst och drygt 6 procent normaliserad direktavkastning är aktien attraktiv för rätt typ av investerare, men det finns ingen uppenbar felprissättning."],
                    ["Kan man hålla det 5–10 år?","Ja, om man vill ha trygg och hög utdelningskapacitet samt exponering mot Norden/Baltikum med hög effektivitet."],
                  ].map(([q,a]) => (
                    <div key={q} style={{marginBottom:16}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>→ {q}</div>
                      <div style={{fontSize:13,color:T.sub,lineHeight:1.7}}>{a}</div>
                    </div>
                  ))}
                  <div style={{marginTop:24, padding:16, background:T.bg, borderRadius:12, border:`1px solid ${T.border}`}}>
                    <p style={{margin:0, fontSize:13, color:T.ink, lineHeight:1.7}}>
                      <strong style={{color:T.sub}}>Målpris 330-360 kronor (12 månaders sikt)</strong>. Caset är attraktivt men ett tydligare köpläge uppstår vid svaghet eller marknadsoro kring 290-300 kr.
                    </p>
                    <p style={{margin:"12px 0 0 0", fontSize:13, color:T.gold, fontWeight:700}}>
                      Beslut: BEVAKA. Aktien är attraktiv som kvalitetsbank och utdelningscase, men det tydligare köpläge uppstår först vid svaghet eller marknadsoro.
                    </p>
                  </div>
                </div>
                <div style={{background:T.accentL,border:`1.5px solid ${T.accent}44`,borderRadius:16,padding:"22px 26px",textAlign:"center",flexShrink:0,minWidth:180}}>
                  <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Rekommendation</div>
                  <div style={{fontSize:28,fontWeight:900,color:T.accent,letterSpacing:-1}}>BEVAKA</div>
                  <div style={{height:1,background:T.accent+"22",margin:"12px 0"}}/>
                  <div style={{fontSize:22,fontWeight:800,color:T.ink}}>330-360 kr</div>
                  <div style={{fontSize:11,color:T.sub,marginTop:4}}>Riktkurs · 12 månader</div>
                  <div style={{marginTop:12,fontSize:12,color:T.sub}}>Köp på svaghet</div>
                  <div style={{marginTop:10,fontSize:13,color:T.accent,fontWeight:700}}>29/40 · 72,5%</div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {data.nextSteps && (
          <EditorialReadNext recommendations={data.nextSteps} />
        )}

        {/* AD: middle-article – max engagemang vid IX→X */}
        <AdUnit variant="middle-article" />

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={900}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier (Bull/Base/Bear)"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {[
                  {label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"380-410 kr",
                    upside:"+25%", assumptions:"Stabiliserat räntenetto, lyckad integration", 
                    requirements:"ROE 15-16%, Baltikumtillväxt fortsätter."},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"50%",pris:"330-360 kr",
                    upside:"+10%", assumptions:"Normaliserad vinst, god kostnadskontroll", 
                    requirements:"ROE 14-15%, stabil kostnadskvot."},
                  {label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"25%",pris:"260-290 kr",
                    upside:"-15%", assumptions:"Hårdare räntenettopress, regulatoriska kostnader", 
                    requirements:"ROE 12-13%, svagare makro."},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>

            <NordnetCTA variant="low" />

            <AnalysisDisclaimer theme="light" />
          </FadeIn>
        </div>

        {/* ── NEXT ANALYSIS ── */}
        {nextAnalysis && (
          <FadeIn delay={1000}>
            <NextAnalysisButton analysis={nextAnalysis} />
          </FadeIn>
        )}
      </div>
    </div>
  );
}

