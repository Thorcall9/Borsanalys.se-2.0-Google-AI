import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, AlertTriangle, TrendingUp, Info, Target, Wallet, Truck, Zap, ShieldCheck } from "lucide-react";
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

interface VolvoDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
}

export default function VolvoDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading 
}: VolvoDeepDiveProps){
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
              <div className="text-2xl font-black text-slate-900">324 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~660 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal</span>
              <div className="text-2xl font-black text-slate-900">12,0</div>
              <span className="text-xs text-slate-500 font-bold mt-1 block">Rimlig</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">4,0%</div>
              <span className="text-xs text-slate-500 mt-1 block">Ordinarie utdelning</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#10B981]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">345 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2 mb-4">12 månaders sikt</p>
                <button 
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-black py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Lås upp full analys
                </button>
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
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              <StatCard label="Börskurs" value="324 kr" sub="VOLV-B" accent/>
              <StatCard label="Börsvärde" value="660 Mdr" sub="Large Cap"/>
              <StatCard label="P/E-tal" value="12,0" sub="Rimlig värdering"/>
              <StatCard label="Direktavkastning" value="4,0%" sub="Föreslagen utdelning"/>
            </div>

            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
                {( [
                  ["Bakgrund & Struktur","AB Volvo är en global ledare inom transport- och infrastrukturlösningar, noterad på Nasdaq Stockholm med tickern VOLV B. Bolaget designar, tillverkar och marknadsför lastbilar, bussar, anläggningsmaskiner samt marina och industriella motorer under varumärkena Volvo Trucks, Renault Trucks, Mack och Volvo CE."],
                  ["Affärsidé & Modell", <span>En central del av affärsmodellen är den <strong>breda serviceverksamheten</strong> — finansiering, försäkring, reservdelar och underhåll — som strukturellt balanserar de naturliga fluktuationerna i fordonsförsäljningen.</span>],
                  ["Ledning","Christian Levin tog över som VD under 2025 och driver nu bolagets transformation mot mjukvarudefinierade fordon och modulära plattformar."],
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
                Helåret 2025 var utmanande med sjunkande omsättning och marginaler, men Volvo bibehåller en urstark finansiell ställning med en nettokassa på 66 mdr SEK. Den teknologiska transformationen accelererar under ny ledning, med fokus på modulära plattformar och mjukvarudefinierade fordon.
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
                  Volvos främsta konkurrensfördelar ligger i deras starka varumärken, globala servicenätverk och teknologiska ledarskap. Inom tunga transporter är tillförlitlighet och servicegrad avgörande, vilket skapar höga inträdesbarriärer.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24}}>
                {[
                  ["Styrkor",T.green,T.greenL,["Världsledande position inom tunga lastbilar","Rekordstark balansräkning med stor nettokassa","Ledande inom elektrifiering av tunga fordon","Globalt servicenätverk med höga marginaler"]],
                  ["Svagheter",T.gold,T.goldL,["Cyklisk efterfrågan på lastbilar och maskiner","Hög exponering mot råmaterialpriser","Komplex global leveranskedja"]],
                  ["Möjligheter",T.accent,T.accentL,["Grön omställning driver utbytescykel","Tillväxt inom tjänster och digitala lösningar","Expansion inom autonoma transporter"]],
                  ["Hot",T.red,T.redL,["Global lågkonjunktur dämpar investeringsvilja","Ökad konkurrens från nya el-lastbilsaktörer","Geopolitiska spänningar påverkar handel"]],
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
                  ["Varumärke","Starka globala varumärken som Volvo, Mack och Renault.","★★★★☆"],
                  ["Servicenätverk","Oöverträffad global närvaro för service och delar.","★★★★★"],
                  ["Teknologi","Ledande inom batterielektriska och vätgaslösningar.","★★★★☆"],
                  ["Skalfördelar","En av världens största inköpare av komponenter.","★★★★☆"],
                  ["Switching Costs","Djup integration i kundernas logistikflöden.","★★★☆☆"],
                  ["Finansiell styrka","Möjliggör massiva FoU-investeringar över tid.","★★★★★"],
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
                Volvo har under de senaste åren uppvisat en imponerande finansiell disciplin. Trots utmaningar i leveranskedjor har bolaget lyckats bibehålla tvåsiffriga rörelsemarginaler och generera starka kassaflöden.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24}}>
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
                      ["Direktavkastning","6,3%","6,2%","4,0%","~4,5%"],
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
                Volvo värderas idag till ett P/E-tal kring 12, vilket är lågt för ett bolag med så hög lönsamhet och finansiell styrka. Marknaden verkar prisa in en betydande konjunkturavmattning.
              </p>

              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:24}}>
                {[
                  ["P/E 2025e", "15,4x", "Baserat på estimat"],
                  ["EV/EBIT", "10,2x", "Justerat för nettokassa"],
                  ["Direktavkastning", "4,0%", "Föreslagen utdelning", true],
                  ["P/S-tal", "1,38x", "Omsättning vs börsvärde"],
                  ["Nettokassa/aktie", "~32 kr", "Finansiell styrka"],
                  ["ROE", "20,0%", "Kapitaleffektivitet"],
                ].map(([l,v,s,acc], i)=>(
                  <div key={i} style={{background:acc?T.accentL:T.bg, border:`1px solid ${acc?T.accent+"33":T.border}`, borderRadius:12, padding:14}}>
                    <div style={{fontSize:10, fontWeight:800, color:acc?T.accent:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:4}}>{l}</div>
                    <div style={{fontSize:18, fontWeight:900, color:acc?T.accent:T.ink, letterSpacing:-0.5}}>{v}</div>
                    <div style={{fontSize:10, color:T.muted, fontStyle:"italic", marginTop:2}}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{background:T.ink, borderRadius:16, padding:24, color:"#fff", boxShadow:T.shadowLg}}>
                <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
                  <div style={{width:40, height:40, background:"rgba(255,255,255,0.1)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <Info size={20} color="#fff" style={{margin:"auto"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Värderingsnotering</div>
                    <p style={{margin:0, fontSize:13.5, color:"rgba(255,255,255,0.8)", lineHeight:1.7}}>
                      <strong>Volvo handlas med en betydande rabatt mot globala konkurrenter som Paccar.</strong> Vi anser att denna rabatt är omotiverad givet Volvos ledande position inom elektrifiering och deras starkare balansräkning. En uppvärdering till P/E 14-15 vore rimlig i ett normalläge.
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
              
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
                {[
                  {
                    icon: <Zap size={20} color="#3B82F6"/>,
                    bg: "#EFF6FF",
                    title: "1. Elektrifiering – Grön omställning",
                    body: "Volvo leder skiftet till el-lastbilar. En utbytescykel där flottor byts ut mot fossilfria alternativ skapar en strukturell tillväxt som sträcker sig över decennier."
                  },
                  {
                    icon: <TrendingUp size={20} color="#10B981"/>,
                    bg: "#ECFDF5",
                    title: "2. Tjänstetillväxt & Digitalisering",
                    body: "Målet är att öka andelen tjänsteintäkter. Dessa är mindre cykliska och har högre marginaler, vilket stabiliserar resultatet över konjunkturcykler."
                  },
                  {
                    icon: <Target size={20} color="#F59E0B"/>,
                    bg: "#FFFBEB",
                    title: "3. Nordamerika – Mack & Volvo",
                    body: "Stark marknadsposition i USA där infrastrukturinvesteringar driver efterfrågan på tunga fordon och anläggningsmaskiner."
                  },
                  {
                    icon: <Wallet size={20} color="#6366F1"/>,
                    bg: "#EEF2FF",
                    title: "4. Kapitalallokering & Utdelning",
                    body: "Den enorma kassan möjliggör både strategiska förvärv inom mjukvara/autonomi och fortsatta rekordutdelningar till aktieägarna."
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
                <span style={{fontSize:10, fontWeight:900, color:T.gold, textTransform:"uppercase", letterSpacing:0.5}}>Risknivå: MEDEL · 3/5</span>
              </div>

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
                      ["Konjunkturkänslighet", "Hög. Efterfrågan på tunga fordon faller snabbt vid ekonomisk inbromsning.", "Ökad andel tjänsteintäkter stabiliserar."],
                      ["Komponentbrist", "Risk för störningar i leveranskedjor för batterier och halvledare.", "Diversifierad leverantörsbas."],
                      ["Prispress", "Hård konkurrens från både etablerade och nya aktörer.", "Fokus på premiumsegment och totalekonomi."],
                      ["Teknologiskifte", "Risk att hamna efter i utvecklingen av vätgas eller autonomi.", "Massiva FoU-investeringar och partnerskap."],
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

        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={800}>
            <Card mb={20}>
              <SectionLabel number="IX" title="Sammanfattning & Investeringsbeslut"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"start"}}>
                <div>
                  {[
                    ["Är Volvo ett kvalitetsbolag?","Ja. Trots ett svagare 2025 är Volvo en global ledare med starka varumärken och en solid balansräkning."],
                    ["Är det rimligt värderat?","Ja. Värderingen reflekterar de nuvarande utmaningarna, men uppsidan är begränsad till vår riktkurs."],
                    ["Kan man hålla det 5–10 år?","Ja. Den teknologiska transformationen skapar långsiktiga möjligheter trots kortsiktig motvind."],
                  ].map(([q,a])=>(
                    <div key={q} style={{marginBottom:16}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>→ {q}</div>
                      <div style={{fontSize:13,color:T.sub,lineHeight:1.7}}>{a}</div>
                    </div>
                  ))}
                  <div style={{marginTop:24, padding:16, background:T.bg, borderRadius:12, border:`1px solid ${T.border}`}}>
                    <p style={{margin:0, fontSize:13, color:T.ink, lineHeight:1.7}}>
                      <strong style={{color:T.sub}}>Riktkurs 345 kronor (12 månaders sikt)</strong>. Vi väljer att bevaka aktien i väntan på tydligare tecken på att marknaden för tunga fordon stabiliseras och att den nya strategin börjar ge frukt.
                    </p>
                  </div>
                </div>
                <div style={{background:T.accentL,border:`1.5px solid ${T.accent}44`,borderRadius:16,padding:"22px 26px",textAlign:"center",flexShrink:0,minWidth:180}}>
                  <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Rekommendation</div>
                  <div style={{fontSize:36,fontWeight:900,color:T.accent,letterSpacing:-1}}>BEVAKA</div>
                  <div style={{height:1,background:T.accent+"22",margin:"12px 0"}}/>
                  <div style={{fontSize:22,fontWeight:800,color:T.ink}}>345 kr</div>
                  <div style={{fontSize:11,color:T.sub,marginTop:4}}>Riktkurs · 12 månader</div>
                  <div style={{marginTop:12,fontSize:12,color:T.sub}}>+6% uppsida + 4,0% utdelning</div>
                  <div style={{marginTop:10,fontSize:13,color:T.gold,fontWeight:700}}>31/40 · 3.9 / 5.0</div>
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
                  {label:"🐂 Bull Case",color:T.green,bg:T.greenL,prob:"20%",pris:"410 kr",
                    triggers:["Snabbare elektrifiering än väntat","Starka marginaler i USA","Extrautdelningar överraskar"],
                    note:"Värderingen stiger till P/E 15."},
                  {label:"⚖️ Base Case",color:T.gold,bg:T.goldL,prob:"60%",pris:"345 kr",
                    triggers:["Stabil efterfrågan","Tjänsteintäkter växer enligt plan","Bibehållna marginaler"],
                    note:"Normal cyklisk utveckling."},
                  {label:"🐻 Bear Case",color:T.red,bg:T.redL,prob:"20%",pris:"260 kr",
                    triggers:["Djup global recession","Priskrig på el-lastbilar","Stora kreditförluster i finansarmen"],
                    note:"Vinsten faller och multiplar pressas."},
                ].map(s=><ScenarioCard key={s.label} {...s}/>)}
              </div>
            </Card>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
