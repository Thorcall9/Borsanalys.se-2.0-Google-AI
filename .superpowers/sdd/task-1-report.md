# Task 1 implementation report

## Changed files

- `src/lib/seo/structuredData.ts` — Added production-origin URL normalization and the `buildBreadcrumbJsonLd`, `buildArticleJsonLd`, `buildWebsiteJsonLd`, and `serializeJsonLd` helpers. The helpers use explicit Schema.org object shapes, absolute URLs, 1-based breadcrumb positions, structured author/publisher objects, and safe `<` escaping.
- `src/components/SEO.tsx` — Added `jsonLd`, `publishedTime`, and `modifiedTime` props; article date metadata; and one escaped `application/ld+json` script per graph item.
- `tests/seo-contract.test.mjs` — Added contract assertions for the shared helper import, SEO props, JSON-LD output, helper exports, Schema.org context, serialization, and escaping.

The existing user change in `src/components/layout/Header.tsx` was not modified.

## Commit

`81779d9` — `feat: centralize SEO structured data`

## Tests and commands

- `node --test tests/seo-contract.test.mjs` — PASS, 7/7 tests.
- `npm run lint` — PASS; `tsc --noEmit` exited 0.
- `git diff HEAD^ --check` — PASS; no whitespace errors.

The focused contract tests were first run against the missing implementation and failed as expected, then passed after the implementation was added.

## Concerns

`SEO.tsx` retains its pre-existing external `picsum.photos` default OG image. Stable local OG-image work is outside the focused Task 1 scope and remains for the broader SEO plan.

## Task 1 SEO review fixes — 2026-07-21

### Changes

- `src/components/SEO.tsx` — Replaced the external `picsum.photos` default with `/og-default.svg`.
- `src/lib/seo/structuredData.ts` — Changed `absoluteUrl` to parse the supplied URL only for its pathname, then rebuild it on `https://www.borsanalys.se`. Query strings, hashes, and trailing slashes are omitted.
- `tests/seo-contract.test.mjs` — Retained the partial regression test after confirming it captures both requested review fixes.

### Verification

- Initial regression run: expected failure, 7/8 tests passed; the old `picsum.photos` default was detected.
- Intermediate regression run after the OG-image fix: expected failure, 7/8 tests passed; the old origin-preserving URL construction was detected.
- Final `node --test tests/seo-contract.test.mjs`: PASS, 8/8 tests.
- `npm run lint`: PASS; `tsc --noEmit` exited 0.
- `git diff --check`: PASS; no whitespace errors.

### Scope and concerns

- `src/components/layout/Header.tsx` and unrelated files were not modified.
- No outstanding concerns found for the requested fixes.

## Task 1 remaining OG asset fix — 2026-07-21

### Changed files

- `src/components/SEO.tsx` — Changed the default OG/Twitter image from the nonexistent `/og-default.svg` to `/og-image.png`.
- `tests/seo-contract.test.mjs` — Added an existence assertion for `public/og-image.png` and updated the SEO default assertion.
- `.superpowers/sdd/task-1-report.md` — Appended this report entry.

### Commit

`fix: use existing OG image asset`

### Tests and commands

- `node --test tests/seo-contract.test.mjs` — PASS, 8/8 tests.
- `npm run lint` — PASS; `tsc --noEmit` exited 0.
- `git diff --check` — PASS; no whitespace errors.

### Concerns

No outstanding concerns for the requested scope. Production-origin URL hardening was left unchanged, and `Header.tsx` was not modified.
