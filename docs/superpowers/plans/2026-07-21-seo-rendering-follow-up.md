# SEO Initial-HTML Rendering Follow-up

**Status:** Required before relying on initial HTML for route-level SEO. This document records the measured SPA baseline; it does not add a rendering dependency or change deployment.

## Measured baseline (2026-07-21)

The production build completed with `npm run build` in 2.26 seconds for Vite (3.1 seconds wall-clock including Prisma generation). It transformed 2,840 modules and produced a 2.79 kB `dist/index.html` (0.98 kB gzip). The largest emitted JavaScript assets were 674.62 kB and 686.59 kB before gzip; Vite emitted its existing chunk-size warnings.

The local Vercel-style preview was started with:

```bash
PORT=4173 node scripts/serve-vercel-preview.mjs
```

`scripts/serve-vercel-preview.mjs` reads one `dist/index.html` at startup and returns that same file for every SPA route covered by the mirrored Vercel rewrites. In particular, `vercel.json` rewrites every `/analys/:path*` request to `/index.html`, regardless of whether the slug exists in the analysis registry. The current deployment contract has serverless functions only for APIs such as sitemap and RSS; it has no SSR entrypoint.

`node scripts/inspect-seo-html.mjs http://127.0.0.1:4173` measured the following initial-response behavior:

| Route | HTTP | Initial response | Route canonical | H1 | JSON-LD | noindex |
| --- | --- | --- | --- | --- | --- | --- |
| `/analys/volvo` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/guider/grunderna-i-aktieanalys` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/aktier/saab` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/marknad` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/profil` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |
| `/analys/helt-pahittad` | 200 | empty SPA root | `/` (incorrect) | 0 | absent | absent |

The route smoke test records 11 initial-HTML SEO failures: the three public detail routes each lack their route canonical, an H1, and JSON-LD; `/profil` and `/admin/subscribers` lack initial `noindex`. The generic root title and description are present, but they are not route-specific content. The unknown canonical analysis route is separately recorded as a 200 SPA shell with no initial `noindex`; after JavaScript runs, React can render its noindex NotFound page, but that does not turn the initial response into a real HTTP 404.

Real HTTP 404 status plus initial `noindex` for unknown dynamic routes is therefore a rendering/edge-routing requirement. A future solution must resolve whether a dynamic slug exists before committing the response status and HTML metadata; the current catch-all SPA rewrite cannot provide that contract by itself. The legacy `/analyser/helt-pahittad` URL remains a plain HTTP 404 because no Vercel rewrite covers it.

No Vercel deployment was made for this measurement, as required. The static build duration and emitted artifact sizes above are the deploy-relevant baseline. A future rendering trial must measure its own build duration, emitted server/static artifact sizes, and Vercel preview build/deploy duration against this baseline.

## Options

### Option A — Static prerendering (recommended first experiment)

At build time, generate one HTML document for every indexable public route from the existing analysis, guide, stock, and static-route registries. Each document must contain the route title, description, canonical URL, exactly one H1, and serialized JSON-LD before JavaScript runs. Vercel must serve those generated HTML files for known public URLs, while rendering or edge routing returns a real 404 document with initial `noindex` for unknown dynamic routes. Private routes may continue to use the SPA shell only if their initial response can include `noindex` (or move behind an authenticated non-indexable boundary).

Why it fits the measured system:

- The three failed detail route families already have finite, shared registries used by the sitemap.
- The current site successfully produces static Vite assets; its only missing artifact is route-specific HTML.
- Static output avoids adding a request-time runtime to the current Vercel configuration, which contains no SSR function today.

Risks and required measurements:

- Generate all public pages deterministically and verify the total generated HTML count matches the sitemap's indexable URLs.
- Confirm hydration uses the same route data and does not replace or duplicate `<head>` elements.
- Measure build time and deploy artifact size versus the 2.26-second/2.79-kB-single-shell baseline.
- Replace or precede the catch-all dynamic rewrites with a rendering/edge check that returns HTTP 404 and initial `noindex` when a registry-backed slug is unknown.
- Test unknown and private paths separately so generated files cannot leave them as indexable 200 responses.

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

Start with a static-prerendering spike limited to the three public detail route families. Continue with it only if all three known route responses pass `scripts/test-seo-routes.mjs`, generated routes exactly match the indexable sitemap subset, unknown dynamic routes receive a real HTTP 404 with initial `noindex` from the rendering/edge layer, and build/deploy measurements stay acceptable against the baseline. Escalate to SSR when request-time route resolution is needed and cannot be represented by explicit static output plus an edge fallback.
