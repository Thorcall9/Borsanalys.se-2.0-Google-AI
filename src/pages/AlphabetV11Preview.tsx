import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Cloud,
  Eye,
  Gauge,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import SEO from "../components/SEO";

type TabId = "overview" | "theses" | "valuation" | "next";

const tabs: { id: TabId; label: string; target: string }[] = [
  { id: "overview", label: "Översikt", target: "overview" },
  { id: "theses", label: "Teser", target: "theses" },
  { id: "valuation", label: "Värdering", target: "valuation" },
  { id: "next", label: "Nästa rapport", target: "next-report" },
];

const positiveReasons = [
  {
    title: "Google Cloud har blivit en vinstmotor",
    body: "Cloud omsatte 24,8 md USD och rörelsevinsten steg till 8,8 md USD i senaste kvartalet.",
    icon: Cloud,
  },
  {
    title: "Search fortsätter växa",
    body: "Search & other växte 17 %, trots att AI förändrar hur människor söker information.",
    icon: Search,
  },
  {
    title: "AI-efterfrågan syns i orderstocken",
    body: "Cloud-backloggen på 514 md USD ger stöd för att efterfrågan är bred och långsiktig.",
    icon: Sparkles,
  },
];

const cautiousReasons = [
  {
    title: "AI-investeringarna är mycket stora",
    body: "TTM-capex på 132,4 md USD har pressat fritt kassaflöde till 53,3 md USD.",
    icon: WalletCards,
  },
  {
    title: "Rapporterad vinst behöver normaliseras",
    body: "Stora värdeförändringar i aktieinnehav kan göra enskilda EPS-siffror missvisande.",
    icon: Gauge,
  },
  {
    title: "Aktien kräver fortsatt stark leverans",
    body: "Dagens värdering lämnar begränsad säkerhetsmarginal om Cloud eller Search bromsar.",
    icon: ShieldAlert,
  },
];

const theses = [
  {
    status: "Stärkt",
    title: "AI blir varaktig Cloud-omsättning",
    signal: "Cloud växte 82 % och rörelsevinsten steg kraftigt.",
    next: "Cloud växer över 30 % med fortsatt bättre lönsamhet.",
  },
  {
    status: "Stärkt",
    title: "Search försvarar sin relevans",
    signal: "Search & other växte 17 % i senaste kvartalet.",
    next: "Tvåsiffrig tillväxt samtidigt som AI-svaren tar större plats.",
  },
  {
    status: "Ej bekräftad",
    title: "Investeringarna skapar ekonomisk avkastning",
    signal: "Capex är hög och FCF är ännu pressat.",
    next: "Rörelsevinsten och FCF behöver utvecklas bättre än investeringarna.",
  },
  {
    status: "Ej bekräftad",
    title: "Kapitalallokering skapar värde per aktie",
    signal: "Aktieantal och finansiering behöver följas framåt.",
    next: "Stabilt eller fallande aktieantal över tid.",
  },
];

const reportFocus = [
  ["Google Cloud", "Tillväxt över 30 % och högre rörelsevinst", "Visar att AI-investeringarna börjar ge avkastning."],
  ["Search & other", "Fortsatt tvåsiffrig tillväxt", "Bekräftar att kärnaffären står emot AI-skiftet."],
  ["Capex och FCF", "Rörelsevinst växer snabbare än capex", "Avgör hur kapitalintensivt caset faktiskt blir."],
  ["Backlog", "Orderstock ökar och konverteras till intäkter", "Visar om AI-efterfrågan är uthållig."],
];

const scenarios = [
  ["Försiktigt", "242 USD", "25 %", "Cloud avtar, capex belastar och multipeln normaliseras."],
  ["Huvudscenario", "392 USD", "55 %", "Cloud växer vidare, Search håller och investeringarna ger resultat."],
  ["Positivt", "553 USD", "20 %", "AI och Cloud skalar med hög vinsthävstång."],
];

function SectionNav({ activeTab, onSelect }: { activeTab: TabId; onSelect: (tab: TabId) => void }) {
  return (
    <nav className="sticky top-[68px] z-20 border-y border-emerald-950/10 bg-white/95 backdrop-blur" aria-label="Avsnitt i analysen">
      <div className="no-scrollbar mx-auto flex max-w-6xl overflow-x-auto px-4 sm:px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              onSelect(tab.id);
              document.getElementById(tab.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`min-h-12 shrink-0 border-b-2 px-4 text-sm font-bold transition-colors sm:px-6 ${
              activeTab === tab.id
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:border-emerald-200 hover:text-emerald-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function ReasonRows({ rows, tone }: { rows: typeof positiveReasons; tone: "positive" | "caution" }) {
  const accent = tone === "positive" ? "text-emerald-600" : "text-amber-600";
  return (
    <div className="divide-y divide-slate-200/85">
      {rows.map(({ title, body, icon: Icon }) => (
        <button
          key={title}
          type="button"
          className="group flex w-full items-start gap-4 py-5 text-left first:pt-0 last:pb-0"
          aria-label={`${title}. ${body}`}
        >
          <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/20 bg-white ${accent} transition-transform duration-200 group-hover:scale-105`}>
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-extrabold text-slate-950">{title}</span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">{body}</span>
          </span>
          <ArrowRight className={`${accent} mt-2 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100`} size={18} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

export default function AlphabetV11Preview() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showMethod, setShowMethod] = useState(false);
  const [risksOpen, setRisksOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <SEO
        title="Alphabet: stark AI-tillväxt – men begränsad säkerhetsmarginal"
        description="En mobiloptimerad v11.1-preview av Börsanalys.se:s grundanalys av Alphabet."
      />

      <article className="bg-white text-slate-950">
        <header id="overview" className="scroll-mt-36 border-b border-emerald-950/10">
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12">
            <Link to="/analys" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700">
              <ArrowLeft size={17} aria-hidden="true" />
              Alla analyser
            </Link>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-slate-500">
              <p>Alphabet Inc. <span className="mx-1 text-slate-300">/</span> GOOG <span className="mx-1 text-slate-300">/</span> Uppdaterad 8 augusti 2026</p>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${
                  saved ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                }`}
                aria-pressed={saved}
              >
                {saved ? <Check size={17} aria-hidden="true" /> : <Bookmark size={17} aria-hidden="true" />}
                {saved ? "Sparad" : "Spara analys"}
              </button>
            </div>

            <h1 className="mt-7 max-w-5xl break-words font-serif text-[2.25rem] font-bold leading-[0.98] tracking-[-0.052em] text-slate-950 sm:text-6xl lg:text-7xl" style={{ overflowWrap: "anywhere" }}>
              Alphabet: stark AI-tillväxt – men begränsad säkerhetsmarginal
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Google Cloud växer snabbt och Search håller emot. Men AI-investeringarna är redan stora.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 text-sm font-black tracking-wide text-emerald-700">
                <Eye size={18} aria-hidden="true" /> BEVAKA
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" aria-hidden="true" /> Medel–hög risk
              </span>
            </div>

            <section aria-labelledby="view-heading" className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/75 p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id="view-heading" className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Vår syn</h2>
                  <div className="mt-3 flex items-end gap-3">
                    <p className="font-serif text-6xl font-bold leading-none tracking-[-0.055em] text-emerald-700 sm:text-7xl">387</p>
                    <p className="mb-1.5 text-xl font-bold text-emerald-700">USD</p>
                  </div>
                  <p className="mt-2 text-base text-slate-600">Sannolikhetsvägt värde vid slutet av 2028</p>
                </div>
                <div className="border-t border-emerald-200 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="font-serif text-5xl font-bold leading-none tracking-[-0.045em] text-emerald-700">+9 %</p>
                  <p className="mt-2 text-base text-slate-600">Möjlig total uppsida före utdelning</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMethod((value) => !value)}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
                aria-expanded={showMethod}
              >
                {showMethod ? "Dölj värderingsmetod" : "Så har vi räknat"}
                {showMethod ? <ChevronUp size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
              </button>
              {showMethod && (
                <div className="mt-4 border-t border-emerald-200 pt-4 text-sm leading-6 text-slate-700">
                  <p>Värdet bygger på en förenklad P/E-modell med normaliserad EPS för 2028. Bear, bas och bull vägs med 25 %, 55 % respektive 20 %.</p>
                  <p className="mt-2 text-slate-500">Referenskurs: 353,47 USD, GOOG-stängning den 7 augusti 2026. Scenarioantaganden är redaktionella modellantaganden – inte bolagets prognoser.</p>
                </div>
              )}
            </section>
          </div>
        </header>

        <SectionNav activeTab={activeTab} onSelect={setActiveTab} />

        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <section className="grid scroll-mt-36 gap-10 py-11 lg:grid-cols-2 lg:gap-16 lg:py-16" aria-label="Översikt av caset">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-emerald-700 sm:text-4xl">Varför caset är intressant</h2>
              <div className="mt-7"><ReasonRows rows={positiveReasons} tone="positive" /></div>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">Varför vi är försiktiga</h2>
              <div className="mt-7"><ReasonRows rows={cautiousReasons} tone="caution" /></div>
            </div>
          </section>

          <section id="theses" className="scroll-mt-36 border-t border-slate-200 py-11 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Teser att följa</p>
              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl">Vad måste bevisas för att caset ska fungera?</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Vi följer samma teser från rapport till rapport. Statusen ändras när faktiska utfall stärker, försvagar eller bryter dem.</p>
            </div>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {theses.map((thesis) => (
                <div key={thesis.title} className="grid gap-3 py-5 md:grid-cols-[150px_1fr_1fr] md:gap-8">
                  <div><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${thesis.status === "Stärkt" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{thesis.status}</span></div>
                  <div><h3 className="font-bold text-slate-950">{thesis.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{thesis.signal}</p></div>
                  <div className="border-l border-slate-200 pl-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Nästa bevis</p><p className="mt-1 text-sm leading-6 text-slate-600">{thesis.next}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="valuation" className="scroll-mt-36 border-t border-slate-200 py-11 lg:py-16">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Värdering</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">Tre utfall – inte en falsk exakt riktkurs</h2></div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">Modellen använder normaliserad EPS. FCF-kontrollen visar att dagens höga AI-capex fortfarande är den centrala osäkerheten.</p>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
              {scenarios.map(([label, value, probability, explanation]) => (
                <div key={label} className="bg-white p-6 transition-colors duration-200 hover:bg-emerald-50/45">
                  <p className="text-sm font-bold text-slate-500">{label}</p>
                  <p className="mt-3 font-serif text-5xl font-bold tracking-[-0.05em] text-slate-950">{value}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">{probability} sannolikhet</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{explanation}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 border-l-2 border-emerald-500 pl-5 text-sm leading-6 text-slate-600 md:grid-cols-2">
              <p><strong className="text-slate-950">Kontroll:</strong> TTM-FCF per aktie är cirka 4,34 USD, vilket ger en FCF-avkastning kring 1,2 % vid referenskursen.</p>
              <p><strong className="text-slate-950">Begränsning:</strong> FCF är pressat av AI-capex och ska inte tolkas som ett normaliserat kassaflöde.</p>
            </div>
          </section>

          <section id="next-report" className="scroll-mt-36 border-t border-slate-200 py-11 lg:py-16">
            <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Nästa rapport</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">Det här följer vi först</h2></div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <div className="hidden grid-cols-[1fr_1.1fr_1.35fr] gap-5 bg-emerald-50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-800 md:grid"><span>Fokusområde</span><span>Vad vi vill se</span><span>Varför det spelar roll</span></div>
              <div className="divide-y divide-slate-200">
                {reportFocus.map(([focus, signal, why]) => (
                  <div key={focus} className="grid gap-2 px-5 py-5 md:grid-cols-[1fr_1.1fr_1.35fr] md:gap-5"><h3 className="font-bold text-slate-950">{focus}</h3><p className="text-sm leading-6 text-slate-600">{signal}</p><p className="text-sm leading-6 text-slate-600">{why}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-10 lg:py-14">
            <button type="button" onClick={() => setRisksOpen((value) => !value)} className="flex w-full items-center justify-between gap-5 text-left" aria-expanded={risksOpen}>
              <span><span className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Risker och metod</span><span className="mt-2 block font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950">Läs det viktiga innan du fattar ett beslut</span></span>
              {risksOpen ? <ChevronUp className="shrink-0 text-amber-600" size={24} /> : <ChevronDown className="shrink-0 text-amber-600" size={24} />}
            </button>
            {risksOpen && <div className="mt-6 grid gap-5 border-l-2 border-amber-400 pl-5 text-sm leading-7 text-slate-600 md:grid-cols-2"><p>Analyser, scenarier och värderingar är utbildande bedömningar och inte personlig investeringsrådgivning. Aktier kan både öka och minska i värde.</p><p>Värderingen bygger på antaganden som kan visa sig felaktiga. Referenskursen är 353,47 USD per GOOG-aktie vid stängning den 7 augusti 2026.</p></div>}
          </section>

          <footer className="border-t border-slate-200 py-9 text-sm leading-6 text-slate-500">
            <p><strong className="text-slate-700">Källor:</strong> Alphabets kvartalsrapporter för Q3 2025–Q2 2026, Q2 2026-presentationen och Google Finance för GOOG-stängningen. Scenarioantaganden och multiplar är redaktionella modellantaganden.</p>
            <p className="mt-3">Den här sidan är den verifierade v11.1-strukturen för grundanalyser. Den befintliga, äldre Alphabet-analysen ligger kvar oförändrad.</p>
          </footer>
        </div>
      </article>
    </>
  );
}
