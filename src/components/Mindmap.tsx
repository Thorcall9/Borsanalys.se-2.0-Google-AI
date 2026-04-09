import React from 'react';
import { motion } from 'framer-motion';
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
  { type: 'Bull Case', price: '420 SEK', prob: '25% Sannolikhet', color: '#10B981', bg: 'bg-[#10B981]/10', textCls: 'text-[#10B981]' },
  { type: 'Base Case', price: '345 SEK', prob: '50% Sannolikhet', color: '#F59E0B', bg: 'bg-[#F59E0B]/10', textCls: 'text-[#F59E0B]' },
  { type: 'Bear Case', price: '210 SEK', prob: '25% Sannolikhet', color: '#EF4444', bg: 'bg-[#EF4444]/10', textCls: 'text-[#EF4444]' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Mindmap: React.FC = () => {
  return (
    <div className="w-full bg-slate-50/50 py-24 px-4 md:px-8 font-inter overflow-hidden border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6 shadow-sm"
          >
            <CheckCircle2 size={12} className="text-[#10B981]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Methodology Engine v2.0</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6"
          >
            Vår <span className="text-[#10B981]">Analysmetodik</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Vi kombinerar mänsklig expertis med AI för att leverera marknadens mest kompletta bolagsanalyser. Så här bryter vi ner fundamentan i 10 rigorösa steg.
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
              className="bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#10B981]/10 hover:-translate-y-1 transition-all duration-300 p-6 rounded-3xl relative group cursor-default"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] group-hover:scale-110 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500">
                <cat.icon size={22} strokeWidth={2.5} />
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-[#10B981] transition-colors">
                Steg {cat.label}
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2 leading-tight">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                {cat.tooltip}
              </p>
            </motion.div>
          ))}

          {/* SECTION IX: VERDICT (WIDE HERO CARD) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-white border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-[#10B981]/15 hover:-translate-y-1 transition-all duration-500 p-8 md:p-12 rounded-[2.5rem] mt-4 relative overflow-hidden group cursor-default"
          >
            {/* Subtle background glow effect on hover */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#10B981]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Target size={16} className="text-[#10B981]" />
                  <h4 className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Sektion IX</h4>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900">
                  Sammanfattning & Investeringsbeslut
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                  Här sammanställs de 8 kategorierna till en totalpoäng (0–40). Analysen utmynnar i ett konkret investeringsutlåtande: <span className="font-bold text-slate-700">Köp</span>, <span className="font-bold text-slate-700">Bevaka</span> eller <span className="font-bold text-slate-700">Avstå</span>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center min-w-[240px] group-hover:border-[#10B981]/20 transition-colors duration-300">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Exempel Verdict</div>
                <div className="px-6 py-2 rounded-full bg-[#10B981] text-white font-black text-xs tracking-widest shadow-lg shadow-[#10B981]/30 mb-4 group-hover:scale-105 transition-transform">
                  KÖP
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">32</span>
                  <span className="text-sm font-bold text-slate-400">/ 40</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Totalpoäng</div>
              </div>
            </div>
          </motion.div>

          {/* SECTION X: SCENARIOS (WIDE HERO CARD) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-white border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-500 p-8 md:p-12 rounded-[2.5rem] mt-2 group cursor-default"
          >
            <div className="text-center mb-10">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Sektion X</h4>
              <h3 className="text-3xl font-black tracking-tighter text-slate-900">
                Scenarier (Bull, Base & Bear Case)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCENARIOS.map((s, i) => (
                <div 
                  key={i} 
                  className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${s.bg} ${s.textCls}`}>
                    {s.type}
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter mb-2 group-[.hover]:scale-105 transition-transform">
                    {s.price}
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    {s.prob}
                  </div>
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
