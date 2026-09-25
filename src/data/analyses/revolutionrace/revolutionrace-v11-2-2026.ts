import type { AnalysisData } from "../../../types/analysis.js";

/** Public archive metadata. The full v11.2 analysis is rendered by RvrcV112Preview. */
export const revolutionRaceV1122026: AnalysisData = {
  contentType: "analysis",
  templateVersion: "v11",
  slug: "revolutionrace-v11-2-2026",
  title: "RevolutionRace",
  listTitle: "RevolutionRace – Grundanalys v11.2",
  ticker: "RVRC",
  isin: "SE0015962485",
  author: "Carl Fredrik Thor",
  date: "2026-09-25",
  displayDate: "25 september 2026",
  market: "NASDAQ STOCKHOLM",
  sector: "Outdoor/D2C",
  recommendation: "KÖP",
  price: "49,22 kr",
  pe: "–",
  yield: "–",
  published: true,
  disclosureKey: "rvrc",
  upside: 48.5,
  summary: "KÖP med medel–hög risk. Sannolikhetsvägt P/E-värde 73,1 kr vid 30 juni 2029, jämfört med referenskurs 49,22 kr den 23 september 2026. EV/EBIT används som sekundär värderingskontroll med MEDIUM confidence.",
  scenarios: [
    { type: "bear", label: "Bear", value: "45,5 kr", change: "−7,6 %", probability: "30 %" },
    { type: "base", label: "Base", value: "80,0 kr", change: "+62,5 %", probability: "55 %" },
    { type: "bull", label: "Bull", value: "102,8 kr", change: "+108,9 %", probability: "15 %" },
  ],
};
