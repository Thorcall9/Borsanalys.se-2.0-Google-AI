# Startsida: referensdriven redesign

## Mål

Ge startsidan och den globala headern samma ljusa editoriala premiumkänsla som referensbilderna, men med produktcopy som är sann för nuläget: gratis medlemskap, ingen aktiv Premium-produkt och ingen provperiod.

## Produktbegränsning

Visa inte provperiod, betalning, pris, automatisk debitering, dag 5/dag 7 eller uppsägning. Hero-kortet ska i stället vara ett gratis medlemskort med rubriken “Få mer av Börsanalys.se”, beskrivningen “Skapa ett gratis konto och bygg din egen analysbevakning.” och fördelarna Spara analyser, Följ bolag, Få rapportkommentarer och Rösta fram nästa analys.

## Visuell riktning

- Vit bakgrund, mycket luft, tunna ljusgrå borders och återhållsamma skuggor.
- Mörk editorial serif för displayrubriker och utvalda innehållstitlar; befintlig sans-serif för navigation och UI.
- Emeraldgrön som enda nya accent, med mycket bleka gröna ytor.
- Enhetligt radius- och spacingsystem; editorial känsla, inte dashboard- eller AI-generisk känsla.
- Displayfonten ska införas centralt som design-token.

## Desktoplayout

1. Header: ikonlogotyp, Analyser, Guider, Börsskola, Makro, Verktyg, Om oss, sökfält, Logga in och Bli medlem gratis. Befintliga aktiva länkar, authstatus, logout, `GlobalSearch` via `SearchContext` och `LoginModal` via `AuthContext` behålls.
2. Hero i två kolumner. Vänster: trust-pill “OBEROENDE · DATADRIVEN · PÅLITLIG” eller “OBEROENDE · DATADRIVEN · TRANSPARENT”, rubriken “Förstå bolaget. Investera smartare.” med mörk första rad och grön andra rad, stödtext, befintligt sökfält, “Utforska analyser” till verifierad analysarkivroute och “Skapa gratis konto”/“Bli medlem gratis” till `LoginModal`. Under CTA: “Spara analyser, följ bolag och påverka nästa analys.” samt “Gratis. Ingen betalningsinformation krävs.”
3. Hero-bakgrund: dekorativ aria-hidden SVG/CSS med ljusa candlesticks, tunn stigande grön linje och mjuk fade; inget verkligt marknadsdata, ingen distraherande animation.
4. Hero-kort: “Få mer av Börsanalys.se”, gratis medlemsbeskrivning, fyra medlemsfördelar, “Skapa gratis konto” och “Gratis. Ingen betalningsinformation krävs.” Kortet får inte kännas som betalvägg.
5. Trust-rad: Oberoende analyser, Datadrivna insikter, Beprövad metodik, Kvalitet och transparens, med exakta beskrivningar från prompten, diskreta ikoner och separators.
6. Innehållsrad: featured-analys från befintligt analysregister/featured-data, utan hårdkodad bolagstitel, poäng, rekommendation, ticker, sammanfattning eller route. Visa label, titel, sammanfattning, exakt KÖP/BEVAKA/AVSTÅ när tillgängligt, totalpoäng när tillgängligt och “Läs analysen”. Sekundärt kort “Bygg din egen bevakning” med “Se medlemsfördelarna”; det ska vara visuellt svagare och inte duplicera hero-CTA:n.
7. Befintliga startsidessektioner fortsätter efter första upplevelsen. Endast spacing, border, shadow, typografi och emeraldknappar får harmoniseras.

## Mobillayout

- Header visar logotyp, sökknapp och hamburgerknapp; befintlig mobilmeny och authstatus behålls.
- Hero staplas i ordningen trust-pill, rubrik, stödtext, sökfält, primär CTA, sekundär CTA, trygghetstext och trust-signaler. Rubriken ska fungera vid 320 px utan märkliga radbrytningar. ⌘K döljs på touch-enheter.
- Trust-signaler använder 2×2-grid om inte visuell test visar att fyra kolumner är läsbara.
- Featured-analys fungerar med lång rubrik och utan logotyp, och visar label, titel, sammanfattning, rekommendation, poäng när tillgänglig och CTA.
- Gratis medlemskort visar maximalt tre fördelar: Spara analyser, Följ bolag, Rösta på nästa analys. Ingen tidslinje, dagtext eller pris.
- MobileBottomNav byggs endast om riktiga routes och tydligt användarvärde finns. Om implementerad används bara på mobil, med riktiga routerlänkar, extra bottom padding och utan att blockera modal/cookie-banner/Safari chrome.

## Framtida produktläge

Medlemskortet får vid behov en ren mode-gräns med `free-membership` som aktivt läge nu. Framtida `premium-waitlist` och `premium-trial` får inte aktiveras eller visa copy i detta arbete. Ingen betalnings- eller prenumerationslogik byggs.

## Funktionella kontrakt

- Hero-sök öppnar befintlig `GlobalSearch` via `SearchContext`.
- Login- och medlems-CTA öppnar befintlig `LoginModal` via `AuthContext`.
- Analys-CTA använder befintlig kanonisk analysarkivroute efter routerinspektion.
- Featured-analys läser all synlig analysdata från befintlig datamodell.
- Inga parallella routes, söksystem, authlösningar eller hårdkodade analysresultat.

## Tillgänglighet och prestanda

Exakt en h1, korrekt heading-hierarki, aria-label på sök, `aria-hidden` på grafik, keyboard/focus-visible, minst 44×44 px tryckytor, tillräcklig kontrast, textbaserad rekommendation, 200 % zoom, `prefers-reduced-motion`, inga nya tunga bibliotek och ingen försämring av LCP/CLS.

## Verifiering

Kör TypeScript/lint och production build. Testa 320 px, 390×844, 768 px, 1024 px och 1440 px. Verifiera GlobalSearch, login-CTA, gratis konto, mobilmeny, featured-länk, aktiv navigation och authstatus/logout. Kontrollera långa analysrubriker, avsaknad av logotyp, KÖP/BEVAKA/AVSTÅ, tangentbordsnavigation, reduced motion och befintligt dark mode om det redan stöds. Ta desktop- och mobilskärmbilder och kontrollera att ingen text klipps och att eventuell bottennavigation inte täcker innehåll.

## Avgränsningar

Ingen backend, Stripe, betalningsintegration, Premiumprodukt, provperiod, prenumerationslogik, påminnelsesystem, full undersideredesign, ny sökfunktion, ny authlösning eller statisk screenshot som UI.
