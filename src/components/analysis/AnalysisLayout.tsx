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
  accentColor = "#76B900",
  theme = 'light',
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
    <div className={`min-h-screen flex font-sans selection:bg-black/10 ${isLight ? 'bg-[#fcfbf8] text-[#1a1a1a]' : 'bg-[#0f0f0f] text-white'}`}>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 right-4 z-[100] lg:hidden w-10 h-10 border rounded-lg flex items-center justify-center shadow-xl ${isLight ? 'bg-white border-black/5 text-black' : 'bg-white/5 border-white/10 text-white'}`}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 z-[95] flex flex-col transition-transform duration-300 border-r
        ${isLight ? 'bg-white border-black/5' : 'bg-[#111] border-white/5'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className={`p-7 border-b ${isLight ? 'border-black/5' : 'border-white/5'}`}>
          <Link to="/analys" className={`inline-flex items-center gap-2 text-[10px] font-mono transition-colors mb-4 ${isLight ? 'text-gray-500 hover:text-black' : 'text-gray-400 hover:text-white'}`}>
            <ArrowLeft size={12} /> TILLBAKA
          </Link>
          <Link to={`/aktier/${stockLink}`} className="group block">
            <div className="font-serif text-xl font-bold tracking-[0.25em] group-hover:opacity-80 transition-opacity" style={{ color: accentColor }}>{companyName}</div>
          </Link>
          <div className={`text-[10px] tracking-widest uppercase mt-1 font-mono ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</div>
          
          {onToggleWatchlist && (
            <button 
              onClick={onToggleWatchlist}
              disabled={isWatchlistLoading}
              className={`
                mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border
                ${isInWatchlist 
                  ? (isLight ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-500/10 border-amber-500/20 text-amber-500')
                  : (isLight ? 'bg-black/5 border-black/5 text-gray-600 hover:bg-black/10' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10')}
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
              {isInWatchlist ? 'I BEVAKNINGSLISTA' : 'LÄGG TILL I BEVAKNING'}
            </button>
          )}
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className={`px-6 py-3 text-[9px] font-mono tracking-widest uppercase ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>Rapport</div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`
                w-full flex items-center gap-3 px-6 py-2.5 text-xs transition-all border-l-2
                ${activeSection === s.id 
                  ? (isLight ? 'bg-black/5 border-black text-black' : 'bg-white/5 border-white text-white')
                  : (isLight ? 'border-transparent text-gray-500 hover:bg-black/5 hover:text-black' : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-white')}
              `}
              style={{ borderLeftColor: activeSection === s.id ? accentColor : 'transparent' }}
            >
              <span className="font-mono text-[10px] w-4" style={{ color: accentColor }}>{s.number}</span>
              {s.title}
            </button>
          ))}
        </nav>

        <div className={`p-6 border-t text-[10px] font-mono leading-relaxed ${isLight ? 'border-black/5 text-gray-400' : 'border-white/5 text-gray-600'}`}>
          Analys: {date}<br />
          {dataSources}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-w-0">
        {children}
      </main>
    </div>
  );
}
