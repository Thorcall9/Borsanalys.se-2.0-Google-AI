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
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";
import EditorialReadNext from "./EditorialReadNext";
import AnalysisTopAd from "../ads/AnalysisTopAd";
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
];

const dividendData = [
  {ar:"2023", v:2.70},
  {ar:"2024", v:2.85},
  {ar:"2025", v:3.00, e:true},
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

interface EricssonDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function EricssonDeepDive({ 
  data,
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
              <div className="text-2xl font-black text-slate-900">13,4</div>
              <span className="text-xs text-slate-500 mt-1 block">Normaliserad EPS: 6,81 kr</span>
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
                  <div className="text-2xl font-black text-slate-900">95-105 kr</div>
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

      <AnalysisTopAd />

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
                  ["Geografisk Mix", (
                    <div className="mt-2">
                      <div className="flex h-4 w-full rounded-full overflow-hidden mb-3 bg-slate-100 shadow-inner">
                        {[
                          { l: "Amerika", v: 35, c: "#002561" },
                          { l: "EMEA", v: 30, c: "#3B82F6" },
                          { l: "Övrigt", v: 16, c: "#10B981" },
                          { l: "SE Asia", v: 12, c: "#F59E0B" },
                          { l: "NE Asia", v: 7, c: "#8B5CF6" },
                        ].map((d, i) => (
                          <div 
                            key={i} 
                            style={{ width: `${d.v}%`, background: d.c }} 
                            title={`${d.l}: ${d.v}%`}
                            className="hover:opacity-90 transition-opacity cursor-help"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {[
                          { l: "Amerika", v: "35%", c: "#002561" },
                          { l: "EMEA", v: "30%", c: "#3B82F6" },
                          { l: "Övrigt (Patent/Ent.)", v: "16%", c: "#10B981", bold: true },
                          { l: "SE Asia/India", v: "12%", c: "#F59E0B" },
                          { l: "NE Asia", v: "7%", c: "#8B5CF6" },
                        ].map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: d.c }} />
                            <span className={`text-[11px] ${d.bold ? 'font-black text-slate-900 border-b border-[#10B981]/30' : 'text-slate-500'}`}>
                              {d.l} <strong>{d.v}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-xl bg-[#10B981]/5 border border-[#10B981]/10 text-[12px] text-slate-600 leading-relaxed italic">
                        <strong>Obs:</strong> Kategorin "Övrigt" är strategiskt viktig eftersom den rymmer patent- och licensintäkter samt delar av Enterprise-försäljningen. Patentintäkterna är ett av Ericssons mest högkvalitativa kassaflöden och fungerar som en viktig motvikt till den mer cykliska Networks-affären.
                      </div>
                    </div>
                  )],
                  ["Affärsmodell", "Fyra lager: Installerade basen, Uppgraderingar/Service/Mjukvara, Företagsaffären (Vonage/Network APIs), samt Patent- och licensintäkter (~13 mdr kr återkommande)."],
                  ["Ledning & Disciplin", "Börje Ekholm har förbättrat marginaler och kostnadsdisciplin. 2025 blev det nionde kvartalet i följd med förbättrad justerad EBITA-marginal jämfört med motsvarande kvartal föregående år."],
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
                Ericsson har en fungerande och bevisat relevant affärsmodell, men det är inte en ren SaaS-modell med hög visibilitet och självgående tillväxt. Affären är fortfarande tydligt cyklisk och beroende av operatörernas investeringsvilja. Vi väljer att bevaka aktien i väntan på tydligare bevis för att den förbättrade lönsamheten är fullt uthållig, att Enterprise kan stå på egna ben och att de juridiska riskerna klarnar.
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
                  Ericssons strategiska position är starkare än vad den genomsnittliga börsbilden ibland antyder. I årsredovisningen anger bolaget en global RAN-markdnadsandel på cirka <strong>37 procent utanför Kina</strong>, 206 aktiva 5G-nät i 85 länder och 55 levererade 5G standalone-nät. Det gör Ericsson till en av mycket få verkligt globala systemleverantörer inom mobilnätsutrustning.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Den viktigaste konkurrensfördelen är kombinationen av teknik, installerad bas och patent. Ericsson har mer än <strong>60 000 beviljade patent</strong> och en mycket stor närvaro i operatörernas befintliga nät. När en operatör redan byggt stora delar av sin radio- och kärnnätsarkitektur med Ericsson blir det dyrt, riskfyllt och tidskrävande att byta leverantör (<strong>switching costs</strong>). Samtidigt är patentintäkterna inte helt friktionsfria; ett större smartphone-licensavtal i Kina löpte ut den 31 december 2025, vilket belyser den löpande osäkerheten i detta kvalitativa kassaflödesben.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Marknaden är dock inte perfekt. Ericsson konkurrerar främst med Nokia och Huawei. Huawei är exkluderat eller begränsat i vissa västmarknader men fortsatt starkt globalt sett. Det gör att Ericsson har en verklig moat, men inte en monopolmoat.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={{background:"#F0FDF4", borderRadius:12, padding:18, border:"1px solid #DCFCE7"}}>
                  <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:10, display:"flex", alignItems:"center", gap:2}}>💪 Styrkor</div>
                  <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.8}}>
                    <li>Stark position i RAN (37% utanför Kina)</li>
                    <li>Massiv installerad bas och switching costs</li>
                    <li>Världsledande patentportfölj (&gt;60 000 patent)</li>
                    <li>Stark nettokassa (61,2 miljarder kronor)</li>
                    <li>Tydligt förbättrade marginaler under 2025</li>
                  </ul>
                </div>
                <div style={{background:"#FEF2F2", borderRadius:12, padding:18, border:"1px solid #FEE2E2"}}>
                  <div style={{fontWeight:700, color:"#991B1B", fontSize:13, marginBottom:10, display:"flex", alignItems:"center", gap:2}}>⚠️ Svagheter</div>
                  <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#991B1B", lineHeight:1.8}}>
                    <li>Låg strukturell tillväxt i huvudmarknaden</li>
                    <li>Enterprise ännu inte fullt bevisat som stabil vinstmaskin</li>
                    <li>Rapporterad 2025-vinst delvis iconectiv-driven</li>
                    <li>Beroende av operatörernas investeringscykler</li>
                  </ul>
                </div>
                <div style={{background:"#EFF6FF", borderRadius:12, padding:18, border:"1px solid #DBEAFE"}}>
                  <div style={{fontWeight:700, color:"#1D4ED8", fontSize:13, marginBottom:10, display:"flex", alignItems:"center", gap:2}}>🚀 Möjligheter</div>
                  <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#1D4ED8", lineHeight:1.8}}>
                    <li>5G Standalone, kärnnät och network APIs</li>
                    <li>Privata nät och försvar/samhällskritisk infra</li>
                    <li>AI-drivna autonoma nät (effektivisering)</li>
                    <li>Expansion inom Enterprise-lösningar</li>
                  </ul>
                </div>
                <div style={{background:"#FFFBEB", borderRadius:12, padding:18, border:"1px solid #FDE68A"}}>
                  <div style={{fontWeight:700, color:"#92400E", fontSize:13, marginBottom:10, display:"flex", alignItems:"center", gap:2}}>🔴 Hot</div>
                  <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#92400E", lineHeight:1.8}}>
                    <li>Hård konkurrens från Nokia och Huawei</li>
                    <li>Regulatorisk osäkerhet kring patentlicensiering</li>
                    <li>DOJ/SAMR-processer och juridiska kostnader</li>
                    <li>Svag operatörscapex och valutamotvind</li>
                  </ul>
                </div>
              </div>

              {/* RATING BOX */}
              <div style={{marginTop: 32, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden"}}>
                <div style={{position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: T.accent}}></div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
                  <div style={{fontSize: 12, fontWeight: 900, color: T.accent, letterSpacing: 1, textTransform: "uppercase"}}>BEDÖMNING – Strategisk Moat</div>
                  <div style={{fontSize: 18, fontWeight: 900, color: T.ink}}>4/5</div>
                </div>
                <p style={{margin: 0, color: T.ink, fontSize: 13.5, lineHeight: 1.7, fontWeight: 500}}>
                  Ericsson har en starkare moat än en normal industrileverantör. Patent, installerad bas, skala och teknikledarskap gör positionen svår att rubba. Men prispress, stora konkurrenter och regulatorisk osäkerhet hindrar högsta betyg.
                </p>
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
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"20px 24px",borderLeft:`4px solid ${T.accent}`,marginBottom:32}}>
                <p style={{margin:0,color:T.ink,fontSize:14.5,lineHeight:1.8,fontWeight:500}}>
                  2025 var finansiellt ett tydligt förbättringsår, men det är viktigt att skilja på rapporterad styrka och underliggande kvalitet. Rapporterad försäljning minskade 5 procent till 236,7 miljarder kronor, men organisk tillväxt var plus 2 procent. Justerad bruttomarginal steg till 48,1 procent från 44,9 procent året före.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <p style={{margin:0,color:T.sub,fontSize:14,lineHeight:1.8}}>
                    Det är därför den viktigaste normaliseringen i hela analysen är följande: årsredovisningen anger att <strong>justerad EBITA-marginal exklusive vinsten från försäljningen av iconectiv uppgick till 14,9 procent</strong>. Det är fortfarande bra, och nära bolagets långsiktiga mål på 15–18 procent, men det är en annan nivå än 18,1 procent. Det gör stor skillnad när man ska värdera kvaliteten i vinsten.
                  </p>
                  <p style={{margin:0,color:T.sub,fontSize:14,lineHeight:1.8}}>
                    Kassaflödet var också starkt. Fritt kassaflöde före M&A uppgick till 26,8 miljarder kronor, motsvarande 11,3 procent av omsättningen. Det var lägre än 40,0 miljarder 2024, men bolaget beskriver 2025 som fortsatt robust och inom målet för free cash flow margin på 9–12 procent. 
                  </p>
                </div>
                <div className="space-y-6">
                  <p style={{margin:0,color:T.sub,fontSize:14,lineHeight:1.8}}>
                    Segmentsiffrorna visar samtidigt varför analysen måste vara lite skeptisk till kvaliteten i mixen. Enterprise-resultatet förbättrades tydligt, men Q4-rapporten anger också att avyttrade och avkonsoliderade verksamheter bidrog med 8,8 miljarder kronor i justerad EBITA under 2025. Det innebär att Enterprise fortfarande inte kan behandlas som ett fullt normaliserat vinstben.
                  </p>
                  <p style={{margin:0,color:T.sub,fontSize:14,lineHeight:1.8}}>
                    Balansräkningen är däremot ett tydligt plus. <strong>Nettokassa på 61,2 miljarder kronor</strong> gör att Ericsson kan fortsätta investera i FoU, hantera svagare marknadslägen och samtidigt återföra kapital till aktieägarna. Det är en stor skillnad mot mer skuldsatta industribolag.
                  </p>
                </div>
              </div>

              {/* Key Metrics Table */}
              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Nyckeltal 2024–2025</div>
              <div style={{overflowX:"auto", marginBottom:40}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:`2px solid ${T.border}`}}>
                      {["Nyckeltal","2024","2025"].map(h=>(
                        <th key={h} style={{padding:"12px",textAlign:h==="Nyckeltal"?"left":"right",color:T.muted,fontWeight:700,fontSize:11,letterSpacing:0.3,textTransform:"uppercase"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Nettoomsättning, mdr SEK", "247,9", "236,7"],
                      ["Organisk tillväxt", "-", "+2%"],
                      ["Justerad bruttomarginal", "44,9%", "48,1%"],
                      ["Justerad EBITA, mdr SEK", "27,2", "42,9"],
                      ["Justerad EBITA-marginal", "11,0%", "18,1%"],
                      ["Justerad EBITA-marginal exkl. iconectiv", "-", "14,9%"],
                      ["EPS efter utspädning, SEK", "0,01", "8,51"],
                      ["Fritt kassaflöde före M&A, mdr SEK", "40,0", "26,8"],
                      ["Nettokassa, mdr SEK", "37,8", "61,2"],
                      ["Utdelning per aktie, SEK", "2,85", "3,00*"],
                    ].map(([q,v24,v25],ri)=>(
                      <tr key={ri} style={{background:ri%2===0?T.bg:"transparent",borderBottom:`1px solid ${T.border}`}}>
                        <td style={{padding:"12px",color:T.ink,fontWeight:700}}>{q}</td>
                        <td style={{padding:"12px",textAlign:"right",color:T.sub}}>{v24}</td>
                        <td style={{padding:"12px",textAlign:"right",color:T.accent,fontWeight:700}}>{v25}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{fontSize:10, color:T.muted, marginTop:8}}>* Styrelsens förslag.</div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:12}}>Omsättning (Mdr SEK)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={T.border} />
                      <XAxis dataKey="ar" tick={{fontSize:10}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} domain={[200, 270]} />
                      <Tooltip content={<ChartTip unit=" Mdr" />} />
                      <Bar dataKey="v" fill={T.accent} radius={[4,4,0,0]}>
                        {revenueData.map((d,i)=><Cell key={i} fill={d.e?T.accent+"88":T.accent}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:12}}>Justerad EBITA-marginal (%)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={marginData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={T.border} />
                      <XAxis dataKey="ar" tick={{fontSize:10}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} domain={[5, 20]} />
                      <Tooltip content={<ChartTip unit="%" />} />
                      <Line type="monotone" dataKey="v" stroke={T.accent} strokeWidth={3} dot={{fill:T.accent}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:12}}>Vinst per aktie (EPS)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={epsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={T.border} />
                      <XAxis dataKey="ar" tick={{fontSize:10}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} />
                      <Tooltip content={<ChartTip unit=" kr" />} />
                      <Bar dataKey="v" fill="#10B981" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:12}}>Utdelning per aktie (SEK)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={dividendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={T.border} />
                      <XAxis dataKey="ar" tick={{fontSize:10}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} domain={[0, 4]} />
                      <Tooltip content={<ChartTip unit=" kr" />} />
                      <Bar dataKey="v" fill="#B07D2A" radius={[4,4,0,0]}>
                          {dividendData.map((d,i)=><Cell key={i} fill={d.e?"#B07D2A88":"#B07D2A"}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{marginTop:40, background:T.bg, borderRadius:12, padding:20, border:`1px solid ${T.border}`}}>
                  <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:12}}>
                    <div style={{background:T.accent, color:"#fff", padding:"4px 10px", borderRadius:6, fontSize:12, fontWeight:800}}>BEDÖMNING – Finansiell kvalitet: 4/5</div>
                  </div>
                  <p style={{margin:0, color:T.sub, fontSize:14, lineHeight:1.7}}>
                    Ericsson har stark balansräkning, robust kassaflöde och tydligt bättre operationell kvalitet. Jag stannar dock vid 4/5 eftersom 2025 års rapporterade vinstnivå delvis är engångsdriven och huvudmarknaden fortfarande är svag.
                  </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        <AdUnit slot="7332946752" className="my-16" />

        {/* ── VÄRDERING ── */}
        <div id="vardering">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="IV" title="Värdering & Jämförelse"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Den svåraste delen i Ericsson-caset är värderingen. Inte för att aktien ser dyr ut på rapporterad vinst, utan för att rapporterad vinst är för hög för att användas okritiskt. Om man bara tar <strong>EPS 8,51 SEK</strong> ser aktien lågt värderad ut, men det är missvisande eftersom iconectiv-vinsten blåser upp resultatet. Årsredovisningen anger att <strong>justerad EBITA-marginal exklusive iconectiv var 14,9 procent</strong>.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Vid aktiekursen 91,5 kronor, som var börskursen vid analystillfället, och en normaliserad EPS om 6,81 kronor per aktie efter justering för iconectiv-effekten om 1,70 kronor per aktie, handlas Ericsson till ett normaliserat P/E-tal om 13,4x.
                </p>
                <p style={{margin:"14px 0 0",color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Baserat på en normaliserad EPS om 6,81 kronor per aktie, där iconectiv-effekten exkluderats, och ett rimligt värderingsspann om 14,0–15,5x vinst, landar ett mer robust 12-månaders motiverat värde på 95–105 kronor per aktie.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {[
                  ["P/E-tal (Norm.)", "13,4", "Exkl. iconectiv"],
                  ["Direktavkastning", "3,28%", "Föreslagen 3,00 kr"],
                  ["Nettokassa", "61,2 Mdr", "Betydande flexibilitet", true],
                  ["Utdelningsandel", "~44%", "Av normaliserad EPS"],
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

              <p style={{fontSize:14, color:T.sub, lineHeight:1.8, marginBottom:24}}>
                På den här nivån ser Ericsson rimligt värderat ut. Givet kombinationen av stark nettokassa, god kapitalåterföring och en vinstmix som fortfarande behöver bevisa sin kvalitet. Direktavkastningen på föreslagen utdelning om <strong>3,00 kronor</strong> är attraktiv nog för att ge stöd, och med det föreslagna återköpsprogrammet om 15 miljarder kronor blir den totala återföringen betydande. Styrelsens kapitalallokeringsmodell sätter teknikledarskap först, följt av utdelning och selektiva investeringar.
              </p>

              {/* RATING BOX */}
              <div style={{marginTop: 32, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden"}}>
                <div style={{position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: T.gold}}></div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
                  <div style={{fontSize: 12, fontWeight: 900, color: T.gold, letterSpacing: 1, textTransform: "uppercase"}}>BEDÖMNING – Värdering</div>
                  <div style={{fontSize: 18, fontWeight: 900, color: T.ink}}>3/5</div>
                </div>
                <p style={{margin: 0, color: T.ink, fontSize: 13.5, lineHeight: 1.7, fontWeight: 500}}>
                  Ericsson ser rimligt värderat ut på normaliserade antaganden. Det finns stöd från balansräkning och kapitalåterföring, men inte tillräcklig felprissättning för högre betyg.
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
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:32}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Ericsson har flera tillväxtspår, men inget av dem är ännu så starkt att det ensamt förändrar caset. Det viktigaste är <strong>Cloud Software and Services</strong>. Q4-rapporten visade 12 procent organisk tillväxt i segmentet, vilket visar att Ericsson kan växa i delar av affären trots att RAN-marknaden är stillastående.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[
                  { icon: "🌐", bg: "#EFF6FF", title: "1. Cloud Software & Services", body: "12% organisk tillväxt i Q4. Helåret innehöll organisk tillväxt i både Networks och Cloud – en viktig signal om motståndskraft." },
                  { icon: "📡", bg: "#ECFDF5", title: "2. 5G Standalone & API:er", body: "Centralt för programmerbara nät och network slicing. Samarbeten med Vodafone, Telstra och Google Cloud visar potentialen." },
                  { icon: "💼", bg: "#F5F3FF", title: "3. Enterprise & Network APIs", body: "Privata 5G-nät industrialiseras (Airbus). Samtidigt pressar investeringar i network APIs lönsamheten kortsiktigt." },
                  { icon: "🛡️", bg: "#FEF3F2", title: "4. Försvar & Säkerhet", body: "Ökade investeringar inom försvarsområdet under 2026. Verksamhetskritiska nät väntas växa strukturellt framåt." }
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

              <p style={{fontSize:14, color:T.sub, lineHeight:1.8, marginBottom:24}}>
                Det viktigaste tillväxtmålet är att röra sig bort från enbart hårdvara mot en mjukvaru- och plattformsaffär. 5G standalone är bryggan här, då det möjliggör network slicing och nya intäktsmodeller. Samarbeten med molnjättar som Google Cloud visar att Ericsson tar position. Inom Enterprise ger Vonage/Aduna exponering mot network APIs, vilket styrelsen ser som en framtida vinstdrivare, även om det kräver investeringar här och nu.
              </p>

              {/* RATING BOX */}
              <div style={{marginTop: 32, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden"}}>
                <div style={{position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: T.gold}}></div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
                  <div style={{fontSize: 12, fontWeight: 900, color: T.gold, letterSpacing: 1, textTransform: "uppercase"}}>BEDÖMNING – Tillväxtutsikter</div>
                  <div style={{fontSize: 18, fontWeight: 900, color: T.ink}}>3/5</div>
                </div>
                <p style={{margin: 0, color: T.ink, fontSize: 13.5, lineHeight: 1.7, fontWeight: 500}}>
                  Ericsson har riktiga tillväxtoptioner, men de är ännu inte tillräckligt starka för att helt väga upp en svag och mogen RAN-marknad.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        <div id="risk">
          <FadeIn delay={500}>
            <Card mb={20}>
              <SectionLabel number="VI" title="Riskprofil"/>
              
              <div style={{background:T.accentL,border:`1.5px solid ${T.accent}33`,borderRadius:14,padding:"18px 22px",borderLeft:`4px solid ${T.accent}`,marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Den största risken är juridisk. Ericsson fortsätter att samarbeta fullt ut med DOJ i utredningen kopplad till Irak, och några definitiva slutsatser väntas inte förrän utredningen är avslutad. Samtidigt pågår en undersökning från kinesiska SAMR kring patentlicensiering.
                </p>
              </div>

              <div className="space-y-6">
                <div style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:16, padding:20}}>
                  <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Juridik & Regelefterlevnad</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.75}}>
                    Förutom DOJ och SAMR finns civilrättsliga processer i USA kopplade till terroristangrepp i Irak, Afghanistan och Syrien. Även om dessa inte nödvändigtvis får samma ekonomiska betydelse som DOJ-frågan, bidrar de till en kvarvarande juridisk riskpremie kring aktien.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:16, padding:20}}>
                    <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Marknad & Affär</div>
                    <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.7}}>
                      Ericsson förväntar sig att RAN-marknaden förblir oförändrad 2026. Det betyder att kärnaffären saknar medvind. Om nya områden som API:er inte växer snabbt nog får bolaget bära en svag underliggande marknad längre än hoppats.
                    </p>
                  </div>
                  <div style={{background:T.bg, border:`1px solid ${T.border}`, borderRadius:16, padding:20}}>
                    <div style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8}}>Patent & Valuta</div>
                    <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.7}}>
                      Ett större smartphone-licensavtal löpte ut vid utgången av 2025 (Kina). Dessutom påverkar en 10-procentig USD-förändring omsättningen med ca 5%. Omstruktureringskostnader väntas fortsatt vara förhöjda under 2026.
                    </p>
                  </div>
                </div>
              </div>

              {/* RATING BOX */}
              <div style={{marginTop: 32, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden"}}>
                <div style={{position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: T.ink}}></div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
                  <div style={{fontSize: 12, fontWeight: 900, color: T.ink, letterSpacing: 1, textTransform: "uppercase"}}>RISKNIVÅ: Medel | RISK-SCORE</div>
                  <div style={{fontSize: 18, fontWeight: 900, color: T.ink}}>3/5</div>
                </div>
                <p style={{margin: 0, color: T.ink, fontSize: 13.5, lineHeight: 1.7, fontWeight: 500}}>
                  Det här är inte ett högriskbolag finansiellt, men juridik, patentfrågor och svag slutmarknad gör att man inte kan kalla det låg risk heller.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>

        <AdUnit slot="7332946752" className="my-16" />

        {/* ── ESG & AI ── */}
        <div id="esg">
          <FadeIn delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <SectionLabel number="VII" title="ESG & Makro"/>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8, marginBottom:16}}>
                  Makromässigt har Ericsson både medvind och motvind. Medvinden ligger i geopolitik, säkerhetskrav och digitalisering. Konnektivitet blir allt viktigare i AI-eran, och restriktioner mot vissa kinesiska leverantörer i väst stärker indirekt Ericssons position.
                </p>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8, marginBottom:20}}>
                  På ESG-sidan finns ett tydligt styrningsarv (governance) som tynger bilden. Irak-affären och DOJ-processen gör att governance aldrig kan få toppbetyg i nuläget, även om ledningen förbättrat kultur och kontroll.
                </p>
                <div style={{background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4}}>
                    <div style={{fontSize: 10, fontWeight: 900, color: T.gold, textTransform: "uppercase"}}>Betyg: ESG & Makro</div>
                    <div style={{fontSize: 14, fontWeight: 900, color: T.ink}}>3/5</div>
                  </div>
                  <p style={{margin: 0, color: T.ink, fontSize: 12, lineHeight: 1.5, fontStyle: "italic"}}>
                    Makrotrenderna är i delar gynnsamma, men governance-arvet hindrar högre betyg.
                  </p>
                </div>
              </Card>
              <Card>
                <SectionLabel number="VIII" title="AI-observationer"/>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8, marginBottom:16}}>
                  Det mest intressanta datapunktsmönstret i Ericsson är marginaltrenden. Bolaget nådde <strong>nio kvartal i följd</strong> med förbättrad justerad EBITA-marginal jämfört med motsvarande kvartal året före. Det är ett ovanligt starkt tecken på operationell förbättring.
                </p>
                <p style={{fontSize:13.5, color:T.sub, lineHeight:1.8, marginBottom:20}}>
                  Samtidigt signalerar ökade återköp i en flat huvudmarknad att de interna återinvesteringsmöjligheterna kan vara begränsade. Datat visar tydlig disciplin, men inte något uppenbart missförstånd från marknaden.
                </p>
                <div style={{background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4}}>
                    <div style={{fontSize: 10, fontWeight: 900, color: T.gold, textTransform: "uppercase"}}>Betyg: AI-observationer</div>
                    <div style={{fontSize: 14, fontWeight: 900, color: T.ink}}>3/5</div>
                  </div>
                  <p style={{margin: 0, color: T.ink, fontSize: 12, lineHeight: 1.5, fontStyle: "italic"}}>
                    Datan visar tydlig operationell förbättring, men inte något skrikande köptillfälle.
                  </p>
                </div>
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
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>
                    Ja, men med tydliga reservationer. Ericsson är ett starkt teknik- och infrastrukturbolag med skala, installerad bas, patent, kundrelationer och finansiell styrka. Det är inte ett trasigt bolag. Tvärtom är bolaget betydligt bättre operationellt nu än för några år sedan. Men det är inte heller ett rent compounder-case där alla kvalitetsvariabler pekar rätt samtidigt.
                  </p>
                </div>
                <div>
                  <div style={{fontWeight:700, color:T.ink, fontSize:15, marginBottom:4}}>Är det rimligt värderat?</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>
                    Ja. Baserat på den information som finns i de uppladdade rapporterna ser Ericsson ungefär rimligt värderat ut, särskilt om man värderar bolaget på en normaliserad vinstbas snarare än det rapporterade 2025-resultatet.
                  </p>
                </div>
                <div>
                  <div style={{fontWeight:700, color:T.ink, fontSize:15, marginBottom:4}}>Är det ett självklart 5–10-årsinnehav?</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.7}}>
                    Inte självklart, men det kan bli. För att det ska bli ett starkare långsiktigt case behöver Ericsson visa att 5G core, programmerbara nät, verksamhetskritiska nät och Enterprise faktiskt kan lyfta den underliggande tillväxten och göra vinstmixen bättre.
                  </p>
                </div>
                <div style={{background:T.accentL, padding:24, borderRadius:16, borderLeft: `6px solid ${T.accent}`, boxShadow:`0 4px 12px ${T.accent}15`}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8}}>
                    <div>
                      <div style={{fontSize:12, fontWeight:800, color:T.accent, textTransform:"uppercase", letterSpacing:1}}>Slutsats</div>
                      <div style={{fontSize:24, fontWeight:900, color:T.ink}}>BEVAKA</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:12, fontWeight:800, color:T.muted, textTransform:"uppercase", letterSpacing:1}}>Målpris</div>
                      <div style={{fontSize:20, fontWeight:900, color:T.ink}}>95–105 SEK</div>
                    </div>
                  </div>
                  <p style={{margin:0, fontSize:15, color:T.ink, lineHeight:1.7, fontWeight:500}}>
                    Ericsson är i dag ett mer disciplinerat och finansiellt robust bolag än för några år sedan, men den förbättrade kvaliteten är i stora drag redan reflekterad i aktien. Caset hålls fortsatt tillbaka av en trög RAN-marknad, osäker kvalitet i delar av Enterprise samt kvarvarande juridiska risker. Därför landar vi i Bevaka snarare än Köp.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
                  <div style={{background:"#F8FAFC", padding:16, borderRadius:12, textAlign:"center"}}>
                    <div style={{fontSize:11, fontWeight:700, color:T.muted, textTransform:"uppercase", marginBottom:4}}>Total Poäng</div>
                    <div style={{fontSize:22, fontWeight:900, color:T.ink}}>26/40</div>
                  </div>
                  <div style={{background:"#F8FAFC", padding:16, borderRadius:12, textAlign:"center"}}>
                    <div style={{fontSize:11, fontWeight:700, color:T.muted, textTransform:"uppercase", marginBottom:4}}>Rating</div>
                    <div style={{fontSize:22, fontWeight:900, color:T.ink}}>0,65</div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {data.nextSteps && (
          <EditorialReadNext recommendations={data.nextSteps} />
        )}

        <div id="scenarier">
          <FadeIn delay={800}>
            <SectionLabel number="X" title="Scenarier"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  label: "Bull Case", 
                  color: T.green, 
                  bg: T.greenL, 
                  pris: "120–125 kr", 
                  upside: "+31% till +37%", 
                  body: "5G standalone-investeringar accelererar, Cloud Software and Services fortsätter växa snabbare än marknaden, network APIs får bättre genomslag och juridiska risker klingar av. Då kan Ericsson få både högre vinstkvalitet och multipelexpansion." 
                },
                { 
                  label: "Base Case", 
                  color: T.accent, 
                  bg: T.accentL, 
                  pris: "100 kr", 
                  upside: "+9%", 
                  body: "RAN-marknaden förblir flat, men Ericsson fortsätter leverera stabil marginal och kassaflöde. Nyare segment växer, men inte tillräckligt för att förändra helheten radikalt. Aktien ger avkastning via utdelning och återköp." 
                },
                { 
                  label: "Bear Case", 
                  color: T.red, 
                  bg: T.redL, 
                  pris: "75–80 kr", 
                  upside: "-18% till -13%", 
                  body: "DOJ-processer blir dyrare än väntat, patentförnyelser blir svagare, Enterprise-lönsamheten sviker och den globala operatörscapexen förblir dämpad. Ericsson behandlas då som ett ex-growth-bolag." 
                },
              ].map((s, i) => (
                <div key={i} style={{background:s.bg, border:`2.5px solid ${s.color}22`, borderRadius:20, padding:24, display:"flex", flexDirection:"column"}}>
                  <div style={{fontWeight:800, color:s.color, fontSize:12, textTransform:"uppercase", letterSpacing:1, marginBottom:12}}>{s.label}</div>
                  <div style={{fontSize:32, fontWeight:900, color:s.color, marginBottom:4, display:"flex", alignItems:"baseline", gap:4}}>
                    {s.pris}
                  </div>
                  <div style={{fontSize:12, fontWeight:700, color:T.muted, marginBottom:16}}>{s.upside} · 12 mån</div>
                  <p style={{margin:0, fontSize:13.5, color:T.sub, lineHeight:1.65, fontWeight:500, flex:1}}>{s.body}</p>
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
        <AnalysisDisclaimer theme="light" />
      </div>
    </div>
  );
}
