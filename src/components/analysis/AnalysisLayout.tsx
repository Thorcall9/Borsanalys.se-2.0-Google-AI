import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, Star, StarOff, Loader2, PanelLeftClose, PanelLeftOpen, Bookmark, Check } from 'lucide-react';

import NextAnalysisButton from './NextAnalysisButton';
import { AnalysisData } from '../../types/analysis.js';
import { DesktopAnalysisProgress, useAnalysisProgress } from '../AnalysisProgress';

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
  livePrice?: string;
  liveChange?: string;
  analysisPrice?: number;
  currentPrice?: number;
  currency?: string;
  date?: string;
  dataSources?: string;
  sections: AnalysisSection[];
  children: React.ReactNode;
  accentColor?: string;
  theme?: 'light' | 'dark';
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
  isSaved?: boolean;
  isSaveLoading?: boolean;
  onToggleSave?: () => void;
  nextAnalysis?: AnalysisData;
  sidebarExtras?: React.ReactNode;
  hideDefaultWatchlist?: boolean;
  compactSections?: boolean;
  wideSidebar?: boolean;
  hideSidebar?: boolean;
  tightContent?: boolean;
}

export default function AnalysisLayout({
  companyName,
  stockSlug,
  ticker,
  subtitle = "Finansiell Analys",
  livePrice,
  liveChange,
  date = new Date().toLocaleDateString(),
  dataSources = "Källa: Börsanalys.se",
  sections,
  children,
  accentColor = "#10B981",
  theme = 'dark',
  isInWatchlist,
  isWatchlistLoading,
  onToggleWatchlist,
  isSaved,
  isSaveLoading,
  onToggleSave,
  nextAnalysis,
  analysisPrice,
  currentPrice,
  currency = "SEK",
  sidebarExtras,
  hideDefaultWatchlist = false,
  compactSections = false,
  wideSidebar = false,
  hideSidebar = false,
  tightContent = false
}: AnalysisLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const progressSnapshot = useAnalysisProgress({ sections, analysisSlug: stockSlug, contentType: 'analysis' });
  
  const stockLink = stockSlug || companyName.toLowerCase().split(' ')[0];

  const priceDiff = useMemo(() => {
    if (!analysisPrice || !currentPrice) return null;
    const diff = currentPrice - analysisPrice;
    const percent = (diff / analysisPrice) * 100;
    return {
      diff,
      percent,
      isPositive: diff >= 0
    };
  }, [analysisPrice, currentPrice]);

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

  useEffect(() => {
    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (element) {
        element.dataset.analysisSection = 'true';
        element.dataset.sectionIndex = section.number || String(index + 1);
        element.dataset.sectionTitle = section.title;
      }
    });
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
  const sidebarWidthClass = isSidebarCollapsed ? 'lg:w-16' : wideSidebar ? 'w-80' : 'w-60';
  const mainOffsetClass = isSidebarCollapsed ? 'lg:ml-16' : wideSidebar ? 'lg:ml-80' : 'lg:ml-60';

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
        className="fixed bottom-6 right-6 z-[100] lg:hidden w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      {!hideSidebar && (
        <aside className={`
          fixed top-[73px] left-0 h-[calc(100vh-73px)] ${sidebarWidthClass} ${wideSidebar ? 'border-r-4 border-primary shadow-2xl' : ''} z-[95] flex flex-col transition-[width,transform] duration-500 border-r border-border overflow-y-auto premium-scrollbar
          ${isLight ? 'bg-card' : 'bg-card'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {wideSidebar && (
            <div className="bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest text-center py-1">
              {ticker === 'MSFT' ? 'Microsoft Test Active' : 'Debug Active'}
            </div>
          )}
          <div className={`${isSidebarCollapsed ? 'p-3' : 'p-6'} border-b border-border flex-shrink-0`}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-7`}>
              {!isSidebarCollapsed && (
                <Link to="/analys" className="inline-flex items-center gap-2 text-[9px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                  <ArrowLeft size={12} /> Tillbaka
                </Link>
              )}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                aria-label={isSidebarCollapsed ? 'Visa meny' : 'Fäll ihop meny'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
              </button>
            </div>
            {!isSidebarCollapsed && (
              <>
                <Link to={`/aktier/${stockLink}`} className="group block mb-2">
                  <div className="text-xl font-black tracking-tighter group-hover:text-primary transition-colors leading-none" style={{ color: accentColor }}>{companyName}</div>
                </Link>
                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.16em] leading-relaxed">{ticker} · {subtitle}</div>
              </>
            )}
            
            {livePrice && !isSidebarCollapsed && (
              <div className="mt-4 flex items-center gap-3">
                <div className="text-xl font-black tracking-tighter">{livePrice}</div>
                {liveChange && (
                  <div className={`text-[10px] font-black uppercase tracking-widest ${liveChange.startsWith('+') || !liveChange.startsWith('-') ? 'text-emerald-500' : 'text-danger'}`}>
                    {liveChange}
                  </div>
                )}
              </div>
            )}

             {onToggleWatchlist && !hideDefaultWatchlist && !isSidebarCollapsed && (
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

            {onToggleSave && !isSidebarCollapsed && (
              <button 
                onClick={onToggleSave}
                disabled={isSaveLoading}
                className={`
                  mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border
                  ${isSaved 
                    ? 'bg-primary/10 border-primary/20 text-primary shadow-lg shadow-primary/5'
                    : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'}
                  ${isSaveLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSaveLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : isSaved ? (
                  <Bookmark size={14} fill="currentColor" />
                ) : (
                  <Bookmark size={14} />
                )}
                {isSaved ? 'Sparad' : 'Spara analys'}
              </button>
            )}
          </div>
          
          <nav className={`${isSidebarCollapsed ? 'py-4' : 'py-6'}`}>
            {!isSidebarCollapsed && (
              <DesktopAnalysisProgress snapshot={progressSnapshot} />
            )}
            {!isSidebarCollapsed && (
              <div className={`${wideSidebar ? 'px-6 mb-5 text-xs' : 'px-6 mb-4 text-[9px]'} font-black text-muted-foreground/50 uppercase tracking-[0.22em]`}>Analysrapport</div>
            )}
            {progressSnapshot.sections.map((s, index) => (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  title={s.title}
                  className={`
                    w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-6'} ${compactSections || isSidebarCollapsed ? 'py-2' : 'py-2.5'} text-[11px] font-bold transition-all border-l-4
                    ${progressSnapshot.activeId === s.id 
                      ? 'bg-primary/5 border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}
                  `}
                >
                  <span className={`font-black text-[10px] ${isSidebarCollapsed ? 'w-auto opacity-80' : 'w-5 opacity-50'} ${compactSections && !isSidebarCollapsed ? 'hidden' : 'block'} ${index < progressSnapshot.activeIndex || progressSnapshot.percent >= 100 ? 'text-primary opacity-100' : ''}`}>{index < progressSnapshot.activeIndex || progressSnapshot.percent >= 100 ? <Check size={12} /> : s.number}</span>
                  {!isSidebarCollapsed && (
                    <span className={`${compactSections ? 'text-[11px] uppercase tracking-wider' : wideSidebar ? 'text-xs tracking-tight' : 'tracking-tight'} leading-snug text-left`}>{s.title}</span>
                  )}
                </button>
                

              </React.Fragment>
            ))}
            
            {sidebarExtras && !isSidebarCollapsed && (
              <div className="mt-8 pt-8 border-t border-border/50">
                {sidebarExtras}
              </div>
            )}
          </nav>



          <div className={`${isSidebarCollapsed ? 'hidden' : 'p-6'} border-t border-border bg-muted/10 flex-shrink-0`}>
            <div className="flex flex-col gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <span>Publicerad: {date}</span>
              <span className="opacity-50">{dataSources}</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${hideSidebar ? '' : mainOffsetClass} min-w-0 max-w-full overflow-x-hidden bg-background`}>
        <div data-analysis-content className={`${tightContent ? 'max-w-6xl' : 'max-w-7xl'} mx-auto px-6 lg:px-10 py-12 lg:py-24`}>
          {priceDiff && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 bg-card border border-border rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col gap-2 text-center md:text-left">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Analysens Utveckling</div>
                <div className="text-3xl font-black tracking-tighter">
                  Sedan analys: <span className={priceDiff.isPositive ? 'text-emerald-500' : 'text-danger'}>
                    {priceDiff.isPositive ? '+' : ''}{priceDiff.percent.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="flex flex-col gap-1 text-center md:text-right">
                  <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Pris vid analys ({date})</div>
                  <div className="text-xl font-black tracking-tight opacity-60">{analysisPrice?.toFixed(2)} {currency}</div>
                </div>
                <div className="w-px h-12 bg-border hidden md:block" />
                <div className="flex flex-col gap-1 text-center md:text-right">
                  <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Aktuell Kurs</div>
                  <div className="text-xl font-black tracking-tight">{currentPrice?.toFixed(2)} {currency}</div>
                </div>
              </div>
            </motion.div>
          )}
          {children}


          {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        </div>
      </main>
    </div>
  );
}
