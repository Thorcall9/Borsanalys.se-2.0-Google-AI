# Startsida: referensdriven redesign

## Mål

Ge Vite/React-versionens startsida samma visuella känsla och informationshierarki som de två bifogade referensbilderna: ljus editorial premium-layout, mörk serif-display, emeraldgrön accent och tydlig väg från förståelse till analys och medlemskap.

Arbetet gäller startsidan och den globala headern. Övriga sidor och befintliga auth-/sökflöden ska fortsätta fungera.

## Visuell riktning

- Vit bakgrund med mycket luft, tunna ljusgrå linjer och mjuka skuggor.
- Mörk serif för stora rubriker och analysrubriker; sans-serif för navigation, metadata och brödtext.
- Emeraldgrön som primär färg, med bleka gröna ytor och diskret grön börsgrafik bakom hero-innehållet.
- Rundade kort och kontroller, men med editorial snarare än dashboard-tät känsla.
- Inga nya rasterbilder krävs; börsgrafiken byggs som en dekorativ, tillgänglig SVG/CSS-komposition bakom den code-native UI:n.

## Desktoplayout

1. Header med ikonlogotyp, länkarna Analyser, Guider, Börsskola, Makro, Verktyg och Om oss, följt av sökfält, Logga in och Bli medlem gratis.
2. Hero i två kolumner:
   - vänster: trust-pill, rubriken “Förstå bolaget. Investera smartare.”, stödtext, sökfält och två CTA-knappar;
   - höger: kortet “Prova Börsanalys.se riskfritt” med tidslinjen Idag, Dag 5 och Dag 7 samt grön primärknapp.
3. Trust-rad med fyra punkter: Oberoende analyser, Datadrivna insikter, Beprövad metodik, Kvalitet & transparens.
4. Innehållsrad med utvald Novo Nordisk-analys och ett medlems-/kunskapskort.
5. Befintliga startsidessektioner fortsätter efter den nya första viewporten, men får samma spacing, färg- och kortsystem där det behövs.

## Mobillayout

- Toppheader med ikonlogotyp, sökknapp och hamburgerknapp.
- Hero staplas i en kolumn och behåller rubrik, stödtext, sökfält och CTA-hierarki från referensen.
- Trust-raden visas som fyra smala kolumner med ikon, rubrik och kort beskrivning.
- Utvald analys visas som ett kompakt kort med poängindikator, “BEVAKA” och “Läs analysen”.
- Provperiodskortet visas under analyskortet och kan kollapsas/expanderas visuellt utan att ändra medlemslogik.
- Fast bottennavigation med Hem, Analyser, Bevakningar, Notiser och Meny. Den ska endast visas på mobil och inte blockera innehåll; sidan får extra bottom padding.

## Funktionella kontrakt

- Hero-sök öppnar befintlig `GlobalSearch` via `SearchContext`.
- “Logga in” och “Bli medlem gratis” öppnar befintlig `LoginModal` via `AuthContext`.
- “Utforska analyser” går till `/analys`.
- Utvald analys länkar till befintlig RevolutionRace-preview eller motsvarande befintlig startsidesdestination.
- Headerns befintliga aktiva länkar, mobilmeny, användarstatus och logout behålls.
- Bottennavigationens länkar ska vara riktiga routerlänkar; där en funktion ännu saknar separat sida används närmaste befintliga route eller loginflöde.

## Komponentgränser

- `Hero.tsx`: hero, sök och CTA:er.
- `Header.tsx`: desktop/mobile-header och auth-synlig state.
- `Home.tsx`: sektionernas ordning och startsidesdata.
- Nya små, lokala komponenter får användas för `TrialCard`, `TrustStrip`, `FeaturedAnalysisCard` och `MobileBottomNav` om det gör layouten testbar och läsbar.
- Globala tokens och återanvändbara utility-klasser läggs i `src/index.css`; inga globala ändringar av analysvyer ska behövas.

## Verifiering

- TypeScript/lint och production build.
- Renderad desktopvy i referensens ungefärliga proportioner.
- Renderad mobilvy i ungefär 390 × 844.
- Kontroll av sökknapp, login-CTA, analyslänk, mobilmeny och bottennavigation.
- Kontroll att ingen text klipps, att bottennavigationen inte täcker innehåll och att dark mode inte får regressionsfel.

## Avgränsningar

- Ingen backend- eller betalningsintegration.
- Ingen statisk screenshot som UI.
- Ingen full redesign av undersidor i detta steg.
