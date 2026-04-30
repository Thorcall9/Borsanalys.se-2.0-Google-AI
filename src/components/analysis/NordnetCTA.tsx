import React from 'react';

interface NordnetCTAProps {
  variant?: 'high' | 'low';
}

/**
 * NordnetCTA – Affiliate-komponent för Nordnet via Adtraction.
 *
 * Affiliate-regler:
 *  - Tracking-bilden (imageLink) MÅSTE finnas med för compliance.
 *  - Affiliate-länken (affiliateLink) används på CTA-knappen.
 *  - Minst 300px avstånd till närmaste annons (hanteras av wrappers i parent).
 *  - CTA ska vara visuellt dominant – se design nedan.
 */
const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";
  const imageLink = "https://track.adtraction.com/t/t?a=2067948486&as=2066019423&t=1&tk=1&i=1";

  return (
    <div
      className="my-8 w-full"
      id="nordnet-cta"
      aria-label="Annonsör: Nordnet"
      role="complementary"
    >
      {/* Sponsor etikett */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 border border-slate-200 px-2.5 py-0.5 rounded-full bg-white/80">
          Annonsör
        </span>
      </div>

      {/*
        Visuellt dominant CTA-block.
        Gradient bakgrund + stor typografi + puls-animerad CTA-knapp.
      */}
      <a
        href={affiliateLink}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-shadow duration-500"
        style={{ textDecoration: 'none' }}
      >
        {/* Gradient-bakgrund */}
        <div
          className="relative w-full px-8 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{
            background: 'linear-gradient(135deg, #0d4f3c 0%, #0F766E 45%, #10b981 100%)',
          }}
        >
          {/* Dekorativ cirkel – blur glow */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: '#34d399' }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ background: '#6ee7b7' }}
          />

          {/* Logo-placeholder + text */}
          <div className="relative z-10 flex flex-col items-center md:items-start gap-3 text-center md:text-left flex-1">
            <div className="text-[10px] font-black tracking-[0.25em] uppercase text-emerald-300/80">
              Börsanalys rekommenderar
            </div>
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Handla NIBE hos&nbsp;
              <span className="text-emerald-300">Nordnet</span>
            </div>
            <p className="text-sm text-emerald-100/80 max-w-md leading-relaxed mt-1">
              Handel i aktier, fonder och derivat. Öppna konto kostnadsfritt och börja investera direkt.
            </p>

            {/* Bullet points */}
            <ul className="mt-2 space-y-1.5 text-xs text-emerald-100/70 text-left">
              {[
                '0 kr i minsta courtage på svenska aktier*',
                'Gratis depå och inga kontoavgifter',
                'Marknadens ledande investeringsplattform',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[9px] text-emerald-100/40 mt-1">*Villkor gäller. Se nordnet.se för detaljer.</p>
          </div>

          {/* CTA-knapp */}
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
              {/* Pulserande ring */}
              <span
                className="absolute inset-0 rounded-2xl ring-2 ring-white/60 animate-ping opacity-0 group-hover:opacity-30"
                style={{ animationDuration: '1.5s' }}
              />
              Öppna konto →
            </div>
            <span className="text-[10px] text-emerald-200/70 font-medium">
              Kostnadsfritt · Tar &lt; 5 min
            </span>
          </div>
        </div>
      </a>

      {/* Obligatorisk Adtraction tracking-pixel – DÖLJ INTE (compliance) */}
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
