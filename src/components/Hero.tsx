import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';

export const Hero: React.FC = () => {
  const { openSearch } = useSearch();
  const { openLoginModal } = useAuth();

  return (
    <section className="homepage-section homepage-hero pt-24 md:pt-32">
      <div className="homepage-container text-center">
        <div className="mx-auto max-w-[64rem]">
          <h1 className="hero-title text-[clamp(2rem,7vw,7rem)] font-bold tracking-[-0.025em] text-foreground">
            <span className="hero-title-line hero-title-line-primary">Börsanalys som gör dig</span>
            <span className="hero-title-line hero-title-line-accent text-primary">till en bättre investerare</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:mt-12 md:text-xl">
            Förstå affärsmodell, värdering och risk innan ditt nästa investeringsbeslut.
          </p>

          <div className="mx-auto mt-11 max-w-2xl md:mt-12">
            <button 
              onClick={() => openSearch("hero")}
              aria-label="Sök efter bolag, analyser eller guider..."
              className="hero-search surface-card flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-left text-muted-foreground transition-all hover:border-primary/50 hover:shadow-md hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Search size={22} className="text-primary" />
              <span className="flex-1 text-base font-medium">Sök efter bolag, analyser eller guider...</span>
              <div className="hidden items-center gap-1 rounded-lg border border-border bg-muted px-3 py-1.5 text-[10px] font-bold sm:flex">
                <span className="opacity-50">⌘</span>
                <span>K</span>
              </div>
            </button>
          </div>
          
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-5 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="primary-action hero-primary-action w-full shadow-md shadow-black/10 sm:w-auto"
              onClick={() => window.location.href = '/analys'}
            >
              Utforska analyser
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="secondary-action hero-secondary-action w-full sm:w-auto"
              onClick={openLoginModal}
            >
              Bli medlem gratis
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};
