import React, { useEffect, useState } from "react";
import { Star, Trash2, TrendingUp, TrendingDown, ChevronRight, Plus, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { analyses } from "../../data/analyses";
import { getLatestChecklist, getLatestContent, getWatchlistActions, normalizeTicker, type SavedChecklistLike, type WatchlistContent } from "../../lib/profileOverview";
import { fetchWithCache } from "../../services/stockService";

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  slug: string;
  price?: number;
  change?: number;
  addedAt: string;
  latestContent: WatchlistContent | null;
  checklist: SavedChecklistLike | null;
}

function getCompanyDetails(ticker: string) {
  const analysisEntry = Object.entries(analyses).find(
    ([_, data]) => normalizeTicker(data.ticker) === normalizeTicker(ticker)
  );
  if (analysisEntry) {
    return {
      name: analysisEntry[1].title,
      slug: analysisEntry[0]
    };
  }
  return {
    name: ticker,
    slug: ticker.toLowerCase()
  };
}

export default function Watchlist() {
  const { user, openLoginModal } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const [res, checklistRes] = await Promise.all([
          fetch('/api/watchlist', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/stock-checklists', { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        if (res.ok) {
          const list = await res.json();
          const checklists: SavedChecklistLike[] = checklistRes.ok ? await checklistRes.json() : [];
          if (!checklistRes.ok) console.warn("Could not load checklist context for watchlist.");
          // Map database items to WatchlistItems and fetch quotes
          const mappedItems = await Promise.all(
            list.map(async (dbItem: any) => {
              const details = getCompanyDetails(dbItem.ticker);
              let price: number | undefined = undefined;
              let change: number | undefined = undefined;

              try {
                const quote = await fetchWithCache(dbItem.ticker);
                if (quote) {
                  price = quote.regularMarketPrice;
                  change = parseFloat(quote.regularMarketChangePercent.toFixed(2));
                }
              } catch (qErr) {
                console.error(`Failed to fetch quote for ${dbItem.ticker}:`, qErr);
              }

              return {
                id: dbItem.id.toString(),
                symbol: dbItem.ticker.toUpperCase(),
                name: details.name,
                slug: details.slug,
                price,
                change,
                addedAt: dbItem.createdAt,
                latestContent: getLatestContent(Object.values(analyses), dbItem.ticker),
                checklist: getLatestChecklist(checklists, dbItem.ticker),
              };
            })
          );

          setWatchlist(mappedItems);
        } else {
          const err = await res.json();
          setError(err.error || 'Kunde inte hämta bevakningslistan.');
        }
      } catch (err) {
        console.error("Watchlist fetch failed:", err);
        setError('Kunde inte hämta bevakningslistan på grund av anslutningsfel.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (ticker: string) => {
    if (!user) return;
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/watchlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ticker })
      });

      if (res.ok) {
        setWatchlist(prev => prev.filter(item => item.symbol.toUpperCase() !== ticker.toUpperCase()));
      } else {
        const err = await res.json();
        setError(err.error || 'Kunde inte ta bort aktien.');
      }
    } catch (err) {
      console.error("Failed to delete from watchlist:", err);
      setError('Anslutningsfel vid borttagning av aktie.');
    }
  };

  if (!user) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
        <Star size={40} className="mx-auto mb-4 text-primary/20" />
        <h3 className="font-serif text-xl font-bold mb-2">Din bevakningslista</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
          Logga in för att spara dina favoritaktier och få snabb tillgång till analyser.
        </p>
        <button 
          onClick={openLoginModal}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Logga in
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-10 h-10 bg-muted rounded-full mb-4" />
          <div className="h-4 w-32 bg-muted rounded mb-2" />
          <div className="h-3 w-48 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="flex justify-end border-b border-border p-4">
        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
          {watchlist.length} bolag
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border-b border-border text-red-500 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="divide-y divide-border">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div key={item.id} className="relative p-4 transition-colors group hover:bg-muted/50">
              {(() => {
                const actions = getWatchlistActions({
                  ticker: item.symbol,
                  companyName: item.name,
                  latestContent: item.latestContent,
                  checklist: item.checklist,
                });
                const rowDestination = item.latestContent ? `/analys/${item.latestContent.slug}` : `/analys/${item.slug}`;
                const contentLabel = item.latestContent?.contentType === "report-commentary" ? "Rapportkommentar" : "Senaste analys";
                const checklistLabel = item.checklist ? (item.checklist.status === "completed" ? "Checklista slutförd" : "Checklista påbörjad") : "Ingen checklista";

                return (
                  <>
                    <Link to={rowDestination} aria-label={`Öppna ${item.latestContent?.title || item.name}`} className="absolute inset-0 z-0 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" />
                    <div className="relative z-10 flex flex-col gap-4 pointer-events-none sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-xs">
                          {item.symbol}
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-base text-foreground">{item.name}</div>
                          <div className="text-[10px] text-foreground/70 uppercase tracking-wider">{item.symbol}</div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                            <span>{item.latestContent ? `${contentLabel}: ${new Date(item.latestContent.date).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })}` : "Inget relevant innehåll"}</span>
                            <span aria-hidden="true">·</span>
                            <span>{checklistLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
                        {item.price !== undefined && (
                          <div className="pointer-events-none text-right">
                            <div className="font-bold text-sm">{item.price} SEK</div>
                            {item.change !== undefined && (
                              <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${item.change >= 0 ? "text-primary" : "text-red-500"}`}>
                                {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {item.change}%
                              </div>
                            )}
                          </div>
                        )}
                        <ChevronRight size={16} className="pointer-events-none text-muted-foreground" />
                        {actions.map((action) => (
                          <Link
                            key={action.label}
                            to={action.to}
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`${action.label} för ${item.name}`}
                            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-black text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {action.label} <ArrowRight size={13} />
                          </Link>
                        ))}
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            if (!window.confirm(`Ta bort ${item.name} från bevakningslistan?`)) return;
                            removeFromWatchlist(item.symbol);
                          }}
                          aria-label={`Ta bort ${item.name} från bevakningen`}
                          title={`Ta bort ${item.name} från bevakningen`}
                          className="pointer-events-auto p-2 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-muted-foreground text-sm mb-4">Du har inga aktier i din bevakningslista än.</p>
            <Link 
              to="/analys" 
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              Utforska analyser <Plus size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
