import React, { useRef } from 'react';
import { motion, type Variants, useInView } from 'framer-motion';
import { 
  Building2, Shield, TrendingUp, Globe2, 
  BarChart3, Scale, AlertTriangle, Cpu,
  Target, Activity, Database, Zap
} from 'lucide-react';
import { METHODOLOGY_STEPS } from './Methodology/data';

const ICONS: Record<string, React.ElementType> = {
  "I": Building2,
  "II": Shield,
  "III": BarChart3,
  "IV": Scale,
  "V": TrendingUp,
  "VI": AlertTriangle,
  "VII": Globe2,
  "VIII": Cpu,
  "IX": Target,
  "X": Activity
};

const SCENARIOS = [
  { type: 'Bull Case', price: '420 SEK', prob: '25% Sannolikhet', color: '#60A5FA', bg: 'bg-[#60A5FA]/10', textCls: 'text-[#60A5FA]', border: 'border-[#60A5FA]/30' },
  { type: 'Base Case', price: '345 SEK', prob: '50% Sannolikhet', color: '#E5E7EB', bg: 'bg-white/5', textCls: 'text-white', border: 'border-white/10' },
  { type: 'Bear Case', price: '210 SEK', prob: '25% Sannolikhet', color: '#EF4444', bg: 'bg-red-500/10', textCls: 'text-red-500', border: 'border-red-500/30' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

interface StepCardProps {
  step: typeof METHODOLOGY_STEPS[0];
}

const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "400px" });
  const Icon = ICONS[step.id] || Zap;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="bg-[#0A111A] border border-white/5 hover:border-[#60A5FA]/40 shadow-2xl hover:shadow-[0_0_40px_rgba(96,165,250,0.1)] transition-all duration-500 p-8 rounded-3xl relative group overflow-hidden min-h-[400px]"
    >
      {/* Tech Metadata Label - Light rendering */}
      <div className="absolute top-4 right-6 flex gap-2">
         <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-[#60A5FA]/50" />
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Live Scan</span>
         </div>
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/5 text-[#60A5FA] group-hover:bg-[#60A5FA]/20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 border border-white/5 group-hover:border-[#60A5FA]/30">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        
        <div className="text-[10px] font-black text-[#60A5FA] uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
          <span>Steg {step.id}</span>
        </div>
        
        <h3 className="text-lg font-black text-white mb-4 leading-tight">
          {step.title}
        </h3>
        
        <p className="text-xs text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
          {step.summary}
        </p>

        {/* Core Analysis Points - SURGICAL DEFERRAL */}
        {isInView ? (
          <div className="space-y-3 pt-6 border-t border-white/5">
            {step.points.map((point, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1 h-1 rounded-full bg-[#60A5FA] mt-1.5 shrink-0" />
                <span className="text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors leading-tight italic">
                  {point}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24" /> // Space holder for the points
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[#60A5FA]/5 -rotate-45 translate-x-12 translate-y-12" />
    </motion.div>
  );
};

const Mindmap: React.FC = () => {
  return (
    <div className="w-full bg-[#050B14] py-32 px-4 md:px-8 font-inter overflow-hidden relative border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#60A5FA]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#C8A96B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A111A] border border-[#60A5FA]/30 rounded-full mb-6 shadow-[0_0_20px_rgba(96,165,250,0.15)]"
          >
            <div className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#60A5FA]">Methodology Engine 2.0 // Active Analysis Mode</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6"
          >
            Det <span className="text-[#60A5FA]">Analytiska</span> Ramverket
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed text-lg md:text-xl"
          >
            Vår metodik kombinerar mänsklig expertis med AI-kraft för att leverera marknadens mest djuplodande bolagsanalyser. 
            Varje case bearbetas tvärs över 10 rigorösa steg för att identifiera den asymmetriska fördelen.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* THE 8 CORE CATEGORIES (Blue Theme) */}
          {METHODOLOGY_STEPS.slice(0, 8).map((step) => (
            <StepCard key={step.id} step={step} />
          ))}

          {/* SECTION IX: VERDICT (GOLD HERO CARD) */}
          {METHODOLOGY_STEPS[8] && (
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#0D1520] border border-[#C8A96B]/20 hover:border-[#C8A96B]/50 shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-all duration-500 p-10 md:p-16 rounded-[3rem] mt-6 relative overflow-hidden group"
            >
              {/* Gold gradient atmosphere */}
              <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-[#C8A96B]/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 bg-[#C8A96B]/10 border border-[#C8A96B]/20 rounded-full">
                    <Target size={16} className="text-[#C8A96B]" />
                    <h4 className="text-[11px] font-black text-[#C8A96B] uppercase tracking-[0.2em]">Section IX // Synthesis</h4>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                    Summary & <span className="text-[#C8A96B]">Verdict</span>
                  </h3>
                  <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
                    {METHODOLOGY_STEPS[8].summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                    {METHODOLOGY_STEPS[8].points.map((point, idx) => (
                      <div key={idx} className="flex flex-col gap-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <Activity size={14} className="text-[#C8A96B]" />
                        <span className="text-[11px] font-bold text-slate-300 leading-tight uppercase tracking-wider">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Analysis HUD Widget */}
                <div className="bg-[#050B14] border-2 border-[#C8A96B]/30 rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-w-[320px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent" />
                  
                  <div className="flex items-center gap-3 mb-8">
                     <Database size={16} className="text-white/20" />
                     <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Algorithmic Computation</div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-7xl font-black text-white tracking-tighter"
                    >
                      32
                    </motion.span>
                    <span className="text-2xl font-bold text-[#C8A96B]/50">/ 40</span>
                  </div>

                  <div className="w-full space-y-4 mb-8">
                    <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase tracking-widest">
                       <span>Confidence Interval</span>
                       <span className="text-[#C8A96B]">86.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: "86.4%" }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className="h-full bg-[#C8A96B]"
                       />
                    </div>
                  </div>

                  <div className="px-10 py-3 rounded-full bg-[#C8A96B] text-slate-950 font-black text-sm tracking-widest shadow-[0_10px_30px_rgba(200,169,107,0.3)] uppercase">
                    Confirmed: KÖP
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION X: SCENARIOS (WIDE GRID VIEW) */}
          {METHODOLOGY_STEPS[9] && (
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#0A111A] border border-white/5 shadow-2xl p-10 md:p-16 rounded-[3rem] mt-6"
            >
              <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                <div className="text-left">
                  <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Activity size={14} className="text-[#C8A96B]" />
                    Section X // Final Output
                  </h4>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                    Financial <span className="text-[#C8A96B]">Scenarios</span>
                  </h3>
                  <p className="text-slate-400 text-base mt-4 max-w-xl">
                    {METHODOLOGY_STEPS[9].summary}
                  </p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Last Update</div>
                  <div className="text-xs font-mono text-[#C8A96B]">2026-04-11 // T-Minus Zero</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SCENARIOS.map((s, i) => {
                  const point = METHODOLOGY_STEPS[9].points[i];
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className={`p-10 rounded-3xl border ${s.border} bg-[#050B14] shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group`}
                    >
                      <div className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-10 ${s.bg} ${s.textCls} border border-white/5`}>
                        {s.type}
                      </div>
                      
                      <div className="mb-2 text-xs font-bold text-white/40 uppercase tracking-widest">{point}</div>
                      
                      <div className="text-5xl font-black text-white tracking-tighter mb-4 transition-transform duration-300 drop-shadow-md">
                        {s.price}
                      </div>
                      
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                        {s.prob}
                      </div>

                      <div className="w-full space-y-2 mt-auto">
                        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: s.prob.includes('50%') ? '50%' : '25%' }}
                             className={`h-full`}
                             style={{ backgroundColor: s.color }}
                           />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </motion.div>

        {/* Technical Footer */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-8">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                 <span className="text-[8px] font-mono text-white/20 uppercase mb-1">Engine Version</span>
                 <span className="text-[10px] font-mono text-[#60A5FA]">v2.1.0-HALO</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-mono text-white/20 uppercase mb-1">Compute Power</span>
                 <span className="text-[10px] font-mono text-[#60A5FA]">Distributed AI Grid</span>
              </div>
           </div>
           
           <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em] text-center md:text-right">
              Methodology Engine Session // 2026 Börsanalys.se
           </div>
        </div>
      </div>
    </div>
  );
};

export default Mindmap;
