import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../../firebase";
import { doc, onSnapshot, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

interface StockSentimentProps {
  symbol: string;
}

interface SentimentData {
  bullCount: number;
  bearCount: number;
  lastUpdated: any;
}

export default function StockSentiment({ symbol }: StockSentimentProps) {
  const { user, login } = useAuth();
  const [sentiment, setSentiment] = useState<SentimentData>({ bullCount: 0, bearCount: 0, lastUpdated: null });
  const [userVote, setUserVote] = useState<'bull' | 'bear' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    // Listen to sentiment data
    const sentimentPath = `stock_sentiment/${symbol}`;
    const sentimentRef = doc(db, "stock_sentiment", symbol);
    const unsubSentiment = onSnapshot(sentimentRef, (doc) => {
      if (doc.exists()) {
        setSentiment(doc.data() as SentimentData);
      } else {
        setSentiment({ bullCount: 0, bearCount: 0, lastUpdated: null });
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, sentimentPath);
    });

    // Listen to user's vote if logged in
    let unsubVote = () => {};
    if (user) {
      const votePath = `user_votes/${user.uid}_${symbol}`;
      const voteRef = doc(db, "user_votes", `${user.uid}_${symbol}`);
      unsubVote = onSnapshot(voteRef, (doc) => {
        if (doc.exists()) {
          setUserVote(doc.data().vote);
        } else {
          setUserVote(null);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, votePath);
      });
    }

    return () => {
      unsubSentiment();
      unsubVote();
    };
  }, [symbol, user]);

  const handleVote = async (vote: 'bull' | 'bear') => {
    if (!user) {
      login();
      return;
    }

    const voteId = `${user.uid}_${symbol}`;
    const votePath = `user_votes/${voteId}`;
    const sentimentPath = `stock_sentiment/${symbol}`;
    const voteRef = doc(db, "user_votes", voteId);
    const sentimentRef = doc(db, "stock_sentiment", symbol);

    try {
      // Check if user already voted
      const voteDoc = await getDoc(voteRef);
      const existingVote = voteDoc.exists() ? voteDoc.data().vote : null;

      if (existingVote === vote) {
        // Remove vote
        await setDoc(voteRef, { vote: null }, { merge: true }); 
        await updateDoc(sentimentRef, {
          [vote === 'bull' ? 'bullCount' : 'bearCount']: increment(-1),
          lastUpdated: new Date()
        });
      } else {
        // Add or change vote
        await setDoc(voteRef, {
          uid: user.uid,
          symbol,
          vote,
          timestamp: new Date()
        });

        // Update counts
        const updates: any = { lastUpdated: new Date() };
        if (existingVote) {
          updates[existingVote === 'bull' ? 'bullCount' : 'bearCount'] = increment(-1);
        }
        updates[vote === 'bull' ? 'bullCount' : 'bearCount'] = increment(1);

        // Ensure sentiment doc exists
        const sentimentDoc = await getDoc(sentimentRef);
        if (!sentimentDoc.exists()) {
          await setDoc(sentimentRef, { bullCount: 0, bearCount: 0, lastUpdated: new Date() });
        }
        await updateDoc(sentimentRef, updates);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, votePath);
    }
  };

  const totalVotes = sentiment.bullCount + sentiment.bearCount;
  const bullPercent = totalVotes > 0 ? Math.round((sentiment.bullCount / totalVotes) * 100) : 50;
  const bearPercent = 100 - bullPercent;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-primary" />
          <h3 className="font-serif text-lg font-bold">Community Sentiment</h3>
        </div>
        <div className="text-xs text-muted font-medium">
          {totalVotes} röster
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="relative h-4 w-full bg-red-500/10 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${bullPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold text-white pointer-events-none">
            <span>BULL {bullPercent}%</span>
            <span>BEAR {bearPercent}%</span>
          </div>
        </div>

        {/* Vote Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleVote('bull')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
              userVote === 'bull' 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-background border-border hover:border-primary/50 text-muted hover:text-primary'
            }`}
          >
            <TrendingUp size={24} className="mb-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Bull</span>
          </button>

          <button
            onClick={() => handleVote('bear')}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
              userVote === 'bear' 
                ? 'bg-red-500/10 border-red-500 text-red-500' 
                : 'bg-background border-border hover:border-red-500/50 text-muted hover:text-red-500'
            }`}
          >
            <TrendingDown size={24} className="mb-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Bear</span>
          </button>
        </div>

        {!user && (
          <p className="text-center text-xs text-muted">
            Logga in för att rösta och se communityns förväntningar.
          </p>
        )}
      </div>
    </div>
  );
}
