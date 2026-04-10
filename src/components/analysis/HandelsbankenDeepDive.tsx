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
              <span className="text-xs text-slate-500 mt-1 block">Analyspris (2025)</span>
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
              <span className="text-xs text-[#004B87] font-bold mt-1 block">Varav 6% ordinarie</span>
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

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">

        {/* ── ÖVERSIKT ── */}
        <div id="oversikt">
          <FadeIn>
            <Card mb={20}>
              <SectionLabel number="I" title="Företagsöversikt"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div key="bakgrund">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Bakgrund & Affärsidé</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>Svenska Handelsbanken grundades 1871 och är ett av Sveriges äldsta börsnoterade bolag. Affärsidén bygger på lokal närvaro, personliga kundrelationer, decentraliserat beslutsfattande och låg risktolerans. Banken prioriterar kundnöjdhet och kostnadseffektivitet framför aggressiv volymtillväxt.</p>
                </div>
                <div key="modell">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Affärsmodell</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>Universalbank som tjänar pengar på räntenetto, provisionsnetto (sparande/kapitalförvaltning) och övriga finansiella tjänster. Räntenettot stod för 42,5 mdkr av totala intäkter på 56,8 mdkr under 2025.</p>
                </div>
                <div key="ledning">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Ledning</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>Michael Green är VD sedan 1 januari 2024. Han är en intern veteran som började i banken 1994, vilket minskar exekveringsrisken genom djup kännedom om bankens unika kultur.</p>
                </div>
                <div key="agarstruktur">
                  <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Ägarstruktur</div>
                  <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.8}}>Stabil ägarbild med Industrivärden (11,6%) och Oktogonen (8,0%) som huvudsakliga ägare.</p>
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
              <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87",marginBottom:24}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  Den viktigaste moaten är inte teknik utan kultur. Handelsbanken har byggt en decentraliserad modell där besluten fattas nära kunden. Kontoren har mandat, kontorschefen har ansvar, och banken jobbar utan centrala säljmål och volymbonusar. Det gör att banken kan optimera för långsiktig kundkvalitet istället för kortsiktig volym.
                </p>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Moat-dimensioner</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <MoatCard key="kultur" title="Decentraliserad kultur" desc="Kreditbeslut fattas lokalt där kunskapen finns." stars="★★★★★"/>
                <MoatCard key="kredit" title="Kreditkvalitet" desc="Exceptionellt låga förluster över alla cykler." stars="★★★★★"/>
                <MoatCard key="kund" title="Kundnöjdhet" desc="Rankas konsekvent högst bland jämförbara banker." stars="★★★★★"/>
                <MoatCard key="kapital" title="Kapitalstyrka" desc="Högsta kreditrating bland privatägda banker." stars="★★★★★"/>
              </div>

              <div style={{marginTop: 32}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{background:"#F0FDF4", borderRadius:12, padding:16, border:"1px solid #DCFCE7"}}>
                    <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:8}}>Styrkor</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.7}}>
                      <li>Exceptionell kreditkvalitet (-0,01% förlustnivå 2025)</li>
                      <li>Mycket stark balansräkning och högsta kreditrating</li>
                    </ul>
                  </div>
                  <div style={{background:"#FEF2F2", borderRadius:12, padding:16, border:"1px solid #FEE2E2"}}>
                    <div style={{fontWeight:700, color:"#991B1B", fontSize:13, marginBottom:8}}>Svagheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#991B1B", lineHeight:1.7}}>
                      <li>Hög exponering mot räntenetto</li>
                      <li>Mogen svensk marknad</li>
                    </ul>
                  </div>
                  <div style={{background:"#EFF6FF", borderRadius:12, padding:16, border:"1px solid #DBEAFE"}}>
                    <div style={{fontWeight:700, color:"#1D4ED8", fontSize:13, marginBottom:8}}>Möjligheter</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#1D4ED8", lineHeight:1.7}}>
                      <li>Tillväxt i UK & Nederländerna</li>
                      <li>Växande sparaffär</li>
                    </ul>
                  </div>
                  <div style={{background:"#FFFBEB", borderRadius:12, padding:16, border:"1px solid #FDE68A"}}>
                    <div style={{fontWeight:700, color:"#92400E", fontSize:13, marginBottom:8}}>Hot</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#92400E", lineHeight:1.7}}>
                      <li>Fortsatt räntenedgång</li>
                      <li>Fastighetsoro</li>
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
              <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87",marginBottom:28}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  För banker måste analysen anpassas. Mått som EV/EBIT och traditionellt fritt kassaflöde är missvisande. Istället fokuserar vi på intjäning, ROE, K/I-tal, kreditförluster och kapitalisering.
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

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={300}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div key="bull" style={{background:T.greenL, border:"1.5px solid rgba(16,185,129,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.green, fontSize:14, marginBottom:12}}>Bull Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.green, marginBottom:4, letterSpacing:-1}}>160-175 kr</div>
                </div>
                <div key="base" style={{background:T.accentL, border:"1.5px solid rgba(0,75,135,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.accent, fontSize:14, marginBottom:12}}>Base Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.accent, marginBottom:4, letterSpacing:-1}}>145-155 kr</div>
                </div>
                <div key="bear" style={{background:T.redL, border:"1.5px solid rgba(217,54,62,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.red, fontSize:14, marginBottom:12}}>Bear Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.red, marginBottom:4, letterSpacing:-1}}>115-130 kr</div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
