# Tydligare medlemsfördelar i inloggningsvyn

## Mål

När en besökare klickar på ”Se medlemsfördelarna” ska den befintliga login-modalen direkt förklara vad ett gratis konto ger, innan användaren väljer registrering eller inloggning.

## Lösning

I medlemsläget visas rubriken ”Få mer värde av varje analys” och en lista under modalens välkomsttext med fem konkreta fördelar och förklaringar:

- Spara analyser – samla intressanta bolag och hitta enkelt tillbaka till dem senare.
- Följa bolag – se när en ny analys, rapportkommentar eller viktig uppdatering publiceras.
- Påverka vad som analyseras härnäst – rösta på de bolag du vill läsa mer om.
- Få en personlig överblick – håll ordning på sparade analyser, bevakningar och senaste uppdateringar.
- Följa hur caset utvecklas – se nya rapportkommentarer och förändringar i bedömningen över tid.

Listan använder samma visuella språk som övriga medlemsytor: checkikoner, diskret bakgrund och projektets befintliga färg-/typografitokens. Den visas i både inloggnings- och registreringsläge. Registreringsläget använder CTA:n ”SKAPA KONTO GRATIS” och kompletteras med ”Det tar mindre än en minut att skapa ett konto.” Inloggningsläget behåller rubriken ”Välkommen tillbaka”.

## Avgränsning

Ändringen begränsas till `src/components/LoginModal.tsx` och ett isolerat kontraktstest. Ingen ny medlems- eller betalningslogik byggs.

## Verifiering

Verifiera att modalen visar alla fyra fördelar, att både ”Logga in” och ”Skapa konto” fortfarande fungerar som lägesväxlingar och att projektets tester/build passerar.
