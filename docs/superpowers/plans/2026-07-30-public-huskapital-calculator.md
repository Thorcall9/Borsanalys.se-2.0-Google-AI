# Public Huskapital Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current public huskalkylator with a calm, editorial Huskapital experience that anyone can use without an account, and that combines savings with optional estimated proceeds from selling a current home.

**Architecture:** Keep `/verktyg/huskalkylator` as the one public product page and make `/huskapital` lead to it. Build one public scenario adapter around the existing housing-plan and sale-equity math, then let the form, summary, sale explanation and forecast all consume that same scenario. Remove all authentication, Firestore writes, browser persistence and member-only rendering from the public route.

**Tech Stack:** React 18, TypeScript, React Router, Tailwind CSS, Lucide icons, Node built-in test runner, Vite.

## Global Constraints

- Do not edit report-calendar, API, Firebase rules, or user-profile functionality.
- Do not write calculator inputs, plans, history or results to Firestore, localStorage, sessionStorage, or cookies.
- Do not require sign-in or show an account/paywall CTA in the calculator flow.
- Retain the existing Vercel SPA rewrites so direct `/huskapital` loads keep working.
- Use one calculation source for capital need, sale proceeds, total available capital, remaining amount, loan and monthly cost. Do not duplicate formulas inside React components.
- Treat all sale figures as estimates and visibly exclude capital-gains tax, moving costs, bank fees, deeds and other possible costs.

## File Map

| File | Change |
| --- | --- |
| `src/lib/savingsGoalMath.ts` | Add a typed public-scenario adapter that composes sale-equity and `housingPlanMath` results. |
| `tests/public-huskapital-scenario.test.mjs` | Add calculation tests for saving-only, selling, property types and negative sale equity. |
| `src/components/house/HouseCalculator.tsx` | Make the calculator public-only, use the shared scenario and remove authentication/save/member gates. |
| `src/components/house/HouseCalculatorInputs.tsx` | Replace the tabbed, long input surface with a guided inline form and optional sale section. |
| `src/components/house/HouseCalculatorPreview.tsx` | Display one combined capital result and housing-plan costs from the shared scenario. |
| `src/components/house/HouseSaleEquityPreview.tsx` | Keep the sale estimate explanatory and clearly subordinate to the combined result. |
| `src/pages/HouseCalculator.tsx` | Remove Auth/Firestore save wiring and render the public product page only. |
| `src/pages/Huskapital.tsx` | Redirect the legacy Huskapital URL to the public calculator without an auth gate. |
| `src/App.tsx` | Register `/huskapital` as a standard public route rather than wrapping it in `InternalRoute`. |
| `tests/huskapital-route-and-permissions.test.mjs` | Replace protected-route/Firestore assertions with public-route and no-persistence assertions. |
| `tests/public-huskapital-ui-contract.test.mjs` | Add source-level contract checks for the open flow and removal of member-only UI. |

---

## Task 1: Create one public housing scenario calculation contract

**Files:**
- Modify: `src/lib/savingsGoalMath.ts`
- Create: `tests/public-huskapital-scenario.test.mjs`

- [ ] **Step 1: Write failing calculations tests.**

  Create a Node test file that imports the compiled/source math module through the project’s existing TypeScript test pattern. Cover these exact scenarios:

  - savings-only: `150_000 kr` savings is the only available capital;
  - include-sale: home value `4_000_000`, remaining loan `2_400_000`, broker fee `2%`, so estimated sale proceeds are `1_520_000 kr` and total available capital becomes `1_670_000 kr`;
  - villa: capital goal includes deposit, lagfart and required new pantbrev;
  - bostadsrätt: capital goal includes deposit and buffer only, with `lagfart` and `pantbrev` absent rather than zero;
  - negative sale equity: sale proceeds cannot reduce the user’s available capital below their own savings.

  Example expected contract:

  ```ts
  const scenario = calculatePublicHousingScenario({
    homePrice: 4_000_000,
    housingType: 'HOUSE',
    downPaymentPercent: 15,
    currentSavings: 150_000,
    monthlySaving: 10_000,
    includeSaleCapital: true,
    currentHomeValue: 4_000_000,
    remainingMortgageDebt: 2_400_000,
    brokerFeePercent: 2,
  })

  assert.equal(scenario.sale.netSaleProceeds, 1_520_000)
  assert.equal(scenario.totalAvailableCapital, 1_670_000)
  ```

- [ ] **Step 2: Run the new test and confirm it fails because the public scenario API does not exist.**

  Run: `node --test tests/public-huskapital-scenario.test.mjs`

  Expected: failure referring to the missing `calculatePublicHousingScenario` export or its unresolved behavior.

- [ ] **Step 3: Add the typed scenario adapter in `savingsGoalMath.ts`.**

  Add and export these types/functions near the existing calculator math:

  ```ts
  export interface PublicHousingScenarioInput extends HouseCalculatorInput {
    housingType: HousingType
    includeSaleCapital: boolean
  }

  export interface PublicHousingScenario {
    plan: HousingPlanResult
    sale: SaleEquityResult | null
    saleCapital: number
    totalAvailableCapital: number
    remainingCapital: number
    progressPercent: number
    forecastMonths: number | null
  }

  export function calculatePublicHousingScenario(
    input: PublicHousingScenarioInput,
  ): PublicHousingScenario
  ```

  The implementation must call `calculateHousingPlan`, `calculateProgress`, `calculateForecastMonths`, and the existing `calculateSaleEquity` rather than reproducing their formulas. Map the public input names to the housing-plan engine values, including assessed value, existing mortgage deeds and extra buffer where available. Set `sale` to `null` when sale capital is not selected; clamp `saleCapital` at zero; calculate `totalAvailableCapital` as savings plus selected sale capital; and calculate remaining/progress/forecast from the same `plan.totalCapitalNeed`.

- [ ] **Step 4: Run calculation tests and the existing housing-plan tests.**

  Run:

  ```bash
  node --test tests/public-huskapital-scenario.test.mjs
  node --test tests/housing-plan-math.test.mjs
  ```

  Expected: both pass, proving the public adapter agrees with existing fee rules.

- [ ] **Step 5: Commit the calculation foundation.**

  ```bash
  git add src/lib/savingsGoalMath.ts tests/public-huskapital-scenario.test.mjs
  git commit -m "feat: add public Huskapital scenario math"
  ```

## Task 2: Turn the calculator into a guided, entirely open experience

**Files:**
- Modify: `src/components/house/HouseCalculator.tsx`
- Modify: `src/components/house/HouseCalculatorInputs.tsx`
- Modify: `src/components/house/HouseCalculatorPreview.tsx`
- Modify: `src/components/house/HouseSaleEquityPreview.tsx`
- Create: `tests/public-huskapital-ui-contract.test.mjs`

- [ ] **Step 1: Write failing UI-contract tests.**

  Add source-level Node assertions that require:

  - `HouseCalculator.tsx` imports and calls `calculatePublicHousingScenario`;
  - neither `HouseCalculator.tsx` nor `HouseCalculatorInputs.tsx` imports `useAuth`, `MemberPlanPreview`, `MemberUnlockPanel`, `createSavingsGoal`, or `notifySavingsGoalRefresh`;
  - the calculator includes the copy “Jag vill räkna med pengar från min nuvarande bostad” and “Uppskattning – inte ett löfte”;
  - no “Logga in”, “Spara mitt husmål”, “Full prognos är upplåst”, or “För medlemmar” is rendered by the calculator components;
  - `HouseCalculatorPreview.tsx` labels the combined result “Totalt kapital till nästa bostad”.

- [ ] **Step 2: Run the UI-contract test and confirm it fails against the current gated calculator.**

  Run: `node --test tests/public-huskapital-ui-contract.test.mjs`

  Expected: failures identifying auth/member imports and old locked-flow copy.

- [ ] **Step 3: Simplify the form in `HouseCalculatorInputs.tsx`.**

  Replace the two-tab control with one guided sequence:

  1. “Nästa bostad” with segmented/select input for `Villa`, `Bostadsrätt`, and `Ägarlägenhet`;
  2. bostadspris, kontantinsats (default 15%) and månadssparande;
  3. one optional checkbox, “Jag vill räkna med pengar från min nuvarande bostad”;
  4. only when checked: likely sale price, remaining loans and broker fee.

  Use controlled text/number inputs that permit deleting/replacing every digit, including a first digit in `4 000 000`. Keep non-core property values under a concise “Fler val” disclosure. Do not show lagfart or pantbrev inputs in the basic form; the shared engine calculates them automatically from property type.

- [ ] **Step 4: Refactor `HouseCalculator.tsx` to one scenario and no account behavior.**

  Remove the `onSave` prop, all auth hooks, save state, login actions, `MemberPlanPreview`, and `MemberUnlockPanel`. Keep local React state only for the current form values. Create the scenario with `calculatePublicHousingScenario` and pass it through to all presentation components. Render the forecast chart and table for every visitor, using the scenario’s capital target/remaining amount rather than a separate preview calculation.

  The top editorial copy should clearly state that the calculator is open:

  > Planera nästa hem med ditt sparande – och, om du vill, en uppskattning av vad som kan bli kvar efter en försäljning.

- [ ] **Step 5: Make the result one coherent capital story.**

  Update `HouseCalculatorPreview.tsx` so the primary card contains:

  - total capital needed for the selected home;
  - total capital available now (savings plus selected estimated sale proceeds);
  - amount remaining and simple forecast;
  - estimated mortgage and monthly cost;
  - property-specific fees only for Villa/Ägarlägenhet.

  If the sale option is enabled, render `HouseSaleEquityPreview` below or beside the main card as a transparent explanation of the sale estimate, never as a separate competing journey. Its disclosure must explicitly state that capital-gains tax, moving costs, bank fees, deeds and other costs are excluded.

- [ ] **Step 6: Run the UI-contract test.**

  Run: `node --test tests/public-huskapital-ui-contract.test.mjs`

  Expected: pass, demonstrating the public page no longer gates, saves or advertises a hidden member flow.

- [ ] **Step 7: Commit the public UI.**

  ```bash
  git add src/components/house/HouseCalculator.tsx src/components/house/HouseCalculatorInputs.tsx src/components/house/HouseCalculatorPreview.tsx src/components/house/HouseSaleEquityPreview.tsx tests/public-huskapital-ui-contract.test.mjs
  git commit -m "feat: make Huskapital calculator open to everyone"
  ```

## Task 3: Remove persistence from the public routes and make `/huskapital` a friendly alias

**Files:**
- Modify: `src/pages/HouseCalculator.tsx`
- Modify: `src/pages/Huskapital.tsx`
- Modify: `src/App.tsx`
- Modify: `tests/huskapital-route-and-permissions.test.mjs`

- [ ] **Step 1: Rewrite route/page tests before changing route code.**

  Replace assertions that `/huskapital` is protected with assertions that:

  - `HouseCalculator.tsx` page imports no `useAuth`, `createSavingsGoal`, `notifySavingsGoalRefresh`, or savings-goal service;
  - `/verktyg/huskalkylator` is rendered without an `onSave` callback;
  - `Huskapital.tsx` uses React Router `Navigate` to `/verktyg/huskalkylator` with `replace`;
  - `Huskapital.tsx` has no auth hook, login modal or `SavingsGoalDashboard` reference;
  - `App.tsx` registers `/huskapital` outside `InternalRoute` so the alias is accessible before authentication;
  - no test expects Firestore access for the public calculator.

- [ ] **Step 2: Run the route test and confirm it fails.**

  Run: `node --test tests/huskapital-route-and-permissions.test.mjs`

  Expected: failure because the present code still contains authentication, save wiring and a protected dashboard route.

- [ ] **Step 3: Make `HouseCalculator.tsx` a pure public page.**

  Remove the save handler, success/error banners, account-dependent CTA and all Firestore/auth imports. Render `<HouseCalculator />` directly. Keep the page-level financial disclaimer, but replace account-focused language with a short statement that the calculation is not saved.

- [ ] **Step 4: Make `Huskapital.tsx` a route alias.**

  Replace the protected dashboard/login-gate component with:

  ```tsx
  import { Navigate } from 'react-router-dom'

  export default function Huskapital() {
    return <Navigate to="/verktyg/huskalkylator" replace />
  }
  ```

  This preserves existing links while ensuring the same, open product appears at either URL. Retain the existing `vercel.json` rewrites from the earlier direct-load fix; do not modify unrelated rewrites.

- [ ] **Step 4b: Remove the app-level auth wrapper.**

  In `App.tsx`, move the `/huskapital` route out of `InternalRoute` and register it as a normal public route. Do not alter any other protected routes.

- [ ] **Step 5: Run the route test.**

  Run: `node --test tests/huskapital-route-and-permissions.test.mjs`

  Expected: pass, proving both public URLs avoid authentication and persistence.

- [ ] **Step 6: Commit public-route cleanup.**

  ```bash
  git add src/App.tsx src/pages/HouseCalculator.tsx src/pages/Huskapital.tsx tests/huskapital-route-and-permissions.test.mjs
  git commit -m "refactor: expose Huskapital as a public tool"
  ```

## Task 4: Verify calculations, interactions and responsive layout before release

**Files:**
- Verify: files changed in Tasks 1–3
- Verify: `vercel.json`

- [ ] **Step 1: Run the full relevant automated suite.**

  Run:

  ```bash
  node --test tests/public-huskapital-scenario.test.mjs tests/public-huskapital-ui-contract.test.mjs tests/huskapital-route-and-permissions.test.mjs tests/housing-plan-math.test.mjs
  npm run lint
  npm run build
  ```

  Expected: all tests, lint and production build pass.

- [ ] **Step 2: Perform desktop interactive QA.**

  On `/verktyg/huskalkylator`, verify:

  - no login is required and no save action is displayed;
  - a visitor can erase and replace `4 000 000` with `6 000 000` cleanly;
  - unchecked sale option uses savings only;
  - checking sale option reveals sale inputs and recalculates available capital in the primary summary;
  - switching Villa/Bostadsrätt/Ägarlägenhet updates fees correctly, with no zero-valued lagfart/pantbrev for Bostadsrätt;
  - the sale detail states its exclusions;
  - the forecast/table is available without an account.

- [ ] **Step 3: Perform mobile QA.**

  Verify at 390 px and 768 px widths that the input sequence, property type control, checkbox, summary cards, chart and sale estimate have no horizontal scroll or clipped currency values. Confirm the primary total-capital result appears before secondary sale detail.

- [ ] **Step 4: Verify direct route behavior.**

  Open `/huskapital` directly in a fresh browser session and confirm it resolves to `/verktyg/huskalkylator` without a 404, login redirect or Firebase request.

- [ ] **Step 5: Commit any verification-only fixes, then publish through the normal review flow.**

  ```bash
  git status --short
  git add <only-files-fixed-during-verification>
  git commit -m "fix: polish public Huskapital calculator"
  git push -u origin codex/public-huskapital-calculator
  ```

  Open a PR against the latest `main`, verify Vercel’s production deployment after merge, and do not merge or overwrite concurrent report-calendar work.
