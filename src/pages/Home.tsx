import React from "react";
import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import { ScoreCard } from "../components/ScoreCard";
import { Newsletter } from "../components/Newsletter";
import Mindmap from "../components/Mindmap";
import { TrendingUp, Shield, Zap, ArrowRight, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

export default function Home() {
  const { openSearch } = useSearch();

  const volvoCategories = [
    { label: "I. Företagsöversikt", score: 4.5 },
    { label: "II. Strategisk analys & Moat", score: 4.2 },
    { label: "III. Finansiell analys", score: 4.7 },
    { label: "IV. Värdering & Jämförelse", score: 4.1 },
    { label: "V. Tillväxtmotorer & Triggers", score: 4.8 },
    { label: "VI. Riskprofil", score: 3.5 },
    { label: "VII. ESG & Makro", score: 3.9 },
    { label: "VIII. AI-observationer", score: 4.4 },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Trigger Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <button 
            onClick={openSearch}
            className="w-full flex items-center gap-4 px-8 py-6 bg-card border border-border rounded-3xl text-muted-foreground hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all text-left group shadow-xl shadow-black/5"
          >
            <Search size={24} className="text-primary group-hover:scale-110 transition-transform" />
            <span className="flex-1 text-lg font-medium">Sök efter bolag, analyser eller guider...</span>
            <div className="hidden sm:flex items-center gap-1 bg-muted px-3 py-1.5 rounded-xl text-[10px] font-bold border border-border">
              <span className="opacity-50">⌘</span>
              <span>K</span>
            </div>
          </button>
        </motion.div>
      </section>

      {/* Featured Analysis / Score Card Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-primary mb-4">Utvald Analys</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                Volvo AB: En utdelningsmaskin i världsklass
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vår AI-drivna analysmodell ger Volvo högsta betyg inom direktavkastning och finansiell styrka. Se hur bolaget presterar i våra åtta kärnkategorier.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/analys/volvo" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:gap-5 transition-all">
              Se hela analysen <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <ScoreCard 
          companyName="Volvo AB" 
          ticker="VOLV B" 
          totalScore={4.4} 
          categories={volvoCategories} 
        />
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-4">Varför Börsanalys.se?</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8 text-foreground">
              Teknologi som ger dig <br />
              <span className="text-primary">ett orättvist försprång</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          {/* Feature 1: AI Analysis */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 bg-card border border-border rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="max-w-md">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                  <Zap size={28} />
                </div>
                <h4 className="text-3xl font-black tracking-tighter mb-4">AI-driven djupanalys</h4>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Våra modeller analyserar tusentals datapunkter per sekund för att identifiera mönster och trender som det mänskliga ögat missar.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="px-4 py-2 bg-muted rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">Sentimentanalys</div>
                <div className="px-4 py-2 bg-muted rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">Trendspaning</div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors duration-700" />
          </motion.div>

          {/* Feature 2: Real-time */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-1 bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20"
          >
            <div className="relative z-10">
              <TrendingUp size={32} className="mb-6 opacity-80" />
              <h4 className="text-2xl font-black tracking-tighter mb-2">Realtidsdata</h4>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Marknaden sover aldrig. Det gör inte vi heller. Få uppdateringar i realtid.
              </p>
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[40px]" />
          </motion.div>

          {/* Feature 3: Security */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-1 bg-card border border-border rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5"
          >
            <div className="relative z-10">
              <Shield size={32} className="mb-6 text-primary" />
              <h4 className="text-2xl font-black tracking-tighter mb-2">Objektivitet</h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Inga intressekonflikter. Bara ren, ofiltrerad data för ditt beslutsfattande.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Community/Network */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-12 md:row-span-1 bg-muted/50 border border-border rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/50 transition-all duration-500"
          >
            <div className="max-w-xl">
              <h4 className="text-2xl font-black tracking-tighter mb-2">Gå med i vårt nätverk av 15,000+ investerare</h4>
              <p className="text-base text-muted-foreground font-medium">
                Dela insikter, diskutera analyser och väx tillsammans med marknadens mest engagerade community.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-foreground text-background rounded-full font-black uppercase tracking-widest text-sm shadow-xl"
            >
              Gå med nu
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Mindmap Section */}
      <section className="py-32 container mx-auto px-6">
        <Mindmap />
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Trusted By / Logos Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">Omtalad i och samarbeten med</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            {['Dagens Industri', 'Privata Affärer', 'Svenska Dagbladet', 'Avanza', 'Nordnet'].map((partner) => (
              <span key={partner} className="text-xl font-black tracking-tighter text-foreground">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
            {[
              { label: "Analyserade Bolag", value: "500+", sub: "Svenska & Nordiska" },
              { label: "AI-Modeller", value: "12", sub: "Egenutvecklade" },
              { label: "Nöjda Investerare", value: "15k", sub: "Globalt nätverk" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-6xl md:text-7xl font-black tracking-tighter text-foreground mb-4 tabular-nums">{stat.value}</div>
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-2">{stat.label}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-foreground text-background rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-black/20"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10">
                Redo att maximera <br />
                <span className="text-primary">din avkastning?</span>
              </h2>
              <p className="text-xl md:text-2xl text-background/70 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                Bli en del av Börsanalys.se idag och få tillgång till marknadens mest avancerade analysverktyg.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-16 py-7 bg-primary text-primary-foreground rounded-full font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all uppercase tracking-widest"
                >
                  Skapa gratis konto
                </motion.button>
                <Link to="/om-oss" className="group flex items-center gap-3 text-background font-black uppercase tracking-widest text-sm hover:gap-5 transition-all">
                  Läs mer om metodiken <ChevronRight className="w-6 h-6 text-primary" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
