import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calculator, TrendingUp, ChevronRight, ArrowRight, BookOpen, DollarSign, Zap, Shield, PiggyBank, ShieldCheck } from "lucide-react";
import { guides } from "../data/guides";



const IconMap: Record<string, any> = {
  Search: Search,
  Calculator: Calculator,
  TrendingUp: TrendingUp,
  DollarSign: DollarSign,
  Zap: Zap,
  BookOpen: BookOpen,
  Shield: Shield,
  PiggyBank: PiggyBank,
  ShieldCheck: ShieldCheck,
};

export default function Guides() {
  const guideList = Object.values(guides).sort((a, b) => a.part - b.part);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      {/* Header */}
      <header className="space-y-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-4">Utbildning & Kunskap</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Börsguider för <br />
            <span className="text-primary">framgång</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
            Lär dig grunderna i aktieanalys, värdering och hur du bygger en vinnande portfölj. Våra guider är skrivna för att göra dig till en bättre investerare.
          </p>
        </motion.div>
      </header>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guideList.map((guide, i) => {
          const Icon = IconMap[guide.icon] || BookOpen;
          return (
            <React.Fragment key={guide.slug}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/guider/${guide.slug}`}
                  className="group block h-full bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden shadow-xl shadow-black/5"
                >
                  <div className="absolute top-0 right-0 p-6">
                    <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">Del {guide.part}</span>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                      <Icon size={28} />
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em]">{guide.category}</div>
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-10 font-medium line-clamp-3">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                    <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">{guide.readTime} läsning</span>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-5 transition-all">
                      Läs guide <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>

            </React.Fragment>
          );
        })}
      </div>

      {/* CTA Section */}

      <section className="bg-muted/30 border border-border rounded-[3rem] p-16 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Saknar du en guide?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Vi fyller på med nya guider varje vecka. Kontakta oss om det är något speciellt ämne du vill att vi ska förklara.
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
