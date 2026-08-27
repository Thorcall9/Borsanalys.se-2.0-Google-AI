import { ArrowRight, LockKeyhole } from "lucide-react";
import CanonicalRiskRewardScale from "./CanonicalRiskRewardScale";

type Zone = {
  id: "ATTRACTIVE" | "BALANCED" | "WEAK";
  title: string;
  priceLabel: string;
};

type MemberInsight = {
  identityLabel?: string;
  referencePriceLabel: string;
  referenceDateLabel: string;
  assessmentLabel: string;
  assessmentRationale?: string;
  zoneSharesPct?: readonly number[];
  markers?: readonly {
    id: "reference" | "weighted-fair-value";
    positionPct: number;
    label: string;
    placement: "above" | "below";
    align: "center" | "end";
  }[];
  scenarioSpread?: {
    label: string;
    points: readonly { label: string; valueLabel: string; annualPotentialLabel: string }[];
    rangeSharesPct: readonly number[];
  };
  footerNote: string;
};

type Props = {
  user: unknown;
  title: string;
  introduction: string;
  zones: readonly Zone[];
  insight: MemberInsight;
  onLogin: () => void;
};

/**
 * Shared v11.2 wrapper: PUBLIC receives a free-account explanation while
 * MEMBER receives only pre-approved, canonical presentation values.
 */
export default function CanonicalRiskRewardInsight({ user, title, introduction, zones, insight, onLogin }: Props) {
  const canRenderMemberScale = Boolean(
    insight.identityLabel && insight.assessmentRationale && insight.zoneSharesPct?.length === zones.length &&
    insight.markers?.length === 2 && insight.scenarioSpread?.points.length === 3 && insight.scenarioSpread.rangeSharesPct.length === 2,
  );

  return (
    <section className="border-t border-slate-200 py-11 lg:py-16" aria-labelledby="risk-reward-heading">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Medlemsinsikt</p>
      <h2 id="risk-reward-heading" className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{introduction}</p>

      {user && canRenderMemberScale ? (
        <div className="mt-7">
          <CanonicalRiskRewardScale
            identityLabel={insight.identityLabel!}
            referencePriceLabel={insight.referencePriceLabel}
            referenceDateLabel={insight.referenceDateLabel}
            assessmentLabel={insight.assessmentLabel}
            assessmentRationale={insight.assessmentRationale!}
            zones={zones.map((zone, index) => ({
              id: zone.id,
              title: zone.title.replace(" risk/reward", ""),
              priceLabel: zone.priceLabel,
              sharePct: insight.zoneSharesPct![index],
            }))}
            markers={insight.markers!}
            scenario={{
              label: insight.scenarioSpread!.label,
              points: insight.scenarioSpread!.points.map((point) => ({
                label: point.label,
                annualPotentialLabel: point.annualPotentialLabel,
                priceLabel: point.valueLabel,
              })),
              rangeSharesPct: insight.scenarioSpread!.rangeSharesPct,
            }}
            footerNote={insight.footerNote}
          />
        </div>
      ) : (
        <div className="mt-7 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm"><LockKeyhole size={20} aria-hidden="true" /></span>
            <div>
              <p className="text-base font-bold text-slate-950">Logga in gratis för hela risk/reward-insikten</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Du ser översikten här. Med ett kostnadsfritt konto får du se de exakta kursgränserna, referenskursen och scenario-värdena bakom bedömningen.</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>Exakta nivåer för attraktiv, balanserad och svag risk/reward</li>
                <li>Referenskursen vid analystillfället</li>
                <li>Bear, sannolikhetsvägt värde och Bull i USD</li>
              </ul>
              <button type="button" onClick={onLogin} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-800">
                Se full information – gratis <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="mt-2 text-xs font-medium text-emerald-800">Kostnadsfritt konto.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
