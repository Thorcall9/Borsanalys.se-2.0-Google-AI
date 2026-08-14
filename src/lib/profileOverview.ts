import { STOCK_CHECKLIST_QUESTIONS } from "../data/stockChecklist.ts";
import type { AnalysisData } from "../types/analysis";

export interface SavedChecklistLike {
  id: number;
  companyName: string;
  ticker?: string | null;
  status: string;
  updatedAt: string;
  answers?: Record<string, unknown>;
}

export interface WatchlistContent {
  slug: string;
  title: string;
  date: string;
  contentType: AnalysisData["contentType"];
}

export interface WatchlistAction {
  label: "Läs senaste" | "Fortsätt" | "Öppna checklista" | "Starta checklista";
  to: string;
}

export interface WatchlistRowContext {
  ticker: string;
  companyName: string;
  latestContent: WatchlistContent | null;
  checklist: SavedChecklistLike | null;
}

export function normalizeTicker(value: string | null | undefined) {
  return (value || "").trim().toUpperCase().replace(/[.\-\s]/g, "");
}

function editorialDate(item: Pick<AnalysisData, "date" | "updatedAt"> & { updatedAtIsEditorial?: boolean }) {
  return item.updatedAtIsEditorial && item.updatedAt ? item.updatedAt : item.date;
}

function timestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getStartedChecklists(items: SavedChecklistLike[]) {
  return items.filter((item) => item.status !== "completed");
}

export function getAnsweredCount(answers: Record<string, unknown> = {}) {
  return STOCK_CHECKLIST_QUESTIONS.filter((question) => Boolean(answers[question.id])).length;
}

export function getLatestPublications(items: AnalysisData[], limit = 3) {
  return [...items]
    .sort((a, b) => timestamp(editorialDate(b)) - timestamp(editorialDate(a)))
    .slice(0, limit);
}

export function getLatestContent(items: AnalysisData[], ticker: string): WatchlistContent | null {
  const normalizedTicker = normalizeTicker(ticker);
  const match = items
    .filter((item) => item.published !== false)
    .filter((item) => normalizeTicker(item.ticker) === normalizedTicker)
    .sort((a, b) => timestamp(editorialDate(b)) - timestamp(editorialDate(a)))[0];

  return match
    ? { slug: match.slug, title: match.listTitle || match.title, date: editorialDate(match), contentType: match.contentType }
    : null;
}

export function getLatestChecklist(items: SavedChecklistLike[], ticker: string): SavedChecklistLike | null {
  const normalizedTicker = normalizeTicker(ticker);
  return items
    .filter((item) => Boolean(item.ticker) && normalizeTicker(item.ticker) === normalizedTicker)
    .sort((a, b) => timestamp(b.updatedAt) - timestamp(a.updatedAt))[0] || null;
}

export function getWatchlistActions({ ticker, companyName, latestContent, checklist }: WatchlistRowContext): WatchlistAction[] {
  const actions: WatchlistAction[] = [];
  if (latestContent) actions.push({ label: "Läs senaste", to: `/analys/${latestContent.slug}` });

  if (checklist) {
    actions.push({
      label: checklist.status === "completed" ? "Öppna checklista" : "Fortsätt",
      to: `/aktiechecklista?checklistId=${checklist.id}`,
    });
  } else {
    actions.push({
      label: "Starta checklista",
      to: `/aktiechecklista?bolag=${encodeURIComponent(companyName)}&ticker=${encodeURIComponent(ticker)}`,
    });
  }

  return actions.slice(0, 2);
}
