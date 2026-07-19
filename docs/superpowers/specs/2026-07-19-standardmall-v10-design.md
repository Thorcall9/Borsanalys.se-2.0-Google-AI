# Standardmall v10 – ny analysstruktur

## Mål

Uppdatera endast standardmallen för analyser så att den följer Analysmall v10:s tio huvudsteg. Plejd, ABB, Handelsbanken, Swedbank och Axfood fortsätter använda sina befintliga specialmallar utan ändringar.

## Omfattning

Standardmallen är `src/components/analysis/ComprehensiveAnalysis.tsx` tillsammans med den gemensamma navigeringen i `src/components/analysis/AnalysisLayout.tsx`. Specialkomponenter och deras routing lämnas orörda.

## Ny huvudstruktur

Standardmallen ska rendera följande sektioner och navigeringsposter, i exakt denna ordning:

1. `company-management` — Företag & ledning
2. `business-model` — Affärsmodell
3. `industry-moat` — Bransch & moat
4. `financial-quality` — Finansiell kvalitet
5. `scorecard` — Scorecard
6. `fundamental-valuation` — Fundamental värdering
7. `catalysts` — Kursdrivare
8. `risks` — Risker
9. `thesis-changers` — Tesförändrare
10. `investment-decision` — Investeringsbeslut

Sektion-ID:n ska vara stabila, URL-vänliga och gemensamma mellan innehållet och sidomenyn. Den gamla huvudstrukturen (`overview`, `strategy`, `financials`, `valuation`, `growth`, `risk`, `management`, `ai`, `summary`, `scenarios`) ska inte längre användas av standardmallen.

## Innehållsmappning

- Företagsöversikt, ledning, ägare och kapitalallokering samlas i `Företag & ledning`.
- Affärsmodell, intäktsmodell, skalbarhet och eventuell Sankey/fallback samlas i `Affärsmodell`.
- Strategisk analys, konkurrensfördelar, bransch, peers och SWOT samlas i `Bransch & moat`.
- Resultat, balansräkning, kassaflöde och vinstkvalitet samlas i `Finansiell kvalitet`.
- Scorecard visas som en egen huvudsektion med dimensioner, delbetyg, bolagskvalitet, investeringsattraktivitet och totalrating.
- Multiplar, femårsmodell, Bull/Base/Bear, sannolikhetsviktat värde, kurszoner och känslighetsanalys samlas i `Fundamental värdering`.
- Tillväxtmotorer, triggers, rapportdatum, guidning och relevanta estimatrevideringar samlas i `Kursdrivare`.
- Riskmatris och stresstester samlas i `Risker`.
- Tesbrytare, kill criteria och mätbara bevakningspunkter samlas i `Tesförändrare`.
- Slutsats, rekommendation, handlingsnivåer och nästa steg samlas i `Investeringsbeslut`.

## Kompatibilitet

Befintliga datafält ska återanvändas där de redan täcker den nya sektionen. Om ett gammalt fält saknar direkt motsvarighet ska presentationen använda befintlig fallbacktext eller dölja blocket enligt nuvarande beteende. Ändringen ska inte kräva att specialanalysernas dataformat eller komponenter ändras.

## Testning

Ett test ska kontrollera att standardmallens sektionkonfiguration innehåller exakt tio poster, med rätt ID:n, rubriker och ordning. Testet ska rikta sig mot en exporterad eller separat testbar sektionskonfiguration, så att det inte behöver rendera hela React-trädet.

Verifiering ska även omfatta TypeScript-/byggkontroll och befintlig testsuite. Specialmallarnas routing ska inte ändras.

## Avgränsade filer

Förväntade produktionsändringar:

- `src/components/analysis/ComprehensiveAnalysis.tsx`
- Eventuellt en liten gemensam konfigurationsmodul om det krävs för testbarhet

Förväntade teständringar:

- En ny mall-/sektionskontraktstestfil i projektets befintliga teststruktur

Ingen ändring görs i:

- `PlejdDeepDive.tsx`
- `ABBDeepDive.tsx`
- `HandelsbankenDeepDive.tsx`
- `SwedbankDeepDive.tsx`
- `AxfoodDeepDive.tsx`
- `src/pages/Analysis.tsx` och specialmallarnas routing
