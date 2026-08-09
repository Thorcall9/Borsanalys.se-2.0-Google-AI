import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
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
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Loader2
} from "lucide-react";
import SEO from "../components/SEO";
import { 
  MetricCard, 
  SwotGrid, 
  VerdictBox, 
  ScenarioCards, 
  ComprehensiveAnalysis,
  ReportComment,
  FilterPanel,
  FilterChips,
  MobileFilterDrawer
} from "../components/analysis";
import { useAnalysisFilters } from "../hooks/useAnalysisFilters";
import AnalysisCard from "../components/analysis/AnalysisCard";
import RecommendationInfo from "../components/analysis/RecommendationInfo";
import axfoodQ2Markdown from "../../analyses/axfood/Q2_2026.md?raw";
import rvrcIciwMarkdown from "../../analyses/RVRC/ICANIWILL_marknadsuppdatering_juli2026.md?raw";
import { analyses, AnalysisData } from "../data/analyses";
import { fetchWithCache } from "../services/stockService";
import { useAuth } from "../contexts/AuthContext";

import MobileReadingProgress from "../components/MobileReadingProgress";
import AdUnit from "../components/analysis/AdUnit";
import NotFound from "./NotFound";
import ComprehensiveAnalysisV10 from "../components/analysis/ComprehensiveAnalysisV10";
import AnalysisArchive from "../components/analysis/AnalysisArchive";
import { getDeepDiveLoader } from "./analysisDeepDiveRegistry";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "../lib/seo/structuredData";

const lazyDeepDive = (key: string) => lazy(() => {
  const loader = getDeepDiveLoader(key);
  if (!loader) throw new Error(`Unknown deep dive: ${key}`);
  return loader();
});

const DEEP_DIVE_COMPONENTS = {
  Nvidia: lazyDeepDive("Nvidia"),
  NovoNordisk: lazyDeepDive("NovoNordisk"),
  Evolution: lazyDeepDive("Evolution"),
  Investor: lazyDeepDive("Investor"),
  Volvo: lazyDeepDive("Volvo"),
  Swedbank: lazyDeepDive("Swedbank"),
  NewWave: lazyDeepDive("NewWave"),
  Ericsson: lazyDeepDive("Ericsson"),
  Handelsbanken: lazyDeepDive("Handelsbanken"),
  AQGroup: lazyDeepDive("AQGroup"),
  Nibe: lazyDeepDive("Nibe"),
  Axfood: lazyDeepDive("Axfood"),
  ABB: lazyDeepDive("ABB"),
  Plejd: lazyDeepDive("Plejd"),
  Meta: lazyDeepDive("Meta"),
  Microsoft: lazyDeepDive("Microsoft"),
};

function DeepDiveLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Laddar analys" />
    </div>
  );
}

function LatestRelatedUpdateCallout({ update }: { update: AnalysisData }) {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-8">
      <aside className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
        <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
          Senaste uppdatering
        </div>
        <Link to={"/analys/" + update.slug} className="text-lg font-black text-foreground hover:text-primary transition-colors">
          {update.title}
        </Link>
        <div className="mt-2 text-sm text-muted-foreground">
          Publicerad {update.displayDate || update.date}
        </div>
      </aside>
    </div>
  );
}

export default function Analysis() {
  const { slug: rawSlug } = useParams();
  const slugMappings: Record<string, string> = {
    'evolution': 'evolution-2025',
    'swedbank': 'swedbank-2025',
    'handelsbanken': 'handelsbanken-2025',
    'nvidia': 'nvidia-fy2026',
    'investor': 'investor-ab',
    'ericsson': 'ericsson-2025',
    'new-wave': 'new-wave-group-april-2026',
    'new-wave-group': 'new-wave-group-april-2026',
    'nordea': 'nordea-bank-2026',
  };
  const slug = rawSlug ? (slugMappings[rawSlug] || rawSlug) : undefined;
  const { user, openLoginModal } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [watchlistError, setWatchlistError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState<Record<string, any>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const allAnalysesSorted = useMemo(
    () => Object.values(analyses).sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    []
  );

  const {
    contentType,
    searchTerm,
    selectedSector,
    selectedRecommendation,
    sortOption,
    setContentType,
    setSearchTerm,
    setSelectedSector,
    setSelectedRecommendation,
    setSortOption,
    sectors,
    filteredAnalyses,
    resultCount,
    activeFilterCount,
    activeFilterChips,
    clearAll,
  } = useAnalysisFilters(allAnalysesSorted);

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
    
    if (!user) {
      setIsInWatchlist(false);
      setIsWatchlistLoading(false);
      return;
    }

    const checkWatchlistStatus = async () => {
      setIsWatchlistLoading(true);
      setWatchlistError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/watchlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const list = await res.json();
          const isWatched = list.some((item: any) => item.ticker === analysis.ticker.toUpperCase());
          setIsInWatchlist(isWatched);
        } else {
          const err = await res.json();
          setWatchlistError(err.error || 'Kunde inte hämta bevakningsstatus.');
        }
      } catch (err) {
        console.error("Failed to fetch watchlist status:", err);
        setWatchlistError('Kunde inte hämta bevakningsstatus på grund av anslutningsfel.');
      } finally {
        setIsWatchlistLoading(false);
      }
    };

    checkWatchlistStatus();
  }, [analysis, user]);

  const toggleWatchlist = async () => {
    if (!analysis) return;
    if (!user) {
      openLoginModal();
      return;
    }

    setIsWatchlistLoading(true);
    setWatchlistError(null);
    try {
      const token = await user.getIdToken();
      const method = isInWatchlist ? 'DELETE' : 'POST';
      const res = await fetch('/api/watchlist', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ticker: analysis.ticker })
      });

      if (res.ok) {
        setIsInWatchlist(!isInWatchlist);
      } else {
        const err = await res.json();
        setWatchlistError(err.error || 'Kunde inte uppdatera bevakningslistan.');
        console.error("Watchlist operation failed:", err.error);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      setWatchlistError('Anslutningsfel vid uppdatering av bevakningslistan.');
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  // Saved status (Prisma/API)
  useEffect(() => {
    if (!analysis) return;
    
    if (!user) {
      setIsSaved(false);
      setIsSaveLoading(false);
      return;
    }

    const checkSavedStatus = async () => {
      setIsSaveLoading(true);
      setSaveError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/saved-analyses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const list = await res.json();
          const saved = list.some((item: any) => item.slug === slug);
          setIsSaved(saved);
        } else {
          const err = await res.json();
          setSaveError(err.error || 'Kunde inte hämta sparstatus.');
        }
      } catch (err) {
        console.error("Failed to fetch saved status:", err);
        setSaveError('Kunde inte hämta sparstatus på grund av anslutningsfel.');
      } finally {
        setIsSaveLoading(false);
      }
    };

    checkSavedStatus();
  }, [analysis, user, slug]);

  const toggleSave = async () => {
    if (!analysis) return;
    if (!user) {
      openLoginModal();
      return;
    }

    setIsSaveLoading(true);
    setSaveError(null);
    try {
      const token = await user.getIdToken();
      const method = isSaved ? 'DELETE' : 'POST';
      const res = await fetch('/api/saved-analyses', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ slug })
      });

      if (res.ok) {
        setIsSaved(!isSaved);
      } else {
        const err = await res.json();
        setSaveError(err.error || 'Kunde inte spara analysen.');
        console.error("Save operation failed:", err.error);
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      setSaveError('Anslutningsfel vid uppdatering av sparad analys.');
    } finally {
      setIsSaveLoading(false);
    }
  };

  const now = new Date();

  // List view if no slug is provided
  if (!slug) {
    return (
      <div className="bg-background min-h-screen">
        <SEO 
          title="Analysarkiv - Aktieanalyser & Investment Cases" 
          description="Fördjupade aktieanalyser och kortare kommentarer till bolagens senaste rapporter."
          canonical="/analys"
        />
        <AnalysisArchive
          analyses={filteredAnalyses}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          contentType={contentType}
          onContentTypeChange={setContentType}
          selectedRecommendation={selectedRecommendation}
          onRecommendationChange={setSelectedRecommendation}
          onMoreFilters={() => setIsMobileFilterOpen(true)}
          resultCount={resultCount}
        />
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          onClose={() => setIsMobileFilterOpen(false)}
          activeFilterCount={activeFilterCount}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          contentType={contentType}
          onContentTypeChange={setContentType}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
          sectors={sectors}
          selectedRecommendation={selectedRecommendation}
          onRecommendationChange={setSelectedRecommendation}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onClearAll={clearAll}
        />
      </div>
    );
  }

  if (!analysis) {
    return <NotFound />;
  }

  // Prevent accessing future scheduled posts directly
  if (analysis.date) {
    const isFuture = analysis.date.includes("T") 
      ? new Date(analysis.date) > now 
      : new Date(analysis.date + "T00:00:00") > now;
    if (isFuture) {
      return <NotFound />;
    }
  }

  const analysisPath = `/analys/${analysis.slug}`;
  const analysisMeta = (
    <SEO
      title={analysis.title}
      description={analysis.summary}
      canonical={analysisPath}
      ogType="article"
      ogImage="/og-image.png"
      publishedTime={analysis.date}
      modifiedTime={analysis.updatedAt}
      jsonLd={[
        buildArticleJsonLd({
          title: analysis.title,
          description: analysis.summary,
          path: analysisPath,
          publishedTime: analysis.date,
          modifiedTime: analysis.updatedAt,
          author: analysis.author,
          image: "/og-image.png",
        }),
        buildBreadcrumbJsonLd([
          { name: "Hem", path: "/" },
          { name: "Analyser", path: "/analys" },
          { name: analysis.title, path: analysisPath },
        ]),
      ]}
    />
  );

  const currentIndex = allAnalysesSorted.findIndex(a => a.slug === (slug === 'evolution' ? 'evolution-2025' : slug));
  const nextAnalysis = currentIndex !== -1 && currentIndex < allAnalysesSorted.length - 1 
    ? allAnalysesSorted[currentIndex + 1] 
    : undefined;
  const latestRelatedUpdate = analysis.contentType === "analysis"
    ? allAnalysesSorted
        .filter((candidate) => candidate.contentType === "market-update" && candidate.relatedAnalysisSlug === analysis.slug)
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0]
    : undefined;

  if (slug === "revolutionrace-iciw") {
    return (
      <>
        <ReportComment
          data={analysis}
          markdown={rvrcIciwMarkdown}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist}
          isWatchlistLoading={isWatchlistLoading}
          nextAnalysis={nextAnalysis}
        />
        {analysisMeta}
      </>
    );
  }

  // Custom view for Axfood Q2 2026 Report Comment
  if (slug === "axfood-q2-2026") {
    return (
      <>
        <ReportComment data={analysis} markdown={axfoodQ2Markdown} onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} nextAnalysis={nextAnalysis} />
        <MobileReadingProgress 
          label="analys" 
          analysisSlug={analysis.slug}
          contentType={analysis.contentType || "analysis"}
          companyName={analysis.title}
          ticker={analysis.ticker}
          nextTitle={nextAnalysis?.title} 
          nextHref={nextAnalysis ? `/analys/${nextAnalysis.slug}` : undefined} 
        />
        
        {/* Floating Save Button */}
        <div className="fixed bottom-24 right-6 z-40">
          <button
            onClick={toggleSave}
            disabled={isSaveLoading}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl border backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              isSaved 
                ? 'bg-primary/20 border-primary/30 text-primary shadow-primary/10'
                : 'bg-card/90 border-border text-foreground hover:bg-muted/80'
            } ${isSaveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaveLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : isSaved ? (
              <Bookmark size={14} fill="currentColor" className="text-primary" />
            ) : (
              <Bookmark size={14} />
            )}
            <span>{isSaveLoading ? 'Laddar...' : isSaved ? 'Sparad' : 'Spara analys'}</span>
          </button>
        </div>

        {(watchlistError || saveError) && (
          <div className="fixed bottom-6 right-6 z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-red-600 max-w-sm">
            <AlertCircle size={20} className="shrink-0" />
            <div className="flex-1 text-sm font-medium">{watchlistError || saveError}</div>
            <button onClick={() => { setWatchlistError(null); setSaveError(null); }} className="text-white/80 hover:text-white cursor-pointer shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
        {analysisMeta}
      </>
    );
  }

  // Check for specialized high-fidelity views
  if (analysis.deepDiveComponent && DEEP_DIVE_COMPONENTS[analysis.deepDiveComponent as keyof typeof DEEP_DIVE_COMPONENTS]) {
    const Component = DEEP_DIVE_COMPONENTS[analysis.deepDiveComponent as keyof typeof DEEP_DIVE_COMPONENTS];
    return (
      <>
        {latestRelatedUpdate && <LatestRelatedUpdateCallout update={latestRelatedUpdate} />}
        <Suspense fallback={<DeepDiveLoading />}>
          <Component data={analysis} onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} nextAnalysis={nextAnalysis} />
        </Suspense>
        <MobileReadingProgress 
          label="analys"
          analysisSlug={analysis.slug}
          contentType={analysis.contentType || "analysis"}
          companyName={analysis.title}
          ticker={analysis.ticker}
          nextTitle={nextAnalysis?.title}
          nextHref={nextAnalysis ? `/analys/${nextAnalysis.slug}` : undefined} 
        />

        {/* Floating Save Button */}
        <div className="fixed bottom-24 right-6 z-40">
          <button
            onClick={toggleSave}
            disabled={isSaveLoading}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl border backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              isSaved 
                ? 'bg-primary/20 border-primary/30 text-primary shadow-primary/10'
                : 'bg-card/90 border-border text-foreground hover:bg-muted/80'
            } ${isSaveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaveLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : isSaved ? (
              <Bookmark size={14} fill="currentColor" className="text-primary" />
            ) : (
              <Bookmark size={14} />
            )}
            <span>{isSaveLoading ? 'Laddar...' : isSaved ? 'Sparad' : 'Spara analys'}</span>
          </button>
        </div>

        {(watchlistError || saveError) && (
          <div className="fixed bottom-6 right-6 z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-red-600 max-w-sm">
            <AlertCircle size={20} className="shrink-0" />
            <div className="flex-1 text-sm font-medium">{watchlistError || saveError}</div>
            <button onClick={() => { setWatchlistError(null); setSaveError(null); }} className="text-white/80 hover:text-white cursor-pointer shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
        {analysisMeta}
      </>
    );
  }

  if (analysis.templateVersion === "v10") {
    return (
      <>
        {latestRelatedUpdate && <LatestRelatedUpdateCallout update={latestRelatedUpdate} />}
        <ComprehensiveAnalysisV10 data={analysis} onToggleWatchlist={toggleWatchlist} isInWatchlist={isInWatchlist} isWatchlistLoading={isWatchlistLoading} nextAnalysis={nextAnalysis} />
        <MobileReadingProgress
          label="analys"
          analysisSlug={analysis.slug}
          contentType={analysis.contentType || "analysis"}
          companyName={analysis.title}
          ticker={analysis.ticker}
          nextTitle={nextAnalysis?.title}
          nextHref={nextAnalysis ? `/analys/${nextAnalysis.slug}` : undefined}
        />
        {analysisMeta}
      </>
    );
  }

  // Use the new comprehensive analysis template for all other stocks
  return (
    <>
      {latestRelatedUpdate && <LatestRelatedUpdateCallout update={latestRelatedUpdate} />}
      <ComprehensiveAnalysis 
        data={analysis} 
        onToggleWatchlist={toggleWatchlist} 
        isInWatchlist={isInWatchlist} 
        isWatchlistLoading={isWatchlistLoading} 
        isSaved={isSaved}
        isSaveLoading={isSaveLoading}
        onToggleSave={toggleSave}
        nextAnalysis={nextAnalysis} 
      />
      <MobileReadingProgress 
        label="analys" 
        analysisSlug={analysis.slug}
        contentType={analysis.contentType || "analysis"}
        companyName={analysis.title}
        ticker={analysis.ticker}
        nextTitle={nextAnalysis?.title} 
        nextHref={nextAnalysis ? `/analys/${nextAnalysis.slug}` : undefined} 
      />

      {/* Floating Save Button */}
      <div className="fixed bottom-24 right-6 z-40 lg:hidden">
        <button
          onClick={toggleSave}
          disabled={isSaveLoading}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl border backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            isSaved 
              ? 'bg-primary/20 border-primary/30 text-primary shadow-primary/10'
              : 'bg-card/90 border-border text-foreground hover:bg-muted/80'
          } ${isSaveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaveLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : isSaved ? (
            <Bookmark size={14} fill="currentColor" className="text-primary" />
          ) : (
            <Bookmark size={14} />
          )}
          <span>{isSaveLoading ? 'Laddar...' : isSaved ? 'Sparad' : 'Spara analys'}</span>
        </button>
      </div>

      {(watchlistError || saveError) && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-red-600 max-w-sm">
          <AlertCircle size={20} className="shrink-0" />
          <div className="flex-1 text-sm font-medium">{watchlistError || saveError}</div>
          <button onClick={() => { setWatchlistError(null); setSaveError(null); }} className="text-white/80 hover:text-white cursor-pointer shrink-0">
            <X size={16} />
          </button>
        </div>
      )}
      {analysisMeta}
    </>
  );
}
