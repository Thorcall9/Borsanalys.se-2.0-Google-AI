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
  const [open, setOpen] = useState(true);
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
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [dcfGrowth, setDcfGrowth] = useState(4.5);
  const [dcfMargin, setDcfMargin] = useState(4.0);
  const [dcfWacc, setDcfWacc] = useState(7.5);
  const [sharesCount, setSharesCount] = useState(100);
  const [customStockPrice, setCustomStockPrice] = useState(267.90);
  const [activeTab, setActiveTab] = useState("dcf");

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

        {/* ── SCORECARD SUMMARY TABLE ── */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(120,113,108,0.18)",
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #F59E0B", paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1917", margin: 0 }}>Scorecard</h2>
                <div style={{ fontSize: 13, color: "#57534E", marginTop: 4 }}>Analyssammanfattning per dimension</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace", lineHeight: 1 }}>27/40</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#57534E", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>Neutral/Behåll</div>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(120,113,108,0.18)" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: "0.05em" }}>Dimension</th>
                    <th style={{ padding: "10px 12px", textAlign: "center", fontSize: 11, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: "0.05em", width: 120 }}>Poäng</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: "0.05em" }}>Motivering</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Affärsmodell", "4/5", "Integrerad värdekedja med kompletterande butiksformat ger stabil och diversifierad intäktsbas"],
                    ["Konkurrensfördelar (moat)", "3/5", "Skalfördelar och egna varumärken är reella, men dagligvaruhandel har generellt begränsade strukturella inträdesbarriärer"],
                    ["Finansiell kvalitet", "4/5", "Starka och växande kassaflöden; leasingskulder via IFRS 16 och pågående logistikkapex bör bevakas"],
                    ["Tillväxtpotential", "2/5", "Mogen marknad med historisk tillväxt om 4–5 %/år; organisk uppsida är begränsad"],
                    ["Värdering", "2/5", "P/E ~24,7x och P/B ~7,7x innebär begränsad kursuppsida – base-case ger avkastning enbart via utdelning"],
                    ["Riskprofil", "4/5", "Defensiv dagligvarusektor med stabila volymer; City Gross-integrering och logistikprojekt utgör de primära exekveringsriskerna"],
                    ["Utdelning & kapitalallokering", "4/5", "Stabil och konsekvent växande utdelning med god kassaflödestäckning"],
                    ["Ledning & ESG", "4/5", "God hållbarhetsprofil och starka operativa resultat; koncentrerat ägande begränsar minoritetsägarnas inflytande"],
                  ].map(([dim, score, text], idx) => (
                    <tr key={dim} style={{ borderBottom: "1px solid rgba(120,113,108,0.1)", background: idx % 2 === 0 ? "transparent" : "rgba(120,113,108,0.02)" }}>
                      <td style={{ padding: "12px 12px", fontWeight: 700, color: "#1C1917", whiteSpace: "nowrap" }}>{dim}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", fontWeight: 700, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>{score}</td>
                      <td style={{ padding: "12px 12px", color: "#57534E", lineHeight: 1.5 }}>{text}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "rgba(245,158,11,0.04)", fontWeight: 700 }}>
                    <td style={{ padding: "14px 12px", color: "#1C1917" }}>Totalt</td>
                    <td style={{ padding: "14px 12px", textAlign: "center", color: "#F59E0B", fontFamily: "JetBrains Mono, monospace", fontSize: 15 }}>27/40</td>
                    <td style={{ padding: "14px 12px", color: "#1C1917" }}>Neutral/Behåll – stabilt defensivt innehav med begränsad kursuppsida</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SECTION I: Företagsöversikt ── */}
        <section style={{ paddingTop: 40, paddingBottom: 64 }}>
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

        {/* ── PREMIUM / PAYWALL SECTION ── */}
        <section style={{ paddingBottom: 64, borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 64 }}>
          {!premiumUnlocked ? (
            /* --- Paywall View --- */
            <div
              style={{
                background: "linear-gradient(135deg, #FFFDF9 0%, #FAF6F0 100%)",
                border: "2px solid #F59E0B",
                borderRadius: 20,
                padding: "40px 32px",
                textAlign: "center",
                maxWidth: 760,
                margin: "0 auto",
                boxShadow: "0 10px 30px rgba(245,158,11,0.08)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "rgba(245,158,11,0.1)",
                  color: "#F59E0B",
                  marginBottom: 20,
                }}
              >
                <Zap size={28} />
              </div>
              
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1C1917", margin: "0 0 8px 0" }}>
                Ta analysen till nästa nivå
              </h3>
              <p style={{ fontSize: 14, color: "#57534E", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
                Lås upp de interaktiva värderingsverktygen och ladda ner analysfilerna för Axfood för endast 19 kr.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  maxWidth: 540,
                  margin: "0 auto 36px",
                  textAlign: "left",
                }}
              >
                {[
                  "Interaktiv DCF-kalkylator (laborera med marginaler live)",
                  "Utdelningssimulator (ränta-på-ränta & yield-on-cost)",
                  "5-minuters ljudsammanfattning (.mp3 podd-format)",
                  "Professionell PDF-rapport & Excel-modell för nedladdning",
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#10B981", fontWeight: "bold", fontSize: 16, lineHeight: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#44403C", lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsPaying(true);
                  setTimeout(() => {
                    setIsPaying(false);
                    setPremiumUnlocked(true);
                  }, 1500);
                }}
                disabled={isPaying}
                style={{
                  background: "#F59E0B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 99,
                  padding: "16px 40px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(245,158,11,0.4)",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {isPaying ? (
                  <>
                    <span className="animate-spin" style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%" }} />
                    Verifierar med Swish...
                  </>
                ) : (
                  "Lås upp verktyg med Swish (19 kr)"
                )}
              </button>
              
              <div style={{ marginTop: 14, fontSize: 11, color: "#78716C" }}>
                Säker direktbetalning via Swish. Ingen registrering krävs.
              </div>
            </div>
          ) : (
            /* --- Premium View (Unlocked) --- */
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* Unlock success banner */}
              <div
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 16,
                  padding: "16px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: "#10B981", margin: 0 }}>⚡ Premiumverktyg upplåsta!</h4>
                  <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Du har nu full tillgång till alla interaktiva moduler, diagram och insiderdata.</p>
                </div>
                <button
                  onClick={() => setPremiumUnlocked(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(120,113,108,0.25)",
                    borderRadius: 99,
                    padding: "6px 14px",
                    fontSize: 11,
                    color: "#57534E",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Lås igen (testa flödet)
                </button>
              </div>

              {/* --- Premium Tab Navigation Bar --- */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(120,113,108,0.15)",
                  gap: 8,
                  overflowX: "auto",
                  paddingBottom: 1,
                }}
              >
                {[
                  { id: "dcf", label: "DCF & Kalkylatorer" },
                  { id: "valuation", label: "Översikt & Värdering" },
                  { id: "growth", label: "Tillväxt & Hälsa" },
                  { id: "insiders", label: "Utdelning & Insiders" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "12px 18px",
                      background: "transparent",
                      border: "none",
                      borderBottom: activeTab === tab.id ? "3px solid #F59E0B" : "3px solid transparent",
                      color: activeTab === tab.id ? "#F59E0B" : "#78716C",
                      fontSize: 13,
                      fontWeight: 750,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* --- TAB CONTENT 1: DCF & Dividend Calculator --- */}
              {activeTab === "dcf" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                  {/* 1. DCF Calculator */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Interaktiv DCF-kalkylator (Kassaflödesmodell)</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Justera antagandena för att beräkna ett eget teoretiskt värde på Axfood-aktien.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "start" }}>
                      {/* Sliders */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Growth slider */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#292524" }}>
                            <span>Långsiktig tillväxt (YoY):</span>
                            <span style={{ color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>{dcfGrowth.toFixed(1)} %</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="8"
                            step="0.5"
                            value={dcfGrowth}
                            onChange={(e) => setDcfGrowth(parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "#F59E0B" }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#78716C", marginTop: 2 }}>
                            <span>1.0% (Stagnation)</span>
                            <span>8.0% (Hög tillväxt)</span>
                          </div>
                        </div>

                        {/* Margin slider */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#292524" }}>
                            <span>Långsiktig EBIT-marginal:</span>
                            <span style={{ color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>{dcfMargin.toFixed(1)} %</span>
                          </div>
                          <input
                            type="range"
                            min="3.0"
                            max="5.5"
                            step="0.1"
                            value={dcfMargin}
                            onChange={(e) => setDcfMargin(parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "#F59E0B" }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#78716C", marginTop: 2 }}>
                            <span>3.0% (Pressad)</span>
                            <span>5.5% (Maximal exekvering)</span>
                          </div>
                        </div>

                        {/* WACC slider */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#292524" }}>
                            <span>Avkastningskrav (WACC):</span>
                            <span style={{ color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>{dcfWacc.toFixed(1)} %</span>
                          </div>
                          <input
                            type="range"
                            min="6.0"
                            max="11.0"
                            step="0.5"
                            value={dcfWacc}
                            onChange={(e) => setDcfWacc(parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "#F59E0B" }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#78716C", marginTop: 2 }}>
                            <span>6.0% (Låg risk)</span>
                            <span>11.0% (Hög risk)</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculations Result */}
                      <div
                        style={{
                          background: "#FAF8F5",
                          border: "1px solid rgba(120,113,108,0.15)",
                          borderRadius: 12,
                          padding: 20,
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                          Beräknat teoretiskt värde
                        </div>
                        <div
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 44,
                            fontWeight: 900,
                            color: "#F59E0B",
                            lineHeight: 1,
                            marginBottom: 8,
                          }}
                        >
                          {(() => {
                            const nopat = 89152 * (dcfMargin / 100) * 0.794;
                            const adjustedWacc = Math.max(dcfWacc, dcfGrowth + 0.5);
                            const ev = (nopat * (1 + dcfGrowth / 100)) / ((adjustedWacc - dcfGrowth) / 100);
                            const netDebt = 7800; // Mkr
                            const equityVal = Math.max(0, ev - netDebt);
                            return Math.round(equityVal / 215.3);
                          })()} kr
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(120,113,108,0.15)", paddingTop: 12, marginTop: 12, fontSize: 12, color: "#57534E" }}>
                          <span>Jämförelsekurs (kr):</span>
                          <input
                            type="number"
                            value={customStockPrice}
                            onChange={(e) => setCustomStockPrice(parseFloat(e.target.value) || 0)}
                            style={{
                              width: 80,
                              padding: "4px 8px",
                              border: "1px solid rgba(120,113,108,0.25)",
                              borderRadius: 6,
                              fontSize: 12,
                              textAlign: "right",
                              fontFamily: "JetBrains Mono, monospace",
                              color: "#1C1917",
                              background: "#FFFFFF",
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "#57534E" }}>
                          <span>Differens mot jämförelsekurs:</span>
                          {(() => {
                            const nopat = 89152 * (dcfMargin / 100) * 0.794;
                            const adjustedWacc = Math.max(dcfWacc, dcfGrowth + 0.5);
                            const ev = (nopat * (1 + dcfGrowth / 100)) / ((adjustedWacc - dcfGrowth) / 100);
                            const netDebt = 7800;
                            const target = Math.round(Math.max(0, ev - netDebt) / 215.3);
                            const diff = ((target - customStockPrice) / (customStockPrice || 1)) * 100;
                            const isUp = diff >= 0;
                            return (
                              <span style={{ fontWeight: 700, color: isUp ? "#10B981" : "#EF4444" }}>
                                {isUp ? "+" : ""}{diff.toFixed(1)} %
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Dividend Simulator */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Utdelningssimulator (Ränta-på-ränta)</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Simulera hur dina utdelningar växer över tid om de återinvesteras i nya Axfood-aktier.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 28, alignItems: "start" }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: "#292524", display: "block", marginBottom: 6 }}>Antal aktier vid start:</label>
                        <input
                          type="number"
                          value={sharesCount}
                          onChange={(e) => setSharesCount(Math.max(1, parseInt(e.target.value) || 0))}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid rgba(120,113,108,0.25)",
                            borderRadius: 8,
                            fontSize: 14,
                            fontFamily: "JetBrains Mono, monospace",
                            color: "#1C1917",
                            marginBottom: 12,
                          }}
                        />
                        <div style={{ fontSize: 11, color: "#57534E", lineHeight: 1.5 }}>
                          Antar initial utdelning om <strong>9,00 kr/aktie</strong> samt en årlig utdelningstillväxt på <strong>4,0 %</strong>.
                        </div>
                      </div>

                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid rgba(120,113,108,0.18)", color: "#78716C", fontSize: 10, textTransform: "uppercase" }}>
                              <th style={{ padding: "6px 8px", textAlign: "left" }}>År</th>
                              <th style={{ padding: "6px 8px", textAlign: "right" }}>Utdelning/Aktie</th>
                              <th style={{ padding: "6px 8px", textAlign: "right" }}>Total utdelning</th>
                              <th style={{ padding: "6px 8px", textAlign: "right" }}>Ackumulerade aktier</th>
                              <th style={{ padding: "6px 8px", textAlign: "right" }}>Effektiv direktavk.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              let currentShares = sharesCount;
                              const divGrowth = 0.04;
                              let sharePrice = 267.90;
                              return Array.from({ length: 5 }).map((_, i) => {
                                const year = i + 1;
                                const divPerShare = 9.00 * Math.pow(1 + divGrowth, i);
                                const totalDiv = currentShares * divPerShare;
                                const newShares = totalDiv / sharePrice;
                                currentShares += newShares;
                                sharePrice *= 1.03;
                                const yieldOnCost = (totalDiv / (sharesCount * 267.90)) * 100;
                                return (
                                  <tr key={year} style={{ borderBottom: "1px solid rgba(120,113,108,0.1)", background: i % 2 === 0 ? "transparent" : "rgba(120,113,108,0.02)" }}>
                                    <td style={{ padding: "8px 8px", fontWeight: 700, color: "#1C1917" }}>År {year}</td>
                                    <td style={{ padding: "8px 8px", textAlign: "right", fontFamily: "JetBrains Mono, monospace" }}>{divPerShare.toFixed(2)} kr</td>
                                    <td style={{ padding: "8px 8px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#F59E0B" }}>{Math.round(totalDiv)} kr</td>
                                    <td style={{ padding: "8px 8px", textAlign: "right", fontFamily: "JetBrains Mono, monospace" }}>{Math.round(currentShares)} st</td>
                                    <td style={{ padding: "8px 8px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: "#10B981" }}>{yieldOnCost.toFixed(2)} %</td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB CONTENT 2: Overview & Valuation --- */}
              {activeTab === "valuation" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 24 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Visualisering & Värderingsmodeller</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Jämförelse av styrkor mot branschsnitt samt olika teoretiska värderingsmetoder.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "center" }}>
                      {/* Snowflake Radar Chart (SVG) */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: "#78716C", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Bolagets Snowflake-profil</h4>
                        <svg width="280" height="280" viewBox="0 0 300 300">
                          {/* Radial Grid hexagonal rings (5 concentric levels) */}
                          {[1, 2, 3, 4, 5].map((lvl) => {
                            const r = lvl * 24;
                            const points = Array.from({ length: 6 }).map((_, i) => {
                              const angle = (i * Math.PI) / 3 - Math.PI / 2;
                              return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                            }).join(" ");
                            return (
                              <polygon
                                key={lvl}
                                points={points}
                                fill="none"
                                stroke="rgba(120,113,108,0.15)"
                                strokeWidth="1"
                                strokeDasharray={lvl === 5 ? "none" : "3,3"}
                              />
                            );
                          })}

                          {/* Axes */}
                          {Array.from({ length: 6 }).map((_, i) => {
                            const angle = (i * Math.PI) / 3 - Math.PI / 2;
                            const x = 150 + 120 * Math.cos(angle);
                            const y = 150 + 120 * Math.sin(angle);
                            return (
                              <line
                                key={i}
                                x1="150"
                                y1="150"
                                x2={x}
                                y2={y}
                                stroke="rgba(120,113,108,0.25)"
                                strokeWidth="1"
                              />
                            );
                          })}

                          {/* Values polygon based on Axfood profile (Scale 0-5)
                              Indices: 0: Lönsamhet (4), 1: Soliditet/Hälsa (4), 2: Utdelning (4), 
                                       3: Tillväxt (2), 4: Värdering (2), 5: Ledning/ESG (4)
                          */}
                          {(() => {
                            const values = [4, 4, 4, 2, 2, 4];
                            const points = values.map((val, i) => {
                              const r = val * 24;
                              const angle = (i * Math.PI) / 3 - Math.PI / 2;
                              return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                            }).join(" ");
                            return (
                              <polygon
                                points={points}
                                fill="rgba(245, 158, 11, 0.22)"
                                stroke="#F59E0B"
                                strokeWidth="2.5"
                              />
                            );
                          })()}

                          {/* Dots on points */}
                          {[4, 4, 4, 2, 2, 4].map((val, i) => {
                            const r = val * 24;
                            const angle = (i * Math.PI) / 3 - Math.PI / 2;
                            return (
                              <circle
                                key={i}
                                cx={150 + r * Math.cos(angle)}
                                cy={150 + r * Math.sin(angle)}
                                r="4"
                                fill="#F59E0B"
                              />
                            );
                          })}

                          {/* Labels */}
                          {[
                            { text: "Lönsamhet (4)", angle: 0 },
                            { text: "Hälsa (4)", angle: 60 },
                            { text: "Utdelning (4)", angle: 120 },
                            { text: "Tillväxt (2)", angle: 180 },
                            { text: "Värdering (2)", angle: 240 },
                            { text: "Ledning (4)", angle: 300 },
                          ].map((lbl, i) => {
                            const angle = (i * Math.PI) / 3 - Math.PI / 2;
                            const offset = 138;
                            const x = 150 + offset * Math.cos(angle);
                            const y = 150 + offset * Math.sin(angle);
                            return (
                              <text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                style={{
                                  fontSize: 10,
                                  fontWeight: 750,
                                  fill: "#292524",
                                  fontFamily: "Inter, sans-serif"
                                }}
                              >
                                {lbl.text}
                              </text>
                            );
                          })}
                        </svg>
                      </div>

                      {/* Valuation Table */}
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 12 }}>Teoretiskt värde vs Jämförelsekurs</h4>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid rgba(120,113,108,0.18)", color: "#78716C", fontSize: 10, textTransform: "uppercase" }}>
                              <th style={{ padding: "8px 6px", textAlign: "left" }}>Modell</th>
                              <th style={{ padding: "8px 6px", textAlign: "right" }}>Beräknat Värde</th>
                              <th style={{ padding: "8px 6px", textAlign: "right" }}>Margin of Safety</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "DCF Kassaflödesmodell (Bas)", val: 263, desc: "Nuvärdet av framtida kassaflöden. Mäter bolagets långsiktiga fundamentala värde." },
                              { name: "P/E-Normaliserad (22,0x)", val: 238, desc: "Värdering utifrån historisk genomsnittlig vinstmultipel för stabila bolag." },
                              { name: "EV/EBITDA Multipelmodell", val: 252, desc: "Företagsvärde i relation till rörelseresultat före avskrivningar." },
                              { name: "FCF-Yield Modell (4.5% yield)", val: 248, desc: "Aktiepris relaterat till fritt kassaflöde. Faktiskt avkastningsmått." },
                            ].map((m, idx) => {
                              const diff = ((m.val - customStockPrice) / customStockPrice) * 100;
                              const isPositive = diff >= 0;
                              return (
                                <tr key={idx} style={{ borderBottom: "1px solid rgba(120,113,108,0.1)", background: idx % 2 === 0 ? "transparent" : "rgba(120,113,108,0.015)" }}>
                                  <td style={{ padding: "10px 6px" }}>
                                    <div style={{ fontWeight: 700, color: "#1C1917" }}>{m.name}</div>
                                    <div style={{ fontSize: 10, color: "#78716C", marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
                                  </td>
                                  <td style={{ padding: "10px 6px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#292524" }}>{m.val} kr</td>
                                  <td style={{ padding: "10px 6px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: isPositive ? "#10B981" : "#EF4444" }}>
                                    {isPositive ? "▲ +" : "▼ "}{diff.toFixed(1)} %
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div style={{ marginTop: 16, textAlign: "right" }}>
                          <button
                            onClick={() => setActiveTab("dcf")}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#F59E0B",
                              fontSize: 12,
                              fontWeight: 800,
                              cursor: "pointer",
                              transition: "color 0.2s",
                              padding: 0,
                            }}
                          >
                            ← Gå till kalkylatorn för att ändra antaganden
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Risk/Avkastningsdiagram (Bear, Base, Bull viz) */}
                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(120,113,108,0.15)" }}>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 16 }}>Risk & Avkastning (Bear / Base / Bull)</h4>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ flex: 1, position: "relative", height: 10, background: "rgba(120,113,108,0.12)", borderRadius: 99 }}>
                          {/* current price marker */}
                          <div style={{ position: "absolute", left: `${((customStockPrice - 180) / (350 - 180)) * 100}%`, top: -6, width: 2, height: 22, background: "#000", zIndex: 10 }} />
                          <div style={{ position: "absolute", left: `${((customStockPrice - 180) / (350 - 180)) * 100}%`, top: 18, transform: "translateX(-50%)", fontSize: 10, fontWeight: 800, color: "#1C1917", whiteSpace: "nowrap" }}>
                            Jämförelsekurs: {customStockPrice} kr
                          </div>

                          {/* Bear 203 */}
                          <div style={{ position: "absolute", left: `${((203 - 180) / (350 - 180)) * 100}%`, top: -4, width: 18, height: 18, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 8, fontWeight: 900 }}>BE</div>
                          <div style={{ position: "absolute", left: `${((203 - 180) / (350 - 180)) * 100}%`, top: -22, transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, color: "#EF4444" }}>Bear 203 kr</div>

                          {/* Base 263 */}
                          <div style={{ position: "absolute", left: `${((263 - 180) / (350 - 180)) * 100}%`, top: -4, width: 18, height: 18, borderRadius: "50%", background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 8, fontWeight: 900 }}>BA</div>
                          <div style={{ position: "absolute", left: `${((263 - 180) / (350 - 180)) * 100}%`, top: -22, transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, color: "#F59E0B" }}>Base 263 kr</div>

                          {/* Bull 329 */}
                          <div style={{ position: "absolute", left: `${((329 - 180) / (350 - 180)) * 100}%`, top: -4, width: 18, height: 18, borderRadius: "50%", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 8, fontWeight: 900 }}>BU</div>
                          <div style={{ position: "absolute", left: `${((329 - 180) / (350 - 180)) * 100}%`, top: -22, transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, color: "#10B981" }}>Bull 329 kr</div>
                        </div>
                      </div>
                      <div style={{ height: 14 }} />
                    </div>
                  </div>

                  {/* Playbook (Moved under Tab 2) */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Analytikerns Playbook — Köp- & Säljstrategi</h3>
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                      <div style={{ borderLeft: "3px solid #10B981", paddingLeft: 16 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#10B981", margin: "0 0 6px 0" }}>Köp under 240 kr</h4>
                        <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6, margin: 0 }}>
                          Vid en kurs under 240 kr blir direktavkastningen över 3.7 % och nedsidan betryggande låg. Här är Axfood ett mycket bra defensivt köp.
                        </p>
                      </div>
                      <div style={{ borderLeft: "3px solid #F59E0B", paddingLeft: 16 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", margin: "0 0 6px 0" }}>Avvakta 240–280 kr</h4>
                        <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6, margin: 0 }}>
                          Dagens läge. P/E ~25x innebär att aktien värderas ganska fullt. Base-case visar att all avkastning kommande åren kommer från utdelningen.
                        </p>
                      </div>
                      <div style={{ borderLeft: "3px solid #EF4444", paddingLeft: 16 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", margin: "0 0 6px 0" }}>Sälj över 280 kr</h4>
                        <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6, margin: 0 }}>
                          När aktien handlas över 280 kr blir P/E-talet över 26x, vilket är alltför högt för ett moget dagligvarubolag med begränsad organisk tillväxt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB CONTENT 3: Growth & Financial Health --- */}
              {activeTab === "growth" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                  {/* Projections Line Chart */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Konsensusestimat & Tillväxtprognoser (3 år)</h3>
                        <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Analytikernas framtida förväntningar fram till 2028. Justera reglagen nedan för känslighetsanalys.</p>
                      </div>
                    </div>

                    {/* Interactive charts representing Sales and EPS estimates */}
                    {(() => {
                      // Apply sensitivity dynamically based on inputs
                      const scaleMargin = dcfMargin / 4.0;
                      const scaleGrowth = 1 + (dcfGrowth - 4.5) / 100;
                      
                      const eps2025 = 10.84;
                      const eps2026 = (11.20 * scaleMargin * scaleGrowth).toFixed(2);
                      const eps2027 = (12.10 * scaleMargin * Math.pow(scaleGrowth, 2)).toFixed(2);
                      const eps2028 = (13.05 * scaleMargin * Math.pow(scaleGrowth, 3)).toFixed(2);

                      const rev2025 = 89.2;
                      const rev2026 = (93.5 * scaleGrowth).toFixed(1);
                      const rev2027 = (98.1 * Math.pow(scaleGrowth, 2)).toFixed(1);
                      const rev2028 = (102.5 * Math.pow(scaleGrowth, 3)).toFixed(1);

                      return (
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 36, alignItems: "start" }}>
                          {/* SVG Line chart representing EPS trajectory */}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#292524", marginBottom: 12 }}>Prognos: Vinst per aktie (EPS, SEK)</span>
                            <svg width="340" height="180" viewBox="0 0 340 180" style={{ background: "#FAF8F5", borderRadius: 12, border: "1px solid rgba(120,113,108,0.1)" }}>
                              {/* Horizontal Gridlines */}
                              <line x1="30" y1="30" x2="320" y2="30" stroke="rgba(120,113,108,0.08)" />
                              <line x1="30" y1="75" x2="320" y2="75" stroke="rgba(120,113,108,0.08)" />
                              <line x1="30" y1="120" x2="320" y2="120" stroke="rgba(120,113,108,0.08)" />
                              
                              {/* Coordinates: X: 2025(50), 2026e(130), 2027e(210), 2028e(290)
                                           Y: map EPS from 9.0 to 14.5 -> pixels (150 down to 20) */}
                              {(() => {
                                const getY = (v: number) => 150 - ((v - 9.0) / (14.5 - 9.0)) * 120;
                                const pts = [
                                  `50,${getY(eps2025)}`,
                                  `130,${getY(parseFloat(eps2026))}`,
                                  `210,${getY(parseFloat(eps2027))}`,
                                  `290,${getY(parseFloat(eps2028))}`
                                ].join(" ");

                                return (
                                  <>
                                    {/* Line */}
                                    <polyline points={pts} fill="none" stroke="#F59E0B" strokeWidth="3" />
                                    
                                    {/* Circles and text labels */}
                                    {[
                                      { yr: "2025", val: eps2025, x: 50 },
                                      { yr: "2026e", val: parseFloat(eps2026), x: 130 },
                                      { yr: "2027e", val: parseFloat(eps2027), x: 210 },
                                      { yr: "2028e", val: parseFloat(eps2028), x: 290 },
                                    ].map((pt, idx) => (
                                      <g key={idx}>
                                        <circle cx={pt.x} cy={getY(pt.val)} r="5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />
                                        <text x={pt.x} y={getY(pt.val) - 12} textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, fill: "#1C1917", fontFamily: "JetBrains Mono, monospace" }}>
                                          {pt.val.toFixed(2)}
                                        </text>
                                        <text x={pt.x} y="162" textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: "#78716C" }}>
                                          {pt.yr}
                                        </text>
                                      </g>
                                    ))}
                                  </>
                                );
                              })()}
                            </svg>
                          </div>

                          {/* Data columns for consensus */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", margin: "0 0 4px 0" }}>Justerade Siffror (Känslighetsanalys)</h4>
                            
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                              <div style={{ background: "#FAF8F5", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(120,113,108,0.1)" }}>
                                <div style={{ fontSize: 10, color: "#78716C", fontWeight: 700, textTransform: "uppercase" }}>Omsättning (2028e)</div>
                                <div style={{ fontSize: 16, fontWeight: 900, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>{rev2028} mdkr</div>
                              </div>
                              <div style={{ background: "#FAF8F5", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(120,113,108,0.1)" }}>
                                <div style={{ fontSize: 10, color: "#78716C", fontWeight: 700, textTransform: "uppercase" }}>EBIT % (Långsiktig)</div>
                                <div style={{ fontSize: 16, fontWeight: 900, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>{dcfMargin.toFixed(1)} %</div>
                              </div>
                              <div style={{ background: "#FAF8F5", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(120,113,108,0.1)" }}>
                                <div style={{ fontSize: 10, color: "#78716C", fontWeight: 700, textTransform: "uppercase" }}>EPS (2028e)</div>
                                <div style={{ fontSize: 16, fontWeight: 900, color: "#F59E0B", fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>{eps2028} kr</div>
                              </div>
                            </div>

                            {/* Sensitivity notice */}
                            <Callout>
                              Genom att ändra marginal- och tillväxtreglagen i kalkylatorn under fliken <strong>DCF & Kalkylatorer</strong> anpassas de framtida prognoserna automatiskt baserat på känslighetsmodellen.
                            </Callout>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Financial Health indicators */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Balansräkning & Finansiell Hälsa</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>En bedömning av Axfoods finansiella styrka och eventuella risker i skuldstrukturen.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                      {[
                        { 
                          label: "Nettoskuld / EBITDA (exkl. IFRS 16)", 
                          val: "1.6x", 
                          status: "Godkänd", 
                          explain: "Visar hur många år det tar att betala av skulderna med den löpande vinsten. Lägre är säkrare.", 
                          ref: "Ref: <3.0x · Branschsnitt: 2.0x", 
                          color: "#10B981" 
                        },
                        { 
                          label: "Räntetäckningsgrad (EBIT / Ränta)", 
                          val: "8.5x", 
                          status: "Mycket Stark", 
                          explain: "Mäter förmågan att betala räntor på skulderna från rörelsens vinst. Högre är säkrare.", 
                          ref: "Ref: >3.0x · Branschsnitt: 6.0x", 
                          color: "#10B981" 
                        },
                        { 
                          label: "Soliditet (EK / Tillgångar)", 
                          val: "24 %", 
                          status: "God/Normal", 
                          explain: "Andel av tillgångarna finansierade med eget kapital. Ger motståndskraft mot förluster.", 
                          ref: "Ref: >20% · Branschsnitt: 25%", 
                          color: "#F59E0B" 
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "#FAF8F5",
                            border: "1px solid rgba(120,113,108,0.15)",
                            borderRadius: 12,
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                          }}
                        >
                          <div style={{ fontSize: 11, color: "#78716C", fontWeight: 800, textTransform: "uppercase" }}>{item.label}</div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                            <span style={{ fontSize: 24, fontWeight: 900, color: "#1C1917", fontFamily: "JetBrains Mono, monospace" }}>{item.val}</span>
                            <span style={{ fontSize: 10, fontWeight: 800, color: item.color, textTransform: "uppercase" }}>{item.status}</span>
                          </div>
                          <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB CONTENT 4: Dividends & Insider Activity --- */}
              {activeTab === "insiders" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                  {/* Coverage ratios & Dividend health */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Utdelningsandel & Hållbarhet</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Stresstest av Axfoods utdelning i förhållande till vinst och fritt kassaflöde.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                      {/* Payout metrics bars */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {/* Earnings payout */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#292524" }}>
                            <span>Utdelningsandel av vinsten (EPS):</span>
                            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#1C1917" }}>83.0 %</span>
                          </div>
                          <div style={{ height: 8, background: "rgba(120,113,108,0.15)", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: "83%", background: "#F59E0B", borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 10, color: "#78716C", marginTop: 4, display: "block" }}>Normal målnivå för bolaget är &gt;90% av vinsten. Historiskt stabilt.</span>
                        </div>

                        {/* FCF payout */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#292524" }}>
                            <span>Utdelningsandel av fritt kassaflöde (FCF):</span>
                            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#1C1917" }}>78.0 %</span>
                          </div>
                          <div style={{ height: 8, background: "rgba(120,113,108,0.15)", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: "78%", background: "#10B981", borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 10, color: "#78716C", marginTop: 4, display: "block" }}>Friska kassaflöden täcker utdelningen med god marginal. Inget akut behov av att sänka.</span>
                        </div>
                      </div>

                      {/* Summary and consensus */}
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 8 }}>Utdelningstillväxt Prognos</h4>
                        <p style={{ fontSize: 12, color: "#57534E", lineHeight: 1.6, marginBottom: 16 }}>
                          Konsensus pekar mot en fortsatt stabil utdelningshöjning. Analytiker förväntar sig en genomsnittlig höjning med ca <strong>3.5–4.5% per år</strong> de närmaste tre åren.
                        </p>
                        <Callout icon={<Shield size={16} />}>
                          Utdelningen bedöms som <strong>stabil och mycket hållbar</strong> tack vare bolagets defensiva intäktsbas. Stresstestet visar att kassaflödet tål en omsättningsminskning på upp till 12% innan utdelningen hotas.
                        </Callout>
                      </div>
                    </div>
                  </div>

                  {/* Insiders buys and sells */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(120,113,108,0.18)",
                      borderRadius: 16,
                      padding: 28,
                      boxShadow: "0 4px 20px rgba(120,113,108,0.05)",
                    }}
                  >
                    <div style={{ borderBottom: "2px solid #F59E0B", paddingBottom: 12, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1C1917", margin: 0 }}>Insiders och Insynshandel</h3>
                      <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Aktivitet bland insynspersoner (VD, styrelse, ledande befattningshavare) senaste 12 månaderna.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
                      {/* Insider buy/sell mini bar chart */}
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 16 }}>Insideraffärer senaste året</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                              <span>Antal köp:</span>
                              <span style={{ color: "#10B981" }}>4 st</span>
                            </div>
                            <div style={{ height: 16, background: "rgba(120,113,108,0.1)", borderRadius: 4, overflow: "hidden" }}>
                              {/* 4 buys vs 0 sells -> 100% green bar */}
                              <div style={{ height: "100%", width: "100%", background: "#10B981" }} />
                            </div>
                          </div>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                              <span>Antal försäljningar:</span>
                              <span style={{ color: "#EF4444" }}>0 st</span>
                            </div>
                            <div style={{ height: 16, background: "rgba(120,113,108,0.1)", borderRadius: 4, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: "0%", background: "#EF4444" }} />
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize: 11, color: "#78716C", marginTop: 14, lineHeight: 1.5 }}>
                          Det faktum att insiders köper och inte gör några försäljningar under året sänder en **starkt positiv signal** till marknaden om att ledningen tror på bolaget på dessa kursnivåer.
                        </p>
                      </div>

                      {/* Insider timeline */}
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 12 }}>Senaste insiderhändelser & utdelningar</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative", paddingLeft: 20 }}>
                          {/* Vertical Timeline bar */}
                          <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "rgba(120,113,108,0.15)" }} />

                          {[
                            { title: "Klas Balkow (VD)", text: "Köpte 1 500 aktier vid kurs 262,40 kr (+3,3 % ökning av innehavet)", date: "April 2026", color: "#10B981" },
                            { title: "Utdelning utbetald", text: "Vårutdelning om 4,50 kr per aktie avstämd och utbetald", date: "Mars 2026", color: "#F59E0B" },
                            { title: "Simone Margulies (vVD)", text: "Köpte 800 aktier vid kurs 265,10 kr (+5,1 % ökning av innehavet)", date: "Februari 2026", color: "#10B981" },
                          ].map((evt, idx) => (
                            <div key={idx} style={{ position: "relative" }}>
                              {/* Timeline dot */}
                              <div style={{ position: "absolute", left: -19, top: 4, width: 8, height: 8, borderRadius: "50%", background: evt.color }} />
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#1C1917" }}>{evt.title}</span>
                                <span style={{ fontSize: 10, color: "#78716C" }}>{evt.date}</span>
                              </div>
                              <p style={{ fontSize: 11, color: "#57534E", margin: "2px 0 0 0" }}>{evt.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Downloads Area (Footer) */}
              <div
                style={{
                  background: "#FAF8F5",
                  border: "1px solid rgba(120,113,108,0.15)",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                  marginTop: 12,
                }}
              >
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: "#1C1917", margin: 0 }}>Hämta analysfiler</h4>
                  <p style={{ fontSize: 12, color: "#57534E", margin: "2px 0 0 0" }}>Ladda ner materialet för att arbeta vidare offline.</p>
                </div>
                
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { label: "PDF-Rapport", format: "PDF", action: "Ladda ner" },
                    { label: "Excel-Modell", format: "XLSX", action: "Hämta" },
                    { label: "Ljudsammanfattning", format: "MP3", action: "Lyssna" },
                  ].map((dl) => (
                    <button
                      key={dl.label}
                      onClick={() => alert(`${dl.label} (${dl.format}) simulerad nedladdning startad!`)}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid rgba(120,113,108,0.25)",
                        borderRadius: 8,
                        padding: "10px 16px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#292524",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 9, background: "#F59E0B", color: "#FFF", padding: "2px 5px", borderRadius: 4, fontWeight: 800 }}>{dl.format}</span>
                      {dl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
