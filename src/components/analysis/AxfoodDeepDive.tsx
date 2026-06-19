import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ChevronRight,
  BarChart2,
  Shield,
  Zap,
  Info,
} from "lucide-react";
import AdUnit from "./AdUnit";
import NordnetCTA from "./NordnetCTA";
import SEO from "../SEO";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import { AnalysisData } from "../../data/analyses";

// ─── Design tokens (Axfood editorial palette) ──────────────────────────────
// Primary: Amber/honey (#F59E0B — warm, grocery/retail) 
// Background: slate-900 (#0F172A) to respect dark mode
// Accent strip: amber-950 (#451A03) for section dividers
// Text on dark: slate-100 / slate-300
// ──────────────────────────────────────────────────────────────────────────

interface AxfoodDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

// ─── Sub-components ───────────────────────────────────────────────────────

/** Animated horizontal score bar */
function ScoreBar({
  label,
  value,
  max = 5,
  delay = 0,
}: {
  label: string;
  value: number;
  max?: number;
  delay?: number;
}) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const pct = (value / max) * 100;
  const color =
    pct >= 80
      ? "#10B981"
      : pct >= 60
      ? "#F59E0B"
      : pct >= 40
      ? "#F59E0B"
      : "#EF4444";

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span
          style={{ color: "#44403C", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 13,
            fontWeight: 700,
            color: color,
          }}
        >
          {value}/{max}
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(120,113,108,0.12)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            borderRadius: 99,
            transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/** Scenario gauge — horizontal spectrum with a marker */
function ScenarioGauge({
  bear,
  base,
  bull,
  current,
}: {
  bear: number;
  base: number;
  bull: number;
  current: number;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShow(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const range = bull - bear;
  const pos = (v: number) => ((v - bear) / range) * 100;

  const scenarios = [
    { label: "Bear", value: bear, color: "#EF4444", pct: pos(bear) },
    { label: "Base", value: base, color: "#F59E0B", pct: pos(base) },
    { label: "Bull", value: bull, color: "#10B981", pct: pos(bull) },
  ];

  const currentPct = pos(current);

  return (
    <div ref={ref} style={{ padding: "32px 0" }}>
      {/* Track */}
      <div style={{ position: "relative", height: 8, borderRadius: 99, background: "rgba(120,113,108,0.12)", margin: "48px 16px 0" }}>
        {/* Gradient fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)",
            opacity: 0.4,
          }}
        />
        {/* Scenario markers */}
        {scenarios.map((s) => (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: `${s.pct}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: s.color,
              border: "2px solid #0F172A",
              boxShadow: `0 0 12px ${s.color}88`,
              transition: "opacity 0.6s ease",
              opacity: show ? 1 : 0,
              zIndex: 2,
            }}
          />
        ))}
        {/* Current price marker */}
        <div
          style={{
            position: "absolute",
            left: `${currentPct}%`,
            top: "50%",
            transform: `translate(-50%, -50%)`,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#F59E0B",
            border: "3px solid white",
            boxShadow: "0 0 20px #F59E0B88",
            zIndex: 4,
            transition: "opacity 0.6s ease 0.3s",
            opacity: show ? 1 : 0,
          }}
        />

        {/* Labels */}
        {scenarios.map((s) => (
          <div
            key={s.label + "_label"}
            style={{
              position: "absolute",
              left: `${s.pct}%`,
              top: -32,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span style={{ color: s.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.label}
            </span>
            <span style={{ color: "#44403C", fontSize: 12, fontWeight: 600, fontFamily: "JetBrains Mono, monospace" }}>
              {s.value} kr
            </span>
          </div>
        ))}

        {/* Current label */}
        <div
          style={{
            position: "absolute",
            left: `${currentPct}%`,
            bottom: -28,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#F59E0B", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Nu
          </span>
        </div>
      </div>

      {/* Scenario cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 56,
        }}
      >
        {[
          {
            label: "Bear Case",
            value: "203 kr",
            change: "−24 %",
            color: "#EF4444",
            bg: "rgba(239,68,68,0.06)",
            border: "rgba(239,68,68,0.2)",
            icon: <TrendingDown size={18} />,
            desc: "2 % vinsttillväxt + P/E 18x. Priskrig, misslyckad City Gross-integrering.",
          },
          {
            label: "Base Case",
            value: "263 kr",
            change: "≈ 0 %",
            color: "#F59E0B",
            bg: "rgba(245,158,11,0.06)",
            border: "rgba(245,158,11,0.3)",
            icon: <Minus size={18} />,
            desc: "5 % vinsttillväxt, P/E 22x. Totalavkastning ~3,4 %/år enbart via utdelning.",
          },
          {
            label: "Bull Case",
            value: "329 kr",
            change: "+23 %",
            color: "#10B981",
            bg: "rgba(16,185,129,0.06)",
            border: "rgba(16,185,129,0.2)",
            icon: <TrendingUp size={18} />,
            desc: "8 % vinsttillväxt + P/E 26x. Lyckad integrering, marginalexpansion.",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: 16,
              padding: "20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: s.color }}>
              {s.icon}
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {s.label}
              </span>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, opacity: 0.8 }}>
              {s.change}
            </div>
            <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6, marginTop: 4 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Editorial section with a large number decoration */
function SectionNumber({ n }: { n: string }) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 80,
        fontWeight: 900,
        color: "rgba(245,158,11,0.2)",
        lineHeight: 1,
        userSelect: "none",
        marginBottom: -24,
        letterSpacing: "-0.04em",
      }}
    >
      {n}
    </div>
  );
}

/** Full-width divider line with label */
function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "rgba(245,158,11,0.2)" }} />
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#F59E0B",
          opacity: 0.9,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(245,158,11,0.2)" }} />
    </div>
  );
}

/** Inline info callout */
function Callout({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(245,158,11,0.06)",
        border: "1px solid rgba(245,158,11,0.2)",
        borderLeft: "3px solid #F59E0B",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div style={{ color: "#F59E0B", marginTop: 2, flexShrink: 0 }}>{icon || <Info size={16} />}</div>
      <div style={{ fontSize: 13, color: "#44403C", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/** Risk row */
function RiskRow({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      style={{
        width: "100%",
        textAlign: "left",
        background: open ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)",
        border: "1px solid",
        borderColor: open ? "rgba(239,68,68,0.25)" : "rgba(120,113,108,0.18)",
        borderRadius: 12,
        padding: "14px 18px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#292524" }}>{label}</span>
        </div>
        <ChevronRight
          size={14}
          color="#64748B"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
        />
      </div>
      {open && (
        <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.7, marginTop: 10, paddingLeft: 24 }}>
          {children}
        </p>
      )}
    </button>
  );
}

/** Data table */
function DataTable({
  headers,
  rows,
  accentCol = 0,
}: {
  headers: string[];
  rows: (string | number)[][];
  accentCol?: number;
}) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(120,113,108,0.18)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                borderBottom: ri < rows.length - 1 ? "1px solid rgba(120,113,108,0.15)" : "none",
                background: ri % 2 === 0 ? "transparent" : "rgba(120,113,108,0.04)",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "11px 16px",
                    color: ci === accentCol ? "#1C1917" : "#44403C",
                    fontWeight: ci === accentCol ? 600 : 400,
                    fontFamily: typeof cell === "number" ? "JetBrains Mono, monospace" : "inherit",
                    lineHeight: 1.5,
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function AxfoodDeepDive({
  data,
  onToggleWatchlist,
  isInWatchlist,
  isWatchlistLoading,
  nextAnalysis,
}: AxfoodDeepDiveProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const scoreItems = [
    { label: "Affärsmodell", value: 4 },
    { label: "Konkurrensfördelar", value: 3 },
    { label: "Finansiell kvalitet", value: 4 },
    { label: "Tillväxtpotential", value: 2 },
    { label: "Värdering", value: 2 },
    { label: "Riskprofil", value: 4 },
    { label: "Utdelning & kapital", value: 4 },
    { label: "Ledning & ESG", value: 4 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF8F5",
        color: "#292524",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        paddingTop: 64,
      }}
    >
      <SEO
        title={`Axfood AB (AXFO) Aktieanalys – Börsanalys.se`}
        description="Djupanalys av Axfood AB (AXFO): P/E 24,7x, direktavkastning 3,4 %, scorecard 27/40. Neutral/Behåll vid kurs 267,90 kr (juni 2026)."
      />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — large editorial typography + key metrics
      ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #F4EFEB 0%, #FAF8F5 100%)",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 56px" }}>
          {/* Breadcrumb + actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Link
                to="/analys"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#78716C",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "color 0.2s",
                }}
              >
                <ArrowLeft size={16} />
                Analysarkiv
              </Link>
              <span style={{ color: "#D6D3D1" }}>/</span>
              <span style={{ color: "#F59E0B", fontSize: 13, fontWeight: 600 }}>AXFO</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: 99,
                  padding: "6px 14px",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                }}
              >
                <ShoppingCart size={12} />
                Dagligvaruhandel
              </div>
              <button
                onClick={onToggleWatchlist}
                disabled={isWatchlistLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: isInWatchlist ? "1px solid #F59E0B" : "1px solid rgba(120,113,108,0.25)",
                  background: isInWatchlist ? "rgba(245,158,11,0.15)" : "rgba(120,113,108,0.08)",
                  color: isInWatchlist ? "#F59E0B" : "#44403C",
                  transition: "all 0.2s ease",
                }}
              >
                <Star size={12} fill={isInWatchlist ? "currentColor" : "none"} />
                {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
              </button>
            </div>
          </div>

          {/* Main hero layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "48px",
              alignItems: "end",
            }}
          >
            {/* Left: Title block */}
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                  marginBottom: 16,
                  opacity: 0.9,
                }}
              >
                Börsanalys.se · Carl Fredrik Thor · Juni 2026
              </div>
              <h1
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  margin: "0 0 8px 0",
                  color: "#1C1917",
                }}
              >
                Axfood
              </h1>
              <div
                style={{
                  fontSize: "clamp(16px, 2.5vw, 28px)",
                  fontWeight: 300,
                  color: "#78716C",
                  letterSpacing: "0.02em",
                  marginBottom: 24,
                }}
              >
                Dagligvaruanalys 2026
              </div>
              <p
                style={{
                  fontSize: 16,
                  color: "#57534E",
                  lineHeight: 1.7,
                  maxWidth: 560,
                  fontWeight: 400,
                }}
              >
                Elva raka år med marknadsandelstillväxt, stabila kassaflöden och en konsekvent utdelning. Till P/E&nbsp;24,7x och P/B&nbsp;7,7x lämnar base-case all avkastning till utdelningen — ingen kursuppgång ingår i basantagandet.
              </p>
            </div>

            {/* Right: Verdict badge */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "3px solid rgba(245,158,11,0.4)",
                  background: "rgba(245,158,11,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(245,158,11,0.12)",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#F59E0B",
                    opacity: 0.8,
                  }}
                >
                  Vår syn
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: "#F59E0B",
                    letterSpacing: "0.05em",
                    marginTop: 4,
                    textTransform: "uppercase",
                  }}
                >
                  AVVAKTA
                </span>
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#F59E0B",
                }}
              >
                27/40
              </div>
              <div style={{ fontSize: 11, color: "#78716C", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Totalpoäng
              </div>
            </div>
          </div>

          {/* Key metrics strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 1,
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: 16,
              overflow: "hidden",
              marginTop: 48,
            }}
          >
            {[
              { label: "Kurs", value: "267,90 kr" },
              { label: "Börsvärde", value: "57,9 mdkr" },
              { label: "P/E", value: "24,7x" },
              { label: "P/B", value: "7,7x" },
              { label: "Direktavk.", value: "3,4 %" },
              { label: "EPS 2025", value: "10,84 kr" },
              { label: "Utdelning", value: "9,00 kr" },
              { label: "Rörelsemarg.", value: "4,0 %" },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#78716C",
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#1C1917",
                  }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ AD: top-display ═══ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AdUnit variant="top-display" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          CONTENT BODY
      ═══════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── SECTION I: Företagsöversikt ── */}
        <section style={{ paddingTop: 80, paddingBottom: 64 }}>
          <SectionNumber n="I" />
          <SectionLabel label="Företagsöversikt" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#1C1917",
                  marginBottom: 20,
                  lineHeight: 1.15,
                }}
              >
                En av tre dominerande aktörer på den svenska dagligvarumarknaden
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["~25 %", "Uppskattat marknadsandel i Sverige (ICA ~35 %, Coop ~17 %)"],
                  ["5+ milj.", "Kundmöten per vecka i ca 400 egenägda butiker"],
                  ["18 652", "Heltidsanställda 2025 (ca 15 000 omräknat till årsanställda)"],
                  ["89 152 Mkr", "Nettoomsättning 2025 (+6,1 % YoY)"],
                  ["700+", "Totalt anslutna butiker inkl. handlarsamarbeten"],
                ].map(([val, label]) => (
                  <div key={val} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#F59E0B",
                        minWidth: 90,
                        flexShrink: 0,
                      }}
                    >
                      {val}
                    </span>
                    <span style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(120,113,108,0.18)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 16 }}>
                  Butiksformat
                </h3>
                {[
                  { name: "Willys", desc: "Lågpris — marknadsledande, ~55 % av extern försäljning", pct: 55 },
                  { name: "Hemköp", desc: "Fullsortiment — ~9 % av extern försäljning", pct: 9 },
                  { name: "City Gross", desc: "Hypermarket — ~10 %, förlorar pengar (−2,2 % EBIT)", pct: 10 },
                  { name: "Snabbgross", desc: "Restauranggrossist — ~7 %, tillväxt 6 %", pct: 7 },
                  { name: "Dagab m.fl.", desc: "Logistik/inköp + extern grossist — ~19 %", pct: 19 },
                ].map((f) => (
                  <div key={f.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#292524" }}>{f.name}</span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#78716C" }}>{f.pct}%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(120,113,108,0.12)", borderRadius: 99, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${f.pct * 1.8}%`,
                          background: "linear-gradient(90deg, rgba(245,158,11,0.4), rgba(245,158,11,0.8))",
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <p style={{ fontSize: 11, color: "#78716C", marginTop: 4, lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION II: Affärsmodell ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="II" />
          <SectionLabel label="Affärsmodell" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
            {[
              {
                icon: <ShoppingCart size={20} />,
                title: "Inköp & sortiment",
                body: "Hanteras centralt av Dagab med fokus på kundnytta, prisvärde och hållbarhet. Långsiktiga leverantörsrelationer med FN-baserad uppföljning av mänskliga rättigheter.",
              },
              {
                icon: <BarChart2 size={20} />,
                title: "Logistik & automation",
                body: "Automatiserade lager i Backa, Landskrona och Bålsta. Nytt logistikcenter i Kungsbacka under byggnation (EUR 265 mn, 2026–2031) för lägre enhetskostnader.",
              },
              {
                icon: <Zap size={20} />,
                title: "Försäljningskanaler",
                body: "Täcker alla segment — från lågpris (Willys) och fullsortiment (Hemköp) till hypermarket (City Gross) och restauranggrossist (Snabbgross).",
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(120,113,108,0.18)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div style={{ color: "#F59E0B", marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.7 }}>{p.body}</p>
              </div>
            ))}
          </div>

          <Callout icon={<Info size={16} />}>
            <strong style={{ color: "#292524" }}>Kungsbacka-projektet (EUR 265 mn, 2026–2031)</strong> är Axfoods hittills enskilt
            största investering. Det är ett komplext automationsprojekt med lång löptid. Förseningar eller kostnadsöverskridanden
            kan belasta kassaflödet under en redan kapitalintensiv period — men när det är i drift ska lägre enhetskostnader
            förbättra marginalstrukturen.
          </Callout>
        </section>

        {/* ── SECTION III: Konkurrensfördelar ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="III" />
          <SectionLabel label="Konkurrensfördelar (Moat)" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1C1917", marginBottom: 24, lineHeight: 1.2 }}>
                Operativa fördelar — inte strukturella vallgravar
              </h2>
              {[
                {
                  title: "Skala och bred konceptportfölj",
                  text: "Axfood når via sina format i princip hela den svenska konsumentmarknaden. Skalan ger förhandlingskraft och möjliggör distribution av egna varumärken till låg styckkostnad.",
                },
                {
                  title: "Willys varumärkesposition",
                  text: "Marknadsledande i lågprissegmentet med, enligt bolaget, elva raka år av marknadsandelsvinster. Planerar minst 10 nya butiker per år.",
                },
                {
                  title: "Integrerad värdekedja via Dagab",
                  text: "Dagabs kontroll över inköp och logistik skapar operativa kostnadsfördelar. Ca 270 nya private label-produkter lanserades 2025.",
                },
                {
                  title: "Hållbarhetsprofil",
                  text: "Fullständig övergång till fossilfria transporter 2025. SBTi-ansökan inlämnad. 26,6 % hållbarhetsmärkta produkter av total försäljning.",
                },
              ].map((a) => (
                <div
                  key={a.title}
                  style={{
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: "1px solid rgba(120,113,108,0.15)",
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#F59E0B", marginBottom: 6 }}>{a.title}</h4>
                  <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.7 }}>{a.text}</p>
                </div>
              ))}
            </div>

            <div>
              <Callout icon={<Shield size={16} />}>
                <strong style={{ color: "#292524" }}>Analytisk not:</strong> Dagligvaruhandel är generellt en bransch med
                begränsade strukturella vallgravar. Axfoods konkurrensfördelar är primärt <em>operativa</em> — de bygger på
                effektiv exekvering, skallogistik och sortimentskontroll snarare än på varaktiga teknologiska eller
                regulatoriska inträdesbarriärer. Moat-bedömningen är därför måttlig (3/5) trots en stark operativ historik.
              </Callout>

              <div
                style={{
                  marginTop: 24,
                  background: "#FFFFFF",
                  border: "1px solid rgba(120,113,108,0.18)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#78716C", marginBottom: 16 }}>
                  Marknad&nbsp;&amp;&nbsp;Konkurrens
                </h3>
                {[
                  ["ICA", "~35 %", "#57534E"],
                  ["Axfood", "~25 %", "#F59E0B"],
                  ["Coop", "~17 %", "#57534E"],
                  ["Lidl m.fl.", "~23 %", "#57534E"],
                ].map(([name, share, color]) => (
                  <div key={name as string} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: color as string, minWidth: 70 }}>{name as string}</span>
                    <div style={{ flex: 1, height: 6, background: "rgba(120,113,108,0.12)", borderRadius: 99, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: share as string,
                          background: color === "#F59E0B" ? "linear-gradient(90deg, #F59E0Baa, #F59E0B)" : "rgba(148,163,184,0.4)",
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#78716C", minWidth: 40 }}>{share as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION IV: Finansiell utveckling ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="IV" />
          <SectionLabel label="Finansiell Utveckling" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 40 }}>
            {/* 2025 Full Year */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(120,113,108,0.18)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1C1917" }}>Helår 2025</h3>
                <span
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    color: "#10B981",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 99,
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  Starkt
                </span>
              </div>
              {[
                ["Nettoomsättning", "89 152 Mkr", "+6,1 %"],
                ["Rörelseresultat (EBIT)", "3 572 Mkr", "+8,6 %"],
                ["Rörelsemarginal", "4,0 %", "just. 4,1 %"],
                ["EPS", "10,84 kr", "+6,7 %"],
                ["Kassaflöde (löp.)", "6 751 Mkr", "+23,7 %"],
                ["Utdelning", "9,00 kr", "3,4 % direktavk."],
              ].map(([k, v, ch]) => (
                <div
                  key={k as string}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(120,113,108,0.08)",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#78716C" }}>{k as string}</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 600, color: "#292524" }}>
                      {v as string}
                    </span>
                    <span style={{ fontSize: 11, color: "#10B981", marginLeft: 8 }}>{ch as string}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Q1 2026 */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(120,113,108,0.18)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1C1917" }}>Q1 2026</h3>
                <span
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    color: "#F59E0B",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 99,
                    border: "1px solid rgba(245,158,11,0.25)",
                  }}
                >
                  Positiv riktning
                </span>
              </div>
              {[
                ["Nettoomsättning", "21 595 Mkr", "+2,6 %"],
                ["Retailförsäljning", "+3,8 % YoY", ""],
                ["Rörelseresultat (EBIT)", "806 Mkr", "+12,1 %"],
                ["Rörelsemarginal", "3,7 %", "just. 3,8 %"],
                ["EPS", "2,42 kr", "+15,9 %"],
                ["Utdelning utbetalad", "4,50 kr", "mars 2026"],
              ].map(([k, v, ch]) => (
                <div
                  key={k as string}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(120,113,108,0.08)",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#78716C" }}>{k as string}</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 600, color: "#292524" }}>
                      {v as string}
                    </span>
                    {(ch as string) && (
                      <span style={{ fontSize: 11, color: "#10B981", marginLeft: 8 }}>{ch as string}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segment breakdown table */}
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1C1917", marginBottom: 16 }}>
            Segmentutveckling 2025 (andel av extern försäljning)
          </h3>
          <DataTable
            headers={["Segment", "Andel", "Kommentar"]}
            rows={[
              ["Willys", "~55 %", "Tillväxt 5,4 % i Q4; leder lågprissegmentet"],
              ["Hemköp", "~9 %", "Tillväxt 5,3 %; moderniserade butiker och prisvärde"],
              ["City Gross", "~10 %", "Intäkter 8 898 Mkr; rörelsemarginal −2,2 %"],
              ["Snabbgross", "~7 %", "Tillväxt 6 %; positiv marginal men under press"],
              ["Dagab m.fl.", "~19 %*", "Inkl. intern logistik och extern grossistförsäljning"],
            ]}
          />
          <p style={{ fontSize: 12, color: "#78716C", marginTop: 12, lineHeight: 1.6 }}>
            * Dagab är i huvudsak en intern servicefunktion. Andelen avser Dagabs andel av koncernens totala intäkter inklusive internleveranser.
          </p>
        </section>

        {/* ── SECTION V: Scorecard ── */}
        <section
          style={{
            paddingBottom: 64,
            paddingTop: 64,
            borderTop: "1px solid rgba(120,113,108,0.15)",
          }}
        >
          <SectionNumber n="V" />
          <SectionLabel label="Scorecard — 8 dimensioner" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <div
                style={{
                  background: "rgba(245,158,11,0.04)",
                  border: "1px solid rgba(245,158,11,0.12)",
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div style={{ marginBottom: 32, display: "flex", gap: 24, alignItems: "center" }}>
                  <div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 56,
                        fontWeight: 900,
                        color: "#F59E0B",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      27
                    </div>
                    <div style={{ fontSize: 13, color: "#78716C", letterSpacing: "0.05em" }}>av 40 möjliga poäng</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        height: 8,
                        background: "rgba(120,113,108,0.12)",
                        borderRadius: 99,
                        overflow: "hidden",
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "67.5%",
                          background: "linear-gradient(90deg, #F59E0Baa, #F59E0B)",
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "#F59E0B", fontWeight: 600 }}>67,5 % — Neutral/Behåll</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {scoreItems.map((s, i) => (
                    <ScoreBar key={s.label} label={s.label} value={s.value} max={5} delay={i * 80} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Affärsmodell — 4/5", text: "Integrerad värdekedja med kompletterande butiksformat ger stabil och diversifierad intäktsbas." },
                { label: "Konkurrensfördelar — 3/5", text: "Skalfördelar och egna varumärken är reella, men dagligvaruhandel har generellt begränsade strukturella inträdesbarriärer." },
                { label: "Finansiell kvalitet — 4/5", text: "Starka och växande kassaflöden; leasingskulder via IFRS 16 och pågående logistikkapex bör bevakas." },
                { label: "Tillväxtpotential — 2/5", text: "Mogen marknad med historisk tillväxt om 4–5 %/år; organisk uppsida är begränsad." },
                { label: "Värdering — 2/5", text: "P/E ~24,7x och P/B ~7,7x innebär begränsad kursuppsida — base-case ger avkastning enbart via utdelning." },
                { label: "Riskprofil — 4/5", text: "Defensiv dagligvarusektor med stabila volymer; City Gross-integrering och logistikprojekt är de primära exekveringsriskerna." },
                { label: "Utdelning & kapitalallokering — 4/5", text: "Stabil och konsekvent växande utdelning med god kassaflödestäckning." },
                { label: "Ledning & ESG — 4/5", text: "God hållbarhetsprofil och starka operativa resultat; koncentrerat ägande begränsar minoritetsägarnas inflytande." },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(120,113,108,0.12)",
                    borderRadius: 10,
                    padding: "14px 18px",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B", marginBottom: 4 }}>{item.label}</div>
                  <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION VI: Värdering ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="VI" />
          <SectionLabel label="Värdering" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1C1917", marginBottom: 24, lineHeight: 1.2 }}>
                I mitten av det historiska P/E-spannet — varken billig eller uppenbart dyr
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
                  <strong style={{ color: "#292524" }}>P/E 24,7x</strong> — Aktiekursen dividerat med EPS 10,84 kr. Marknaden betalar 24,70 kr per rapporterad krona i vinst. Axfoods historiska spann: ca 20–28x.
                </p>
                <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
                  <strong style={{ color: "#292524" }}>P/B 7,7x</strong> — Högt i ett brett perspektiv, men typiskt för välpositionerade dagligvarubolag med starka kassaflöden och begränsad kapitalbindning.
                </p>
                <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
                  <strong style={{ color: "#292524" }}>IFRS 16</strong> — Hyresavtal aktiveras i balansräkningen och ökar rapporterad nettoskuld utan att påverka EBIT. Leasingskulder ska separeras från finansiella skulder för en rättvisande bild.
                </p>
              </div>
              <Callout>
                <strong style={{ color: "#292524" }}>Om P/E-diskrepansen i olika källor.</strong> Analysen refererar till tre P/E-nivåer: ~24,7x (beräknat från angivna siffror), 23,33x (Morningstar, normaliserat) och 26,8x (Axfoods egna nyckeltalsida). Skillnaderna är metodologiska, inte faktamässiga. I denna analys används ~24,7x som primär referenspunkt baserat på rapporterat trailing EPS.
              </Callout>
            </div>

            <div>
              <DataTable
                headers={["Nyckeltal", "Värde", "Beräkningsgrund"]}
                rows={[
                  ["Börsvärde", "~57,9 mdkr", "215,92 mn aktier × 267,90 SEK"],
                  ["P/E (trailing)", "~24,7x", "Kurs / EPS 10,84 SEK"],
                  ["P/B", "~7,7x", "Kurs / EK/aktie 34,77 SEK"],
                  ["Direktavkastning", "~3,4 %", "Utdelning 9,00 SEK / kurs 267,90 SEK"],
                ]}
              />

              <div
                style={{
                  marginTop: 24,
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", marginBottom: 12 }}>
                  Historiskt P/E-spann: 20–28x
                </h4>
                <div style={{ position: "relative", height: 40 }}>
                  {/* Background spann */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: 6,
                      background: "rgba(120,113,108,0.12)",
                      borderRadius: 99,
                    }}
                  />
                  {/* Range fill */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: 6,
                      background: "rgba(245,158,11,0.3)",
                      borderRadius: 99,
                    }}
                  />
                  {/* Current marker at ~57% of 20-28 range */}
                  <div
                    style={{
                      position: "absolute",
                      left: "57%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#F59E0B",
                      border: "2px solid #0B1120",
                      boxShadow: "0 0 12px #F59E0B88",
                    }}
                  />
                  {/* Labels */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: -18,
                      fontSize: 10,
                      color: "#78716C",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    20x
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "57%",
                      bottom: -18,
                      transform: "translateX(-50%)",
                      fontSize: 10,
                      color: "#F59E0B",
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 700,
                    }}
                  >
                    24,7x ▲
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: -18,
                      fontSize: 10,
                      color: "#78716C",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    28x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION VII: Kursdrivare ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="VII" />
          <SectionLabel label="Potentiella Kursdrivare" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              {
                title: "Lyckad City Gross-integrering",
                text: "Bolaget uppger att hypermarknadskedjan förväntas nå lönsamhet under H2 2026. En synlig vändning kan lyfta koncernens rörelsemarginal och motivera en omvärdering av aktien uppåt.",
                importance: "Hög",
              },
              {
                title: "Fortsatt Willys-expansion",
                text: "Planen att öppna minst 10 nya butiker per år skapar organisk tillväxt och stärker marknadsandelen i det snabbast växande segmentet. Ökad onlinepenetration kan bidra ytterligare.",
                importance: "Medel",
              },
              {
                title: "Automatisering & effektivisering",
                text: "Kungsbacka-centret förväntas ge lägre enhetskostnader från ca 2030. Löpande AI-stödd prognossättning och automatiserad lagerhantering kan ge kortare effekter.",
                importance: "Medel",
              },
              {
                title: "Utvidgning egna varumärken",
                text: "Ca 270 nya private label-produkter 2025. Fortsatt expansion inom apotek (Apohem), restaurang (Urban Deli) kan bredda intäktsbasen och förbättra bruttomarginalerna.",
                importance: "Medel",
              },
              {
                title: "Momseffekten på livsmedel",
                text: "Livsmedelsmomsen sänktes temporärt från 12 % till 6 % (1 apr 2026–31 dec 2027). Avgörande faktor: om Axfood för vidare sänkningen till konsument (volymstimulans) eller behåller den i marginalen.",
                importance: "Hög",
              },
            ].map((d) => (
              <div
                key={d.title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(120,113,108,0.18)",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <TrendingUp size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: d.importance === "Hög" ? "#F59E0B" : "#64748B",
                      padding: "2px 8px",
                      borderRadius: 99,
                      background: d.importance === "Hög" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)",
                      border: `1px solid ${d.importance === "Hög" ? "rgba(245,158,11,0.2)" : "rgba(100,116,139,0.15)"}`,
                    }}
                  >
                    {d.importance} vikt
                  </span>
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#292524" }}>{d.title}</h4>
                <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.7 }}>{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION VIII: Risker ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="VIII" />
          <SectionLabel label="Risker" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <RiskRow label="Hård konkurrens och prispress — Lidl">
              Den svenska dagligvarumarknaden domineras av ICA, Axfood och Coop, men lågprissegmentet utmanas direkt av Lidl. Givet att Willys svarar för ca 55 % av Axfoods externa intäkter är Lidls svenska expansion den enskilt viktigaste konkurrensmässiga riskfaktorn för Axfoods marginalutveckling.
            </RiskRow>
            <RiskRow label="City Gross-integrering och förvärvsrisk">
              City Gross förvärvades i slutet av 2024 med rörelsemarginal −2,2 % 2025. Integrering av en hypermarknadskedja med 40 butiker innebär kulturella, operativa och IT-relaterade utmaningar. Potentiell nedskrivningsrisk om lönsamhetsmålet för H2 2026 inte uppnås.
            </RiskRow>
            <RiskRow label="Kungsbacka-projektets genomföranderisk">
              EUR 265 mn, 2026–2031. Komplext automationsprojekt med lång löptid. Förseningar, tekniska problem eller kostnadsöverskridanden kan belasta kassaflödet under en period av redan hög kapitalutgift.
            </RiskRow>
            <RiskRow label="IFRS 16 och leasingexponering">
              Axfood hyr ett stort antal butikslokaler. Leasingskulder synliggjorda enligt IFRS 16 ökar den rapporterade nettoskulden och exponerar bolaget för hyreshöjningar vid omförhandling av kontrakt — en risk som accentueras i ett ränteuppgångsscenario.
            </RiskRow>
            <RiskRow label="Kostnadsinflation och makroekonomi">
              Höjda kostnader för energi, löner och transporter kan pressa rörelsemarginalen. Stigande räntor påverkar finansieringskostnader och, indirekt, hushållens konsumtionsförmåga.
            </RiskRow>
            <RiskRow label="Regulatoriska risker och momsförändringar">
              Livsmedelsmomssänkningen löper ut i januari 2028; återgång till 12 % kan skapa prisvolatilitet. Förändringar i EU:s hållbarhetsregelverk kan kräva kostsamma anpassningar.
            </RiskRow>
            <RiskRow label="Ägarkoncentration och minoritetsskydd">
              Axel Johnson-gruppen kontrollerar drygt 50 % av aktier och röster. Minoritetsägare har begränsat inflytande över strategiska beslut, kapitalallokering och utdelningspolitik.
            </RiskRow>
            <RiskRow label="E-handel, q-commerce och digitala distributionsmodeller">
              Ökad konkurrens från snabbleveransaktörer och internationella plattformar kan kräva fortsatta investeringar och riskera att pressa marginalerna på längre sikt.
            </RiskRow>
          </div>
        </section>

        {/* ═══ AD: middle-article ═══ */}
        <AdUnit variant="middle-article" />

        {/* ── SECTION IX: Scenarioanalys ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="IX" />
          <SectionLabel label="Scenarioanalys" />

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, maxWidth: 700 }}>
              Utgångspunkten är 2025 års EPS om 10,84 kr och oförändrad kapitalstruktur. Scenarierna är förenklade antaganden, inte prognoser. De inkluderar inte effekter av IFRS 16-skulder, aktieåterköp, förvärv eller exceptionella poster.
            </p>
          </div>

          <ScenarioGauge bear={203} base={263} bull={329} current={267.9} />

          <div style={{ marginTop: 40 }}>
            <DataTable
              headers={["Scenario", "Vinsttillväxt/år", "P/E", "Uppskattat värde 2027", "Avvikelse"]}
              rows={[
                ["Bear", "2 %", "18x", "~203 kr", "−24 %"],
                ["Base", "5 %", "22x", "~263 kr", "≈ 0 %"],
                ["Bull", "8 %", "26x", "~329 kr", "+23 %"],
              ]}
            />
          </div>

          <Callout icon={<Info size={16} />}>
            <strong style={{ color: "#292524" }}>Base-casets viktigaste implikation:</strong> Den förväntade totalavkastningen är
            ca 3,4 % per år, driven uteslutande av utdelning — ingen kursuppgång ingår i basantagandet. Det är en meningsfull
            skillnad att hålla i minnet för en investerare som söker kursutveckling.
          </Callout>
        </section>

        {/* ── SECTION X: Vad kan förändra investeringstesen ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          <SectionNumber n="X" />
          <SectionLabel label="Vad som kan förändra investeringstesen" />

          <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, maxWidth: 700, marginBottom: 32 }}>
            Denna sektion skiljer sig från de kortsiktiga kursdrivarna i sektion VII. Här behandlas faktorer som kan kräva att investeringstesens grundantaganden omvärderas i sin helhet.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              {
                title: "City Gross misslyckas nå lönsamhet",
                text: "Om hypermarknadskedjan kräver ytterligare kapitalinjektioner efter H2 2026 förändras riskprofilen för hela gruppen och reser frågor om Axfoods förmåga att integrera förvärv.",
              },
              {
                title: "Permanent momsförändring",
                text: "En politisk förlängning av livsmedelsmomssänkningen förändrar incitamentstrukturen och konkurrensbilden bestående. En återgång till 12 % kan alternativt trigga priskrig som permanent sänker branschens marginalstruktur.",
              },
              {
                title: "Strategiskifte mot internationalisering",
                text: "Axfood är nästan uteslutande verksamt i Sverige. Ett beslut om internationell expansion eller ett transformativt förvärv utanför dagligvaruhandeln förändrar risk-/avkastningsprofilen fundamentalt.",
              },
              {
                title: "Strukturellt skifte i konsumentbeteende",
                text: "Om q-commerce, AI-driven prenumerationshandel eller andra digitala distributionsmodeller slår igenom i ett tempo som överraskar branschen kan det underminera den fysiska butiksmodellens styrka.",
              },
              {
                title: "Ny internationell lågpriskonkurrent (ex. Aldi)",
                text: "Om Aldi — som ännu inte etablerats i Sverige — väljer att gå in på den svenska marknaden kan det direkt utmana Willys position i det segment som utgör ca 55 % av Axfoods intäkter.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(120,113,108,0.18)",
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VERDICT / SLUTSATS ── */}
        <section
          style={{
            paddingBottom: 80,
            paddingTop: 64,
            borderTop: "1px solid rgba(120,113,108,0.15)",
          }}
        >
          <SectionLabel label="Slutsats & Investeringstes" />

          <div
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 24,
              padding: "40px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "start" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid rgba(245,158,11,0.4)",
                    background: "rgba(245,158,11,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 900, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>
                    27
                  </span>
                  <span style={{ fontSize: 11, color: "#78716C", fontWeight: 600 }}>/ 40</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#F59E0B",
                  }}
                >
                  Avvakta
                </span>
              </div>

              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1C1917", marginBottom: 16, lineHeight: 1.2 }}>
                  Neutral/Behåll — stabilt defensivt innehav med begränsad kursuppsida
                </h2>
                <p style={{ fontSize: 14, color: "#44403C", lineHeight: 1.8, marginBottom: 16 }}>
                  Axfood är ett dagligvarubolag med elva raka år av marknadsandelstillväxt, starka operativa kassaflöden och en konsekvent utdelningspolitik. Den integrerade värdekedjan via Dagab, bredden i butiksformat, och tillgången till nära 6 miljoner kundmöten per vecka är faktabaserade styrkor.
                </p>
                <p style={{ fontSize: 14, color: "#44403C", lineHeight: 1.8, marginBottom: 16 }}>
                  Casets begränsningar är lika tydliga: den svenska dagligvarumarknaden är mogen med historisk tillväxttakt om 4–5 % per år, aktien värderas till P/E ~24,7x och P/B ~7,7x, och <strong style={{ color: "#F59E0B" }}>base-case implicerar att all avkastning de kommande åren kommer från utdelning — inte kursutveckling.</strong>
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
                  <div
                    style={{
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.15)",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <h4 style={{ fontSize: 12, fontWeight: 700, color: "#10B981", marginBottom: 8 }}>Passar för investerare som söker…</h4>
                    <ul style={{ fontSize: 12, color: "#57534E", lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                      <li>Stabil utdelning (~3,4 %)</li>
                      <li>Exponering mot defensiv konsumentsektor</li>
                      <li>Långsiktigt kärninnehav med låg volatilitet</li>
                    </ul>
                  </div>
                  <div
                    style={{
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <h4 style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", marginBottom: 8 }}>Passar sämre för investerare som söker…</h4>
                    <ul style={{ fontSize: 12, color: "#57534E", lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                      <li>Kursavkastning utöver marknaden</li>
                      <li>Hög tillväxtpotential</li>
                      <li>Lågt pris relativt tillväxttakten (PEG)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ AD: footer-multiplex ═══ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" }}>
        <AdUnit variant="footer-multiplex" />
      </div>

      {/* ═══ NORDNET CTA ═══ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" }}>
        <NordnetCTA />
      </div>

      {/* ═══ DISCLAIMER ═══ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" }}>
        <AnalysisDisclaimer />
      </div>

      {/* ═══ NEXT ANALYSIS ═══ */}
      {nextAnalysis && (
        <div
          style={{
            borderTop: "1px solid rgba(120,113,108,0.15)",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 24px 80px",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", color: "#78716C", marginBottom: 16 }}>
            Nästa analys
          </div>
          <Link
            to={`/analys/${nextAnalysis.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#F59E0B",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              transition: "gap 0.2s ease",
            }}
          >
            {nextAnalysis.title}
            <ChevronRight size={24} />
          </Link>
        </div>
      )}
    </div>
  );
}
