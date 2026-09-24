import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const previewRoute = "/preview/revolutionrace-v11-2-2026";

test("RVRC v11.2 is an unlisted preview with the v11.2 analysis-detail structure", async () => {
  const [app, page, analysisIndex, sitemap, vercelConfig, source] = await Promise.all([
    readFile(new URL("src/App.tsx", root), "utf8"),
    readFile(new URL("src/pages/RvrcV112Preview.tsx", root), "utf8"),
    readFile(new URL("src/data/analyses/index.ts", root), "utf8"),
    readFile(new URL("api/sitemap.ts", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
    readFile(new URL("analyses/RVRC/RVRC_aktieanalys_v11_2_september2026.md", root), "utf8"),
  ]);

  assert.match(app, /RvrcV112Preview/);
  assert.match(app, new RegExp(`<Route path="${previewRoute}" element={<RvrcV112Preview />} />`));
  assert.doesNotMatch(page, /AnalysisLayout/);
  assert.match(page, /noIndex/);
  assert.match(page, /Investment Snapshot/);
  assert.match(page, /Sannolikhetsvägt värde/);
  assert.match(page, /Total värdepotential/);
  assert.match(page, /Annualiserad värdepotential/);
  assert.match(page, /KÖP.*MEDEL–HÖG RISK/);
  assert.match(page, /73,1 kr/);
  assert.match(page, /NOT_DECISION_GRADE/);
  assert.match(page, /Varför caset är intressant/);
  assert.match(page, /Börsanalys\.se:s insikt/);
  assert.match(page, /Vad måste bevisas för att caset ska fungera\?/);
  assert.match(page, /Tre utfall – inte en falsk exakt riktkurs/);
  assert.match(page, /Se hur vi har räknat/);
  assert.match(page, /När blir risk\/reward mer attraktiv\?/);
  assert.match(page, /Det här följer vi först/);
  assert.match(page, /Skapa gratis konto/);
  assert.match(page, /const isMember = Boolean\(user\)/);
  assert.match(page, /isMember &&/);
  assert.match(page, /Fördjupning och spårbarhet/);
  assert.match(page, /M&A, earn-out och balansräkning/);
  assert.match(page, /Q1-scorecard/);
  assert.match(page, /isMember &&/);
  assert.match(source, /"totalValuePotential": 0\.485/);
  assert.match(source, /"visibility": "MEMBER"/);
  assert.doesNotMatch(analysisIndex, /revolutionrace-v11-2-2026/);
  assert.doesNotMatch(sitemap, /revolutionrace-v11-2-2026/);
  assert.match(vercelConfig, /"source": "\/preview\/:path\*"/);
});
