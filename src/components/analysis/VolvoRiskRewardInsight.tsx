import { ArrowRight, Info, LockKeyhole } from "lucide-react";
import type { AnalysisData } from "../../types/analysis";

type Zones = NonNullable<NonNullable<AnalysisData["v11"]>["riskRewardZones"]>;

type Props = {
  user: unknown;
  zones?: Zones;
  onSignup: () => void;
  onLogin: () => void;
};

const zoneStyles = {
  ATTRACTIVE: { rail: "bg-[#2f7d5a]", label: "text-[#245b43]" },
  BALANCED: { rail: "bg-[#aac6b3]", label: "text-[#496252]" },
  WEAK: { rail: "bg-[#d8d2c6]", label: "text-[#625f58]" },
} as const;

function MemberGate({ onSignup, onLogin }: Pick<Props, "onSignup" | "onLogin">) {
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/45 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
          <LockKeyhole size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Medlemsinsikt</p>
          <h3 id="risk-reward-title" className="mt-2 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">När blir risk/reward mer attraktiv?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Som gratis medlem ser du Volvos godkända risk/reward-zoner, referenskursens placering och scenariospannet bakom bedömningen.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={onSignup} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-800">
              Skapa gratis konto <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={onLogin} className="min-h-11 text-sm font-bold text-emerald-700 hover:text-emerald-900">Logga in</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LimitedFallback() {
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200"><Info size={19} aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Medlemsinsikt</p>
          <h3 id="risk-reward-title" className="mt-2 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950">När blir risk/reward mer attraktiv?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Zonerna är godkända, men presentationsunderlag för referensmarkör och scenariospann saknas. Därför visar vi inga härledda eller uppskattade nivåer här.</p>
        </div>
      </div>
    </aside>
  );
}

export default function VolvoRiskRewardInsight({ user, zones, onSignup, onLogin }: Props) {
  if (!user) return <MemberGate onSignup={onSignup} onLogin={onLogin} />;

  const insight = zones?.status === "APPROVED" && zones.visibility === "MEMBER" ? zones.memberInsight : undefined;
  if (!zones || !insight) return <LimitedFallback />;

  const markerZoneIndex = insight.marker ? zones.zones.findIndex((zone) => zone.id === insight.marker?.zoneId) : -1;

  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-[#e5e3da] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">{insight.companyLabel} · {insight.ticker}</p>
          <p className="mt-1 text-3xl font-medium tracking-[-0.03em] text-slate-950">{insight.referencePriceLabel}</p>
          <p className="mt-1 text-xs text-slate-400">Referenskurs vid analystillfället · {insight.referenceDateLabel}</p>
        </div>
        <div className="max-w-xs sm:text-right">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Aktuell bedömning</p>
          <p className="mt-1 text-sm font-medium text-[#625f58]">{insight.assessmentLabel}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{insight.assessmentNote}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative">
          <div className="flex h-2 overflow-hidden rounded-full gap-0.5" aria-label="Volvos risk/reward-skala">
            {zones.zones.map((zone) => (
              <span key={zone.id} className={zoneStyles[zone.id].rail} style={{ flex: "1 1 0" }} />
            ))}
          </div>
          {insight.marker ? (
            <span
              className="absolute -bottom-3 top-3 z-10 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-slate-700"
              style={{ left: `${insight.marker.positionPct}%` }}
              aria-label={`${insight.marker.label}: ${insight.referencePriceLabel}. ${insight.marker.note}`}
            />
          ) : (
            <p className="mt-3 text-xs text-slate-400">Referensmarkör saknas i godkänt presentationsunderlag.</p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] leading-4 text-slate-400">
          {zones.zones.map((zone, index) => (
            <div key={zone.id} className={index === zones.zones.length - 1 ? "text-right" : ""}>
              <p className={`font-medium ${zoneStyles[zone.id].label}`}>{zone.title.replace(" risk/reward", "")}</p>
              <p>{zone.priceLabel}</p>
              {index === markerZoneIndex && <p className="mt-1 font-medium text-slate-600">Referenskurs här</p>}
            </div>
          ))}
        </div>
      </div>

      {insight.scenarioSpread ? (
        <section className="mt-8 rounded-xl border border-[#d8e6dc] bg-[#f6faf7] p-4 sm:p-5" aria-labelledby="scenario-spread-title">
          <p id="scenario-spread-title" className="text-xs font-medium text-[#496252]">{insight.scenarioSpread.label}</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {insight.scenarioSpread.points.map((point, index) => (
              <div key={point.label} className={index === insight.scenarioSpread.points.length - 1 ? "text-right" : ""}>
                <p className="text-[11px] leading-4 text-slate-400">{point.label}</p>
                <p className="mt-1 text-base font-medium text-slate-950">{point.annualPotentialLabel}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-slate-400">{point.valueLabel}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-1 overflow-hidden rounded-full bg-[#e5e3da]" aria-hidden="true">
            <span className="bg-slate-400/55" style={{ width: `${insight.scenarioSpread.rangeSharesPct[0]}%` }} />
            <span className="w-px bg-slate-700" />
            <span className="bg-[#2f7d5a]/55" style={{ width: `${insight.scenarioSpread.rangeSharesPct[1]}%` }} />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">{insight.scenarioSpread.distanceLabel}</p>
        </section>
      ) : (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">Scenariospann saknas i godkänt presentationsunderlag.</div>
      )}

      <p className="mt-5 text-xs leading-5 text-slate-400">{insight.footerNote}</p>
    </aside>
  );
}
