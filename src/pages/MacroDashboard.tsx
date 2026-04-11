import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Globe, Landmark, 
  Activity, ArrowUpRight, ArrowDownRight, 
  Zap, Sparkles, Loader2, Lock,
  Newspaper, Gauge, Target
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface MacroData {
  value: number;
  trend: "up" | "down" | "flat";
  updatedAt: string;
  source?: string;
  isStale?: boolean;
}

const FALLBACK_DATA: Record<string, MacroData> = {
  US10Y: { value: 4.29, trend: "flat", updatedAt: new Date().toISOString() },
  SE10Y: { value: 2.85, trend: "down", updatedAt: new Date().toISOString() },
  USDSEK: { value: 9.22, trend: "down", updatedAt: new Date().toISOString() },
  EURSEK: { value: 10.95, trend: "down", updatedAt: new Date().toISOString() },
  OMX30: { value: 3109.90, trend: "up", updatedAt: new Date().toISOString() },
  Inflation: { value: 1.6, trend: "down", updatedAt: new Date().toISOString() }
};

const MACRO_METRICS = ["US10Y", "SE10Y", "USDSEK", "EURSEK", "OMX30", "Inflation"];

const MACRO_METADATA: Record<string, { category: string, title: string, description: string, impact: (val: number) => string }> = {
  US10Y: {
    category: "RÄNTOR",
    title: "US 10Y Treasury Yield",
    description: "USA:s 10-åriga statsobligationsränta sätter tonen för den globala ekonomin och riskaptiten.",
    impact: (val) => `Nuvarande nivå på ${val.toFixed(2)}% påverkar värderingar på tillväxtaktier och ökar avavkastningskravet globalt.`
  },
  SE10Y: {
    category: "RÄNTOR",
    title: "Svensk 10Y Statsobligation",
    description: "Sveriges 10-åriga statsobligationsränta påverkar bolån och företagens lånekostnader direkt.",
    impact: (val) => `Nivån runt ${val.toFixed(2)}% speglar ränteförväntningar, vilket dämpar fastighetssektorn men gynnar räntebärande placeringar.`
  },
  USDSEK: {
    category: "VALUTOR",
    title: "USD/SEK",
    description: "Viktigt för exportbolag som Volvo, Ericsson och NVIDIA-exponerade portföljer.",
    impact: (val) => `En kurs på ${val.toFixed(2)} kr påverkar exportbolagens vinster vid omräkning från dollar.`
  },
  EURSEK: {
    category: "VALUTOR",
    title: "EUR/SEK",
    description: "Euron påverkar handeln inom Europa och svenska exportbolags marginaler.",
    impact: (val) => `Kronans nivå mot euron (${val.toFixed(2)}) är avgörande för svenska exportbolags konkurrenskraft i Europa.`
  },
  OMX30: {
    category: "INDEX",
    title: "OMXS30",
    description: "De 30 mest omsatta aktierna på Nasdaq Stockholm.",
    impact: (val) => `Indexet vid ${val.toLocaleString()} speglar det generella sentimentet för Sveriges största bolag.`
  },
  Inflation: {
    category: "INFLATION",
    title: "Inflation (KPIF)",
    description: "KPIF (1,6%) styr Riksbankens räntebeslut medan KPI (0,6%) speglar effekten på hushållen.",
    impact: (val) => `Nivån på ${val.toFixed(1)}% (KPIF) innebär att vi nu ligger under inflationsmålet, vilket öppnar för snabbare räntesänkningar.`
  }
};

import FearAndGreedGauge from "../components/FearAndGreedGauge";

interface MarketEvent {
  id: string;
  title: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  whyItMatters: string;
  swedishCompanies: string;
  usCompanies: string;
  winners: string;
  aiInsight?: string;
}

const INITIAL_EVENTS: MarketEvent[] = [
  {
    id: "1",
    title: "Starkare Krona Utmanar Export, Gynnar Import",
    impact: "neutral",
    description: "En USDSEK-kurs på 9.22 representerar en signifikant förstärkning av den svenska kronan jämfört med tidigare år. Detta kan dels tolkas som ett tecken på förbättrad global riskaptit, där investerare söker sig bort från säkra hamnar som USD, dels som en indikation på en stabilare svensk ekonomi. Förändringen påverkar lönsamheten för svenska företag beroende på deras exponering mot utländska marknader och valutarörelser.",
    whyItMatters: "En starkare krona minskar värdet på utländska intäkter vid omräkning till SEK, vilket pressar marginalerna för Sveriges stora exportbolag. Samtidigt dämpar det inflationen genom billigare importvaror, vilket ger Riksbanken mer utrymme för räntesänkningar.",
    swedishCompanies: "Exportjättar som Volvo, Atlas Copco och Sandvik påverkas negativt vid omräkning, medan konsumentbolag och importörer som H&M och ICA kan få lägre inköpskostnader.",
    usCompanies: "Amerikanska bolag med stor försäljning i Sverige ser sina intäkter öka i USD-termer, men påverkan är generellt marginell för de största S&P 500-bolagen.",
    winners: "Importberoende bolag, svenska konsumenter och bolag med stora skulder i utländsk valuta som nu blir billigare att serva."
  },
  {
    id: "2",
    title: "Navigering mot en 'Mjuklandning' för Ekonomin",
    impact: "positive",
    description: "Att inflationen (KPIF) nu fallit till 1,6% stärker förhoppningarna om en 'mjuklandning'. Detta indikerar att centralbankernas åtstramning har haft önskad effekt, vilket minskar risken för en kraftig ekonomisk nedgång och banar väg för en mer expansiv räntepolitik.",
    whyItMatters: "En mjuklandning är det ideala scenariot för börsen då det innebär att räntetoppen är passerad utan att bolagsvinsterna kollapsar. Med inflationen under målet skiftar fokus från prisstabilitet till att stödja ekonomisk tillväxt.",
    swedishCompanies: "Hela börsen gynnas generellt, men särskilt investmentbolag som Investor och Kinnevik samt de stora industrivardagarna som drar nytta av en stabil global efterfrågan.",
    usCompanies: "Tekniksektorn och tillväxtbolag (t.ex. Microsoft, Apple, NVIDIA) är de stora vinnarna då lägre inflationsrisk minskar trycket på diskonteringsräntorna.",
    winners: "Tillväxtaktier, småbolag och cykliska sektorer som tidigare pressats av recessionsoro."
  },
  {
    id: "3",
    title: "Ihållande Höga Räntor och Kapitalets Pris",
    impact: "negative",
    description: "Trots att inflationen (KPIF) fallit till 1,6% signalerar US10Y-räntan på 4.29% att kostnaden för kapital förblir betydande globalt. Skillnaden mellan snabbt fallande svensk inflation och ihållande höga amerikanska räntor skapar en komplex miljö för kapitalallokering.",
    whyItMatters: "Higher for longer i USA innebär att den riskfria räntan sätter en hög ribba globalt. För svenska bolag innebär detta en balansgång mellan lägre inhemska lånekostnader och ett högt internationellt avkastningskrav.",
    swedishCompanies: "Fastighetsbolag (ex. Castellum, Balder) gynnas av den lägre svenska inflationen, men pressas av de globala räntenivåerna. De svenska storbankerna ser sitt räntenetto påverkas när styrräntan sänks.",
    usCompanies: "Regionala banker och småbolag i Russell 2000 drabbas hårdast då de ofta har rörliga lån eller behov av frekvent refinansiering.",
    winners: "Banker, bolag med stora nettokassor (t.ex. Evolution, Fortnox) och försäkringsbolag som kan placera sina reserver till högre avkastning."
  }
];

const PHASES = [
  {
    id: 'early_recovery',
    name: 'Tidig återhämtning',
    description: 'Låga räntor, stimulanser börjar bita. Fokus på Småbolag & Cykliskt.',
    timing: 'Vändning uppåt.',
    rotation: 0,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    isCurrent: false
  },
  {
    id: 'expansion',
    name: 'Expansion',
    description: 'Stark tillväxt, bred vinstökning. "All-in" på risk.',
    timing: 'Stark tjurmarknad.',
    rotation: 60,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    isCurrent: false
  },
  {
    id: 'overheating',
    name: 'Överhettning',
    description: 'Hög inflation, aggressiva höjningar. Fokus på Råvaror & Energi.',
    timing: 'Volatiliteten ökar.',
    rotation: 120,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    isCurrent: false
  },
  {
    id: 'late_cycle',
    name: 'Sen cykel',
    description: 'Inflation faller, räntor höga. Fokus på Kvalitet & Kassaflöde.',
    timing: 'Selektiv uppgång.',
    rotation: 180,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    isCurrent: true
  },
  {
    id: 'slowdown',
    name: 'Avmattning',
    description: 'Vinster revideras ned, tillväxt bromsar. Fokus på Defensivt & Utdelning.',
    timing: 'Börsen skakar.',
    rotation: 240,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    isCurrent: false
  },
  {
    id: 'recession',
    name: 'Recession',
    description: 'Negativ tillväxt, räntesänkningar börjar. Fokus på Likviditet (Cash).',
    timing: 'Bottnar mitt i krisen.',
    rotation: 300,
    color: 'text-red-600',
    bg: 'bg-red-600/10',
    isCurrent: false
  }
];

export default function MacroDashboard() {
  const { user, openLoginModal } = useAuth();
  const [events, setEvents] = useState<MarketEvent[]>(INITIAL_EVENTS);
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const currentPhase = PHASES.find(p => p.isCurrent) || PHASES[0];
  const [activePhase, setActivePhase] = useState(currentPhase);
  const [macroData, setMacroData] = useState<Record<string, MacroData>>(FALLBACK_DATA);
  const [loadingMacro, setLoadingMacro] = useState(true);
  const [lastUpdated] = useState<string>(new Date().toLocaleDateString('sv-SE'));
  const [upcomingDates] = useState<{date: string, title: string}[]>([
    { date: "12 April", title: "Räntebesked ECB" },
    { date: "15 April", title: "KPI-siffror Sverige" },
    { date: "25 April", title: "BNP-prognos USA" },
    { date: "01 Maj", title: "Fed Räntebesked" }
  ]);
  const [fearGreed, setFearGreed] = useState<{ value: number, classification: string } | null>(null);
  const [loadingFearGreed, setLoadingFearGreed] = useState(true);

  useEffect(() => {
    const fetchMacroData = async () => {
      try {
        const response = await fetch("/api/macro-data");
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            setMacroData(data);
          }
        }
      } catch (error) {
        console.error("Macro Data Fetch Error:", error);
      } finally {
        setLoadingMacro(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/market-events");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data);
          }
        }
      } catch (error) {
        console.error("Market Events Fetch Error:", error);
      }
    };

    fetchMacroData();
    fetchEvents();
  }, []);

  const refreshData = async () => {
    setLoadingMacro(true);
    try {
      const response = await fetch("/api/macro-data");
      if (response.ok) {
        const data = await response.json();
        setMacroData(data);
      }
    } catch (error) {
      console.error("Manual Refresh Error:", error);
    } finally {
      setTimeout(() => setLoadingMacro(false), 500);
    }
  };

  useEffect(() => {
    const fetchFearGreed = async () => {
      try {
        const response = await fetch("/api/market-sentiment");
        if (response.ok) {
          const data = await response.json();
          if (data.fgi && data.fgi.now) {
            setFearGreed({
              value: data.fgi.now.value,
              classification: data.fgi.now.valueText
            });
          }
        }
      } catch (error) {
        console.error("Fear & Greed Fetch Error:", error);
      } finally {
        setLoadingFearGreed(false);
      }
    };

    fetchFearGreed();
  }, []);

  const getAIInsight = async (event: MarketEvent) => {
    setLoadingAI(event.id);
    try {
      const response = await fetch("/api/ai/event-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: event.title, description: event.description })
      });
      const data = await response.json();
      
      const insight = data.insight || "Kunde inte generera insikt för tillfället.";
      
      setEvents(prev => prev.map(e => 
        e.id === event.id ? { ...e, aiInsight: insight } : e
      ));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingAI(null);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-32 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[1200px] right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute top-[2500px] left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Hero Section */}
      <header className="bg-foreground text-background pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-6">Global Marknadsanalys</div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
              Makro <br />
              <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-xl text-background/90 max-w-2xl font-medium leading-relaxed">
              Få en samlad bild av de globala krafterna som styr marknaden. Vi analyserar räntor, inflation och geopolitik för att ge dig rätt kontext.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Major Events Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter">Stora händelser som påverkar börsen</h2>
                  <p className="text-muted-foreground font-medium mt-2">Aktuella händelser analyserade med AI</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Sparkles size={24} />
                </div>
              </div>

              <div className="space-y-6">
                {events.length > 0 ? (
                  events.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-[2rem] p-8 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full shrink-0 ${
                            event.impact === "positive" ? "bg-emerald-400" : 
                            event.impact === "negative" ? "bg-red-500" : "bg-amber-500"
                          }`} />
                          <h3 className="text-2xl font-black tracking-tighter">{event.title}</h3>
                        </div>
                        {!user && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                              <Lock size={12} />
                              Logga in för djupare AI-insikter
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                              GRATIS
                            </div>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => user ? getAIInsight(event) : openLoginModal()}
                        disabled={loadingAI === event.id}
                        className="flex items-center gap-2 px-6 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50 shrink-0"
                      >
                        {loadingAI === event.id ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Analyserar...
                          </>
                        ) : (
                          <>
                            {user ? <Zap size={14} /> : <Lock size={14} />}
                            {user ? "Få AI-insikt" : "Lås upp analys"}
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                      {event.description}
                    </p>

                    {user ? (
                      <div className="space-y-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} />
                            AI-INSIKT
                          </div>
                        </div>
                        <div className="p-6 bg-muted/20 rounded-2xl border border-border/50">
                          <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">Varför det påverkar börsen</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{event.whyItMatters}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Svenska Aktier</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.swedishCompanies}</p>
                          </div>
                          <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">USA Aktier</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.usCompanies}</p>
                          </div>
                          <div className="p-4 bg-emerald-400/5 rounded-xl border border-emerald-400/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Vinnare</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.winners}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={openLoginModal}
                        className="mb-8 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="p-10 bg-gradient-to-br from-primary/10 via-background/60 to-primary/5 border border-primary/20 rounded-[2.5rem] backdrop-blur-sm flex flex-col items-center justify-center text-center gap-8 transition-all hover:border-primary/40 hover:bg-primary/10">
                          {/* Animated background glow */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:w-64 group-hover:h-64 transition-all duration-700 pointer-events-none" />
                          
                          <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10">
                            <Sparkles size={40} />
                          </div>

                          <div className="space-y-3 relative z-10">
                            <h4 className="text-2xl font-black tracking-tight text-foreground uppercase">Få AI-INSIKT</h4>
                            <p className="text-base font-medium text-muted-foreground max-w-lg leading-relaxed">
                              Logga in eller skapa ett <span className="text-primary font-black uppercase tracking-wider">gratis konto</span> för att se marknadspåverkan och påverkade bolag.
                            </p>
                          </div>

                          {/* Sneak peek badges */}
                          <div className="flex flex-wrap justify-center gap-3 relative z-10">
                            {["Marknadspåverkan", "Svenska Bolag", "USA Bolag", "Sektorer"].map(tag => (
                              <div key={tag} className="px-4 py-2 bg-foreground/[0.03] border border-foreground/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] opacity-80 backdrop-blur-md">
                                {tag}
                              </div>
                            ))}
                          </div>

                          <button className="relative z-10 px-12 py-5 bg-primary text-white rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(var(--primary),0.3)] group-hover:shadow-[0_20px_50px_rgba(var(--primary),0.5)] group-hover:-translate-y-1 active:scale-95 transition-all duration-300">
                            Logga in nu
                          </button>
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {event.aiInsight && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-muted/30 rounded-2xl p-6 border border-border/50"
                        >
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                            <Sparkles size={12} />
                            AI Analys
                          </div>
                          <p className="text-sm font-bold text-foreground leading-relaxed italic">
                            "{event.aiInsight}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))) : (
                  <div className="p-12 text-center bg-card border border-border rounded-[2rem]">
                    <p className="text-muted-foreground">Inga makrohändelser hittades för tillfället.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Market Pulse & Macro Section (Moved down) */}
            <section className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter">Marknadens Puls & Makro</h2>
                  <p className="text-muted-foreground font-medium mt-2">Realtidsdata för att navigera marknadens humör och trender.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                    Senaste synk: {Object.values(macroData).length > 0 
                      ? new Date(Math.max(...Object.values(macroData).map(v => new Date(v.updatedAt).getTime()))).toLocaleString('sv-SE', { 
                          day: '2-digit', 
                          month: 'short',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : "..."
                    }
                  </div>
                  <button 
                    onClick={refreshData}
                    disabled={loadingMacro}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary disabled:opacity-50"
                    title="Uppdatera dashboard"
                  >
                    <Activity size={18} className={loadingMacro ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Fear & Greed Gauge */}
                <div className="lg:col-span-1">
                  <FearAndGreedGauge />
                </div>

                {/* Dynamic Macro Indicators */}
                {loadingMacro ? (
                  MACRO_METRICS.map((key) => <SkeletonIndicator key={key} />)
                ) : (
                  MACRO_METRICS.map((key) => {
                    const item = macroData[key];
                    const meta = MACRO_METADATA[key];
                    
                    if (!item || !meta) return null;
                    
                    return (
                      <DetailedIndicator 
                        key={key}
                        category={meta.category}
                        date={new Date(item.updatedAt).toLocaleDateString('sv-SE')}
                        title={meta.title}
                        trend={item.trend}
                        change={item.trend === "up" ? "Upp" : item.trend === "down" ? "Ner" : "Oförändrad"}
                        value={Number(item.value).toFixed(2) + (key.includes("SEK") ? " kr" : key === "OMX30" ? "" : "%")}
                        subValue={item.trend === "up" ? "Stigande trend" : item.trend === "down" ? "Fallande trend" : "Stabil trend"}
                        description={meta.description}
                        impact={meta.impact(item.value)}
                        source={item.source}
                        isStale={item.isStale}
                      />
                    );
                  })
                )}
              </div>
            </section>

            {/* Macro Case Studies */}
            <section className="bg-card border border-border rounded-[3rem] p-10 md:p-16 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter">Varför spelar makro roll?</h2>
                <p className="text-muted-foreground font-medium">Verkliga exempel på hur makro påverkar dina bolag</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">1</div>
                    <h3 className="text-xl font-black tracking-tight uppercase">VOLVO & VALUTA</h3>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Volvo genererar merparten av sina intäkter i USD och EUR men har stora kostnader i SEK. En stärkande krona — som under 2025 gick från 11,00 till 9,17 mot dollarn — pressade rörelseresultatet med miljarder kronor och är en av de viktigaste riskerna att följa.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">2</div>
                    <h3 className="text-xl font-black tracking-tight uppercase">INVESTOR & RÄNTOR</h3>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Investor gynnas historiskt av ett stabilt eller sjunkande ränteläge. Riksbankens räntesänkningar under 2024–2025 har bidragit till att portföljbolagens värderingar stigit och substansvärdet nått rekordnivåer. Snabba räntehöjningar riskerar att vända den trenden.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">3</div>
                    <h3 className="text-xl font-black tracking-tight uppercase">NVIDIA & FED</h3>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Tillväxtbolag som NVIDIA är känsliga för Feds räntebeslut. Höga räntor ökar diskonteringsräntan och sänker nuvärdet av framtida vinster — vilket slår hårt mot högt värderade techbolag. En mjukare Fed är strukturellt positivt för AI-sektorn.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">4</div>
                    <h3 className="text-xl font-black tracking-tight uppercase">INFLATION & RIKSBANKEN</h3>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Med KPIF nära 2%-målet har Riksbanken utrymme att fortsätta sänka styrräntan under 2025. Lägre räntor gynnar bostadsmarknaden, hushållens köpkraft och börsens värderingar — men risk finns om inflationen oväntat accelererar igen.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-foreground text-background rounded-[2.5rem] p-10 space-y-8 shadow-2xl shadow-black/20 relative overflow-hidden group/clock-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/clock-card:bg-primary/30 transition-colors" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 group-hover/clock-card:bg-primary/20 transition-colors" />
              
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black tracking-tighter">Makro-klockan</h3>
                  <div className="text-[8px] font-black uppercase tracking-widest opacity-60 text-right">
                    Uppdaterad:<br />{lastUpdated}
                  </div>
                </div>
                <p className="text-sm font-medium opacity-90 leading-relaxed">
                  Var befinner vi oss i konjunkturcykeln? Klicka på faserna för att utforska.
                </p>

                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/30 transition-all">
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full" 
                    />
                    <span className="text-[9px] font-black uppercase tracking-wider text-white/70">USA</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 group-hover:border-yellow-400/30 transition-all">
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1] }} 
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                      className="w-1.5 h-1.5 bg-yellow-400 rounded-full" 
                    />
                    <span className="text-[9px] font-black uppercase tracking-wider text-white/70">Sverige</span>
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-transparent rounded-full flex items-center justify-center relative group/clock w-full max-w-[280px] mx-auto">
                {/* Outer Ring for Phase Labels */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  {PHASES.map((phase) => {
                    const angle = phase.rotation; 
                    const radius = 46; 
                    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
                    
                    return (
                      <div 
                        key={`label-${phase.id}`}
                        className={`absolute text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${activePhase.id === phase.id ? phase.color : 'text-white/30'}`}
                        style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          textShadow: activePhase.id === phase.id ? '0 0 10px rgba(var(--primary), 0.5)' : 'none'
                        }}
                      >
                        {phase.name}
                      </div>
                    );
                  })}
                </div>

                {/* Inner Clock Face */}
                <div className="w-[70%] h-[70%] bg-white/5 rounded-full border border-white/10 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 z-10">
                    {PHASES.map((phase) => {
                      const startAngle = phase.rotation;
                      const endAngle = phase.rotation + 60;
                      return (
                        <div 
                          key={phase.id}
                          onClick={() => setActivePhase(phase)}
                          className={`absolute inset-0 origin-center cursor-pointer`}
                          style={{ 
                            clipPath: `polygon(50% 50%, ${50 + 200 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 200 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 200 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 200 * Math.sin((endAngle - 90) * Math.PI / 180)}%)` 
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Indicators */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    <motion.div style={{ rotate: 210 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                      </div>
                    </motion.div>
                    <motion.div style={{ rotate: 240 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Clock Hand */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <motion.div 
                      initial={false}
                      animate={{ rotate: activePhase.rotation }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      className="w-1.5 h-[35%] bg-primary rounded-full origin-bottom -translate-y-[50%] shadow-[0_0_15px_#10B981]"
                    />
                  </div>
                  <div className="w-3 h-3 bg-foreground rounded-full border-2 border-primary z-40 pointer-events-none shadow-[0_0_10px_#10B981]" />
                </div>
              </div>

              <motion.div 
                key={activePhase.id}
                className={`p-6 rounded-2xl border border-white/10 ${activePhase.bg}`}
              >
                <div className={`text-xs font-black uppercase tracking-widest ${activePhase.color} mb-2`}>
                  {activePhase.name}
                </div>
                <p className="text-sm font-bold leading-relaxed">
                  {activePhase.description}
                </p>
              </motion.div>
            </div>

            <div className="bg-card border border-border rounded-[2.5rem] p-10 space-y-6">
              <h3 className="text-xl font-black tracking-tighter">Viktiga Datum</h3>
              <div className="space-y-6">
                {upcomingDates.map((item, idx) => (
                  <DateItem key={idx} date={item.date} title={item.title} />
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Strategisk Analys: Konjunkturklockan 2.0 */}
        <section className="space-y-10 pt-16 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Konjunkturklockan 2.0</div>
              <h2 className="text-4xl font-black tracking-tighter">Strategiskt Ramverk</h2>
              <p className="text-muted-foreground font-medium max-w-2xl">
                Börsen och ekonomin rör sig sällan i takt. Vi fokuserar på investeringsnyttan och vändpunkterna i marknadens cykel.
              </p>
            </div>
            <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-tight">
                Gyllene regeln:<br />
                <span className="text-foreground">Förbered för nästa fas i tid.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Tidsskillnaden */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Globe size={120} />
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black tracking-tight uppercase">🌍 Tidsskillnaden</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  USA och Sverige befinner sig inte på samma ställe. USA visar mjuklandningstendenser driven av teknikledarskap (Fas 4), medan Sverige är räntekänsligare och nosar på en lokal avmattning (Fas 5).
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-auto">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>USA: Fas 4</span>
                  <span>SWE: Fas 4/5</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Early Bird */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <TrendingUp size={120} />
              </div>
              <div className="w-12 h-12 bg-emerald-400/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black tracking-tight uppercase">🦅 Early Bird-effekt</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Börsen är inte ekonomin. Marknaden ligger oftast 6–9 månader före makrodatan. Den toppar i Fas 3/4 när allt ser "okej" ut, och bottnar i Fas 6 när rubrikerna är som mörkast.
                </p>
              </div>
              <div className="p-4 bg-emerald-400/5 rounded-2xl border border-emerald-400/10">
                <p className="text-[10px] font-bold text-emerald-500 italic">
                  "Köp när alla andra fruktar Fas 6."
                </p>
              </div>
            </motion.div>

            {/* Card 3: Selektivitet */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Target size={120} />
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <Activity size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black tracking-tight uppercase">🎯 Selektivitet</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  I en mogen fas drivs index av ett fåtal jättar (Magnificent 7). Marknadsbredden smalnar av, vilket kräver fokus på bolag med prissättningskraft och faktiska kassaflöden snarare än tillväxtdrömmar.
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-auto">
                <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                  Varning: Smal marknadsbredd
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DetailedIndicator({ category, date, title, trend, change, value, subValue, description, impact, source, isStale }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-card border ${isStale ? 'border-amber-500/30' : 'border-border'} rounded-[2.5rem] p-8 shadow-xl shadow-black/5 flex flex-col group hover:border-primary/50 transition-all relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
      {isStale && (
        <div className="absolute top-4 right-8 px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-amber-500/20 z-20">
          Fördröjd data
        </div>
      )}

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{category}</div>
          <div className="text-[9px] font-bold text-muted-foreground uppercase opacity-80">Uppdaterad {date}</div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-black ${
          trend === "up" ? "text-emerald-400" : "text-red-500"
        }`}>
          {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-black tracking-tight mb-1">{title}</h4>
        <div className="text-4xl font-black tracking-tighter text-foreground">{value}</div>
        <div className="text-[10px] font-bold text-muted-foreground mt-1">{subValue}</div>
      </div>

      <p className="text-xs font-medium text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
        <div>
          <div className="text-[9px] font-black text-foreground uppercase tracking-widest mb-2">Marknadspåverkan</div>
          <p className="text-[11px] font-bold leading-relaxed text-primary/80 italic">
            {impact}
          </p>
        </div>
        {source && (
          <div className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">
            Källa: {source === 'gemini-ai' ? 'Gemini AI' : source || 'Officiell data'}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SkeletonIndicator() {
  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-black/5 flex flex-col animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-2 w-24 bg-muted/60 rounded" />
        </div>
        <div className="h-4 w-12 bg-muted rounded" />
      </div>
      <div className="mb-6 space-y-3">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-10 w-24 bg-muted rounded" />
        <div className="h-3 w-20 bg-muted/60 rounded" />
      </div>
      <div className="h-12 w-full bg-muted/30 rounded-xl mb-6" />
      <div className="mt-auto pt-6 border-t border-border">
        <div className="h-2 w-20 bg-muted mb-2" />
        <div className="h-8 w-full bg-muted/40 rounded" />
      </div>
    </div>
  );
}

function DateItem({ date, title }: { date: string, title: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 bg-muted rounded-xl flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        <div className="text-[10px] font-black uppercase tracking-tighter leading-none">{date.split(' ')[1]}</div>
        <div className="text-lg font-black tracking-tighter leading-none">{date.split(' ')[0]}</div>
      </div>
      <div>
        <div className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">{title}</div>
        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">09:30 CET</div>
      </div>
    </div>
  );
}
