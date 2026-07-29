import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const historyServiceUrl = new URL('../src/services/housingCapitalHistoryService.ts', import.meta.url);

test('capital updates write the new total and its comparison point atomically', async () => {
  const source = await readFile(historyServiceUrl, 'utf8');

  assert.match(source, /export async function saveHousingCapitalUpdate/);
  assert.match(source, /firestore\.writeBatch\(firestore\.db\)/);
  assert.match(source, /previousAmount/);
  assert.match(source, /batch\.update\(goalDocument/);
  assert.match(source, /await batch\.commit\(\)/);
});
