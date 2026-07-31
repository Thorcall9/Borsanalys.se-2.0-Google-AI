# V11 Fas 2.1 — Shared Financial Definitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a reusable, source-safe financial-definition layer that calculates one fully traceable financial period without adding a database migration or company-specific engine logic.

**Architecture:** Add pure TypeScript modules under `src/lib/v11/financials`. Definitions identify exact input definitions by ID, a directed graph validates dependencies before calculation, and a model-selection contract chooses primary/control definitions per model context. Existing `V11ObjectRevision` payloads and approval services retain all persistence and editorial control.

**Tech Stack:** TypeScript 5.8, Zod 4, Node built-in test runner, existing v11 schemas/revision services.

## Global Constraints

- Do not modify Prisma schema, migrations, snapshots, repository append-only APIs or existing Phase 1 contracts.
- Do not build NTM, five-year, scenario, valuation, KPI, thesis, trigger, report comparison, editorial action, AI or UI behavior.
- Store unit, currency and scale separately; normalize scale only within equal unit and currency; never convert currencies.
- Use exact `inputDefinitionIds` for calculated definitions; reject all direct and indirect dependency cycles.
- Treat adjusted EBIT as a calculated observation with signed, evidenced adjustment components.
- A `FinancialDefinition` never has a permanent primary flag; selections are separate versioned model configuration objects.
- No Meta-specific code. Meta remains future configuration-only test data.

---

### Task 1: Define financial value, definition and selection contracts

**Files:**
- Create: `src/lib/v11/financials/schemas.ts`
- Test: `tests/v11/financial-definitions-schemas.test.mjs`

**Interfaces:**
- Produces `FinancialValueSchema`, `FinancialDefinitionSchema`, `EbitAdjustmentComponentSchema`, `FinancialModelDefinitionSelectionSchema`, `FinancialMetricSchema`, `FinancialModelContextSchema` and inferred types.
- Consumes `PeriodSchema`, `IdSchema` and `ScenarioSchema` only when required from `src/lib/v11/schemas.ts`.

- [ ] **Step 1: Write failing contract tests.**

```js
test('requires calculated definitions to use exact input definition IDs', () => {
  assert.equal(FinancialDefinitionSchema.safeParse({
    ...netIncomeDefinition,
    inputDefinitionIds: ['ebit-reported', 'financial-result', 'tax'],
  }).success, true);
  assert.equal(FinancialDefinitionSchema.safeParse({
    ...netIncomeDefinition,
    inputDefinitionIds: [],
  }).success, false);
});

test('keeps unit, currency and scale separate', () => {
  assert.equal(FinancialValueSchema.safeParse({
    value: 1.2, unit: 'currency', currency: 'SEK', scale: 'billions',
  }).success, true);
  assert.equal(FinancialValueSchema.safeParse({
    value: 1.2, unit: 'shares', currency: 'SEK', scale: 'millions',
  }).success, false);
});

test('requires complete signed adjusted EBIT components', () => {
  assert.equal(EbitAdjustmentComponentSchema.safeParse({
    adjustmentId: randomUUID(), amount: { value: 1.18, unit: 'currency', currency: 'USD', scale: 'billions' },
    rationale: 'Severance expense', evidenceIds: [randomUUID()], recurrenceAssessment: 'one-off',
  }).success, true);
  assert.equal(EbitAdjustmentComponentSchema.safeParse({
    adjustmentId: randomUUID(), amount: { value: 1.18, unit: 'currency', currency: 'USD', scale: 'billions' },
    rationale: '', evidenceIds: [], recurrenceAssessment: 'one-off',
  }).success, false);
});
```

- [ ] **Step 2: Run the contract test to verify it is red.**

Run: `node --experimental-strip-types --test tests/v11/financial-definitions-schemas.test.mjs`

Expected: FAIL because `src/lib/v11/financials/schemas.ts` does not exist.

- [ ] **Step 3: Implement the smallest valid schemas.**

```ts
export const FinancialUnitSchema = z.enum(['currency', 'shares', 'ratio', 'currency-per-share']);
export const FinancialScaleSchema = z.enum(['ones', 'thousands', 'millions', 'billions']);

export const FinancialValueSchema = z.object({
  value: z.number().finite(), unit: FinancialUnitSchema,
  currency: CurrencySchema.nullable(), scale: FinancialScaleSchema,
}).superRefine((value, ctx) => {
  const currencyRequired = value.unit === 'currency' || value.unit === 'currency-per-share';
  if (currencyRequired !== (value.currency !== null)) ctx.addIssue({ code: 'custom', message: 'UNIT_CURRENCY_MISMATCH' });
});
```

Implement the definition rule cardinalities and selection contract. Add `adjustmentComponents` to `FinancialDefinitionSchema`: it must be empty except for `adjusted-ebit`, where it must contain one or more valid signed `EbitAdjustmentComponent` values. A selection has one `primaryDefinitionId`, an array of unique `controlDefinitionIds`, `context`, `metric` and non-empty `rationale`.

- [ ] **Step 4: Verify the contract and typecheck.**

Run: `node --experimental-strip-types --test tests/v11/financial-definitions-schemas.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit the isolated contracts.**

```bash
git add src/lib/v11/financials/schemas.ts tests/v11/financial-definitions-schemas.test.mjs
git commit -m "feat(v11): define shared financial contracts"
```

### Task 2: Validate definitions and their dependency graph

**Files:**
- Create: `src/lib/v11/financials/definitions.ts`
- Create: `tests/v11/financial-definition-graph.test.mjs`

**Interfaces:**
- Consumes `FinancialDefinition` from Task 1.
- Produces `validateDefinitionGraph(definitions: FinancialDefinition[]): Map<string, FinancialDefinition>` and `FinancialDefinitionError`.

- [ ] **Step 1: Write failing graph tests.**

```js
test('accepts a valid definition-ID graph', () => {
  const graph = validateDefinitionGraph([revenue, ebit, financialResult, tax, netIncome]);
  assert.equal(graph.get('net-income')?.inputDefinitionIds[0], 'ebit-reported');
});

test('rejects unknown, direct and indirect definition cycles', () => {
  assert.throws(() => validateDefinitionGraph([{ ...netIncome, inputDefinitionIds: ['missing', 'tax'] }]), /UNKNOWN_INPUT_DEFINITION/);
  assert.throws(() => validateDefinitionGraph([{ ...netIncome, inputDefinitionIds: ['net-income', 'tax'] }]), /DEFINITION_CYCLE/);
  assert.throws(() => validateDefinitionGraph([aDependsOnB, bDependsOnC, cDependsOnA]), /DEFINITION_CYCLE/);
});
```

- [ ] **Step 2: Run the graph test to verify it is red.**

Run: `node --experimental-strip-types --test tests/v11/financial-definition-graph.test.mjs`

Expected: FAIL because `validateDefinitionGraph` does not exist.

- [ ] **Step 3: Implement deterministic graph validation.**

```ts
export function validateDefinitionGraph(definitions: FinancialDefinition[]) {
  const byId = new Map(definitions.map(definition => [definition.definitionId, definition]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string): void => {
    if (visiting.has(id)) throw new FinancialDefinitionError('DEFINITION_CYCLE');
    if (visited.has(id)) return;
    const definition = byId.get(id);
    if (!definition) throw new FinancialDefinitionError('UNKNOWN_INPUT_DEFINITION');
    visiting.add(id);
    definition.inputDefinitionIds.forEach(visit);
    visiting.delete(id);
    visited.add(id);
  };
  definitions.forEach(definition => visit(definition.definitionId));
  return byId;
}
```

Also reject duplicate definition IDs before traversing the graph.

- [ ] **Step 4: Verify graph tests and existing v11 tests.**

Run: `node --experimental-strip-types --test tests/v11/financial-definition-graph.test.mjs tests/v11/schemas.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit the graph validator.**

```bash
git add src/lib/v11/financials/definitions.ts tests/v11/financial-definition-graph.test.mjs
git commit -m "feat(v11): validate financial definition graphs"
```

### Task 3: Resolve generic primary and control selections

**Files:**
- Create: `src/lib/v11/financials/selections.ts`
- Create: `tests/v11/financial-definition-selections.test.mjs`

**Interfaces:**
- Consumes approved `FinancialDefinition[]` and `FinancialModelDefinitionSelection[]` from Task 1.
- Produces `resolveDefinitionSelections(input): { selectionsByContextMetric: Map<string, ResolvedSelection>; warnings: string[] }`.

- [ ] **Step 1: Write failing selection tests.**

```js
test('requires one known primary FCF definition per model context', () => {
  const result = resolveDefinitionSelections({ definitions: [fcfIncludingLease, fcfExcludingLease], selections: [ntmFcf, fiveYearFcf] });
  assert.equal(result.selectionsByContextMetric.get('ntm:free_cash_flow')?.primaryDefinitionId, fcfIncludingLease.definitionId);
  assert.throws(() => resolveDefinitionSelections({ definitions: [fcfIncludingLease], selections: [ntmFcf] }), /FCF_SELECTION_MISSING/);
});

test('rejects duplicate, unknown and mixed selections', () => {
  assert.throws(() => resolveDefinitionSelections({ definitions, selections: [ntmFcf, { ...ntmFcf, primaryDefinitionId: otherFcf.definitionId }] }), /DUPLICATE_SELECTION/);
  assert.throws(() => resolveDefinitionSelections({ definitions, selections: [{ ...ntmFcf, primaryDefinitionId: 'unknown' }] }), /UNKNOWN_SELECTION_DEFINITION/);
  assert.throws(() => resolveDefinitionSelections({ definitions, selections: [{ ...ntmFcf, controlDefinitionIds: [ntmFcf.primaryDefinitionId] }] }), /PRIMARY_CONTROL_DUPLICATE/);
});

test('warns when NTM and five-year use different FCF definitions', () => {
  const result = resolveDefinitionSelections({ definitions, selections: [ntmFcf, { ...fiveYearFcf, primaryDefinitionId: fcfExcludingLease.definitionId }] });
  assert.deepEqual(result.warnings, ['FCF_DEFINITION_COMPARABILITY_WARNING']);
});
```

- [ ] **Step 2: Run the selection test to verify it is red.**

Run: `node --experimental-strip-types --test tests/v11/financial-definition-selections.test.mjs`

Expected: FAIL because `resolveDefinitionSelections` does not exist.

- [ ] **Step 3: Implement generic resolver and FCF completeness rule.**

Use `context + ':' + metric` as the deterministic selection key. Validate every primary/control ID against the definition map, metric equality and duplicate IDs. Require `free_cash_flow` selections for both `ntm` and `five-year`; keep this completeness requirement separate from the generic selection model.

- [ ] **Step 4: Verify selection tests.**

Run: `node --experimental-strip-types --test tests/v11/financial-definition-selections.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit the selection resolver.**

```bash
git add src/lib/v11/financials/selections.ts tests/v11/financial-definition-selections.test.mjs
git commit -m "feat(v11): select primary financial definitions by context"
```

### Task 4: Calculate one traceable financial period

**Files:**
- Create: `src/lib/v11/financials/calculate.ts`
- Create: `tests/v11/financial-period-result.test.mjs`

**Interfaces:**
- Consumes graph map from Task 2, resolved selections from Task 3 and source/estimate values keyed by definition ID.
- Produces `calculateFinancialPeriodResult(input): FinancialPeriodResult`.

- [ ] **Step 1: Write failing calculation tests.**

```js
test('normalizes compatible scales and derives net income, EPS, FCF and FCF per share', () => {
  const result = calculateFinancialPeriodResult(periodInput({
    operatingCashFlow: { value: 31_860, unit: 'currency', currency: 'USD', scale: 'millions' },
    capex: { value: 31.08, unit: 'currency', currency: 'USD', scale: 'billions' },
    dilutedShares: { value: 2.4, unit: 'shares', currency: null, scale: 'billions' },
  }));
  assert.equal(result.valuesByDefinitionId['fcf-primary'].value, 780);
  assert.equal(result.valuesByDefinitionId['fcf-primary'].scale, 'millions');
});

test('rejects incompatible currency, unit and denominator', () => {
  assert.throws(() => calculateFinancialPeriodResult(periodInput({ capex: { value: 31, unit: 'currency', currency: 'SEK', scale: 'billions' } })), /CURRENCY_MISMATCH/);
  assert.throws(() => calculateFinancialPeriodResult(periodInput({ dilutedShares: { value: 0, unit: 'shares', currency: null, scale: 'millions' } })), /INVALID_DIVISOR/);
});

test('applies signed adjusted EBIT components and emits deterministic trace', () => {
  const first = calculateFinancialPeriodResult(adjustedEbitInput);
  const second = calculateFinancialPeriodResult(reverseInputOrder(adjustedEbitInput));
  assert.equal(first.valuesByDefinitionId['ebit-adjusted'].value, 22.4);
  assert.deepEqual(first.calculationTrace, second.calculationTrace);
  assert.deepEqual(first.calculationTrace.find(item => item.definitionId === 'fcf-primary')?.dependencyIds, ['operating-cash-flow', 'capex-including-lease']);
});
```

- [ ] **Step 2: Run the calculation test to verify it is red.**

Run: `node --experimental-strip-types --test tests/v11/financial-period-result.test.mjs`

Expected: FAIL because `calculateFinancialPeriodResult` does not exist.

- [ ] **Step 3: Implement the pure calculation engine.**

Normalize each compatible input to the definition output scale before applying `sum`, `subtract`, `divide` or `adjusted-ebit`. Topologically sort definitions by ID as a deterministic tie-break. For every produced value, append a trace item containing definition ID, rule, normalized input values and direct dependency IDs. Reject values sharing a metric without a resolved selection when a consumer asks for that metric.

- [ ] **Step 4: Verify calculation and full v11 suite.**

Run: `node --experimental-strip-types --test tests/v11/*.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit period calculation.**

```bash
git add src/lib/v11/financials/calculate.ts tests/v11/financial-period-result.test.mjs
git commit -m "feat(v11): calculate traceable financial period results"
```

### Task 5: Connect approved revisions without persistence changes

**Files:**
- Create: `src/lib/v11/financials/configuration.ts`
- Create: `tests/v11/financial-definition-approval.test.mjs`

**Interfaces:**
- Consumes `approveRevision`, `createRevision`, schemas and resolver from Tasks 1–4.
- Produces `createFinancialModelConfigurationRevision` and `approveFinancialModelConfiguration`.

- [ ] **Step 1: Write failing approval tests.**

```js
test('changing a primary definition creates a proposed revision', () => {
  const next = createFinancialModelConfigurationRevision(approvedConfiguration, {
    primaryDefinitionId: 'fcf-excluding-finance-lease-principal',
  });
  assert.equal(next.metadata.approvalStatus, 'proposed');
  assert.equal(next.metadata.supersedesRevisionId, approvedConfiguration.metadata.id);
});

test('rejects AI approval and unapproved definition dependencies', () => {
  assert.throws(() => approveFinancialModelConfiguration({ revision: proposedConfiguration, actor: ai, definitions: approvedDefinitions }), /HUMAN_APPROVAL_REQUIRED/);
  assert.throws(() => approveFinancialModelConfiguration({ revision: proposedConfiguration, actor: editor, definitions: proposedDefinitions }), /DEPENDENCY_NOT_APPROVED/);
});
```

- [ ] **Step 2: Run approval test to verify it is red.**

Run: `node --experimental-strip-types --test tests/v11/financial-definition-approval.test.mjs`

Expected: FAIL because the financial configuration functions do not exist.

- [ ] **Step 3: Implement thin revision adapter.**

Use the existing `createRevision` and `approveRevision` functions. Populate `metadata.dependencyIds` with every referenced primary/control definition revision ID before approval. Do not add Prisma calls, update paths or a new storage model.

- [ ] **Step 4: Run all relevant checks.**

Run: `npx prisma validate && npm run lint && node --experimental-strip-types --test tests/v11/*.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit approved-configuration adapter.**

```bash
git add src/lib/v11/financials/configuration.ts tests/v11/financial-definition-approval.test.mjs
git commit -m "feat(v11): version financial model configuration"
```

## Final Verification

- [ ] Run `git diff --check`.
- [ ] Run `npx prisma validate`; expected: valid without schema change.
- [ ] Run `npm run lint`; expected: pass.
- [ ] Run `node --experimental-strip-types --test tests/v11/*.test.mjs`; expected: all v11 tests pass.
- [ ] Run the full suite and record existing baseline failures separately; do not repair unrelated tests in this work.
- [ ] Verify `git diff --name-only -- prisma schema.prisma prisma/migrations` is empty.
- [ ] Confirm no Meta-specific logic, no database migration and no Phase 2.2+ objects were introduced.
