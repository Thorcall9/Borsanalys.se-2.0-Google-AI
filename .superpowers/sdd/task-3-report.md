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
