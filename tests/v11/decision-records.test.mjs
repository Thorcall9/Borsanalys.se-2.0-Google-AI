import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

import { createDecisionRecord } from '../../src/lib/v11/decisionRecords.ts';

const analysisId = randomUUID();
const objectId = randomUUID();
const previousRevision = {
  objectId,
  metadata: { id: randomUUID(), analysisId, revision: 1, supersedesRevisionId: null },
};
const newRevision = {
  objectId,
  metadata: { id: randomUUID(), analysisId, revision: 2, supersedesRevisionId: previousRevision.metadata.id },
};
const validInput = {
  previousRevision,
  newRevision,
  decisionType: 'estimate-approved',
  reason: 'Q2 reported revenue validates the estimate base.',
  evidenceIds: [randomUUID()],
  editor: { actorId: 'carl', actorType: 'editor' },
  timestamp: '2026-07-31T12:00:00.000Z',
};

test('creates an immutable editor decision record with before/after states and evidence', () => {
  const record = createDecisionRecord(validInput);
  assert.equal(record.editorId, 'carl');
  assert.equal(record.objectId, objectId);
  assert.equal(record.newRevisionId, newRevision.metadata.id);
  assert.equal(record.evidenceIds.length, 1);
  assert.throws(() => { record.reason = 'changed'; }, /read only|object is not extensible/);
});

test('initial approvals are recorded only in approval history', () => {
  assert.throws(() => createDecisionRecord({ ...validInput, previousRevision: null }), /PREVIOUS_REVISION_REQUIRED/);
});

test('rejects AI-created decision records, empty reasons and missing evidence', () => {
  assert.throws(() => createDecisionRecord({ ...validInput, editor: { actorId: 'model', actorType: 'ai' } }), /EDITOR_REQUIRED/);
  assert.throws(() => createDecisionRecord({ ...validInput, reason: '' }), /DECISION_REASON_REQUIRED/);
  assert.throws(() => createDecisionRecord({ ...validInput, evidenceIds: [] }), /EVIDENCE_REQUIRED/);
});
