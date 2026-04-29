import { SectionHeader, FinancialTable, MetricCard, VerdictBox, SwotGrid, ScenarioCards, RatingBox, Card as AnalysisCard, ProgressBar, FadeIn as AnalysisFadeIn, ChartCard, EditorialReadNext } from "./index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Lock, AlertTriangle, TrendingUp, CheckCircle2, Zap, Info, Building2, Users, Globe, Target, ShieldCheck, PieChart } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import NordnetCTA from "./NordnetCTA";
import { AnalysisData } from "../../data/analyses";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";

const T = {
  ink:     "#111827",
  sub:     "#374151",
  muted:   "#6B7280",
  border:  "#E5E7EB",
  bg:      "#F9FAFB",
  surface: "#FFFFFF",
  accent:  "#14532D", // Forest green
  accentL: "#DCFCE7",
  red:     "#B91C1C",
  redL:    "#FEE2E2",
  green:   "#14532D",
  greenL:  "#DCFCE7",
  gold:    "#92400E",
  goldL:   "#FEF3C7",
  navy:    "#1E3A5F",
  navyL:   "#DBEAFE",
  shadow:  "0 1px 3px rgba(17,24,39,0.06),0 4px 16px rgba(17,24,39,0.06)",
  shadowMd:"0 4px 24px rgba(17,24,39,0.10)",
  shadowLg:"0 8px 40px rgba(17,24,39,0.13)",
};

const revenueData = [
  {ar:"2021",v:6943,e:false},{ar:"2022",v:7835,e:false},{ar:"2023",v:8968,e:false},
  {ar:"2024",v:8554,e:false},{ar:"2025",v:9071,e:false},{ar:"2026e",v:9650,e:true},{ar:"2027e",v:10355,e:true}
];

const epsData = [
  {ar:"2021",v:5.15,e:false},{ar:"2022",v:5.90,e:false},{ar:"2023",v:6.50,e:false},
  {ar:"2024",v:7.27,e:false},{ar:"2025",v:7.38,e:false},{ar:"2026e",v:8.18,e:true},{ar:"2027e",v:9.08,e:true}
];

const financialRows = [
  { label: "Omsättning (Mkr)", "2024": "8 554", "2025": "9 071", "Q1_2026": "2 358 (kv.)", "2026e": "9 650e" },
  { label: "EBIT (Mkr)", "2024": "840", "2025": "840", "Q1_2026": "225 (kv.)", "2026e": "932e" },
  { label: "EBIT-marginal (%)", "2024": "9,8%", "2025": "9,3%", "Q1_2026": "9,6%", "2026e": "9,7%e" },
  { label: "Nettomarginal (%)", "2024": "7,8%", "2025": "7,5%", "Q1_2026": "7,6%", "2026e": "7,7%e" },
  { label: "EPS (kr)", "2024": "7,27", "2025": "7,38", "Q1_2026": "1,95 (kv.)", "2026e": "8,18e" },
  { label: "ROE (%)", "2024": "16,3%", "2025": "14,9%", "Q1_2026": "14,9%", "2026e": "–" },
  { label: "ROCE (%)", "2024": "13,8%", "2025": "13,3%", "Q1_2026": "13,0%", "2026e": "–" },
  { label: "Soliditet (%)", "2024": "67%", "2025": "68%", "Q1_2026": "68%", "2026e": "–" },
  { label: "Nettokassa (Mkr)", "2024": "610", "2025": "847", "Q1_2026": "1 095", "2026e": "–" },
  { label: "Op. kassaflöde (Mkr)", "2024": "1 197", "2025": "921", "Q1_2026": "339 (kv.)", "2026e": "–" },
  { label: "Utdelning (kr)", "2024": "1,60", "2025": "1,80", "Q1_2026": "–", "2026e": "1,96e" },
];

const financialColumns = [
  { key: 'label', label: 'Nyckeltal' },
  { key: '2024', label: '2024' },
  { key: '2025', label: '2025' },
  { key: 'Q1_2026', label: 'Q1 2026' },
  { key: '2026e', label: '2026e' }
];

const valuationRows = [
  { m: "P/E", "2024": "19,2x", "2025": "26,7x", "nuv": "29,1x", "2026e": "26,2x" },
  { m: "EV/EBIT", "2024": "15,3x", "2025": "21,0x", "nuv": "22,5x", "2026e": "–" },
  { m: "P/S", "2024": "1,50x", "2025": "1,99x", "nuv": "2,31x", "2026e": "–" },
  { m: "Direktavk. (%)", "2024": "1,14%", "2025": "0,91%", "nuv": "0,84%", "2026e": "0,92%e" },
];

const valuationColumns = [
  { key: 'm', label: 'Multipel' },
  { key: '2024', label: '2024' },
  { key: '2025', label: '2025' },
  { key: 'nuv', label: 'Nuläge' },
  { key: '2026e', label: '2026e' }
];

const allScores = [
  {key:"Affärsmodell",val:4,max:5},
  {key:"Strategisk Moat",val:3,max:5},
  {key:"Finansiell",val:4,max:5},
  {key:"Värdering",val:3,max:5},
  {key:"Tillväxt",val:4,max:5},
  {key:"Riskprofil",val:4,max:5},
  {key:"VD-analys",val:4,max:5},
  {key:"AI-obs.",val:4,max:5},
];

const SCORE_LABELS: Record<string, string> = {
  affarsmodell: "I. Företagsöversikt",
  strategiskMoat: "II. Strategisk analys & Moat",
  finansiellKvalitet: "III. Finansiell analys",
  vardering: "IV. Värdering",
  tillvaxtutsikter: "V. Tillväxtutsikter & Triggers",
  riskprofil: "VI. Riskprofil",
  vdAnalys: "VII. Analys av VD-ordet",
  aiObservationer: "VIII. AI-observationer"
};

const ChartTip=({active,payload,label,unit=""}: any)=>{
  if(!active||!payload?.length)return null;
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 14px",boxShadow:T.shadowMd,fontSize:13}}>
      <div style={{fontWeight:700,color:T.ink,marginBottom:6}}>{label}</div>
      {payload.map((p: any,i: number)=><div key={i} style={{color:T.sub}}>{p.name}: <strong style={{color:T.ink}}>{typeof p.value==="number"?p.value.toLocaleString():p.value}{unit}</strong></div>)}
    </div>
  );
};

interface AQGroupDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function AQGroupAnalysis({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: AQGroupDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#14532D] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#14532D] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-[18px] font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                  AQ Group AB — 23 april 2026
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">AQ</span>
                <span className="text-sm font-medium opacity-90">Industriell tillverkning • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#14532D] border-white' 
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
              <span className="text-4xl font-black tracking-tighter">30/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">3.75 / 5.0 – Rating 75%</span>
          </div>
        </div>
      </div>

      {/* 2. SCORE STRIP */}
      <div className="w-full bg-[#14532D] border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
          {allScores.map(({key, val, max}, i) => (
            <div key={key} className={`py-4 text-center ${i !== allScores.length - 1 ? 'border-r border-white/10' : ''}`}>
              <div className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-white/70 mb-1.5">{key}</div>
              <div className="font-serif text-xl leading-none text-white">
                {val}<span className="text-[10px] text-white/50 font-mono">/{max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        
        {/* 2. SUMMARY BOX */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-4 text-emerald-900">
          <Info size={24} className="shrink-0 mt-1" />
          <p className="text-sm font-medium leading-relaxed">
            <strong>Sammanfattning:</strong> Exceptionellt kvalitetsbolag med 30 år obruten vinst, stark nettokassa och exponering mot datacenter, försvar och elektrifiering. Premievärderingen P/E ~29x ger dock begränsad uppsida vid nuvarande kurs.
          </p>
        </div>

        {/* 3. KEY METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
            <div className="text-2xl font-black text-slate-900">~214 kr</div>
            <span className="text-xs text-slate-500 mt-1 block">Nasdaq Large Cap</span>
          </AnalysisCard>
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
            <div className="text-2xl font-black text-slate-900">~19,7 Mdr</div>
            <span className="text-xs text-slate-500 mt-1 block">91,7 M aktier</span>
          </AnalysisCard>
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (trailing)</span>
            <div className="text-2xl font-black text-slate-900">29,1x</div>
            <span className="text-xs text-slate-500 mt-1 block">2026e: 26,2x | 2027e: 23,6x</span>
          </AnalysisCard>
          <AnalysisCard className="p-6 border-2 border-[#14532D]/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nettokassa (Q1 2026)</span>
            <div className="text-2xl font-black text-[#14532D]">1 095 Mkr</div>
            <span className="text-xs text-[#14532D] font-bold mt-1 block">Exkl. leasingskulder</span>
          </AnalysisCard>
        </div>

        <NordnetCTA variant="high" />

        {/* ── I. FÖRETAGSÖVERSIKT ── */}
        <section id="oversikt" className="scroll-mt-24">
          <AnalysisFadeIn>
             <SectionHeader number="Sektion I" title="Företagsöversikt" accentColor="#14532D" />
             
             <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
               <div className="relative z-10 space-y-5">
                 <p className="text-[16.5px] leading-[1.7] text-slate-700 pl-4.5 border-l-4 border-[#14532D]">
                   Sedan 1994 har AQ Group redovisat positivt resultat varje enskilt kvartal. Det är inte en marknadsföringsslogan – det är ett verifierat finansiellt faktum som sträcker sig över finanskrisen, pandemin och den europeiska industrirecession 2024.
                 </p>
                 
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   AQ Group är en global industriell kontraktstillverkare med produktion i 17 länder och 7 800+ anställda. Bolaget delas i två segment: <strong>Komponent</strong> (~85 % av omsättningen) – transformatorer, kablage, mekanikdetaljer, stansad plåt och termoplast – samt <strong>System</strong> (~15 %) med kraft- och automationslösningar. Geografiskt dominerar Europa (85 %), varav Sverige svarar för 27 %.
                 </p>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Affärsmodellen</strong> är kontraktsbaserad: kunderna beställer specifika komponenter och AQ tillverkar enligt spec i sina fabriker. Intäkterna är <em>projektdrivna och volymberoende</em>, inte återkommande i prenumerationsmodellens bemärkelse. Stabiliteten i intäktsflödet uppnås via bred kunddiversifiering, lång kundrelationer och en decentraliserad struktur av 50+ dotterbolag som konkurrerar oberoende.
                 </p>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Ledning och styrning.</strong> Grundare-VD James Ahrgren är i ordets sanna bemärkelse "skin in the game" – han har byggt och drivit bolaget sedan start och kontrollerar ~37 % av rösterna tillsammans med Claes Mellgren och Per Olof Andersson. CFO Christina Hegg ansvarar för finansiell rapportering med hög transparens. Optionsprogrammet 2024/2027 (lösenkurs 152 kr, nu kraftigt "in the money") kopplar ledningens belöning direkt till aktiekursen. Inför 2026 uppgraderades styrelsen med ny ordförande Åsa Landén Ericsson och Roland Kasper (fd VD Systemair) – ett professionaliserat governance i takt med Large Cap-statusen.
                 </p>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Kapitalallokering.</strong> Utdelning om ~25 % av EPS är konsekvent kommunicerat. Utdelningen höjdes från 1,60 kr (2024) till 1,80 kr (2025). Inga återköp sker – bolaget sparar kassan till förvärv och organisk kapacitetsexpansion. Förvärvsstrategin är disciplinerad: bättre att vänta på rätt pris än att köpa för dyrt – vilket dessvärre inneburit ett magert förvärvsflöde under 2025.
                 </p>
               </div>
             </div>
             
             <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg I – Affärsmodell & Styrning</div>
               <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
               <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                 Bevisad affärsmodell med 30 år obruten lönsamhet, kompetent grundarledning med ~37 % insiderägande och optionsprogram som direktkopplar belöning till aktiekurs. Det enda som håller tillbaka 5:an är att intäkterna är projektbaserade snarare än genuint återkommande (SaaS/prenumeration).
               </div>
             </div>
          </AnalysisFadeIn>
        </section>

        {/* ── II. STRATEGISK ANALYS & MOAT ── */}
        <section id="strategi" className="scroll-mt-24">
             <AnalysisFadeIn delay={100}>
                <SectionHeader number="Sektion II" title="Strategisk analys & Moat" accentColor="#14532D" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Makro och bransch.</strong> AQ verkar i ett konjunkturellt medvind just nu. Europeiska försvarsbudgetar expanderar strukturellt, AI-infrastrukturinvesteringarna driver en oöverträffad datacenter-byggcykel och industriell elektrifiering byter ut fossila drivlinor. Motvinden finns i cykliska kundsegment – bussproduktion (USA/Mexiko), förpackningsmaskiner (Europa) och fartygsutrustning är svaga. Räntenivån normaliseras och påverkar marginellt ett skuldfritt bolag. Valutaexponeringen (EUR, CNY, USD) skapar kvartalsvis volatilitet men hanteras via naturlig hedging i 17-landsstrukturen.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Branschen – kundanpassad industriell kontraktstillverkning – är <strong>mogen och fragmenterad</strong>. Inget enskilt bolag dominerar globalt inom AQ:s specifika nisch (transformatorer + kablage + mekanik för krävande industri). Fragmenteringen är en möjlighet för disciplinerade förvärvare. Cyklikaliteten är medelhög: verksamheten bromsas i recessioner men diversifieringen gör att trågen är grundare än för en renodlad cyklisk aktie.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Konkurrens och moat.</strong> AQ:s tre konkurrensfördelar: (1) <em>Kostnadseffektivitet</em> via lågkostnadsproduktion i Östeuropa och Kina kombinerat med europeisk kundnärhet. (2) <em>Teknisk kompetens i induktiva komponenter</em> – transformatorer och induktorer kräver decennier av know-how att behärska; förvärvet av mdexx/Riedel stärkte detta ytterligare. (3) <em>Leveranskvalitet och kundlojalitet</em> – 99,6 % produktkvalitet och 94 % leveransprecision (mot mål 98 %) bygger förtroende. Bolaget saknar däremot nätverkseffekter, proprietär IP i skala och byteskostnader av den typ som "låser in" kunder strukturellt.
                    </p>
                  </div>
                </div>

                <SwotGrid data={{
                    strengths: ["30 år utan ett enda förlustår – ett unikt industriellt track record", "Nettokassa >1 Mdr ger förvärvskapacitet och finansiell flexibilitet", "Decentraliserat dotterbolagsystem – snabb anpassning, ingen byråkrati", "Produktion i 17 länder – naturlig geopolitisk och valutahedge", "Transformatorkompetens (25 % av omsättning) i rätt marknad", "Stark ledningskultur med grundar-VD och högt insiderägande"],
                    weaknesses: ["Organisk tillväxt 2 % (2025) – långt under 10 %-målet", "Förvärvsvolym understiger 5 %-målet; pipeline tunt 2024–2025", "mdexx/Riedel fortfarande under AQ-marginalmålet", "Kvalitetsreklamationer transformatorer Q4 2025 – nytt mönster", "Kapacitetsunderskott kablage USA/Mexiko skadar lönsamheten", "Begränsad R&D-investering och inga patent i skala"],
                    opportunities: ["Datacenter: LOI 200 transformatorer + 15 mEUR aktiv orderbok", "Europeisk försvarsupprustning: flerårig strukturell cykel", "Industriell elektrifiering: frekvensomriktare, traktionssystem", "Förvärv till lägre priser i osäkert makroklimat", "Large Cap-uppflyttning ökar institutionellt kapital och synlighet"],
                    threats: ["US-tullar drabbar USA/Mexiko-produktion (6 % av försäljning)", "Valutamotvind EUR och CNY komprimerar omsättningen", "Geopolitisk eskalation stör leveranskedjor och energipriser", "Konkurrens från asiatiska transformatortillverkare med lägre kostnad", "Global minimiskatt (Pelare II) ökar skattekostnaden mot 19–20 %"]
                }} />
                
                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg II – Strategisk Moat</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">3 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    AQ har en real men inte oemotståndlig moat baserat på kostnadseffektivitet, teknisk transformatorkompetens och djupa kundrelationer. Stabila marknadsandelar men konsekvent organisk tillväxt under eget mål begränsar betyget. Konkurrenter med tillräckliga resurser kan utmana på sikt.
                  </div>
                </div>
             </AnalysisFadeIn>
        </section>

        {/* ── III. FINANSIELL ANALYS ── */}
        <section id="finansiellt" className="scroll-mt-24">
            <AnalysisFadeIn delay={200}>
                <SectionHeader number="Sektion III" title="Finansiell analys" accentColor="#14532D" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[16.5px] leading-[1.7] text-slate-700 pl-4.5 border-l-4 border-[#14532D]">
                      Trettio år utan ett enda förlustår är ett finansiellt track record som är näst intill unikt bland svenska industribolag. Nettokassa, stark soliditet och konsekvent FCF skapar en finansiell kvalitetsstämpel.
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Resultatutveckling – historik & estimat</h3>
                
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">År</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Omsättning Mkr</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Tillväxt %</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EBIT Mkr</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EBIT-marg.</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Nettomarg.</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EPS (kr)</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Utdelning (kr)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2021</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">6 943</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-500">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">680</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">9,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,2%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~5,15</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,20</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2022</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7 835</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">+12,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">748</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">9,5%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~5,90</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,40</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2023</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">8 968</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">+14,5%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">878</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">9,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,4%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~6,50</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,40</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">8 554</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">−4,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">840</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">9,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,27</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,60</td></tr>
                      <tr className="bg-[#DCFCE7] hover:bg-[#DCFCE7]"><td className="p-2.5 text-slate-700 font-bold">2025</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">9 071</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-bold">+6,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">840</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">9,3%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">7,5%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">7,38</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">1,80</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Q1 2026</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">2 358 (kv.)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">+3,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">225 (kv.)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">9,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,95 (kv.)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2026e *</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">9 650</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">+6,4%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">932</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">9,7%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">7,7%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">8,18</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">1,96e</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2027e *</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">10 355</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">+7,3%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">1 030</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">9,9%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">7,9%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">9,08</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">2,15e</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="font-mono text-[11px] text-slate-400 mt-[-14px] mb-5">* Estimat från externa analytiker. EPS-CAGR 2021–2025 ≈ 9 %. Kvartalsvärden Q1 2026 är ej annualiserade.</div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Omsättningstillväxt:</strong> CAGR ~7 % 2021–2025. Det markanta trendbrott är 2024:s nedgång (−4,6 %) drivet av svag fordonscykel. Återhämtningen 2025 (+6 %) bestod mestadels av förvärvstillskott (+7,2 pp) – den organiska tillväxten var bara 2 %, vilket är den siffran att kritiskt granska.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Marginaler:</strong> EBIT-marginalen håller stabilt 9,0–10,0 % trots konjunkturcykler. Marginell kompression 2025 (9,3 % vs 9,8 % 2024) förklaras av mdexx/Riedel. Q1 2026 visar återgång till 9,6 % – integrationen fungerar. Bolagets EBT-mål på {">"}8 % som minimumgolv uppfylls med bred marginal.
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Balansräkning & kassaflöde</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Nyckeltal</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">2024</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">2025</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Q1 2026</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Kommentar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Soliditet</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">67%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">68%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">68%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Mål {">"}40% – uppfylls med bred marginal</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Nettokassa (ex. leasing)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">610 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">847 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">1 095 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Accelererar kvartal för kvartal</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">ROE</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">16,3%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">14,9%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">14,9%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Stabil men under 20 %-tröskeln</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">ROCE</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">13,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">13,3%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">13,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Sjunker marginellt pga breddat kapital</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Op. kassaflöde</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1 197 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-500">921 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">339 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">2025 lägre pga rörelsekapitalbindning</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Capex</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">185 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">233 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">58 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">+26 % – kapacitetsexpansion datacenter</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">FCF (op.CF − capex)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">1 012 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">688 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">281 Mkr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Robust men lägre 2025</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Nettoskuld/EBITDA</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">Nettokassa</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">Nettokassa</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">−0,9x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Skuldfritt – exceptionellt</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Utdelning/aktie</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,60 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">1,80 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">+12,5 % tillväxt</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">Utdelningsandel EPS</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">22%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">24%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">Konservativt och hållbart</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Det operativa kassaflödets fall från 1 197 Mkr (2024) till 921 Mkr (2025) förklaras av en ökad kapitalbindning i kundfordringar (+283 Mkr) kopplad till volymtillväxt och avslutad factoring i mdexx. Det är inte ett strukturellt problem – Q1 2026 bekräftar normalisering med 339 Mkr (vs 244 Mkr Q1 2025).
                    </p>
                  </div>
                </div>

                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg III – Finansiell Kvalitet</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Nettokassa 1 095 Mkr, soliditet 68 %, ROE 14,9 % och 30 år utan förlustår är finansiell kvalitetsklass. EPS-CAGR ~9 % är bra men inte exceptionellt. ROE under 20 % och FCF-minskning 2025 håller tillbaka 5:an, men Q1 2026 normaliserar och trenden är positiv.
                  </div>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── IV. VÄRDERING & JÄMFÖRELSE ── */}
        <section id="vardering" className="scroll-mt-24">
            <AnalysisFadeIn delay={300}>
                <SectionHeader number="Sektion IV" title="Värdering" accentColor="#14532D" />
                
                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">P/E-historik & multipeljämförelse</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Period</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EPS (kr)</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Kurs (approx.)</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">P/E</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EV/EBIT</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EV/EBITDA</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">P/S</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Direktavk.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2021</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~5,15</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~90 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">~17x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~1,3%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2022</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~5,90</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~90 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">~15x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~1,6%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2023</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~6,50</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~110 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#14532D] font-semibold">~17x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~1,3%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,27</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~140 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">19,25x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">15,28x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">11,14x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,50</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,14%</td></tr>
                      <tr className="bg-[#DCFCE7] hover:bg-[#DCFCE7]"><td className="p-2.5 text-slate-700">2025</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">7,38</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~197 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">26,72x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">21,01x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">15,00x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,99</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">0,91%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#111827] font-bold">Nuv. (~apr 2026)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">7,38/8,18e</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">~214 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">29,1x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">22,5x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">15,7x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">2,31</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">0,84%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2026e *</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">8,18</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">26,2x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">0,92%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2027e *</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">9,08</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">23,6x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">1,00%</td></tr>
                      <tr className="bg-[#DBEAFE] hover:bg-[#DBEAFE]"><td className="p-2.5 text-[#111827] font-bold">5-årssnitt (est.)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">~20,5x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td></tr>
                      <tr className="bg-[#FEF3C7] hover:bg-[#FEF3C7]"><td className="p-2.5 text-[#111827] font-bold">Nordisk industrinorm</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">~18–22x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">~14–18x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#111827] font-bold">~10–14x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">—</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~1,5–2,5%</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="font-mono text-[11px] text-slate-400 mt-[-14px] mb-5">* Estimat. Nordisk industrinorm = indikativt intervall, ej beräknat från specificerade peers.</div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      AQ handlas till <strong>P/E om 29x</strong> på löpande EPS – 42 % over bolagets eget 5-årssnitt. Premiet motiveras delvis av Large Cap-flytten, datacenter-omvärderingen och förvärvskapaciteten. Men PEG-talet (P/E / EPS-tillväxt = 29 / ~8 %) på ~3,6x överstiger tydligt den industriella normen om 1,5–2x. Aktien kräver att allt går rätt.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      På 2026e faller P/E till 26x och 2027e till 24x – förutsatt att analytikerprognoserna håller. EV/EBITDA på 15,7x är i överkant för sektorn (norm ~10–14x) men inte absurt givet nettokassan. Direktavkastningen på 0,84 % ger ingen meningsfull "floor" för kursen.
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg IV – Värdering</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">3 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Rimlig värdering för ett premiumkvalitetsbolag – men inte attraktiv. P/E 29x är 42 % över historiskt snitt och PEG 3,6x kräver näst intill perfekt exekvering. Premiet är delvis rationellt men lämnar begränsat utrymme för besvikelser. Nuvarande kurs prisar in ett nästan optimistiskt scenario som base case.
                  </div>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── V. TILLVÄXT ── */}
        <section id="tillvaxt" className="scroll-mt-24">
             <AnalysisFadeIn delay={400}>
                <SectionHeader number="Sektion V" title="Tillväxtutsikter & Triggers" accentColor="#14532D" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[16.5px] leading-[1.7] text-slate-700 pl-4.5 border-l-4 border-[#14532D]">
                      AQ befinner sig i ett sällsynt läge där tre av decenniets starkaste industriella megatrender – datacenter-AI-infrastruktur, europeisk försvarsupprustning och industriell elektrifiering – konvergerar mot bolagets kärnkompetenser.
                    </p>
                    
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Drivkraft 1 – Datacenter och AI.</strong> Transformatorer är kritisk infrastruktur i varje datacenter. Under Q3 2025 erhöll AQ en order på 15 mEUR mellanspänningstransformatorer. I Q4 2025 signerades ett LOI om 200 enheter och en prototyporder från en ny amerikansk kund. Q1 2026-brevet refererar till pågående kapacitetsexpansion i <em>samtliga</em> transformatorfabriker med leveransmål juni 2026. VD Ahrgren beskriver datacenter som potentiellt "en betydande del av AQ:s omsättning under flera år framöver."
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Drivkraft 2 – Europeisk försvar.</strong> Europeiska försvarsanslag expanderar strukturellt. AQ levererar kablage, elsystem och mekanik till försvarskunder i Sverige, Polen, England och USA. Organisk tillväxt inom försvarsegment var stark i 2025 och in i 2026.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Drivkraft 3 – Elektrifiering.</strong> Frekvensomriktare, elbussar och traktionssystem driver efterfrågan på induktiva komponenter. Den nyutbyggda Tallinn-fabriken (trefaldig kapacitet, solenergiförsörjning) är ett konkret kapacitetsttecken på detta.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Förvärv.</strong> Nettokassan ger ~1 Mdr i förvärvskapacitet. Ahrgren bekräftar aktivt förvärvssökande men prioriterar rätt pris framför volym. En förvärvsacceleration under 2026 är den viktigaste potentiella surprise-triggern.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Katalysatorer (12–24 månader):</strong> (1) Leverans av datacenter-orderbok juni 2026 + nya orders, (2) mdexx/Riedel når 8 % EBT-mål, (3) Nytt strategiskt förvärv adderar {">"}5 % omsättning, (4) Ny order i multimiljoner-EUR-klassen inom försvar.
                    </p>
                  </div>
                </div>

                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg V – Tillväxtutsikter</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Tre samverkande megatrender med konkreta ordrar, kapacitetsinvesteringar och 6,3 % organisk tillväxt Q1 2026 (bättre än helårets 2 %). Katalysatorer synliga inom 12 månader. Det som håller tillbaka 5:an är konsekvent organisk undertillväxt mot eget mål och ojämnt förvärvsflöde.
                  </div>
                </div>
             </AnalysisFadeIn>
        </section>

        {/* ── VI. RISKPROFIL ── */}
        <section id="risk" className="scroll-mt-24">
            <AnalysisFadeIn delay={500}>
                <SectionHeader number="Sektion VI" title="Riskprofil ⚠️" accentColor="#14532D" />
                
                <div className="bg-[#F9FAFB] border-l-4 border-[#92400E] p-4 text-[13.5px] text-slate-700 mb-5">
                  ⚠️ <strong>Inverterad skala:</strong> I denna sektion innebär 5/5 mycket låg risk. AQ erhåller 4/5 = låg risk.
                </div>

                <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm mb-5">
                    <table className="w-full text-[13.5px] text-left border-collapse">
                        <thead className="bg-[#111827] text-white font-mono text-[9.5px] uppercase tracking-[0.1em] font-medium">
                            <tr>
                                <th className="p-2.5">Riskfaktor</th>
                                <th className="p-2.5">Sannolikhet</th>
                                <th className="p-2.5">Påverkan</th>
                                <th className="p-2.5">AQ:s hantering</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                             {[
                                { f: "Valutarisk EUR/CNY/USD", s: "Hög (pågående)", p: "Medel", c: "Naturlig hedging via produktion i 17 länder", sc: "neu", pc: "neu" },
                                { f: "US-tullar (USA/Mexiko, 6 % av försäljning)", s: "Medel", p: "Låg–Medel", c: "Flexibilitet flytta produktion; begränsad exponering", sc: "neu", pc: "neu" },
                                { f: "Europeisk konjunkturavmattning", s: "Medel", p: "Medel", c: "15+ slutmarknader dämpar effekten", sc: "neu", pc: "neu" },
                                { f: "mdexx-integration misslyckas", s: "Låg", p: "Medel", c: "Break-even uppnåddes sep 2025; integration på plan", sc: "pos", pc: "neu" },
                                { f: "Reklamationer transformatorer", s: "Låg–Medel", p: "Medel", c: "Investeringar i testutrustning beslutade Q4 2025", sc: "neu", pc: "neu" },
                                { f: "VD-nyckelmansberoende (Ahrgren)", s: "Låg", p: "Hög", c: "Fem unga ledare befordrade Q1 2026; ledarplan pågår", sc: "pos", pc: "neg" },
                                { f: "Geopolitik/leveranskedja", s: "Medel", p: "Låg", c: "Ingen exponering mot Ukraina, Ryssland eller Belarus", sc: "neu", pc: "pos" },
                                { f: "Global minimiskatt Pelare II", s: "Realiserad", p: "Låg", c: "19 % effektiv skatt 2025; hanterat och kommunicerat", sc: "neg", pc: "pos" }
                             ].map((r, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-2.5 font-semibold text-slate-700">{r.f}</td>
                                    <td className={`p-2.5 ${r.sc === 'pos' ? 'text-[#14532D] font-semibold' : r.sc === 'neg' ? 'text-[#B91C1C] font-semibold' : 'text-slate-500'}`}>{r.s}</td>
                                    <td className={`p-2.5 ${r.pc === 'pos' ? 'text-[#14532D] font-semibold' : r.pc === 'neg' ? 'text-[#B91C1C] font-semibold' : 'text-slate-500'}`}>{r.p}</td>
                                    <td className="p-2.5 text-slate-700">{r.c}</td>
                                </tr>
                             ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Det mest sannolika negativa scenariot för AQ är en kombination av <strong>europeisk industrirecession + mdexx-integration tar längre tid + datacenter-ordrar försenas</strong>. Sannolikheten för detta kombinationsscenario är låg, men konsekvensen är hanterbar givet nettokassabufferten. Det enda strukturella riskscenario som är svårt att prissätta är ett VD-byte – AQ Ahrgren är i en unik position som inte lätt replikeras.
                    </p>
                  </div>
                </div>

                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg VI – Riskprofil (inverterad: 5 = låg risk)</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Skuldfri balansräkning med nettokassa 1 095 Mkr, produktion i 17 länder och 30 år av konjunkturmotstånd klassificerar AQ som ett av de lägst riskfyllda industribolagen på Nasdaq Stockholm. VD-nyckelmansberoende och transformatorreklamationer förhindrar 5:an.
                  </div>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── VII. VD-ANALYS ── */}
        <section id="vd-analys" className="scroll-mt-24">
            <AnalysisFadeIn delay={600}>
                <SectionHeader number="Sektion VII" title="Analys av VD-ordet" accentColor="#14532D" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[16.5px] leading-[1.7] text-slate-700 pl-4.5 border-l-4 border-[#14532D]">
                      James Ahrgrens VD-brev är ovanligt ärliga dokument. Bland 50+ industribolag på Nasdaq Stockholm tillhör hans kommunikation den mest självkritiska och konkretfattiga. Det är en immateriell styrka med reellt analytiskt värde.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-5">
                  {[
                    { n: "Dimension 1", t: "Ton & Transparens", r: "Stark · 5/5", c: "hi", text: "<strong>Q3 2025:</strong> \"Vi är inte nöjda med vår organiska tillväxt.\" <strong>Q4 2025:</strong> \"Reklamationer som påverkat resultatet negativt\" i transformatorer – proaktivt erkänt. <strong>Q1 2026:</strong> Direkt om kapacitetsproblem i USA/Mexiko. Inga bortförklaringar, inga sugarcoatings. Specifika siffror används konsekvent." },
                    { n: "Dimension 2", t: "Strategisk Kontinuitet", r: "Stark · 4/5", c: "hi", text: "Datacenter, försvar och elektrifiering som tillväxtmotorer kommuniceras identiskt i alla tre rapporter. EBT-mål >8 % och tillväxtmål >15 % återkommer utan förklaring varför 15%-målet konsekvent missas. Strategin är stabil men saknar uppdatering av tillväxtmålsättningen." },
                    { n: "Dimension 3", t: "Framåtblickande Fokus", r: "Godkänd · 3/5", c: "md", text: "Konkreta deadlines finns: \"leverans datacenter-order innan juni 2026\", \"EBT-mål 8 % för mdexx 2026\". Däremot saknas mätbara KPI:er för att nå 10 % organisk tillväxt. \"Värdeskapande förvärv\" upprepas utan specifika kriterier – vad är rimligt pris, vilken geografi, vilket segment?" },
                    { n: "Dimension 4", t: "Kapitalallokering", r: "Stark · 4/5", c: "hi", text: "Nettokassan kommuniceras varje rapport med exakt siffra. Q4 2025 förklaras det svagare kassaflödet transparent (kundfordringar + factoring-avslut). 25%-utdelningspolicyn kommuniceras konsekvent. Inga återköp – tydligt motiverat av förvärvsstrategi. Hög trovärdighet." },
                  ].map((d, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-4.5 rounded">
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-slate-400 mb-1">{d.n}</div>
                      <div className="font-serif text-[16px] text-[#111827] mb-2">{d.t}</div>
                      <div className={`inline-block font-mono text-[9px] px-2 py-0.5 rounded mb-2 text-white ${d.c === 'hi' ? 'bg-[#14532D]' : 'bg-[#92400E]'}`}>{d.r}</div>
                      <div className="text-[13px] text-slate-700 leading-[1.6]" dangerouslySetInnerHTML={{ __html: d.text }} />
                    </div>
                  ))}
                  <div className="bg-white border border-slate-200 p-4.5 rounded md:col-span-2">
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-slate-400 mb-1">Dimension 5</div>
                    <div className="font-serif text-[16px] text-[#111827] mb-2">Makro & Branschkommentarer</div>
                    <div className="inline-block font-mono text-[9px] px-2 py-0.5 rounded mb-2 text-white bg-[#14532D]">Stark · 4/5</div>
                    <div className="text-[13px] text-slate-700 leading-[1.6]">
                      Ahrgren nämner specifika marknadsrörelser varje kvartal – "försäljning ökade till datacenter i USA, minskade till fartyg i Europa" – snarare än generella makrolyckönskningar. Geopolitiska risker (tullar, krigshandlingar) behandlas sakligt och proaktivt. Q1 2026-brevet lyfter konkret datacenter-exponering med verifierbara ordersiffror. Den enda svagheten är att bolaget misslyckas beskriva vilken strategi som ska ta dem från 6 % organisk tillväxt till målet 10 %.
                    </div>
                  </div>
                </div>

                <div className="bg-[#DCFCE7] border-l-4 border-[#14532D] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
                  <strong>Summering VD-analys:</strong> James Ahrgrens kommunikation tillhör de transparentaste bland svenska industribolag. Han erkänner proaktivt problem, specifika siffrorna används konsekvent och strategin är stabil. Svagheten: avsaknad av konkreta KPI:er för det organiska tillväxtmålet och för förvärvsstrategin.
                </div>

                <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg VII – VD-ordet</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Klar, ärlig och konsekvent kommunikation med uppföljning av konkreta mål. Ahrgren erkänner öppet reklamationer (Q4 2025), missat tillväxtmål och kapacitetsproblem. Frånvaron av mätbara KPI:er för organisk tillväxt och oklara förvärvsparametrar håller tillbaka 5:an.
                  </div>
                </div>
            </AnalysisFadeIn>
        </section>

        {/* ── VIII. AI-OBSERVATIONER ── */}
        <section id="ai" className="scroll-mt-24">
             <AnalysisFadeIn delay={700}>
                 <SectionHeader number="Sektion VIII" title="AI-observationer 🔍" accentColor="#14532D" />
                 
                 <div className="bg-[#DBEAFE] border-l-4 border-[#1E3A5F] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
                   <strong>Notera:</strong> Dessa signaler bygger på dataanalys av rapporter, insidertransaktioner och marknadsmönster – de ska tolkas som ytterligare indikationer, inte definitiva slutsatser.
                 </div>
                 
                 <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
                   <div className="relative z-10 space-y-5">
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Sentimentanalys.</strong> Nyhetsflödet kring AQ Group har accelererat positivt sedan Large Cap-flytten januari 2026. Branschforum lyfter AQ som en "nordisk datacenter-pick" – en positiv re-rating-story som drivit kursen från ~140 kr (2024) till ~214 kr (2026). Mediabevökning har ökat markant och tonen är övervägande positiv kring försvars- och datacenterexponering. Informationskälla: bolagets egna rapporter + observerat mediamönster.
                     </p>
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Insidertransaktioner.</strong> Optionsprogrammet 2022/2025 (lösenkurs 70,20 kr) nyttjades till 100 % i maj–juni 2025 – 262 500 aktier registrerades. Det aktiva programmet 2024/2027 (lösenkurs 152 kr) tecknades till 100 % av ledande befattningshavare. Vid nuv. kurs ~214 kr är dessa optioner ~40 % "in the money" – ledningen har kraftiga incitament att driva aktiekursen vidare. Inga nettosäljpositioner identifierade bland insiders.
                     </p>
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Analytikerkonsensus.</strong> Formell konsensus-data finns ej i Del 2-materialet och kan inte skapas. Observerbart: EPS-estimaten 2026e (8,18 kr) och 2027e (9,08 kr) implicerar ~10–11 % EPS-tillväxt – konservativt givet att organisk tillväxt nu accelererar och kapaciteten byggs ut. Om dessa estimat justeras upp i kommande kvartal kan aktiekursen snarast röra sig mot bull-case.
                     </p>
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Historiska mönster och avvikelser.</strong> AQ uppvisar ett stabilt <em>säsongsmönster</em>: Q1 starkast, Q3 svagast (bekräftat konsekvent). Den nuvarande P/E-omvärderingen från ~17x (2021–2023) till ~29x utan proportionerlig EPS-acceleration är statistiskt ovanlig och den tydligaste varningssignalen i analysen. Kassaflödets fall 2025 bryter ett historiskt mönster men Q1 2026 normaliserar. Styrelseuppgradering (Landén Ericsson + Kasper) signalerar professionalisering inför ökad institutionell uppmärksamhet.
                     </p>
                   </div>
                 </div>

                 <div className="bg-[#14532D] text-white p-8 mt-8 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/50 mb-1.5 relative z-10">Betyg VIII – AI-observationer</div>
                  <div className="font-serif text-[22px] mb-2 relative z-10">4 / 5</div>
                  <div className="text-[13.5px] text-white/80 leading-[1.6] relative z-10">
                    Positiva signaler dominerar: 100 % insideroptionsnyttjande, accelererat positivt sentiment, konservativa EPS-estimat givet organisk tillväxtacceleration. Den enda konkreta varningssignalen är P/E-expansion utan proportionerlig EPS-acceleration – vilket är precis vad som håller rekommendationen på BEVAKA snarare än KÖP.
                  </div>
                </div>
             </AnalysisFadeIn>
        </section>

        {/* ── IX. SAMMANFATTNING ── */}
        <section id="sammanfattning" className="scroll-mt-24">
            <SectionHeader number="Sektion IX" title="Sammanfattning & Investeringsbeslut" accentColor="#14532D" />
            
            <div className="bg-[#FEFCE8] border border-[#FDE047] p-2.5 text-[12.5px] text-[#854D0E] rounded-sm my-3.5">
              <strong>Intressekonflikt:</strong> Carl Fredrik Thor innehar inga aktier i AQ Group AB per analysdatum 23 april 2026.
            </div>

            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">De tre centrala frågorna</h3>

            <div className="bg-[#DCFCE7] border-l-4 border-[#14532D] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>1. Är detta ett kvalitetsbolag?</strong> Ja – entydigt och utan reservationer. Trettio år av obruten kvartalsvinst, nettokassa {">"}1 Mdr, soliditet 68 %, transparent grundarledning med 37 % insiderägande och en affärsmodell positionerad mot datacenter, försvar och elektrifiering. AQ Group är ett av de starkast byggda industribolagen på Nasdaq Stockholm.
            </div>
            <div className="bg-[#F9FAFB] border-l-4 border-[#92400E] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>2. Är aktien rimligt värderad?</strong> Nej – aktien är högt värderad snarare än rimligt värderad. P/E om 29x är 42 % over bolagets eget 5-årssnitt och PEG på 3,6x kräver att bolaget levererar nära maximalt i sina optimistiska scenarion för att rättfärdiga nuvarande kurs. Det är en hög värdering för ett högt kvalitetsbolag – och de bästa bolagen förtjänar ett premie – men det nuvarande premiet lämnar lite utrymme för besvikelser. Aktien är en <em>bra aktie i ett bra bolag, men inte en billig aktie</em>.
            </div>
            <div className="bg-[#DBEAFE] border-l-4 border-[#1E3A5F] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>3. Passar bolaget som ett långsiktigt innehav (5–10 år)?</strong> Ja – givet rätt ingångspris. Megatrenderna (datacenter, försvar, elektrifiering) är decennielånga. Bolagets förmåga att allokera kapital disciplinerat och växa via förvärv skapar attraktiv långsiktig avkastningspotential. Den som köper på en stark korrektions-dipp får ett exceptionellt långsiktigt case.
            </div>

            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Slutsats</h3>
            <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#14532D]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#14532D]/10 transition-colors duration-700 pointer-events-none"></div>
              <div className="relative z-10 space-y-5">
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  AQ Group är ett av börsanalys.se:s favorit-case i nordisk industri. Bolaget har en stark affärsmodell, finansiell styrka utan motstycke för sin storlek, en transparent ledning och positionering mitt i tre industriella megatrender. Det finns ingenting fundamentalt fel med bolaget.
                </p>
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  Problemet är priset. P/E om 29x – 42 % over historiskt snitt – prisar in ett nästan optimistiskt scenario som base case. Om organisk tillväxt missar igen, om mdexx-integration tar längre tid eller om datacenter-ordrar försenas kan kursen komprimeras mot 170–185 kr utan att något strukturellt förändras i bolaget. Det är en nedsida på 14–21 % från nuv. kurs. För den som vill köpa ett exceptionellt bolag till nuvarande premievärdering: det är möjligt, men komfort-köpet är att invänta bättre ingångspunkt.
                </p>
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  <strong>Vad krävs för att caset ska utvecklas väl:</strong> Organisk tillväxt {">"}6 % under 2026 (helår), mdexx/Riedel uppnår 8 % EBT-mål, datacenter-orderbok växer mot 50+ mEUR och ett värdeskapande förvärv genomförs. <strong>Vad kan försämra caset:</strong> EPS-tillväxt understiger 8 % kombinerat med P/E-kompression mot historisk norm ~20x.
                </p>
              </div>
            </div>

            <div className="bg-[#111827] text-white p-9 my-8 rounded grid grid-cols-1 md:grid-cols-[auto_1fr] gap-9 items-start">
              <div className="font-serif text-[56px] leading-none text-white whitespace-nowrap">BEVAKA</div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Totalpoäng</div>
                  <div className="font-mono text-[14px] text-[#FDE047]">30 / 40 · Rating 0,75</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Målpris (base–bull)</div>
                  <div className="font-mono text-[14px] text-[#FDE047]">225–260 kr</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Rimligt värde (hist. multipel)</div>
                  <div className="font-mono text-[14px] text-[#FDE047]">~155–185 kr</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Risknivå</div>
                  <div className="font-mono text-[14px] text-[#FDE047]">Låg (4/5)</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Värderingsbedömning</div>
                  <div className="font-mono text-[14px] text-[#FCA5A5]">Hög</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Analysdatum</div>
                  <div className="font-mono text-[14px] text-[#FDE047]">23 april 2026</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FEE2E2] border-l-4 border-[#B91C1C] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>Vad krävs för KÖP?</strong> En kurs under ~175–185 kr (P/E ~21–23x på 2026e EPS), <em>eller</em> att EPS-tillväxten accelererar mot 12–15 % per år och skapar en ny EPS-baslinje som motiverar nuvarande multipel.
            </div>

            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Vad ska investeraren bevaka framåt?</h3>
            <div className="my-5 space-y-0">
              {[
                { num: "01", title: "Organisk tillväxt Q2–Q3 2026", text: "Håller 6 %+ nivån från Q1 2026, eller var det ett engångsmönster? Organisk tillväxt mot 8–10 % är det enskilt viktigaste argumentet för att hålla premievärderingen." },
                { num: "02", title: "mdexx/Riedel EBT-marginalmålet 2026", text: "Bolaget siktar på 8 % EBT för de förvärvade bolagen under 2026. Om de når detta mål elimineras den enda strukturella marginalbelastningen och totalmarginalen kan expandera mot 9,5–10 %." },
                { num: "03", title: "Datacenter-orderbokens utveckling", text: "Pågående LOI om 200 enheter + 15 mEUR levereras i juni 2026. Tillkommer nya orders i H2 2026? Datacenter är den enskilt viktigaste katalysatorn för att rättfärdiga premievärderingen." },
                { num: "04", title: "Nästa förvärv – storlek, pris och segment", text: "Nettokassan >1 Mdr ger handlingsfrihet. Ett välprisat förvärv (helst inom transformatorer eller kablage för försvar) kan addera 5–8 % EPS-tillväxt och är den stora oväntade triggern. Vad betalar AQ och vilken marginal tar förvärvet?" },
                { num: "05", title: "P/E-multipeln vid EPS-miss", text: "Om EPS inte levererar ~10 % tillväxt under 2026 riskerar marknaden att komprimera P/E tillbaka mot 20–22x (historisk norm). Det ger en kurs på 160–180 kr – en 15–25 % nedsida. Bevakas via varje kvartalsrapport." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-3.5 border-b border-slate-200 last:border-b-0 items-start">
                  <div className="font-mono text-[11px] text-slate-400 shrink-0 pt-0.5 w-6">{item.num}</div>
                  <div>
                    <div className="font-semibold text-[#111827] mb-1 text-[14px]">{item.title}</div>
                    <div className="text-[13px] text-slate-600 leading-[1.55]">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

        </section>

        <AnalysisCard>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono text-center">Score: 30 / 40</div>
          <div className="space-y-6">
            {allScores.map(score => (
              <div key={score.key}>
                <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wide">
                  <span>{score.key}</span>
                  <span className="text-[#14532D]">{score.val}/{score.max}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#14532D] rounded-full" 
                    style={{ width: `${(score.val / score.max) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </AnalysisCard>

        <NordnetCTA variant="low" />

        {/* ── X. SCENARIER ── */}
        <section id="scenarier" className="scroll-mt-24 pb-12">
            <SectionHeader number="Sektion X" title="Scenarier: Bull, Base & Bear" accentColor="#14532D" />
            
            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-[13.5px]">
                <thead>
                  <tr className="bg-[#111827] text-white">
                    <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Scenario</th>
                    <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Antaganden</th>
                    <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EPS-estimat</th>
                    <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Multipel</th>
                    <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Riktkurs</th>
                    <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Sannolikhet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-[#DCFCE7] hover:bg-[#DCFCE7]">
                    <td className="p-2.5"><strong className="text-[#14532D]">Bull</strong></td>
                    <td className="p-2.5 text-slate-700">Organisk tillväxt 10%+, mdexx når 8% EBT, datacenter-orderbok skalas till 50+ mEUR, förvärv genomförs</td>
                    <td className="p-2.5 text-right text-[#92400E]">10,00 kr</td>
                    <td className="p-2.5 text-right text-[#92400E]">29x</td>
                    <td className="p-2.5 text-right text-[#14532D]"><strong>290 kr</strong></td>
                    <td className="p-2.5 text-right text-slate-700">~20%</td>
                  </tr>
                  <tr className="bg-[#FEF3C7] hover:bg-[#FEF3C7]">
                    <td className="p-2.5"><strong className="text-[#92400E]">Base</strong></td>
                    <td className="p-2.5 text-slate-700">Organisk tillväxt 5–7%, mdexx förbättras gradvis, datacenter-leverans juni 2026, 1–2 mindre förvärv</td>
                    <td className="p-2.5 text-right text-[#92400E]">8,18 kr</td>
                    <td className="p-2.5 text-right text-[#92400E]">29x</td>
                    <td className="p-2.5 text-right text-slate-700"><strong>240 kr</strong></td>
                    <td className="p-2.5 text-right text-slate-700">~60%</td>
                  </tr>
                  <tr className="bg-[#FEE2E2] hover:bg-[#FEE2E2]">
                    <td className="p-2.5"><strong className="text-[#B91C1C]">Bear</strong></td>
                    <td className="p-2.5 text-slate-700">Europeisk recession, mdexx integrationsproblem, datacenter-ordrar försenas, P/E-kompression</td>
                    <td className="p-2.5 text-right text-[#B91C1C] font-semibold">6,80 kr</td>
                    <td className="p-2.5 text-right text-[#B91C1C] font-semibold">25x</td>
                    <td className="p-2.5 text-right text-[#B91C1C] font-semibold"><strong>170 kr</strong></td>
                    <td className="p-2.5 text-right text-slate-700">~20%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-5">
              <div className="p-6 rounded-[2rem] border-t-4 border-[#14532D] bg-[#DCFCE7] relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.2em] font-medium mb-1.5 text-[#14532D]">Bull Case · 20%</div>
                <div className="font-serif text-[30px] text-[#111827] mb-1 leading-none">290 kr</div>
                <div className="font-mono text-[9.5px] text-slate-500 mb-2.5">+35% från nuv. kurs</div>
                <div className="text-[13px] text-slate-700 leading-[1.6]">Kräver att AQ levererar organisk tillväxt nära 10 %-målet, att mdexx/Riedel når AQ-marginalmålet, och att datacenter-orderboken skalas kraftigt under H2 2026. P/E om 29x håller med stöd av EPS 10 kr och fortsatt institutionell re-rating. Ett strategiskt förvärv av transformatortillverkare i USA eller Asien kan vara katalysatorn.</div>
              </div>
              <div className="p-6 rounded-[2rem] border-t-4 border-[#92400E] bg-[#FEF3C7] relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.2em] font-medium mb-1.5 text-[#92400E]">Base Case · 60% (mest sannolikt)</div>
                <div className="font-serif text-[30px] text-[#111827] mb-1 leading-none">240 kr</div>
                <div className="font-mono text-[9.5px] text-slate-500 mb-2.5">+12% från nuv. kurs</div>
                <div className="text-[13px] text-slate-700 leading-[1.6]">Organisk tillväxt 5–7 %, mdexx-integrationen fortlöper planerat, datacenter-leverans genomförs i tid och 1–2 selektiva förvärv genomförs. EPS 8,18 kr och P/E ~29x ger en kurs ~237–240 kr. Utdelningen höjs mot 1,96 kr. Aktien rör sig gradvis mot 235–250 kr inom 12 månader.</div>
              </div>
              <div className="p-6 rounded-[2rem] border-t-4 border-[#B91C1C] bg-[#FEE2E2] relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.2em] font-medium mb-1.5 text-[#B91C1C]">Bear Case · 20%</div>
                <div className="font-serif text-[30px] text-[#111827] mb-1 leading-none">170 kr</div>
                <div className="font-mono text-[9.5px] text-slate-500 mb-2.5">−21% från nuv. kurs</div>
                <div className="text-[13px] text-slate-700 leading-[1.6]">Europeisk industrirecession kombineras med mdexx-integrationssvårigheter. Datacenter-orders försenas pga teknikproblem. EPS faller mot 6,80 kr och marknaden komprimerar P/E mot historisk norm ~25x. Bear case visar 21 % nedsida – hanterbar men smärtsam. Nettokassan begränsar nedssidan strukturellt.</div>
              </div>
            </div>

            <div className="my-5">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate-400 mb-3">Sannolikhetsviktat värde: 0,20×290 + 0,60×240 + 0,20×170 = 242 kr (+13% från nuv.)</div>
              <div className="flex items-center gap-2.5 mb-2"><div className="font-mono text-[10.5px] text-slate-500 w-[68px] text-right shrink-0">Bull 290</div><div className="flex-1 h-[22px] bg-slate-50 rounded-sm overflow-hidden relative"><div className="h-full flex items-center justify-end pr-2 font-mono text-[10.5px] text-white font-medium rounded-sm bg-[#14532D]" style={{width:'67%'}}>290 kr</div></div></div>
              <div className="flex items-center gap-2.5 mb-2"><div className="font-mono text-[10.5px] text-slate-500 w-[68px] text-right shrink-0">Nuv. 214</div><div className="flex-1 h-[22px] bg-slate-50 rounded-sm overflow-hidden relative"><div className="h-full flex items-center justify-end pr-2 font-mono text-[10.5px] text-white font-medium rounded-sm bg-slate-500" style={{width:'49%'}}>214 kr</div></div></div>
              <div className="flex items-center gap-2.5 mb-2"><div className="font-mono text-[10.5px] text-slate-500 w-[68px] text-right shrink-0">Base 240</div><div className="flex-1 h-[22px] bg-slate-50 rounded-sm overflow-hidden relative"><div className="h-full flex items-center justify-end pr-2 font-mono text-[10.5px] text-white font-medium rounded-sm bg-[#92400E]" style={{width:'55%'}}>240 kr</div></div></div>
              <div className="flex items-center gap-2.5 mb-2"><div className="font-mono text-[10.5px] text-slate-500 w-[68px] text-right shrink-0">Viktat 242</div><div className="flex-1 h-[22px] bg-slate-50 rounded-sm overflow-hidden relative"><div className="h-full flex items-center justify-end pr-2 font-mono text-[10.5px] text-white font-medium rounded-sm bg-[#92400E]/70" style={{width:'56%'}}>242 kr</div></div></div>
              <div className="flex items-center gap-2.5 mb-2"><div className="font-mono text-[10.5px] text-slate-500 w-[68px] text-right shrink-0">Bear 170</div><div className="flex-1 h-[22px] bg-slate-50 rounded-sm overflow-hidden relative"><div className="h-full flex items-center justify-end pr-2 font-mono text-[10.5px] text-white font-medium rounded-sm bg-[#B91C1C]" style={{width:'39%'}}>170 kr</div></div></div>
            </div>

            <div className="bg-[#F9FAFB] border-l-4 border-[#92400E] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>Bull-trigger att bevaka:</strong> Accelererande organisk tillväxt {">"}8 % i Q2–Q3 2026 + nya datacenter-kontrakt {">"}20 mEUR. <br/>
              <strong>Bear-trigger att bevaka:</strong> EBIT-marginal under 8,5 % i två kvartal i rad + inga nya förvärv trots stagnerad organisk tillväxt.
            </div>

        </section>

        <AnalysisDisclaimer />
        
        <div className="pt-12 border-t border-slate-200">
            {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        </div>

      </div>
    </div>
  );
}
