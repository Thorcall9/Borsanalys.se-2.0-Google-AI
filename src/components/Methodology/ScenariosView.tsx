import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScenariosViewProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({ activeStage, scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.82, 0.85], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.85], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: activeStage === 9 ? 'auto' : 'none' }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#07111A]/95 backdrop-blur-3xl px-6"
    >
      <div className="text-center mb-16 z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-[#1E293B]" />
          <div className="text-[10px] md:text-[12px] font-mono uppercase tracking-[0.5em] text-[#C8A96B]">
            Section X // Financial Projection Scenarios
          </div>
          <div className="h-[1px] w-12 bg-[#1E293B]" />
        </div>
        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase text-center">
          Three Scenarios. <br/> <span className="text-[#C8A96B]">One Outcome.</span>
        </h3>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Unified Dashboard Frame */}
        <div className="absolute inset-0 bg-[#0A101C]/60 backdrop-blur-3xl border border-[rgba(255,255,255,0.03)] rounded-[2rem] -z-10 shadow-[20px_40px_80px_rgba(0,0,0,0.5)]" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.05)]">
          
          {/* Bull Case */}
          <div className="p-8 md:p-14 flex flex-col items-center text-center group transition-all duration-700 hover:bg-[#60A5FA]/5">
             <div className="flex items-center gap-2 mb-8">
               <div className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#60A5FA]">Bull Scenario</span>
             </div>
             
             <div className="mb-10 relative">
               <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">420<span className="text-xl text-white/20 ml-1">SEK</span></div>
               <div className="absolute -bottom-2 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#60A5FA]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
             </div>

             <div className="w-full space-y-4">
                <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase">
                   <span>Probability</span>
                   <span className="text-[#60A5FA]">25.0%</span>
                </div>
                <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: activeStage === 9 ? "25%" : 0 }}
                     className="h-full bg-[#60A5FA]"
                   />
                </div>
             </div>
          </div>

          {/* Base Case */}
          <div className="p-8 md:p-14 flex flex-col items-center text-center group transition-all duration-700 bg-white/[0.02] relative">
             <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5E7EB]/10 to-transparent" />
             
             <div className="flex items-center gap-2 mb-8">
               <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">Base Scenario</span>
             </div>
             
             <div className="mb-10 relative">
               <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">345<span className="text-2xl text-white/20 ml-1">SEK</span></div>
               <div className="absolute -bottom-2 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
             </div>

             <div className="w-full space-y-4">
                <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase">
                   <span>Probability</span>
                   <span className="text-white">50.0%</span>
                </div>
                <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: activeStage === 9 ? "50%" : 0 }}
                     className="h-full bg-white"
                   />
                </div>
             </div>
          </div>

          {/* Bear Case */}
          <div className="p-8 md:p-14 flex flex-col items-center text-center group transition-all duration-700 hover:bg-red-500/5">
             <div className="flex items-center gap-2 mb-8">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500">Bear Scenario</span>
             </div>
             
             <div className="mb-10 relative">
               <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">210<span className="text-xl text-white/20 ml-1">SEK</span></div>
               <div className="absolute -bottom-2 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
             </div>

             <div className="w-full space-y-4">
                <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase">
                   <span>Probability</span>
                   <span className="text-red-500">25.0%</span>
                </div>
                <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: activeStage === 9 ? "25%" : 0 }}
                     className="h-full bg-red-500"
                   />
                </div>
             </div>
          </div>

        </div>
      </div>

      <div className="mt-16 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
         End of Methodology Engine Session // v2.0.4 r-alpha
      </div>
    </motion.div>
  );
};
