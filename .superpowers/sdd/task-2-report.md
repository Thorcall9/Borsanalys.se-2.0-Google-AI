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
