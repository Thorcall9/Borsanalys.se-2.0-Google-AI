import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Users,
  Globe,
  ShoppingBag,
  Trophy,
  Gift,
  AlertTriangle,
  Scale,
  TrendingDown
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from "recharts";
import AdUnit from "../AdUnit";
import NextAnalysisButton from "./NextAnalysisButton";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import EditorialCallout from "./EditorialCallout";
import EditorialReadNext from "./EditorialReadNext";
import AnalysisTopAd from "../ads/AnalysisTopAd";
import { AnalysisData } from "../../data/analyses";

const T = {
  ink:     "#0F172A",
  sub:     "#475569",
  muted:   "#94A3B8",
  border:  "#E2E8F0",
  bg:      "#F8FAFC",
  surface: "#FFFFFF",
  accent:  "#1E40AF", // Deep Blue
  accentL: "#EFF6FF",
  red:     "#E11D48", // Craft Red
  redL:    "#FFF1F2",
  green:   "#10B981",
  greenL:  "#ECFDF5",
  gold:    "#B45309",
  goldL:   "#FFFBEB",
  shadow:  "0 1px 3px rgba(15,23,42,0.06),0 4px 16px rgba(15,23,42,0.06)",
  shadowMd:"0 4px 24px rgba(15,23,42,0.10)",
};

const revenueData = [
  {ar:"2021", v:6720},
  {ar:"2022", v:8819},
  {ar:"2023", v:9529},
  {ar:"2024", v:9529}, // Corrected 2024 to 9529 as per user text (note: user text said 2024 was 9529, 2025 was 10019)
  {ar:"2025", v:10019},
  {ar:"2026e", v:10950, e:true},
  {ar:"2027e", v:12100, e:true},
];

const marginData = [
  {ar:"2021", v:14.9},
  {ar:"2022", v:17.1},
  {ar:"2023", v:13.2},
  {ar:"2024", v:13.2},
  {ar:"2025", v:11.4},
  {ar:"2026e", v:12.8, e:true},
  {ar:"2027e", v:14.2, e:true},
];

const valuationData = [
  {ar:"2024", pe:14.64},
  {ar:"2025", pe:19.42},
  {ar:"Nu", pe:16.85},
  {ar:"2026e", pe:13.35, e:true},
  {ar:"2027e", pe:10.57, e:true},
];

const allScores = [
  { key: "Affärsmodell", val: 4, max: 5 },
  { key: "Strategisk Moat", val: 3, max: 5 },
  { key: "Finansiell Kvalitet", val: 4, max: 5 },
  { key: "Värdering", val: 4, max: 5 },
  { key: "Tillväxtutsikter", val: 4, max: 5 },
  { key: "Riskprofil", val: 3, max: 5 },
  { key: "ESG & Makro", val: 3, max: 5 },
  { key: "AI-observationer", val: 4, max: 5 },
];

function FadeIn({children,delay=0}){
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay+30);return()=>clearTimeout(t);},[delay]);
  return <div style={{opacity:v?1:0,transform:v?"none":"translateY(8px)",transition:"all 0.35s ease"}}>{children}</div>;
}

function Card({children, mb=0, className=""}: any){
  const hasBg = className.includes('bg-');
  return (
    <div 
      className={`${hasBg ? '' : 'bg-white'} border border-slate-200 rounded-2xl shadow-sm mb-5 p-4 md:p-6 ${className}`} 
      style={{marginBottom:mb}}
    >
      {children}
    </div>
  );
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

interface NewWaveDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function NewWaveDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: NewWaveDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16 overflow-x-hidden">
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#1E40AF] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#1E40AF] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">KÖP</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                  New Wave Group AB — April 2026
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">NWG B</span>
                <span className="text-sm font-medium opacity-90">Sällanköpsvaror • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#1E40AF] border-white' 
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
            <span className="text-sm font-bold tracking-tight">3.6 / 5.0 – Rating 72.5%</span>
          </div>
        </div>
      </div>

      <AnalysisTopAd />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        
        {/* 2. WARNING BOX */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-4 text-amber-900">
          <AlertTriangle size={24} className="shrink-0 mt-1" />
          <p className="text-sm font-medium leading-relaxed">
            <strong>Intressekonflikt:</strong> Analysförfattaren har en position i det analyserade bolaget. Analysen är inte finansiell rådgivning.
          </p>
        </div>

        {/* 3. KEY METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
            <div className="text-2xl font-black text-slate-900">99,60 kr</div>
            <span className="text-xs text-slate-500 mt-1 block">Nasdaq Stockholm</span>
          </Card>
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
            <div className="text-2xl font-black text-slate-900">13,2 Mdr</div>
            <span className="text-xs text-slate-500 mt-1 block">Large Cap</span>
          </Card>
          <Card className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal (trailing)</span>
            <div className="text-2xl font-black text-slate-900">16,85</div>
            <span className="text-xs text-slate-500 mt-1 block">2026e: 13,3x | 2027e: 10,6x</span>
          </Card>
          <Card className="p-6 border-2 border-primary/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs (Base)</span>
            <div className="text-2xl font-black text-primary">130-145 kr</div>
            <span className="text-xs text-green-600 font-bold mt-1 block">~38% Uppsida</span>
          </Card>
        </div>

        {/* I. FÖRETAGSÖVERSIKT */}
        <FadeIn>
          <Card>
            <SectionLabel number="I" title="Företagsöversikt" />
            <div className="grid grid-cols-1 md:grid-cols-[1.6fr,1fr] gap-10">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-sm">
                  New Wave Group är en svensk varumärkeskoncern som utvecklar, förvärvar och distribuerar produkter inom tre huvudsegment: <strong>Företag</strong>, <strong>Sport & Fritid</strong> samt <strong>Gåvor & Heminredning</strong>. Affärsidén är att skapa synergier genom samordning av design, inköp, marknadsföring, lager och distribution, samtidigt som produkterna säljs både via profilmarknaden och detaljhandeln för att ge riskspridning. Profilkanalen stod även 2025 för cirka två tredjedelar av omsättningen och detaljhandeln för ungefär en tredjedel.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Bolaget omsatte 10 019 MSEK under 2025, för första gången över 10 miljarder kronor. Sverige stod för 20% av omsättningen, Nordamerika för 24%, Benelux för 15%, Norden exklusive Sverige för 11%, resterande Europa för 25% och övriga länder för 6%. Det gör NWG till ett tydligt internationellt bolag, även om Sverige och USA fortsatt är de viktigaste enskilda marknaderna.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Varumärkesportföljen är bred och inkluderar bland annat Clique, Craft, Cutter & Buck, Jobman, ProJob, Kosta Boda, Orrefors, Sagaform, Tenson och Ahead. Det ger både riskspridning och korsförsäljningsmöjligheter. Samtidigt skapar det viss komplexitet i styrning och kapitalbindning.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Ledningen är en tydlig styrka. Torsten Jansson är grundare, VD och storägare, vilket ger ett starkt "skin in the game". Ägarbilden är koncentrerad: de tio största ägarna kontrollerade 61% av kapitalet och 89% av rösterna vid utgången av 2025. Det stärker långsiktigheten, även om det samtidigt begränsar minoritetsägares inflytande.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Bolaget hade ett medelantal anställda på 2 603 under 2025, upp från 2 451 året innan. Det speglar både tillväxt, investeringar och förvärv.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning Affärsmodell: 4/5</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Affärsmodellen är beprövad, lönsam och skalbar, men inte "perfekt". Den är mer kapitalintensiv än många andra kvalitetsbolag, eftersom lager, sourcing och distribution kräver kapital. Men den har visat att den fungerar över tid och i svag marknad.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">VD</div>
                    <div className="text-sm font-bold">Torsten Jansson</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Ägarbild</div>
                    <div className="text-sm font-bold">De 10 största ägarna kontrollerar 89% av rösterna</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 h-fit">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Omsättning per marknad (2025)</h4>
                  <div className="space-y-4 w-full">
                    {[
                      { l: "Europa (exkl. Sve/Ben)", v: "25%", c: T.accent },
                      { l: "Nordamerika", v: "24%", c: T.green },
                      { l: "Sverige", v: "20%", c: T.gold },
                      { l: "Benelux", v: "15%", c: T.red },
                      { l: "Övriga Norden", v: "11%", c: T.muted },
                      { l: "Övriga Världen", v: "6%", c: "#CBD5E1" }
                    ].map((m, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{m.l}</span>
                          <span>{m.v}</span>
                        </div>
                        <div className="h-1 w-full bg-white rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: m.v, backgroundColor: m.c }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* II. STRATEGISK ANALYS & MOAT */}
        <FadeIn delay={100}>
          <Card>
            <SectionLabel number="II" title="Strategisk Analys & Moat" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  New Wave verkar i en stor, fragmenterad marknad för profilkläder, teamwear och varumärkesdriven livsstilsförsäljning. Bolagets styrka ligger inte i en enskild "supermoat", utan i kombinationen av varumärken, distributionsnärvaro, inköpsskala och lokal försäljningsorganisation.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Det viktigaste benet är profilverksamheten där NWG är en tydlig <strong>"one-stop-shop"</strong> som erbjuder allt från yrkeskläder till presentreklam i samma ekosystem. Skalfördelar byggs via egna inköpskontor i Kina, Bangladesh, Vietnam, Indien och Egypten, vilket ger ett konkret kostnadsövertag mot mindre aktörer.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Moaten förstärktes 2025 genom förvärvet av <strong>Cotton Classics</strong> (580 MSEK). Förvärvet stärker NWG i Tyskland, Österrike och Tjeckien. Under sept–dec 2025 bidrog Cotton Classics med 429 MSEK i omsättning och 34 MSEK i rörelseresultat.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning Strategisk Moat: 3/5</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    NWG har en stabil och verklig konkurrensfördel i bredd, skala och execution, men saknar nätverkseffekter eller extrem inlåsning. Fördelen ligger i att vara den mest effektiva distributören.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <h4 className="text-[10px] font-black text-emerald-900 uppercase mb-3 tracking-widest">Styrkor</h4>
                  <ul className="text-xs text-emerald-800 space-y-1.5 list-disc pl-4">
                    <li>Stark varumärkesportfölj</li>
                    <li>Hög distributionskapacitet</li>
                    <li>Lokal närvaro i 20 länder</li>
                    <li>Stabil bruttomarginal</li>
                    <li>Grundarledd kultur</li>
                  </ul>
                </div>
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl">
                  <h4 className="text-[10px] font-black text-rose-900 uppercase mb-3 tracking-widest">Svagheter</h4>
                  <ul className="text-xs text-rose-800 space-y-1.5 list-disc pl-4">
                    <li>Höga lager (kapitalbindning)</li>
                    <li>Låg strukturell switching cost</li>
                    <li>Komplexitet efter förvärv</li>
                  </ul>
                </div>
                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <h4 className="text-[10px] font-black text-indigo-900 uppercase mb-3 tracking-widest">Möjligheter</h4>
                  <ul className="text-xs text-indigo-800 space-y-1.5 list-disc pl-4">
                    <li>Cotton Classics-synergier</li>
                    <li>Craft-expansion (skor/team)</li>
                    <li>Nya lager i Irland och USA</li>
                  </ul>
                </div>
                <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase mb-3 tracking-widest">Hot</h4>
                  <ul className="text-xs text-slate-800 space-y-1.5 list-disc pl-4">
                    <li>Fortsatt svag retail</li>
                    <li>Tullar & handelshinder</li>
                    <li>Valutamotvind</li>
                    <li>Integrationsrisker</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* III. FINANSIELL ANALYS */}
        <FadeIn delay={200}>
          <Card>
            <SectionLabel number="III" title="Finansiell Analys" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Omsättning Trend (MSEK)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <Tooltip content={<ChartTip unit=" MSEK" />} />
                      <Bar dataKey="v" name="Omsättning" fill={T.accent} radius={[4, 4, 0, 0]}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.e ? T.muted : T.accent} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Rörelsemarginal Trend (%)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={marginData}>
                      <defs>
                        <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={T.red} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={T.red} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[8, 18]} />
                      <Tooltip content={<ChartTip unit="%" />} />
                      <Area type="monotone" dataKey="v" name="Marginal" stroke={T.red} strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Resultat & Tillväxt</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      2025 var ett blandat år. Omsättningen nådde rekordnivån <strong>10 019 MSEK</strong> (5,1% tillväxt). I lokala valutor var tillväxten 9,5%, varav 5,0% organiskt. Valutaeffekter slog negativt med -413 MSEK. Rörelseresultatet sjönk till 1 141 MSEK, motsvarande en rörelsemarginal på 11,4%, belastat av en engångskostnad om 66 MSEK relaterad till PPP-frågan i USA. Den rapporterade bruttomarginalen på 49,0% visar samtidigt att kärnaffären fortsatt är robust trots förvärv, valutaeffekter och svag marknad.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Balansräkning & Skuld</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Nettoskulden steg till <strong>3 082 MSEK</strong> från 1 804 MSEK. En del av ökningen kommer från Cotton Classics och strategisk lageruppbyggnad. Soliditeten föll till 53,0% (mål {'>'}40%). NWG säkrade en kreditram på 3,8 miljarder SEK vid årsskiftet, vilket ger finansiell flexibilitet.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Kassaflöde & Investeringar</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Kassaflödet från den löpande verksamheten uppgick till 653 MSEK (1 278 MSEK 2024) och tyngdes av lageruppbyggnad. Med en Capex på cirka 644 MSEK var det fria kassaflödet nära noll, men pressades av strategisk expansion snarare än strukturella problem i kärnaffären.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning Finansiell Kvalitet: 4/5</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    NWG är tydligt lönsamt med ROE och ROCE på 11,15%, trots ett investeringsintensivt år. Balansräkningen är solid och kassaflödet belastas av tillväxtfrämjande lager snarare än sviktande affärer.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { l: "ROE", v: "11.15%" },
                    { l: "Utdelning", v: "3.00 kr" },
                    { l: "ROIC", v: "8.0%" },
                    { l: "Räntetäckning", v: "9.7x" }
                  ].map((m, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{m.l}</div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          <AdUnit slot="7332946752" />
          
          {/* RELATED ANALYSIS CALLOUT */}
          {data.relatedAnalysis && <EditorialCallout {...data.relatedAnalysis} />}

        {/* IV. VÄRDERING & JÄMFÖRELSE */}
        <FadeIn delay={300}>
          <Card>
            <SectionLabel number="IV" title="Värdering & Jämförelse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  På nuvarande kurs 99,60 SEK handlas aktien till en tydlig skillnad mellan trailing och framåtblickande värdering. Det rapporterade 2025-resultatet framstår som ett mellanår, medan marknaden enligt våra estimat räknar med tydlig återhämtning 2027 (P/E 10,6x).
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  Direktavkastningen på 3,37% (3,00 kr utdelning) indikerar en balanserad kapitalallokering då den föreslagna utdelningen motsvarar 51% av nettoresultatet, trots NWG:s nuvarande investeringsfas.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning Värdering: 4/5</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aktien är inte ett uppenbart vrakfynd på historisk vinst, men ser attraktiv ut på normaliserad intjäning. Det är en klassisk "normaliseringsvärdering", inte en "deep value"-värdering.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trailing P/E (2025)</span>
                    <span className="text-lg font-black">16,85x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Forward P/E (2026e)</span>
                    <span className="text-lg font-black">13,35x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Forward P/E (2027e)</span>
                    <span className="text-lg font-black">10,57x</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 text-center">P/E-Multipel Historik & Prognos</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={valuationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="ar" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 25]} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="pe" name="P/E-tal" fill={T.accent} radius={[4, 4, 0, 0]}>
                      {valuationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.e ? T.green : entry.ar === "Nu" ? T.gold : T.accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* V & VI: TILLVÄXT & RISK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <SectionLabel number="V" title="Tillväxtmotorer & Triggers" />
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                Den främsta tillväxtmotorn de kommande åren är <strong>Cotton Classics</strong>. Förvärvet stärker NWG i Centraleuropa, särskilt i Tyskland, Österrike och Tjeckien, och breddar distributionsnätet materiellt. Att det bidrog med 429 MSEK i omsättning på bara fyra månader visar på dess betydelse för den framtida skalan.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Craft Shoe Expansion</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Nytt skoerbjudande för inomhussporter (H2 2026/H1 2027) öppnar en större och mer relevant produktkategori för föreningar.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Lager-automation</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Nya lager i Irland och USA 2026 stärker servicenivån. Fortsatt automation ger operationell hävstång vid ökad volym.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Marknadsläge</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">När efterfrågan i retail förbättras kan omsättningsökningen slå relativt snabbt igenom i EBIT tack vare operationell hävstång i den befintliga distributionsplattformen.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="text-[10px] font-black text-indigo-600 uppercase mb-2">Bedömning Tillväxtutsikter: 4/5</div>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  Det finns flera konkreta och trovärdiga tillväxtdrivare. Vi stannar på 4/5 då marknaden fortfarande är osäker och execution i USA-expansionen är kritisk för att nå 5/5.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <SectionLabel number="VI" title="Riskprofil" />
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                NWG är inget högriskbolag i klassisk mening, men risknivån har ökat i takt med expansionen. Den största risken är <strong>valuta</strong>: under 2025 påverkades omsättningen negativt med -413 MSEK och eget kapital med hela -709 MSEK.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Skuldsättning & Kapitalbindning</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Nettoskuld över 3 miljarder kronor lämnar mindre utrymme för fel än tidigare. Det som bör bevakas är om rörelsekapitalet förblir högt samtidigt som marginalåterhämtningen uteblir, eftersom det då skulle sätta större press på balansräkningen.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Integrationsrisk & Makro</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Cotton Classics-integrationen kräver god execution. USA:s tullpolitik och svag retail är externa hot mot tillväxten.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-[10px] font-black text-orange-600 uppercase mb-2">Risknivå: Medel | Risk-Score: 3/5</div>
                <p className="text-xs text-orange-900 leading-relaxed">
                  Risken är fortsatt hanterbar tack vare en soliditet på 53% och en räntetäckningsgrad på 9,7x. Samtidigt är den finansiella flexibiliteten lägre än tidigare, vilket motiverar fortsatt bevakning.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Ytterligare Riskfaktorer</h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>USA:s tull- och handelspolitik</li>
                  <li>Kostnadsöverdrag i ERP/systemprojekt</li>
                  <li>Fortsatt hög investeringstakt</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <AdUnit slot="1293847561" />

        {/* VII & VIII: ESG & AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <SectionLabel number="VII" title="ESG & Makro" />
            <div className="space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                NWG är exponerat mot cykliska makrofaktorer såsom konsumentefterfrågan, företagsbudgetar, valutor och handelspolitik. Kombinationen av profil och retail dämpar dock svängningarna jämfört med ett renodlat konsumentbolag, eftersom profilaffären generellt är mer stabil än detaljhandeln.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                På ESG-sidan är den egna sourcingorganisationen och den lokala CSR-personalen en styrka, eftersom det ger bättre kontroll över leverantörsvillkor och kvalitet än om bolaget enbart arbetat via mellanhänder. Det gör NWG till ett neutralt till svagt positivt ESG-case, snarare än ett bolag med tydlig hållbarhetspremie.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning ESG & Makro: 3/5</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Inget bolag som får premiumvärdering på ESG, men heller ett bolag utan uppenbara hållbarhetsröda flaggor.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <SectionLabel number="VIII" title="AI-observationer 🔍" />
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Bruttomarginalen</strong> är den viktigaste signalen i caset. Stabiliteten på 49,0% under 2025 visar att kärnaffären är robustare än vad EBIT-fallet först antyder. Vi ser därför 2025 som ett övergångsår, där engångskostnader, ERP-satsningar och logistikinvesteringar tillfälligt maskerar den underliggande intjäningsförmågan.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Det finns en tydlig <strong>värderingsasymmetri</strong>: aktien ser rimlig ut på historisk vinst, men betydligt mer attraktiv på 2027e EPS om marginalerna ens halvvägs normaliseras. Den viktigaste risken att bevaka framåt är skuldutvecklingen i kombination med rörelsekapitalet.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Bedömning AI-observationer: 4/5</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Ingen tydlig röd flagg i datan, men en möjlig analytisk fördel i att marknaden kan överskatta hur permanent marginalfallet faktiskt är.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* IX: SAMMANFATTNING & BESLUT */}
        <FadeIn delay={400}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-[#1E40AF] text-white p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10">
                  <SectionLabel number="IX" title={<span className="text-white">Investeringsbeslut</span>} />
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-white/10 rounded-xl">
                        <h5 className="text-[10px] font-bold text-white/60 uppercase mb-2">Är NWG ett kvalitetsbolag?</h5>
                        <p className="text-sm text-white/90">Ja. Founder-led med stark kultur, tydlig position och stabil bruttomarginal.</p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-xl">
                        <h5 className="text-[10px] font-bold text-white/60 uppercase mb-2">Rimligt värderat?</h5>
                        <p className="text-sm text-white/90">Ja. På rapporterad 2025-vinst är värderingen rimlig, men på 2026–2027 års estimat framstår aktien som klart mer attraktiv.</p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-xl">
                        <h5 className="text-[10px] font-bold text-white/60 uppercase mb-2">Långsiktigt innehav?</h5>
                        <p className="text-sm text-white/90">Ja, för den investerare som accepterar medelcyklisk exponering och kan ha ett perspektiv på 5–10 år.</p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-white/90 leading-relaxed italic">
                      "Min slutsats är att NWG just nu är ett kvalitetsbolag i en tillfälligt pressad fas. Marknaden har rätt i att 2025 var ett svagare år, men riskerar att dra för långtgående slutsatser om bolagets långsiktiga intjäningsförmåga. När förvärvet av Cotton Classics, logistikinvesteringarna och ERP-satsningen börjar ge effekt, ser vinstbanan bättre ut än de rapporterade 2025-siffrorna antyder."
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-white/20">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Slutsats</div>
                        <div className="text-3xl font-black">KÖP</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Målpris</div>
                        <div className="text-3xl font-black">130–145 kr</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Potential</div>
                        <div className="text-3xl font-black">+38%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <Target size={240} />
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono text-center">Score: 29 / 40</div>
                <div className="space-y-6">
                  {allScores.map(score => (
                    <div key={score.key}>
                      <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wide">
                        <span>{score.key}</span>
                        <span className="text-primary">{score.val}/{score.max}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(score.val / score.max) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </FadeIn>

        {data.nextSteps && (
          <EditorialReadNext recommendations={data.nextSteps} />
        )}

        {/* X: SCENARIER */}
        <FadeIn delay={500}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Bear Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">75–85 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Retailmarknaden förblir svag, valuta fortsätter slå mot rapporterade siffror, integrationen av Cotton Classics blir tyngre än väntat och lager- samt ERP-satsningarna tar längre tid att ge effekt. Då kan vinståterhämtningen skjutas fram och värderingen pressas ytterligare.</p>
            </div>
            <div className="p-8 bg-white border-4 border-primary rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Base Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">130–145 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Omsättningen växer vidare i god takt, Cotton Classics levererar enligt plan och marginalerna förbättras successivt under 2026–2027. Ett 2027e EPS på 9,41 SEK visar sig då vara rimligt, samtidigt som marknaden värderar bolaget till omkring 14–15x vinsten.</p>
              <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
                <Target size={120} />
              </div>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Bull Case</span>
              </div>
              <div className="text-4xl font-black mb-2 tracking-tighter">160–180 kr</div>
              <p className="text-xs text-slate-500 leading-relaxed">Cotton Classics integreras snabbare än väntat, Crafts expansion inom teamwear och skor får starkt genomslag, ERP-kostnaderna klingar av och marknaden förbättras från H2 2026. EBIT-marginalen närmar sig då 15% snabbare än marknaden räknar med.</p>
            </div>
          </div>
        </FadeIn>

        {/* BOTTOM AD & NAVIGATION */}
        <div className="space-y-12">
          <AdUnit slot="8273645192" />
          <NextAnalysisButton analysis={nextAnalysis} />
          <AnalysisDisclaimer theme="light" />
        </div>
      </div>
    </div>
  );
}
