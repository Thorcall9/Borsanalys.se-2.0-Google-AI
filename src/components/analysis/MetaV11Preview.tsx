import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Gauge,
  Landmark,
  LineChart,
  ShieldAlert,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEO from "../SEO";
import HistoricalFundament from "./HistoricalFundament";
import { AnalysisData } from "../../types/analysis";

type Props = { data: AnalysisData };
type TabId = "overview" | "theses" | "valuation" | "next";

const tabs: { id: TabId; label: string; target: string }[] = [
  { id: "overview", label: "Översikt", target: "overview" },
  { id: "theses", label: "Teser", target: "theses" },
  { id: "valuation", label: "Värdering", target: "valuation" },
  { id: "next", label: "Nästa rapport", target: "next-report" },
];
const positives = [
  {
    title: "Annonsmotorn levererar på två fronter",
    body: "Annonsvisningar ökade 14 % och pris per annons 12 % i Q2.",
    icon: LineChart,
  },
  {
    title: "Global skala ger distributionskraft",
    body: "Family DAP uppgick till 3,60 miljarder i juni.",
    icon: Sparkles,
  },
  {
    title: "Q2 innehöll identifierade engångskostnader",
    body: "Begränsat justerad rörelsemarginal var 36,8 %.",
    icon: Gauge,
  },
];
const cautions = [
  {
    title: "AI-investeringarna är mycket stora",
    body: "FCF var 0,784 md USD efter 31,1 md USD i Q2-capex.",
    icon: WalletCards,
  },
  {
    title: "Åtagandena begränsar flexibiliteten",
    body: "349,31 md USD i icke uppsägningsbara avtal.",
    icon: Landmark,
  },
  {
    title: "Avkastningstidpunkten är okänd",
    body: "Ledningen har inte kvantifierat ROI för AI-infrastruktur.",
    icon: ShieldAlert,
  },
];
const theses = [
  {
    status: "Stärkt",
    title: "Annonsmotorn bär investeringarna",
    signal: "Annonsvisningar ökade 14 % och pris per annons 12 % i Q2.",
    next: "Både pris och visningar fortsätter vara positiva.",
  },
  {
    status: "Ej bekräftad",
    title: "AI återställer kapitalavkastningen",
    signal:
      "Begränsat justerad marginal var 36,8 %, men FCF var bara 0,784 md USD efter Q2-capex.",
    next: "Marginal ≥35 % och tydligt bättre FCF.",
  },
  {
    status: "Ej bekräftad",
    title: "Reality Labs hålls disciplinerad",
    signal: "Förlusten är fortsatt en av de centrala resultatriskerna.",
    next: "Förlust ≤4,0 md USD per kvartal.",
  },
];
const monitors = [
  {
    focus: "Annonsvisningar",
    latest: "+14 %",
    next: "Fortsatt positiv utveckling",
    why: "Visar att annonsmotorn fortsätter bära investeringarna.",
  },
  {
    focus: "Pris per annons",
    latest: "+12 %",
    next: "Fortsatt positiv utveckling",
    why: "Visar fortsatt monetiseringsstyrka.",
  },
  {
    focus: "Justerad rörelsemarginal",
    latest: "36,8 %",
    next: "≥35 %",
    why: "Testar om AI-investeringarna kan absorberas.",
  },
  {
    focus: "Reality Labs",
    latest: "−4,62 md USD",
    next: "Förlust ≤4,0 md USD",
    why: "Testar kapitaldisciplinen utanför kärnaffären.",
  },
];

function SectionNav({
  activeTab,
  onSelect,
}: {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
}) {
  return (
    <nav
      className="sticky top-[68px] z-20 border-y border-emerald-950/10 bg-white/95 backdrop-blur"
      aria-label="Avsnitt i analysen"
    >
      <div className="no-scrollbar mx-auto flex max-w-6xl overflow-x-auto px-4 sm:px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              onSelect(tab.id);
              document
                .getElementById(tab.target)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`min-h-12 shrink-0 border-b-2 px-4 text-sm font-bold transition-colors sm:px-6 ${activeTab === tab.id ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:border-emerald-200 hover:text-emerald-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
function ReasonRows({
  rows,
  tone,
}: {
  rows: { title: string; body: string; icon: LucideIcon }[];
  tone: "positive" | "caution";
}) {
  const accent = tone === "positive" ? "text-emerald-600" : "text-amber-600";
  return (
    <div className="divide-y divide-slate-200/85">
      {rows.map(({ title, body, icon: Icon }) => (
        <div
          key={title}
          className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
        >
          <span
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/20 bg-white ${accent}`}
          >
            <Icon size={20} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-extrabold text-slate-950">
              {title}
            </span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              {body}
            </span>
          </span>
          <ArrowRight className={`${accent} mt-2 shrink-0`} size={18} />
        </div>
      ))}
    </div>
  );
}

type OperatingLadder = NonNullable<
  AnalysisData["scenarios"][number]["operatingLadder"]
>;

function ValuationChain({
  ladder,
  targetYear,
  multiple,
  value,
}: {
  ladder: OperatingLadder;
  targetYear: number;
  multiple?: string;
  value: string;
}) {
  const metric = (label: string, amount: string, accent = false) => (
    <div>
      <p className="text-slate-500">{label}</p>
      <p
        className={`mt-1 text-xl font-black ${accent ? "text-emerald-700" : ""}`}
      >
        {amount}
      </p>
    </div>
  );
  const operator = (symbol: string) => (
    <span className="font-black text-emerald-700" aria-hidden="true">
      {symbol}
    </span>
  );
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-slate-700">Så blir värdet</p>
      <div className="mt-3 space-y-4 text-sm sm:hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-x-3">
          {metric(`Omsättning ${targetYear}E`, `$${ladder.revenueUsdBn} md`)}
          {operator("×")}
          {metric("Rörelsemarginal", `${ladder.operatingMarginPct} %`)}
        </div>
        <div className="flex items-end gap-3 border-t border-slate-100 pt-3">
          {operator("=")}
          {metric(
            "Rörelseresultat",
            `$${ladder.operatingIncomeUsdBn.toFixed(2)} md`,
          )}
        </div>
        <div className="border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-500">Efter skatt och antal aktier</p>
          <div className="mt-2 grid grid-cols-[1fr_auto_auto_auto_1fr] items-end gap-x-2">
            {metric(
              "Normaliserad EPS",
              `$${ladder.normalizedEpsUsd.toFixed(2)}`,
            )}
            {operator("×")}
            {metric("P/E", multiple ?? "—")}
            {operator("=")}
            {metric("Rimligt värde", value, true)}
          </div>
        </div>
      </div>
      <div className="mt-3 hidden flex-wrap items-center gap-x-3 gap-y-4 text-sm sm:flex">
        {metric(`Omsättning ${targetYear}E`, `$${ladder.revenueUsdBn} md`)}
        {operator("×")}
        {metric("Rörelsemarginal", `${ladder.operatingMarginPct} %`)}
        {operator("=")}
        {metric(
          "Rörelseresultat",
          `$${ladder.operatingIncomeUsdBn.toFixed(2)} md`,
        )}
        {operator("→")}
        <div>
          {metric("Normaliserad EPS", `$${ladder.normalizedEpsUsd.toFixed(2)}`)}
          <p className="mt-1 text-xs text-slate-500">
            efter skatt och antal aktier
          </p>
        </div>
        {operator("×")}
        {metric("P/E", multiple ?? "—")}
        {operator("=")}
        {metric("Rimligt värde", value, true)}
      </div>
    </div>
  );
}

export default function MetaV11Preview({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showMethod, setShowMethod] = useState(false);
  const [risksOpen, setRisksOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    "bear" | "base" | "bull"
  >("base");
  const targetYear = data.valuationTargetYear ?? 2027;
  const valuationRows = data.valuationTables?.[0]?.rows ?? [];
  const scenarioPresentation = data.scenarios.map((scenario) => {
    const row = valuationRows.find(
      (item) => String(item[0]).toLowerCase() === scenario.label.toLowerCase(),
    );
    return {
      ...scenario,
      displayLabel:
        scenario.type === "bear"
          ? "Försiktigt"
          : scenario.type === "base"
            ? "Huvudscenario"
            : "Positivt",
      eps: row ? String(row[1]) : undefined,
      multiple: row ? String(row[2]) : undefined,
    };
  });
  const activeScenario =
    scenarioPresentation.find(
      (scenario) => scenario.type === selectedScenario,
    ) ?? scenarioPresentation[0];
  const history = data.historicalFundament;
  const annualGrowth =
    activeScenario?.operatingLadder?.revenueGrowthFromLatestAnnualPct;
  const marginRange = history?.derived?.operatingMarginRange2019To2025Pct;
  const preview = data.v11Preview;
  const reasonIcons: LucideIcon[] = [LineChart, Sparkles, Gauge];
  const cautionIcons: LucideIcon[] = [WalletCards, Landmark, ShieldAlert];
  const positiveRows = preview
    ? preview.positiveReasons.map((row, index) => ({ ...row, icon: reasonIcons[index] ?? LineChart }))
    : positives;
  const cautionRows = preview
    ? preview.cautionReasons.map((row, index) => ({ ...row, icon: cautionIcons[index] ?? ShieldAlert }))
    : cautions;
  const displayedTheses = preview?.theses ?? theses;
  const displayedMonitors = preview?.monitors ?? monitors;

  return (
    <>
      <SEO
        title={`${data.title} (${data.ticker}) — analys`}
        description={data.summary}
        ogType="article"
        noindex
      />
      <article className="bg-white text-slate-950">
        <header
          id="overview"
          className="scroll-mt-36 border-b border-emerald-950/10"
        >
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12">
            <Link
              to="/analys"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700"
            >
              <ArrowLeft size={17} />
              Alla analyser
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-slate-500">
              <p>
                {data.title} <span className="mx-1 text-slate-300">/</span>{" "}
                {data.ticker} <span className="mx-1 text-slate-300">/</span>{" "}
                Uppdaterad {new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${data.date}T12:00:00`))}
              </p>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-sm ${saved ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"}`}
              >
                {saved ? <Check size={17} /> : <Bookmark size={17} />}
                {saved ? "Sparad" : "Spara analys"}
              </button>
            </div>
            <h1 className="mt-7 max-w-5xl font-serif text-[2.25rem] font-bold leading-[0.98] tracking-[-0.052em] sm:text-6xl lg:text-7xl">
              {preview?.headline ?? "Meta: stark annonsmotor – men AI-investeringarna måste betala sig"}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              {preview?.dek ?? "Annonser växer i både volym och pris. Nästa prövning är om AI-kapaciteten ger avkastning utan att kapitalbindningen blir permanent."}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 text-sm font-black tracking-wide text-emerald-700">
                <Eye size={18} /> {data.recommendation}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {preview?.riskLabel ?? "Hög risk"}
              </span>
            </div>
            <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/75 p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                    Vår syn
                  </h2>
                  <p className="mt-3 text-sm font-bold text-slate-600">
                    Vårt värde {targetYear}E
                  </p>
                  <div className="mt-1 flex items-end gap-3">
                    <p className="font-serif text-6xl font-bold leading-none tracking-[-0.055em] text-emerald-700 sm:text-7xl">
                      {preview?.weightedFairValue ?? "764"}
                    </p>
                    <p className="mb-1.5 text-xl font-bold text-emerald-700">
                      USD
                    </p>
                  </div>
                  <p className="mt-2 text-base text-slate-600">
                    Sannolikhetsvägt scenariovärde
                  </p>
                </div>
                <div className="border-t border-emerald-200 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="text-sm text-slate-600">
                    Dagens kurs: {preview?.currentPrice ?? "592,10 USD"}
                  </p>
                  <p className="mt-2 font-serif text-4xl font-bold leading-none tracking-[-0.045em] text-emerald-700">
                    {preview?.upside ?? "+29 %"}
                  </p>
                  <p className="mt-2 text-base text-slate-600">
                    Möjlig total uppsida före utdelning
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {preview?.annualPotential ?? "Årlig potential: cirka 20 %"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMethod((value) => !value)}
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
              >
                {showMethod ? "Dölj värderingsbrygga" : "Så har vi räknat"}
                {showMethod ? (
                  <ChevronUp size={17} />
                ) : (
                  <ArrowRight size={17} />
                )}
              </button>
              {showMethod && activeScenario && (
                <div className="mt-4 border-t border-emerald-200 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {scenarioPresentation.map((scenario) => (
                      <button
                        key={scenario.type}
                        type="button"
                        onClick={() => setSelectedScenario(scenario.type)}
                        className={`rounded-full px-3 py-2 text-xs font-black ${scenario.type === selectedScenario ? "bg-emerald-700 text-white" : "bg-white text-slate-600 ring-1 ring-emerald-200"}`}
                      >
                        {scenario.displayLabel}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-emerald-200 bg-white/80 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                      {activeScenario.displayLabel} · värderingsbrygga
                    </p>
                    {activeScenario.operatingLadder && (
                      <ValuationChain
                        ladder={activeScenario.operatingLadder}
                        targetYear={targetYear}
                        multiple={activeScenario.multiple}
                        value={activeScenario.value}
                      />
                    )}
                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600 md:grid-cols-2">
                      <div>
                        <p className="font-bold text-slate-950">
                          Historisk kontext
                        </p>
                        <p className="mt-1">
                          {annualGrowth?.toFixed(1)} % årlig omsättningstillväxt
                          från FY2025 till {targetYear}E, jämfört med{" "}
                          {history?.derived?.revenueCagr2019To2025Pct.toFixed(
                            1,
                          )}{" "}
                          % historisk CAGR.
                        </p>
                        <p className="mt-1">
                          Marginalantagandet{" "}
                          {activeScenario.operatingLadder?.operatingMarginPct} %
                          ligger inom det historiska intervallet{" "}
                          {marginRange?.join("–")} % och jämförs med LTM{" "}
                          {history?.latest?.operatingMarginPct.toFixed(1)} %.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-950">
                          Varför denna multipel?
                        </p>
                        <p className="mt-1">
                          {activeScenario.description ??
                            "Modellmotivering saknas i det kanoniska underlaget."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Värderingsbryggan visar scenarioantaganden; historik och
                    beräkningar är spårbara i den expanderbara historikvyn.
                  </p>
                </div>
              )}
            </section>
          </div>
        </header>
        <SectionNav activeTab={activeTab} onSelect={setActiveTab} />
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <section className="grid scroll-mt-36 gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-emerald-700 sm:text-4xl">
                Varför caset är intressant
              </h2>
              <div className="mt-7">
                <ReasonRows rows={positiveRows} tone="positive" />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                Varför vi är försiktiga
              </h2>
              <div className="mt-7">
                <ReasonRows rows={cautionRows} tone="caution" />
              </div>
            </div>
          </section>
          <section className="border-t border-slate-200 py-10 lg:py-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
              Börsanalys.se:s insikt
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
              {preview?.insightHeadline ?? "AI-caset är en kapitalavkastningsfråga"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {preview?.insightBody ?? "Efterfrågan är inte huvudfrågan: både annonsvolym och pris växer. Frågan är om annonsmotorn kan finansiera ett större infrastrukturnät utan ett varaktigt tapp i marginal, FCF och kapitalallokering."}
            </p>
          </section>
          {history && <HistoricalFundament data={history} />}
          <section
            id="theses"
            className="scroll-mt-36 border-t border-slate-200 py-10 lg:py-14"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                Teser att följa
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
                Vad måste bevisas för att caset ska fungera?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Vi följer samma teser från rapport till rapport. Statusen ändras
                när faktiska utfall stärker, försvagar eller bryter dem.
              </p>
            </div>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {displayedTheses.map((thesis) => (
                <div
                  key={thesis.title}
                  className="grid gap-3 py-5 md:grid-cols-[150px_1fr_1fr] md:gap-8"
                >
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${thesis.status === "Stärkt" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                    >
                      {thesis.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">{thesis.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {thesis.signal}
                    </p>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                      Nästa bevis
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {thesis.next}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section
            id="valuation"
            className="scroll-mt-36 border-t border-slate-200 py-10 lg:py-14"
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                  Värdering
                </p>
                <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                  Tre utfall – inte en falsk exakt riktkurs
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                Modellen använder normaliserad EPS. FCF-kontrollen visar att den
                höga AI-capexen fortfarande är den centrala osäkerheten.
              </p>
            </div>
            <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
              {scenarioPresentation.map((scenario) => (
                <div
                  key={scenario.type}
                  className="bg-white p-6 hover:bg-emerald-50/45"
                >
                  <p className="text-sm font-bold text-slate-500">
                    {scenario.displayLabel}
                  </p>
                  <p className="mt-3 font-serif text-5xl font-bold tracking-[-0.05em]">
                    {scenario.value}
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    {scenario.probability} sannolikhet
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 border-l-2 border-emerald-500 pl-5 text-sm leading-6 text-slate-600 md:grid-cols-2">
              <p>
                <strong className="text-slate-950">Kontroll:</strong>{" "}
                {preview?.valuationCheck ?? "TTM justerad P/E är cirka 20x; TTM FCF-avkastning cirka 2,5 %."}
              </p>
              <p>
                <strong className="text-slate-950">Begränsning:</strong>{" "}
                {preview?.valuationLimitation ?? "FCF är pressat av AI-capex och ska inte tolkas som ett normaliserat kassaflöde."}
              </p>
            </div>
          </section>
          <section
            id="next-report"
            className="scroll-mt-36 border-t border-slate-200 py-10 lg:py-14"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                Nästa rapport
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                Det här följer vi först
              </h2>
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
              <div className="hidden grid-cols-[1fr_.7fr_1.1fr_1.35fr] gap-5 bg-emerald-50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-800 md:grid">
                <span>Fokusområde</span>
                <span>Senast</span>
                <span>Nästa bevis</span>
                <span>Varför det spelar roll</span>
              </div>
              <div className="divide-y divide-slate-200">
                {displayedMonitors.map((monitor) => (
                  <div
                    key={monitor.focus}
                    className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_.7fr_1.1fr_1.35fr] md:gap-5"
                  >
                    <h3 className="font-bold">{monitor.focus}</h3>
                    <p className="text-sm font-semibold leading-6 text-emerald-700">
                      {monitor.latest}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      {monitor.next}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      {monitor.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="border-t border-slate-200 py-10 lg:py-14">
            <button
              type="button"
              onClick={() => setRisksOpen((value) => !value)}
              className="flex w-full items-center justify-between gap-5 text-left"
            >
              <span>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">
                  Risker och metod
                </span>
                <span className="mt-2 block font-serif text-3xl font-bold tracking-[-0.035em]">
                  Läs det viktiga innan du fattar ett beslut
                </span>
              </span>
              {risksOpen ? (
                <ChevronUp className="shrink-0 text-amber-600" size={24} />
              ) : (
                <ChevronDown className="shrink-0 text-amber-600" size={24} />
              )}
            </button>
            {risksOpen && (
              <div className="mt-6 grid gap-5 border-l-2 border-amber-400 pl-5 text-sm leading-7 text-slate-600 md:grid-cols-2">
                <p>
                  {preview?.riskAndMethod ?? "Huvudriskerna är kapitalintensitet, annonskonjunktur och betydande juridiska/regulatoriska förfaranden. Meta har stora framtida moln- och leasingåtaganden."}
                </p>
                <p>
                  Rapportdata är FACT; TTM-tal är DERIVED; 2027-scenarier är
                  ASSUMPTION; investeringsinsikten är ANALYSIS. Analyser är
                  utbildande bedömningar, inte personlig investeringsrådgivning.
                </p>
              </div>
            )}
          </section>
          <footer className="border-t border-slate-200 py-9 text-sm leading-6 text-slate-500">
            <p>
              <strong className="text-slate-700">Källor:</strong>{" "}
              {preview?.sourceSummary ?? "Metas årsrapporter FY2019–FY2025, Q2 2026 Form 10-Q, kvartalsrapporter och earnings call-transkript samt META-stängningskurs 7 augusti 2026."}
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
