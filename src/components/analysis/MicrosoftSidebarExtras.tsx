import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Star,
  Loader2,
  ExternalLink,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MicrosoftSidebarExtrasProps {
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
  isMobile?: boolean;
}

export const MicrosoftSidebarExtras: React.FC<MicrosoftSidebarExtrasProps> = ({
  isInWatchlist,
  isWatchlistLoading,
  onToggleWatchlist,
  isMobile = false
}) => {
  return (
    <div className={`space-y-8 ${isMobile ? 'mt-12 pt-12 border-t border-border/50' : 'px-8 pb-12'}`}>
      {/* Identity & Quality Signal */}
      {!isMobile && (
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
            <ShieldCheck size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[8px] font-black uppercase tracking-widest">
                Quality Leader
              </div>
            </div>
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 opacity-70">Status</div>
            <div className="text-sm font-bold text-foreground leading-tight">Strategisk marknadsposition med hög vallgrav.</div>
          </div>
        </div>
      )}

      {/* Watchlist CTA (Integrated) */}
      {onToggleWatchlist && (
        <div className={isMobile ? 'hidden' : 'block'}>
          <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-4">Bevakning</div>
          <button 
            onClick={onToggleWatchlist}
            disabled={isWatchlistLoading}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border
              ${isInWatchlist 
                ? 'bg-primary/10 border-primary/20 text-primary shadow-lg shadow-primary/5'
                : 'bg-foreground text-background border-transparent hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10'}
              ${isWatchlistLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isWatchlistLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : isInWatchlist ? (
              <Star size={14} fill="currentColor" />
            ) : (
              <Zap size={14} />
            )}
            {isInWatchlist ? 'I din bevakningslista' : 'Bevaka Microsoft'}
          </button>
        </div>
      )}

      {/* Editorial: Relaterade Case */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em]">Relaterade Case</div>
          {!isMobile && <Search size={12} className="text-muted-foreground/30" />}
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              title: "Nvidia",
              slug: "nvidia",
              ticker: "NVDA",
              desc: "Hårdvaran bakom AI-boomen. Direkt jämförelse med Azures expansion.",
              tag: "AI / Cloud"
            },
            {
              title: "Alphabet",
              slug: "alphabet",
              ticker: "GOOGL",
              desc: "Den andra giganten inom moln och sök. Viktig konkurrent i AI-racet.",
              tag: "Cloud / Search"
            }
          ].map((item) => (
            <Link 
              key={item.slug}
              to={`/analys/${item.slug}`}
              className="group block p-4 bg-muted/30 border border-border/50 rounded-2xl hover:bg-muted/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">{item.ticker}</div>
                  <div className="text-xs font-black group-hover:text-primary transition-colors">{item.title}</div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-[10px] leading-relaxed text-muted-foreground line-clamp-2">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Premium Ad Simulation / External Link */}
      <div className="pt-4">
        <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:border-primary/20 transition-colors">
          <div className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] mb-4">Premium Integration</div>
          <div className="space-y-3">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                 <TrendingUp size={16} />
               </div>
               <div>
                 <div className="text-[10px] font-black leading-tight">Live Terminal</div>
                 <div className="text-[8px] text-muted-foreground uppercase font-medium">Borsanalys Pro</div>
               </div>
             </div>
             <p className="text-[9px] text-muted-foreground leading-relaxed">
               Få realtidsdata och institutionell analys för tech-sektorn.
             </p>
             <div className="flex items-center gap-1 text-[8px] font-black text-primary uppercase tracking-widest pt-1">
               Läs mer <ExternalLink size={10} />
             </div>
          </div>
          <div className="absolute top-0 right-0 p-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
