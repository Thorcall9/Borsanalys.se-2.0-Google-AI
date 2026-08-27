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
  LockKeyhole,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import SEO from "../components/SEO";
import CanonicalRiskRewardScale from "../components/analysis/CanonicalRiskRewardScale";
import { useAuth } from "../contexts/AuthContext";
import { alphabetV112Dossier } from "../data/analyses/alphabet/alphabet-v11-model";
import { netflixDerived, netflixFacts, netflixRiskRewardZones, netflixScenarios, netflixStressTest, netflixV112Dossier, netflixWbdNormalization } from "../data/analyses/netflix/netflix-v11-model";

type TabId = "overview" | "theses" | "valuation" | "next";

const tabs: { id: TabId; label: string; target: string }[] = [
  { id: "overview", label: "Översikt", target: "overview" },
  { id: "theses", label: "Teser", target: "theses" },
  { id: "valuation", label: "Värdering", target: "valuation" },
  { id: "next", label: "Nästa rapport", target: "next-report" },
];

const positiveReasons = [
  {
    title: "Google Cloud utvecklas till Alphabets andra stora vinstmotor",
    body: "Cloud växte 82 % till 24,8 md USD och rörelsemarginalen steg till 35,6 %. Kombinationen gör segmentet allt viktigare för koncernens vinst.",
    icon: Cloud,
  },
  {
    title: "Search klarar AI-skiftet hittills",
    body: "Search & other växte 17 % i Q2. Högre query-användning talar hittills emot att generativ AI snabbt kannibaliserar kärnaffären.",
    icon: Search,
  },
  {
    title: "AI-efterfrågan syns i orderstocken",
    body: "Cloud-backloggen på 514 md USD ger visibilitet i efterfrågan, men intäktsföringen beror på villkor, leveranskapacitet och faktisk användning.",
    icon: Sparkles,
  },
];

const cautiousReasons = [
  {
    title: "AI-investeringarna förändrar kapitalprofilen",
    body: "2026-capex väntas bli 175–185 md USD, mer än tre gånger 2024 års nivå. Det pressar FCF nu och driver högre avskrivningar framöver.",
    icon: WalletCards,
  },
  {
    title: "Rapporterad EPS är missvisande",
    body: "Q2:s rapporterade EPS på 9,11 USD påverkades med cirka 6,26 USD per aktie av värdeförändringar i aktieinnehav. Värderingen bygger därför på normaliserad operativ intjäning.",
    icon: Gauge,
  },
  {
    title: "Aktieägaravkastningen måste hinna ikapp investeringarna",
    body: "Nytt eget kapital och skuld, samt pausade återköp, gör att framtida vinst och kassaflöde måste bedömas per aktie – inte bara på koncernnivå.",
    icon: ShieldAlert,
  },
];

const theses = [
  {
    status: "Stärkt",
    title: "Cloud blir en andra vinstmotor",
    signal: "Cloud växte 82 %, rörelsemarginalen steg till 35,6 % och backloggen nådde 514 md USD.",
    next: "Cloud håller över 30 % tillväxt samtidigt som rörelsemarginalen förblir strukturellt hög.",
  },
  {
    status: "Stärkt",
    title: "Search klarar AI-skiftet hittills",
    signal: "Search & other växte 17 % samtidigt som AI-funktioner fått betydligt större användning.",
    next: "Fortsatt tvåsiffrig Search-tillväxt och stabil kommersiell monetisering när AI Mode och AI Overviews tar större plats.",
  },
  {
    status: "Ej bekräftad",
    title: "Investeringarna skapar ekonomisk avkastning",
    signal: "Omsättning och rörelseresultat växer snabbt, men capex har ökat snabbare, TTM-FCF har fallit till cirka 53 md USD och Q2-FCF var negativt.",
    next: "Normaliserad EBIT och operativt kassaflöde växer snabbare än investeringsbasen samtidigt som FCF återhämtas.",
  },
];

const reportFocus = [
  ["Google Cloud", "+82 %, 35,6 % marginal", ">30 % tillväxt och fortsatt hög marginal", "Visar om AI-infrastrukturen fortsätter skapa lönsam tillväxt."],
  ["Search & other", "+17 %", "Fortsatt tvåsiffrig tillväxt och stabil monetisering", "Avgör om Google försvarar ekonomin i Search när AI-användningen växer."],
  ["Capex / FCF / avskrivningar", "TTM capex 132,4 md USD / TTM FCF 53,3 md USD", "FCF återhämtas och EBIT växer snabbare än investeringsbasen", "Avgör vilken kapitalavkastning AI-expansionen faktiskt ger."],
];

const netflixPositiveReasons = [
  { title: "Monetisering växer snabbare än tittartiden", body: "H1 2026 steg omsättningen 15 % medan aggregerad tittartid steg 2 %. Det indikerar bättre monetisering på bolagsnivå, men isolerar inte ARPU, retention eller engagemang per medlem.", icon: TrendingUp },
  { title: "Marginalerna har förbättrats kraftigt", body: "EBIT-marginalen steg från 17,8 % 2022 till 29,5 % 2025; 2026-guidningen är 31,5 %.", icon: Gauge },
  { title: "Reklam blir en materiell intäktsmotor", body: "Bolaget guidar för ungefär 3 md USD reklamintäkter under 2026, jämfört med över 1,5 md USD 2025.", icon: Sparkles },
];
const netflixCautiousReasons = [
  { title: "Aktien kräver fortsatt monetiseringsstyrka", body: "Huvudscenariot kräver 34 % EBIT-marginal och 23× P/E år 2028 för att ge rimlig potential.", icon: ShieldAlert },
  { title: "Innehållsåtaganden begränsar enkelheten", body: "Innehållsåtagandena var 25,1 md USD vid Q2 2026. Högre innehållsintensitet kan pressa FCF även med god omsättning.", icon: WalletCards },
  { title: "Vinstutveckling skyddar inte helt mot multipelrisk", body: "Det försiktiga scenariot antar fortsatt tillväxt och lönsamhet, men ett P/E på 18× ger ändå cirka 20 % nedsida från referenskurs.", icon: Gauge },
];
const netflixTheses = [
  { status: "På väg", title: "Monetiseringen på bolagsnivå fortsätter förbättras", signal: "H1 2026: intäkt +15 % medan aggregerad tittartid ökade 2 %; medlems-, pris-, region- och planmix kan förklara skillnaden.", next: "Medlemsutveckling, prissättning, planbyten, retention, engagemang och annonsutveckling i nästa rapport." },
  { status: "På väg", title: "Reklam blir en materiell intäktsmotor och kan utvecklas till en betydande vinstdrivare", signal: "Reklamintäkter översteg 1,5 md USD 2025; 2026-guidningen är cirka 3 md USD.", next: "Tydlig utveckling mot helårsambitionen utan att kundvärdet försämras." },
  { status: "Obekräftad", title: "34 % EBIT-marginal är uthållig", signal: "2025 nådde marginalen 29,5 % och 2026-guidningen är 31,5 %.", next: "Marginal nära/över guidning som också stöds av rapporterat kassaflöde." },
];
const netflixReportFocus = [
  ["Omsättning / medlems- och planmixsignaler", "Q3-guidning: +11,7 %", "I eller över guidning samt relevanta medlems- och planmixsignaler, i den mån bolaget lämnar sådana uppgifter.", "Testar monetisering utan att felaktigt likställa total tittartid med värde per medlem."],
  ["Rörelsemarginal", "Q3-guidning: 33,2 %", "Vid eller över guidning", "Visar om operationell hävstång är uthållig."],
  ["Reklam / FCF", "2026 mål: ≈3 md USD / rapporterad FCF ≈12,5 md USD", "Tydliga reklamframsteg samt kassaflödesutveckling som kan bedömas utan att engångseffekten misstolkas som återkommande intjäning.", "Avgör om den nya monetiseringen stärker återkommande kassaflöde."],
];

const formatUsd = (value: number, decimals = 0) => `${value.toFixed(decimals).replace(".", ",")} USD`;
const formatPct = (value: number, decimals = 1) => `${value >= 0 ? "+" : ""}${(value * 100).toFixed(decimals).replace(".", ",")} %`;
const formatMetricPct = (value: number, decimals = 1) => `${(value * 100).toFixed(decimals).replace(".", ",")} %`;
const formatNumber = (value: number, decimals = 1) => value.toFixed(decimals).replace(".", ",");

type PreviewVariant = "alphabet" | "netflix";

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

function AlphabetRiskRewardRail({ showPrices }: { showPrices: boolean }) {
  const zones = alphabetV112Dossier.riskRewardZones.zones;
  const gauge = alphabetV112Dossier.riskRewardZones.presentation.gauge;
  const insight = alphabetV112Dossier.riskRewardZones.presentation.memberInsight;
  if (!showPrices) return null;
  return <CanonicalRiskRewardScale
    identityLabel={insight.identityLabel}
    referencePriceLabel={insight.referencePriceLabel}
    referenceDateLabel={insight.referenceDateLabel}
    assessmentLabel={insight.assessmentLabel}
    assessmentRationale={insight.assessmentRationale}
    zones={zones.map((zone, index) => ({ id: zone.zone, title: zone.presentation.title.replace(" risk/reward", ""), priceLabel: zone.presentation.priceLabel, sharePct: insight.zoneSharesPct[index] }))}
    markers={insight.markers}
    scenario={gauge.scenarioSpread}
    footerNote={insight.footerNote}
  />;
}

function NetflixRiskRewardInsight({ isMember, onLogin }: { isMember: boolean; onLogin: () => void }) {
  const zones = netflixRiskRewardZones;
  const insight = zones.presentation.memberInsight;
  return (
    <section className="border-t border-slate-200 py-11 lg:py-16" aria-labelledby="netflix-risk-reward-heading">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Medlemsinsikt</p>
        <h2 id="netflix-risk-reward-heading" className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">När blir risk/reward mer attraktiv?</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">Tre priszoner visar hur säkerhetsmarginalen förändras utifrån samma referenskurs, scenarier och värderingsdatum som Netflix publicerade värdering. Zonerna ändrar inte rekommendationen.</p>
      </div>

      {isMember ? (
        <div className="mt-7">
          <CanonicalRiskRewardScale
            identityLabel={insight.identityLabel}
            referencePriceLabel={insight.referencePriceLabel}
            referenceDateLabel={insight.referenceDateLabel}
            assessmentLabel={insight.assessmentLabel}
            assessmentRationale={insight.assessmentRationale}
            zones={zones.zones.map((zone, index) => ({ id: zone.zone, title: zone.presentation.title.replace(" risk/reward", ""), priceLabel: zone.presentation.priceLabel, sharePct: insight.zoneSharesPct[index] }))}
            markers={insight.markers}
            scenario={{ label: insight.scenarioSpread.label, points: insight.scenarioSpread.points.map((point) => ({ label: point.label, annualPotentialLabel: point.annualPotentialLabel, priceLabel: point.valueLabel })), rangeSharesPct: insight.scenarioSpread.rangeSharesPct }}
            footerNote={insight.footerNote}
          />
        </div>
      ) : (
      <div className="mt-7 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">Netflix · NFLX</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Referenskurs och exakta nivåer visas för inloggade medlemmar.</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">Aktuell bedömning</p>
            <p className="mt-1 text-sm font-medium text-slate-600">Balanserad risk/reward</p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {zones.zones.map((zone) => <div key={zone.zone} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-sm font-bold text-slate-950">{zone.presentation.title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{zone.rationale}</p></div>)}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-600"><strong className="text-slate-950">Så ska bedömningen läsas:</strong> Risk/reward-zonen beskriver säkerhetsmarginalen vid kursen, inte en separat köp- eller säljrekommendation. Netflix canonical rekommendation är fortsatt <strong className="text-slate-950">BEVAKA</strong>.</p>
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-base font-bold text-slate-950">Logga in gratis för hela risk/reward-insikten</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">Med ett kostnadsfritt konto visas referenskurs, zonmarkör och scenariospann.</p>
          <button type="button" onClick={onLogin} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-800">Se full information – gratis <ArrowRight size={16} aria-hidden="true" /></button>
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-500">Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.</p>
      </div>
      )}
    </section>
  );
}

export default function AlphabetV11Preview({ variant = "alphabet" }: { variant?: PreviewVariant }) {
  const { user, openLoginModal } = useAuth();
  const isNetflix = variant === "netflix";
  const dossier = isNetflix ? netflixV112Dossier : alphabetV112Dossier;
  const identity = dossier.identity;
  const valuation = dossier.valuation;
  const scenarios = isNetflix ? netflixScenarios : alphabetV112Dossier.scenarios;
  const company = isNetflix ? "Netflix" : "Alphabet Inc.";
  const ticker = isNetflix ? "NFLX" : "GOOG";
  const title = isNetflix ? "Netflix: monetisering före tittartid – men värderingen kräver fortsatt leverans" : "Alphabet: stark AI-tillväxt – men begränsad säkerhetsmarginal";
  const subtitle = isNetflix ? "Pris, planmix och reklam lyfter monetiseringen snabbare än tittandet. Värderingen avgörs främst av om marginalen och vinsttillväxten blir uthålliga." : "Cloud accelererar kraftigt och Search fortsätter växa tvåsiffrigt. Nästa fråga är om den enorma AI-investeringen kan ge tillräcklig avkastning per aktie.";
  const positives = isNetflix ? netflixPositiveReasons : positiveReasons;
  const cautions = isNetflix ? netflixCautiousReasons : cautiousReasons;
  const activeTheses = isNetflix ? netflixTheses : theses;
  const activeReportFocus = isNetflix ? netflixReportFocus : reportFocus;
  const insightTitle = isNetflix ? "Uthållig marginal är viktigare än reklamtillväxten" : "AI-caset är en kapitalavkastningsfråga";
  const historyTitle = isNetflix ? "Marginalen har förbättrats, men normaliseringen återstår" : "Tillväxten accelererar, men kapitalbindningen följer med";
  const historyBody = isNetflix ? "Omsättningen steg från 31,6 md USD 2022 till 45,2 md USD 2025, medan EBIT-marginalen lyfte från 17,8 % till 29,5 %. Huvudscenariot antar fortsatt förbättring till 34 % år 2028, men inte en mekanisk upprepning av toppåren." : "Omsättningstillväxten har accelererat från 8,7 % 2023 till cirka 20 % LTM, samtidigt som EBIT-marginalen stigit från 27,4 % till cirka 33 %. Det kalibrerar scenarierna mot en normalisering från dagens ovanligt starka nivå.";
  const historyCards = isNetflix ? [["Omsättning", "2022: 31,6 → 2025: 45,2 md USD", "+6,5 % → +15,9 % tillväxt"], ["EBIT-marginal", "2022: 17,8 % → 2025: 29,5 %", "2026-guidning: 31,5 %; Huvudscenario 2028E: 34 %"]] : [["Omsättning", "2023: 307,4 → LTM: 445,9 md USD", "+8,7 % → cirka +20 % tillväxt"], ["EBIT-marginal", "2023: 27,4 % → LTM: 33,1 %", "Lönsamheten har förstärkts före capexens fulla följdeffekt"]];
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showMethod, setShowMethod] = useState(false);
  const [showEpsBridge, setShowEpsBridge] = useState(false);
  const [risksOpen, setRisksOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<"bear" | "base" | "bull">("base");
  const activeScenario = scenarios.find((scenario) => scenario.id === selectedScenario) ?? scenarios[1];
  const netflixShareChangePct = isNetflix && "dilutedShares" in activeScenario
    ? 1 - activeScenario.dilutedShares / netflixFacts.q2WeightedAverageDilutedShares
    : 0;
  const netflixShareComment = activeScenario.id === "bear"
    ? `Aktieantagandet motsvarar cirka ${Math.round(netflixShareChangePct * 100)} % färre utspädda aktier än Q2 2026:s vägda genomsnittliga utspädda aktieantal och förutsätter fortsatta nettoåterköp efter aktiebaserad ersättning.`
    : activeScenario.id === "bull"
      ? `Aktieantagandet motsvarar cirka ${Math.round(netflixShareChangePct * 100)} % färre utspädda aktier än Q2 2026:s vägda genomsnittliga utspädda aktieantal. Det är ett offensivt antagande som kräver omfattande återköp efter aktiebaserad ersättning.`
      : `Aktieantagandet motsvarar cirka ${Math.round(netflixShareChangePct * 100)} % färre utspädda aktier än Q2 2026:s vägda genomsnittliga utspädda aktieantal och förutsätter att återköpen mer än kompenserar för aktiebaserad ersättning.`;
  const netflixWbdExplanation = isNetflix ? dossier.claims.find((claim) => claim.id === "nflx-wbd")?.text : null;

  return (
    <>
      <SEO
        title={title}
        description={`En v11.2-preview av Börsanalys.se:s grundanalys av ${company}.`}
      />

      <article className="bg-white text-slate-950">
        <header id="overview" className="scroll-mt-36 border-b border-emerald-950/10">
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12">
            <Link to="/analys" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700">
              <ArrowLeft size={17} aria-hidden="true" />
              Alla analyser
            </Link>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-slate-500">
              <p>{company} <span className="mx-1 text-slate-300">/</span> {ticker} <span className="mx-1 text-slate-300">/</span> {isNetflix ? "Uppdaterad 14 augusti 2026" : "Uppdaterad 8 augusti 2026"}</p>
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
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              {subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 text-sm font-black tracking-wide text-emerald-700">
                <Eye size={18} aria-hidden="true" /> {dossier.recommendation} <span className="text-emerald-300">·</span> {dossier.risk.label} RISK
              </span>
            </div>

            <section aria-labelledby="view-heading" className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/75 p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id="view-heading" className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Vår syn</h2>
                  <div className="mt-3 flex items-end gap-3">
                    <p className="font-serif text-6xl font-bold leading-none tracking-[-0.055em] text-emerald-700 sm:text-7xl">{valuation.weightedFairValue.toFixed(0)}</p>
                    <p className="mb-1.5 text-xl font-bold text-emerald-700">USD</p>
                  </div>
                  <p className="mt-2 text-base text-slate-600">Sannolikhetsvägt värde vid slutet av 2028</p>
                </div>
                <div className="border-t border-emerald-200 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="font-serif text-5xl font-bold leading-none tracking-[-0.045em] text-emerald-700">{formatPct(valuation.totalPotentialPct, 0)}</p>
                  <p className="mt-2 text-base text-slate-600">Total värdepotential före utdelning · {formatPct(valuation.annualizedPotentialPct)}/år annualiserad värdepotential</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => user ? setShowMethod((value) => !value) : openLoginModal()}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
                aria-expanded={Boolean(user && showMethod)}
              >
                {user ? (showMethod ? "Dölj värderingsbrygga" : "Så har vi räknat") : "Logga in för att se hur vi räknat"}
                {user && showMethod ? <ChevronUp size={17} aria-hidden="true" /> : user ? <ArrowRight size={17} aria-hidden="true" /> : <LockKeyhole size={17} aria-hidden="true" />}
              </button>
              {!user && <p className="mt-1 text-sm leading-6 text-slate-600">Värderingsbryggan, scenarioantaganden och EPS-detaljer visas för inloggade medlemmar.</p>}
              {user && showMethod && (
                <div className="mt-4 border-t border-emerald-200 pt-5 text-sm leading-6 text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => setSelectedScenario(scenario.id)}
                        className={`rounded-full px-3 py-2 text-xs font-black transition-colors ${scenario.id === selectedScenario ? "bg-emerald-700 text-white" : "bg-white text-slate-600 ring-1 ring-emerald-200 hover:bg-emerald-50"}`}
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-emerald-200 bg-white/80 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{activeScenario.label} · värderingsbrygga</p>
                    {isNetflix ? <>
                      <p className="mt-4 text-sm font-bold text-slate-700">Det som styr scenariovärdet</p>
                      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-end">
                        <div><p className="text-slate-500">Omsättning 2028E</p><p className="mt-1 whitespace-nowrap text-xl font-black">{formatNumber(activeScenario.revenue)} md USD</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">→</span>
                        <div><p className="text-slate-500">EBIT-marginal</p><p className="mt-1 whitespace-nowrap text-xl font-black">{formatMetricPct(activeScenario.ebitMargin)}</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">=</span>
                        <div><p className="text-slate-500">Normaliserad EBIT</p><p className="mt-1 whitespace-nowrap text-xl font-black">{formatNumber(activeScenario.ebit, 2)} md USD</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">→</span>
                        <div><p className="text-slate-500">Normaliserad EPS</p><p className="mt-1 whitespace-nowrap text-xl font-black">{formatUsd(activeScenario.normalizedEps, 2)}</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">×</span>
                        <div><p className="text-slate-500">P/E</p><p className="mt-1 whitespace-nowrap text-xl font-black">{activeScenario.peMultiple.toFixed(0)}×</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">=</span>
                        <div><p className="text-slate-500">Rimligt värde</p><p className="mt-1 whitespace-nowrap text-xl font-black text-emerald-700">{formatUsd(activeScenario.fairValue)}</p></div>
                      </div>
                      {"revenueMix" in activeScenario && <p className="mt-4 text-xs leading-5 text-slate-500">Intäktsmix 2028E <span className="font-black uppercase tracking-[0.1em] text-slate-400">· Antagande</span>: abonnemang {formatNumber(activeScenario.revenueMix.subscription)}, reklam {formatNumber(activeScenario.revenueMix.advertising)} och övrigt {formatNumber(activeScenario.revenueMix.other)} md USD.</p>}
                      <button type="button" onClick={() => setShowEpsBridge((value) => !value)} className="mt-4 inline-flex min-h-10 items-center gap-2 border-t border-slate-100 pt-4 text-xs font-bold text-emerald-700 transition-colors hover:text-emerald-900" aria-expanded={showEpsBridge}>{showEpsBridge ? "Dölj EPS-bryggan" : "Visa EPS-bryggan"}{showEpsBridge ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
                      {showEpsBridge && <div className="mt-3 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                        <p className="font-black uppercase tracking-[0.12em] text-slate-500">Normaliserad EPS · Antagande</p>
                        <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                          <p>Normaliserad EBIT <strong className="float-right text-slate-950">{formatNumber(activeScenario.ebit, 2)} md USD</strong></p>
                          <p>Normaliserat övrigt resultat <strong className="float-right text-slate-950">{formatNumber(activeScenario.normalizedOtherIncome, 2)} md USD</strong></p>
                          <p>Finansnetto <strong className="float-right text-slate-950">{"netFinance" in activeScenario ? `−${formatNumber(Math.abs(activeScenario.netFinance), 2)} md USD` : `${formatNumber(activeScenario.normalizedNetFinancialResult, 2)} md USD`}</strong></p>
                          <p>Resultat före skatt <strong className="float-right text-slate-950">{formatNumber(activeScenario.preTaxIncome, 2)} md USD</strong></p>
                          <p>Skatt ({formatNumber(activeScenario.taxRate * 100, 1)} %) <strong className="float-right text-slate-950">−{formatNumber(activeScenario.taxExpense, 2)} md USD</strong></p>
                          <p>Minoritet <strong className="float-right text-slate-950">0,00 md USD</strong></p>
                          <p>Normaliserat resultat till aktieägarna <strong className="float-right text-slate-950">{formatNumber(activeScenario.normalizedNetIncome, 2)} md USD</strong></p>
                          <p>Utspädda aktier 2028E <strong className="float-right text-slate-950">{formatNumber(activeScenario.dilutedShares, 3)} md</strong></p>
                          <p>Normaliserad EPS <strong className="float-right text-emerald-700">{formatUsd(activeScenario.normalizedEps, 2)}</strong></p>
                        </div>
                        <p className="mt-3 border-t border-slate-200 pt-3 text-slate-500">{netflixShareComment}</p>
                      </div>}
                    </> : <>
                      <p className="mt-4 text-sm font-bold text-slate-700">Så blir värdet</p>
                      <div className="mt-3 grid gap-4 text-sm sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-end">
                        <div><p className="text-slate-500">Omsättning 2028E</p><p className="mt-1 text-xl font-black">{activeScenario.revenue.toFixed(0)} md USD</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">×</span>
                        <div><p className="text-slate-500">EBIT-marginal</p><p className="mt-1 text-xl font-black">{formatPct(activeScenario.ebitMargin)}</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">=</span>
                        <div><p className="text-slate-500">EBIT</p><p className="mt-1 text-xl font-black">{activeScenario.ebit.toFixed(1)} md USD</p></div>
                      </div>
                      <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Normalisering till resultat per aktie</p>
                        <div className="mt-2 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                          <p>Normaliserat övrigt resultat <strong className="float-right text-slate-950">{activeScenario.normalizedOtherIncome.toFixed(1)} md</strong></p>
                          <p>Finansnetto <strong className="float-right text-slate-950">{"netFinance" in activeScenario ? activeScenario.netFinance.toFixed(1) : `+${activeScenario.netInterest.toFixed(1)}`} md</strong></p>
                          <p>Resultat före skatt <strong className="float-right text-slate-950">{activeScenario.preTaxIncome.toFixed(1)} md</strong></p>
                          <p>Skatt ({formatPct(activeScenario.taxRate)}) <strong className="float-right text-slate-950">−{activeScenario.taxExpense.toFixed(1)} md</strong></p>
                          <p>Normaliserat nettoresultat <strong className="float-right text-slate-950">{activeScenario.normalizedNetIncome.toFixed(1)} md</strong></p>
                          <p>Utspädda aktier <strong className="float-right text-slate-950">{activeScenario.dilutedShares.toFixed(2)} md</strong></p>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 text-sm sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-end">
                        <div><p className="text-slate-500">Normaliserad EPS</p><p className="mt-1 text-xl font-black">{formatUsd(activeScenario.normalizedEps, 2)}</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">×</span>
                        <div><p className="text-slate-500">P/E</p><p className="mt-1 text-xl font-black">{activeScenario.peMultiple.toFixed(1)}x</p></div>
                        <span className="hidden font-black text-emerald-700 sm:block" aria-hidden="true">=</span>
                        <div><p className="text-slate-500">Rimligt värde</p><p className="mt-1 text-xl font-black text-emerald-700">{formatUsd(activeScenario.fairValue)}</p></div>
                      </div>
                    </>}
                    {"normalizedFcf" in activeScenario && !isNetflix && (
                      <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-600 md:grid-cols-3">
                        <div><p className="font-black uppercase tracking-[0.12em] text-slate-500">Intäktsmix 2028E · ASSUMPTION</p><p className="mt-2">Abonnemang {activeScenario.revenueMix.subscription.toFixed(1)} · reklam {activeScenario.revenueMix.advertising.toFixed(1)} · övrigt {activeScenario.revenueMix.other.toFixed(1)} md USD.</p><p className="mt-1 text-slate-500">Medlems-, pris-, region- och planmix är inte separat prognostiserade; ingen falsk ARPU-precision visas.</p></div>
                        <div><p className="font-black uppercase tracking-[0.12em] text-slate-500">EBIT → normaliserad FCF · ASSUMPTION</p><p className="mt-2">EBIT {activeScenario.ebit.toFixed(2)} − kontantskatt {activeScenario.cashTax.toFixed(2)} + finansnetto {activeScenario.netFinance.toFixed(2)} + amortering {activeScenario.contentAmortization.toFixed(1)} − innehållsbetalningar {activeScenario.contentPayments.toFixed(1)} + innehållsskulder {activeScenario.contentLiabilityChange.toFixed(1)} − capex/WC {(activeScenario.capex + activeScenario.workingCapital).toFixed(1)} = <strong>{activeScenario.normalizedFcf.toFixed(2)} md USD</strong>.</p><p className="mt-1 text-slate-500">FCF-marginal {(activeScenario.fcfMargin * 100).toFixed(1)} % · FCF/EBIT {(activeScenario.fcfToEbit * 100).toFixed(0)} %.</p></div>
                        <div><p className="font-black uppercase tracking-[0.12em] text-slate-500">Aktieantal och återköp · ASSUMPTION</p><p className="mt-2">Start 4,221 md − återköpta {activeScenario.repurchasedShares.toFixed(3)} md + SBC {activeScenario.sbcShares.toFixed(3)} md = {activeScenario.dilutedShares.toFixed(3)} md aktier.</p><p className="mt-1 text-slate-500">Återköp {activeScenario.repurchases.toFixed(2)} md USD vid antaget snittpris {activeScenario.repurchasePrice.toFixed(0)} USD; {(activeScenario.repurchasesToFcf * 100).toFixed(0)} % av tre års normaliserad FCF.</p></div>
                      </div>
                    )}
                    {isNetflix && "multipleRationale" in activeScenario && <p className="mt-3 text-xs leading-5 text-slate-600"><strong className="text-slate-950">Multipelantagande:</strong> {activeScenario.multipleRationale.replace(/^(?:ASSUMPTION|ANTAGANDE):\s*/, "")}</p>}
                    {!isNetflix && <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">Rapporterad EPS används inte eftersom stora orealiserade värdeförändringar i Alphabets aktieinnehav förvränger nettoresultatet. Modellens finansnetto, skatt och utspädning är explicita scenarioantaganden.</p>}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">Värderingsdatum: {identity.valuationDate}. Referenskurs: {formatUsd(identity.marketReference.price, 2)}, {ticker}-stängning den {identity.marketReference.asOf}. Annualiserad värdepotential räknas över {valuation.yearsToValuation.toFixed(2).replace(".", ",")} år.</p>
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
              <div className="mt-7"><ReasonRows rows={positives} tone="positive" /></div>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">Varför vi är försiktiga</h2>
              <div className="mt-7"><ReasonRows rows={cautions} tone="caution" /></div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-11 lg:py-16" aria-labelledby="insight-heading">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Börsanalys.se:s insikt</p>
            <h2 id="insight-heading" className="mt-3 font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">{insightTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{dossier.insight}</p>
          </section>

          <section className="border-t border-slate-200 py-11 lg:py-16" aria-labelledby="history-heading">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Relevant historik</p>
            <h2 id="history-heading" className="mt-3 font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">{historyTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{historyBody}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {historyCards.map(([label, value, note]) => <div key={label} className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p><p className="mt-1 text-lg font-bold text-slate-950">{value}</p><p className="mt-1 text-sm text-slate-600">{note}</p></div>)}
            </div>
          </section>

          <section id="theses" className="scroll-mt-36 border-t border-slate-200 py-11 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Teser att följa</p>
              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl">Vad måste bevisas för att caset ska fungera?</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Vi följer samma teser från rapport till rapport. Statusen ändras när faktiska utfall stärker, försvagar eller bryter dem.</p>
            </div>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {activeTheses.map((thesis) => (
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
              <p className="max-w-sm text-sm leading-6 text-slate-500">{isNetflix ? "Modellen använder normaliserad EPS och scenarioanpassad P/E. FCF och innehållsåtaganden används som kontroll av om marginalexpansionen är ekonomiskt uthållig." : "Modellen använder normaliserad EPS och exkluderar orealiserade värdeförändringar i aktieinnehav. FCF-kontrollen visar att AI-capex fortfarande är den centrala osäkerheten."}</p>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="bg-white p-6 transition-colors duration-200 hover:bg-emerald-50/45">
                  <p className="text-sm font-bold text-slate-500">{scenario.label}</p>
                  <p className="mt-3 font-serif text-5xl font-bold tracking-[-0.05em] text-slate-950">{formatUsd(scenario.fairValue)}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">{(scenario.probability * 100).toFixed(0)} % sannolikhet</p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{formatPct(scenario.totalPotentialPct)} total potential · {formatPct(scenario.annualizedCagrPct)} per år</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{scenario.description}</p>
                  <div className="mt-4 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600">
                    <p><strong className="text-slate-950">Nyckeldrivare:</strong> {formatNumber(scenario.revenue)} md USD omsättning, {formatMetricPct(scenario.ebitMargin)} EBIT-marginal och {formatUsd(scenario.normalizedEps, 2)} EPS.</p>
                    {isNetflix && "multipleRationale" in scenario && <p className="mt-2"><strong className="text-slate-950">Multipelantagande:</strong> {scenario.multipleRationale.replace(/^(?:ASSUMPTION|ANTAGANDE):\s*/, "")}</p>}
                  </div>
                </div>
              ))}
            </div>
            {isNetflix && netflixWbdExplanation && <p className="mt-5 border-l-2 border-emerald-500 pl-5 text-sm leading-6 text-slate-600">{netflixWbdExplanation} <span className="font-semibold">Källa: Netflix Q2 2026 Form 10-Q, Note 6 Acquisitions.</span></p>}
            <div className="mt-5 grid gap-4 border-l-2 border-emerald-500 pl-5 text-sm leading-6 text-slate-600 md:grid-cols-2">
              <p><strong className="text-slate-950">Historisk kontext:</strong> {isNetflix ? "Omsättningen växte 6,5 % 2022 och 15,9 % 2025, samtidigt som EBIT-marginalen steg från 17,8 % till 29,5 %. Scenarierna antar fortsatt men gradvis normaliserad förbättring." : "Omsättningstillväxten har accelererat från 8,7 % 2023 till cirka 20 % LTM, samtidigt som EBIT-marginalen stigit från 27,4 % till cirka 33 %. Scenarierna antar därför en normalisering från dagens ovanligt starka tillväxt."}</p>
              <p><strong className="text-slate-950">Kapitalavkastning:</strong> {isNetflix ? "Bolagets rapporterade 2026 FCF-guidning på cirka 12,5 md USD innehåller en engångseffekt och är inte återkommande FCF-kapacitet. Q2:s OCF föll 28 % när innehållsbetalningarna steg; 11,9 md USD av kända innehållsåtaganden förfaller inom 12 månader. Återköp stärker EPS, men ersätter inte organisk vinsttillväxt." : "Capex → PP&E → avskrivningar → EBIT → FCF. Q2-operativt kassaflöde var 39,1 md USD och capex 44,9 md USD, vilket gav FCF på −5,9 md USD; FCF är alltså inte normaliserat."}</p>
            </div>
          </section>

          {isNetflix && netflixRiskRewardZones.status === "APPROVED" && <NetflixRiskRewardInsight isMember={Boolean(user)} onLogin={openLoginModal} />}

          {!isNetflix && alphabetV112Dossier.riskRewardZones.status === "APPROVED" && (
            <section className="border-t border-slate-200 py-11 lg:py-16" aria-labelledby="risk-reward-heading">
              <div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Medlemsinsikt</p>
                  <h2 id="risk-reward-heading" className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">När blir risk/reward mer attraktiv?</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Vi har räknat ut vid vilka kursnivåer säkerhetsmarginalen förbättras eller försämras utifrån vår värdering, Bear-scenario och Alphabets risk.</p>
                </div>

                <div className="mt-7">
                  <AlphabetRiskRewardRail showPrices={Boolean(user)} />
                </div>

                {!user && (
                  <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm"><LockKeyhole size={20} aria-hidden="true" /></span>
                      <div>
                        <p className="text-base font-bold text-slate-950">Logga in gratis för hela risk/reward-insikten</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">Du ser översikten här. Med ett kostnadsfritt konto får du se de exakta kursgränserna, referenskursen och scenario-värdena bakom bedömningen.</p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                          <li>Exakta nivåer för attraktiv, balanserad och svag risk/reward</li>
                          <li>Referenskursen vid analystillfället</li>
                          <li>Bear, sannolikhetsvägt värde och Bull i USD</li>
                        </ul>
                        <button type="button" onClick={openLoginModal} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-800">
                          Se full information – gratis <ArrowRight size={16} aria-hidden="true" />
                        </button>
                        <p className="mt-2 text-xs font-medium text-emerald-800">Kostnadsfritt konto.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          <section id="next-report" className="scroll-mt-36 border-t border-slate-200 py-11 lg:py-16">
            <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Nästa rapport</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">Det här följer vi först</h2></div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <div className="hidden grid-cols-[0.9fr_1fr_1.1fr_1.35fr] gap-5 bg-emerald-50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-800 md:grid"><span>Fokusområde</span><span>Senast</span><span>Nästa bevis</span><span>Varför det spelar roll</span></div>
              <div className="divide-y divide-slate-200">
                {activeReportFocus.map(([focus, latest, signal, why]) => (
                  <div key={focus} className="grid gap-2 px-5 py-5 md:grid-cols-[0.9fr_1fr_1.1fr_1.35fr] md:gap-5"><h3 className="font-bold text-slate-950">{focus}</h3><p className="text-sm leading-6 text-slate-600">{latest}</p><p className="text-sm leading-6 text-slate-600">{signal}</p><p className="text-sm leading-6 text-slate-600">{why}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-10 lg:py-14">
            <button type="button" onClick={() => setRisksOpen((value) => !value)} className="flex w-full items-center justify-between gap-5 text-left" aria-expanded={risksOpen}>
              <span><span className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Risker och metod</span><span className="mt-2 block font-serif text-3xl font-bold tracking-[-0.035em] text-slate-950">Läs det viktiga innan du fattar ett beslut</span></span>
              {risksOpen ? <ChevronUp className="shrink-0 text-amber-600" size={24} /> : <ChevronDown className="shrink-0 text-amber-600" size={24} />}
            </button>
            {risksOpen && <div className="mt-6 grid gap-5 border-l-2 border-amber-400 pl-5 text-sm leading-7 text-slate-600 md:grid-cols-2"><p><strong className="text-slate-950">Risk:</strong> {dossier.risk.rationale}</p><p><strong className="text-slate-950">Metod:</strong> Värderingen bygger på antaganden som kan visa sig felaktiga. Referenskursen är {formatUsd(identity.marketReference.price, 2)} per {ticker}-aktie vid stängning den {identity.marketReference.asOf}.</p>{isNetflix && <><p><strong className="text-slate-950">Rapporterad kontra normaliserad FCF:</strong> 2026 års rapporterade FCF-guidning är {netflixFacts.fy2026ReportedFcfGuide.toFixed(1)} md USD och innehåller en ej återkommande effekt. Den använder vi inte som återkommande FCF-kapacitet; ett exakt normaliserat FCF-intervall är {netflixWbdNormalization.status}.</p><p><strong className="text-slate-950">Kassaflöde och stresstest:</strong> Q2-OCF var {netflixFacts.q2OperatingCashFlow.toFixed(2)} md USD ({formatPct(netflixDerived.q2OperatingCashFlowChangePct)} mot Q2 2025) och Q2-FCF {netflixFacts.q2ReportedFcf.toFixed(2)} md USD. {netflixFacts.contentDueNext12Months.toFixed(1)} md USD av innehållsåtagandena förfaller inom 12 månader. <strong className="text-slate-950">Ej sannolikhetsvägd känslighetsanalys vid ett tesbrott:</strong> {netflixStressTest.revenue.toFixed(0)} md USD omsättning, {formatMetricPct(netflixStressTest.ebitMargin)} EBIT-marginal, {netflixStressTest.dilutedShares.toFixed(2)} md aktier och {netflixStressTest.peMultiple}× P/E ger {formatUsd(netflixStressTest.fairValue)} ({formatPct(netflixStressTest.totalPotentialPct)}). Det sannolikhetsvägda värdet bygger på tre huvudscenarier; känslighetsanalysen ingår inte i sannolikhetsvärdet.</p></>}</div>}
          </section>

          <footer className="border-t border-slate-200 py-9 text-sm leading-6 text-slate-500">
            <p><strong className="text-slate-700">Källor:</strong> {isNetflix ? "Netflix Q2 2026 Form 10-Q och shareholder letter (16–17 juli 2026), tidigare kvartalsrapporter och låst NFLX-stängning den 13 augusti 2026." : "Alphabets Q2 2026 earnings release och earnings slides (22 juli 2026), års-/kvartalsrapporter för historik samt GOOG-stängningen den 7 augusti 2026."} Rapporterade tal är FACT, härledda värden DERIVED, scenarier {isNetflix ? "ANTAGANDE" : "ASSUMPTION"} och slutsatser ANALYSIS.</p>
            <p className="mt-3">Informationen är allmän information, inte personlig investeringsrådgivning. Investeringar innebär risk och du kan förlora hela eller delar av ditt kapital. Historisk avkastning är ingen garanti för framtida avkastning. <Link className="font-semibold text-emerald-700 hover:text-emerald-900" to={isNetflix ? netflixV112Dossier.disclaimer.fullDisclaimerUrl : "/villkor"}>Läs fullständig information och villkor.</Link></p>
            <p className="mt-3">Dossier: {dossier.version.versionId} · {dossier.version.status}. {isNetflix ? `Intresseupplysning (${netflixV112Dossier.disclosures.confirmedAt}): ${netflixV112Dossier.disclosures.directHolding} ${netflixV112Dossier.disclosures.indirectExposure} ${netflixV112Dossier.disclosures.compensationOrEngagement}` : "Full resultattrappa, claims och ändringslogg är bevarade i v11.2-dossiern."}</p>
          </footer>
        </div>
      </article>
    </>
  );
}
