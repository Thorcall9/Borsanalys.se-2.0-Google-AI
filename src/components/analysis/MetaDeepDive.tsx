import React, { type ReactNode, useMemo } from "react";
import SEO from "../SEO";
import metaMarkdown from "../../data/analyses/meta/meta-analysis-content.md?raw";
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
  "Snabböversikt",
  "Investeringstes på 30 sekunder",
  "Företagsöversikt och ledning",
  "Affärsmodell och intäktsflöde",
  "Konkurrensfördelar, bransch och peers",
  "Finansiell utveckling och vinstkvalitet",
  "Scorecard",
  "Fundamental värdering",
  "Kurszoner: 12 månader och fem år",
  "Potentiella kursdrivare",
  "Riskprofil, stresstest och tesbrytare",
  "Bevakningsplan",
  "Slutsats och investeringsbeslut",
] as const;

const slugify = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const headingText = (text: string) => text.replace(/^\d+\.\s*/, "").trim();

function parseMarkdown(source: string): Block[] {
  const lines = source.split(/\r?\n/);
  const blocks: Block[] = [];
  let index = 0;
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
  const nodes = [
    { x: 28, y: 112, w: 155, title: "Annonsörer", value: "Efterfrågan på digital annonsering" },
    { x: 244, y: 42, w: 186, title: "Family of Apps", value: "60,370 md USD revenue" },
    { x: 244, y: 214, w: 186, title: "Reality Labs", value: "0,431 md USD revenue" },
    { x: 500, y: 42, w: 184, title: "FoA operating profit", value: "23,394 md USD" },
    { x: 500, y: 214, w: 184, title: "RL-förlust", value: "−4,619 md USD" },
    { x: 756, y: 112, w: 164, title: "Koncernens EBIT", value: "18,775 md USD" },
    { x: 976, y: 112, w: 164, title: "Nettoresultat", value: "15,848 md USD" },
  ];
  return <figure className="my-8 overflow-x-auto rounded-xl border border-border bg-card p-5"><figcaption className="mb-5 text-sm font-bold uppercase tracking-wider text-muted-foreground">Meta-intäktsflöde Q2 2026</figcaption><svg aria-label="Meta-intäktsflöde Q2 2026" className="min-w-[1140px]" viewBox="0 0 1168 328" role="img">
    <defs><marker id="meta-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#64748b" /></marker></defs>
    <path d="M183 146 C210 146 216 104 244 104" fill="none" stroke="#2563eb" strokeWidth="14" markerEnd="url(#meta-arrow)" />
    <path d="M430 104 L500 104" fill="none" stroke="#2563eb" strokeWidth="18" markerEnd="url(#meta-arrow)" />
    <path d="M430 236 L500 236" fill="none" stroke="#a855f7" strokeWidth="5" markerEnd="url(#meta-arrow)" />
    <path d="M684 104 C720 104 724 146 756 146" fill="none" stroke="#16a34a" strokeWidth="16" markerEnd="url(#meta-arrow)" />
    <path d="M684 236 C720 236 724 178 756 178" fill="none" stroke="#dc2626" strokeWidth="5" markerEnd="url(#meta-arrow)" />
    <path d="M920 146 L976 146" fill="none" stroke="#16a34a" strokeWidth="13" markerEnd="url(#meta-arrow)" />
    {nodes.map((node) => <g key={node.title}><rect x={node.x} y={node.y} width={node.w} height="68" rx="10" fill="#ffffff" stroke="#cbd5e1" /><text x={node.x + node.w / 2} y={node.y + 29} textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700">{node.title}</text><text x={node.x + node.w / 2} y={node.y + 50} textAnchor="middle" fill="#64748b" fontSize="11">{node.value}</text></g>)}
  </svg><p className="mt-4 text-sm text-muted-foreground">Resultatbryggan visualiserar den rapporterade Q2 2026-mixen utan egna modellantaganden.</p></figure>;
}

function ContentBlock({ block }: { block: Block }) {
  if (block.type === "heading") {
    const className = block.level === 1 ? "mt-10 text-3xl font-serif font-bold" : "mt-9 text-xl font-serif font-bold";
    return <h3 className={className}>{inline(block.text)}</h3>;
  }
  if (block.type === "quote") return <blockquote className="my-8 border-l-4 border-primary/60 bg-muted/40 px-5 py-4 text-muted-foreground italic leading-7">{inline(block.text)}</blockquote>;
  if (block.type === "list") return <ul className="my-5 space-y-2 pl-5 text-muted-foreground">{block.items.map((item) => <li key={item} className="list-disc leading-7">{inline(item)}</li>)}</ul>;
  if (block.type === "code") return <MetaRevenueFlow />;
  if (block.type === "table") return <div className="my-6 overflow-x-auto rounded-xl border border-border"><table className="min-w-full text-sm"><thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr>{block.rows[0]?.map((cell) => <th className="whitespace-nowrap p-3 font-semibold" key={cell}>{inline(cell)}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, rowIndex) => <tr className="border-t border-border/70" key={`${rowIndex}-${row.join("-")}`}>{row.map((cell, cellIndex) => <td className="whitespace-nowrap p-3 align-top" key={`${cellIndex}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  return <p className="my-5 max-w-4xl leading-8 text-muted-foreground">{inline(block.text)}</p>;
}

export default function MetaDeepDive({ data }: { data: AnalysisData }) {
  const { intro, sections } = useMemo(() => sectionsFrom(parseMarkdown(metaMarkdown)), []);
  const navigation = sections.filter((section) => REQUIRED_SECTION_TITLES.includes(section.title as typeof REQUIRED_SECTION_TITLES[number]));
  return <main className="min-h-screen bg-background pt-24 pb-24"><SEO title="Meta Platforms – analys" description={data.summary} canonical="https://www.borsanalys.se/analyser/meta" />
    <header className="border-b border-border bg-muted/20"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8"><p className="text-sm font-bold uppercase tracking-widest text-primary">Nasdaq · META · 31 juli 2026</p><h1 className="mt-3 text-5xl font-serif font-bold md:text-7xl">Meta Platforms</h1><p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground">{data.summary}</p><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="rounded-xl border border-border bg-card p-4"><b>BEVAKA</b><span className="block text-sm text-muted-foreground">Rekommendation</span></div><div className="rounded-xl border border-border bg-card p-4"><b>25/35</b><span className="block text-sm text-muted-foreground">Totalrating</span></div><div className="rounded-xl border border-border bg-card p-4"><b>612,50 USD</b><span className="block text-sm text-muted-foreground">12 mån. värde</span></div><div className="rounded-xl border border-border bg-card p-4"><b>1 066,05 USD</b><span className="block text-sm text-muted-foreground">5 år, viktat</span></div></div></div></header>
    <nav aria-label="Läsnavigation" className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 md:px-8">{navigation.map((section) => <a className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary" href={`#${section.id}`} key={section.id}>{section.title}</a>)}</div></nav>
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_250px]"><article className="min-w-0">{intro.map((block, index) => <ContentBlock key={index} block={block} />)}{sections.map((section) => <section className="scroll-mt-32 border-t border-border py-12" id={section.id} key={section.id}><h2 className="mb-7 text-3xl font-serif font-bold md:text-4xl">{section.title}</h2>{section.blocks.map((block, index) => <ContentBlock key={index} block={block} />)}</section>)}<div className="border-t border-border pt-10 text-center text-sm font-semibold text-muted-foreground">Slut på analys</div></article><aside className="hidden lg:block"><div className="sticky top-36 rounded-xl border border-border bg-card p-5 text-sm"><p className="font-bold">Analysinformation</p><dl className="mt-4 space-y-3 text-muted-foreground"><div><dt className="text-xs uppercase">Ticker</dt><dd className="font-semibold text-foreground">META</dd></div><div><dt className="text-xs uppercase">Risknivå</dt><dd className="font-semibold text-foreground">Hög</dd></div><div><dt className="text-xs uppercase">Status</dt><dd className="font-semibold text-foreground">Dold före publicering</dd></div></dl></div></aside></div></main>;
}
