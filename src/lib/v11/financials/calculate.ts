import { validateDefinitionGraph } from './definitions.ts';
import { resolveDefinitionSelections } from './selections.ts';
import type {
  EbitAdjustmentComponent,
  FinancialDefinition,
  FinancialInput,
  FinancialModelContext,
  FinancialModelDefinitionSelection,
  FinancialScale,
  FinancialUnit,
  FinancialValue,
} from './schemas.ts';

const SCALE_FACTORS: Record<FinancialScale, number> = {
  ones: 1,
  thousands: 1_000,
  millions: 1_000_000,
  billions: 1_000_000_000,
};

export class FinancialCalculationError extends Error {
  readonly code:
    | 'DUPLICATE_FINANCIAL_INPUT'
    | 'UNKNOWN_FINANCIAL_INPUT'
    | 'UNEXPECTED_FINANCIAL_INPUT'
    | 'MISSING_FINANCIAL_INPUT'
    | 'PERIOD_MISMATCH'
    | 'PERIOD_KIND_NOT_ALLOWED'
    | 'UNIT_MISMATCH'
    | 'CURRENCY_MISMATCH'
    | 'INVALID_DIVISOR'
    | 'DIVIDE_UNIT_MISMATCH'
    | 'SELECTION_REQUIRED';

  constructor(code: FinancialCalculationError['code']) {
    super(code);
    this.name = 'FinancialCalculationError';
    this.code = code;
  }
}

export type CalculationTraceItem = {
  definitionId: string;
  rule: FinancialDefinition['calculationRule'];
  output: FinancialValue;
  inputs: Array<{ definitionId: string; value: FinancialValue }>;
  dependencyIds: string[];
  adjustments?: Array<{ adjustmentId: string; value: FinancialValue; evidenceIds: string[] }>;
};

export type FinancialPeriodResult = {
  period: FinancialInput['period'];
  valuesByDefinitionId: Record<string, FinancialValue>;
  primaryValuesByMetric: Record<string, { definitionId: string; value: FinancialValue }>;
  calculationTrace: CalculationTraceItem[];
};

type FinancialValueSpec = {
  unit: FinancialUnit;
  currency?: string | null;
  scale: FinancialScale;
};

function periodKey(period: FinancialInput['period']): string {
  return JSON.stringify(period);
}

function normalizeScale(value: FinancialValue, output: FinancialValueSpec): FinancialValue {
  if (value.unit !== output.unit) throw new FinancialCalculationError('UNIT_MISMATCH');
  const outputCurrency = output.currency ?? null;
  if (value.currency !== outputCurrency) throw new FinancialCalculationError('CURRENCY_MISMATCH');
  return {
    value: value.value * SCALE_FACTORS[value.scale] / SCALE_FACTORS[output.scale],
    unit: output.unit,
    currency: outputCurrency,
    scale: output.scale,
  };
}

function sum(values: FinancialValue[], output: FinancialValueSpec): FinancialValue {
  return {
    ...output,
    value: values.map(value => normalizeScale(value, output).value).reduce((total, value) => total + value, 0),
  };
}

function subtract(left: FinancialValue, right: FinancialValue, output: FinancialValueSpec): FinancialValue {
  return {
    ...output,
    value: normalizeScale(left, output).value - normalizeScale(right, output).value,
  };
}

function divide(numerator: FinancialValue, denominator: FinancialValue, output: FinancialValueSpec): FinancialValue {
  if (numerator.unit !== 'currency' || denominator.unit !== 'shares' || output.unit !== 'currency-per-share') {
    throw new FinancialCalculationError('DIVIDE_UNIT_MISMATCH');
  }
  const outputCurrency = output.currency ?? null;
  if (numerator.currency !== outputCurrency) throw new FinancialCalculationError('CURRENCY_MISMATCH');
  const denominatorInOnes = denominator.value * SCALE_FACTORS[denominator.scale];
  if (denominatorInOnes <= 0) throw new FinancialCalculationError('INVALID_DIVISOR');

  const numeratorInOnes = numerator.value * SCALE_FACTORS[numerator.scale];
  return {
    unit: output.unit,
    currency: outputCurrency,
    scale: output.scale,
    value: numeratorInOnes / denominatorInOnes / SCALE_FACTORS[output.scale],
  };
}

function adjustedEbit(base: FinancialValue, adjustments: EbitAdjustmentComponent[], output: FinancialValueSpec): FinancialValue {
  const normalizedBase = normalizeScale(base, output);
  const normalizedAdjustments = adjustments.map(component => normalizeScale(component.amount, output));
  return {
    ...output,
    value: normalizedBase.value + normalizedAdjustments.reduce((total, value) => total + value.value, 0),
  };
}

function assertDefinitionPeriod(definition: FinancialDefinition, period: FinancialInput['period']): void {
  if (period.kind !== 'quarter' && period.kind !== 'fiscal-year') {
    throw new FinancialCalculationError('PERIOD_KIND_NOT_ALLOWED');
  }
  if (!definition.allowedPeriodKinds.includes(period.kind)) {
    throw new FinancialCalculationError('PERIOD_KIND_NOT_ALLOWED');
  }
}

function assertMetricSelections(
  definitions: FinancialDefinition[],
  context: FinancialModelContext,
  selectedKeys: Map<string, unknown>,
): void {
  const definitionCounts = new Map<string, number>();
  for (const definition of definitions) {
    definitionCounts.set(definition.metric, (definitionCounts.get(definition.metric) ?? 0) + 1);
  }
  for (const [metric, count] of definitionCounts) {
    if (count > 1 && !selectedKeys.has(`${context}:${metric}`)) {
      throw new FinancialCalculationError('SELECTION_REQUIRED');
    }
  }
}

export function calculateFinancialPeriodResult(input: {
  period: FinancialInput['period'];
  context: FinancialModelContext;
  definitions: FinancialDefinition[];
  selections: FinancialModelDefinitionSelection[];
  inputs: FinancialInput[];
}): FinancialPeriodResult {
  const graph = validateDefinitionGraph(input.definitions);
  const resolvedSelections = resolveDefinitionSelections({ definitions: input.definitions, selections: input.selections });
  assertMetricSelections(input.definitions, input.context, resolvedSelections.selectionsByContextMetric);

  const inputsByDefinitionId = new Map<string, FinancialInput>();
  for (const financialInput of input.inputs) {
    if (inputsByDefinitionId.has(financialInput.definitionId)) {
      throw new FinancialCalculationError('DUPLICATE_FINANCIAL_INPUT');
    }
    if (periodKey(financialInput.period) !== periodKey(input.period)) {
      throw new FinancialCalculationError('PERIOD_MISMATCH');
    }
    const definition = graph.get(financialInput.definitionId);
    if (!definition) throw new FinancialCalculationError('UNKNOWN_FINANCIAL_INPUT');
    if (definition.calculationRule !== 'reported-input') {
      throw new FinancialCalculationError('UNEXPECTED_FINANCIAL_INPUT');
    }
    inputsByDefinitionId.set(financialInput.definitionId, financialInput);
  }

  const valuesByDefinitionId: Record<string, FinancialValue> = {};
  const calculationTrace: CalculationTraceItem[] = [];

  for (const definitionId of graph.topologicalDefinitionIds) {
    const definition = graph.get(definitionId);
    if (!definition) throw new FinancialCalculationError('UNKNOWN_FINANCIAL_INPUT');
    assertDefinitionPeriod(definition, input.period);

    if (definition.calculationRule === 'reported-input') {
      const financialInput = inputsByDefinitionId.get(definitionId);
      if (!financialInput) throw new FinancialCalculationError('MISSING_FINANCIAL_INPUT');
      const output = normalizeScale(financialInput.value, definition.output);
      valuesByDefinitionId[definitionId] = output;
      calculationTrace.push({
        definitionId,
        rule: definition.calculationRule,
        output,
        inputs: [],
        dependencyIds: [...financialInput.dependencyIds].sort(),
      });
      continue;
    }

    const definitionInputs = definition.inputDefinitionIds.map(inputDefinitionId => {
      const value = valuesByDefinitionId[inputDefinitionId];
      if (!value) throw new FinancialCalculationError('MISSING_FINANCIAL_INPUT');
      return { definitionId: inputDefinitionId, value };
    });

    let output: FinancialValue;
    if (definition.calculationRule === 'sum') {
      output = sum(definitionInputs.map(item => item.value), definition.output);
    } else if (definition.calculationRule === 'subtract') {
      output = subtract(definitionInputs[0].value, definitionInputs[1].value, definition.output);
    } else if (definition.calculationRule === 'divide') {
      output = divide(definitionInputs[0].value, definitionInputs[1].value, definition.output);
    } else {
      output = adjustedEbit(definitionInputs[0].value, definition.adjustmentComponents, definition.output);
    }

    valuesByDefinitionId[definitionId] = output;
    calculationTrace.push({
      definitionId,
      rule: definition.calculationRule,
      output,
      inputs: definitionInputs,
      dependencyIds: [...definition.inputDefinitionIds],
      ...(definition.calculationRule === 'adjusted-ebit' ? {
        adjustments: definition.adjustmentComponents.map(component => ({
          adjustmentId: component.adjustmentId,
          value: normalizeScale(component.amount, definition.output),
          evidenceIds: [...component.evidenceIds].sort(),
        })),
      } : {}),
    });
  }

  const primaryValuesByMetric: FinancialPeriodResult['primaryValuesByMetric'] = {};
  for (const selection of resolvedSelections.selectionsByContextMetric.values()) {
    if (selection.context !== input.context) continue;
    const value = valuesByDefinitionId[selection.primaryDefinitionId];
    if (!value) throw new FinancialCalculationError('MISSING_FINANCIAL_INPUT');
    primaryValuesByMetric[selection.metric] = {
      definitionId: selection.primaryDefinitionId,
      value,
    };
  }

  return { period: input.period, valuesByDefinitionId, primaryValuesByMetric, calculationTrace };
}
