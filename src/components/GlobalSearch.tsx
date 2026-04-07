import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, BookOpen, ArrowRight, Calculator } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { analyses, AnalysisData } from "../data/analyses";
import { guides, Guide } from "../data/guides";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    analyses: AnalysisData[];
    guides: Guide[];
  }>({ analyses: [], guides: [] });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ analyses: [], guides: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    const filteredAnalyses = Object.values(analyses)
      .filter(
        (a) => 
          a.title.toLowerCase().includes(lowerQuery) || 
          a.ticker.toLowerCase().includes(lowerQuery) ||
          a.sector.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => {
        const dateA = a.date || "0000-00-00";
        const dateB = b.date || "0000-00-00";
        return dateB.localeCompare(dateA);
      });

    const filteredGuides = Object.values(guides).filter(
      (g) => 
        g.title.toLowerCase().includes(lowerQuery) || 
        g.excerpt.toLowerCase().includes(lowerQuery) ||
        g.category.toLowerCase().includes(lowerQuery)
    );

    setResults({
      analyses: filteredAnalyses.slice(0, 5),
      guides: filteredGuides.slice(0, 5)
    });
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150]"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            className="fixed top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-[160] overflow-hidden shadow-black/20"
            onKeyDown={handleKeyDown}
          >
            <div className="p-4 md:p-8 border-b border-border flex items-center gap-3 md:gap-6 bg-muted/10">
              <Search className="text-primary shrink-0" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Sök efter företag, ticker eller guider..."
                className="flex-1 bg-transparent border-none outline-none text-lg md:text-2xl font-black tracking-tighter placeholder:text-muted-foreground/30 text-foreground min-w-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-xl md:rounded-2xl transition-all text-muted-foreground hover:text-foreground shrink-0 border border-border md:border-none"
                aria-label="Stäng sök"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
              {query.trim() === "" ? (
                <div className="p-12 text-center space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em]">Populära sökningar</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {["Investor", "NVIDIA", "Apple", "Microsoft", "Novo Nordisk", "P/E-tal"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-6 py-3 bg-muted/30 hover:bg-primary/10 hover:text-primary rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-primary/20"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.analyses.length === 0 && results.guides.length === 0 ? (
                <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto text-muted-foreground/20">
                    <Search size={40} />
                  </div>
                  <p className="text-muted-foreground font-medium">Inga resultat hittades för <span className="text-foreground font-black">"{query}"</span></p>
                </div>
              ) : (
                <div className="space-y-8 p-4">
                  {results.analyses.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-3">
                        <TrendingUp size={14} className="text-primary" />
                        Analyser & Företag
                      </h3>
                      <div className="space-y-2">
                        {results.analyses.map((analysis) => (
                          <Link
                            key={analysis.slug}
                            to={`/analys/${analysis.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between p-5 hover:bg-muted/50 rounded-[1.5rem] transition-all group border border-transparent hover:border-border"
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xs shadow-lg shadow-primary/5">
                                {analysis.ticker.split(' ')[0]}
                              </div>
                              <div className="space-y-1">
                                <div className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{analysis.title}</div>
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{analysis.sector} • {analysis.market}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                                analysis.recommendation === "KÖP" ? "bg-primary/10 text-primary border-primary/20" :
                                analysis.recommendation === "SÄLJ" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              }`}>
                                {analysis.recommendation}
                              </span>
                              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 transition-all duration-500">
                                <ArrowRight size={20} />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.guides.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-3">
                        <BookOpen size={14} className="text-primary" />
                        Guider & Utbildning
                      </h3>
                      <div className="space-y-2">
                        {results.guides.map((guide) => (
                          <Link
                            key={guide.slug}
                            to={`/guider/${guide.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between p-5 hover:bg-muted/50 rounded-[1.5rem] transition-all group border border-transparent hover:border-border"
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                <Calculator size={24} />
                              </div>
                              <div className="space-y-1">
                                <div className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{guide.title}</div>
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{guide.category} • {guide.readTime} läsning</div>
                              </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 transition-all duration-500">
                              <ArrowRight size={20} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 bg-muted/30 border-t border-border flex justify-between items-center text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em] font-black">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><kbd className="bg-card px-2 py-1 rounded-lg border border-border text-foreground">ESC</kbd> Stäng</span>
                <span className="flex items-center gap-2"><kbd className="bg-card px-2 py-1 rounded-lg border border-border text-foreground">↵</kbd> Välj</span>
              </div>
              <div className="flex items-center gap-2">
                Sök drivs av <span className="text-primary font-black">Börsanalys.se</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
