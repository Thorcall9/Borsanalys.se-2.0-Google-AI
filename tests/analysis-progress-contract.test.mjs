import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const progressUrl = new URL("../src/components/AnalysisProgress.tsx", import.meta.url);
const layoutUrl = new URL("../src/components/analysis/AnalysisLayout.tsx", import.meta.url);
const flagsUrl = new URL("../src/config/analysisEngagement.ts", import.meta.url);

test("analysis progress uses real section anchors and separate scroll/active state", async () => {
  const source = await readFile(progressUrl, "utf8");
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /data-analysis-section/);
  assert.match(source, /requestAnimationFrame/);
  assert.match(source, /role=\"progressbar\"/);
  assert.match(source, /Del \$\{snapshot\.activeIndex \+ 1\} av \$\{snapshot\.sections\.length\}/);
  assert.match(source, /sessionStorage/);
});

test("desktop layout and future engagement flags remain shared/configurable", async () => {
  const layout = await readFile(layoutUrl, "utf8");
  const flags = await readFile(flagsUrl, "utf8");
  assert.match(layout, /DesktopAnalysisProgress/);
  assert.match(layout, /data-analysis-content/);
  assert.match(flags, /membershipLeadMagnet/);
  assert.match(flags, /enabled: false/);
  assert.match(flags, /nextAnalysisPoll/);
});

test("all progress threshold and membership events use existing analytics", async () => {
  const source = await readFile(progressUrl, "utf8");
  for (const event of [
    "analysis_progress_25", "analysis_progress_50", "analysis_progress_70",
    "analysis_progress_90", "analysis_progress_100", "membership_prompt_viewed",
    "membership_prompt_clicked", "membership_prompt_dismissed",
    "progress_panel_expanded", "progress_panel_collapsed",
  ]) assert.match(source, new RegExp(event));
  assert.match(source, /@vercel\/analytics\/react/);
});
