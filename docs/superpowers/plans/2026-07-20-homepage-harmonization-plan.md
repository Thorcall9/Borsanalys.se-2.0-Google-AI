# Homepage Harmonization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harmonize the Börsanalys.se homepage into one light, editorial premium system while preserving existing search, authentication, newsletter, routing, lazy loading, SEO and responsive behavior.

**Architecture:** Keep the existing React/Vite page composition. Replace the rendered `Mindmap` surface with a focused `MethodologySection` that consumes the existing seven `METHODOLOGY_STEPS`, then compose the homepage from small local data arrays and existing routed components. Centralize homepage visual rules in `src/index.css` utility classes so cards, section spacing and buttons remain consistent.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, lucide-react, React Router.

## Global Constraints

- Use Swedish, simple, professional copy throughout the homepage.
- Use Börsanalys-green as the only accent color.
- Keep 80–90% of the page light; reserve the dark theme for the final CTA only.
- Keep the seven methodology steps and their summaries; remove technical AI/dashboard labels from rendered homepage content.
- Do not change backend routes, auth model, analysis detail pages, SEO routes or newsletter API behavior.
- Preserve search modal behavior, `/analys` navigation, `/analys/revolutionrace-2026` navigation and login modal behavior.
- Avoid horizontal overflow and preserve mobile readability.

---

### Task 1: Establish shared homepage surface styles

**Files:**
- Modify: `src/index.css`
- Test: `npm run lint`

**Interfaces:**
- Produces reusable Tailwind utility classes: `.homepage-section`, `.homepage-container`, `.surface-card`, `.surface-card-hover`, `.section-kicker`, `.primary-action`, `.secondary-action`.

- [ ] **Step 1: Add shared classes without changing the color token names**

Add a small `@layer components` block after the existing base styles:

```css
@layer components {
  .homepage-section {
    @apply py-20 md:py-28;
  }

  .homepage-container {
    @apply container mx-auto max-w-6xl px-6;
  }

  .surface-card {
    @apply rounded-2xl border border-border bg-card shadow-sm;
  }

  .surface-card-hover {
    @apply transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-black/5;
  }

  .section-kicker {
    @apply mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary;
  }

  .primary-action {
    @apply inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
  }

  .secondary-action {
    @apply inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
  }
}
```

- [ ] **Step 2: Run the type/lint check**

Run `npm run lint`.

Expected: exit code 0; existing warnings are allowed only if they were present before this task and no new error is introduced.

- [ ] **Step 3: Commit the shared style layer**

```bash
git add src/index.css
git commit -m "style: add shared homepage surface utilities"
```

### Task 2: Replace the technical Mindmap with the light methodology section

**Files:**
- Create: `src/components/MethodologySection.tsx`
- Modify: `src/pages/Home.tsx`
- Delete: `src/components/Mindmap.tsx`
- Test: `npm run lint`

**Interfaces:**
- Consumes: `METHODOLOGY_STEPS` from `src/components/Methodology/data.ts`.
- Produces: default React component `MethodologySection` with seven visible cards and no rendered occurrences of `Mindmap`, `LIVE SCAN`, `ALGORITHMIC COMPUTATION`, `ENGINE`, `FINAL OUTPUT`, `CONFIRMED`, `SECTION VIII`, `SECTION IX`, `Summary & Verdict` or `Financial Scenarios`.

- [ ] **Step 1: Create the failing render contract**

Add the component with a stable semantic structure before styling the details:

```tsx
export default function MethodologySection() {
  return (
    <section aria-labelledby="methodology-title" className="homepage-section bg-section-alt">
      <div className="homepage-container">
        <header className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Vår metod</p>
          <h2 id="methodology-title">Så analyserar vi ett bolag</h2>
          <p>Varje bolag bedöms utifrån samma sju områden för att göra analyserna konsekventa, jämförbara och enkla att förstå.</p>
        </header>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METHODOLOGY_STEPS.slice(0, 7).map((step) => (
            <article key={step.id}>{step.title}{step.summary}<span>Ingår i varje analys</span></article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint to expose missing imports/typing**

Run `npm run lint`.

Expected: fail only if the temporary contract is missing imports or type issues; use the output to complete the component in the next step.

- [ ] **Step 3: Implement the final cards and icon map**

Use the existing lucide icon family (`Building2`, `Store`, `ShieldCheck`, `BarChart3`, `Scale`, `TrendingUp`, `AlertTriangle`) and map by step id. Each card must contain an icon, Swedish title, `step.summary`, and the exact label `Ingår i varje analys`. Use `surface-card surface-card-hover`, small icon container `bg-primary/10 text-primary`, `p-6`, and no dark classes, glow classes, blue hex values or gold hex values.

Keep motion to a short opacity/y entrance animation with `viewport={{ once: true }}` and no pulsing or hover scale.

- [ ] **Step 4: Swap the homepage import and remove the old component**

In `src/pages/Home.tsx`, replace the lazy import of `Mindmap` with:

```tsx
const MethodologySection = React.lazy(() => import("../components/MethodologySection"));
```

Render `<MethodologySection />` in the same location before the example analysis section is added. Delete `src/components/Mindmap.tsx` after no imports remain.

- [ ] **Step 5: Run lint and commit**

Run `npm run lint`.

Expected: exit code 0.

```bash
git add src/components/MethodologySection.tsx src/pages/Home.tsx src/components/Mindmap.tsx
git commit -m "feat: replace homepage mindmap with methodology section"
```

### Task 3: Recompose the homepage around Swedish proof and member value

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/ScoreCard.tsx`
- Modify: `src/components/Newsletter.tsx`
- Reuse: `src/components/community/RecentPublications.tsx`
- Test: `npm run lint`

**Interfaces:**
- Preserves: `useSearch().openSearch`, `useAuth().openLoginModal`, existing routes and `Newsletter` fetch contract.
- Produces: homepage sections in order `Hero → Utvalda analyser → Varför → Metod → Exempel → Rapportkommentarer → Veckobrev → Medlemsfördelar → CTA`.

- [ ] **Step 1: Rewrite Hero copy and remove dashboard cues**

Keep the search button and both actions functional. Replace the current AI-first copy with:

```tsx
<h1>Förstå bolaget.<br /><span className="text-primary">Fatta bättre beslut.</span></h1>
<p>Oberoende aktieanalyser som gör affärsmodell, värdering och risk enklare att förstå.</p>
```

Remove the grid background, blurred circles, uppercase tracking-heavy button treatment and large glow shadows. Use `homepage-container`, a max-width around `58rem`, restrained spacing, `primary-action` and `secondary-action`.

- [ ] **Step 2: Add local homepage sections for why-us, analysis example, member benefits and scenarios**

Use the existing `revolutionRaceCategories` data and add these typed arrays near the top of `Home.tsx`:

```tsx
const memberBenefits = [
  "Spara analyser och checklistor",
  "Följ bolag som är intressanta för dig",
  "Få tillgång till rapportkommentarer",
  "Rösta fram nästa analys",
];

const scenarios = [
  { label: "Bull", price: "74 kr", note: "Högre tillväxt och bättre värdering", tone: "positive" },
  { label: "Base", price: "58 kr", note: "Försiktig återhämtning enligt grundcaset", tone: "neutral" },
  { label: "Bear", price: "48 kr", note: "Lägre tillväxt och pressad multipel", tone: "caution" },
] as const;
```

Render the example as a light `surface-card` with `25 / 35`, `Kvalitet` five green stars, `Värdering` two green stars plus three muted stars, and `BEVAKA`. Render scenarios as three light `surface-card` cards; use only green, neutral gray and a muted red border/text for the three tones.

- [ ] **Step 3: Add the existing report publication component without inventing content**

Import `RecentPublications` and place it in a homepage section with the heading `Rapportkommentarer` and an explanatory line. The component already derives its three items from the shared analysis data and routes to `/analys`, so no new API or mock data is required.

- [ ] **Step 4: Add a benefit-focused member section**

Use `openLoginModal` for the primary action and render the four `memberBenefits` with `CheckCircle2` icons. Copy should explain value, for example: `Samla din analysläsning på ett ställe och följ bolag över tid.` Do not claim features absent from the existing application.

- [ ] **Step 5: Normalize ScoreCard and Newsletter copy/styles**

In `ScoreCard.tsx`, replace `Total Score` with `Totalpoäng`, `AI-verifierad analys · Uppdaterad idag` with `Sju områden · En sammanvägd bedömning`, and `Se Fullständig Analys` with `Läs hela analysen`. Reduce the radius from `rounded-[2.5rem]` to `rounded-2xl` and align the CTA with `primary-action`.

In `Newsletter.tsx`, keep the submit logic unchanged but use Swedish editorial copy: `Få Börsanalys.se i inkorgen`, `Veckans viktigaste analyser och rapportkommentarer, samlade i ett kort nyhetsbrev.`, and `Prenumerera`. Remove background glow and uppercase marketing language.

- [ ] **Step 6: Run lint and commit the composition**

Run `npm run lint`.

Expected: exit code 0.

```bash
git add src/pages/Home.tsx src/components/Hero.tsx src/components/ScoreCard.tsx src/components/Newsletter.tsx
git commit -m "feat: compose homepage around editorial analysis value"
```

### Task 4: Align the final CTA and navigation surfaces

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/pages/Home.tsx`
- Test: `npm run lint`

**Interfaces:**
- Preserves: all existing navigation paths, search behavior, login/logout behavior and newsletter API behavior.
- Produces: one intentional dark theme only in the final CTA, with the rest of the homepage light.

- [ ] **Step 1: Simplify header chrome**

Keep the existing sticky header, routes, search and auth controls. Remove excess uppercase tracking and rotate/scale logo hover treatment. Keep a small green logo mark and use a restrained `rounded-xl` search button with standard focus ring.

- [ ] **Step 2: Make the final CTA the only dark homepage surface**

Change the final CTA in `Home.tsx` to a dark `bg-foreground` surface with no blurred circles. Use a readable Swedish heading such as `Följ bolagen som betyder något för dig`, supporting copy about saving analyses and following companies, and a green login button plus a low-emphasis link to `/analys`.

- [ ] **Step 3: Align footer brand copy and card language**

Replace AI-heavy footer copy with `Oberoende aktieanalyser som gör bolag, värdering och risk enklare att förstå.` Keep all existing links, social destinations and newsletter form. Replace excessive uppercase tracking with the shared editorial typography while preserving the current grid.

- [ ] **Step 4: Run lint and commit**

Run `npm run lint`.

Expected: exit code 0.

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/pages/Home.tsx
git commit -m "style: align homepage chrome and final call to action"
```

### Task 5: Verify build, responsive layout and preserved interactions

**Files:**
- Test: `src/pages/Home.tsx`, `src/components/MethodologySection.tsx`, `src/components/Hero.tsx`, `src/components/Newsletter.tsx`, `src/components/layout/Header.tsx`

**Interfaces:**
- Verifies the rendered homepage at `/` and ensures no technical labels or framework errors are visible.

- [ ] **Step 1: Run the full lint check**

Run `npm run lint`.

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run `npm run build`.

Expected: Vite completes successfully and emits `dist/` without TypeScript or bundler errors.

- [ ] **Step 3: Start the app on the existing approved dev command**

Run `npm run dev` and open the emitted local URL. The target flow under test is: `/` loads → hero renders → search opens → analysis link navigates → member CTA opens login modal → report list links remain routable.

- [ ] **Step 4: Check desktop and mobile render**

Inspect desktop width around 1440px and mobile width around 390px. Confirm:

```text
PASS: no horizontal overflow
PASS: seven method cards render with titles, summaries and “Ingår i varje analys”
PASS: all homepage cards share radius/border/shadow treatment
PASS: no blue, gold, neon, glow or technical methodology labels are visible
PASS: only the final CTA uses the dark surface
PASS: headings and CTAs wrap cleanly on mobile
```

- [ ] **Step 5: Exercise preserved interactions**

Click the Hero search control and confirm the existing search dialog opens. Click `Läs hela analysen` and confirm the URL becomes `/analys/revolutionrace-2026`. Click the member CTA and confirm the existing login modal opens. Submit no real newsletter address; verify the form remains present and its API action/handler is unchanged.

- [ ] **Step 6: Review the diff and commit verification-ready changes**

Run `git diff --check` and `git status --short`.

Expected: no whitespace errors; only intended homepage files are modified.

```bash
git add src/index.css src/pages/Home.tsx src/components/Hero.tsx src/components/MethodologySection.tsx src/components/ScoreCard.tsx src/components/Newsletter.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "test: verify homepage harmonization"
```

## Plan self-review

- Spec coverage: UX audit, visual tokens, seven-step methodology, separate example/scenario presentation, report publication reuse, member value, light/dark theme boundary, preserved functionality, responsive behavior and verification are each covered by Tasks 1–5.
- Placeholder scan: no TODO/TBD or unspecified implementation decisions remain; missing report data is explicitly handled by reusing `RecentPublications`.
- Type consistency: `MethodologySection` is a default lazy-loaded component, `memberBenefits` is a string array, and `scenarios` is a readonly discriminated array consumed locally by `Home.tsx`.
- Scope check: only homepage components, shared homepage CSS and existing chrome are touched; backend, auth and detail pages remain out of scope.
