import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MobileReadingProgressProps {
  label: 'analys' | 'guide';
  nextTitle?: string;
  nextHref?: string;
}

export default function MobileReadingProgress({ 
  label, 
  nextTitle, 
  nextHref 
}: MobileReadingProgressProps) {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      
      setPercent(Math.min(100, Math.max(0, Math.round(scrolled))));
      
      // Show sticky bar after 15% scroll
      setIsVisible(scrolled > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Line - Fixed to top */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-muted/20 md:hidden">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-border/40 z-[90] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
          >
            {/* Safe Area Container */}
            <div className="pb-[env(safe-area-inset-bottom)]">
              <div className="h-[52px] px-6 flex items-center justify-between">
                {/* Left: Progress */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-tight">
                    Läsförlopp
                  </span>
                  <span className="text-sm font-black text-foreground tabular-nums">
                    {percent}% läst
                  </span>
                </div>

                {/* Right: Next Link */}
                {nextHref ? (
                  <Link 
                    to={nextHref}
                    className="flex items-center gap-2 group"
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-tight">
                        Nästa {label}
                      </span>
                      <span className="text-sm font-black text-foreground group-active:text-primary transition-colors max-w-[140px] truncate">
                        {nextTitle}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-active:scale-95 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ) : (
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
                    Slut på {label}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
