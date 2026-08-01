import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateFinancialPeriodResult } from '../../src/lib/v11/financials/calculate.ts';

const period = {
  kind: 'quarter', fiscalYear: 2026, fiscalQuarter: 3,
  startDate: '2026-07-01', endDate: '2026-09-30',
};

function reported(definitionId, metric, output) {
  return {
    definitionId, metric, name: definitionId, output,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'reported-input',
    inputDefinitionIds: [], adjustmentComponents: [], rationale: 'Reported input.',
  };
}

const usdMillions = { unit: 'currency', currency: 'USD', scale: 'millions' };
const usdBillions = { unit: 'currency', currency: 'USD', scale: 'billions' };
const sharesMillions = { unit: 'shares', currency: null, scale: 'millions' };
const usdPerShare = { unit: 'currency-per-share', currency: 'USD', scale: 'ones' };

const definitions = [
  reported('revenue-reported', 'revenue', usdMillions),
  reported('ebit-reported', 'ebit_reported', usdBillions),
  {
    definitionId: 'ebit-adjusted', metric: 'ebit_adjusted', name: 'Adjusted EBIT', output: usdBillions,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'adjusted-ebit',
    inputDefinitionIds: ['ebit-reported'],
    adjustmentComponents: [
      { adjustmentId: 'severance', amount: { value: 1.18, ...usdBillions }, rationale: 'Disclosed severance cost.', evidenceIds: ['source-severance'], recurrenceAssessment: 'one-off' },
      { adjustmentId: 'asset-gain', amount: { value: -0.5, ...usdBillions }, rationale: 'One-off asset gain is removed.', evidenceIds: ['source-gain'], recurrenceAssessment: 'one-off' },
    ],
    rationale: 'Reported EBIT plus signed approved adjustments.',
  },
  reported('financial-result', 'financial_result', usdMillions),
  reported('tax', 'tax', usdMillions),
  {
    definitionId: 'net-income', metric: 'net_income', name: 'Net income', output: usdMillions,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'sum',
    inputDefinitionIds: ['ebit-reported', 'financial-result', 'tax'], adjustmentComponents: [],
    rationale: 'EBIT plus signed financial result and tax.',
  },
  reported('diluted-shares', 'diluted_shares', sharesMillions),
  {
    definitionId: 'eps', metric: 'eps', name: 'EPS', output: usdPerShare,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'divide',
    inputDefinitionIds: ['net-income', 'diluted-shares'], adjustmentComponents: [], rationale: 'Net income per diluted share.',
  },
  reported('operating-cash-flow', 'operating_cash_flow', usdMillions),
  reported('capex-including-lease', 'capex', usdBillions),
  reported('capex-excluding-lease', 'capex', usdBillions),
  {
    definitionId: 'fcf-primary', metric: 'free_cash_flow', name: 'FCF including lease principal', output: usdMillions,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'subtract',
    inputDefinitionIds: ['operating-cash-flow', 'capex-including-lease'], adjustmentComponents: [], rationale: 'CFO less capex including leases.',
  },
  {
    definitionId: 'fcf-control', metric: 'free_cash_flow', name: 'FCF excluding lease principal', output: usdMillions,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'subtract',
    inputDefinitionIds: ['operating-cash-flow', 'capex-excluding-lease'], adjustmentComponents: [], rationale: 'CFO less capex excluding leases.',
  },
  {
    definitionId: 'fcf-per-share', metric: 'fcf_per_share', name: 'FCF per share', output: usdPerShare,
    allowedPeriodKinds: ['quarter', 'fiscal-year'], calculationRule: 'divide',
    inputDefinitionIds: ['fcf-primary', 'diluted-shares'], adjustmentComponents: [], rationale: 'Primary FCF per diluted share.',
  },
];

const selections = [
  { context: 'ntm', metric: 'free_cash_flow', primaryDefinitionId: 'fcf-primary', controlDefinitionIds: ['fcf-control'], rationale: 'Primary definition includes finance leases.' },
  { context: 'five-year', metric: 'free_cash_flow', primaryDefinitionId: 'fcf-primary', controlDefinitionIds: ['fcf-control'], rationale: 'Use the same definition for comparability.' },
  { context: 'ntm', metric: 'capex', primaryDefinitionId: 'capex-including-lease', controlDefinitionIds: ['capex-excluding-lease'], rationale: 'Primary capex includes finance leases.' },
  { context: 'five-year', metric: 'capex', primaryDefinitionId: 'capex-including-lease', controlDefinitionIds: ['capex-excluding-lease'], rationale: 'Use the same capex definition for comparability.' },
];

function input(definitionId, value) {
  return { definitionId, period, value, dependencyIds: [`fact-${definitionId}`] };
}

function calculationInput(overrides = {}) {
  const values = {
    'revenue-reported': { value: 61_000, ...usdMillions },
    'ebit-reported': { value: 18.8, ...usdBillions },
    'financial-result': { value: -200, ...usdMillions },
    tax: { value: -3_000, ...usdMillions },
    'diluted-shares': { value: 2.4, unit: 'shares', currency: null, scale: 'billions' },
    'operating-cash-flow': { value: 31_860, ...usdMillions },
    'capex-including-lease': { value: 31.08, ...usdBillions },
    'capex-excluding-lease': { value: 28, ...usdBillions },
    ...overrides,
  };
  return {
    period,
    context: 'ntm',
    definitions,
    selections,
    inputs: Object.entries(values).map(([definitionId, value]) => input(definitionId, value)),
  };
}

test('normalizes compatible scales and derives net income, EPS, FCF and FCF per share', () => {
  const result = calculateFinancialPeriodResult(calculationInput());
  assert.deepEqual(result.valuesByDefinitionId['net-income'], { value: 15_600, ...usdMillions });
  assert.deepEqual(result.valuesByDefinitionId.eps, { value: 6.5, ...usdPerShare });
  assert.deepEqual(result.valuesByDefinitionId['fcf-primary'], { value: 780, ...usdMillions });
  assert.deepEqual(result.valuesByDefinitionId['fcf-per-share'], { value: 0.325, ...usdPerShare });
});

test('rejects incompatible currency, unit and diluted-share divisors', () => {
  assert.throws(() => calculateFinancialPeriodResult(calculationInput({
    'capex-including-lease': { value: 31.08, unit: 'currency', currency: 'SEK', scale: 'billions' },
  })), /CURRENCY_MISMATCH/);
  assert.throws(() => calculateFinancialPeriodResult(calculationInput({
    'diluted-shares': { value: 0, unit: 'shares', currency: null, scale: 'millions' },
  })), /INVALID_DIVISOR/);
  assert.throws(() => calculateFinancialPeriodResult(calculationInput({
    'capex-including-lease': { value: 31.08, unit: 'shares', currency: null, scale: 'billions' },
  })), /UNIT_MISMATCH/);
});

test('applies signed adjusted EBIT components and emits a deterministic calculation trace', () => {
  const firstInput = calculationInput();
  const first = calculateFinancialPeriodResult(firstInput);
  const second = calculateFinancialPeriodResult({ ...firstInput, inputs: [...firstInput.inputs].reverse() });

  assert.deepEqual(first.valuesByDefinitionId['ebit-adjusted'], { value: 19.48, ...usdBillions });
  assert.deepEqual(first.calculationTrace, second.calculationTrace);
  assert.deepEqual(
    first.calculationTrace.find(item => item.definitionId === 'fcf-primary')?.dependencyIds,
    ['operating-cash-flow', 'capex-including-lease'],
  );
});

test('rejects multiple definitions for one metric without a selection for the requested context', () => {
  assert.throws(() => calculateFinancialPeriodResult({
    ...calculationInput(),
    selections: selections.filter(selection => selection.context !== 'ntm'),
  }), /FCF_SELECTION_MISSING/);
});

test('exposes only the context-selected definition as the primary FCF value', () => {
  const result = calculateFinancialPeriodResult(calculationInput());
  assert.deepEqual(result.primaryValuesByMetric.revenue, {
    definitionId: 'revenue-reported',
    value: { value: 61_000, ...usdMillions },
  });
  assert.deepEqual(result.primaryValuesByMetric.free_cash_flow, {
    definitionId: 'fcf-primary',
    value: { value: 780, ...usdMillions },
  });
});
