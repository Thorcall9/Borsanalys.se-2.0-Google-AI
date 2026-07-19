# Technical SEO Rebuild Design

## Goal

Make the current Vite/React SPA return consistent, verifiable SEO behavior without migrating to SSR or changing the application architecture.

## Evidence-driven scope

- `vercel.json` currently rewrites `/(.*)` to `/index.html`, so unknown non-API paths return the SPA shell with HTTP 200.
- `App.tsx` renders `Layout` outside `Routes` and has no catch-all route, so an unknown path can render only the global chrome.
- `Analysis.tsx` redirects an unknown analysis slug to `/analys`.
- `SEO.tsx` uses the browser URL directly and does not normalize the production host, query, hash, or trailing slash; some analysis templates do not render SEO metadata at all.
- `api/sitemap.ts` contains legacy, non-existent route families instead of deriving URLs from the analysis registry.

## Design

1. Keep Vercel as a static Vite deployment plus serverless functions. Remove the global SPA rewrite. Add explicit legacy redirects, API/sitemap rewrites, and an explicit `/index.html` rewrite for every valid React route and route family in `App.tsx`. Let Vercel serve real static assets and return 404 for unknown paths that match none of those rules.
2. Add a React `NotFound` component for SPA URLs that reach the app. It preserves the requested URL, renders an explicit 404 view, and emits `noindex, follow` without canonical or Open Graph URL. Internal preview/admin/development routes that remain intentionally available emit `noindex, nofollow` and no canonical; they are excluded from sitemap and public navigation.
3. Make `SEO` own canonical normalization. It always uses `https://www.borsanalys.se`, removes query/hash, removes trailing slash except root, resolves explicit relative paths, and sets `og:url` to the same normalized URL. It supports an explicit noindex mode that suppresses canonical and `og:url`.
4. Validate route parameters in React. Unknown analysis and guide slugs render `NotFound` without navigation. Existing authenticated profile behavior remains unchanged because it is an intentional access redirect, not a missing public route.
5. Generate sitemap URLs from the shared `analyses` registry and a single explicit list of public static routes. Include only indexable routes and set `Content-Type: application/xml`. Add source-level and route-level tests for the sitemap and API boundary.

## Error and status model

- Unknown non-API Vercel paths: HTTP 404 from Vercel.
- Known SPA routes: static `index.html` with React-rendered content.
- Unknown analysis/guide paths that enter the SPA: React noindex 404, URL unchanged.
- Intentional preview/admin/development routes: HTTP 200, explicit noindex/nofollow, no canonical, no sitemap entry.
- Existing API function paths: function-specific status; unknown `/api/*`: HTTP 404 and never HTML.
- Legacy moved pages: explicit 301 redirects only for verified destinations.

## Verification

The branch will include a reusable route test script accepting a base URL, a browser metadata test, and a route-coverage test that compares every `App.tsx` route with Vercel's explicit `/index.html` rewrites. Baseline tests must fail on the current behavior; after implementation they must pass against the local preview and, once pushed, against the Vercel Preview URL. No merge or production deployment is part of this change.
