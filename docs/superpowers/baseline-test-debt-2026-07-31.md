# Baseline testskuld efter Fas 1-integrationen

## Status

Samma Node-, npm-, lockfile- och miljökonfiguration kördes mot ren `origin/main` (`2d09168`) och Fas 1-integrationen. Båda gav exakt 24 fel med identiska normaliserade felutskrifter. Fas 1 introducerade inga nya testfel.

| Test eller testfall | Klassificering | Reproducerbarhet på `origin/main` | Framtida separat åtgärd |
|---|---|---|---|
| `analysis-archive-score.test.mjs` | environment-or-installation | Samma `analysis.js`-upplösningsfel | Standardisera testköraren till `node --import tsx --test` eller kompilerad testutdata. |
| Home: RevolutionRace-score | baseline-failure | Samma kontraktsmiss | Granska home-presentation och kontraktstest separat. |
| Home: hero typography | baseline-failure | Samma kontraktsmiss | Granska home-presentation och kontraktstest separat. |
| Home: hero copy/CTA | baseline-failure | Samma kontraktsmiss | Granska home-presentation och kontraktstest separat. |
| Home: metodsektion | baseline-failure | Samma kontraktsmiss | Granska home-presentation och kontraktstest separat. |
| House calculator: grundfält | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt mot aktuell produkt separat. |
| House calculator: medlemsförhandsvisning | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: försäljningskapital | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: redaktionellt flöde | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: ogiltiga värden | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: nästa bostad | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: valideringsgränser | environment-or-installation | Samma extensionlösa TypeScript-importfel | Åtgärda testkörarens TypeScript-upplösning separat. |
| House calculator: route/SEO | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| House calculator: sparning | baseline-failure | Samma kontraktsmiss | Granska Huskapital-kontrakt separat. |
| `housing-plan-math.test.mjs` | environment-or-installation | Samma extensionlösa TypeScript-importfel | Åtgärda testkörarens TypeScript-upplösning separat. |
| Huskapital: skyddad route | baseline-failure | Samma kontraktsmiss | Granska routens kontrakt separat. |
| Huskapital: publik fortsättning | baseline-failure | Samma kontraktsmiss | Granska routens kontrakt separat. |
| `nordea-v10-content.test.mjs` | environment-or-installation | Samma `analysis.js`-upplösningsfel | Standardisera testköraren separat. |
| Plejd deep-dive-kontrakt | baseline-failure | Samma kontraktsmiss | Granska analysregistry och komponentkontrakt separat. |
| `public-huskapital-scenario.test.mjs` | environment-or-installation | Samma extensionlösa TypeScript-importfel | Åtgärda testkörarens TypeScript-upplösning separat. |
| `recommendation-data.test.mjs` | environment-or-installation | Samma `analysis.js`-upplösningsfel | Standardisera testköraren separat. |
| `savings-goal-math.test.mjs` | environment-or-installation | Samma extensionlösa TypeScript-importfel | Åtgärda testkörarens TypeScript-upplösning separat. |
| SEO route rewrites | baseline-failure | Samma kontraktsmiss | Stäm av routelista och Vercel-rewrites separat. |
| Stock checklist-kontrakt | baseline-failure | Samma kontraktsmiss | Stäm av navigationskravet separat. |

Ingen produktkod, testkod, migration eller databas har ändrats för denna skuld. Den orsakades inte av Fas 1.
