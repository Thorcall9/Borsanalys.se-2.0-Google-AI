import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

import { createDecisionRecord } from '../../src/lib/v11/decisionRecords.ts';

const validInput = {
  changedObjectId: randomUUID(),
  objectType: 'estimate',
  previousState: 'proposed',
  newState: 'approved',
  reason: 'Q2 reported revenue validates the estimate base.',
  evidenceIds: [randomUUID()],
  editor: { actorId: 'carl', actorType: 'editor' },
  timestamp: '2026-07-31T12:00:00.000Z',
  triggeringEventId: null,
};

test('creates an immutable editor decision record with before/after states and evidence', () => {
  const record = createDecisionRecord(validInput);
  assert.equal(record.editorId, 'carl');
  assert.equal(record.newState, 'approved');
  assert.equal(record.evidenceIds.length, 1);
  assert.throws(() => { record.reason = 'changed'; }, /read only|object is not extensible/);
});

test('rejects AI-created decision records, empty reasons and missing evidence', () => {
  assert.throws(() => createDecisionRecord({ ...validInput, editor: { actorId: 'model', actorType: 'ai' } }), /EDITOR_REQUIRED/);
  assert.throws(() => createDecisionRecord({ ...validInput, reason: '' }), /DECISION_REASON_REQUIRED/);
  assert.throws(() => createDecisionRecord({ ...validInput, evidenceIds: [] }), /EVIDENCE_REQUIRED/);
});
