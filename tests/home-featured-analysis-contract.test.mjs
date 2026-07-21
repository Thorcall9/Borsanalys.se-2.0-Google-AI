import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const homeUrl = new URL("../src/pages/Home.tsx", import.meta.url);
const scoreCardUrl = new URL("../src/components/ScoreCard.tsx", import.meta.url);
const stylesUrl = new URL("../src/index.css", import.meta.url);

test("home page features RevolutionRace with the 35-point score model", async () => {
  const source = await readFile(homeUrl, "utf8");

  assert.match(source, /const revolutionRaceCategories = \[/);
  assert.match(source, /RevolutionRace: Friluftskläder med direktförsäljning och stark lönsamhet/);
  assert.match(source, /stark ställning på de tyskspråkiga marknaderna/);
  assert.match(source, /tillväxten tar fart igen/);
  assert.match(source, /25\/35/);
  assert.match(source, /linkTo="\/analys\/revolutionrace-2026"/);
  assert.match(source, /totalScore=\{3\.6\}/);
  assert.match(source, /Fundamental värdering/);
  assert.doesNotMatch(source, /Rapportkommentarer/);
  assert.doesNotMatch(source, /Outdoor\/D2C/);
  assert.doesNotMatch(source, /DACH-position/);
  assert.doesNotMatch(source, /återaccelererad tillväxt/);
  assert.doesNotMatch(source, /const evolutionCategories = \[/);
  assert.doesNotMatch(source, /linkTo="\/analys\/evolution-2025"/);
});

test("score card describes the company size in plain Swedish", async () => {
  const source = await readFile(scoreCardUrl, "utf8");

  assert.match(source, /Stort börsbolag/);
  assert.doesNotMatch(source, /Large Cap/);
});

test("featured analysis score sits closer to the summary on mobile", async () => {
  const styles = await readFile(stylesUrl, "utf8");

  assert.match(styles, /\.featured-analysis-body \{ grid-template-columns: 4\.7rem minmax\(0, 1fr\); gap: 0\.45rem 0\.8rem; \}/);
  assert.match(styles, /\.score-ring \{ grid-column: 1 \/ -1; justify-self: start; width: 3\.6rem; height: 3\.6rem; margin-top: -0\.2rem; \}/);
});
