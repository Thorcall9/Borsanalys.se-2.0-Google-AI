import { ArrowRight, BarChart3, Bell, CalendarDays, ChevronDown, FileText, Grid2X2, LockKeyhole, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, Quote, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { AnalysisData } from "../../types/analysis";
import { getAnalysisScore } from "../../lib/score";
import { CONTENT_TYPE_BADGE_LABELS, type FilterContentType } from "../../hooks/useAnalysisFilters";
import type { Recommendation } from "../../lib/recommendation";
import AdUnit from "./AdUnit";

interface AnalysisArchiveProps {
  analyses: AnalysisData[];
  featured: AnalysisData | undefined;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  contentType: FilterContentType;
  onContentTypeChange: (value: FilterContentType) => void;
  selectedRecommendation: string;
  onRecommendationChange: (value: string) => void;
  onMoreFilters: () => void;
  resultCount: number;
}

function CompanyMark({ analysis, featured = false }: { analysis: AnalysisData; featured?: boolean }) {
  const isNovo = analysis.ticker.toUpperCase().startsWith("NOVO");
  const mark = isNovo ? "novo nordisk" : analysis.ticker.toLowerCase().replace(".st", "");
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm ${featured ? "h-28 w-28 md:h-32 md:w-32" : "h-16 w-28 md:h-20 md:w-32"}`}>
      <span className={`px-2 text-center font-black tracking-tight ${isNovo ? "text-[13px] text-[#153c97]" : featured ? "text-xl" : "text-lg"}`}>
        {isNovo && <span className="mb-1 block text-[8px] uppercase tracking-[0.2em] text-[#153c97]">✦ novo</span>}
        {mark}
      </span>
    </div>
  );
}

function ScoreRing({ analysis }: { analysis: AnalysisData }) {
  const score = getAnalysisScore(analysis);
  if (!score) return null;
  const percent = Math.round(score.percent);
  const color = analysis.recommendation === "BEVAKA" ? "#eab308" : analysis.recommendation === "AVSTÅ" ? "#ef4444" : "#059669";
  return (
    <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(${color} ${percent * 3.6}deg, #e5e7eb 0deg)` }} aria-label={`${score.score} av ${score.maxScore}`}>
      <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-full bg-white">
        <span className="text-xl font-bold leading-none">{score.score}</span>
        <span className="mt-1 text-[8px] text-slate-500">av {score.maxScore}</span>
      </div>
    </div>
  );
}

function Recommendation({ value }: { value: Recommendation }) {
  const colors = value === "KÖP" ? "text-emerald-600" : value === "BEVAKA" ? "text-amber-500" : "text-red-500";
  return <span className={`font-bold ${colors}`}>{value}</span>;
}

function Meta({ analysis }: { analysis: AnalysisData }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{analysis.displayDate || analysis.date}</span>
      <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{analysis.contentType === "report-commentary" ? "12 min" : "20 min läsning"}</span>
      <span className="hidden items-center gap-1.5 sm:inline-flex">✧ {analysis.sector}</span>
    </div>
  );
}

function FilterButton({ active, children, onClick, icon }: { active?: boolean; children: React.ReactNode; onClick: () => void; icon?: React.ReactNode }) {
  return <button onClick={onClick} className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all ${active ? "border-emerald-700 bg-emerald-700 text-white shadow-md shadow-emerald-700/20" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"}`}>{icon}{children}</button>;
}

export default function AnalysisArchive({ analyses, featured, searchTerm, onSearchChange, contentType, onContentTypeChange, selectedRecommendation, onRecommendationChange, onMoreFilters, resultCount }: AnalysisArchiveProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_70%_22%,rgba(16,185,129,0.08),transparent_27%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)]">
        <div className="mx-auto max-w-[1180px] px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-14">
          <div className="relative max-w-[760px]">
            <div className="pointer-events-none absolute -right-48 -top-20 hidden h-64 w-[520px] rotate-[-17deg] opacity-25 md:block" aria-hidden="true">
              <svg viewBox="0 0 520 220" className="h-full w-full text-emerald-500"><path d="M0 190 C50 175 65 165 105 174 S155 145 196 150 S235 122 264 138 S300 102 340 118 S378 68 405 91 S446 35 489 53" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M0 204 C55 192 90 188 128 192 S194 170 226 180 S282 144 310 161 S370 117 403 133 S447 73 500 92" fill="none" stroke="currentColor" strokeWidth="1" opacity=".28" /><circle cx="489" cy="53" r="6" fill="currentColor" /></svg>
            </div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 md:hidden">Analyser</div>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-[48px] leading-[.98] tracking-[-0.045em] md:text-[64px]">Analyser</motion.h1>
            <p className="mt-4 max-w-[520px] text-base leading-7 text-slate-600 md:text-[17px]">Oberoende analyser, datadrivna insikter och tydliga bedömningar – för bättre investeringsbeslut.</p>
            <div className="relative mt-6 max-w-[600px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={21} />
              <input value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Sök bolag, bransch eller nyckelord..." aria-label="Sök bolag, bransch eller nyckelord" className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-5 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
            </div>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <FilterButton active={contentType === "all"} onClick={() => onContentTypeChange("all")} icon={<Grid2X2 size={16} />}>Alla</FilterButton>
            <FilterButton active={contentType === "analysis"} onClick={() => onContentTypeChange("analysis")} icon={<BarChart3 size={16} />}>Analyser</FilterButton>
            <FilterButton active={contentType === "report-commentary"} onClick={() => onContentTypeChange("report-commentary")} icon={<FileText size={16} />}>Rapportkommentarer</FilterButton>
            <FilterButton active={selectedRecommendation === "KÖP"} onClick={() => onRecommendationChange(selectedRecommendation === "KÖP" ? "Alla" : "KÖP")}>KÖP</FilterButton>
            <FilterButton active={selectedRecommendation === "BEVAKA"} onClick={() => onRecommendationChange(selectedRecommendation === "BEVAKA" ? "Alla" : "BEVAKA")}>BEVAKA</FilterButton>
            <FilterButton active={selectedRecommendation === "AVSTÅ"} onClick={() => onRecommendationChange(selectedRecommendation === "AVSTÅ" ? "Alla" : "AVSTÅ")}>AVSTÅ</FilterButton>
            <FilterButton onClick={onMoreFilters} icon={<SlidersHorizontal size={16} />}>Fler filter <ChevronDown size={15} /></FilterButton>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-5 pb-32 md:px-8 md:pb-20">
        {featured && <>
          <h2 className="mb-3 text-sm font-bold md:text-base">Utvald analys</h2>
          <Link to={`/analys/${featured.slug}`} className="group mb-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition hover:border-emerald-300 hover:shadow-lg md:grid-cols-[170px_1fr_190px] md:items-center md:px-5 md:py-5">
            <div className="flex items-center justify-center p-5 md:p-0"><CompanyMark analysis={featured} featured /></div>
            <div className="border-t border-slate-100 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <span className="mb-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">Utvald analys</span>
              <h3 className="max-w-[620px] font-serif text-[21px] leading-tight tracking-[-0.02em] md:text-[23px]">{featured.listTitle || featured.title}</h3>
              <p className="mt-2 max-w-[650px] text-sm leading-6 text-slate-500">{featured.summary}</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 md:block md:border-l md:border-t-0 md:pl-6"><div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">Rekommendation</div><div className="mt-1 text-2xl"><Recommendation value={featured.recommendation} /></div><div className="mt-3 flex items-center gap-3 md:mt-4"><ScoreRing analysis={featured} /><span className="text-slate-400 transition group-hover:translate-x-1"><ArrowRight size={22} /></span></div></div>
          </Link>
          <AdUnit variant="top-display" className="mx-auto max-w-[760px]" />
        </>}

        <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-bold md:text-base">Senaste analyser</h2><span className="hidden items-center gap-1 text-sm font-semibold text-emerald-700 md:flex">{resultCount} publiceringar <ArrowRight size={16} /></span></div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {analyses.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <Search className="mx-auto text-slate-400" size={32} />
              <h3 className="mt-4 font-serif text-2xl">Inga analyser hittades</h3>
              <p className="mt-2 text-sm text-slate-500">Prova att ändra sökningen eller justera filtren.</p>
            </div>
          ) : analyses.map((analysis, index) => {
            const isComment = analysis.contentType === "report-commentary";
            return <motion.div key={analysis.slug} className="min-w-0" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .04, .2) }}><Link to={`/analys/${analysis.slug}`} className="group flex w-full min-w-0 min-h-[214px] flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md md:block md:min-h-[212px] md:p-5"><div className="flex min-w-0 items-start gap-4 md:block"><CompanyMark analysis={analysis} /><div className="min-w-0 flex-1 md:mt-4"><span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] ${isComment ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>{CONTENT_TYPE_BADGE_LABELS[analysis.contentType]}</span><h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-slate-800">{analysis.listTitle || analysis.title}</h3></div></div><div className="mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-slate-100 pt-3"><div className="min-w-0"><div className="text-sm font-semibold"><Recommendation value={analysis.recommendation} /></div><Meta analysis={analysis} /></div><div className="flex shrink-0 items-center gap-2"><ScoreRing analysis={analysis} /><ArrowRight className="text-slate-400 transition group-hover:translate-x-1" size={18} /></div></div></Link></motion.div>;
          })}
        </div>
        <AdUnit variant="sidebar-display" className="mx-auto mt-3 max-w-[420px]" />
        <div className="mt-10 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5"><div className="flex gap-3"><Sparkles className="mt-0.5 shrink-0 text-emerald-700" size={19} /><p className="text-sm leading-6 text-slate-600"><strong className="text-slate-800">Vi kombinerar marknadsdata med beprövad metodik</strong> för att ge dig objektiva och användbara analyser.</p></div></div><div className="hidden rounded-2xl border border-slate-200 bg-white p-5 md:block"><div className="flex gap-3"><Quote className="shrink-0 text-emerald-600" size={18} /><p className="text-sm leading-6 text-slate-600">Tydliga resonemang och långsiktiga perspektiv för bättre beslut.</p></div></div></div>
      </main>

      <aside className="fixed bottom-3 left-3 right-3 z-30 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_12px_36px_rgba(15,23,42,0.14)] backdrop-blur md:static md:mx-auto md:mt-0 md:hidden"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><ShieldCheck size={22} /></div><div className="min-w-0 flex-1"><div className="font-serif text-lg">7 dagar gratis</div><div className="truncate text-xs text-slate-500">Spara analyser och bevaka bolag.</div></div><button className="shrink-0 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white shadow-md shadow-emerald-700/20">Starta gratis <ArrowRight className="ml-1 inline" size={14} /></button></div></aside>
      <div className="mx-auto hidden max-w-[1180px] px-8 pb-10 md:block"><div className="grid grid-cols-[1fr_340px] gap-5"><div /><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><ShieldCheck className="text-emerald-600" size={18} /> Prova Börsanalys.se riskfritt</div><div className="mt-3 font-serif text-3xl">7 dagar gratis</div><p className="mt-1 text-sm leading-6 text-slate-500">Full tillgång till alla analyser och medlemsförmåner.</p><div className="mt-4 space-y-3 text-sm text-slate-600"><div className="flex items-center gap-2"><LockKeyhole size={16} className="text-emerald-600" /> Spara analyser och bevakningar</div><div className="flex items-center gap-2"><Bell size={16} className="text-emerald-600" /> Få notiser vid nya analyser</div><div className="flex items-center gap-2"><Star size={16} className="text-emerald-600" /> Medlemsbrev med insikter</div></div><button className="mt-5 w-full rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white transition hover:bg-emerald-800">Starta gratis provperiod <ArrowRight className="ml-1 inline" size={16} /></button></div></div></div>
    </div>
  );
}
