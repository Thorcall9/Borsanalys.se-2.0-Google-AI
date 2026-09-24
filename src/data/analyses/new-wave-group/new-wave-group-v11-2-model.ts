export const NEW_WAVE_V112_ANALYSIS_DATE = "2026-09-17";
export const NEW_WAVE_V112_SOURCE_CUTOFF_DATE = "2026-09-17";
export const NEW_WAVE_V112_REFERENCE_DATE = "2026-09-17";
export const NEW_WAVE_V112_REFERENCE_PRICE = 91.35;
export const NEW_WAVE_V112_VALUATION_DATE = "2028-12-31";
export const NEW_WAVE_V112_SHARES_MILLIONS = 132.687086;
export const NEW_WAVE_V112_NET_INCOME_CONVERSION = 0.68;

export const newWaveGroupV112YearsToValuation =
  (Date.parse(`${NEW_WAVE_V112_VALUATION_DATE}T00:00:00Z`) -
    Date.parse(`${NEW_WAVE_V112_REFERENCE_DATE}T00:00:00Z`)) /
  (365.25 * 24 * 60 * 60 * 1000);

const scenarioInputs = [
  {
    id: "bear" as const,
    label: "Bear",
    probability: 0.25,
    revenue: 11_300,
    ebitMargin: 0.105,
    peMultiple: 12,
    description:
      "Låg organisk tillväxt, fortsatt investeringstryck och svagare integration eller kapitalavkastning.",
  },
  {
    id: "base" as const,
    label: "Base",
    probability: 0.55,
    revenue: 13_100,
    ebitMargin: 0.125,
    peMultiple: 15,
    description:
      "Måttlig tillväxt, tydlig men begränsad marginalåterhämtning och värdeskapande kapacitetsinvesteringar.",
  },
  {
    id: "bull" as const,
    label: "Bull",
    probability: 0.20,
    revenue: 14_300,
    ebitMargin: 0.145,
    peMultiple: 17,
    description:
      "Bredare organisk återhämtning, högre kapacitetsutnyttjande och lyckad förvärvs- och synergileverans.",
  },
] as const;

export const newWaveGroupV112Scenarios = scenarioInputs.map((input) => {
  const ebit = input.revenue * input.ebitMargin;
  const netIncome = ebit * NEW_WAVE_V112_NET_INCOME_CONVERSION;
  const eps = netIncome / NEW_WAVE_V112_SHARES_MILLIONS;
  const fairValue = eps * input.peMultiple;

  return {
    ...input,
    sharesMillions: NEW_WAVE_V112_SHARES_MILLIONS,
    netIncomeConversion: NEW_WAVE_V112_NET_INCOME_CONVERSION,
    ebit,
    netIncome,
    eps,
    fairValue,
    totalPotentialPct: fairValue / NEW_WAVE_V112_REFERENCE_PRICE - 1,
    annualizedPotentialPct:
      Math.pow(fairValue / NEW_WAVE_V112_REFERENCE_PRICE, 1 / newWaveGroupV112YearsToValuation) - 1,
  };
});

export const newWaveGroupV112WeightedFairValue = newWaveGroupV112Scenarios.reduce(
  (sum, scenario) => sum + scenario.probability * scenario.fairValue,
  0,
);

const riskRewardMetricsAt = (price: number) => ({
  annualizedPotentialPct:
    Math.pow(newWaveGroupV112WeightedFairValue / price, 1 / newWaveGroupV112YearsToValuation) - 1,
  bearDownsidePct: Math.min(newWaveGroupV112Scenarios[0].fairValue / price - 1, 0),
});

const attractiveBoundary = 84.31;
const weakBoundary = 101.72;

export const newWaveGroupV112RiskRewardZones = {
  status: "DRAFT" as const,
  visibility: "MEMBER" as const,
  valuationDate: NEW_WAVE_V112_VALUATION_DATE,
  boundaries: [
    { id: "RR-B1", price: attractiveBoundary, ...riskRewardMetricsAt(attractiveBoundary) },
    { id: "RR-B2", price: weakBoundary, ...riskRewardMetricsAt(weakBoundary) },
  ],
  zones: [
    {
      id: "ATTRACTIVE" as const,
      title: "Attraktiv",
      priceLabel: "Under 84,31 SEK",
      annualPotentialLabel: "+18,2 %/år eller mer",
      bearDownsideLabel: "Bear-nedsida omkring 13,5 % vid gränsen",
      rationale:
        "Tydligare säkerhetsmarginal mot Bear samtidigt som den riskjusterade värdepotentialen är högre.",
    },
    {
      id: "BALANCED" as const,
      title: "Balanserad",
      priceLabel: "84,31–101,72 SEK",
      annualPotentialLabel: "+8,9 till +18,2 %/år",
      bearDownsideLabel: "Bear-nedsida cirka 13,5–28,3 %",
      rationale:
        "Positiv värdepotential, men Bear-risken kräver fortsatt bevis på marginal- och integrationsutveckling.",
    },
    {
      id: "WEAK" as const,
      title: "Svag",
      priceLabel: "Över 101,72 SEK",
      annualPotentialLabel: "Under +8,9 %/år vid gränsen",
      bearDownsideLabel: "Bear-nedsida över cirka 28,3 %",
      rationale:
        "Begränsad säkerhetsmarginal för ett bolag med fortsatt marginal-, integrations- och kapitalbindningsrisk.",
    },
  ],
} as const;
