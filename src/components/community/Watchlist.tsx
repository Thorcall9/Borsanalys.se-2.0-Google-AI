import React, { useEffect, useState } from "react";
import { Star, Trash2, TrendingUp, TrendingDown, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { db, handleFirestoreError, OperationType } from "../../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price?: number;
  change?: number;
  addedAt: any;
}

export default function Watchlist() {
  const { user, openLoginModal } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const path = "watchlists";
    const q = query(collection(db, path), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WatchlistItem[];
      
      // Sort by addedAt
      setWatchlist(items.sort((a, b) => b.addedAt?.seconds - a.addedAt?.seconds));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsub();
  }, [user]);

  const removeFromWatchlist = async (id: string) => {
    const path = `watchlists/${id}`;
    try {
      await deleteDoc(doc(db, "watchlists", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
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
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
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

      <div className="divide-y divide-border">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center justify-between">
                <Link to={`/analys/${item.symbol.toLowerCase()}`} className="flex-1">
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
                  {item.price && (
                    <div className="text-right">
                      <div className="font-bold text-sm">{item.price} SEK</div>
                      <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${
                        item.change && item.change >= 0 ? 'text-primary' : 'text-red-500'
                      }`}>
                        {item.change && item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {item.change}%
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={() => removeFromWatchlist(item.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
