import React from "react";
import { motion } from "framer-motion";
import { Book, Info, ChevronRight, TrendingUp, DollarSign, BarChart3, ShieldCheck } from "lucide-react";
import { terminology } from "../data/terminology";

const CategoryIconMap: Record<string, any> = {
  "Värdering": DollarSign,
  "Lönsamhet": BarChart3,
  "Strategi": ShieldCheck,
  "Grundläggande": Info,
};

export default function Terminology() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <header className="space-y-4 max-w-2xl">
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Utbildning</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none">Börsskola</h1>
        <p className="text-lg text-muted leading-relaxed">
          Vi förklarar de viktigaste begreppen inom aktieanalys på ett enkelt och pedagogiskt sätt, med exempel från verkliga bolag.
        </p>
      </header>

      {/* Terminology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {terminology.map((term, i) => {
          const Icon = CategoryIconMap[term.category] || Book;
          return (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-section-alt rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-widest bg-section-alt px-3 py-1 rounded-full">{term.category}</div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">{term.title}</h3>
                <p className="text-sm font-bold text-foreground/80">{term.description}</p>
                <p className="text-sm text-muted leading-relaxed">{term.explanation}</p>
                
                {term.formula && (
                  <div className="bg-section-alt p-4 rounded-xl border border-border/50">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Formel</div>
                    <div className="text-sm font-mono font-bold text-primary">{term.formula}</div>
                  </div>
                )}

                <div className="pt-6 border-t border-border/50">
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Exempel ur verkligheten</div>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{term.example.company}</span>
                      <span className="text-xs font-mono font-bold text-primary">{term.example.value}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed italic">
                      "{term.example.context}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer / CTA */}
      <section className="bg-section-alt border border-border rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold tracking-tight">Fler begrepp på väg</h2>
        <p className="text-muted max-w-xl mx-auto">
          Vi uppdaterar Börsskolan löpande med nya förklaringar. Är det något begrepp du saknar? Hör av dig!
        </p>
      </section>
    </div>
  );
}
