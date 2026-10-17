import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronDown, ChevronUp, LockKeyhole, ShieldAlert, TrendingUp, GitCompareArrows, ExternalLink } from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../contexts/AuthContext";
import { investorV112 as d } from "../data/analyses/investor/investor-v11-2-q3-2026";

const kr = (n: number, decimals = 1) => n.toLocaleString("sv-SE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + " kr";
const pct = (n: number, decimals = 1, signed = false) => (signed && n > 0 ? "+" : "") + n.toLocaleString("sv-SE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + " %";


const deltas = [
  { label: "Justerat NAV/aktie", q2: kr(d.snapshot.navQ2,0), q3: kr(d.snapshot.navQ3,0), delta: "+" + kr(d.snapshot.navDelta,0), source: "F01 · F02" },
  { label: "Redovisat NAV/aktie", q2: kr(d.snapshot.reportedNavQ2,0), q3: kr(d.snapshot.reportedNavQ3,0), delta: "+" + kr(d.snapshot.reportedNavQ3 - d.snapshot.reportedNavQ2,0), source: "F03 · F04" },
  { label: "Substansrabatt A+B, Investor-definition", q2: pct(d.snapshot.discountABQ2), q3: pct(d.snapshot.discountABQ3), delta: pct(d.snapshot.discountABQ3-d.snapshot.discountABQ2,1,true).replace(" %"," p.e."), source: "F31 · F32" },
  { label: "Patricia, kvartalsavkastning", q2: pct(d.snapshot.patrQ2,0,true), q3: pct(d.snapshot.patrQ3,0,true), delta: pct(d.snapshot.patrQ3-d.snapshot.patrQ2,0,true).replace(" %"," p.e."), source: "F09 · F10" },
  { label: "Patricia, justerad EBITA-tillväxt (år/år)", q2: pct(d.snapshot.patrEbitaQ2,0,true), q3: pct(d.snapshot.patrEbitaQ3,0,true), delta: pct(d.snapshot.patrEbitaQ3-d.snapshot.patrEbitaQ2,0,true).replace(" %"," p.e."), source: "F11 · F12" },
  { label: "EQT, kvartalets värdeförändring", q2: pct(d.snapshot.eqtQ2,0,true), q3: pct(d.snapshot.eqtQ3,0,true), delta: pct(d.snapshot.eqtQ3-d.snapshot.eqtQ2,0,true).replace(" %"," p.e."), source: "F13 · F14" },
  { label: "Skuldsättningsgrad", q2: pct(d.snapshot.leverageQ2), q3: pct(d.snapshot.leverageQ3), delta: pct(d.snapshot.leverageQ3-d.snapshot.leverageQ2,1,true).replace(" %"," p.e."), source: "F15 · F16" },
];

function SourceIds({ ids }: { ids: string[] }) {
  return <span className="ml-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700" title={ids.join(" · ")} aria-label={`Källspår: ${ids.join(", ")}`}>[{ids.join(" · ")}]</span>;
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-6 max-w-3xl"><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">{eyebrow}</p><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>{description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}</div>;
}

function SourceFootnote() {
  return <div className="mt-5 rounded-xl border border-border bg-section-alt px-4 py-3 text-xs leading-5 text-slate-600">Spårbarhet: varje FACT har ett claim-ID som återfinns i källregistret. Värden beräknas i den versionsstyrda analysdossiern, inte i denna frontend.</div>;
}

export default function InvestorV112Preview() {
  const { user, openLoginModal } = useAuth();
  const [openEvidence, setOpenEvidence] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const val = d.valuation;
  const snap = d.snapshot;
  const asOf = "16 oktober 2026";
  const cashTsr = pct(val.illustrativeCashTotalReturn * 100, 1, true);
  const cashAnnual = pct(val.illustrativeCashAnnualizedReturn * 100, 1, true);
  const hist = d.discountHistory;
  const annual = pct(val.annualizedValuePotential * 100, 1, true);
  const total = pct(val.totalValuePotential * 100, 1, true);

  return <div className="min-h-screen bg-background text-foreground">
    <SEO title="Investor AB Q3 2026 – v11.2 förhandsvisning | Börsanalys.se" description="Spårbar kvartalsuppföljning av Investor AB med NAV-värdering, Q2-jämförelse och Bear/Base/Bull. Redaktionellt utkast, ej publicerat." noIndex />
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-950">
      Redaktionell förhandsvisning · NOT_PUBLISH_READY · Ej offentlig köprekommendation
    </div>
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Link to="/analys/investor-ab" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline"><ArrowLeft size={16} /> Till äldre Investor-analys</Link>
    </div>

    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mb-7 inline-flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[.13em] text-[#087f55]">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">Investmentbolag</span>
          <span className="text-slate-400">/</span><span>INVE B</span>
          <span className="text-slate-400">/</span><span>Rapportuppföljning</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#087f55]">Börsanalys.se · Fundamental analys</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.02] tracking-[-.055em] text-slate-950 sm:text-6xl">
              Investor AB<span className="mt-2 block text-[#087f55]">Q3 2026</span>
            </h1>
            <p className="mt-6 max-w-xl font-serif text-2xl font-semibold leading-[1.28] tracking-tight text-slate-900 sm:text-[1.85rem]">
              Patricia driver åter värdeskapandet – men säkerhetsmarginalen är begränsad.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              En spårbar uppföljning av Q2 och Q3, med separat substansvärdesmodell för investmentbolag.
              Framtidsscenarierna är redaktionella antaganden, inte Investors prognoser.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-500">
              <span>Analysdatum: {d.analysisDate}</span>
              <span>Värdehorisont: {d.valuationDate}</span>
              <span className="font-semibold text-[#087f55]">Metod: NAV_DISCOUNT</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,.055)]">
            <div className="h-1 bg-[#10B981]" aria-hidden="true" />
            <div className="p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-500">Investment Snapshot <span className="text-[#087f55]">· Utkast</span></p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-900">BEVAKA · preliminärt</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">MEDEL–HÖG RISK · preliminärt</span>
              </div>
              <p className="mt-7 text-sm font-medium text-slate-600">Sannolikhetsvägt värde · 2028E</p>
              <p className="mt-1 font-serif text-[clamp(2.7rem,5vw,3.4rem)] font-bold tracking-tight text-slate-950 tabular-nums">{kr(val.weightedFairValue)}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
                <div><p className="text-xs leading-5 text-slate-500">Total värdepotential · kurs</p><p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-950">{total}</p></div>
                <div><p className="text-xs leading-5 text-slate-500">Annualiserad värdepotential · kurs</p><p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-950">{annual}<span className="ml-1 text-sm font-semibold">/år</span></p></div>
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Illustrativ totalavkastning, med kontantutdelningar</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-slate-900">{cashTsr} <span className="ml-2 text-sm font-medium text-slate-600">({cashAnnual}/år)</span></p>
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">
                Referenskurs {kr(d.marketReference.price, 2)} · {asOf}. Kursvärdet exkluderar utdelningar; totalavkastningen
                inkluderar {kr(val.dividends,2)} framtida utbetalningar enligt antaganden, utan återinvestering.
                <strong className="text-slate-700"> Alla modellerade värden är preliminära.</strong>
              </p>
              <p className="mt-3 border-t border-dashed border-slate-200 pt-3 text-xs font-semibold text-amber-800">
                Ej kvalitetsgodkänd för publicering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <nav aria-label="Innehåll" className="sticky top-[68px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 sm:px-5">{[["tes","Analys"],["jmf","Q2 → Q3"],["historik","Rabatt"],["motorer","NAV-drivare"],["teser","Teser"],["scenarier","Värdering"],["risk","Risk"],["alternativ","Index"],["underlag","Källor"]].map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 border-b-2 border-transparent px-3 py-4 text-sm font-bold text-slate-600 hover:border-emerald-600 hover:text-emerald-800">{label}</a>)}</div>
    </nav>

    <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
      <section id="tes" className="scroll-mt-36">
        <SectionTitle eyebrow="Värdedrivare" title="Vad är intressant – och vad kan gå fel?" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><TrendingUp className="text-emerald-700" /> Varför intressant</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><li><strong>Patricia accelererar:</strong> justerad EBITA-tillväxt ökar från 16 % till 26 % (respektive kvartals tillväxt mot föregående år). <SourceIds ids={["F11","F12"]}/></li><li><strong>Flera ben bidrar:</strong> Patricia +15 % och EQT +7 % under Q3; deras respektive värdeförändring var negativ i Q2. <SourceIds ids={["F09","F10","F13","F14"]}/></li><li><strong>Finansiell flexibilitet:</strong> belåningsgrad 1,8 % (nettoskuld/justerade tillgångar), bruttokassa 29,5 mdkr och skuldlöptid 8,4 år. Förändringen 1,9 → 1,8 procent ska inte övertolkas. <SourceIds ids={["F15","F16","F28"]}/></li></ul>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><ShieldAlert className="text-amber-700" /> Varför försiktiga</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><li><strong>Begränsad substansrabatt:</strong> Q3-slutkursen låg nära justerat NAV. B-aktierabatten var {pct(snap.discountQ3)}; Investors A+B-metod ger {pct(snap.discountABQ3)} på balansdagen. <SourceIds ids={["F01","F05"]}/></li><li><strong>Värderingsrisk i Patricia:</strong> Q3-avkastningen gynnades även av högre multiplar och valuta; inte enbart underliggande operativ tillväxt. <SourceIds ids={["F09"]}/></li><li><strong>Justerat är inte redovisat NAV:</strong> 411 kr respektive 359 kr per aktie, bland annat på grund av värderingsprinciperna för dotter- och intressebolag. <SourceIds ids={["F01","F03"]}/></li></ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-section-alt p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-800">Börsanalys.se:s insikt · ANALYSIS</p>
          <p className="mt-3 font-serif text-xl font-semibold leading-8 text-slate-950">{d.editorial.insight}</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">Analysens avgörande fråga: {d.editorial.investmentQuestion}</p>
        </div>
      </section>

      <section id="jmf" className="scroll-mt-36">
        <SectionTitle eyebrow="Rapportuppföljning" title="Q2 → Q3: Vad förändrades?" description="Identiska definitioner jämförs mellan kvartalen. Tillväxtsiffror avser respektive rapports årstakt; förändringen mellan dem anges i procentenheter." />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Justerat NAV/aktie</p><p className="mt-2 text-3xl font-black tabular-nums">{kr(snap.navQ3,0)}</p><p className="mt-1 text-sm font-bold text-emerald-700">{pct(snap.navDeltaPct,1,true)} sedan Q2</p><SourceIds ids={["F01","F02"]}/></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Substansrabatt Q3</p><p className="mt-2 text-3xl font-black tabular-nums">{pct(snap.discountQ3)}</p><p className="mt-1 text-sm text-slate-600">B-aktiens kurs mot avrundat NAV. Officiellt jämförbar rabatt för A+B: {pct(snap.discountABQ3)}.</p><SourceIds ids={["F01","F05"]}/></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Totalt justerat NAV</p><p className="mt-2 text-3xl font-black tabular-nums">{Math.round(snap.totalNavMsekQ3/1000).toLocaleString("sv-SE")} mdkr</p><p className="mt-1 text-sm text-slate-600">Upp från {Math.round(snap.totalNavMsekQ2/1000).toLocaleString("sv-SE")} mdkr, avrundade miljarder.</p><SourceIds ids={["F07","F08"]}/></div>
        </div>
        <div className="mt-6 grid gap-3 md:hidden" aria-label="Kvartalsjämförelse för mobil">
          {deltas.map(row => <article key={row.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-bold leading-5 text-slate-900">{row.label}</h3>
              <span className="shrink-0 rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">{row.delta}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
              <div><dt className="text-[11px] text-slate-500">Q2 2026</dt><dd className="mt-1 font-semibold tabular-nums text-slate-700">{row.q2}</dd></div>
              <div><dt className="text-[11px] text-slate-500">Q3 2026</dt><dd className="mt-1 font-bold tabular-nums text-slate-950">{row.q3}</dd></div>
            </dl>
            <p className="mt-3 text-[11px] text-[#087f55]">Källspår: {row.source}</p>
          </article>)}
        </div>
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-white shadow-sm md:block">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-700"><tr><th className="px-5 py-4">Nyckeltal</th><th className="px-3 py-4 text-right">Q2 2026</th><th className="px-3 py-4 text-right">Q3 2026</th><th className="px-5 py-4 text-right">Förändring</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{deltas.map(row=><tr key={row.label}><th scope="row" className="px-5 py-4 font-semibold text-slate-900">{row.label}<span className="ml-2 text-[10px] font-normal text-emerald-700">{row.source}</span></th><td className="px-3 py-4 text-right tabular-nums text-slate-600">{row.q2}</td><td className="px-3 py-4 text-right font-extrabold tabular-nums">{row.q3}</td><td className="px-5 py-4 text-right font-semibold tabular-nums text-emerald-700">{row.delta}</td></tr>)}</tbody>
          </table>
        </div>
        <SourceFootnote />
        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-slate-950">Varifrån kom NAV-ökningen Q3?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Förändringen i justerat NAV var +43,3 mdkr. Följande avrundade affärsområdesbidrag är en härledd avstämning av rapportens uppställning och behöver slutkontrolleras mot originaltabellerna.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {d.q3NavBridge.segments.map(segment=><div key={segment.key} className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-600">{segment.label}</p><p className="mt-2 text-xl font-extrabold text-slate-950">{(segment.valueMsek>0?"+":"")+ (segment.valueMsek/1000).toLocaleString("sv-SE",{minimumFractionDigits:1,maximumFractionDigits:1})} mdkr</p><SourceIds ids={[...segment.claimIds]}/></div>)}
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Bidragen avser förändring i absoluta NAV-kronor, inte procentuell totalavkastning. Patricia var största Q3-bidraget, men Noterade Bolag är den största tillgångsgruppen. {d.q3NavBridge.verification}</p>
        </div>
        <div className="mt-4 rounded-xl border border-border bg-section-alt p-5">
          <p className="font-bold text-slate-950">Justerat NAV är inte redovisat NAV</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Justerat NAV {kr(snap.navQ3,0)} använder bland annat uppskattade marknadsvärden för Patricias större verksamheter. Redovisat NAV {kr(snap.reportedNavQ3,0)} följer andra redovisnings- och värderingsprinciper. Skillnaden på {kr(snap.navQ3-snap.reportedNavQ3,0)} är inte en kontant säkerhetsmarginal.</p>
        </div>
      </section>

      <section id="historik" className="scroll-mt-36">
        <SectionTitle eyebrow="Historiskt värderingsankare" title="Vad har marknaden normalt betalat för Investor?" description="Jämförbara A+B-rabatter beräknas mot Investors rapporterade justerade NAV på samma balansdag. Perioderna har olika observationsfrekvens, och äldre datapunkter behöver slutlig källavstämning." />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["3 år · kvartal",hist.threeYears],
            ["5 år · kvartal",hist.fiveYears],
            ["10 bokslutsår",hist.tenYearEnds]
          ].map(([label,stats])=><article key={label as string} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label as string}</p>
            <p className="mt-3 font-serif text-3xl font-bold tabular-nums text-slate-950">{pct((stats as typeof hist.threeYears).median*100,1)}</p>
            <p className="mt-1 text-xs text-slate-600">Medianrabatt</p>
            <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-600"><span>Medel {pct((stats as typeof hist.threeYears).average*100,1)}</span><span>{(stats as typeof hist.threeYears).count} obs.</span></div>
          </article>)}
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">I den tillgängliga kvartalsserien förekommer substanspremie sällan. En bestående premie är därför ett möjligt positivt scenario, inte ett historiskt normalantagande. Base-rabatten ska inte mekaniskt sättas lika med en medelnivå utan bedömning av förändringar i portfölj och risk.</p>
        <p className="mt-2 text-xs leading-6 text-amber-800">Intern historik: {hist.verification}. Dagliga rabattpercentiler och jämförbar tioårig kvartalsmedian är ännu inte färdigställda.</p>
      </section>

      <section id="motorer" className="scroll-mt-36">
        <SectionTitle eyebrow="Framtida substansvärde" title="Varifrån kan värdeskapandet komma?" description="Vi bygger scenarierna från portföljens tillgångsgrupper, inte från ett fristående antagande om NAV-tillväxt. Exakta avkastningsantaganden återfinns i medlemsvyn." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [pct(val.weights.listed*100,0),"Noterade Bolag","Atlas Copco, ABB, AstraZeneca, SEB och övriga noterade innehav; kurs- och vinstutvecklingen dominerar tillgångsbasen."],
            [pct(val.weights.patricia*100,0),"Patricia Industries","Mölnlycke, Permobil, Laborie och andra onoterade bolag; operativt kassaflöde och värderingsmultiplar måste särskiljas."],
            [pct(val.weights.eqt*100,0),"Investeringar i EQT","Börsnoterade EQT AB och investeringar i EQT-fonder; olika kassaflödes- och värderingsdrivare."]
          ].map(([share,title,description])=><article key={title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-2xl font-extrabold tabular-nums text-[#087f55]">{share}</p>
            <h3 className="mt-3 text-lg font-extrabold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </article>)}
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">Vikter ur Q3-rapportens justerade tillgångar [F19]. Värderingsmodellen justerar även för finansiering och en separat redaktionell kostnadsbelastning. Vikterna hålls konstanta som ett förenklande antagande.</p>
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-slate-950">Varför Base inte längre antar 8,2 % NAV-tillväxt</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Historisk NAV-totalavkastning · 5 år</p><p className="mt-1 text-2xl font-bold tabular-nums">{pct(val.calibration.historicalNavTotalReturn5y*100,1)}/år</p><SourceIds ids={["F20"]}/></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Investors avkastningskrav</p><p className="mt-1 text-2xl font-bold tabular-nums">{pct(val.calibration.investorReturnRequirementLow*100,0)}–{pct(val.calibration.investorReturnRequirementHigh*100,0)}/år</p></div>
            <div className="col-span-2 rounded-xl bg-slate-50 p-3 sm:col-span-1"><p className="text-xs text-slate-500">Normaliserad Base · före utdelningar</p><p className="mt-1 text-2xl font-bold tabular-nums">{pct(val.scenarios.find(s=>s.id==="base")!.navTotalReturnCagr*100,1)}/år</p></div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{val.calibration.calibrationLogic} Det är en försiktigare hypotes än historiken, men ingen garanti. Tillväxtantaganden för respektive portföljdel är fortfarande analytikerantaganden, inte prognoser lämnade av Investor.</p>
          <p className="mt-3 text-xs leading-6 text-slate-500">Kostnadsbrygga: Investors rapporterade förvaltningskostnad motsvarade 0,07 % av NAV i Q1 2026, medan modellens 4 % finansieringsränta är ett eget antagande. <SourceIds ids={["F34","F35"]}/></p>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <p className="font-bold text-slate-950">Patricias värdeökning – vad vet vi?</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">De större dotterbolagens omsättning ökade 12 % i Q3, varav 7 % organiskt i konstant valuta, och justerad EBITA steg 26 %. Investors rapport anger att Patricias värdeavkastning också påverkades av högre multiplar och valuta. Exakt kronfördelning mellan operativa effekter, multiplar och valuta kan inte redovisas med tillräcklig säkerhet ännu.</p>
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <p className="font-bold text-slate-950">Händelse efter balansdagen: Investor ökar i EQT</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">Den 16 oktober köpte Investor 12,5 miljoner EQT-aktier för cirka 3,53 mdkr från Wallenberg Investments. Investor äger därefter 14,98 %. Köpet ökar EQT-exponeringen men är inte i sig en NAV-vinst; det är i första hand ett utbyte av likvida medel mot aktier. Den närståenderelaterade transaktionen har prövats med extern värdering enligt Investor. <SourceIds ids={["F25","F26"]}/></p>
        </div>
      </section>

      <section id="teser" className="scroll-mt-36">
        <SectionTitle eyebrow="Levande investeringscase" title="Vad måste bevisas?" description="Varje tes bygger på spårad observation, en redaktionell status och ett konkret nästa bevis. Dessa uppdateras vid nästa rapport." />
        <div className="grid gap-4 md:grid-cols-3">{d.editorial.thesis.map(t=><article key={t.id} className="rounded-2xl border border-slate-200 bg-white p-6">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700">{t.status}</span><h3 className="mt-3 text-lg font-extrabold text-slate-950">{t.name}</h3>
          <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-500">Senaste bevis</p><p className="mt-1 text-sm leading-6 text-slate-700">{t.evidence}</p><SourceIds ids={[...t.claimIds]} />
          <p className="mt-5 text-xs font-black uppercase tracking-wider text-slate-500">Nästa bevis</p><p className="mt-1 text-sm leading-6 text-slate-700">{t.next}</p>
        </article>)}</div>
      </section>

      <section id="scenarier" className="scroll-mt-36">
        <SectionTitle eyebrow="Värderingsmetod NAV_DISCOUNT" title="Bear / Base / Bull" description="Samtliga tre utfall avser 31 december 2028. Underlaget utgår från 411 kr i justerat NAV per aktie den 30 september 2026. Framtida NAV-tillväxt och rabatt är Börsanalys.se:s scenariobedömningar, inte rapporterade fakta." />
        <div className="grid gap-4 md:grid-cols-3">{val.scenarios.map(s=><article key={s.id} className={`rounded-2xl border bg-white p-6 ${s.id==="base"?"border-emerald-400 shadow-md":"border-slate-200"}`}>
          <div className="flex items-center justify-between"><h3 className="font-serif text-2xl font-bold text-slate-950">{s.label}</h3><span className="text-sm font-black text-emerald-800">{pct(s.probability * 100,0)}</span></div>
          <p className="mt-7 text-xs font-black uppercase tracking-wider text-slate-500">Modellerat värde 2028E</p><p className="mt-1 text-4xl font-black tabular-nums text-slate-950">{kr(s.fairValue)}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">{s.drivers.map(driver=><li key={driver} className="flex gap-2"><span className="text-[#087f55]">•</span>{driver}</li>)}</ul>
          <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <p>Kursvärdepotential: <strong className="text-slate-900">{pct(s.pricePotential*100,1,true)}</strong></p>
            <p className="mt-1">Illustrativ kontant-TSR: <strong className="text-slate-900">{pct(s.totalReturnCash*100,1,true)}</strong> ({pct(s.annualizedTotalReturnCash*100,1,true)}/år)</p>
          </div>
        </article>)}</div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Sannolikheter {val.scenarios.map(s => Math.round(s.probability*100)).join("/")} % är subjektiva analytiska bedömningar, inte objektiva prognossannolikheter. Kursvärden är utan utdelningar; kontant-TSR inkluderar modellerad utdelning utan återinvestering.</p>
        <p className="mt-3 text-sm leading-6 text-slate-700"><strong>Viktigt om huvudvärdet:</strong> Base är det mest sannolika enskilda scenariot i vår subjektiva indelning. Det sannolikhetsvägda värdet kan ligga betydligt lägre eftersom Bear ges 30 % vikt. Dessa sannolikheter saknar ännu statistisk kalibrering; därför bör läsaren inte tolka huvudvärdet som ett exakt pris.</p>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-slate-500">Sannolikhetsvägt huvudvärde</p><p className="mt-2 text-4xl font-black tabular-nums">{kr(val.weightedFairValue)}</p></div><p className="text-sm text-slate-600">Jämfört med {kr(d.marketReference.price,2)} per {asOf}<br /><strong>{total} kurspotential · {annual}/år</strong><br /><strong>Kontant-TSR: {cashTsr} · {cashAnnual}/år</strong></p></div>
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm font-bold text-slate-950">Värderingskedja</p><div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">{val.valuationChain.map((step,i)=><span key={step} className="inline-flex items-center gap-2"><span className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900">{step}</span>{i<val.valuationChain.length-1 && <ArrowRight className="text-slate-400" size={15}/>}</span>)}</div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-slate-950">Känslighet: vilken rabatt eller premie får Base?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Håll Base-scenariots framtida NAV oförändrat och ändra endast marknadens slutvärdering. Alla kursvärden beräknas i dossiern.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-sm"><thead className="bg-slate-50"><tr><th className="px-3 py-3">Slutvärdering</th><th className="px-3 py-3 text-right">Aktievärde 2028</th><th className="px-3 py-3 text-right">Kontant-TSR /år</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{val.discountSensitivity.map(s=><tr key={s.terminalDiscount}><td className="px-3 py-3 font-semibold">{s.terminalDiscount<0?`Premie ${pct(-s.terminalDiscount*100)}`: `Rabatt ${pct(s.terminalDiscount*100)}`}</td><td className="px-3 py-3 text-right tabular-nums">{kr(s.terminalPrice)}</td><td className="px-3 py-3 text-right font-bold tabular-nums">{pct(s.annualizedCashTsr*100,1,true)}</td></tr>)}</tbody></table>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">Beroende endast av Base-NAV, utdelningsantaganden och slutrabatt/premie. Ingen köp- eller säljzon.</p>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-section-alt p-6">
          <h3 className="flex items-center gap-2 font-serif text-2xl font-bold"><LockKeyhole className="text-emerald-700" /> Se hur vi har räknat</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">Som gratis medlem får du se scenarioantaganden och hela tillgångsavkastning → NAV efter utdelningar → rabatt/premie → aktievärde-bryggan. All information är hämtad från den versionsstyrda dossiern.</p>
          {user ? <div className="mt-5 grid gap-3 sm:grid-cols-3">{val.scenarios.map(s=><div key={s.id} className="rounded-xl bg-white p-4 text-sm"><h4 className="font-bold">{s.label}</h4><p className="mt-2">Noterat: <strong>{pct(s.listedReturn*100)}</strong>/år</p><p>Patricia: <strong>{pct(s.patriciaReturn*100)}</strong>/år</p><p>EQT: <strong>{pct(s.eqtReturn*100)}</strong>/år</p><p>Viktad NAV-totalavkastning före utdelning: <strong>{pct(s.navTotalReturnCagr*100)}</strong>/år</p><p>Utdelningsavdrag i slut-NAV: <strong>{kr(s.projectedDistributionDrag)}</strong></p><p>Slutrabatt (+)/premie (−): <strong>{pct(s.terminalDiscount*100)}</strong></p><p>Beräknat NAV efter utdelning: <strong>{kr(s.projectedNav)}</strong></p><p>Slutvärde: <strong>{kr(s.fairValue)}</strong></p><p className="mt-2 text-xs leading-5 text-slate-500">{s.rationale}</p></div>)}</div> : <button className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-sm font-bold text-white hover:bg-emerald-900" onClick={() => openLoginModal()} type="button">Skapa gratis konto <ArrowRight size={16}/></button>}
        </div>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"><strong>Värderingens begränsning:</strong> Historiken är en första kalibrering men inte helt källavstämd. Scenarioavkastningar, centrala kostnader och 2027–2028 års utdelningar är antaganden. Modellen saknar fullständig bolagsvis kassaflödes- och multipelkänslighetsanalys. Inga handlingszoner ges innan metodgranskning.</div>
      </section>

      <section id="risk" className="scroll-mt-36">
        <SectionTitle eyebrow="Risk och beslut" title="Vilka antaganden kan bryta investeringscaset?" description="En riskfaktor kan samtidigt sänka NAV och öka substansrabatten. Därför räcker det inte att bedöma dem var för sig." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Global börsnedgång","Noterade Bolag och EQT tappar värde. Börsens riskaptit kan samtidigt sänka Investors värdering relativt NAV.","NAV + rabatt"],
            ["Lägre multiplar i Patricia","Jämförelsebolagens EV/EBITDA kan falla utan motsvarande operativ resultatförsämring.","NAV"],
            ["Förändrad valuta och räntor","SEK-rörelser påverkar internationella innehav; avkastningskrav påverkar noterade och onoterade multiplar.","NAV + rabatt"],
            ["Svag kapitalallokering","Nya förvärv, även efter balansdagen, måste skapa mer värde än kapitalet kostar.","Framtida NAV"],
            ["Rabatten återgår","Även om NAV ökar kan aktiekursen ge dålig avkastning om marknaden kräver större rabatt.","Aktiekurs"]
          ].map(([name,description,impact])=><article key={name} className="rounded-xl border border-border bg-white p-5">
            <div className="flex justify-between gap-3"><h3 className="font-bold text-slate-950">{name}</h3><span className="shrink-0 text-xs text-amber-800">{impact}</span></div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>)}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <h3 className="font-bold text-slate-950">Varför BEVAKA?</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{d.editorial.recommendationRationale}</p>
          <p className="mt-2 text-xs leading-6 text-slate-500">{d.editorial.riskRationale}</p>
        </div>
      </section>

      <section id="alternativ" className="scroll-mt-36">
        <SectionTitle eyebrow="Alternativkostnad" title="Varför Investor framför ett index?" description="Vi utvärderar om diversifiering och aktiv kapitalallokering kan kompensera för rabattrisk och värderingsosäkerhet. Historisk överavkastning är ingen framtida prognos." />
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <table className="w-full text-left text-sm"><thead className="text-slate-600"><tr><th className="py-3">Totalavkastning</th><th className="py-3 text-right">Q3 2026</th><th className="py-3 text-right">Jan–sep 2026</th></tr></thead>
          <tbody className="border-t border-slate-100"><tr><th className="py-3">Investor B</th>{d.marketBenchmark.periods.map(x=><td key={x.key} className="py-3 text-right">{pct(x.investorTsrPct,0,true)}</td>)}</tr><tr className="border-t border-slate-100"><th className="py-3">SIXRX</th>{d.marketBenchmark.periods.map(x=><td key={x.key} className="py-3 text-right">{pct(x.sixrxTsrPct,0,true)}</td>)}</tr></tbody></table>
          <p className="mt-4 text-xs leading-6 text-slate-500">Källa: Investors Q3-rapport. Industrivärden, Latour, Lundbergs och globala index är relevanta alternativ, men en jämförbar, daterad rabatt-, risk- och TSR-tabell behöver verifieras före publicering.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#087f55]"><CalendarDays size={16}/> Nästa kontrollstation</div>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-950">{d.editorial.nextCheckpoint.label}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Planerat datum: {d.editorial.nextCheckpoint.date}. Vi prövar då om Patricias lönsamhetslyft
          är operativt hållbart och om säkerhetsmarginalen förbättras.
        </p>
        <p className="mt-4 border-l-2 border-[#10B981] pl-3 text-sm font-medium text-slate-700">
          Följ nästa bevis i teserna T01–T03 – inte bara rörelsen i aktiekursen.
        </p>
            </section>

      <section id="underlag" className="scroll-mt-36">
        <SectionTitle eyebrow="Källor och metod" title="Granska analysens underlag" description="Source of truth är versionsstyrd. FACT avser rapporterade värden, DERIVED är deterministiska uträkningar, ASSUMPTION är framtidsscenarier och ANALYSIS är redaktionell tolkning." />
        <div className="grid gap-4 sm:grid-cols-2">{Object.values(d.sourceRefs).map(s=><a key={s.id} href={s.url} rel="noopener noreferrer" target="_blank" className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400"><div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700"><span>{s.classification === "PRIMARY" ? "Primärkälla" : "Marknadsdata"} · {s.issued}</span><ExternalLink size={16}/></div><h3 className="mt-3 font-bold text-slate-950 group-hover:underline">{s.label}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{s.locations}</p><p className="mt-2 text-xs text-slate-400">{s.id}</p></a>)}</div>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
          <button className="flex min-h-10 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" type="button" onClick={()=>setOpenEvidence(!openEvidence)} aria-expanded={openEvidence}><span className="flex items-center gap-2"><BookOpen size={18} className="text-emerald-700"/> Visa claim-register ({d.claims.length} faktaposter; avstämning pågår)</span>{openEvidence?<ChevronUp/>:<ChevronDown/>}</button>
          {openEvidence && <div className="mt-5 space-y-2">{d.claims.map(c=><div key={c.id} className="rounded-lg bg-slate-50 p-3 text-xs"><span className="font-black text-emerald-700">{c.id} · FACT · {c.period}</span><p className="mt-1 font-semibold text-slate-800">{c.statement}</p><p className="mt-1 text-slate-500">{c.sourceId} · {c.locator}</p></div>)}</div>}
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <button className="flex min-h-10 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" type="button" onClick={()=>setOpenMethod(!openMethod)} aria-expanded={openMethod}><span className="flex items-center gap-2"><GitCompareArrows size={18} className="text-emerald-700"/> Metod, förändringslogg och publiceringsstatus</span>{openMethod?<ChevronUp/>:<ChevronDown/>}</button>
          {openMethod && <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
            <p><strong>Modell:</strong> NAV_DISCOUNT. {val.valuationChain.join(" → ")}. Referenskurs {kr(d.marketReference.price,2)} daterad {d.marketReference.asOf}. Slutdatum {d.valuationDate} ({val.years.toFixed(4)} år med faktisk dagräkning/365,25).</p>
            <p><strong>FORMEL:</strong> Viktad avkastning på tillgångar = 74 % × Noterat + 19 % × Patricia + 7 % × EQT. NAV-totalavkastning före utdelning ≈ viktad tillgångsavkastning / (1 − 1,8 % nettobelåning) − 0,30 procentenheter/år (redaktionellt antagande). Framtida NAV = {kr(val.startingNav,0)} × (1 + NAV-avkastning)^period minus utdelningar kapitaliserade till 2028. Slutvärde = NAV × (1 − slutrabatt). Det viktade huvudvärdet summerar tre terminalkurser enligt scenario-sannolikheter.</p>
            <p><strong>TSR:</strong> Kontant-TSR = (viktad terminalkurs + {kr(val.dividends)} i kontantutdelningar) / {kr(d.marketReference.price,2)} − 1. Utdelningarna återinvesteras inte. Årlig avkastning använder {val.years.toFixed(3)} år från kursreferensdatum; NAV-prognosens {val.navYears.toFixed(3)} år räknas separat från balansdagen.</p>
            <p><strong>Quality gate:</strong> {d.version.status}. Skäl: historisk substansrabatt inte fullständigt kalibrerad, rapporttabeller ännu inte oberoende avstämda och central disclaimer-version/medlemsåtkomst behöver kontrolleras. Rekommendation och modellvärden är utkast.</p>
            <p><strong>Versions-ID:</strong> {d.version.versionId}. Tidigare publicerad Investor-analys på hemsidan är orörd.</p>
            {d.changeTracking.map(e=><p key={e.eventId}><strong>{e.eventId}:</strong> {e.summary}</p>)}
          </div>}
        </div>
        <p className="mt-6 text-xs leading-6 text-slate-600">{d.disclaimer.shortText} <Link className="font-bold text-emerald-700 underline" to={d.disclaimer.url}>Läs mer</Link></p>
      </section>
    </main>
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-xs text-slate-500">Börsanalys.se · Investor Q3 2026 · v11.2 NAV_DISCOUNT · Internt utkast, ej PUBLISH_READY</footer>
  </div>;
}
