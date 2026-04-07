import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Globe, Landmark, 
  Activity, ArrowUpRight, ArrowDownRight, 
  Zap, Sparkles, Loader2, Lock,
  Newspaper, Gauge
} from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
import { useAuth } from "../contexts/AuthContext";

// ... (rest of imports and interfaces)

import FearAndGreedGauge from "../components/FearAndGreedGauge";

interface MacroData {
  value: number;
  trend: "up" | "down" | "flat";
  updatedAt: string;
}

const FALLBACK_DATA: Record<string, MacroData> = {
  US10Y: { value: 4.34, trend: "up", updatedAt: new Date().toISOString() },
  SE10Y: { value: 2.85, trend: "down", updatedAt: new Date().toISOString() },
  USDSEK: { value: 9.56, trend: "down", updatedAt: new Date().toISOString() },
  EURSEK: { value: 10.95, trend: "down", updatedAt: new Date().toISOString() },
  OMX30: { value: 2905, trend: "up", updatedAt: new Date().toISOString() },
  Inflation: { value: 0.5, trend: "flat", updatedAt: new Date().toISOString() }
};

const MACRO_METADATA: Record<string, { category: string, title: string, description: string, impact: string }> = {
  US10Y: {
    category: "RÄNTOR",
    title: "US 10Y Treasury Yield",
    description: "USA:s 10-åriga statsobligationsränta sätter tonen för den globala ekonomin och riskaptiten.",
    impact: "Nuvarande högre nivåer (4.34%) pressar värderingar på tillväxtaktier och ökar avkastningskravet globalt."
  },
  SE10Y: {
    category: "RÄNTOR",
    title: "Svensk 10Y Statsobligation",
    description: "Sveriges 10-åriga statsobligationsränta påverkar bolån och företagens lånekostnader direkt.",
    impact: "Nivån runt 2.85% speglar en viss ränteoro, vilket dämpar fastighetssektorn men gynnar räntebärande placeringar."
  },
  USDSEK: {
    category: "VALUTOR",
    title: "USD/SEK (Valuta)",
    description: "Viktigt för exportbolag som Volvo, Ericsson och NVIDIA-exponerade portföljer.",
    impact: "En betydligt starkare krona (9.56) pressar exportbolagens vinster vid omräkning från dollar."
  },
  EURSEK: {
    category: "VALUTOR",
    title: "EUR/SEK (Valuta)",
    description: "Euron påverkar handeln inom Europa och svenska exportbolags marginaler.",
    impact: "Kronans styrka mot euron (10.95) är positiv för importörer men utmanande för export till Europa."
  },
  OMX30: {
    category: "INDEX",
    title: "OMXS30 (Index)",
    description: "De 30 mest omsatta aktierna på Nasdaq Stockholm.",
    impact: "Indexet handlas runt 2900-nivån. Volatilitet i räntor och valutor skapar osäkerhet i de tunga industribolagen."
  },
  Inflation: {
    category: "INFLATION",
    title: "Inflation (KPI)",
    description: "Inflationstakten mäter hur snabbt priserna på varor och tjänster ökar.",
    impact: "Låg inflation (0.5%) ger Riksbanken utrymme för lättnader, men fokus ligger nu på den globala ränteutvecklingen."
  }
};

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface MarketEvent {
  id: string;
  title: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  whyItMatters: string;
  affectedCompanies: {
    swedish: string;
    us: string;
    winners: string;
  };
  aiInsight?: string;
}

const INITIAL_EVENTS: MarketEvent[] = [
  {
    id: "1",
    title: "Global likviditetskris och bankoro (Systemrisk)",
    impact: "negative",
    description: "Efter flera räntehöjningar ser vi nu sprickor i det finansiella systemet. Marknaden fruktar en ny bankkris likt 2008, vilket drivit Fear & Greed Index till extrema nivåer (13).",
    whyItMatters: "När förtroendet för banker vacklar fryser kreditmarknaden, vilket drabbar alla bolag oavsett sektor. Detta är den främsta anledningen till den extrema rädslan just nu.",
    affectedCompanies: {
      swedish: "Svenska storbanker (SEB, Swedbank, Handelsbanken) och fastighetsbolag som är beroende av obligationsmarknaden.",
      us: "Regionala banker i USA och stora investmentbanker som Goldman Sachs och Morgan Stanley.",
      winners: "Guld, statsobligationer (flykt till säkerhet) och defensiva bolag med starka kassaflöden."
    }
  },
  {
    id: "2",
    title: "Eskalerande geopolitisk konflikt (Mellanöstern)",
    impact: "negative",
    description: "Konflikten i Mellanöstern har nått en ny kritisk punkt med direkta hot mot globala handelsrutter. Oljepriset är extremt volatilt och osäkerheten är total.",
    whyItMatters: "Geopolitisk osäkerhet är en klassisk drivkraft för 'Extreme Fear'. Det skapar osäkerhet kring energiförsörjning och global handel.",
    affectedCompanies: {
      swedish: "Exportbolag som Volvo och Sandvik drabbas av logistikstörningar. Flygbolag som SAS drabbas av högre bränslekostnader.",
      us: "Försvarsbolag (Lockheed Martin) ser ökad efterfrågan, medan transportbolag (FedEx, UPS) ser ökade kostnader.",
      winners: "Energibolag och försvarsindustri."
    }
  }
];

const PHASES = [
  {
    id: 'recovery',
    name: 'Återhämtning',
    description: 'Tillväxten tar fart medan inflationen förblir låg. Aktier brukar prestera bäst här.',
    rotation: 45,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    isCurrent: true
  },
  {
    id: 'overheating',
    name: 'Överhettning',
    description: 'Tillväxten är stark men inflationen börjar stiga. Råvaror är ofta vinnare.',
    rotation: 135,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    isCurrent: false
  },
  {
    id: 'stagflation',
    name: 'Stagflation',
    description: 'Tillväxten mattas av samtidigt som inflationen är hög. Kontanter och defensiva val.',
    rotation: 225,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    isCurrent: false
  },
  {
    id: 'reflation',
    name: 'Reflation',
    description: 'Låg tillväxt och fallande inflation. Obligationer är ofta det bästa valet.',
    rotation: 315,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    isCurrent: false
  }
];

export default function MacroDashboard() {
  const { user, openLoginModal } = useAuth();
  const [events, setEvents] = useState<MarketEvent[]>(INITIAL_EVENTS);
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const currentPhase = PHASES.find(p => p.isCurrent) || PHASES[0];
  const [activePhase, setActivePhase] = useState(currentPhase);
  const [macroOutlook, setMacroOutlook] = useState<string | null>(null);
  const [loadingOutlook, setLoadingOutlook] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleDateString('sv-SE'));
  const [upcomingDates, setUpcomingDates] = useState<{date: string, title: string}[]>([
    { date: "12 April", title: "Räntebesked ECB" },
    { date: "15 April", title: "KPI-siffror Sverige" },
    { date: "25 April", title: "BNP-prognos USA" },
    { date: "01 Maj", title: "Fed Räntebesked" }
  ]);
  const [fearGreed, setFearGreed] = useState<{ value: number, classification: string } | null>(null);
  const [loadingFearGreed, setLoadingFearGreed] = useState(true);
  const [macroData, setMacroData] = useState<Record<string, MacroData>>(FALLBACK_DATA);
  const [loadingMacro, setLoadingMacro] = useState(true);

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

    fetchMacroData();
  }, []);

  useEffect(() => {
    const fetchFearGreed = async () => {
      try {
        const response = await fetch("/api/market-sentiment");
        if (response.ok) {
          const data = await response.json();
          // The RapidAPI response format for v1/fgi is: { fgi: { now: { value: 45, valueText: "Neutral" } } }
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

  const generateMacroOutlook = async () => {
    setLoadingOutlook(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        config: { responseMimeType: "application/json" },
        contents: `Baserat på dagens datum (${new Date().toLocaleDateString('sv-SE')}) och nuvarande makroindikatorer (Inflation: 0.5%, US 10Y: 4.34%, USD/SEK: 9.56, OMX30: 2905), ge en kort analys av var vi befinner oss i investeringsklockan och vad det innebär för aktiemarknaden. 
        Ge även de 3 nästa viktigaste makrohändelserna (t.ex. räntebesked, KPI-släpp) som infaller efter dagens datum.
        Svara i JSON-format med följande fält:
        - outlook: sträng (max 3 meningar på svenska)
        - suggestedPhaseId: sträng (måste vara en av: 'recovery', 'overheating', 'stagflation', 'reflation')
        - upcomingDates: array av objekt { date: "DD Månad", title: "Händelse" }`,
      });
      
      const data = JSON.parse(response.text || "{}");
      setMacroOutlook(data.outlook || "Kunde inte generera analys.");
      
      if (data.suggestedPhaseId) {
        const newPhase = PHASES.find(p => p.id === data.suggestedPhaseId);
        if (newPhase) {
          setActivePhase(newPhase);
        }
      }

      if (data.upcomingDates && Array.isArray(data.upcomingDates)) {
        setUpcomingDates(data.upcomingDates);
      }

      setLastUpdated(new Date().toLocaleDateString('sv-SE'));
    } catch (error) {
      console.error("Outlook Error:", error);
    } finally {
      setLoadingOutlook(false);
    }
  };

  const getAIInsight = async (event: MarketEvent) => {
    setLoadingAI(event.id);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${event.title} - ${event.description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`,
      });
      
      const insight = response.text || "Kunde inte generera insikt för tillfället.";
      
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
        {/* Market Pulse & Macro Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tighter">Marknadens Puls & Makro</h2>
              <p className="text-muted-foreground font-medium mt-2">Realtidsdata för att navigera marknadens humör och trender.</p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              Live Uppdatering: {new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fear & Greed Gauge */}
            <div className="lg:col-span-1">
              <FearAndGreedGauge />
            </div>

            {/* Dynamic Macro Indicators */}
            {Object.entries(macroData).map(([key, item]) => {
              const meta = MACRO_METADATA[key] || {
                category: "MAKRO",
                title: key,
                description: "Marknadsdata från databasen.",
                impact: "Påverkar marknadens generella riskaptit."
              };
              
              return (
                <DetailedIndicator 
                  key={key}
                  category={meta.category}
                  date={new Date(item.updatedAt).toLocaleDateString('sv-SE')}
                  title={meta.title}
                  trend={item.trend}
                  change={item.trend === "up" ? "Upp" : item.trend === "down" ? "Ner" : "Oförändrad"}
                  value={item.value + (key.includes("SEK") ? " kr" : key === "OMX30" ? "" : "%")}
                  subValue={item.trend === "up" ? "Stigande trend" : item.trend === "down" ? "Fallande trend" : "Stabil trend"}
                  description={meta.description}
                  impact={meta.impact}
                />
              );
            })}
          </div>
        </section>

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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          event.impact === "positive" ? "bg-emerald-400" : 
                          event.impact === "negative" ? "bg-red-500" : "bg-amber-500"
                        }`} />
                        <h3 className="text-2xl font-black tracking-tighter">{event.title}</h3>
                      </div>
                      <button 
                        onClick={() => user ? getAIInsight(event) : openLoginModal()}
                        disabled={loadingAI === event.id}
                        className="flex items-center gap-2 px-6 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                      >
                        {loadingAI === event.id ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Analyserar...
                          </>
                        ) : (
                          <>
                            {user ? <Zap size={14} /> : <Lock size={14} />}
                            {user ? "Få AI-insikt" : "Logga in för djupare AI-insikter"}
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-muted-foreground font-medium leading-relaxed mb-6">
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
                            <p className="text-[11px] font-bold leading-relaxed">{event.affectedCompanies.swedish}</p>
                          </div>
                          <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">USA Aktier</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.affectedCompanies.us}</p>
                          </div>
                          <div className="p-4 bg-emerald-400/5 rounded-xl border border-emerald-400/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Vinnare</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.affectedCompanies.winners}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={openLoginModal}
                        className="mb-6 p-8 bg-primary/5 border border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-primary/10 transition-all"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                          <Sparkles size={24} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black uppercase tracking-widest text-primary">Få AI-INSIKT</h4>
                          <p className="text-xs font-bold text-muted-foreground">Logga in för att se marknadspåverkan och påverkade bolag</p>
                        </div>
                        <button className="px-8 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                          Logga in nu
                        </button>
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
              </div>

              <div className="aspect-square bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative overflow-hidden cursor-pointer group/clock">
                {/* Quadrants */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 z-0">
                  <div className={`border-r border-b border-white/10 hover:bg-cyan-400/20 transition-colors ${activePhase.id === 'reflation' ? 'bg-cyan-400/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[3])} />
                  <div className={`border-b border-white/10 hover:bg-emerald-400/20 transition-colors ${activePhase.id === 'recovery' ? 'bg-emerald-400/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[0])} />
                  <div className={`border-r border-white/10 hover:bg-red-500/20 transition-colors ${activePhase.id === 'stagflation' ? 'bg-red-500/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[2])} />
                  <div className={`hover:bg-orange-500/20 transition-colors ${activePhase.id === 'overheating' ? 'bg-orange-500/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[1])} />
                </div>

                {/* Center Labels */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-50">Tillväxt ↑</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-50">Tillväxt ↓</div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase tracking-widest opacity-50 -rotate-90">Inflation ↑</div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase tracking-widest opacity-50 rotate-90">Inflation ↓</div>
                </div>

                {/* Clock Hand */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <motion.div 
                    initial={false}
                    animate={{ rotate: activePhase.rotation }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="w-1.5 h-24 bg-primary rounded-full origin-bottom -translate-y-1/2 relative"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  </motion.div>
                </div>

                {/* Center Cap */}
                <div className="w-4 h-4 bg-foreground rounded-full border-2 border-primary z-30 pointer-events-none" />
              </div>

              <motion.div 
                key={activePhase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border border-white/10 ${activePhase.bg} relative overflow-hidden`}
              >
                {activePhase.isCurrent && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">
                    Aktuell Marknadsfas
                  </div>
                )}
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${activePhase.color}`}>
                  {activePhase.name}
                </div>
                <p className="text-sm font-bold leading-relaxed">
                  {activePhase.description}
                </p>
              </motion.div>

              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <button 
                    onClick={generateMacroOutlook}
                    disabled={loadingOutlook}
                    className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingOutlook ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Genererar Outlook...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        AI Makro-Outlook
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    onClick={openLoginModal}
                    className="w-full py-4 bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-primary" />
                      <span>Få AI-INSIKT</span>
                    </div>
                    <span className="text-[8px] opacity-60">Logga in för AI Outlook</span>
                  </button>
                )}

                <AnimatePresence>
                  {macroOutlook && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10"
                    >
                      <p className="text-xs font-medium leading-relaxed italic opacity-95">
                        "{macroOutlook}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
      </div>
    </div>
  );
}

function DetailedIndicator({ category, date, title, trend, change, value, subValue, description, impact }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-black/5 flex flex-col group hover:border-primary/50 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
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

      <div className="mt-auto pt-6 border-t border-border">
        <div className="text-[9px] font-black text-foreground uppercase tracking-widest mb-2">Marknadspåverkan</div>
        <p className="text-[11px] font-bold leading-relaxed text-primary/80 italic">
          {impact}
        </p>
      </div>
    </motion.div>
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
