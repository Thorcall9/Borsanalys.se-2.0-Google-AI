import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Info, 
  Shield, 
  Target, 
  Briefcase, 
  Users, 
  Award, 
  Zap, 
  TrendingUp, 
  Star, 
  StarOff, 
  Plus, 
  Search, 
  Filter, 
  X, 
  Globe, 
  BarChart3, 
  CheckCircle2 
} from "lucide-react";
import SEO from "../components/SEO";
import { 
  MetricCard, 
  SwotGrid, 
  VerdictBox, 
  VerdictBadge, 
  ScenarioCards, 
  ComprehensiveAnalysis 
} from "../components/analysis";
import NvidiaDeepDive from "../components/NvidiaDeepDive";
import NovoNordiskDeepDive from "../components/NovoNordiskDeepDive/NovoNordiskDeepDive";
import EvolutionDeepDive from "../components/analysis/EvolutionDeepDive";
import InvestorDeepDive from "../components/analysis/InvestorDeepDive";
import VolvoDeepDive from "../components/analysis/VolvoDeepDive";
import SwedbankDeepDive from "../components/analysis/SwedbankDeepDive";
import NewWaveDeepDive from "../components/analysis/NewWaveDeepDive";
import EricssonDeepDive from "../components/analysis/EricssonDeepDive";
import HandelsbankenDeepDive from "../components/analysis/HandelsbankenDeepDive";
import { analyses, AnalysisData } from "../data/analyses";
import { fetchWithCache } from "../services/stockService";
import AdZone from "../components/AdZone";

const DEEP_DIVE_COMPONENTS = {
  Nvidia: NvidiaDeepDive,
  NovoNordisk: NovoNordiskDeepDive,
  Evolution: EvolutionDeepDive,
  Investor: InvestorDeepDive,
  Volvo: VolvoDeepDive,
  Swedbank: SwedbankDeepDive,
  NewWave: NewWaveDeepDive,
  Ericsson: EricssonDeepDive,
  Handelsbanken: HandelsbankenDeepDive
};

export default function Analysis() {
  const { slug: rawSlug } = useParams();
  const slug = rawSlug === 'evolution' ? 'evolution-2025' : rawSlug;
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState<Record<string, any>>({});

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("Alla");
  const [selectedRecommendation, setSelectedRecommendation] = useState("Alla");

  const analysis = slug ? analyses[slug as keyof typeof analyses] : undefined;

  // Fetch real-time data for archive
  useEffect(() => {
    if (slug) return; // Only for archive view

    const fetchAllData = async () => {
      const allAnalyses = Object.values(analyses);
      const tickers = [...new Set(allAnalyses.map(a => a.ticker).filter(Boolean))];
      
      // Fetch sequentially with a small delay to avoid hitting rate limits
      for (const ticker of tickers) {
        try {
          const data = await fetchWithCache(ticker);
          if (data) {
            setRealTimeData(prev => ({
              ...prev,
              [ticker]: {
                price: data.regularMarketPrice,
                change: data.regularMarketChangePercent,
                pe: data.trailingPE,
                yield: data.dividendYield
              }
            }));
          }
          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err: any) {
          console.error(`Failed to fetch data for ${ticker}:`, err.message || err);
        }
      }
    };

    fetchAllData();
  }, [slug]);

  // Watchlist State (Prisma/API)
  useEffect(() => {
    if (!analysis) return;

    const checkWatchlistStatus = async () => {
      setIsWatchlistLoading(true);
      try {
        const res = await fetch('/api/watchlist');
        if (res.ok) {
          const list = await res.json();
          const isWatched = list.some((item: any) => item.ticker === analysis.ticker.toUpperCase());
          setIsInWatchlist(isWatched);
        }
      } catch (err) {
        console.error("Failed to fetch watchlist status:", err);
      } finally {
        setIsWatchlistLoading(false);
      }
    };

    checkWatchlistStatus();
  }, [analysis]);

  const toggleWatchlist = async () => {
    if (!analysis) return;

    setIsWatchlistLoading(true);
    try {
      const method = isInWatchlist ? 'DELETE' : 'POST';
      const res = await fetch('/api/watchlist', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: analysis.ticker })
      });

      if (res.ok) {
        setIsInWatchlist(!isInWatchlist);
      } else {
        const err = await res.json();
        console.error("Watchlist operation failed:", err.error);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  const allAnalyses = Object.values(analyses).sort((a, b) => {
    const dateA = a.date || "0000-00-00";
    const dateB = b.date || "0000-00-00";
    return dateB.localeCompare(dateA);
  });
  const sectors = ["Alla", ...new Set(allAnalyses.map(a => a.sector))];
  const recommendations = ["Alla", "KÖP", "AVVAKTA", "SÄLJ", "BEVAKA"];

  const filteredAnalyses = allAnalyses.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         a.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "Alla" || a.sector === selectedSector;
    const matchesRec = selectedRecommendation === "Alla" || a.recommendation === selectedRecommendation;
    return matchesSearch && matchesSector && matchesRec;
  });

  // List view if no slug is provided
  if (!slug) {
    return (
      <div className="bg-background min-h-screen pt-32 pb-24">
        <SEO 
          title="Analysarkiv - Aktieanalyser & Investment Cases" 
          description="Utforska vårt arkiv av djupgående aktieanalyser. Vi granskar kvalitet, tillväxt och värdering för att hitta de bästa investeringsmöjligheterna."
        />
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-4">Analysarkiv</h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-foreground break-words">
                Aktieanalyser & <br /> 
                <span className="text-primary">Investment Cases</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Djupgående analyser av noterade bolag på de nordiska och amerikanska marknaderna. Vi fokuserar på kvalitet, tillväxt och värdering.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/80" size={20} />
                <input 
                  type="text" 
                  placeholder="Sök på bolag eller ticker..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg font-medium"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group w-full sm:w-auto">
                  <select 
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full appearance-none bg-muted/30 border border-border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-black uppercase tracking-widest sm:min-w-[180px] cursor-pointer"
                  >
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 pointer-events-none group-hover:text-primary transition-colors" size={16} />
                </div>
                <div className="relative group w-full sm:w-auto">
                  <select 
                    value={selectedRecommendation}
                    onChange={(e) => setSelectedRecommendation(e.target.value)}
                    className="w-full appearance-none bg-muted/30 border border-border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-black uppercase tracking-widest sm:min-w-[180px] cursor-pointer"
                  >
                    {recommendations.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 pointer-events-none group-hover:text-primary transition-colors" size={16} />
                </div>
              </div>
            </div>

            {(searchTerm || selectedSector !== "Alla" || selectedRecommendation !== "Alla") && (
              <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-border">
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all">
                    "{searchTerm}" <X size={12} />
                  </button>
                )}
                {selectedSector !== "Alla" && (
                  <button onClick={() => setSelectedSector("Alla")} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all">
                    {selectedSector} <X size={12} />
                  </button>
                )}
                {selectedRecommendation !== "Alla" && (
                  <button onClick={() => setSelectedRecommendation("Alla")} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all">
                    {selectedRecommendation} <X size={12} />
                  </button>
                )}
                <button onClick={() => {setSearchTerm(""); setSelectedSector("Alla"); setSelectedRecommendation("Alla");}} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors ml-2">
                  Rensa alla filter
                </button>
              </div>
            )}
          </motion.div>

          <AdZone id="archive-top" type="banner" discrete />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.reduce((acc: React.ReactNode[], a, i) => {
                const rt = realTimeData[a.ticker];
                const rawPe = rt?.pe || a.pe;
                const displayPe = rawPe ? parseFloat(String(rawPe).replace(',', '.')).toFixed(2) : '-';
                const displayYield = rt?.yield !== undefined ? rt.yield : a.yield;

                acc.push(
                  <motion.div
                    key={a.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 6) * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={`/analys/${a.slug}`}
                      className="group block h-full bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="space-y-6">
                           <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-[0.2em]">{a.ticker} · {a.market}</div>
                                {a.date && (
                                  <>
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                    <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{a.date}</div>
                                  </>
                                )}
                              </div>
                              <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300 leading-tight">{a.listTitle || a.title}</h3>
                            </div>
                            <VerdictBadge verdict={a.recommendation} />
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                            {a.summary}
                          </p>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-border/50 gap-6 sm:gap-0">
                          <div className="flex gap-8">
                            <div>
                              <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">P/E</div>
                              <div className="text-lg font-black text-foreground">{displayPe}</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">Direktavk.</div>
                              <div className="text-lg font-black text-foreground">
                                {typeof displayYield === 'number' 
                                  ? `${(displayYield * 100).toFixed(2)}%` 
                                  : (displayYield?.includes('%') ? displayYield : `${(parseFloat(displayYield || '0') * 100).toFixed(2)}%`)}
                              </div>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/5">
                            <ArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-700" />
                    </Link>
                  </motion.div>
                );

                // Insert ad every 6 items
                if ((i + 1) % 6 === 0 && i !== filteredAnalyses.length - 1) {
                  acc.push(
                    <motion.div
                      key={`ad-${i}-1`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <AdZone id={`archive-middle-${i}-1`} type="card" discrete />
                    </motion.div>
                  );
                  acc.push(
                    <motion.div
                      key={`ad-${i}-2`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <AdZone id={`archive-middle-${i}-2`} type="card" discrete />
                    </motion.div>
                  );
                }

                return acc;
              }, [])
            ) : (
              <div className="col-span-full py-32 text-center space-y-6 bg-muted/30 rounded-[3rem] border border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/60">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black tracking-tighter">Inga analyser hittades</h3>
                <p className="text-muted-foreground font-medium">Prova att justera dina filter eller söktermer.</p>
                <button 
                  onClick={() => {setSearchTerm(""); setSelectedSector("Alla"); setSelectedRecommendation("Alla");}}
                  className="text-sm font-black uppercase tracking-widest text-primary hover:underline"
                >
                  Visa alla analyser
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return <Navigate to="/analys" replace />;
  }

  const currentIndex = allAnalyses.findIndex(a => a.slug === (slug === 'evolution' ? 'evolution-2025' : slug));
  const nextAnalysis = currentIndex !== -1 && currentIndex < allAnalyses.length - 1 
    ? allAnalyses[currentIndex + 1] 
    : allAnalyses[0];

  // Check for specialized high-fidelity views
  if (analysis.deepDiveComponent && DEEP_DIVE_COMPONENTS[analysis.deepDiveComponent as keyof typeof DEEP_DIVE_COMPONENTS]) {
    const Component = DEEP_DIVE_COMPONENTS[analysis.deepDiveComponent as keyof typeof DEEP_DIVE_COMPONENTS];
    return <Component onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} nextAnalysis={nextAnalysis} />;
  }

  // Use the new comprehensive analysis template for all other stocks
  return <ComprehensiveAnalysis data={analysis} onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} nextAnalysis={nextAnalysis} />;
}
