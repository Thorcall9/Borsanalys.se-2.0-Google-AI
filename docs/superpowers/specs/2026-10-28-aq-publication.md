# AQ Group Q3 2026 publication

User-approved scope: finish the existing v11.2 analysis and publish after checks. Preserve the April AQ analysis, Bear/Base/Bull, probabilities, P/E24 Base and BEVAKA/MEDEL_HÖG.

Approach: reuse the existing v11 presentation with additive member-detail and source-link slots, rather than modifying the older AQ component or creating a new design. Add a separate aq-group-q3-2026 archive entry and route. Compute every financial display value from the canonical dossier during preparation, not in the new frontend.

Use the verified 237.60 SEK delayed quote at 2026-10-28 13:39 CET. Preserve r1; create immutable r2 with an event delta and the site's existing disclaimer identifiers and /villkor link. Do not infer current holdings from account data; reuse the site's dated AQ disclosure.

Checks: independent model arithmetic, previous-analysis hashes unchanged, TypeScript/build, public and member browser views, mobile overflow, source links and indexed metadata. Publish only the reviewed commit to the existing Vercel project and verify the production route.

User clarification: complete the three pre-publication corrections and provide a web preview. Do not merge to main or deploy production in this turn.
