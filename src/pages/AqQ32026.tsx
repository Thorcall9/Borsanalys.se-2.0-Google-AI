import { Link } from "react-router-dom";
import AqBusinessDetails from "../components/analysis/aq/AqBusinessDetails";
import AqMemberDetails from "../components/analysis/aq/AqMemberDetails";
import V11Analysis from "../components/analysis/V11Analysis";
import { aqQ32026, aqDossier } from "../data/analyses/aq-group/aq-q3-2026";

function Sources() {
  return <div className="mb-6">
    <h2 className="font-bold text-slate-700">Källor och metod</h2>
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">{aqDossier.sources.filter(s => "url" in s && s.url && !s.source_id.startsWith("T") && s.source_id !== "S11" && s.source_id !== "S14").map(s => <li key={s.source_id}><a className="underline underline-offset-2 hover:text-emerald-700" href={"url" in s ? s.url! : undefined} target="_blank" rel="noopener noreferrer">{s.source_id} · {s.title}</a></li>)}</ul>
    <p className="mt-4">Källkontroll 28 oktober 2026. Värderingen använder den fördröjda kursnoteringen 234,60 kr kl.15.21 CET, inte dagens slutkurs. Scenarioandelarna är redaktionella bedömningar. Beloppen i tabellerna avrundas först vid presentation.</p>
    <p className="mt-3">Källkonflikter: Q3-texten anger felaktigt minskad försäljning i Systems; tabellen visar ökning från 994 till 1 008 MSEK. Engelska översiktens felbenämnda debt/equity 68 % avser soliditet. Norlakes proformabidrag relativt historisk försäljning är inte avstämt och annualiseras inte.</p>
    <p className="mt-3">{aqDossier.presentation.v11.ownershipDisclosure} Enligt webbplatsens tidigare redovisning finns ingen ersättning eller kommersiell relation till AQ i samband med analysen. <Link to="/aktieinnehav-och-intressekonflikter" className="underline">Innehav och intressekonflikter</Link>.</p>
    <p className="mt-3">Ny version {aqDossier.version.version_id}. Tidigare analys från april finns kvar: <Link className="underline" to="/analys/aq-group">AQ Group – tidigare analys</Link>. Avkastningskrav 10 % per år. Modellvillkorade ingångspriser och utdelningsantaganden redovisas i fördjupningen.</p>
  </div>;
}

export default function AqQ32026() {
  const view = aqDossier.presentation.v11;
  const snapshot = <section className="border-b border-emerald-100 bg-emerald-50 px-5 py-5 sm:hidden" aria-label="Investment Snapshot">
    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">AQ Group · Q3 2026 · v11.2</p>
    <p className="mt-2 text-sm font-bold text-slate-900">{aqQ32026.recommendation} · {view.riskLabel}</p>
    <p className="mt-3 font-serif text-4xl font-bold text-emerald-800">{view.weightedFairValue} kr</p>
    <p className="text-xs font-semibold text-slate-600">Sannolikhetsvägt värde · 31 december 2028</p>
    <p className="mt-3 text-sm font-semibold">Total värdepotential: {view.upside}</p>
    <p className="mt-1 text-sm font-semibold">{view.annualPotential}</p>
    <p className="mt-3 text-xs leading-5 text-slate-600">Referenskurs: {view.currentPrice}<br />28 oktober 2026 · Analysdatum: 28 oktober 2026</p>
    <p className="mt-2 text-xs leading-5 text-slate-600">Terminalvärde, inte värde idag. Potential exklusive utdelningar.</p>
  </section>;
  return <V11Analysis data={aqQ32026} valuationCheckLabel="Värderingsbrygga" canonicalUrl="https://www.borsanalys.se/analys/aq-group-q3-2026" mobileSnapshot={snapshot} businessDetails={<AqBusinessDetails />} memberDetails={<AqMemberDetails />} sourceLinks={<Sources />} />;
}

