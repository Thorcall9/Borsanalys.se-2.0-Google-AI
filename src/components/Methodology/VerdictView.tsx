import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface VerdictViewProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

export const VerdictView: React.FC<VerdictViewProps> = ({ activeStage, scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.75, 0.78, 0.83, 0.85], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 0.78], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, scale, pointerEvents: activeStage === 8 ? 'auto' : 'none' }}
      className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-[#07111A]/98 backdrop-blur-3xl"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent" />
      
      <div className="text-center mb-16 z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-[#1E293B]" />
          <div className="text-[10px] md:text-[12px] font-mono uppercase tracking-[0.5em] text-[#60A5FA]">
            Analysis Complete // Calculating Final Verdict
          </div>
          <div className="h-[1px] w-12 bg-[#1E293B]" />
        </div>
        
        <h3 className="text-5xl md:text-7xl font-black text-[#E5E7EB] tracking-tighter mb-4 uppercase">
           Summary & <span className="text-[#60A5FA]">Verdict</span>
        </h3>
      </div>

      <div className="w-full max-w-lg relative z-10 flex flex-col items-center">
         
         {/* The Main Score Instrument */}
         <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            
            {/* SVG Progress Arc */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-[#1E293B]"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="100, 100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: activeStage === 8 ? 20 : 100 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                className="text-[#60A5FA]"
                style={{ filter: "drop-shadow(0 0 8px #60A5FA)" }}
              />
            </svg>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-[10px] font-mono text-[#E5E7EB]/30 mb-2 tracking-widest uppercase">Score Index</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">32</span>
                <span className="text-2xl font-mono text-[#E5E7EB]/20">/40</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="px-4 py-2 bg-[#60A5FA]/10 border border-[#60A5FA]/30 rounded-full"
              >
                <span className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-widest font-black">Confirmed: KÖP</span>
              </motion.div>
            </div>
         </div>

         {/* Technical Metadata under the score */}
         <div className="mt-12 w-full grid grid-cols-2 gap-px bg-[#1E293B]/30 border border-[#1E293B]/50 rounded-xl overflow-hidden backdrop-blur-md">
            <div className="p-4 flex flex-col items-center bg-[#0A101C]/60">
               <span className="text-[8px] font-mono text-[#E5E7EB]/40 uppercase mb-1">Confidence Interval</span>
               <span className="text-sm font-mono text-[#60A5FA]">86.4%</span>
            </div>
            <div className="p-4 flex flex-col items-center bg-[#0A101C]/60">
               <span className="text-[8px] font-mono text-[#E5E7EB]/40 uppercase mb-1">Data Points Scan</span>
               <span className="text-sm font-mono text-[#60A5FA]">14.2M</span>
            </div>
         </div>
         
         <div className="mt-8 flex items-center gap-3 text-[9px] font-mono text-[#C8A96B] uppercase tracking-[0.25em]">
            <div className="w-2 h-2 rounded-full bg-[#C8A96B] animate-ping" />
            Generating Scenario Models...
         </div>
      </div>
    </motion.div>
  );
};
