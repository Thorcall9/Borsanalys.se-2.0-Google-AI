import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, TrendingUp, CheckCircle2, Zap, Info, Target, Wallet } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart
} from "recharts";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#10B981", // Emerald green for Investor
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

const navData = [
  {ar:"2019",v:165,e:false},{ar:"2020",v:175,e:false},{ar:"2021",v:245,e:false},
  {ar:"2022",v:195,e:false},{ar:"2023",v:265,e:false},{ar:"2024",v:317,e:false},
  {ar:"2025",v:355,e:false},{ar:"2026e",v:395,e:true},{ar:"2027e",v:440,e:true},
];

const divData = [
  {ar:"2016",v:2.80,e:false},{ar:"2017",v:3.10,e:false},{ar:"2018",v:3.40,e:false},
  {ar:"2019",v:3.75,e:false},{ar:"2020",v:4.00,e:false},{ar:"2021",v:4.40,e:false},
  {ar:"2022",v:4.60,e:false},{ar:"2023",v:4.80,e:false},{ar:"2024",v:5.20,e:false},
  {ar:"2025",v:5.60,e:false},{ar:"2026e",v:6.00,e:true},
];

const totalReturnData = [
  {label:"1 år",inv:14.9,six:12.7},
  {label:"5 år",inv:19.4,six:9.4},
  {label:"10 år",inv:18.3,six:10.8},
  {label:"20 år",inv:15.1,six:10.0},
];

const discountHistoryData = [
  {q:"Q1 22",nav:215,p:218},{q:"Q2 22",nav:185,p:182},{q:"Q3 22",nav:175,p:168},{q:"Q4 22",nav:195,p:192},
  {q:"Q1 23",nav:215,p:210},{q:"Q2 23",nav:240,p:235},{q:"Q3 23",nav:255,p:248},{q:"Q4 23",nav:265,p:268},
  {q:"Q1 24",nav:280,p:272},{q:"Q2 24",nav:295,p:283},{q:"Q3 24",nav:300,p:280},{q:"Q4 24",nav:317,p:293},
  {q:"Q1 25",nav:315,p:288},{q:"Q2 25",nav:314,p:280},{q:"Q3 25",nav:336,p:294},{q:"Q4 25",nav:355,p:330},
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:5,max:5},
  {key:"Finansiell",val:4,max:5},
  {key:"Värdering",val:4,max:5},
  {key:"Tillväxt",val:4,max:5},
  {key:"Risk ⚠",val:4,max:5,inv:true},
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

interface InvestorDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
}

export default function InvestorDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading 
}: InvestorDeepDiveProps){
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
                  Investor AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">INVE-B • INVE-A</span>
                <span className="text-sm font-medium opacity-90">Investmentbolag • Wallenberg • Stockholm</span>
                
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
              <span className="text-4xl font-black tracking-tighter">33/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '82.5%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">82,5 % – Stark kvalitetsaktie</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">330,40 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~1 010 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Flaggskepp</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Substansvärde</span>
              <div className="text-2xl font-black text-slate-900">355 kr</div>
              <span className="text-xs text-[#10B981] font-bold mt-1 block">Justerat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Substansrabatt</span>
              <div className="text-2xl font-black text-slate-900">−7%</div>
              <span className="text-xs text-slate-500 mt-1 block">Attraktivt</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#10B981]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">395 kr</div>
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
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
                {( [
                  ["Bakgrund & Struktur","Investor AB grundades 1916 av familjen Wallenberg och är idag ett av Nordens största investmentbolag, med ett justerat substansvärde på 1 087 miljarder kronor per den 31 december 2025. Bolaget kontrolleras av Wallenberg-stiftelserna via FAM AB."],
                  ["Affärsidé & Modell", <span>Affärsidén är enkel men kraftfull: <strong>bygga starka och hållbara företag för att skapa värde för aktieägare och samhälle</strong>. Till skillnad från en vanlig aktiefond är Investor en aktiv ägare – man sitter i styrelser, utser VD och driver strategiska initiativ. Det gör att Investor kan påverka sina innehav på ett sätt som en passiv fondförvaltare aldrig kan.</span>],
                  ["Ledning","Christian Cederholm tillträdde som VD 2023, efterträdde Johan Forssell. Cederholm har lång erfarenhet inom bolaget och fortsätter den inslagna vägen av disciplinerad kapitalallokering."],
                  ["Ägarstruktur","Wallenberg-stiftelserna är största ägare via FAM AB. Detta säkerställer ett unikt långsiktigt perspektiv och stabilitet som är svårreplikerad för andra investmentbolag."],
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
                Investor är utan tvekan ett av de högst kvalitativa bolagen på den nordiska börsen. Wallenbergsfärens flaggskepp erbjuder en unik exponering mot globala industriledare till en attraktiv substansrabatt. Med en extremt stark balansräkning (skuldsättning 2,1%) är bolaget väl rustat för att agera offensivt i alla marknadslägen.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── STRATEGI & RISK ── */}
        <div id="strategi">
          <FadeIn delay={100}>
            <Card mb={20}>
              <SectionLabel number="II" title="Strategisk Analys & Moat"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Investor har en av de starkaste konkurrenspositionerna bland europeiska investmentbolag. Moaten (det engelska begreppet för bestående konkurrensfördel – som en vallgrav runt ett slott) är bred och mångdimensionell.
                </p>
                <p style={{margin:"12px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Wallenberg-arvet skapar ett unikt varumärke och nätverk: hundra år av aktiv ägarkultur i Norden ger Investor tillgång till deal flow, styrelsetalanger och politiska relationer som inga konkurrenter kan replikera. Kapitalets tålmodighet – kombinerat med Wallenbergs starka röststyrka – gör att Investor kan ta positioner och stanna under marknadsoro utan tvång att sälja.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24}}>
                {[
                  ["Styrkor",T.green,T.greenL,["110 år av aktiv ägarkultur och bevisad track record","Extremt låga förvaltningskostnader (0,07% av NAV)","Diversifierad portfölj av världsledande bolag","AA- kreditbetyg (S&P) och Aa3 (Moody's)","Stark balansräkning: skuldsättningsgrad 2,1%"]],
                  ["Svagheter",T.gold,T.goldL,["Patricia Industries tyngd av valutamotvind (USD/EUR vs SEK)","Atlas Antibodies under strukturell press","Koncentration till svenska/nordiska företag","Substansvärdet påverkas av börspsvängningar"]],
                  ["Möjligheter",T.accent,T.accentL,["Patricia Industries – operationell hävstång när USD återhämtar sig","EQT-plattformen ger tillgång till global private equity-tillväxt","AI-integration hos portföljbolagen (Permobil, Mölnlycke m.fl.)","Förvärvsplatform för nya plattformsbolag"]],
                  ["Hot",T.red,T.redL,["Ökad tullbelastning på globala portföljbolag","Fortsatt kronförstärkning dämpar Patricia Industries-vinster","Geopolitisk osäkerhet och svag global efterfrågan","Ökande konkurrens om private equity-deals"]],
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
                  ["Nätverkseffekt","Wallenberg-sfärens unika ekosystem och styrelsenätverk.","★★★★★"],
                  ["Kapitalallokering","Bevisad förmåga att skapa värde över decennier.","★★★★★"],
                  ["Ledarskap","Stark ägarstyrning och industriellt kunnande.","★★★★★"],
                  ["Varumärke","Högsta förtroende på kapitalmarknaden.","★★★★☆"],
                  ["Kostnadsfördel","Marknadsledande låga förvaltningskostnader (0,07%).","★★★★★"],
                  ["Skalfördelar","Enorm portfölj ger tillgång till unika investeringar.","★★★★☆"],
                ].map(([m,d,s])=><MoatCard key={m} title={m} desc={d} stars={s}/>)}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── FINANSIELL ── */}
        <div id="finansiell">
          <FadeIn delay={200}>
            <Card mb={20}>
              <SectionLabel number="III" title="Finansiell Analys"/>
              
              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Som investmentbolag är de mest relevanta nyckeltalen substansvärdetillväxt, totalavkastning och utdelningsutveckling – snarare än traditionella P/E-tal eller rörelsemarginaler. Investor redovisar dock även konsoliderade siffror för sina helägda dotterbolag i Patricia Industries.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Justerat substansvärde per aktie (kr)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Fylld = historisk · Guld kontur = estimat</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={navData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false} domain={[0,500]}/>
                      <Tooltip content={<ChartTip unit=" SEK"/>}/>
                      <Bar dataKey="v" name="NAV" radius={[5,5,0,0]}>
                        {navData.map((d,i)=><Cell key={i} fill={d.e?"transparent":T.ink} stroke={d.e?T.gold:"none"} strokeWidth={d.e?2:0} strokeDasharray={d.e?"5 3":"0"}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Totalavkastning – Investor B vs. SIXRX (%/år)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Genomsnittlig per år</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={totalReturnData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="label" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<ChartTip unit="%"/>}/>
                      <Bar dataKey="inv" name="Investor B" fill={T.ink} radius={[4,4,0,0]} />
                      <Bar dataKey="six" name="SIXRX" fill={T.gold} radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:"24px 0 16px"}}>Nyckeltal – koncernen (Patricia Industries)</h3>
              <div style={{overflowX:"auto", marginBottom:8}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Nyckeltal","2023","2024","2025","2026e"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:h==="Nyckeltal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Nettoomsättning (Mkr)","~58 000","63 196","64 826","~68 000"],
                      ["Omsättningstillväxt","~5%","~9%","+2,6%","~5%"],
                      ["Justerad EBITA-marginal","~21%","20,5%","20,5%","~21%"],
                      ["EPS (kr, konsoliderat)","~45","37,00","51,42","~40–50"],
                      ["Nettoskuldsättningsgrad","<2%","1,2%","2,1%","~2–3%"],
                      ["Utdelning per aktie (kr)","4,80","5,20","5,60","~6,00"],
                      ["Substansvärdetillväxt","+20%","+20%","+14%","~10–14%"],
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
              <p style={{fontSize:11, color:T.muted, fontStyle:"italic", margin:0}}>
                Kursiverade 2026E-siffror är estimat. EPS för investmentbolag är starkt påverkat av orealiserade värdeförändringar i portföljen.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginTop:32}}>
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
                        {divData.map((d,i)=><Cell key={i} fill={d.e?T.gold+"66":T.ink}/>)}
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
                        <strong>Patricia Industries marginaler håller trots valutamotvind.</strong> Den organiska omsättningstillväxten i konstant valuta uppgick till 4% helåret 2025 och EBITA-marginalen på rullande 12 månader låg stabilt kring 20,5%. Det bekräftar att underliggande operationell kvalitet är intakt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:20, marginTop:24, boxShadow:T.shadow}}>
                <h3 style={{fontSize:15, fontWeight:700, color:T.ink, marginBottom:10}}>Kassaflöde och balans</h3>
                <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>
                  Investors kassaflöde från den löpande verksamheten uppgick till 22,2 miljarder kronor 2025. Totala investeringar uppgick till 29 miljarder, finansierade via kassaflödet och låneupptagning. Nettoskuldsättningsgraden landade på 2,1% – klart inom målintervallet 0–10%. Bruttokassan uppgick till 27,1 miljarder kronor och den genomsnittliga löptiden på skulden är imponerande 9,2 år, vilket minimerar refinansieringsrisken.
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
                Investmentbolag värderas primärt utifrån förhållandet mellan aktiekursen och det underliggande substansvärdet per aktie (NAV). En kurs lägre än NAV kallas "substansrabatt" och är historiskt sett en köpsignal.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:24}}>
                {[
                  ["Just. NAV/aktie", "355 kr", "Per 31 dec 2025"],
                  ["Aktiekurs (B)", "330,40 kr", "~26 mars 2026"],
                  ["Substansrabatt", "−7%", "Kurs vs. just. NAV", true],
                  ["Direktavkastning", "1,7%", "5,60 kr / 330 kr"],
                  ["10-årig utd.tillväxt", "~8% / år", "Genomsnitt"],
                  ["Förvaltningskostn.", "0,07%", "Av justerat NAV"],
                ].map(([l,v,s,acc], i)=>(
                  <div key={i} style={{background:acc?T.accentL:T.bg, border:`1px solid ${acc?T.accent+"33":T.border}`, borderRadius:12, padding:14}}>
                    <div style={{fontSize:10, fontWeight:800, color:acc?T.accent:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4}}>{l}</div>
                    <div style={{fontSize:18, fontWeight:900, color:acc?T.accent:T.ink, letterSpacing:-0.5}}>{v}</div>
                    <div style={{fontSize:10, color:T.muted, fontStyle:"italic", marginTop:2}}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{marginBottom:24}}>
                <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Substansrabatt/premie – Aktiekurs vs. justerat NAV (kr)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={discountHistoryData} margin={{top:4,right:16,bottom:0,left:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                    <XAxis dataKey="q" tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                    <Tooltip content={<ChartTip unit=" kr"/>}/>
                    <Line type="monotone" dataKey="nav" name="Just. NAV" stroke={T.ink} strokeWidth={2} dot={false} fill="rgba(13,27,42,0.05)"/>
                    <Line type="monotone" dataKey="p" name="Aktiekurs" stroke={T.gold} strokeWidth={2} strokeDasharray="4 3" dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Historiskt har Investor handlats i intervallet −5% till +15% jämfört med sitt justerade substansvärde. Det nuvarande läget med en rabatt på 7% representerar ett relativt attraktivt inträde. Direktavkastningen på 1,7% är modest, men räknar man in substanstillväxten (historiskt ca 14–16% per år på 5 år) är totalavkastningspotentialen hög.
              </p>

              <div style={{background:T.ink, borderRadius:16, padding:24, color:"#fff", boxShadow:T.shadowLg}}>
                <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
                  <div style={{width:40, height:40, background:"rgba(255,255,255,0.1)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <Info size={20} color="#fff" style={{margin:"auto"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Viktig notering</div>
                    <p style={{margin:0, fontSize:13.5, color:"rgba(255,255,255,0.8)", lineHeight:1.7}}>
                      <strong>Det rapporterade substansvärdet (311 kr/aktie) är lägre än det justerade (355 kr/aktie).</strong> Skillnaden beror på att Patricia Industries dotterbolag bokförs till historiskt anskaffningsvärde i den rapporterade balansräkningen, medan de justerade värdena speglar bedömda marknadsvärden baserade på EV/EBITDA-multiplar för jämförbara noterade bolag. Analytiker och marknaden använder normalt det justerade värdet.
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
              
              <p style={{fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:24}}>
                Investors tillväxt drivs av en kombination av organisk tillväxt i portföljbolagen, strategiska förvärv och multipelexpansion när marknaderna värderar upp bolagen.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
                {[
                  {
                    icon: <TrendingUp size={20} color="#3B82F6"/>,
                    bg: "#EFF6FF",
                    title: "1. Patricia Industries – operationell hävstång",
                    body: "Den organiska omsättningstillväxten i Patricia Industries uppgick till 4% i konstant valuta 2025, trots ett utmanande makroklimat. En normalisering av växelkursen (SEK/USD) skulle snabbt lyfta de rapporterade siffrorna markant."
                  },
                  {
                    icon: <Target size={20} color="#10B981"/>,
                    bg: "#ECFDF5",
                    title: "2. Nova Biomedical – ny plattform",
                    body: "Advanced Instruments förvärv av Nova Biomedical för 2,2 mdr USD skapar en global life science-plattform med 31% EBITDA-marginal. Synergieffekterna har ännu inte fullt materialiserats."
                  },
                  {
                    icon: <TrendingUp size={20} color="#F59E0B"/>,
                    bg: "#FFFBEB",
                    title: "3. Noterade Bolag – Saab-effekten",
                    body: "Saab steg 133% under 2025. Investor ökade också sin position i Ericsson med över 23 miljoner B-aktier – en tydlig insidersignal om tilltro till kursutvecklingen."
                  },
                  {
                    icon: <Wallet size={20} color="#6366F1"/>,
                    bg: "#EEF2FF",
                    title: "4. EQT och alternativa tillgångar",
                    body: "EQT-plattformen genererade 15% totalavkastning 2025. Investeringen i Fortnox via EQT X ger exponering mot snabbväxande bolag utanför börsen."
                  },
                  {
                    icon: <Zap size={20} color="#8B5CF6"/>,
                    bg: "#F5F3FF",
                    title: "5. AI-integration i portföljen",
                    body: "Permobil, Mölnlycke och Tre Skandinavien implementerar AI för kundanpassning och tjänster. Dessa initiativ bör lyfta marginalerna på 2–5 års sikt."
                  }
                ].map((item, i) => (
                  <div key={i} style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:16, padding:20, display:"flex", gap:16, alignItems:"flex-start"}}>
                    <div style={{width:40, height:40, background:item.bg, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
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
                Investor är ett av de lägst-risk-profilerade sätten att investera i en diversifierad portfölj av nordiska och globala kvalitetsbolag. Diversifieringen är bred, skuldsättningen låg och kassaflödet stabilt. Ändå finns risker som investerare bör känna till:
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
                      ["Valutarisk (USD/EUR vs SEK)", "Hög exponering. Patricia Industries rapporterar i SEK men bolagen tjänar i USD/EUR. En stark krona dämpar rapporterade vinster.", "Operationell effektivisering i bolagen."],
                      ["Portföljkoncentration", "ABB (23%), Atlas Copco (17%) och Saab (11%) utgör ~51% av Noterade Bolag.", "Diversifiering via Patricia och EQT."],
                      ["Geopolitik & tullar", "Portföljbolagen är globala och exponerade mot handelskonflikter och protektionism.", "Aktiv ägarstyrning och global närvaro."],
                      ["Ränterisk", "Skulder om 50,5 mdr kr. AA-kreditbetyg håller räntekostnaden nere.", "Lång löptid (9,2 år) minimerar behovet."],
                      ["Atlas Antibodies", "Omsättningen sjunker. Nedskrivning av goodwill 1,4 mdr kr Q4 2025.", "Litet innehav (~0,1% av NAV)."],
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
                    <div style={{fontSize:11, fontWeight:800, color:T.gold, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Riskbedömning</div>
                    <p style={{margin:0, fontSize:13.5, color:T.ink, lineHeight:1.7}}>
                      Investor är en av de mest robusta placeringarna på Stockholmsbörsen. Den största risken är en bred global konjunkturnedgång som slår mot de cykliska verkstadsbolagen, men Investors extremt starka balansräkning och låga belåning gör att de kan agera offensivt även i kriser.
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
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                {[
                  ["🌱","Miljö (E)","5/5","Starka klimatmål för 2030. Fokus på Scope 3 hos portföljbolagen.",T.green,T.greenL],
                  ["👥","Socialt (S)","4/5","Fokus på mångfald och inkludering i styrelserekryteringar.",T.accent,T.accentL],
                  ["🏛️","Styrning (G)","5/5","Wallenberg-stiftelserna ger exceptionell stabilitet och långsiktighet.",T.green,T.greenL],
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
                  ["📰 Sentimentanalys","Sentimentet kring Investor är stabilt positivt. Inga tecken på överhettning trots stark kursutveckling."],
                  ["📊 Insiderhandel","Tydligt positivt mönster under 2025: Investor ökade i Ericsson och Atlas Copco."],
                  ["🔍 Avkastningshistorik","19,4% genomsnittlig årlig totalavkastning de senaste 5 åren mot SIXRX 9,4%."],
                  ["⚠️ Observation","Patricia Industries substansvärde sjönk 2025 pga valuta – skapar potential vid kronförsvagning."],
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
                    ["Är Investor ett kvalitetsbolag?","Ja. 110 år av bevisad kapitalallokering, marknadsledande låga kostnader och en portfölj av världsledande bolag."],
                    ["Är det rimligt värderat?","Ja. En substansrabatt på 7% för denna kvalitet är attraktivt. Historiskt har rabatten varit högre, men portföljmixen mot onoterat motiverar dagens nivå."],
                    ["Kan man hålla det 5–10 år?","Ja. Investor är den ultimata 'köp-och-behåll'-aktien för den långsiktige investeraren."],
                  ].map(([q,a])=>(
                    <div key={q} style={{marginBottom:16}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>→ {q}</div>
                      <div style={{fontSize:13,color:T.sub,lineHeight:1.7}}>{a}</div>
                    </div>
                  ))}
                  <div style={{marginTop:24, padding:16, background:T.bg, borderRadius:12, border:`1px solid ${T.border}`}}>
                    <p style={{margin:0, fontSize:13, color:T.ink, lineHeight:1.7}}>
                      <strong style={{color:T.sub}}>Riktkurs 395 kronor (12 månaders sikt)</strong>, baserat på ett antagande om att rabatten mot justerat substansvärde kvarstår på 5–7% medan NAV/aktie fortsätter att växa i takt med den historiska 14–16%-takten. Utdelningen på 5,60 kr bidrar med ytterligare 1,7%.
                    </p>
                    <p style={{margin:"12px 0 0 0", fontSize:13, color:T.gold, fontWeight:700}}>
                      Katalysator: Q1-rapport 21 april 2026 och valutaförbättringar i USD/SEK.
                    </p>
                  </div>
                </div>
                <div style={{background:T.greenL,border:`1.5px solid ${T.green}44`,borderRadius:16,padding:"22px 26px",textAlign:"center",flexShrink:0,minWidth:180}}>
                  <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Rekommendation</div>
                  <div style={{fontSize:36,fontWeight:900,color:T.green,letterSpacing:-1}}>KÖP</div>
                  <div style={{height:1,background:T.green+"22",margin:"12px 0"}}/>
                  <div style={{fontSize:22,fontWeight:800,color:T.ink}}>395 kr</div>
                  <div style={{fontSize:11,color:T.sub,marginTop:4}}>Riktkurs · 12 månader</div>
                  <div style={{marginTop:12,fontSize:12,color:T.sub}}>+20% uppsida + utdelning</div>
                  <div style={{marginTop:10,fontSize:13,color:T.gold,fontWeight:700}}>33/40 · 82,5%</div>
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
                  {label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"25%",pris:"450 kr",
                    triggers:["Patricia Industries lyfter kraftigt","Saab, ABB och Atlas fortsätter överprestera","Substansrabatten stängs helt"],
                    note:"NAV-tillväxt >15%, utdelningstillväxt accelererar."},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"50%",pris:"395 kr",
                    triggers:["Stabil NAV-tillväxt 10-12%","Valutaeffekter neutraliseras","Fortsatt aktivt ägande"],
                    note:"Utdelning 5,60-6,00 kr, stabil rabatt kring 7-10%."},
                  {label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"25%",pris:"280 kr",
                    triggers:["Global recession slår mot verkstad","Patricia Industries värderas ned","Substansrabatten vidgas till 20%"],
                    note:"NAV-tillväxt stannar av, börsoro pressar noterade innehav."},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>

            <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px"}}>
              <p style={{margin:0,color:T.muted,fontSize:12,lineHeight:1.7}}>
                <strong style={{color:T.sub}}>Disclaimer:</strong> Denna analys är framtagen av börsanalys.se för informationsändamål och utgör inte finansiell rådgivning. Historisk avkastning garanterar inte framtida avkastning. Investering i aktier innebär alltid risk.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
