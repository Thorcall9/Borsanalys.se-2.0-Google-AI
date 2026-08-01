import {
  approveRevision,
  createRevision,
  type ApprovalActor,
  type RevisionLike,
} from '../revisions.ts';
import type { AuditMetadata } from '../schemas.ts';
import type { FinancialModelDefinitionSelection } from './schemas.ts';

export class FinancialConfigurationError extends Error {
  readonly code: 'UNKNOWN_CONFIGURATION_DEFINITION' | 'CONFIGURATION_DEPENDENCY_MISMATCH';

  constructor(code: FinancialConfigurationError['code']) {
    super(code);
    this.name = 'FinancialConfigurationError';
    this.code = code;
  }
}

export type FinancialDefinitionRevision = RevisionLike & {
  definition: { definitionId: string };
};

export type FinancialModelConfigurationRevision = {
  selection: FinancialModelDefinitionSelection;
  metadata: AuditMetadata;
};

function selectedDefinitionIds(selection: FinancialModelDefinitionSelection): string[] {
  return [selection.primaryDefinitionId, ...selection.controlDefinitionIds];
}

function dependencyIdsFor(
  selection: FinancialModelDefinitionSelection,
  definitionRevisions: FinancialDefinitionRevision[],
): string[] {
  const revisionsByDefinitionId = new Map(
    definitionRevisions.map(revision => [revision.definition.definitionId, revision]),
  );
  return selectedDefinitionIds(selection).map(definitionId => {
    const revision = revisionsByDefinitionId.get(definitionId);
    if (!revision) throw new FinancialConfigurationError('UNKNOWN_CONFIGURATION_DEFINITION');
    return revision.metadata.id;
  });
}

function assertCurrentDependencies(
  revision: FinancialModelConfigurationRevision,
  definitionRevisions: FinancialDefinitionRevision[],
): void {
  const expected = dependencyIdsFor(revision.selection, definitionRevisions).sort();
  const actual = [...revision.metadata.dependencyIds].sort();
  if (expected.length !== actual.length || expected.some((id, index) => id !== actual[index])) {
    throw new FinancialConfigurationError('CONFIGURATION_DEPENDENCY_MISMATCH');
  }
}

export function createFinancialModelConfigurationRevision(
  approvedRevision: FinancialModelConfigurationRevision,
  input: {
    selection: FinancialModelDefinitionSelection;
    definitionRevisions: FinancialDefinitionRevision[];
  },
): FinancialModelConfigurationRevision {
  const revision = createRevision(approvedRevision, { selection: input.selection });
  return {
    ...revision,
    metadata: {
      ...revision.metadata,
      dependencyIds: dependencyIdsFor(input.selection, input.definitionRevisions),
    },
  };
}

export function approveFinancialModelConfiguration(input: {
  revision: FinancialModelConfigurationRevision;
  actor: ApprovalActor;
  reason: string;
  approvedAt?: string;
  definitionRevisions: FinancialDefinitionRevision[];
}): FinancialModelConfigurationRevision {
  assertCurrentDependencies(input.revision, input.definitionRevisions);
  const revisionsById = new Map(input.definitionRevisions.map(revision => [revision.metadata.id, revision]));
  return approveRevision({
    revision: input.revision,
    actor: input.actor,
    reason: input.reason,
    approvedAt: input.approvedAt,
  }, dependencyId => revisionsById.get(dependencyId));
}
