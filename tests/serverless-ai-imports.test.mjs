import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('serverless handlers avoid top-level Google AI SDK imports', async () => {
  const [admin, ai, macroUpdater] = await Promise.all([
    source('api/admin.ts'),
    source('api/ai.ts'),
    source('src/lib/macroUpdater.ts'),
  ]);

  for (const file of [admin, ai, macroUpdater]) {
    assert.doesNotMatch(file, /^import\s+\{\s*GoogleGenerativeAI\s*\}\s+from\s+['"]@google\/generative-ai['"]/m);
  }
});
