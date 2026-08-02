# Meta analysis hidden-preview design

## Goal

Add Meta Platforms as a production-ready Börsanalys.se analysis at `/analyser/meta` using the existing analysis layout and shared components. The route is available for direct visual review but remains hidden from all public discovery surfaces until explicitly approved.

## Scope

- Implement one `MetaDeepDive` analysis component using the established v10 reader-facing layout and existing shared analysis components.
- Render the locked Meta copy, tables, scorecard, valuation, zones, risk and monitoring plan without changing any content or model values.
- Register `/analyser/meta` as a normal analysis route with a `published: false` flag.
- Ensure unpublished analyses are excluded from analysis lists, search, related-analysis modules, sitemap and RSS.
- Render `noindex, nofollow` metadata while `published` is false.

## Architecture

The analysis itself has one implementation path. `MetaDeepDive` is rendered through the normal analysis route and consumes existing layout primitives. Publication behaviour is controlled centrally by the analysis metadata flag rather than by a preview route, duplicate page or UI-only condition.

`published: false` means the route remains directly accessible but is not discoverable through site surfaces or search engines. Changing the field to `true` is the only required publication action.

## Validation

- Add targeted tests that prove Meta's route exists while unpublished.
- Assert it is excluded from public analysis metadata, sitemap/RSS inputs and related-analysis data.
- Assert unpublished page metadata includes `noindex, nofollow`.
- Run the existing relevant analysis and routing checks, then inspect the local route visually before handoff.

## Non-goals

- No new preview page, banner or duplicated analysis implementation.
- No model, editorial or design-system changes.
- No inclusion in public lists, search, sitemap, RSS or related analyses before `published` is changed to `true`.
