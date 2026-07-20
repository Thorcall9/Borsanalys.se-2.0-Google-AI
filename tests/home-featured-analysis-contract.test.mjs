import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const homeUrl = new URL("../src/pages/Home.tsx", import.meta.url);
const scoreCardUrl = new URL("../src/components/ScoreCard.tsx", import.meta.url);

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
