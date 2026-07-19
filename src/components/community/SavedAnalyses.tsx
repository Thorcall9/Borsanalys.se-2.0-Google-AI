import React, { useEffect, useState } from "react";
import { Bookmark, Trash2, ChevronRight, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface SavedAnalysisItem {
  id: string;
  slug: string;
  title: string;
  ticker: string;
  createdAt: string;
}

interface SavedAnalysesProps {
  limit?: number;
}

export default function SavedAnalyses({ limit }: SavedAnalysesProps) {
  const { user } = useAuth();
  const [savedList, setSavedList] = useState<SavedAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSavedAnalyses = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/saved-analyses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const list = await res.json();
          setSavedList(list.map((item: any) => ({
            id: item.id.toString(),
            slug: item.slug,
            title: item.title,
            ticker: item.ticker,
            createdAt: item.createdAt
          })));
        } else {
          const err = await res.json();
          setError(err.error || 'Kunde inte hämta sparade analyser.');
        }
      } catch (err) {
        console.error("Saved analyses fetch failed:", err);
        setError('Kunde inte hämta sparade analyser på grund av anslutningsfel.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedAnalyses();
  }, [user]);

  const removeSavedAnalysis = async (slug: string) => {
    if (!user) return;
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/saved-analyses', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ slug })
      });

      if (res.ok) {
        setSavedList(prev => prev.filter(item => item.slug !== slug));
      } else {
        const err = await res.json();
        setError(err.error || 'Kunde inte ta bort den sparade analysen.');
      }
    } catch (err) {
      console.error("Failed to delete saved analysis:", err);
      setError('Anslutningsfel vid borttagning av sparad analys.');
    }
  };

  if (!user) return null;

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
          <Bookmark size={20} className="text-primary fill-primary" />
          <h3 className="font-serif text-lg font-bold">Sparade analyser</h3>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
          {savedList.length} sparade
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border-b border-border text-red-500 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="divide-y divide-border">
        {savedList.length > 0 ? (
          savedList.slice(0, limit).map((item) => (
            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center justify-between">
                <Link to={`/analys/${item.slug}`} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-xs">
                      {item.ticker}
                    </div>
                    <div>
                      <div className="font-black text-base text-foreground">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span>{item.ticker}</span>
                        <span>•</span>
                        <Calendar size={10} />
                        <span>Sparad {new Date(item.createdAt).toLocaleDateString('sv-SE')}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => removeSavedAnalysis(item.slug)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Ta bort sparad analys"
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
            <p className="text-muted-foreground text-sm mb-4">Du har inga sparade analyser än.</p>
            <Link 
              to="/analys" 
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              Utforska analyser <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </div>
      {limit && savedList.length > limit && (
        <div className="border-t border-border px-6 py-4">
          <Link to="/analys" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            Visa alla sparade analyser <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}
