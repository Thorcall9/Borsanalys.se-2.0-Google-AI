import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star, ShieldCheck } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import NordnetCTA from "./NordnetCTA";
import EditorialCallout from "./EditorialCallout";
import EditorialReadNext from "./EditorialReadNext";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
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
  {key:"Riskprofil",val:4,max:5},
  {key:"ESG & Makro",val:4,max:5},
  {key:"AI-obs.",val:3,max:5},
];

const roeCetData = [
  { ar: '2022', roe: 12.8, cet1: 19.6 },
  { ar: '2023', roe: 15.9, cet1: 18.8 },
  { ar: '2024', roe: 14.6, cet1: 18.8 },
  { ar: '2025', roe: 13.0, cet1: 17.6 }
];

const divData = [
  { ar: '2021', ord: 5.00, extra: 0 },
  { ar: '2022', ord: 5.50, extra: 2.50 },
  { ar: '2023', ord: 6.50, extra: 6.50 },
  { ar: '2024', ord: 7.50, extra: 7.50 },
  { ar: '2025', ord: 8.00, extra: 9.50 }
];

function StatItem({ label, value, trend, isPositive }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <div className="flex flex-col items-end">
        <span className="text-sm font-black text-slate-900">{value}</span>
        {trend && (
          <span className={`text-[10px] font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function TableRow({ label, v24, v25, diff }: any) {
  const isNeg = diff.startsWith('-');
  return (
    <tr className="border-b border-slate-50 last:border-0">
      <td className="py-3 text-slate-500">{label}</td>
      <td className="py-3 text-right text-slate-900">{v24}</td>
      <td className="py-3 text-right text-slate-900">{v25}</td>
      <td className={`py-3 text-right font-bold ${isNeg ? 'text-rose-600' : 'text-emerald-600'}`}>{diff}</td>
    </tr>
  );
}

function useHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [h,setH]=useState(false);
  return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay + 30); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(8px)", transition: "all 0.35s ease" }}>{children}</div>;
}

function Card({ children, mb = 0 }: { children: React.ReactNode, mb?: number }) {
  return <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-5 p-4 md:p-6" style={{ marginBottom: mb }}>{children}</div>;
}

function SectionLabel({ number, title }: { number: string, title: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent:"center", fontSize: 11, fontWeight: 900, flexShrink: 0, fontFamily: "Georgia,serif" }}>{number}</div>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>{title}</h2>
    </div>
  );
}

const ChartTip = ({ active, payload, label, unit = "" }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", boxShadow: T.shadowMd, fontSize: 13 }}>
      <div style={{ fontWeight: 700, color: T.ink, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any, i: number) => <div key={i} style={{ color: T.sub }}>{p.name}: <strong style={{ color: T.ink }}>{typeof p.value === "number" ? p.value.toFixed(2) : p.value}{unit}</strong></div>)}
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
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function HandelsbankenDeepDive({ 
  data,
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
                <span className="text-xl font-black tracking-tighter text-center leading-none uppercase">BEVAKA</span>
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
                <div className="flex flex-col">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">SHB A</span>
                  <span className="text-[10px] font-bold text-white/60 mt-1 italic leading-none">Värderingsdata baseras på SHB A</span>
                </div>
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
              <span className="text-4xl font-black tracking-tighter">31/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">3.9 / 5.0 – Kvalitetsbetyg</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Analyskurs (SHB A)</span>
              <div className="text-2xl font-black text-slate-900">127,35 kr</div>
              <span className="text-[10px] text-[#004B87] font-bold mt-1 block uppercase tracking-tight">Värdering baserad på A-aktien</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">252 Mdr</div>
              <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (rullande)</span>
              <div className="text-2xl font-black text-slate-900">10,6x</div>
              <span className="text-xs text-slate-500 mt-1 block">Baserat på 2025 EPS</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/B-tal</span>
              <div className="text-2xl font-black text-slate-900">1,26x</div>
              <span className="text-xs text-slate-500 mt-1 block">Pris / EK per aktie</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavkastning</span>
              <div className="text-2xl font-black text-slate-900">13,7%</div>
              <span className="text-xs text-[#004B87] font-bold mt-1 block">Varav 6,3% ordinarie utdelning</span>
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
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Aktie</div>
              <div className="text-sm font-bold text-slate-900">Handelsbanken A (SHB A)</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Valuta</div>
              <div className="text-sm font-bold text-slate-900">SEK</div>
            </div>
          </div>
        </div>

        <NordnetCTA variant="high" />

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
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Analyskurs</span>
                      <span className="text-sm font-black text-slate-900">127,35 kr</span>
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
                    Stabil ägarbild där Industrivärden (11,6%) och Oktogonen (8,0%) är två av de viktigaste långsiktiga ägarna. Oktogonen är särskilt viktig eftersom den fungerar både som incitamentsstruktur och kulturförstärkare över tid.
                  </p>
                </div>
              </div>
            </Card>

            <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87"}}>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8}}>Analytikerns bedömning</div>
              <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                Handelsbanken har en av Europas starkaste bankmodeller. Den är inte snabbväxande, men den är robust, bevisad och mycket lönsam över tid. För en bank är det toppklass. Kombinationen av kultur, kapitalstyrka, kreditkvalitet och kundnöjdhet är ovanlig. Du kan följa och handla Handelsbanken direkt via <a href='https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1' target='_blank' rel='noopener noreferrer' class='text-[#0046AD] underline decoration-2 underline-offset-4 hover:text-[#002b6b] transition-colors font-bold'>Nordnet</a>.
              </p>
            </div>
          </FadeIn>
        </div>


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
                <MoatCard key="kapital" title="Kreditrating" desc="Ingen annan privatägd bank har högre sammanvägd rating." stars="★★★★★"/>
              </div>

              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>SWOT-analys</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{background:"#F0FDF4", borderRadius:12, padding:16, border:"1px solid #DCFCE7"}}>
                    <div style={{fontWeight:700, color:"#166534", fontSize:13, marginBottom:8}}>Styrkor</div>
                    <ul style={{margin:0, paddingLeft:16, fontSize:12.5, color:"#166534", lineHeight:1.7}}>
                      <li>Exceptionell kreditkvalitet (nettoåterföringar 2025)</li>
                      <li>Mycket stark balansräkning och urstark kapitalisering</li>
                      <li>Nöjdast kunder bland jämförbara konkurrenter enligt SKI</li>
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
                  <div className="text-sm font-bold text-slate-900 leading-relaxed">Solid affärsmodell med djupa vallgravar i kultur och kreditdisciplin.</div>
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
              <div style={{background:T.accentL,border:"1.5px solid rgba(0,75,135,0.2)",borderRadius:14,padding:"18px 22px",borderLeft:"4px solid #004B87",marginBottom:28}}>
                <p style={{margin:0,color:T.ink,fontSize:14,lineHeight:1.85}}>
                  För banker måste analysen anpassas. Mått som EV/EBIT, nettoskuld/EBITDA och traditionellt fritt kassaflöde säger mindre än för industribolag. Här är det viktigare att titta på intjäning, ROE, K/I-tal, kreditförluster, kapitalisering och utdelningskapacitet. 2025 var finansiellt svagare än 2024, men fortfarande starkt i absoluta tal. Banken pressas av räntenedgången, men kvaliteten är fortsatt hög med minskade kostnader (-7%) och extremt stark kreditkvalitet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:15}}>Resultatutveckling 2025</h3>
                  <div className="space-y-3">
                    <StatItem label="Totala intäkter" value="56,8 mdkr" trend="-9% (från 62,3)" isPositive={false}/>
                    <StatItem label="Räntenetto" value="42,5 mdkr" trend="-9%" isPositive={false}/>
                    <StatItem label="Provisionsnetto" value="11,9 mdkr" trend="+1%" isPositive={true}/>
                    <StatItem label="Rörelseresultat" value="30,75 mdkr" trend="-12%" isPositive={false}/>
                    <StatItem label="EPS (Resultat per aktie)" value="11,98 kr" trend="-14% (från 13,86)" isPositive={false}/>
                    <StatItem label="ROE (Avkastning på EK)" value="13,0%" trend="-1,6 pp (från 14,6%)" isPositive={false}/>
                    <StatItem label="K/I-tal" value="41,5%" trend="+1,1 pp (från 40,4%)" isPositive={false}/>
                  </div>
                </div>
                <div>
                  <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:15}}>Balansräkning & Kapital</h3>
                  <div className="space-y-3">
                    <StatItem label="Summa eget kapital" value="199,4 mdkr" />
                    <StatItem label="CET1 (Kärnprimärkapital)" value="17,6%" trend="18,8% 2024" isPositive={false}/>
                    <StatItem label="Total kapitalrelation" value="22,0%" />
                    <StatItem label="Riskvägt exponeringsbelopp" value="779,7 mdkr" />
                  </div>
                  <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">Kapitalöverskott</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      CET1 nivån är 2,85 procentenheter över myndighetskravet efter föreslagen utdelning. Handelsbanken delar inte ut mycket för att "locka kapital" utan för att de har ett faktiskt överskott i relation till sin riskprofil.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Vinst per aktie (EPS)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={epsData} margin={{top:10,right:10,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize:10, fill:T.sub}}/>
                      <YAxis hide/>
                      <Tooltip content={<ChartTip unit=" kr"/>}/>
                      <Bar dataKey="v" fill="#004B87" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>ROE & CET1 (%)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={roeCetData} margin={{top:10,right:10,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize:10, fill:T.sub}}/>
                      <YAxis hide domain={[10, 20]}/>
                      <Tooltip content={<ChartTip unit="%"/>}/>
                      <Line type="monotone" dataKey="roe" stroke="#004B87" strokeWidth={3} dot={{r:4}} name="ROE" />
                      <Line type="monotone" dataKey="cet1" stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" dot={{r:4}} name="CET1" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Utdelning (Ordinarie vs Extra)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={divData} margin={{top:10,right:10,bottom:0,left:0}}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize:10, fill:T.sub}}/>
                      <YAxis hide/>
                      <Tooltip content={<ChartTip unit=" kr"/>}/>
                      <Bar dataKey="ord" stackId="a" fill="#004B87" name="Ordinarie" />
                      <Bar dataKey="extra" stackId="a" fill="#004B8744" name="Extra" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:0.5,textTransform:"uppercase",marginBottom:12}}>Historisk översikt (Mdkr / % / KR)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{borderCollapse:"separate", borderSpacing: "0 8px"}}>
                  <thead>
                    <tr style={{fontSize:11, fontWeight:800, color:T.muted, textTransform:"uppercase"}}>
                      <th className="pb-2">Nyckeltal</th>
                      <th className="pb-2 text-right">2024</th>
                      <th className="pb-2 text-right">2025</th>
                      <th className="pb-2 text-right">Diff</th>
                    </tr>
                  </thead>
                  <tbody style={{fontSize:13, fontWeight:600}}>
                    <TableRow label="Intäkter (mdkr)" v24="62,3" v25="56,8" diff="-9%" />
                    <TableRow label="Rörelseresultat (mdkr)" v24="35,0" v25="30,8" diff="-12%" />
                    <TableRow label="Vinst per aktie (kr)" v24="13,86" v25="11,98" diff="-14%" />
                    <TableRow label="ROE (%)" v24="14,6%" v25="13,0%" diff="-1,6pp" />
                    <TableRow label="K/I-tal (%)" v24="40,4%" v25="41,5%" diff="+1,1pp" />
                    <TableRow label="CET1 (%)" v24="18,8%" v25="17,6%" diff="-1,2pp" />
                    <TableRow label="Total utdelning (kr)" v24="15,00" v25="17,50*" diff="+17%" />
                  </tbody>
                </table>
                <p className="text-[10px] text-slate-400 mt-2">* Föreslagen utdelning för 2025.</p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{background:T.bg, borderRadius:16, padding:20, border:`1px solid ${T.border}`}}>
                  <h4 style={{fontSize:14, fontWeight:800, color:T.ink, marginBottom:10}}>Kreditkvalitet - Bankens kronjuvel</h4>
                  <p style={{margin:0, fontSize:13, color:T.sub, lineHeight:1.7}}>
                    Kreditförlustnivån var <strong>-0,01%</strong> under 2025. Det betyder nettoåterföringar snarare än nettokreditförluster. För en bank är detta en av de starkaste kvalitetsindikatorerna på portföljens hälsa, riskdisciplin och underwriting-kvalitet.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-[#004B87]/5 p-5 rounded-2xl border border-[#004B87]/10">
                  <div className="w-12 h-12 rounded-full bg-[#004B87]/10 flex items-center justify-center text-[#004B87] font-bold text-lg">5/5</div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bedömning - Finansiell Kvalitet</div>
                    <div className="text-sm font-bold text-slate-900 leading-relaxed">Exceptionellt hög kvalitet, urstark kapitalisering och nettoåterföringar i kreditförluster.</div>
                  </div>
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
                    Om vi använder analyskursen 127,35 kr och EPS 11,98 kr blir <strong>P/E cirka 10,6x</strong>. Om vi använder föreslagen total utdelning 17,50 kr blir direktavkastningen cirka 13,7%, men det är missvisande som normalnivå eftersom 9,50 kr är extrautdelning. På ordinarie utdelning 8,00 kr blir <strong>direktavkastningen cirka 6,3%</strong>.
                  </p>
                </div>
                <div style={{borderRadius:14, padding:20, border:`1px solid ${T.border}`}}>
                  <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                    För banker är även P/B (pris i relation till eget kapital per aktie) ett centralt värderingsmått. Med ett eget kapital om 199,4 mdkr och cirka 1 980 miljoner utestående aktier uppgår eget kapital per aktie till omkring 100,7 kr. Det innebär att aktien handlas till cirka 1,26x eget kapital. För en bank av Handelsbankens kvalitet är det inte dyrt, men inte heller tillräckligt lågt för att tala om en tydlig felprissättning.
                  </p>
                </div>
                <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.8}}>
                  Utifrån både P/E och P/B är banken rimligt till lätt attraktivt värderad. Den höga kvaliteten motiverar en premie mot svagare europeiska banker, men samtidigt begränsar den fallande EPS-trenden hur stor premien bör vara. Därför är det svårt att argumentera för att aktien är tydligt felprissatt.
                </p>
                <p className="text-xs font-bold text-[#004B87] bg-[#004B87]/5 p-4 rounded-xl border border-[#004B87]/10 leading-relaxed italic">
                  Analysen avser Svenska Handelsbanken AB som bolag, men aktiekurs, värdering, direktavkastning och målpris i analysen baseras på Handelsbanken A (SHB A).
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
                    <div className="text-sm font-bold text-slate-900">Aktien är inte dyr för kvaliteten, men inte ett självklart köp här och nu.</div>
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
                      Det mest intressanta tillväxtspåret ligger utanför Sverige. Banken lyfter själv fram att marknadsandelarna i Storbritannien och Nederländerna är relativt små och att den långsiktiga tillväxtpotentialen därför är god. I Storbritannien fortsatte utlåningen att växa under 2025, både inom hushåll och företag. I Nederländerna fortsatte banken också växa från en låg bas. Det ger Handelsbanken tillväxtmöjligheter utan att behöva kompromissa med kreditkvaliteten i Sverige.
                    </p>
                  </div>
                  <div>
                    <h3 style={{fontSize:15,fontWeight:800,color:T.ink,marginBottom:8}}>2. Sparaffären</h3>
                    <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.7}}>
                      Sparaffären är en av de tydligaste ljuspunkterna. I Sverige uppgick totalt förvaltat kapital till 1 129 mdkr vid utgången av 2025 (varav fondvolym 1 077 mdkr). Nettoflödet i bankens fonder var 73,0 mdkr jämfört med 35,9 mdkr året innan. Detta ökar provisionsintäkterna och minskar beroendet av räntenettot över tid.
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
                      Handelsbanken beskriver att AI främst ska användas för interna processer och affärsstöd, inte för att ersätta det personliga kundmötet. Det är typiskt Handelsbanken: teknik som förstärker modellen, inte förändrar identiteten.
                    </p>
                  </div>
                  <div className="bg-[#004B87]/5 p-5 rounded-2xl border border-[#004B87]/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Star size={16} className="text-[#004B87]" fill="currentColor" />
                      <span className="text-xs font-bold text-[#004B87] uppercase tracking-wider">Tillväxtbetyg: 3/5</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Detta är inte ett snabbväxande case. Tillväxten är selektiv och kontrollerad med stabila drivkrafter i sparande och mindre penetrerade marknader.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

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
                      <p className="text-sm text-slate-700 leading-relaxed">Den största risken är räntenettot. När marknadsräntorna sjunker pressas marginalerna, vilket slog igenom tydligt under 2025. Detta är främsta orsaken till att intäkter och EPS föll.</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Regulatorisk risk</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Statliga avgifter på 2,8 mdkr och räntefri inlåning hos Riksbanken är belastningar som inte går att påverka operativt på kort sikt.</p>
                    </div>
                  </div>
                </div>
                <div style={{background:T.bg, borderRadius:16, padding:20, border:`1px solid ${T.border}`}}>
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Fastighetsrisk</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Exponering mot fastigheter och bolån innebär att ett svagt nordiskt makro eller problem i kommersiella fastigheter alltid är något att bevaka.</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest mb-1">Valuta och utländska marknader</div>
                      <p className="text-sm text-slate-700 leading-relaxed">Bankens internationella verksamhet innebär viss resultatsvängning från valutaeffekter, vilket syntes när den svenska kronan stärktes 2025.</p>
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
                    <div className="text-xl font-black">Låg till medel</div>
                  </div>
                </div>
                <div className="text-3xl font-black opacity-40">4/5</div>
              </div>
              <p className="mt-4 text-xs text-slate-500 italic">För en bank är Handelsbanken en ovanligt låg risk, men inte riskfri. Räntenettokänslighet, fastighetsexponering och regulatoriska kostnader gör att 4/5 är mer balanserat än 5/5.</p>
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
                    Handelsbanken har en relativt stark ESG-profil för att vara storbank. Under Q3 uppgick gröna lån till 140 mdkr. Vid utgången av Q3 redovisades 20% av förvaltat kapital i artikel 9 och 77% i artikel 8. Vid årsslutet uppgick motsvarande andelar till 21% respektive 79%.
                  </p>
                  <div style={{background:"#F8FAFC", borderRadius:20, padding:24, border:"1px solid #E2E8F0"}}>
                    <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">ESG-profil</h5>
                    <div className="flex gap-4">
                      <div className="flex-1 text-center border-r border-slate-200 pr-4">
                        <div className="text-2xl font-black text-[#004B87]">Stark</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Profil</div>
                      </div>
                      <div className="flex-1 text-center font-bold">
                        <div className="text-2xl font-black text-emerald-600">140+</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Gröna lån (Mdkr)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Makropåverkan</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Banken är dubbelverkande i makromiljön: lägre räntor pressar räntenettot men stabiliserar hushåll och fastighetsmarknad, vilket gynnar kreditkvaliteten. Detta gör banken defensiv snarare än offensiv.
                  </p>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">Bedömning ESG & Makro</span>
                    <span className="text-lg font-black text-emerald-800">4/5</span>
                  </div>
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
                    "Det mest intressanta AI-liknande mönstret i datan är inte att banken har någon dold positiv trigger, utan att siffrorna är ovanligt konsekventa. Inga tydliga röda flaggor – snarare exakt det banken brukar vara: tråkig, stark och disciplinerad."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">01</div>
                      <p className="text-sm text-white/70">Kreditkvaliteten är fortsatt extremt stark trots svagare räntemiljö.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">02</div>
                      <p className="text-sm text-white/70">Sparaffären accelererar samtidigt som räntenettot försvagas, vilket ger bättre intäktsmix.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <div className="text-[#004B87] font-black mb-2 text-xl">03</div>
                      <p className="text-sm text-white/70">Extrautdelningen signalerar stark kapitalposition men döljer normaliserad intjäningsnivå.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end px-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Observation Score: 3/5</div>
              </div>
            </Card>
          </FadeIn>
        </div>

        <NordnetCTA variant="low" />

        {/* ── SAMMANFATTNING ── */}
        <div id="sammanfattning">
          <FadeIn delay={500}>
            <div style={{background:T.accent, borderRadius:32, padding:40, color:"white", boxShadow:T.shadowLg}}>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                  <SectionLabel number="IX" title={<span style={{color:"white"}}>Sammanfattning & Investeringsbeslut</span>}/>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2">Är Handelsbanken ett kvalitetsbolag?</h4>
                      <p className="text-white/70 leading-relaxed">Ja. Det är ett av de tydligaste kvalitetsbolagen i nordisk banksektor. Kombinationen av kultur, kapitalstyrka, kreditkvalitet och kundnöjdhet är ovanlig.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2">Är aktien rimligt värderad?</h4>
                      <p className="text-white/70 leading-relaxed">Ja, ungefär. Inte dyr för kvaliteten, men heller inte uppenbart billig. Det som håller tillbaka caset är fallande EPS-trend och att marknaden redan känner till bankens styrkor.</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-white/60">Slutsats</h4>
                      <div className="text-2xl font-black mb-1 italic uppercase">Bevaka</div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Inget för den som söker snabb vinstacceleration, men ett innehav man kan sova gott med. Prioritera kvalitet, motståndskraft och ordinarie utdelningsförmåga.
                      </p>
                      <p className="text-[10px] text-white/40 mt-6 leading-relaxed italic pt-4 border-t border-white/5">
                        Analysen avser Svenska Handelsbanken AB som bolag, men aktiekurs, värdering, direktavkastning och målpris i analysen baseras på Handelsbanken A (SHB A).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-80 shrink-0 bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Total Score</div>
                    <div className="text-7xl font-black tracking-tighter mb-2">31<span className="text-4xl opacity-40">/40</span></div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-sm font-bold text-white/70 tracking-widest uppercase">Rating: 0.78</span>
                    </div>
                  </div>
                  <div className="pt-8 mt-8 border-t border-white/10">
                    <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Målpris (Base Case)</div>
                    <div className="text-4xl font-black">145–155 kr</div>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Baserat på analyskurs 127,35 kr</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {data.nextSteps && (
          <EditorialReadNext recommendations={data.nextSteps} />
        )}

        {/* ── SCENARIER ── */}
        <div id="scenarier">
          <FadeIn delay={550}>
            <Card mb={20}>
              <SectionLabel number="X" title="Scenarier: Bull, Base & Bear"/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div key="bull" style={{background:T.greenL, border:"1.5px solid rgba(16,185,129,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.green, fontSize:14, marginBottom:12}}>Bull Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.green, marginBottom:4, letterSpacing:-1}}>160-175 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">Räntenettot bottnar under 2026, sparaffären växer urstarkt och banken fortsätter vinna affärer i UK/Nederländerna. Marknaden ger en tydligare kvalitets-premie.</p>
                </div>
                <div key="base" style={{background:T.accentL, border:"1.5px solid rgba(0,75,135,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.accent, fontSize:14, marginBottom:12}}>Base Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.accent, marginBottom:4, letterSpacing:-1}}>145-155 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">Handelsbanken levererar urstark kreditkvalitet, god ordinarie utdelning och modest tillväxt utan vinstacceleration. Värderingen förblir stabil.</p>
                </div>
                <div key="bear" style={{background:T.redL, border:"1.5px solid rgba(217,54,62,0.2)", borderRadius:16, padding:20}}>
                  <div style={{fontWeight:800, color:T.red, fontSize:14, marginBottom:12}}>Bear Case</div>
                  <div style={{fontSize:24, fontWeight:900, color:T.red, marginBottom:4, letterSpacing:-1}}>115-130 kr</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-4">Fortsatt räntepress, regulatoriska kostnader biter och europeiska bankmultiplar kommer ned. Nedsidan begränsas dock av balansräkningen.</p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
        <AnalysisDisclaimer theme="light" />
      </div>
    </div>
  );
}
