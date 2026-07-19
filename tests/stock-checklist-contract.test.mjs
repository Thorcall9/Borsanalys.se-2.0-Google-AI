import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("checklist contains the twelve agreed questions and neutral result groups", async () => {
  const source = `${await read("src/data/stockChecklist.ts")}\n${await read("src/pages/StockChecklist.tsx")}`;
  assert.equal((source.match(/id: \"q\d+\"/g) || []).length, 12);
  for (const text of ["Förstå investeringen", "Kontrollera kvaliteten", "Bedöm priset", "Testa beslutet", "Genomtänkt", "Behöver undersökas", "Varningssignaler"]) assert.match(source, new RegExp(text));
  assert.match(source, /inte ett betyg eller en rekommendation/);
});

test("public checklist route, member navigation, analysis CTA and private CRUD route are wired", async () => {
  const [app, popup, page, saveSteps, api, vercel, profile, checklistOverview, header] = await Promise.all([read("src/App.tsx"), read("src/components/AnalysisProgress.tsx"), read("src/pages/StockChecklist.tsx"), read("src/lib/checklistSave.ts"), read("api/stock-checklists.ts"), read("vercel.json"), read("src/pages/Profile.tsx"), read("src/components/community/ChecklistOverview.tsx"), read("src/components/layout/Header.tsx")]);
  assert.match(app, /path="\/aktiechecklista"/);
  assert.match(app, /path="\/mina-checklistor"/);
  assert.doesNotMatch(profile, /to="\/mina-checklistor"/);
  assert.doesNotMatch(profile, /Mina checklistor/);
  assert.match(checklistOverview, /to="\/mina-checklistor"/);
  assert.match(checklistOverview, /Visa alla checklistor/);
  assert.match(header, /to="\/mina-checklistor"/);
  assert.match(header, /Mina checklistor/);
  assert.match(popup, /checklist-popup-seen/);
  assert.match(popup, /percent < 80/);
  assert.match(page, /Fortsätt utan att spara/);
  assert.match(page, /NÄSTA STEG/);
  assert.match(page, /Du har besvarat alla 12 frågor\. Skapa ett gratis konto för att spara checklistan och kunna uppdatera den senare\./);
  assert.match(saveSteps, /Sparad på ditt konto/);
  assert.doesNotMatch(page, /Din nästa nivå/);
  assert.doesNotMatch(saveSteps, /Checklistan sparas/);
  assert.match(saveSteps, /Checklistan finns kvar tillfälligt i den här webbläsaren, men sparas inte på ditt konto och kan inte öppnas från en annan enhet\./);
  assert.match(api, /where: \{ id, userId: user\.id \}/);
  assert.match(api, /req\.method === "DELETE"/);
  assert.match(vercel, /"\/aktiechecklista"/);
});

test("analytics never receives free-form notes", async () => {
  const source = await read("src/pages/StockChecklist.tsx");
  assert.doesNotMatch(source, /track\([^;]+notes/);
  assert.match(source, /checklist_question_answered/);
  assert.match(source, /checklist_completed/);
  assert.match(source, /checklist_saved/);
});
