import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EngineCoreProps {
  activeStage: number;
}

export const EngineCore: React.FC<EngineCoreProps> = ({ activeStage }) => {
  const isProcessActive = activeStage >= 0 && activeStage <= 7;
  const isSynthesizing = activeStage === 8;

  // Generate 48 ticks for the outer ring
  const ticks = Array.from({ length: 48 });

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <motion.div
        animate={{ 
          scale: isSynthesizing ? 1.2 : (isProcessActive ? 1.05 : 1),
          boxShadow: isSynthesizing
            ? '0 0 120px 40px rgba(96, 165, 250, 0.15), inset 0 0 40px rgba(96, 165, 250, 0.2)'
            : isProcessActive 
              ? '0 0 80px 20px rgba(96, 165, 250, 0.1), inset 0 0 20px rgba(96, 165, 250, 0.1)' 
              : '0 0 40px 10px rgba(96, 165, 250, 0.05)'
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-40 h-40 md:w-64 md:h-64 rounded-full border border-[rgba(255,255,255,0.05)] bg-[#07111A] flex items-center justify-center relative backdrop-blur-3xl shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"
      >
        {/* Outer Tick Ring */}
        <div className="absolute inset-2 rounded-full border border-[#1E293B]/30" />
        {ticks.map((_, i) => (
          <div
            key={`tick-${i}`}
            className="absolute inset-0 flex items-start justify-center"
            style={{ transform: `rotate(${i * (360 / 48)}deg)` }}
          >
            <div className={`w-[1px] h-2 ${i % 4 === 0 ? 'bg-[#60A5FA]/40 h-3' : 'bg-[#1E293B]'} mt-1`} />
          </div>
        ))}

        {/* Counter-rotating Instrumental Rings */}
        <motion.div
          animate={{ rotate: isSynthesizing ? 360 : 180 }}
          transition={{ duration: isSynthesizing ? 4 : 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[10%] rounded-full border-[0.5px] border-dashed border-[#60A5FA]/20"
        />
        <motion.div
          animate={{ rotate: isSynthesizing ? -360 : -180 }}
          transition={{ duration: isSynthesizing ? 6 : 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[18%] rounded-full border-[0.5px] border-dotted border-[#C8A96B]/20"
        />

        {/* Inner Data Vault */}
        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#0A101C] shadow-[0_20px_40px_rgba(0,0,0,1),inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Subtle Data Stream Pattern bg */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none text-[6px] font-mono leading-tight whitespace-pre overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i}>01010011010101101101100101010101</div>
            ))}
          </div>

          <motion.div
            animate={{ 
              opacity: isSynthesizing ? [0.6, 1, 0.6] : (isProcessActive ? [0.3, 0.6, 0.3] : 0.4) 
            }}
            transition={{ duration: isSynthesizing ? 1 : 3, repeat: Infinity }}
            className="relative z-10 flex flex-col items-center"
          >
            <svg className={`w-8 h-8 md:w-12 md:h-12 mb-2 transition-colors duration-500 ${isSynthesizing ? 'text-[#60A5FA]' : 'text-[#E5E7EB]/80'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <div className="text-[7px] md:text-[9px] font-mono uppercase tracking-[0.5em] text-[#60A5FA]">
              {isSynthesizing ? "PROCESSING" : "ENGINE CORE"}
            </div>
            
            {/* Tiny coordinates */}
            <div className="text-[5px] md:text-[6px] font-mono text-[#E5E7EB]/20 absolute -bottom-4 whitespace-nowrap">
              0x7A4F // DECISION MAPPING // PHASE 0.{activeStage >= 0 ? activeStage : 0}
            </div>
          </motion.div>

          {/* Glowing aperture in synthesis */}
          <AnimatePresence>
            {isSynthesizing && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1.5 }}
                exit={{ opacity: 0, scale: 2 }}
                className="absolute inset-0 bg-white rounded-full blur-[40px] z-0"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
