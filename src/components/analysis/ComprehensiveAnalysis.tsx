import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
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
import { AnalysisData } from '../../data/analyses';
import { fetchWithCache, RapidAPIQuote } from '../../services/stockService';

interface ComprehensiveAnalysisProps {
  data: AnalysisData;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
}

export default function ComprehensiveAnalysis({ 
  data, 
  isInWatchlist, 
  isWatchlistLoading, 
  onToggleWatchlist 
}: ComprehensiveAnalysisProps) {
  const ACCENT_COLOR = "#10B981"; // Emerald Green
  // const [liveData, setLiveData] = useState<RapidAPIQuote | null>(null);

  /*
  useEffect(() => {
    if (data.ticker) {
      fetchWithCache(data.ticker).then(setLiveData);
    }
  }, [data.ticker]);
  */

  const analysisPrice = useMemo(() => {
    if (!data.price) return null;
    const cleanPrice = data.price.replace(/[^\d,.]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? null : parsed;
  }, [data.price]);

  const priceStats = useMemo(() => {
    if (!analysisPrice) return null;
    // const currentPrice = liveData.regularMarketPrice;
    // const diff = currentPrice - analysisPrice;
    // const percent = (diff / analysisPrice) * 100;
    return null;
  }, [analysisPrice]);

  const sections = [
    { id: 'overview', title: 'I. Företagsöversikt' },
    { id: 'strategy', title: 'II. Strategisk analys & Moat' },
    { id: 'financials', title: 'III. Finansiell analys' },
    { id: 'valuation', title: 'IV. Värdering & Jämförelse' },
    { id: 'growth', title: 'V. Tillväxtmotorer & Triggers' },
    { id: 'risk', title: 'VI. Riskprofil' },
    { id: 'esg', title: 'VII. ESG & Makro' },
    { id: 'ai', title: 'VIII. AI-observationer' },
    { id: 'summary', title: 'IX. Sammanfattning & Investeringsbeslut' },
    { id: 'scenarios', title: 'X. Scenarier (Bull, Base & Bear Case)' }
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

  const formatMarketCap = (val: number | null) => {
    if (val === null) return 'N/A';
    if (val >= 1e12) return `${(val / 1e12).toFixed(2)} T`;
    if (val >= 1e9) return `${(val / 1e9).toFixed(1)} B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(1)} M`;
    return val.toLocaleString();
  };

  const ScoreBadge = ({ score }: { score?: number }) => {
    if (score === undefined) return null;
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
        Betyg: {score}/5
      </div>
    );
  };

  const jsonOverview = {
    company: data.title,
    ticker: data.ticker,
    analysis_date: data.date,
    scores: data.scores,
    recommendation: data.recommendation,
    target_price: data.scenarios?.find(s => s.type === 'base')?.value || "N/A"
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
      // livePrice={liveData ? `${liveData.regularMarketPrice.toFixed(2)} ${liveData.currency === 'SEK' ? 'kr' : liveData.currency}` : undefined}
      // liveChange={liveData ? `${(liveData.regularMarketChange || 0) > 0 ? '+' : ''}${(liveData.regularMarketChangePercent || 0).toFixed(2)}%` : undefined}
      analysisPrice={analysisPrice || undefined}
      // currentPrice={liveData?.regularMarketPrice}
      // currency={liveData?.currency === 'SEK' ? 'kr' : liveData?.currency}
      date={data.date}
    >
      <SEO 
        title={`${data.title} (${data.ticker}) - Analys`} 
        description={data.summary}
        ogType="article"
      />

      {/* Main Title Header */}
      <div className="mb-16 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              {data.market}: {data.ticker} · {data.sector}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] whitespace-pre-line">
              {data.title.includes('Analys & Köpvärde') ? data.title : `${data.title}: Analys & Köpvärde`}
              {!data.title.includes(data.summary.split('.')[0]) && (
                <>
                  <br />
                  <span className="text-primary">{data.summary.split('.')[0]}.</span>
                </>
              )}
            </h1>
          </div>
        </div>
      </div>

      {/* SECTION I: FÖRETAGSÖVERSIKT */}
      <section id="overview" className="scroll-mt-24">
        <div className="mb-6">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.affarsmodell} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-6">
          <MetricCard 
            label="BÖRSKURS" 
            value={data.price} 
            trend="Senaste" 
          />
          <MetricCard 
            label="BÖRSVÄRDE" 
            value={data.marketCap || "N/A"} 
            trend="Nuvarande" 
          />
          <MetricCard label="TICKER / BÖRS" value={data.ticker} trend={data.market} />
          <MetricCard label="ANSTÄLLDA" value={data.employees || "N/A"} trend="Globalt" />
        </div>


        {data.scores && (
          <div className="mb-12 bg-card border border-border rounded-[2.5rem] p-10">
            <h3 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-8">Analysens nyckelområden</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
              {Object.entries(data.scores).map(([key, score]) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{SCORE_LABELS[key] || key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-black text-primary">{score}/5</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(score / 5) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="AFFÄRSIDÉ & AFFÄRSMODELL" accentColor={ACCENT_COLOR}>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              {data.summary}
            </p>
            {data.businessModel && (
              <p className="text-gray-600 leading-relaxed text-sm">
                {data.businessModel}
              </p>
            )}
          </Card>
          <Card title="BAKGRUND & GEOGRAFI" accentColor={ACCENT_COLOR}>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.geography || data.marketOverview || "Information om geografisk spridning och marknadsbakgrund."}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="LEDNING & STYRNING" accentColor={ACCENT_COLOR}>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.managementOverview || data.management || "Information om bolagets ledning och styrelse."}
            </p>
          </Card>
          
          <Card title="ÄGARSTRUKTUR" accentColor={ACCENT_COLOR}>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.ownershipStructure || "Information om insynsägande och institutionellt ägande."}
            </p>
          </Card>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.affarsmodell} 
            description={`${data.scores.affarsmodell}/5 — (Fokus: Affärsmodell, ledning och ägarstruktur). Bedömning av affärsmodellens styrka och ledningens track record.`} 
          />
        )}
      </section>

      {/* SECTION II: STRATEGISK ANALYS & MOAT */}
      <section id="strategy" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.strategiskMoat} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
          <Card title="KONKURRENSFÖRDELAR" accentColor={ACCENT_COLOR}>
            <ul className="space-y-2">
              {(data.competitiveAdvantages || data.advantages || []).map((adv, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-primary">•</span> {adv}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="INVESTMENT CASE" accentColor={ACCENT_COLOR}>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.investmentCase || "Bolagets strategiska position och varför det är en intressant investering."}
            </p>
          </Card>
        </div>

        <SwotGrid data={{
          strengths: data.strengths || [],
          weaknesses: data.weaknesses || [],
          opportunities: data.opportunities || [],
          threats: data.threats || []
        }} />

        {data.scores && (
          <RatingBox 
            rating={data.scores.strategiskMoat} 
            description={`${data.scores.strategiskMoat}/5 — (Fokus: Konkurrensfördelar och marknadstrender). Vallgravens styrka och bolagets strategiska positionering.`} 
          />
        )}
      </section>

      {/* SECTION III: FINANSIELL ANALYS */}
      <section id="financials" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.finansiellKvalitet} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6">
          <Card title="FINANSIELL GENOMGÅNG" accentColor={ACCENT_COLOR}>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.financialAnalysis || "Analys av bolagets historiska och förväntade finansiella prestation."}
            </p>
          </Card>

          <Card title="NYCKELTAL" accentColor={ACCENT_COLOR}>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-black/5 pb-2">
                <span className="text-xs text-gray-400 uppercase">P/E-tal</span>
                <span className="text-lg font-serif font-bold text-[#1a1a1a]">
                  {data.pe ? parseFloat(String(data.pe).replace(',', '.')).toFixed(2) : '-'}
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-black/5 pb-2">
                <span className="text-xs text-gray-400 uppercase">Direktavkastning</span>
                <span className="text-lg font-serif font-bold text-[#1a1a1a]">
                  {typeof data.yield === 'number' 
                        ? `${(data.yield * 100).toFixed(2)}%` 
                        : (data.yield?.includes('%') ? data.yield : `${(parseFloat(data.yield || '0') * 100).toFixed(2)}%`)}
                </span>
              </div>
              {data.discount && (
                <div className="flex justify-between items-end border-b border-black/5 pb-2">
                  <span className="text-xs text-gray-400 uppercase">Substansrabatt</span>
                  <span className="text-lg font-serif font-bold text-primary">{data.discount}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.finansiellKvalitet} 
            description={`${data.scores.finansiellKvalitet}/5 — (Fokus: Vinsttillväxt, balansräkning och kassaflöde). Finansiell hälsa, lönsamhetstrender och kapitalallokering.`} 
          />
        )}
      </section>

      {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
      <section id="valuation" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.vardering} />
        
        <Card title="VÄRDERINGSANALYS" accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.valuation || "Bedömning av bolagets nuvarande värdering i förhållande till historik och konkurrenter."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.vardering} 
            description={`${data.scores.vardering}/5 — (Fokus: Multiplar som P/E, EV/EBIT och PEG). Huruvida aktien är köpvärd vid nuvarande kursnivåer.`} 
          />
        )}
      </section>

      {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
      <section id="growth" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.tillvaxtutsikter} />
        
        <Card title="FRAMTIDSPOTENTIAL" accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.growth || "De viktigaste drivkrafterna för bolagets framtida tillväxt och vinstökning."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.tillvaxtutsikter} 
            description={`${data.scores.tillvaxtutsikter}/5 — (Fokus: Expansion, innovation och katalysatorer). Potentialen för långsiktig värdetillväxt.`} 
          />
        )}
      </section>

      {/* SECTION VI: RISKPROFIL */}
      <section id="risk" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.riskprofil} />
        
        <Card title="RISKANALYS" accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <ul className="space-y-3">
            {(data.risks || []).map((risk, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-red-500">⚠️</span> {risk}
              </li>
            ))}
          </ul>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.riskprofil} 
            description={`${data.scores.riskprofil}/5 — (Fokus: Branschspecifika och generella risker. Inverterad skala). Bedömning av bolagsspecifika och makroekonomiska risker.`} 
          />
        )}
      </section>

      {/* SECTION VII: ESG & MAKRO */}
      <section id="esg" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="VII" title="ESG & MAKRO" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.esgMakro} />
        
        <Card title="ESG & MAKROANALYS" accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.esg || "Hållbarhetsarbete, bolagsstyrning och makroekonomisk påverkan."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.esgMakro} 
            description={`${data.scores.esgMakro}/5 — (Fokus: Hållbarhet och makroekonomisk exponering). Bolagets motståndskraft mot makrofaktorer och dess ESG-betyg.`} 
          />
        )}
      </section>

      {/* SECTION VIII: AI-OBSERVATIONER */}
      <section id="ai" className="scroll-mt-24 mt-16">
        <div className="mb-6">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor={ACCENT_COLOR} />
        </div>
        
        <ScoreBadge score={data.scores?.aiObservationer} />
        
        <Card accentColor={ACCENT_COLOR} className="mb-8 mt-6">
          <p className="text-sm text-gray-600 italic">
            {data.aiObservations || "AI-driven analys av sentiment, insiderhandel och tekniska trender indikerar en stabil position för bolaget i nuvarande marknadsklimat."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.aiObservationer} 
            description={`${data.scores.aiObservationer}/5 — (Fokus: Sentimentanalys och dolda mönster i datan). AI-genererad insikt baserad på realtidsdata och historiska mönster.`} 
          />
        )}
      </section>

      {/* SECTION IX: SAMMANFATTNING & INVESTERINGSBESLUT */}
      <section id="summary" className="scroll-mt-24 mt-16">
        <SectionHeader number="IX" title="SAMMANFATTNING & INVESTERINGSBESLUT" accentColor={ACCENT_COLOR} />
        
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
            {data.conclusion}
          </p>
        </div>

        <VerdictBox 
          verdict={data.recommendation} 
          target={data.scenarios?.find(s => s.type === 'base')?.value || "N/A"} 
          description={data.motivation || data.summary} 
          date={data.date}
          accentColor={ACCENT_COLOR}
        />
      </section>

      {/* SECTION X: SCENARIER (BULL, BASE & BEAR CASE) */}
      <section id="scenarios" className="scroll-mt-24 mt-16 mb-24">
        <SectionHeader number="X" title="SCENARIER (BULL, BASE & BEAR CASE)" accentColor={ACCENT_COLOR} />
        <ScenarioCards scenarios={data.scenarios.map(s => ({
          type: s.type,
          icon: s.type === 'bull' ? '🚀' : s.type === 'base' ? '📊' : '📉',
          title: s.label.toUpperCase(),
          probability: s.type === 'base' ? '50%' : '25%',
          price: s.value,
          change: s.change,
          description: `Bedömning för ${s.label.toLowerCase()} baserat på marknadens utveckling.`
        }))} />
      </section>
    </AnalysisLayout>
  );
}
