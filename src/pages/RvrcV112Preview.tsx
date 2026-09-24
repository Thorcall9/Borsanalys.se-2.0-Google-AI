import React, { type ReactNode, useMemo } from "react";
import { AlertTriangle, BarChart3, CalendarDays, ShieldAlert, Target } from "lucide-react";
import SEO from "../components/SEO";
import AnalysisLayout, { type AnalysisSection } from "../components/analysis/AnalysisLayout";
import AlertBox from "../components/analysis/AlertBox";
import SectionHeader from "../components/analysis/SectionHeader";
import rvrcV112Markdown from "../../analyses/RVRC/RVRC_aktieanalys_v11_2_september2026.md?raw";

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "list"; items: string[] };

const sections: AnalysisSection[] = [
  { id: "investeringsbeslut", number: "01", title: "Investeringsbeslut" },
  { id: "metod-och-epistemisk-status", number: "02", title: "Metod och status" },
  { id: "scenarioanalys", number: "03", title: "Scenarioanalys" },
  { id: "icaniwill-och-kvaliteten-pa-tillvaxten", number: "04", title: "ICANIWILL" },
  { id: "m-a-earn-out-och-balansrakning", number: "05", title: "M&A och balansräkning" },
  { id: "risk-reward-och-priszoner", number: "06", title: "Risk/reward och priszoner" },
  { id: "varfor-marknaden-kan-prisa-aktien-lagt", number: "07", title: "Marknadens syn" },
  { id: "q1-scorecard-forutbestamda-uppdateringsregler", number: "08", title: "Q1-scorecard" },
  { id: "centrala-risker", number: "09", title: "Centrala risker" },
  { id: "slutsats", number: "10", title: "Slutsats" },
];

const headingId = (value: string) => value
  .toLocaleLowerCase("sv-SE")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();
    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) index += 1;
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
        const cells = lines[index].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const line = lines[index].trim();
      if (!line || /^```/.test(line) || /^#{1,4}\s+/.test(line) || line.startsWith("|") || /^[-*]\s+/.test(line)) break;
      paragraphLines.push(line);
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraphLines });
  }

  return blocks;
}

function inline(value: string): ReactNode[] {
  const parts = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("**")) return <strong key={index} className="font-extrabold text-foreground">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`")) return <code key={index} className="rounded bg-muted px-1.5 py-0.5 text-[0.88em] font-semibold text-foreground">{part.slice(1, -1)}</code>;
    return part;
  });
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    if (block.level === 1) return null;
    const id = headingId(block.text);
    if (block.level === 2) {
      const section = sections.find((item) => item.id === id);
      return (
        <section id={id} className="scroll-mt-28 border-t border-border pt-12 first:border-t-0 first:pt-0">
          <SectionHeader number={section?.number ?? "—"} title={block.text} />
        </section>
      );
    }
    if (block.level === 3) return <h3 className="mt-9 text-xl font-black tracking-tight text-foreground">{inline(block.text)}</h3>;
    return <h4 className="mt-7 text-base font-extrabold text-foreground">{inline(block.text)}</h4>;
  }

  if (block.type === "paragraph") {
    return <p className="my-5 max-w-4xl text-[16px] leading-8 text-muted-foreground md:text-[17px]">{inline(block.lines.join(" "))}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="my-6 grid max-w-4xl gap-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-[15px] leading-7 text-muted-foreground shadow-sm">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{inline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  const [head, ...body] = block.rows;
  return (
    <div className="my-8 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-muted/50 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>{head.map((cell) => <th key={cell} className="border-b border-border px-4 py-3 font-black">{inline(cell)}</th>)}</tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-primary/5">
                {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="border-b border-border/70 px-4 py-3 text-muted-foreground">{inline(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RvrcV112Preview() {
  const blocks = useMemo(() => parseMarkdown(rvrcV112Markdown), []);

  return (
    <>
      <SEO
        title="RevolutionRace – Grundanalys v11.2"
        description="Onoterad förhandsgranskning av RVRC Holding v11.2."
        canonical="/preview/revolutionrace-v11-2-2026"
        noIndex
      />
      <AnalysisLayout
        companyName="RevolutionRace"
        stockSlug="revolutionrace-2026"
        ticker="RVRC"
        subtitle="Grundanalys v11.2 · Förhandsgranskning"
        livePrice="49,22 kr"
        liveChange="Referenskurs 23 sep 2026"
        date="24 september 2026"
        dataSources="Källa: RVRC v11.2 · Ej publicerad"
        sections={sections}
        accentColor="#10B981"
        theme="light"
        hideDefaultWatchlist
        compactSections
        tightContent
      >
        <article className="mx-auto max-w-5xl">
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-emerald-200 bg-card shadow-xl shadow-emerald-950/5">
            <div className="border-b border-emerald-100 bg-emerald-50/70 px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800 md:px-9">
              Privat Vercel Preview · Ej indexerad och inte listad på Börsanalys.se
            </div>
            <div className="p-6 md:p-9">
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">NASDAQ Stockholm · Outdoor/D2C</p>
                  <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">RVRC Holding</h1>
                  <p className="mt-3 text-xl font-bold text-muted-foreground">Grundanalys v11.2 · September 2026</p>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">Sannolikhetsvägd EPS × P/E-värdering med analytikerkonsensus som sekundär kontroll.</p>
                </div>
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                  <Target size={15} /> KÖP · MEDEL_HÖG risk
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Metric icon={<BarChart3 size={17} />} label="Referenskurs" value="49,22 kr" detail="23 september 2026" />
                <Metric icon={<Target size={17} />} label="Vägt terminalvärde" value="73,1 kr" detail="30 juni 2029" />
                <Metric icon={<CalendarDays size={17} />} label="Värdepotential" value="15,3 %" detail="annualiserad" />
                <Metric icon={<ShieldAlert size={17} />} label="Huvudmetod" value="EPS × P/E" detail="EV/EBIT ej beslutsklar" />
              </div>
            </div>
          </div>

          <AlertBox
            type="warning"
            title="Metodavgränsning"
            message="EV/EBIT är NOT_DECISION_GRADE i denna version. Rekommendationen stöds av den normaliserade EPS × P/E-modellen, inte av en EV→equity-brygga."
          />

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-black/5 md:p-10">
            <p className="mb-10 max-w-4xl border-b border-border pb-8 text-sm italic leading-7 text-muted-foreground">Denna analys är en redaktionell bedömning baserad på offentligt tillgänglig information och utgör inte personlig investeringsrådgivning. Alla investeringsbeslut fattas på läsarens eget ansvar och efter egen bedömning.</p>
            <div className="space-y-1">
              {blocks.map((block, index) => <MarkdownBlockView key={index} block={block} />)}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <p><strong>Förhandsgranskning:</strong> sidan är medvetet frånkopplad från startsidan, analysarkivet, sök och sitemap. Äldre RVRC-analys är oförändrad.</p>
          </div>
        </article>
      </AnalysisLayout>
    </>
  );
}

function Metric({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground">{icon}{label}</div>
      <div className="mt-3 text-2xl font-black tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-xs font-semibold text-muted-foreground">{detail}</div>
    </div>
  );
}
