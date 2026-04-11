import React from 'react';
import { motion } from 'framer-motion';

interface EngineCoreProps {
  activeStage: number;
}

export const EngineCore: React.FC<EngineCoreProps> = ({ activeStage }) => {
  const isProcessActive = activeStage >= 0 && activeStage <= 7;
  
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      {/* Outer Halo */}
      <motion.div
        animate={{ 
          scale: isProcessActive ? 1.05 : 1,
          boxShadow: isProcessActive 
            ? '0 0 100px 30px rgba(96, 165, 250, 0.15), 0 0 40px 10px rgba(96, 165, 250, 0.2)' 
            : '0 0 60px 15px rgba(96, 165, 250, 0.05), 0 0 20px 5px rgba(96, 165, 250, 0.05)'
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#60A5FA]/20 bg-[#0B1220] flex items-center justify-center relative"
      >
        {/* Inner pulsing core */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-[10%] rounded-full border border-[#C8A96B]/20"
        />

        {/* Central SVG */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <svg className="w-8 h-8 md:w-12 md:h-12 mb-2 text-[#60A5FA] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#60A5FA] font-black">
            ENGINE
          </span>
        </div>
      </motion.div>
    </div>
  );
};
