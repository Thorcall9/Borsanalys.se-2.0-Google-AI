import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Info, ChevronRight, TrendingUp, DollarSign, BarChart3, ShieldCheck, Zap, Activity, Waves, ArrowRight } from "lucide-react";
import { terminology } from "../data/terminology";
import { guides } from "../data/guides";

const CategoryIconMap: Record<string, any> = {
  "Värdering": DollarSign,
  "Lönsamhet": BarChart3,
  "Finansiell styrka": ShieldCheck,
  "Kassaflöde": Waves,
  "Strategi & Kvalitet": Zap,
  "Tillväxt & Effektivitet": TrendingUp,
};

export default function Terminology() {
  const guideList = Object.values(guides).sort((a, b) => a.part - b.part);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
      {/* Header */}
      <header className="space-y-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-4">Utbildning & Kunskap</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Börsskolan: <br />
            <span className="text-primary">Din väg till framgång</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
            Att förstå marknaden och de viktigaste nyckeltalen är som att lära sig läsa ett företags hälsokontroll. Vi delar upp allt i pedagogiska delar.
          </p>
        </motion.div>
      </header>

      {/* Guides Section */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter">Börsguider</h2>
            <p className="text-lg text-muted-foreground font-medium">Djupdykningar i analys, värdering och strategi.</p>
          </div>
          <Link to="/guider" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
            Visa alla guider <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guideList.slice(0, 3).map((guide, i) => (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/guider/${guide.slug}`}
                className="group block h-full bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6">
                  <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">Del {guide.part}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">
                  {guide.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminology Section */}
      <section className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter">Nyckeltal & Begrepp</h2>
          <p className="text-lg text-muted-foreground font-medium">De viktigaste verktygen för din analys, kategoriserade för enkel överblick.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {terminology.map((term, i) => {
            const Icon = CategoryIconMap[term.category] || Book;
            return (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <Icon size={28} />
                  </div>
                  <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] bg-muted/50 px-4 py-2 rounded-full">{term.category}</div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors">{term.title}</h3>
                  <p className="text-base font-bold text-foreground/80 leading-relaxed">{term.description}</p>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">{term.explanation}</p>
                  
                  {term.formula && (
                    <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 relative overflow-hidden">
                      <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-3">Formel</div>
                      <div className="text-lg font-black text-primary tracking-tight">{term.formula}</div>
                    </div>
                  )}

                  <div className="pt-8 border-t border-border/50">
                    <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-4">Exempel ur verkligheten</div>
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-sm font-black text-primary uppercase tracking-widest">{term.example.company}</span>
                        <span className="text-sm font-black text-primary">{term.example.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium italic relative z-10">
                        "{term.example.context}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="bg-muted/30 border border-border rounded-[3rem] p-16 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Fler begrepp på väg</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Vi uppdaterar Börsskolan löpande med nya förklaringar och djupdykningar. Är det något begrepp du saknar? Hör av dig!
          </p>
          <Link 
            to="/kontakt" 
            className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Kontakta oss <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
