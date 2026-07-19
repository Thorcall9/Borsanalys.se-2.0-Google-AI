import React, { useEffect, useState } from "react";
import { Star, Trash2, TrendingUp, TrendingDown, ChevronRight, Plus, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { analyses } from "../../data/analyses";
import { fetchWithCache } from "../../services/stockService";

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  slug: string;
  price?: number;
  change?: number;
  addedAt: string;
}

function getCompanyDetails(ticker: string) {
  const analysisEntry = Object.entries(analyses).find(
    ([_, data]) => data.ticker.toUpperCase() === ticker.toUpperCase()
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
        const res = await fetch('/api/watchlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const list = await res.json();
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
                addedAt: dbItem.createdAt
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
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star size={20} className="text-primary fill-primary" />
          <h3 className="font-serif text-lg font-bold">Bevakningslista</h3>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
          {watchlist.length} aktier
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
            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center justify-between">
                <Link to={`/analys/${item.slug}`} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-xs">
                      {item.symbol}
                    </div>
                    <div>
                      <div className="font-black text-base text-foreground">{item.name}</div>
                      <div className="text-[10px] text-foreground/70 uppercase tracking-wider">{item.symbol}</div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-4">
                  {item.price !== undefined && (
                    <div className="text-right">
                      <div className="font-bold text-sm">{item.price} SEK</div>
                      {item.change !== undefined && (
                        <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${
                          item.change >= 0 ? 'text-primary' : 'text-red-500'
                        }`}>
                          {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {item.change}%
                        </div>
                      )}
                    </div>
                  )}
                  <button 
                    onClick={() => removeFromWatchlist(item.symbol)}
                    aria-label={`Ta bort ${item.name} från bevakningen`}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </div>
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
