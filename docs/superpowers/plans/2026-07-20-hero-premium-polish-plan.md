# Hero Premium Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lyfta Hero till startsidans tydligaste premiumyta och finjustera metodkort, exempelsektion och senaste analyser utan att ändra funktionalitet, SEO eller sidflöde.

**Architecture:** Behåll befintliga React-komponenter och Tailwind-baserade design tokens. Hero får en egen tydlig typografisk layout i `Hero.tsx` och små återanvändbara CSS utilities i `index.css`; övriga sektioner får endast lokala klass- och hierarkijusteringar.

**Tech Stack:** React, TypeScript, Tailwind utility classes, Framer Motion, Node test runner, Vite.

## Global Constraints

- Behåll vit bakgrund, navigering, sökfunktion, typografi, färgpalett och båda CTA-knapparna.
- Ta bort alla bakgrundsplattor bakom Hero-rubriken.
- Sökfältet ska vara Hero-sektionens naturliga primära interaktion.
- “Utforska analyser” ska dominera över “Bli medlem gratis”.
- Hover och motion ska vara diskreta och premium, inte lekfulla eller tekniska.
- Behåll sju metodsteg, befintligt innehåll, routes, SEO och responsivitet.
- Om två lösningar är möjliga väljs den enklare.

---

### Task 1: Lås Hero-kontraktet med ett test

**Files:**
- Create: `tests/home-hero-premium-contract.test.mjs`
- Test: `src/components/Hero.tsx`, `src/index.css`

**Interfaces:**
- Testet läser befintliga källfiler och låser den synliga Hero-hierarkin utan att kräva ny runtime-infrastruktur.

- [ ] **Step 1: Write the failing test**

Lägg till tester som kräver fri rubrik, separat grön rad, sökknapp med befintlig text, två CTA-labels, primär/sekundär klasshierarki och den nya Hero-spacing utilityn.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/home-hero-premium-contract.test.mjs`

Expected: FAIL because the new Hero-specific classes and hierarchy do not yet exist.

- [ ] **Step 3: Commit**

```bash
git add tests/home-hero-premium-contract.test.mjs
git commit -m "test: define premium hero contract"
```

---

### Task 2: Implementera Hero som primär premiuminteraktion

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/index.css`
- Test: `tests/home-hero-premium-contract.test.mjs`

**Interfaces:**
- `Hero` fortsätter konsumera `openSearch("hero")` och `openLoginModal`.
- Befintliga `primary-action` och `secondary-action` behålls; nya Hero utilities används endast för spacing och rubrikrytm.

- [ ] **Step 1: Write minimal implementation**

Gör rubriken till två separata block, exempelvis `hero-title-line hero-title-line-primary` och `hero-title-line hero-title-line-accent`, med större responsiv textskala, ökad Hero-spacing, max två rader för ingressen och sökfältet som tydlig första interaktion. Ge primär CTA mer padding/tyngd och behåll sekundär CTA lugn.

- [ ] **Step 2: Run test to verify it passes**

Run: `node --test tests/home-hero-premium-contract.test.mjs`

Expected: PASS.

- [ ] **Step 3: Run typecheck**

Run: `npm run lint`

Expected: PASS with exit code 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/index.css tests/home-hero-premium-contract.test.mjs
git commit -m "style: elevate homepage hero hierarchy"
```

---

### Task 3: Förfina metodkort och exempelsektion

**Files:**
- Modify: `src/components/MethodologySection.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css` only if shared utility is needed
- Test: `tests/home-hero-premium-contract.test.mjs`

**Interfaces:**
- MethodologySection fortsätter rendera exakt sju `METHODOLOGY_STEPS`.
- Home behåller score, rekommendation och tre scenarios.

- [ ] **Step 1: Extend the failing contract**

Lägg till assertions för sju metodkort, diskret `surface-card-hover`-användning, bibehållen `25 / 35`, `BEVAKA` och `Bull`/`Base`/`Bear`.

- [ ] **Step 2: Run test to verify it fails if the intended hooks are absent**

Run: `node --test tests/home-hero-premium-contract.test.mjs`

Expected: FAIL only for the newly requested hooks if they are not already present.

- [ ] **Step 3: Implement minimal refinement**

Förbättra ikonens optiska yta, kortens hover med mycket liten förskjutning/färgförändring och exempelsektionens spacing/alignment. Lägg inte till nya interaktioner eller visuella teman.

- [ ] **Step 4: Run targeted tests and lint**

Run: `node --test tests/home-hero-premium-contract.test.mjs tests/home-methodology-rvrc-contract.test.mjs tests/home-featured-analysis-contract.test.mjs` och `npm run lint`

Expected: all tests pass and lint exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/MethodologySection.tsx src/pages/Home.tsx src/index.css tests/home-hero-premium-contract.test.mjs
git commit -m "style: refine homepage analysis surfaces"
```

---

### Task 4: Gör senaste publicering till huvudnyhet

**Files:**
- Modify: `src/components/community/RecentPublications.tsx`
- Modify: `src/pages/Home.tsx` only if a scoped prop is needed
- Test: `tests/home-hero-premium-contract.test.mjs`

**Interfaces:**
- `RecentPublications` behåller alla befintliga länkar och publiceringsdata.
- Endast första publiceringen får primär visuell vikt; sekundära publiceringar blir mindre men fortsatt fullt användbara.

- [ ] **Step 1: Extend the contract test**

Lås att `RecentPublications` renderar första publiceringen som primär och behåller “Se alla analyser”.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/home-hero-premium-contract.test.mjs`

Expected: FAIL if current markup does not expose a primary/secondary hierarchy.

- [ ] **Step 3: Implement the smallest hierarchy change**

Använd befintliga data och länkar. Introducera en enkel first-item variant eller klass, utan carousel, filter eller ny komponentfamilj.

- [ ] **Step 4: Run targeted tests and lint**

Run: `node --test tests/home-hero-premium-contract.test.mjs tests/home-methodology-rvrc-contract.test.mjs tests/home-featured-analysis-contract.test.mjs` och `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/community/RecentPublications.tsx src/pages/Home.tsx tests/home-hero-premium-contract.test.mjs
git commit -m "style: prioritize latest homepage publication"
```

---

### Task 5: Verifiera responsivitet, interaktioner och produktion

**Files:**
- Modify: none unless verification finds a regression

- [ ] **Step 1: Run full static verification**

Run: `npm run lint`, `npm run build`, all three existing homepage contract tests, `node --test tests/home-hero-premium-contract.test.mjs`, and `git diff --check`.

- [ ] **Step 2: Browser QA desktop**

Load `http://127.0.0.1:3000/` in the in-app Browser. Verify page identity, first viewport hierarchy, no framework overlay, no console errors, search opens, member CTA opens login modal, and analysis link navigates to `/analys/revolutionrace-2026`.

- [ ] **Step 3: Browser QA mobile**

Check a 390px-wide viewport for no horizontal overflow, readable two-line Hero ingress, CTA stacking, visible search control and seven methodology cards.

- [ ] **Step 4: Commit any verified fix**

Only if needed, commit the smallest regression fix with a message describing the visible issue.

