import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Zap, 
  Info,
  MapPin,
  Building2,
  PieChart,
  AlertCircle,
  CheckCircle2,
  Star 
} from 'lucide-react';
import AnalysisLayout from './AnalysisLayout';
import SectionHeader from './SectionHeader';
import MetricCard from './MetricCard';
import RatingBox from './RatingBox';
import Card from './Card';
import SwotGrid from './SwotGrid';
import ScenarioCards from './ScenarioCards';
import VerdictBox from './VerdictBox';
import ProgressBar from './ProgressBar';
import ChartCard from './ChartCard';
import NextStepsModule from './NextStepsModule';
import EditorialReadNext from './EditorialReadNext';
import SEO from '../SEO';
import { fetchWithCache, RapidAPIQuote } from '../../services/stockService';
import { AnalysisData } from '../../data/analyses';
import NordnetCTA from './NordnetCTA';
import AdUnit from './AdUnit';
import EditorialCallout from './EditorialCallout';
import { MicrosoftSidebarExtras } from './MicrosoftSidebarExtras';
import AnalysisDisclaimer from './AnalysisDisclaimer';

interface ComprehensiveAnalysisProps {
  data: AnalysisData;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
  nextAnalysis?: AnalysisData;
}

// Visual Trigger: A component to render geographical or segment distribution as a bar
const DistributionBar = ({ data, accentColor }: { data: string; accentColor: string }) => {
  const segments = useMemo(() => {
    // Regex to match "Country (XX%)" or "Country XX%" or similar patterns
    const regex = /([^(\d%]+)\s*(?:\()?\s*(\d+)\s*%(?:\))?/g;
    const matches = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
      matches.push({
        label: match[1].trim().replace(/^,\s*/, '').replace(/[:]$/, ''),
        value: parseInt(match[2], 10)
      });
    }
    return matches;
  }, [data]);

  if (segments.length === 0) return <p className="text-sm text-muted-foreground">{data}</p>;

  return (
    <div className="space-y-4">
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
        {segments.map((s, i) => {
          const colors = [accentColor, '#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#f43f5e'];
          const color = colors[i % colors.length];
          return (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.value}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        {segments.map((s, i) => {
          const colors = [accentColor, '#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#f43f5e'];
          const color = colors[i % colors.length];
          return (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">{s.label}</span>
              <span className="text-[10px] font-black text-foreground ml-auto">{s.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ComprehensiveAnalysis({ 
  data, 
  isInWatchlist, 
  isWatchlistLoading, 
  onToggleWatchlist,
  nextAnalysis
}: ComprehensiveAnalysisProps) {
  const ACCENT_COLOR = "#10B981"; // Emerald Green

  const analysisPrice = useMemo(() => {
    if (!data.price) return null;
    const cleanPrice = data.price.replace(/[^\d,.]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? null : parsed;
  }, [data.price]);

  const sections = [
    { id: 'overview', title: 'I. Företagsöversikt', number: 'I' },
    { id: 'strategy', title: 'II. Strategisk analys & Moat', number: 'II' },
    { id: 'financials', title: 'III. Finansiell analys', number: 'III' },
    { id: 'valuation', title: 'IV. Värdering & Jämförelse', number: 'IV' },
    { id: 'growth', title: 'V. Tillväxtmotorer & Triggers', number: 'V' },
    { id: 'risk', title: 'VI. Riskprofil', number: 'VI' },
    { id: 'management', title: 'VII. Analys av VD-ordet', number: 'VII' },
    { id: 'ai', title: 'VIII. AI-observationer', number: 'VIII' },
    { id: 'summary', title: 'IX. Investeringsbeslut', number: 'IX' },
    { id: 'scenarios', title: 'X. Scenarier', number: 'X' }
  ];

  const SCORE_LABELS: Record<string, string> = {
    affarsmodell: "I. Företagsöversikt",
    strategiskMoat: "II. Strategisk analys & Moat",
    finansiellKvalitet: "III. Finansiell analys",
    vardering: "IV. Värdering & Jämförelse",
    tillvaxtutsikter: "V. Tillväxtmotorer & Triggers",
    riskprofil: "VI. Riskprofil",
    vdAnalys: "VII. Analys av VD-ordet",
    aiObservationer: "VIII. AI-observationer"
  };

  const ScoreBadge = ({ score }: { score?: number }) => {
    if (score === undefined) return null;
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
        Betyg: {score}/5
      </div>
    );
  };

  return (
    <AnalysisLayout 
      ticker={data.ticker} 
      companyName={data.title} 
      stockSlug={data.slug}
      accentColor={ACCENT_COLOR}
      sections={sections}
      isInWatchlist={isInWatchlist}
      isWatchlistLoading={isWatchlistLoading}
      onToggleWatchlist={onToggleWatchlist}
      analysisPrice={analysisPrice || undefined}
      date={data.date}
      nextAnalysis={nextAnalysis}
      sidebarExtras={(data.slug?.toLowerCase() === 'microsoft' || data.ticker === 'MSFT') ? (
        <MicrosoftSidebarExtras 
          isInWatchlist={isInWatchlist} 
          isWatchlistLoading={isWatchlistLoading} 
          onToggleWatchlist={onToggleWatchlist} 
        />
      ) : undefined}
      hideDefaultWatchlist={data.slug?.toLowerCase() === 'microsoft' || data.ticker === 'MSFT'}
      compactSections={data.slug?.toLowerCase() === 'microsoft' || data.ticker === 'MSFT'}
      wideSidebar={data.slug?.toLowerCase() === 'microsoft' || data.ticker === 'MSFT'}
      hideSidebar={data.slug === 'nordea-bank-2026'}
    >
      <SEO 
        title={`${data.title} (${data.ticker}) - Analys`} 
        description={data.summary}
        ogType="article"
      />

      {/* Main Title Header */}
      <div className="mb-20 space-y-12">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.4em] flex flex-wrap items-center gap-x-2 gap-y-1 leading-relaxed">
            <Globe size={12} className="text-primary shrink-0" />
            <span>{data.market}</span>
            <span className="opacity-40">·</span>
            <span>{data.ticker}</span>
            <span className="opacity-40">·</span>
            <span>{data.sector}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            {data.title}
            {!data.title.includes('analys') && !data.title.includes('Analys') && (
              <span className="text-primary block mt-2">Strategisk Deep Dive</span>
            )}
          </h1>
        </div>

        {/* 1. Lead Narrative: Executive Summary or Investment Case */}
        <div className="max-w-4xl">
          {data.investmentCase ? (() => {
            const lines = data.investmentCase.split('\n');
            const points = [];
            let narrative = "";
            let scoreLine = "";
            let ratingLine = "";
            let mainTitle = "";

            lines.forEach((line, index) => {
              const trimmed = line.trim();
              if (index === 0 && !trimmed.startsWith('•')) {
                mainTitle = trimmed.replace('Vår bedömning:', '').trim();
              } else if (trimmed.startsWith('•')) {
                const content = trimmed.substring(1).trim();
                if (content.toLowerCase().includes('totalpoäng')) scoreLine = content.split(':')[1]?.trim();
                else if (content.toLowerCase().includes('rating')) ratingLine = content.split(':')[1]?.trim();
                else points.push(content);
              } else if (trimmed && !trimmed.includes('|')) {
                narrative += line + "\n";
              }
            });

            return (
              <div className="bg-primary/5 border border-primary/20 rounded-[3rem] p-10 md:p-14 mb-16 shadow-2xl shadow-primary/5 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                          <Target size={20} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary/70">Investeringscase</h2>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground max-w-2xl leading-[1.1]">
                        {mainTitle || data.recommendation}
                      </h3>
                    </div>

                    {(scoreLine || ratingLine) && (
                      <div className="flex items-center gap-6">
                        {scoreLine && (
                          <div className="flex flex-col items-center p-6 bg-primary/10 rounded-[2rem] border border-primary/20 min-w-[120px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Totalpoäng</span>
                            <span className="text-3xl font-black text-primary">{scoreLine}</span>
                          </div>
                        )}
                        {ratingLine && (
                          <div className="flex flex-col items-center p-6 bg-foreground/5 rounded-[2rem] border border-border min-w-[120px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Rating</span>
                            <span className="text-3xl font-black text-foreground">{ratingLine}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {points.map((p, i) => {
                      const [label, val] = p.split(':');
                      return (
                        <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all group/point">
                          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 group-hover/point:text-primary/70 transition-colors">{label}</div>
                          <div className="text-base font-black text-foreground">{val}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium whitespace-pre-line italic">
                      {narrative.trim()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })() : (
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-8 py-2">
              &quot;{data.summary}&quot;
            </p>
          )}
        </div>

        {/* 1b. Key Analysis Areas - Added at top for immediate overview */}
        {data.scores && (
          <div className="bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-primary rotate-12">
              <Star size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Börsanalys Kvalitetsbetyg</h2>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter">Analysens nyckelområden</h3>
                </div>
                {(data.aiDrivenData?.totaltPoang || Object.values(data.scores).reduce((a, b) => a + b, 0)) && (
                  <div className="flex items-center gap-4 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-black text-primary">
                      {data.aiDrivenData?.totaltPoang || Object.values(data.scores).reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest leading-tight opacity-70 italic">
                      av {data.aiDrivenData?.maxPoang || 40} <br /> möjliga poäng
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
                {Object.entries(data.scores).map(([key, score]) => (
                  <div key={key} className="space-y-3 group">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end gap-2">
                        <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-[0.1em] leading-tight">
                          {SCORE_LABELS[key] || key}
                        </span>
                        <span className="text-sm font-black text-foreground shrink-0">{score}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(score / 5) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full group-hover:brightness-110 transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <NordnetCTA variant="high" />

      {/* SECTION I: FÖRETAGSÖVERSIKT */}
      <section id="overview" className="scroll-mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.affarsmodell} />
        </div>
        
        {/* 2. Break the Bento-box: Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Narrative (70%) */}
          <div className="lg:col-span-8 space-y-10">
            {data.overviewPoints ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.overviewPoints.map((point, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{point.title}</div>
                    <div className="text-base text-foreground/90 leading-relaxed font-medium">
                      {point.body}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg prose-invert max-w-none text-foreground">
                <div className="leading-relaxed whitespace-pre-line text-lg font-medium opacity-90">
                  {data.marketOverview || data.businessModel || "Bolagsbeskrivning saknas."}
                </div>
              </div>
            )}

            {data.analystVerdict && (
              <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 border-l-4 border-l-primary">
                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Analytikerns bedömning</div>
                <p className="text-base text-foreground leading-relaxed font-medium italic">
                  {data.analystVerdict}
                </p>
              </div>
            )}

            {data.managementOverview && (
              <div className="bg-muted/30 rounded-[2rem] p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Ledning & Styrning</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-base italic">
                  {data.managementOverview}
                </p>
              </div>
            )}
          </div>

          {/* Quick Facts Sidebar (30%) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-black/10">
              <h3 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Info size={14} /> Snabbfakta
              </h3>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Analyspris</div>
                  <div className="text-2xl font-black text-foreground">{data.price}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Börsvärde</div>
                  <div className="text-xl font-black text-foreground">{data.marketCap || "N/A"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Anställda</div>
                  <div className="text-xl font-black text-foreground">{data.employees || "N/A"}</div>
                </div>
                {data.isin && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">ISIN</div>
                    <div className="text-sm font-black text-foreground uppercase tracking-tight">{data.isin}</div>
                  </div>
                )}
                {data.sharesCount && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Antal aktier</div>
                    <div className="text-sm font-black text-foreground uppercase tracking-tight">{data.sharesCount}</div>
                  </div>
                )}
                {data.author && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Analytiker</div>
                    <div className="text-sm font-black text-foreground uppercase tracking-tight">{data.author}</div>
                  </div>
                )}
                
                {data.geography && (
                  <div className="pt-6 border-t border-border mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={12} className="text-primary" />
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Geografisk Fördelning</div>
                    </div>
                    {/* 3. Visual Trigger: Distribution Bar */}
                    <DistributionBar data={data.geography} accentColor={ACCENT_COLOR} />
                  </div>
                )}

                {data.ownershipStructure && (
                  <div className="pt-6 border-t border-border mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 size={12} className="text-primary" />
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Huvudägare</div>
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
                      {data.ownershipStructure}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {data.scores && (
              <RatingBox 
                rating={data.scores.affarsmodell} 
                title="Affärsmodell Score"
                description="Bedömning av affärsmodellens styrka och ledningens track record." 
                accentColor={ACCENT_COLOR}
              />
            )}
          </div>
        </div>
      </section>

      {/* SECTION II: STRATEGISK ANALYS & MOAT */}
      <section id="strategy" className="scroll-mt-24 mt-20">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.strategiskMoat} />
        </div>
        
        <div className="mb-12 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
            <div className="lg:col-span-12">
              <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 md:p-12 border-l-4 border-l-primary">
                <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                  {data.strategyMoat || data.investmentCase || "Bolagets strategiska position och varför det är en intressant investering."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Moat-dimensioner</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data.competitiveAdvantages || data.advantages || []).map((adv, i) => {
                const parts = adv.split(':');
                const title = parts[0];
                const rest = parts[1] || '';
                const starsMatch = rest.match(/\(★+\s*☆*\)/);
                const stars = starsMatch ? starsMatch[0].replace(/[()]/g, '') : '';
                const desc = rest.replace(/\(★+\s*☆*\)/, '').trim();

                return (
                  <div key={i} className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all hover:shadow-xl shadow-black/5 group">
                    <div className="text-sm font-black text-foreground mb-2 group-hover:text-primary transition-colors">{title}</div>
                    {stars && <div className="text-primary text-xs mb-4 tracking-widest">{stars}</div>}
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <SwotGrid data={{
          strengths: data.strengths || [],
          weaknesses: data.weaknesses || [],
          opportunities: data.opportunities || [],
          threats: data.threats || []
        }} />

        {data.scores && (
          <div className="mt-10">
            <RatingBox 
              rating={data.scores.strategiskMoat} 
              description="Vallgravens styrka och bolagets strategiska positionering i förhållande till marknadstrender." 
            />
          </div>
        )}

        {/* RELATED ANALYSIS CALLOUT */}
        {data.relatedAnalysis && (
          <div className="mt-16">
            <EditorialCallout {...data.relatedAnalysis} />
          </div>
        )}
      </section>

      {/* SECTION III: FINANSIELL ANALYS */}
      <section id="financials" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.finansiellKvalitet} />
        </div>
        
        <div className="space-y-12 mb-12 mt-6">
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 md:p-12 border-l-4 border-l-primary">
            <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
              {data.financialAnalysis || "Analys av bolagets historiska och förväntade finansiella prestation."}
            </p>
          </div>

          {data.financialTimeline && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="text-xl font-black tracking-tight text-foreground/80">Historisk utveckling</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.financialTimeline.map((item, ii) => (
                  <div key={ii} className="bg-card/30 border border-border/50 rounded-[2rem] p-8 hover:border-primary/20 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-primary">{item.year}</span>
                      <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">{item.highlight}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.financialTables && (
            <div className="space-y-24">
              {data.financialTables.map((table, ti) => (
                <div key={ti} className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                      <div className="w-2.5 h-10 bg-primary rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
                      {table.title}
                    </h3>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                    <div className="overflow-x-auto premium-scrollbar">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/50">
                            {table.headers.map((header, hi) => (
                              <th 
                                key={hi} 
                                className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {table.rows.map((row, ri) => (
                            <tr 
                              key={ri} 
                              className="hover:bg-primary/[0.03] transition-all duration-300 group/row"
                            >
                              {row.map((cell, ci) => {
                                const cellStr = String(cell);
                                const isPositive = cellStr.includes('+') || (ci > 0 && !cellStr.includes('-') && (cellStr.includes('%') || cellStr.includes('pp')));
                                const isNegative = cellStr.includes('-');
                                const isNeutral = cellStr.toLowerCase().includes('stabilt') || cellStr.toLowerCase().includes('god');
                                
                                return (
                                  <td 
                                    key={ci} 
                                    className={`
                                      px-8 py-6 text-sm transition-all duration-300
                                      ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10' : 'font-medium text-right tabular-nums'}
                                    `}
                                  >
                                    <span className={`
                                      ${ci === 0 ? '' : 'px-3 py-1 rounded-lg transition-colors'}
                                      ${isPositive && ci > 0 ? 'text-emerald-500 bg-emerald-500/5 group-hover/row:bg-emerald-500/10' : ''}
                                      ${isNegative && ci > 0 ? 'text-rose-500 bg-rose-500/5 group-hover/row:bg-rose-500/10' : ''}
                                      ${isNeutral && ci > 0 ? 'text-amber-500 bg-amber-500/5 group-hover/row:bg-amber-500/10' : ''}
                                      ${!isPositive && !isNegative && !isNeutral && ci > 0 ? 'text-muted-foreground group-hover/row:text-foreground' : ''}
                                    `}>
                                      {cell}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {table.footer && (
                    <div className="mt-6 px-8 py-6 bg-primary/5 border border-primary/10 rounded-3xl">
                      <div className="flex items-start gap-3">
                        <Info size={14} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                          {table.footer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-10">
          <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col gap-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">P/E-tal</span>
            <span className="text-3xl font-black text-foreground">{data.pe ? parseFloat(String(data.pe).replace(',', '.')).toFixed(2) : '-'}</span>
          </div>
          <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col gap-2 text-emerald-500 bg-emerald-500/5">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Direktavkastning</span>
            <span className="text-3xl font-black">
              {typeof data.yield === 'number' 
                    ? `${(data.yield * 100).toFixed(2)}%` 
                    : (data.yield?.includes('%') ? data.yield : `${(parseFloat(data.yield || '0') * 100).toFixed(2)}%`)}
            </span>
          </div>
          {data.discount && (
            <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col gap-2 shadow-xl shadow-primary/5 border-primary/20">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Substansrabatt</span>
              <span className="text-3xl font-black text-primary">{data.discount}</span>
            </div>
          )}
          <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col gap-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Börs / Lista</span>
            <span className="text-sm font-black text-foreground uppercase truncate">{data.market}</span>
          </div>
        </div>

        {data.financialQualityWhyNot5 && (
          <div className="mt-12 bg-amber-500/5 border border-amber-500/20 rounded-[2rem] p-10 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <AlertCircle size={14} /> Varför inte 5/5?
            </h4>
            <p className="text-lg text-foreground/90 leading-relaxed font-medium italic relative z-10">
              {data.financialQualityWhyNot5}
            </p>
          </div>
        )}

        {data.scores && (
          <div className="mt-10">
            <RatingBox 
              rating={data.scores.finansiellKvalitet} 
              description={data.financialMotivation || "Finansiell hälsa, lönsamhetstrender och kapitalallokering samt utdelningskapacitet."} 
            />
          </div>
        )}
      </section>



      {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
      <section id="valuation" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.vardering} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-7">
            <Card title="VÄRDERINGSANALYS" accentColor={ACCENT_COLOR}>
              <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                {data.valuation || "Bedömning av bolagets nuvarande värdering i förhållande till historik och konkurrenter."}
              </p>
            </Card>
          </div>
          <div className="lg:col-span-5 bg-primary/10 rounded-[2rem] p-10 border border-primary/20 flex flex-col justify-center gap-4 text-center">
             <div className="text-[10px] font-black text-primary uppercase tracking-widest">Vår bedömning</div>
             <div className="text-4xl font-black text-foreground">{data.recommendation}</div>
             <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Rimligt värde (Base Case): {data.scenarios?.find(s => s.type === 'base')?.value || "N/A"}</p>
          </div>
        </div>

        {data.valuationTables && (
          <div className="space-y-24 mt-16">
            {data.valuationTables.map((table, ti) => (
              <div key={ti} className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-primary rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
                    {table.title}
                  </h3>
                </div>
                
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                  <div className="overflow-x-auto premium-scrollbar">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/50">
                          {table.headers.map((header, hi) => (
                            <th 
                              key={hi} 
                              className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20">
                        {table.rows.map((row, ri) => (
                          <tr 
                            key={ri} 
                            className="hover:bg-primary/[0.03] transition-all duration-300 group/row"
                          >
                            {row.map((cell, ci) => {
                              const cellStr = String(cell);
                              const isPositive = cellStr.includes('+') || (ci > 0 && !cellStr.includes('-') && (cellStr.includes('%') || cellStr.includes('pp')));
                              const isNegative = cellStr.includes('-') || cellStr === 'Neg';
                              const isNeutral = cellStr.toLowerCase().includes('stabilt') || cellStr.toLowerCase().includes('rimlig') || cellStr.toLowerCase().includes('god');
                              
                              return (
                                <td 
                                  key={ci} 
                                  className={`
                                    px-8 py-6 text-sm transition-all duration-300
                                    ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10' : 'font-medium text-right tabular-nums'}
                                  `}
                                >
                                  <span className={`
                                    ${ci === 0 ? '' : 'px-3 py-1 rounded-lg transition-colors'}
                                    ${isPositive && ci > 0 ? 'text-emerald-500 bg-emerald-500/5 group-hover/row:bg-emerald-500/10' : ''}
                                    ${isNegative && ci > 0 ? 'text-rose-500 bg-rose-500/5 group-hover/row:bg-rose-500/10' : ''}
                                    ${isNeutral && ci > 0 ? 'text-amber-500 bg-amber-500/5 group-hover/row:bg-amber-500/10' : ''}
                                    ${!isPositive && !isNegative && !isNeutral && ci > 0 ? 'text-muted-foreground group-hover/row:text-foreground' : ''}
                                  `}>
                                    {cell}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {table.footer && (
                  <div className="mt-6 px-8 py-6 bg-primary/5 border border-primary/10 rounded-3xl">
                    <div className="flex items-start gap-3">
                      <Info size={14} className="text-primary mt-0.5 shrink-0" />
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                        {table.footer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.scores && (
          <div className="mt-12">
            <RatingBox 
              rating={data.scores.vardering} 
              description={data.valuationMotivation || "Huruvida aktien är köpvärd vid nuvarande kursnivåer baserat på multiplar och kassaflöde."} 
            />
          </div>
        )}
      </section>

      {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
      <section id="growth" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.tillvaxtutsikter} />
        </div>
        
        <div className="mb-16">
          <p className="text-xl text-foreground leading-relaxed font-medium mb-10 max-w-3xl">
            {data.growth}
          </p>
          
          {data.growthPoints && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {data.growthPoints.map((point, pi) => (
                <div key={pi} className="bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/20 transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
                   <h4 className="text-xl font-black text-foreground mb-4 relative z-10">{point.title}</h4>
                   <p className="text-muted-foreground leading-relaxed font-medium relative z-10">{point.body}</p>
                </div>
              ))}
            </div>
          )}

          {data.growthTables && (
            <div className="space-y-24">
              {data.growthTables.map((table, ti) => (
                <div key={ti} className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                      <div className="w-2.5 h-10 bg-primary rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
                      {table.title}
                    </h3>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                    <div className="overflow-x-auto premium-scrollbar">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/50">
                            {table.headers.map((header, hi) => (
                              <th 
                                key={hi} 
                                className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {table.rows.map((row, ri) => (
                            <tr 
                              key={ri} 
                              className="hover:bg-primary/[0.03] transition-all duration-300 group/row"
                            >
                              {row.map((cell, ci) => (
                                <td 
                                  key={ci} 
                                  className={`
                                    px-8 py-6 text-sm transition-all duration-300
                                    ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10' : 'font-medium text-right tabular-nums text-muted-foreground group-hover/row:text-foreground'}
                                  `}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {table.footer && (
                    <div className="mt-6 px-8 py-6 bg-primary/5 border border-primary/10 rounded-3xl">
                      <div className="flex items-start gap-3">
                        <Info size={14} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                          {table.footer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {data.scores && (
          <div className="mt-12">
            <RatingBox 
              rating={data.scores.tillvaxtutsikter} 
              description={data.growthMotivation || "Potentialen för långsiktig värdetillväxt genom expansion, innovation och katalysatorer."} 
            />
          </div>
        )}
      </section>


      {/* SECTION VI: RISKPROFIL */}
      <section id="risk" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.riskprofil} />
        </div>
        <div className="mb-16">
          <p className="text-xl text-foreground leading-relaxed font-medium mb-10 max-w-3xl whitespace-pre-line">
            {data.riskAnalysis}
          </p>

          {data.riskTables && (
            <div className="space-y-24">
              {data.riskTables.map((table, ti) => (
                <div key={ti} className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                      <div className="w-2.5 h-10 bg-rose-500 rounded-full shadow-[0_0_25px_rgba(244,63,94,0.5)]" />
                      {table.title}
                    </h3>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                    <div className="overflow-x-auto premium-scrollbar">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/50">
                            {table.headers.map((header, hi) => (
                              <th 
                                key={hi} 
                                className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {table.rows.map((row, ri) => (
                            <tr 
                              key={ri} 
                              className="hover:bg-rose-500/[0.03] transition-all duration-300 group/row"
                            >
                              {row.map((cell, ci) => {
                                const cellStr = String(cell);
                                const isHigh = cellStr.includes('Hög') || cellStr.includes('relevans');
                                const isMed = cellStr.includes('Medel');
                                
                                return (
                                  <td 
                                    key={ci} 
                                    className={`
                                      px-8 py-6 text-sm transition-all duration-300
                                      ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10' : 'font-medium text-right tabular-nums text-muted-foreground group-hover/row:text-foreground'}
                                    `}
                                  >
                                    <span className={`
                                      ${ci === 1 ? 'px-3 py-1 rounded-lg' : ''}
                                      ${isHigh && ci === 1 ? 'text-rose-500 bg-rose-500/5' : ''}
                                      ${isMed && ci === 1 ? 'text-amber-500 bg-amber-500/5' : ''}
                                    `}>
                                      {cell}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {data.scores && (
          <div className="mt-12">
            <RatingBox 
              rating={data.scores.riskprofil} 
              description={data.riskMotivation || "Bedömning av bolagets operativa, finansiella och marknadsrelaterade risker."} 
            />
          </div>
        )}

        {data.devilsAdvocateTables && (
          <div className="mt-24 space-y-24">
            {data.devilsAdvocateTables.map((table, ti) => (
              <div key={ti} className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-amber-500 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.5)]" />
                    {table.title}
                  </h3>
                </div>
                
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                  <div className="overflow-x-auto premium-scrollbar">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/50">
                          {table.headers.map((header, hi) => (
                            <th 
                              key={hi} 
                              className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-left'}`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20">
                        {table.rows.map((row, ri) => (
                          <tr 
                            key={ri} 
                            className="hover:bg-amber-500/[0.03] transition-all duration-300 group/row"
                          >
                            {row.map((cell, ci) => (
                              <td 
                                key={ci} 
                                className={`
                                  px-8 py-6 text-sm transition-all duration-300
                                  ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10' : 'font-medium text-left text-muted-foreground group-hover/row:text-foreground'}
                                `}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {table.footer && (
                    <div className="mt-6 px-8 py-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
                      <div className="flex items-start gap-3">
                        <Info size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                          {table.footer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>



      {/* SECTION VII: ANALYS AV VD-ORDET */}
      <section id="management" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VII" title="ANALYS AV VD-ORDET" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.vdAnalys} />
        </div>
        
        <div className="mb-16">
          <p className="text-xl text-foreground leading-relaxed font-medium mb-10 max-w-3xl whitespace-pre-line">
            {data.managementAnalysis}
          </p>

          {data.managementTables && (
            <div className="space-y-24">
              {data.managementTables.map((table, ti) => (
                <div key={ti} className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                      <div className="w-2.5 h-10 bg-primary rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
                      {table.title}
                    </h3>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                    <div className="overflow-x-auto premium-scrollbar">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/50">
                            {table.headers.map((header, hi) => (
                              <th 
                                key={hi} 
                                className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {table.rows.map((row, ri) => (
                            <tr 
                              key={ri} 
                              className="hover:bg-primary/[0.03] transition-all duration-300 group/row"
                            >
                              {row.map((cell, ci) => (
                                <td 
                                  key={ci} 
                                  className={`
                                    px-8 py-6 text-sm transition-all duration-300
                                    ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10 w-1/3' : 'font-medium text-left text-muted-foreground group-hover/row:text-foreground'}
                                  `}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {table.footer && (
                    <div className="mt-6 px-8 py-6 bg-primary/5 border border-primary/10 rounded-3xl">
                      <div className="flex items-start gap-3">
                        <Info size={14} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                          {table.footer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {data.scores && (
          <div className="mt-12">
            <RatingBox 
              rating={data.scores.vdAnalys} 
              description={data.managementMotivation || "Bedömning av ledningens kommunikation, transparens och strategiska historik."} 
            />
          </div>
        )}
      </section>

      <section className="mt-24">
        <Card title="KOMPLETTERANDE OBSERVATION: HÅLLBARHET & MAKRO" accentColor={ACCENT_COLOR}>
          <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
            {data.esg}
          </p>
        </Card>
      </section>

      {/* SECTION VIII: AI-OBSERVATIONER */}
      <section id="ai" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.aiObservationer} />
        </div>
        
        <div className="mb-16">
          <p className="text-xl text-foreground leading-relaxed font-medium mb-10 max-w-3xl whitespace-pre-line italic opacity-80">
            {data.aiSummary}
          </p>

          {data.aiTables && (
            <div className="space-y-24">
              {data.aiTables.map((table, ti) => (
                <div key={ti} className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
                      <div className="w-2.5 h-10 bg-primary rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
                      {table.title}
                    </h3>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 group/table">
                    <div className="overflow-x-auto premium-scrollbar">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/50">
                            {table.headers.map((header, hi) => (
                              <th 
                                key={hi} 
                                className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-10' : 'text-right'}`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {table.rows.map((row, ri) => (
                            <tr 
                              key={ri} 
                              className="hover:bg-primary/[0.03] transition-all duration-300 group/row"
                            >
                              {row.map((cell, ci) => (
                                <td 
                                  key={ci} 
                                  className={`
                                    px-8 py-6 text-sm transition-all duration-300
                                    ${ci === 0 ? 'font-black text-foreground/90 text-left pl-10 w-1/4' : ci === 1 ? 'font-bold text-foreground text-right w-1/4' : 'font-medium text-right text-muted-foreground group-hover/row:text-foreground'}
                                  `}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {table.footer && (
                    <div className="mt-6 px-8 py-6 bg-primary/5 border border-primary/10 rounded-3xl">
                      <div className="flex items-start gap-3">
                        <Info size={14} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                          {table.footer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {data.scores && (
          <div className="mt-12">
            <RatingBox 
              rating={data.scores.aiObservationer} 
              description={data.aiMotivation || "Datadrivna signaler baserade på sentiment, insidertransaktioner och analytikerkonsensus."} 
            />
          </div>
        )}
      </section>

      {/* SECTION IX: SAMMANFATTNING & INVESTERINGSBESLUT */}
      <section id="summary" className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="IX" title="INVESTERINGSBESLUT" accentColor={ACCENT_COLOR} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-6 space-y-12">
            
            {/* QnA Section */}
            {data.summaryQnA && data.summaryQnA.length > 0 && (
              <div className="space-y-6">
                {data.summaryQnA.map((qna, i) => (
                  <div key={i} className="bg-card/50 border border-border/50 rounded-3xl p-6 shadow-sm">
                    <h4 className="text-lg font-black text-foreground tracking-tight mb-3 flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm shrink-0">Q</div>
                      {qna.question}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed pl-9">
                      {qna.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Conclusion */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                Slutsats
              </h3>
              <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line bg-muted/20 p-6 rounded-3xl border border-border/50">
                {data.conclusion}
              </p>
            </div>
            
            {/* Watch Table */}
            {data.watchTable && data.watchTable.length > 0 && (
              <div className="space-y-6">
                {data.watchTable.map((table, ti) => (
                  <div key={ti} className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-3">
                        <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.5)]" />
                        {table.title}
                      </h3>
                    </div>
                    
                    <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-lg group/table">
                      <div className="overflow-x-auto premium-scrollbar">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/30 border-b border-border/50">
                              {table.headers.map((header, hi) => (
                                <th 
                                  key={hi} 
                                  className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ${hi === 0 ? 'text-left pl-6' : 'text-left'}`}
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/20">
                            {table.rows.map((row, ri) => (
                              <tr 
                                key={ri} 
                                className="hover:bg-amber-500/[0.03] transition-all duration-300 group/row"
                              >
                                {row.map((cell, ci) => (
                                  <td 
                                    key={ci} 
                                    className={`
                                      px-6 py-4 text-sm transition-all duration-300
                                      ${ci === 0 ? 'font-bold text-foreground/90 text-left pl-6 w-1/3' : 'font-medium text-left text-muted-foreground group-hover/row:text-foreground'}
                                    `}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {table.footer && (
                      <div className="mt-6 px-8 py-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
                        <div className="flex items-start gap-3">
                          <Info size={14} className="text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                            {table.footer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Total Score & Rating */}
            {data.totalScore && data.rating && (
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Totalpoäng</div>
                   <div className="text-4xl font-black text-foreground tracking-tighter">{data.totalScore}</div>
                </div>
                <div className="flex-1 bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Rating</div>
                   <div className="text-4xl font-black text-foreground tracking-tighter">{data.rating}</div>
                </div>
              </div>
            )}

          </div>

          <div className="lg:col-span-6 relative">
            <div className="sticky top-24">
              <VerdictBox 
                verdict={data.recommendation || "BEVAKA"} 
                target={data.targetPrice || (data.scenarios?.find(s => s.type === 'base')?.value || "N/A")} 
                description={data.motivation || data.summary} 
                date={data.date || new Date().toISOString().split('T')[0]}
                accentColor={ACCENT_COLOR}
                buyZone={data.buyZone}
              />
            </div>
          </div>
        </div>
      </section>


      {/* NEXT STEPS MODULE (REDACTIONAL GUIDANCE) */}
      {data.nextSteps && (
        <EditorialReadNext recommendations={data.nextSteps} />
      )}

      {/* AD: middle-article – max engagemang vid IX→X */}
      <AdUnit variant="middle-article" />

      {/* SECTION X: SCENARIER & MÅLPRIS */}
      <section id="scenarios" className="scroll-mt-24 mt-24 mb-32">
        <div className="mb-10">
          <SectionHeader number="X" title="SCENARIER & RIMLIGT VÄRDE" accentColor={ACCENT_COLOR} />
        </div>
        <div className="mt-8">
          <ScenarioCards scenarios={data.scenarios.map(s => ({
            type: s.type,
            icon: s.type === 'bull' ? '🚀' : s.type === 'base' ? '📊' : '📉',
            title: s.label.toUpperCase(),
            probability: s.probability || (s.type === 'base' ? '50%' : '25%'),
            price: s.value,
            change: s.change,
            description: s.description || (s.type === 'bull' ? "Optimistiskt scenario där tillväxten accelererar och multiplar expanderar." : s.type === 'base' ? "Mest troliga utvecklingen baserat på nuvarande trender och estimat." : "Defensivt scenario vid sämre konjunktur eller specifika bakslag.")
          }))} />
        </div>
      </section>

      <NordnetCTA variant="low" />

      <AnalysisDisclaimer className="mt-16" />

      {/* Mobile-only Extras (Relocated from sidebar) */}
      <div className="lg:hidden">
        {(data.slug?.toLowerCase() === 'microsoft' || data.ticker === 'MSFT') && (
          <MicrosoftSidebarExtras 
            isInWatchlist={isInWatchlist} 
            isWatchlistLoading={isWatchlistLoading} 
            onToggleWatchlist={onToggleWatchlist}
            isMobile
          />
        )}
      </div>
    </AnalysisLayout>
  );
}
