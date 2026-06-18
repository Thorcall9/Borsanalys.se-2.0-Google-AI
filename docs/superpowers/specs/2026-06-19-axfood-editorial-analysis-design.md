# Axfood AB – redaktionell analysvy

**Datum:** 19 juni 2026  
**Projekt:** Börsanalys.se 2.0  
**Status:** Godkänd design, ej implementerad  
**Publicering:** Analysen ska inte publiceras

## Mål

Göra den levererade Axfood-analysen publiceringsmässig för Börsanalys.se 2.0 utan att göra den offentligt synlig. Resultatet ska kännas som en premiumanalys inom sajtens befintliga varumärke, men få en mer redaktionell och magasinlik form än ABB- och Nibe-analyserna.

## Innehållsprincip

- Originaltextens formuleringar och sakinnehåll ska bevaras ordagrant.
- Samtliga tio huvudsektioner, tabeller, scorecard, scenarier och ansvarsfriskrivningar ska finnas med.
- Endast rena skrivfel, typografiska fel och sådant som krävs för korrekt webbformatering får rättas utan separat godkännande.
- Texten får delas upp i webbkomponenter, men inte kortas, skrivas om eller få nya slutsatser.
- Upprepningar i originalet behålls eftersom användaren uttryckligen valt ordagrant bevarande.

## Visuell riktning

Designen bygger på det godkända alternativet **B – Redaktionell premiumversion**.

### Färger

- Hero och primär accent: mörk skogsgrön.
- Läsyta: varm benvit.
- Sekundär accent: diskret koppar.
- Brödtext: mörkt grågrön med hög kontrast.
- Positiva respektive negativa datapunkter får återhållsamma gröna och röda toner.

### Typografi

- Serif används för huvudrubrik, sektionsrubriker och centrala investeringsteser.
- Sajtens sans-serif används för navigering, metadata, etiketter, tabeller och nyckeltal.
- Brödtexten ska ha generös radavstånd och en begränsad radlängd för långa läspass.

### Första vy

Första vyn innehåller:

1. Metadata: Axfood AB, Nasdaq Stockholm och juni 2026.
2. Huvudrubriken **Stabilitet till ett högt pris**.
3. En kort ingress som sammanfattar analysens redan befintliga slutsats.
4. Bedömningen **BEHÅLL** och totalpoängen **27/40**.
5. Nyckeltalen kurs, P/E, direktavkastning, base-case 2027 och risknivå.

Ingen hero-bild används. Tyngden ska komma från typografi, data och resonemang.

## Sidstruktur

### Desktop

- Bred redaktionell huvudkolumn.
- Diskret innehållsförteckning i vänsterkant när utrymmet tillåter.
- Sektionerna presenteras i originalets ordning.
- Tabeller får tydliga rubrikrader, zebraränder där det förbättrar läsbarheten och horisontell scroll vid behov.
- Analytiska noter och viktiga slutsatser markeras med tunna kopparfärgade vänsterkanter.
- Nyckeltal och scorecard presenteras öppet och luftigt, inte som ett repetitivt rutnät av stora kort.

### Mobil

- Helt enkelspaltig layout.
- Ingen fast sidonavigering.
- Nyckeltalen bryts till två kolumner eller en kolumn beroende på skärmbredd.
- Tabeller kan scrollas horisontellt utan att hela sidan får sidledsöversvämning.
- Brödtext, noter och rubriker ska förbli läsbara utan onödigt små textstorlekar.

## Komponenter

En särskild `AxfoodDeepDive`-komponent byggs för analysen. Den får återanvända befintliga grundkomponenter där de passar, men ska ha en egen redaktionell komposition.

Komponenten omfattar:

- SEO-metadata för lokal förhandsvisning.
- Redaktionell hero.
- Sammanfattande nyckeltalsrad.
- Scorecard med åtta dimensioner.
- Innehållsförteckning.
- Artikelsektioner för originalets tio delar.
- Responsiva datatabeller.
- Scenarioyta för bear, base och bull.
- Slutsats och ansvarsfriskrivning.

## Lokal och opublicerad åtkomst

Analysen ska kunna öppnas via en direkt lokal förhandsvisningsadress för kvalitetskontroll, men ska inte:

- registreras i det publika analysobjektet,
- visas i analysarkivet,
- visas i sökresultat,
- visas på startsidan,
- läggas i sitemap,
- länkas från andra publika analyser,
- betraktas som publicerad av metadata eller gränssnitt.

Den opublicerade sidan ska vara tydligt isolerad så att ett framtida publiceringsbeslut kräver en avsiktlig kodändring.

## Datamodell

Axfood-data och sidinnehåll hålls i separata filer där det förbättrar läsbarheten. Analysens route eller förhandsvisningskoppling ska inte använda den publika `analyses`-samlingen.

Värden från originaltexten återges som statiska värden med angivet brytdatum. Ingen livekurs ska blandas in i historiska värderingsresonemang.

## Felhantering

- Saknade valfria datafält får inte krascha sidan.
- Tabellen ska förbli läsbar även om en cell innehåller längre text.
- Direktrouten ska ge en stabil lokal förhandsvisning.
- Inga externa datakällor eller API-anrop krävs för att rendera analysen.

## Kvalitetskontroll

Före leverans ska följande verifieras:

- Typkontroll och produktionsbygge.
- Desktopvy och mobilvy i lokal webbläsare.
- Ingen horisontell sidöversvämning.
- Samtliga originalrubriker, tabeller och textstycken finns med.
- Inga länkar från publika listor eller sitemap.
- Första vyn motsvarar den godkända designen.
- Färger, typografi och tabeller fungerar i både ljust och mörkt användartema om sajten tillåter temaväxling.
- Analysen har inte publicerats, pushats eller gjorts externt åtkomlig.

## Avgränsningar

- Ingen publicering, push eller pull request.
- Ingen omskrivning eller förkortning av originalanalysen.
- Ingen ny fundamental analys eller förändrad rekommendation.
- Ingen hero-bild eller genererad varumärkesgrafik.
- Ingen ändring av andra analyser utöver eventuella små, gemensamma komponentförbättringar som krävs för Axfood-vyn.

