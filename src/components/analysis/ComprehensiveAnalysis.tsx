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
  Star,
  Clock3
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

const InwidoQuickOverview = () => {
  const quickRows = [
    ["Totalrating", "24/35 - 69 %"],
    ["Bolagskvalitet", "3,5/5 - 70 %"],
    ["Investeringsattraktivitet", "3,3/5 - 67 %"],
    ["Rekommendation", "BEVAKA"],
    ["Aktuell kurs", "cirka 167,90 kr"],
    ["Rimligt värde, 12 månader", "155-185 kr"],
    ["Base-case, femårigt totalvärde", "248 kr"],
    ["Sannolikhetsviktat femårsvärde", "241 kr"],
    ["Kurszon 12 månader", "Fullvärderad", "orange"],
    ["Kurszon 5 år", "Rimligt värderad", "amber"],
    ["Handlingsnivå", "Köp successivt under 145 kr, tydligt köpvärd under 120 kr"],
    ["Risknivå", "Medel"],
    ["Zoner giltiga till", "Nästa kvartalsrapport"],
    ["Modellsäkerhet", "Medel på 12 månader, låg-medel på fem år"],
  ] as const;

  const thesisRows = [
    ["Varför kan aktien vara attraktiv?", "Inwido har potential att kombinera en normalisering av renoveringsmarknaden med förvärvstillväxt och förbättrad fabriksbeläggning."],
    ["Vad kan marknaden ha missat?", "De senaste förvärven ingår ännu inte med full årseffekt i resultatet, vilket kan ge högre framtida EPS än den rapporterade rullande nivån antyder."],
    ["Vad är största risken?", "En stor del av tillväxten är förvärvad och orderingången förstärktes kraftigt av en enskild skotsk projektorder."],
    ["Vad bekräftar tesen?", "Organisk tillväxt över 4 procent och operationell EBITA-marginal över 11 procent även utan nya stora engångsorder."],
    ["Vad bryter tesen?", "Nettoskuld över 2,5 gånger EBITDA eller kapitalavkastning under 10 procent trots stabilare marknader."],
  ];

  const signalCards = [
    ["Största styrka", "Rekordresultat i Q2, stigande marginal och bred förbättring i Skandinavien, Väst och e-Commerce."],
    ["Största risk", "Sex förvärv på sju månader har lyft skulden samtidigt som avkastningen på operativt kapital fallit."],
    ["Nästa katalysator", "Bevis på att orderstocken och de nyförvärvade bolagen ger uthållig EPS- och kassaflödestillväxt."],
  ];

  const zoneStyle = (tone?: string) => {
    if (tone === "orange") return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    if (tone === "amber") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-muted/40 text-foreground border-border";
  };

  return (
    <section className="bg-card border border-border/70 rounded-[2.5rem] shadow-2xl shadow-black/10 overflow-hidden">
      <div className="p-8 md:p-10 border-b border-border/60 bg-primary/5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-primary">
              <BarChart3 size={14} />
              Snabböversikt
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight text-foreground">
              Inwido - stark Q2-rapport, men kursreaktionen lyfter ribban
            </h2>
          </div>
          <div className="shrink-0 rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1">Rekommendation</div>
            <div className="text-2xl font-black text-primary">BEVAKA</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-0">
        <div className="xl:col-span-5 border-b xl:border-b-0 xl:border-r border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 divide-y sm:divide-y-0 sm:divide-x xl:divide-x-0 xl:divide-y divide-border/40">
            {quickRows.map(([field, value, tone]) => (
              <div key={field} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-muted-foreground leading-snug">
                  {field}
                </div>
                {tone ? (
                  <div className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black ${zoneStyle(tone)}`}>
                    {value}
                  </div>
                ) : (
                  <div className="text-sm font-black text-foreground text-right leading-snug max-w-[220px]">
                    {value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-7 p-8 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {signalCards.map(([label, text]) => (
              <div key={label} className="rounded-2xl border border-border/60 bg-background/50 p-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{label}</div>
                <p className="text-sm font-semibold leading-relaxed text-foreground/85">{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-primary/15 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-primary mt-1 shrink-0" />
              <p className="text-sm md:text-base leading-relaxed font-medium text-foreground/85">
                Q2-rapporten visade 16 procents omsättningstillväxt, varav 4 procent organiskt. Operationell EBITA steg 19 procent till 314 Mkr och EPS ökade 26 procent till 3,40 kr. Den organiska orderingången steg 23 procent och orderstocken var 16 procent högre än föregående år.
              </p>
            </div>
            <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Källa: Inwido Q2 2026, q2-2026-se-report.pdf
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center text-primary">
                <Clock3 size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-foreground">
                Investeringstes på 30 sekunder
              </h3>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border/60">
              {thesisRows.map(([question, conclusion]) => (
                <div key={question} className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b last:border-b-0 border-border/50">
                  <div className="bg-muted/25 px-5 py-4 text-xs font-black text-foreground">
                    {question}
                  </div>
                  <div className="px-5 py-4 text-sm font-medium leading-relaxed text-muted-foreground">
                    {conclusion}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-foreground text-background p-6">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Kärnslutsats</div>
            <p className="text-base md:text-lg font-semibold leading-relaxed">
              Rapporten bekräftar att verksamheten har vänt upp från ett svagt första kvartal. Kursuppgången innebär dock att investeraren redan betalar för en betydande del av återhämtningen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

type InwidoSankeyConfig = NonNullable<NonNullable<AnalysisData["affarsmodell"]>["sankey"]>;

const defaultInwidoSankey: InwidoSankeyConfig = {
  period: "RTM Q2 2026",
  currency: "Mkr",
  nodes: [
    { id: "skandinavien", label: "Skandinavien", type: "revenueSource", amount: 4355, shareOfRevenue: 46, organicGrowth: "+5 %", segmentMargin: "15,1 %" },
    { id: "vast", label: "Väst", type: "revenueSource", amount: 2083, shareOfRevenue: 22, organicGrowth: "+10 %", segmentMargin: "10,7 %" },
    { id: "ost", label: "Öst", type: "revenueSource", amount: 1799, shareOfRevenue: 19, organicGrowth: "-2 %", segmentMargin: "5,0 %" },
    { id: "ecommerce", label: "e-Commerce", type: "revenueSource", amount: 1041, shareOfRevenue: 11, organicGrowth: "+3 %", segmentMargin: "12,6 %" },
    { id: "ovrigt", label: "Övrigt och elimineringar", type: "revenueSource", amount: 190, shareOfRevenue: 2 },
    { id: "revenue", label: "Nettoomsättning", type: "revenue", amount: 9468, shareOfRevenue: 100 },
    { id: "cogs", label: "Kostnad sålda varor", type: "cost", amount: 7101, shareOfRevenue: 75 },
    { id: "gross-profit", label: "Bruttoresultat", type: "profit", amount: 2367, shareOfRevenue: 25, margin: 25 },
    { id: "operating-costs", label: "Rörelsekostnader", type: "cost", amount: 1397, shareOfRevenue: 14.8 },
    { id: "operational-ebita", label: "Operationell EBITA", type: "profit", amount: 970, shareOfRevenue: 10.2, margin: 10.2 },
    { id: "adjustments", label: "Avskrivningar och övriga justeringar", type: "cost", amount: 108, shareOfRevenue: 1.1 },
    { id: "ebit", label: "EBIT", type: "profit", amount: 862, shareOfRevenue: 9.1, margin: 9.1 },
    { id: "finance-tax", label: "Finansnetto, skatt och övrigt", type: "cost", amount: 334, shareOfRevenue: 3.5 },
    { id: "net-income", label: "Nettoresultat", type: "profit", amount: 528, shareOfRevenue: 5.6, margin: 5.6 },
  ],
  links: [
    { source: "skandinavien", target: "revenue", value: 4355 },
    { source: "vast", target: "revenue", value: 2083 },
    { source: "ost", target: "revenue", value: 1799 },
    { source: "ecommerce", target: "revenue", value: 1041 },
    { source: "ovrigt", target: "revenue", value: 190 },
    { source: "revenue", target: "cogs", value: 7101 },
    { source: "revenue", target: "gross-profit", value: 2367 },
    { source: "gross-profit", target: "operating-costs", value: 1397 },
    { source: "gross-profit", target: "operational-ebita", value: 970 },
    { source: "operational-ebita", target: "adjustments", value: 108 },
    { source: "operational-ebita", target: "ebit", value: 862 },
    { source: "ebit", target: "finance-tax", value: 334 },
    { source: "ebit", target: "net-income", value: 528 },
  ],
};

const formatMkr = (value?: number) => `${Math.round(value || 0).toLocaleString("sv-SE")} Mkr`;
const formatPercent = (value?: number) => value === undefined ? undefined : `${value.toLocaleString("sv-SE", { maximumFractionDigits: 1 })} %`;

const validateSankeyBalance = (config: InwidoSankeyConfig) => {
  const nodeIds = new Set(config.nodes.map((node) => node.id));
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, number>();

  config.links.forEach((link) => {
    if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) return;
    outgoing.set(link.source, (outgoing.get(link.source) || 0) + link.value);
    incoming.set(link.target, (incoming.get(link.target) || 0) + link.value);
  });

  return config.nodes
    .filter((node) => incoming.has(node.id) && outgoing.has(node.id))
    .map((node) => ({
      node: node.label,
      incoming: incoming.get(node.id) || 0,
      outgoing: outgoing.get(node.id) || 0,
      delta: Math.abs((incoming.get(node.id) || 0) - (outgoing.get(node.id) || 0)),
    }))
    .filter((check) => check.delta > 1);
};

const InwidoSankeyDiagram = ({ sankey }: { sankey?: InwidoSankeyConfig }) => {
  const config = sankey || defaultInwidoSankey;
  const balanceWarnings = validateSankeyBalance(config);
  const isBalanced = balanceWarnings.length === 0;
  const revenueSources = config.nodes.filter((node) => node.type === "revenueSource");
  const financialNodes = config.nodes.filter((node) => node.type !== "revenueSource");

  if (!isBalanced && import.meta.env.DEV) {
    console.warn("Inwido Sankey data is not balanced. Rendering fallback.", balanceWarnings);
  }

  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const nodeById = new Map(config.nodes.map((node) => [node.id, node]));
  const getNode = (id: string) => nodeById.get(id);
  const hoverNode = hoverNodeId ? getNode(hoverNodeId) : undefined;
  const detailLabel = (node: NonNullable<ReturnType<typeof getNode>>) =>
    node.shareOfRevenue !== undefined ? `${formatPercent(node.shareOfRevenue)} av nettoomsättningen` : config.period;
  const marginLabel = (node: NonNullable<ReturnType<typeof getNode>>) =>
    node.margin !== undefined ? `Marginal: ${formatPercent(node.margin)}` : undefined;

  const layout: Record<string, { x: number; y: number; w: number; h: number; lane: "source" | "revenue" | "profit" | "cost" }> = {
    skandinavien: { x: 48, y: 82, w: 18, h: 74, lane: "source" },
    vast: { x: 48, y: 178, w: 18, h: 52, lane: "source" },
    ost: { x: 48, y: 252, w: 18, h: 48, lane: "source" },
    ecommerce: { x: 48, y: 322, w: 18, h: 40, lane: "source" },
    ovrigt: { x: 48, y: 384, w: 18, h: 28, lane: "source" },
    revenue: { x: 286, y: 190, w: 22, h: 92, lane: "revenue" },
    "gross-profit": { x: 570, y: 194, w: 22, h: 84, lane: "profit" },
    "operational-ebita": { x: 864, y: 198, w: 22, h: 76, lane: "profit" },
    ebit: { x: 1158, y: 202, w: 22, h: 68, lane: "profit" },
    "net-income": { x: 1452, y: 206, w: 22, h: 60, lane: "profit" },
    cogs: { x: 430, y: 526, w: 22, h: 76, lane: "cost" },
    "operating-costs": { x: 724, y: 570, w: 22, h: 60, lane: "cost" },
    adjustments: { x: 1018, y: 526, w: 22, h: 44, lane: "cost" },
    "finance-tax": { x: 1312, y: 604, w: 22, h: 48, lane: "cost" },
  };

  const flowStyles: Record<string, { width: number; color: string; opacity: number; bend?: number }> = {
    "skandinavien-revenue": { width: 23, color: "#38BDF8", opacity: 0.7 },
    "vast-revenue": { width: 17, color: "#38BDF8", opacity: 0.64 },
    "ost-revenue": { width: 15, color: "#38BDF8", opacity: 0.6 },
    "ecommerce-revenue": { width: 11, color: "#38BDF8", opacity: 0.56 },
    "ovrigt-revenue": { width: 5, color: "#38BDF8", opacity: 0.42 },
    "revenue-gross-profit": { width: 32, color: "#10B981", opacity: 0.9 },
    "gross-profit-operational-ebita": { width: 26, color: "#10B981", opacity: 0.9 },
    "operational-ebita-ebit": { width: 22, color: "#10B981", opacity: 0.9 },
    "ebit-net-income": { width: 18, color: "#10B981", opacity: 0.9 },
    "revenue-cogs": { width: 28, color: "#F87171", opacity: 0.26, bend: 130 },
    "gross-profit-operating-costs": { width: 20, color: "#F87171", opacity: 0.3, bend: 120 },
    "operational-ebita-adjustments": { width: 8, color: "#F87171", opacity: 0.28, bend: 98 },
    "ebit-finance-tax": { width: 12, color: "#F87171", opacity: 0.3, bend: 126 },
  };

  const point = (id: string, side: "left" | "right" | "top") => {
    const box = layout[id];
    if (side === "left") return { x: box.x, y: box.y + box.h / 2 };
    if (side === "right") return { x: box.x + box.w, y: box.y + box.h / 2 };
    return { x: box.x + box.w / 2, y: box.y };
  };

  const flowPath = (source: string, target: string) => {
    const targetBox = layout[target];
    const start = point(source, "right");
    const end = targetBox.lane === "cost" ? point(target, "top") : point(target, "left");
    const style = flowStyles[`${source}-${target}`];
    if (targetBox.lane === "cost") {
      const bendY = Math.max(start.y, end.y) + (style?.bend || 110);
      const midX = start.x + (end.x - start.x) * 0.52;
      return `M${start.x},${start.y} C${midX},${start.y} ${midX},${bendY} ${end.x},${bendY} C${end.x},${bendY} ${end.x},${end.y + 22} ${end.x},${end.y}`;
    }
    const c1 = start.x + (end.x - start.x) * 0.46;
    const c2 = start.x + (end.x - start.x) * 0.62;
    return `M${start.x},${start.y} C${c1},${start.y} ${c2},${end.y} ${end.x},${end.y}`;
  };

  const renderFlow = (link: { source: string; target: string; value: number }) => {
    if (!layout[link.source] || !layout[link.target]) return null;
    const source = getNode(link.source);
    const target = getNode(link.target);
    const style = flowStyles[`${link.source}-${link.target}`] || { width: 8, color: "#38BDF8", opacity: 0.5 };
    const isDimmed = hoverNodeId && hoverNodeId !== link.source && hoverNodeId !== link.target;
    return (
      <path
        key={`${link.source}-${link.target}`}
        d={flowPath(link.source, link.target)}
        fill="none"
        stroke={style.color}
        strokeWidth={style.width}
        strokeOpacity={isDimmed ? 0.12 : style.opacity}
        strokeLinecap="round"
        onMouseEnter={() => setHoverNodeId(target?.id || source?.id || null)}
        onMouseLeave={() => setHoverNodeId(null)}
      />
    );
  };

  const renderNode = (id: string) => {
    const node = getNode(id);
    const box = layout[id];
    if (!node || !box) return null;
    const isCost = node.type === "cost";
    const isSource = node.type === "revenueSource";
    const isRevenue = node.type === "revenue";
    const isHovered = hoverNodeId === id;
    const fill = isCost ? "#2A1D22" : isSource ? "#162033" : isRevenue ? "#101827" : "#0F1F1A";
    const stroke = isCost ? "#F87171" : isSource || isRevenue ? "#38BDF8" : "#34D399";
    const labelX = box.x + box.w + 12;
    const labelY = box.y + box.h / 2;
    const label = isSource && node.shareOfRevenue !== undefined ? `${node.label} (${node.shareOfRevenue} %)` : node.label;

    return (
      <g
        key={id}
        onMouseEnter={() => setHoverNodeId(id)}
        onMouseLeave={() => setHoverNodeId(null)}
        opacity={hoverNodeId && !isHovered ? 0.55 : 1}
        className="cursor-default transition-opacity duration-200"
      >
        <title>{`${node.label}\n${detailLabel(node)}\n${marginLabel(node) || ""}`}</title>
        <rect
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx={8}
          fill={fill}
          stroke={stroke}
          strokeWidth={isHovered ? 2 : 1.2}
          strokeOpacity={isCost ? 0.58 : 0.78}
        />
        <text x={labelX} y={labelY - 8} fill="#F8FAFC" fontSize={isSource ? 11 : 12} fontWeight="900">
          {label}
        </text>
        <text x={labelX} y={labelY + 10} fill={isCost ? "#FCA5A5" : "#A7F3D0"} fontSize="10" fontWeight="800">
          {formatMkr(node.amount)}
        </text>
        {node.margin !== undefined && (
          <text x={labelX} y={labelY + 27} fill="#94A3B8" fontSize="9" fontWeight="800">
            {formatPercent(node.margin)}
          </text>
        )}
      </g>
    );
  };

  const fallbackRows = [...revenueSources, ...financialNodes.filter((node) => ["revenue", "gross-profit", "operational-ebita", "ebit", "net-income"].includes(node.id))];

  return (
    <div className="mb-12 rounded-[2.5rem] border border-slate-700/70 bg-slate-950 text-white shadow-2xl shadow-black/20 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-800 bg-transparent">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-300 mb-2">
              Hur tjänar Inwido sina pengar?
            </div>
            <h3 className="text-2xl font-black tracking-tighter text-white">
              Omsättningsmix → Bruttoresultat → Operationell EBITA → EBIT → Nettoresultat
            </h3>
          </div>
          <div className="text-xs font-semibold text-slate-400 max-w-sm">
            Flödena visar ungefärliga Mkr-belopp baserade på rullande tolv månader per Q2 2026. Kostnadsflödena visar hur omsättningen reduceras på vägen till nettoresultatet.
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {isBalanced ? (
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[1560px]">
              <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500 md:hidden">
                Dra i sidled för att se hela flödet
              </div>
              <div className="relative h-[720px] w-[1560px]" role="img" aria-label="Interaktivt Sankeydiagram över Inwidos omsättningsmix, kostnader, bruttovinst, operationell EBITA, EBIT och nettoresultat">
                <svg viewBox="0 0 1560 720" width="1560" height="720" className="block">
                  <defs>
                    <linearGradient id="inwidoRevenueFlow" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="inwidoFlowGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.18" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="1560" height="720" fill="transparent" />
                  <line x1="268" y1="238" x2="1490" y2="238" stroke="#334155" strokeWidth="1" strokeDasharray="6 10" strokeOpacity="0.28" />
                  <text x="286" y="150" fill="#64748B" fontSize="10" fontWeight="900" letterSpacing="2">INTÄKT OCH RESULTAT</text>
                  <text x="430" y="488" fill="#64748B" fontSize="10" fontWeight="900" letterSpacing="2">KOSTNADER, SEPARERADE UNDER HUVUDFLÖDET</text>

                  <g filter="url(#inwidoFlowGlow)">
                    {config.links.map(renderFlow)}
                  </g>
                  <g>
                    {[
                      "skandinavien",
                      "vast",
                      "ost",
                      "ecommerce",
                      "ovrigt",
                      "revenue",
                      "gross-profit",
                      "operational-ebita",
                      "ebit",
                      "net-income",
                      "cogs",
                      "operating-costs",
                      "adjustments",
                      "finance-tax",
                    ].map(renderNode)}
                  </g>
                </svg>
                {hoverNode && (
                  <div className="absolute right-8 top-8 w-72 rounded-2xl border border-sky-400/30 bg-slate-950/95 px-4 py-3 shadow-2xl shadow-black/40 text-left">
                    <div className="text-sm font-black text-white mb-1">{hoverNode.label}</div>
                    <div className="text-xs font-semibold text-slate-300">{detailLabel(hoverNode)}</div>
                    <div className="text-xs font-black text-sky-300 mt-2">{formatMkr(hoverNode.amount)}</div>
                    {marginLabel(hoverNode) && <div className="text-xs font-semibold text-slate-300 mt-1">{marginLabel(hoverNode)}</div>}
                    {hoverNode.organicGrowth && <div className="text-xs font-semibold text-slate-300 mt-2">Organisk tillväxt: {hoverNode.organicGrowth}</div>}
                    {hoverNode.segmentMargin && <div className="text-xs font-semibold text-slate-300">Segmentmarginal Q2: {hoverNode.segmentMargin}</div>}
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-3">{config.period}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fallbackRows.map((node) => (
              <div key={node.id} className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-black text-white">{node.label}</div>
                    {node.shareOfRevenue !== undefined && (
                      <div className="text-xs font-semibold text-slate-400">{formatPercent(node.shareOfRevenue)} av nettoomsättningen</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-black ${node.type === "cost" ? "text-red-300" : "text-sky-300"}`}>{formatMkr(node.amount)}</div>
                    {node.margin !== undefined && <div className="text-xs font-bold text-slate-400">{formatPercent(node.margin)}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InwidoTable = ({
  title,
  headers,
  rows,
  footer,
  compact = false,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  footer?: string;
  compact?: boolean;
}) => (
  <div className="relative">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl md:text-2xl font-black tracking-tighter text-foreground flex items-center gap-4">
        <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_22px_rgba(16,185,129,0.35)]" />
        {title}
      </h3>
    </div>
    <div className="bg-card/60 border border-border/60 rounded-[2rem] overflow-hidden shadow-xl shadow-black/5">
      <div className="overflow-x-auto premium-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/35 border-b border-border/50">
              {headers.map((header, index) => (
                <th
                  key={header}
                  className={`px-5 md:px-7 ${compact ? 'py-4' : 'py-5'} text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground/70 ${index === 0 ? 'text-left' : 'text-left md:text-right'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/25">
            {rows.map((row, rowIndex) => (
              <tr key={`${title}-${rowIndex}`} className="hover:bg-primary/[0.03] transition-colors">
                {row.map((cell, cellIndex) => {
                  const cellText = String(cell);
                  const positive = cellText.includes('+') || cellText.includes('↑') || cellText.includes('Över');
                  const negative = cellText.includes('−') || cellText.includes('-') || cellText.includes('Under');
                  const zone = cellIndex === 0 ? cellText.toLowerCase() : '';
                  const zoneClass = zone.includes('extremt') || zone === 'köpvärd'
                    ? 'text-emerald-600 bg-emerald-500/10'
                    : zone.includes('rimligt')
                      ? 'text-amber-600 bg-amber-500/10'
                      : zone.includes('fullvärderad')
                        ? 'text-orange-600 bg-orange-500/10'
                        : zone.includes('säljzon')
                          ? 'text-rose-600 bg-rose-500/10'
                          : '';

                  return (
                    <td
                      key={`${title}-${rowIndex}-${cellIndex}`}
                      className={`px-5 md:px-7 ${compact ? 'py-4' : 'py-5'} text-sm leading-relaxed ${cellIndex === 0 ? 'font-black text-foreground' : 'font-medium text-muted-foreground md:text-right'}`}
                    >
                      <span className={`${zoneClass || (cellIndex > 0 && positive ? 'text-emerald-600' : '')} ${!zoneClass && cellIndex > 0 && negative ? 'text-rose-600' : ''} ${zoneClass ? 'px-3 py-1 rounded-full font-black' : ''}`}>
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
    {footer && (
      <div className="mt-5 px-6 py-5 bg-primary/5 border border-primary/10 rounded-3xl">
        <div className="flex items-start gap-3">
          <Info size={14} className="text-primary mt-0.5 shrink-0" />
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-medium">{footer}</p>
        </div>
      </div>
    )}
  </div>
);

const InwidoNote = ({ title, children, tone = 'primary' }: { title: string; children: React.ReactNode; tone?: 'primary' | 'amber' | 'dark' }) => {
  const styles = tone === 'dark'
    ? 'bg-foreground text-background border-foreground'
    : tone === 'amber'
      ? 'bg-amber-500/5 border-amber-500/20'
      : 'bg-primary/5 border-primary/20';

  return (
    <div className={`rounded-[2rem] border p-7 md:p-8 ${styles}`}>
      <div className={`text-[10px] font-black uppercase tracking-[0.22em] mb-3 ${tone === 'dark' ? 'text-background/60' : tone === 'amber' ? 'text-amber-600' : 'text-primary'}`}>
        {title}
      </div>
      <div className={`text-base md:text-lg leading-relaxed font-medium ${tone === 'dark' ? 'text-background/90' : 'text-foreground/85'}`}>
        {children}
      </div>
    </div>
  );
};

const InwidoTemplateAnalysis = ({
  data,
  isInWatchlist,
  isWatchlistLoading,
  onToggleWatchlist,
  nextAnalysis,
  analysisPrice,
}: ComprehensiveAnalysisProps & { analysisPrice?: number }) => {
  const ACCENT_COLOR = "#10B981";
  const sections = [
    { id: 'overview', title: 'Företag & ledning', number: 'I' },
    { id: 'business-model', title: 'Affärsmodell', number: 'II' },
    { id: 'moat-peers', title: 'Bransch & moat', number: 'III' },
    { id: 'financials', title: 'Finansiell kvalitet', number: 'IV' },
    { id: 'scorecard', title: 'Scorecard', number: 'V' },
    { id: 'valuation', title: 'Fundamental värdering', number: 'VI' },
    { id: 'zones', title: 'Kurszoner', number: 'VI.C' },
    { id: 'drivers', title: 'Kursdrivare', number: 'VII' },
    { id: 'risk', title: 'Risker', number: 'VIII' },
    { id: 'triggers', title: 'Tesförändrare', number: 'IX' },
    { id: 'summary', title: 'Investeringsbeslut', number: 'X' },
  ];

  const baseTableClass = "space-y-12";
  const scoreRows = data.financialTables?.find(table => table.title === "Scorecard")?.rows || [];
  const valuationRows = data.valuationTables?.find(table => table.title === "Multiplar")?.rows || [];
  const modelRows = data.valuationTables?.find(table => table.title === "Femårsmodell")?.rows || [];
  const zoneRows = data.valuationTables?.find(table => table.title === "Kurszoner")?.rows || [];
  const driverRows = data.growthTables?.find(table => table.title === "Potentiella kursdrivare")?.rows || [];
  const insiderRows = data.managementTables?.[0]?.rows || [];

  const overviewRows = [
    ["Bolagsnamn", "Inwido AB"],
    ["Ticker", "INWI"],
    ["ISIN", "SE0006220018"],
    ["Aktuell kurs", "Cirka 167,90 kr"],
    ["Börsvärde", "Cirka 9,7 mdkr"],
    ["Enterprise Value", "Cirka 12,7 mdkr"],
    ["Huvudkontor", "Malmö"],
    ["VD", "Fredrik Meuller"],
    ["Ordförande", "Per Bertland"],
    ["Rapportvaluta", "SEK"],
  ];

  const ownershipRows = [
    ["Swedbank Robur Fonder", "8,55 %", "8,55 %", "Institutionell"],
    ["NN Group", "6,81 %", "6,81 %", "Institutionell"],
    ["Övriga tio största ägare", "Cirka 34 %", "Cirka 34 %", "Institutionella"],
  ];

  const allocationRows = [
    ["Insiderägande", "Begränsat i relation till bolagets storlek, men flera styrelseledamöter genomförde marknadsköp under juni 2026 vilket stärker förtroendet för värderingen."],
    ["Förvärvshistorik", "Överlag värdeskapande, men senaste förvärvsvågen är inte fullt utvärderad."],
    ["Återköp", "Inga materiella återköp."],
    ["Utdelning", "Målsättning omkring 50 procent av nettovinsten."],
    ["Incitamentsprogram", "EPS-utveckling över tre år och krav på aktieinnehav."],
    ["Transparens", "Hög."],
  ];

  const businessRows = [
    ["Intäktsmodell", "Försäljning av fönster och dörrar till konsument- och projektmarknad"],
    ["Återkommande intäkter", "Låg på kundnivå, men strukturellt återkommande renoveringsbehov"],
    ["Prissättning", "Lokal och varumärkesbaserad"],
    ["Viktigaste kostnader", "Glas, trä, PVC, aluminium, energi, transport och personal"],
    ["Skalbarhet", "Medel - högre volym ger bättre fabriksutnyttjande"],
    ["Kapitalbehov", "Medel"],
    ["Säsongsvariation", "Hög - Q1 är normalt svagast"],
  ];

  const segmentRows = [
    ["Skandinavien", "46 %", "+5 %", "15,1 %"],
    ["Väst", "22 %", "+10 %", "10,7 %"],
    ["Öst", "19 %", "−2 %", "5,0 %"],
    ["e-Commerce", "11 %", "+3 %", "12,6 %"],
    ["Övrigt", "2 %", "–", "–"],
  ];

  const marketSegmentRows = [
    ["Konsument", "59 %"],
    ["Projekt", "38 %"],
    ["Övrigt", "3 %"],
  ];

  const resultRows = [
    ["Nettoomsättning", "9 468", "100 %"],
    ["Bruttoresultat", "2 366", "25,0 %"],
    ["EBITDA", "1 269", "13,4 %"],
    ["Operationell EBITA", "970", "10,2 %"],
    ["EBIT", "862", "9,1 %"],
    ["Resultat till aktieägare", "528", "5,6 %"],
  ];

  const industryRows = [
    ["Förväntad långsiktig marknadstillväxt", "Cirka 3-4 %"],
    ["Inwidos Base-tillväxt", "Cirka 6-8 % inklusive förvärv"],
    ["Branschmognad", "Mogen"],
    ["Cyklikalitet", "Hög"],
    ["Position i cykeln", "Tidig återhämtning"],
    ["Viktigaste megatrend", "Energieffektivisering av Europas byggnadsbestånd"],
  ];

  const positionRows = [
    ["Skandinavien", "Vinner/stabil", "Organisk orderingång +8 %"],
    ["Storbritannien och Irland", "Vinner", "Tre förvärv och stor projektorder"],
    ["Finland", "Tappar/stabiliseras", "Prispress och svag efterfrågan"],
    ["e-Commerce", "Stabil", "Lönsamheten förbättras snabbare än försäljningen"],
  ];

  const moatRows = [
    ["Lokal varumärkes- och distributionsposition", "38 affärsenheter, etablerade lokala varumärken och verksamhet i 19 länder", "Medel", "Stärks via förvärv"],
    ["Skala inom inköp och förvärv", "Gemensam inköpskraft, decentraliserad integration och sex förvärv på sju månader", "Medel", "Stärks, men höjer exekveringsrisken"],
  ];

  const peerRows = [
    ["Inwido", "Direkt", "+4,8 % RTM", "9,1 % EBIT", "P/E cirka 18,4"],
    ["DOVISTA", "Mycket hög", "Ej tillgängligt", "Ej tillgängligt", "Ej tillgängligt"],
    ["JELD-WEN", "Hög, men mer global och projektorienterad", "Ej jämförbart", "Lägre och mer volatil", "Ej jämförbart"],
    ["Nordan", "Hög i Norden", "Ej tillgängligt", "Ej tillgängligt", "Privat"],
  ];

  const historyRows = [
    ["2021", "7 725", "+15,6 %", "12,29", "26,2 %", "11,7 %", "9,2 %", "687 Mkr"],
    ["2022", "9 547", "+23,6 %", "13,74", "24,5 %", "11,1 %", "8,3 %", "768 Mkr"],
    ["2023", "8 970", "−6,0 %", "11,72", "25,6 %", "10,9 %", "7,6 %", "1 260 Mkr"],
    ["2024", "8 838", "−1,5 %", "9,29", "25,4 %", "9,6 %", "6,1 %", "1 305 Mkr"],
    ["2025", "9 002", "+1,9 %", "8,87", "25,1 %", "9,2 %", "5,7 %", "2 117 Mkr"],
    ["RTM Q2 2026", "9 468", "+4,8 %", "9,11", "25,0 %", "9,1 %", "5,6 %", "2 931 Mkr"],
    ["2026*", "10 100", "+12 %", "9,8", "25,1 %", "9,3 %", "5,8 %", "2 500 Mkr"],
    ["2027*", "10 850", "+7 %", "10,7", "25,4 %", "9,7 %", "6,1 %", "2 250 Mkr"],
  ];

  const quarterRows = [
    ["Q2 2025", "2 339 Mkr", "+3 %", "11,3 %", "2,69 kr", "→"],
    ["Q3 2025", "2 224 Mkr", "Ej tillgängligt", "12,0 %", "2,65 kr", "→"],
    ["Q4 2025", "2 440 Mkr", "Ej tillgängligt", "12,2 %", "2,87 kr", "↑"],
    ["Q1 2026", "2 083 Mkr", "Negativ/svag", "4,3 %", "0,18 kr", "↓↓"],
    ["Q2 2026", "2 721 Mkr", "+4 %", "11,5 %", "3,40 kr", "↑↑"],
  ];

  const profitQualityRows = [
    ["Kassaflöde från löpande verksamhet, RTM", "1 032 Mkr", "↑", "Starkare än rapporterad nettovinst"],
    ["Rapporterad nettovinst, RTM", "528 Mkr", "→", "Svag återhämtning från 2025"],
    ["Operativ kassaflödeskonvertering", "195 % av nettovinst", "↑", "Påverkas positivt av avskrivningar och rörelsekapital"],
    ["FCF före företagsförvärv, H1", "Cirka 212 Mkr", "↑", "353 Mkr operativt kassaflöde minus 141 Mkr materiella investeringar"],
    ["ROE", "9,6 %", "→", "Under 2021-2022"],
    ["Avkastning på operativt kapital", "11,8 %", "↓", "Under målet på 15 %"],
    ["Utdelning per aktie", "5,50 kr", "→", "Cirka 62 % av 2025 års EPS"],
    ["Antal aktier", "58,0 miljoner", "→", "Ingen materiell utspädning"],
  ];

  const epsBridgeRows = [
    ["Organisk vinsttillväxt", "Positiv", "Organisk omsättning +4 %"],
    ["Marginalförändring", "Positiv", "EBIT-marginal +0,4 procentenheter"],
    ["Förvärv", "Tydligt positiv", "Total omsättning +16 %, varav struktur +13 %"],
    ["Antal aktier", "Neutral", "Antalet aktier i stort sett oförändrat"],
    ["Valuta", "Negativ", "−1 procentenhet på omsättningen"],
    ["Finansnetto", "Negativ", "Högre skuld och räntenetto"],
    ["Skatt", "Neutral/positiv", "Effektiv skatt cirka 19 % i kvartalet"],
    ["Total EPS-tillväxt", "+26 %", "3,40 kr mot 2,69 kr"],
  ];

  const warningRows = [
    ["Låg bas", "Delvis. Q2 jämförs inte med ett katastrofkvartal, men konsumentmarknaderna och flera affärsenheter var svaga under 2025."],
    ["Deceleration", "Nej på koncernnivå i Q2, men bilden är blandad. Organisk försäljning förbättrades till +4 procent medan Öst hade −2 procent organisk försäljning och −6 procent orderingång."],
    ["Finansiell hävstång", "EPS-tillväxten drivs främst av förvärvad omsättning, högre organisk volym och bättre fabriksutnyttjande, delvis motverkat av högre räntor."],
    ["Kassaflödeskontroll", "Rörelsekapitalet förbättrade kassaflödet i Q2. Materiella investeringar och företagsförvärv gör att total investeringsrad kräver separat tolkning."],
  ];

  const valuationSummaryRows = [
    ["Dagens kurs", "167,90 kr"],
    ["Base-case framtida totalvärde", "248 kr"],
    ["Sannolikhetsviktat framtida värde", "241 kr"],
    ["Base-case CAGR", "8,1 %"],
    ["Sannolikhetsviktad CAGR", "7,5 %"],
    ["Björn-CAGR", "−5,7 %"],
    ["Total femårig avkastning i Base", "Cirka 48 %"],
  ];

  const scenarioAssumptionRows = [
    ["Bull – vad krävs?", "Organisk tillväxt normaliseras till minst 5-6 procent. De senaste förvärven ger marginaler i linje med eller över koncernen. Operationell EBITA-marginal etableras över 11 procent. Nettoskulden sjunker trots fortsatt M&A. Kapitalavkastningen återgår över 15 procent."],
    ["Base – vad antas?", "Organisk tillväxt på omkring 3-4 procent över cykeln. Ytterligare 3-4 procentenheter från förvärv och marknadsandel. Marginalen förbättras gradvis men når inte tidigare cykeltopp. P/E normaliseras till 16x."],
    ["Björn – vad går fel?", "Konsumentmarknaden förblir svag och projektordern ger låg marginal eller hög rörelsekapitalbindning. Förvärv integreras långsammare än planerat. EPS står stilla över fem år och slutmultipeln faller till 11x."],
  ];

  const marketWrongRows = [
    ["Q2-orderingången markerar en bred strukturell vändning", "En betydande del kommer från en rekordstor projektorder på 50 miljoner GBP", "Konsumentorderingång och organisk tillväxt exklusive projektordern"],
    ["Förvärven ger snabb och relativt säker EPS-tillväxt", "Resultatbidraget kan bli stort, men skuld, räntor och operativt kapital har också ökat", "ROIC, skuldsättning och marginaler i Väst och Öst"],
  ];

  const anchorRows = [
    ["NTM-EPS*", "10,3 kr"],
    ["Motiverad forward P/E", "17x"],
    ["Motiverad kurs före utdelning", "Cirka 175 kr"],
    ["Förväntad utdelning", "Cirka 5,5 kr"],
    ["Totalvärdesankare", "Cirka 180 kr"],
  ];

  const riskRows = [
    ["Svag konsumentefterfrågan", "Medel", "Hög", "Tillfällig", "Konsumentorderingång under 0 %"],
    ["Förvärvsintegration", "Medel", "Hög", "Potentiellt permanent", "Fallande marginal i förvärvade enheter"],
    ["Högre skuldsättning", "Medel", "Hög", "Potentiellt permanent", "Nettoskuld över 2,5x EBITDA"],
    ["Materialinflation", "Medel", "Medel", "Tillfällig", "Bruttomarginal under 24 %"],
    ["Projektkoncentration", "Medel", "Medel", "Tillfällig", "Försening eller svag lönsamhet i Sidey-order"],
    ["Prispress i Finland", "Hög", "Medel", "Tillfällig/strukturell", "Fortsatt negativ orderingång i Öst"],
  ];

  const permanentRiskRows = [
    ["Förvärv genomförs till för höga priser", "Medel", "Goodwillnedskrivning och lägre ROIC", "ROIC under 10 %"],
    ["Skulden förblir hög efter förvärven", "Medel", "Lägre utdelning och finansiell flexibilitet", "Nettoskuld över 2,5x"],
    ["Lokala varumärken förlorar prisposition", "Låg-medel", "Strukturellt lägre marginal", "Lägre pris och marginal trots volymökning"],
  ];

  const triggerRows = [
    ["Organisk tillväxt", "Över 4 % exklusive stora projektorder", "Under 0 % två kvartal", "Ändra Base-tillväxten"],
    ["Operationell EBITA-marginal", "Över 11 % RTM", "Under 9 % RTM", "Höj/sänk EPS och slutmultipel"],
    ["Avkastning på operativt kapital", "Över 15 %", "Under 10 %", "Höj/sänk kvalitetsbetyget"],
    ["Nettoskuld/EBITDA exkl. leasing", "Under 1,8x", "Över 2,5x", "Ändra riskbetyget"],
    ["Öst", "Orderingång och marginal vänder upp", "Fortsatt marginal under 5 %", "Ompröva normaliserad lönsamhet"],
    ["Förvärv", "EPS och ROIC stiger", "Goodwill eller integrationskostnader ökar", "Ompröva kapitalallokeringen"],
    ["Värdering", "Kurs under 145 kr", "Kurs över 185 kr utan estimathöjningar", "Köp successivt/skala ned"],
  ];

  const summaryRows = [
    ["Är detta ett kvalitetsbolag?", "Ja, men kvaliteten begränsas av cyklikalitet, lägre kapitalavkastning och snabbt ökad skuld."],
    ["Är dagens värdering attraktiv?", "Rimlig på fem års sikt, men inte tillräckligt låg för en tydlig säkerhetsmarginal."],
    ["Passar aktien som långsiktigt innehav?", "Ja, för investerare som accepterar byggcykel- och förvärvsrisk."],
    ["Viktigaste osäkerheten?", "Om förvärven kan öka EPS snabbare än skuld, räntor och operativt kapital."],
  ];

  const fairValueRows = [
    ["Tolvmånadersankare inklusive utdelning", "Cirka 180 kr"],
    ["Rimligt kursintervall, 12 månader", "155-185 kr"],
    ["Base-case totalvärde år 5", "248 kr"],
    ["Sannolikhetsviktat totalvärde år 5", "241 kr"],
    ["Rimligt framtida femårsintervall", "215-275 kr"],
  ];

  const premiumRows = [
    ["Fullständig resultat-, balans- och kassaflödesanalys", "Premium"],
    ["Fullständig SWOT och moat-evidens", "Premium"],
    ["Fullständig VD-ordsanalys", "Premium"],
    ["Känslighetsanalys – 12 månader och 5 år", "Premium"],
    ["Kapitalallokering och förvärvsanalys", "Premium"],
    ["Reverse DCF", "Premium"],
    ["Fördjupat stresstest", "Premium"],
  ];

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
      analysisPrice={analysisPrice}
      date={data.date}
      nextAnalysis={nextAnalysis}
      tightContent
    >
      <SEO title={`${data.title} (${data.ticker}) - Analys`} description={data.summary} ogType="article" />

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
            Inwido AB
            <span className="text-primary block mt-3 text-[0.78em]">Strategisk analys</span>
          </h1>
        </div>
        <InwidoQuickOverview />
      </div>

      <NordnetCTA variant="high" />

      <section id="overview" className="scroll-mt-24 mt-20">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="I" title="FÖRETAGSÖVERSIKT OCH LEDNING" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 4/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Grunddata" headers={["Grunddata", "Värde"]} rows={overviewRows} compact />
          <InwidoNote title="Kort bakgrund">
            Inwido utvecklar, tillverkar och säljer kundanpassade fönster och dörrar. Koncernen består av 38 affärsenheter med cirka 5 200 anställda i 19 länder. Verksamheten är decentraliserad: lokala affärsenheter ansvarar för prissättning, försäljning och kostnader medan koncernen samordnar bland annat inköp, förvärv och produktivitet.
          </InwidoNote>
          <InwidoTable title="Ägarstruktur" headers={["Ägare", "Kapitalandel", "Röstandel", "Typ"]} rows={ownershipRows} footer={data.ownershipStructure} compact />
          <InwidoTable title="Ledning och kapitalallokering" headers={["Faktor", "Data eller bedömning"]} rows={allocationRows} />
          <InwidoNote title="Betygsmotivering">
            Inwidos finansiella mål omfattar mer än 15 procents avkastning på operativt kapital, skuldsättning under 2,5 gånger operationell EBITDA samt utdelning motsvarande omkring hälften av nettovinsten. Dokumenterad erfarenhet av decentraliserad styrning, tydliga finansiella mål och insiderköp väger positivt. Den snabba förvärvstakten och fallande kapitalavkastningen gör ändå att högre betyg kräver mer bevis.
          </InwidoNote>
        </div>
      </section>

      <section id="business-model" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="II" title="AFFÄRSMODELL" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 4/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoSankeyDiagram sankey={data.affarsmodell?.sankey} />
          <InwidoNote title="Så tjänar Inwido pengar">
            Materialinköp → lokal tillverkning → varumärkesbaserad försäljning → installation/distribution → eftermarknad och återkommande renoveringsbehov.
          </InwidoNote>
          <InwidoTable title="Affärsmodellens komponenter" headers={["Faktor", "Bedömning"]} rows={businessRows} />
          <InwidoTable title="Intäktsmix, rullande tolv månader" headers={["Segment", "Andel av omsättningen", "Q2 organisk utveckling", "Q2 operationell EBITA-marginal"]} rows={segmentRows} footer="Källa: Inwido Q2 2026, q2-2026-se-report.pdf" />
          <InwidoTable title="Marknadssegment" headers={["Segment", "Andel"]} rows={marketSegmentRows} compact />
          <InwidoTable title="Resultatflöde, rullande tolv månader" headers={["Resultatnivå", "Mkr", "Andel av omsättning"]} rows={resultRows} />
          <InwidoNote title="Betygsmotivering">
            Den decentraliserade strukturen gör det möjligt att anpassa priser och kostnader till lokala marknader. Geografisk och varumärkesmässig spridning minskar beroendet av en enskild marknad. Affärsmodellen är dock cyklisk och saknar en hög andel avtalsbundna återkommande intäkter.
          </InwidoNote>
        </div>
      </section>

      <section id="moat-peers" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="III" title="KONKURRENSFÖRDELAR, BRANSCH OCH PEERS" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 3/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Branschöversikt" headers={["Faktor", "Bedömning"]} rows={industryRows} />
          <InwidoNote title="Branschbild">
            Enligt bolagets egna bedömningar uppgår den långsiktiga underliggande marknadstillväxten till omkring 4 procent. Externa marknadsprognoser pekar på omkring 3-4 procent. Inwido kan växa snabbare än marknaden genom förvärv av lokala marknadsledare, geografisk expansion och förbättrat fabriksutnyttjande snarare än genom en strukturellt snabbväxande slutmarknad.
          </InwidoNote>
          <InwidoTable title="Marknadsandel och position" headers={["Region eller segment", "Trend", "Kommentar"]} rows={positionRows} />
          <InwidoTable title="Konkurrensfördelar" headers={["Konkurrensfördel", "Konkret evidens", "Styrka", "Trend"]} rows={moatRows} />
          <InwidoNote title="Moat-bedömning">
            Inwidos konkurrensfördel ligger inte i patent eller nätverkseffekter. Den ligger främst i kombinationen av lokala varumärken, distributionsrelationer, fabriksnärvaro och en etablerad modell för att köpa mindre regionala aktörer.
          </InwidoNote>
          <InwidoTable title="Peer-jämförelse" headers={["Bolag", "Operativ relevans", "Omsättningstillväxt", "Rörelsemarginal", "Värderingsdata"]} rows={peerRows} footer="Direkta noterade jämförelsebolag är få eftersom flera stora europeiska konkurrenter är privatägda, däribland DOVISTA/VKR. Premien mot historiken kan försvaras om förvärven lyfter EPS och kapitalavkastningen återgår mot målet, men inte av den nuvarande organiska halvårstillväxten på 1 procent." />
          <SwotGrid data={{ strengths: data.strengths || [], weaknesses: data.weaknesses || [], opportunities: data.opportunities || [], threats: data.threats || [] }} />
          <InwidoNote title="Betygsmotivering">
            Inwido har dokumenterade skalfördelar och lokala marknadspositioner, men inte en svårkopierad strukturell moat. Skandinavien genererar en operationell EBITA-marginal på 15,1 procent, medan Östs marginal på 5,0 procent visar hur snabbt lönsamheten pressas vid svag efterfrågan och lokal prispress.
          </InwidoNote>
        </div>
      </section>

      <section id="financials" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="IV" title="FINANSIELL UTVECKLING OCH VINSTKVALITET" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 3/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Kärnhistorik" headers={["År", "Omsättning, Mkr", "Tillväxt", "EPS, kr", "Bruttomarginal", "EBIT-marginal", "Nettomarginal", "Nettoskuld"]} rows={historyRows} footer="*Estimat" />
          <InwidoTable title="Kvartalstrend" headers={["Kvartal", "Omsättning", "Organisk tillväxt", "Operationell EBITA-marginal", "EPS", "Trend"]} rows={quarterRows} footer="Q2-resultatet förbättrades successivt från april till juni. Samtidigt var marknaderna fortsatt splittrade: Skandinavien, Norge och Danmark förbättrades medan Finland och den brittiska konsumentmarknaden förblev svaga. Källa: Inwido Q2 2026." />
          <InwidoTable title="Segmentens lönsamhet" headers={["Segment", "Q2 2025", "Q2 2026", "Förändring"]} rows={[
            ["Skandinavien", "14,5 %", "15,1 %", "+0,6 procentenheter"],
            ["Väst", "11,1 %", "10,7 %", "−0,4 procentenheter"],
            ["Öst", "6,6 %", "5,0 %", "−1,6 procentenheter"],
            ["e-Commerce", "9,1 %", "12,6 %", "+3,5 procentenheter"],
            ["Koncernen", "11,3 %", "11,5 %", "+0,2 procentenheter"],
          ]} footer="e-Commerce är rapportens tydligaste kvalitativa förbättring. Marginalen har stigit fyra kvartal i följd genom prissättning, kostnadsbesparingar och prioritering av lönsamhet framför volym." />
          <InwidoTable title="Vinstkvalitet" headers={["Nyckeltal", "Värde", "Trend", "Kommentar"]} rows={profitQualityRows} />
          <InwidoNote title="Kassaflödeskommentar">
            Det negativa redovisade fria kassaflödet i det historiska underlaget beror huvudsakligen på att företagsförvärv klassificeras som investeringskassaflöde. Under första halvåret genererade rörelsen 353 Mkr efter rörelsekapital. Materiella investeringar uppgick till 141 Mkr, vilket motsvarar ett underliggande fritt kassaflöde före förvärv på omkring 212 Mkr.
          </InwidoNote>
          <InwidoTable title="EPS-brygga – Q2 2026 jämfört med Q2 2025" headers={["Komponent", "Riktning", "Kommentar"]} rows={epsBridgeRows} />
          <InwidoTable title="Varningskontroller" headers={["Kontroll", "Bedömning"]} rows={warningRows} />
          <InwidoNote title="Betygsmotivering">
            Inwido är lönsamt genom hela cykeln och har god löpande kassagenerering. EPS ligger fortfarande omkring 34 procent under toppen 2022 och kapitalavkastningen har fallit till 11,8 procent. Skuldsättningen har stigit tydligt efter förvärven, vilket reducerar den finansiella flexibiliteten.
          </InwidoNote>
        </div>
      </section>

      <section id="scorecard" className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="V" title="SCORECARD" accentColor={ACCENT_COLOR} />
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Scorecard" headers={["Dimension", "Betyg 1-5", "Kommentar"]} rows={scoreRows} />
          <InwidoTable title="Sammanvägda mått" headers={["Bedömning", "Poäng", "Resultat"]} rows={[
            ["Bolagskvalitet", "14/20", "3,5/5 - 70 %"],
            ["Investeringsattraktivitet", "10/15", "3,3/5 - 67 %"],
            ["Totalrating", "24/35", "69 %"],
          ]} />
          <InwidoNote title="Tolkning">
            Inwido är ett över genomsnittet välskött industribolag, men aktien erbjuder efter rapportuppgången inte tillräcklig femårig avkastning för ett tydligt KÖP.
          </InwidoNote>
        </div>
      </section>

      <section id="valuation" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VI" title="FUNDAMENTAL VÄRDERING" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 3/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Multipeltabell" headers={["Multipel", "Idag", "Historik", "Kommentar"]} rows={valuationRows} footer="Den nuvarande värderingen är inte extrem, men den är hög i relation till bolagets historiska värdering och nuvarande kapitalavkastning." />
          <InwidoTable title="Normaliserad startnivå" headers={["Mått", "Värde"]} rows={[
            ["Rapporterad EPS, rullande tolv månader", "9,11 kr"],
            ["Justerad start-EPS i modellen", "9,11 kr"],
            ["Dagens P/E", "18,4x"],
            ["Normaliserad EPS 2027*", "Cirka 10,7 kr"],
          ]} footer="Startnivån är försiktig eftersom flera förvärv ännu inte ingår med tolv månaders resultat. Samtidigt inkluderas inte heller full finansieringskostnad eller eventuella integrationsproblem i ett enkelt proformaantagande." />
          <InwidoTable title="Femårsmodell" headers={["Scenario", "Sannolikhet", "EPS-tillväxt", "Totalvärde", "CAGR"]} rows={modelRows} />
          <ScenarioCards scenarios={data.scenarios.map(s => ({ type: s.type, title: s.label.toUpperCase(), probability: s.probability || '25%', price: s.value, change: s.change, valueLabel: "5-årigt totalvärde inkl. utdelningar", changeLabel: "Total avkastning", description: s.description || "" }))} />
          <InwidoTable title="Scenarioantaganden" headers={["Scenario", "Vad krävs eller antas?"]} rows={scenarioAssumptionRows} />
          <InwidoTable title="Värderingssammanfattning" headers={["Värderingsmått", "Värde"]} rows={valuationSummaryRows} />
          <InwidoTable title="Vad kan marknaden ha fel om?" headers={["Marknadens sannolika antagande", "Analysens bedömning", "Vad avgör vem som har rätt?"]} rows={marketWrongRows} footer="Den rekordstora Sidey-ordern ger en stabil produktionsgrund under flera år, men projektordern bör inte extrapoleras som en normal återkommande tillväxttakt." />
          <InwidoNote title="Betygsmotivering">
            Sannolikhetsviktad femårs-CAGR är cirka 7,5 procent. Base-scenariot når endast den nedre gränsen för rimlig långsiktig avkastning. Värderingen kräver inte extrem multipel-expansion, men erbjuder en begränsad säkerhetsmarginal mot integrations- och konjunkturrisk.
          </InwidoNote>
        </div>
      </section>

      <section id="zones" className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="VI.C" title="KURSZONER – 12 MÅNADER OCH 5 ÅR" accentColor={ACCENT_COLOR} />
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Tolvmånadersankare" headers={["Faktor", "Antagande"]} rows={anchorRows} footer="Forwardmultipeln 17x ligger under dagens cirka 18,4x men över bolagets längre historik. Premien mot historiken motiveras av förbättrad orderingång och förvärvens kommande helårsresultat." />
          <InwidoTable title="Kurszoner" headers={["Zon", "Kursintervall 12 månader", "Kursintervall 5 år", "Åtgärd"]} rows={zoneRows} />
          <InwidoNote title="Handlingsnivå" tone="amber">
            Aktien ligger nära gränsen mellan rimligt värderad och fullvärderad på fem års sikt, men är fullvärderad på tolv månader. Köp successivt under 145 kr, tydligt köpvärd under 120 kr och överväg att skala ned över 185 kr på tolv månaders sikt om vinstestimaten inte höjs.
          </InwidoNote>
          <InwidoNote title="Konsensus">
            Konsensus varierar mellan olika dataleverantörer och bör tolkas med viss försiktighet direkt efter rapporten. De flesta publika sammanställningar ligger omkring 200-210 kr. Skillnaden mot konsensus speglar främst olika antaganden om hur stor och uthållig resultatförbättring de senaste förvärven kommer att ge.
          </InwidoNote>
          <InwidoTable title="Modellsäkerhet" headers={["Horisont", "Tillförlitlighet"]} rows={[["12 månader", "Medel"], ["5 år", "Låg-medel"], ["Datakvalitet", "Hög"]]} footer="Zonerna gäller till nästa kvartalsrapport. Därefter ska EPS-ankare, skuld och förvärvens proformaresultat räknas om." compact />
        </div>
      </section>

      <section id="drivers" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VII" title="POTENTIELLA KURSDRIVARE" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 4/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Katalysatorer" headers={["Katalysator", "Tidpunkt", "Påverkan", "Vad ska mätas?"]} rows={driverRows} />
          <InwidoNote title="Strukturell efterfrågedrivare">
            EU:s energieffektiviseringsregler och renoveringsbehovet i äldre europeiska bostäder ger en strukturell efterfrågedrivare. Inwido framhåller att fönster och dörrar är centrala för att minska byggnaders energiförbrukning.
          </InwidoNote>
          <InwidoTable title="Insidertransaktioner" headers={["Person", "Roll", "Köp", "Belopp", "Datum"]} rows={insiderRows} footer="Fyra styrelseledamöter köpte aktier på den öppna marknaden kring 140-143 kr under juni, alltså drygt en månad före Q2-rapporten. Några motsvarande insiderförsäljningar rapporterades inte under perioden. Det är en tydligt positiv signal eftersom flera oberoende styrelseledamöter köpte aktier under samma period, även om beloppen är relativt små i förhållande till bolagets storlek. Efter rapporten handlas aktien omkring 18-20 procent över insiderköpens nivåer." />
          <InwidoTable title="Estimat och konsensus" headers={["Mått", "Före Q2", "Efter Q2", "Trend"]} rows={[
            ["EPS innevarande år", "Ej tillgängligt", "Förväntas revideras upp", "↑"],
            ["EPS nästa år", "Ej tillgängligt", "Cirka 9-11 kr i publika sammanställningar", "→/↑"],
            ["Konsensusriktkurs", "Cirka 190-202 kr", "Omkring 200-210 kr i tidiga sammanställningar", "↑"],
          ]} />
          <InwidoNote title="Betygsmotivering">
            Rapporten ger stöd för positiva EPS-revideringar genom högre Q2-resultat och större orderstock. Förvärven och Sidey-ordern ger konkreta och mätbara resultatdrivare. Materialinflation, svaghet i Finland och en fortsatt dämpad brittisk konsumentmarknad kan samtidigt begränsa estimathöjningarna.
          </InwidoNote>
        </div>
      </section>

      <section id="risk" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VIII" title="RISKER OCH STRESSTEST" accentColor={ACCENT_COLOR} />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Betyg: 3/5</div>
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Huvudrisker" headers={["Risk", "Sannolikhet", "Konsekvens", "Typ", "Tidig varningssignal"]} rows={riskRows} />
          <InwidoTable title="Risk för permanent kapitalförlust" headers={["Permanent risk", "Sannolikhet", "Potentiell skada", "Tidig signal"]} rows={permanentRiskRows} />
          <InwidoNote title="Permanent risk">
            Inwido kan sannolikt återhämta sig efter en normal konjunkturnedgång. Den större permanenta risken ligger i kapitalallokeringen: om den senaste förvärvsvågen inte genererar avkastning över kapitalkostnaden kan det underliggande värdet per aktie försvagas trots högre omsättning.
          </InwidoNote>
          <InwidoTable title="Stresstest" headers={["Scenario", "Operativt antagande", "Estimerad EBITDA", "Nettoskuld/EBITDA", "Räntetäckning", "Slutsats"]} rows={[
            ["Normal", "Dagens nivå", "Cirka 1 270 Mkr", "2,2-2,3x", "6,7x", "Hanterbar"],
            ["Svag konjunktur", "Omsättning −10 %, marginal −200 bp", "Cirka 965 Mkr", "Cirka 3,0x", "Cirka 4,0x", "Utdelning och M&A bör begränsas"],
            ["Kraftig nedgång", "Omsättning −20 %, marginal −400 bp", "Cirka 680 Mkr", "Cirka 4,3x", "Cirka 2,3x", "Materiell refinansierings- och kovenantrisk"],
          ]} footer="Inwido uppfyllde samtliga kovenanter vid halvårsskiftet och hade disponibla medel inklusive outnyttjade krediter på 1 673 Mkr. Nettoskulden exklusive leasing motsvarade 2,1 gånger operationell EBITDA, eller 1,8 gånger proforma inklusive de förvärvade bolagens helårsresultat." />
          <InwidoNote title="Risknivå: Medel">
            Skuldsättningen ligger under bolagets målgräns men har ökat från 0,9x till 2,1x exklusive leasing på ett år. Räntetäckningen på 6,7x ger buffert i ett normalt nedgångsscenario. En kraftigare konjunkturnedgång i kombination med integrationsproblem skulle snabbt försämra kreditmåtten.
          </InwidoNote>
        </div>
      </section>

      <section id="triggers" className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="IX" title="VAD SOM KAN FÖRÄNDRA INVESTERINGSTESEN" accentColor={ACCENT_COLOR} />
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Tes-triggers" headers={["Bevakningspunkt", "Positiv trigger", "Negativ trigger", "Konsekvens"]} rows={triggerRows} />
          <InwidoNote title="Vad investeraren bör bevaka">
            Konsumentorderingången, Östs marginal, förvärvens proformaresultat, kapitalavkastningen och gapet mot konsensus. Konsumentorderingången är en bättre temperaturmätare än den projektorderdrivna totala orderingången på +23 procent. Skillnaden mot konsensus speglar främst olika antaganden om hur stor och uthållig resultatförbättring de senaste förvärven kommer att ge.
          </InwidoNote>
        </div>
      </section>

      <section id="summary" className="scroll-mt-24 mt-24 mb-32">
        <div className="mb-10">
          <SectionHeader number="X" title="SAMMANFATTNING OCH INVESTERINGSBESLUT" accentColor={ACCENT_COLOR} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-12">
            <InwidoTable title="Investeringsbeslut" headers={["Fråga", "Svar"]} rows={summaryRows} />
            <InwidoNote title="Slutlig sammanfattning" tone="dark">
              Kvalitet: Inwido har en beprövad decentraliserad affärsmodell och har förblivit lönsamt genom en svag europeisk fönstermarknad. Värdering: cirka 18,4x rullande EPS är över historiken och kräver fortsatt resultatåterhämtning. Risk: förvärven har höjt nettoskulden samtidigt som kapitalavkastningen fallit till 11,8 procent. Vad som krävs: organisk tillväxt över 4 procent, uthållig marginal över 11 procent och sjunkande nettoskuld.
            </InwidoNote>
            <InwidoNote title="Positiva signaler inför och efter Q2-rapporten">
              <ul className="space-y-2 list-disc pl-5">
                <li>Fyra styrelseledamöter köpte aktier på den öppna marknaden inför Q2-rapporten.</li>
                <li>Den organiska orderingången förbättrades tydligt.</li>
                <li>Operationell EBITA-marginal steg till 11,5 procent.</li>
                <li>EPS ökade med 26 procent jämfört med föregående år.</li>
                <li>Inga insiderförsäljningar rapporterades under samma period.</li>
                <li>Aktien handlas samtidigt cirka 18-20 procent över nivåerna där insiders köpte, vilket begränsar säkerhetsmarginalen.</li>
              </ul>
            </InwidoNote>
            <InwidoTable title="Rimligt värde" headers={["Mått", "Värde"]} rows={fairValueRows} />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <VerdictBox
                verdict="BEVAKA"
                target="155-185 kr"
                description="Inwidos Q2-rapport var operationellt stark och motiverar högre estimat än efter Q1. Den kraftiga kursuppgången på rapportdagen innebär dock att en betydande del av förbättringen redan har prisats in. Uppgradering till KÖP kräver antingen en kurs under cirka 123-145 kr eller tydliga bevis på att normaliserad EPS kan överstiga 11-12 kr utan högre skuldsättning."
                date="2026-07-15"
                accentColor={ACCENT_COLOR}
                buyZone={data.buyZone}
                targetLabel="Rimligt värdeintervall på 12 månaders sikt"
                targetNote="Analysdatum: 15 juli 2026. Marknadsdatadatum: 15 juli 2026. Zonernas giltighet: till nästa kvartalsrapport."
              />
            </div>
          </div>
        </div>
      </section>

      <NordnetCTA variant="low" />
      <section className="scroll-mt-24 mt-24">
        <div className="mb-10">
          <SectionHeader number="P" title="FÖRDJUPNING – PREMIUM" accentColor={ACCENT_COLOR} />
        </div>
        <div className={baseTableClass}>
          <InwidoTable title="Premiumfördjupning" headers={["Modul", "Status"]} rows={premiumRows} compact />
          <InwidoNote title="Premiuminnehåll">
            Premiumfördjupningen innehåller värderingsmatris för EPS och slutmultipel, förvärvsanalys med proforma-EBITDA och skuldsättning, normaliserad kassaflödesmodell före företagsförvärv, segmentvis marginalanalys, reverse DCF och implicit marknadsförväntan samt fullständig VD-ords- och kapitalallokeringsanalys.
          </InwidoNote>
        </div>
      </section>
      <AnalysisDisclaimer className="mt-16" />
    </AnalysisLayout>
  );
};

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
  const isInwido = data.slug === "inwido-2026";

  const analysisPrice = useMemo(() => {
    if (!data.price) return null;
    const cleanPrice = data.price.replace(/[^\d,.]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? null : parsed;
  }, [data.price]);

  const sections = [
    { id: 'overview', title: 'Företagsöversikt', number: 'I' },
    { id: 'strategy', title: 'Strategisk analys', number: 'II' },
    { id: 'financials', title: 'Finansiell analys', number: 'III' },
    { id: 'valuation', title: 'Värdering & jämförelse', number: 'IV' },
    { id: 'growth', title: 'Tillväxtmotorer', number: 'V' },
    { id: 'risk', title: 'Riskprofil', number: 'VI' },
    { id: 'management', title: isInwido ? 'Ledning & kapitalallokering' : 'Analys av VD-ordet', number: 'VII' },
    { id: 'ai', title: isInwido ? 'Signalbild' : 'AI-observationer', number: 'VIII' },
    { id: 'summary', title: isInwido ? 'Investeringsbeslut' : 'Sammanfattning', number: 'IX' },
    { id: 'scenarios', title: 'Scenarier', number: 'X' }
  ];

  const SCORE_LABELS: Record<string, string> = {
    affarsmodell: "I. Företagsöversikt",
    strategiskMoat: "II. Strategisk analys",
    finansiellKvalitet: "III. Finansiell analys",
    vardering: "IV. Värdering & Jämförelse",
    tillvaxtutsikter: "V. Tillväxtmotorer & Triggers",
    riskprofil: "VI. Riskprofil",
    vdAnalys: "VII. Analys av VD-ordet",
    aiObservationer: "VIII. AI-observationer"
  };

  const displayedScores = isInwido
    ? [
        ["foretagsoversiktLedning", 4, "I. Företagsöversikt och ledning"] as const,
        ["affarsmodell", 4, "II. Affärsmodell"] as const,
        ["strategiskMoat", 3, "III. Strategisk analys"] as const,
        ["finansiellKvalitet", 3, "IV. Finansiell analys"] as const,
        ["vardering", 3, "V. Värdering & Jämförelse"] as const,
        ["tillvaxtutsikter", 4, "VI. Tillväxtmotorer & Triggers"] as const,
        ["riskprofil", 3, "VII. Riskprofil"] as const,
      ]
    : Object.entries(data.scores || {}).map(([key, score]) => [key, score, SCORE_LABELS[key] || key] as const);

  const getZoneStyle = (zone: string) => {
    const normalized = zone.toLowerCase();
    if (normalized.includes('extremt')) {
      return 'text-emerald-700 bg-emerald-600/10 group-hover/row:bg-emerald-600/15';
    }
    if (normalized.includes('köpvärd')) {
      return 'text-emerald-600 bg-emerald-500/10 group-hover/row:bg-emerald-500/15';
    }
    if (normalized.includes('rimligt')) {
      return 'text-amber-600 bg-amber-500/10 group-hover/row:bg-amber-500/15';
    }
    if (normalized.includes('fullvärderad')) {
      return 'text-orange-600 bg-orange-500/10 group-hover/row:bg-orange-500/15';
    }
    if (normalized.includes('säljzon')) {
      return 'text-rose-600 bg-rose-500/10 group-hover/row:bg-rose-500/15';
    }
    return '';
  };

  const ScoreBadge = ({ score }: { score?: number }) => {
    if (score === undefined) return null;
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
        Betyg: {score}/5
      </div>
    );
  };

  if (isInwido) {
    return (
      <InwidoTemplateAnalysis
        data={data}
        isInWatchlist={isInWatchlist}
        isWatchlistLoading={isWatchlistLoading}
        onToggleWatchlist={onToggleWatchlist}
        nextAnalysis={nextAnalysis}
        analysisPrice={analysisPrice || undefined}
      />
    );
  }

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
      tightContent={isInwido}
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
              <span className="text-primary block mt-3 text-[0.86em]">Strategisk analys</span>
            )}
          </h1>
        </div>

        {isInwido && <InwidoQuickOverview />}

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
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Totalrating</span>
                            <span className="text-3xl font-black text-foreground">{ratingLine}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {points.map((p, i) => {
                      const separatorIndex = p.indexOf(':');
                      const hasLabelValue = separatorIndex > -1;
                      const label = hasLabelValue ? p.slice(0, separatorIndex).trim() : '';
                      const val = hasLabelValue ? p.slice(separatorIndex + 1).trim() : p;
                      return (
                        <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all group/point">
                          {hasLabelValue && (
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 group-hover/point:text-primary/70 transition-colors">{label}</div>
                          )}
                          <div className={`${hasLabelValue ? 'text-base font-black' : 'text-sm font-semibold leading-relaxed'} text-foreground`}>{val}</div>
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
                {(data.aiDrivenData?.totaltPoang || displayedScores.reduce((sum, [, score]) => sum + score, 0)) && (
                  <div className="flex items-center gap-4 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-black text-primary">
                      {data.aiDrivenData?.totaltPoang || displayedScores.reduce((sum, [, score]) => sum + score, 0)}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest leading-tight opacity-70 italic">
                      av {data.aiDrivenData?.maxPoang || 40} <br /> möjliga poäng
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
                {displayedScores.map(([key, score, label]) => (
                  <div key={key} className="space-y-3 group">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end gap-2">
                        <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-[0.1em] leading-tight">
                          {label}
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
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Aktiekurs vid analys</div>
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

      {/* SECTION II: STRATEGISK ANALYS */}
      <section id="strategy" className="scroll-mt-24 mt-20">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="II" title="STRATEGISK ANALYS & KONKURRENSFÖRDELAR" accentColor={ACCENT_COLOR} />
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

          {isInwido && <InwidoSankeyDiagram />}

          <div className="space-y-6">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.22em] mb-4">Konkurrensfördelar</div>
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
             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
               {isInwido ? "Base-case: 5-årigt totalvärde" : "Rimligt värde (Base Case)"}: {data.scenarios?.find(s => s.type === 'base')?.value || "N/A"}
               {isInwido ? " inklusive utdelningar" : ""}
             </p>
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
                              const isZoneTable = table.title.toLowerCase().includes('kurszon');
                              const zoneStyle = isZoneTable ? getZoneStyle(String(row[0])) : '';
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
                                    ${ci === 0 ? '' : 'px-3 py-1'} rounded-lg transition-colors
                                    ${zoneStyle || (isPositive && ci > 0 ? 'text-emerald-500 bg-emerald-500/5 group-hover/row:bg-emerald-500/10' : '')}
                                    ${!zoneStyle && isNegative && ci > 0 ? 'text-rose-500 bg-rose-500/5 group-hover/row:bg-rose-500/10' : ''}
                                    ${!zoneStyle && isNeutral && ci > 0 ? 'text-amber-500 bg-amber-500/5 group-hover/row:bg-amber-500/10' : ''}
                                    ${!zoneStyle && !isPositive && !isNegative && !isNeutral && ci > 0 ? 'text-muted-foreground group-hover/row:text-foreground' : ''}
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



      {/* SECTION VII: ANALYS AV VD-ORDET / LEDNING */}
      <section id="management" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VII" title={isInwido ? "LEDNING, KAPITALALLOKERING & INSIDERAKTIVITET" : "ANALYS AV VD-ORDET"} accentColor={ACCENT_COLOR} />
          {!isInwido && <ScoreBadge score={data.scores?.vdAnalys} />}
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

        {data.scores && !isInwido && (
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

      {/* SECTION VIII: SIGNALER */}
      <section id="ai" className="scroll-mt-24 mt-24">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader number="VIII" title={isInwido ? "SIGNALBILD & INSIDERAKTIVITET" : "AI-OBSERVATIONER"} accentColor={ACCENT_COLOR} />
          {!isInwido && <ScoreBadge score={data.scores?.aiObservationer} />}
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

        {data.scores && !isInwido && (
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
                   <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Rekommendation</div>
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
                targetLabel={isInwido ? "Rimligt värdeintervall på 12 månaders sikt" : undefined}
                targetNote={isInwido ? "Tolvmånadersankare inklusive utdelning: cirka 180 kr" : undefined}
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
            title: s.label.toUpperCase(),
            probability: s.probability || (s.type === 'base' ? '50%' : '25%'),
            price: s.value,
            change: s.change,
            valueLabel: isInwido ? "5-årigt totalvärde inkl. utdelningar" : undefined,
            changeLabel: isInwido ? "Total avkastning" : undefined,
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
