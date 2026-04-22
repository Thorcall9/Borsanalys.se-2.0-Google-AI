import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import SEO from "../components/SEO";
import { TrendingUp, Shield, Zap, ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";


// Lazy load below-the-fold components
const ScoreCard = React.lazy(() => import("../components/ScoreCard").then(m => ({ default: m.ScoreCard })));
const Newsletter = React.lazy(() => import("../components/Newsletter").then(m => ({ default: m.Newsletter })));
const Mindmap = React.lazy(() => import("../components/Mindmap"));

const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center opacity-20">
    <Loader2 className="w-6 h-6 animate-spin" />
  </div>
);

export default function Home() {
  const { openLoginModal } = useAuth();
  const evolutionCategories = [
    { label: "Affärsmodell", score: 5.0 },
    { label: "Strategisk Moat", score: 5.0 },
    { label: "Finansiell ställning", score: 4.0 },
    { label: "Värdering & PEG", score: 4.0 },
    { label: "Tillväxtmotorer", score: 3.0 },
    { label: "Riskprofil", score: 3.0 },
    { label: "ESG & Makro", score: 3.0 },
    { label: "Marginaler", score: 4.0 },
  ];

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Hem - Professionella Aktieanalyser & AI-insikter" 
        description="Börsanalys.se erbjuder professionella aktieanalyser drivna av data och AI. Hitta nästa vinnare på börsen med våra djupgående investment cases."
      />
      {/* Hero Section */}
      <Hero />



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
                Evolution: Global dominans inom Live Casino
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vår AI-drivna analysmodell ger Evolution högsta betyg inom lönsamhet och marknadsposition. Se hur bolaget presterar i våra åtta kärnkategorier.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/analys/evolution-2025" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:gap-5 transition-all">
              Se hela analysen <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <React.Suspense fallback={<SectionLoader />}>
          <ScoreCard 
            companyName="Evolution" 
            ticker="EVO.ST" 
            totalScore={3.9} 
            categories={evolutionCategories} 
            linkTo="/analys/evolution-2025"
          />
        </React.Suspense>
      </section>

      {/* Methodology Section */}
      <React.Suspense fallback={<SectionLoader />}>
        <Mindmap />
      </React.Suspense>

      {/* Mindmap Section - Moved to hidden route /methodology-blueprint */}
      {/* <section className="py-32 container mx-auto px-6">
        <Mindmap />
      </section> */}



      {/* Newsletter Section */}
      <React.Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </React.Suspense>

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
                  onClick={openLoginModal}
                  className="w-full sm:w-auto px-16 py-7 bg-primary text-primary-foreground rounded-full font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all uppercase tracking-widest cursor-pointer"
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
