import React from 'react';
import { motion } from 'framer-motion';
import { METHODOLOGY_STEPS } from './data';

interface InfoPanelProps {
  activeStage: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ activeStage }) => {
  const step = METHODOLOGY_STEPS[activeStage];

  if (!step) return null;

  return (
    <motion.div
      key={`panel-${activeStage}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(5px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-8 md:bottom-16 w-[90%] md:w-[600px] z-30 pointer-events-none"
    >
      <div className="bg-[#111827]/80 backdrop-blur-2xl border border-[#1E293B] shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center shrink-0">
            <span className="text-[#60A5FA] font-black text-sm">{step.id}</span>
          </div>
          <div>
            <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#60A5FA] mb-1">
              Bearbetar Analys
            </div>
            <h4 className="text-xl md:text-2xl font-black text-[#E5E7EB] tracking-tight">
              {step.title}
            </h4>
          </div>
        </div>

        <p className="text-sm md:text-base text-[#E5E7EB]/70 leading-relaxed mb-6 font-medium">
           {step.summary}
        </p>

        <div className="space-y-3 bg-[#0B1220]/50 rounded-2xl p-4 md:p-5 border border-[#1E293B]/50">
          {step.points.map((point, i) => (
            <motion.div 
              key={`${step.id}-point-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 mt-[6px] md:mt-2 rounded-full bg-[#C8A96B] shrink-0" />
              <span className="text-xs md:text-sm text-[#E5E7EB]/80 leading-snug">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
