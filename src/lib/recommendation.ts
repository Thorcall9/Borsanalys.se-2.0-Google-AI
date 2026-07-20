export const CANONICAL_RECOMMENDATIONS = ["KÖP", "BEVAKA", "AVSTÅ"] as const;

export type Recommendation = (typeof CANONICAL_RECOMMENDATIONS)[number];

export const RECOMMENDATION_DEFINITIONS: Record<Recommendation, string> = {
  KÖP: "Aktien bedöms erbjuda attraktiv långsiktig riskjusterad avkastning vid den analyserade kursen.",
  BEVAKA:
    "Bolaget är intressant men värderingen, säkerhetsmarginalen eller osäkerheten gör att vi ännu inte ser ett tydligt köpläge.",
  AVSTÅ:
    "Riskerna eller den förväntade avkastningen gör att aktien inte bedöms vara ett attraktivt alternativ just nu.",
};

export const RECOMMENDATION_BADGE_CLASSES: Record<Recommendation, string> = {
  KÖP: "bg-primary/10 text-primary border-primary/20",
  BEVAKA: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  AVSTÅ: "bg-red-500/10 text-red-500 border-red-500/20",
};

export const RECOMMENDATION_FILTER_OPTIONS = ["Alla", ...CANONICAL_RECOMMENDATIONS] as const;

export function isCanonicalRecommendation(value: unknown): value is Recommendation {
  return typeof value === "string" && (CANONICAL_RECOMMENDATIONS as readonly string[]).includes(value);
}

export function assertCanonicalRecommendation(
  value: unknown,
  context = "Recommendation"
): asserts value is Recommendation {
  if (!isCanonicalRecommendation(value)) {
    throw new Error(`${context} must be one of: ${CANONICAL_RECOMMENDATIONS.join(", ")}`);
  }
}
