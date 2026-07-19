# Checklist Result Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the checklist result and leave-without-saving dialog more direct, useful, and visually prioritized.

**Architecture:** Keep the existing checklist save flow unchanged. Update the shared save-step labels in `src/lib/checklistSave.ts`, the result/dialog copy and secondary action styling in `src/pages/StockChecklist.tsx`, and extend the existing contract/unit tests to protect the exact user-facing behavior.

**Tech Stack:** React, TypeScript, Tailwind CSS, Node test runner, Vite.

## Global Constraints

- Use the exact Swedish copy approved by the user.
- Preserve the existing save and navigation behavior.
- Keep the primary action visually stronger than the unsaved path.
- Do not add read-status, account, or storage behavior in this task.

---

### Task 1: Update checklist result messaging and secondary action

**Files:**
- Modify: `src/lib/checklistSave.ts`
- Modify: `src/pages/StockChecklist.tsx`
- Test: `src/lib/__tests__/checklistSave.test.ts`
- Test: `tests/stock-checklist-contract.test.mjs`

**Interfaces:**
- Consumes: Existing `CHECKLIST_SAVE_STEPS`, result card, and leave-confirmation dialog.
- Produces: Exact labels `NÄSTA STEG`, `Sparad på ditt konto`, the shorter result intro, and the approved leave-dialog explanation.

- [ ] **Step 1: Add failing assertions for the new labels and dialog copy**

  Assert that the save steps contain `Sparad på ditt konto`, that the old `Din nästa nivå` and `Checklistan sparas` labels are absent, and that the page contains the approved temporary-browser-storage explanation.

- [ ] **Step 2: Run the focused tests and confirm they fail for the expected copy mismatch**

  Run: `npm test -- --runInBand` if supported by the project, otherwise run the existing test command from `package.json` together with `node --test tests/stock-checklist-contract.test.mjs`.

  Expected: the new assertions fail because the old labels/copy are still present.

- [ ] **Step 3: Implement the minimal copy and styling changes**

  In `src/lib/checklistSave.ts`, change only the fourth step title to `Sparad på ditt konto`.

  In `src/pages/StockChecklist.tsx`:

  - change `Din nästa nivå` to `NÄSTA STEG`;
  - use `Du har besvarat alla 12 frågor. Skapa ett gratis konto för att spara checklistan och kunna uppdatera den senare.`;
  - make `Fortsätt utan att spara` a low-emphasis text/ghost action while retaining its focus style and disabled state;
  - add `Checklistan finns kvar tillfälligt i den här webbläsaren, men sparas inte på ditt konto och kan inte öppnas från en annan enhet.` to the dialog;
  - keep `Spara checklistan gratis` as the primary action and `Lämna utan att spara` as the secondary dialog action.

- [ ] **Step 4: Run focused tests, full tests, build, and whitespace checks**

  Run: `npm test`, `npm run build`, and `git diff --check`.

  Expected: all tests pass, the production build completes, and the diff has no whitespace errors.

- [ ] **Step 5: Verify the rendered result and dialog on desktop and mobile**

  Flow under test: `/aktiechecklista` -> answer all 12 questions -> result card -> choose `Fortsätt utan att spara` -> confirmation dialog.

  Verify the new heading, shorter intro, fourth step, button hierarchy, dialog explanation, both dialog buttons, no horizontal overflow at a 390px viewport, and Escape closing the dialog with focus returned to the secondary action.

- [ ] **Step 6: Commit the focused change**

  Run:

  ```bash
  git add src/pages/StockChecklist.tsx src/lib/checklistSave.ts src/lib/__tests__/checklistSave.test.ts tests/stock-checklist-contract.test.mjs
  git commit -m "feat: clarify checklist save conversion copy"
  ```
