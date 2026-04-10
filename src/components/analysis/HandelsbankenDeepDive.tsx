import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import AdUnit from "../AdUnit";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0D1B2A",
  sub:     "#5C6B7A",
  muted:   "#9BAAB8",
  border:  "#E4EAF0",
  bg:      "#F7F9FC",
  surface: "#FFFFFF",
  accent:  "#004B87", // Handelsbanken Blue
  accentL: "#E6F0F7",
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
  {ar:"2022", v:50.0},
  {ar:"2023", v:62.5},
  {ar:"2024", v:62.3},
  {ar:"2025", v:56.8},
  {ar:"2026e", v:54.5, e:true},
];

const epsData = [
  {ar:"2022", v:10.50},
  {ar:"2023", v:13.50},
  {ar:"2024", v:13.86},
  {ar:"2025", v:11.98},
  {ar:"2026e", v:11.10, e:true},
];

const roeData = [
  {ar:"2022", v:11.5},
  {ar:"2023", v:14.2},
  {ar:"2024", v:14.6},
  {ar:"2025", v:13.0},
  {ar:"2026e", v:12.1, e:true},
];

const allScores = [
  {key:"Affärsmodell",val:5,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell Kvalitet",val:5,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxtutsikter",val:3,max:5},
  {key:"Riskprofil",val:5,max:5},
  {key:"ESG & Makro",val:4,max:5},
  {key:"AI-obs.",val:3,max:5},
];

function useHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [h,setH]=useState(false);
  return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];
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

interface HandelsbankenDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function HandelsbankenDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: HandelsbankenDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#004B87] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#004B87] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-xl font-black tracking-tighter text-center leading-none">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  Svenska Handelsbanken AB
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">SHB A</span>
                <span className="text-sm font-medium opacity-90">Bank & Finans • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#004B87] border-white' 
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
              <div className="text-2xl font-black text-slate-900">134,35 kr</div>
              <span className="text-xs text-slate-500 mt-1 block">Analyspris (2026)</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">269 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (2025)</span>
              <div className="text-2xl font-black text-slate-900">11,2</div>
              <span className="text-xs text-slate-500 mt-1 block">Normaliserat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">13,0%</div>
              <span className="text-xs text-[#004B87] font-bold mt-1 block">Varav 6% ordinarie (2026)</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#004B87]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Målpris</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900">145-155 kr</div>
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2">12 månaders sikt</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#004B87]">
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
            {allScores.map(({key, val, max}) => (
              <div 
                key={key}
                className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#004B87]/30 transition-colors"
              >
                <span className="text-xs font-bold text-slate-600">{key}</span>
                <span className={`text-xs font-black ml-2 ${val >= 4 ? 'text-[#004B87]' : 'text-slate-500'}`}>
                  {val}/{max}
                </span>
                <div className="flex gap-1 ml-2">
                  {[...Array(max)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < val 
                          ? (val >= 4 ? 'bg-[#004B87]' : 'bg-slate-400') 
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. META INFO */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 mb-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Författare:</span>
            <span className="text-slate-900 font-bold">Carl Fredrik Thor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Datum:</span>
            <span className="text-slate-900 font-bold">10 april 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Källor:</span>
            <span className="text-slate-900 font-bold italic">Årsredovisning 2025, Q3 2025, bokslutskommuniké 2025</span>
          </div>
        </div>
      </div>
      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-16">

        {/* ── METADATA ── */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sektor</div>
              <div className="text-sm font-bold text-slate-900">Bank & Finans</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Marknad</div>
              <div className="text-sm font-bold text-slate-900">Stockholm (Large Cap)</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ticker</div>
              <div className="text-sm font-bold text-slate-900">SHB A</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Valuta</div>
              <div className="text-sm font-bold text-slate-900">SEK</div>
            </div>
          </div>
        </div>

        {/* ── ÖVERSIKT ── */}
        <div id="oversikt">
          <FadeIn>
            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div key="bakgrund" className="space-y-4">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase"}}>Bakgrund & Affärsidé</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Svenska Handelsbanken är en av Nordens mest etablerade banker, grundad 1871. Banken verkar främst på fyra hemmamarknader: Sverige, Storbritannien, Norge och Nederländerna, samt har viss verksamhet i Luxemburg och USA. 
                  </p>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Till skillnad från många konkurrenter försöker Handelsbanken inte vinna på aggressiv volymtillväxt eller hög riskaptit. Affärsidén bygger på lokal närvaro, personliga kundrelationer, decentraliserat beslutsfattande och låg risktolerans. Banken vill i stället ha nöjdare kunder, lägre kostnader än konkurrenterna och högre lönsamhet över tid – en enkel modell i teorin, men svår att kopiera i praktiken.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Börskurs (2025 utg.)</span>
                      <span className="text-sm font-black text-slate-900">134,35 kr</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Antal aktier</span>
                      <span className="text-sm font-black text-slate-900">ca 1 980 milj.</span>
                    </div>
                  </div>
                </div>
                
                <div key="modell" className="space-y-4">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase"}}>Affärsmodell</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Som universalbank kommer intjäningen främst från:
                  </p>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13, color:T.sub, lineHeight:1.7}}>
                    <li><strong>Räntenetto:</strong> Skillnaden mellan räntor på utlåning och inlåning (42,5 mdkr 2025).</li>
                    <li><strong>Provisionsnetto:</strong> Avgifter från sparande, kapitalförvaltning och betalningar (11,9 mdkr 2025).</li>
                    <li><strong>Övrigt:</strong> Markets-verksamhet och finansiella poster.</li>
                  </ul>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Räntenettot utgör den största delen (75% av intäkterna), vilket ger hög lönsamhet men också känslighet för marknadsräntor. Samtidigt visar den växande sparaffären på en positiv diversifiering.
                  </p>
                </div>

                <div key="ledning" className="space-y-4">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase"}}>Ledning</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Michael Green är VD sedan 1 januari 2024. Han är en intern veteran som började i banken 1994 och har haft ledande roller i USA, Västra Sverige och Capital Markets. Detta minskar exekveringsrisken genom djup kännedom om bankens unika kultur.
                  </p>
                </div>

                <div key="agarstruktur" className="space-y-4">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase"}}>Ägarstruktur</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>
                    Stabil ägarbild med Industrivärden (11,6%) och Oktogonen (8,0%) som huvudsakliga ägare. Oktogonen är särskilt viktig då den fungerar både som incitamentsstruktur och kulturförstärkare över tid.
                  </p>
                </div>
              </div>
            </Card>

            <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87"}}>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Analytikerns bedömning</div>
              <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                Handelsbanken har en av Europas starkaste bankmodeller. Den är inte snabbväxande, men den är robust, bevisad och mycket lönsam över tid. För en bank är det toppklass. Kombinationen av kultur, kapitalstyrka, kreditkvalitet och kundnöjdhet är ovanlig.
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-6">
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:12}}>Marknad och position</h3>
                    <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                      Bankmarknaden i Norden är mogen, hårt reglerad och konkurrensutsatt. Handelsbanken har byggt sin position genom hög kreditdisciplin, stark kundnöjdhet och låg riskaptit. 
                    </p>
                    <p style={{marginTop:12,margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                      Banken lyfter fram att ingen annan privatägd bank i världen har högre sammanvägd kreditrating från <strong>Fitch, Moody’s och S&P</strong>, och att man rankats som <strong>Europas säkraste affärsbank</strong> av Global Finance. Detta ger billigare finansiering och högre förtroende.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:12}}>Konkurrensfördelar</h3>
                    <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                      <strong>Kultur som Moat:</strong> Den viktigaste moaten är inte teknik utan kultur. Handelsbankens decentraliserade modell med lokalt mandat och ansvar (utan centrala säljmål) gör att de kan optimera för långsiktig kundkvalitet framför kortsiktig volym.
                    </p>
                    <p style={{marginTop:12,margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                      <strong>Kreditkultur i världsklass:</strong> Under 2025 var kreditförlustnivån <strong>-0,01%</strong> (nettoåterföringar), vilket markerade det åttonde kvartalet i rad med nettoåterföringar – en exceptionellt stark prestation i sektorn.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                <MoatCard key="kultur" title="Decentraliserad kultur" desc="Beslut nära kunden utan säljmål." stars="★★★★★"/>
                <MoatCard key="kredit" title="Kreditkvalitet" desc="Exceptionellt stark (-0,01% förluster)." stars="★★★★★"/>
                <MoatCard key="kund" title="Kundnöjdhet" desc="Nöjdast kunder enligt SKI 2025." stars="★★★★★"/>
                <MoatCard key="kapital" title="Kreditrating" desc="Världsledande bland privatägda banker." stars="★★★★★"/>
              </div>

              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{background:"#F0FDF4", borderRadius:12, padding:16, border:"1px solid #DCFCE7"}}>
                    <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:8}}>Styrkor</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.7}}>
                      <li>Exceptionell kreditkvalitet (-0,01% förlustnivå)</li>
                      <li>Mycket stark balansräkning och världsledande rating</li>
                      <li>Högst kundnöjdhet (SKI) och Årets affärsbank</li>
                      <li>Decentraliserad kultur och låg riskaptit</li>
                    </ul>
                  </div>
                  <div style={{background:"#FEF2F2", borderRadius:12, padding:16, border:"1px solid #FEE2E2"}}>
                    <div style={{fontWeight:700, color:"#991B1B", fontSize:13, marginBottom:8}}>Svagheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#991B1B", lineHeight:1.7}}>
                      <li>Hög exponering mot räntenetto</li>
                      <li>Låg strukturell tillväxt i Sverige</li>
                      <li>Begränsad operativ hävstång vid räntenedgång</li>
                    </ul>
                  </div>
                  <div style={{background:"#EFF6FF", borderRadius:12, padding:16, border:"1px solid #DBEAFE"}}>
                    <div style={{fontWeight:700, color:"#1D4ED8", fontSize:13, marginBottom:8}}>Möjligheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#1D4ED8", lineHeight:1.7}}>
                      <li>Tillväxt i Storbritannien och Nederländerna</li>
                      <li>Växande sparaffär och kapitalförvaltning</li>
                      <li>Effektivisering och AI-stöd i interna processer</li>
                    </ul>
                  </div>
                  <div style={{background:"#FFFBEB", borderRadius:12, padding:16, border:"1px solid #FDE68A"}}>
                    <div style={{fontWeight:700, color:"#92400E", fontSize:13, marginBottom:8}}>Hot</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#92400E", lineHeight:1.7}}>
                      <li>Fortsatt räntepress på marginalerna</li>
                      <li>Ökade regulatoriska avgifter</li>
                      <li>Fastighetsoro och makrosvaghet i Norden</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-[#004B87]/10 flex items-center justify-center text-[#004B87] font-bold text-lg">4/5</div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bedömning - Strategisk Moat</div>
                  <div className="text-sm font-bold text-slate-900 leading-relaxed">Stark kultur- och kreditmoat, en av de starkaste i europeisk banksektor.</div>
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
              <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87",marginBottom:28}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  För banker måste analysen anpassas. Mått som EV/EBIT och traditionellt fritt kassaflöde är missvisande. Istället fokuserar vi på intjäning, ROE, K/I-tal, kreditförluster och kapitalisering. 2025 präglades av press på räntenettot till följd av sjunkande marknadsräntor. Intäkterna minskade med 9% till 56,8 mdkr och EPS sjönk med 14% till 11,98 kr. Trots detta bibehölls en stark lönsamhet med ROE på 13,0% och en mycket låg K/I-kvot på 41,5%.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Avkastning på eget kapital (ROE %)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={roeData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[5,15]}/>
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
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Totala intäkter (Mdkr)</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={revenueData} margin={{top:4,right:16,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                      <XAxis dataKey="ar" tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:T.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip content={<ChartTip unit=" Mdkr"/>}/>
                      <Bar dataKey="v" name="Intäkter" fill={T.ink} radius={[4,4,0,0]}>
                        {revenueData.map((d,i)=><Cell key={i} fill={d.e?"#5C6B7A":T.ink}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── VÄRDERING ── */}
        <div id="vardering">
          <FadeIn delay={250}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Värdering & Jämförelse"/>
              <div className="space-y-6">
                <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                  När man värderar bank ska fokus ligga mer på P/E, P/B, ROE och utdelningskapacitet än på EV/EBIT eller PEG.
                </p>
                <div style={{background:T.bg, borderRadius:14, padding:20, border:`1px solid ${T.border}`}}>
                  <p style={{margin:0,fontSize:14,color:T.ink,lineHeight:1.8}}>
                    Om vi använder årsskifteskursen 134,35 kr och EPS 11,98 kr blir <strong>P/E cirka 11,2x</strong>. Om vi använder föreslagen total utdelning 17,50 kr blir direktavkastningen cirka 13,0%, men det är missvisande som normalnivå eftersom 9,50 kr är extrautdelning. På ordinarie utdelning 8,00 kr blir <strong>direktavkastningen cirka 6,0%</strong>.
                  </p>
                </div>
                <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                  Utifrån kapitalet är banken inte dyr, men heller inte uppenbart billig. Den höga kvaliteten motiverar en premie mot svagare europeiska banker, men samtidigt är EPS-trenden just nu fallande. Därför är det svårt att argumentera för att aktien är kraftigt felprissatt.
                </p>
                <div style={{background:T.accentL, borderRadius:12, padding:16, borderLeft:`4px solid ${T.accent}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:T.accent,textTransform:"uppercase",marginBottom:8}}>Ett rimligt sätt att tänka</div>
                  <ul style={{margin:0, paddingLeft:18, fontSize:13.5, color:T.ink, lineHeight:1.7}}>
                    <li>Låg kreditrisk och hög kvalitet talar för premie</li>
                    <li>Sjunkande räntenetto och lägre EPS talar mot aggressiv multipel-expansion</li>
                  </ul>
                </div>
                <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                  Det ger en värderingsbild som är rimlig till lätt attraktiv, men inte solklar.
                </p>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg">3/5</div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bedömning</div>
                    <div className="text-sm font-bold text-slate-900">Aktien är inte dyr för kvaliteten, men inte ett självklart köp.</div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── TILLVÄXT ── */}
        <div id="tillvaxt">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="V" title="Tillväxtmotorer & Triggers"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:8}}>1. Storbritannien och Nederländerna</h3>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.7}}>
                      Det mest intressanta tillväxtspåret ligger utanför Sverige. Banken lyfter själv fram att marknadsandelarna i Storbritannien och Nederländerna är relativt små och att den långsiktiga tillväxtpotentialen därför är god. I Storbritannien fortsatte utlåningen att växa under 2025, både inom hushåll och företag.
                    </p>
                  </div>
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:8}}>2. Sparaffären</h3>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.7}}>
                      I Sverige uppgick totalt förvaltat kapital till 1 129 mdkr vid utgången av 2025, varav fondvolymen uppgick till 1 077 mdkr. Nettoflödet i bankens fonder i Sverige var 73,0 mdkr, jämfört med 35,9 mdkr året innan. Detta ökar provisionsintäkterna och minskar beroendet av räntenettot.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:8}}>3. Effektivisering</h3>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.7}}>
                      Under 2025 minskade kostnaderna 7%, vilket visar att banken återfått delar av den kostnadsdisciplin som länge varit central i kultur och strategi.
                    </p>
                  </div>
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:8}}>4. AI och teknik</h3>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.7}}>
                      AI ska främst användas för interna processer och affärsstöd, inte för att ersätta det personliga kundmötet. Teknik som förstärker modellen, inte förändrar identiteten.
                    </p>
                  </div>
                  <div className="bg-[#004B87]/5 p-5 rounded-2xl border border-[#004B87]/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Star size={16} className="text-[#004B87]" fill="currentColor" />
                      <span className="text-xs font-bold text-[#004B87] uppercase tracking-wider">Tillväxtbetyg: 3/5</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Inte ett snabbväxande case, men habila och kontrollerade drivkrafter i sparande och nya marknader.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        <AdUnit slot="9323485761" />

        {/* ── RISKPROFIL ── */}
        <div id="risk">
          <FadeIn delay={350}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div style={{background:T.bg, borderRadius:16, padding:20, border:`1px solid ${T.border}`}}>
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Ränterisk</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Den största risken är räntenettot. När marknadsräntorna sjunker pressas marginalerna, vilket slog igenom tydligt under 2025.</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Regulatorisk risk</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Statliga avgifter på 2,8 mdkr och räntefri inlåning hos Riksbanken är belastningar som inte går att påverka operativt.</p>
                    </div>
                  </div>
                </div>
                <div style={{background:T.bg, borderRadius:16, padding:20, border:`1px solid ${T.border}`}}>
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Fastighetsrisk</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Exponering mot fastigheter och bolån innebär att svagt nordiskt makro alltid är en riskfaktor att bevaka.</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Valuta</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Internationell verksamhet innebär resultatsvängning från valutaeffekter, särskilt vid en starkare krona.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between p-6 bg-slate-900 rounded-2xl text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold opacity-60 uppercase tracking-widest">Risknivå</div>
                    <div className="text-xl font-black">Låg Risk</div>
                  </div>
                </div>
                <div className="text-3xl font-black opacity-40">5/5</div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── ESG & MAKRO ── */}
        <div id="esg">
          <FadeIn delay={400}>
            <Card mb={20}>
              <SectionLabel number="VII" title="ESG & Makro"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <p className="text-base text-slate-600 leading-relaxed">
                    Handelsbanken har en relativt stark ESG-profil för att vara storbank. Under Q3 uppgick gröna lån till 140 mdkr, och i årsslutet visade banken fortsatt hög andel artikel 8- och artikel 9-klassade fonder enligt SFDR.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-emerald-600">21%</div>
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Artikel 9</div>
                    </div>
                    <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-emerald-600">79%</div>
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Artikel 8</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Makropåverkan</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#004B87] mt-2 shrink-0" />
                      <p className="text-sm text-slate-600">Lägre räntor pressar räntenettot men stabiliserar hushållen.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#004B87] mt-2 shrink-0" />
                      <p className="text-sm text-slate-600">God kreditkvalitet även i svagare makromiljö.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#004B87] mt-2 shrink-0" />
                      <p className="text-sm text-slate-600">Defensiv snarare än offensiv positionering.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── AI OBSERVATIONER ── */}
        <div id="ai">
          <FadeIn delay={450}>
            <Card mb={20}>
              <SectionLabel number="VIII" title="AI-observationer 🔍"/>
              <div style={{background:T.ink, borderRadius:24, padding:32, color:"white", position:"relative", overflow:"hidden"}}>
                <div style={{position:"absolute", top:0, right:0, width:300, height:300, background:"rgba(0,75,135,0.2)", borderRadius:"50%", filter:"blur(100px)", transform:"translate(100px, -100px)"}} />
                <div className="relative z-10">
                  <p className="text-lg text-white/80 leading-relaxed mb-8 italic">
                    "Det mest intressanta AI-liknande mönstret i datan är inte en dold positiv trigger, utan att siffrorna är ovanligt konsekventa. Banken fortsätter vara exakt det den brukar vara: tråkig, stark och disciplinerad."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">01</div>
                      <p className="text-sm text-white/70">Kreditkvaliteten är fortsatt extremt stark trots svagare räntemiljö.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">02</div>
                      <p className="text-sm text-white/70">Sparaffären accelererar samtidigt som räntenettot försvagas.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">03</div>
                      <p className="text-sm text-white/70">Extrautdelningen signalerar styrka men döljer normaliserad intjäning.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={500}>
            <div style={{background:T.accent, borderRadius:32, padding:40, color:"white", boxShadow:T.shadowLg}}>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                  <SectionLabel number="IX" title={<span style={{color:"white"}}>Sammanfattning & Beslut</span>}/>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2">Är Handelsbanken ett kvalitetsbolag?</h4>
                      <p className="text-white/70 leading-relaxed">Ja. Det är ett av de tydligaste kvalitetsbolagen i nordisk banksektor. Kombinationen av kultur och kundnöjdhet är ovanlig.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2">Är aktien rimligt värderad?</h4>
                      <p className="text-white/70 leading-relaxed">Ja, ungefär. Inte dyr för kvaliteten, men heller inte uppenbart billig givet fallande EPS-trend.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2">Investeringsbeslut?</h4>
                      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="text-2xl font-black mb-1">Bevaka / Svagt Köp</div>
                        <p className="text-sm text-white/60">Prioritera kvalitet och utdelningsförmåga framför vinstacceleration.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-80 shrink-0 bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Slutlig Rating</div>
                    <div className="text-7xl font-black tracking-tighter mb-2">0.80</div>
                    <div className="text-sm font-bold text-white/70 tracking-widest uppercase">Kvalitetsbetyg</div>
                  </div>
                  <div className="pt-8 mt-8 border-t border-white/10">
                    <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Målpris</div>
                    <div className="text-3xl font-black">145–155 kr</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={550}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier: Bull, Base & Bear"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div key="bull" style={{background:T.greenL, border:"1.5px solid rgba(16,185,129,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.green, fontSize:14, marginBottom:12}}>Bull Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.green, marginBottom:4, letterSpacing:-1}}>160-175 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">Räntenettot bottnar, sparaffären växer och banken vinner i UK/Nederländerna. Kvalitetspremie återställs.</p>
                </div>
                <div key="base" style={{background:T.accentL, border:"1.5px solid rgba(0,75,135,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.accent, fontSize:14, marginBottom:12}}>Base Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.accent, marginBottom:4, letterSpacing:-1}}>145-155 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">God ordinarie utdelning och modest tillväxt i kapitalförvaltning. Ingen stark vinstacceleration.</p>
                </div>
                <div key="bear" style={{background:T.redL, border:"1.5px solid rgba(217,54,62,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.red, fontSize:14, marginBottom:12}}>Bear Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.red, marginBottom:4, letterSpacing:-1}}>115-130 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">Räntetrycket fortsätter, regulatoriska kostnader biter och bankmultiplar kommer ned.</p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
