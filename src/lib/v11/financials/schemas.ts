import { z } from 'zod';
import { CurrencySchema, PeriodSchema } from '../schemas.ts';

export const FinancialMetricSchema = z.enum([
  'revenue',
  'ebit_reported',
  'ebit_adjusted',
  'financial_result',
  'tax',
  'net_income',
  'diluted_shares',
  'eps',
  'operating_cash_flow',
  'capex',
  'free_cash_flow',
  'fcf_per_share',
]);

export const FinancialUnitSchema = z.enum(['currency', 'shares', 'ratio', 'currency-per-share']);
export const FinancialScaleSchema = z.enum(['ones', 'thousands', 'millions', 'billions']);
export const CalculationRuleSchema = z.enum(['reported-input', 'sum', 'subtract', 'divide', 'adjusted-ebit']);
export const FinancialModelContextSchema = z.enum(['ntm', 'five-year']);

export const FinancialValueSchema = z.object({
  value: z.number().finite(),
  unit: FinancialUnitSchema,
  currency: CurrencySchema.nullable(),
  scale: FinancialScaleSchema,
}).superRefine((value, context) => {
  const currencyRequired = value.unit === 'currency' || value.unit === 'currency-per-share';
  if (currencyRequired !== (value.currency !== null)) {
    context.addIssue({ code: 'custom', message: 'UNIT_CURRENCY_MISMATCH' });
  }
});

export const EbitAdjustmentComponentSchema = z.object({
  adjustmentId: z.string().min(1),
  amount: FinancialValueSchema,
  rationale: z.string().min(1),
  evidenceIds: z.array(z.string().min(1)).min(1),
  recurrenceAssessment: z.enum(['one-off', 'recurring', 'uncertain']),
}).superRefine((component, context) => {
  if (component.amount.unit !== 'currency') {
    context.addIssue({ code: 'custom', path: ['amount', 'unit'], message: 'ADJUSTMENT_MUST_BE_CURRENCY' });
  }
});

const DefinitionOutputSchema = z.object({
  unit: FinancialUnitSchema,
  currency: CurrencySchema.nullable(),
  scale: FinancialScaleSchema,
}).superRefine((value, context) => {
  const currencyRequired = value.unit === 'currency' || value.unit === 'currency-per-share';
  if (currencyRequired !== (value.currency !== null)) {
    context.addIssue({ code: 'custom', message: 'UNIT_CURRENCY_MISMATCH' });
  }
});

export const FinancialDefinitionSchema = z.object({
  definitionId: z.string().min(1),
  metric: FinancialMetricSchema,
  name: z.string().min(1),
  output: DefinitionOutputSchema,
  allowedPeriodKinds: z.array(z.enum(['quarter', 'fiscal-year'])).min(1),
  calculationRule: CalculationRuleSchema,
  inputDefinitionIds: z.array(z.string().min(1)),
  adjustmentComponents: z.array(EbitAdjustmentComponentSchema),
  rationale: z.string().min(1),
}).superRefine((definition, context) => {
  if (definition.inputDefinitionIds.includes(definition.definitionId)) {
    context.addIssue({ code: 'custom', path: ['inputDefinitionIds'], message: 'SELF_REFERENCE' });
  }
  if (new Set(definition.inputDefinitionIds).size !== definition.inputDefinitionIds.length) {
    context.addIssue({ code: 'custom', path: ['inputDefinitionIds'], message: 'DUPLICATE_INPUT_DEFINITION' });
  }

  const inputCount = definition.inputDefinitionIds.length;
  const adjustmentCount = definition.adjustmentComponents.length;
  if (definition.calculationRule === 'reported-input' && (inputCount !== 0 || adjustmentCount !== 0)) {
    context.addIssue({ code: 'custom', message: 'REPORTED_INPUT_MUST_NOT_HAVE_DEPENDENCIES' });
  }
  if (definition.calculationRule === 'sum' && (inputCount < 2 || adjustmentCount !== 0)) {
    context.addIssue({ code: 'custom', message: 'SUM_INPUTS_INVALID' });
  }
  if ((definition.calculationRule === 'subtract' || definition.calculationRule === 'divide')
    && (inputCount !== 2 || adjustmentCount !== 0)) {
    context.addIssue({ code: 'custom', message: 'BINARY_INPUTS_INVALID' });
  }
  if (definition.calculationRule === 'adjusted-ebit' && (inputCount !== 1 || adjustmentCount < 1)) {
    context.addIssue({ code: 'custom', message: 'ADJUSTED_EBIT_INPUTS_INVALID' });
  }
  if (definition.calculationRule !== 'adjusted-ebit' && adjustmentCount !== 0) {
    context.addIssue({ code: 'custom', path: ['adjustmentComponents'], message: 'ADJUSTMENTS_ONLY_FOR_ADJUSTED_EBIT' });
  }
});

export const FinancialModelDefinitionSelectionSchema = z.object({
  context: FinancialModelContextSchema,
  metric: FinancialMetricSchema,
  primaryDefinitionId: z.string().min(1),
  controlDefinitionIds: z.array(z.string().min(1)),
  rationale: z.string().min(1),
}).superRefine((selection, context) => {
  if (new Set(selection.controlDefinitionIds).size !== selection.controlDefinitionIds.length) {
    context.addIssue({ code: 'custom', path: ['controlDefinitionIds'], message: 'DUPLICATE_CONTROL_DEFINITION' });
  }
  if (selection.controlDefinitionIds.includes(selection.primaryDefinitionId)) {
    context.addIssue({ code: 'custom', path: ['controlDefinitionIds'], message: 'PRIMARY_CONTROL_DUPLICATE' });
  }
});

export const FinancialInputSchema = z.object({
  definitionId: z.string().min(1),
  period: PeriodSchema,
  value: FinancialValueSchema,
  dependencyIds: z.array(z.string().min(1)).min(1),
});

export type FinancialMetric = z.infer<typeof FinancialMetricSchema>;
export type FinancialUnit = z.infer<typeof FinancialUnitSchema>;
export type FinancialScale = z.infer<typeof FinancialScaleSchema>;
export type FinancialValue = z.infer<typeof FinancialValueSchema>;
export type EbitAdjustmentComponent = z.infer<typeof EbitAdjustmentComponentSchema>;
export type FinancialDefinition = z.infer<typeof FinancialDefinitionSchema>;
export type FinancialModelContext = z.infer<typeof FinancialModelContextSchema>;
export type FinancialModelDefinitionSelection = z.infer<typeof FinancialModelDefinitionSelectionSchema>;
export type FinancialInput = z.infer<typeof FinancialInputSchema>;
