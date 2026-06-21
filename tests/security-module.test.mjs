import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const securityModuleUrl = new URL('../api/_security.ts', import.meta.url);

test('security module uses the Vercel-compatible node:crypto named import', async () => {
  const source = await readFile(securityModuleUrl, 'utf8');

  assert.match(
    source,
    /import\s*\{\s*timingSafeEqual\s*\}\s*from\s*['"]node:crypto['"]/,
  );
  assert.doesNotMatch(source, /import\s+crypto\s+from\s+['"]crypto['"]/);
  assert.match(source, /timingSafeEqual\(left,\s*right\)/);
});
