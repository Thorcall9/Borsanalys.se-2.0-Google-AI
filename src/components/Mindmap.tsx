import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Building2, Shield, TrendingUp, Globe2, 
  BarChart3, Scale, AlertTriangle, Cpu,
  CheckCircle2, Target
} from 'lucide-react';

interface Category {
  id: number;
  label: string;
  title: string;
  tooltip: string;
  icon: React.ElementType;
}

const CATEGORIES: Category[] = [
  { id: 1, label: 'I', title: 'Företagsöversikt', tooltip: 'Vi analyserar affärsmodellen på djupet, utvärderar ledningens historik och säkerställer att ägarstrukturen gynnar långsiktiga aktieägare.', icon: Building2 },
  { id: 2, label: 'II', title: 'Strategisk analys & Moat', tooltip: 'Bedömning av bolagets vallgravar (Moats) och konkurrensfördelar. Hur skyddad är vinstmaskinen mot nya utmanare?', icon: Shield },
  { id: 3, label: 'III', title: 'Finansiell analys', tooltip: 'En stenhård genomgång av siffrorna: Vinsttillväxt, kassaflöde och balansräkningens styrka. Vi ser bortom redovisningskosmetik.', icon: BarChart3 },
  { id: 4, label: 'IV', title: 'Värdering & Jämförelse', tooltip: 'Är aktien billig eller dyr? Vi ställer multiplar som P/E, EV/EBIT och PEG i relation till historiska snitt och konkurrenter.', icon: Scale },
  { id: 5, label: 'V', title: 'Tillväxtmotorer & Triggers', tooltip: 'Identifiering av konkreta katalysatorer. Vi letar efter expansion på nya marknader och innovation.', icon: TrendingUp },
  { id: 6, label: 'VI', title: 'Riskprofil', tooltip: 'Vi vänder på steken och letar efter det som kan gå fel. Inkluderar branschspecifika hot och finansiella fallgropar.', icon: AlertTriangle },
  { id: 7, label: 'VII', title: 'ESG & Makro', tooltip: 'Analys av hållbarhetsrisker och hur bolaget påverkas av det makroekonomiska läget (räntor, inflation).', icon: Globe2 },
  { id: 8, label: 'VIII', title: 'AI-observationer', tooltip: 'Vår AI skannar miljontals datapunkter, nyhetsflöden och dolda mönster för att identifiera avvikelser som människan missar.', icon: Cpu },
];

const SCENARIOS = [
  { type: 'Bull Case', price: '420 SEK', prob: '25% Sannolikhet', color: '#10B981', bg: 'bg-[#10B981]/10', textCls: 'text-[#10B981]', border: 'border-[#10B981]/30' },
  { type: 'Base Case', price: '345 SEK', prob: '50% Sannolikhet', color: '#F59E0B', bg: 'bg-[#F59E0B]/10', textCls: 'text-[#F59E0B]', border: 'border-[#F59E0B]/30' },
  { type: 'Bear Case', price: '210 SEK', prob: '25% Sannolikhet', color: '#EF4444', bg: 'bg-[#EF4444]/10', textCls: 'text-[#EF4444]', border: 'border-[#EF4444]/30' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Mindmap: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 py-32 px-4 md:px-8 font-inter overflow-hidden relative border-y border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-emerald-700/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 backdrop-blur-md border border-[#10B981]/30 rounded-full mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981]">Methodology Engine 2.0</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 drop-shadow-xl"
          >
            Vår <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-emerald-400">Analysmetodik</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed text-lg"
          >
            Vi kombinerar mänsklig expertis med AI för att leverera marknadens mest kompletta bolagsanalyser. 
            Datan bearbetas tvärs över 10 rigorösa steg för att hitta den asymmetriska fördelen.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* THE 8 CORE CATEGORIES */}
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 shadow-2xl hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-[#10B981]/40 hover:-translate-y-1.5 transition-all duration-500 p-7 rounded-3xl relative group cursor-default overflow-hidden"
            >
              {/* Subtle card internal glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 to-[#10B981]/0 group-hover:from-[#10B981]/5 group-hover:to-transparent transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-800 text-slate-400 group-hover:bg-[#10B981]/20 group-hover:text-[#10B981] group-hover:scale-110 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-inner border border-slate-700/50 group-hover:border-[#10B981]/30">
                  <cat.icon size={26} strokeWidth={2} />
                </div>
                <div className="text-[10px] font-black text-[#10B981]/70 uppercase tracking-widest mb-1.5 group-hover:text-[#10B981] transition-colors">
                  Steg {cat.label}
                </div>
                <h3 className="text-base font-black text-white mb-3 leading-tight group-hover:text-emerald-50 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {cat.tooltip}
                </p>
              </div>
            </motion.div>
          ))}

          {/* SECTION IX: VERDICT (WIDE HERO CARD) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-slate-900 border border-slate-800 hover:border-[#10B981]/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] hover:-translate-y-1 transition-all duration-500 p-10 md:p-14 rounded-[2.5rem] mt-6 relative overflow-hidden group cursor-default"
          >
            {/* Ambient intense glow */}
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#10B981]/15 rounded-full blur-[80px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Target size={18} className="text-[#10B981]" />
                  <h4 className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em] drop-shadow-md">Sektion IX</h4>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                  Sammanfattning & Verdict
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl group-hover:text-slate-300 transition-colors">
                  Här sammanställs de 8 kategorierna till en totalpoäng (0–40). Vår algoritm utmynnar i ett konkret data-drivet investeringsutlåtande: <span className="font-bold text-white">Köp</span>, <span className="font-bold text-white">Bevaka</span> eller <span className="font-bold text-white">Avstå</span>.
                </p>
              </div>

              {/* The "Scanner" Verdict Box */}
              <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center min-w-[260px] group-hover:border-[#10B981]/40 transition-colors duration-500 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent" />
                
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Algoritmisk Utdata</div>
                <div className="px-6 py-2.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/50 text-[#10B981] font-black text-sm tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-5 group-hover:scale-105 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                  CONFIRMED: KÖP
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white tracking-tighter">32</span>
                  <span className="text-lg font-bold text-slate-500">/ 40</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest">Totalpoäng (80%)</div>
              </div>
            </div>
          </motion.div>

          {/* SECTION X: SCENARIOS (WIDE HERO CARD) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-2xl p-10 md:p-14 rounded-[2.5rem] mt-2 group cursor-default"
          >
            <div className="text-center mb-12">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Sektion X</h4>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                Scenarier (Bull, Base & Bear)
              </h3>
              <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">Sannolikhetsviktad förväntad avkastning visualiserad genom tre marknadsklimat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SCENARIOS.map((s, i) => (
                <div 
                  key={i} 
                  className={`p-8 rounded-3xl border ${s.border} bg-slate-950/50 hover:bg-slate-950 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden`}
                >
                  <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${s.bg} ${s.textCls} border border-transparent shadow-inner`}>
                    {s.type}
                  </div>
                  <div className="text-4xl font-black text-white tracking-tighter mb-3 group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                    {s.price}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {s.prob}
                  </div>
                  
                  {/* Subtle ground line under text */}
                  <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Mindmap;
