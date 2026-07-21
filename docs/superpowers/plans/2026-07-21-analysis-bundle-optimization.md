# Analysis Bundle Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the analysis archive visually and behaviorally unchanged while loading each bolagsspecifik deep dive only when its analysis page is opened.

**Architecture:** Replace the eager deep-dive imports in `src/pages/Analysis.tsx` with a typed lazy component registry. The archive route will retain the existing archive components and data, while detail routes will resolve only the selected deep dive through React Suspense. No routes, content, or visual styles change.

**Tech Stack:** React 19, React Router 7, TypeScript, Vite, Vitest.

## Global Constraints

- Work only in `Borsanalys.se-2.0-Google-AI`.
- Preserve all existing user changes in the working tree.
- Preserve existing route paths, analysis content, and visual output.
- Do not change Firebase, analytics, ads, or API behavior in this task.
- Verify bundle output and rendered routes before claiming completion.

---

### Task 1: Lock the lazy-loading contract with a failing test

**Files:**
- Create: `src/pages/analysisDeepDiveRegistry.ts`
- Create: `src/pages/analysisDeepDiveRegistry.test.mjs`

**Interfaces:**
- `getDeepDiveLoader(key: string): (() => Promise<{ default: React.ComponentType<any> }>) | undefined` returns a dynamic-import loader for a known deep-dive key and `undefined` for an unknown key.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { getDeepDiveLoader } from "./analysisDeepDiveRegistry.ts";

test("does not resolve an unknown deep dive", () => {
  assert.equal(getDeepDiveLoader("UnknownCompany"), undefined);
});

test("resolves a known deep dive through a dynamic import", async () => {
  assert.equal(typeof getDeepDiveLoader("Volvo"), "function");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --experimental-strip-types --test src/pages/analysisDeepDiveRegistry.test.mjs`

Expected: FAIL because `src/pages/analysisDeepDiveRegistry.ts` does not exist yet.

- [ ] **Step 3: Implement the minimal registry**

Create a registry whose values are functions returning dynamic imports, rather than importing deep dives at module evaluation time. Include the existing keys: `Nvidia`, `NovoNordisk`, `Evolution`, `Investor`, `Volvo`, `Swedbank`, `NewWave`, `Ericsson`, `Handelsbanken`, `AQGroup`, `Nibe`, `Axfood`, and `ABB`, plus `Plejd`.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --experimental-strip-types --test src/pages/analysisDeepDiveRegistry.test.mjs`

Expected: PASS for both tests.

### Task 2: Replace eager imports in the analysis route

**Files:**
- Modify: `src/pages/Analysis.tsx`

**Interfaces:**
- Consumes `getDeepDiveImport` from `analysisDeepDiveRegistry.ts`.
- Produces the same rendered deep-dive component props and the same route behavior.

- [ ] **Step 1: Write the failing integration assertion**

Extend `src/pages/analysisDeepDiveRegistry.test.mjs` with a registry-key assertion covering every existing key, so removing a deep dive from the registry fails the test.

- [ ] **Step 2: Run the focused test to verify the contract**

Run: `node --experimental-strip-types --test src/pages/analysisDeepDiveRegistry.test.mjs`

Expected: FAIL if any existing deep-dive key is missing.

- [ ] **Step 3: Replace eager imports with the lazy registry**

Remove the top-level deep-dive imports and the eager `DEEP_DIVE_COMPONENTS` object. Resolve the selected import only after `analysis.deepDiveComponent` is known, render a stable loading placeholder inside Suspense, and retain the existing watchlist/save controls around the loaded component.

- [ ] **Step 4: Run focused tests and type checking**

Run: `node --experimental-strip-types --test src/pages/analysisDeepDiveRegistry.test.mjs` and `npm run lint`

Expected: PASS with no TypeScript errors.

### Task 3: Verify bundle and rendered behavior

**Files:**
- No source changes expected.

- [ ] **Step 1: Build and compare output**

Run: `npm run build`

Expected: the `Analysis` chunk is materially smaller than the pre-change 918 kB minified output, and deep-dive code appears in separate chunks.

- [ ] **Step 2: Verify the archive route**

Run the local app and open `/analys`. Confirm the archive renders without a deep-dive network chunk being required for the initial archive screen.

- [ ] **Step 3: Verify representative detail routes**

Open one lazy deep-dive route, one standard comprehensive analysis route, and the homepage. Confirm the expected content renders, navigation remains unchanged, and browser logs contain no relevant errors.

- [ ] **Step 4: Review the diff**

Run: `git diff --check` and `git status --short`

Expected: only the registry, test, `Analysis.tsx`, and plan files are new/modified by this task; existing unrelated user changes remain untouched.
