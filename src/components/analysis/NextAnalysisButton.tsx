import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { AnalysisData } from '../../data/analyses';
import VerdictBadge from './VerdictBadge';

interface NextAnalysisButtonProps {
  analysis: AnalysisData;
}

export default function NextAnalysisButton({ analysis }: NextAnalysisButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 mb-8"
    >
      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-6 px-2">
        Nästa analys
      </div>
      <Link
        to={`/analys/${analysis.slug}`}
        className="group block relative overflow-hidden bg-card border border-border rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest leading-none">
                {analysis.ticker} · {analysis.market}
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest leading-none">
                {analysis.sector}
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
              {analysis.title}
            </h3>
            
            <p className="text-muted-foreground font-medium max-w-xl line-clamp-2 md:line-clamp-1">
              {analysis.summary}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 shrink-0">
            <VerdictBadge verdict={analysis.recommendation} />
            
            <div className="flex items-center gap-4 text-primary group-hover:translate-x-2 transition-transform duration-500">
              <span className="text-sm font-black uppercase tracking-widest">Läs analys</span>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                <ArrowRight size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
          <TrendingUp size={160} />
        </div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
