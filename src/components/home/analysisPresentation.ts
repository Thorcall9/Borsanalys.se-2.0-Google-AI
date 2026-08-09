import type { AnalysisData } from "../../types/analysis";
import { analyses } from "../../data/analyses";

export interface AnalysisPresentation {
  companyName: string;
  ticker: string;
  title: string;
  summary: string;
  recommendation: AnalysisData["recommendation"];
  potential: string | null;
  href: string;
  image?: string;
}

export function getFeaturedAnalysis(): AnalysisData {
  const candidates = Object.values(analyses).filter((analysis) => analysis.contentType === "analysis");
  const sorted = [...candidates].sort((left, right) => {
    const leftDate = left.updatedAt ?? left.date;
    const rightDate = right.updatedAt ?? right.date;
    return rightDate.localeCompare(leftDate);
  });

  return sorted[0] ?? candidates[0];
}

export function getAnalysisPresentation(analysis: AnalysisData): AnalysisPresentation {
  const potential = analysis.templateVersion === "v11"
    ? analysis.v11Preview?.upside
      ?? (analysis.upside != null ? `${analysis.upside > 0 ? "+" : ""}${analysis.upside.toLocaleString("sv-SE")}%` : null)
    : null;

  return {
    companyName: analysis.title,
    ticker: analysis.ticker,
    title: analysis.listTitle ?? analysis.title,
    summary: analysis.summary,
    recommendation: analysis.recommendation,
    potential,
    href: `/analys/${analysis.slug}`,
    image: analysis.image,
  };
}
