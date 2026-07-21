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
