import React, { ReactNode, useMemo, useState } from "react";
import { ArrowLeft, Clock, Calendar, BookOpen, AlertCircle, FileText, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import AdUnit from "./AdUnit";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import NextAnalysisButton from "./NextAnalysisButton";
import RecommendationInfo from "./RecommendationInfo";
import VerdictBadge from "./VerdictBadge";
import { AnalysisData } from "../../types/analysis.js";
import { analyses } from "../../data/analyses/index.js";

type ReportCommentProps = {
  data: AnalysisData;
  markdown: string;
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

function stripMarkdown(value: string) {
  return value
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^#+\s+/, "")
    .replace(/^>\s?/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
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
      nodes.push(<strong key={`${match.index}-b`} className="font-extrabold text-foreground">{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${match.index}-i`} className="italic">{token.slice(1, -1)}</em>);
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

    if (/^[-*]\s+/.test(trimmed) || /^[0-9]+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        (/^[-*]\s+/.test(lines[index].trim()) || /^[0-9]+\.\s+/.test(lines[index].trim()))
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
        /^```/.test(current) ||
        /^#{1,4}\s+/.test(current) ||
        current.startsWith("|") ||
        /^-{3,}$/.test(current) ||
        /^[-*]\s+/.test(current) ||
        /^[0-9]+\.\s+/.test(current) ||
        current.startsWith(">")
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

function TableBlock({ rows }: { rows: string[][] }) {
  const headers = rows[0] || [];
  const bodyRows = rows.slice(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm text-foreground">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {headers.map((h, i) => (
                <th key={i} className="px-5 py-4 font-black uppercase tracking-wider text-[10px] text-muted-foreground">
                  {stripMarkdown(h)}
                </th>
              ))}
              <th aria-label="Radalternativ" className="w-12 px-3 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bodyRows.map((row, rIndex) => (
              <React.Fragment key={rIndex}>
              <tr className={`group transition-colors ${expandedRow === rIndex ? "bg-primary/5" : "hover:bg-muted/30"}`}>
                {row.map((cell, cIndex) => (
                  <td key={cIndex} className={`px-5 py-4 font-medium ${cIndex > 0 ? "font-mono text-right" : ""}`}>
                    {parseInline(cell)}
                  </td>
                ))}
                <td className="px-3 py-3 text-right">
                  <button
                    type="button"
                    aria-label={`${expandedRow === rIndex ? "Dölj" : "Visa"} rad ${rIndex + 1}`}
                    aria-expanded={expandedRow === rIndex}
                    onClick={() => setExpandedRow(expandedRow === rIndex ? null : rIndex)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronDown size={16} className={`transition-transform ${expandedRow === rIndex ? "rotate-180 text-primary" : ""}`} />
                  </button>
                </td>
              </tr>
              {expandedRow === rIndex && (
                <tr className="bg-primary/5">
                  <td colSpan={headers.length + 1} className="px-5 pb-5 pt-1">
                    <div className="grid gap-2 rounded-xl border border-primary/15 bg-background/70 p-4 sm:grid-cols-2">
                      {row.map((cell, cIndex) => (
                        <div key={cIndex} className="flex min-w-0 items-baseline justify-between gap-4 text-sm">
                          <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stripMarkdown(headers[cIndex] || "")}</span>
                          <span className="text-right font-medium text-foreground">{parseInline(cell)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    const clean = stripMarkdown(block.text);
    if (block.level === 1) return null; // skip duplicate title
    if (block.level === 2) {
      return (
        <h2 className="mt-14 mb-6 text-2xl md:text-3xl font-black tracking-tight text-foreground border-b border-border pb-3">
          {parseInline(clean)}
        </h2>
      );
    }
    if (block.level === 3) {
      return <h3 className="mt-10 mb-4 text-xl font-bold tracking-tight text-foreground">{parseInline(block.text)}</h3>;
    }
    return <h4 className="mt-8 mb-3 text-lg font-bold text-muted-foreground">{parseInline(clean)}</h4>;
  }

  if (block.type === "paragraph") {
    const text = block.lines.join(" ");
    if (!text) return null;
    if (text.startsWith("Rapportkommentar |") || text.startsWith("Marknadsuppdatering |")) return null; // skip subheader
    
    // Format "Uppdaterad syn:" or "Slutsats:" as callouts
    if (text.startsWith("Uppdaterad syn:") || text.startsWith("**Uppdaterad syn:**") || text.startsWith("Vår bedömning:") || text.startsWith("**Vår bedömning:**")) {
      return (
        <div className="my-8 rounded-3xl border border-primary/25 bg-primary/5 p-6 md:p-8 shadow-xl shadow-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <AlertCircle size={20} />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-primary">Rekommendation & Syn</div>
              <p className="text-base leading-relaxed font-semibold text-foreground/90">{parseInline(text)}</p>
            </div>
          </div>
        </div>
      );
    }

    return <p className="my-6 text-[16px] md:text-[17px] leading-relaxed text-muted-foreground font-medium">{parseInline(text)}</p>;
  }

  if (block.type === "table") {
    return <TableBlock rows={block.rows} />;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-l-4 border-primary bg-primary/5 px-6 py-5 rounded-r-2xl text-lg font-semibold leading-relaxed text-foreground/80">
        {block.lines.map((line, index) => (
          <p key={index}>{parseInline(line)}</p>
        ))}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-6 grid gap-3 pl-2">
        {block.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground font-medium text-[16px]">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{parseInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <div className="my-10 h-px bg-border" />;
}

export default function ReportComment({
  data,
  markdown,
  onToggleWatchlist,
  isInWatchlist,
  isWatchlistLoading,
  nextAnalysis,
}: ReportCommentProps) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);
  const isMarketUpdate = data.contentType === "market-update";
  const contentTypeLabel = isMarketUpdate ? "Marknadsuppdatering" : "Rapportkommentar";
  const relatedAnalysis = data.relatedAnalysisSlug
    ? analyses[data.relatedAnalysisSlug]
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/analys" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors mb-8">
          <ArrowLeft size={14} /> Till Analysarkivet
        </Link>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20">
              <FileText size={12} /> {contentTypeLabel}
            </span>
            <span>{data.ticker}</span>
            <span className="opacity-45">•</span>
            <span>{data.market}</span>
            <span className="opacity-45">•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} /> {data.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] text-foreground">
            {data.listTitle || data.title}
          </h1>

          {/* Quick Metrics Bar */}
          <div className={`grid grid-cols-2 ${data.dividend ? "md:grid-cols-5" : "md:grid-cols-4"} gap-4 p-5 rounded-3xl border border-border bg-card/60 backdrop-blur shadow-sm`}>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Syn</div>
              <VerdictBadge verdict={data.recommendation} />
            </div>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Kurs</div>
              <div className="text-lg font-black text-foreground">{data.price}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">P/E (R12)</div>
              <div className="text-lg font-black text-foreground">{data.pe}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Senast beslutad utdelning</div>
              <div className="text-lg font-black text-foreground">{data.dividend}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Direktavkastning</div>
              <div className="text-lg font-black text-foreground">{data.yield?.includes('%') ? data.yield : (parseFloat(data.yield) ? `${(parseFloat(data.yield) * 100).toFixed(1)}%` : data.yield)}</div>
            </div>
          </div>

          {data.recommendationReason && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.recommendationReason}</p>
          )}
          <RecommendationInfo />
        </header>

        {relatedAnalysis && (
          <aside className="mb-10 rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">
              Relaterad grundanalys
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Detta är en marknadsuppdatering till vår fullständiga analys av {relatedAnalysis.title}.
            </p>
            <Link
              to={"/analys/" + relatedAnalysis.slug}
              className="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
            >
              Läs grundanalysen
            </Link>
          </aside>
        )}

        {/* Main Content */}
        <article className="prose prose-slate max-w-none">
          {blocks.map((block, index) => (
            <MarkdownBlockView key={index} block={block} />
          ))}
        </article>

        {/* Call to action & Disclaimer */}
        <div className="mt-16 pt-8 border-t border-border space-y-8">
          <AnalysisDisclaimer />
          {nextAnalysis && <NextAnalysisButton analysis={nextAnalysis} />}
        </div>
      </div>
    </div>
  );
}
