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
  // 0.1 - 0.7: Steps I-VIII (0.075 each)
  // 0.7 - 0.85: Verdict
  // 0.85 - 1.0: Scenarios
  
  const [activeStage, setActiveStage] = useState<number>(-1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.1) setActiveStage(-1); // Build up phase
      else if (latest >= 0.1 && latest < 0.7) {
        // Steps 0-7
        const stepProgress = (latest - 0.1) / 0.6;
        const step = Math.min(7, Math.floor(stepProgress * 8));
        setActiveStage(step);
      } else if (latest >= 0.7 && latest < 0.85) {
        setActiveStage(8); // Verdict
      } else {
        setActiveStage(9); // Scenarios
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Opacity maps for different views
  const networkOpacity = useTransform(scrollYProgress, [0, 0.05, 0.7, 0.75], [0, 1, 1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#07111A] text-[#E5E7EB]" 
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Intro */}
        <motion.div 
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-[#60A5FA] mb-4">
            Börsanalys.se
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-center">
            Methodology Engine 2.0
          </h2>
          <p className="text-lg md:text-xl text-[#E5E7EB]/60 max-w-xl text-center">
            Vi kombinerar mänsklig expertis med AI.
          </p>
        </motion.div>

        {/* The Central Engine and Network */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
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

        {/* Verdict Phase */}
        <VerdictView activeStage={activeStage} scrollYProgress={scrollYProgress} />

        {/* Scenarios Phase */}
        <ScenariosView activeStage={activeStage} scrollYProgress={scrollYProgress} />

      </div>
    </section>
  );
};
