import type { FinancialDefinition, FinancialModelDefinitionSelection } from './schemas.ts';

export class FinancialSelectionError extends Error {
  readonly code:
    | 'DUPLICATE_SELECTION'
    | 'FCF_SELECTION_MISSING'
    | 'UNKNOWN_SELECTION_DEFINITION'
    | 'SELECTION_METRIC_MISMATCH'
    | 'PRIMARY_CONTROL_DUPLICATE'
    | 'DUPLICATE_CONTROL_DEFINITION'
    | 'FCF_COMPARABILITY_RATIONALE_REQUIRED';

  constructor(code: FinancialSelectionError['code']) {
    super(code);
    this.name = 'FinancialSelectionError';
    this.code = code;
  }
}

export type ResolvedSelection = FinancialModelDefinitionSelection & {
  primaryDefinition: FinancialDefinition;
  controlDefinitions: FinancialDefinition[];
};

export type ResolvedDefinitionSelections = {
  selectionsByContextMetric: Map<string, ResolvedSelection>;
  warnings: string[];
};

function selectionKey(selection: FinancialModelDefinitionSelection): string {
  return `${selection.context}:${selection.metric}`;
}

export function resolveDefinitionSelections(input: {
  definitions: FinancialDefinition[];
  selections: FinancialModelDefinitionSelection[];
}): ResolvedDefinitionSelections {
  const definitionsById = new Map(input.definitions.map(definition => [definition.definitionId, definition]));
  const selectionsByContextMetric = new Map<string, ResolvedSelection>();

  for (const selection of input.selections) {
    const key = selectionKey(selection);
    if (selectionsByContextMetric.has(key)) {
      throw new FinancialSelectionError('DUPLICATE_SELECTION');
    }
    if (selection.controlDefinitionIds.includes(selection.primaryDefinitionId)) {
      throw new FinancialSelectionError('PRIMARY_CONTROL_DUPLICATE');
    }
    if (new Set(selection.controlDefinitionIds).size !== selection.controlDefinitionIds.length) {
      throw new FinancialSelectionError('DUPLICATE_CONTROL_DEFINITION');
    }

    const primaryDefinition = definitionsById.get(selection.primaryDefinitionId);
    if (!primaryDefinition) {
      throw new FinancialSelectionError('UNKNOWN_SELECTION_DEFINITION');
    }
    if (primaryDefinition.metric !== selection.metric) {
      throw new FinancialSelectionError('SELECTION_METRIC_MISMATCH');
    }

    const controlDefinitions = selection.controlDefinitionIds.map(definitionId => {
      const definition = definitionsById.get(definitionId);
      if (!definition) throw new FinancialSelectionError('UNKNOWN_SELECTION_DEFINITION');
      if (definition.metric !== selection.metric) throw new FinancialSelectionError('SELECTION_METRIC_MISMATCH');
      return definition;
    });

    selectionsByContextMetric.set(key, { ...selection, primaryDefinition, controlDefinitions });
  }

  const ntmFcf = selectionsByContextMetric.get('ntm:free_cash_flow');
  const fiveYearFcf = selectionsByContextMetric.get('five-year:free_cash_flow');
  if (!ntmFcf || !fiveYearFcf) {
    throw new FinancialSelectionError('FCF_SELECTION_MISSING');
  }

  const warnings: string[] = [];
  if (ntmFcf.primaryDefinitionId !== fiveYearFcf.primaryDefinitionId) {
    if (!ntmFcf.rationale.trim() || !fiveYearFcf.rationale.trim()) {
      throw new FinancialSelectionError('FCF_COMPARABILITY_RATIONALE_REQUIRED');
    }
    warnings.push('FCF_DEFINITION_COMPARABILITY_WARNING');
  }

  return { selectionsByContextMetric, warnings };
}
