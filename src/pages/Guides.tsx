import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calculator, TrendingUp, ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import { guides } from "../data/guides";

const IconMap: Record<string, any> = {
  Search: Search,
  Calculator: Calculator,
  TrendingUp: TrendingUp,
};

export default function Guides() {
  const guideList = Object.values(guides).sort((a, b) => a.part - b.part);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <header className="space-y-4 max-w-2xl">
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Utbildning</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none">Börsguider</h1>
        <p className="text-lg text-muted leading-relaxed">
          Lär dig grunderna i aktieanalys, värdering och hur du bygger en vinnande portfölj. Våra guider är skrivna för att göra dig till en bättre investerare.
        </p>
      </header>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guideList.map((guide, i) => {
          const Icon = IconMap[guide.icon] || BookOpen;
          return (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/guider/${guide.slug}`}
                className="group block h-full bg-white border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] font-mono font-bold text-primary/30 uppercase tracking-widest">Del {guide.part}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-section-alt rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest">{guide.category}</div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest">{guide.readTime} läsning</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                    Läs guide <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="bg-section-alt border border-border rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold tracking-tight">Saknar du en guide?</h2>
        <p className="text-muted max-w-xl mx-auto">
          Vi fyller på med nya guider varje vecka. Kontakta oss om det är något speciellt ämne du vill att vi ska förklara.
        </p>
        <Link 
          to="/kontakt" 
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition-colors"
        >
          Kontakta oss <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
