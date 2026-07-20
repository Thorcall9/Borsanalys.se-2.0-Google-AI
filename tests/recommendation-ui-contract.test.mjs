import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [infoSource, recommendationSource, badgeSource, archiveSource, comprehensiveSource, v10Source, reportSource, cardSource] =
  await Promise.all([
    read("src/components/analysis/RecommendationInfo.tsx"),
    read("src/lib/recommendation.ts"),
    read("src/components/analysis/VerdictBadge.tsx"),
    read("src/pages/Analysis.tsx"),
    read("src/components/analysis/ComprehensiveAnalysis.tsx"),
    read("src/components/analysis/ComprehensiveAnalysisV10.tsx"),
    read("src/components/analysis/ReportComment.tsx"),
    read("src/components/analysis/AnalysisCard.tsx"),
  ]);

test("the reusable information component contains the v10 definitions and note", () => {
  assert.match(infoSource, /Så fungerar våra bedömningar/);
  assert.match(recommendationSource, /Aktien bedöms erbjuda attraktiv långsiktig riskjusterad avkastning/);
  assert.match(recommendationSource, /Bolaget är intressant men värderingen/);
  assert.match(recommendationSource, /Riskerna eller den förväntade avkastningen/);
  assert.match(infoSource, /Bedömningen baseras främst på analysens femårsscenario/);
  assert.match(infoSource, /compact/);
  assert.match(infoSource, /details/);
});

test("the shared badge uses the central v10 configuration", () => {
  assert.match(badgeSource, /RECOMMENDATION_BADGE_CLASSES/);
  assert.match(badgeSource, /Recommendation/);
  assert.doesNotMatch(badgeSource, /AVVAKTA|SÄLJ/);
  assert.match(cardSource, /VerdictBadge verdict=\{a\.recommendation\}/);
});

test("archive and full analysis surfaces include the shared information and optional reason", () => {
  assert.match(archiveSource, /RecommendationInfo/);
  for (const source of [comprehensiveSource, v10Source, reportSource]) {
    assert.match(source, /RecommendationInfo/);
    assert.match(source, /recommendationReason/);
  }
});
