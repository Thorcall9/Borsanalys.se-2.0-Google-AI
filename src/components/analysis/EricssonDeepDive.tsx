import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, AlertTriangle, TrendingUp, Info, Target, Landmark, Zap, ShieldCheck, PieChart, BarChart3, Users, Globe, Briefcase, Activity } from "lucide-react";
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
  accent:  "#002561", // Ericsson Blue
  accentL: "#E6EBF5",
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
  {ar:"2023", v:263.4},
  {ar:"2024", v:247.9},
  {ar:"2025", v:236.7},
  {ar:"2026e", v:240.5, e:true},
];

const marginData = [
  {ar:"2024", v:11.0},
  {ar:"2025 (rep)", v:18.1},
  {ar:"2025 (norm)", v:14.9},
  {ar:"2026e", v:15.5, e:true},
];

const epsData = [
  {ar:"2023", v:-8.21},
  {ar:"2024", v:0.01},
  {ar:"2025", v:8.51},
  {ar:"2026e", v:7.20, e:true},
];

const allScores = [
  {key:"Affärsmodell",val:3,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell Kvalitet",val:4,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxtutsikter",val:3,max:5},
  {key:"Riskprofil ⚠",val:3,max:5,inv:true},
  {key:"ESG & Makro",val:3,max:5},
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

interface EricssonDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function EricssonDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: EricssonDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#002561] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#002561] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  Ericsson AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">ERIC B</span>
                <span className="text-sm font-medium opacity-90">Telekomutrustning • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#002561] border-white' 
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
              <span className="text-4xl font-black tracking-tighter">26/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '65%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">3.25 / 5.0 – Kvalitetsbetyg</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">91,50 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">305 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Global Leader</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (Norm.)</span>
              <div className="text-2xl font-black text-slate-900">11,1</div>
              <span className="text-xs text-slate-500 mt-1 block">Normaliserat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">3,28%</div>
              <span className="text-xs text-[#002561] font-bold mt-1 block">Föreslagen: 3,00 kr</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#002561]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">100-115 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">Medellång sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#002561]">
                <Activity size={80} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. ANALYSIS CATEGORIES */}
      <div className="w-full py-8 px-6 md:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allScores.map(({key, val, max}) => {
              const isWarning = key.includes('⚠');
              return (
                <div 
                  key={key}
                  className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#002561]/30 transition-colors"
                >
                  {isWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                  <span className="text-xs font-bold text-slate-600">{key.replace(' ⚠', '')}</span>
                  <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#002561]' : 'text-slate-500'}`}>
                    {val}/{max}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(max)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < val 
                            ? (val >= 4 ? 'bg-[#002561]' : 'bg-slate-400') 
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
                  ["Verksamhet","Telefonaktiebolaget LM Ericsson är ett av världens viktigaste bolag inom mobilnätsinfrastruktur. Bolaget säljer radioaccessnät, kärnnät, mjukvara, drift- och optimeringstjänster samt företagslösningar."],
                  ["Marknadsposition", <span>Ericsson hade 2025 en nettoomsättning på <strong>236,7 miljarder kronor</strong> och över 89 000 anställda. Cirka 50 procent av all mobiltrafik utanför Kina går över nät levererade av Ericsson.</span>],
                  ["Geografisk Mix", "Nord- och Sydamerika 35%, Europa/Mellanöstern/Afrika 30%, Sydostasien/Oceanien/Indien 12%, Nordostasien 7%, Other (bl.a. Patent/Enterprise) 16%."],
                  ["Affärsmodell", "Fyra lager: Installerade basen, Uppgraderingar/Service/Mjukvara, Företagsaffären (Vonage/Network APIs), samt Patent- och licensintäkter (~13 mdr kr återkommande)."],
                  ["Ledning & Disciplin", "Börje Ekholm har förbättrat marginaler och kostnadsdisciplin. 2025 blev nionde kvartalet i följd med förbättrad justerad EBITA-marginal sekventiellt."],
                  ["Ägarstruktur", "Stark kontrollägarbild med Investor AB (24,82% av rösterna) och Industrivärden (15,04%). Ger en stabil industriell förankring."],
                ].map(([t,b])=>(
                  <div key={t as string}>
                    <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>{t}</div>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>{b}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`}}>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Analytikerns bedömning</div>
              <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                Ericsson har en fungerande och bevisat relevant affärsmodell, men det är inte en ren SaaS-modell med hög visibilitet och självgående tillväxt. Affären är fortfarande tydligt cyklisk och beroende av operatörernas investeringsvilja. Vi väljer att bevaka aktien i väntan på bättre kassaflödesgenerering och tydligare besked kring de juridiska riskerna.
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
                  Ericssons strategiska position är starkare än vad den genomsnittliga börsbilden ibland antyder. Moaten bygger på teknikledarskap, en massiv installerad bas och en av världens största patentportföljer inom telekom (&gt;60 000 patent).
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Med en global RAN-markndadsandel på cirka 37 procent utanför Kina och 206 aktiva 5G-nät i 85 länder är de en av få verkliga systemleverantörer. Switching costs är höga: när en operatör byggt sin arkitektur med Ericsson är det dyrt och riskfyllt att byta.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ["Teknikledarskap","Skala och ledande position i mobilnätsutrustning.","★★★★★"],
                  ["Patentportfölj","Över 60 000 patent ger återkommande licensintäkter.","★★★★★"],
                  ["Switching Costs","Hög tröskel att byta system för operatörer.","★★★★☆"],
                  ["Global Service","Enorm leverans- och servicekapacitet i 175 länder.","★★★★☆"],
                ].map(([m,d,s])=>(
                  <div key={m} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:14}}>
                    <div style={{fontWeight:700,color:T.ink,fontSize:13,marginBottom:4}}>{m}</div>
                    <div style={{color:T.gold,fontSize:12,marginBottom:6}}>{s}</div>
                    <div style={{color:T.sub,fontSize:12,lineHeight:1.6}}>{d}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop: 32}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{background:"#F0FDF4", borderRadius:12, padding:16, border:"1px solid #DCFCE7"}}>
                    <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:8}}>💪 Styrkor</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.7}}>
                      <li>Stark global marknadsposition i RAN utanför Kina</li>
                      <li>Stor patentportfölj och licensintäkter (~13 mdr/år)</li>
                      <li>Installerad bas och höga switching costs</li>
                      <li>Robust nettokassa och förbättrade marginaler</li>
                    </ul>
                  </div>
                  <div style={{background:"#FEF2F2", borderRadius:12, padding:16, border:"1px solid #FEE2E2"}}>
                    <div style={{fontWeight:700, color:"#991B1B", fontSize:13, marginBottom:8}}>⚠️ Svagheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#991B1B", lineHeight:1.7}}>
                      <li>RAN-marknaden väntas vara oförändrad 2026</li>
                      <li>Enterprise ännu inte bevisat som stabilt vinstben</li>
                      <li>2025-lönsamhet förstärks av iconectiv-vinst</li>
                      <li>Beroende av operatörernas capex-cykler</li>
                    </ul>
                  </div>
                  <div style={{background:"#EFF6FF", borderRadius:12, padding:16, border:"1px solid #DBEAFE"}}>
                    <div style={{fontWeight:700, color:"#1D4ED8", fontSize:13, marginBottom:8}}>🚀 Möjligheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#1D4ED8", lineHeight:1.7}}>
                      <li>5G standalone och programmerbara nät</li>
                      <li>Network APIs via Vonage/Aduna</li>
                      <li>Privata nät, försvar och samhällskritisk infra</li>
                      <li>AI-drivna autonoma nät och 6G-positionering</li>
                    </ul>
                  </div>
                  <div style={{background:"#FFFBEB", borderRadius:12, padding:16, border:"1px solid #FDE68A"}}>
                    <div style={{fontWeight:700, color:"#92400E", fontSize:13, marginBottom:8}}>🔴 Hot</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#92400E", lineHeight:1.7}}>
                      <li>Hård konkurrens från Nokia och Huawei</li>
                      <li>Patenttvister och regulatorisk granskning</li>
                      <li>Valutamotvind och osäker makro</li>
                      <li>Fortsatt svag investeringstakt i Indien</li>
                    </ul>
                  </div>
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
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:28}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  2025 var finansiellt ett tydligt förbättringsår. Justerad bruttomarginal steg till <strong>48,1 procent</strong> och justerad EBITA-marginal till <strong>18,1 procent</strong>. Men här krävs en viktig normalisering: exklusive iconectiv-vinsten var marginalen <strong>14,9 procent</strong>.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Nettokassan steg till <strong>61,2 miljarder kronor</strong>, vilket ger Ericsson betydande finansiell flexibilitet för FoU, utdelning (3,00 kr) och det föreslagna återköpsprogrammet på 15 miljarder kronor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>EBITA Marginal (%)</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:12,fontStyle:"italic"}}>Rep: 18,1% | Norm: 14,9%</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={marginData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[5,20]}/>
                      <Tooltip content={<ChartTip unit="%"/>}/>
                      <Line type="monotone" dataKey="v" name="EBITA %" stroke="#002561" strokeWidth={3} dot={{fill:T.accent, r:4}} />
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
                      <Bar dataKey="v" name="EPS" fill="#002561" radius={[4,4,0,0]}>
                        {epsData.map((d,i)=><Cell key={i} fill={d.e?T.accent+"88":T.accent}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Omsättning (Mdr SEK)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={revenueData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[200, 300]}/>
                      <Tooltip content={<ChartTip unit=" Mdr"/>}/>
                      <Bar dataKey="v" name="Omsättning" fill={T.ink} radius={[4,4,0,0]}>
                        {revenueData.map((d,i)=><Cell key={i} fill={d.e?"#5C6B7A":T.ink}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Key Metrics 2025</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Segment / Nyckeltal","2025 Utfall","Organisk tillväxt","Segment EBITA%","Kommentar"].map(h=>(
                        <th key={h} style={{padding:"8px 12px",textAlign:"left",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Networks","151,0 Mdr","+2%","~18%","Stark kärnaffär"],
                      ["Cloud Software & Services","62,7 Mdr","+6%","~9%","God tillväxt (Q4 +12%)"],
                      ["Enterprise","21,1 Mdr","N/A","Låg","Pàverkas av investeringar"],
                      ["Justerad EBITA (ex iconectiv)","35,3 Mdr","-","14,9%","Normaliserad nivå"],
                    ].map(([q,...vals],ri)=>(
                      <tr key={ri} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"9px 12px",color:T.ink,fontWeight:700}}>{q}</td>
                        {vals.map((v,ci)=>(
                          <td key={ci} style={{padding:"9px 12px",color:ci===1?T.accent:T.sub,fontWeight:ci===1?700:400}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                Det mest missvisande med Ericsson just nu är att använda EPS 8,51 SEK okritiskt, eftersom det innehåller iconectiv-vinsten. Vid årsskiftets kursnivåer (91,5 kr) handlas aktien till en normaliserad nivå som ser rimlig ut, men inte extremt billig.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {[
                  ["P/E (Normaliserat)", "11,1x", "Just. ficonectiv"],
                  ["Direktavkastning", "3,28%", "Föreslagen 3,00 kr"],
                  ["Nettokassa", "61,2 Mdr", "Betydande flexibilitet", true],
                  ["Utdelningsandel", "~35%", "Av EPS ex engångs"],
                  ["Återköp", "15 Mdr", "Föreslaget program"],
                  ["Börsvärde", "305 Mdr", "Large Cap"],
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
                  Ericsson ser rimligt värderat ut på normaliserade antaganden. Det finns stöd från balansräkning och kapitalåterföring (utdelning+återköp), men inte tillräcklig felprissättning för högre betyg. Vi ser ett rimligt värde i intervallet <strong>100–115 SEK</strong>.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: "🌐", bg: "#EFF6FF", title: "1. Cloud Software & Services", body: "12% organisk tillväxt i Q4. Visar att Ericsson kan växa i delar av affären trots att hårdvarumarknaden (RAN) är flat." },
                  { icon: "📡", bg: "#ECFDF5", title: "2. 5G Standalone & API:er", body: "Network APIs via Vonage/Aduna skapar nya intäktsmodeller. 55 levererade 5G standalone-nät utgör grunden för framtidens programmerbara nät." },
                  { icon: "🛡️", bg: "#FFFBEB", title: "3. Försvar & Samhällskritisk Infra", body: "Planerade ökade investeringar inom försvarsområdet 2026. Airbus är ett konkret exempel på hur privata nät börjar industrialiseras." },
                  { icon: "🤖", bg: "#F5F3FF", title: "4. AI-drivna autonoma nät", body: "Effektivisering genom automation i näten. Det är inte bara trendigt, det är nödvändigt för operatörernas marginaler." }
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
                <span style={{fontSize:10, fontWeight:900, color:T.gold, textTransform:"uppercase", letterSpacing:0.5}}>Risknivå: MEDEL | SCORE: 3/5</span>
              </div>
              <div style={{overflowX:"auto", marginBottom:24}}>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`, background:T.bg}}>
                      <th style={{padding:"12px", textAlign:"left", color:T.ink, fontWeight:800, textTransform:"uppercase", fontSize:10, letterSpacing:0.5}}>Riskområde</th>
                      <th style={{padding:"12px", textAlign:"left", color:T.ink, fontWeight:800, textTransform:"uppercase", fontSize:10, letterSpacing:0.5}}>Bedömning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Juridik (DOJ/Irak)", "Pågående utredning utan definitivt slutdatum. Kvarvarande riskpremie."],
                      ["Kina (SAMR)", "Granskning kring patentlicensiering kan leda till sanktioner."],
                      ["Marknad (RAN)", "Väntas vara oförändrad 2026. Låg strukturell tillväxt."],
                      ["Patent", "Smartphone-licensavtal i Kina löpte ut vid årsskiftet. Skapar osäkerhet."],
                      ["Valuta", "10% förändring i USD påverkar omsättning med ca 5%."]
                    ].map(([r, b], i) => (
                      <tr key={i} style={{borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"12px", fontWeight:700, color:T.ink}}>{r}</td>
                        <td style={{padding:"12px", color:T.sub, lineHeight:1.5}}>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── ESG & AI ── */}
        <div id="esg">
          <FadeIn delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <SectionLabel number="VII" title="ESG & Makro"/>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8}}>
                  Geopolitik och säkerhetskrav stärker indirekt Ericssons position mot vissa kinesiska leverantörer. Dock hindrar governance-arvet (Irak/DOJ) ett högre betyg än 3/5. Digitalisering och konnektivitet är dock urstarka makrodrivare.
                </p>
              </Card>
              <Card>
                <SectionLabel number="VIII" title="AI-observationer"/>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8}}>
                  Datamönstret visar nio kvartal i följd med förbättrad justerad EBSITA-marginal – ett starkt tecken på operationell disciplin. Men återköp i en flat huvudmarknad kan också signalera begränsade interna tillväxtmöjligheter.
                </p>
              </Card>
            </div>
          </FadeIn>
        </div>

        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={700}>
            <Card mb={20}>
              <SectionLabel number="IX" title="Sammanfattning & Investeringsbeslut"/>
              <div className="space-y-6">
                <div>
                  <div style={{fontWeight:700, color:T.ink, fontSize:15, marginBottom:4}}>Är Ericsson ett kvalitetsbolag?</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>Ja, men med tydliga reservationer. Det är ett starkt teknik- och infrastrukturbolag med skala och patent, men det är inte ett rent compounder-case än.</p>
                </div>
                <div>
                  <div style={{fontWeight:700, color:T.ink, fontSize:15, marginBottom:4}}>Är det rimligt värderat?</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>Ja. Vid 91,5 kr och målpris 100-115 kr finns en rimlig balans mellan risk och potential.</p>
                </div>
                <div style={{background:T.accentL, padding:20, borderRadius:12, borderLeft: `4px solid ${T.accent}`}}>
                  <div style={{fontWeight:800, color:T.accent, marginBottom:4}}>Slutsats: BEVAKA</div>
                  <p style={{margin:0, fontSize:14, color:T.ink, lineHeight:1.7, fontWeight:500}}>
                    Ericsson är mer disciplinerat och robust än för några år sedan. Men caset hålls tillbaka av en trög marknad och juridiska moln. Vi väntar på bevis för att Enterprise-benet kan lyfta vinstkvaliteten.
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={800}>
            <SectionLabel number="X" title="Scenarier"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Bull Case", color: T.green, bg: T.greenL, pris: "135 kr", upside: "+48%", body: "5G standalone, kärnnät, privata nät och network APIs får snabbare kommersiellt genomslag samtidigt som juridiska risker klingar av." },
                { label: "Base Case", color: T.accent, bg: T.accentL, pris: "110 kr", upside: "+20%", body: "RAN förblir flat, kärnnät och företagslösningar växer måttligt, kassaflödet förblir robust och Ericsson fortsätter återföra kapital." },
                { label: "Bear Case", color: T.red, bg: T.redL, pris: "75 kr", upside: "-18%", body: "Patentförnyelser blir svagare, juridiska processer fördyras, Enterprise underlevererar och svag operatörscapex pressar Networks." },
              ].map((s, i) => (
                <div key={i} style={{background:s.bg, border:`2.5px solid ${s.color}22`, borderRadius:20, padding:24}}>
                  <div style={{fontWeight:800, color:s.color, fontSize:14, marginBottom:12}}>{s.label}</div>
                  <div style={{fontSize:32, fontWeight:900, color:s.color, marginBottom:4}}>{s.pris}</div>
                  <div style={{fontSize:12, color:T.muted, marginBottom:16}}>{s.upside} · 12 mån</div>
                  <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.6}}>{s.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <AdUnit slot="9321045612" />

        {/* ── NEXT ANALYSIS ── */}
        {nextAnalysis && (
          <NextAnalysisButton 
            analysis={nextAnalysis} 
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <MultiplexAd />
      </div>
    </div>
  );
}
