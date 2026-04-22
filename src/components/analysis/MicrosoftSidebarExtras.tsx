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
  Search,
  CheckCircle2
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
    <div className={`space-y-10 ${isMobile ? 'mt-12 pt-12 border-t border-border/50 px-6' : 'px-8 pb-32'}`}>
      
      {/* 1. Identity & Quality Signal - MOVED UP & BOLDER */}
      {!isMobile && (
        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl shadow-primary/5">
          <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12">
            <ShieldCheck size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                Quality Leader
              </div>
            </div>
            <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2 opacity-60">Status</div>
            <div className="text-xl font-black text-foreground leading-tight tracking-tighter">Strategisk marknadsposition med hög vallgrav.</div>
          </div>
        </div>
      )}

      {/* 2. Watchlist CTA - BIGGER & MORE PREMIUM */}
      {onToggleWatchlist && (
        <div className={isMobile ? 'hidden' : 'block'}>
          <div className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.4em] mb-5">Bevakning</div>
          <button 
            onClick={onToggleWatchlist}
            disabled={isWatchlistLoading}
            className={`
              w-full flex items-center justify-center gap-4 px-8 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border
              ${isInWatchlist 
                ? 'bg-primary/10 border-primary/30 text-primary shadow-2xl shadow-primary/10'
                : 'bg-foreground text-background border-transparent hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-black/20'}
              ${isWatchlistLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isWatchlistLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isInWatchlist ? (
              <Star size={16} fill="currentColor" />
            ) : (
              <Zap size={16} />
            )}
            {isInWatchlist ? 'I bevakningslista' : 'Bevaka Microsoft'}
          </button>
        </div>
      )}

      {/* 3. Editorial: Relaterade Case - BETTER CARDS */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.4em]">Relaterade Case</div>
          {!isMobile && <TrendingUp size={14} className="text-primary/40" />}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              title: "Nvidia",
              slug: "nvidia",
              ticker: "NVDA",
              desc: "Hårdvaran bakom AI-boomen. Direkt jämförelse med Azures expansion.",
              color: "#76B900"
            },
            {
              title: "Alphabet",
              slug: "alphabet",
              ticker: "alphabet",
              desc: "Den andra giganten inom moln och sök. Viktig konkurrent i AI-racet.",
              color: "#4285F4"
            }
          ].map((item) => (
            <Link 
              key={item.slug}
              to={`/analys/${item.slug}`}
              className="group block p-6 bg-muted/40 border border-border/50 rounded-[1.5rem] hover:bg-muted/60 hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <div className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-background/50 inline-block" style={{ color: item.color }}>{item.ticker}</div>
                  <div className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{item.title}</div>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-500" />
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground font-medium opacity-80">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. PREMIUM INTEGRATION (AD) - HIGH VISIBILITY */}
      <div className="pt-6">
        <div className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.4em] mb-5">Premium Integration</div>
        <div className="bg-foreground text-background rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700">
          <div className="absolute top-0 right-0 p-4">
            <div className="px-2 py-1 bg-primary text-primary-foreground rounded text-[8px] font-black uppercase tracking-widest">Live</div>
          </div>
          
          <div className="space-y-5 relative z-10">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                 <TrendingUp size={24} />
               </div>
               <div>
                 <div className="text-base font-black leading-tight italic">Live Terminal</div>
                 <div className="text-[10px] text-primary uppercase font-black tracking-widest">Borsanalys Pro</div>
               </div>
             </div>
             <p className="text-xs text-background/80 leading-relaxed font-bold">
               Få realtidsdata, AI-sentiment och institutionell analys för hela tech-sektorn direkt i din webbläsare.
             </p>
             <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-[0.2em] pt-2 group-hover:gap-4 transition-all duration-500">
               Läs mer <ArrowRight size={14} />
             </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </div>

    </div>
  );
};
