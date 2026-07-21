import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Info, ChevronRight, TrendingUp, DollarSign, BarChart3, ShieldCheck, Zap, Activity, Waves, ArrowRight, Search, X, Filter, ChevronDown } from "lucide-react";
import { terminology } from "../data/terminology";
import { guides } from "../data/guides";
import SEO from "../components/SEO";



const CategoryIconMap: Record<string, any> = {
  "Värdering": DollarSign,
  "Lönsamhet": BarChart3,
  "Finansiell styrka": ShieldCheck,
  "Kassaflöde": Waves,
  "Strategi & Kvalitet": Zap,
  "Tillväxt & Effektivitet": TrendingUp,
};

const DifficultyMap: Record<string, { label: string; color: string; icon: string }> = {
  "Nybörjare": { label: "Nybörjare", color: "text-green-500 bg-green-500/10", icon: "🟢" },
  "Mellan": { label: "Mellan", color: "text-yellow-500 bg-yellow-500/10", icon: "🟡" },
  "Avancerat": { label: "Avancerat", color: "text-red-500 bg-red-500/10", icon: "🔴" },
};

export default function Terminology() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("Alla");
  const [categoryFilter, setCategoryFilter] = useState("Alla");
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const guideList = Object.values(guides).sort((a, b) => a.part - b.part);

  const filteredTerminology = useMemo(() => {
    return terminology.filter((term) => {
      const matchesSearch = term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === "Alla" || term.difficulty === difficultyFilter;
      
      const matchesCategory = categoryFilter === "Alla" || 
                             (categoryFilter === "Tillväxt" ? term.category === "Tillväxt & Effektivitet" : 
                              categoryFilter === "Strategi" ? term.category === "Strategi & Kvalitet" :
                              term.category === categoryFilter);
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, difficultyFilter, categoryFilter]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return terminology
      .filter(term => term.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO
        title="Börsskolan - Lär dig aktieanalys"
        description="Lär dig de viktigaste begreppen inom aktieanalys, värdering och bolagskvalitet."
        canonical="/skola"
        ogImage="/og-image.png"
      />
      {/* Header */}
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(16,185,129,0.08),transparent_28%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)]">
        <div className="mx-auto max-w-[1180px] px-5 pb-9 pt-12 md:px-8 md:pb-12 md:pt-14">
        <div className="pointer-events-none absolute right-[-50px] top-10 hidden h-56 w-[520px] rotate-[-12deg] opacity-20 md:block" aria-hidden="true"><svg viewBox="0 0 520 220" className="h-full w-full text-emerald-500"><path d="M0 180 C55 170 80 155 122 164 S178 133 214 145 S260 108 300 128 S350 72 388 95 S430 45 500 58" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M0 196 C70 185 112 177 148 183 S215 153 250 168 S316 128 350 143 S415 90 500 104" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" /><circle cx="500" cy="58" r="6" fill="currentColor" /></svg></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 md:hidden">Utbildning & kunskap</div>
          <h1 className="font-serif text-[48px] leading-[.98] tracking-[-0.045em] md:text-[64px]">Börsskolan</h1>
          <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-600 md:text-[17px]">
            En aktiekurs berättar absolut ingenting om ett bolag. Ett P/E-tal på 15 kan vara extremt billigt i en bransch men varningsflagg i en annan. Det här är din verktygslåda – de pedagogiska nycklarna som hjälper dig att skilja på en bra aktie och en farlig investering genom att läsa bolagets sanna hälsotillstånd.
          </p>
        </motion.div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-auto max-w-[1180px] space-y-6 px-5 py-8 md:px-8 md:py-10"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative z-50 w-full max-w-[680px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Sök nyckeltal eller begrepp..."
              className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-6 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
              >
                <X size={20} />
              </button>
            )}

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setShowSuggestions(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] px-4 mb-2">Förslag</div>
                      {suggestions.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSearchQuery(s.title);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-6 py-4 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
                        >
                          <span className="font-bold">{s.title}</span>
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-40 w-full md:w-auto">
            <button
              onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
              className={`flex h-14 w-full items-center justify-between gap-3 rounded-xl border px-5 text-sm font-semibold transition-all md:w-auto ${
                difficultyFilter !== "Alla" 
                ? "border-emerald-700 bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>{difficultyFilter === "Alla" ? "Filter" : difficultyFilter}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isDifficultyOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isDifficultyOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setIsDifficultyOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full z-20 mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:w-64"
                  >
                    <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] px-4 mb-2">Svårighetsgrad</div>
                    {["Alla", "Nybörjare", "Mellan", "Avancerat"].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDifficultyFilter(d);
                          setIsDifficultyOpen(false);
                        }}
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                          difficultyFilter === d 
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {d !== "Alla" && <span>{DifficultyMap[d].icon}</span>}
                        <span>{d}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden flex-none text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:block">Kategorier:</div>
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto pb-1">
            {["Alla", "Värdering", "Lönsamhet", "Finansiell styrka", "Tillväxt", "Kassaflöde", "Strategi"].map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                  className={`flex-none rounded-full border px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  categoryFilter === c 
                    ? "border-emerald-700 bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Terminology Section */}
      <section className="mx-auto max-w-[1180px] space-y-6 px-5 pb-12 md:px-8 md:pb-16">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold md:text-2xl">Nyckeltal & begrepp</h2>
            <p className="text-sm text-slate-500 md:text-base">De viktigaste verktygen för din analys, kategoriserade för enkel överblick.</p>
          </div>
          <span className="hidden text-sm font-semibold text-emerald-700 md:block">{filteredTerminology.length} begrepp</span>
        </div>

        {filteredTerminology.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
            {filteredTerminology.map((term, i) => {
              const Icon = CategoryIconMap[term.category] || Book;
              const diff = DifficultyMap[term.difficulty] || DifficultyMap["Nybörjare"];
              return (
                <React.Fragment key={term.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md md:p-6"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-transform duration-500 group-hover:scale-105">
                          <Icon size={22} />
                        </div>
                        <div className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${diff.color}`}>
                          {diff.icon} {diff.label}
                        </div>
                      </div>
                      <div className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:block">{term.category}</div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-700 md:text-2xl">{term.title}</h3>
                      <p className="text-sm font-semibold leading-6 text-slate-800">{term.description}</p>
                      <p className="text-sm font-normal leading-6 text-slate-500">{term.explanation}</p>
                      
                      {term.formula && (
                        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Formel</div>
                          <div className="text-sm font-bold tracking-tight text-emerald-700">{term.formula}</div>
                        </div>
                      )}

                      <div className="border-t border-slate-100 pt-5">
                        <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Exempel ur verkligheten</div>
                        <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
                          <div className="relative z-10 flex items-center justify-between gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">{term.example.company}</span>
                            <span className="text-xs font-bold text-emerald-700">{term.example.value}</span>
                          </div>
                          <p className="relative z-10 text-sm italic leading-6 text-slate-500">
                            "{term.example.context}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border border-dashed border-border">
            <p className="text-xl font-bold text-muted-foreground">Inga resultat matchar din sökning eller filter.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("Alla");
                setCategoryFilter("Alla");
              }}
              className="mt-4 text-primary font-black uppercase tracking-widest text-sm hover:underline"
            >
              Nollställ filter
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1180px] space-y-6 px-5 pb-12 md:px-8 md:pb-16">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold md:text-2xl">Börsguider</h2>
            <p className="text-sm text-slate-500 md:text-base">Djupdykningar i analys, värdering och strategi.</p>
          </div>
          <Link to="/guider" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 transition-all hover:gap-2">
            Visa alla guider <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
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
                className="group relative block h-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md md:p-6"
              >
                <div className="absolute top-0 right-0 p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/60">Del {guide.part}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-emerald-700">
                  {guide.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                  {guide.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="mx-5 mb-12 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40 p-8 text-center relative md:mx-auto md:max-w-[1120px] md:p-14">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">Fler begrepp på väg</h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Vi uppdaterar Börsskolan löpande med nya förklaringar och djupdykningar. Är det något begrepp du saknar? Hör av dig!
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
