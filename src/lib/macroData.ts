export interface NormalizedMacroData {
  value: number;
  trend: "up" | "down" | "flat";
  updatedAt: string;
  source?: string;
  isStale: boolean;
}

function isValidPoint(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const point = value as Record<string, unknown>;
  return (
    typeof point.value === "number" &&
    Number.isFinite(point.value) &&
    typeof point.updatedAt === "string" &&
    !Number.isNaN(new Date(point.updatedAt).getTime())
  );
}

export function normalizeMacroResponse(payload: unknown): Record<string, NormalizedMacroData> {
  const points = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? Object.entries(payload as Record<string, unknown>).map(([key, value]) => ({ key, ...(value as object) }))
      : [];

  return points.reduce<Record<string, NormalizedMacroData>>((result, point) => {
    if (!point || typeof point !== "object") return result;
    const candidate = point as Record<string, unknown>;
    if (typeof candidate.key !== "string" || !isValidPoint(candidate)) return result;

    const trend = candidate.trend === "up" || candidate.trend === "down" ? candidate.trend : "flat";
    result[candidate.key] = {
      value: candidate.value as number,
      trend,
      updatedAt: candidate.updatedAt as string,
      source: typeof candidate.source === "string" ? candidate.source : undefined,
      isStale: false,
    };
    return result;
  }, {});
}
