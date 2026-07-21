# Task 2 Report: Public route metadata and structured data

## Commit

- `6448d58 feat: add route metadata and JSON-LD`

## Changed files

- `src/pages/Home.tsx`
- `src/pages/Analysis.tsx`
- `src/pages/GuideDetail.tsx`
- `src/components/StockHub.tsx`
- `src/pages/Guides.tsx`
- `src/pages/Terminology.tsx`
- `src/pages/MacroDashboard.tsx`
- `src/pages/Tools.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`
- `src/pages/NotFound.tsx`
- `tests/seo-contract.test.mjs`

## Verification

- `node --test tests/seo-contract.test.mjs tests/seo-route-rewrites.test.mjs`: 11 passing, 0 failing.
- `npm run lint`: passed (`tsc --noEmit`).

## Concerns

- Analysis templates retain their existing local SEO declarations. The route-level SEO declaration is now rendered last in every analysis detail branch so it supplies the canonical URL, article dates, and JSON-LD without changing those templates.
- No stable public URL exists for the global search, so the home `WebSite` JSON-LD deliberately omits `SearchAction`.

## Important review fixes

### Changes

- The explicit `/analys/revolutionrace-2026` and `/analys/rvrc-2026` routes still render `RvrcPreview` before `/analys/:slug`. Both aliases now use the shared `revolutionrace-2026` registry entry for article metadata, canonicalize to `/analys/revolutionrace-2026`, use `/og-image.png`, and emit article and breadcrumb JSON-LD.
- SBB's shared `date` is now the ISO 8601 value `2026-04-17`. Its existing visible label remains `17 april 2026` through the display-only `displayDate` field.
- `tests/seo-contract.test.mjs` now covers the special RevolutionRace route ordering, registry-backed metadata contract, canonical alias behavior, and SBB's ISO/display date split.

### Verification

- `node --test tests/seo-contract.test.mjs tests/seo-route-rewrites.test.mjs`: 13 passing, 0 failing (exit 0).
- `npm run lint`: passed; `tsc --noEmit` exited 0.
- `git diff --check`: passed with no output (exit 0).

### Concerns

- None identified. The RevolutionRace page UI and both aliases are preserved, and only date presentation consumers opt into `displayDate` when it is present.

## Fix: SBB disclosure date fallback

### Changes

- Updated `AnalysisDisclaimer` to pass `analysisData.displayDate || analysisData.date` to the visible disclosure, preserving the Swedish label while retaining the ISO registry date for SEO metadata.
- Added a focused SEO contract assertion covering the disclosure fallback.

### Verification

- `node --test tests/seo-contract.test.mjs tests/seo-route-rewrites.test.mjs`: 13 passing, 0 failing (exit 0).
- `npm run lint`: passed; `tsc --noEmit` exited 0.
- `git diff --check`: passed with no output (exit 0).

### Concerns

- None identified. `Header.tsx` and unrelated files were not touched.

## Fix: delayed deep-dive SEO ownership

### Changes

- Removed the local `SEO` imports and declarations from `NibeDeepDive` and `ABBDeepDive`, leaving `Analysis.tsx` as the only metadata owner for those routes.
- Added an SEO contract test asserting that neither delayed deep-dive component imports or renders local SEO.
- Preserved both components' existing 50 ms delayed mounting behavior and UI.

### Verification

- `node --test tests/seo-contract.test.mjs tests/seo-route-rewrites.test.mjs`: 14 passing, 0 failing (exit 0).
- `npm run lint`: passed; `tsc --noEmit` exited 0.
- `git diff --check`: passed with no output (exit 0).

### Concerns

- None identified. `Header.tsx` and unrelated files were not touched.
