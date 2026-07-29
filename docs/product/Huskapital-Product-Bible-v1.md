# Huskapital — Product Bible v1

## Vision

Huskapital är en personlig sparresa mot ett framtida hem, inte en bostadskalkylator. Varje beslut ska hjälpa användaren att känna sig närmare sitt framtida hem.

## Den första vyn

Inom fem sekunder ska en användare förstå:

1. Hur mycket kapital vi har.
2. Hur mycket vi behöver.
3. Hur långt vi har kommit.
4. Hur mycket som återstår.
5. När vi ungefär når målet.

Huvudkortet visar bara huskapital, kapitalmål, progress, kvarvarande belopp och enkel prognos.

## Produktprinciper

- Apple-inspirerat: lugnt, luftigt, snabbt, professionellt och mänskligt.
- Minimal kognitiv belastning: systemet räknar ut lagfart, pantbrev och bolån.
- Progressiv exponering: taxeringsvärde, befintliga pantbrev och extra buffert ligger under `Fler val`.
- Smarta standarder: villa, 15% kontantinsats, inga befintliga pantbrev och senaste månadssparande.
- Personligt språk: `Ert framtida hem`, `Er plan`, `Er bostadsresa`.
- Kontot ger kontinuitet: sparad plan, kapitalhistorik och uppdaterad prognos.

## Två handlingar

### Planera nästa bostad

På desktop öppnas en panel från höger; på mobil ett fullskärmsflöde eller bottom sheet. Grundläget innehåller endast bostadspris, bostadstyp, kontantinsats och månadssparande. Bostadsrätt visar bara kontantinsats, medan villa och ägarlägenhet också räknar med lagfart och pantbrev.

### Uppdatera huskapital

En separat snabb handling med nuvarande kapital, nytt kapital och spara. Den ska ta under tio sekunder och skapa en enkel historikpost.

## Beräkningsregler

- Villa och ägarlägenhet: kontantinsats, lagfart, pantbrev och valfri buffert.
- Bostadsrätt: kontantinsats och valfri buffert; fastighetsavgifter visas inte.
- Regler och avgifter ligger i en central konfiguration och all matematik är fristående från UI.
- En beräkningsmotor är enda källan till sanning för mål, progress, kvar, prognos och kostnadsuppdelning.

## Kvalitetsribba

- Få beslut och inga tekniska block i huvudvyn.
- Subtila övergångar på 150–250 ms och respekt för reduced motion.
- Mobil först: 320–390 px utan horisontell scroll, stora touchytor och numeriskt tangentbord.
- Befintliga användares bostadspris, kapital och månadssparande ska fortsätta fungera med säkra standardvärden.
