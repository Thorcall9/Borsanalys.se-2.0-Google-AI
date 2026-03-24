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
import { analyses } from "../data/analyses";
import { useAuth } from "../contexts/AuthContext";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, where, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function Analysis() {
  const { slug } = useParams();
  const { user, login } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistDocId, setWatchlistDocId] = useState<string | null>(null);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("Alla");
  const [selectedRecommendation, setSelectedRecommendation] = useState("Alla");

  const analysis = slug ? analyses[slug] : undefined;

  useEffect(() => {
    if (!user || !analysis) return;

    const path = "watchlists";
    const q = query(
      collection(db, path), 
      where("uid", "==", user.uid),
      where("symbol", "==", analysis.ticker)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setIsInWatchlist(true);
        setWatchlistDocId(snapshot.docs[0].id);
      } else {
        setIsInWatchlist(false);
        setWatchlistDocId(null);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsub();
  }, [user, analysis]);

  const toggleWatchlist = async () => {
    if (!user) {
      login();
      return;
    }

    if (!analysis) return;

    setIsWatchlistLoading(true);
    const path = "watchlists";
    try {
      if (isInWatchlist && watchlistDocId) {
        await deleteDoc(doc(db, path, watchlistDocId));
      } else {
        await addDoc(collection(db, path), {
          uid: user.uid,
          symbol: analysis.ticker,
          name: analysis.title,
          addedAt: new Date()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  const allAnalyses = Object.values(analyses);
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
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Analysarkiv</div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none">Aktieanalyser & <br /> <span className="italic text-muted">Investment Cases</span></h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Djupgående analyser av noterade bolag på de nordiska och amerikanska marknaderna. Vi fokuserar på kvalitet, tillväxt och värdering.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Sök på bolag eller ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select 
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium min-w-[140px]"
                >
                  {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={14} />
              </div>
              <div className="relative">
                <select 
                  value={selectedRecommendation}
                  onChange={(e) => setSelectedRecommendation(e.target.value)}
                  className="appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium min-w-[140px]"
                >
                  {recommendations.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <TrendingUp className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          {(searchTerm || selectedSector !== "Alla" || selectedRecommendation !== "Alla") && (
            <div className="flex flex-wrap gap-2 pt-2">
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  "{searchTerm}" <X size={12} />
                </button>
              )}
              {selectedSector !== "Alla" && (
                <button onClick={() => setSelectedSector("Alla")} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  {selectedSector} <X size={12} />
                </button>
              )}
              {selectedRecommendation !== "Alla" && (
                <button onClick={() => setSelectedRecommendation("Alla")} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  {selectedRecommendation} <X size={12} />
                </button>
              )}
              <button onClick={() => {setSearchTerm(""); setSelectedSector("Alla"); setSelectedRecommendation("Alla");}} className="text-xs text-muted hover:text-primary underline font-medium ml-2">
                Rensa alla filter
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAnalyses.length > 0 ? (
            filteredAnalyses.map((a) => (
              <Link 
                key={a.slug}
                to={`/analys/${a.slug}`}
                className="group bg-section-alt border border-border rounded-3xl p-8 hover:border-primary transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-muted uppercase tracking-widest">{a.ticker} · {a.market}</div>
                      <h3 className="text-3xl font-serif font-bold group-hover:text-primary transition-colors">{a.title}</h3>
                    </div>
                    <VerdictBadge verdict={a.recommendation} />
                  </div>
                  <p className="text-muted leading-relaxed line-clamp-3">
                    {a.summary}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] font-mono text-muted uppercase mb-1">P/E</div>
                      <div className="font-bold">{a.pe}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted uppercase mb-1">Direktavk.</div>
                      <div className="font-bold">
                        {typeof a.yield === 'number' 
                          ? `${(a.yield * 100).toFixed(2)}%` 
                          : (a.yield?.includes('%') ? a.yield : `${(parseFloat(a.yield || '0') * 100).toFixed(2)}%`)}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-24 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold">Inga analyser hittades</h3>
              <p className="text-muted">Prova att justera dina filter eller söktermer.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!analysis) {
    return <Navigate to="/analys" replace />;
  }

  // Special high-fidelity view for NVIDIA
  if (slug === 'nvidia-fy2026') {
    return <NvidiaDeepDive onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} />;
  }

  // Special high-fidelity view for Novo Nordisk
  if (slug === 'novo-nordisk') {
    return <NovoNordiskDeepDive onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} />;
  }

  // Use the new comprehensive analysis template for all other stocks
  return <ComprehensiveAnalysis data={analysis} onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} />;
}
