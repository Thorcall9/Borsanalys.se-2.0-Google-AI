# Huskalkylator: uppskattat kapital vid försäljning

## Syfte

Göra huskalkylatorn mer användbar för personer som redan äger en bostad. Den ska enkelt visa ett ungefärligt kapital som frigörs om bostaden säljs idag och lånet samt mäklararvodet betalas.

## Publik upplevelse

En varm, redaktionell sektion med en liten husillustration och rubriken **Om du säljer idag** placeras nära den befintliga första översikten.

Användaren anger tre värden:

- Nuvarande uppskattat bostadsvärde
- Kvarvarande bolån
- Mäklararvode i procent

Kalkylen visar ett tydligt huvudresultat:

`Uppskattat kapital efter försäljning = bostadsvärde − bolån − mäklararvode`

Under resultatet visas respektive avdrag, så att sambandet är transparent och lätt att kontrollera. Resultatet är aldrig negativt; ett negativt underlag visas som `0 kr` med en neutral förklaring.

## Begränsningar och trygghet

Texten ska konsekvent säga “uppskattat” och “ungefär”. Den pedagogiska notisen ska förklara att vinstskatt, flyttkostnader, bankavgifter, pantbrev och andra eventuella lån inte ingår. Vinstskatt ska medvetet inte beräknas.

## Koppling till bostadsmålet

Det beräknade kapitalet visas som ett möjligt tillskott till kontantinsatsen, men det ändrar inte automatiskt användarens sparbelopp eller sparprognos. I den inloggade dashboarden visas värdet som “Kapital från nuvarande hem” i den personliga planen, men användaren behåller kontroll över om och hur det används.

## Teknik och testning

En ren beräkningsfunktion tar bostadsvärde, lån och arvode och returnerar mäklararvode samt uppskattat kapital. Inmatningar valideras med rimliga gränser och kan rensas/tolkas på samma sätt som övriga sifferfält. Tester täcker normalfallet, nollresultat och att vinstskatt inte inkluderas. Den befintliga huskalkylatorns tester, typkontroll och produktionsbygge ska fortsatt passera.
