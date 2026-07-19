# Profilöversikt – design

## Mål

Förvandla profilsidan från en samling medlemslistor till en tydlig medlemsdashboard. Konto och profil ska ligga kvar i vänsterkolumnen. Allt investeringsrelaterat ska ligga i huvudkolumnen och börja med den mest aktiva uppgiften.

## Layout och ordning

Vänsterkolumnen renodlas till profilbild, namn, e-post, medlemsstatus, redigera profil och logga ut. Länken “Mina checklistor” tas bort från profilkortet.

Huvudkolumnen får rubriken “Min översikt” och följande sektioner i ordning:

1. “Checklistor att fortsätta”
2. “Bevakade bolag”
3. “Senaste analyser och rapportkommentarer”
4. “Sparade analyser”

Varje sektion är visuellt likvärdig, begränsad i höjd/densitet och har en vidare-länk till sin fullständiga vy där det är relevant.

## Sektioner

### Checklistor att fortsätta

Översikten visar endast checklistor vars status inte är `completed`. Varje rad visar bolagsnamn/ticker, progression som antal besvarade av 12, senast ändrad och en tydlig “Fortsätt”-knapp till `/aktiechecklista?checklistId=…`. Slutförda checklistor lämnas till `/mina-checklistor` via länken “Visa alla checklistor”. Om inga checklistor är påbörjade visas ett tomläge med texten “Du har inga påbörjade checklistor.” och länken “Starta en checklista”.

Första versionen använder den befintliga checklist-API:n och befintlig 12-frågorsmodell. Progression räknas från sparade svar där API:t inte redan levererar ett räknat värde.

### Bevakade bolag

Den befintliga listan behålls med bolagsnamn, ticker, aktuell kursförändring när den finns, länk till relevant analyssida och möjlighet att ta bort bolaget från bevakningen. Rubriken och hjälptexten ska göra nästa handling tydlig. Tomläget behåller en länk till analyser.

### Senaste analyser och rapportkommentarer

Sektionen visar de tre senaste publiceringarna i ett generellt innehållsflöde, inte personligt “nytt för dig”. Varje rad visar innehållstyp, bolag, rubrik, publiceringsdatum och länk. Rubriken är “Senaste analyser och rapportkommentarer”. Om det inte finns en separat feed-endpoint används projektets befintliga analysdata och filtrerings-/sorteringsmönster; lässtatus eller nya backendmodeller introduceras inte i denna ändring.

### Sparade analyser

Den befintliga listan behålls men begränsas till högst fyra poster på profilsidan. En “Visa alla sparade analyser”-länk leder till en fullständig vy. Om en fullständig separat vy inte finns ännu ska länken leda till analysöversikten med bibehållen funktionalitet, utan att skapa en ny backendmodell.

## Responsivitet och tillgänglighet

På smala skärmar staplas vänsterkolumnen ovanför huvudkolumnen. Sektioner ska inte skapa horisontell overflow. Primära länkar och knappar ska vara tydliga även utan hover, ha fokusmarkering och använda semantiska länkar/knappar.

## Avgränsning

Denna ändring bygger inte kopplingen mellan checklistor och bevakade bolag, personlig senaste rapport per bolag, lässtatus eller mejlnotiser. Dessa är senare steg och ska inte simuleras med “nytt för dig”-etiketter.

## Verifiering

Verifiera TypeScript-bygge/lint, profilsidans desktop- och mobilrendering samt kärninteraktionerna: “Fortsätt”, “Visa alla”, analyslänkar och borttagning från bevakningslistan. Kontrollera även checklistans tomläge och att slutförda checklistor inte visas i översikten.
