import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAnalysisScore,
  getScorePercent,
  sortAnalysesByScore,
} from '../src/lib/score.ts';
import { analyses } from '../src/data/analyses/index.ts';

const item = (slug, totalScore, date, extra = {}) => ({
  slug,
  title: slug,
  ticker: slug,
  date,
  totalScore,
  ...extra,
});

test('normalizes explicit score scales without rounding', () => {
  assert.deepEqual(getAnalysisScore(item('inwido', '24/35', '2026-07-15')), {
    score: 24,
    maxScore: 35,
    percent: 68.57142857142857,
  });
  assert.equal(getScorePercent({ score: 28, maxScore: 35 }), 80);
});

test('sorts by percentage, then absolute score, then publication date', () => {
  const sorted = sortAnalysesByScore([
    item('30-of-40', '30/40', '2026-07-18'),
    item('28-of-35', '28/35', '2026-07-17'),
    item('29-of-40', '29/40', '2026-07-19'),
    item('same-percent-lower', '27/36', '2026-07-20'),
    item('same-percent-higher', '30/40', '2026-07-16'),
    item('invalid', '0/0', '2026-07-21'),
  ]);

  assert.deepEqual(sorted.map((analysis) => analysis.slug), [
    '28-of-35',
    '30-of-40',
    'same-percent-higher',
    'same-percent-lower',
    '29-of-40',
    'invalid',
  ]);
});

test('derives a safe max score from structured score categories', () => {
  const result = getAnalysisScore({
    totalScore: '27',
    scores: {
      affarsmodell: 4,
      strategiskMoat: 3,
      finansiellKvalitet: 4,
      vardering: 2,
      tillvaxtutsikter: 2,
      riskprofil: 4,
      vdAnalys: 4,
      aiObservationer: 4,
    },
  });
  assert.deepEqual(result, { score: 27, maxScore: 40, percent: 67.5 });
});

test('derives the total score when only structured categories exist', () => {
  const result = getAnalysisScore({
    scores: {
      affarsmodell: 5,
      strategiskMoat: 4,
      finansiellKvalitet: 3,
      vardering: 3,
      tillvaxtutsikter: 4,
      riskprofil: 3,
      esgMakro: 2,
      aiObservationer: 4,
    },
  });
  assert.deepEqual(result, { score: 28, maxScore: 40, percent: 70 });
});

test('rejects invalid or unsupported score data', () => {
  assert.equal(getAnalysisScore({ totalScore: '25' }), null);
  assert.equal(getAnalysisScore({ score: 30, maxScore: 0 }), null);
  assert.equal(getAnalysisScore({ score: 31, maxScore: 30 }), null);
  assert.equal(getScorePercent({ score: 1, maxScore: 0 }), null);
});

test('shows the explicit legacy score scales for RVRC and ABB in the archive', () => {
  assert.deepEqual(getAnalysisScore(analyses['revolutionrace-2026']), {
    score: 25,
    maxScore: 35,
    percent: (25 / 35) * 100,
  });
  assert.deepEqual(getAnalysisScore(analyses['abb-q1-2026']), {
    score: 25.5,
    maxScore: 35,
    percent: (25.5 / 35) * 100,
  });
});
