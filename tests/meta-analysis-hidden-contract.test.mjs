import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [index, page, app, search, rss, component] = await Promise.all([
  readFile(new URL("../src/data/analyses/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/pages/Analysis.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/GlobalSearch.tsx", import.meta.url), "utf8"),
  readFile(new URL("../api/rss.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/components/analysis/MetaDeepDive.tsx", import.meta.url), "utf8"),
]);

assert.match(index, /"meta": meta2026/);
assert.match(index, /published !== false/);
assert.match(page, /Meta: MetaDeepDive/);
assert.match(page, /noindex, nofollow/);
assert.match(app, /<Route path="\/analyser\/:slug" element={<Analysis \/>} \/>/);
assert.match(search, /filter\(isPublishedAnalysis\)/);
assert.match(rss, /filter\(isPublishedAnalysis\)/);
assert.match(component, /Meta Platforms/);
assert.match(component, /1 066,05/);
