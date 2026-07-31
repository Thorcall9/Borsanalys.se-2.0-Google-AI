import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

import { FinancialDataPointSchema, SnapshotMetadataSchema } from '../../src/lib/v11/schemas.ts';

const proposedMetadata = {
  id: randomUUID(),
  analysisId: randomUUID(),
  revision: 1,
  schemaVersion: '11.0',
  createdAt: '2026-07-31T12:00:00.000Z',
  createdBy: { actorId: 'editor-1', actorType: 'editor' },
  approvalStatus: 'proposed',
  approvedAt: null,
  approvedBy: null,
  approvalReason: null,
  supersedesRevisionId: null,
  dependencyIds: [],
};

const reportedFact = {
  dataPointId: randomUUID(),
  metric: 'ebit_margin',
  value: 0.2,
  unit: 'percent',
  currency: null,
  period: {
    kind: 'fiscal-year',
    fiscalYear: 2026,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  valueOrigin: 'reported',
  sourceId: randomUUID(),
  sourceLocator: { page: 12, section: 'Income statement', quoteAnchor: null },
  calculation: null,
  verificationStatus: 'source-located',
  metadata: proposedMetadata,
};

test('accepts a reported percentage in decimal form with a source locator', () => {
  assert.equal(FinancialDataPointSchema.safeParse(reportedFact).success, true);
});

test('rejects a reported fact without a source locator and a percentage above one', () => {
  assert.equal(FinancialDataPointSchema.safeParse({ ...reportedFact, sourceLocator: null }).success, false);
  assert.equal(FinancialDataPointSchema.safeParse({ ...reportedFact, value: 20 }).success, false);
});

test('requires snapshot schema and analysis-model versions', () => {
  assert.equal(SnapshotMetadataSchema.safeParse({
    snapshotId: randomUUID(),
    parentSnapshotId: null,
    schemaVersion: '11.0',
    analysisModelVersion: '11.0.0',
  }).success, true);
  assert.equal(SnapshotMetadataSchema.safeParse({
    snapshotId: randomUUID(),
    parentSnapshotId: null,
    schemaVersion: '11.0',
  }).success, false);
});
