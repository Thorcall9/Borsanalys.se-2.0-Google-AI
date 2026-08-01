import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveDefinitionSelections } from '../../src/lib/v11/financials/selections.ts';

function definition(definitionId, metric = 'free_cash_flow') {
  return {
    definitionId,
    metric,
    name: definitionId,
    output: { unit: 'currency', currency: 'USD', scale: 'millions' },
    allowedPeriodKinds: ['quarter', 'fiscal-year'],
    calculationRule: 'reported-input',
    inputDefinitionIds: [],
    adjustmentComponents: [],
    rationale: 'Test definition.',
  };
}

const fcfIncludingLease = definition('fcf-including-lease');
const fcfExcludingLease = definition('fcf-excluding-lease');
const revenue = definition('revenue-reported', 'revenue');
const ntmFcf = {
  context: 'ntm',
  metric: 'free_cash_flow',
  primaryDefinitionId: 'fcf-including-lease',
  controlDefinitionIds: ['fcf-excluding-lease'],
  rationale: 'Primary FCF includes finance-lease principal payments.',
};
const fiveYearFcf = { ...ntmFcf, context: 'five-year' };

test('requires one known primary FCF definition per model context', () => {
  const result = resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease], selections: [ntmFcf, fiveYearFcf],
  });
  assert.equal(result.selectionsByContextMetric.get('ntm:free_cash_flow')?.primaryDefinitionId, 'fcf-including-lease');
  assert.throws(() => resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease], selections: [ntmFcf],
  }), /FCF_SELECTION_MISSING/);
});

test('rejects duplicate, unknown and metric-incompatible selections', () => {
  assert.throws(() => resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease],
    selections: [ntmFcf, { ...ntmFcf, primaryDefinitionId: 'fcf-excluding-lease' }, fiveYearFcf],
  }), /DUPLICATE_SELECTION/);
  assert.throws(() => resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease],
    selections: [{ ...ntmFcf, primaryDefinitionId: 'unknown' }, fiveYearFcf],
  }), /UNKNOWN_SELECTION_DEFINITION/);
  assert.throws(() => resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease, revenue],
    selections: [{ ...ntmFcf, primaryDefinitionId: 'revenue-reported' }, fiveYearFcf],
  }), /SELECTION_METRIC_MISMATCH/);
});

test('rejects a primary definition repeated as a control definition', () => {
  assert.throws(() => resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease],
    selections: [{ ...ntmFcf, controlDefinitionIds: ['fcf-including-lease'] }, fiveYearFcf],
  }), /PRIMARY_CONTROL_DUPLICATE/);
});

test('warns when NTM and five-year use different FCF primary definitions', () => {
  const result = resolveDefinitionSelections({
    definitions: [fcfIncludingLease, fcfExcludingLease],
    selections: [ntmFcf, {
      ...fiveYearFcf,
      primaryDefinitionId: 'fcf-excluding-lease',
      controlDefinitionIds: ['fcf-including-lease'],
    }],
  });
  assert.deepEqual(result.warnings, ['FCF_DEFINITION_COMPARABILITY_WARNING']);
});
