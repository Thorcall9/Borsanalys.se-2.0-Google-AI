import React, { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  LineChart,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../SEO";
import plejdMarkdown from "../../../analyses/Plejd_aktieanalys_superanalys.md?raw";
import plejdSankeyHtml from "../../../analyses/plejd_sankey_Q1_2026.html?raw";
import { AnalysisData } from "../../types/analysis.js";
import AdUnit from "./AdUnit";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import NextAnalysisButton from "./NextAnalysisButton";

type PlejdDeepDiveProps = {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData | null;
};

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "quote"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "rule" };

const markdownSource = plejdMarkdown;

const HERO_STATS = [
  { label: "Totalpoäng", value: "30/40", icon: Target },
  { label: "Rekommendation", value: "KÖP", icon: CheckCircle2 },
  { label: "P/E TTM", value: "~57-58x", icon: BarChart3 },
  { label: "Nettokassa", value: "~146 MSEK", icon: ShieldAlert }
];

const NAV_ITEMS = [
  "Snabböversikt",
  "Företagsöversikt",
  "Affärsmodell",
  "Konkurrensfördelar",
  "Finansiell Utveckling",
  "Scorecard",
  "Värdering",
  "Kursdrivare",
  "Risker",
  "Scenarioanalys",
  "Slutlig Bedömning"
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)\.\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripMarkdown(value: string) {
  return value
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^#+\s+/, "")
    .replace(/^>\s?/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/✅|⚠️/g, "")
    .trim();
}

function parseInline(value: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${match.index}-b`}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${match.index}-i`}>{token.slice(1, -1)}</em>);
    }
    cursor = match.index + token.length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const current = lines[index].trim();
        const cells = current
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => cell.trim());
        const separator = cells.every((cell) => /^:?-{3,}:?$/.test(cell));
        if (!separator) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", lines: quoteLines });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^[0-9]+\.\s+/.test(trimmed) || /^[✅⚠️]/.test(trimmed)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        (/^[-*]\s+/.test(lines[index].trim()) ||
          /^[0-9]+\.\s+/.test(lines[index].trim()) ||
          /^[✅⚠️]/.test(lines[index].trim()))
      ) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, "").replace(/^[0-9]+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        /^#{1,4}\s+/.test(current) ||
        current.startsWith("|") ||
        current.startsWith(">") ||
        /^-{3,}$/.test(current) ||
        /^[-*]\s+/.test(current) ||
        /^[0-9]+\.\s+/.test(current) ||
        /^[✅⚠️]/.test(current)
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraphLines });
  }

  return blocks;
}

function splitSections(blocks: MarkdownBlock[]) {
  const sections: { title: string; id: string; blocks: MarkdownBlock[] }[] = [];
  let current: { title: string; id: string; blocks: MarkdownBlock[] } | null = null;

  blocks.forEach((block) => {
    if (block.type === "heading" && block.level === 2) {
      if (current) sections.push(current);
      current = { title: stripMarkdown(block.text), id: slugify(stripMarkdown(block.text)), blocks: [block] };
      return;
    }

    if (!current) {
      current = { title: "Introduktion", id: "introduktion", blocks: [] };
    }
    current.blocks.push(block);
  });

  if (current) sections.push(current);
  return sections;
}

function sanitizeSankey(html: string) {
  return html.replace(/<body([^>]*)>/, '<body$1 style="margin:0;background:#f7efe1;color:#1f2a22;">');
}

function TableBlock({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="my-8 overflow-hidden rounded border border-emerald-800/15 bg-[#fffaf0] shadow-[0_18px_70px_rgba(61,43,21,0.10)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          {head && (
            <thead className="bg-[#e8dcc6] text-[11px] uppercase tracking-[0.16em] text-emerald-900">
              <tr>
                {head.map((cell, index) => (
                  <th key={`${cell}-${index}`} className="border-b border-emerald-900/10 px-4 py-3 font-black">
                    {parseInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-emerald-900/[0.045]">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="border-b border-emerald-900/10 px-4 py-3 text-[#243228]">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScoreLikeTable({ rows }: { rows: string[][] }) {
  const [, ...body] = rows;
  return (
    <div className="my-8 grid gap-3 md:grid-cols-2">
      {body.map((row, index) => (
        <motion.div
          key={`${row[0]}-${index}`}
          whileHover={{ y: -2 }}
          className="rounded border border-amber-700/20 bg-gradient-to-br from-[#fff7e8] to-[#efe3cb] p-4 shadow-[0_0_0_rgba(120,83,23,0)] transition-shadow hover:shadow-[0_18px_50px_rgba(120,83,23,0.14)]"
        >
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-sm font-black uppercase tracking-[0.12em] text-emerald-900">{parseInline(row[0] || "")}</h4>
            <div className="shrink-0 rounded bg-amber-700/10 px-2 py-1 text-sm font-black text-amber-900">{parseInline(row[1] || "")}</div>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#334238]">{parseInline(row.slice(2).join(" · "))}</p>
        </motion.div>
      ))}
    </div>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    const clean = stripMarkdown(block.text);
    if (block.level === 1) return null;
    if (block.level === 2) return null;
    if (block.level === 3) {
      return <h3 className="mt-10 text-2xl font-black tracking-tight text-emerald-950">{parseInline(block.text)}</h3>;
    }
    return <h4 className="mt-8 text-lg font-black text-emerald-900">{parseInline(clean)}</h4>;
  }

  if (block.type === "paragraph") {
    const text = block.lines.join(" ");
    if (!text) return null;
    if (text.startsWith("*Disclaimer:")) {
      return <p className="mt-10 rounded border border-amber-700/20 bg-amber-700/[0.07] p-4 text-sm leading-7 text-[#4a3820]">{parseInline(text)}</p>;
    }
    return <p className="my-5 text-[17px] leading-8 text-[#243228]">{parseInline(text)}</p>;
  }

  if (block.type === "table") {
    const firstHeader = stripMarkdown(block.rows[0]?.[0] || "");
    if (firstHeader === "Dimension") return <ScoreLikeTable rows={block.rows} />;
    return <TableBlock rows={block.rows} />;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-l-4 border-amber-700 bg-amber-700/[0.08] px-5 py-4 text-lg font-semibold leading-8 text-[#3a2b16]">
        {block.lines.map((line, index) => (
          <p key={index}>{parseInline(line)}</p>
        ))}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-6 grid gap-3">
        {block.items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 rounded border border-emerald-900/12 bg-white/55 px-4 py-3 text-[15px] leading-7 text-[#243228] transition-shadow hover:shadow-[0_12px_40px_rgba(6,95,70,0.10)]">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-700" />
            <span>{parseInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <div className="my-10 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />;
}

function SectionShell({ title, id, children }: { title: string; id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-emerald-900/12 py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded border border-amber-700/25 bg-amber-700/10 text-amber-800">
          <LineChart size={18} />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-emerald-950 md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function PlejdDeepDive({ data, nextAnalysis }: PlejdDeepDiveProps) {
  const blocks = useMemo(() => parseMarkdown(markdownSource), []);
  const sections = useMemo(() => splitSections(blocks), [blocks]);
  const sanitizedSankeyHtml = useMemo(() => sanitizeSankey(plejdSankeyHtml), []);

  return (
    <div className="min-h-screen bg-[#f4ead8] text-[#223027]">
      <SEO title="Analys: Plejd AB (PLEJD)" description={data.summary} />

      <header className="relative overflow-hidden border-b border-emerald-900/12 bg-[radial-gradient(circle_at_top_left,rgba(184,134,11,0.22),transparent_34%),linear-gradient(135deg,#fbf4e8_0%,#f1e3cc_58%,#e7d6ba_100%)] pt-24">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Link to="/analys" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-amber-800 transition-colors hover:text-emerald-900">
            <ArrowLeft size={16} /> Till analysarkivet
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded border border-amber-700/25 bg-amber-700/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-900">
                <Sparkles size={14} /> Spotlight · PLEJD
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-emerald-950 md:text-7xl">
                Plejd AB
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-9 text-[#334238]">
                {data.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {HERO_STATS.map(({ label, value, icon: Icon }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3 }}
                  className="rounded border border-amber-700/20 bg-white/45 p-4 shadow-[0_0_0_rgba(120,83,23,0)] backdrop-blur transition-shadow hover:shadow-[0_18px_60px_rgba(120,83,23,0.16)]"
                >
                  <Icon className="mb-4 text-amber-800" size={19} />
                  <div className="text-2xl font-black text-emerald-950">{value}</div>
                  <div className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-900/58">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-16 z-30 border-b border-emerald-900/12 bg-[#f7efe1]/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${slugify(item)}`}
              className="shrink-0 rounded border border-emerald-900/12 bg-white/35 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-950/62 transition hover:border-amber-700/40 hover:bg-amber-700/10 hover:text-amber-900"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="min-w-0">
          {sections.map((section) => (
            <React.Fragment key={section.id}>
              <SectionShell title={section.title} id={section.id}>
                {section.id === "affarsmodell" && (
                  <div className="mb-10 overflow-hidden rounded border border-amber-700/25 bg-[#f7efe1] shadow-[0_24px_90px_rgba(61,43,21,0.16)]">
                    <div className="flex items-center justify-between gap-4 border-b border-emerald-900/10 px-4 py-3">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-amber-900">Sankey-diagram</h3>
                      </div>
                      <ExternalLink className="text-emerald-900/42" size={17} />
                    </div>
                    <iframe
                      title="Plejd Sankey Q1 2026"
                      srcDoc={sanitizedSankeyHtml}
                      className="h-[620px] w-full border-0 bg-[#f7efe1]"
                      loading="lazy"
                    />
                  </div>
                )}

                {section.blocks.map((block, index) => (
                  <MarkdownBlockView key={`${section.id}-${index}`} block={block} />
                ))}
              </SectionShell>

              {section.id === "snabboversikt" && <AdUnit variant="top-display" className="my-10" />}
              {section.id === "finansiell-utveckling" && <AdUnit variant="middle-article" className="my-10" />}
            </React.Fragment>
          ))}

          <AnalysisDisclaimer slug={data.slug} disclosureKey={data.disclosureKey as any} />
          {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-4">
            <div className="rounded border border-amber-700/20 bg-[#fff8eb] p-5 shadow-[0_20px_70px_rgba(61,43,21,0.12)]">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-amber-900">
                <Zap size={15} /> Snabbfakta
              </div>
              <div className="space-y-3">
                {[
                  ["Kurs", data.price],
                  ["Börsvärde", data.marketCap || "-"],
                  ["P/E", data.pe],
                  ["Direktavkastning", data.yield],
                  ["Rimligt värde", data.targetPrice || "-"]
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-emerald-900/10 pb-3 text-sm">
                    <span className="text-emerald-950/58">{label}</span>
                    <span className="font-black text-emerald-950">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-emerald-900/15 bg-[#fff8eb] p-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-900/70">
                <TrendingUp size={15} /> Läsdelar
              </div>
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <a key={item} href={`#${slugify(item)}`} className="rounded px-3 py-2 text-sm text-emerald-950/65 transition hover:bg-emerald-900/8 hover:text-amber-900">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
