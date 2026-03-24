import React from 'react';
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
import SpiderChart from './SpiderChart';
import { AnalysisData } from '../../data/analyses';

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
  const ACCENT_COLOR = "#3b82f6"; // Default blue, can be customized or derived

  const sections = [
    { id: 'overview', title: 'I. Företagsöversikt' },
    { id: 'strategy', title: 'II. Strategisk analys & Moat' },
    { id: 'financials', title: 'III. Finansiell analys' },
    { id: 'valuation', title: 'IV. Värdering & Jämförelse' },
    { id: 'growth', title: 'V. Tillväxtmotorer & Triggers' },
    { id: 'risk', title: 'VI. Riskprofil' },
    { id: 'esg', title: 'VII. ESG & Makro' },
    { id: 'ai', title: 'VIII. AI-observationer' },
    { id: 'summary', title: 'IX. Sammanfattning' },
    { id: 'scenarios', title: 'X. Scenarier' }
  ];

  const ScoreBadge = ({ score }: { score?: number }) => {
    if (score === undefined) return null;
    return (
      <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold text-blue-600 uppercase tracking-wider">
        Betyg: {score}/5
      </div>
    );
  };

  const jsonOverview = {
    company: data.title,
    ticker: data.ticker,
    analysis_date: new Date().toISOString().split('T')[0],
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
    >
      {/* SECTION I: FÖRETAGSÖVERSIKT */}
      <section id="overview" className="scroll-mt-24">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.affarsmodell} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="BÖRSKURS (APPROX.)" value={data.price} trend="Senaste" />
          <MetricCard label="BÖRSVÄRDE" value={data.marketCap || "N/A"} trend="Nuvarande" />
          <MetricCard label="TICKER / BÖRS" value={data.ticker} trend={data.market} />
          <MetricCard label="ANSTÄLLDA" value={data.employees || "N/A"} trend="Globalt" />
        </div>

        {data.scores && (
          <div className="mb-8">
            <SpiderChart scores={data.scores} accentColor={ACCENT_COLOR} />
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
            description={`${data.scores.affarsmodell}/5 — Bedömning av affärsmodellens styrka och ledningens track record.`} 
          />
        )}
      </section>

      {/* SECTION II: STRATEGISK ANALYS & MOAT */}
      <section id="strategy" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="II" title="STRATEGISK ANALYS & MOAT" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.strategiskMoat} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="KONKURRENSFÖRDELAR" accentColor={ACCENT_COLOR}>
            <ul className="space-y-2">
              {(data.competitiveAdvantages || data.advantages || []).map((adv, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-blue-500">•</span> {adv}
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
            description={`${data.scores.strategiskMoat}/5 — Vallgravens styrka och bolagets strategiska positionering.`} 
          />
        )}
      </section>

      {/* SECTION III: FINANSIELL ANALYS */}
      <section id="financials" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="III" title="FINANSIELL ANALYS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.finansiellKvalitet} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card title="FINANSIELL GENOMGÅNG" accentColor={ACCENT_COLOR}>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.financialAnalysis || "Analys av bolagets historiska och förväntade finansiella prestation."}
            </p>
          </Card>

          <Card title="NYCKELTAL" accentColor={ACCENT_COLOR}>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-black/5 pb-2">
                <span className="text-xs text-gray-400 uppercase">P/E-tal</span>
                <span className="text-lg font-serif font-bold text-[#1a1a1a]">{data.pe}</span>
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
                  <span className="text-lg font-serif font-bold text-emerald-600">{data.discount}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {data.scores && (
          <RatingBox 
            rating={data.scores.finansiellKvalitet} 
            description={`${data.scores.finansiellKvalitet}/5 — Finansiell hälsa, lönsamhetstrender och kapitalallokering.`} 
          />
        )}
      </section>

      {/* SECTION IV: VÄRDERING & JÄMFÖRELSE */}
      <section id="valuation" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="IV" title="VÄRDERING & JÄMFÖRELSE" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.vardering} />
        </div>
        
        <Card title="VÄRDERINGSANALYS" accentColor={ACCENT_COLOR} className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.valuation || "Bedömning av bolagets nuvarande värdering i förhållande till historik och konkurrenter."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.vardering} 
            description={`${data.scores.vardering}/5 — Huruvida aktien är köpvärd vid nuvarande kursnivåer.`} 
          />
        )}
      </section>

      {/* SECTION V: TILLVÄXTMOTORER & TRIGGERS */}
      <section id="growth" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="V" title="TILLVÄXTMOTORER & TRIGGERS" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.tillvaxtutsikter} />
        </div>
        
        <Card title="FRAMTIDSPOTENTIAL" accentColor={ACCENT_COLOR} className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.growth || "De viktigaste drivkrafterna för bolagets framtida tillväxt och vinstökning."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.tillvaxtutsikter} 
            description={`${data.scores.tillvaxtutsikter}/5 — Potentialen för långsiktig värdetillväxt.`} 
          />
        )}
      </section>

      {/* SECTION VI: RISKPROFIL */}
      <section id="risk" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="VI" title="RISKPROFIL" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.riskprofil} />
        </div>
        
        <Card title="RISKANALYS" accentColor={ACCENT_COLOR} className="mb-8">
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
            description={`${data.scores.riskprofil}/5 — (Inverterat betyg: 5 = låg risk, 1 = hög risk). Bedömning av bolagsspecifika och makroekonomiska risker.`} 
          />
        )}
      </section>

      {/* SECTION VII: ESG & MAKRO */}
      <section id="esg" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="VII" title="ESG & MAKRO" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.esgMakro} />
        </div>
        
        <Card title="ESG & MAKROANALYS" accentColor={ACCENT_COLOR} className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.esg || "Hållbarhetsarbete, bolagsstyrning och makroekonomisk påverkan."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.esgMakro} 
            description={`${data.scores.esgMakro}/5 — Bolagets motståndskraft mot makrofaktorer och dess ESG-betyg.`} 
          />
        )}
      </section>

      {/* SECTION VIII: AI-OBSERVATIONER */}
      <section id="ai" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-4">
          <SectionHeader number="VIII" title="AI-OBSERVATIONER" accentColor={ACCENT_COLOR} />
          <ScoreBadge score={data.scores?.aiObservationer} />
        </div>
        
        <Card accentColor={ACCENT_COLOR} className="mb-8">
          <p className="text-sm text-gray-600 italic">
            {data.aiObservations || "AI-driven analys av sentiment, insiderhandel och tekniska trender indikerar en stabil position för bolaget i nuvarande marknadsklimat."}
          </p>
        </Card>

        {data.scores && (
          <RatingBox 
            rating={data.scores.aiObservationer} 
            description={`${data.scores.aiObservationer}/5 — AI-genererad insikt baserad på realtidsdata och historiska mönster.`} 
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
          date={new Date().toISOString().split('T')[0]}
          accentColor={ACCENT_COLOR}
        />
      </section>

      {/* SECTION X: SCENARIER */}
      <section id="scenarios" className="scroll-mt-24 mt-16 mb-24">
        <SectionHeader number="X" title="SCENARIER" accentColor={ACCENT_COLOR} />
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
