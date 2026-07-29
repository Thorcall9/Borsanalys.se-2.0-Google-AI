# House Calculator Sale-Choice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors choose whether estimated equity from selling a current home should be included in the next-home calculation, while keeping a dedicated sale-only tab.

**Architecture:** Keep the shared input state and pure sale math. Add local calculator UI state for the active tab and the opt-in choice. Feed a derived, one-off available-capital value to the existing next-home preview without changing the persisted savings input or the investment projection.

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Node test runner.

## Global Constraints

- Preserve the isolated house-calculator branch; do not modify report-calendar, API, CORS, or authentication code.
- Do not calculate or imply capital-gains tax.
- Keep this exact exclusion copy: `Vinstskatt, flyttkostnader, bankavgifter, pantbrev och andra eventuella lån ingår inte`.
- Sale capital is optional and is never automatically included in a next-home plan.
- The savings projection must stay based on actual savings and monthly saving, not a possible sale.

---

### Task 1: Optional sale capital in the next-home preview

**Files:**
- Modify: `src/components/house/HouseCalculatorPreview.tsx`
- Modify: `src/components/house/HouseCalculator.tsx`
- Test: `tests/savings-goal-math.test.mjs`
- Test: `tests/house-calculator-contract.test.mjs`

**Interfaces:**
- `HouseCalculatorPreview` receives optional `capitalSummary: { currentSavings: number; saleCapital: number; totalCapital: number; includesSaleCapital: boolean }`.
- `HouseCalculator` derives `totalCapital = currentSavings + salePreview.netSaleProceeds` only when `includeSaleCapital` is true.

- [ ] **Step 1: Write failing tests**

```js
assert.match(calculatorSource, /includeSaleCapital/);
assert.match(calculatorSource, /totalCapital/);
assert.match(previewSource, /Totalt kapital till nästa bostad/);
assert.match(previewSource, /Kapital från nuvarande hem/);
```

Add a math test showing that a 600 000 kr down-payment target with 150 000 kr savings and 1 520 000 kr opted-in sale capital has zero remaining amount, while the same input without the added capital still has 450 000 kr remaining.

- [ ] **Step 2: Run focused tests and verify they fail**

Run: `node --import tsx --test tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs`

Expected: FAIL because the optional capital summary and opt-in behavior do not exist.

- [ ] **Step 3: Implement the derived capital summary**

```ts
const saleCapital = includeSaleCapital && saleEquityPreview ? saleEquityPreview.netSaleProceeds : 0;
const totalCapital = input.currentSavings + saleCapital;
const nextHomeInput = { ...input, currentSavings: totalCapital };
const preview = hasSavingsValidationErrors ? null : calculateHousePreview(nextHomeInput);
```

Render a full-width, readable capital breakdown in `HouseCalculatorPreview`. When sale capital is opted in, show actual savings, `Kapital från nuvarande hem`, and `Totalt kapital till nästa bostad`; otherwise show actual savings and total capital only. Keep the current illustrative house small and framed within this summary, never as a narrow full-height image column.

- [ ] **Step 4: Run focused tests and verify they pass**

Run: `node --import tsx --test tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/house/HouseCalculator.tsx src/components/house/HouseCalculatorPreview.tsx tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs
git commit -m "feat: include optional sale capital in house plan"
```

### Task 2: Guided tabs and conditional assumptions

**Files:**
- Modify: `src/components/house/HouseCalculator.tsx`
- Modify: `src/components/house/HouseCalculatorInputs.tsx`
- Test: `tests/house-calculator-contract.test.mjs`

**Interfaces:**
- `HouseCalculatorInputs` receives `mode: 'next-home' | 'sale-today'`.
- In `next-home` mode it receives `includeSaleCapital: boolean` and `onIncludeSaleCapitalChange: (checked: boolean) => void`.

- [ ] **Step 1: Write failing UI contract tests**

```js
assert.match(calculatorSource, /Nästa bostad/);
assert.match(calculatorSource, /Om du säljer idag/);
assert.match(inputSource, /Jag vill räkna med pengar från min nuvarande bostad/);
assert.match(inputSource, /onIncludeSaleCapitalChange/);
```

- [ ] **Step 2: Run focused contract test and verify it fails**

Run: `node --import tsx --test tests/house-calculator-contract.test.mjs`

Expected: FAIL because the tabs and opt-in control do not exist.

- [ ] **Step 3: Implement the guided UI**

```tsx
const [activeTab, setActiveTab] = useState<'next-home' | 'sale-today'>('next-home');
const [includeSaleCapital, setIncludeSaleCapital] = useState(false);
```

Render accessible tab buttons with `aria-selected` and panels. In `next-home`, render the next-home inputs and the checkbox. Only reveal `Nuvarande bostadsvärde`, `Kvarvarande bolån`, and `Mäklararvode (%)` after the checkbox is checked. In `sale-today`, render only the three sale inputs and the standalone sale estimate. Keep the input deletion/retyping behavior intact.

- [ ] **Step 4: Run focused contract test and verify it passes**

Run: `node --import tsx --test tests/house-calculator-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/house/HouseCalculator.tsx src/components/house/HouseCalculatorInputs.tsx tests/house-calculator-contract.test.mjs
git commit -m "feat: guide house calculator with sale choice"
```

### Task 3: Full-width editorial results and compact member invite

**Files:**
- Modify: `src/components/house/HouseCalculator.tsx`
- Modify: `src/components/house/HouseSaleEquityPreview.tsx`
- Modify: `src/components/house/MemberPlanPreview.tsx`
- Test: `tests/house-calculator-contract.test.mjs`

**Interfaces:**
- `HouseSaleEquityPreview` remains the standalone, sale-tab result.
- `MemberPlanPreview` remains guest-only and uses a compact horizontal layout.

- [ ] **Step 1: Write failing layout contract tests**

```js
assert.doesNotMatch(calculatorSource, /<div className="grid gap-6 lg:grid-cols-2">[\s\S]*HouseSaleEquityPreview[\s\S]*MemberPlanPreview/);
assert.match(memberPreviewSource, /sm:flex/);
assert.match(salePreviewSource, /object-cover/);
```

- [ ] **Step 2: Run focused contract test and verify it fails**

Run: `node --import tsx --test tests/house-calculator-contract.test.mjs`

Expected: FAIL because the narrow side-by-side guest cards still exist.

- [ ] **Step 3: Implement the spacious result stack**

Render one full-width result at a time: the next-home overview in the next-home tab, or `HouseSaleEquityPreview` in the sale tab. Place `MemberPlanPreview` beneath it. Change its outer layout to a horizontal card at `sm` and remove the tall bars that compete with text. Change the standalone sale card image to a short, framed illustration area (`sm:grid-cols-[minmax(0,1fr)_12rem]` or similar) so all figures fit without clipping.

- [ ] **Step 4: Run focused contract test and verify it passes**

Run: `node --import tsx --test tests/house-calculator-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/house/HouseCalculator.tsx src/components/house/HouseSaleEquityPreview.tsx src/components/house/MemberPlanPreview.tsx tests/house-calculator-contract.test.mjs
git commit -m "feat: simplify house calculator result layout"
```

### Task 4: Verification

**Files:**
- Verify: `src/components/house/HouseCalculator.tsx`
- Verify: `src/components/house/HouseCalculatorInputs.tsx`
- Verify: `src/components/house/HouseCalculatorPreview.tsx`

- [ ] **Step 1: Run automated verification**

Run: `node --import tsx --test tests/house-calculator-contract.test.mjs tests/savings-goal-math.test.mjs tests/savings-goal-dashboard-contract.test.mjs tests/savings-goal-service.test.mjs && npm run lint && npm run build`

Expected: all selected tests, typecheck, and production build pass.

- [ ] **Step 2: Verify the browser flow**

Open `/verktyg/huskalkylator`. Confirm that the default next-home tab hides sale inputs. Check the choice, enter 4 000 000 / 2 400 000 / 2, and confirm that 1 520 000 kr is included in total capital. Open `Om du säljer idag`; confirm the same standalone estimate and exclusion copy. Check desktop and a 390 px mobile viewport for readable results, no horizontal overflow, and no console errors.

- [ ] **Step 3: Commit verification-only corrections if needed**

```bash
git add src/components/house/HouseCalculator.tsx src/components/house/HouseCalculatorInputs.tsx src/components/house/HouseCalculatorPreview.tsx src/components/house/HouseSaleEquityPreview.tsx src/components/house/MemberPlanPreview.tsx tests/house-calculator-contract.test.mjs tests/savings-goal-math.test.mjs
git commit -m "fix: polish guided house calculator"
```
