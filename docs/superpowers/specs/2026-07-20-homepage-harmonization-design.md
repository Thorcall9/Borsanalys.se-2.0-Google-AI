# Startsida – harmonisering av Börsanalys.se

## Mål

Skapa en sammanhängande premiumupplevelse på startsidan utan att göra en ny webbplats eller ta bort funktionalitet. Startsidan ska kännas redaktionell, tydlig och trovärdig: Bloomberg möter Apple, med Börsanalys-grönt som enda accentfärg.

## UX-granskning

Nuvarande startsida har stark typografi, animationer och en tydlig premiumambition, men uttrycket spretar mellan sektionerna.

- Hero använder grid, glow och mycket stora versaler som drar mot AI-/produktlandningssida.
- Analyskortet är ljust och redaktionellt, men använder tekniska engelska etiketter och mycket stora rundningar.
- `Mindmap` är den största avvikelsen: mörk bakgrund, blå/guld-accenter, glow, tekniska statusetiketter och extra sektioner för Verdict/Scenarios.
- `ScoreCard` innehåller `AI-verifierad analys`, `Total Score` och `Se Fullständig Analys`, vilket inte helt följer den svenska, redaktionella tonen.
- `Newsletter` är funktionell men har samma stora, kampanjliknande uttryck som Hero.
- Medlems-CTA:n fokuserar på registrering och avkastningsmaximering snarare än konkret medlemsnytta.

## Berättelse och sektioner

Startsidan följer denna berättelse:

1. Hero – vad Börsanalys.se gör
2. Utvalda analyser – vad användaren kan läsa nu
3. Varför Börsanalys.se – varför tjänsten är värdefull
4. Så analyserar vi ett bolag – hur metoden hjälper användaren
5. Exempel från en riktig analys – konkret bevis i RevolutionRace-caset
6. Rapportkommentarer – varför användaren ska komma tillbaka
7. Veckobrev – återkommande värde i inkorgen
8. Medlemsfördelar – vad ett konto ger användaren
9. Avslutande CTA – tydlig nästa handling

Sektioner som saknar faktisk publik data eller komponent får länka till befintlig funktion i stället för att fyllas med påhittat innehåll.

## Visuell riktning

### Tema

- 80–90 % ljus: vit bakgrund, ljusgrå alternativa ytor, svarta rubriker, mörkgrå brödtext.
- En enda accent: Börsanalys-grön (`--primary`).
- Mörk bakgrund används endast i den avslutande CTA:n som avsiktlig kontrast.
- Inga blå eller guldfärgade accenter, neon, glow, tekniska statusfält eller dashboard-metaforer.

### Typografi och ytor

- Behåll befintlig sans-serif som grund och de stora, tydliga Hero-rubrikerna.
- Använd samma kortgeometri på startsidan: `rounded-2xl`, tunn border, diskret skugga, generös men inte överdimensionerad padding.
- Använd en gemensam innehållsbredd och konsekventa vertikala sektioner.
- Animationer får finnas kvar men ska vara diskreta: lätt fade/slide, ingen pulserande glow eller aggressiv scale.

### Komponentfamiljer

- `SectionHeader`: svensk rubrik, kort ingress, valfri länk.
- `SurfaceCard`: gemensam bakgrund, border, radius, shadow, hover och padding.
- `MethodCard`: ikon, titel, 2–3 meningars beskrivning och texten “Ingår i varje analys”.
- `AnalysisExampleCard`: RevolutionRace, `25 / 35`, kvalitets- och värderingsrader, `BEVAKA`, länk till analys.
- `ScenarioCard`: Bull/Base/Bear med samma yta och endast diskreta färgskillnader.
- `BenefitItem`: enkel checkikon och konkret medlemsfördel.

## Metodsektion

Komponenten ska fortsätta använda `METHODOLOGY_STEPS` för de sju identitetsbärande analysstegen:

- Företagsöversikt
- Affärsmodell
- Konkurrensfördelar
- Finansiell utveckling
- Fundamental värdering
- Potentiella kursdrivare
- Risker

Rubriken ska vara nyttobaserad, exempelvis `Så analyserar vi ett bolag`. Ingressen ska förklara att samma sju områden används för konsekventa, jämförbara och begripliga analyser.

Steg VIII och IX ska inte presenteras som metodsteg. De flyttas visuellt till separata, svenska komponenter:

- `AnalysisExampleCard` visar sammanfattning och rekommendation.
- `ScenarioCard`-gruppen visar Bull, Base och Bear.

Följande ord/etiketter tas bort från startsidans metodpresentation: `Mindmap`, `LIVE SCAN`, `ALGORITHMIC COMPUTATION`, `ENGINE`, `FINAL OUTPUT`, `CONFIRMED`, `SECTION VIII`, `SECTION IX`, `Summary & Verdict` och `Financial Scenarios`.

## Funktionalitet och databevarande

- Sökning från Hero ska fortsätta öppna befintlig sökmodal.
- `Utforska analyser` ska fortsätta gå till `/analys`.
- `Bli medlem gratis` ska fortsätta öppna befintlig login-modal.
- RevolutionRace-länken ska fortsätta gå till `/analys/revolutionrace-2026`.
- Nyhetsbrevsformuläret ska behålla sin befintliga API-route och statusflöden.
- Lazy loading för metodik, scorecard och nyhetsbrev ska behållas eller förbättras.
- Befintlig SEO-komponent och metadata ska behållas; synlig copy ändras endast till mer svensk och nyttobaserad formulering.

## Responsivitet och tillgänglighet

- Metodkort: 1 kolumn på mobil, 2 på tablet, 3–4 på desktop beroende på innehållsbredd.
- Analys- och medlemskort ska staplas utan horisontell overflow.
- Alla knappar och länkar ska behålla tydliga focus states.
- Ikoner ska vara dekorativa där texten bär betydelsen och ha `aria-hidden` i de fallen.
- Rubriker ska följa semantisk ordning och inte vara enbart visuella labels.

## Verifiering

- TypeScript/lint och produktionsbuild.
- Lokal render på desktop och mobil bredd.
- Kontroll av att startsidan inte visar framework-overlay eller konsolfel.
- Interaktionstest för Hero-sökning, analyslänk, medlems-CTA och nyhetsbrevsformulär.
- Visuell kontroll av färgpalett, kortgeometri, sektionernas ordning, responsiva brytpunkter och frånvaro av tekniska AI-etiketter.

## Avgränsning

Ingen ändring av analysdetaljsidor, backend, authmodell, SEO-routes eller befintliga medlemsfunktioner ingår om det inte krävs för att startsidans länkar ska fungera.
