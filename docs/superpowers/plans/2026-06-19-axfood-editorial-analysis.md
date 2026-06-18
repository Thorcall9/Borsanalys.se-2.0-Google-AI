# Axfood Editorial Analysis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, locally previewable Axfood deep-dive in Börsanalys.se 2.0 that preserves the supplied analysis text and remains excluded from every public discovery surface.

**Architecture:** Add a dedicated preview route that imports a standalone Axfood page component rather than registering Axfood in the public `analyses` object. Keep the long article data in a focused content module, render it through a purpose-built editorial component, and protect the unpublished status with static contract tests covering routing, SEO, archives, search, RSS, and sitemap boundaries.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS 4, React Helmet Async, Node.js built-in test runner, Vite.

---

## File map

- Create `src/data/previews/axfood-2026.ts`: static, dated Axfood content and table data copied from the supplied source.
- Create `src/components/analysis/AxfoodDeepDive.tsx`: editorial page composition and responsive presentation.
- Create `src/pages/Axfood2026Preview.tsx`: thin preview-page boundary that imports data and renders the deep dive.
- Modify `src/App.tsx`: add the isolated `/preview/axfood-2026` route only.
- Create `tests/axfood-unpublished-contract.test.mjs`: unpublished-discovery and SEO contract.
- Create `tests/axfood-content-contract.test.mjs`: source-content and visual-structure contract.
- Use `docs/superpowers/specs/2026-06-19-axfood-editorial-analysis-design.md` as the acceptance specification.
- Use `/Users/thor/.codex/attachments/84deb5bb-4fde-4cc1-99a0-1abe2d83351b/pasted-text.txt` as the source-of-truth article text.

### Task 1: Lock the unpublished route contract

**Files:**
- Create: `tests/axfood-unpublished-contract.test.mjs`
- Modify: `src/App.tsx`
- Create: `src/pages/Axfood2026Preview.tsx`

- [ ] **Step 1: Write the failing unpublished contract test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Axfood is available only through an explicit preview route", async () => {
  const [app, analysisIndex, sitemap, rss, preview] = await Promise.all([
    read("src/App.tsx"),
    read("src/data/analyses/index.ts"),
    read("api/sitemap.ts"),
    read("api/rss.ts"),
    read("src/pages/Axfood2026Preview.tsx"),
  ]);

  assert.match(app, /path="\/preview\/axfood-2026"/);
  assert.match(app, /Axfood2026Preview/);
  assert.doesNotMatch(analysisIndex, /axfood/i);
  assert.doesNotMatch(sitemap, /axfood/i);
  assert.doesNotMatch(rss, /axfood/i);
  assert.match(preview, /noindex,\s*nofollow/i);
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --test tests/axfood-unpublished-contract.test.mjs
```

Expected: `FAIL` because `/preview/axfood-2026` and `Axfood2026Preview.tsx` do not exist.

- [ ] **Step 3: Add the minimal preview boundary**

Create `src/pages/Axfood2026Preview.tsx`:

```tsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function Axfood2026Preview() {
  return (
    <>
      <Helmet>
        <title>Axfood AB – opublicerad förhandsvisning | Börsanalys.se</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main data-preview="axfood-2026">Axfood preview</main>
    </>
  );
}
```

Modify `src/App.tsx`:

```tsx
const Axfood2026Preview = lazy(() => import("./pages/Axfood2026Preview"));
```

Add beside the ABB preview route:

```tsx
<Route path="/preview/axfood-2026" element={<Axfood2026Preview />} />
```

Do not add Axfood imports or records to `src/data/analyses/index.ts`, `api/sitemap.ts`, `api/rss.ts`, `src/pages/Analysis.tsx`, `src/components/GlobalSearch.tsx`, or `src/pages/Home.tsx`.

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
node --test tests/axfood-unpublished-contract.test.mjs
```

Expected: `PASS`.

- [ ] **Step 5: Commit the preview boundary**

```bash
git add src/App.tsx src/pages/Axfood2026Preview.tsx tests/axfood-unpublished-contract.test.mjs
git commit -m "test: lock Axfood unpublished preview boundary"
```

### Task 2: Create a faithful Axfood content module

**Files:**
- Create: `src/data/previews/axfood-2026.ts`
- Create: `tests/axfood-content-contract.test.mjs`
- Source: `/Users/thor/.codex/attachments/84deb5bb-4fde-4cc1-99a0-1abe2d83351b/pasted-text.txt`

- [ ] **Step 1: Write the failing source-content contract**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceUrl = new URL(
  "../src/data/previews/axfood-2026.ts",
  import.meta.url,
);

test("Axfood preview preserves the supplied analysis structure and conclusions", async () => {
  const source = await readFile(sourceUrl, "utf8");

  for (const required of [
    "AXFOOD AB (AXFO) – DJUPANALYS",
    "Analytisk totalpoäng",
    "27/40",
    "I. Företagsöversikt",
    "II. Affärsmodell",
    "III. Konkurrensfördelar (Moat)",
    "IV. Finansiell utveckling",
    "V. Värdering",
    "VI. Potentiella kursdrivare",
    "VII. Risker",
    "VIII. Scenarier",
    "IX. Slutsats & Investeringstes",
    "X. Vad som kan förändra investeringstesen",
    "Base-casets förväntade totalavkastning är ca 3,4 % per år",
    "Denna analys utgör inte personlig investeringsrådgivning",
  ]) {
    assert.match(source, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --test tests/axfood-content-contract.test.mjs
```

Expected: `FAIL` with `ENOENT` because the content module does not exist.

- [ ] **Step 3: Create typed content primitives**

Start `src/data/previews/axfood-2026.ts` with:

```ts
export interface AxfoodMetric {
  label: string;
  value: string;
  note?: string;
}

export interface AxfoodScore {
  dimension: string;
  score: number;
  rationale: string;
}

export interface AxfoodTable {
  title?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface AxfoodScenario {
  type: "bear" | "base" | "bull";
  value: string;
  change: string;
  growth: string;
  multiple: string;
  body: string;
}

export type AxfoodBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "note"; label: string; text: string }
  | { type: "table"; table: AxfoodTable };

export interface AxfoodSection {
  id: string;
  number: string;
  title: string;
  blocks: AxfoodBlock[];
}

export const axfoodMeta = {
  title: "AXFOOD AB (AXFO) – DJUPANALYS",
  displayTitle: "Stabilitet till ett högt pris",
  company: "Axfood AB",
  ticker: "AXFO",
  exchange: "Nasdaq Stockholm",
  author: "Carl Fredrik Thor",
  dateLabel: "Juni 2026",
  priceDate: "12 juni 2026",
  recommendation: "BEHÅLL",
  totalScore: 27,
  maxScore: 40,
} as const;
```

Then transcribe every paragraph, heading, bullet list, table row, note, score rationale, scenario paragraph, conclusion, and footer from the supplied source into exported constants. Preserve wording and order. Use arrays of strings for paragraph groups and typed arrays for tables/scores/scenarios; do not paraphrase.

- [ ] **Step 4: Compare normalized source markers**

Run:

```bash
node --test tests/axfood-content-contract.test.mjs
```

Expected: `PASS`.

Then run:

```bash
rg -n "^## |^### |^\\| |^\\*|^>" \
  "/Users/thor/.codex/attachments/84deb5bb-4fde-4cc1-99a0-1abe2d83351b/pasted-text.txt"
```

Expected: every source heading, table, list, and quoted analytical note has a corresponding exported structure in `src/data/previews/axfood-2026.ts`.

- [ ] **Step 5: Commit the content module**

```bash
git add src/data/previews/axfood-2026.ts tests/axfood-content-contract.test.mjs
git commit -m "feat: add Axfood preview content"
```

### Task 3: Build the editorial desktop composition

**Files:**
- Modify: `tests/axfood-content-contract.test.mjs`
- Create: `src/components/analysis/AxfoodDeepDive.tsx`
- Modify: `src/pages/Axfood2026Preview.tsx`

- [ ] **Step 1: Add a failing visual-structure test**

Append:

```js
test("Axfood deep dive implements the approved editorial composition", async () => {
  const source = await readFile(
    new URL("../src/components/analysis/AxfoodDeepDive.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /const AXFOOD_THEME/);
  assert.match(source, /"#173d2d"/);
  assert.match(source, /"#f5f2eb"/);
  assert.match(source, /"#b8813f"/);
  assert.match(source, /Stabilitet till ett högt pris/);
  assert.match(source, /data-testid="axfood-scorecard"/);
  assert.match(source, /data-testid="axfood-contents"/);
  assert.match(source, /data-testid="axfood-scenarios"/);
  assert.match(source, /overflow-x-auto/);
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --test tests/axfood-content-contract.test.mjs
```

Expected: `FAIL` with `ENOENT` for `AxfoodDeepDive.tsx`.

- [ ] **Step 3: Implement the approved editorial shell**

Create `src/components/analysis/AxfoodDeepDive.tsx` with:

```tsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AxfoodBlock,
  axfoodMeta,
  axfoodMetrics,
  axfoodScores,
  axfoodSections,
  axfoodScenarios,
} from "../../data/previews/axfood-2026";

const AXFOOD_THEME = {
  forest: "#173d2d",
  paper: "#f5f2eb",
  ink: "#17251e",
  copper: "#b8813f",
  line: "#d9d3c8",
} as const;

function EditorialTable({
  title,
  headers,
  rows,
  note,
}: {
  title?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}) {
  return (
    <div className="my-6">
      {title ? <h3 className="mb-3 font-serif text-xl">{title}</h3> : null}
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full border-collapse bg-[#fffdfa] text-sm">
          <thead className="bg-[#173d2d] text-white">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="p-3 text-left text-[10px] uppercase tracking-[0.12em]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="border-b border-[#e4dfd6] even:bg-[#faf7f1]">
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${cell}`} className="p-3 align-top leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-2 text-xs leading-relaxed text-[#68776f]">{note}</p> : null}
    </div>
  );
}

function EditorialNote({ label, text }: { label: string; text: string }) {
  return (
    <aside className="my-6 border-l-4 border-[#b8813f] bg-[#fffaf0] p-5">
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#93652e]">{label}</p>
      <p className="font-serif text-lg leading-relaxed">{text}</p>
    </aside>
  );
}

function ArticleBlock({ block }: { block: AxfoodBlock }) {
  if (block.type === "paragraph") {
    return <p className="mb-5 text-[16px] leading-[1.8] text-[#435149]">{block.text}</p>;
  }
  if (block.type === "subheading") {
    return <h3 className="mb-3 mt-8 font-serif text-2xl">{block.text}</h3>;
  }
  if (block.type === "bullets") {
    return (
      <ul className="mb-6 list-disc space-y-3 pl-5 text-[16px] leading-[1.75] text-[#435149]">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.type === "note") {
    return <EditorialNote label={block.label} text={block.text} />;
  }
  return <EditorialTable {...block.table} />;
}

export default function AxfoodDeepDive() {
  return (
    <article
      className="min-h-screen pt-16 text-[#17251e]"
      style={{ backgroundColor: AXFOOD_THEME.paper }}
    >
      <header className="bg-[#173d2d] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
          <Link
            to="/analys"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={17} />
            Till analyser
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#bfd1c5]">
                {axfoodMeta.company} · {axfoodMeta.exchange} · {axfoodMeta.dateLabel}
              </p>
              <h1 className="max-w-4xl font-serif text-4xl leading-[1.05] md:text-6xl">
                {axfoodMeta.displayTitle}
              </h1>
            </div>
            <div className="border-white/20 lg:border-l lg:pl-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#bfd1c5]">
                Bedömning
              </p>
              <p className="mt-2 font-serif text-3xl">{axfoodMeta.recommendation}</p>
              <p className="mt-2 text-sm text-white/75">
                {axfoodMeta.totalScore} av {axfoodMeta.maxScore} poäng
              </p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px border-t border-white/20 pt-6 sm:grid-cols-3 lg:grid-cols-5">
            {axfoodMetrics.slice(0, 5).map((metric) => (
              <div key={metric.label} className="py-3 pr-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#bfd1c5]">{metric.label}</p>
                <p className="mt-1 font-serif text-lg">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside data-testid="axfood-contents" className="hidden lg:block">
          <nav className="sticky top-24 border-r border-[#d9d3c8] pr-7">
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#68776f]">I analysen</p>
            <ol className="space-y-3 text-sm text-[#405047]">
              {axfoodSections.map((section) => (
                <li key={section.id}>
                  <a className="hover:text-[#173d2d]" href={`#${section.id}`}>{section.number}. {section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <main className="min-w-0">
          <section data-testid="axfood-scorecard" className="mb-14">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2e7052]">Analytisk totalpoäng</p>
            <h2 className="mt-2 font-serif text-3xl">Scorecard</h2>
            <div className="mt-6 divide-y divide-[#d9d3c8] border-y border-[#d9d3c8]">
              {axfoodScores.map((score) => (
                <div key={score.dimension} className="grid gap-2 py-4 md:grid-cols-[180px_80px_1fr]">
                  <strong>{score.dimension}</strong>
                  <span className="font-serif text-xl">{score.score}/5</span>
                  <span className="text-sm leading-relaxed text-[#58665f]">{score.rationale}</span>
                </div>
              ))}
            </div>
          </section>
          {axfoodSections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-24 border-t border-[#d9d3c8] py-12">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2e7052]">Sektion {section.number}</p>
              <h2 className="mt-2 font-serif text-3xl">{section.title}</h2>
              <div className="mt-6">
                {section.blocks.map((block, index) => (
                  <ArticleBlock key={`${section.id}-${block.type}-${index}`} block={block} />
                ))}
              </div>
            </section>
          ))}
          <section data-testid="axfood-scenarios" className="border-t border-[#d9d3c8] py-12">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2e7052]">Scenarioanalys</p>
            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {axfoodScenarios.map((scenario) => (
                <article key={scenario.type} className="border border-[#d9d3c8] bg-[#fffdfa] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#68776f]">{scenario.type}</p>
                  <p className="mt-3 font-serif text-3xl">{scenario.value}</p>
                  <p className="mt-1 text-sm font-bold">{scenario.change}</p>
                  <dl className="my-5 grid grid-cols-2 gap-3 border-y border-[#e4dfd6] py-4 text-sm">
                    <div><dt className="text-[#68776f]">Vinsttillväxt</dt><dd className="font-bold">{scenario.growth}</dd></div>
                    <div><dt className="text-[#68776f]">P/E</dt><dd className="font-bold">{scenario.multiple}</dd></div>
                  </dl>
                  <p className="text-sm leading-relaxed text-[#435149]">{scenario.body}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </article>
  );
}
```

Modify `src/pages/Axfood2026Preview.tsx` to render:

```tsx
import AxfoodDeepDive from "../components/analysis/AxfoodDeepDive";

// inside the existing Helmet boundary
<AxfoodDeepDive />
```

- [ ] **Step 4: Run the contract tests**

Run:

```bash
node --test tests/axfood-unpublished-contract.test.mjs tests/axfood-content-contract.test.mjs
```

Expected: both test files pass.

- [ ] **Step 5: Commit the desktop composition**

```bash
git add src/components/analysis/AxfoodDeepDive.tsx src/pages/Axfood2026Preview.tsx tests/axfood-content-contract.test.mjs
git commit -m "feat: build Axfood editorial preview"
```

### Task 4: Complete responsive behavior and accessibility

**Files:**
- Modify: `tests/axfood-content-contract.test.mjs`
- Modify: `src/components/analysis/AxfoodDeepDive.tsx`

- [ ] **Step 1: Add failing responsive and accessibility assertions**

Append:

```js
test("Axfood deep dive is mobile-safe and semantically navigable", async () => {
  const source = await readFile(
    new URL("../src/components/analysis/AxfoodDeepDive.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /aria-label="Innehållsförteckning"/);
  assert.match(source, /scope="col"/);
  assert.match(source, /scroll-mt-24/);
  assert.match(source, /min-w-\[640px\]/);
  assert.match(source, /lg:grid-cols-\[220px_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(source, /\bdark:/);
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --test tests/axfood-content-contract.test.mjs
```

Expected: `FAIL` until all semantic and responsive attributes are present.

- [ ] **Step 3: Add minimal responsive and semantic fixes**

In `AxfoodDeepDive.tsx`:

- add `aria-label="Innehållsförteckning"` to the desktop `nav`;
- render every table inside `<div className="my-6 overflow-x-auto">`;
- render table elements with `className="min-w-[640px] w-full border-collapse"`;
- give header cells `scope="col"`;
- keep the article grid `lg:grid-cols-[220px_minmax(0,1fr)]`;
- use `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` for hero metrics;
- keep all article cards and notes within `min-w-0`;
- use no `dark:` utility classes so the approved reading palette remains stable.

- [ ] **Step 4: Run tests and type-check**

Run:

```bash
node --test tests/axfood-unpublished-contract.test.mjs tests/axfood-content-contract.test.mjs
npm run lint
```

Expected: contract tests pass and TypeScript reports zero errors.

- [ ] **Step 5: Commit responsive behavior**

```bash
git add src/components/analysis/AxfoodDeepDive.tsx tests/axfood-content-contract.test.mjs
git commit -m "fix: make Axfood preview responsive"
```

### Task 5: Verify the complete unpublished preview

**Files:**
- Modify only if verification finds a defect.

- [ ] **Step 1: Run the full automated checks**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npm run build
```

Expected: all tests pass, TypeScript exits successfully, and Vite creates `dist` without errors.

- [ ] **Step 2: Start the local preview**

Run:

```bash
./node_modules/.bin/vite --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/preview/axfood-2026
```

- [ ] **Step 3: Verify desktop against the approved design**

At approximately `1280 × 720`, verify:

- the forest-green hero, warm paper background, copper accents and serif hierarchy match the approved mockup;
- the first viewport includes metadata, title, recommendation, score and five key metrics;
- the content rail is visible and does not crowd the article;
- every major section, score row, table, analytical note and scenario is present;
- there are no public-navigation labels suggesting the analysis is published.

- [ ] **Step 4: Verify mobile**

At approximately `390 × 844`, verify:

- the content rail is hidden;
- title, recommendation and metrics wrap cleanly;
- no page-level horizontal overflow exists;
- tables scroll inside their own containers;
- body text remains comfortably readable.

- [ ] **Step 5: Verify discovery isolation**

Check:

```bash
rg -ni "axfood|axfo" \
  src/data/analyses/index.ts \
  api/sitemap.ts \
  api/rss.ts \
  src/pages/Home.tsx \
  src/pages/Analysis.tsx \
  src/components/GlobalSearch.tsx
```

Expected: no matches.

Inspect the rendered document head and confirm:

```html
<meta name="robots" content="noindex, nofollow">
```

- [ ] **Step 6: Review the final diff**

Run:

```bash
git diff HEAD~4 -- src tests docs/superpowers
git status --short
```

Expected: only the Axfood preview, its tests, route, content module, specification and implementation plan are part of this work. Existing unrelated untracked files remain untouched.

- [ ] **Step 7: Commit any verification fixes**

If verification required code changes:

```bash
git add src tests
git commit -m "fix: polish Axfood preview"
```

Do not push, open a pull request, deploy, or publish.
