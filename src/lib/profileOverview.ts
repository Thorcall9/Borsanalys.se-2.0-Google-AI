import { STOCK_CHECKLIST_QUESTIONS } from "../data/stockChecklist";
import type { AnalysisData } from "../types/analysis";

export interface SavedChecklistLike {
  id: number;
  companyName: string;
  ticker?: string | null;
  status: string;
  updatedAt: string;
  answers?: Record<string, unknown>;
}

export function getStartedChecklists(items: SavedChecklistLike[]) {
  return items.filter((item) => item.status !== "completed");
}

export function getAnsweredCount(answers: Record<string, unknown> = {}) {
  return STOCK_CHECKLIST_QUESTIONS.filter((question) => Boolean(answers[question.id])).length;
}

export function getLatestPublications(items: AnalysisData[], limit = 3) {
  return [...items]
    .sort((a, b) => (b.updatedAt || b.date).localeCompare(a.updatedAt || a.date))
    .slice(0, limit);
}
