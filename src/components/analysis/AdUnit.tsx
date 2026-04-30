import React, { useEffect, useRef } from 'react';

/**
 * AdUnit – Börsanalys.se
 *
 * Publisher ID: ca-pub-3092389795479215
 * AdSense-scriptet laddas EN GÅNG globalt i index.html – INTE här.
 *
 * Slot-mappning (exakt matchning mot Google AdSense-kontot):
 * ┌─────────────────────┬────────────┬────────────────────────────────┐
 * │ Variant             │ Slot-ID    │ Namn i AdSense                 │
 * ├─────────────────────┼────────────┼────────────────────────────────┤
 * │ top-display         │ 7332946752 │ analysis-top-display           │
 * │ middle-article      │ 6432013761 │ analysis-middle-article        │
 * │ footer-multiplex    │ 4667293922 │ analysis-footer-multiplex      │
 * │ sidebar-display     │ 7647291421 │ Top analyser                   │
 * │ legacy-display      │ 4630761792 │ Analys reklam                  │
 * └─────────────────────┴────────────┴────────────────────────────────┘
 *
 * Användning i NibeDeepDive (och framtida artiklar):
 *   - <AdUnit variant="top-display" />       → efter snabb översikt, före Sektion I
 *   - <AdUnit variant="middle-article" />    → exakt mellan Sektion IX och X
 *   - <AdUnit variant="footer-multiplex" />  → exit-annons längst ner
 */

const PUBLISHER_ID = 'ca-pub-3092389795479215';

type AdVariant =
  | 'top-display'       // analysis-top-display   – slot 7332946752
  | 'middle-article'    // analysis-middle-article – slot 6432013761
  | 'footer-multiplex'  // analysis-footer-multiplex – slot 4667293922
  | 'sidebar-display'   // Top analyser            – slot 7647291421
  | 'legacy-display';   // Analys reklam           – slot 4630761792

interface AdUnitProps {
  variant: AdVariant;
  className?: string;
}

interface AdConfig {
  slot: string;
  format: string;
  layout?: string;       // "in-article" för fluid in-article
  fullWidth: boolean;
  label: string;
  wrapperClass: string;
  minHeight: number;
}

const AD_CONFIG: Record<AdVariant, AdConfig> = {
  // Direkt efter snabb översikt / Key Metrics, omedelbart FÖRE Sektion I
  'top-display': {
    slot: '7332946752',
    format: 'auto',
    fullWidth: true,
    label: 'Annons',
    wrapperClass: 'py-6',
    minHeight: 90,
  },

  // Exakt MELLAN Sektion IX (investeringsbeslut) och Sektion X (scenarier)
  'middle-article': {
    slot: '6432013761',
    format: 'fluid',
    layout: 'in-article',
    fullWidth: false,
    label: 'Annons',
    wrapperClass: 'py-8',
    minHeight: 90,
  },

  // EXIT-annons längst ner i artikeln, FÖRE Nordnet-CTA (300px avstånd)
  'footer-multiplex': {
    slot: '4667293922',
    format: 'auto',
    fullWidth: true,
    label: 'Rekommenderas',
    wrapperClass: 'py-10',
    minHeight: 250,
  },

  // Sidopanel / extra placering (Top analyser)
  'sidebar-display': {
    slot: '7647291421',
    format: 'auto',
    fullWidth: false,
    label: 'Annons',
    wrapperClass: 'py-4',
    minHeight: 90,
  },

  // Legacy / reserv-slot (Analys reklam)
  'legacy-display': {
    slot: '4630761792',
    format: 'auto',
    fullWidth: true,
    label: 'Annons',
    wrapperClass: 'py-4',
    minHeight: 90,
  },
};

export default function AdUnit({ variant, className = '' }: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);
  const cfg = AD_CONFIG[variant];

  useEffect(() => {
    // AdSense-scriptet är redan laddat globalt (index.html).
    // Kör push() för att aktivera just denna ins-tagg.
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Tyst fel i dev-miljö (AdSense-scriptet ej laddat lokalt)
    }
  }, []);

  return (
    <div
      className={`${cfg.wrapperClass} ${className}`}
      style={{ minHeight: cfg.minHeight }}
      role="complementary"
      aria-label="Sponsrat innehåll"
    >
      {/* Diskret etikett – native-känsla, minskar ad blindness */}
      <div className="flex items-center justify-center mb-3">
        <span
          className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 border border-slate-200 px-2.5 py-0.5 rounded-full bg-white/80"
          aria-hidden="true"
        >
          {cfg.label}
        </span>
      </div>

      {/* Enbart ins-taggen – ingen extra wrapper-div */}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: cfg.layout === 'in-article' ? 'center' : undefined,
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={cfg.slot}
        data-ad-format={cfg.format}
        {...(cfg.layout ? { 'data-ad-layout': cfg.layout } : {})}
        data-full-width-responsive={cfg.fullWidth ? 'true' : 'false'}
      />
    </div>
  );
}
