# Huskapital Dashboard V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the signed-in Huskapital dashboard as a calm, personal housing journey with reliable purchase calculations and capital continuity.

**Architecture:** Keep the calculation rules as pure, named functions under `src/lib`; adapt legacy savings-goal documents into the new housing plan without dropping fields. The profile dashboard composes an overview, a right-side housing-plan drawer, and a fast capital-update sheet that persists an append-only history entry.

**Tech Stack:** React, TypeScript, Firebase Firestore, Tailwind CSS, Node test runner with `tsx`.

## Global Constraints

- Work only in `/private/tmp/borsanalys-house-editorial-release`; do not modify the report-calendar worktree.
- Use one calculation engine for capital goal, progress, loan, property fees and forecast.
- Villa and ägarlägenhet include lagfart and pantbrev; bostadsrätt hides them entirely.
- Default kontantinsats is 15%; lagfart is 1.5% + 825 kr; new pantbrev is 2% + 375 kr.
- Preserve legacy savings-goal values and add history without replacing existing records.
- Prefer low cognitive load over additional configuration.

---

### Task 1: Calculation and persistence foundation

**Files:**
- Modify: `src/lib/housingPlanMath.ts`
- Create: `src/lib/housingPlanAdapter.ts`
- Modify: `src/lib/savingsGoalMath.ts`
- Modify: `src/services/savingsGoalService.ts`
- Create: `src/services/housingCapitalHistoryService.ts`
- Test: `tests/housing-plan-math.test.mjs`

**Produces:** `calculateHousingPlan`, named purchase-cost helpers, progress/forecast helpers, backwards-compatible goal fields and append-only capital-history API.

- [ ] Write failing unit tests for owner-apartment costs, no title fee for condominiums, progress bounds and a zero-savings forecast.
- [ ] Run `node --import tsx --test tests/housing-plan-math.test.mjs` and confirm the missing named helper exports fail.
- [ ] Implement pure helpers in `housingPlanMath.ts` and route the aggregate plan calculation through them.
- [ ] Run the focused test again and confirm it passes.
- [ ] Run lint and the savings-goal service contract tests.

### Task 2: Focused plan and update surfaces

**Files:**
- Create: `src/components/house/HousingPlanDrawer.tsx`
- Create: `src/components/house/CapitalUpdateSheet.tsx`
- Test: `tests/huskapital-dashboard-v1-contract.test.mjs`

**Produces:** a desktop right drawer/mobile sheet with four initial fields and `Fler val`; a capital update flow with current amount, new total and save action.

- [ ] Write source contract tests for Swedish labels, the three housing types and the advanced controls.
- [ ] Run the contract test and confirm it fails because the components are absent.
- [ ] Implement accessible dialog surfaces with controlled number input fields that may be cleared and retyped.
- [ ] Run the contract test and lint.

### Task 3: Personal dashboard overview and integration

**Files:**
- Modify: `src/components/house/SavingsGoalDashboard.tsx`
- Modify: `src/components/house/SavingsGoalCard.tsx`
- Test: `tests/savings-goal-dashboard-contract.test.mjs`
- Test: `tests/huskapital-dashboard-v1-contract.test.mjs`

**Produces:** a warm overview that answers current capital, total goal, progress, remaining amount and forecast, plus the two primary actions and recent-change indicator.

- [ ] Extend the dashboard contract test first for `Planera nästa bostad`, `Uppdatera huskapital` and the core summary labels.
- [ ] Run the test and confirm it fails against the existing dashboard.
- [ ] Replace legacy preview-derived figures with the housing-plan engine; load history in parallel with goals and save capital updates as both a goal update and a history entry.
- [ ] Integrate the drawer and update sheet; show the latest delta, a small history visual and property fees only where applicable.
- [ ] Run lint and the dashboard/unit test suite.

### Task 4: Visual QA, review and release preparation

**Files:**
- Modify: files found through visual QA only
- Test: all Huskapital tests and production build

- [ ] Start the local app and verify the signed-in profile layout at desktop and a narrow mobile viewport.
- [ ] Check empty, legacy and condominium states; verify the update flow creates a visible change.
- [ ] Run `npm run lint`, `npm run build` and all Huskapital tests.
- [ ] Review the complete diff for calendar/reporting changes; none may be present.
- [ ] Commit and push the branch for merge to `main`.
