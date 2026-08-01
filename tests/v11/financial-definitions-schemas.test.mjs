import assert from 'node:assert/strict';
import test from 'node:test';
import {
  EbitAdjustmentComponentSchema,
  FinancialDefinitionSchema,
  FinancialInputSchema,
  FinancialModelDefinitionSelectionSchema,
  FinancialValueSchema,
} from '../../src/lib/v11/financials/schemas.ts';

const reportedRevenue = {
  definitionId: 'revenue-reported',
  metric: 'revenue',
  name: 'Reported revenue',
  output: { unit: 'currency', currency: 'USD', scale: 'millions' },
  allowedPeriodKinds: ['quarter', 'fiscal-year'],
  calculationRule: 'reported-input',
  inputDefinitionIds: [],
  adjustmentComponents: [],
  rationale: 'Company-reported revenue.',
};

const netIncome = {
  definitionId: 'net-income',
  metric: 'net_income',
  name: 'Net income',
  output: { unit: 'currency', currency: 'USD', scale: 'millions' },
  allowedPeriodKinds: ['quarter', 'fiscal-year'],
  calculationRule: 'sum',
  inputDefinitionIds: ['ebit-reported', 'financial-result', 'tax'],
  adjustmentComponents: [],
  rationale: 'EBIT plus signed financial result and signed tax.',
};

test('accepts calculated definitions only when they use exact input definition IDs', () => {
  assert.equal(FinancialDefinitionSchema.safeParse(netIncome).success, true);
  assert.equal(FinancialDefinitionSchema.safeParse({ ...netIncome, inputDefinitionIds: [] }).success, false);
  assert.equal(FinancialDefinitionSchema.safeParse({ ...netIncome, inputDefinitionIds: ['net_income'] }).success, false);
  assert.equal(FinancialDefinitionSchema.safeParse(reportedRevenue).success, true);
  assert.equal(FinancialDefinitionSchema.safeParse({ ...reportedRevenue, inputDefinitionIds: ['revenue-other'] }).success, false);
});

test('keeps unit, currency and scale separate', () => {
  assert.equal(FinancialValueSchema.safeParse({
    value: 1.2, unit: 'currency', currency: 'SEK', scale: 'billions',
  }).success, true);
  assert.equal(FinancialValueSchema.safeParse({
    value: 1.2, unit: 'shares', currency: 'SEK', scale: 'millions',
  }).success, false);
  assert.equal(FinancialValueSchema.safeParse({
    value: 1.2, unit: 'currency-per-share', currency: null, scale: 'ones',
  }).success, false);
});

test('requires signed, evidenced adjusted EBIT components', () => {
  const adjustment = {
    adjustmentId: 'severance-cost',
    amount: { value: 1.18, unit: 'currency', currency: 'USD', scale: 'billions' },
    rationale: 'Severance expense treated as a separately disclosed adjustment.',
    evidenceIds: ['source-q2-page-12'],
    recurrenceAssessment: 'one-off',
  };
  assert.equal(EbitAdjustmentComponentSchema.safeParse(adjustment).success, true);
  assert.equal(EbitAdjustmentComponentSchema.safeParse({ ...adjustment, amount: { ...adjustment.amount, value: -2.4 } }).success, true);
  assert.equal(EbitAdjustmentComponentSchema.safeParse({ ...adjustment, rationale: '', evidenceIds: [] }).success, false);

  const adjustedEbit = {
    ...reportedRevenue,
    definitionId: 'ebit-adjusted',
    metric: 'ebit_adjusted',
    name: 'Adjusted EBIT',
    calculationRule: 'adjusted-ebit',
    inputDefinitionIds: ['ebit-reported'],
    adjustmentComponents: [adjustment],
  };
  assert.equal(FinancialDefinitionSchema.safeParse(adjustedEbit).success, true);
  assert.equal(FinancialDefinitionSchema.safeParse({ ...adjustedEbit, adjustmentComponents: [] }).success, false);
});

test('requires one primary definition and distinct controls in a generic selection', () => {
  const selection = {
    context: 'ntm',
    metric: 'free_cash_flow',
    primaryDefinitionId: 'fcf-including-lease',
    controlDefinitionIds: ['fcf-excluding-lease'],
    rationale: 'Includes finance-lease principal payments in the primary cash-flow view.',
  };
  assert.equal(FinancialModelDefinitionSelectionSchema.safeParse(selection).success, true);
  assert.equal(FinancialModelDefinitionSelectionSchema.safeParse({ ...selection, primaryDefinitionId: '' }).success, false);
  assert.equal(FinancialModelDefinitionSelectionSchema.safeParse({ ...selection, controlDefinitionIds: ['fcf-excluding-lease', 'fcf-excluding-lease'] }).success, false);
  assert.equal(FinancialModelDefinitionSelectionSchema.safeParse({ ...selection, controlDefinitionIds: ['fcf-including-lease'] }).success, false);
});

test('requires a source-backed input identified by exact definition ID', () => {
  assert.equal(FinancialInputSchema.safeParse({
    definitionId: 'revenue-reported',
    period: { kind: 'quarter', fiscalYear: 2026, fiscalQuarter: 3, startDate: '2026-07-01', endDate: '2026-09-30' },
    value: { value: 61, unit: 'currency', currency: 'USD', scale: 'billions' },
    dependencyIds: ['fact-q3-revenue'],
  }).success, true);
  assert.equal(FinancialInputSchema.safeParse({
    definitionId: '',
    period: { kind: 'quarter', fiscalYear: 2026, fiscalQuarter: 3, startDate: '2026-07-01', endDate: '2026-09-30' },
    value: { value: 61, unit: 'currency', currency: 'USD', scale: 'billions' },
    dependencyIds: [],
  }).success, false);
});
