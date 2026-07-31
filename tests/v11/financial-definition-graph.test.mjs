import assert from 'node:assert/strict';
import test from 'node:test';
import { validateDefinitionGraph } from '../../src/lib/v11/financials/definitions.ts';

function definition(definitionId, metric, calculationRule = 'reported-input', inputDefinitionIds = []) {
  return {
    definitionId,
    metric,
    name: definitionId,
    output: { unit: 'currency', currency: 'USD', scale: 'millions' },
    allowedPeriodKinds: ['quarter'],
    calculationRule,
    inputDefinitionIds,
    adjustmentComponents: [],
    rationale: 'Test definition.',
  };
}

test('accepts an acyclic definition-ID graph', () => {
  const revenue = definition('revenue-reported', 'revenue');
  const ebit = definition('ebit-reported', 'ebit_reported');
  const financialResult = definition('financial-result', 'financial_result');
  const tax = definition('tax', 'tax');
  const netIncome = definition('net-income', 'net_income', 'sum', ['ebit-reported', 'financial-result', 'tax']);

  const graph = validateDefinitionGraph([netIncome, tax, financialResult, ebit, revenue]);

  assert.equal(graph.get('net-income')?.inputDefinitionIds[0], 'ebit-reported');
  assert.deepEqual(graph.topologicalDefinitionIds, [
    'ebit-reported', 'financial-result', 'tax', 'net-income', 'revenue-reported',
  ]);
});

test('rejects duplicate or unknown definition IDs', () => {
  const revenue = definition('revenue-reported', 'revenue');
  assert.throws(() => validateDefinitionGraph([revenue, revenue]), /DUPLICATE_DEFINITION_ID/);
  assert.throws(() => validateDefinitionGraph([
    definition('net-income', 'net_income', 'sum', ['revenue-reported', 'missing']),
    revenue,
  ]), /UNKNOWN_INPUT_DEFINITION/);
});

test('rejects direct and indirect definition cycles', () => {
  assert.throws(() => validateDefinitionGraph([
    definition('a', 'revenue', 'sum', ['b', 'c']),
    definition('b', 'ebit_reported', 'sum', ['a', 'c']),
    definition('c', 'tax'),
  ]), /DEFINITION_CYCLE/);

  assert.throws(() => validateDefinitionGraph([
    definition('a', 'revenue', 'sum', ['b', 'c']),
    definition('b', 'ebit_reported', 'sum', ['c', 'd']),
    definition('c', 'tax', 'sum', ['a', 'd']),
    definition('d', 'financial_result'),
  ]), /DEFINITION_CYCLE/);
});
