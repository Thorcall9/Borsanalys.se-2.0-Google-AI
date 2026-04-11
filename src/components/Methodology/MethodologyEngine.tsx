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
      // Intro phase (extremely fast)
      if (latest < 0.05) {
        setActiveStage(-1);
      } 
      // Front-loaded Step I and II to ensure they are seen
      else if (latest >= 0.05 && latest < 0.25) {
        setActiveStage(0); // Step I (20% share)
      } else if (latest >= 0.25 && latest < 0.45) {
        setActiveStage(1); // Step II (20% share)
      } 
      // Steps III-VIII compressed into 0.45 - 0.75 (approx 0.05 each)
      else if (latest >= 0.45 && latest < 0.75) {
        const stepProgress = (latest - 0.45) / 0.3;
        const step = 2 + Math.min(5, Math.floor(stepProgress * 6));
        setActiveStage(step);
      }
      // IX (Verdict) and X (Scenarios)
      else if (latest >= 0.75 && latest < 0.88) {
        setActiveStage(8);
      } else {
        setActiveStage(9);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Opacity & Display maps for different views
  // Intro MUST BE COMPLETELY REMOVED to avoid "ghost text" behind other layers
  const introOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 1, 0]);
  const introDisplay = useTransform(scrollYProgress, [0, 0.05, 0.06], ["flex", "flex", "none"]);
  
  const networkOpacity = useTransform(scrollYProgress, [0.03, 0.08, 0.9, 0.95], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#020617] text-[#E5E7EB]" 
      style={{ height: "750vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Intro Stage */}
        <motion.div 
          style={{ 
            opacity: introOpacity,
            display: introDisplay
          }}
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
