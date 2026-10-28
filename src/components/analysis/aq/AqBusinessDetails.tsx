import {aqDossier} from '../../../data/analyses/aq-group/aq-q3-2026';
export default function AqBusinessDetails(){
 return <section className="border-t border-slate-200 py-10 lg:py-14" aria-labelledby="aq-business-heading">
  <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Förstå bolaget</p>
  <h2 id="aq-business-heading" className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">Vad AQ gör, varför kunderna köper och vad som driver vinsten</h2>
  <div className="mt-8 grid gap-8 lg:gap-10">{aqDossier.reader_content.business_sections.map(section=><section key={section.title} className="max-w-3xl"><h3 className="font-serif text-2xl font-bold tracking-tight text-slate-950">{section.title}</h3><div className="mt-3 space-y-4 text-base leading-7 text-slate-600">{section.paragraphs.map(text=><p key={text}>{text}</p>)}</div></section>)}</div>
 </section>;
}
