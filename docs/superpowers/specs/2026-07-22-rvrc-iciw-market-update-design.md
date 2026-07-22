# RVRC ICANIWILL Market Update Design

## Scope

Replace the existing RVRC ICANIWILL market-update article with the user-provided Swedish copy while preserving the existing `revolutionrace-iciw` slug, market-update content type, related full analysis, and `BEVAKA` recommendation with no change.

## Data and rendering

The article remains a Markdown source file consumed by `ReportComment`. The header metrics remain rendered by the existing quick-metrics component through analysis metadata. Metadata will carry `59,25 kr`, `19,2×`, `1,35 kr`, and `Cirka 2,3 %`; the article body will not duplicate the header metrics or use a Markdown table for them. Existing Markdown table, list, section-spacing, and divider rendering are retained.

## Constraints

- Keep `slug: revolutionrace-iciw` and `contentType: market-update`.
- Keep `relatedAnalysisSlug: revolutionrace-2026`.
- Do not change the base analysis, score model, or recommendation logic.
- Use the supplied copy and numbers only; omit textual `⸻` separators.
- Keep the internal “Läs grundanalysen” link generated from the existing relation.
- Ensure the header supports the supplied dividend metric using the existing metric-card pattern.

## Verification

Run TypeScript/lint, the project build, analysis relation tests, and rendered desktop/mobile checks for `/analys/revolutionrace-iciw`.
