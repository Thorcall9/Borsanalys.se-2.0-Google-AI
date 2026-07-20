# Hero och startsida – premium-polering

## Mål

Förfina den befintliga harmoniserade startsidan så att första skärmen omedelbart förmedlar att Börsanalys.se hjälper besökaren att fatta bättre investeringsbeslut. Ändringen är en polering, inte en redesign.

## Designprincip

Om två lösningar är möjliga väljs alltid den enklare. Premium uppstår genom återhållsamhet, inte genom fler effekter.

## Hero

- Behåll vit bakgrund, navigering, färgpalett, typografi, sökfunktion och båda CTA-knapparna.
- Ta bort alla bakgrundsplattor eller visuella fält bakom rubriken.
- Öka Hero-höjden och det vertikala avståndet mellan navigation, rubrik, ingress, sökfält och CTA.
- Låt rubriken bli första skärmens tydliga fokus och använda optisk, inte mekanisk, centrering.
- Använd den aspirerande rubriken “Börsanalys som gör dig / till en bättre investerare”. Första raden ska vara svart och andra Börsanalys-grön, med naturlig radlängd och typografisk rytm snarare än artificiell horisontell offset.
- Skriv ingressen så att den fortfarande är enkel och får plats på högst två lugna rader.
- Gör sökfältet till Hero-sektionens naturliga primära interaktion, med en tydlig men återhållsam yta, bra fokusläge och tillräcklig storlek för att kännas som startsidans huvudfunktion.
- Låt “Utforska analyser” dominera som primär CTA. “Bli medlem gratis” ska vara sekundär och visuellt balanserad utan att konkurrera.
- Motion ska vara diskret, funktionell och respektfull mot `prefers-reduced-motion`.

## Metodkort

- Behåll de sju befintliga metodstegen och deras innehåll.
- Förfina ikoner, spacing, border och skuggor inom befintligt designsystem.
- Hover ska signalera interaktiv kvalitet med mycket liten rörelse eller färgförändring, aldrig lekfull animation eller dashboard-estetik.

## Exempelsektion

- Behåll innehåll, poäng, rekommendation och Bull/Base/Bear-scenarier.
- Justera alignment, spacing och typografisk hierarki så att huvudbedömningen läses först.
- Behåll befintlig funktionalitet och färgdisciplin.

## Senaste analyser

- Behåll listans funktion och befintliga länkar.
- Gör den senaste publicerade analysen eller rapportkommentaren till huvudnyheten med tydligare typografisk och rumslig prioritet.
- Visa övriga publiceringar som sekundära objekt utan att skapa en ny komplex komponentfamilj.

## Begränsningar

- Inga routes, funktioner, SEO-struktur eller sektioner tas bort.
- Ingen ny bakgrundsbild, illustration eller ytterligare visuellt tema introduceras.
- Responsivitet och befintlig prestanda ska bevaras.

## Verifiering

- Kontrollera första skärmen visuellt på desktop och mobil.
- Kontrollera att sökdialog, analyslänk och medlemsdialog fortfarande fungerar.
- Kör lint, build och relevanta kontraktstester.
- Kontrollera att inga konsolfel eller horisontella overflow-problem tillkommer.
