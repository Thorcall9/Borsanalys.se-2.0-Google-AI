import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const drawerUrl = new URL('../src/components/house/HousingPlanDrawer.tsx', import.meta.url);
const capitalSheetUrl = new URL('../src/components/house/CapitalUpdateSheet.tsx', import.meta.url);

test('housing plan drawer keeps the first view focused on the four core decisions', async () => {
  const drawer = await readFile(drawerUrl, 'utf8');

  for (const text of ['Planera nästa bostad', 'Bostadspris', 'Bostadstyp', 'Kontantinsats', 'Månadssparande', 'Fler val']) {
    assert.match(drawer, new RegExp(text));
  }
  for (const type of ['Villa', 'Bostadsrätt', 'Ägarlägenhet']) assert.match(drawer, new RegExp(type));
  assert.match(drawer, /Ange ett bostadspris större än 0 kr/);
  assert.match(drawer, /Kontantinsatsen behöver vara mellan 1 och 100 %/);
});

test('capital update sheet is a separate ten-second flow', async () => {
  const sheet = await readFile(capitalSheetUrl, 'utf8');

  for (const text of ['Uppdatera huskapital', 'Nuvarande kapital', 'Nytt totalt kapital', 'Spara uppdatering']) {
    assert.match(sheet, new RegExp(text));
  }
});
