# Task 3 implementation report

## Changed files

- `index.html` — Added stable canonical, Open Graph, and Twitter fallback metadata using `/og-image.png`.
- `public/robots.txt` — Added exclusions for admin, profile, private checklist, and API paths while retaining the production sitemap URL.
- `vercel.json` — Added the explicit `/robots.txt` route before the SPA rewrites; existing rewrites and redirects are unchanged.
- `tests/seo-contract.test.mjs` — Added static metadata, approved OG asset, crawler-policy, and Vercel-route contract assertions.
- `scripts/test-seo-routes.mjs` — Added route-level assertions for each `robots.txt` directive and its `text/plain` response.

`public/og-image.png` was already the approved stable asset and remains the single fallback; no unused `og-default.svg` was created. `src/components/layout/Header.tsx` and unrelated files were not modified.

## Commit

- `503585d feat: add stable social metadata and robots policy`

## Tests and commands

- Initial focused contract run: expected failure for the missing static canonical metadata.
- `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs` — PASS, 15 tests, 0 failures (against the local Vercel routing harness).
- `npm run lint` — PASS; `tsc --noEmit` exited 0.
- `git diff --check` — PASS; no whitespace errors.

## Concerns

No outstanding concerns for the requested scope.

## Review fixes (2026-07-21)

### Changes

- Converted `public/og-image.png` from JPEG-encoded content to genuine PNG bytes in place. The path and all existing references remain unchanged.
- Added an eight-byte PNG signature assertion to `tests/seo-contract.test.mjs`.
- Updated `scripts/serve-vercel-preview.mjs` to read `vercel.json`, require its explicit `/robots.txt` to `/robots.txt` rewrite, load the configured public destination, and serve it from the configured source path.
- Updated the SEO route test to derive the robots route and expected response body from the same Vercel rewrite, then assert `text/plain`, exact served content, and all crawler directives together.

### Test-first evidence

- Initial `node --test tests/seo-contract.test.mjs` run: expected FAIL, 12 passed and 2 failed. The failures showed the JPEG/JFIF signature (`ff d8 ff e0 00 10 4a 46`) and that the preview harness did not read `vercel.json`.
- After the fixes, `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs` — PASS, 15 tests, 0 failures. The route harness returned `/robots.txt` as `text/plain; charset=utf-8` with content exactly matching the configured `/robots.txt` public destination; existing route statuses remained unchanged.
- `npm run lint` — PASS; `tsc --noEmit` exited 0.
- `git diff --check` — PASS; no whitespace errors.
- `file public/og-image.png` and the contract test confirm a 1024×1024 PNG whose first eight bytes are `89 50 4e 47 0d 0a 1a 0a`.

### Scope and follow-up

- No production deployment or live deployment verification was performed. If the release process requires it, verify the deployed image bytes and `/robots.txt` response after deployment.
- `src/components/layout/Header.tsx` and unrelated files were not modified.

## Remaining spec finding fix (2026-07-21)

### Changes

- Added `public/og-default.svg`, a deterministic local 1200×630 social card with Börsanalys.se branding and the Swedish value proposition “Djupgående aktieanalyser – drivna av data och AI.” The SVG has no remote dependencies.
- Changed only the global fallback image in `src/components/SEO.tsx` and the Open Graph/Twitter fallback tags in `index.html` to `/og-default.svg`.
- Kept the intentional public-route `ogImage="/og-image.png"` values unchanged.
- Updated `tests/seo-contract.test.mjs` and `scripts/test-seo-routes.mjs` to require the SVG file, its `viewBox="0 0 1200 630"`, and both global fallback references. The separate real-PNG signature assertion remains in place for `public/og-image.png`.
- Left `public/robots.txt`, `vercel.json`, and the existing robots route-harness behavior unchanged.

### Test-first evidence and verification

- Initial `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs` run: expected FAIL, 13 passed and 3 failed because `public/og-default.svg` did not exist. The route-specific PNG signature assertion passed in that red run.
- First post-implementation combined run: static contracts passed; the route script alone failed with `ECONNREFUSED 127.0.0.1:4173` because its required local preview harness was not running.
- After starting `scripts/serve-vercel-preview.mjs` on port 4173, `node --test tests/seo-contract.test.mjs scripts/test-seo-routes.mjs` — PASS, 16 tests, 0 failures. Existing route and robots expectations remained green.
- `npm run lint` — PASS; `tsc --noEmit` exited 0.
- `git diff --check` — PASS; no whitespace errors.
- `xmllint --noout public/og-default.svg` — PASS; the SVG is well-formed XML.

### Scope and concerns

- No production deployment or live social-crawler rendering verification was performed.
- `src/components/layout/Header.tsx`, explicit route-specific PNG references, robots changes, and unrelated files were not modified.
