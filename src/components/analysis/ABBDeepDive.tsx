import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, BarChart3, CheckCircle2, Shield, Star, Target, Zap } from "lucide-react";
import SEO from "../SEO";
import { AnalysisData } from "../../data/analyses";
import AnalysisDisclaimer from "./AnalysisDisclaimer";
import NordnetCTA from "./NordnetCTA";
import AdUnit from "./AdUnit";
import { SectionHeader, RatingBox, Card as AnalysisCard, FadeIn as AnalysisFadeIn } from "./index";

const ACCENT = "#CC0000";

const allScores = [
  { key: "Affärsmodell", val: 4.5, max: 5 },
  { key: "Strategisk Moat", val: 4.0, max: 5 },
  { key: "Finansiell", val: 3.5, max: 5 },
  { key: "Värdering", val: 2.0, max: 5 },
  { key: "Tillväxt", val: 4.0, max: 5 },
  { key: "Riskprofil", val: 3.5, max: 5 },
  { key: "Kapitalallok.", val: 4.0, max: 5 },
];

const totalScore = allScores.reduce((sum, score) => sum + score.val, 0);
const maxScore = allScores.reduce((sum, score) => sum + score.max, 0);
const ratingPct = Math.round((totalScore / maxScore) * 100);
const ratingOutOfFive = (totalScore / maxScore) * 5;

interface ABBDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

function ArticleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-card p-6 md:p-8 rounded-[2rem] border border-border shadow-sm mb-8">
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.75] text-slate-800 dark:text-slate-100">{children}</p>;
}

function DataTable({
  headers,
  rows,
  note,
}: {
  headers: string[];
  rows: React.ReactNode[][];
  note?: string;
}) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full border-collapse text-[13.5px] text-slate-900 dark:text-slate-100">
        <thead>
          <tr className="bg-foreground text-background">
            {headers.map((header) => (
              <th key={header} className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium opacity-85">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-muted/20" : ""}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`${cellIndex > 0 ? "text-right" : ""} p-2.5 font-mono text-[13px] ${cellIndex === 0 ? "font-bold" : "font-medium"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <div className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200 mt-2">{note}</div>}
    </div>
  );
}

export default function ABBDeepDive({
  data,
  onToggleWatchlist,
  isInWatchlist,
  isWatchlistLoading,
  nextAnalysis,
}: ABBDeepDiveProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-16">
      <SEO title="Analys: ABB Ltd (ABB.ST) - Q1 2026" description={data.summary} />

      <div className="w-full text-white py-8 md:py-10 px-6 md:px-10" style={{ background: `linear-gradient(135deg, #991400 0%, ${ACCENT} 100%)` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl" style={{ color: ACCENT }}>
                <span className="text-[15px] font-black tracking-tighter leading-tight text-center px-1">BEVAKA</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                ABB Ltd - 16 juni 2026
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">ABB.ST</span>
                <span className="text-sm font-medium opacity-90">Industrivaror & Tjänster · Nasdaq Stockholm</span>
                <button
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist ? "bg-white border-white" : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
                  style={isInWatchlist ? { color: ACCENT } : {}}
                >
                  <Star size={14} fill={isInWatchlist ? "currentColor" : "none"} />
                  {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end w-full md:w-64">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tighter">{totalScore.toFixed(1)}/{maxScore}</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: `${ratingPct}%` }} />
            </div>
            <span className="text-sm font-bold tracking-tight">{ratingOutOfFive.toFixed(2)} / 5.0 - Rating {ratingPct}%</span>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-border" style={{ backgroundColor: "#991400" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-4 sm:grid-cols-7">
          {allScores.map(({ key, val, max }, index) => (
            <div key={key} className={`py-4 text-center ${index !== allScores.length - 1 ? "border-r border-white/10" : ""}`}>
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/90 mb-1.5">{key}</div>
              <div className="font-serif text-xl leading-none text-white">
                {val}<span className="text-[10px] text-white/80 font-mono">/{max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-2xl p-5 flex items-start gap-4">
          <AlertTriangle size={24} className="shrink-0 mt-1 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium leading-relaxed text-red-900 dark:text-red-200">
            <strong>Sammanfattning:</strong> ABB är ett av världens ledande industribolag med strukturell medvind från AI-datacenter,
            elnätsuppgraderingar och energieffektivisering. Q1 2026 visade rekordorderingång - men P/E på 38,7x är 44 % över historiskt
            snitt och baskursen (878 SEK) ligger under nuläget. Konsensus är redan inprisat. <strong>Bevaka tills bättre ingångspris.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ["Börskurs", "991 SEK", "ABB.ST · Nasdaq Stockholm"],
            ["Börsvärde", "1 778 mdkr", "991 kr x 1 794 mn aktier"],
            ["P/E-tal (trailing)", "38,7x", "Historiskt snitt: 26,9x (+44 %)"],
            ["ROCE", "27,2 %", "Q1 2026"],
          ].map(([label, value, note], index) => (
            <AnalysisCard key={label} className={`p-6 ${index === 2 ? "border-2 border-red-200" : ""}`}>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest block mb-2">{label}</span>
              <div className="text-2xl font-black" style={index >= 2 ? { color: ACCENT } : undefined}>{value}</div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1 block">{note}</span>
            </AnalysisCard>
          ))}
        </div>

        <AdUnit variant="top-display" />

        <section id="oversikt" className="scroll-mt-24">
          <AnalysisFadeIn>
            <SectionHeader number="Sektion I" title="Bolagsöversikt" accentColor={ACCENT} />
            <p className="text-lg leading-relaxed italic border-l-4 pl-6 py-2 my-6" style={{ borderColor: ACCENT }}>
              ABB är en av industrivärldens absoluta tungviktare - ett schweizisk-svenskt teknikbolag som kombinerar elektrifiering
              och automation i en portfölj exponerad mot decenniets viktigaste investeringsteman: AI-infrastruktur, energiomställning
              och industriell digitalisering.
            </p>
            <ArticleBox>
              <Paragraph>
                <strong>Bakgrund & Geografi:</strong> ABB bildades 1988 genom en fusion av svenska ASEA och schweiziska BBC Brown Boveri.
                Idag har bolaget cirka 105 000 anställda och är verksamt i över 100 länder.
              </Paragraph>
              <Paragraph><strong>Affärsområden:</strong></Paragraph>
              <ul className="list-disc pl-5 space-y-2 text-[15px] font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                <li><strong>Electrification (ca 53 % av omsättningen):</strong> Eldistribution, låg- och mellanspänningsprodukter, datacenterinfrastruktur och e-mobility. Ordertillväxt +44 % jämförbart i Q1 2026.</li>
                <li><strong>Motion (ca 25 %):</strong> Motorer, drivsystem och generatorer. Tillväxt +9 % jämförbart, men marginalen sjönk till 18,5 % på grund av Gamesa och High Power.</li>
                <li><strong>Automation (ca 25 %):</strong> System för processtyrning, digitalisering och marin. Ordertillväxt +5 % jämförbart och påverkan från cykliska slutmarknader.</li>
              </ul>
              <Paragraph>
                <strong>Ledning:</strong> VD Morten Wierod tillträdde 2023 och har fokuserat på kärnverksamheten, disciplinerad kapitalallokering och en decentraliserad styrmodell.
              </Paragraph>
            </ArticleBox>
            <RatingBox rating={4.5} maxRating={5} title="Betyg I - Affärsmodell" accentColor={ACCENT} description="Exceptionellt stark affärsmodell med global marknadsledarposition, exponering mot tre av decenniets starkaste investeringsteman och bevisad förmåga att konvertera orderingång till kassaflöde." />
          </AnalysisFadeIn>
        </section>

        <section id="strategi" className="scroll-mt-24">
          <AnalysisFadeIn delay={100}>
            <SectionHeader number="Sektion II" title="Strategisk analys & Moat" accentColor={ACCENT} />
            <ArticleBox>
              <Paragraph>
                <strong>Makro & Bransch:</strong> ABB sitter i skärningspunkten mellan tre sekulära megatrender. Electrification gynnas av AI-datacenter, uppgradering av elnät och elektrifiering av transporter.
              </Paragraph>
              <Paragraph>
                <strong>Vallgrav:</strong> ABB:s konkurrensfördelar är bred skala, installerad bas på hundratusentals anläggningar och ett globalt servicenätverk som skapar höga byteskostnader.
              </Paragraph>
              <Paragraph>
                <strong>Konkurrens:</strong> Primära konkurrenter är Schneider Electric, Siemens och Eaton. ABB handlar till premie mot Siemens och Schneider men i linje med Eaton.
              </Paragraph>
            </ArticleBox>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                ["Styrkor", "text-emerald-600", "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30", data.strengths || []],
                ["Svagheter", "text-red-600", "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30", data.weaknesses || []],
                ["Möjligheter", "text-blue-600", "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30", data.opportunities || []],
                ["Hot", "text-amber-600", "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30", data.threats || []],
              ].map(([title, color, bg, items]) => (
                <div key={title as string} className={`rounded-2xl border p-6 ${bg}`}>
                  <div className={`font-black text-sm uppercase tracking-widest mb-4 ${color}`}>{title}</div>
                  <ul className="space-y-2">
                    {(items as string[]).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <RatingBox rating={4} maxRating={5} title="Betyg II - Strategisk Moat" accentColor={ACCENT} description="Stark global position med höga byteskostnader och teknisk komplexitet. Avdrag för exponering mot cykliska segment och beroende av politiska investeringsbeslut kring elnät och datacenter." />
          </AnalysisFadeIn>
        </section>

        <section id="finansiellt" className="scroll-mt-24">
          <AnalysisFadeIn delay={200}>
            <SectionHeader number="Sektion III" title="Finansiell analys" accentColor={ACCENT} />
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-5 mb-6 flex items-start gap-4">
              <AlertTriangle size={20} className="shrink-0 mt-0.5 text-amber-600" />
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                <strong>Obs - valutaeffekt:</strong> ABB rapporterar i USD. SEK-omsättningen föll 7,3 % under 2025 trots ett rekordår i USD.
              </p>
            </div>
            <h3 className="font-serif text-[19px] mt-7 mb-3">Q1 2026 - Kvartalets nyckeltal (USD)</h3>
            <DataTable
              headers={["Nyckeltal", "Q1 2025", "Q1 2026", "Förändring"]}
              rows={[
                ["Orderingång (MUSD)", "8 589", "11 298", "+32 % (+24 % jämf.)"],
                ["Omsättning (MUSD)", "7 382", "8 734", "+18 % (+11 % jämf.)"],
                ["Bruttomarginal", "42,3 %", "39,4 %", "-2,9 pp"],
                ["Op. EBITA (MUSD)", "1 495", "2 049", "+37 %"],
                ["Op. EBITA-marginal", "20,3 %", "23,5 %", "+3,2 pp, varav cirka 2,5 pp engång"],
                ["EPS (USD)", "0,60", "0,73", "+21 %"],
                ["Fritt kassaflöde (MUSD)", "652", "1 250", "+92 %, varav 425 MUSD fastighet"],
                ["Underliggande FCF (MUSD)", "652", "~825", "+27 %"],
                ["Orderbok (MUSD)", "21 708", "27 515", "+27 % (+22 % jämf.)"],
                ["ROCE", "-", "27,2 %", "+2,8 pp"],
              ]}
              note="Fastighetsvinst 377 MUSD ingår i op. EBITA. FCF inkluderar 425 MUSD från fastighetslikvidation."
            />

            <h3 className="font-serif text-[19px] mt-7 mb-3">Omsättning & vinstutveckling (SEK)</h3>
            <DataTable
              headers={["År / Period", "Omsättning (MSEK)", "Tillväxt (SEK)", "EBIT (MSEK)", "EBIT-marginal"]}
              rows={[
                ["2024", "349 798", "-", "56 743", "16,2 %"],
                ["2025", "324 206", "-7,3 % (FX)", "54 078", "16,7 %"],
                ["TTM / Nu", "336 545", "+3,8 %", "57 354", "17,0 %"],
                ["2026e", "347 025", "+3,1 %", "67 411", "19,4 %"],
                ["2027e", "377 136", "+8,7 %", "74 559", "19,8 %"],
              ]}
              note="2026e/2027e = analytikerkonsensus. EBIT-uppgången 2026e kräver uthållig marginalexpansion utan engångsstöd."
            />
            <RatingBox rating={3.5} maxRating={5} title="Betyg III - Finansiell Kvalitet" accentColor={ACCENT} description="Stark balansräkning och hög ROCE. Avdrag för bruttomarginalnedgång, engångsdrivet FCF och att SEK-omsättningen föll 7,3 % 2025 trots rekordresultat i USD." />
          </AnalysisFadeIn>
        </section>

        <section id="vardering" className="scroll-mt-24">
          <AnalysisFadeIn delay={300}>
            <SectionHeader number="Sektion IV" title="Värdering" accentColor={ACCENT} />
            <DataTable
              headers={["Bolag", "P/E (trailing)", "EV/EBITDA", "Direktavkastning"]}
              rows={[
                ["ABB (ABB.ST)", "38,7x", "21,3x", "1,1 %"],
                ["Schneider Electric", "~37x", "~20x", "~1,5 %"],
                ["Siemens AG", "~23x", "~16x", "~2,0 %"],
                ["Eaton", "~40x", "~28x", "~1,3 %"],
              ]}
              note="Källa: Stockanalysis.com / Multiples.vc, 16 juni 2026. Uppdateras vid publicering."
            />
            <ArticleBox>
              <Paragraph>
                ABB handlas till <strong>44 % premie mot det historiska P/E-snittet på 26,9x</strong>. Konsensus EPS 2026e på 31,37 SEK x forward P/E 31,6x = exakt 991 SEK. Med andra ord är konsensus redan fullt inprisat.
              </Paragraph>
              <Paragraph>
                Direktavkastningen på 1,12 % är låg relativt konkurrenterna. Motivet för ägande måste vara kursutveckling driven av vinsttillväxt.
              </Paragraph>
            </ArticleBox>
            <RatingBox rating={2} maxRating={5} title="Betyg IV - Värdering" accentColor={ACCENT} description="Värderingen är ansträngd. P/E 38,7x vs historiskt snitt 26,9x ger minimal säkerhetsmarginal. Baskursen 878 SEK ligger under nuläget." />
          </AnalysisFadeIn>
        </section>

        <section id="tillvaxt" className="scroll-mt-24">
          <AnalysisFadeIn delay={400}>
            <SectionHeader number="Sektion V" title="Tillväxtutsikter & Guidance" accentColor={ACCENT} />
            <ArticleBox>
              <Paragraph>
                <strong>Höjd guidance efter Q1:</strong> ABB förväntar sig nu hög ensiffrig till låg tvåsiffrig procent i jämförbar omsättningstillväxt för helåret 2026, upp från tidigare 6-9 %. Operationell EBITA-marginal ska förbättras år över år även exklusive fastighetsvinsten.
              </Paragraph>
              <ul className="list-disc pl-5 space-y-2 text-[15px] font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                <li><strong>AI-datacenter och elnät:</strong> Electrification hade tvåsiffrig ordertillväxt i alla regioner.</li>
                <li><strong>Orderbok 27,5 md USD:</strong> Ger god visibilitet för kommande 4-5 kvartal.</li>
                <li><strong>Förvärv:</strong> Nettoskuld/EBITDA 0,3x ger utrymme för bolt-on förvärv.</li>
                <li><strong>Gamesa-risk:</strong> Förvärvet är marginalutspädande under hela 2026.</li>
              </ul>
            </ArticleBox>
            <RatingBox rating={4} maxRating={5} title="Betyg V - Tillväxtutsikter" accentColor={ACCENT} description="Starka strukturella drivkrafter och en imponerande orderbok ger god visibilitet. Avdrag för Gamesa och risk för AI-capex-avmattning." />
          </AnalysisFadeIn>
        </section>

        <section id="risk" className="scroll-mt-24">
          <AnalysisFadeIn delay={500}>
            <SectionHeader number="Sektion VI" title="Riskprofil" accentColor={ACCENT} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                ["Hög värdering", "P/E 38,7x - multipelkompression vid normalisering ger stor nedsida"],
                ["Engångsjusterad lönsamhet", "2,5 pp av Q1-marginalen var fastighetsvinster - underliggande cirka 21 %"],
                ["Cyklisk nedgång", "Motion och Automation är industrikonjunkturberoende"],
                ["Datacenterberoende", "AI-capex-avmattning eller energireglering kan slå mot Electrification"],
                ["Bruttomarginalpress", "FX/råvaruhedgar pressade bruttomarginalen med 2,9 pp i Q1"],
                ["Valutarisk", "SEK-omsättningen föll 7,3 % 2025 trots rekordår i USD"],
                ["Gamesa-utspädning", "Marginalutspädande under hela 2026"],
                ["Geopolitik & tullar", "Mellanösternkonflikten och handelstullar skapar osäkerhet"],
              ].map(([title, note]) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <div>
                    <div className="text-sm font-black">{title}</div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed mt-1">{note}</p>
                  </div>
                </div>
              ))}
            </div>
            <RatingBox rating={3.5} maxRating={5} title="Betyg VI - Riskprofil" accentColor={ACCENT} description="Låg-medel risk operationellt tack vare stark balansräkning. Den primära risken är värderingsrelaterad." />
          </AnalysisFadeIn>
        </section>

        <section id="kapital" className="scroll-mt-24">
          <AnalysisFadeIn delay={600}>
            <SectionHeader number="Sektion VII" title="Ledning & Kapitalallokering" accentColor={ACCENT} />
            <ArticleBox>
              <Paragraph>
                <strong>Morten Wierod, VD sedan 2023:</strong> Har fokuserat portföljen på kärnverksamheten och stärkt marginalprofilerna. Kommunikationen är tydlig och transparent.
              </Paragraph>
              <ul className="list-disc pl-5 space-y-2 text-[15px] font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                <li><strong>Utdelning:</strong> cirka 11,10 SEK per aktie. Direktavkastning 1,12 %.</li>
                <li><strong>Återköp:</strong> Program på upp till 2 md USD löper till januari 2027. Cirka 225 MUSD återköptes i Q1 2026.</li>
                <li><strong>Investeringar:</strong> 75 MUSD i indiska fabriker och FoU.</li>
                <li><strong>Förvärv:</strong> Nettoskuld/EBITDA 0,3x ger stort utrymme.</li>
              </ul>
            </ArticleBox>
            <RatingBox rating={4} maxRating={5} title="Betyg VII - Kapitalallokering" accentColor={ACCENT} description="Disciplinerad kapitalallokering med utdelning, återköp och selektiva förvärv. Avdrag för låg direktavkastning och att återköp vid P/E 38,7x är känsliga." />
          </AnalysisFadeIn>
        </section>

        <section id="sammanfattning" className="scroll-mt-24">
          <SectionHeader number="Sektion VIII" title="Sammanfattning & Investeringsbeslut" accentColor={ACCENT} />
          <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 text-sm text-green-900 dark:text-green-200 my-4 leading-relaxed rounded-r-xl">
            <strong>1. Är detta ett kvalitetsbolag?</strong> Utan tvekan. ABB är ett industribolag av världsklass med global marknadsledarposition, exceptionell balansräkning och strukturell medvind.
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 text-sm text-amber-900 dark:text-amber-200 my-4 leading-relaxed rounded-r-xl">
            <strong>2. Är aktien rimligt värderad?</strong> Nej. P/E 38,7x vs historiskt snitt 26,9x lämnar minimal säkerhetsmarginal.
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 text-sm text-blue-900 dark:text-blue-200 my-4 leading-relaxed rounded-r-xl">
            <strong>3. Passar bolaget som långsiktigt innehav?</strong> Ja, men till rätt pris. Köpzon runt 800-850 SEK är mer attraktiv.
          </div>

          <div className="relative overflow-hidden bg-card border-2 rounded-[3rem] p-10 md:p-12 text-center mt-8 mb-8 shadow-2xl" style={{ borderColor: `${ACCENT}33` }}>
            <div className="text-[10px] font-black tracking-[0.4em] text-slate-600 dark:text-slate-300 uppercase mb-8">Investeringsbeslut</div>
            <div className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4" style={{ color: ACCENT }}>BEVAKA</div>
            <div className="text-2xl md:text-4xl font-black tracking-tighter mb-3" style={{ color: ACCENT }}>Baskurs: 878 SEK</div>
            <div className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-10">Köpzon: 800-850 SEK</div>
            <p className="text-base md:text-lg text-slate-800 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto font-semibold italic">
              "Konsensus EPS x forward P/E = exakt 991 SEK idag. Utan multipelkompression eller vinstöverraskning ger nuläget ingen meningsfull uppsida."
            </p>
          </div>

          <AnalysisCard>
            <div className="space-y-6">
              {allScores.map((score) => (
                <div key={score.key}>
                  <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wide">
                    <span>{score.key}</span>
                    <span style={{ color: ACCENT }}>{score.val}/{score.max}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(score.val / score.max) * 100}%`, backgroundColor: ACCENT }} />
                  </div>
                </div>
              ))}
            </div>
          </AnalysisCard>

          <h3 className="font-serif text-[19px] mt-10 mb-3">Vad ska investeraren bevaka framåt?</h3>
          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Underliggande marginalutveckling Q2-Q3 2026",
                text: "Kan ABB hålla marginal över 22 % utan fastighetsvinster? Det är det enskilt viktigaste beviset för att den strukturella förbättringen är uthållig.",
              },
              {
                num: "02",
                title: "Bruttomarginalen",
                text: "Bruttomarginalen föll 2,9 pp i Q1. Om den stabiliseras kring 40 % eller mer i Q2 stärker det lönsamhetsbilden markant.",
              },
              {
                num: "03",
                title: "Gamesa-integration och Motion-marginalen",
                text: "Motions marginal föll till 18,5 %. Ledningen lovar neutralisering 2027 - se om integrationen fortskrider enligt plan.",
              },
              {
                num: "04",
                title: "Robotics-avyttringens tidslinje och prissättning",
                text: "Avyttringen av Robotics förväntas H2 2026. Priset och strukturen avgör om det är värdeskapande för aktieägarna.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 py-3.5 border-b border-border last:border-b-0 items-start">
                <div className="font-mono text-[11px] font-black text-slate-600 dark:text-slate-300 shrink-0 pt-0.5 w-6">{item.num}</div>
                <div>
                  <div className="font-semibold mb-1 text-[14px]">{item.title}</div>
                  <div className="text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-[1.6]">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdUnit variant="middle-article" className="my-2" />

        <section id="scenarier" className="scroll-mt-24 pb-12">
          <SectionHeader number="Sektion IX" title="Scenarier: Bull, Bas & Bear" accentColor={ACCENT} />
          <p className="text-sm text-slate-800 dark:text-slate-100 mb-6 font-semibold">
            Baserat på EPS-estimat 2026 och scenarioanpassad P/E. Historisk P/E: <strong>26,9x</strong>. Nuvarande: <strong>38,7x</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {data.scenarios?.map((scenario) => (
              <div key={scenario.label} className="p-8 bg-card border border-border rounded-3xl hover:shadow-xl transition-all" style={scenario.type === "base" ? { border: `3px solid ${ACCENT}` } : undefined}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scenario.type === "bear" ? "#64748b" : ACCENT }} />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: scenario.type === "bear" ? undefined : ACCENT }}>
                    {scenario.label} Case · {scenario.probability}
                  </span>
                </div>
                <div className="font-serif text-4xl mb-2 leading-none" style={{ color: scenario.type === "bull" ? ACCENT : undefined }}>{scenario.value}</div>
                <div className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-6">{scenario.change} från 991 SEK</div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">{scenario.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            <h3 className="font-serif text-[19px]">Scenariokommentarer</h3>
            <ArticleBox>
              <Paragraph>
                Vi bedömer <strong>Bas case</strong> som mest sannolikt, cirka 50 %. Konsensus ligger på EPS 31,37 SEK och ett P/E
                som normaliseras mot 28x implicerar 878 SEK - under nuläget. Marknaden betalar redan fullt ut för konsensus.
              </Paragraph>
              <Paragraph>
                <strong>Bull case</strong>, cirka 25 %, kräver att Electrification fortsätter leverera rekordorder Q2-Q4, att
                bruttomarginalen återhämtar sig och att ledningen bekräftar uthållig marginal över 22 % utan fastighetsvinster.
              </Paragraph>
              <Paragraph>
                <strong>Bear case</strong>, cirka 25 %, materialiseras om AI-capex-cykeln vänder snabbare än väntat,
                geopolitiska störningar påverkar orderingången eller om Gamesa-integrationen kostar mer än väntat.
              </Paragraph>
            </ArticleBox>
          </div>
        </section>

        <AdUnit variant="footer-multiplex" />
        <div className="mt-[120px]">
          <NordnetCTA variant="low" />
        </div>
        <AnalysisDisclaimer className="mt-16" />

        {nextAnalysis && (
          <div className="mt-16 pt-16 border-t border-border">
            <h3 className="font-serif text-2xl mb-8 text-center">Läs nästa analys</h3>
            <Link to={`/analys/${nextAnalysis.slug}`} className="group flex items-center justify-between bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all">
              <div>
                <div className="text-lg font-black tracking-tighter group-hover:text-primary transition-colors">{nextAnalysis.title}</div>
                <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold mt-1">{nextAnalysis.ticker} · {nextAnalysis.recommendation}</div>
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
