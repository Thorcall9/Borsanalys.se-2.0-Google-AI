import React from 'react';
import AdUnit from './AdUnit';

interface NordnetCTAProps {
  variant?: 'high' | 'low';
}

/**
 * NordnetCTA – Affiliatekomponent för Nordnet via Adtraction.
 *
 * NORDNET_ENABLED = false → renderar en AdSense-annons i stället (väntar på Nordnet-godkännande).
 * NORDNET_ENABLED = true  → återaktiverar Nordnet-CTA:n.
 *
 * Byt ENDAST denna konstant när Nordnet godkänt affiliatepartnerskapet.
 *
 * Compliance (SE finansiell marknadsföring + Nordnets affiliatekrav):
 *  - Ingen text får uppfattas som investeringsrekommendation eller rådgivning.
 *  - "ANNONS" / affiliatemärkning ska vara tydlig och synlig.
 *  - Risktext är obligatorisk och ska vara läsbar.
 *  - Adtraction tracking-pixel (imageLink) MÅSTE inkluderas – får ej döljas med display:none.
 *  - rel="sponsored" krävs på affiliatelänken.
 *  - Minst 300px avstånd till närmaste annons hanteras av parent-wrapper i NibeDeepDive.
 */

// ─── VÄXEL ────────────────────────────────────────────────────────────────────
// Sätt till true när Nordnet-partnerskapet är godkänt.
const NORDNET_ENABLED = false;
// ─────────────────────────────────────────────────────────────────────────────

const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  // Visa AdSense-annons medan Nordnet-godkännandet är under behandling
  if (!NORDNET_ENABLED) {
    return (
      <AdUnit
        variant={variant === 'high' ? 'top-display' : 'legacy-display'}
        className="my-8"
      />
    );
  }

  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";
  const imageLink    = "https://track.adtraction.com/t/t?a=2067948486&as=2066019423&t=1&tk=1&i=1";

  return (
    <div
      className="my-8 w-full"
      id="nordnet-cta"
      aria-label="Annons: Nordnet"
      role="complementary"
    >
      {/* ── Affiliatemärkning – diskret men synlig ─────────────────────────── */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 border border-slate-200 px-2.5 py-0.5 rounded-full bg-white/80">
          Annons · Innehåller affiliatelänk
        </span>
      </div>

      {/* ── Klickbart CTA-block (gradient, premium-design) ─────────────────── */}
      <a
        href={affiliateLink}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-shadow duration-500"
        style={{ textDecoration: 'none' }}
        aria-label="Öppna konto hos Nordnet (affiliatelänk, öppnas i ny flik)"
      >
        {/* Gradient-bakgrund */}
        <div
          className="relative w-full px-8 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{
            background: 'linear-gradient(135deg, #0d4f3c 0%, #0F766E 45%, #10b981 100%)',
          }}
        >
          {/* Dekorativa glow-cirklar */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: '#34d399' }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ background: '#6ee7b7' }}
          />

          {/* ── Text-kolumn ──────────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center md:items-start gap-3 text-center md:text-left flex-1">

            {/* Rubrik – neutral, ingen rådgivning */}
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Handla NIBE via&nbsp;
              <span className="text-emerald-300">Nordnet</span>
            </div>

            {/* Brödtext – informativ, ej uppmanande */}
            <p className="text-sm text-emerald-100/80 max-w-md leading-relaxed mt-1">
              Handel i aktier och fonder via en digital plattform.
            </p>

            {/* Bullet points – fakta, ej superlativ */}
            <ul className="mt-2 space-y-1.5 text-xs text-emerald-100/70 text-left">
              {[
                'Låga avgifter på svenska aktier*',
                'Digital plattform för sparande och handel',
                'Gratis depå utan kontoavgifter',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[9px] text-emerald-100/40 mt-1">
              *Villkor gäller. Se nordnet.se för detaljer.
            </p>
          </div>

          {/* ── CTA-knapp ────────────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-3 shrink-0">
            <div
              className="
                relative px-10 py-4 rounded-2xl font-black text-base tracking-wide
                bg-white text-emerald-800
                shadow-lg shadow-black/30
                group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/40
                transition-all duration-300
              "
            >
              {/* Pulserande hover-ring */}
              <span
                className="absolute inset-0 rounded-2xl ring-2 ring-white/60 animate-ping opacity-0 group-hover:opacity-30"
                style={{ animationDuration: '1.5s' }}
              />
              Öppna konto
            </div>

            {/* Affiliatemärkning under knappen */}
            <span className="text-[9px] text-emerald-200/60 font-medium tracking-wide">
              Innehåller affiliatelänk
            </span>
          </div>
        </div>
      </a>

      {/* ── Risktext – obligatorisk, tydligt läsbar ────────────────────────── */}
      <p className="mt-4 text-center text-[10px] text-slate-400 leading-relaxed max-w-xl mx-auto px-4">
        Historisk avkastning är ingen garanti för framtida avkastning.
        Det finns risk att du inte får tillbaka de pengar du investerat.
      </p>

      {/* ── Adtraction tracking-pixel – compliance, FÅR EJ tas bort ──────── */}
      {/* visibility:hidden behåller dimensioner; display:none är ej tillåtet */}
      <img
        src={imageLink}
        alt=""
        width={1}
        height={1}
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
};

export default NordnetCTA;
