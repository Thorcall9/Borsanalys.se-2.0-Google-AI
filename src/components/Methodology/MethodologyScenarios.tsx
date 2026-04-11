import React from "react";
import { motion } from "framer-motion";
import { scenarioData } from "./MethodologyContent";

interface MethodologyScenariosProps {
  id: string;
  visible: boolean;
}

export const MethodologyScenarios: React.FC<MethodologyScenariosProps> = ({ id, visible }) => {
  return (
    <div 
      id={id}
      className={`absolute inset-0 z-[60] flex items-center justify-center p-4 md:p-8 lg:p-24 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-h-full overflow-y-auto no-scrollbar py-8">
        {scenarioData.map((scenario, index) => (
          <motion.div
            key={scenario.label}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
            className="group relative h-full"
          >
            <div className="h-full bg-card/60 border border-border/50 backdrop-blur-3xl p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[3rem] hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-center text-center">
              <div className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-8 py-1.5 md:py-2 px-4 md:px-5 rounded-full bg-white/5 ${scenario.color}`}>
                {scenario.label}
              </div>
              
              <div className="space-y-2 md:space-y-4 mb-6 md:mb-12">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                  {scenario.price}
                </div>
                <div className="h-1 w-10 md:w-12 bg-primary/20 mx-auto rounded-full overflow-hidden">
                  <motion.div 
                    animate={visible ? { width: scenario.probability } : { width: "0%" }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="mt-auto space-y-0.5 md:space-y-1">
                <div className="text-2xl md:text-3xl font-black tracking-tighter text-primary/80">
                  {scenario.probability}
                </div>
                <div className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground opacity-60">
                  Sannolikhet
                </div>
              </div>

              {/* Decorative gradient for hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
