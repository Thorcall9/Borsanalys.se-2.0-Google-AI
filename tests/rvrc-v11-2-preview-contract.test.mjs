import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const previewRoute = "/preview/revolutionrace-v11-2-2026";

test("RVRC v11.2 is an unlisted preview with its own rendered page", async () => {
  const [app, page, analysisIndex, sitemap, vercelConfig] = await Promise.all([
    readFile(new URL("src/App.tsx", root), "utf8"),
    readFile(new URL("src/pages/RvrcV112Preview.tsx", root), "utf8"),
    readFile(new URL("src/data/analyses/index.ts", root), "utf8"),
    readFile(new URL("api/sitemap.ts", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
  ]);

  assert.match(app, /RvrcV112Preview/);
  assert.match(app, new RegExp(`<Route path="${previewRoute}" element={<RvrcV112Preview />} />`));
  assert.match(page, /AnalysisLayout/);
  assert.match(page, /RVRC_aktieanalys_v11_2_september2026\.md\?raw/);
  assert.match(page, /noIndex/);
  assert.match(page, /KÖP · MEDEL_HÖG risk/);
  assert.match(page, /73,1 kr/);
  assert.match(page, /NOT_DECISION_GRADE/);
  assert.match(page, /Q1-scorecard/);
  assert.doesNotMatch(analysisIndex, /revolutionrace-v11-2-2026/);
  assert.doesNotMatch(sitemap, /revolutionrace-v11-2-2026/);
  assert.match(vercelConfig, /"source": "\/preview\/:path\*"/);
});
