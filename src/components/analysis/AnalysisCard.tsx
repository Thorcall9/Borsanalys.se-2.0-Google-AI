import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { VerdictBadge } from './index';
import { AnalysisData } from '../../types/analysis';
import { CONTENT_TYPE_BADGE_LABELS } from '../../hooks/useAnalysisFilters';
import { getAnalysisScore } from '../../lib/score';

interface AnalysisCardProps {
  analysis: AnalysisData;
  index: number;
  realTimeData?: {
    price?: number;
    change?: number;
    pe?: number;
    yield?: number;
  };
}

function ViewChangeBadge({ viewChange }: { viewChange: AnalysisData['viewChange'] }) {
  if (!viewChange || viewChange === 'new') return null;

  const config = {
    upgraded: { label: 'Uppgraderad', icon: ArrowUp, className: 'bg-primary/10 text-primary border-primary/20' },
    downgraded: { label: 'Nedgraderad', icon: ArrowDown, className: 'bg-red-500/10 text-red-400 border-red-500/20' },
    unchanged: { label: 'Oförändrad', icon: Minus, className: 'bg-muted text-muted-foreground border-border' },
  }[viewChange];

  if (!config) return null;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.className}`}>
      <Icon size={10} aria-hidden="true" />
      {config.label}
    </span>
  );
}

function ScoreMetric({ analysis, reportCommentary = false }: { analysis: AnalysisData; reportCommentary?: boolean }) {
  const score = getAnalysisScore(analysis);
  if (!score) return null;

  const percent = Math.round(score.percent);
  return (
    <div aria-label={`${reportCommentary ? 'Senaste poäng' : 'Poäng'} ${score.score} av ${score.maxScore}, motsvarande ${percent} procent`}>
      <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">
        {reportCommentary ? 'Senaste poäng' : 'Poäng'}
      </div>
      <div className="text-lg font-black text-foreground">
        {score.score}/{score.maxScore} · {percent} %
      </div>
    </div>
  );
}

export default function AnalysisCard({ analysis: a, index, realTimeData: rt }: AnalysisCardProps) {
  const isReportComment = a.contentType === 'report-commentary';

  // PE and yield display logic
  const rawPe = rt?.pe || a.pe;
  const displayPe = rawPe ? parseFloat(String(rawPe).replace(',', '.')).toFixed(2) : '-';
  const displayYield = rt?.yield !== undefined ? rt.yield : a.yield;

  const contentTypeLabel = CONTENT_TYPE_BADGE_LABELS[a.contentType];

  if (isReportComment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: (index % 6) * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Link
          to={`/analys/${a.slug}`}
          className="group block h-full bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                      {contentTypeLabel}
                    </span>
                    <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-[0.2em]">
                      {a.ticker}{a.reportPeriod ? ` · ${a.reportPeriod}` : ''} · {a.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {a.listTitle || a.title}
                  </h3>
                </div>
                <VerdictBadge verdict={a.recommendation} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                {a.reportSummary || a.summary}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-border/50">
              <div className="flex flex-wrap items-center gap-3">
                {a.viewChange && <ViewChangeBadge viewChange={a.viewChange} />}
                {a.upside != null && (
                  <span className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest">
                    Uppsida: ~{a.upside}%
                  </span>
                )}
                <ScoreMetric analysis={a} reportCommentary />
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/5">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/10 transition-colors duration-700" />
        </Link>
      </motion.div>
    );
  }

  // ─── Bolagsanalys-variant ───────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/analys/${a.slug}`}
        className="group block h-full bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/70 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full">
                    {contentTypeLabel}
                  </span>
                  <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-[0.2em]">
                    {a.ticker} · {a.market}
                  </div>
                  {a.date && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                        {a.date}
                      </div>
                    </>
                  )}
                </div>
                <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300 leading-tight">
                  {a.listTitle || a.title}
                </h3>
              </div>
              <VerdictBadge verdict={a.recommendation} />
            </div>
            <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 font-medium">
              {a.summary}
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-border/50 gap-6 sm:gap-0">
            <div className="flex gap-8 flex-wrap">
              <div>
                <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">P/E</div>
                <div className="text-lg font-black text-foreground">{displayPe}</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">Direktavk.</div>
                <div className="text-lg font-black text-foreground">
                  {typeof displayYield === 'number'
                    ? `${(displayYield * 100).toFixed(2)}%`
                    : displayYield?.includes('%')
                      ? displayYield
                      : `${(parseFloat(displayYield || '0') * 100).toFixed(2)}%`}
                </div>
              </div>
              {a.upside != null && (
                <div>
                  <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-1.5">Uppsida</div>
                  <div className="text-lg font-black text-primary">~{a.upside}%</div>
                </div>
              )}
              <ScoreMetric analysis={a} />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/5">
              <ArrowRight size={24} />
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-700" />
      </Link>
    </motion.div>
  );
}
