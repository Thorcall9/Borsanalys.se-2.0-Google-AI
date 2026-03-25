import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ScoreItemProps {
  label: string;
  score: number; // 1-5
  index: number;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, index }) => {
  const percentage = (score / 5) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-black text-foreground">
            {score.toFixed(1)}
          </span>
          <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-tighter">
            / 5.0
          </span>
        </div>
      </div>
      
      <div className="relative h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ delay: index * 0.05 + 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        />
      </div>
    </motion.div>
  );
};

interface ScoreCardProps {
  companyName: string;
  ticker: string;
  totalScore: number;
  categories: { label: string; score: number }[];
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ companyName, ticker, totalScore, categories }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-black/5 hover:shadow-primary/5 transition-all duration-700 group"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h3 className="text-4xl font-black tracking-tighter mb-2 group-hover:text-primary transition-colors duration-500">{companyName}</h3>
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-muted/50 border border-border rounded-full">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{ticker}</span>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Large Cap</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-6xl font-black text-primary tracking-tighter leading-none mb-2">{totalScore.toFixed(1)}</div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Total Score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {categories.map((cat, i) => (
          <ScoreItem key={cat.label} label={cat.label} score={cat.score} index={i} />
        ))}
      </div>
      
      <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <CheckCircle2 size={16} />
          </div>
          <span>AI-verifierad analys · Uppdaterad idag</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground px-10 py-5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
        >
          Se Fullständig Analys
        </motion.button>
      </div>
    </motion.div>
  );
};
