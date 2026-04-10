import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, AlertTriangle, TrendingUp, Info, Target, Landmark, Zap, ShieldCheck, PieChart, BarChart3, Users } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import AdUnit from "../AdUnit";
import MultiplexAd from "../MultiplexAd";
import NextAnalysisButton from "./NextAnalysisButton";
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
  {ar:"2026e", v:65200, e:true},
];

const epsData = [
  {ar:"2022", v:19.49},
  {ar:"2023", v:30.34},
  {ar:"2024", v:30.98},
  {ar:"2025", v:29.14},
  {ar:"2026e", v:26.94, e:true},
];

const roeData = [
  {ar:"2022", v:13.3},
  {ar:"2023", v:18.3},
  {ar:"2024", v:16.7},
  {ar:"2025", v:14.7},
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
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function SwedbankDeepDive({ 
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
              <div className="text-2xl font-black text-slate-900">320 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~366 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (2025)</span>
              <div className="text-2xl font-black text-slate-900">11,0</div>
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
                  <div className="text-2xl font-black text-slate-900">330 kr</div>
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

        {/* ── ÖVERSIKT ── */}
        <div id="oversikt">
          <FadeIn>
            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {( [
                  ["Bakgrund & Struktur","Swedbank är en av Sveriges och Nordens absolut största banker, med rötter i sparbanksrörelsen som sträcker sig mer än 200 år tillbaka i tiden. Bolaget är noterat på Nasdaq Stockholm Large Cap och handlas kring 320 kronor per aktie, vilket ger ett börsvärde på ungefär 366 miljarder kronor."],
                  ["Kunder & Marknader", <span>Banken har nära <strong>7,3 miljoner privatkunder</strong> och 545 000 företagskunder spridda över fyra hemmamarknader: Sverige, Estland, Lettland och Litauen. Därtill finns internationella kontor i Oslo, Helsingfors, Shanghai och New York.</span>],
                  ["Affärsmodell", "Sverige svarar för ungefär 71 procent av intäkterna och Baltikum för ytterligare 25 procent. Affärsmodellen bygger på tre intäktsben: räntenettet, provisionsnettot (via bl.a. Robur) samt handelsintäkter."],
                  ["Organisation", "Verksamheten är organiserad i fyra affärsområden: Swedish Banking, Baltic Banking, Corporates and Institutions samt det nya segmentet Premium and Private Banking som etablerades 2024."],
                  ["Ledning & Sanering", "VD Jens Henriksson (sedan 2019) har genomfört ett metodiskt saneringsarbete efter tidigare skandaler. Leveransen på 'Swedbank 15/25'-planen (15% ROE) är ett bevis på exekveringsförmågan."],
                  ["Ägarstruktur & Personal", "Domineras av sparbanksstiftelserna (13,3% röster) samt institutioner som Alecta och AMF. Totalt antal anställda uppgick till 18 638 vid utgången av 2025."],
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
                Swedbank har framgångsrikt navigerat genom räntecykeln och visat prov på extremt god kostnadskontroll. Genom att nå sina lönsamhetsmål för 2025 har ledningen återupprättat marknadens förtroende. Banken framstår idag som en av de bäst kapitaliserade och mest effektiva i Europa, även om räntecykeln nu går in i en mer utmanande fas.
              </p>
            </div>
          </FadeIn>
        </div>

        <AdUnit slot="7332946752" />

        {/* ── STRATEGI & MOAT ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Swedbanks vallgrav vilar på deras unika sparbanksekosystem och marknadsledande position i Baltikum. Med 209 kontor och en djup lokal förankring skapar de en distributionskraft som är svår för utmanare att replikera. I Baltikum är banken det mest älskade varumärket, vilket ger en stabil och lönsam plattform för framtida expansion inom krediter och transaktioner.
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
                      <li>Kvarvarande regulatorisk exponering – US Department of Financial Services har inlett en ny granskning av Swedbank trots att DOJ avslutade sin utredning i januari 2026</li>
                    </ul>
                  </div>
                </div>

                {/* SWOT-sammanfattning */}
                <div style={{marginTop:20, background:T.accentL, border:`1.5px solid ${T.accent}33`, borderRadius:12, padding:"16px 20px", borderLeft:`4px solid ${T.accent}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>SWOT sammanfattat</div>
                  <p style={{margin:0, color:T.ink, fontSize:13.5, lineHeight:1.85}}>
                    <strong>Styrkor:</strong> låg kostnadskvot, dominerande position i Baltikum och lojal kundbas. <strong>Svagheter:</strong> ränteberoendet och historiska regulatoriska bekymmer. <strong>Möjligheter:</strong> förvärvssynergier, AI-driven effektivisering och bolånevolymer vid sjunkande räntor. <strong>Hot:</strong> fintech-disruptörer, räntemarginaltryck och kvarvarande regulatorisk exponering – US Department of Financial Services har inlett en ny granskning av Swedbank trots att DOJ avslutade sin utredning i januari 2026.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── FINANSIELL ── */}
        <div id="finansiell">
          <FadeIn delay={200}>
            <Card mb={20}>
              <SectionLabel number="III" title="Finansiell Analys"/>
              
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
                      ["ROE (%)","18,3%","16,7%","14,7%","13,5%"],
                      ["P/E-tal","10,5","10,3","11,0","12,1"],
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
            </Card>
          </FadeIn>
        </div>

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Scenarier & Värdering"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"380-420 kr",
                    upside:"+25%", assumptions:"ROE 15-16%, synergier fullt ut", 
                    requirements:"Långsammare räntesänkningar, extremt låga kreditförluster."},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"50%",pris:"330 kr",
                    upside:"+3%", assumptions:"ROE 14-15%, stabil kostnadskvot", 
                    requirements:"Normalisering av räntenettot, kontrollerade kostnader."},
                  {label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"25%",pris:"260-280 kr",
                    upside:"-15%", assumptions:"ROE under 13%, kraftig räntepress", 
                    requirements:"Stora regulatoriska böter, fastighetsoro."},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>
          </FadeIn>
        </div>

        <AdUnit slot="6432013761" />

        {/* ── NEXT ANALYSIS ── */}
        {nextAnalysis && (
          <FadeIn delay={400}>
            <NextAnalysisButton analysis={nextAnalysis} />
          </FadeIn>
        )}
      </div>
      <MultiplexAd />
    </div>
  );
}
