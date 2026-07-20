# Recommendation v10 Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all canonical analysis recommendations to `KÖP`, `BEVAKA`, or `AVSTÅ`, centralize their definitions and presentation, and expose optional editorial reasons without changing score or analysis logic.

**Architecture:** Add a single `src/lib/recommendation.ts` module for the canonical type, definitions, badge configuration, filter options, and strict validation. Keep legacy mapping in a migration-only helper that is never imported by runtime rendering. Reuse a compact expandable `RecommendationInfo` component above the archive filters and a fuller instance near conclusions on analysis pages.

**Tech Stack:** React, TypeScript, React Router search params, existing Tailwind classes, Node test runner with `tsx`, Vite build.

## Global Constraints

- Only canonical primary recommendations are `KÖP`, `BEVAKA`, and `AVSTÅ`.
- Do not calculate or override recommendation from score.
- Do not create a permanent runtime normalization layer.
- Only Apple and Axfood Q1 receive `recommendationReason` in this change.
- Legacy words may remain in explanatory prose and scenario text.
- Analytics may receive only the canonical recommendation value and never `recommendationReason`.

---

### Task 1: Add canonical recommendation configuration and tests

**Files:**
- Create: `src/lib/recommendation.ts`
- Test: `tests/recommendation-contract.test.mjs`

**Interfaces:**
- Produces `Recommendation`, `CANONICAL_RECOMMENDATIONS`, `RECOMMENDATION_DEFINITIONS`, `RECOMMENDATION_BADGE_CLASSES`, `isCanonicalRecommendation()`, `assertCanonicalRecommendation()`, and `mapLegacyRecommendationForMigration()`.
- `mapLegacyRecommendationForMigration()` is explicitly migration-only and must not be imported by `src/components`, `src/pages`, or runtime hooks.

- [ ] **Step 1: Write failing contract tests** for exact canonical values, definitions, validation behavior, and explicit legacy mappings. Assert that `recommendationReason` is not part of any analytics helper if one exists.
- [ ] **Step 2: Run the focused test** with `node --test tests/recommendation-contract.test.mjs`; confirm failure because the module does not exist.
- [ ] **Step 3: Implement the central module** with the exact v10 copy:

```ts
export const CANONICAL_RECOMMENDATIONS = ["KÖP", "BEVAKA", "AVSTÅ"] as const;
export type Recommendation = (typeof CANONICAL_RECOMMENDATIONS)[number];

export const RECOMMENDATION_DEFINITIONS: Record<Recommendation, string> = {
  KÖP: "Aktien bedöms erbjuda attraktiv långsiktig riskjusterad avkastning vid den analyserade kursen.",
  BEVAKA: "Bolaget är intressant men värderingen, säkerhetsmarginalen eller osäkerheten gör att vi ännu inte ser ett tydligt köpläge.",
  AVSTÅ: "Riskerna eller den förväntade avkastningen gör att aktien inte bedöms vara ett attraktivt alternativ just nu.",
};
```

Use `isCanonicalRecommendation(value: unknown): value is Recommendation` for runtime assertions. `assertCanonicalRecommendation(value: unknown, context?: string): asserts value is Recommendation` throws a descriptive error. Keep migration mapping in the same module only if tests can verify it is not imported by runtime; otherwise place it in `tests/helpers/legacyRecommendationMigration.mjs`.

- [ ] **Step 4: Run the focused test** and confirm it passes.
- [ ] **Step 5: Commit** with `git add src/lib/recommendation.ts tests/recommendation-contract.test.mjs && git commit -m "feat: add canonical recommendation definitions"`.

### Task 2: Migrate analysis data and tighten shared types

**Files:**
- Modify: `src/types/analysis.ts`
- Modify: `src/data/analyses/apple/apple.ts`
- Modify: `src/data/analyses/axfood/axfood-q1-2026.ts`
- Test: `tests/recommendation-data.test.mjs`

**Interfaces:**
- `AnalysisData.recommendation: Recommendation`.
- `AnalysisData.recommendationReason?: string`.

- [ ] **Step 1: Add data validation tests** importing `Object.values(analyses)` and asserting every primary recommendation is canonical, Apple and Axfood Q1 equal `BEVAKA`, and only those two entries have `recommendationReason` among the registered analyses.
- [ ] **Step 2: Run the focused test** and confirm it fails on the current `AVVAKTA` values/type.
- [ ] **Step 3: Change the type** to use the central `Recommendation` type and add the optional reason field.
- [ ] **Step 4: Migrate Apple and Axfood Q1 directly** to `recommendation: "BEVAKA"`. Add concise editorial reasons derived from existing conclusions, for example:

```ts
recommendationReason: "Bolaget håller hög kvalitet men dagens värdering ger för liten säkerhetsmarginal för ett tydligt köpläge."
```

Do not change scores, scenarios, valuation fields, or analysis logic.
- [ ] **Step 5: Run the focused data test** and confirm it passes.
- [ ] **Step 6: Commit** with `git add src/types/analysis.ts src/data/analyses/apple/apple.ts src/data/analyses/axfood/axfood-q1-2026.ts tests/recommendation-data.test.mjs && git commit -m "feat: migrate legacy analysis recommendations"`.

### Task 3: Standardize badge rendering and shared information UI

**Files:**
- Create: `src/components/analysis/RecommendationInfo.tsx`
- Modify: `src/components/analysis/VerdictBadge.tsx`
- Modify: `src/components/analysis/AnalysisCard.tsx`
- Modify: the archive page component in `src/pages/Analysis.tsx`
- Modify: `src/components/analysis/ComprehensiveAnalysis.tsx`
- Modify: `src/components/analysis/ComprehensiveAnalysisV10.tsx`
- Modify: `src/components/analysis/ReportComment.tsx`
- Test: `tests/recommendation-ui-contract.test.mjs`

**Interfaces:**
- `RecommendationInfo({ compact?: boolean; defaultOpen?: boolean })` renders the shared definitions and closing note. Compact mode uses a one-line summary with an info icon and native `<details>` expansion in the archive.
- `VerdictBadge({ verdict: Recommendation })` renders only canonical labels and central badge classes.

- [ ] **Step 1: Add failing source/contract tests** for all three badge labels/classes, the exact information copy, compact archive mode, full analysis mode, and conditional `recommendationReason` rendering.
- [ ] **Step 2: Run the focused UI contract test** and confirm failure.
- [ ] **Step 3: Implement `RecommendationInfo`** using `<details>` for the archive variant:

```tsx
<details className={compact ? "rounded-xl border border-border bg-muted/20" : "rounded-2xl border border-border bg-card"}>
  <summary className="cursor-pointer list-none px-4 py-3 font-black">
    Så fungerar våra bedömningar <Info size={15} aria-hidden="true" />
  </summary>
  <div className="grid gap-4 px-4 pb-4">...</div>
</details>
```

Use the same definition constants in both variants; do not duplicate copy.
- [ ] **Step 4: Update `VerdictBadge`** to accept the central `Recommendation`, look up its classes, and render the canonical label. No fallback should render a legacy value.
- [ ] **Step 5: Add compact `RecommendationInfo` once above archive filters** and add the full variant near the conclusion on shared analysis pages. Keep cards unchanged except for the standardized badge.
- [ ] **Step 6: Render `recommendationReason` conditionally** beside the full-page recommendation only when the string is non-empty. Do not render it in cards.
- [ ] **Step 7: Run the focused UI contract test** and confirm it passes.
- [ ] **Step 8: Commit** with `git add src/components/analysis/RecommendationInfo.tsx src/components/analysis/VerdictBadge.tsx src/components/analysis/AnalysisCard.tsx src/pages/Analysis.tsx src/components/analysis/ComprehensiveAnalysis.tsx src/components/analysis/ComprehensiveAnalysisV10.tsx src/components/analysis/ReportComment.tsx tests/recommendation-ui-contract.test.mjs && git commit -m "feat: standardize recommendation presentation"`.

### Task 4: Restrict filters, URL state, search and analytics

**Files:**
- Modify: `src/hooks/useAnalysisFilters.ts`
- Modify: `src/components/analysis/FilterPanel.tsx`
- Modify: `src/components/GlobalSearch.tsx`
- Test: `tests/recommendation-analytics-contract.test.mjs` documenting that no recommendation reason is tracked; no existing recommendation analytics helper was found during the mapping.
- Test: `tests/recommendation-filter.test.mjs`

**Interfaces:**
- Filter values derive from `CANONICAL_RECOMMENDATIONS` and prepend `Alla` only at the UI boundary.
- URL parsing accepts canonical lowercase forms and returns `Alla` for `avvakta`, `behåll`, `neutral`, `sälj`, or any unsupported value.

- [ ] **Step 1: Add failing filter tests** for options, URL parsing, canonical filtering, and unsupported legacy values.
- [ ] **Step 2: Run the focused filter test** and confirm failure.
- [ ] **Step 3: Replace local recommendation arrays and variant normalization** with central canonical values. Keep any legacy parser only in migration/test code, never in filter rendering.
- [ ] **Step 4: Update search/badge color branches** to use the same central badge configuration rather than checking `SÄLJ` or `AVVAKTA` directly.
- [ ] **Step 5: Verify analytics calls** send only `recommendation`; if no recommendation analytics exists, add a contract test that the new `recommendationReason` field is never included in any tracked payload.
- [ ] **Step 6: Run the focused filter and analytics tests** and confirm they pass.
- [ ] **Step 7: Commit** with `git add src/hooks/useAnalysisFilters.ts src/components/analysis/FilterPanel.tsx src/components/GlobalSearch.tsx tests/recommendation-filter.test.mjs tests/recommendation-analytics-contract.test.mjs && git commit -m "feat: restrict recommendation filters to v10"`.

### Task 5: Full verification and responsive browser QA

**Files:**
- Modify: only the implementation files listed in Tasks 1–4 if a verification command identifies a regression.

- [ ] **Step 1: Run all tests** with `node --import tsx --test tests/*.test.mjs`; record counts and failures.
- [ ] **Step 2: Run typecheck/lint** with `npm run lint` and require exit code 0.
- [ ] **Step 3: Run production build** with `npm run build` and require exit code 0.
- [ ] **Step 4: Start/reuse the local dev server** at `http://localhost:3000` and use the in-app Browser skill. The flow under test is: archive loads -> compact recommendation info expands -> recommendation filter selects `BEVAKA` -> a full analysis opens -> full definitions and the optional reason render.
- [ ] **Step 5: Validate desktop** page identity, nonblank render, no framework overlay, console health, compact info expansion, filter options, filtered cards, badge labels, and full analysis recommendation/reason.
- [ ] **Step 6: Validate mobile** at 390px width for clipping, compact info layout, filter usability, card badges, and full analysis recommendation section.
- [ ] **Step 7: Run `git diff --check`, inspect `git status -sb`, and record remaining risks before claiming completion.
- [ ] **Step 8: Commit any verification-only fixes** with a focused message; do not modify unrelated legacy prose.
