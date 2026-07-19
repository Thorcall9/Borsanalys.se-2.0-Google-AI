# Standardmall v10 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a versioned v10 standard analysis template for future analyses while preserving the current rendering of all existing analyses and special templates.

**Architecture:** Keep `ComprehensiveAnalysis.tsx` as the legacy renderer. Add a small, testable v10 section contract plus `ComprehensiveAnalysisV10.tsx`, and select it in `Analysis.tsx` only when `AnalysisData.templateVersion === "v10"`. Add `templateVersion: "v10"` to Nordea as the first future-analysis example.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Node test runner.

## Global Constraints

- Existing analyses without `templateVersion: "v10"` must keep the legacy renderer.
- Plejd, ABB, Handelsbanken, Swedbank and Axfood special components must not be changed.
- The v10 template must expose exactly ten main sections in the PDF order.
- No new dependency is required.

---

### Task 1: Add failing v10 contract and routing tests

**Files:**
- Create: `tests/analysis-template-v10-contract.test.mjs`
- Test: `src/components/analysis/analysisTemplateV10.ts`
- Test: `src/pages/Analysis.tsx`

**Interfaces:**
- The section contract exports `V10_ANALYSIS_SECTIONS` with `{ id, number, title }` entries.
- The routing source must contain an explicit `templateVersion === "v10"` branch.

- [ ] **Step 1: Write the failing tests**

```js
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const componentUrl = new URL("../src/components/analysis/analysisTemplateV10.ts", import.meta.url);
const pageUrl = new URL("../src/pages/Analysis.tsx", import.meta.url);

test("v10 section contract has the ten PDF sections in order", async () => {
  const source = await readFile(componentUrl, "utf8");
  const expected = [
    ["company-management", "I", "Företag & ledning"],
    ["business-model", "II", "Affärsmodell"],
    ["industry-moat", "III", "Bransch & moat"],
    ["financial-quality", "IV", "Finansiell kvalitet"],
    ["scorecard", "V", "Scorecard"],
    ["fundamental-valuation", "VI", "Fundamental värdering"],
    ["catalysts", "VII", "Kursdrivare"],
    ["risks", "VIII", "Risker"],
    ["thesis-changers", "IX", "Tesförändrare"],
    ["investment-decision", "X", "Investeringsbeslut"],
  ];

  assert.match(source, /export const V10_ANALYSIS_SECTIONS/);
  assert.equal((source.match(/id: "/g) || []).length, 10);
  for (const [id, number, title] of expected) {
    assert.match(source, new RegExp(`id: "${id}"`));
    assert.match(source, new RegExp(`number: "${number}"`));
    assert.match(source, new RegExp(`title: "${title}"`));
  }
  assert.ok(expected.every(([_, __, title], index) => source.indexOf(`title: "${title}"`) > (index === 0 ? -1 : source.indexOf(`title: "${expected[index - 1][2]}"`))));
});

test("analysis routing selects v10 only for explicitly versioned analyses", async () => {
  const source = await readFile(pageUrl, "utf8");
  assert.match(source, /templateVersion\s*===\s*["']v10["']/);
  assert.match(source, /ComprehensiveAnalysisV10/);
  assert.match(source, /ComprehensiveAnalysis/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/analysis-template-v10-contract.test.mjs`

Expected: FAIL because the v10 contract, version field branch and v10 component do not yet exist.

---

### Task 2: Add versioned analysis data support and v10 section contract

**Files:**
- Modify: `src/types/analysis.ts`
- Modify: `src/data/analyses/nordea/nordea-bank-2026.ts`
- Create: `src/components/analysis/analysisTemplateV10.ts`

**Interfaces:**
- `AnalysisData.templateVersion?: "legacy" | "v10"`.
- `V10_ANALYSIS_SECTIONS` is the single source for v10 sidebar order and section IDs.

- [ ] **Step 1: Add the version field and first v10 assignment**

Add `templateVersion?: "legacy" | "v10"` to `AnalysisData`, and add `templateVersion: "v10"` to `nordea2026`.

- [ ] **Step 2: Add the exact v10 section contract**

```ts
export interface AnalysisTemplateSection {
  id: string;
  number: string;
  title: string;
}

export const V10_ANALYSIS_SECTIONS: AnalysisTemplateSection[] = [
  { id: "company-management", number: "I", title: "Företag & ledning" },
  { id: "business-model", number: "II", title: "Affärsmodell" },
  { id: "industry-moat", number: "III", title: "Bransch & moat" },
  { id: "financial-quality", number: "IV", title: "Finansiell kvalitet" },
  { id: "scorecard", number: "V", title: "Scorecard" },
  { id: "fundamental-valuation", number: "VI", title: "Fundamental värdering" },
  { id: "catalysts", number: "VII", title: "Kursdrivare" },
  { id: "risks", number: "VIII", title: "Risker" },
  { id: "thesis-changers", number: "IX", title: "Tesförändrare" },
  { id: "investment-decision", number: "X", title: "Investeringsbeslut" },
];
```

- [ ] **Step 3: Run the contract test**

Run: `node --test tests/analysis-template-v10-contract.test.mjs`

Expected: The section-contract assertions pass; routing assertions remain failing until Task 3.

---

### Task 3: Implement the v10 standard renderer and route only versioned analyses to it

**Files:**
- Create: `src/components/analysis/ComprehensiveAnalysisV10.tsx`
- Modify: `src/pages/Analysis.tsx`

**Interfaces:**
- `ComprehensiveAnalysisV10` receives the same props as `ComprehensiveAnalysis`.
- Existing `ComprehensiveAnalysis` remains the fallback for all analyses without `templateVersion: "v10"`.

- [ ] **Step 1: Build the v10 renderer around `AnalysisLayout`**

Use `V10_ANALYSIS_SECTIONS` for the sidebar. Render exactly ten matching `<section id>` blocks. Reuse existing `AnalysisData` fields and shared components (`SectionHeader`, `Card`, `MetricCard`, `RatingBox`, `ScenarioCards`, `SwotGrid`, `AdUnit`) where they fit. Keep missing optional data hidden or use the existing safe fallback copy; do not invent financial values.

Map content as follows: company/management; business model; industry/moat; financial quality; scorecard; valuation/scenarios/price zones; catalysts; risks; thesis breakers/watch items; conclusion/recommendation/next steps.

- [ ] **Step 2: Add explicit v10 routing**

Import `ComprehensiveAnalysisV10` and render it when `analysis.templateVersion === "v10"`. Keep the existing deep-dive branch first, then use the v10 branch, then the current `ComprehensiveAnalysis` fallback.

- [ ] **Step 3: Run the contract test**

Run: `node --test tests/analysis-template-v10-contract.test.mjs`

Expected: PASS.

---

### Task 4: Verify legacy preservation and build health

**Files:**
- No additional production files.

- [ ] **Step 1: Confirm only Nordea is v10-marked**

Run: `rg -n "templateVersion" src/data/analyses src/types/analysis.ts`

Expected: the optional type declaration and Nordea's `templateVersion: "v10"` assignment only.

- [ ] **Step 2: Confirm special routing remains unchanged**

Run: `git diff -- src/components/analysis/PlejdDeepDive.tsx src/components/analysis/ABBDeepDive.tsx src/components/analysis/HandelsbankenDeepDive.tsx src/components/analysis/SwedbankDeepDive.tsx src/components/analysis/AxfoodDeepDive.tsx`

Expected: no output.

- [ ] **Step 3: Run type checking**

Run: `npm run lint`

Expected: PASS with no TypeScript errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: Vite build completes successfully.

- [ ] **Step 5: Run the existing contract tests**

Run: `node --test tests/*.test.mjs`

Expected: PASS.

