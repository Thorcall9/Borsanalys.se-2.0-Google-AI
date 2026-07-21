# SEO-förbättringar för Börsanalys.se 2.0

## Mål

Förbättra organisk synlighet och delningsförhandsvisningar för publika analyser, guider, bolagssidor och marknadssidor utan att göra en full migrering från Vite/React.

## Rekommenderad lösning

Arbetet delas i två lager:

1. En teknisk SEO-bas i den befintliga React/Vercel-arkitekturen.
2. Prerendering eller server-rendering av de viktigaste publika innehållsrutterna när basen är verifierad.

Privata och interaktiva funktioner behåller client-side rendering.

## Omfattning: fas 1

### Metadata

Samla SEO-beteendet i den befintliga `SEO`-komponenten och gör metadata konsekvent för hem, analyser, guider, bolag, marknad, verktyg och informationssidor. Canonical-URL:er ska använda en enda normaliserad origin, utan querystring eller hash och med konsekvent trailing-slash-policy.

Publika artiklar ska ha Open Graph-typen `article`, publicerings-/uppdateringsdatum när data finns och stabila lokala OG-bilder. Slumpmässiga externa bilder ska inte användas som standard.

### Indexering

Lägg till en publik `robots.txt` som tillåter publika sidor, pekar på `/sitemap.xml` och utesluter admin-, profil- och privata checklist-rutter. Utöka sitemap-endpointen med alla publika statiska sidor samt analys-, guide- och bolagsslugs från datakällorna. Sidan ska inte innehålla privata eller duplicerade aliasrutter.

### Strukturerad data

Skapa återanvändbara JSON-LD-hjälpare för:

- `Organization`/`WebSite` på startsidan eller globalt.
- `Article` för analyser.
- `Article` eller `LearningResource` för guider.
- `BreadcrumbList` på analys-, guide- och bolagssidor.

JSON-LD ska byggas från befintlig siddata, escap:a säkert och bara publiceras när obligatoriska fält finns.

### URL-hygien

Behåll den primära URL-strukturen `/analys/...` och skapa permanenta redirects från gamla/alternativa analysvägar där sådana finns. Canonical och sitemap ska alltid använda den primära vägen.

## Omfattning: fas 2

Prerendera eller server-rendera SEO-kritiska publika sidor:

- `/`
- `/analys` och `/analys/:slug`
- `/guider` och `/guider/:slug`
- `/aktier/:slug`
- `/marknad`

Implementationen ska väljas efter verifiering av hur nuvarande Express-server och Vercel-build hanterar React-rendering. Interaktiva delar får hydreras på klienten, men sidans titel, beskrivning, huvudrubrik och huvudinnehåll ska finnas i initial HTML.

## Datatopologi

SEO-metadata, sitemap och JSON-LD ska läsa från samma analys-, guide- och bolagsregister som UI:t. Nya innehållsposter ska därför automatiskt kunna få sitemap-post och metadata utan manuella duplicerade listor.

## Felhantering och säkerhet

- Okända slugs ska fortsätta ge korrekt 404.
- Saknad metadata ska falla tillbaka till webbplatsens standardvärden.
- Privata/admin-rutter ska inte exponera indexerbar metadata.
- JSON-LD får inte innehålla användardata, API-hemligheter eller livefel.
- Sitemap ska returnera giltig XML även om en enskild datapost saknar valfritt datum.

## Verifiering

Fas 1 verifieras med typkontroll/lint, enhetstester för canonical-URL och metadata, samt route-baserade tester för robots, sitemap och JSON-LD. Kontrollera även byggd XML och att varje sitemap-URL motsvarar en publik route.

Fas 2 verifieras genom att hämta publika URL:er som vanlig HTTP-klient och kontrollera att titel, beskrivning, canonical, H1 och JSON-LD finns i initial HTML före klientkörning.

## Avgränsningar

Ingen full CMS-migrering, ingen ändring av betal-/authflöden och ingen innehållsproduktion ingår i första leveransen. Innehålls- och internlänksförbättringar kan tas som separat fas efter den tekniska basen.
