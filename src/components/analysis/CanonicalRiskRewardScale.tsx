type Zone = {
  id: "ATTRACTIVE" | "BALANCED" | "WEAK";
  title: string;
  priceLabel: string;
  sharePct: number;
};

type Marker = {
  id: "reference" | "weighted-fair-value";
  positionPct: number;
  label: string;
  placement: "above" | "below";
  align: "center" | "end";
};

type ScenarioPoint = {
  label: string;
  annualPotentialLabel: string;
  priceLabel: string;
};

type Props = {
  identityLabel: string;
  referencePriceLabel: string;
  referenceDateLabel: string;
  assessmentLabel: string;
  assessmentRationale: string;
  zones: readonly Zone[];
  markers: readonly Marker[];
  scenario: {
    label: string;
    points: readonly ScenarioPoint[];
    rangeSharesPct: readonly number[];
  };
  footerNote: string;
};

const zoneStyles: Record<Zone["id"], { rail: string; label: string }> = {
  ATTRACTIVE: { rail: "bg-[#3d8b68]", label: "text-[#245b43]" },
  BALANCED: { rail: "bg-[#aac6b3]", label: "text-[#496252]" },
  WEAK: { rail: "bg-[#d8d2c6]", label: "text-[#625f58]" },
};

/**
 * Återanvändbar presentation för canonical MEMBER-risk/reward-data.
 * Alla gränser, markörpositioner och spridningsandelar ska vara beräknade
 * uppströms och lämnas in som presentation data — aldrig räknas i frontend.
 */
export default function CanonicalRiskRewardScale({ identityLabel, referencePriceLabel, referenceDateLabel, assessmentLabel, assessmentRationale, zones, markers, scenario, footerNote }: Props) {
  return (
    <section className="max-w-3xl rounded-2xl border border-[#e5e3da] bg-white p-5 shadow-sm sm:p-7" aria-label={`Risk/reward-skala för ${identityLabel}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">{identityLabel}</p>
          <p className="mt-1 text-3xl font-medium tracking-[-0.03em] text-slate-950">{referencePriceLabel}</p>
          <p className="mt-1 text-xs text-slate-400">Vid analys ({referenceDateLabel})</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">Bedömning</p>
          <p className="mt-1 text-sm font-medium text-[#854f0b]">{assessmentLabel}</p>
        </div>
      </div>

      <div className="mt-7">
        <div className="relative h-[78px]" aria-label="Tre risk/reward-zoner med referenskurs och sannolikhetsvägt värde">
          <div className="absolute left-0 right-0 top-9 flex h-2 overflow-hidden rounded-full">
            {zones.map((zone) => <span key={zone.id} className={zoneStyles[zone.id].rail} style={{ flex: `${zone.sharePct} 0 0` }} />)}
          </div>
          {markers.map((marker) => {
            const above = marker.placement === "above";
            const align = marker.align === "end" ? "-translate-x-full text-right" : "-translate-x-1/2 text-center";
            return (
              <div key={marker.id} className="absolute z-10" style={{ left: `${marker.positionPct}%`, top: above ? 0 : 43 }}>
                <span className={`absolute left-0 w-px bg-slate-700 ${above ? "top-5 h-5" : "-top-[3px] h-3"}`} aria-hidden="true" />
                <span className={`absolute -left-1 h-2 w-2 rounded-full bg-slate-700 ring-2 ring-white ${above ? "top-9" : "-top-[7px]"}`} aria-hidden="true" />
                <p className={`absolute w-max max-w-[130px] rounded bg-white px-1 text-xs font-bold leading-4 text-slate-700 ${above ? "bottom-2" : "top-2"} ${align}`}>{marker.label}</p>
              </div>
            );
          })}
        </div>
        <div className="grid gap-2 text-[11px] leading-4 text-slate-500" style={{ gridTemplateColumns: zones.map((zone) => `${zone.sharePct}fr`).join(" ") }}>
          {zones.map((zone, index) => (
            <div key={zone.id} className={index === zones.length - 1 ? "text-right" : ""}>
              <p className={`font-medium ${zoneStyles[zone.id].label}`}>{zone.title}</p>
              <p>{zone.priceLabel}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">{assessmentRationale}</p>

      <section className="mt-5 rounded-xl border border-[#d8e6dc] bg-[#f6faf7] px-4 py-3.5 sm:px-5" aria-labelledby="scenario-spread-title">
        <p id="scenario-spread-title" className="text-xs font-medium text-[#496252]">{scenario.label}</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {scenario.points.map((point, index) => (
            <div key={point.label} className={index === scenario.points.length - 1 ? "text-right" : ""}>
              <p className="text-[11px] text-slate-400">{point.label}</p>
              <p className={`mt-1 text-base font-medium ${index === scenario.points.length - 1 ? "text-[#2f7d5a]" : "text-slate-950"}`}>{point.annualPotentialLabel}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{point.priceLabel}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-1 overflow-hidden rounded-full bg-[#e5e3da]" aria-label="Proportionell spridning mellan Bear, sannolikhetsvägt värde och Bull">
          <span style={{ width: `${scenario.rangeSharesPct[0]}%` }} className="bg-slate-400/60" />
          <span className="w-px bg-slate-700" />
          <span style={{ width: `${scenario.rangeSharesPct[1]}%` }} className="bg-[#2f7d5a]/55" />
        </div>
      </section>

      <p className="mt-4 text-xs leading-5 text-slate-400">{footerNote}</p>
    </section>
  );
}
