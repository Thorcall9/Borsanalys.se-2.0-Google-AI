import { z } from 'zod';

export const IdSchema = z.string().uuid();
export const IsoTimestampSchema = z.string().datetime();
export const CurrencySchema = z.string().regex(/^[A-Z]{3}$/);

export const ApprovalStatusSchema = z.enum([
  'proposed',
  'in-review',
  'approved',
  'rejected',
  'superseded',
]);

export const ActorTypeSchema = z.enum(['ai', 'editor', 'system']);

export const VerificationStatusSchema = z.enum([
  'unverified',
  'source-located',
  'mathematically-validated',
  'manually-approved',
  'conflicting',
]);

export const ValueOriginSchema = z.enum([
  'reported',
  'calculated',
  'company-guidance',
  'consensus',
  'ai-proposed',
  'borsanalys-approved-estimate',
]);

export const PeriodSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('quarter'),
    fiscalYear: z.number().int(),
    fiscalQuarter: z.number().int().min(1).max(4),
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
  z.object({
    kind: z.literal('fiscal-year'),
    fiscalYear: z.number().int(),
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
  z.object({
    kind: z.literal('ltm'),
    asOfDate: z.string().date(),
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
  z.object({ kind: z.literal('point-in-time'), asOfDate: z.string().date() }),
]);

export const AuditMetadataSchema = z.object({
  id: IdSchema,
  analysisId: IdSchema,
  revision: z.number().int().positive(),
  schemaVersion: z.literal('11.0'),
  createdAt: IsoTimestampSchema,
  createdBy: z.object({ actorId: z.string().min(1), actorType: ActorTypeSchema }),
  approvalStatus: ApprovalStatusSchema,
  approvedAt: IsoTimestampSchema.nullable(),
  approvedBy: z.string().min(1).nullable(),
  approvalReason: z.string().min(1).nullable(),
  supersedesRevisionId: IdSchema.nullable(),
  dependencyIds: z.array(IdSchema).default([]),
}).superRefine((value, context) => {
  const hasApprovalMetadata = value.approvedAt !== null
    && value.approvedBy !== null
    && value.approvalReason !== null;

  if (value.approvalStatus === 'approved' && !hasApprovalMetadata) {
    context.addIssue({ code: 'custom', message: 'Approved revisions require approval metadata.' });
  }
  if (value.approvalStatus !== 'approved' && hasApprovalMetadata) {
    context.addIssue({ code: 'custom', message: 'Only approved revisions may contain approval metadata.' });
  }
});

export const SourceLocatorSchema = z.object({
  page: z.number().int().positive().nullable(),
  section: z.string().min(1).nullable(),
  quoteAnchor: z.string().min(1).nullable(),
}).nullable();

export const SourceSchema = z.object({
  sourceId: IdSchema,
  title: z.string().min(1),
  publisher: z.string().min(1),
  publishedDate: z.string().date(),
  canonicalUrl: z.string().url(),
  documentHash: z.string().regex(/^[a-f0-9]{64}$/),
  fetchedAt: IsoTimestampSchema,
  verificationStatus: VerificationStatusSchema,
  metadata: AuditMetadataSchema,
});

export const FinancialDataPointSchema = z.object({
  dataPointId: IdSchema,
  metric: z.string().min(1),
  value: z.number().finite(),
  unit: z.string().min(1),
  currency: CurrencySchema.nullable(),
  period: PeriodSchema,
  valueOrigin: ValueOriginSchema,
  sourceId: IdSchema,
  sourceLocator: SourceLocatorSchema,
  calculation: z.object({
    formulaId: z.string().min(1),
    inputDataPointIds: z.array(IdSchema).min(1),
  }).nullable(),
  verificationStatus: VerificationStatusSchema,
  metadata: AuditMetadataSchema,
}).superRefine((value, context) => {
  if (value.unit === 'percent' && (value.value < -1 || value.value > 1)) {
    context.addIssue({ code: 'custom', path: ['value'], message: 'Percentages must be decimal values.' });
  }
  if (value.valueOrigin === 'reported' && value.sourceLocator === null) {
    context.addIssue({ code: 'custom', path: ['sourceLocator'], message: 'Reported facts require a source locator.' });
  }
  if (value.valueOrigin === 'calculated' && value.calculation === null) {
    context.addIssue({ code: 'custom', path: ['calculation'], message: 'Calculated facts require calculation inputs.' });
  }
  if (value.valueOrigin !== 'calculated' && value.calculation !== null) {
    context.addIssue({ code: 'custom', path: ['calculation'], message: 'Only calculated facts may include calculation inputs.' });
  }
});

export const SnapshotMetadataSchema = z.object({
  snapshotId: IdSchema,
  parentSnapshotId: IdSchema.nullable(),
  schemaVersion: z.literal('11.0'),
  analysisModelVersion: z.literal('11.0.0'),
});

export type AuditMetadata = z.infer<typeof AuditMetadataSchema>;
export type FinancialDataPoint = z.infer<typeof FinancialDataPointSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type SnapshotMetadata = z.infer<typeof SnapshotMetadataSchema>;
