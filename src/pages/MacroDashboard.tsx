import React from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  MAKRODATA — uppdatera dessa värden när Riksbanken / Fed beslutar
//  Varje objekt: ändra "value", "change", "direction" och "updatedAt"
// ─────────────────────────────────────────────────────────────
export const MAKRO_DATA = [
  {
    id: "riksbanken",
    label: "Riksbanken",
    sublabel: "Styrränta",
    value: "3,25%",
    change: "-0,25%",
    direction: "down" as const,
    updatedAt: "2025-03-20",
    description:
      "Sveriges styrränta påverkar bolån och företagens lånekostnader direkt.",
    marketImpact:
      "Sänkt ränta gynnar tillväxtbolag och investmentbolag vars innehav värderas upp när avkastningskravet sjunker.",
    category: "ranta",
    currency: null,
  },
  {
    id: "fed",
    label: "Fed (USA)",
    sublabel: "Styrränta",
    value: "4,75%",
    change: "-0,25%",
    direction: "down" as const,
    updatedAt: "2025-03-19",
    description:
      "USA:s centralbanks styrränta sätter tonen för den globala ekonomin och riskaptiten.",
    marketImpact:
      "En lägre Fed-ränta stärker riskaptiten globalt och gynnar tillväxtaktier och tillväxtmarknader.",
    category: "ranta",
    currency: null,
  },
  {
    id: "inflation-se",
    label: "Inflation (KPIF)",
    sublabel: "Sverige",
    value: "1,5%",
    change: "+0,1%",
    direction: "up" as const,
    updatedAt: "2025-03-14",
    description:
      "Inflationstakten i Sverige rensat för direkta ränteeffekter (KPIF).",
    marketImpact:
      "Inflation nära Riksbankens 2%-mål ger utrymme för fortsatta räntesänkningar under 2025.",
    category: "inflation",
    currency: null,
  },
  {
    id: "usd-sek",
    label: "USD/SEK",
    sublabel: "Valuta",
    value: "10,45",
    change: "-0,02",
    direction: "down" as const,
    updatedAt: "2025-03-21",
    description:
      "Viktigt för exportbolag som Volvo, Ericsson och NVIDIA-exponerade portföljer.",
    marketImpact:
      "En starkare krona (lägre USD/SEK) pressar exportbolagens vinster i SEK-omräkning.",
    category: "valuta",
    currency: "USD",
  },
  {
    id: "eur-sek",
    label: "EUR/SEK",
    sublabel: "Valuta",
    value: "11,32",
    change: "+0,01",
    direction: "up" as const,
    updatedAt: "2025-03-21",
    description:
      "Euron påverkar handeln inom Europa och svenska exportbolags marginaler.",
    marketImpact:
      "En svagare krona mot euron gynnar exportbolag med europeiska intäkter.",
    category: "valuta",
    currency: "EUR",
  },
  {
    id: "omx",
    label: "OMXS30",
    sublabel: "Index",
    value: "2 387",
    change: "-1,2%",
    direction: "down" as const,
    updatedAt: "2025-03-21",
    description: "De 30 mest omsatta aktierna på Nasdaq Stockholm.",
    marketImpact:
      "Bred marknadsnedgång pressar substansvärden i investmentbolag och bredportföljer.",
    category: "index",
    currency: null,
  },
];

// ─────────────────────────────────────────────────────────────
//  DELADE KOMPONENTER
// ─────────────────────────────────────────────────────────────

function DirectionBadge({
  direction,
  change,
}: {
  direction: "up" | "down";
  change: string;
}) {
  const up = direction === "up";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full tracking-wide ${
        up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
      }`}
    >
      {up ? "▲" : "▼"} {change}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
//  HOMEPAGE WIDGET
// ─────────────────────────────────────────────────────────────
export function MakroWidget() {
  const preview = MAKRO_DATA.slice(0, 4);
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 border-b border-[#e0d5c0] pb-4">
        <div>
          <p className="text-xs font-bold text-[#b5892a] uppercase tracking-[0.2em] mb-1">
            Marknad
          </p>
          <h2
            className="text-2xl font-bold text-[#1a3c6e]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Makro-dashboard
          </h2>
          <p className="text-sm text-[#6a6a6a] mt-1">
            De viktigaste variablerna som styr börsens utveckling just nu.
          </p>
        </div>
        <Link
          to="/marknad"
          className="text-sm font-semibold text-[#1a3c6e] border border-[#1a3c6e] px-4 py-2 rounded-lg hover:bg-[#1a3c6e] hover:text-white transition-colors"
        >
          Gå till dashboard →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {preview.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#e0d5c0] rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-xs text-[#6a6a6a]">{item.sublabel}</p>
              </div>
              <DirectionBadge direction={item.direction} change={item.change} />
            </div>
            <p className="text-2xl font-bold text-[#1a3c6e]">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  FULL DASHBOARD PAGE  —  /marknad
// ─────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  ranta: "Räntor",
  inflation: "Inflation",
  valuta: "Valutor",
  index: "Index",
};

const CATEGORY_ORDER = ["ranta", "inflation", "valuta", "index"];

function MakroCard({ item }: { item: (typeof MAKRO_DATA)[0] }) {
  const up = item.direction === "up";
  return (
    <div className="bg-white border border-[#e0d5c0] rounded-2xl p-6 hover:shadow-lg transition-shadow">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-[#6a6a6a] mb-0.5">
            Uppdaterad {item.updatedAt}
          </p>
          <h3
            className="text-base font-bold text-[#1a3c6e] uppercase tracking-wide"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {item.label}
            {item.sublabel && (
              <span className="font-normal text-[#6a6a6a] ml-1 text-sm normal-case tracking-normal">
                ({item.sublabel})
              </span>
            )}
          </h3>
        </div>
        <DirectionBadge direction={item.direction} change={item.change} />
      </div>

      {/* Value */}
      <p className="text-4xl font-bold text-[#1a3c6e] mb-1">{item.value}</p>
      <p
        className={`text-sm font-semibold mb-4 ${
          up ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {up ? "+" : ""}
        {item.change} sedan senaste beslut
      </p>

      {/* Description */}
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Market impact */}
      <div className="bg-[#f5f0e8] rounded-xl p-3">
        <p className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-1">
          Marknadspåverkan
        </p>
        <p className="text-xs text-[#4a4a4a] leading-relaxed">
          {item.marketImpact}
        </p>
      </div>
    </div>
  );
}

export default function MacroDashboard() {
  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = MAKRO_DATA.filter((d) => d.category === cat);
      return acc;
    },
    {} as Record<string, typeof MAKRO_DATA>
  );

  return (
    <main className="min-h-screen bg-[#faf8f3]">
      {/* Hero */}
      <div className="bg-[#1a3c6e] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-[#b5892a] uppercase tracking-[0.25em] mb-3">
            Marknadsdata
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Makro-dashboard
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Håll koll på de viktigaste makroekonomiska variablerna som påverkar
            börsen och dina investeringar.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          return (
            <div key={cat}>
              <h2
                className="text-lg font-bold text-[#1a3c6e] uppercase tracking-widest mb-4 pb-2 border-b border-[#e0d5c0]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <MakroCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Förklaring */}
        <div className="bg-white border border-[#e0d5c0] rounded-2xl p-8">
          <h2
            className="text-xl font-bold text-[#1a3c6e] mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Varför spelar makro roll?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">
                Volvo &amp; Valuta
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Volvo genererar merparten av sina intäkter i USD och EUR men har
                stora kostnader i SEK. En stärkande krona — som under 2025 gick
                från 11,00 till 9,17 mot dollarn — pressade rörelseresultatet
                med miljarder kronor och är en av de viktigaste riskerna att
                följa.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">
                Investor &amp; Räntor
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Investor gynnas historiskt av ett stabilt eller sjunkande
                ränteläge. Riksbankens räntesänkningar under 2024–2025 har
                bidragit till att portföljbolagens värderingar stigit och
                substansvärdet nått rekordnivåer. Snabba räntehöjningar
                riskerar att vända den trenden.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">
                NVIDIA &amp; Fed
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Tillväxtbolag som NVIDIA är känsliga för Feds räntebeslut. Höga
                räntor ökar diskonteringsräntan och sänker nuvärdet av framtida
                vinster — vilket slår hårt mot högt värderade techbolag. En
                mjukare Fed är strukturellt positivt för AI-sektorn.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">
                Inflation &amp; Riksbanken
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Med KPIF nära 2%-målet har Riksbanken utrymme att fortsätta
                sänka styrräntan under 2025. Lägre räntor gynnar
                bostadsmarknaden, hushållens köpkraft och börsens värderingar —
                men risk finns om inflationen oväntat accelererar igen.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6a6a6a] text-center">
          Makrodata uppdateras manuellt efter centralbanksbeslut och officiella
          datapubliceringar. Ej finansiell rådgivning.
        </p>
      </div>
    </main>
  );
}

