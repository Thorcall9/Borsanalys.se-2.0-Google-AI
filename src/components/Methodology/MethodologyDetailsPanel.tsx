import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MethodologyStep } from "./MethodologyContent";

interface MethodologyDetailsPanelProps {
  activeStep: MethodologyStep | null;
}

export const MethodologyDetailsPanel: React.FC<MethodologyDetailsPanelProps> = ({ activeStep }) => {
  return (
    <div className="absolute left-1/2 md:left-auto md:right-4 lg:right-16 top-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full max-w-sm md:max-w-xs lg:max-w-md z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[3rem] bg-card/90 border border-border/50 backdrop-blur-xl shadow-2xl pointer-events-auto"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black font-mono text-lg md:text-xl shadow-lg shadow-primary/5">
                {activeStep.number}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter mb-3 md:mb-4 leading-tight">
              {activeStep.title}
            </h3>
            
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
              {activeStep.description}
            </p>

            <div className="mt-6 md:mt-8 flex gap-2">
              <div className="h-1 w-8 md:w-12 bg-primary rounded-full" />
              <div className="h-1 w-3 md:w-4 bg-primary/20 rounded-full" />
              <div className="h-1 w-3 md:w-4 bg-primary/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
