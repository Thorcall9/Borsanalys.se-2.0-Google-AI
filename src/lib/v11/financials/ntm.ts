import {
  calculateFinancialPeriodResult,
  divideFinancialValues,
  normalizeFinancialValue,
  type FinancialPeriodResult,
} from './calculate.ts';
import type { FinancialInput, FinancialValue } from './schemas.ts';

type PeriodCalculationInput = Parameters<typeof calculateFinancialPeriodResult>[0];

export type QuarterlyFinancialInputSet = {
  analysisId: string;
  companyId: string;
  modelRevisionId: string;
  periodInput: PeriodCalculationInput;
};

export type QuarterlyFinancialResult = QuarterlyFinancialInputSet & {
  result: FinancialPeriodResult;
};

export type NTMAggregationTraceItem = {
  metric: string;
  definitionId: string;
  aggregation: 'sum' | 'day-weighted-average' | 'divide';
  includedQuarters: FinancialInput['period'][];
  inputValues: FinancialValue[];
  output: FinancialValue;
};

export type NTMFinancialResult = {
  analysisId: string;
  companyId: string;
  modelRevisionId: string;
  primaryValuesByMetric: Record<string, { definitionId: string; value: FinancialValue }>;
  dilutedShares: FinancialValue;
  aggregationTrace: NTMAggregationTraceItem[];
};

export type NTMFinancialModel = {
  quarterlyResults: QuarterlyFinancialResult[];
  ntm: NTMFinancialResult;
};

export class NTMFinancialModelError extends Error {
  readonly code:
    | 'NTM_QUARTER_COUNT_INVALID'
    | 'NTM_DUPLICATE_QUARTER'
    | 'NTM_QUARTER_SEQUENCE_GAP'
    | 'NTM_ANALYSIS_MISMATCH'
    | 'NTM_COMPANY_MISMATCH'
    | 'NTM_MODEL_REVISION_MISMATCH'
    | 'NTM_PRIMARY_DEFINITION_MISMATCH'
    | 'NTM_METRIC_SET_MISMATCH'
    | 'NTM_SHARE_COUNT_INVALID';

  constructor(code: NTMFinancialModelError['code']) {
    super(code);
    this.name = 'NTMFinancialModelError';
    this.code = code;
  }
}

function compareQuarter(left: QuarterlyFinancialInputSet, right: QuarterlyFinancialInputSet): number {
  const leftPeriod = left.periodInput.period;
  const rightPeriod = right.periodInput.period;
  if (leftPeriod.kind !== 'quarter' || rightPeriod.kind !== 'quarter') {
    throw new NTMFinancialModelError('NTM_QUARTER_SEQUENCE_GAP');
  }
  return leftPeriod.fiscalYear - rightPeriod.fiscalYear || leftPeriod.fiscalQuarter - rightPeriod.fiscalQuarter;
}

function quarterKey(period: FinancialInput['period']): string {
  if (period.kind !== 'quarter') throw new NTMFinancialModelError('NTM_QUARTER_SEQUENCE_GAP');
  return `${period.fiscalYear}-Q${period.fiscalQuarter}`;
}

function isNextQuarter(previous: FinancialInput['period'], next: FinancialInput['period']): boolean {
  if (previous.kind !== 'quarter' || next.kind !== 'quarter') return false;
  const expectedYear = previous.fiscalQuarter === 4 ? previous.fiscalYear + 1 : previous.fiscalYear;
  const expectedQuarter = previous.fiscalQuarter === 4 ? 1 : previous.fiscalQuarter + 1;
  return next.fiscalYear === expectedYear && next.fiscalQuarter === expectedQuarter;
}

function daysInclusive(period: FinancialInput['period']): number {
  if (period.kind !== 'quarter') throw new NTMFinancialModelError('NTM_QUARTER_SEQUENCE_GAP');
  const start = Date.parse(`${period.startDate}T00:00:00Z`);
  const end = Date.parse(`${period.endDate}T00:00:00Z`);
  return Math.floor((end - start) / 86_400_000) + 1;
}

function sumValues(values: FinancialValue[]): FinancialValue {
  const output = values[0];
  return {
    ...output,
    value: values.reduce((total, value) => total + normalizeFinancialValue(value, output).value, 0),
  };
}

function weightedShares(values: Array<{ value: FinancialValue; days: number }>): FinancialValue {
  const output = values[0].value;
  const totalDays = values.reduce((total, item) => total + item.days, 0);
  const weightedValue = values.reduce((total, item) => (
    total + normalizeFinancialValue(item.value, output).value * item.days
  ), 0) / totalDays;
  if (weightedValue <= 0) throw new NTMFinancialModelError('NTM_SHARE_COUNT_INVALID');
  return { ...output, value: weightedValue };
}

function assertSameIdentity(quarters: QuarterlyFinancialInputSet[]): void {
  const first = quarters[0];
  for (const quarter of quarters.slice(1)) {
    if (quarter.analysisId !== first.analysisId) throw new NTMFinancialModelError('NTM_ANALYSIS_MISMATCH');
    if (quarter.companyId !== first.companyId) throw new NTMFinancialModelError('NTM_COMPANY_MISMATCH');
    if (quarter.modelRevisionId !== first.modelRevisionId) throw new NTMFinancialModelError('NTM_MODEL_REVISION_MISMATCH');
  }
}

function assertQuarterSequence(quarters: QuarterlyFinancialInputSet[]): QuarterlyFinancialInputSet[] {
  if (quarters.length !== 4) throw new NTMFinancialModelError('NTM_QUARTER_COUNT_INVALID');
  const sorted = [...quarters].sort(compareQuarter);
  const seen = new Set<string>();
  for (const quarter of sorted) {
    const key = quarterKey(quarter.periodInput.period);
    if (seen.has(key)) throw new NTMFinancialModelError('NTM_DUPLICATE_QUARTER');
    seen.add(key);
  }
  for (let index = 1; index < sorted.length; index += 1) {
    if (!isNextQuarter(sorted[index - 1].periodInput.period, sorted[index].periodInput.period)) {
      throw new NTMFinancialModelError('NTM_QUARTER_SEQUENCE_GAP');
    }
  }
  return sorted;
}

export function calculateNTMFinancialModel(input: { quarters: QuarterlyFinancialInputSet[] }): NTMFinancialModel {
  const sortedQuarters = assertQuarterSequence(input.quarters);
  assertSameIdentity(sortedQuarters);
  const quarterlyResults = sortedQuarters.map(quarter => ({
    ...quarter,
    result: calculateFinancialPeriodResult(quarter.periodInput),
  }));

  const first = quarterlyResults[0];
  const metricNames = Object.keys(first.result.primaryValuesByMetric).sort();
  for (const quarterlyResult of quarterlyResults.slice(1)) {
    const candidateMetrics = Object.keys(quarterlyResult.result.primaryValuesByMetric).sort();
    if (JSON.stringify(candidateMetrics) !== JSON.stringify(metricNames)) {
      throw new NTMFinancialModelError('NTM_METRIC_SET_MISMATCH');
    }
    for (const metric of metricNames) {
      if (quarterlyResult.result.primaryValuesByMetric[metric].definitionId
        !== first.result.primaryValuesByMetric[metric].definitionId) {
        throw new NTMFinancialModelError('NTM_PRIMARY_DEFINITION_MISMATCH');
      }
    }
  }

  const includedQuarters = quarterlyResults.map(result => result.periodInput.period);
  const primaryValuesByMetric: NTMFinancialResult['primaryValuesByMetric'] = {};
  const aggregationTrace: NTMAggregationTraceItem[] = [];
  const perShareMetrics = new Set(['eps', 'fcf_per_share']);

  for (const metric of metricNames) {
    if (metric === 'diluted_shares' || perShareMetrics.has(metric)) continue;
    const values = quarterlyResults.map(result => result.result.primaryValuesByMetric[metric].value);
    const definitionId = first.result.primaryValuesByMetric[metric].definitionId;
    const output = sumValues(values);
    primaryValuesByMetric[metric] = { definitionId, value: output };
    aggregationTrace.push({ metric, definitionId, aggregation: 'sum', includedQuarters, inputValues: values, output });
  }

  const shareDefinitionId = first.result.primaryValuesByMetric.diluted_shares?.definitionId;
  if (!shareDefinitionId) throw new NTMFinancialModelError('NTM_METRIC_SET_MISMATCH');
  const sharesWithDays = quarterlyResults.map(result => ({
    value: result.result.primaryValuesByMetric.diluted_shares.value,
    days: daysInclusive(result.periodInput.period),
  }));
  const dilutedShares = weightedShares(sharesWithDays);
  primaryValuesByMetric.diluted_shares = { definitionId: shareDefinitionId, value: dilutedShares };
  aggregationTrace.push({
    metric: 'diluted_shares', definitionId: shareDefinitionId, aggregation: 'day-weighted-average',
    includedQuarters, inputValues: sharesWithDays.map(item => item.value), output: dilutedShares,
  });

  for (const [metric, numeratorMetric] of [['eps', 'net_income'], ['fcf_per_share', 'free_cash_flow']] as const) {
    const definitionId = first.result.primaryValuesByMetric[metric]?.definitionId;
    const numerator = primaryValuesByMetric[numeratorMetric]?.value;
    if (!definitionId || !numerator) throw new NTMFinancialModelError('NTM_METRIC_SET_MISMATCH');
    const outputTemplate = first.result.primaryValuesByMetric[metric].value;
    const output = divideFinancialValues(numerator, dilutedShares, outputTemplate);
    primaryValuesByMetric[metric] = { definitionId, value: output };
    aggregationTrace.push({
      metric, definitionId, aggregation: 'divide', includedQuarters,
      inputValues: [numerator, dilutedShares], output,
    });
  }

  return {
    quarterlyResults,
    ntm: {
      analysisId: first.analysisId,
      companyId: first.companyId,
      modelRevisionId: first.modelRevisionId,
      primaryValuesByMetric,
      dilutedShares,
      aggregationTrace,
    },
  };
}
