import type { AnalysisData } from '../types/analysis.js';

export interface AnalysisScore {
  score: number;
  maxScore: number;
  percent: number;
}

type ScoreSource = Pick<AnalysisData, 'score' | 'maxScore' | 'totalScore' | 'scores' | 'aiDrivenData'>;

function isValidScore(score: unknown, maxScore: unknown): score is number {
  return (
    typeof score === 'number' &&
    Number.isFinite(score) &&
    score >= 0 &&
    typeof maxScore === 'number' &&
    Number.isFinite(maxScore) &&
    maxScore > 0 &&
    score <= maxScore
  );
}

export function getScorePercent(score: Pick<AnalysisScore, 'score' | 'maxScore'>): number | null {
  return isValidScore(score.score, score.maxScore) ? (score.score / score.maxScore) * 100 : null;
}

function parseStructuredScore(raw: string | undefined): { score: number; maxScore: number } | null {
  if (!raw) return null;
  const match = raw.trim().match(/^(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)$/);
  if (!match) return null;

  const score = Number(match[1].replace(',', '.'));
  const maxScore = Number(match[2].replace(',', '.'));
  return isValidScore(score, maxScore) ? { score, maxScore } : null;
}

function deriveMaxScoreFromCategories(scores: AnalysisData['scores']): number | null {
  if (!scores) return null;
  const categoryCount = Object.values(scores).filter(
    (value): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 5,
  ).length;
  return categoryCount > 0 ? categoryCount * 5 : null;
}

function deriveScoreFromCategories(scores: AnalysisData['scores']): number | null {
  if (!scores) return null;
  const values = Object.values(scores);
  if (values.some((value) => typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 5)) {
    return null;
  }
  return values.reduce((sum, value) => sum + value, 0);
}

export function getAnalysisScore(item: ScoreSource): AnalysisScore | null {
  const explicitScore = item.score ?? item.aiDrivenData?.totaltPoang;
  const explicitMaxScore = item.maxScore ?? item.aiDrivenData?.maxPoang;
  if (isValidScore(explicitScore, explicitMaxScore)) {
    return { score: explicitScore, maxScore: explicitMaxScore, percent: (explicitScore / explicitMaxScore) * 100 };
  }

  const structuredScore = parseStructuredScore(item.totalScore);
  if (structuredScore) {
    return { ...structuredScore, percent: (structuredScore.score / structuredScore.maxScore) * 100 };
  }

  const rawScore = item.totalScore ? Number(item.totalScore.replace(',', '.')) : NaN;
  const derivedMaxScore = deriveMaxScoreFromCategories(item.scores);
  if (Number.isFinite(rawScore) && isValidScore(rawScore, derivedMaxScore)) {
    return { score: rawScore, maxScore: derivedMaxScore, percent: (rawScore / derivedMaxScore) * 100 };
  }

  const derivedScore = deriveScoreFromCategories(item.scores);
  if (isValidScore(derivedScore, derivedMaxScore)) {
    return { score: derivedScore, maxScore: derivedMaxScore, percent: (derivedScore / derivedMaxScore) * 100 };
  }

  return null;
}

export function sortAnalysesByScore<T extends ScoreSource & { date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const scoreA = getAnalysisScore(a);
    const scoreB = getAnalysisScore(b);

    if (!scoreA && !scoreB) return (b.date || '').localeCompare(a.date || '');
    if (!scoreA) return 1;
    if (!scoreB) return -1;
    if (scoreB.percent !== scoreA.percent) return scoreB.percent - scoreA.percent;
    if (scoreB.score !== scoreA.score) return scoreB.score - scoreA.score;
    return (b.date || '').localeCompare(a.date || '');
  });
}
