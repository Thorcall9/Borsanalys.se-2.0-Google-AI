import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { EngineCore } from './EngineCore';
import { EngineNetwork } from './EngineNetwork';
import { InfoPanel } from './InfoPanel';
import { VerdictView } from './VerdictView';
import { ScenariosView } from './ScenariosView';

export const MethodologyEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Height 600vh ensures a smooth scroll for the whole sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active step based on scroll
  // Progress map:
  // 0.0 - 0.1: Build up
  // 0.1 - 0.9: Steps I-X (0.08 each)
  
  const [activeStage, setActiveStage] = useState<number>(-1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.1) setActiveStage(-1); // Build up phase
      else if (latest >= 0.1 && latest < 0.9) {
        // Steps 0-9
        const stepProgress = (latest - 0.1) / 0.8;
        const step = Math.min(9, Math.floor(stepProgress * 10));
        setActiveStage(step);
      } else {
        setActiveStage(9); // Scenarios (final)
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Opacity maps for different views
  // Intro stays solid longer, then fades out as networks builds up
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const networkOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.9, 0.95], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#07111A] text-[#E5E7EB]" 
      style={{ height: "650vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Intro Stage */}
        <motion.div 
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-between z-30 pointer-events-none py-24 px-6"
        >
          {/* Top: Brand and Title */}
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[14px] md:text-[16px] font-mono font-bold uppercase tracking-[0.6em] text-[#60A5FA] mb-6 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]"
            >
              Börsanalys.se
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-white text-center leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              Methodology <br className="md:hidden" /> <span className="text-[#60A5FA]">Engine 2.0</span>
            </motion.h2>
          </div>

          {/* Bottom: Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-4xl w-full bg-gradient-to-b from-transparent via-[#07111A]/80 to-[#07111A] pb-12 pt-12 text-center"
          >
            <p className="text-2xl md:text-5xl text-white font-medium leading-[1.1] tracking-tight">
              Vi kombinerar mänsklig expertis med AI för att <br className="hidden md:block" /> leverera marknadens mest kompletta analys.
            </p>
          </motion.div>
        </motion.div>

        {/* The Central Engine and Network */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center flex-col"
          style={{ opacity: networkOpacity }}
        >
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <EngineNetwork activeStage={activeStage} scrollYProgress={scrollYProgress} />
            <EngineCore activeStage={activeStage} />
            
            <AnimatePresence mode="wait">
              {activeStage >= 0 && activeStage <= 7 && (
                <InfoPanel activeStage={activeStage} key="info-panel" />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Verdict Phase (Triggered at Stage 8) */}
        {activeStage >= 8 && (
          <VerdictView activeStage={activeStage} scrollYProgress={scrollYProgress} />
        )}

        {/* Scenarios Phase (Triggered at Stage 9) */}
        {activeStage === 9 && (
          <ScenariosView activeStage={activeStage} scrollYProgress={scrollYProgress} />
        )}

      </div>
    </section>
  );
};
