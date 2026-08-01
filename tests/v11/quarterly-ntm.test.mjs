import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateNTMFinancialModel } from '../../src/lib/v11/financials/ntm.ts';

const usdMillions = { unit: 'currency', currency: 'USD', scale: 'millions' };
const usdBillions = { unit: 'currency', currency: 'USD', scale: 'billions' };
const sharesMillions = { unit: 'shares', currency: null, scale: 'millions' };
const usdPerShare = { unit: 'currency-per-share', currency: 'USD', scale: 'ones' };

function reported(definitionId, metric, output) {
  return {
    definitionId, metric, name: definitionId, output,
    allowedPeriodKinds: ['quarter'], calculationRule: 'reported-input',
    inputDefinitionIds: [], adjustmentComponents: [], rationale: 'Reported input.',
  };
}

const definitions = [
  reported('revenue', 'revenue', usdMillions),
  reported('ebit', 'ebit_reported', usdMillions),
  { definitionId: 'ebit-adjusted', metric: 'ebit_adjusted', name: 'Adjusted EBIT', output: usdMillions, allowedPeriodKinds: ['quarter'], calculationRule: 'adjusted-ebit', inputDefinitionIds: ['ebit'], adjustmentComponents: [{ adjustmentId: 'severance', amount: { value: 100, ...usdMillions }, rationale: 'Severance.', evidenceIds: ['source-severance'], recurrenceAssessment: 'one-off' }], rationale: 'Reported EBIT adjusted by disclosed severance.' },
  reported('financial-result', 'financial_result', usdMillions),
  reported('tax', 'tax', usdMillions),
  { definitionId: 'net-income', metric: 'net_income', name: 'Net income', output: usdMillions, allowedPeriodKinds: ['quarter'], calculationRule: 'sum', inputDefinitionIds: ['ebit', 'financial-result', 'tax'], adjustmentComponents: [], rationale: 'EBIT plus financial result and tax.' },
  reported('diluted-shares', 'diluted_shares', sharesMillions),
  { definitionId: 'eps', metric: 'eps', name: 'EPS', output: usdPerShare, allowedPeriodKinds: ['quarter'], calculationRule: 'divide', inputDefinitionIds: ['net-income', 'diluted-shares'], adjustmentComponents: [], rationale: 'Net income per diluted share.' },
  reported('operating-cash-flow', 'operating_cash_flow', usdMillions),
  reported('capex-including-lease', 'capex', usdMillions),
  reported('capex-excluding-lease', 'capex', usdMillions),
  { definitionId: 'fcf-including-lease', metric: 'free_cash_flow', name: 'FCF incl lease', output: usdMillions, allowedPeriodKinds: ['quarter'], calculationRule: 'subtract', inputDefinitionIds: ['operating-cash-flow', 'capex-including-lease'], adjustmentComponents: [], rationale: 'CFO minus capex including leases.' },
  { definitionId: 'fcf-excluding-lease', metric: 'free_cash_flow', name: 'FCF excl lease', output: usdMillions, allowedPeriodKinds: ['quarter'], calculationRule: 'subtract', inputDefinitionIds: ['operating-cash-flow', 'capex-excluding-lease'], adjustmentComponents: [], rationale: 'CFO minus capex excluding leases.' },
  { definitionId: 'fcf-per-share', metric: 'fcf_per_share', name: 'FCF per share', output: usdPerShare, allowedPeriodKinds: ['quarter'], calculationRule: 'divide', inputDefinitionIds: ['fcf-including-lease', 'diluted-shares'], adjustmentComponents: [], rationale: 'Primary FCF per diluted share.' },
];

function selections(primaryDefinitionId = 'fcf-including-lease') {
  const controlDefinitionId = primaryDefinitionId === 'fcf-including-lease' ? 'fcf-excluding-lease' : 'fcf-including-lease';
  return [
    { context: 'ntm', metric: 'capex', primaryDefinitionId: primaryDefinitionId === 'fcf-including-lease' ? 'capex-including-lease' : 'capex-excluding-lease', controlDefinitionIds: [primaryDefinitionId === 'fcf-including-lease' ? 'capex-excluding-lease' : 'capex-including-lease'], rationale: 'Reviewed capex definition.' },
    { context: 'five-year', metric: 'capex', primaryDefinitionId: 'capex-including-lease', controlDefinitionIds: ['capex-excluding-lease'], rationale: 'Reviewed capex definition.' },
    { context: 'ntm', metric: 'free_cash_flow', primaryDefinitionId, controlDefinitionIds: [controlDefinitionId], rationale: 'Reviewed FCF definition.' },
    { context: 'five-year', metric: 'free_cash_flow', primaryDefinitionId, controlDefinitionIds: [controlDefinitionId], rationale: 'Reviewed FCF definition.' },
  ];
}

function quarter(fiscalYear, fiscalQuarter) {
  const starts = ['01-01', '04-01', '07-01', '10-01'];
  const ends = ['03-31', '06-30', '09-30', '12-31'];
  return { kind: 'quarter', fiscalYear, fiscalQuarter, startDate: `${fiscalYear}-${starts[fiscalQuarter - 1]}`, endDate: `${fiscalYear}-${ends[fiscalQuarter - 1]}` };
}

function quarterlySet(fiscalYear, fiscalQuarter, overrides = {}) {
  const period = quarter(fiscalYear, fiscalQuarter);
  const offset = fiscalQuarter - 1;
  const values = {
    revenue: { value: 60_000 + offset * 1_000, ...usdMillions },
    ebit: { value: 20_000 + offset * 500, ...usdMillions },
    'financial-result': { value: -200, ...usdMillions },
    tax: { value: -3_000, ...usdMillions },
    'diluted-shares': { value: 2_500 + offset * 10, ...sharesMillions },
    'operating-cash-flow': { value: 30_000 + offset * 500, ...usdMillions },
    'capex-including-lease': { value: 28_000 + offset * 250, ...usdMillions },
    'capex-excluding-lease': { value: 25_000 + offset * 250, ...usdMillions },
    ...overrides.values,
  };
  return {
    analysisId: overrides.analysisId ?? 'meta-analysis',
    companyId: overrides.companyId ?? 'meta',
    modelRevisionId: overrides.modelRevisionId ?? 'financial-model-revision-1',
    periodInput: {
      period, context: 'ntm', definitions: overrides.definitions ?? definitions,
      selections: overrides.selections ?? selections(),
      inputs: Object.entries(values).map(([definitionId, value]) => ({
        definitionId, period, value, dependencyIds: [`source-${fiscalYear}-q${fiscalQuarter}-${definitionId}`],
      })),
    },
  };
}

function fourQuarters() {
  return [quarterlySet(2026, 3), quarterlySet(2026, 4), quarterlySet(2027, 1), quarterlySet(2027, 2)];
}

test('accepts four contiguous quarters and calculates an NTM result from FinancialPeriodResult values', () => {
  const result = calculateNTMFinancialModel({ quarters: fourQuarters() });
  assert.equal(result.quarterlyResults.length, 4);
  assert.deepEqual(result.ntm.primaryValuesByMetric.revenue.value, { value: 246_000, ...usdMillions });
  assert.deepEqual(result.ntm.primaryValuesByMetric.free_cash_flow.value, { value: 9_500, ...usdMillions });
  assert.ok(Math.abs(result.ntm.primaryValuesByMetric.eps.value.value - (result.ntm.primaryValuesByMetric.net_income.value.value / result.ntm.dilutedShares.value)) < 1e-12);
  assert.ok(Math.abs(result.ntm.primaryValuesByMetric.fcf_per_share.value.value - (result.ntm.primaryValuesByMetric.free_cash_flow.value.value / result.ntm.dilutedShares.value)) < 1e-12);
});

test('uses a day-weighted diluted-share measure and rejects non-positive share counts', () => {
  const result = calculateNTMFinancialModel({ quarters: fourQuarters() });
  const expectedDilutedShares = (
    2_520 * 92
    + 2_530 * 92
    + 2_500 * 90
    + 2_510 * 91
  ) / (92 + 92 + 90 + 91);
  assert.equal(result.ntm.dilutedShares.value, expectedDilutedShares);

  const quarters = fourQuarters();
  assert.throws(() => calculateNTMFinancialModel({
    quarters: [{
      ...quarters[0],
      periodInput: {
        ...quarters[0].periodInput,
        inputs: quarters[0].periodInput.inputs.map(input => input.definitionId === 'diluted-shares'
          ? { ...input, value: { ...input.value, value: 0 } }
          : input),
      },
    }, ...quarters.slice(1)],
  }), /INVALID_DIVISOR/);
});

test('rejects fewer or more than four quarters, duplicates and gaps', () => {
  const quarters = fourQuarters();
  assert.throws(() => calculateNTMFinancialModel({ quarters: quarters.slice(0, 3) }), /NTM_QUARTER_COUNT_INVALID/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [...quarters, quarterlySet(2027, 3)] }), /NTM_QUARTER_COUNT_INVALID/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [quarters[0], quarters[0], quarters[2], quarters[3]] }), /NTM_DUPLICATE_QUARTER/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [quarters[0], quarters[1], quarters[3], quarterlySet(2027, 3)] }), /NTM_QUARTER_SEQUENCE_GAP/);
});

test('rejects mixed analyses, companies, model revisions and primary definitions', () => {
  const quarters = fourQuarters();
  assert.throws(() => calculateNTMFinancialModel({ quarters: [{ ...quarters[0], analysisId: 'other-analysis' }, ...quarters.slice(1)] }), /NTM_ANALYSIS_MISMATCH/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [{ ...quarters[0], companyId: 'other-company' }, ...quarters.slice(1)] }), /NTM_COMPANY_MISMATCH/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [{ ...quarters[0], modelRevisionId: 'revision-2' }, ...quarters.slice(1)] }), /NTM_MODEL_REVISION_MISMATCH/);
  assert.throws(() => calculateNTMFinancialModel({ quarters: [quarters[0], quarters[1], { ...quarters[2], periodInput: { ...quarters[2].periodInput, selections: selections('fcf-excluding-lease') } }, quarters[3]] }), /NTM_PRIMARY_DEFINITION_MISMATCH/);
});

test('rejects a mixed-currency NTM model after each quarter has been calculated safely', () => {
  const sekDefinitions = definitions.map(definition => ({
    ...definition,
    output: definition.output.currency === null ? definition.output : { ...definition.output, currency: 'SEK' },
    adjustmentComponents: definition.adjustmentComponents.map(component => ({
      ...component,
      amount: component.amount.currency === null ? component.amount : { ...component.amount, currency: 'SEK' },
    })),
  }));
  const sekQuarter = quarterlySet(2027, 1, { definitions: sekDefinitions });
  sekQuarter.periodInput.inputs = sekQuarter.periodInput.inputs.map(item => ({
    ...item,
    value: item.value.currency === null ? item.value : { ...item.value, currency: 'SEK' },
  }));
  const quarters = fourQuarters();
  assert.throws(() => calculateNTMFinancialModel({ quarters: [quarters[0], quarters[1], sekQuarter, quarters[3]] }), /CURRENCY_MISMATCH/);
});

test('preserves period traces, creates deterministic aggregation trace and ignores input order', () => {
  const first = calculateNTMFinancialModel({ quarters: fourQuarters() });
  const second = calculateNTMFinancialModel({ quarters: [...fourQuarters()].reverse() });
  assert.equal(first.quarterlyResults.every(result => result.result.calculationTrace.length > 0), true);
  assert.deepEqual(first.ntm.aggregationTrace, second.ntm.aggregationTrace);
  assert.deepEqual(first.ntm.primaryValuesByMetric, second.ntm.primaryValuesByMetric);
  assert.equal(first.ntm.primaryValuesByMetric.free_cash_flow.definitionId, 'fcf-including-lease');
  assert.equal(first.ntm.primaryValuesByMetric.free_cash_flow.value.value, 9_500);
});
