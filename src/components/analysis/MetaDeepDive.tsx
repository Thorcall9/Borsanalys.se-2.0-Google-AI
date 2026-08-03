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
  const node = (x: number, y: number, title: string, value: string, tone: string) => <g key={title}><rect x={x} y={y} width="170" height="64" rx="10" fill="#fff" stroke={tone} strokeWidth="2" /><text x={x + 85} y={y + 27} textAnchor="middle" fill="#172033" fontSize="14" fontWeight="700">{title}</text><text x={x + 85} y={y + 47} textAnchor="middle" fill="#667085" fontSize="12">{value}</text></g>;
  return <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card p-4 md:p-6"><figcaption className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">Meta-intäktsflöde Q2 2026</figcaption><p className="mb-5 text-sm text-muted-foreground">Från annonsefterfrågan till rapporterat nettoresultat — bandens bredd visar relativa belopp.</p><svg data-testid="meta-mobile-sankey" aria-label="Meta-intäktsflöde Q2 2026 mobil" className="h-auto w-full md:hidden" viewBox="0 0 360 590" role="img"><defs><linearGradient id="mobile-blue" x1="0" x2="0" y2="1"><stop stopColor="#2563eb" stopOpacity=".75"/><stop offset="1" stopColor="#38bdf8" stopOpacity=".35"/></linearGradient></defs><path d="M90 100 C90 135 180 135 180 170 L180 205 C180 170 270 135 270 100" fill="none" stroke="url(#mobile-blue)" strokeWidth="28"/><path d="M180 265 L180 330" stroke="#22c55e" strokeWidth="22"/><path d="M270 400 C270 430 180 430 180 465" fill="none" stroke="#ef4444" strokeWidth="9"/><path d="M180 515 L180 540" stroke="#16a34a" strokeWidth="18"/>{node(5, 36, "Advertising", "59,363 md USD", "#2563eb")}{node(185, 36, "FoA other revenue", "1,007 md USD", "#38bdf8")}{node(95, 205, "Family of Apps", "60,370 md USD", "#2563eb")}{node(95, 330, "FoA operating profit", "23,394 md USD", "#16a34a")}{node(185, 390, "Reality Labs", "−4,619 md USD", "#ef4444")}{node(95, 465, "Koncernens EBIT", "18,775 md USD", "#16a34a")}{node(95, 540, "Nettoresultat", "15,848 md USD", "#16a34a")}</svg><svg data-testid="meta-desktop-sankey" aria-label="Meta-intäktsflöde Q2 2026" className="hidden h-auto w-full md:block" viewBox="0 0 720 590" role="img">
    <defs><linearGradient id="foa-flow" x1="0" x2="1"><stop stopColor="#2563eb" stopOpacity=".75" /><stop offset="1" stopColor="#0ea5e9" stopOpacity=".45" /></linearGradient><linearGradient id="profit-flow" x1="0" x2="1"><stop stopColor="#16a34a" stopOpacity=".75" /><stop offset="1" stopColor="#22c55e" stopOpacity=".45" /></linearGradient></defs>
    <text x="85" y="24" textAnchor="middle" fill="#667085" fontSize="11" fontWeight="700">INTÄKTSKÄLLOR</text><text x="360" y="24" textAnchor="middle" fill="#667085" fontSize="11" fontWeight="700">SEGMENT OCH RESULTAT</text><text x="635" y="24" textAnchor="middle" fill="#667085" fontSize="11" fontWeight="700">KONCERN</text>
    <path d="M170 126 C210 126 225 118 275 118 L275 152 C225 152 210 160 170 160 Z" fill="url(#foa-flow)" />
    <path d="M170 226 C215 226 225 152 275 152 L275 158 C225 158 215 232 170 232 Z" fill="#7dd3fc" opacity=".75" />
    <path d="M445 136 C500 136 510 260 550 260 L550 284 C510 284 500 160 445 160 Z" fill="url(#profit-flow)" />
    <path d="M445 386 C500 386 510 300 550 300 L550 312 C510 312 500 398 445 398 Z" fill="#ef4444" opacity=".72" />
    <path d="M550 282 C590 282 600 282 635 282 L635 304 C600 304 590 304 550 304 Z" fill="url(#profit-flow)" />
    {node(0, 96, "Advertising", "59,363 md USD", "#2563eb")}
    {node(0, 196, "FoA other revenue", "1,007 md USD", "#38bdf8")}
    {node(275, 108, "Family of Apps", "60,370 md USD revenue", "#2563eb")}
    {node(275, 248, "FoA operating profit", "23,394 md USD", "#16a34a")}
    {node(275, 358, "Reality Labs", "−4,619 md USD resultat", "#ef4444")}
    {node(550, 256, "Koncernens EBIT", "18,775 md USD", "#16a34a")}
    {node(550, 396, "Nettoresultat", "15,848 md USD", "#16a34a")}
  </svg><p className="mt-4 text-sm text-muted-foreground">Källa: Meta Q2 2026. Resultatbryggan använder endast rapporterade Q2-värden och inga egna modellantaganden.</p></figure>;
}

function ContentBlock({ block }: { block: Block }) {
  if (block.type === "heading") {
    const className = block.level === 1 ? "mt-10 text-3xl font-serif font-black text-emerald-950" : "mt-9 text-xl font-serif font-bold text-emerald-950";
    return <h3 className={className}>{inline(block.text)}</h3>;
  }
  if (block.type === "quote") return <blockquote className="my-8 border-l-4 border-amber-700 bg-amber-700/10 px-5 py-4 text-emerald-950/75 italic leading-7">{inline(block.text)}</blockquote>;
  if (block.type === "list") return <ul className="my-5 space-y-2 pl-5 text-emerald-950/75">{block.items.map((item) => <li key={item} className="list-disc leading-7">{inline(item)}</li>)}</ul>;
  if (block.type === "code") return <MetaRevenueFlow />;
  if (block.type === "table") return <div className="my-6 overflow-x-auto rounded border border-amber-700/25 bg-white/35"><table className="min-w-full text-sm"><thead className="bg-emerald-950 text-left text-xs uppercase tracking-wider text-white"><tr>{block.rows[0]?.map((cell) => <th className="whitespace-nowrap p-3 font-semibold" key={cell}>{inline(cell)}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, rowIndex) => <tr className="border-t border-emerald-900/10" key={`${rowIndex}-${row.join("-")}`}>{row.map((cell, cellIndex) => <td className="whitespace-nowrap p-3 align-top text-emerald-950/80" key={`${cellIndex}-${cell}`}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  return <p className="my-5 max-w-4xl leading-8 text-emerald-950/75">{inline(block.text)}</p>;
}

export default function MetaDeepDive({ data }: { data: AnalysisData }) {
  const { intro, sections } = useMemo(() => sectionsFrom(parseMarkdown(metaMarkdown)), []);
  const navigation = sections.filter((section) => REQUIRED_SECTION_TITLES.includes(section.title as typeof REQUIRED_SECTION_TITLES[number]));
  return <main className="min-h-screen bg-[#f4ead8] pt-24 pb-24 text-[#223027]"><SEO title="Meta Platforms – analys" description={data.summary} canonical="https://www.borsanalys.se/analyser/meta" />
    <header className="border-b border-emerald-900/12 bg-[radial-gradient(circle_at_top_left,rgba(184,134,11,0.22),transparent_34%),linear-gradient(135deg,#fbf4e8_0%,#f1e3cc_58%,#e7d6ba_100%)]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-sm font-black uppercase tracking-[.16em] text-amber-800">Spotlight · Nasdaq · META · 31 juli 2026</p><h1 className="mt-3 text-5xl font-black tracking-tight text-emerald-950 md:text-7xl">Meta Platforms</h1><p className="mt-5 max-w-3xl text-xl leading-8 text-emerald-950/75">{data.summary}</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded border border-amber-700/20 bg-white/45 p-4"><b className="text-emerald-950">BEVAKA</b><span className="block text-sm text-emerald-900/60">Rekommendation</span></div><div className="rounded border border-amber-700/20 bg-white/45 p-4"><b className="text-emerald-950">25/35</b><span className="block text-sm text-emerald-900/60">Totalrating</span></div><div className="rounded border border-amber-700/20 bg-white/45 p-4"><b className="text-emerald-950">612,50 USD</b><span className="block text-sm text-emerald-900/60">12 mån. värde</span></div><div className="rounded border border-amber-700/20 bg-white/45 p-4"><b className="text-emerald-950">1 066,05 USD</b><span className="block text-sm text-emerald-900/60">5 år, viktat</span></div></div></div></header>
    <nav aria-label="Läsnavigation" className="sticky top-16 z-30 border-b border-emerald-900/12 bg-[#f7efe1]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 md:px-8">{navigation.map((section) => <a className="shrink-0 rounded border border-emerald-900/12 bg-white/35 px-3 py-2 text-xs font-black uppercase tracking-[.08em] text-emerald-950/70 hover:border-amber-700/40 hover:bg-amber-700/10" href={`#${section.id}`} key={section.id}>{section.title}</a>)}</div></nav>
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_250px]"><article className="min-w-0">{intro.map((block, index) => <ContentBlock key={index} block={block} />)}{sections.map((section) => <section className="scroll-mt-32 border-t border-emerald-900/12 py-12" id={section.id} key={section.id}><h2 className="mb-7 text-3xl font-black tracking-tight text-emerald-950 md:text-4xl">{section.title}</h2>{section.blocks.map((block, index) => <ContentBlock key={index} block={block} />)}</section>)}<div className="border-t border-emerald-900/12 pt-10 text-center text-sm font-semibold text-emerald-950/55">Slut på analys</div></article><aside className="hidden lg:block"><div className="sticky top-36 rounded border border-amber-700/20 bg-white/45 p-5 text-sm"><p className="font-black uppercase tracking-[.14em] text-emerald-950">Analysinformation</p><dl className="mt-4 space-y-3 text-emerald-900/70"><div><dt className="text-xs uppercase">Ticker</dt><dd className="font-semibold text-emerald-950">META</dd></div><div><dt className="text-xs uppercase">Risknivå</dt><dd className="font-semibold text-emerald-950">Hög</dd></div><div><dt className="text-xs uppercase">Status</dt><dd className="font-semibold text-emerald-950">Dold före publicering</dd></div></dl></div></aside></div></main>;
}
