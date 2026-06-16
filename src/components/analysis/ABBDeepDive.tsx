import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, TrendingDown, Minus, AlertTriangle, Zap, Shield, BarChart3, Target } from "lucide-react";
import SEO from "../SEO";
import { AnalysisData } from "../../data/analyses";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import NordnetCTA from "./NordnetCTA";
import AdUnit from "./AdUnit";

// ABB brand: deep red accent, industrial feel
const ACCENT = "#CC0000";
const ACCENT_DARK = "#991400";
const ACCENT_LIGHT = "#fff0f0";

const scores = [
  { key: "Affärsmodell",    val: 4.5, max: 5 },
  { key: "Strategisk Moat", val: 4.0, max: 5 },
  { key: "Finansiell",      val: 3.5, max: 5 },
  { key: "Värdering",       val: 2.0, max: 5 },
  { key: "Tillväxt",        val: 4.0, max: 5 },
  { key: "Riskprofil",      val: 3.5, max: 5 },
  { key: "Kapitalallok.",   val: 4.0, max: 5 },
];
const totalScore = scores.reduce((s, x) => s + x.val, 0);
const maxScore = scores.reduce((s, x) => s + x.max, 0);
const ratingPct = Math.round((totalScore / maxScore) * 100);

interface Props {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

function MetricPill({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border flex flex-col gap-1 ${accent ? "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/40" : "bg-card border-border"}`}>
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <span className={`text-2xl font-black tracking-tighter ${accent ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>{value}</span>
      {sub && <span className="text-[10px] text-muted-foreground font-medium">{sub}</span>}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">{children}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function TableBlock({ headers, rows, caption }: { headers: string[]; rows: (string | number)[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`border-b border-border/50 ${ri % 2 === 1 ? "bg-muted/20" : ""}`}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-5 py-3 font-medium ${ci === 0 ? "text-left font-bold" : "text-right tabular-nums"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <div className="px-5 py-2 text-[10px] text-muted-foreground font-medium border-t border-border/50 italic">{caption}</div>}
    </div>
  );
}

export default function ABBDeepDive({ data, onToggleWatchlist, isInWatchlist, isWatchlistLoading, nextAnalysis }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-16">
      <SEO
        title={`Analys: ABB Ltd (ABB.ST) – Q1 2026 | Börsanalys.se`}
        description={data.summary}
      />

      {/* ── HERO ── */}
      <div className="w-full text-white py-8 md:py-10 px-6 md:px-10" style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Verdict circle */}
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase opacity-80 mb-2">Rekommendation</span>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl" style={{ color: ACCENT }}>
                <span className="text-[15px] font-black tracking-tighter leading-tight text-center px-1">BEVAKA</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={18} />
                </Link>
                <span className="text-white/80 text-sm font-medium">ABB Ltd — 16 juni 2026</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-white">ABB Ltd</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="bg-white/20 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide">ABB.ST</span>
                <span className="text-sm font-medium opacity-90">Industrivaror & Tjänster · Nasdaq Stockholm</span>
                <button
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist ? "bg-white text-red-700 border-white" : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
                >
                  <Star size={12} fill={isInWatchlist ? "currentColor" : "none"} />
                  {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
                </button>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-black tracking-tighter">{totalScore.toFixed(1)}/{maxScore}</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-48 bg-black/20 h-2 rounded-full overflow-hidden mb-1">
              <div className="bg-white h-full rounded-full" style={{ width: `${ratingPct}%` }} />
            </div>
            <span className="text-sm font-bold tracking-tight opacity-80">{ratingPct}% – Kvalitetsbolag till högt pris</span>
          </div>
        </div>
      </div>

      {/* ── SCORE STRIP ── */}
      <div className="w-full border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-4 sm:grid-cols-7">
          {scores.map(({ key, val, max }, i) => (
            <div key={key} className={`py-3 text-center ${i !== scores.length - 1 ? "border-r border-border" : ""}`}>
              <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">{key}</div>
              <div className="text-lg font-black" style={{ color: val >= 4 ? ACCENT : val >= 3 ? "#f59e0b" : "#94a3b8" }}>
                {val}<span className="text-[9px] text-muted-foreground font-mono">/{max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">

        {/* SUMMARY CALLOUT */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-2xl p-6 flex items-start gap-4">
          <AlertTriangle size={22} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium leading-relaxed text-red-900 dark:text-red-200">
            <strong>Sammanfattning:</strong> ABB är ett av världens ledande industribolag med strukturell medvind från AI-datacenter, elnätsuppgraderingar och energieffektivisering. Q1 2026 visade rekordorderingång – men P/E på 38,7x är 44&nbsp;% över historiskt snitt och baskursen (878 SEK) ligger <em>under</em> nuläget. Konsensus är redan inprisat. Bevaka tills bättre ingångspris eller bekräftad uthållig marginal.
          </p>
        </div>

        {/* KEY METRICS */}
        <section id="nyckeltal">
          <SectionLabel>Aktiedata & värdering – 16 juni 2026</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricPill label="Aktiekurs" value="991 SEK" sub="ABB.ST" />
            <MetricPill label="Börsvärde" value="1 778 mdkr" />
            <MetricPill label="P/E (trailing)" value="38,7x" sub="Historiskt: 26,9x" accent />
            <MetricPill label="P/E (2026e)" value="31,6x" />
            <MetricPill label="EV/EBITDA" value="21,3x" />
            <MetricPill label="Direktavk." value="1,12 %" sub="CHF 0,94/aktie" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <MetricPill label="EV/EBIT" value="24,3x" />
            <MetricPill label="EPS (2026e)" value="31,37 SEK" />
            <MetricPill label="EPS (2027e)" value="31,78 SEK" />
            <MetricPill label="ROCE" value="27,2 %" sub="Q1 2026" accent />
          </div>
        </section>

        <AdUnit variant="sidebar-display" />

        {/* Q1 2026 KVARTAL */}
        <section id="q1-2026">
          <SectionLabel>Q1 2026 – Kvartalets nyckeltal (USD)</SectionLabel>
          <TableBlock
            headers={["Nyckeltal", "Q1 2025", "Q1 2026", "Förändring"]}
            rows={[
              ["Orderingång (MUSD)", "8 589", "11 298", "+32 % (+24 % jämf.)"],
              ["Omsättning (MUSD)", "7 382", "8 734", "+18 % (+11 % jämf.)"],
              ["Bruttomarginal", "42,3 %", "39,4 %", "−2,9 pp ⚠️"],
              ["Op. EBITA (MUSD)", "1 495", "2 049", "+37 %"],
              ["Op. EBITA-marginal", "20,3 %", "23,5 %", "+3,2 pp (varav ~2,5 pp engång)"],
              ["EPS (USD)", "0,60", "0,73", "+21 %"],
              ["Fritt kassaflöde (MUSD)", "652", "1 250", "+92 % (varav 425 MUSD fastighet)"],
              ["Underliggande FCF (MUSD)", "652", "~825", "+27 %"],
              ["Orderbok (MUSD)", "21 708", "27 515", "+27 % (+22 % jämf.)"],
            ]}
            caption="Fastighetsvinst 377 MUSD ingår i op. EBITA. FCF inkl. 425 MUSD fastighetslikvidation."
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Engångseffekt</span>
              </div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Marginalen 23,5 % inkluderar 250 baspunkter från fastighetsvinsten. <strong>Underliggande marginal: ~21 %.</strong> Den verkliga affärsförbättringen var 70 baspunkter.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={16} className="text-red-600" />
                <span className="text-xs font-black uppercase tracking-widest text-red-700 dark:text-red-400">Bruttomarginal</span>
              </div>
              <p className="text-sm font-medium text-red-900 dark:text-red-200">
                Bruttomarginalen <strong>föll 2,9 procentenheter</strong> till 39,4 % på grund av orealiserade valuta- och råvaruhedgar – kostnadstryck kvarstår under EBITA-ytan.
              </p>
            </div>
          </div>
        </section>

        {/* SEGMENT */}
        <section id="segment">
          <SectionLabel>Segment – Q1 2026</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TableBlock
              headers={["Segment", "Order MUSD", "Tillväxt", "Jämf."]}
              rows={[
                ["Electrification", "6 647", "+51 %", "+44 %"],
                ["Motion", "2 548", "+18 %", "+9 %"],
                ["Automation", "2 464", "+12 %", "+5 %"],
              ]}
              caption="Electrification dominerar – datacenter och elnät driver tillväxten."
            />
            <TableBlock
              headers={["Segment", "Omstättning", "Op. EBITA", "Marginal"]}
              rows={[
                ["Electrification", "4 613 MUSD", "1 105 MUSD", "24,0 %"],
                ["Motion", "2 142 MUSD", "398 MUSD", "18,5 % ↓"],
                ["Automation", "2 147 MUSD", "311 MUSD", "14,5 %"],
              ]}
              caption="Motions marginal föll från 19,6 % – Gamesa −70 bps, High Power ineffektivitet −15 bps."
            />
          </div>

          {/* Segment bars */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Electrification", pct: 24.0, color: ACCENT, note: "Datacenter & elnät" },
              { name: "Motion", pct: 18.5, color: "#f59e0b", note: "Gamesa-utspädning" },
              { name: "Automation", pct: 14.5, color: "#64748b", note: "Cykliska slutmarknader" },
            ].map(({ name, pct, color, note }) => (
              <div key={name} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black">{name}</span>
                  <span className="text-xl font-black tabular-nums" style={{ color }}>{pct} %</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${(pct / 30) * 100}%`, backgroundColor: color }} />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FINANSIELL HISTORIK */}
        <section id="finansiell">
          <SectionLabel>Omsättning & vinstutveckling (SEK)</SectionLabel>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 mb-5 flex items-start gap-3">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              <strong>Obs – valutaeffekt:</strong> ABB rapporterar i USD. SEK-omsättningen föll 7,3 % under 2025 trots ett rekordår i USD. Kronförstärkning slår direkt mot redovisad SEK-tillväxt.
            </p>
          </div>
          <TableBlock
            headers={["År / Period", "Omsättning (MSEK)", "Tillväxt (SEK)", "EBIT (MSEK)", "EBIT-marginal"]}
            rows={[
              ["2024", "349 798", "–", "56 743", "16,2 %"],
              ["2025", "324 206", "−7,3 % (FX)", "54 078", "16,7 %"],
              ["TTM / Nu", "336 545", "+3,8 %", "57 354", "17,0 %"],
              ["2026e", "347 025", "+3,1 %", "67 411", "19,4 %"],
              ["2027e", "377 136", "+8,7 %", "74 559", "19,8 %"],
            ]}
            caption="2026e/2027e baseras på analytikerkonsensus. EBIT-uppgången 2026e (+17,5 %) kräver uthållig marginalexpansion utan engångsstöd."
          />
        </section>

        {/* VÄRDERING */}
        <section id="vardering">
          <SectionLabel>Värdering & historiska multiplar</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TableBlock
              headers={["År", "P/E", "EV/EBIT", "EV/EBITDA", "Direktavk."]}
              rows={[
                ["2024", "26,6x", "19,9x", "17,3x", "1,81 %"],
                ["2025", "27,2x", "23,7x", "20,7x", "1,61 %"],
                ["Nu (TTM)", "38,7x ⚠️", "24,3x", "21,3x", "1,12 %"],
                ["2026e", "31,6x", "–", "–", "1,13 %"],
              ]}
              caption="Nuvarande P/E är 44 % över historiskt snitt (26,9x)."
            />
            <TableBlock
              headers={["Bolag", "P/E (trailing)", "EV/EBITDA", "Direktavk."]}
              rows={[
                ["ABB (ABB.ST)", "38,7x", "21,3x", "1,1 %"],
                ["Schneider Electric", "~37x", "~20x", "~1,5 %"],
                ["Siemens AG", "~23x", "~16x", "~2,0 %"],
                ["Eaton (NYSE)", "~40x", "~28x", "~1,3 %"],
              ]}
              caption="ABB handlar till premie vs Siemens och Schneider, i linje med Eaton. Data: Stockanalysis.com / Multiples.vc, juni 2026."
            />
          </div>

          <div className="bg-card border-2 rounded-3xl p-8 text-center relative overflow-hidden" style={{ borderColor: `${ACCENT}33` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 blur-[100px] pointer-events-none opacity-10 rounded-full" style={{ backgroundColor: ACCENT }} />
            <div className="relative z-10">
              <div className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase mb-4">Investeringsbeslut</div>
              <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-3" style={{ color: ACCENT }}>BEVAKA</div>
              <div className="text-2xl font-black tracking-tighter mb-2" style={{ color: ACCENT }}>
                Baskurs: 878 SEK
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Köpzon: 800–850 SEK</div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto font-medium italic">
                "Konsensus EPS × forward P/E = exakt 991 SEK idag. Utan multipelkompression eller vinstöverraskning ger nuläget ingen uppsida på konsensus."
              </p>
              <div className="pt-8 border-t border-border/50 mt-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                Analyserat: 16 juni 2026 · Ej finansiell rådgivning
              </div>
            </div>
          </div>
        </section>

        {/* SCENARIER */}
        <section id="scenarier">
          <SectionLabel>Riktkurser – Scenarioanalys</SectionLabel>
          <p className="text-sm text-muted-foreground mb-6 font-medium">
            Baserat på EPS-estimat 2026 och scenarioanpassad P/E. Historisk P/E: <strong>26,9x</strong> (snitt 2024–2025). Nuvarande: <strong>38,7x</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                type: "bull",
                icon: <TrendingUp size={28} />,
                title: "Bull",
                prob: "25 %",
                eps: "34,51 SEK (+10 %)",
                pe: "35x",
                kurs: "1 208 SEK",
                change: "+22 %",
                color: ACCENT,
                bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30",
                desc: "Electrification behåller tvåsiffrig ordertillväxt. Marginal >22 % utan engångsstöd bekräftas. Premiumvärdering försvaras.",
              },
              {
                type: "base",
                icon: <Minus size={28} />,
                title: "Bas",
                prob: "50 %",
                eps: "31,37 SEK (konsensus)",
                pe: "28x",
                kurs: "878 SEK",
                change: "−11 %",
                color: "#f59e0b",
                bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30",
                desc: "Konsensus EPS. P/E normaliseras mot 28x – fortfarande premie mot historiken men lägre än nu.",
              },
              {
                type: "bear",
                icon: <TrendingDown size={28} />,
                title: "Bear",
                prob: "25 %",
                eps: "26,66 SEK (−15 %)",
                pe: "22x",
                kurs: "587 SEK",
                change: "−41 %",
                color: "#64748b",
                bg: "bg-muted/30 border-border",
                desc: "Cyklisk press på Motion/Automation. Marginalpress och uteblivna engångsvinster. Multipel mot historisk bottennivå.",
              },
            ].map((s) => (
              <div key={s.type} className={`rounded-3xl border p-8 ${s.bg}`}>
                <div className="mb-4" style={{ color: s.color }}>{s.icon}</div>
                <div className="text-xl font-black tracking-tighter uppercase mb-1" style={{ color: s.color }}>{s.title}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-5">Sannolikhet: {s.prob}</div>
                <div className="text-5xl font-black tracking-tighter leading-none mb-1" style={{ color: s.color }}>{s.kurs}</div>
                <div className="text-sm font-black mb-4 text-muted-foreground">{s.change} från 991 SEK</div>
                <div className="border-t border-border/40 pt-4 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">EPS</div>
                  <div className="text-sm font-bold">{s.eps}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">P/E-multipel</div>
                  <div className="text-sm font-bold">{s.pe}</div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mt-4 font-medium italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INVESTMENT CASE */}
        <section id="investment-case">
          <SectionLabel>Investment Case</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap size={24} />,
                title: "Strukturell efterfrågan",
                body: "Electrification-segmentet – 60 % av orderingången – växte 44 % jämförbart. AI-datacenter, elnätsuppgraderingar och e-mobilitet driver långa investeringscykler.",
              },
              {
                icon: <BarChart3 size={24} />,
                title: "Höga marginaler (med förbehåll)",
                body: "Op. EBITA 23,5 % är ovanligt hög för ett industribolag – men 2,5 pp kom från fastighetsvinst. Underliggande ~21 %. FCF 1,25 md USD inkl. 425 MUSD fastighetssalda.",
              },
              {
                icon: <Shield size={24} />,
                title: "Stark balansräkning",
                body: "Nettoskuld/EBITDA 0,3x ger utrymme för förvärv. Utdelning CHF 0,94/aktie + återköpsprogram 2 md USD. ROCE 27,2 %.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors">
                <div className="mb-3" style={{ color: ACCENT }}>{icon}</div>
                <div className="text-base font-black mb-2">{title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SWOT */}
        <section id="swot">
          <SectionLabel>SWOT</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Styrkor",
                icon: <TrendingUp size={16} />,
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30",
                items: [
                  "Global marknadsledare inom elektrifiering och automation",
                  "Orderbok 27,5 md USD – >1 års omsättning",
                  "ROCE 27,2 % och nettoskuld/EBITDA 0,3x",
                  "Strukturell medvind: AI-datacenter, elnät, e-mobilitet",
                ],
              },
              {
                title: "Svagheter",
                icon: <TrendingDown size={16} />,
                color: "text-red-600 dark:text-red-400",
                bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30",
                items: [
                  "P/E 38,7x – 44 % premie mot historiskt snitt",
                  "Bruttomarginalen föll 2,9 pp i Q1",
                  "Direktavkastning 1,12 % – oattraktiv för utdelningsinvesterare",
                  "SEK-omsättning volatil pga USD-rapportering",
                ],
              },
              {
                title: "Möjligheter",
                icon: <Target size={16} />,
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30",
                items: [
                  "Fortsatt acceleration av datacenter- och elnätsinvesteringar",
                  "Marginalexpansion om Gamesa-integration lyckas",
                  "Förvärvskapacitet vid låg skuldsättning",
                  "Robotics-avyttring frigör fokus och kapital",
                ],
              },
              {
                title: "Hot",
                icon: <AlertTriangle size={16} />,
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30",
                items: [
                  "Avmattning i AI-capex slår mot Electrification",
                  "Geopolitik och handelstullar stör leveranskedjor",
                  "Konkurrens från Siemens, Schneider, Eaton",
                  "Kronförstärkning ger negativa SEK-transaltionseffekter",
                ],
              },
            ].map(({ title, icon, color, bg, items }) => (
              <div key={title} className={`rounded-2xl border p-6 ${bg}`}>
                <div className={`flex items-center gap-2 mb-4 font-black text-sm uppercase tracking-widest ${color}`}>
                  {icon} {title}
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium text-foreground/80">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color.replace("text-", "bg-")}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* RISKER */}
        <section id="risker">
          <SectionLabel>Riskanalys</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { risk: "Hög värdering", san: "4/5", eff: "4/5", note: "P/E 38,7x – multipelkompression vid normalisering" },
              { risk: "Engångsjusterad lönsamhet", san: "4/5", eff: "3/5", note: "2,5 pp av Q1-marginalen var fastighetsvinster" },
              { risk: "Cyklisk nedgång (Motion/Auto)", san: "3/5", eff: "4/5", note: "Industrikonjunkturberoende segment" },
              { risk: "Datacenterberoende", san: "2/5", eff: "4/5", note: "AI-capex-avmattning slår mot Electrification" },
              { risk: "Bruttomarginalpress", san: "3/5", eff: "3/5", note: "FX/råvaruhedgar pressen kvarstår" },
              { risk: "Geopolitik & tullar", san: "3/5", eff: "3/5", note: "Mellanöstern, handelssanktioner" },
              { risk: "Gamesa-utspädning", san: "4/5", eff: "2/5", note: "Marginalutspädande under hela 2026" },
              { risk: "Valutarisk (SEK/USD)", san: "5/5", eff: "2/5", note: "Strukturell – redovisas i USD men handlas i SEK" },
            ].map(({ risk, san, eff, note }) => (
              <div key={risk} className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle size={16} style={{ color: ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-black">{risk}</span>
                    <div className="flex gap-2 shrink-0">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">San: {san}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Eff: {eff}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDANCE */}
        <section id="guidance">
          <SectionLabel>Guidance & framtidsutsikter 2026</SectionLabel>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Helår 2026 – Höjd guidance efter Q1</div>
                <p className="text-sm font-medium text-foreground">
                  <strong>Hög ensiffrig till låg tvåsiffrig procent</strong> i jämförbar omsättningstillväxt (uppgradering från 6–9 %). Op. EBITA-marginal förbättras år över år, <em>även exklusive fastighetsvinsten.</em>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border/50">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}>
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Q2 2026</div>
                <p className="text-sm font-medium text-foreground">
                  Hög ensiffrig till låg tvåsiffrig jämförbar tillväxt. Op. EBITA-marginal förbättras år över år. Book-to-bill förväntas positiv.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#f59e0b22", color: "#f59e0b" }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Risker i guidancen</div>
                <p className="text-sm font-medium text-foreground">
                  Gamesa-förvärvet är marginalutspädande under 2026. Bruttomarginalpress från FX-hedgar kan kvarstå. Geopolitisk osäkerhet kring Mellanöstern och handelstullar kan påverka order i H2.
                </p>
              </div>
            </div>
          </div>
        </section>

        <NordnetCTA />
        <AdUnit variant="footer-multiplex" />

        {/* DISCLAIMER */}
        <AnalysisDisclaimer />

        {/* NEXT ANALYSIS */}
        {nextAnalysis && (
          <div className="border-t border-border pt-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Nästa analys</div>
            <Link
              to={`/analys/${nextAnalysis.slug}`}
              className="group flex items-center justify-between bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div>
                <div className="text-lg font-black tracking-tighter group-hover:text-primary transition-colors">{nextAnalysis.title}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">{nextAnalysis.ticker} · {nextAnalysis.recommendation}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft size={18} className="rotate-180" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
