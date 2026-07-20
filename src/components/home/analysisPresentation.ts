import type { AnalysisData } from "../../types/analysis";
import { analyses } from "../../data/analyses";
import { getAnalysisScore } from "../../lib/score";

export interface AnalysisPresentation {
  companyName: string;
  ticker: string;
  title: string;
  summary: string;
  recommendation: AnalysisData["recommendation"];
  score: { value: number; max: number } | null;
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
  const score = getAnalysisScore(analysis);

  return {
    companyName: analysis.title,
    ticker: analysis.ticker,
    title: analysis.listTitle ?? analysis.title,
    summary: analysis.summary,
    recommendation: analysis.recommendation,
    score: score ? { value: score.score, max: score.maxScore } : null,
    href: `/analys/${analysis.slug}`,
    image: analysis.image,
  };
}
