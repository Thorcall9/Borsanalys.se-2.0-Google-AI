# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen Börsanalys.se 2.0's technical SEO and make public analysis, guide, stock, and market routes discoverable with reliable metadata, structured data, robots rules, and sitemap coverage.

**Architecture:** Keep the existing Vite/React SPA and centralize public SEO behavior in typed helpers. The first implementation ships metadata, JSON-LD, robots, sitemap, stable OG assets, redirects, and route tests; initial-HTML prerendering is a separately verified second delivery because the current Vercel deployment rewrites public URLs to one SPA shell.

**Tech Stack:** React 19, Vite 6, React Router 7, `react-helmet-async`, Express/Vercel functions, Node test runner, TypeScript.

## Global Constraints

- Use the existing primary URL structure `/analys/...` for analyses.
- Keep private and interactive functions client-rendered.
- Exclude admin, profile, and private checklist routes from indexing and the sitemap.
- Use the shared analysis, guide, and stock registries as the source of SEO data.
- Do not use random external images as the default Open Graph image.
- Preserve correct 404 behavior for unknown slugs.

## File Map

- Create `src/lib/seo/structuredData.ts`: typed JSON-LD builders and safe serialization helpers.
- Modify `src/components/SEO.tsx`: metadata defaults, canonical policy, OG image, article dates, and JSON-LD injection.
- Modify public page components under `src/pages/`: supply route-specific metadata and structured data inputs.
- Create `public/og-default.svg`: stable default social image.
- Create `public/robots.txt`: production crawler policy for static hosting.
- Modify `api/sitemap.ts`: complete public sitemap generated from registries.
- Modify `vercel.json`: robots routing and verified legacy redirects.
- Modify `index.html`: stable fallback metadata and social image tags.
- Modify `tests/seo-contract.test.mjs`, `tests/seo-route-rewrites.test.mjs`, and `scripts/test-seo-routes.mjs`: contract and HTTP checks.

### Task 1: Centralize canonical URLs and JSON-LD builders

**Files:**
- Create: `src/lib/seo/structuredData.ts`
- Modify: `src/components/SEO.tsx`
- Test: `tests/seo-contract.test.mjs`

**Interfaces:**
- `buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>): Record<string, unknown>` returns a `BreadcrumbList` object using `https://www.borsanalys.se`.
- `buildArticleJsonLd(input: { title: string; description: string; path: string; publishedTime?: string; modifiedTime?: string; author?: string; image?: string }): Record<string, unknown>` returns an `Article` object.
- `buildWebsiteJsonLd(): Record<string, unknown>` returns the site `Organization` and `WebSite` graph.
- `serializeJsonLd(value: Record<string, unknown>): string` returns JSON suitable for an inline script.

- [ ] **Step 1: Add contract tests for canonical and JSON-LD source behavior.** Assert that `SEO.tsx` uses the production origin, strips query/hash, emits `og:url`, and imports the structured-data helpers.
- [ ] **Step 2: Run the focused contract tests.**

  Run: `node --test tests/seo-contract.test.mjs`

  Expected: existing tests pass; new import/JSON-LD assertions fail until implementation exists.

- [ ] **Step 3: Implement the helpers with explicit object shapes.** Use `@context: "https://schema.org"`, absolute URLs, `author` as a `Person`/`Organization` object, and `itemListElement` positions starting at 1. `serializeJsonLd` must use `JSON.stringify` and replace `<` with `\\u003c`.
- [ ] **Step 4: Extend `SEOProps` with `jsonLd?: Record<string, unknown> | Record<string, unknown>[]`, `publishedTime?: string`, and `modifiedTime?: string`; render one `application/ld+json` script per graph item.
- [ ] **Step 5: Run the focused tests and TypeScript validation.**

  Run: `node --test tests/seo-contract.test.mjs && npm run lint`

  Expected: PASS and exit code 0.

- [ ] **Step 6: Commit the focused SEO helper change.**

  Run: `git add src/lib/seo/structuredData.ts src/components/SEO.tsx tests/seo-contract.test.mjs && git commit -m "feat: centralize SEO structured data"`

### Task 2: Apply metadata and structured data to public pages

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Analysis.tsx`
- Modify: `src/pages/GuideDetail.tsx`
- Modify: `src/components/StockHub.tsx`
- Modify: `src/pages/Guides.tsx`, `src/pages/Terminology.tsx`, `src/pages/MacroDashboard.tsx`, `src/pages/Tools.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`
- Test: `tests/seo-contract.test.mjs`

**Interfaces:**
- Public article routes call `SEO` with their canonical `/analys/:slug` or `/guider/:slug`, `ogType="article"`, article dates, and `buildArticleJsonLd`.
- Public detail pages call `buildBreadcrumbJsonLd` with the visible route hierarchy.
- Unknown analysis slugs continue to render `NotFound` with `noindex` and `nofollow`.

- [ ] **Step 1: Add source assertions for route-specific metadata.** Check that analysis and guide detail pages use their data titles/descriptions, that stock pages use company descriptions, and that private pages keep `noindex nofollow`.
- [ ] **Step 2: Run the contract tests to establish the failing baseline.**

  Run: `node --test tests/seo-contract.test.mjs`

- [ ] **Step 3: Update the public routes.** Replace generic or duplicated SEO calls with route-specific values, add stable `ogImage` paths, add article JSON-LD for detail pages, and add breadcrumbs for analysis, guide, and stock detail pages. Preserve existing UI and routing behavior.
- [ ] **Step 4: Add website JSON-LD to the home route.** Include the site name, URL, search action only if the existing search UI can produce a stable public URL; otherwise emit only `Organization` and `WebSite`.
- [ ] **Step 5: Run route contract tests and lint.**

  Run: `node --test tests/seo-contract.test.mjs tests/seo-route-rewrites.test.mjs && npm run lint`

  Expected: PASS and exit code 0.

- [ ] **Step 6: Commit the public-route metadata change.**

  Run: `git add src/pages src/components/StockHub.tsx tests/seo-contract.test.mjs && git commit -m "feat: add route metadata and JSON-LD"`

### Task 3: Add stable social assets and crawler policy

**Files:**
- Create: `public/og-default.svg`
- Create: `public/robots.txt`
- Modify: `index.html`
- Modify: `vercel.json`
- Test: `tests/seo-contract.test.mjs`, `scripts/test-seo-routes.mjs`

**Interfaces:**
- Default social image URL is `https://www.borsanalys.se/og-default.svg`.
- `robots.txt` allows `/`, disallows `/admin/`, `/profil`, `/mina-checklistor`, `/api/`, and points to `https://www.borsanalys.se/sitemap.xml`.
- `/robots.txt` returns `text/plain` in production and preview.

- [ ] **Step 1: Add tests for asset and crawler policy.** Assert the SVG exists, `index.html` references it, robots contains the disallow rules and sitemap, and Vercel maps `/robots.txt` to the public file.
- [ ] **Step 2: Run the focused tests and confirm the new assertions fail.**

  Run: `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs`

- [ ] **Step 3: Create a deterministic SVG social card.** Use the Börsanalys.se name, a short Swedish value proposition, and a 1200×630 viewBox; do not embed remote assets.
- [ ] **Step 4: Add robots and update `index.html`.** Set Swedish `lang`, stable title/description/canonical, `og:type`, `og:url`, `og:image`, and Twitter image metadata without duplicating route-specific Helmet values in a conflicting way.
- [ ] **Step 5: Add the explicit Vercel rewrite for `/robots.txt` while keeping route-specific SPA rewrites and existing redirects intact.**
- [ ] **Step 6: Run tests and commit.**

  Run: `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs && git add public/og-default.svg public/robots.txt index.html vercel.json tests/seo-contract.test.mjs scripts/test-seo-routes.mjs && git commit -m "feat: add stable social assets and robots policy"`

### Task 4: Complete sitemap coverage and URL hygiene

**Files:**
- Modify: `api/sitemap.ts`
- Modify: `vercel.json`
- Test: `tests/seo-contract.test.mjs`, `scripts/test-seo-routes.mjs`

**Interfaces:**
- `api/sitemap.ts` emits only canonical public URLs for static pages, `analyses`, `guides`, and `companies`.
- Every XML URL is absolute, XML-escaped, and has a stable optional `lastmod`.

- [ ] **Step 1: Add sitemap assertions for guide and stock URLs, forbidden private prefixes, canonical origin, and duplicate-free output.**
- [ ] **Step 2: Run the route test to verify the new assertions fail where coverage is missing.**

  Run: `node --test scripts/test-seo-routes.mjs`

- [ ] **Step 3: Import the guide and stock registries and generate their routes from `Object.values(...)`.** Add public static routes that exist in `App.tsx`, omit aliases such as `/borsskolan/...`, and use each record's date where available.
- [ ] **Step 4: Add permanent redirects for any known legacy public analysis aliases that are not already covered, without redirecting unknown slugs to the archive.**
- [ ] **Step 5: Run the full route and type checks.**

  Run: `npm run lint && npm run build`

  Expected: PASS; sitemap contains analysis, guide, and stock routes and no private/legacy prefixes.

- [ ] **Step 6: Commit the sitemap and URL-hygiene change.**

  Run: `git add api/sitemap.ts vercel.json tests/seo-contract.test.mjs scripts/test-seo-routes.mjs && git commit -m "feat: expand public sitemap coverage"`

### Task 5: Verify the deployed SPA baseline and prepare initial-HTML rendering

**Files:**
- Modify: `scripts/test-seo-routes.mjs`
- Create: `scripts/inspect-seo-html.mjs`
- Create: `docs/superpowers/plans/2026-07-21-seo-rendering-follow-up.md` only if the baseline proves a separate rendering design is required

**Interfaces:**
- `scripts/test-seo-routes.mjs` verifies status, content type, redirects, sitemap, robots, canonical, title, description, H1, and JSON-LD for representative public routes.
- `scripts/inspect-seo-html.mjs` accepts one base URL argument and prints whether the initial response contains each required SEO element.

- [ ] **Step 1: Extend the HTTP route matrix with `/guider/grunderna-i-aktieanalys`, one `/aktier/:slug`, `/marknad`, and representative private routes.**
- [ ] **Step 2: Add assertions for initial HTML.** Require `<title>`, `meta[name="description"]`, canonical, one H1, and JSON-LD on public detail pages; require `noindex` on private/unknown routes.
- [ ] **Step 3: Run the app's production build and serve it through the existing preview/server workflow.**

  Run: `npm run build`

  Expected: build succeeds without changing database or API contracts.

- [ ] **Step 4: Run the route smoke test against the served build.**

  Run: `node scripts/test-seo-routes.mjs http://127.0.0.1:4173`

  Expected: all route, redirect, sitemap, robots, and metadata assertions pass; record whether route content is present before JavaScript execution.

- [ ] **Step 5: If initial HTML still contains only the SPA shell, stop the first delivery here and write a separate rendering follow-up that compares static prerendering with Express/Vercel SSR using measured build/deploy constraints.** Do not introduce a rendering dependency without that measurement.
- [ ] **Step 6: Commit the verification tooling.**

  Run: `git add scripts/test-seo-routes.mjs scripts/inspect-seo-html.mjs && git commit -m "test: verify SEO route output"`

## Plan Self-Review

- Spec coverage: metadata, canonical URLs, robots, sitemap, JSON-LD, stable OG assets, URL hygiene, 404/noindex behavior, route tests, and initial-HTML verification each have a task.
- Placeholder scan: no implementation step depends on an unspecified value; phase-2 rendering is explicitly gated on the measured baseline rather than silently changing deployment architecture.
- Type consistency: JSON-LD helpers accept `Record<string, unknown>` and the `SEO` component accepts the same shape or an array; route tests consume HTTP output only.
