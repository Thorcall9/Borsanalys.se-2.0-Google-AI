# Aktiechecklista – design

## Mål

Ge läsaren ett neutralt reflektionsverktyg före ett aktieköp, kopplat till analysläsningen men användbart fristående. Verktyget ska inte ge köp-, sälj- eller behållrekommendationer.

## Flöde

1. En läsare når 80 procent av en full aktieanalys och får en enda checklist-invit per analys och webbläsarsession.
2. Inviten visar tre korta kontrollfrågor och länkar till `/aktiechecklista` med bolag och ticker förifyllt.
3. På checklist-sidan kan gästen fylla i bolag, tolv frågor och valfria anteckningar. Utkast sparas lokalt.
4. Resultatet grupperar svaren i `Genomtänkt`, `Behöver undersökas` och `Varningssignaler`, utan numeriskt betyg eller investeringsrekommendation.
5. Efter resultatet kan gästen fortsätta utan konto eller skapa/logga in på ett konto. Vid lyckad autentisering sparas det lokala utkastet automatiskt.
6. Inloggade användare kan lista, öppna, uppdatera och radera sina egna checklistor via `/mina-checklistor`.

## Delad domänmodell

`src/data/stockChecklist.ts` är enda källan för kategorier, de tolv frågorna, hjälptexter, svarstyper och neutral resultatsammanställning. Popupens tre teaserfrågor ligger i samma konfigurationsmodul så att text och analytics-parametrar inte sprids mellan komponenter.

## Lagring och behörighet

Prisma-modellen `StockChecklist` lagrar användar-id, bolag, ticker, eventuell analys-slug, svar, anteckningar, status och tidsstämplar. API:t hämtar Firebase-token från Authorization-headern, slår upp den interna användaren och filtrerar varje läsning/ändring/radering på både checklist-id och userId.

Gästers aktuella utkast lagras i localStorage. Anteckningar skickas aldrig till analytics.

## Tillgänglighet och responsivitet

Popupen använder dialogsemantik, Escape-stängning, fokus på första interaktiva elementet och låser bakgrundens scroll. Checklistan fungerar med tangentbord, tydliga labels och mobil layout utan horisontell overflow. Rörelse dämpas via befintliga Tailwind/framer-motion-mönster och `prefers-reduced-motion`.

## SEO

`/aktiechecklista` är indexerbar med egen titel och beskrivning. `/mina-checklistor` är privat och noindex/nofollow.

## Analytics

Vercel Analytics-event loggas en gång per relevant användarhändelse: popup visad/stängd/CTA, start, svar, slutförd, signup startad/slutförd, sparad, återöppnad och raderad. Parametrar begränsas till strukturerad metadata; aldrig fria anteckningar.
