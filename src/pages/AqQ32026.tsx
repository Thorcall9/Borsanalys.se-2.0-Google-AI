import { Link } from "react-router-dom";
import V11Analysis from "../components/analysis/V11Analysis";
import { aqQ32026, aqDossier } from "../data/analyses/aq-group/aq-q3-2026";

function MemberDetails() {
  return <div className="mt-5 space-y-7 border-t border-emerald-200 pt-5">
    <p className="text-sm leading-6 text-slate-600">{aqDossier.member_notes[0]}</p>
    {aqDossier.member_presentation.map(table => <section key={table.title}>
      <h3 className="font-bold text-slate-950">{table.title}</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[430px] text-left text-sm"><thead className="bg-emerald-50"><tr>{table.headers.map(h => <th scope="col" className="px-4 py-3" key={h}>{h}</th>)}</tr></thead><tbody>{table.rows.map((row, i) => <tr key={i} className="border-t border-slate-100">{row.map((cell, j) => j === 0 ? <th scope="row" key={j} className="px-4 py-3 font-medium text-slate-600">{cell}</th> : <td key={j} className="px-4 py-3 tabular-nums text-slate-950">{cell}</td>)}</tr>)}</tbody></table></div>
    </section>)}
    {aqDossier.member_notes.slice(1).map(note => <p key={note} className="text-sm leading-6 text-slate-600">{note}</p>)}
  </div>;
}

function Sources() {
  return <div className="mb-6">
    <h2 className="font-bold text-slate-700">Källor och metod</h2>
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">{aqDossier.sources.filter(s => "url" in s && s.url && !s.source_id.startsWith("T") && s.source_id !== "S11" && s.source_id !== "S14").map(s => <li key={s.source_id}><a className="underline underline-offset-2 hover:text-emerald-700" href={"url" in s ? s.url! : undefined} target="_blank" rel="noopener noreferrer">{s.source_id} · {s.title}</a></li>)}</ul>
    <p className="mt-4">Källkontroll 28 oktober 2026. Värderingen använder den fördröjda kursnoteringen 234,60 kr kl.15.21 CET, inte dagens slutkurs. Scenarioandelarna är redaktionella bedömningar. Beloppen i tabellerna avrundas först vid presentation.</p>
    <p className="mt-3">Källkonflikter: Q3-texten anger felaktigt minskad försäljning i Systems; tabellen visar ökning från 994 till 1 008 MSEK. Engelska översiktens felbenämnda debt/equity 68 % avser soliditet. Norlakes proformabidrag relativt historisk försäljning är inte avstämt och annualiseras inte.</p>
    <p className="mt-3">{aqDossier.presentation.v11.ownershipDisclosure} Även tidigare uppgift om ingen ersättning eller kommersiell relation behöver bekräftas av författaren inför publicering. <Link to="/aktieinnehav-och-intressekonflikter" className="underline">Innehav och intressekonflikter</Link>.</p>
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
  return <V11Analysis data={aqQ32026} canonicalUrl="https://www.borsanalys.se/analys/aq-group-q3-2026" mobileSnapshot={snapshot} memberDetails={<MemberDetails />} sourceLinks={<Sources />} />;
}
