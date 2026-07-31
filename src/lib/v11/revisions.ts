import type { AuditMetadata } from './schemas.ts';

export class RevisionDomainError extends Error {
  readonly code: 'HUMAN_APPROVAL_REQUIRED' | 'DEPENDENCY_NOT_APPROVED' | 'APPROVED_REVISION_REQUIRED';

  constructor(code: RevisionDomainError['code']) {
    super(code);
    this.name = 'RevisionDomainError';
    this.code = code;
  }
}

export type RevisionLike = { metadata: AuditMetadata };

export type ApprovalActor = {
  actorId: string;
  actorType: 'ai' | 'editor' | 'system';
};

export type DependencyLookup = (dependencyId: string) => RevisionLike | undefined;

export type ApprovalInput<T extends RevisionLike> = {
  revision: T;
  actor: ApprovalActor;
  reason: string;
  approvedAt?: string;
};

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function assertApprovedDependencies(metadata: AuditMetadata, lookup: DependencyLookup): void {
  for (const dependencyId of metadata.dependencyIds) {
    if (lookup(dependencyId)?.metadata.approvalStatus !== 'approved') {
      throw new RevisionDomainError('DEPENDENCY_NOT_APPROVED');
    }
  }
}

export function approveRevision<T extends RevisionLike>(
  input: ApprovalInput<T>,
  lookup: DependencyLookup,
): T {
  if (input.actor.actorType !== 'editor') {
    throw new RevisionDomainError('HUMAN_APPROVAL_REQUIRED');
  }
  assertApprovedDependencies(input.revision.metadata, lookup);

  return deepFreeze({
    ...input.revision,
    metadata: {
      ...input.revision.metadata,
      id: crypto.randomUUID(),
      revision: input.revision.metadata.revision + 1,
      approvalStatus: 'approved',
      approvedAt: input.approvedAt ?? new Date().toISOString(),
      approvedBy: input.actor.actorId,
      approvalReason: input.reason,
      supersedesRevisionId: input.revision.metadata.id,
    },
  });
}

export function createRevision<T extends RevisionLike>(
  approvedRevision: T,
  patch: Partial<Omit<T, 'metadata'>>,
): T {
  if (approvedRevision.metadata.approvalStatus !== 'approved') {
    throw new RevisionDomainError('APPROVED_REVISION_REQUIRED');
  }

  return {
    ...approvedRevision,
    ...patch,
    metadata: {
      ...approvedRevision.metadata,
      id: crypto.randomUUID(),
      revision: approvedRevision.metadata.revision + 1,
      createdAt: new Date().toISOString(),
      approvalStatus: 'proposed',
      approvedAt: null,
      approvedBy: null,
      approvalReason: null,
      supersedesRevisionId: approvedRevision.metadata.id,
    },
  };
}
