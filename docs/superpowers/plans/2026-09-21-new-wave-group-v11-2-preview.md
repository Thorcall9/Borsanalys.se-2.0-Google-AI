# New Wave Group v11.2 Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone, unpublished New Wave Group v11.2 dossier that can be reviewed on a Vercel Preview without changing the April 2026 analysis or production discovery surfaces.

**Architecture:** Keep the existing `new-wave-group-april-2026` record untouched. Add a separate structured valuation model and v11 analysis record under a new September 2026 slug, registered with `published: false`. The record retains the dossier’s `NOT_PUBLISH_READY` status, central-disclaimer blocker and `DRAFT` risk/reward zones, while carrying immutable version metadata and a Q3 event-delta template.

**Tech Stack:** TypeScript, React/Vite, existing `AnalysisData` v11 contract, GitHub branch preview.

**Spec:** `New_Wave_Group_Bolagsdossier_v11_2_DRAFT.md` (canonical version `NWG-2026-09-17-v1`)

## Global Constraints

- Do not modify `src/data/analyses/new-wave-group/new-wave-group.ts` or the April 2026 slug.
- Do not modify `main`, redirects, or public discovery surfaces.
- New slug: `new-wave-group-september-2026`.
- New record must use `templateVersion: "v11"` and `published: false`.
- Publication status remains `NOT_PUBLISH_READY`.
- Risk/reward zones remain `DRAFT` and member-only.
- Central disclaimer fields remain unavailable; publication blockers state why.
- Source cutoff and reference date: 2026-09-17. Valuation date: 2028-12-31.
- Use the dossier’s canonical scenario inputs and weighted value only; no new research or refreshed market data.
- Add only static data/model code; no new React component, network request, dependency or client-side calculation.

## Review Focus

- The old April New Wave entry remains unchanged and continues to resolve.
- The new record does not appear in normal discovery because `published: false`.
- All Bear/Base/Bull scenarios calculate their EBIT, EPS, fair value and weighted value from one explicit model.
- Probabilities total exactly 100% and all scenario values share 2028-12-31.
- The Vercel build accepts the v11 record without requiring a company-specific deep-dive component.

### Task 1: Add the test-first valuation validator

**Files:**
- Create: `scripts/validate-new-wave-v11-2.ts`
- Test: `scripts/validate-new-wave-v11-2.ts`

**Interfaces:**
- Consumes: `newWaveGroupV112Scenarios`, `newWaveGroupV112WeightedFairValue`, `newWaveGroupV112YearsToValuation` from the model created in Task 2.
- Produces: exit code 0 only when model arithmetic, probability sum and timeline all match the dossier.

- [ ] **Step 1: Write the failing validator**
```ts
import assert from "node:assert/strict";
import {
  newWaveGroupV112Scenarios,
  newWaveGroupV112WeightedFairValue,
  newWaveGroupV112YearsToValuation,
} from "../src/data/analyses/new-wave-group/new-wave-group-v11-2-model.js";

assert.equal(newWaveGroupV112Scenarios.reduce((sum, scenario) => sum + scenario.probability, 0), 1);
assert.ok(Math.abs(newWaveGroupV112WeightedFairValue - 123.6048) < 0.0001);
assert.ok(Math.abs(newWaveGroupV112YearsToValuation - 2.288843258) < 0.000000001);
```

- [ ] **Step 2: Run the validator to verify it fails**
Run: `npx tsx scripts/validate-new-wave-v11-2.ts`
Expected: module-not-found error for `new-wave-group-v11-2-model.js`.

- [ ] **Step 3: Complete after Task 2**
Run: `npx tsx scripts/validate-new-wave-v11-2.ts`
Expected: exit code 0.

### Task 2: Create the canonical v11.2 valuation model

**Files:**
- Create: `src/data/analyses/new-wave-group/new-wave-group-v11-2-model.ts`

**Interfaces:**
- Produces: `newWaveGroupV112Scenarios`, `newWaveGroupV112WeightedFairValue`, `newWaveGroupV112YearsToValuation`, reference-date constants and DRAFT risk/reward presentation inputs.
- Consumed by: Task 1 validator and Task 3 analysis record.

- [ ] **Step 1: Implement only canonical constants and derived scenario calculations**
```ts
const scenarioInputs = [
  { id: "bear", probability: 0.25, revenue: 11300, ebitMargin: 0.105, peMultiple: 12 },
  { id: "base", probability: 0.55, revenue: 13100, ebitMargin: 0.125, peMultiple: 15 },
  { id: "bull", probability: 0.20, revenue: 14300, ebitMargin: 0.145, peMultiple: 17 },
] as const;

export const newWaveGroupV112Scenarios = scenarioInputs.map((input) => {
  const ebit = input.revenue * input.ebitMargin;
  const netIncome = ebit * 0.68;
  const eps = netIncome / 132.687086;
  return { ...input, ebit, netIncome, eps, fairValue: eps * input.peMultiple };
});
```

- [ ] **Step 2: Run the validator**
Run: `npx tsx scripts/validate-new-wave-v11-2.ts`
Expected: exit code 0.

### Task 3: Add the standalone v11 analysis record

**Files:**
- Create: `src/data/analyses/new-wave-group/new-wave-group-v11-2.ts`

**Interfaces:**
- Consumes: Task 2 model exports.
- Produces: `newWaveGroupV112: AnalysisData` with v11 presentation fields, source register, claims, theses, monitors, DRAFT zones and publication blockers.

- [ ] **Step 1: Build the record from the canonical dossier**
- Use `slug: "new-wave-group-september-2026"`, `published: false`, and `templateVersion: "v11"`.
- Add headline values: 123,60 SEK weighted value, 91,35 SEK reference price, +35,3 % total potential and +14,1 % annual potential.
- Include named public sources SRC-01 through SRC-08 and FACT/DERIVED/ASSUMPTION/ANALYSIS claims.
- Embed the four thesis monitors and Q3 2026 checkpoint.
- Set `v11.riskRewardZones.status: "DRAFT"`; do not include zones in public copy.
- Add `publicationBlockers` for central disclaimer configuration and editorial risk/reward approval.
- Set `deepDiveComponent` only if the existing v11 renderer requires it; otherwise use the generic v11 display.

- [ ] **Step 2: Type-check**
Run: `npm run lint`
Expected: exit code 0.

### Task 4: Register the preview-only record

**Files:**
- Modify: `src/data/analyses/index.ts`

**Interfaces:**
- Consumes: `newWaveGroupV112`.
- Produces: direct lookup at `/analys/new-wave-group-september-2026`.

- [ ] **Step 1: Add the import and one registry entry**
```ts
import { newWaveGroupV112 } from "./new-wave-group/new-wave-group-v11-2.js";

// Preserve this existing entry unchanged:
"new-wave-group-april-2026": newWaveGroup2025,
"new-wave-group-september-2026": newWaveGroupV112,
```

- [ ] **Step 2: Verify static behavior**
Run: `npm run lint && npx tsx scripts/validate-new-wave-v11-2.ts`
Expected: exit code 0.

### Task 5: Build and hand off the preview

**Files:**
- No source changes beyond Tasks 1–4.

- [ ] **Step 1: Run the production build**
Run: `npm run build`
Expected: Vite completes with exit code 0.

- [ ] **Step 2: Create a draft pull request**
Target: `main`
Head: `draft/new-wave-group-v11-2-2026-09`
Expected: a Vercel Preview is attached by the existing Vercel GitHub integration; no merge and no production deployment.

- [ ] **Step 3: Review the direct preview route**
Check: `/analys/new-wave-group-september-2026`.
Expected: the v11 case is visible on the preview; the April analysis and production URLs are unchanged.

## Self-Review

- Spec coverage: preservation of old analysis, separate version/slug, v11 structure, traceability, Q3 event-delta, NOT_PUBLISH_READY state, central disclaimer blocker, DRAFT zones and preview-only delivery are all assigned above.
- Placeholder scan: no TBD or unspecified implementation steps remain.
- Type consistency: Task 1 imports only exports defined by Task 2; Task 3 exports the record used by Task 4.
- Review focus: all five review concerns map to Task 1, Task 3, Task 4 or Task 5.
