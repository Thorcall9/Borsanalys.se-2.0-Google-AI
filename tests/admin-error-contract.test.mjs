import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('macro updater falls back when Gemini is not configured', async () => {
  const macroUpdater = await source('src/lib/macroUpdater.ts');

  assert.doesNotMatch(macroUpdater, /if\s*\(!apiKey\)\s*throw\s+new\s+Error\("GEMINI_API_KEY is missing"\)/);
  assert.match(macroUpdater, /return \[\];/);
});

test('admin handler reports AI configuration errors separately from database errors', async () => {
  const admin = await source('api/admin.ts');

  assert.match(admin, /GEMINI_API_KEY is not configured/);
  assert.match(admin, /AI_CONFIG_MISSING/);
  assert.match(admin, /ADMIN_CONFIG_ERROR/);
});
