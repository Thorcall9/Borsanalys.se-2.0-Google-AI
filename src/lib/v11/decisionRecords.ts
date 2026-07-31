import type { ApprovalActor } from './revisions.ts';

export class DecisionRecordDomainError extends Error {
  readonly code: 'EDITOR_REQUIRED' | 'DECISION_REASON_REQUIRED' | 'EVIDENCE_REQUIRED';

  constructor(code: DecisionRecordDomainError['code']) {
    super(code);
    this.name = 'DecisionRecordDomainError';
    this.code = code;
  }
}

export type CreateDecisionRecordInput = {
  changedObjectId: string;
  objectType: string;
  previousState: string;
  newState: string;
  reason: string;
  evidenceIds: string[];
  editor: ApprovalActor;
  timestamp: string;
  triggeringEventId: string | null;
};

export type DecisionRecord = Omit<CreateDecisionRecordInput, 'editor'> & {
  decisionRecordId: string;
  editorId: string;
};

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

export function createDecisionRecord(input: CreateDecisionRecordInput): DecisionRecord {
  if (input.editor.actorType !== 'editor') throw new DecisionRecordDomainError('EDITOR_REQUIRED');
  if (!input.reason.trim()) throw new DecisionRecordDomainError('DECISION_REASON_REQUIRED');
  if (input.evidenceIds.length === 0) throw new DecisionRecordDomainError('EVIDENCE_REQUIRED');

  return deepFreeze({
    decisionRecordId: crypto.randomUUID(),
    changedObjectId: input.changedObjectId,
    objectType: input.objectType,
    previousState: input.previousState,
    newState: input.newState,
    reason: input.reason,
    evidenceIds: [...input.evidenceIds],
    editorId: input.editor.actorId,
    timestamp: input.timestamp,
    triggeringEventId: input.triggeringEventId,
  });
}
