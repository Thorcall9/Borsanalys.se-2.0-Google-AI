import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

import { createDecisionRecord } from '../../src/lib/v11/decisionRecords.ts';
import { createSnapshot } from '../../src/lib/v11/snapshots.ts';

const editor = { actorId: 'firebase-editor-carl', actorType: 'editor' };

function revision({ analysisId = randomUUID(), objectId = randomUUID(), revision = 1, supersedesRevisionId = null } = {}) {
  return {
    objectId,
    metadata: {
      id: randomUUID(), analysisId, revision, schemaVersion: '11.0',
      createdAt: '2026-07-31T12:00:00.000Z', createdBy: editor,
      approvalStatus: 'approved', approvedAt: '2026-07-31T12:01:00.000Z',
      approvedBy: editor.actorId, approvalReason: 'Checked.', supersedesRevisionId,
      dependencyIds: [],
    },
  };
}

test('rejects a snapshot parent from another analysis', async () => {
  const analysisId = randomUUID();
  await assert.rejects(() => createSnapshot({
    analysisId, parentSnapshotId: randomUUID(), schemaVersion: '11.0', analysisModelVersion: '11.0.0',
    payloadHash: 'a'.repeat(64), canonicalPayload: '{}', approver: editor,
    snapshots: { getById: async id => ({ id, analysisId: randomUUID(), parentSnapshotId: null }), create: async value => value },
  }), /PARENT_ANALYSIS_MISMATCH/);
});

test('rejects self-references and ancestor cycles', async () => {
  const analysisId = randomUUID();
  const snapshotId = randomUUID();
  await assert.rejects(() => createSnapshot({
    snapshotId, analysisId, parentSnapshotId: snapshotId, schemaVersion: '11.0', analysisModelVersion: '11.0.0',
    payloadHash: 'b'.repeat(64), canonicalPayload: '{}', approver: editor,
    snapshots: { getById: async id => ({ id, analysisId, parentSnapshotId: snapshotId }), create: async value => value },
  }), /SNAPSHOT_CYCLE/);
});

test('requires versions for every newly created snapshot', async () => {
  await assert.rejects(() => createSnapshot({
    analysisId: randomUUID(), parentSnapshotId: null, schemaVersion: '', analysisModelVersion: '',
    payloadHash: 'c'.repeat(64), canonicalPayload: '{}', approver: editor,
    snapshots: { getById: async () => null, create: async value => value },
  }), /SNAPSHOT_VERSION_REQUIRED/);
});

test('rejects decision revisions from different analyses or logical objects', () => {
  const previous = revision();
  const wrongAnalysis = revision({ analysisId: randomUUID(), objectId: previous.objectId, revision: 2, supersedesRevisionId: previous.metadata.id });
  const wrongObject = revision({ analysisId: previous.metadata.analysisId, objectId: randomUUID(), revision: 2, supersedesRevisionId: previous.metadata.id });
  const input = { decisionType: 'estimate-approved', reason: 'New evidence.', evidenceIds: [randomUUID()], editor, timestamp: '2026-07-31T13:00:00.000Z' };

  assert.throws(() => createDecisionRecord({ ...input, previousRevision: previous, newRevision: wrongAnalysis }), /REVISION_ANALYSIS_MISMATCH/);
  assert.throws(() => createDecisionRecord({ ...input, previousRevision: previous, newRevision: wrongObject }), /REVISION_OBJECT_MISMATCH/);
});

test('rejects a new revision that is not the direct successor', () => {
  const previous = revision();
  const invalid = revision({ analysisId: previous.metadata.analysisId, objectId: previous.objectId, revision: 3, supersedesRevisionId: null });
  assert.throws(() => createDecisionRecord({
    previousRevision: previous, newRevision: invalid, decisionType: 'estimate-approved',
    reason: 'New evidence.', evidenceIds: [randomUUID()], editor, timestamp: '2026-07-31T13:00:00.000Z',
  }), /INVALID_REVISION_SUCCESSOR/);
});
