# House Sale Equity Estimate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clear, public estimate of the capital left after selling a current home, paying remaining loans and a broker fee.

**Architecture:** Extend the shared house-calculator input and math module with sale-specific values and one pure sale-equity calculation. Present the calculation in a separate editorial section inside the existing public preview, while preserving the current savings goal and member dashboard behavior.

**Tech Stack:** React, TypeScript, Tailwind CSS, Node test runner.

## Global Constraints

- Include only home value, remaining mortgage debt, and broker fee in the estimate.
- Do not calculate or imply capital-gains tax.
- Label all sale amounts as estimates and state excluded costs clearly.
- Keep the work limited to the isolated house-calculator branch; do not modify report-calendar, API, CORS, or authentication code.

---

### Task 1: Sale-equity calculation and validated assumptions

**Files:**
- Modify: `src/lib/savingsGoalMath.ts`
- Modify: `src/components/house/HouseCalculatorInputs.tsx`
- Modify: `src/components/house/HouseCalculator.tsx`
- Test: `tests/savings-goal-math.test.mjs`
- Test: `tests/house-calculator-contract.test.mjs`

**Interfaces:**
- Produces `SaleEquityPreview` with `brokerFee`, `netSaleProceeds`, and `negativeEquity`.
- Produces `calculateSaleEquity(input: HouseCalculatorInput): SaleEquityPreview`.
- Adds `currentHomeValue`, `remainingMortgageDebt`, and `brokerFeePercent` to `HouseCalculatorInput`.

- [ ] **Step 1: Write failing tests**

```js
assert.deepEqual(calculateSaleEquity({
  ...baseInput,
  currentHomeValue: 4_000_000,
  remainingMortgageDebt: 2_400_000,
  brokerFeePercent: 2,
}), {
  brokerFee: 80_000,
  netSaleProceeds: 1_520_000,
  negativeEquity: false,
});
```

Add a second test that debt plus fee exceeding value returns `netSaleProceeds: 0` and `negativeEquity: true`.

- [ ] **Step 2: Run the focused tests and verify they fail**

Run: `node --test tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs`

Expected: failure because `calculateSaleEquity` and the three sale fields do not exist.

- [ ] **Step 3: Implement the minimal shared calculation and inputs**

```ts
export interface SaleEquityPreview {
  brokerFee: number;
  netSaleProceeds: number;
  negativeEquity: boolean;
}

export function calculateSaleEquity(input: HouseCalculatorInput): SaleEquityPreview {
  const brokerFee = input.currentHomeValue * (input.brokerFeePercent / 100);
  const rawNetSaleProceeds = input.currentHomeValue - input.remainingMortgageDebt - brokerFee;

  return {
    brokerFee,
    netSaleProceeds: Math.max(0, rawNetSaleProceeds),
    negativeEquity: rawNetSaleProceeds < 0,
  };
}
```

Add the fields to `HOUSE_INPUT_LIMITS`, validation, defaults and the reusable number-input grid with Swedish labels: `Nuvarande bostadsvärde`, `Kvarvarande bolån`, and `Mäklararvode (%)`.

- [ ] **Step 4: Run focused tests and verify they pass**

Run: `node --test tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/savingsGoalMath.ts src/components/house/HouseCalculatorInputs.tsx src/components/house/HouseCalculator.tsx tests/savings-goal-math.test.mjs tests/house-calculator-contract.test.mjs
git commit -m "feat: calculate estimated home sale equity"
```

### Task 2: Editorial sale-equity section and member-plan context

**Files:**
- Create: `src/components/house/HouseSaleEquityPreview.tsx`
- Modify: `src/components/house/HouseCalculator.tsx`
- Modify: `src/components/house/MemberPlanPreview.tsx`
- Test: `tests/house-calculator-contract.test.mjs`

**Interfaces:**
- Consumes `SaleEquityPreview` and `hasValidationErrors`.
- Produces a public `HouseSaleEquityPreview` section.

- [ ] **Step 1: Write failing UI contract tests**

```js
assert.match(salePreviewSource, /Om du säljer idag/);
assert.match(salePreviewSource, /Ungefär kvar efter försäljning/);
assert.match(salePreviewSource, /Vinstskatt, flyttkostnader, bankavgifter, pantbrev och andra eventuella lån ingår inte/);
assert.match(calculatorSource, /<HouseSaleEquityPreview/);
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test tests/house-calculator-contract.test.mjs`

Expected: failure because the component and copy do not exist.

- [ ] **Step 3: Implement the editorial presentation**

Create a warm cream section with a restrained house illustration/icon, compact three-line calculation, and an emphasized result. Use the exact labels `Bostadsvärde`, `Kvarvarande bolån`, `Mäklararvode` and `Ungefär kvar efter försäljning`. Show a neutral warning when net proceeds are zero. Add the exact excluded-cost note from Step 1 and never mention a calculated tax.

Place the component below the first public overview and above the guest member preview. Add concise member-preview copy that identifies the calculation as a possible “kapital från nuvarande hem” in the personal plan, without changing savings automatically.

- [ ] **Step 4: Run focused test and verify it passes**

Run: `node --test tests/house-calculator-contract.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/house/HouseSaleEquityPreview.tsx src/components/house/HouseCalculator.tsx src/components/house/MemberPlanPreview.tsx tests/house-calculator-contract.test.mjs
git commit -m "feat: show estimated capital after home sale"
```

### Task 3: Integration verification

**Files:**
- Verify: `src/components/house/HouseCalculator.tsx`
- Verify: `src/components/house/HouseSaleEquityPreview.tsx`

- [ ] **Step 1: Run relevant automated verification**

Run: `node --test tests/house-calculator-contract.test.mjs tests/savings-goal-math.test.mjs tests/savings-goal-dashboard-contract.test.mjs tests/savings-goal-service.test.mjs && npm run lint && npm run build`

Expected: all selected tests, typecheck and build pass.

- [ ] **Step 2: Verify the rendered flow**

Open `/verktyg/huskalkylator`, set home value to `4000000`, mortgage debt to `2400000`, and broker fee to `2`. Confirm the result is `1 520 000 kr`, the excluded-cost note is visible, and desktop/mobile layouts have no overflow or console errors.

- [ ] **Step 3: Commit any verification-only corrections**

```bash
git add <only files changed to correct verified sale-equity behavior>
git commit -m "fix: polish home sale equity estimate"
```
