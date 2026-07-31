# Analysmall v11 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the internal v11 analysis domain, approval and immutable-snapshot services, and a guarded report-automation pipeline without an automatic publication path.

**Architecture:** Add a new, isolated `src/lib/v11` domain layer rather than modifying the current presentation-oriented `src/types/analysis.ts`. Persist revisions and snapshots with Prisma. Expose authenticated internal API handlers that call pure domain services; AI adapters only receive the narrowly scoped data permitted for their pipeline stage.

**Tech Stack:** TypeScript 5.8, Zod 4, Prisma/PostgreSQL, Vercel serverless handlers, Node built-in test runner, React 19.

## Global Constraints

- Schema version is exactly `11.0` for this release.
- Percentages are decimal values: `0.20` means 20 percent.
- Currency and unit remain separate fields.
- No production DCF, WACC, or terminal-value method exists.
- Only `KÖP`, `BEVAKA`, and `AVSTÅ` are valid recommendations.
- AI identities cannot approve, set approved thesis status, activate a target price/recommendation, snapshot, publish, or create a new base analysis.
- Snapshot payloads use RFC 8785 JSON Canonicalization Scheme and SHA-256.
- Raw PDF text is available only to the extraction adapter, never to the editorial drafting adapter.
- `report-commentary` and `market-update` cannot mutate a base analysis or snapshot.
- The current public analysis data and pages remain backward-compatible throughout this plan.

## Planned File Structure

- `src/lib/v11/schemas.ts` — Zod domain contracts and inferred types.
- `src/lib/v11/revisions.ts` — immutable revision creation and dependency/approval checks.
- `src/lib/v11/valuation.ts` — allowed valuation methods and bridge calculations.
- `src/lib/v11/canonicalJson.ts` — RFC 8785 serializer and SHA-256 helper.
- `src/lib/v11/snapshots.ts` — snapshot eligibility, assembly, creation, and verification.
- `src/lib/v11/documents.ts` — document identity, duplicate detection, page-bound raw-text boundary.
- `src/lib/v11/reportValidation.ts` — fact math checks and blocking/warning issues.
- `src/lib/v11/reportComparison.ts` — snapshot comparison and completeness-aware output.
- `src/lib/v11/classification.ts` — suggested event and editorial action, never approved action.
- `src/lib/v11/aiContracts.ts` — extraction/drafting/review payload contracts and forbidden-field checks.
- `src/lib/v11/editorialWorkflow.ts` — state machine for review and preview.
- `api/v11/*.ts` — authenticated internal handlers with method, input and role guards.
- `prisma/schema.prisma` and `prisma/migrations/*` — append-only domain persistence.
- `tests/v11/*.test.mjs` — behavior-level unit and API-contract tests.

---

### Task 1: Establish the isolated v11 test harness and schema foundation

**Files:**
- Modify: `package.json`
- Create: `src/lib/v11/schemas.ts`
- Create: `tests/v11/schemas.test.mjs`

**Interfaces:**
- Produces `parseV11Object(value)`, `PeriodSchema`, `SourceSchema`, `FinancialDataPointSchema`, `AssumptionSchema`, `EstimateSchema`, and the inferred `V11Object` type.
- Consumed by every later v11 domain service.

- [ ] **Step 1: Write failing tests for valid decimal percentages and required fact provenance.**

```js
test('accepts a reported percentage in decimal form with a source locator', () => {
  const result = FinancialDataPointSchema.safeParse({
    dataPointId: crypto.randomUUID(), metric: 'ebitMargin', value: 0.2,
    unit: 'percent', currency: null,
    period: { kind: 'fiscal-year', fiscalYear: 2026, startDate: '2026-01-01', endDate: '2026-12-31' },
    valueOrigin: 'reported', sourceId: crypto.randomUUID(),
    sourceLocator: { page: 12, section: 'Resultat', quoteAnchor: null },
    calculation: null, verificationStatus: 'source-located', metadata: proposedMetadata,
  });
  assert.equal(result.success, true);
});

test('rejects a reported fact without a source locator', () => {
  assert.equal(FinancialDataPointSchema.safeParse({ ...reportedFact, sourceLocator: null }).success, false);
});
```

- [ ] **Step 2: Run the test and verify it fails because the v11 schema module is absent.**

Run: `node --experimental-strip-types --test tests/v11/schemas.test.mjs`

Expected: FAIL with module-not-found or missing exported schema.

- [ ] **Step 3: Implement the minimal Zod schemas.**

```ts
export const ValueOriginSchema = z.enum([
  'reported', 'calculated', 'company-guidance', 'consensus',
  'ai-proposed', 'borsanalys-approved-estimate',
]);

export const PeriodSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('quarter'), fiscalYear: z.number().int(), fiscalQuarter: z.number().int().min(1).max(4), startDate: z.string().date(), endDate: z.string().date() }),
  z.object({ kind: z.literal('fiscal-year'), fiscalYear: z.number().int(), startDate: z.string().date(), endDate: z.string().date() }),
  z.object({ kind: z.literal('ltm'), asOfDate: z.string().date(), startDate: z.string().date(), endDate: z.string().date() }),
  z.object({ kind: z.literal('point-in-time'), asOfDate: z.string().date() }),
]);
```

Include `sourceId`, period, `unit`, `currency`, `valueOrigin`, source locator, verification status, and audit metadata in the fact schema.

- [ ] **Step 4: Run the schema tests and TypeScript validation.**

Run: `node --experimental-strip-types --test tests/v11/schemas.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit the isolated foundation.**

```bash
git add package.json src/lib/v11/schemas.ts tests/v11/schemas.test.mjs
git commit -m "feat(v11): add validated analysis domain schemas"
```

### Task 2: Implement immutable revisions and human-only approval

**Files:**
- Create: `src/lib/v11/revisions.ts`
- Create: `tests/v11/revisions.test.mjs`

**Interfaces:**
- Consumes: `V11Object`, audit metadata and `dependencyIds` from Task 1.
- Produces `createRevision(input)`, `approveRevision(input, dependencyLookup)`, and `supersedeRevision(input)`.

- [ ] **Step 1: Write failing tests for blocked dependency approval and an AI approval attempt.**

```js
test('rejects estimate approval while a referenced assumption is proposed', () => {
  assert.throws(() => approveRevision({ revision: proposedEstimate, actor: editor }, lookupWithProposedAssumption));
});

test('rejects approval by an AI actor', () => {
  assert.throws(() => approveRevision({ revision: proposedEstimate, actor: { actorType: 'ai', actorId: 'model' } }, approvedLookup));
});
```

- [ ] **Step 2: Run the test and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/revisions.test.mjs`

Expected: FAIL because the revision service is absent.

- [ ] **Step 3: Implement immutable revision transitions.**

```ts
export function approveRevision(input: ApprovalInput, lookup: DependencyLookup): ApprovedRevision {
  if (input.actor.actorType !== 'editor') throw new DomainError('HUMAN_APPROVAL_REQUIRED');
  for (const id of input.revision.metadata.dependencyIds) assertApproved(lookup(id));
  return { ...input.revision, metadata: approvedMetadata(input.revision.metadata, input.actor, input.reason) };
}
```

Ensure this function returns a new revision object and never mutates its input.

- [ ] **Step 4: Add and pass immutability/supersession tests.**

Run: `node --experimental-strip-types --test tests/v11/revisions.test.mjs && npm run lint`

Expected: PASS, including assertions that the original object remains proposed.

- [ ] **Step 5: Commit the approval service.**

```bash
git add src/lib/v11/revisions.ts tests/v11/revisions.test.mjs
git commit -m "feat(v11): enforce immutable human-approved revisions"
```

### Task 3: Build allowed valuation bridges and dilution guards

**Files:**
- Create: `src/lib/v11/valuation.ts`
- Create: `tests/v11/valuation.test.mjs`

**Interfaces:**
- Consumes: approved data points and estimates from Tasks 1-2.
- Produces `calculateBridge(input)`, `validateBridge(input)`, and `validateValuationDecision(input)`.

- [ ] **Step 1: Write failing tests for method allow-list and share-count behavior.**

```js
test('rejects DCF as a valuation method', () => {
  assert.throws(() => validateBridge({ method: 'dcf' }));
});

test('prices a P/E bridge directly from EPS without a second share-count division', () => {
  assert.equal(calculateBridge(peInput).output.base.targetPrice, 120);
});

test('requires diluted shares when EV/EBIT converts equity value to target price', () => {
  assert.throws(() => calculateBridge(evEbitWithoutDilutedShares));
});
```

- [ ] **Step 2: Run the test and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/valuation.test.mjs`

Expected: FAIL because valuation functions are absent.

- [ ] **Step 3: Implement the smallest discriminated valuation engine.**

```ts
const ALLOWED_METHODS = new Set(['pe', 'ev-ebit', 'pb-roe', 'epra-nav', 'p-ffo', 'nav-discount', 'ev-sales']);

export function calculateBridge(input: ValuationBridgeInput): ValuationBridgeOutput {
  if (!ALLOWED_METHODS.has(input.method)) throw new DomainError('METHOD_NOT_ALLOWED');
  // P/E/P-B/EPRA NAV/P-FFO/NAV discount consume per-share values directly.
  // EV methods calculate EV, adjust for net debt or cash, then divide once by diluted shares.
}
```

- [ ] **Step 4: Add tests for one primary bridge, control discrepancy, and non-mechanical recommendation evidence.**

Run: `node --experimental-strip-types --test tests/v11/valuation.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit valuation behavior.**

```bash
git add src/lib/v11/valuation.ts tests/v11/valuation.test.mjs
git commit -m "feat(v11): add constrained valuation bridges"
```

### Task 4: Persist append-only domain revisions and snapshots

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260730000000_add_v11_analysis_domain/migration.sql`
- Create: `src/lib/v11/repository.ts`
- Create: `tests/v11/repository-contract.test.mjs`

**Interfaces:**
- Consumes: domain revisions, approval records, valuation decisions, and snapshots.
- Produces `V11Repository` with `appendRevision`, `getRevision`, `getLatestApprovedSnapshot`, `createSnapshot`, and no update/delete method for snapshot payloads.

- [ ] **Step 1: Write a failing repository-contract test that asserts the intended append-only API.**

```js
test('repository exposes snapshot creation and lookup but no snapshot update operation', async () => {
  const source = await readFile(new URL('../../src/lib/v11/repository.ts', import.meta.url), 'utf8');
  assert.match(source, /createSnapshot/);
  assert.doesNotMatch(source, /updateSnapshot|deleteSnapshot/);
});
```

- [ ] **Step 2: Run the test and verify RED.**

Run: `node --test tests/v11/repository-contract.test.mjs`

Expected: FAIL because the repository does not exist.

- [ ] **Step 3: Add Prisma models and repository implementation.**

Add `V11Analysis`, `V11ObjectRevision`, `V11Approval`, `V11Source`, `V11Document`, `V11Snapshot`, `V11ReportEvent`, and `V11EditorialDraft` models. Store approved payloads and revision payloads as JSON, use unique `(analysisId, objectId, revision)`, unique snapshot hash, and foreign keys for ownership. Do not modify the legacy `Analysis` model.

- [ ] **Step 4: Generate Prisma client and run the contract test.**

Run: `npx prisma generate && node --test tests/v11/repository-contract.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit persistence.**

```bash
git add prisma/schema.prisma prisma/migrations src/lib/v11/repository.ts tests/v11/repository-contract.test.mjs
git commit -m "feat(v11): persist append-only analysis revisions"
```

### Task 5: Create and verify immutable canonical snapshots

**Files:**
- Create: `src/lib/v11/canonicalJson.ts`
- Create: `src/lib/v11/snapshots.ts`
- Create: `tests/v11/snapshots.test.mjs`

**Interfaces:**
- Consumes: `V11Repository`, approved revision graph, source statuses.
- Produces `createApprovedSnapshot(analysisId)`, `verifySnapshot(snapshot)`, and `SnapshotEligibilityError`.

- [ ] **Step 1: Write failing tests for deterministic hash and conflict rejection.**

```js
test('creates the same hash for equivalent approved payloads with different property insertion order', () => {
  assert.equal(hashApprovedPayload(payloadA), hashApprovedPayload(payloadB));
});

test('refuses a snapshot that references a conflicting source', async () => {
  await assert.rejects(() => createApprovedSnapshot(conflictingAnalysisId), /CONFLICTING_SOURCE/);
});
```

- [ ] **Step 2: Run the tests and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/snapshots.test.mjs`

Expected: FAIL because snapshot utilities are absent.

- [ ] **Step 3: Implement JCS serialization, SHA-256 and eligibility checks.**

```ts
export async function createApprovedSnapshot(analysisId: string): Promise<AnalysisSnapshot> {
  const payload = await assembleApprovedPayload(analysisId);
  assertNoConflictingSources(payload);
  assertOnlyApprovedObjects(payload);
  const canonicalPayload = canonicalize(payload);
  return repository.createSnapshot({ analysisId, canonicalPayload, payloadHash: sha256(canonicalPayload) });
}
```

- [ ] **Step 4: Add tests for missing primary bridge, AI estimate exclusion, and post-create verification.**

Run: `node --experimental-strip-types --test tests/v11/snapshots.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit snapshot services.**

```bash
git add src/lib/v11/canonicalJson.ts src/lib/v11/snapshots.ts tests/v11/snapshots.test.mjs
git commit -m "feat(v11): create immutable approved snapshots"
```

### Task 6: Add document registration and constrained raw-text extraction boundary

**Files:**
- Create: `src/lib/v11/documents.ts`
- Create: `src/lib/v11/aiContracts.ts`
- Create: `tests/v11/documents.test.mjs`
- Create: `tests/v11/ai-contracts.test.mjs`

**Interfaces:**
- Produces `registerDocument(input)`, `createExtractionRequest(document)`, `createDraftRequest(input)`, and `createFactReviewRequest(input)`.

- [ ] **Step 1: Write failing tests for document deduplication and raw-text isolation.**

```js
test('returns the existing document when the SHA-256 hash is already registered', async () => {
  assert.equal((await registerDocument(duplicate)).duplicateOfDocumentId, existingDocumentId);
});

test('draft request rejects raw PDF text', () => {
  assert.throws(() => createDraftRequest({ ...validDraftInput, rawPdfText: 'untrusted text' }), /RAW_TEXT_FORBIDDEN/);
});
```

- [ ] **Step 2: Run the tests and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/documents.test.mjs tests/v11/ai-contracts.test.mjs`

Expected: FAIL because the modules are absent.

- [ ] **Step 3: Implement document identity and typed AI-stage contracts.**

`createExtractionRequest` may carry page-indexed raw text. `createDraftRequest` must accept only validated facts, comparison output, classification, approved snapshot payload and source references. `createFactReviewRequest` accepts claims plus validated facts, never raw text.

- [ ] **Step 4: Add tests that reject AI approval fields and any unsnapshoted comparison baseline.**

Run: `node --experimental-strip-types --test tests/v11/documents.test.mjs tests/v11/ai-contracts.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit document and AI boundaries.**

```bash
git add src/lib/v11/documents.ts src/lib/v11/aiContracts.ts tests/v11/documents.test.mjs tests/v11/ai-contracts.test.mjs
git commit -m "feat(v11): isolate report extraction from editorial AI"
```

### Task 7: Validate reported facts and compare them with an approved snapshot

**Files:**
- Create: `src/lib/v11/reportValidation.ts`
- Create: `src/lib/v11/reportComparison.ts`
- Create: `tests/v11/report-validation.test.mjs`
- Create: `tests/v11/report-comparison.test.mjs`

**Interfaces:**
- Consumes: extracted reported facts and `AnalysisSnapshot`.
- Produces `validateReportedFacts(facts)`, `compareToSnapshot(facts, snapshot)`, and `ComparisonCompleteness`.

- [ ] **Step 1: Write failing tests for a blocking arithmetic mismatch and a limited comparison.**

```js
test('blocks a reported EBIT margin that contradicts reported EBIT and revenue', () => {
  assert.deepEqual(validateReportedFacts(inconsistentFacts).blocking.map(x => x.code), ['MARGIN_MISMATCH']);
});

test('explains that full thesis analysis is unavailable when the snapshot has no theses', () => {
  assert.equal(compareToSnapshot(facts, snapshotWithoutTheses).completeness.thesisAnalysis, 'unavailable');
});
```

- [ ] **Step 2: Run the tests and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/report-validation.test.mjs tests/v11/report-comparison.test.mjs`

Expected: FAIL because validation and comparison services are absent.

- [ ] **Step 3: Implement deterministic checks and comparison output.**

Return separate arrays: `blocking`, `warnings`, `validatedFacts`, `estimateDeltas`, `consensusDeltas`, `thesisEvidence`, and `completeness`. Do not merge reported and calculated values.

- [ ] **Step 4: Add tests that comparison uses the passed immutable snapshot ID and does not read proposed objects.**

Run: `node --experimental-strip-types --test tests/v11/report-validation.test.mjs tests/v11/report-comparison.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit comparison logic.**

```bash
git add src/lib/v11/reportValidation.ts src/lib/v11/reportComparison.ts tests/v11/report-validation.test.mjs tests/v11/report-comparison.test.mjs
git commit -m "feat(v11): validate and compare reported facts"
```

### Task 8: Implement proposed classification and editorial workflow state machine

**Files:**
- Create: `src/lib/v11/classification.ts`
- Create: `src/lib/v11/editorialWorkflow.ts`
- Create: `tests/v11/classification.test.mjs`
- Create: `tests/v11/editorial-workflow.test.mjs`

**Interfaces:**
- Consumes: validated comparison result and human editor identity.
- Produces `suggestClassification(input)`, `approveClassification(input)`, `createPreview(input)`, and `approveDraftForPublication(input)`.

- [ ] **Step 1: Write failing tests for default report treatment and a non-automatic full reanalysis.**

```js
test('suggests report-commentary for a normal quarterly report with limited deviations', () => {
  assert.equal(suggestClassification(normalQuarter).editorialAction, 'report-commentary');
});

test('full-reanalysis-recommended creates a manual task and never a base analysis', () => {
  const result = approveClassification(materialEvent, editor);
  assert.equal(result.manualReanalysisTask.required, true);
  assert.equal(result.createdBaseAnalysisId, null);
});
```

- [ ] **Step 2: Run the tests and verify RED.**

Run: `node --experimental-strip-types --test tests/v11/classification.test.mjs tests/v11/editorial-workflow.test.mjs`

Expected: FAIL because the state-machine modules are absent.

- [ ] **Step 3: Implement suggested versus approved state transitions.**

`approveClassification` requires an editor. `createPreview` rejects any draft with blocking validation errors. `approveDraftForPublication` ends at internal approval only; it must not invoke a public publishing function.

- [ ] **Step 4: Add tests for acquisition → market update and AI inability to approve a classification or thesis.**

Run: `node --experimental-strip-types --test tests/v11/classification.test.mjs tests/v11/editorial-workflow.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit workflow behavior.**

```bash
git add src/lib/v11/classification.ts src/lib/v11/editorialWorkflow.ts tests/v11/classification.test.mjs tests/v11/editorial-workflow.test.mjs
git commit -m "feat(v11): add editorial report workflow"
```

### Task 9: Add authenticated internal API handlers without publishing endpoints

**Files:**
- Create: `api/v11/analyses.ts`
- Create: `api/v11/documents.ts`
- Create: `api/v11/events.ts`
- Create: `api/v11/snapshots.ts`
- Create: `api/v11/_auth.ts`
- Create: `tests/v11/api-security-contract.test.mjs`

**Interfaces:**
- Consumes: v11 services from Tasks 2-8 and Firebase Admin identity verification.
- Produces: internal JSON APIs for proposal, approval, snapshot, document and preview actions.

- [ ] **Step 1: Write a failing static contract test for auth and forbidden publication.**

```js
test('all v11 handlers require the internal editor guard and expose no publish route', async () => {
  for (const file of ['api/v11/analyses.ts', 'api/v11/documents.ts', 'api/v11/events.ts', 'api/v11/snapshots.ts']) {
    const text = await source(file);
    assert.match(text, /requireInternalEditor/);
    assert.doesNotMatch(text, /publish(?:Analysis|Draft)?\s*\(/);
  }
});
```

- [ ] **Step 2: Run the test and verify RED.**

Run: `node --test tests/v11/api-security-contract.test.mjs`

Expected: FAIL because the internal API handlers are absent.

- [ ] **Step 3: Implement method-guarded, authenticated handlers.**

Each handler must validate input with its Zod schema, reject non-editor actors, return structured domain errors, and use only dynamic imports for server-only packages where required by the current Vercel setup.

- [ ] **Step 4: Add tests that reject missing authentication, AI approval fields, and public publishing attempts.**

Run: `node --test tests/v11/api-security-contract.test.mjs && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit the guarded APIs.**

```bash
git add api/v11 tests/v11/api-security-contract.test.mjs
git commit -m "feat(v11): expose guarded internal editorial APIs"
```

### Task 10: Build a minimal internal preview and run the end-to-end safety suite

**Files:**
- Create: `src/pages/AdminV11Preview.tsx`
- Modify: `src/App.tsx`
- Create: `tests/v11/end-to-end-safety.test.mjs`

**Interfaces:**
- Consumes: approved report draft, warnings, source references, snapshot hash and editor approval state.
- Produces: internal read-only preview route; no public route or publish control.

- [ ] **Step 1: Write a failing test that the preview contains source links/warnings and excludes a publish action.**

```js
test('v11 preview renders source references and warnings but no publish control', async () => {
  const source = await readFile(new URL('../../src/pages/AdminV11Preview.tsx', import.meta.url), 'utf8');
  assert.match(source, /sourceLocator|Källor/);
  assert.match(source, /warnings|Varningar/);
  assert.doesNotMatch(source, />\s*Publicera\s*</);
});
```

- [ ] **Step 2: Run the test and verify RED.**

Run: `node --test tests/v11/end-to-end-safety.test.mjs`

Expected: FAIL because the preview page is absent.

- [ ] **Step 3: Implement the smallest authenticated preview route.**

Render event type, approved classification, snapshot ID/hash, validated facts, comparison deltas, warnings, source references, draft text and editor status. Do not add any action that creates a new base analysis or publishes content.

- [ ] **Step 4: Run focused and repository-wide checks.**

Run: `node --experimental-strip-types --test tests/v11/*.test.mjs && npm run lint && npm run build`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit preview and verification work.**

```bash
git add src/pages/AdminV11Preview.tsx src/App.tsx tests/v11/end-to-end-safety.test.mjs
git commit -m "feat(v11): add internal report preview"
```

## Decision Gates Before Their Dependent Milestones

1. Before Task 4 migration review: decide roles and whether snapshot/recommendation approval needs a second editor.
2. Before Task 6 external document ingestion: select permitted storage, source providers and licensing policy.
3. Before Task 7 materiality rules: approve the versioned thresholds per sector and metric.
4. Before Task 8 production workflow: approve conflict resolution, restatement, corporate-action and claim-source policies.
5. Before any future publishing task: approve a separate publishing specification, authorization model and release process.

## Plan Self-Review

- **Spec coverage:** Tasks 1-3 cover core data, approval and valuation. Tasks 4-5 cover persistence and immutable snapshots. Tasks 6-8 cover document flow, safe AI boundaries, validation, comparison, classification and editorial review. Tasks 9-10 cover restricted access, preview and regression verification.
- **Explicit exclusions:** no automatic publication, no automatic base-analysis creation/replacement, no automated recommendation activation, and no DCF/WACC/terminal value implementation.
- **Open decisions:** all unresolved governance and policy choices remain decision gates, not hidden implementation assumptions.
- **Consistency:** every later service consumes the named interfaces created by an earlier task; all execution tasks start with a focused failing test.
