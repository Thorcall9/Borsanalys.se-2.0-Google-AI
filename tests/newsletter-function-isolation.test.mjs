import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const signupUrl = new URL('../api/newsletter/signup.ts', import.meta.url);

test('newsletter function does not depend on the shared security module', async () => {
  const source = await readFile(signupUrl, 'utf8');

  assert.doesNotMatch(source, /from\s+['"]\.\.\/_security['"]/);
  assert.match(source, /req\.method !== 'POST'/);
  assert.match(source, /content-length/);
  assert.match(source, /Access-Control-Allow-Origin/);
});
