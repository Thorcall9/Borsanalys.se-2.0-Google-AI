# Task 5 SEO verification report

## Status

Corrected the local preview and verification report to mirror the deployed Vercel rewrite contract. Every canonical `/analys/` path now receives the initial-HTML SPA shell, including unknown slugs; no rendering dependency or deployment was added.

## Changed files

- `scripts/serve-vercel-preview.mjs` — removes analysis-registry gating and serves the SPA shell for `/analys` and every `/analys/` path, matching `vercel.json`.
- `scripts/test-seo-routes.mjs` — expects `/analys/helt-pahittad` to be an HTTP 200 SPA shell and explicitly records that its initial HTML has no `noindex`; `/analyser/helt-pahittad` remains a non-SPA 404.
- `tests/seo-contract.test.mjs` — locks the preview to the unrestricted canonical analysis rewrite and rejects registry-gated preview routing.
- `docs/superpowers/plans/2026-07-21-seo-rendering-follow-up.md` — records the corrected baseline and identifies real HTTP 404/noindex handling as a rendering/edge-routing requirement.
- `.superpowers/sdd/task-5-report.md` — records this deployment-fidelity correction.

`Header.tsx` and unrelated application files were not changed.

## Commands and actual results

| Command | Result |
| --- | --- |
| `node --test tests/seo-contract.test.mjs` | Passed: 16 tests, 0 failures. |
| `PORT=4173 node scripts/serve-vercel-preview.mjs` | Started the corrected local Vercel-style preview at `http://127.0.0.1:4173`. |
| `node scripts/test-seo-routes.mjs http://127.0.0.1:4173` | Reported `/analys/helt-pahittad` as HTTP 200, HTML SPA shell, and initial `noindex: false`; `/analyser/helt-pahittad` remained HTTP 404 without a shell. It then exited 1 on the same 11 known initial-HTML SEO findings. |
| `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs` | Exited 1 as expected: 16 source-contract tests passed and the route script reported the same 11 known initial-HTML SEO findings. The unknown canonical analysis route satisfied its corrected 200 SPA-shell/no-initial-noindex expectation. |
| `npm run lint` | Passed (`tsc --noEmit`). |
| `npm run build` | Passed; Vite transformed 2,840 modules and completed in 2.69 seconds. Existing chunk-size warnings remained. |
| `git diff --check` | Passed. |

## Rendering follow-up

Updated: `docs/superpowers/plans/2026-07-21-seo-rendering-follow-up.md`.

The follow-up records a 2.26-second Vite baseline build (3.1 seconds including Prisma) and the 2.79 kB/0.98 kB gzip shared HTML shell. It recommends measuring a static-prerendering spike for the three public detail route families before considering Express/Vercel SSR, with real HTTP 404 and initial `noindex` for unknown dynamic routes treated as a rendering/edge-routing acceptance requirement.

## Commits

- Original Task 5 verification: `f678a71 test: verify SEO route output`.
- Deployment-fidelity correction: the commit containing this report.

## Self-review

Reviewed the preview matcher, route matrix, and rendering follow-up against the actual Vercel rewrite. The canonical unknown analysis route is no longer mislabeled as a real 404/noindex response. The report preserves the distinction between the initial HTTP response and the client-rendered NotFound state, and no deployment or rendering dependency changed.

## Part A static fallback metadata integration

Marked all twelve title, description, canonical, Open Graph, and Twitter fallback nodes in `index.html` with `data-static-seo`. The static Open Graph and Twitter image URLs now use the production absolute URL. `SEO.tsx` removes the tagged fallback layer in `useLayoutEffect` and converts every Helmet Open Graph/Twitter image URL through `new URL(ogImage, SITE_ORIGIN).toString()`, preserving route-specific images.

### Commands and actual results

| Command | Result |
| --- | --- |
| `node --test tests/seo-contract.test.mjs` | Passed: 17 tests, 0 failures. The new static-fallback ownership and absolute-image assertions passed. |
| `npm run lint` | Passed (`tsc --noEmit`). |
| `git diff --check` | Passed. |

### Scope

Only `index.html`, `src/components/SEO.tsx`, the existing focused SEO assertions in `tests/seo-contract.test.mjs` and `scripts/test-seo-routes.mjs`, and this report changed. Routes, sitemap, information pages, analysis child components, and `Header.tsx` were not modified.

## Part B canonical routing and legal-page metadata integration

### Status

Added permanent Vercel redirects for every known `Analysis.tsx` alias while preserving the existing client-side aliases as fallbacks. `/innehav` and `/intressekonflikter` now permanently redirect to `/aktieinnehav-och-intressekonflikter`, which is the only holdings URL included in the sitemap. `Terms.tsx`, `Privacy.tsx`, and `Holdings.tsx` now use the shared `SEO` component with their stable canonical path and `/og-image.png`.

### Changed files

- `vercel.json` — adds the nine canonical analysis redirects and the two holdings redirects; retains the RVRC and legacy redirects.
- `api/sitemap.ts` — removes the redirected `/innehav` route.
- `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `src/pages/Holdings.tsx` — replace raw Helmet metadata with shared SEO metadata without changing visible page UI.
- `tests/seo-contract.test.mjs` — asserts every redirect, the sole sitemap holdings URL, and shared legal/holdings metadata.
- `scripts/test-seo-routes.mjs` — exercises every new redirect and excludes `/innehav` from sitemap expectations.

`Header.tsx`, `index.html`, `src/components/SEO.tsx`, `src/pages/Analysis.tsx`, and analysis child components were not changed for Part B.

### Commands and actual results

| Command | Result |
| --- | --- |
| `node --test tests/seo-contract.test.mjs` | Passed: 18 tests, 0 failures. |
| `node scripts/test-seo-routes.mjs http://127.0.0.1:4176` | Every new analysis and holdings redirect returned 301 to its requested canonical destination and resolved to HTTP 200. The script then exited 1 on 11 pre-existing initial-HTML assertions for unrelated detail/private pages: the local preview serves the generic static shell, while those assertions require route-specific canonical/H1/JSON-LD or initial noindex. |
| `npm run lint` | Passed (`tsc --noEmit`). |
| `npm run build` | Passed; Vite transformed 2,840 modules. Existing chunk-size warnings remained. |
| `git diff --check` | Passed. |

### Concern

The full preview route script remains blocked by the existing static-shell versus route-specific initial-HTML SEO mismatch. Addressing it would change static SEO ownership or rendering behavior, which Part B explicitly excludes. The new redirects and sitemap assertions completed successfully before those unrelated assertions ran.

## Part C analysis-child SEO ownership integration

### Status

Removed local `SEO` imports and rendering from the analysis-route child components. `Analysis.tsx` remains the only metadata owner for these views through its centralized `analysisMeta` element, so lazy child components can no longer override the route-level canonical, social, or structured metadata. Visible UI and behavior are unchanged.

### Changed files

- `src/components/analysis/PlejdDeepDive.tsx`
- `src/components/analysis/AxfoodDeepDive.tsx`
- `src/components/analysis/ComprehensiveAnalysis.tsx`
- `src/components/analysis/InwidoDeepDive.tsx`
- `src/components/analysis/ReportComment.tsx`
- `tests/seo-contract.test.mjs` — expands the existing route-ownership contract to cover all five components (and retains the prior Nibe/ABB coverage).
- `.superpowers/sdd/task-5-report.md` — records Part C results.

`Header.tsx`, static metadata, redirects, and the sitemap were not changed.

### Commands and actual results

| Command | Result |
| --- | --- |
| `node --test tests/seo-contract.test.mjs` | Passed: 18 tests, 0 failures. The expanded analysis-child SEO ownership contract passed. |
| `npm run lint` | Passed (`tsc --noEmit`). |
| `npm run build` | Passed; Prisma Client generated, Vite transformed 2,840 modules, and built in 2.45 seconds. The existing warning about chunks larger than 500 kB remained. |
| `git diff --check` | Passed. |

### Concern

No Part C blockers. The production build still emits the pre-existing large-chunk warning; resolving it would be unrelated to this scoped SEO ownership change.
