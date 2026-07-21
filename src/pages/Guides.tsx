import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calculator, TrendingUp, ChevronRight, ArrowRight, BookOpen, DollarSign, Zap, Shield, PiggyBank, ShieldCheck } from "lucide-react";
import { guides } from "../data/guides";
import AdUnit from "../components/analysis/AdUnit";
import SEO from "../components/SEO";



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
    <div className="min-h-screen bg-white text-slate-900">
      <SEO
        title="Börsguider - Lär dig aktieanalys"
        description="Lär dig grunderna i aktieanalys, värdering och hur du bygger en vinnande portfölj."
        canonical="/guider"
        ogImage="/og-image.png"
      />
      {/* Header */}
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(16,185,129,0.08),transparent_28%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)]">
        <div className="mx-auto max-w-[1180px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-14">
        <div className="pointer-events-none absolute right-[-50px] top-10 hidden h-56 w-[520px] rotate-[-12deg] opacity-20 md:block" aria-hidden="true"><svg viewBox="0 0 520 220" className="h-full w-full text-emerald-500"><path d="M0 180 C55 170 80 155 122 164 S178 133 214 145 S260 108 300 128 S350 72 388 95 S430 45 500 58" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M0 196 C70 185 112 177 148 183 S215 153 250 168 S316 128 350 143 S415 90 500 104" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" /><circle cx="500" cy="58" r="6" fill="currentColor" /></svg></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 md:hidden">Utbildning & kunskap</div>
          <h1 className="font-serif text-[48px] leading-[.98] tracking-[-0.045em] md:text-[64px]">Börsguider</h1>
          <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-600 md:text-[17px]">
            Lär dig grunderna i aktieanalys, värdering och hur du bygger en vinnande portfölj. Våra guider är skrivna för att göra dig till en bättre investerare.
          </p>
        </motion.div>
        </div>
      </header>

      {/* Guides Grid */}
      <div className="mx-auto grid min-w-0 max-w-[1180px] grid-cols-1 gap-3 px-5 py-8 md:grid-cols-2 md:px-8 md:py-12 lg:grid-cols-3">
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
                className="group block h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md md:p-6"
                >
                  <div className="absolute top-0 right-0 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/60">Del {guide.part}</span>
                  </div>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-transform duration-500 group-hover:scale-105">
                      <Icon size={22} />
                    </div>
                    <div className="rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">{guide.category}</div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-emerald-700 md:text-2xl">
                    {guide.title}
                  </h3>
                  <p className="mb-7 line-clamp-3 text-sm leading-6 text-slate-500">
                    {guide.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400">{guide.readTime} läsning</span>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-all group-hover:gap-3">
                      Läs guide <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>

            </React.Fragment>
          );
        })}
      </div>

      {/* AD: top-display – naturlig paus mellan guider och CTA */}
      <div className="mx-auto max-w-[760px] px-5 md:px-8"><AdUnit variant="top-display" /></div>

      {/* CTA Section */}

      <section className="mx-5 mb-12 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40 p-8 text-center relative md:mx-auto md:max-w-[1120px] md:p-14">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">Saknar du en guide?</h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Vi fyller på med nya guider varje vecka. Kontakta oss om det är något speciellt ämne du vill att vi ska förklara.
          </p>
          <Link 
            to="/kontakt" 
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition hover:bg-emerald-800"
          >
            Kontakta oss <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
