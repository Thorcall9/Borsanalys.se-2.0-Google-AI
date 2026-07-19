# Implementera aktiechecklista

## Plan

- [ ] Lägg till delad checklist-konfiguration, typer, validering och neutral sammanfattning.
- [ ] Bygg publik checklist-sida med lokalt utkast, progress, sammanfattning, disclaimer och medlemskonvertering.
- [ ] Bygg analys-popupen och koppla den till befintlig läsprogression med per-analys/session-deduplikering.
- [ ] Lägg till Prisma-modell, migration och skyddad API-rutt för egna checklistor.
- [ ] Lägg till autospar efter autentisering samt sida för att lista, återöppna, uppdatera och radera checklistor.
- [ ] Lägg till routes, SEO/sitemap, analytics och kontraktstester.
- [ ] Kör tester, bygg och gör visuell/tillgänglighetsmässig kontroll.

## Filer och ansvar

- `src/data/stockChecklist.ts`: enda frågekonfigurationen och sammanfattningslogiken.
- `src/pages/StockChecklist.tsx`: publik gäst-/medlemsupplevelse.
- `src/pages/MyChecklists.tsx`, `src/components/community/SavedChecklists.tsx`: privat översikt.
- `src/components/checklist/*`: popup, resultat, disclaimer och återanvändbara formulärdelar.
- `src/components/AnalysisProgress.tsx`, `src/components/MobileReadingProgress.tsx`, `src/pages/Analysis.tsx`: analyskopplad CTA.
- `prisma/schema.prisma`, `prisma/migrations/*`: persistence.
- `api/stock-checklists.ts`, `server.ts`: tokenverifierad CRUD.
- `src/App.tsx`, `api/sitemap.ts`: routes och indexering.
- `tests/stock-checklist-contract.test.mjs`: krav- och regressionskontroller.

## Verifiering

`npm test`, befintliga projektkontroller och `npm run build` körs efter implementering. Resultatet kontrolleras även i webbläsaren för mobil layout, fokus, Escape, progress och popup-deduplikering.
