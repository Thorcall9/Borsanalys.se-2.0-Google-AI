import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Calculator, Search, ArrowRight, ShieldCheck, Zap, Globe, ChevronRight, BookOpen } from "lucide-react";
import { StockPriceBadge } from '../components/StockPriceBadge';
import { analyses } from "../data/analyses";
import { guides } from "../data/guides";
import { useSearch } from "../contexts/SearchContext";
import Newsletter from "../components/Newsletter";

import { MakroWidget } from "./MacroDashboard";

export default function Home() {
  const analysisList = Object.values(analyses);
  const { openSearch } = useSearch();

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-section-alt px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              <Zap size={14} /> AI-Driven Analys
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[0.95]">
              AI-driven aktieanalys för <span className="italic text-primary">smartare</span> investeringar
            </h1>
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              Detaljerade analyser med finansiella mått, värderingsmodeller och scenarioanalyser — allt för att hjälpa dig fatta bättre investeringsbeslut.
            </p>
            
            {/* Search Bar Trigger */}
            <div className="max-w-md">
              <button 
                onClick={openSearch}
                className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-border rounded-2xl text-muted hover:border-primary/50 hover:shadow-lg transition-all text-left group"
              >
                <Search size={20} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="flex-1 font-medium">Sök efter företag eller guider...</span>
                <kbd className="hidden sm:inline-block bg-muted px-2 py-1 rounded text-[10px] font-bold">⌘K</kbd>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/analys" 
                className="bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                Utforska analyser <ArrowRight size={18} />
              </Link>
              <Link 
                to="/verktyg" 
                className="bg-white border border-border hover:bg-card-hover text-foreground px-8 py-4 rounded-xl font-bold transition-all"
              >
                Våra verktyg
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white border border-border rounded-2xl p-8 shadow-2xl relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg">Investor AB</div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest">INVE B</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-success">KÖP</div>
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Rekommendation</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-24 bg-section-alt rounded-lg flex items-end gap-1 p-4">
                  {[40, 60, 45, 70, 85, 65, 90, 100].map((h, i) => (
                    <div key={i} className="flex-grow bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-section-alt rounded-lg">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Substansrabatt</div>
                    <div className="font-serif font-bold text-xl">14,2%</div>
                  </div>
                  <div className="p-4 bg-section-alt rounded-lg">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Direktavkastning</div>
                    <div className="font-serif font-bold text-xl">2,2%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/5 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-accent/5 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Latest Analysis Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Analyser</div>
            <h2 className="text-4xl font-serif font-bold tracking-tight">Senaste analyserna</h2>
            <p className="text-muted max-w-xl">Djupgående aktieanalyser med Bear, Base och Bull-scenarion.</p>
          </div>
          <Link to="/analys" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            Visa alla analyser <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {analysisList.map((analysis, i) => (
            <Link 
              key={i} 
              to={`/analys/${analysis.slug}`}
              className="group bg-white border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-section-alt rounded-xl flex items-center justify-center font-serif font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {analysis.title[0]}
                </div>
                <div className={`text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full ${
                  analysis.recommendation === 'KÖP' ? 'bg-success/10 text-success' : 
                  analysis.recommendation === 'SÄLJ' ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'
                }`}>
                  {analysis.recommendation}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{analysis.title}</h3>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">{analysis.ticker}</div>
              <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">{analysis.summary}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                Läs analys <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Stocks Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Aktier</div>
            <h2 className="text-4xl font-serif font-bold tracking-tight">Populära aktier</h2>
            <p className="text-muted max-w-xl">Håll koll på de mest bevakade bolagen på marknaden.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "NVIDIA", ticker: "NVDA", yahooTicker: "NVDA", slug: "nvidia" },
            { name: "Investor", ticker: "INVE B", yahooTicker: "INVE-B.ST", slug: "investor" },
            { name: "Microsoft", ticker: "MSFT", yahooTicker: "MSFT", slug: "microsoft" },
            { name: "Evolution", ticker: "EVO", yahooTicker: "EVO.ST", slug: "evolution" },
            { name: "Apple", ticker: "AAPL", yahooTicker: "AAPL", slug: "apple" },
            { name: "Tesla", ticker: "TSLA", yahooTicker: "TSLA", slug: "tesla" },
            { name: "Volvo", ticker: "VOLV B", yahooTicker: "VOLV-B.ST", slug: "volvo" },
            { name: "Alphabet", ticker: "GOOGL", yahooTicker: "GOOGL", slug: "alphabet" }
          ].map((stock, i) => (
            <Link 
              key={i} 
              to={`/aktier/${stock.slug}`}
              className="flex items-center justify-between p-4 bg-white border border-border rounded-xl hover:border-primary/50 hover:bg-card-hover transition-all group"
            >
              <div className="flex flex-col">
                <div className="font-serif font-bold group-hover:text-primary transition-colors">{stock.name}</div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-widest">{stock.ticker}</div>
              </div>
              <StockPriceBadge ticker={stock.yahooTicker} />
            </Link>
          ))}
        </div>
      </section>

      {/* Macro Preview Section */}
      <MakroWidget />

      {/* Börsguider Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Utbildning</div>
            <h2 className="text-4xl font-serif font-bold tracking-tight">Börsguider & Skola</h2>
            <p className="text-muted max-w-xl">Lär dig grunderna i aktieanalys, värdering och förstå de viktigaste begreppen.</p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/skola" className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Börsskola <ChevronRight size={16} />
            </Link>
            <Link to="/guider" className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Visa alla guider <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Börsskola Teaser */}
          <Link 
            to="/skola"
            className="group bg-primary text-white border border-primary rounded-2xl p-8 hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white mb-6">
              <Zap size={20} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">Börsskola</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">Vi förklarar P/E, ROE, EBITDA och andra krångliga begrepp på ett enkelt sätt.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:gap-3 transition-all">
              Gå till skolan <ArrowRight size={14} />
            </div>
          </Link>

          {Object.values(guides).slice(0, 2).map((guide, i) => (
            <Link 
              key={i} 
              to={`/guider/${guide.slug}`}
              className="group bg-section-alt border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{guide.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-2">{guide.excerpt}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                Läs guide <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6">
        <Newsletter />
      </section>

      {/* Why Us Section */}
      <section className="bg-footer text-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Varför oss?</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Varför Börsanalys.se?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Vi kombinerar AI med manuell granskning för att ge dig bästa möjliga analysunderlag.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "AI-Driven Precision", description: "Våra modeller analyserar tusentals datapunkter för att hitta mönster och trender.", icon: <Zap size={32} /> },
              { title: "Oberoende Analys", description: "Vi är helt oberoende och har inga kopplingar till de bolag vi analyserar.", icon: <ShieldCheck size={32} /> },
              { title: "Global Räckvidd", description: "Vi analyserar bolag på alla stora världsmarknader för att ge dig en bred vy.", icon: <Globe size={32} /> }
            ].map((prop, i) => (
              <div key={i} className="space-y-6 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                  {prop.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold">{prop.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-primary rounded-3xl p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">Redo att börja investera smartare?</h2>
            <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
              Utforska våra senaste analyser och verktyg för att ta kontroll över dina investeringar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/analys" className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-section-alt transition-colors">
                Se analyser
              </Link>
              <Link to="/kontakt" className="bg-primary-light border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
