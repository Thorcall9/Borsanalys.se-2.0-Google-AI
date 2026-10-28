import {aqDossier} from '../../../data/analyses/aq-group/aq-q3-2026';
const format=(value:number,digits=1)=>value.toLocaleString('sv-SE',{minimumFractionDigits:digits,maximumFractionDigits:digits});
function ModelTable({title,headers,rows}:{title:string;headers:string[];rows:string[][]}){
 return <section><h4 className="font-bold text-slate-950">{title}</h4><div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[430px] text-left text-sm"><thead className="bg-emerald-50"><tr>{headers.map(h=><th scope="col" className="px-4 py-3" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-t border-slate-100">{row.map((cell,j)=>j===0?<th scope="row" key={j} className="px-4 py-3 font-medium text-slate-600">{cell}</th>:<td key={j} className="px-4 py-3 tabular-nums text-slate-950">{cell}</td>)}</tr>)}</tbody></table></div></section>;
}
export default function AqMemberDetails(){
 const content=aqDossier.reader_content;
 return <div className="mt-5 space-y-8 border-t border-emerald-200 pt-6">
  <p className="max-w-3xl text-base leading-7 text-slate-600">{content.member_intro}</p>
  <h3 className="font-serif text-3xl font-bold tracking-tight text-slate-950">{content.scenario_heading}</h3>
  <div className="space-y-5">{aqDossier.segment_revenue_model.scenarios.map((scenario,i)=>{
   const s=aqDossier.scenarios[i];
   return <section key={scenario.id} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">{['Försiktigt scenario','Huvudscenario','Positivt scenario'][i]}</p><h4 className="mt-2 font-serif text-2xl font-bold text-slate-950">{['Efterfrågan mattas av och kapacitet blir outnyttjad','Komponenter driver tillväxten, System förbättras långsammare','Stark komponentefterfrågan får sällskap av bättre System'][i]}</h4><div className="mt-4 space-y-3 text-base leading-7 text-slate-600">{scenario.rationale.map(p=><p key={p}>{p}</p>)}</div><p className="mt-5 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-700">Det ger cirka {format(s.inputs.revenue/1000)} mdkr i omsättning 2028 och {format(s.fair_value.value)} kr i värde per aktie.</p></section>;
  })}</div>
  <ModelTable title="Tre utfall i korthet" headers={['Mått','Försiktigt','Huvudscenario','Positivt']} rows={content.plain_summary_rows}/>
  {content.member_sections.map(section=><section key={section.title} className="max-w-3xl"><h3 className="font-serif text-2xl font-bold text-slate-950">{section.title}</h3><div className="mt-3 space-y-4 text-base leading-7 text-slate-600">{section.paragraphs.map(p=><p key={p}>{p}</p>)}</div></section>)}
  <details className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"><summary className="cursor-pointer text-base font-bold text-emerald-800">Visa hela modellen och extra stresstester</summary><p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{content.technical_intro}</p>
   <div className="mt-6 space-y-7">
    <ModelTable title="Omsättningsvägen per segment · egna antaganden" headers={['Scenario / år','Komponenter, MSEK','System, MSEK','Totalt, MSEK']} rows={aqDossier.segment_revenue_model.scenarios.flatMap((s,i)=>s.periods.map(row=>[`${['Försiktigt','Huvudscenario','Positivt'][i]} ${row.year}`,format(row.components,0),format(row.systems,0),format(row.revenue,0)]))}/>
    {aqDossier.member_presentation.map(t=><details key={t.title} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer text-sm font-bold text-slate-800">{t.title}</summary><div className="mt-4"><ModelTable {...t}/></div></details>)}
    {aqDossier.member_notes.map(note=><p key={note} className="text-sm leading-6 text-slate-600">{note}</p>)}
   </div>
  </details>
 </div>;
}
