# Recommendation v10 Standardization Design

## Goal

Standardisera webbplatsens huvudrekommendationer till exakt `KÖP`, `BEVAKA` och `AVSTÅ` enligt Analysmall v10, utan att ändra analyslogik eller poängmodell.

## Current state

The canonical `AnalysisData.recommendation` field is currently typed as `KÖP | AVVAKTA | SÄLJ | BEVAKA`.

The 23 registered analyses currently use:

- `KÖP`: 7
- `BEVAKA`: 14
- `AVVAKTA`: 2
- `SÄLJ`: 0

The two legacy values are Apple and Axfood Q1 2026. Their conclusions describe waiting for a better entry level, which maps to `BEVAKA` under v10. They will be changed directly in the data files. No runtime compatibility layer will preserve legacy canonical values.

Legacy words such as “avvakta”, “behåll”, “neutral” and “sälj” may remain in explanatory prose when they describe a scenario, handlingsnivå, historical transition or analysis reasoning. They must not remain as primary recommendation values, filter options or recommendation badges.

## Architecture

Create one central recommendation module at `src/lib/recommendation.ts`. It owns the `Recommendation` type, the three v10 definitions, short labels, badge presentation configuration, filter values, and a validation helper for data/tests. Any migration-only mapping for legacy values is kept in a separate explicitly named migration/validation helper and is not called by rendering code.

Use the existing badge component pattern, but make `VerdictBadge` consume the central configuration so all cards, analysis pages, search results and related modules render the same three values and colors. `AnalysisData.recommendation` becomes the canonical v10 union.

Add `recommendationReason?: string` to `AnalysisData`. It is authored data only: when absent, no reason block is rendered; no fallback or AI-generated text is created. The reason is shown inside the full analysis view, not on every archive card.

## Information experience

Create a reusable `RecommendationInfo` component containing the exact v10 definitions:

- `KÖP`: Aktien bedöms erbjuda attraktiv långsiktig riskjusterad avkastning vid den analyserade kursen.
- `BEVAKA`: Bolaget är intressant men värderingen, säkerhetsmarginalen eller osäkerheten gör att vi ännu inte ser ett tydligt köpläge.
- `AVSTÅ`: Riskerna eller den förväntade avkastningen gör att aktien inte bedöms vara ett attraktivt alternativ just nu.

The component ends with:

> Bedömningen baseras främst på analysens femårsscenario. Tolvmånadersanalysen används för att bedöma köptempo och kortsiktig värdering.

On the archive page, render one shared explanation above the filters/cards so cards remain compact. On full analysis pages, render the same component near the recommendation/conclusion area. Do not render the full information box on each card.

## Recommendation reason

Add `recommendationReason?: string` to the shared analysis type. Populate it only where the source analysis has a clear editorial reason, beginning with the two migrated analyses where the existing conclusion provides sufficient evidence. Render it conditionally in the full analysis recommendation section. Do not pass it to analytics, SEO metadata, or filter state.

## Migration and validation

Update Apple and Axfood Q1 data to `BEVAKA` and add concise editorial reasons derived from their existing conclusions. Update any dependent ratings or visible primary labels only when they are clearly the same main recommendation; preserve score, scenarios and analysis logic.

Add a validation test that imports the registered analysis data and fails if any canonical recommendation is outside the three-value set. Add source/contract tests for the migration-only legacy handling so old labels are flagged rather than silently rendered.

## Filters, analytics and metadata

The recommendation filter exposes only `Alla`, `KÖP`, `BEVAKA`, `AVSTÅ`. URL parsing accepts only those canonical values; unsupported legacy URL values resolve to `Alla`.

Existing analytics, if recommendation values are sent, may send only the canonical recommendation string. `recommendationReason` must not be included. SEO metadata may include the canonical recommendation only if the existing page already derives metadata from the primary recommendation; no new recommendation-derived SEO copy is required.

## Testing and verification

Add or update tests for:

- canonical type/configuration accepts exactly three values;
- registered data contains no legacy primary recommendation;
- Apple and Axfood Q1 are `BEVAKA`;
- migration/validation flags legacy labels without runtime normalization;
- `RecommendationInfo` contains all definitions and the closing note;
- `recommendationReason` renders only when present;
- recommendation filters contain only the three canonical choices plus `Alla`;
- badges render all three canonical values;
- score fields do not derive or override recommendation;
- analytics payloads exclude `recommendationReason`.

Run the full test suite, TypeScript typecheck/lint, production build, and browser QA for archive desktop/mobile, an analysis page, recommendation filtering and recommendation presentation.
