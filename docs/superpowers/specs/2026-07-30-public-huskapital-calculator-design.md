# Publik Huskapital-kalkylator

## Mål

Ersätt den nuvarande publika huskalkylatorn med Huskapital-upplevelsen. Verktyget ska ge en tydlig helhetsbild av vägen till nästa bostad utan inloggning, medlemslås eller lagring av personuppgifter.

## Produktbeslut

- Alla kan använda hela kalkylatorn direkt på `/verktyg/huskalkylator`.
- Ingen plan, kapitalhistorik eller inmatning sparas, varken i Firestore eller i webbläsaren.
- Inloggning visas inte som ett krav eller som ett lås i huvudflödet.
- Den tidigare skyddade `/huskapital`-sidan ska leda till samma publika kalkylator, så det finns ett tydligt produktnamn utan två konkurrerande upplevelser.

## Flöde

1. Användaren ser rubriken "Din väg till nästa hem" och en kort förklaring.
2. Användaren väljer om kapitalet enbart består av eget sparande eller även ska innehålla ett uppskattat netto från en bostadsförsäljning.
3. Grunduppgifterna för nästa bostad är bostadspris, bostadstyp, kontantinsats och månadssparande.
4. Om försäljning väljs visas nuvarande bostadsvärde, kvarvarande bolån och mäklararvode.
5. Resultatet räknar automatiskt ihop sparande och försäljningsnetto till ett totalt kapital för nästa bostad.

## Beräkningar

Den befintliga, gemensamma kalkylmotorn används för alla resultat.

- Försäljningsnetto = uppskattat bostadsvärde minus kvarvarande bolån och mäklararvode.
- Totalt kapital = nuvarande sparande plus valt försäljningsnetto.
- Kapitalmål drivs av bostadstyp: villa och ägarlägenhet inkluderar kontantinsats, lagfart och nya pantbrev; bostadsrätt inkluderar kontantinsats och eventuell buffert.
- Resultatet visar kapitalmål, totalt kapital, kvarvarande belopp, uppskattad tid till mål och uppskattad månadskostnad.
- Vinstskatt, flyttkostnader, bankavgifter, pantbrev som redan finns och övriga lån ska förklaras som möjliga avvikelser från försäljningsuppskattningen.

## Upplevelse

- Behåll den varma, redaktionella Huskapital-känslan: mörkgrönt, krämvit bakgrund, serif-rubriker och svensk husillustration.
- Försäljningsvalet ska vara en tydlig, frivillig kontroll nära övriga grundval, inte en separat svårbegriplig kalkylator.
- Visa helhetsresultatet först. Detaljer om försäljningen kan ligga i en öppen resultatrad eller diskret kort.
- Samma funktion och begriplighet på mobil och desktop, utan horisontell scroll.

## Avgränsningar

- Ingen Firestore-läsning eller -skrivning i det publika flödet.
- Ingen sparknapp, profilkoppling, kapitalhistorik eller prognos som kräver konto i denna version.
- Rapportkalenderns API:er, datakällor och schemalagda jobb ändras inte.

## Felhantering och testning

- Beräkningen ska fungera helt utan nätverk efter att sidan laddats.
- Ogiltiga värden ska förklaras vid fältet och inte producera missvisande totaler.
- Tester ska täcka flödet med och utan försäljningsnetto, bostadstyperna samt att kalkylatorn inte anropar spar- eller Firestore-tjänster.
- Visuell kontroll ska göras på mobil och desktop.
