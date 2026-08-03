import React, { type ReactNode, useMemo } from "react";
import { BarChart3, Globe2, Info, ShieldCheck } from "lucide-react";
import SEO from "../SEO";
import AnalysisLayout from "./AnalysisLayout";
import metaMarkdown from "../../data/analyses/meta/meta-analysis-content.md?raw";
import { META_V11_TRACEABILITY } from "../../data/analyses/meta/meta-v11-traceability";
import type { AnalysisData } from "../../types/analysis";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "code"; text: string };

type Section = { title: string; id: string; blocks: Block[] };

const REQUIRED_SECTION_TITLES = [
  "Snabböversikt", "Investeringstes på 30 sekunder", "Företagsöversikt och ledning",
  "Affärsmodell och intäktsflöde", "Konkurrensfördelar, bransch och peers",
  "Finansiell utveckling och vinstkvalitet", "Scorecard", "Fundamental värdering",
  "Kurszoner: 12 månader och fem år", "Potentiella kursdrivare",
  "Riskprofil, stresstest och tesbrytare", "Bevakningsplan", "Slutsats och investeringsbeslut",
] as const;

const NAVIGATION_LABELS = [
  "Snabböversikt", "Investeringstes", "Företag & ledning", "Affärsmodell", "Bransch & moat",
  "Finansiell kvalitet", "Scorecard", "Fundamental värdering", "Kurszoner", "Kursdrivare",
  "Risker & stresstest", "Bevakningsplan", "Investeringsbeslut",
];

const slugify = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const headingText = (text: string) => text.replace(/^\d+\.\s*/, "").trim();

function parseMarkdown(source: string): Block[] {
  const lines = source.split(/\r?\n/); const blocks: Block[] = []; let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    if (line.startsWith("```")) {
      const code: string[] = []; index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      index += 1; blocks.push({ type: "code", text: code.join("\n") }); continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) { blocks.push({ type: "heading", level: heading[1].length, text: heading[2] }); index += 1; continue; }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const cells = lines[index].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: "table", rows }); continue;
    }
    if (line.startsWith(">")) { blocks.push({ type: "quote", text: line.replace(/^>\s?/, "") }); index += 1; continue; }
    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) items.push(lines[index++].trim().replace(/^-\s+/, ""));
      blocks.push({ type: "list", items }); continue;
    }
    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (!current || /^#{1,3}\s+/.test(current) || current.startsWith("|") || current.startsWith(">") || current.startsWith("```") || /^-\s+/.test(current)) break;
      paragraph.push(current); index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

function sectionsFrom(blocks: Block[]): { intro: Block[]; sections: Section[] } {
  const intro: Block[] = []; const sections: Section[] = []; let current: Section | null = null;
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      if (current) sections.push(current);
      const title = headingText(block.text); current = { title, id: slugify(title), blocks: [] }; continue;
    }
    if (current) current.blocks.push(block); else intro.push(block);
  }
  if (current) sections.push(current);
  return { intro, sections };
}

function inline(value: string): ReactNode[] {
  const normalized = value.replace(/\[\[([^\]]+)\]\(([^)]+)\)\]\([^)]+\)/g, "[$1]($2)");
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g; const nodes: ReactNode[] = []; let cursor = 0; let match: RegExpExecArray | null;
  while ((match = pattern.exec(normalized))) {
    if (match.index > cursor) nodes.push(normalized.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith("**")) nodes.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    else { const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token); if (link) nodes.push(<a key={match.index} href={link[2]} className="text-primary underline underline-offset-4" target="_blank" rel="noreferrer">{link[1]}</a>); }
    cursor = match.index + token.length;
  }
  if (cursor < normalized.length) nodes.push(normalized.slice(cursor));
  return nodes;
}

function MetaRevenueFlow() {
  const node = (x: number, y: number, title: string, value: string, tone: string, key: string) => <g key={key}><rect x={x} y={y} width="178" height="68" rx="14" fill="#fff" stroke={tone} strokeWidth="2"/><text x={x + 18} y={y + 29} fill="#111827" fontSize="14" fontWeight="700">{title}</text><text x={x + 18} y={y + 49} fill="#6b7280" fontSize="12">{value}</text></g>;
  return <figure className="mb-10 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-xl shadow-black/5">
    <div className="border-b border-border/60 px-5 py-5 md:px-7"><p className="text-[10px] font-black uppercase tracking-[.18em] text-primary">Sankey-diagram</p><h3 className="mt-2 text-xl font-black tracking-tight text-foreground">Så rör sig Metas intäkter genom verksamheten</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Rapporterade Q2 2026-värden. Svep i sidled på mobil för hela flödet.</p></div>
    <div className="overflow-x-auto premium-scrollbar bg-white"><svg data-testid="meta-revenue-sankey" aria-label="Meta-intäktsflöde Q2 2026" className="min-w-[1220px] p-5 md:p-8" viewBox="0 0 1220 510" role="img">
      <defs><linearGradient id="meta-revenue-flow" x1="0" x2="1"><stop stopColor="#10b981" stopOpacity=".72"/><stop offset="1" stopColor="#6ee7b7" stopOpacity=".35"/></linearGradient><linearGradient id="meta-profit-flow" x1="0" x2="1"><stop stopColor="#059669" stopOpacity=".78"/><stop offset="1" stopColor="#6ee7b7" stopOpacity=".42"/></linearGradient><linearGradient id="meta-cost-flow" x1="0" x2="1"><stop stopColor="#fb7185" stopOpacity=".76"/><stop offset="1" stopColor="#fca5a5" stopOpacity=".4"/></linearGradient></defs>
      <text x="100" y="28" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="800">INTÄKTSKÄLLOR</text><text x="310" y="28" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="800">SEGMENTINTÄKT</text><text x="530" y="28" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="800">FOA-RESULTAT</text><text x="760" y="28" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="800">KONCERNENS EBIT</text><text x="970" y="28" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="800">NETTORESULTAT</text>
      <path d="M188 134 C220 134 235 130 270 130 L270 175 C235 175 220 179 188 179 Z" fill="url(#meta-revenue-flow)"/><path d="M188 281 C220 281 235 175 270 175 L270 184 C235 184 220 290 188 290 Z" fill="#6ee7b7" opacity=".8"/>
      <path d="M448 143 C485 143 495 140 530 140 L530 192 C495 192 485 195 448 195 Z" fill="url(#meta-profit-flow)"/><path d="M448 195 C485 195 495 283 530 283 L530 366 C495 366 485 278 448 278 Z" fill="url(#meta-cost-flow)"/>
      <path d="M708 166 C745 166 755 180 790 180 L790 224 C755 224 745 210 708 210 Z" fill="url(#meta-profit-flow)"/><path d="M708 210 C745 210 755 321 790 321 L790 371 C755 371 745 260 708 260 Z" fill="url(#meta-cost-flow)"/>
      <path d="M968 202 C995 202 1005 202 1032 202 L1032 244 C1005 244 995 244 968 244 Z" fill="url(#meta-profit-flow)"/><path d="M968 244 C995 244 1005 335 1032 335 L1032 357 C1005 357 995 266 968 266 Z" fill="url(#meta-cost-flow)"/>
      {node(10, 100, "Advertising", "59,363 md USD", "#10b981", "advertising")}{node(10, 250, "FoA other revenue", "1,007 md USD", "#34d399", "foa-other")}{node(270, 130, "Family of Apps revenue", "60,370 md USD", "#10b981", "foa-revenue")}{node(530, 140, "FoA operating profit", "23,394 md USD", "#059669", "foa-profit")}{node(530, 298, "FoA costs", "36,976 md USD", "#fb7185", "foa-costs")}{node(790, 180, "Koncernens EBIT", "18,775 md USD", "#059669", "ebit")}{node(790, 321, "Reality Labs loss", "4,619 md USD", "#ef4444", "rl-loss")}{node(1032, 202, "Nettoresultat", "15,848 md USD", "#10b981", "net-income")}{node(1032, 321, "Finansnetto & skatt", "2,927 md USD", "#fb7185", "finance-tax")}
    </svg></div><figcaption className="border-t border-border/60 px-5 py-4 text-xs leading-relaxed text-muted-foreground md:px-7">Källa: Meta Q2 2026. Alla flöden är balanserade: FoA revenue = FoA operating profit + FoA costs; FoA operating profit = koncernens EBIT + Reality Labs-förlust; EBIT = nettoresultat + finansnetto och skatt.</figcaption>
  </figure>;
}

function AnalysisTable({ rows }: { rows: string[][] }) {
  return <div className="my-7 overflow-x-auto rounded-[1.5rem] border border-border/60 bg-card shadow-sm premium-scrollbar"><table className="w-full min-w-max border-collapse text-sm"><thead><tr className="border-b border-border/60 bg-muted/35">{rows[0]?.map((cell, i) => <th className={`whitespace-nowrap px-5 py-4 text-[10px] font-black uppercase tracking-[.13em] text-muted-foreground ${i === 0 ? "text-left" : "text-left md:text-right"}`} key={`${cell}-${i}`}>{inline(cell)}</th>)}</tr></thead><tbody className="divide-y divide-border/40">{rows.slice(1).map((row, ri) => <tr className="transition-colors hover:bg-primary/[.025]" key={`${ri}-${row.join("-")}`}>{row.map((cell, ci) => <td className={`whitespace-nowrap px-5 py-4 align-top text-sm leading-relaxed ${ci === 0 ? "font-bold text-foreground" : "text-muted-foreground md:text-right"}`} key={`${ci}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
}

function ContentBlock({ block }: { block: Block }) {
  if (block.type === "heading") return <h3 className={block.level === 1 ? "mt-12 text-3xl font-black tracking-tight text-foreground" : "mt-10 text-xl font-black tracking-tight text-foreground"}>{inline(block.text)}</h3>;
  if (block.type === "quote") return <blockquote className="my-8 rounded-[1.5rem] border border-primary/20 bg-primary/[.055] px-6 py-5 text-base font-medium leading-8 text-foreground/85">{inline(block.text)}</blockquote>;
  if (block.type === "list") return <ul className="my-6 space-y-3 pl-5 text-muted-foreground">{block.items.map((item) => <li key={item} className="list-disc pl-1 leading-7">{inline(item)}</li>)}</ul>;
  if (block.type === "code") return <MetaRevenueFlow />;
  if (block.type === "table") return <AnalysisTable rows={block.rows}/>;
  return <p className="my-6 max-w-4xl text-[15px] leading-8 text-muted-foreground">{inline(block.text)}</p>;
}

function QuickOverview({ section }: { section: Section }) {
  const tables = section.blocks.filter((block): block is Extract<Block, { type: "table" }> => block.type === "table");
  const metrics = tables[0]?.rows.slice(1) ?? []; const signals = tables[1]?.rows.slice(1) ?? [];
  return <section id={section.id} className="scroll-mt-24 overflow-hidden rounded-[2.4rem] border border-border/60 bg-card shadow-xl shadow-black/[.045]">
    <div className="border-b border-border/60 bg-primary/[.045] px-6 py-8 md:px-9 md:py-10"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-primary"><BarChart3 size={13}/> Snabböversikt</p><h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">Meta Platforms – stark annonsmotor, men hög kapitalintensitet</h2></div><div className="rounded-2xl border border-primary/20 bg-primary/[.08] px-6 py-4 text-center"><p className="text-[9px] font-black uppercase tracking-[.18em] text-primary">Rekommendation</p><p className="mt-1 text-2xl font-black text-primary">BEVAKA</p></div></div></div>
    <div className="grid lg:grid-cols-[.9fr_1.25fr]"><dl className="divide-y divide-border/50 border-b border-border/50 lg:border-b-0 lg:border-r">{metrics.map(([label, value]) => <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 px-6 py-4 md:px-7" key={label}><dt className="text-[10px] font-black uppercase tracking-[.12em] text-muted-foreground">{inline(label)}</dt><dd className="text-right text-sm font-black text-foreground">{inline(value)}</dd></div>)}</dl><div className="p-6 md:p-7"><div className="grid gap-4 md:grid-cols-3">{signals.map(([label, value]) => <div className="rounded-[1.35rem] border border-border/60 bg-card p-5" key={label}><p className="text-[9px] font-black uppercase tracking-[.14em] text-primary">{inline(label)}</p><p className="mt-3 text-sm font-semibold leading-6 text-foreground/85">{inline(value)}</p></div>)}</div><div className="mt-6 flex gap-3 rounded-[1.4rem] border border-primary/20 bg-primary/[.05] p-5"><Info size={17} className="mt-0.5 shrink-0 text-primary"/><p className="text-sm leading-7 text-foreground/80">{META_V11_TRACEABILITY.overviewFact}</p></div></div></div>
  </section>;
}

function SectionHeader({ index, title }: { index: number; title: string }) {
  return <div className="mb-9 flex flex-wrap items-center justify-between gap-4"><h2 className="flex items-center gap-4 text-2xl font-black tracking-tight text-foreground md:text-3xl"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">{index + 1}</span>{title}</h2></div>;
}

interface MetaDeepDiveProps { data: AnalysisData; onToggleWatchlist?: () => void; isInWatchlist?: boolean; isWatchlistLoading?: boolean; onToggleSave?: () => void; isSaved?: boolean; isSaveLoading?: boolean; }

export default function MetaDeepDive(props: MetaDeepDiveProps) {
  const { data } = props; const { intro, sections } = useMemo(() => sectionsFrom(parseMarkdown(metaMarkdown)), []);
  const navigation = sections.filter((section) => REQUIRED_SECTION_TITLES.includes(section.title as typeof REQUIRED_SECTION_TITLES[number]));
  const quickOverview = navigation[0];
  return <AnalysisLayout companyName="Meta Platforms" stockSlug="meta" ticker="META" subtitle="Finansiell analys" livePrice="556,71 USD" date="Dold före publicering · analysdatum 2 augusti 2026" dataSources="Källa: Börsanalys.se · v11" accentColor="#10B981" theme="light" sections={navigation.map((section, index) => ({ id: section.id, title: NAVIGATION_LABELS[index], number: index < 9 ? ["I", "II", "III", "IV", "V", "VI", "VI.C", "VII", "VIII"][index] : ["IX", "X", "XI", "XII"][index - 9] }))} isInWatchlist={props.isInWatchlist} isWatchlistLoading={props.isWatchlistLoading} onToggleWatchlist={props.onToggleWatchlist} isSaved={props.isSaved} isSaveLoading={props.isSaveLoading} onToggleSave={props.onToggleSave} tightContent>
    <SEO title="Meta Platforms – analys" description={data.summary} canonical="https://www.borsanalys.se/analyser/meta" />
    <article className="pb-12"><header className="mb-16 space-y-4"><div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground"><Globe2 size={12} className="text-primary"/><span>Nasdaq</span><span className="opacity-40">·</span><span>META</span><span className="opacity-40">·</span><span>Kommunikation</span></div><h1 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">Meta Platforms<span className="mt-3 block text-[.74em] text-primary">Strategisk analys</span></h1></header>
      {quickOverview && <QuickOverview section={quickOverview}/>}
      {intro.filter((block) => block.type !== "heading").map((block, index) => <ContentBlock key={index} block={block}/>)}
      {navigation.slice(1).map((section, index) => <section className="scroll-mt-24 mt-24" id={section.id} key={section.id}><SectionHeader index={index + 1} title={section.title}/>{section.blocks.map((block, blockIndex) => <ContentBlock key={blockIndex} block={block}/>)}</section>)}
      {sections.filter((section) => !navigation.includes(section)).map((section) => <section className="scroll-mt-24 mt-24" id={section.id} key={section.id}><SectionHeader index={13} title={section.title}/>{section.blocks.map((block, index) => <ContentBlock key={index} block={block}/>)}</section>)}
      <section className="mt-20 rounded-[1.5rem] border border-primary/20 bg-primary/[.04] p-6"><div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={18}/><div><h2 className="text-sm font-black uppercase tracking-[.14em] text-foreground">V11-spårbarhet</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">{META_V11_TRACEABILITY.publicNote}</p></div></div></section>
      <div className="mt-20 border-t border-border pt-10 text-center text-sm font-semibold text-muted-foreground">Slut på analys</div>
    </article>
  </AnalysisLayout>;
}
