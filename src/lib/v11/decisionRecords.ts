import type { ApprovalActor } from './revisions.ts';

type RevisionReference = {
  objectId: string;
  metadata: {
    id: string;
    analysisId: string;
    revision: number;
    supersedesRevisionId: string | null;
  };
};

export class DecisionRecordDomainError extends Error {
  readonly code:
    | 'EDITOR_REQUIRED' | 'DECISION_REASON_REQUIRED' | 'EVIDENCE_REQUIRED'
    | 'PREVIOUS_REVISION_REQUIRED' | 'REVISION_ANALYSIS_MISMATCH'
    | 'REVISION_OBJECT_MISMATCH' | 'INVALID_REVISION_SUCCESSOR';

  constructor(code: DecisionRecordDomainError['code']) {
    super(code);
    this.code = code;
    this.name = 'DecisionRecordDomainError';
  }
}

export type CreateDecisionRecordInput = {
  previousRevision: RevisionReference | null;
  newRevision: RevisionReference;
  decisionType: string;
  reason: string;
  evidenceIds: string[];
  editor: ApprovalActor;
  timestamp: string;
};

export function createDecisionRecord(input: CreateDecisionRecordInput) {
  if (input.editor.actorType !== 'editor') throw new DecisionRecordDomainError('EDITOR_REQUIRED');
  if (!input.reason.trim()) throw new DecisionRecordDomainError('DECISION_REASON_REQUIRED');
  if (input.evidenceIds.length === 0) throw new DecisionRecordDomainError('EVIDENCE_REQUIRED');
  if (!input.previousRevision) throw new DecisionRecordDomainError('PREVIOUS_REVISION_REQUIRED');

  const previous = input.previousRevision;
  const next = input.newRevision;
  if (previous.metadata.analysisId !== next.metadata.analysisId) {
    throw new DecisionRecordDomainError('REVISION_ANALYSIS_MISMATCH');
  }
  if (previous.objectId !== next.objectId) {
    throw new DecisionRecordDomainError('REVISION_OBJECT_MISMATCH');
  }
  if (next.metadata.supersedesRevisionId !== previous.metadata.id
    || next.metadata.revision !== previous.metadata.revision + 1) {
    throw new DecisionRecordDomainError('INVALID_REVISION_SUCCESSOR');
  }

  return Object.freeze({
    decisionRecordId: crypto.randomUUID(),
    analysisId: next.metadata.analysisId,
    objectId: next.objectId,
    previousRevisionId: previous.metadata.id,
    newRevisionId: next.metadata.id,
    decisionType: input.decisionType,
    reason: input.reason,
    evidenceIds: Object.freeze([...input.evidenceIds]),
    editorId: input.editor.actorId,
    createdAt: input.timestamp,
  });
}
