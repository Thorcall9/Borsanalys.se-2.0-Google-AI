import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScenariosViewProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({ activeStage, scrollYProgress }) => {
  // activeStage 9 is Scenarios. Progress 0.85 to 1.0.
  const opacity = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.85, 0.9], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: activeStage === 9 ? 'auto' : 'none' }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#07111A]/95 backdrop-blur-lg px-6"
    >
      <div className="text-center mb-16">
        <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#60A5FA] mb-4">
          Sektion X
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-[#E5E7EB] tracking-tighter mb-4">
          Tre scenarier. Ett utfall.
        </h3>
        <p className="text-sm md:text-base text-[#E5E7EB]/60 max-w-lg mx-auto">
          Sannolikhetsviktad förväntad avkastning visualiserad genom tre marknadsklimat.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Bull Case */}
        <div className="bg-[#111827] border border-[#1E293B] hover:border-[#60A5FA]/30 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(96,165,250,0.1)] group">
           <div className="w-12 h-12 rounded-full bg-[#60A5FA]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <TrendingUp className="text-[#60A5FA] w-5 h-5" />
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#60A5FA] mb-2">Bull Case</div>
           <div className="text-3xl md:text-4xl font-black text-[#E5E7EB] tracking-tight mb-2">420 SEK</div>
           <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E5E7EB]/40">25% Sannolikhet</div>
        </div>

        {/* Base Case */}
        <div className="bg-[#0B1220] border border-[#1E293B] hover:border-[#E5E7EB]/30 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] group relative transform md:scale-105 z-10 shadow-2xl">
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/20 to-transparent" />
           <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <Minus className="text-[#E5E7EB]/70 w-5 h-5" />
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E5E7EB]/60 mb-2">Base Case</div>
           <div className="text-4xl md:text-5xl font-black text-[#E5E7EB] tracking-tight mb-2">345 SEK</div>
           <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E5E7EB]/40">50% Sannolikhet</div>
        </div>

        {/* Bear Case */}
        <div className="bg-[#111827] border border-[#1E293B] hover:border-red-500/30 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(239,68,68,0.1)] group">
           <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <TrendingDown className="text-red-500 w-5 h-5" />
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Bear Case</div>
           <div className="text-3xl md:text-4xl font-black text-[#E5E7EB] tracking-tight mb-2">210 SEK</div>
           <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E5E7EB]/40">25% Sannolikhet</div>
        </div>

      </div>
    </motion.div>
  );
};
