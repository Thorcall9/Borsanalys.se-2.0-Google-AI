# ABB Readable Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ge ABB-analysen en lokalt avgränsad, varm och högkontrastig läsbakgrund som är identisk i webbplatsens ljusa och mörka tema.

**Architecture:** Lägg ABB:s läspalett som lokala CSS-variabler på rotcontainern i `ABBDeepDive`. Variablerna kaskaderar till befintliga `bg-background`, `bg-card`, `text-foreground`, `border-border` och `bg-muted`-klasser, vilket förbättrar alla ABB-kort utan globala temaändringar eller ändringar i delade analyskomponenter.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Node.js inbyggda testverktyg, Vite.

---

## Filstruktur

- Skapa `tests/abb-readable-background.test.mjs`: en avgränsnings- och regressionskontroll som verifierar att ABB-paletten finns och appliceras på ABB-vyn.
- Ändra `src/components/analysis/ABBDeepDive.tsx`: definiera den varma läspaletten och applicera den på ABB-sidans rot.
- Ändra inga globala temafiler eller delade analyskomponenter.

### Task 1: Lås ABB-palettens kontrakt med ett test

**Files:**
- Create: `tests/abb-readable-background.test.mjs`
- Test: `tests/abb-readable-background.test.mjs`

- [ ] **Step 1: Skriv det fallerande regressionstestet**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceUrl = new URL(
  "../src/components/analysis/ABBDeepDive.tsx",
  import.meta.url,
);

test("ABB analysis scopes the warm reading palette to its root", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(source, /const ABB_READING_THEME/);
  assert.match(source, /"--background": "#f6f4f1"/);
  assert.match(source, /"--foreground": "#211d1a"/);
  assert.match(source, /"--card": "#fffdfa"/);
  assert.match(source, /"--border": "#dedbd6"/);
  assert.match(
    source,
    /className="min-h-screen bg-background font-sans text-foreground pt-16"\s+style=\{ABB_READING_THEME\}/,
  );
});
```

- [ ] **Step 2: Kör testet och verifiera att det faller**

Run:

```bash
node --test tests/abb-readable-background.test.mjs
```

Expected: `FAIL` eftersom `ABB_READING_THEME` ännu inte finns.

- [ ] **Step 3: Commit**

```bash
git add tests/abb-readable-background.test.mjs
git commit -m "test: define ABB reading background contract"
```

### Task 2: Applicera den lokala varma läspaletten

**Files:**
- Modify: `src/components/analysis/ABBDeepDive.tsx:11-12`
- Modify: `src/components/analysis/ABBDeepDive.tsx:102-104`
- Test: `tests/abb-readable-background.test.mjs`

- [ ] **Step 1: Definiera ABB:s lokala CSS-variabler**

Lägg direkt efter `ACCENT`:

```tsx
const ABB_READING_THEME = {
  "--background": "#f6f4f1",
  "--foreground": "#211d1a",
  "--card": "#fffdfa",
  "--card-foreground": "#211d1a",
  "--border": "#dedbd6",
  "--muted": "#ebe7e2",
  "--muted-foreground": "#625c56",
  "--section-alt": "#f1eee9",
} as React.CSSProperties;
```

- [ ] **Step 2: Applicera paletten på ABB-vyns rot**

Ändra rotcontainern till:

```tsx
<div
  className="min-h-screen bg-background font-sans text-foreground pt-16"
  style={ABB_READING_THEME}
>
```

Detta ska vara den enda tematiska ingångspunkten. Ändra inte `src/index.css`, `Card.tsx`, `RatingBox.tsx` eller andra analyser.

- [ ] **Step 3: Kör regressionstestet**

Run:

```bash
node --test tests/abb-readable-background.test.mjs
```

Expected: `PASS`, 1 test godkänt.

- [ ] **Step 4: Kör typkontrollen**

Run:

```bash
npm run lint
```

Expected: exit code `0` utan TypeScript-fel.

- [ ] **Step 5: Kör produktionsbygget**

Run:

```bash
npm run build
```

Expected: exit code `0` och en färdig Vite-build i `dist/`.

- [ ] **Step 6: Commit**

```bash
git add src/components/analysis/ABBDeepDive.tsx
git commit -m "fix: improve ABB analysis background readability"
```

### Task 3: Visuell verifiering i lokal webbläsare

**Files:**
- Verify: `src/components/analysis/ABBDeepDive.tsx`

- [ ] **Step 1: Starta den lokala appen**

Run:

```bash
npm run dev
```

Expected: servern rapporterar en lokal URL.

- [ ] **Step 2: Kontrollera ABB i desktopbredd**

Öppna `/preview/abb-q1-2026` och verifiera:

- Bakgrunden är varm off-white.
- Artikel-, nyckeltals-, risk-, scenario- och beslutskort är nästan vita.
- ABB:s röda topp och poängrad är oförändrade.
- Brödtext, tabeller och noter har mörk och tydlig kontrast.
- Kortens kanter syns utan att dominera.

- [ ] **Step 3: Kontrollera ABB i mobilbredd**

Använd cirka `390 × 844` och verifiera:

- Ingen horisontell sidscroll utanför avsedda tabeller.
- Kort och färgade informationsrutor behåller tydlig kontrast.
- Rubriker och brödtext ligger på samma varma läsbakgrund.

- [ ] **Step 4: Kontrollera globalt mörkt tema**

Aktivera webbplatsens mörka tema och verifiera att ABB:s innehåll fortfarande använder den ljusa varma läspaletten medan header och övrig webbplats kan fortsätta följa det globala temat.

- [ ] **Step 5: Kör slutlig verifiering**

Run:

```bash
node --test tests/abb-readable-background.test.mjs
npm run lint
npm run build
git status --short
```

Expected:

- Regressionstest, typkontroll och build passerar.
- `git status` visar inga oavsiktliga ändringar utanför ABB-filen, testet och användarens redan befintliga arbetsfiler.
