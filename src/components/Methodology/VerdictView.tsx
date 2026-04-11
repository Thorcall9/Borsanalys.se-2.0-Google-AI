import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface VerdictViewProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

export const VerdictView: React.FC<VerdictViewProps> = ({ activeStage, scrollYProgress }) => {
  // activeStage 8 is Verdict. Progress 0.7 to 0.85.
  const opacity = useTransform(scrollYProgress, [0.68, 0.72, 0.83, 0.87], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.68, 0.72], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, scale, pointerEvents: activeStage === 8 ? 'auto' : 'none' }}
      className="absolute inset-0 flex items-center justify-center z-40 bg-[#07111A]/80 backdrop-blur-sm"
    >
      <div className="bg-[#111827] border border-[#1E293B] shadow-[0_0_80px_rgba(96,165,250,0.1)] rounded-[3rem] p-8 md:p-16 max-w-3xl w-full mx-6 relative overflow-hidden">
        {/* Decorative inner glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#60A5FA]/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#60A5FA] mb-4">
            Sektion IX
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black text-[#E5E7EB] tracking-tighter mb-4">
            Sammanfattning & Verdict
          </h3>
          
          <p className="text-sm md:text-base text-[#E5E7EB]/60 max-w-lg mx-auto mb-10 leading-relaxed">
            Här sammanställs de 8 kategorierna till en helhet. Vår algoritm utmynnar i ett konkret och data-drivet investeringsutlåtande.
          </p>

          {/* The Score Box */}
          <div className="w-full max-w-sm rounded-[2rem] bg-[#0B1220] border border-[#1E293B] p-8 flex flex-col items-center shadow-2xl relative group">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent group-hover:via-[#60A5FA]/60 transition-all duration-700" />
            
            <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#E5E7EB]/40 mb-3">Algoritmisk Utdata</div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-2xl md:text-3xl font-black text-[#60A5FA] mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
            >
              CONFIRMED: KÖP
            </motion.div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl md:text-7xl font-black text-[#E5E7EB] tracking-tighter leading-none">32</span>
              <span className="text-2xl font-black text-[#E5E7EB]/20">/ 40</span>
            </div>

            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C8A96B] mt-4 flex items-center gap-2 bg-[#C8A96B]/10 px-3 py-1.5 rounded-full border border-[#C8A96B]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-pulse" />
              Totalpoäng (80%)
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
