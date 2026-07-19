# Standardmall v10 – ny analysstruktur

## Mål

Lägg till en versionsstyrd standardmall som följer Analysmall v10:s tio huvudsteg. Befintliga analyser ska behålla sitt nuvarande utseende. Endast nya standardanalyser som uttryckligen märks med v10 ska använda den nya mallen. Plejd, ABB, Handelsbanken, Swedbank och Axfood fortsätter använda sina befintliga specialmallar utan ändringar.

## Omfattning

Den befintliga mallen i `src/components/analysis/ComprehensiveAnalysis.tsx` blir legacy-mall och lämnas funktionellt oförändrad. En separat v10-komponent ska införas och väljas av `src/pages/Analysis.tsx` när analysdata har `templateVersion: "v10"`. Specialkomponenter och deras routing lämnas orörda.

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

Befintliga datafält ska återanvändas där de redan täcker den nya sektionen. Om ett gammalt fält saknar direkt motsvarighet ska presentationen använda befintlig fallbacktext eller dölja blocket enligt nuvarande beteende. Äldre analyser utan `templateVersion: "v10"` ska fortsätta gå till legacy-mallen. Nya analyser som ska använda v10 ska sätta `templateVersion: "v10"` i analysdata. Ändringen ska inte kräva att specialanalysernas dataformat eller komponenter ändras.

## Testning

Ett test ska kontrollera att v10-mallens sektionskonfiguration innehåller exakt tio poster, med rätt ID:n, rubriker och ordning. Ett separat routingtest ska kontrollera att v10-data väljer v10-mallen och att äldre data utan v10-markering väljer legacy-mallen. Testerna ska rikta sig mot exporterade eller separat testbara konfigurationer, så att de inte behöver rendera hela React-trädet.

Verifiering ska även omfatta TypeScript-/byggkontroll och befintlig testsuite. Specialmallarnas routing ska inte ändras.

## Avgränsade filer

Förväntade produktionsändringar:

- `src/components/analysis/ComprehensiveAnalysisV10.tsx`
- `src/pages/Analysis.tsx`
- `src/types/analysis.ts` eller analysdatats gemensamma typdefinition
- Eventuellt en liten gemensam konfigurationsmodul om det krävs för testbarhet

Förväntade teständringar:

- En ny mall-/sektionskontraktstestfil i projektets befintliga teststruktur

Ingen ändring görs i legacy-mallens layout eller i specialmallarna:

- `src/components/analysis/ComprehensiveAnalysis.tsx`

- `PlejdDeepDive.tsx`
- `ABBDeepDive.tsx`
- `HandelsbankenDeepDive.tsx`
- `SwedbankDeepDive.tsx`
- `AxfoodDeepDive.tsx`
- `src/pages/Analysis.tsx` och specialmallarnas routing
