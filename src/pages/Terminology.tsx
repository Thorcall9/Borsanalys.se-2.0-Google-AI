import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Info, ChevronRight, TrendingUp, DollarSign, BarChart3, ShieldCheck, Zap, Activity, Waves, ArrowRight, Search, X, Filter, ChevronDown } from "lucide-react";
import { terminology } from "../data/terminology";
import { guides } from "../data/guides";
import AdZone from "../components/AdZone";


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
            En aktiekurs berättar absolut ingenting om ett bolag. Ett P/E-tal på 15 kan vara extremt billigt i en bransch men varningsflagg i en annan. Det här är din verktygslåda – de pedagogiska nycklarna som hjälper dig att skilja på en bra aktie och en farlig investering genom att läsa bolagets sanna hälsotillstånd.
          </p>
        </motion.div>
      </header>

      {/* Search & Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center max-w-4xl">
          <div className="relative flex-1 w-full z-50">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={20} />
            <input
              type="text"
              placeholder="Sök nyckeltal eller begrepp..."
              className="w-full bg-card border border-border rounded-full py-5 pl-16 pr-6 focus:outline-none focus:border-primary/50 transition-all font-bold text-lg"
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
                className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
              className={`w-full md:w-auto flex items-center justify-between gap-3 px-8 py-5 rounded-full border transition-all font-black uppercase tracking-widest text-xs ${
                difficultyFilter !== "Alla" 
                  ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20" 
                  : "bg-card border-border text-foreground hover:border-primary/50"
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
                    className="absolute top-full right-0 mt-4 w-full md:w-64 bg-card border border-border rounded-[2rem] shadow-2xl p-4 space-y-2"
                  >
                    <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] px-4 mb-2">Svårighetsgrad</div>
                    {["Alla", "Nybörjare", "Mellan", "Avancerat"].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDifficultyFilter(d);
                          setIsDifficultyOpen(false);
                        }}
                        className={`w-full text-left px-6 py-4 rounded-2xl transition-all flex items-center gap-3 font-bold ${
                          difficultyFilter === d 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
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
          <div className="flex-none text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] hidden md:block">Kategorier:</div>
          <div className="flex-1 flex overflow-x-auto no-scrollbar gap-3 pb-2 -mb-2 flex-nowrap">
            {["Alla", "Värdering", "Lönsamhet", "Finansiell styrka", "Tillväxt", "Kassaflöde", "Strategi"].map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`flex-none px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  categoryFilter === c 
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Terminology Section */}
      <section className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter">Nyckeltal & Begrepp</h2>
          <p className="text-lg text-muted-foreground font-medium">De viktigaste verktygen för din analys, kategoriserade för enkel överblick.</p>
        </div>

        {filteredTerminology.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTerminology.map((term, i) => {
              const Icon = CategoryIconMap[term.category] || Book;
              const diff = DifficultyMap[term.difficulty] || DifficultyMap["Nybörjare"];
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
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                        <Icon size={28} />
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${diff.color}`}>
                        {diff.icon} {diff.label}
                      </div>
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

      <AdZone id="terminology-middle" type="banner" discrete={true} />
      
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
