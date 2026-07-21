# SEO Initial-HTML Rendering Follow-up

**Status:** Required before relying on initial HTML for route-level SEO. This document records the measured SPA baseline; it does not add a rendering dependency or change deployment.

## Measured baseline (2026-07-21)

The production build completed with `npm run build` in 2.26 seconds for Vite (3.1 seconds wall-clock including Prisma generation). It transformed 2,840 modules and produced a 2.79 kB `dist/index.html` (0.98 kB gzip). The largest emitted JavaScript assets were 674.62 kB and 686.59 kB before gzip; Vite emitted its existing chunk-size warnings.

The local Vercel-style preview was started with:

```bash
PORT=4173 node scripts/serve-vercel-preview.mjs
```

`scripts/serve-vercel-preview.mjs` reads one `dist/index.html` at startup and returns that same file for every SPA route. `vercel.json` likewise maps the public analysis, guide, stock, market, private, and tool route families to `/index.html`. The current deployment contract has serverless functions only for APIs such as sitemap and RSS; it has no SSR entrypoint.

`node scripts/inspect-seo-html.mjs http://127.0.0.1:4173` measured the following initial-response behavior:

| Route | HTTP | Initial response | Route canonical | H1 | JSON-LD | noindex |
| --- | --- | --- | --- | --- | --- | --- |
| `/analys/volvo` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/guider/grunderna-i-aktieanalys` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/aktier/saab` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/marknad` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/profil` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/analys/helt-pahittad` | 404 | plain text, not SPA HTML | none | 0 | absent | n/a (HTTP 404) |

The route smoke test records 11 initial-HTML SEO failures: the three public detail routes each lack their route canonical, an H1, and JSON-LD; `/profil` and `/admin/subscribers` lack initial `noindex`. The generic root title and description are present, but they are not route-specific content.

No Vercel deployment was made for this measurement, as required. The static build duration and emitted artifact sizes above are the deploy-relevant baseline. A future rendering trial must measure its own build duration, emitted server/static artifact sizes, and Vercel preview build/deploy duration against this baseline.

## Options

### Option A — Static prerendering (recommended first experiment)

At build time, generate one HTML document for every indexable public route from the existing analysis, guide, stock, and static-route registries. Each document must contain the route title, description, canonical URL, exactly one H1, and serialized JSON-LD before JavaScript runs. Vercel must serve those generated HTML files for public URLs, while private routes continue to use the SPA shell only if their initial response can include `noindex` (or move behind an authenticated non-indexable boundary).

Why it fits the measured system:

- The three failed detail route families already have finite, shared registries used by the sitemap.
- The current site successfully produces static Vite assets; its only missing artifact is route-specific HTML.
- Static output avoids adding a request-time runtime to the current Vercel configuration, which contains no SSR function today.

Risks and required measurements:

- Generate all public pages deterministically and verify the total generated HTML count matches the sitemap's indexable URLs.
- Confirm hydration uses the same route data and does not replace or duplicate `<head>` elements.
- Measure build time and deploy artifact size versus the 2.26-second/2.79-kB-single-shell baseline.
- Test unknown and private paths separately so generated files cannot accidentally turn them into indexable 200 responses.

### Option B — Express/Vercel SSR

Add an SSR build and a Vercel serverless rendering entrypoint (or an Express adapter) that renders the matching React route for each request, then serves Vite client assets for hydration. The endpoint must use the existing SEO registries and return real 404 responses for unknown paths, with initial `noindex` for private paths.

Why it is more involved here:

- The current production build is client-only and the current Vercel configuration has no Node route renderer.
- The current preview harness is intentionally static; it would need a separate SSR execution path to be representative.
- Dynamic market data needs an explicit cache/fallback policy, and server request work must not call the browser-only Firebase/auth paths during rendering.

Required measurements before selection:

- Add a minimal prototype only in an isolated branch, then measure cold and warm preview response time for the six baseline routes.
- Measure Vercel function bundle size, build duration, preview deployment duration, and error rate against the static baseline above.
- Verify that function routing does not intercept `/sitemap.xml`, `/robots.txt`, or existing API endpoints and redirects.

## Decision gate

Start with a static-prerendering spike limited to the three public detail route families. Continue with it only if all three route responses pass `scripts/test-seo-routes.mjs`, generated routes exactly match the indexable sitemap subset, and its build/deploy measurements stay acceptable against the baseline. Escalate to SSR only if a route needs request-specific HTML that cannot be represented by an explicit static fallback and client hydration.
