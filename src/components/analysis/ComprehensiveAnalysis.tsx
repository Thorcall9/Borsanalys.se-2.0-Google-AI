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
import SEO from '../SEO';
import { fetchWithCache, RapidAPIQuote } from '../../services/stockService';
import { AnalysisData } from '../../data/analyses';
import AdUnit from '../AdUnit';
import EditorialCallout from './EditorialCallout';

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
        {segments.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.value}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ 
              backgroundColor: i === 0 ? accentColor : `rgba(0,0,0,${0.4 - i * 0.1})`,
              opacity: 1 - (i * 0.2)
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: i === 0 ? accentColor : `rgba(0,0,0,${0.4 - i * 0.1})` }} />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">{s.label}</span>
            <span className="text-[10px] font-black text-foreground ml-auto">{s.value}%</span>
          </div>
        ))}
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
    { id: 'esg', title: 'VII. ESG & Makro', number: 'VII' },
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
    esgMakro: "VII. ESG & Makro",
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
    >
      <SEO 
        title={`${data.title} (${data.ticker}) - Analys`} 
        description={data.summary}
        ogType="article"
      />

      {/* Main Title Header */}
      <div className="mb-20 space-y-12">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] flex items-center gap-2">
            <Globe size={12} className="text-primary" />
            {data.market} · {data.ticker} · {data.sector}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            {data.title.includes('Analys') ? data.title : `${data.title}`}
            <span className="text-primary block mt-2">Strategisk Deep Dive</span>
          </h1>
        </div>

        {/* 1. Lead Narrative: Executive Summary */}
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-8 py-2">
            &quot;{data.summary}&quot;
          </p>
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

      {/* SECTION I: FÖRETAGSÖVERSIKT */}
      <section id="overview" className="scroll-mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.affarsmodell} />
        </div>
        
        {/* 2. Break the Bento-box: Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Narrative (70%) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose prose-lg prose-invert max-w-none text-foreground">
              <div className="leading-relaxed whitespace-pre-line text-lg font-medium opacity-90">
                {data.marketOverview || data.businessModel || "Bolagsbeskrivning saknas."}
              </div>
            </div>

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
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Börskurs</div>
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

      <AdUnit slot="7332946752" />

      {/* SECTION II: STRATEGISK ANALYS & MOAT */}
      <section id="strategy" className="scroll-mt-24 mt-20">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.strategiskMoat} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 mt-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card title="INVESTMENT CASE" accentColor={ACCENT_COLOR} className="flex-1">
              <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                {data.investmentCase || "Bolagets strategiska position och varför det är en intressant investering."}
              </p>
            </Card>
          </div>
          <div className="lg:col-span-4">
            <Card title="KONKURRENSFÖRDELAR" accentColor={ACCENT_COLOR} className="h-full">
              <ul className="space-y-4 pt-2">
                {(data.competitiveAdvantages || data.advantages || []).map((adv, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Zap size={10} />
                    </div> 
                    {adv}
                  </li>
                ))}
              </ul>
            </Card>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-12">
            <Card title="FINANSIELL GENOMGÅNG" accentColor={ACCENT_COLOR} className="h-full">
              <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                {data.financialAnalysis || "Analys av bolagets historiska och förväntade finansiella prestation."}
              </p>
            </Card>
          </div>
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

        {data.scores && (
          <RatingBox 
            rating={data.scores.finansiellKvalitet} 
            description="Finansiell hälsa, lönsamhetstrender och kapitalallokering samt utdelningskapacitet." 
          />
        )}
      </section>

      <AdUnit slot="6432013761" className="my-16" />

      {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
      <section id="valuation" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.vardering} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-8">
            <Card title="VÄRDERINGSANALYS" accentColor={ACCENT_COLOR}>
              <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                {data.valuation || "Bedömning av bolagets nuvarande värdering i förhållande till historik och konkurrenter."}
              </p>
            </Card>
          </div>
          <div className="lg:col-span-4 bg-primary/10 rounded-[2rem] p-10 border border-primary/20 flex flex-col justify-center gap-4 text-center">
             <div className="text-[10px] font-black text-primary uppercase tracking-widest">Vår bedömning</div>
             <div className="text-4xl font-black text-foreground">{data.recommendation}</div>
             <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Målkurs (Base Case): {data.scenarios?.find(s => s.type === 'base')?.value || "N/A"}</p>
          </div>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.vardering} 
            description="Huruvida aktien är köpvärd vid nuvarande kursnivåer baserat på multiplar och kassaflöde." 
          />
        )}
      </section>

      {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
      <section id="growth" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.tillvaxtutsikter} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-12">
            <Card title="FRAMTIDSPOTENTIAL" accentColor={ACCENT_COLOR}>
              <div className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                {data.growth || "De viktigaste drivkrafterna för bolagets framtida tillväxt."}
              </div>
            </Card>
          </div>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.tillvaxtutsikter} 
            description="Potentialen för långsiktig värdetillväxt genom expansion, innovation och katalysatorer." 
          />
        )}
      </section>


      {/* SECTION VI: RISKPROFIL */}
      <section id="risk" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.riskprofil} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-8">
            <Card title="RISKANALYS" accentColor={ACCENT_COLOR} className="h-full">
              <ul className="space-y-4 pt-2">
                {(data.risks || []).map((risk, i) => (
                  <li key={i} className="text-base text-foreground flex gap-4 font-medium opacity-90">
                    <div className="w-6 h-6 rounded-lg bg-danger/10 flex items-center justify-center text-danger flex-shrink-0">
                      <AlertCircle size={14} />
                    </div> 
                    {risk}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            {data.ukgcRiskDeepDive && (
              <div className="bg-danger/5 border border-danger/10 rounded-[2rem] p-8">
                <h3 className="text-[10px] font-black text-danger uppercase tracking-widest mb-4 flex items-center gap-2"><AlertCircle size={12} /> Regulatorisk Risk</h3>
                <p className="text-sm leading-relaxed text-muted-foreground italic font-medium">
                  {data.ukgcRiskDeepDive}
                </p>
              </div>
            )}
            <div className="flex-1 bg-muted/30 rounded-[2rem] p-8 border border-border/50 flex flex-col justify-center items-center text-center">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Risknivå</div>
              <div className="text-4xl font-black text-foreground">{data.scores?.riskprofil}/5</div>
              <p className="text-[10px] font-black text-muted-foreground uppercase mt-2 tracking-widest">
                {data.scores?.riskprofil && data.scores.riskprofil >= 4 ? "Låg Risk" : data.scores?.riskprofil && data.scores.riskprofil >= 3 ? "Medelhög Risk" : "Hög Risk"}
              </p>
            </div>
          </div>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.riskprofil} 
            description="Bedömning av bolagsspecifika och makroekonomiska risker. Inverterad skala: 5 = Låg risk, 1 = Hög risk." 
          />
        )}
      </section>

      {/* SECTION VII: ESG & MAKRO */}
      <section id="esg" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VII" title="ESG & MAKRO" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.esgMakro} />
        </div>
        
        <Card title="ESG & MAKROANALYS" accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
            {data.esg || "Hållbarhetsarbete och makroekonomisk påverkan."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.esgMakro} 
            description="Bolagets motståndskraft mot makrofaktorer och dess arbete inom miljö och socialt ansvar." 
          />
        )}
      </section>

      {/* SECTION VIII: AI-OBSERVATIONER */}
      <section id="ai" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.aiObservationer} />
        </div>
        
        <Card accentColor={ACCENT_COLOR} className="mb-8 mt-6 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <Zap size={300} />
          </div>
          <div className="relative z-10 flex gap-6">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
               <Zap size={24} />
             </div>
             <p className="text-xl md:text-2xl text-foreground font-serif italic leading-relaxed">
               &quot;{data.aiObservations || "AI-driven analys av sentiment och mönster indikerar en stabil position."}&quot;
             </p>
          </div>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.aiObservationer} 
            description="AI-genererad insikt baserad på sentimentanalys och dolda mönster i data." 
          />
        )}
      </section>

      {/* SECTION IX: SAMMANFATTNING & INVESTERINGSBESLUT */}
      <section id="summary" className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="IX" title="INVESTERINGSBESLUT" accentColor={ACCENT_COLOR} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8 mt-6">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-black tracking-tight">Slutsats</h3>
            <p className="text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
              {data.conclusion}
            </p>
            
            <div className="flex items-center gap-4 text-emerald-500 bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/20 w-fit">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div className="font-black text-2xl uppercase tracking-tighter">Rekommendation: {data.recommendation}</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VerdictBox 
              verdict={data.recommendation} 
              target={data.scenarios?.find(s => s.type === 'base')?.value || "N/A"} 
              description={data.motivation || data.summary} 
              date={data.date || new Date().toISOString().split('T')[0]}
              accentColor={ACCENT_COLOR}
            />
          </div>
        </div>
      </section>


      {/* SECTION X: SCENARIER & MÅLPRIS */}
      <section id="scenarios" className="scroll-mt-24 mt-24 mb-32">
        <div className="mb-10">
          <SectionHeader number="X" title="SCENARIER & MÅLPRIS" accentColor={ACCENT_COLOR} />
        </div>
        <div className="mt-8">
          <ScenarioCards scenarios={data.scenarios.map(s => ({
            type: s.type,
            icon: s.type === 'bull' ? '🚀' : s.type === 'base' ? '📊' : '📉',
            title: s.label.toUpperCase(),
            probability: s.type === 'base' ? '50%' : '25%',
            price: s.value,
            change: s.change,
            description: s.description || (s.type === 'bull' ? "Optimistiskt scenario där tillväxten accelererar och multiplar expanderar." : s.type === 'base' ? "Mest troliga utvecklingen baserat på nuvarande trender och estimat." : "Defensivt scenario vid sämre konjunktur eller specifika bakslag.")
          }))} />
        </div>
      </section>
    </AnalysisLayout>
  );
}
