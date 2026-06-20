import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, Target, ArrowRight, DollarSign } from "lucide-react";
import CompoundInterestCalculator from "../components/CompoundInterestCalculator";
import GoalSavingsCalculator from "../components/GoalSavingsCalculator";
import DCFCalculator from "../components/DCFCalculator";
import DividendCalculator from "../components/DividendCalculator";

export default function Tools() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL pathname
  const getTabFromPath = (path: string) => {
    if (path.includes("rantakalkylator") || path.includes("compound")) return "compound";
    if (path.includes("malsparande") || path.includes("goal")) return "goal";
    if (path.includes("dcf")) return "dcf";
    if (path.includes("utdelning") || path.includes("dividend")) return "dividend";
    return "compound"; // fallback
  };

  const [activeTab, setActiveTabState] = useState<"compound" | "goal" | "dcf" | "dividend">(() => getTabFromPath(location.pathname));

  // Sync tab state if pathname changes externally (e.g. back button)
  useEffect(() => {
    setActiveTabState(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const setActiveTab = (tab: "compound" | "goal" | "dcf" | "dividend") => {
    setActiveTabState(tab);
    const pathMap = {
      compound: "/verktyg/rantakalkylator",
      goal: "/verktyg/malsparandekalkylator",
      dcf: "/verktyg/dcf-kalkylator",
      dividend: "/verktyg/utdelningskalkylator"
    };
    navigate(pathMap[tab]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <div className="space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Verktyg</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none">Finansiella <br /> <span className="italic text-primary">Kalkylatorer</span></h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Använd våra interaktiva verktyg för att planera ditt sparande, beräkna framtida avkastning och sätta upp mål för din ekonomi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div 
          onClick={() => setActiveTab("compound")}
          className={`bg-card border rounded-2xl p-8 flex flex-col justify-between transition-all group cursor-pointer ${activeTab === "compound" ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
        >
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "compound" ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
              <TrendingUp size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Ränta-på-ränta</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beräkna hur ditt kapital växer över tid med hjälp av ränta-på-ränta effekten.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            {activeTab === "compound" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("goal")}
          className={`bg-card border rounded-2xl p-8 flex flex-col justify-between transition-all group cursor-pointer ${activeTab === "goal" ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
        >
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "goal" ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Målsparande</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hur mycket behöver du spara varje månad för att nå ditt mål?
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            {activeTab === "goal" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("dcf")}
          className={`bg-card border rounded-2xl p-8 flex flex-col justify-between transition-all group cursor-pointer ${activeTab === "dcf" ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
        >
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "dcf" ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
              <Calculator size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">DCF-Värdering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beräkna ett bolags motiverade värde genom att diskontera framtida kassaflöden.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            {activeTab === "dcf" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("dividend")}
          className={`bg-card border rounded-2xl p-8 flex flex-col justify-between transition-all group cursor-pointer ${activeTab === "dividend" ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
        >
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "dividend" ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
              <DollarSign size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold">Utdelning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beräkna din framtida passiva inkomst från utdelningsaktier.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            {activeTab === "dividend" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>
      </div>

      <motion.section 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-12"
      >
        {activeTab === "compound" && <CompoundInterestCalculator />}
        {activeTab === "goal" && <GoalSavingsCalculator />}
        {activeTab === "dcf" && <DCFCalculator />}
        {activeTab === "dividend" && <DividendCalculator />}
      </motion.section>
    </div>
  );
}
