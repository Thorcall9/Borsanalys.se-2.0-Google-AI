import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { METHODOLOGY_STEPS } from './data';

interface InfoPanelProps {
  activeStage: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ activeStage }) => {
  const step = METHODOLOGY_STEPS[activeStage];

  return (
    <AnimatePresence mode="wait">
      {step && (
        <motion.div
          key={`panel-${activeStage}`}
          initial={{ opacity: 0, scale: 0.98, x: -10, filter: "blur(2px)" }}
          animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, x: 10, filter: "blur(2px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 md:left-12 top-[25%] md:top-auto md:bottom-12 w-[90%] md:w-[480px] z-50 pointer-events-none"
        >
          {/* HUD Panel Design - 100% SOLID */}
          <div className="relative bg-slate-950 border-l-[3px] border-[#60A5FA] border-y border-r border-white/5 p-8 md:p-10 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,1)] rounded-r-3xl">
            
            {/* Top HUD Data strip */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <span className="text-[11px] font-mono text-[#60A5FA] uppercase tracking-[0.3em] font-black">Step {step.id} // Detailed Matrix</span>
              </div>
              <div className="text-[10px] font-mono text-white/20 uppercase">Core Data Analysis</div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
                  {step.title}
                </h4>
                <div className="h-[2px] w-16 bg-[#C8A96B]/50" />
              </div>

              <p className="text-[14px] md:text-[16px] text-white/60 leading-relaxed mb-10 font-medium">
                {step.summary}
              </p>

              <div className="space-y-6">
                {step.points.map((point, i) => (
                  <motion.div 
                    key={`${step.id}-point-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-mono text-[#C8A96B] font-black">0{i+1}</span>
                       <div className="w-[1px] h-4 bg-white/5 mt-1" />
                    </div>
                    <span className="text-[13px] md:text-[15px] text-white leading-snug font-medium tracking-tight">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom HUD Metadata */}
            <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="text-[9px] font-mono text-white/10 uppercase tracking-[0.2em]">Engine status: High Precision</div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]/40" />
                <motion.div 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
