import React, { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MethodologyScene } from "./MethodologyScene";
import { MethodologyDetailsPanel } from "./MethodologyDetailsPanel";
import { MethodologyVerdict } from "./MethodologyVerdict";
import { MethodologyScenarios } from "./MethodologyScenarios";
import { methodologySteps } from "./MethodologyContent";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const MethodologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isSynthesis, setIsSynthesis] = useState(false);
  const [isScenario, setIsScenario] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%", // Length of the scroll experience
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Phase Mapping:
            // 0.0 - 0.1: Intro
            // 0.1 - 0.2: Network Build
            // 0.2 - 0.7: Steps I - VIII (0.5 for 8 steps = 0.0625 per step)
            // 0.7 - 0.8: Synthesis
            // 0.8 - 1.0: Scenarios

            if (progress < 0.1) {
              setActiveStepIndex(-1);
              setIsSynthesis(false);
              setIsScenario(false);
            } else if (progress < 0.2) {
              setActiveStepIndex(-1);
              setIsSynthesis(false);
              setIsScenario(false);
              // Network build phase - could trigger SVG animation in Scene
            } else if (progress < 0.7) {
              const stepProgress = (progress - 0.2) / 0.5;
              const step = Math.floor(stepProgress * 8);
              setActiveStepIndex(Math.min(step, 7));
              setIsSynthesis(false);
              setIsScenario(false);
            } else if (progress < 0.85) {
              setActiveStepIndex(-1);
              setIsSynthesis(true);
              setIsScenario(false);
            } else {
              setActiveStepIndex(-1);
              setIsSynthesis(false);
              setIsScenario(true);
            }
          }
        }
      });

      // Specific step animations if needed
      // Intro animations
      tl.from(".methodology-intro", { opacity: 1, y: 0, duration: 1 });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen bg-[#050505] text-foreground overflow-hidden flex flex-col items-center justify-center py-6 md:py-10"
      id="methodology-engine"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col pt-4 md:pt-8">
        {/* Intro Phase - Constant Title/Header */}
        <div className={`methodology-intro text-center transition-all duration-1000 ${activeStepIndex >= 0 || isSynthesis || isScenario ? "opacity-20 scale-95 blur-sm" : "opacity-100"}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-3 md:mb-6"
          >
            Methodology Engine 2.0
          </motion.div>
          <h2 className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-4 md:mb-8">
            Vår <span className="text-primary italic">Analysmetodik</span>
          </h2>
          <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-xl text-muted-foreground leading-relaxed font-medium">
            Vi kombinerar mänsklig expertis med AI för att leverera marknadens mest kompletta bolagsanalyser. 
            Datan bearbetas tvärs över 8 rigorösa steg för att hitta den asymmetriska fördelen.
          </p>
        </div>

        {/* The Interactive Visual Area */}
        <div className="flex-1 relative mt-4 md:mt-8 min-h-0">
          <MethodologyScene 
            activeStepIndex={activeStepIndex} 
            isSynthesis={isSynthesis}
            isScenario={isScenario}
          />
          
          <MethodologyDetailsPanel 
            activeStep={activeStepIndex >= 0 ? methodologySteps[activeStepIndex] : null} 
          />

          <MethodologyVerdict 
            id="methodology-verdict" 
            visible={isSynthesis} 
          />

          <MethodologyScenarios 
            id="methodology-scenarios" 
            visible={isScenario} 
          />
        </div>
      </div>

      {/* Progress Indicator (Vertical line on the left) */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 w-px h-32 bg-white/10 hidden md:block">
        <motion.div 
          className="w-full bg-primary"
          style={{ 
            height: isScenario ? "100%" : isSynthesis ? "80%" : activeStepIndex >= 0 ? `${(activeStepIndex + 1) * 10}%` : "0%" 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </section>
  );
};
