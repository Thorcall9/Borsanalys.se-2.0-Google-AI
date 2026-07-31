import type { FinancialDefinition } from './schemas.ts';

export class FinancialDefinitionError extends Error {
  readonly code: 'DUPLICATE_DEFINITION_ID' | 'UNKNOWN_INPUT_DEFINITION' | 'DEFINITION_CYCLE';

  constructor(code: FinancialDefinitionError['code']) {
    super(code);
    this.name = 'FinancialDefinitionError';
    this.code = code;
  }
}

export type ValidatedDefinitionGraph = Map<string, FinancialDefinition> & {
  topologicalDefinitionIds: string[];
};

export function validateDefinitionGraph(definitions: FinancialDefinition[]): ValidatedDefinitionGraph {
  const byId = new Map<string, FinancialDefinition>();
  for (const definition of definitions) {
    if (byId.has(definition.definitionId)) {
      throw new FinancialDefinitionError('DUPLICATE_DEFINITION_ID');
    }
    byId.set(definition.definitionId, definition);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const topologicalDefinitionIds: string[] = [];

  const visit = (definitionId: string): void => {
    if (visiting.has(definitionId)) {
      throw new FinancialDefinitionError('DEFINITION_CYCLE');
    }
    if (visited.has(definitionId)) return;

    const definition = byId.get(definitionId);
    if (!definition) {
      throw new FinancialDefinitionError('UNKNOWN_INPUT_DEFINITION');
    }

    visiting.add(definitionId);
    for (const inputDefinitionId of definition.inputDefinitionIds) {
      visit(inputDefinitionId);
    }
    visiting.delete(definitionId);
    visited.add(definitionId);
    topologicalDefinitionIds.push(definitionId);
  };

  for (const definitionId of [...byId.keys()].sort()) {
    visit(definitionId);
  }

  return Object.assign(byId, { topologicalDefinitionIds });
}
