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
  { label: "Substansrabatt (+) / premie (−)", q2: pct(d.snapshot.discountQ2), q3: pct(d.snapshot.discountQ3), delta: pct(d.snapshot.discountQ3-d.snapshot.discountQ2,1,true).replace(" %"," p.e."), source: "F01 · F02 · F05 · F06" },
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
  return <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">Spårbarhet: varje FACT har ett claim-ID som återfinns i källregistret. Värden beräknas i den versionsstyrda analysdossiern, inte i denna frontend.</div>;
}

export default function InvestorV112Preview() {
  const { user, openLoginModal } = useAuth();
  const [openEvidence, setOpenEvidence] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const val = d.valuation;
  const snap = d.snapshot;
  const asOf = "30 september 2026";
  const annual = pct(val.annualizedValuePotential * 100, 1, true);
  const total = pct(val.totalValuePotential * 100, 1, true);

  return <div className="min-h-screen bg-[#f8faf9] text-slate-900">
    <SEO title="Investor AB Q3 2026 – v11.2 förhandsvisning | Börsanalys.se" description="Spårbar kvartalsuppföljning av Investor AB med NAV-värdering, Q2-jämförelse och Bear/Base/Bull. Redaktionellt utkast, ej publicerat." noIndex />
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-950">
      Redaktionell förhandsvisning · NOT_PUBLISH_READY · Ej offentlig köprekommendation
    </div>
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Link to="/analys/investor-ab" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline"><ArrowLeft size={16} /> Till äldre Investor-analys</Link>
    </div>

    <header className="relative overflow-hidden bg-[#062c27] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-44 h-[34rem] w-[34rem] rounded-full border-[6rem] border-emerald-500/10" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-emerald-200">
            <span>Investmentbolag</span><span aria-hidden="true">·</span><span>INVE B</span><span aria-hidden="true">·</span><span>Q3 2026</span>
          </div>
          <h1 className="mt-5 font-serif text-5xl font-bold tracking-[-.05em] sm:text-6xl">Investor AB</h1>
          <p className="mt-3 font-serif text-2xl text-emerald-50">Patricia driver åter värdeskapandet – men säkerhetsmarginalen är begränsad.</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-50/80">Ny, fristående v11.2-dossier. Baserad på publicerade Q2- och Q3-rapporter, daterad aktiekurs och separat substansvärdesmodell. All scenarioinformation är redaktionella antaganden – inte Investors prognoser.</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-emerald-200">Analysdatum 16 oktober 2026 · Prognoshorisont 31 december 2028</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-200">Investment Snapshot · Utkast</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-extrabold"><span className="rounded-full bg-amber-100 px-3 py-1 text-amber-950">BEVAKA · preliminärt</span><span className="rounded-full border border-white/25 px-3 py-1">MEDEL RISK · preliminärt</span></div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-emerald-100">Sannolikhetsvägt värde 2028E</p>
          <p className="mt-1 text-5xl font-extrabold tabular-nums tracking-tight">{kr(val.weightedFairValue)}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
            <div><p className="text-xs text-emerald-100">Total värdepotential</p><p className="mt-1 text-2xl font-extrabold tabular-nums">{total}</p></div>
            <div><p className="text-xs text-emerald-100">Annualiserad värdepotential</p><p className="mt-1 text-2xl font-extrabold tabular-nums">{annual}<span className="ml-1 text-sm">/år</span></p></div>
          </div>
          <p className="mt-5 text-xs leading-5 text-emerald-50/80">Referenskurs: {kr(d.marketReference.price, 2)} ({asOf}). Modellvärde avser enbart terminalkursen och <strong>exkluderar framtida utdelningar</strong>. Modellen är ej godkänd för publicering.</p>
        </div>
      </div>
    </header>

    <nav aria-label="Innehåll" className="sticky top-[68px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 sm:px-5">{[["tes","Analys"],["jmf","Q2 → Q3"],["teser","Teser"],["scenarier","Värdering"],["underlag","Källor"]].map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 border-b-2 border-transparent px-3 py-4 text-sm font-bold text-slate-600 hover:border-emerald-600 hover:text-emerald-800">{label}</a>)}</div>
    </nav>

    <main className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
      <section id="tes" className="scroll-mt-36">
        <SectionTitle eyebrow="Värdedrivare" title="Vad är intressant – och vad kan gå fel?" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><TrendingUp className="text-emerald-700" /> Varför intressant</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><li><strong>Patricia accelererar:</strong> justerad EBITA-tillväxt ökar från 16 % till 26 % (respektive kvartals tillväxt mot föregående år). <SourceIds ids={["F11","F12"]}/></li><li><strong>Flera ben bidrar:</strong> Patricia +15 % och EQT +7 % under Q3; deras respektive värdeförändring var negativ i Q2. <SourceIds ids={["F09","F10","F13","F14"]}/></li><li><strong>Finansiell flexibilitet:</strong> skuldsättningsgrad 1,8 % i Q3, ned från 1,9 %. <SourceIds ids={["F15","F16"]}/></li></ul>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><ShieldAlert className="text-amber-700" /> Varför försiktiga</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><li><strong>Begränsad substansrabatt:</strong> Q3-slutkursen låg nära justerat NAV. Rabatten var cirka {pct(snap.discountQ3)}, beräknat på rapportens balansdag. <SourceIds ids={["F01","F05"]}/></li><li><strong>Värderingsrisk i Patricia:</strong> Q3-avkastningen gynnades även av högre multiplar och valuta; inte enbart underliggande operativ tillväxt. <SourceIds ids={["F09"]}/></li><li><strong>Justerat är inte redovisat NAV:</strong> 411 kr respektive 359 kr per aktie, bland annat på grund av värderingsprinciperna för dotter- och intressebolag. <SourceIds ids={["F01","F03"]}/></li></ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-emerald-50 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-800">Börsanalys.se:s insikt · ANALYSIS</p>
          <p className="mt-3 font-serif text-xl font-semibold leading-8 text-slate-950">{d.editorial.insight}</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">Analysens avgörande fråga: {d.editorial.investmentQuestion}</p>
        </div>
      </section>

      <section id="jmf" className="scroll-mt-36">
        <SectionTitle eyebrow="Rapportuppföljning" title="Q2 → Q3: Vad förändrades?" description="Identiska definitioner jämförs mellan kvartalen. Tillväxtsiffror avser respektive rapports årstakt; förändringen mellan dem anges i procentenheter." />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Justerat NAV/aktie</p><p className="mt-2 text-3xl font-black tabular-nums">{kr(snap.navQ3,0)}</p><p className="mt-1 text-sm font-bold text-emerald-700">{pct(snap.navDeltaPct,1,true)} sedan Q2</p><SourceIds ids={["F01","F02"]}/></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Substansrabatt Q3</p><p className="mt-2 text-3xl font-black tabular-nums">{pct(snap.discountQ3)}</p><p className="mt-1 text-sm text-slate-600">+ rabatt / − premie beräknas konsekvent som 1 − kurs/NAV.</p><SourceIds ids={["F01","F05"]}/></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Totalt justerat NAV</p><p className="mt-2 text-3xl font-black tabular-nums">{Math.round(snap.totalNavMsekQ3/1000).toLocaleString("sv-SE")} mdkr</p><p className="mt-1 text-sm text-slate-600">Upp från {Math.round(snap.totalNavMsekQ2/1000).toLocaleString("sv-SE")} mdkr, avrundade miljarder.</p><SourceIds ids={["F07","F08"]}/></div>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-700"><tr><th className="px-5 py-4">Nyckeltal</th><th className="px-3 py-4 text-right">Q2 2026</th><th className="px-3 py-4 text-right">Q3 2026</th><th className="px-5 py-4 text-right">Förändring</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{deltas.map(row=><tr key={row.label}><th scope="row" className="px-5 py-4 font-semibold text-slate-900">{row.label}<span className="ml-2 text-[10px] font-normal text-emerald-700">{row.source}</span></th><td className="px-3 py-4 text-right tabular-nums text-slate-600">{row.q2}</td><td className="px-3 py-4 text-right font-extrabold tabular-nums">{row.q3}</td><td className="px-5 py-4 text-right font-semibold tabular-nums text-emerald-700">{row.delta}</td></tr>)}</tbody>
          </table>
        </div>
        <SourceFootnote />
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
          <p className="mt-4 text-sm leading-6 text-slate-700">{s.id==="bear"?"Svag värdetillväxt och större marknadsrabatt.":s.id==="base"?"Måttlig substansvärdestillväxt med fortsatt rabatt.":"Starkare substansvärdestillväxt och rabatt som försvinner."}</p>
        </article>)}</div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Sannolikheter {val.scenarios.map(s => Math.round(s.probability*100)).join("/")} % är subjektiva analytiska bedömningar, inte objektiva prognossannolikheter. Terminalkursbaserat värde, utan framtida utdelningar.</p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-slate-500">Sannolikhetsvägt huvudvärde</p><p className="mt-2 text-4xl font-black tabular-nums">{kr(val.weightedFairValue)}</p></div><p className="text-sm text-slate-600">Jämfört med {kr(d.marketReference.price,2)} per {asOf}<br /><strong>{total} totalt · {annual}/år</strong></p></div>
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm font-bold text-slate-950">Värderingskedja</p><div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">{val.valuationChain.map((step,i)=><span key={step} className="inline-flex items-center gap-2"><span className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900">{step}</span>{i<val.valuationChain.length-1 && <ArrowRight className="text-slate-400" size={15}/>}</span>)}</div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="flex items-center gap-2 font-serif text-2xl font-bold"><LockKeyhole className="text-emerald-700" /> Se hur vi har räknat</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">Som gratis medlem får du se scenarioantaganden och hela NAV → tillväxt → rabatt/premie → aktievärde-bryggan. All information är hämtad från den versionsstyrda dossiern.</p>
          {user ? <div className="mt-5 grid gap-3 sm:grid-cols-3">{val.scenarios.map(s=><div key={s.id} className="rounded-xl bg-white p-4 text-sm"><h4 className="font-bold">{s.label}</h4><p className="mt-2">NAV-tillväxt: <strong>{pct(s.navCagr*100)}</strong> per år</p><p>Slutrabatt: <strong>{pct(s.terminalDiscount*100)}</strong></p><p>Beräknat NAV: <strong>{kr(s.projectedNav)}</strong></p><p>Slutvärde: <strong>{kr(s.fairValue)}</strong></p><p className="mt-2 text-xs leading-5 text-slate-500">{s.rationale}</p></div>)}</div> : <button className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-sm font-bold text-white hover:bg-emerald-900" onClick={() => openLoginModal()} type="button">Skapa gratis konto <ArrowRight size={16}/></button>}
        </div>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"><strong>Värderingens begränsning:</strong> Historisk substansrabatt har ännu inte kalibrerats fullständigt. Scenarierna är preliminära och går inte genom publiceringsgrinden. Inga risk/reward-kurszoner eller P/E-labb visas.</div>
      </section>

      <section className="rounded-2xl bg-[#062c27] p-6 text-white sm:p-9">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-200"><CalendarDays size={16}/> Nästa kontrollstation</div>
        <h2 className="mt-3 font-serif text-3xl font-bold">Bokslutskommuniké 2026</h2>
        <p className="mt-3 text-sm text-emerald-50">Planerat datum: 22 januari 2027, enligt Investors finansiella kalender. Vi prövar då om Patricias lönsamhetslyft är operativt hållbart och om säkerhetsmarginalen förbättras.</p>
        <p className="mt-4 text-xs text-emerald-200">Följ nästa bevis i teserna T01–T03 – inte bara rörelsen i aktiekursen.</p>
      </section>

      <section id="underlag" className="scroll-mt-36">
        <SectionTitle eyebrow="Källor och metod" title="Granska analysens underlag" description="Source of truth är versionsstyrd. FACT avser rapporterade värden, DERIVED är deterministiska uträkningar, ASSUMPTION är framtidsscenarier och ANALYSIS är redaktionell tolkning." />
        <div className="grid gap-4 sm:grid-cols-2">{Object.values(d.sourceRefs).map(s=><a key={s.id} href={s.url} rel="noopener noreferrer" target="_blank" className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400"><div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700"><span>Primärkälla · {s.issued}</span><ExternalLink size={16}/></div><h3 className="mt-3 font-bold text-slate-950 group-hover:underline">{s.label}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{s.locations}</p><p className="mt-2 text-xs text-slate-400">{s.id}</p></a>)}</div>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
          <button className="flex min-h-10 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" type="button" onClick={()=>setOpenEvidence(!openEvidence)} aria-expanded={openEvidence}><span className="flex items-center gap-2"><BookOpen size={18} className="text-emerald-700"/> Visa claim-register ({d.claims.length} verifierade fakta)</span>{openEvidence?<ChevronUp/>:<ChevronDown/>}</button>
          {openEvidence && <div className="mt-5 space-y-2">{d.claims.map(c=><div key={c.id} className="rounded-lg bg-slate-50 p-3 text-xs"><span className="font-black text-emerald-700">{c.id} · FACT · {c.period}</span><p className="mt-1 font-semibold text-slate-800">{c.statement}</p><p className="mt-1 text-slate-500">{c.sourceId} · {c.locator}</p></div>)}</div>}
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <button className="flex min-h-10 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" type="button" onClick={()=>setOpenMethod(!openMethod)} aria-expanded={openMethod}><span className="flex items-center gap-2"><GitCompareArrows size={18} className="text-emerald-700"/> Metod, förändringslogg och publiceringsstatus</span>{openMethod?<ChevronUp/>:<ChevronDown/>}</button>
          {openMethod && <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
            <p><strong>Modell:</strong> NAV_DISCOUNT. {val.valuationChain.join(" → ")}. Referenskurs {kr(d.marketReference.price,2)} daterad {d.marketReference.asOf}. Slutdatum {d.valuationDate} ({val.years.toFixed(4)} år med faktisk dagräkning/365,25).</p>
            <p><strong>FORMEL:</strong> Värde per scenario = {kr(val.startingNav,0)} × (1 + NAV-CAGR)^år × (1 − slutrabatt). Sannolikhetsvägt värde = Σ sannolikhet × scenariovärde. Annualiserad värdepotential = (vägt värde / {kr(d.marketReference.price,2)})^(1/år) − 1. Historisk total NAV-utveckling inkluderar utdelningar och ska inte förväxlas med terminalkursmodellen.</p>
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
