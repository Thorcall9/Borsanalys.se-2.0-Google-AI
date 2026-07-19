# Checklist Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing saved-checklist page discoverable from the signed-in profile and mobile navigation.

**Architecture:** Reuse the existing `/mina-checklistor` route and `SavedChecklists` page. Add navigation-only links in `Profile.tsx` and the signed-in mobile menu in `Header.tsx`; do not change checklist storage, API behavior, or answer rendering.

**Tech Stack:** React, React Router, TypeScript, Node test runner, Vite.

## Global Constraints

- Keep the existing `/mina-checklistor` route unchanged.
- Do not alter checklist answers, notes, API payloads, database schema, or authentication behavior.
- Preserve the existing visual language and Swedish copy.

---

### Task 1: Expose saved checklists in member navigation

**Files:**
- Modify: `src/pages/Profile.tsx`
- Modify: `src/components/layout/Header.tsx`
- Test: `tests/stock-checklist-contract.test.mjs`

**Interfaces:**
- Consumes: existing React Router `Link` and `/mina-checklistor` route.
- Produces: visible `Mina checklistor` links for signed-in users on the profile page and mobile menu.

- [ ] **Step 1: Add a contract assertion**

Extend the existing checklist navigation contract to require `Mina checklistor` and `/mina-checklistor` in both `Profile.tsx` and `Header.tsx`.

- [ ] **Step 2: Run the focused contract test**

Run: `node --test tests/stock-checklist-contract.test.mjs`

Expected: the new assertions fail before the navigation links exist.

- [ ] **Step 3: Add the profile link**

Import `Link` from `react-router-dom` in `src/pages/Profile.tsx` and add a visible link beside the profile actions:

```tsx
<Link to="/mina-checklistor" className="w-full py-2 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
  Mina checklistor
</Link>
```

- [ ] **Step 4: Add the mobile-menu link**

Add a signed-in mobile-menu link in `src/components/layout/Header.tsx` using the existing close-menu behavior:

```tsx
<Link to="/mina-checklistor" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-lg font-serif font-bold py-2 border-b border-border/50">
  Mina checklistor
  <ChevronRight size={18} className="text-muted-foreground" />
</Link>
```

- [ ] **Step 5: Run verification**

Run: `node --test tests/*.test.mjs`

Expected: 31 tests pass with 0 failures.

Run: `npm run build`

Expected: Vite build succeeds; the existing large-chunk warning may remain.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/plans/2026-07-19-checklist-navigation.md src/pages/Profile.tsx src/components/layout/Header.tsx tests/stock-checklist-contract.test.mjs
git commit -m "feat: add saved checklist navigation"
```
