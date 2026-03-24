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
    
    const filteredAnalyses = Object.values(analyses).filter(
      (a) => 
        a.title.toLowerCase().includes(lowerQuery) || 
        a.ticker.toLowerCase().includes(lowerQuery) ||
        a.sector.toLowerCase().includes(lowerQuery)
    );

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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl z-[70] overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Search className="text-muted" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Sök efter företag, ticker eller guider..."
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={onClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={20} className="text-muted" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <div className="p-8 text-center">
                  <p className="text-muted mb-4">Populära sökningar</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Investor", "NVIDIA", "Apple", "Microsoft", "Novo Nordisk", "P/E-tal"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.analyses.length === 0 && results.guides.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-muted">Inga resultat hittades för "{query}"</p>
                </div>
              ) : (
                <div className="space-y-4 p-2">
                  {results.analyses.length > 0 && (
                    <div>
                      <h3 className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                        <TrendingUp size={14} />
                        Analyser & Företag
                      </h3>
                      <div className="space-y-1">
                        {results.analyses.map((analysis) => (
                          <Link
                            key={analysis.slug}
                            to={`/analys/${analysis.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">
                                {analysis.ticker.split(' ')[0]}
                              </div>
                              <div>
                                <div className="font-bold">{analysis.title}</div>
                                <div className="text-xs text-muted">{analysis.sector} • {analysis.market}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                analysis.recommendation === "KÖP" ? "bg-emerald-500/10 text-emerald-500" :
                                analysis.recommendation === "SÄLJ" ? "bg-red-500/10 text-red-500" :
                                "bg-amber-500/10 text-amber-500"
                              }`}>
                                {analysis.recommendation}
                              </span>
                              <ArrowRight size={16} className="text-primary" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.guides.length > 0 && (
                    <div>
                      <h3 className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                        <BookOpen size={14} />
                        Guider & Utbildning
                      </h3>
                      <div className="space-y-1">
                        {results.guides.map((guide) => (
                          <Link
                            key={guide.slug}
                            to={`/guider/${guide.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                                <Calculator size={20} />
                              </div>
                              <div>
                                <div className="font-bold">{guide.title}</div>
                                <div className="text-xs text-muted">{guide.category} • {guide.readTime} läsning</div>
                              </div>
                            </div>
                            <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-3 bg-muted/50 border-t border-border flex justify-between items-center text-[10px] text-muted uppercase tracking-widest font-bold">
              <div className="flex gap-4">
                <span><kbd className="bg-card px-1.5 py-0.5 rounded border border-border">ESC</kbd> Stäng</span>
                <span><kbd className="bg-card px-1.5 py-0.5 rounded border border-border">↵</kbd> Välj</span>
              </div>
              <div className="flex items-center gap-1">
                Sök drivs av <TrendingUp size={10} className="text-primary" /> Börsanalys
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
