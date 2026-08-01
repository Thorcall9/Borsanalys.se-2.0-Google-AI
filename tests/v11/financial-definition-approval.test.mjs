import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import {
  approveFinancialModelConfiguration,
  createFinancialModelConfigurationRevision,
} from '../../src/lib/v11/financials/configuration.ts';

const analysisId = randomUUID();
const editor = { actorId: 'editor-1', actorType: 'editor' };
const ai = { actorId: 'model-1', actorType: 'ai' };

function metadata({ id = randomUUID(), revision = 1, approvalStatus = 'approved', dependencyIds = [] } = {}) {
  const approved = approvalStatus === 'approved';
  return {
    id, analysisId, revision, schemaVersion: '11.0', createdAt: '2026-08-01T10:00:00.000Z',
    createdBy: editor, approvalStatus,
    approvedAt: approved ? '2026-08-01T10:00:00.000Z' : null,
    approvedBy: approved ? editor.actorId : null,
    approvalReason: approved ? 'Approved.' : null,
    supersedesRevisionId: null, dependencyIds,
  };
}

function definitionRevision(definitionId, approvalStatus = 'approved') {
  return {
    definition: { definitionId },
    metadata: metadata({ approvalStatus }),
  };
}

const fcfIncluding = definitionRevision('fcf-including-lease');
const fcfExcluding = definitionRevision('fcf-excluding-lease');
const approvedConfiguration = {
  selection: {
    context: 'ntm', metric: 'free_cash_flow', primaryDefinitionId: 'fcf-including-lease',
    controlDefinitionIds: ['fcf-excluding-lease'], rationale: 'Includes finance-lease principal payments.',
  },
  metadata: metadata({ dependencyIds: [fcfIncluding.metadata.id, fcfExcluding.metadata.id] }),
};

test('changing a primary definition creates a proposed revision with current dependencies', () => {
  const next = createFinancialModelConfigurationRevision(approvedConfiguration, {
    selection: {
      ...approvedConfiguration.selection,
      primaryDefinitionId: 'fcf-excluding-lease',
      controlDefinitionIds: ['fcf-including-lease'],
      rationale: 'Primary definition is changed by a reviewed model decision.',
    },
    definitionRevisions: [fcfIncluding, fcfExcluding],
  });

  assert.equal(next.metadata.approvalStatus, 'proposed');
  assert.equal(next.metadata.supersedesRevisionId, approvedConfiguration.metadata.id);
  assert.deepEqual([...next.metadata.dependencyIds].sort(), [fcfIncluding.metadata.id, fcfExcluding.metadata.id].sort());
});

test('rejects AI approval and unapproved definition dependencies', () => {
  const proposed = createFinancialModelConfigurationRevision(approvedConfiguration, {
    selection: approvedConfiguration.selection,
    definitionRevisions: [fcfIncluding, fcfExcluding],
  });
  assert.throws(() => approveFinancialModelConfiguration({
    revision: proposed, actor: ai, reason: 'No human approval.', definitionRevisions: [fcfIncluding, fcfExcluding],
  }), /HUMAN_APPROVAL_REQUIRED/);

  const proposedDefinition = definitionRevision('fcf-excluding-lease', 'proposed');
  const withProposedDependency = createFinancialModelConfigurationRevision(approvedConfiguration, {
    selection: approvedConfiguration.selection,
    definitionRevisions: [fcfIncluding, proposedDefinition],
  });
  assert.throws(() => approveFinancialModelConfiguration({
    revision: withProposedDependency, actor: editor, reason: 'Checked.', definitionRevisions: [fcfIncluding, proposedDefinition],
  }), /DEPENDENCY_NOT_APPROVED/);
});
