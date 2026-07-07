import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const homeUrl = new URL("../src/pages/Home.tsx", import.meta.url);

test("home page features RevolutionRace with the 35-point score model", async () => {
  const source = await readFile(homeUrl, "utf8");

  assert.match(source, /const revolutionRaceCategories = \[/);
  assert.match(source, /RevolutionRace: Outdoor\/D2C med stark lönsamhet/);
  assert.match(source, /25\/35/);
  assert.match(source, /linkTo="\/analys\/revolutionrace-2026"/);
  assert.match(source, /totalScore=\{3\.6\}/);
  assert.match(source, /Fundamental värdering/);
  assert.doesNotMatch(source, /const evolutionCategories = \[/);
  assert.doesNotMatch(source, /linkTo="\/analys\/evolution-2025"/);
});
