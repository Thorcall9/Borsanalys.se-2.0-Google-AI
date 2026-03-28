import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap, Search } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';

export const Hero: React.FC = () => {
  const { openSearch } = useSearch();
  const { openLoginModal } = useAuth();

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Background Grid & Accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] mb-4 text-foreground">
            Börsanalys som gör dig <br />
            <span className="text-primary">till en bättre investerare</span>
          </h1>
          
          <p className="text-2xl md:text-4xl font-bold tracking-tight text-muted-foreground mb-10">
            Förstå bolaget. Fatta beslutet.
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Djupgående analyser av <span className="text-foreground italic">affärsmodell</span>, <span className="text-foreground italic">värdering</span> och <span className="text-foreground italic">risk</span>.
          </p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-16"
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
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-6 bg-primary text-primary-foreground rounded-full font-black text-lg shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              onClick={() => window.location.href = '/analys'}
            >
              Utforska analyser
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-6 bg-card border border-border rounded-full font-black text-lg shadow-xl shadow-black/5 hover:bg-muted transition-all uppercase tracking-widest"
              onClick={openLoginModal}
            >
              Bli medlem gratis
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
