import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, FileText, ShoppingBag, Star } from "lucide-react";
import SEO from "../components/SEO";
import { analyses } from "../data/analyses";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "../lib/seo/structuredData";
import rvrcMarkdown from "../../scratch/drafts/rvrc-2026-opublicerad-analys.md?raw";
import rvrcSankeyHtml from "../../analyses/rvrc_sankey_9m_2026.html?raw";

const RVRC_PREMIUM_UNLOCK_KEY = "rvrcPremiumUnlocked";
const rvrcAnalysis = analyses["revolutionrace-2026"];

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "list"; items: string[] }
  | { type: "rule" }
  | { type: "code"; language: string; lines: string[] };

function PreviewGuard({ children }: { children: React.ReactNode }) {
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
  return isLocal ? <>{children}</> : <Navigate to="/analys" replace />;
}

function stripMarkdown(value: string) {
  return value
    .replace(/^#+\s+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim();
}

function parseInline(value: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${match.index}-b`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={`${match.index}-i`}>{token.slice(1, -1)}</em>);
    } else {
      nodes.push(
        <code key={`${match.index}-c`} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">
          {token.slice(1, -1)}
        </code>
      );
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

    const fence = /^```(\w+)?/.exec(trimmed);
    if (fence) {
      const language = fence[1] || "";
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language, lines: codeLines });
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
        const cells = lines[index]
          .trim()
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
      const current = lines[index].trim();
      if (
        !current ||
        /^```/.test(current) ||
        /^#{1,4}\s+/.test(current) ||
        current.startsWith("|") ||
        /^-{3,}$/.test(current) ||
        /^[-*]\s+/.test(current)
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

function RvrcScenarioChart() {
  const yMin = 25;
  const yMax = 135;
  const chart = { left: 86, right: 650, top: 32, bottom: 286 };
  const y = (value: number) => chart.bottom - ((value - yMin) / (yMax - yMin)) * (chart.bottom - chart.top);
  const xStart = chart.left;
  const xEnd = chart.right;
  const current = 59.25;
  const scenarios = [
    { name: "Bear", end: 37.4, color: "#dc2626", label: "Bear 37 kr", cagr: "-8,8 % CAGR" },
    { name: "Base", end: 74.4, color: "#d97706", label: "Base år 5 ~74 kr", cagr: "+4,7 % CAGR" },
    { name: "Bull", end: 128.3, color: "#059669", label: "Bull 128 kr", cagr: "+16,7 % CAGR" },
  ];

  return (
    <section className="my-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6" data-testid="rvrc-scenario-chart">
      <div className="mb-4">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Scenarioanalys – möjlig kursutveckling på 5 års sikt</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tre möjliga kursbanor från dagens kurs 59,25 kr. Avkastningen är exklusive utdelning.
        </p>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 340" role="img" aria-label="Scenarioanalys för RevolutionRace med Bear, Base och Bull över fem år." className="h-auto w-full">
          <rect x="0" y="0" width="720" height="360" rx="8" fill="#fffdfa" />

          {[25, 50, 75, 100, 125].map((tick) => (
            <g key={tick}>
              <line x1={chart.left} x2={chart.right} y1={y(tick)} y2={y(tick)} stroke="#e2e8f0" strokeWidth="1" />
              <text x={chart.left - 14} y={y(tick) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">{tick}</text>
            </g>
          ))}

          <rect x={chart.left} y={y(50)} width={chart.right - chart.left} height={Math.max(2, y(48) - y(50))} fill="#10b981" opacity="0.08" />

          <line x1={chart.left} x2={chart.right} y1={y(58)} y2={y(58)} stroke="#64748b" strokeWidth="1" strokeDasharray="4 5" opacity="0.38" />

          <rect x={chart.left} y={y(80)} width={chart.right - chart.left} height={y(74) - y(80)} fill="#2563eb" opacity="0.07" />
          <text x={chart.right - 130} y={y(80) + 14} fontSize="11" fontWeight="800" fill="#1d4ed8">Konsensus 74–80 kr</text>

          <line x1={chart.left} x2={chart.right} y1={y(128)} y2={y(128)} stroke="#059669" strokeWidth="1" strokeDasharray="4 5" opacity="0.28" />

          <line x1={chart.left} x2={chart.left} y1={chart.top} y2={chart.bottom} stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1={chart.left} x2={chart.right} y1={chart.bottom} y2={chart.bottom} stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="18" y={(chart.top + chart.bottom) / 2} transform={`rotate(-90 18 ${(chart.top + chart.bottom) / 2})`} textAnchor="middle" fontSize="12" fontWeight="900" fill="#475569">Kurs, SEK</text>

          {scenarios.map((scenario) => (
            <g key={scenario.name}>
              <line
                x1={xStart}
                y1={y(current)}
                x2={xEnd}
                y2={y(scenario.end)}
                stroke={scenario.color}
                strokeWidth="3"
                strokeDasharray="8 7"
                strokeLinecap="round"
              />
              <circle cx={xEnd} cy={y(scenario.end)} r="5" fill={scenario.color} />
            </g>
          ))}

          <circle cx={xStart} cy={y(current)} r="6" fill="#0f172a" />
          <text x={xStart + 12} y={y(current) - 8} fontSize="12" fontWeight="900" fill="#0f172a">Dagens kurs 59,25 kr</text>

          <g fontSize="12" fontWeight="900">
            <text x={xEnd - 94} y={y(128.3) - 16} fill="#047857">Bull 128 kr</text>
            <text x={xEnd - 94} y={y(128.3) - 1} fill="#047857">+16,7 % CAGR</text>

            <text x={xEnd - 126} y={y(74.4) + 26} fill="#b45309">Base år 5 ~74 kr</text>
            <text x={xEnd - 126} y={y(74.4) + 41} fill="#b45309">+4,7 % CAGR</text>

            <text x={xEnd - 92} y={y(37.4) + 22} fill="#b91c1c">Bear 37 kr</text>
            <text x={xEnd - 92} y={y(37.4) + 37} fill="#b91c1c">-8,8 % CAGR</text>
          </g>

          <text x={xStart} y={chart.bottom + 28} textAnchor="middle" fontSize="12" fontWeight="900" fill="#475569">Idag</text>
          <text x={xEnd} y={chart.bottom + 28} textAnchor="middle" fontSize="12" fontWeight="900" fill="#475569">År 5</text>
        </svg>
      </div>

      <div className="mt-4 grid gap-2 text-xs font-bold text-slate-600 sm:grid-cols-3">
        <div className="rounded border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-emerald-800">Köpnivå 48–50 kr</div>
        <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2">Eget 12m-ankare ~58 kr</div>
        <div className="rounded border border-blue-100 bg-blue-50/60 px-3 py-2 text-blue-800">Konsensus 12m 74–80 kr</div>
      </div>

      <p className="mt-3 text-xs leading-6 text-slate-500">
        Konsensus visas som ett svagt band eftersom nedre delen av intervallet överlappar Base år 5. Scenarioavkastningen är exklusive utdelning.
      </p>
    </section>
  );
}

function TableBlock({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  const isRiskTable = head?.[0] === "Risk" && head?.[2] === "Risknivå";
  const isScenarioTable = head?.[0] === "Scenario" && head?.[3] === "EPS år 5";
  const riskStyles: Record<string, string> = {
    "Hög": "border-red-200 bg-red-50 text-red-700 before:bg-red-500",
    "Medel": "border-orange-200 bg-orange-50 text-orange-700 before:bg-orange-500",
    "Låg": "border-emerald-200 bg-emerald-50 text-emerald-700 before:bg-emerald-500",
  };

  const table = (
    <div className="my-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          {head && (
            <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.14em] text-slate-600">
              <tr>
                {head.map((cell, index) => (
                  <th key={`${cell}-${index}`} className="border-b border-slate-200 px-4 py-3 font-black">
                    {parseInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-emerald-50/40">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="border-b border-slate-100 px-4 py-3 text-slate-700">
                    {isRiskTable && cellIndex === 2 ? (
                      <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] before:h-2 before:w-2 before:rounded-full ${riskStyles[cell] || "border-slate-200 bg-slate-50 text-slate-700 before:bg-slate-400"}`}>
                        {cell}
                      </span>
                    ) : (
                      parseInline(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {table}
      {isScenarioTable && <RvrcScenarioChart />}
    </>
  );
}

function sanitizeSankey(html: string) {
  return html.replace(/<body([^>]*)>/, '<body$1 style="margin:0;background:#f7efe1;color:#1f2a22;">');
}

function RvrcSankeyDiagram() {
  const sanitizedSankeyHtml = sanitizeSankey(rvrcSankeyHtml);

  return (
    <figure className="my-10 overflow-hidden rounded border border-amber-700/25 bg-[#f7efe1] shadow-[0_24px_90px_rgba(61,43,21,0.16)]" data-testid="rvrc-sankey">
      <div className="flex items-center justify-between gap-4 border-b border-emerald-900/10 px-4 py-3">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-amber-900">Sankey-diagram</h3>
        </div>
      </div>
      <iframe
        title="RevolutionRace Sankey 9 månader 2025/26"
        srcDoc={sanitizedSankeyHtml}
        className="h-[620px] w-full border-0 bg-[#f7efe1]"
        loading="lazy"
      />
    </figure>
  );
}

function RvrcHero({ isPreviewRoute }: { isPreviewRoute: boolean }) {
  const metrics = [
    { label: "Dagens kurs", value: "59,25 kr" },
    { label: "Rating", value: "25/35" },
    { label: "12 mån", value: "~58 kr" },
    { label: "5 år Base", value: "~74 kr" },
    { label: "Konsensus", value: "74–80 kr" },
    { label: "Nästa datum", value: "11 aug" },
  ];

  return (
    <header
      className="mb-10 overflow-hidden rounded-lg border border-emerald-700/15 shadow-sm"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #F4EFEB 0%, #FAF8F5 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -220,
          left: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative px-5 py-8 md:px-8 md:py-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-bold">
            <Link to="/analys" className="inline-flex items-center gap-2 text-stone-500 transition hover:text-emerald-800">
              <ArrowLeft size={16} />
              Analysarkiv
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-emerald-700">RVRC</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/25 bg-emerald-700/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-800">
              <ShoppingBag size={12} />
              Outdoor D2C
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100/70 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-stone-700">
              <Star size={12} />
              Bevaka
            </div>
          </div>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-emerald-700">
              Börsanalys.se · Carl Fredrik Thor · Juli 2026
            </div>
            <h1 className="m-0 text-[clamp(42px,7vw,88px)] font-black leading-[0.95] tracking-tight text-stone-950">
              RevolutionRace
            </h1>
            <div className="mt-2 text-[clamp(17px,2.4vw,28px)] font-light tracking-wide text-stone-500">
              Outdoor/D2C-analys 2026
            </div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-700">
              Kvalitetsbolag med mycket hög lönsamhet, nettokassa och stark DACH-position. Men dagens kurs kräver att tillväxten återaccelererar eller att marknaden fortsätter acceptera en högre multipel än modellens Base-case.
            </p>
            {isPreviewRoute && (
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-stone-500">
                <FileText size={16} /> scratch/drafts/rvrc-2026-opublicerad-analys.md
              </div>
            )}
          </div>

          <div className="text-left md:text-center">
            <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border-[3px] border-emerald-700/35 bg-emerald-700/10 shadow-[0_0_40px_rgba(5,150,105,0.14)]">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-700/80">Vår syn</span>
              <span className="mt-1 text-base font-black uppercase tracking-[0.05em] text-emerald-800">BEVAKA</span>
            </div>
            <div className="mt-4 font-mono text-2xl font-black text-emerald-800">25/35</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-500">Totalpoäng</div>
          </div>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-lg border border-emerald-700/15 bg-emerald-700/10 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-b border-r border-emerald-900/10 bg-white/45 px-4 py-4 last:border-r-0 sm:[&:nth-child(even)]:border-r-0 lg:[&:nth-child(even)]:border-r lg:[&:nth-child(6)]:border-r-0">
              <div className="mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-stone-500">{metric.label}</div>
              <div className="text-lg font-black text-stone-950">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function RvrcPremiumSection() {
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsUnlocked(window.localStorage.getItem(RVRC_PREMIUM_UNLOCK_KEY) === "true");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Ange en giltig e-postadress.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/newsletter/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
    } catch (signupError) {
      console.warn("Newsletter signup failed in preview environment.", signupError);
    } finally {
      window.localStorage.setItem(RVRC_PREMIUM_UNLOCK_KEY, "true");
      setIsUnlocked(true);
      setMessage("Tack! Premiumdelen är nu upplåst.");
      setIsSubmitting(false);
    }
  }

  const unlockItems = [
    "Full scenarioanalys med Bear, Base och Bull",
    "12-månaders känslighetsmatris",
    "5-årig känslighetsmatris",
    "Kassaflödesanalys med lager och rörelsekapital",
    "Full scorecard-motivering",
    "Triggerlista för vad som kan förändra rekommendationen",
    "Fördjupad jämförelse mot Pareto/konsensus",
  ];

  if (!isUnlocked) {
    return (
      <section className="my-10 rounded-lg border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm md:p-7">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Lås upp premiumdelen gratis</h3>
        <p className="mt-3 max-w-3xl text-[16px] leading-7 text-slate-700">
          Prenumerera på Börsanalys.se:s nyhetsbrev och få tillgång till den fullständiga värderingsmodellen bakom analysen.
        </p>

        <div className="mt-5 rounded-lg border border-white/80 bg-white/85 p-4">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-600">Du får tillgång till:</p>
          <ul className="mt-4 grid gap-2 text-[15px] leading-7 text-slate-700">
            {unlockItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-black text-emerald-700">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="rvrc-premium-email">
            E-post
          </label>
          <input
            id="rvrc-premium-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="din@email.se"
            className="min-h-12 rounded border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 rounded bg-emerald-700 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Låser upp..." : "Lås upp gratis"}
          </button>
        </form>
        <p className="mt-3 text-sm leading-6 text-slate-600">Ingen kostnad. Du kan avregistrera dig när som helst.</p>
        {error && <p className="mt-3 text-sm font-bold text-red-700">{error}</p>}
        {message && <p className="mt-3 text-sm font-bold text-emerald-800">{message}</p>}
      </section>
    );
  }

  return (
    <section className="my-10 space-y-8">
      {message && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          {message}
        </div>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Full scenarioanalys</h3>
        <p className="mt-3 text-[16px] leading-7 text-slate-700">
          Scenarierna visar hur känslig aktien är för två variabler: EPS-tillväxt och vilken multipel marknaden accepterar om fem år. Base är medvetet konservativt mot konsensus.
        </p>
        <TableBlock
          rows={[
            ["Case", "EPS idag", "Årlig tillväxt", "EPS år 5", "P/E år 5", "Framtida kurs", "Total kursavk.", "CAGR exkl. utd."],
            ["Bull", "3,08", "17 %", "6,75", "19x", "128 kr", "+116 %", "+16,7 %"],
            ["Base", "3,08", "10 %", "4,96", "15x", "74 kr", "+26 %", "+4,7 %"],
            ["Bear", "3,08", "2 %", "3,40", "11x", "37 kr", "−37 %", "−8,8 %"],
          ]}
        />
        <p className="text-[16px] leading-7 text-slate-700">
          Bull kräver att DACH/Tyskland återgår till tvåsiffrig tillväxt, att marginalerna hålls över 20 % och att återköp fortsätter bidra till vinst per aktie. P/E 19x motiveras först om marknaden får bevis på att inbromsningen var tillfällig.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">12-månaders känslighetsmatris</h3>
        <TableBlock
          rows={[
            ["Antagande", "EPS 26/27e", "P/E", "Modellvärde", "Avstånd mot 59,25 kr"],
            ["Bear", "3,72 kr", "13x", "48 kr", "−18 %"],
            ["Base", "3,72 kr", "15,5x", "58 kr", "−3 %"],
            ["Konsensusnära", "3,72 kr", "19–20x", "71–74 kr", "+20–25 %"],
          ]}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">5-årig känslighetsmatris</h3>
        <TableBlock
          rows={[
            ["Antagande", "EPS år 5", "P/E år 5", "Framtida kurs", "CAGR exkl. utd."],
            ["Lägre multipel", "4,96 kr", "12x", "60 kr", "0,2 %"],
            ["Base", "4,96 kr", "15x", "74 kr", "4,7 %"],
            ["Multipelåterhämtning", "4,96 kr", "18x", "89 kr", "8,5 %"],
          ]}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Kassaflöde, lager och kapitalallokering</h3>
        <p className="mt-3 text-[16px] leading-7 text-slate-700">
          FCF R12 på cirka 337 MSEK ligger nära redovisad vinst om cirka 332 MSEK, vilket stärker kvaliteten i resultatet. Samtidigt har lagret minskat från 543 till 409 MSEK och bidragit positivt till kassaflödet. Det gör FCF starkt men delvis hjälp av rörelsekapital.
        </p>
        <p className="mt-3 text-[16px] leading-7 text-slate-700">
          Utdelning och återköp summerar till omkring 326 MSEK mot FCF på 337 MSEK. Det är hållbart tack vare nettokassan, men lämnar begränsat utrymme för högre kapitalåterföring om tillväxten inte tar fart.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Full scorecard-motivering</h3>
        <TableBlock
          rows={[
            ["Dimension", "Betyg", "Motivering"],
            ["Företagsöversikt", "4/5", "Starkt nischat D2C-bolag med nettokassa och hög lönsamhet."],
            ["Affärsmodell", "4/5", "Kapitallätt modell och lojala kunder, men inga kontrakterade intäkter."],
            ["Konkurrensfördelar", "4/5", "Varumärke, datadriven modell och direktkundsrelation ger strukturell styrka."],
            ["Finansiell utveckling", "4/5", "Hög marginal, stark FCF-konvertering och god balansräkning."],
            ["Fundamental värdering", "2/5", "Dagens multipel är krävande mot en bromsande tillväxttakt."],
            ["Potentiella kursdrivare", "3/5", "Flera triggers finns, men de är ännu inte tillräckligt tydliga för köp."],
            ["Risker", "4/5", "Låg finansiell risk, men verklig operativ risk i DACH och tillväxttakten."],
          ]}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Triggerlista</h3>
        <TableBlock
          rows={[
            ["Trigger", "Effekt på tesen"],
            ["Lokal valutatillväxt över 10 %", "Skulle flytta Base-antagandet närmare Bull och konsensus."],
            ["Kurs under 50 kr", "Ger bättre säkerhetsmarginal i 12-månadersmodellen."],
            ["DACH fortsätter bromsa", "Ökar risken att multipeln faller mot Bear."],
            ["Bruttomarginal under 68 %", "Skulle indikera valuta-, tariff- eller prispress."],
            ["Lager byggs upp igen utan tillväxtlyft", "Risk för svagare FCF och lägre kapitalåterföring."],
          ]}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">Fördjupad Pareto/konsensus-jämförelse</h3>
        <p className="mt-3 text-[16px] leading-7 text-slate-700">
          Konsensusbilden ligger omkring 74–80 kr på 12 månaders sikt, vilket är klart mer positivt än modellens 12-månadersankare kring 58 kr. Skillnaden ligger främst i multipelantagandet: konsensus tycks acceptera P/E omkring 19–20x, medan modellen använder 15–15,5x vid inbromsande tillväxt.
        </p>
        <p className="mt-3 text-[16px] leading-7 text-slate-700">
          Det gör gapet till den viktigaste kontrollpunkten efter bokslutskommunikén. Om lokal valutatillväxt återaccelererar över 10 % kan konsensus få rätt. Om inbromsningen fortsätter är den konservativa modellen mer relevant.
        </p>
      </section>
    </section>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    const text = stripMarkdown(block.text);
    if (block.level === 1) return null;
    if (block.level === 2) {
      return <h2 className="mt-14 border-t border-slate-200 pt-12 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{parseInline(text)}</h2>;
    }
    if (block.level === 3) {
      return <h3 className="mt-10 text-2xl font-black tracking-tight text-slate-900">{parseInline(text)}</h3>;
    }
    return <h4 className="mt-8 text-lg font-black text-slate-800">{parseInline(text)}</h4>;
  }

  if (block.type === "paragraph") {
    const text = block.lines.join(" ");
    return <p className="my-5 text-[17px] leading-8 text-slate-700">{parseInline(text)}</p>;
  }

  if (block.type === "table") return <TableBlock rows={block.rows} />;

  if (block.type === "list") {
    return (
      <ul className="my-6 grid gap-3">
        {block.items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] leading-7 text-slate-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
            <span>{parseInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "code") {
    if (block.lines.join("\n").trim() === "RVRC_PREMIUM") {
      return <RvrcPremiumSection />;
    }

    if (block.lines.join("\n").trim().startsWith("SANKEY:")) {
      return <RvrcSankeyDiagram />;
    }

    if (block.language === "json") {
      return (
        <details className="my-8 rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.14em] text-slate-600">
            Visa strukturerad metadata
          </summary>
          <pre className="mt-4 max-h-[480px] overflow-auto rounded bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>{block.lines.join("\n")}</code>
          </pre>
        </details>
      );
    }
    return (
      <pre className="my-8 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
        <code>{block.lines.join("\n")}</code>
      </pre>
    );
  }

  return <div className="my-10 h-px bg-slate-200" />;
}

export default function RvrcPreview() {
  const blocks = useMemo(() => parseMarkdown(rvrcMarkdown), []);
  const isPreviewRoute = window.location.pathname.startsWith("/preview/");

  const content = (
    <>
      <SEO
        title={rvrcAnalysis.title}
        description={rvrcAnalysis.summary}
        canonical="/analys/revolutionrace-2026"
        ogType="article"
        ogImage="/og-image.png"
        publishedTime={rvrcAnalysis.date}
        jsonLd={[
          buildArticleJsonLd({
            title: rvrcAnalysis.title,
            description: rvrcAnalysis.summary,
            path: "/analys/revolutionrace-2026",
            publishedTime: rvrcAnalysis.date,
            author: rvrcAnalysis.author,
            image: "/og-image.png",
          }),
          buildBreadcrumbJsonLd([
            { name: "Hem", path: "/" },
            { name: "Analyser", path: "/analys" },
            { name: rvrcAnalysis.title, path: "/analys/revolutionrace-2026" },
          ]),
        ]}
      />
      <main className="min-h-screen bg-[#f7f4ee] pt-28 pb-20 text-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {isPreviewRoute && (
            <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              Lokal förhandsgranskning. Den här sidan visas bara på localhost och är inte publicerad.
            </div>
          )}

          <RvrcHero isPreviewRoute={isPreviewRoute} />

          <article className="rounded-lg border border-slate-200 bg-[#fffdfa] px-5 py-8 shadow-sm md:px-10 md:py-12">
            {blocks.map((block, index) => (
              <MarkdownBlockView key={index} block={block} />
            ))}
          </article>
        </div>
      </main>
    </>
  );

  return isPreviewRoute ? <PreviewGuard>{content}</PreviewGuard> : content;
}
