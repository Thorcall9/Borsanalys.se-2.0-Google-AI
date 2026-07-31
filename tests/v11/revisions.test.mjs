import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

import { approveRevision, createRevision } from '../../src/lib/v11/revisions.ts';

const editor = { actorId: 'editor-1', actorType: 'editor' };
const ai = { actorId: 'model-1', actorType: 'ai' };
const assumptionId = randomUUID();

function proposedEstimate() {
  return {
    estimateId: randomUUID(),
    metric: 'revenue',
    scenario: 'base',
    value: 100,
    unit: 'MUSD',
    currency: 'USD',
    period: { kind: 'fiscal-year', fiscalYear: 2027, startDate: '2027-01-01', endDate: '2027-12-31' },
    assumptionIds: [assumptionId],
    sourceSupportIds: [],
    estimateOrigin: 'editor-proposed',
    metadata: {
      id: randomUUID(), analysisId: randomUUID(), revision: 1, schemaVersion: '11.0',
      createdAt: '2026-07-31T12:00:00.000Z', createdBy: editor, approvalStatus: 'proposed',
      approvedAt: null, approvedBy: null, approvalReason: null, supersedesRevisionId: null,
      dependencyIds: [assumptionId],
    },
  };
}

test('rejects estimate approval while a referenced assumption is proposed', () => {
  const lookup = () => ({ metadata: { approvalStatus: 'proposed' } });
  assert.throws(() => approveRevision({ revision: proposedEstimate(), actor: editor, reason: 'Checked.' }, lookup), /DEPENDENCY_NOT_APPROVED/);
});

test('rejects approval by AI', () => {
  const lookup = () => ({ metadata: { approvalStatus: 'approved' } });
  assert.throws(() => approveRevision({ revision: proposedEstimate(), actor: ai, reason: 'No.' }, lookup), /HUMAN_APPROVAL_REQUIRED/);
});

test('returns a frozen approved revision without mutating the proposal', () => {
  const original = proposedEstimate();
  const lookup = () => ({ metadata: { approvalStatus: 'approved' } });
  const approved = approveRevision({ revision: original, actor: editor, reason: 'Manually checked.' }, lookup);

  assert.equal(original.metadata.approvalStatus, 'proposed');
  assert.equal(approved.metadata.approvalStatus, 'approved');
  assert.equal(approved.metadata.revision, 2);
  assert.equal(approved.metadata.supersedesRevisionId, original.metadata.id);
  assert.throws(() => { approved.value = 101; }, /read only|object is not extensible/);
});

test('creates a proposed revision from an approved revision without changing history', () => {
  const lookup = () => ({ metadata: { approvalStatus: 'approved' } });
  const approved = approveRevision({ revision: proposedEstimate(), actor: editor, reason: 'Manually checked.' }, lookup);
  const next = createRevision(approved, { value: 110 });

  assert.equal(approved.value, 100);
  assert.equal(next.value, 110);
  assert.equal(next.metadata.approvalStatus, 'proposed');
  assert.equal(next.metadata.approvedAt, null);
  assert.equal(next.metadata.supersedesRevisionId, approved.metadata.id);
});
