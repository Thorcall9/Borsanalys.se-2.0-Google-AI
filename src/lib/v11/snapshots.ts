import type { ApprovalActor } from './revisions.ts';

type SnapshotLink = { id: string; analysisId: string; parentSnapshotId: string | null };

type SnapshotStore = {
  getById(id: string): Promise<SnapshotLink | null>;
  create(input: Record<string, unknown>): Promise<unknown>;
};

export class SnapshotDomainError extends Error {
  readonly code:
    | 'EDITOR_REQUIRED' | 'SNAPSHOT_VERSION_REQUIRED' | 'PARENT_NOT_FOUND'
    | 'PARENT_ANALYSIS_MISMATCH' | 'SNAPSHOT_CYCLE';

  constructor(code: SnapshotDomainError['code']) {
    super(code);
    this.code = code;
    this.name = 'SnapshotDomainError';
  }
}

export async function createSnapshot(input: {
  snapshotId?: string;
  analysisId: string;
  parentSnapshotId: string | null;
  schemaVersion: string;
  analysisModelVersion: string;
  payloadHash: string;
  canonicalPayload: string;
  approver: ApprovalActor;
  snapshots: SnapshotStore;
}) {
  if (input.approver.actorType !== 'editor') throw new SnapshotDomainError('EDITOR_REQUIRED');
  if (!input.schemaVersion.trim() || !input.analysisModelVersion.trim()) {
    throw new SnapshotDomainError('SNAPSHOT_VERSION_REQUIRED');
  }

  const snapshotId = input.snapshotId ?? crypto.randomUUID();
  const visited = new Set<string>([snapshotId]);
  let ancestorId = input.parentSnapshotId;
  while (ancestorId) {
    if (visited.has(ancestorId)) throw new SnapshotDomainError('SNAPSHOT_CYCLE');
    visited.add(ancestorId);
    const ancestor = await input.snapshots.getById(ancestorId);
    if (!ancestor) throw new SnapshotDomainError('PARENT_NOT_FOUND');
    if (ancestor.analysisId !== input.analysisId) throw new SnapshotDomainError('PARENT_ANALYSIS_MISMATCH');
    ancestorId = ancestor.parentSnapshotId;
  }

  return input.snapshots.create({
    id: snapshotId,
    analysisId: input.analysisId,
    parentSnapshotId: input.parentSnapshotId,
    schemaVersion: input.schemaVersion,
    analysisModelVersion: input.analysisModelVersion,
    modelVersion: input.analysisModelVersion,
    payloadHash: input.payloadHash,
    canonicalPayload: input.canonicalPayload,
    approvedBy: input.approver.actorId,
    approvedAt: new Date(),
  });
}
