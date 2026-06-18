# ABB: lättläst bakgrund

## Mål

Göra ABB-analysen behagligare och tydligare att läsa, särskilt över längre textavsnitt, utan att ändra webbplatsens övriga analyser eller ABB-sidans visuella identitet.

## Vald riktning

Använd alternativ B, **Varmt papper**:

- Sidans innehållsyta får en varm off-white bakgrund.
- Vanliga läskort får en nästan vit, svagt varm bakgrund.
- Kanter mellan sida och kort görs tydliga men diskreta.
- Brödtext och sekundär text använder fasta mörka färger med hög kontrast.
- ABB:s röda toppsektion, poängrad och accentfärg behålls.

## Avgränsning

Ändringen ska göras lokalt i `ABBDeepDive` och får inte ändra globala färgvariabler eller andra bolagsanalyser.

ABB-sidan ska använda samma lättlästa ljusa färgsättning även när webbplatsens globala mörka tema är aktivt. Detta undviker blandade ljusa informationsrutor på mörk bakgrund och ger ett konsekvent redaktionellt läsläge.

## Komponenter

Följande ytor omfattas:

- Sidbakgrunden under ABB:s röda huvud och poängrad.
- Artikelkort, nyckeltalskort, scenarioytor och investeringsbeslut.
- Tabellrader och tabellnoter.
- Informations-, risk- och SWOT-rutor.
- Länkkortet till nästa analys.

Färgade statusrutor får behålla sina gröna, röda, blå och gula toner, men texten ska fortsatt ha tydlig mörk kontrast.

## Beteende och data

Ändringen är rent visuell. Ingen analysdata, navigering, bevakningsfunktion, annonsyta eller interaktion ändras.

## Verifiering

Efter implementation ska ABB-sidan kontrolleras:

- I desktop- och mobilbredd.
- Med webbplatsens ljusa och mörka tema.
- För tydlig separation mellan sidbakgrund och kort.
- För läsbar brödtext, tabeller, noter och färgade informationsrutor.
- Med typkontroll och projektets befintliga build.

## Godkänd design

Användaren valde visuellt alternativ B den 18 juni 2026 och godkände ovanstående avgränsning.
