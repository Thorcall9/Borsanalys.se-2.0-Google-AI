# Homepage Reference Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with review checkpoints.

**Goal:** Rebuild the Vite/React homepage and global header to match the supplied editorial reference while presenting only the currently available free membership product.

**Architecture:** Keep routing, `SearchContext`, `AuthContext`, and analysis data as the source of truth. Extract the new homepage surface into small presentational components (`FreeMembershipCard`, `TrustStrip`, `FeaturedAnalysisCard`, decorative `MarketBackdrop`, and conditional `MobileBottomNav`), then compose them in `Home.tsx`. Use centralized CSS tokens/utilities for typography, spacing, radius, shadows, and responsive behavior; no raster screenshot and no new dependencies.

**Tech Stack:** React 19, Vite, TypeScript, React Router, Tailwind CSS v4, Framer Motion (existing), lucide-react (existing), Vitest/tsc build checks.

## Global Constraints

- Never show Premium, trial, pricing, automatic billing, cancellation, Day 5, or Day 7 copy.
- Active membership mode is `free-membership`; do not implement payment or subscription logic.
- Reuse `GlobalSearch` through `SearchContext` and `LoginModal` through `AuthContext`.
- Featured analysis content must come from the existing `AnalysisData` register; do not hardcode a company, score, recommendation, summary, ticker, or route.
- Use exactly one `h1`, preserve accessible keyboard/focus behavior, and use `aria-hidden="true"` on decorative market graphics.
- Mobile bottom navigation is conditional: implement only if its destinations are real routes with clear value; otherwise omit it.
- No new packages, backend changes, route changes, or broad redesign of analysis pages.

## Files and Responsibilities

- Modify `src/components/layout/Header.tsx`: reference-style desktop header and compact mobile header while preserving auth, menu, search, active-route, and logout behavior.
- Modify `src/components/Hero.tsx`: hero content, free-membership card, decorative market SVG, search, and CTAs.
- Create `src/components/home/FreeMembershipCard.tsx`: reusable free-membership offer card with no trial/payment language.
- Create `src/components/home/TrustStrip.tsx`: four trust signals with responsive 2×2 mobile grid.
- Create `src/components/home/FeaturedAnalysisCard.tsx`: data-driven featured analysis card with optional score/logo and canonical recommendation text.
- Create `src/components/home/MarketBackdrop.tsx`: aria-hidden decorative SVG only.
- Create `src/components/home/MobileBottomNav.tsx` only if route inspection confirms all destinations; otherwise do not create it.
- Modify `src/pages/Home.tsx`: read featured analysis from `analyses`, compose the new first-viewport sections, and retain downstream sections.
- Modify `src/index.css`: centralized serif token, homepage tokens/utilities, reduced-motion rules, responsive spacing, and safe mobile bottom padding if needed.
- Create `src/pages/__tests__/Home.test.tsx` only if the existing test setup can render router/context dependencies without adding test infrastructure; otherwise use build plus browser checks as the UI verification path.

### Task 1: Update the design contract and add data adapters

**Files:**
- Modify: `docs/superpowers/specs/2026-07-20-homepage-reference-redesign-design.md`
- Create: `src/components/home/analysisPresentation.ts`
- Test: `src/components/home/analysisPresentation.test.ts`

**Interfaces:**
- Produce `getFeaturedAnalysis(): AnalysisData` from the existing `analyses` register using the current homepage feature rule or a stable data-derived fallback.
- Produce `getAnalysisPresentation(analysis: AnalysisData)` returning `{ companyName, ticker, title, summary, recommendation, score: { value, max } | null, href, image?: string }`.

- [ ] **Step 1: Write failing adapter tests** for canonical recommendation preservation, score omission when unavailable, URL generation from `slug`, and no dependency on a named company.
- [ ] **Step 2: Run the focused test** with `npm test -- --run src/components/home/analysisPresentation.test.ts` if Vitest is configured; record the current runner limitation if the project has no `test` script.
- [ ] **Step 3: Implement the adapter** using `analyses`, `getAnalysisScore` from `src/lib/score.ts`, and the existing `Recommendation` type.
- [ ] **Step 4: Run the focused test again** and confirm the adapter passes for at least one KÖP, BEVAKA, and AVSTÅ fixture drawn from the register.
- [ ] **Step 5: Commit** with `git add docs/superpowers/specs/2026-07-20-homepage-reference-redesign-design.md src/components/home && git commit -m "feat: add homepage analysis presentation contract"`.

### Task 2: Build the data-driven homepage card primitives

**Files:**
- Create: `src/components/home/FreeMembershipCard.tsx`
- Create: `src/components/home/TrustStrip.tsx`
- Create: `src/components/home/FeaturedAnalysisCard.tsx`
- Create: `src/components/home/MarketBackdrop.tsx`

**Interfaces:**
- `FreeMembershipCard({ onSignup, compact?: boolean }: { onSignup: () => void; compact?: boolean })`.
- `TrustStrip()` has no props and renders the four approved trust messages.
- `FeaturedAnalysisCard({ analysis }: { analysis: AnalysisPresentation })` consumes the adapter result and links to `analysis.href`.
- `MarketBackdrop()` renders only decorative SVG with `aria-hidden="true"` and `focusable="false"`.

- [ ] **Step 1: Implement `FreeMembershipCard`** with “Få mer av Börsanalys.se”, free-account description, four desktop benefits/max three compact benefits, “Skapa gratis konto”, and “Gratis. Ingen betalningsinformation krävs.” No prohibited strings may appear.
- [ ] **Step 2: Implement `TrustStrip`** with lucide icons, exact approved copy, semantic list markup, and a 2×2 mobile layout.
- [ ] **Step 3: Implement `FeaturedAnalysisCard`** with optional existing image, title/summary/recommendation, score ring only when adapter supplies a score, and “Läs analysen”. Recommendation must be readable text, not color-only.
- [ ] **Step 4: Implement `MarketBackdrop`** as low-contrast inline SVG candlesticks plus a rising line and fade; do not animate it continuously.
- [ ] **Step 5: Run `npm run lint`** and fix only type/import errors caused by these components.
- [ ] **Step 6: Commit** with `git add src/components/home && git commit -m "feat: add editorial homepage components"`.

### Task 3: Recompose the hero and homepage above the fold

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- `Hero` continues to consume `openSearch` and `openLoginModal`; its primary CTA navigates to the verified existing analysis archive route.
- `Home` obtains `const featuredAnalysis = getFeaturedAnalysis()` and passes `getAnalysisPresentation(featuredAnalysis)` to `FeaturedAnalysisCard`.

- [ ] **Step 1: Replace the current centered hero** with the approved two-column composition: trust-pill, two-tone serif h1, two-line support copy, search, primary and secondary CTA, reassurance copy, decorative backdrop, and `FreeMembershipCard`.
- [ ] **Step 2: Verify the analysis archive route** in `src/App.tsx` before wiring the primary CTA; use the existing canonical `/analys` route currently registered.
- [ ] **Step 3: Replace hardcoded RevolutionRace featured content** in `Home.tsx` with the adapter-driven `FeaturedAnalysisCard`; retain existing downstream sections and member benefits without changing their logic.
- [ ] **Step 4: Add the weaker “Bygg din egen bevakning” value card** with a non-primary “Se medlemsfördelarna” action and no repeated hero sales copy.
- [ ] **Step 5: Run `npm run lint`** and confirm no prohibited trial/payment copy exists with `rg -n "7 dagar|provperiod|Dag 5|Dag 7|kr/mån|betalning.*krävs|automatisk" src/components src/pages`.
- [ ] **Step 6: Commit** with `git add src/components/Hero.tsx src/pages/Home.tsx && git commit -m "feat: recompose homepage hero and featured analysis"`.

### Task 4: Restyle the global header and responsive tokens

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Preserve existing `Header` behavior and context calls; change only layout, copy, styling, and responsive presentation.

- [ ] **Step 1: Add the central display font token** using the existing serif-safe stack; do not add a new font dependency.
- [ ] **Step 2: Restyle desktop header** to match the reference hierarchy, including compact search field, outlined login action, and green free-account CTA. Keep active-route underline and auth/user/logout states.
- [ ] **Step 3: Restyle mobile header** to show icon logo, search icon, and hamburger while retaining the existing mobile menu and auth controls.
- [ ] **Step 4: Add homepage token classes** for soft green surfaces, subtle shadows, editorial radii, hero spacing, focus-visible states, and `prefers-reduced-motion` behavior.
- [ ] **Step 5: Add responsive rules** for 320 px wrapping, 390 px hero/card stacking, 2×2 trust strip, and safe bottom spacing only if a bottom nav is created.
- [ ] **Step 6: Run `npm run lint`** and commit with `git add src/components/layout/Header.tsx src/index.css && git commit -m "feat: align header and homepage design tokens"`.

### Task 5: Decide and implement mobile bottom navigation only if justified

**Files:**
- Inspect: `src/App.tsx`, `src/pages/Profile.tsx`, `src/pages/MyChecklists.tsx`, `src/components/community/Watchlist.tsx`, `src/components/layout/Header.tsx`
- Create: `src/components/home/MobileBottomNav.tsx` only if all destinations are valid
- Modify: `src/components/layout/Layout.tsx` only if the nav is created

**Interfaces:**
- If created, `MobileBottomNav()` uses `Link` routes only; it does not create login recovery or notification state.

- [ ] **Step 1: Inspect routes** for Hem `/`, Analyser `/analys`, Bevakningar `/profil` or another existing watchlist destination, Notiser, and Meny.
- [ ] **Step 2: Omit the component** if Bevakningar or Notiser lack a real, clearly useful destination; keep the hamburger as the mobile navigation surface.
- [ ] **Step 3: If all destinations qualify, implement five 44×44 px tap targets**, active state from `useLocation`, safe-area padding, and `aria-label`s; wire Meny to the existing header menu through a small callback only if it does not duplicate behavior confusingly.
- [ ] **Step 4: Run `npm run lint`** and confirm mobile content is not obscured; commit only if the component is implemented.

### Task 6: Verify rendered behavior and visual fidelity

**Files:**
- Modify: any files required by concrete verification failures only.
- Test artifacts: save screenshots outside the repository under `/tmp` or the session temp directory.

**Interfaces:**
- Target flow: `/` → homepage renders → hero search opens GlobalSearch → login CTA opens LoginModal → featured analysis navigates to its data-defined route → mobile menu opens without clipping.

- [ ] **Step 1: Start the app** with `npm run dev` and use the Browser plugin first as required by the frontend testing workflow.
- [ ] **Step 2: Verify desktop** at 1440 px and 1024 px: header identity, hero hierarchy, free-membership copy, trust strip, data-driven featured card, no prohibited copy, and no console errors.
- [ ] **Step 3: Verify mobile** at 390×844 and 320 px: header controls, no awkward h1 wrapping, 2×2 trust grid, compact card, safe bottom spacing, and no clipped text.
- [ ] **Step 4: Exercise interactions**: hero search, login CTA, create account CTA, mobile menu, featured link, active navigation, and logout/user state where available.
- [ ] **Step 5: Run `npm run lint` and `npm run build`**; fix failures before claiming completion.
- [ ] **Step 6: Capture final desktop/mobile screenshots** outside the repo and compare against the supplied references across copy, layout, palette, typography, spacing, card hierarchy, icon treatment, and responsive behavior.
- [ ] **Step 7: Commit verification fixes** with a focused message if any were needed.

## Self-Review Checklist

- Spec coverage: product limitation, free-membership card, data-driven feature card, route/context reuse, mobile rules, accessibility, performance, and verification are covered by Tasks 1–6.
- Placeholder scan: no `TBD`, `TODO`, “implement later”, or vague error-handling steps are present.
- Type consistency: `AnalysisPresentation` is produced by Task 1 and consumed by Task 3 through `FeaturedAnalysisCard`; context callbacks retain their existing zero-argument signatures.
