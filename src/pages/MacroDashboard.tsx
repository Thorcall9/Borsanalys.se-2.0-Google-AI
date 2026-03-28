import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Globe, Landmark, 
  Activity, ArrowUpRight, ArrowDownRight, 
  Zap, Sparkles, Loader2, Lock,
  Newspaper
} from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
import { useAuth } from "../contexts/AuthContext";

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
    title: "Pågående krig/konflikt i Mellanöstern (Iran-kriget och oljechocken)",
    impact: "negative",
    description: "Detta är den mest akuta händelsen just nu. Konflikten har lett till kraftiga störningar i olje- och gasförsörjningen (Strait of Hormuz etc.), med Brent-oljan upp mot 100–110 USD/fat och stora uppgångar i gaspriser.",
    whyItMatters: "Högre energipriser driver upp inflationsförväntningar, ökar produktions- och transportkostnader globalt, skapar osäkerhet kring tillväxt och recessionrisk. Börserna (både OMXS30 och S&P 500) har sett volatilitet och nedgångar de senaste veckorna p.g.a. detta – oljepriset tynger aktier bredare än bara energisektorn.",
    affectedCompanies: {
      swedish: "Cyklistiska export- och industribolag som drabbas av högre bränsle-/energikostnader och svagare global efterfrågan. Exempel: Atlas Copco (ner rejält nyligen), Boliden (mining, stor nedgång), Volvo och Scania (fordonstillverkning och logistik), samt transportrelaterade. Breda OMXS30-fall i industrisektorn.",
      us: "Rese- och transportbolag (höga bränslekostnader): Carnival (cruises), JetBlue (flyg), UPS och FedEx (leveranser). Konsumentvaror som Procter & Gamble och Conagra (plast, kemikalier och förpackningar från olja). Indirekt tech/growth via lägre konsumtion.",
      winners: "Olje- och energibolag – ExxonMobil, Chevron (upp ~30% i år), ConocoPhillips och Shell har sett rekordhöga kurser."
    }
  },
  {
    id: "2",
    title: "Centralbankernas penningpolitik (Fed, ECB och Riksbank håller/höjer inflationsutsikter)",
    impact: "neutral",
    description: "Riksbanken (1,75%), Fed (3,75%) och ECB höll räntorna stilla i mars 2026. Inflationsprognoser justeras upp och marknaden prisar in färre sänkningar.",
    whyItMatters: "”Higher for longer”-scenariot minskar riskaptiten och pressar värderingar på framtida vinster, särskilt för tillväxtbolag. Makrofaktorer väger tyngre än bolagsnyheter just nu.",
    affectedCompanies: {
      swedish: "Räntekänsliga industribolag som Volvo, Ericsson och Atlas Copco. Bred påverkan på exportsektorn via valutaförändringar.",
      us: "Högt värderade tech-bolag som Nvidia, Tesla och Meta drabbas av diskonteringseffekten. Russell 2000 (småbolag) drabbas extra hårt.",
      winners: "Banker och finansbolag kan gynnas av det högre ränteläget."
    }
  },
  {
    id: "3",
    title: "Stigande inflation driven av energipriser (med recessionrisk)",
    impact: "negative",
    description: "Energipriserna pushar upp CPI bredare, med indirekta effekter på löner och efterfrågan. Rädsla för stagflation eller svagare tillväxt under 2026 dominerar.",
    whyItMatters: "Inflationen äter upp reala vinster och tvingar centralbanker att vara hawkiska. Detta dämpar både privat konsumtion och företagens investeringsvilja.",
    affectedCompanies: {
      swedish: "Energikänsliga tillverkare och konsumentbolag som H&M. Exportberoende bolag som Sandvik och SKF påverkas av råvarupriser.",
      us: "Breda konsumentsektorer och cykliska bolag. Tech drabbas indirekt om den generella tillväxten i ekonomin bromsar in.",
      winners: "Råvaru- och energirelaterade bolag (utöver ren olja även vissa mining-bolag)."
    }
  }
];

const PHASES = [
  {
    id: 'recovery',
    name: 'Återhämtning',
    description: 'Tillväxten tar fart medan inflationen förblir låg. Aktier brukar prestera bäst här.',
    rotation: 45,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
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
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
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
    { date: "28 Mars", title: "KPI-siffror Sverige" },
    { date: "12 April", title: "Räntebesked ECB" },
    { date: "25 April", title: "BNP-prognos USA" }
  ]);

  const generateMacroOutlook = async () => {
    setLoadingOutlook(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        config: { responseMimeType: "application/json" },
        contents: `Baserat på dagens datum (${new Date().toLocaleDateString('sv-SE')}) och nuvarande makroindikatorer (Inflation: 3.4%, Styrränta: 3.75%, USD/SEK: 10.42, Olja: $82.4), ge en kort analys av var vi befinner oss i investeringsklockan och vad det innebär för aktiemarknaden. 
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
    <div className="bg-background min-h-screen pb-32">
      {/* Hero Section */}
      <header className="bg-foreground text-background pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
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

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        {/* Market Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DetailedIndicator 
            category="RÄNTOR"
            date="2025-03-20"
            title="RIKSBANKEN (Styrränta)"
            trend="down"
            change="-0,25%"
            value="3,25%"
            subValue="-0,25% sedan senaste beslut"
            description="Sveriges styrränta påverkar bolån och företagens lånekostnader direkt."
            impact="Sänkt ränta gynnar tillväxtbolag och investmentbolag vars innehav värderas upp när avkastningskravet sjunker."
          />
          <DetailedIndicator 
            category="RÄNTOR"
            date="2025-03-19"
            title="FED (USA) (Styrränta)"
            trend="down"
            change="-0,25%"
            value="4,75%"
            subValue="-0,25% sedan senaste beslut"
            description="USA:s centralbanks styrränta sätter tonen för den globala ekonomin och riskaptiten."
            impact="En lägre Fed-ränta stärker riskaptiten globalt och gynnar tillväxtaktier och tillväxtmarknader."
          />
          <DetailedIndicator 
            category="INFLATION"
            date="2025-03-14"
            title="INFLATION (KPIF) (Sverige)"
            trend="up"
            change="+0,1%"
            value="1,5%"
            subValue="+0,1% sedan senaste beslut"
            description="Inflationstakten i Sverige rensat för direkta ränteeffekter (KPIF)."
            impact="Inflation nära Riksbankens 2%-mål ger utrymme för fortsatta räntesänkningar under 2025."
          />
          <DetailedIndicator 
            category="VALUTOR"
            date="2025-03-21"
            title="USD/SEK (Valuta)"
            trend="down"
            change="-0,02"
            value="10,45"
            subValue="-0,02 sedan senaste beslut"
            description="Viktigt för exportbolag som Volvo, Ericsson och NVIDIA-exponerade portföljer."
            impact="En starkare krona (lägre USD/SEK) pressar exportbolagens vinster i SEK-omräkning."
          />
          <DetailedIndicator 
            category="VALUTOR"
            date="2025-03-21"
            title="EUR/SEK (Valuta)"
            trend="up"
            change="+0,01"
            value="11,32"
            subValue="+0,01 sedan senaste beslut"
            description="Euron påverkar handeln inom Europa och svenska exportbolags marginaler."
            impact="En svagare krona mot euron gynnar exportbolag med europeiska intäkter."
          />
          <DetailedIndicator 
            category="INDEX"
            date="2025-03-21"
            title="OMXS30 (Index)"
            trend="down"
            change="-1,2%"
            value="2 387"
            subValue="-1,2% sedan senaste beslut"
            description="De 30 mest omsatta aktierna på Nasdaq Stockholm."
            impact="Bred marknadsnedgång pressar substansvärden i investmentbolag och bredportföljer."
          />
        </div>

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
                          event.impact === "positive" ? "bg-emerald-500" : 
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
                          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Vinnare</div>
                            <p className="text-[11px] font-bold leading-relaxed">{event.affectedCompanies.winners}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 p-6 bg-primary/5 border border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                        <Lock size={20} className="text-primary/40" />
                        <p className="text-xs font-bold text-muted-foreground">Logga in för att se marknadspåverkan och påverkade bolag</p>
                        <button 
                          onClick={openLoginModal}
                          className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
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
            <div className="bg-foreground text-background rounded-[2.5rem] p-10 space-y-8 shadow-2xl shadow-black/20">
              <div className="space-y-2">
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
                  <div className={`border-r border-b border-white/10 hover:bg-emerald-400/20 transition-colors ${activePhase.id === 'reflation' ? 'bg-emerald-400/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[3])} />
                  <div className={`border-b border-white/10 hover:bg-emerald-500/20 transition-colors ${activePhase.id === 'recovery' ? 'bg-emerald-500/30' : 'opacity-20'}`} onClick={() => setActivePhase(PHASES[0])} />
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
                    className="w-full py-4 bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    Logga in för AI Outlook
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
      className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-black/5 flex flex-col group hover:border-primary/50 transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{category}</div>
          <div className="text-[9px] font-bold text-muted-foreground uppercase opacity-80">Uppdaterad {date}</div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-black ${
          trend === "up" ? "text-emerald-500" : "text-red-500"
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
