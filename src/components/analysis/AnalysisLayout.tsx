import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, Star, StarOff, Loader2 } from 'lucide-react';

export interface AnalysisSection {
  id: string;
  number?: string;
  title: string;
}

interface AnalysisLayoutProps {
  companyName: string;
  stockSlug?: string;
  ticker?: string;
  subtitle?: string;
  date?: string;
  dataSources?: string;
  sections: AnalysisSection[];
  children: React.ReactNode;
  accentColor?: string;
  theme?: 'light' | 'dark';
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
}

export default function AnalysisLayout({
  companyName,
  stockSlug,
  ticker,
  subtitle = "Finansiell Analys",
  date = new Date().toLocaleDateString(),
  dataSources = "Källa: Börsanalys.se",
  sections,
  children,
  accentColor = "#1e40af",
  theme = 'dark',
  isInWatchlist,
  isWatchlistLoading,
  onToggleWatchlist
}: AnalysisLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const stockLink = stockSlug || companyName.toLowerCase().split(' ')[0];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
    }
    setIsSidebarOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex font-sans selection:bg-primary/20 ${isLight ? 'bg-background text-foreground' : 'bg-background text-foreground'}`}>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-6 z-[100] lg:hidden w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center shadow-2xl text-foreground"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 z-[95] flex flex-col transition-transform duration-500 border-r border-border
        ${isLight ? 'bg-card' : 'bg-card'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 border-b border-border">
          <Link to="/analys" className="inline-flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-primary transition-colors mb-8 uppercase tracking-widest">
            <ArrowLeft size={12} /> Tillbaka till arkiv
          </Link>
          <Link to={`/aktier/${stockLink}`} className="group block mb-2">
            <div className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors leading-none" style={{ color: accentColor }}>{companyName}</div>
          </Link>
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{ticker} · {subtitle}</div>
          
          {onToggleWatchlist && (
            <button 
              onClick={onToggleWatchlist}
              disabled={isWatchlistLoading}
              className={`
                mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border
                ${isInWatchlist 
                  ? 'bg-primary/10 border-primary/20 text-primary shadow-lg shadow-primary/5'
                  : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'}
                ${isWatchlistLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isWatchlistLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : isInWatchlist ? (
                <Star size={14} fill="currentColor" />
              ) : (
                <StarOff size={14} />
              )}
              {isInWatchlist ? 'I bevakningslista' : 'Bevaka aktie'}
            </button>
          )}
        </div>
        
        <nav className="flex-1 py-8 overflow-y-auto scrollbar-hide">
          <div className="px-8 mb-4 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em]">Analysrapport</div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`
                w-full flex items-center gap-4 px-8 py-3 text-xs font-bold transition-all border-l-4
                ${activeSection === s.id 
                  ? 'bg-primary/5 border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}
              `}
            >
              <span className="font-black text-[10px] w-6 opacity-50">{s.number}</span>
              <span className="tracking-tight">{s.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-border bg-muted/10">
          <div className="flex flex-col gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>Publicerad: {date}</span>
            <span className="opacity-50">{dataSources}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-w-0 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
          {children}
        </div>
      </main>
    </div>
  );
}
