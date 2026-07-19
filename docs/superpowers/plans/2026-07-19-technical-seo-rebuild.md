# Technical SEO Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make routing, metadata, sitemap, and invalid-route behavior consistent and verifiable on the existing Vite/React/Vercel architecture.

**Architecture:** Keep Vite static hosting and Vercel Functions. Replace the global rewrite with explicit routing rules, use React only for known SPA routes plus a noindex catch-all, and centralize canonical/OG normalization in `SEO.tsx`.

**Tech Stack:** Vite 6, React 19, React Router 7, react-helmet-async, Vercel Functions, Node test runner, browser-client Playwright API.

## Global Constraints

- Do not migrate to Next.js, SSR, or another architecture.
- Do not modify or merge `main`.
- Do not deploy production.
- Preview/admin/development routes that remain accessible must be 200 + `noindex, nofollow`, with no canonical and no sitemap entry.
- Unknown baseroutes and `/services-store-test` must return real HTTP 404 and must not reach the SPA layout.
- Unknown analysis slugs must keep their URL and render a noindex React 404.

### Task 1: Add failing route and source-contract tests

**Files:**
- Create: `scripts/test-seo-routes.mjs`
- Create: `tests/seo-contract.test.mjs`
- Create: `tests/seo-browser.mjs`

- [ ] Write tests for the required route matrix, API HTML exclusion, sitemap entries, and canonical/noindex expectations.
- [ ] Run the tests against the baseline and record the expected failures.
- [ ] Keep the tests base-URL configurable and avoid requiring private credentials.

### Task 2: Implement route boundaries and React 404s

**Files:**
- Modify: `vercel.json`
- Modify: `src/App.tsx`
- Modify: `src/pages/Analysis.tsx`
- Modify: `src/pages/GuideDetail.tsx`
- Create: `src/pages/NotFound.tsx`

- [ ] Add explicit 301 redirects for `/integritetspolicy` and the verified Investor legacy URL.
- [ ] Remove the global Vercel rewrite and preserve only explicit API/sitemap rewrites.
- [ ] Add a catch-all React `NotFound` route after known routes.
- [ ] Replace unknown analysis and guide redirects with `NotFound` while preserving the URL.
- [ ] Mark intentionally accessible internal pages noindex/nofollow and keep them outside public navigation/sitemap.

### Task 3: Centralize metadata normalization

**Files:**
- Modify: `src/components/SEO.tsx`
- Modify: affected analysis templates where SEO is absent or an explicit canonical is needed.

- [ ] Normalize canonical URLs to `https://www.borsanalys.se`, removing query/hash and non-root trailing slash.
- [ ] Make `og:url` identical to canonical for indexable pages.
- [ ] Suppress canonical and `og:url` on noindex/404 pages.
- [ ] Add robots support for explicit `noindex, nofollow` and React 404 `noindex, follow`.

### Task 4: Rebuild sitemap from the shared registry and isolate APIs

**Files:**
- Modify: `api/sitemap.ts`
- Modify: `public/robots.txt` only if verification shows a required host/sitemap correction.

- [ ] Derive analysis URLs from `src/data/analyses/index.ts` and include only public static routes.
- [ ] Exclude all legacy, API, preview, admin, development, and redirecting paths.
- [ ] Ensure serverless imports remain browser-independent and return XML with HTTP 200.
- [ ] Ensure unknown `/api/*` never falls through to HTML.

### Task 5: Run red-green verification and preview handoff

**Files:**
- No additional source files.

- [ ] Run the route script against local preview and browser metadata tests.
- [ ] Run existing tests, lint, and `npm run build`.
- [ ] Review the complete git diff and commit only scoped changes.
- [ ] Push `codex-seo-rebuild` so Vercel creates a Preview Deployment.
- [ ] Run the same route and browser tests against the Preview URL and stop without merge or production deployment.
