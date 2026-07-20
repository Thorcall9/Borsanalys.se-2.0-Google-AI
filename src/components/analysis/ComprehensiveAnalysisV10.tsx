import React from "react";
import AnalysisLayout from "./AnalysisLayout";
import SectionHeader from "./SectionHeader";
import MetricCard from "./MetricCard";
import RatingBox from "./RatingBox";
import Card from "./Card";
import SwotGrid from "./SwotGrid";
import ScenarioCards, { Scenario as DisplayScenario } from "./ScenarioCards";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import RecommendationInfo from "./RecommendationInfo";
import VerdictBadge from "./VerdictBadge";
import NextAnalysisButton from "./NextAnalysisButton";
import { AnalysisData } from "../../types/analysis";
import { V10_ANALYSIS_SECTIONS } from "./analysisTemplateV10";

interface Props {
  data: AnalysisData;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
  nextAnalysis?: AnalysisData;
}

type Table = NonNullable<AnalysisData["financialTables"]>[number];

function TextBlock({ text }: { text?: string }) {
  if (!text) return <p className="text-sm text-muted-foreground">Information saknas i analysunderlaget.</p>;
  return <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">{text}</div>;
}

function TableBlock({ table }: { table: Table }) {
  return (
    <Card title={table.title} className="overflow-hidden p-0">
      <div className="overflow-x-auto -mx-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {table.headers.map((header) => <th key={header} className="px-6 py-4 font-black text-xs uppercase tracking-wider">{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, index) => (
              <tr key={index} className="border-b border-border/50 last:border-0">
                {row.map((cell, cellIndex) => <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">{String(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.footer && <div className="px-6 py-4 text-xs italic text-muted-foreground border-t border-border/50">{table.footer}</div>}
    </Card>
  );
}

function parsePrice(value?: string) {
  if (!value) return null;
  const parsed = Number(value.replace(/[^\d,.-]/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function ComprehensiveAnalysisV10({ data, isInWatchlist, isWatchlistLoading, onToggleWatchlist, nextAnalysis }: Props) {
  const accentColor = "#10B981";
  const analysisPrice = parsePrice(data.price);
  const scores = data.scores;
  const scoreItems = scores ? [
    ["Företag & ledning", scores.vdAnalys ?? scores.affarsmodell],
    ["Affärsmodell", scores.affarsmodell],
    ["Bransch & moat", scores.strategiskMoat],
    ["Finansiell kvalitet", scores.finansiellKvalitet],
    ["Fundamental värdering", scores.vardering],
    ["Kursdrivare", scores.tillvaxtutsikter],
    ["Riskprofil", scores.riskprofil],
  ] : [];
  const scoreTotal = scoreItems.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const scenarios: DisplayScenario[] = data.scenarios.map((scenario) => ({
    type: scenario.type,
    icon: scenario.type === "bull" ? "↑" : scenario.type === "bear" ? "↓" : "→",
    title: scenario.label,
    probability: scenario.probability || "Ej angiven",
    price: scenario.value,
    change: scenario.change,
    description: scenario.description || "Scenario baserat på analysens antaganden."
  }));

  return (
    <AnalysisLayout
      ticker={data.ticker}
      companyName={data.title}
      stockSlug={data.slug}
      subtitle="Standardmall v10"
      accentColor={accentColor}
      sections={V10_ANALYSIS_SECTIONS}
      isInWatchlist={isInWatchlist}
      isWatchlistLoading={isWatchlistLoading}
      onToggleWatchlist={onToggleWatchlist}
      analysisPrice={analysisPrice || undefined}
      date={data.date}
      nextAnalysis={nextAnalysis}
    >
      <div className="mb-16 space-y-8">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{data.market} · {data.ticker} · {data.sector}</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">{data.title}<span className="text-primary block mt-3">Analys enligt v10</span></h1>
        <Card className="max-w-4xl" accentColor={accentColor}><TextBlock text={data.summary} /></Card>
      </div>

      <section id="company-management" className="scroll-mt-8 mb-20">
        <SectionHeader number="I" title="Företag & ledning" accentColor={accentColor} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Aktiekurs" value={data.price || "—"} />
          <MetricCard label="Börsvärde" value={data.marketCap || "—"} />
          <MetricCard label="Anställda" value={data.employees || "—"} />
          <MetricCard label="Geografi" value={data.geography || "—"} />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Företagsöversikt"><TextBlock text={data.managementOverview || data.marketOverview} /></Card>
          <Card title="Ledning & ägarstruktur"><TextBlock text={[data.management, data.ownershipStructure, data.managementAnalysis].filter(Boolean).join("\n\n")} /></Card>
        </div>
        {data.managementTables?.length ? <div className="grid gap-8 mt-8">{data.managementTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {data.managementMotivation && <Card title="Ledningsbedömning" className="mt-8"><TextBlock text={data.managementMotivation} /></Card>}
      </section>

      <section id="business-model" className="scroll-mt-8 mb-20">
        <SectionHeader number="II" title="Affärsmodell" accentColor={accentColor} />
        <Card title="Så skapas värde"><TextBlock text={data.businessModel || data.investmentCase || data.marketOverview} /></Card>
        {data.overviewPoints?.length ? <div className="grid md:grid-cols-2 gap-8 mt-8">{data.overviewPoints.map((point) => <Card key={point.title} title={point.title}>{point.body}</Card>)}</div> : null}
      </section>

      <section id="industry-moat" className="scroll-mt-8 mb-20">
        <SectionHeader number="III" title="Bransch & moat" accentColor={accentColor} />
        <Card title="Bransch och konkurrensfördelar"><TextBlock text={data.strategyMoat || data.competitiveAdvantages?.join("\n\n") || data.marketOverview} /></Card>
        <div className="mt-8"><SwotGrid data={{ strengths: data.strengths || data.advantages || [], weaknesses: data.weaknesses || [], opportunities: data.opportunities || [], threats: data.threats || [] }} /></div>
      </section>

      <section id="financial-quality" className="scroll-mt-8 mb-20">
        <SectionHeader number="IV" title="Finansiell kvalitet" accentColor={accentColor} />
        <Card title="Historik, lönsamhet och balansräkning"><TextBlock text={data.financialAnalysis} /></Card>
        {data.financialQualityWhyNot5 && <Card title="Vad hindrar full poäng?" className="mt-8"><TextBlock text={data.financialQualityWhyNot5} /></Card>}
        {data.financialMotivation && <Card title="Finansiell bedömning" className="mt-8"><TextBlock text={data.financialMotivation} /></Card>}
        {data.financialTimeline?.length ? <div className="mt-8"><h3 className="mb-4 text-lg font-black">Historisk utveckling</h3><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{data.financialTimeline.map((item) => <Card key={item.year} title={item.year}><p className="font-black text-primary">{item.highlight}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p></Card>)}</div></div> : null}
        {data.financialTables?.length ? <div className="grid gap-8 mt-8">{data.financialTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
      </section>

      <section id="scorecard" className="scroll-mt-8 mb-20">
        <SectionHeader number="V" title="Scorecard" accentColor={accentColor} />
        <Card title="Samlad bedömning">
          {scoreItems.length ? <div className="space-y-4">{scoreItems.map(([label, value]) => <div key={label as string} className="flex items-center gap-4"><span className="flex-1 text-sm font-bold">{label}</span><span className="font-black text-primary">{value}/5</span><div className="w-24 h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${Number(value) * 20}%` }} /></div></div>)}</div> : <TextBlock text="Scorecard saknas i analysunderlaget." />}
          {scoreItems.length ? <div className="mt-8 pt-6 border-t border-border text-lg font-black">Totalpoäng: {scoreTotal}/35</div> : null}
        </Card>
      </section>

      <section id="fundamental-valuation" className="scroll-mt-8 mb-20">
        <SectionHeader number="VI" title="Fundamental värdering" accentColor={accentColor} />
        <Card title="Värderingsbedömning"><TextBlock text={data.valuation} /><div className="grid grid-cols-2 gap-4 mt-8"><MetricCard label="Målpris" value={data.targetPrice || "—"} /><MetricCard label="Köpzon" value={data.buyZone || data.kopzon || "—"} /></div></Card>
        {data.valuationMotivation && <Card title="Motivering" className="mt-8"><TextBlock text={data.valuationMotivation} /></Card>}
        {data.valuationTables?.length ? <div className="grid gap-8 mt-8">{data.valuationTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {scenarios.length ? <div className="mt-8"><ScenarioCards scenarios={scenarios} /></div> : null}
      </section>

      <section id="catalysts" className="scroll-mt-8 mb-20">
        <SectionHeader number="VII" title="Kursdrivare" accentColor={accentColor} />
        <Card title="Tillväxt och kommande drivkrafter"><TextBlock text={data.growth} /></Card>
        {data.growthPoints?.length ? <div className="grid md:grid-cols-2 gap-8 mt-8">{data.growthPoints.map((point) => <Card key={point.title} title={point.title}><TextBlock text={point.body} /></Card>)}</div> : null}
        {data.growthTables?.length ? <div className="grid gap-8 mt-8">{data.growthTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {data.growthMotivation && <Card title="Tillväxtbedömning" className="mt-8"><TextBlock text={data.growthMotivation} /></Card>}
      </section>

      <section id="risks" className="scroll-mt-8 mb-20">
        <SectionHeader number="VIII" title="Risker" accentColor={accentColor} />
        <Card title="Riskbild och stresstest"><TextBlock text={data.riskAnalysis || data.risks?.join("\n\n") || "Riskanalys saknas i analysunderlaget."} /></Card>
        {data.riskMotivation && <Card title="Riskbedömning" className="mt-8"><TextBlock text={data.riskMotivation} /></Card>}
        {data.riskTables?.length ? <div className="grid gap-8 mt-8">{data.riskTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {data.devilsAdvocateTables?.length ? <div className="grid gap-8 mt-8">{data.devilsAdvocateTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
      </section>

      <section id="thesis-changers" className="scroll-mt-8 mb-20">
        <SectionHeader number="IX" title="Tesförändrare" accentColor={accentColor} />
        <Card title="Vad ska följas framåt"><TextBlock text={data.watchItems?.join("\n\n") || data.aiSummary || data.conclusion} /></Card>
        {data.watchTable?.length ? <div className="grid gap-8 mt-8">{data.watchTable.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {data.summaryQnA?.length ? <div className="grid gap-4 mt-8">{data.summaryQnA.map((item) => <Card key={item.question} title={item.question}><TextBlock text={item.answer} /></Card>)}</div> : null}
        {data.esg && <Card title="Hållbarhet & makro" className="mt-8"><TextBlock text={data.esg} /></Card>}
        {data.aiSummary && <Card title="AI-observationer" className="mt-8"><TextBlock text={data.aiSummary} /></Card>}
        {data.aiTables?.length ? <div className="grid gap-8 mt-8">{data.aiTables.map((table) => <TableBlock key={table.title} table={table} />)}</div> : null}
        {data.aiMotivation && <Card title="Signalbedömning" className="mt-8"><TextBlock text={data.aiMotivation} /></Card>}
      </section>

      <section id="investment-decision" className="scroll-mt-8 mb-20">
        <SectionHeader number="X" title="Investeringsbeslut" accentColor={accentColor} />
        <Card title="Slutsats" className="border-primary/30">
          <TextBlock text={data.conclusion || data.investmentCase || data.summary} />
          <div className="flex flex-wrap items-center gap-8 mt-8">
            <RatingBox rating={Number(data.rating || 0)} title="Betyg" accentColor={accentColor} />
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rekommendation</div>
              <VerdictBadge verdict={data.recommendation} />
              {data.recommendationReason && <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{data.recommendationReason}</p>}
            </div>
          </div>
        </Card>
        <RecommendationInfo />
        {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        <AnalysisDisclaimer className="mt-12" />
      </section>
    </AnalysisLayout>
  );
}
