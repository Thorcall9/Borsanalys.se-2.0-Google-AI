import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, Target, ArrowRight, DollarSign } from "lucide-react";
import CompoundInterestCalculator from "../components/CompoundInterestCalculator";
import GoalSavingsCalculator from "../components/GoalSavingsCalculator";
import DCFCalculator from "../components/DCFCalculator";
import DividendCalculator from "../components/DividendCalculator";
import SEO from "../components/SEO";

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
    <div className="min-h-screen bg-white text-slate-900">
      <SEO
        title="Finansiella kalkylatorer"
        description="Beräkna ränta-på-ränta, målsparande, kassaflöden och utdelningar med våra kostnadsfria verktyg."
        canonical={location.pathname}
        ogImage="/og-image.png"
      />
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(16,185,129,0.08),transparent_28%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)]">
      <div className="mx-auto max-w-[1180px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-14">
      <div className="relative max-w-[680px] space-y-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Verktyg</div>
        <h1 className="font-serif text-[48px] leading-[.98] tracking-[-0.045em] md:text-[64px]">Finansiella kalkylatorer</h1>
        <p className="max-w-[620px] text-base leading-7 text-slate-600 md:text-[17px]">
          Använd våra interaktiva verktyg för att planera ditt sparande, beräkna framtida avkastning och sätta upp mål för din ekonomi.
        </p>
      </div>
      </div>
      </div>

      <div className="mx-auto grid min-w-0 max-w-[1180px] grid-cols-1 gap-3 px-5 py-8 md:grid-cols-2 md:px-8 md:py-10 lg:grid-cols-4">
        <div 
          onClick={() => setActiveTab("compound")}
          className={`group flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all md:p-6 ${activeTab === "compound" ? "border-emerald-700 ring-1 ring-emerald-700" : "border-slate-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"}`}
        >
          <div className="space-y-6">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${activeTab === "compound" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white"}`}>
              <TrendingUp size={22} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Ränta-på-ränta</h3>
            <p className="text-sm leading-6 text-slate-500">
              Beräkna hur ditt kapital växer över tid med hjälp av ränta-på-ränta effekten.
            </p>
          </div>
          <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {activeTab === "compound" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("goal")}
          className={`group flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all md:p-6 ${activeTab === "goal" ? "border-emerald-700 ring-1 ring-emerald-700" : "border-slate-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"}`}
        >
          <div className="space-y-6">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${activeTab === "goal" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white"}`}>
              <Target size={22} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Målsparande</h3>
            <p className="text-sm leading-6 text-slate-500">
              Hur mycket behöver du spara varje månad för att nå ditt mål?
            </p>
          </div>
          <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {activeTab === "goal" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("dcf")}
          className={`group flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all md:p-6 ${activeTab === "dcf" ? "border-emerald-700 ring-1 ring-emerald-700" : "border-slate-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"}`}
        >
          <div className="space-y-6">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${activeTab === "dcf" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white"}`}>
              <Calculator size={22} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">DCF-värdering</h3>
            <p className="text-sm leading-6 text-slate-500">
              Beräkna ett bolags motiverade värde genom att diskontera framtida kassaflöden.
            </p>
          </div>
          <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {activeTab === "dcf" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("dividend")}
          className={`group flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all md:p-6 ${activeTab === "dividend" ? "border-emerald-700 ring-1 ring-emerald-700" : "border-slate-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"}`}
        >
          <div className="space-y-6">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${activeTab === "dividend" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white"}`}>
              <DollarSign size={22} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Utdelning</h3>
            <p className="text-sm leading-6 text-slate-500">
              Beräkna din framtida passiva inkomst från utdelningsaktier.
            </p>
          </div>
          <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {activeTab === "dividend" ? "Aktiv" : "Välj"} <ArrowRight size={14} />
          </div>
        </div>
      </div>

      <motion.section 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[1180px] px-5 pb-16 md:px-8"
      >
        {activeTab === "compound" && <CompoundInterestCalculator />}
        {activeTab === "goal" && <GoalSavingsCalculator />}
        {activeTab === "dcf" && <DCFCalculator />}
        {activeTab === "dividend" && <DividendCalculator />}
      </motion.section>
    </div>
  );
}
