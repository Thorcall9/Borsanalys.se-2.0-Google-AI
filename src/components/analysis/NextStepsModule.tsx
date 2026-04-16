import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { analyses } from '../../data/analyses';
import VerdictBadge from './VerdictBadge';

interface NextStepsModuleProps {
  nextSteps: {
    slug: string;
    reason?: string;
    label?: string;
  }[];
}

export default function NextStepsModule({ nextSteps }: NextStepsModuleProps) {
  if (!nextSteps || nextSteps.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-24 pt-16 border-t border-border/50"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <BookOpen size={12} />
            Redaktionell rekommendation
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Läs nästa analys</h2>
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-xs md:text-right">
          Handplockade analyser för att sätta detta case i ett större sammanhang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nextSteps.map((step, index) => {
          const analysis = analyses[step.slug as keyof typeof analyses];
          if (!analysis) return null;

          return (
            <motion.div
              key={step.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
            >
              <Link
                to={`/analys/${step.slug}`}
                className="group block h-full bg-card/40 border border-border hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      {step.label && (
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest">{step.label}</div>
                      )}
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
                        {analysis.ticker} · {analysis.market}
                      </div>
                    </div>
                    <VerdictBadge verdict={analysis.recommendation} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {analysis.title}
                  </h3>

                  {step.reason && (
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8 flex-1 italic opacity-80 group-hover:opacity-100 transition-opacity">
                      &quot;{step.reason}&quot;
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mt-auto">
                    Öppna analys <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Subtle background glow on hover */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
