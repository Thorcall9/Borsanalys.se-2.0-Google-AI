import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('exposes append-only v11 persistence and a parent-aware snapshot insert', async () => {
  const source = await readFile(new URL('../../src/lib/v11/repository.ts', import.meta.url), 'utf8');
  assert.match(source, /createAnalysis/);
  assert.match(source, /registerSource/);
  assert.match(source, /appendRevision/);
  assert.match(source, /appendDecisionRecord/);
  assert.match(source, /previousRevisionId/);
  assert.match(source, /newRevisionId/);
  assert.match(source, /evidenceIds/);
  assert.match(source, /editorId/);
  assert.match(source, /parentSnapshotId/);
  assert.match(source, /schemaVersion/);
  assert.match(source, /analysisModelVersion/);
  assert.doesNotMatch(source, /\.v11DecisionRecord\.(update|updateMany|delete|deleteMany|upsert)/);
  assert.doesNotMatch(source, /\.v11Snapshot\.(update|updateMany|delete|deleteMany|upsert)/);
});
