# Tydligare medlemsfördelar i login-modal – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visa konkreta medlemsfördelar direkt i login-modalen som öppnas från ”Se medlemsfördelarna”.

**Architecture:** Behåll den befintliga `LoginModal` och lägg till en lokal, statisk benefits-array samt en semantiskt markerad lista mellan välkomsttexten och social inloggning. Ingen ändring görs i `AuthContext` eller auth-flödet.

**Tech Stack:** React, TypeScript, Tailwind utility classes, lucide-react, Node test runner.

## Global Constraints

- Behåll befintlig login/signup-logik och modalens interaktioner.
- Visa exakt fyra svenska fördelar i båda modal-lägena.
- Använd befintliga design tokens och lucide-ikoner.
- Lägg inte till betalnings-, premium- eller provperiodscopy.

---

### Task 1: Lägg till medlemsfördelar i `LoginModal`

**Files:**
- Modify: `src/components/LoginModal.tsx`
- Test: `tests/login-modal-benefits.test.mjs`

**Interfaces:**
- Consumes: befintlig `LoginModal`-rendering och `lucide-react`.
- Produces: synlig text och lista med medlemsfördelar i modalens välkomstsektion.

- [ ] **Step 1: Write the failing test**

Skapa ett isolerat kontraktstest som läser komponentfilen och säkerställer att alla fyra godkända benefit-texter finns.

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(new URL("../src/components/LoginModal.tsx", import.meta.url), "utf8");

test("login modal explains the membership benefits", () => {
  for (const benefit of [
    "Spara analyser och checklistor",
    "Följ bolag",
    "Få tillgång till rapportkommentarer",
    "Rösta fram nästa analys",
  ]) {
    assert.match(source, new RegExp(benefit));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/login-modal-benefits.test.mjs`

Expected: FAIL because the four benefit strings are not yet present in `LoginModal.tsx`.

- [ ] **Step 3: Write minimal implementation**

Lägg till en lokal array efter komponentens imports och rendera den direkt efter välkomsttextens `<p>`. Använd `CheckCircle2` från `lucide-react`, en `ul` med fyra `li`-element och diskreta `bg-primary/5`/`border-border`-klasser så listan blir lätt att hitta utan att konkurrera med auth-CTA:n.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/login-modal-benefits.test.mjs`

Expected: PASS.

- [ ] **Step 5: Run project verification**

Run: `npm test -- --run` and `npm run build`

Expected: Vitest and the production build complete without errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/LoginModal.tsx tests/login-modal-benefits.test.mjs docs/superpowers/specs/2026-07-20-login-modal-membership-benefits-design.md docs/superpowers/plans/2026-07-20-login-modal-membership-benefits.md
git commit -m "feat: clarify membership benefits in login modal"
```
