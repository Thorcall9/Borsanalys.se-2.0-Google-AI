import React from "react";
import { Info } from "lucide-react";
import {
  CANONICAL_RECOMMENDATIONS,
  RECOMMENDATION_DEFINITIONS,
  type Recommendation,
} from "../../lib/recommendation";

const CLOSING_NOTE =
  "Bedömningen baseras främst på analysens femårsscenario. Tolvmånadersanalysen används för att bedöma köptempo och kortsiktig värdering.";

const DEFINITION_CLASSES: Record<Recommendation, string> = {
  KÖP: "text-primary",
  BEVAKA: "text-blue-500",
  AVSTÅ: "text-red-500",
};

interface RecommendationInfoProps {
  compact?: boolean;
  defaultOpen?: boolean;
}

export default function RecommendationInfo({ compact = false, defaultOpen = false }: RecommendationInfoProps) {
  const definitions = (
    <div className={compact ? "grid gap-3 px-4 pb-4" : "grid gap-5"}>
      {CANONICAL_RECOMMENDATIONS.map((recommendation) => (
        <div key={recommendation}>
          <h3 className={`text-sm font-black uppercase tracking-widest ${DEFINITION_CLASSES[recommendation]}`}>
            {recommendation}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {RECOMMENDATION_DEFINITIONS[recommendation]}
          </p>
        </div>
      ))}
      <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">{CLOSING_NOTE}</p>
    </div>
  );

  if (compact) {
    return (
      <details open={defaultOpen} className="rounded-xl border border-border bg-muted/20">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-black text-foreground">
          <span>Så fungerar våra bedömningar</span>
          <Info size={15} aria-hidden="true" className="text-primary" />
        </summary>
        {definitions}
      </details>
    );
  }

  return (
    <section aria-labelledby="recommendation-info-title" className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <h2 id="recommendation-info-title" className="mb-5 text-lg font-black tracking-tight">
        Så fungerar våra bedömningar
      </h2>
      {definitions}
    </section>
  );
}
