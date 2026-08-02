# Meta Analysis Hidden Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the locked Meta analysis at `/analyser/meta` through the normal analysis route while keeping it undiscoverable until its publication flag is enabled.

**Architecture:** Add a Meta entry to the central analysis data with `published: false` and dispatch it to one dedicated `MetaDeepDive` component. Public collection, sitemap/RSS and related-analysis selectors filter on this central flag; the detail route remains available and receives noindex/nofollow metadata while unpublished.

**Tech Stack:** React, TypeScript, React Router, React Helmet Async, existing Börsanalys analysis components, Node test scripts.

## Global Constraints

- Preserve every locked Meta model value and all approved editorial copy.
- Do not build a duplicate preview route, banner or alternate page.
- `/analyser/meta` must work directly while `published: false`.
- Unpublished analyses must be excluded from public lists, search, related-analysis modules, sitemap and RSS.
- Unpublished detail pages must emit `noindex, nofollow`.

---

### Task 1: Add publication metadata and public-collection filters

**Files:**
- Modify: `src/types/analysis.ts`
- Modify: `src/data/analyses.ts`
- Modify: public list, search, related-analysis, sitemap and RSS selectors identified by `rg "analyses|Object.values\\(analyses\\)" src api`
- Test: `tests/meta-analysis-publication-contract.test.mjs`

**Interfaces:**
- Produces `AnalysisData.published?: boolean` where omitted means published for backwards compatibility.
- Produces `isPublishedAnalysis(analysis: AnalysisData): boolean` or equivalent central predicate used by public collection surfaces.

- [ ] **Step 1: Write the failing contract test**

```js
assert.equal(meta.published, false);
assert.equal(publicAnalyses.some((analysis) => analysis.slug === "meta"), false);
assert.equal(analyses.meta.slug, "meta");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/meta-analysis-publication-contract.test.mjs`

Expected: FAIL because the Meta record and publication contract do not exist.

- [ ] **Step 3: Add the optional metadata field and central publication predicate**

```ts
export const isPublishedAnalysis = (analysis: AnalysisData) => analysis.published !== false;
```

Apply this predicate to every collection that is visible outside the direct detail route.

- [ ] **Step 4: Run the focused test**

Run: `node --test tests/meta-analysis-publication-contract.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/types/analysis.ts src/data/analyses.ts src tests/meta-analysis-publication-contract.test.mjs
git commit -m "feat: add hidden Meta analysis metadata"
```

### Task 2: Implement the Meta deep-dive and route dispatch

**Files:**
- Create: `src/components/analysis/MetaDeepDive.tsx`
- Modify: `src/types/analysis.ts`
- Modify: `src/pages/Analysis.tsx`
- Modify: `src/data/analyses.ts`
- Test: `tests/meta-analysis-render-contract.test.mjs`

**Interfaces:**
- Consumes `AnalysisData` record with `deepDiveComponent: "Meta"`.
- Produces `MetaDeepDive({ data, onToggleWatchlist, isInWatchlist, isWatchlistLoading, nextAnalysis })`.

- [ ] **Step 1: Write the failing render contract**

```js
assert.match(metaSource, /Meta Platforms/);
assert.match(metaSource, /BEVAKA/);
assert.match(metaSource, /1 066,05/);
assert.match(analysisSource, /Meta: MetaDeepDive/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/meta-analysis-render-contract.test.mjs`

Expected: FAIL because the Meta component and dispatch entry do not exist.

- [ ] **Step 3: Build the component with existing analysis primitives**

Render the approved sections in v10 order: overview, 30-second thesis, company, model, moat/SWOT, financial history, scorecard, valuation, zones, catalysts, risks, monitoring and verdict. Use existing cards, tables, disclaimer, verdict and scenario components; do not add or recalculate values.

- [ ] **Step 4: Register Meta in the analysis record and component map**

```ts
deepDiveComponent: "Meta",
published: false,
```

- [ ] **Step 5: Run focused test and type check**

Run: `node --test tests/meta-analysis-render-contract.test.mjs && npm run build`

Expected: PASS and successful production build.

- [ ] **Step 6: Commit**

```bash
git add src/components/analysis/MetaDeepDive.tsx src/types/analysis.ts src/pages/Analysis.tsx src/data/analyses.ts tests/meta-analysis-render-contract.test.mjs
git commit -m "feat: add hidden Meta analysis"
```

### Task 3: Apply unpublished SEO and verify direct-route behaviour

**Files:**
- Modify: `src/pages/Analysis.tsx`
- Modify: `src/components/SEO.tsx` only if the existing interface cannot receive robots props
- Test: `tests/meta-analysis-seo-contract.test.mjs`

**Interfaces:**
- Consumes `analysis.published` from the detail route.
- Produces `noindex, nofollow` robots metadata when `published === false`.

- [ ] **Step 1: Write the failing SEO contract**

```js
assert.match(analysisSource, /noindex, nofollow/);
assert.match(analysisSource, /published !== false/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/meta-analysis-seo-contract.test.mjs`

Expected: FAIL because unpublished metadata is not wired.

- [ ] **Step 3: Pass robots metadata from the detail route**

Keep the Meta route renderable. Set page robots to `noindex, nofollow` only when its record is unpublished.

- [ ] **Step 4: Run focused test and production build**

Run: `node --test tests/meta-analysis-seo-contract.test.mjs && npm run build`

Expected: PASS and successful production build.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Analysis.tsx src/components/SEO.tsx tests/meta-analysis-seo-contract.test.mjs
git commit -m "feat: noindex hidden Meta analysis"
```

### Task 4: Visual verification and final regression

**Files:**
- Modify: none unless a directly observed Meta rendering defect requires a focused repair

- [ ] **Step 1: Start the local site**

Run: `npm run dev`

- [ ] **Step 2: Inspect the direct route**

Open `/analyser/meta`; verify the approved title, BEVAKA verdict, 25/35 score, 612,50 USD 12-month anchor and 1 066,05 USD five-year value are visible.

- [ ] **Step 3: Inspect discovery surfaces**

Open the analysis archive, home page, search, related-analysis module, sitemap and RSS; verify Meta is absent.

- [ ] **Step 4: Run all Meta tests and build**

Run: `node --test tests/meta-analysis-*.test.mjs && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit any focused visual repair**

```bash
git add <only-files-changed-for-the-verified-repair>
git commit -m "fix: polish hidden Meta analysis"
```
