import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('public serverless functions do not import the shared security module', async () => {
  const files = await Promise.all([
    source('api/admin.ts'),
    source('api/ai.ts'),
    source('api/vote.ts'),
  ]);

  for (const file of files) {
    assert.doesNotMatch(file, /from\s+['"]\.\/_security['"]/);
  }
});
