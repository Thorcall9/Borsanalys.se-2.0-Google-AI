import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('adds only Phase 1 decision history and snapshot-chain schema objects', async () => {
  const schema = await readFile(new URL('../../prisma/schema.prisma', import.meta.url), 'utf8');

  assert.match(schema, /model V11DecisionRecord/);
  assert.match(schema, /parentSnapshotId\s+String\?/);
  assert.match(schema, /schemaVersion\s+String/);
  assert.match(schema, /analysisModelVersion\s+String/);
  assert.match(schema, /@relation\("V11SnapshotChain"/);
  assert.match(schema, /@@index\(\[analysisId, createdAt\]\)/);
  assert.doesNotMatch(schema, /model MetricDefinition|model MetricObservation|model KPIProfile|model TriggerRule|model MaterialityAssessment|model AnalysisHealth/);
});
