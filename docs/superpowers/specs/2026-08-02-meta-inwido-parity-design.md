# Meta Platforms: Inwido-nivå för den dolda publiceringsanalysen

## Mål

Göra den befintliga, dolda Meta-analysen till en fullständig v11-grundanalys med samma läsdjup, informationshierarki och visuella täthet som Inwido-analysen. Meta ska använda Börsanalys.se:s etablerade analysupplevelse, men ha Meta-specifika visualiseringar och innehåll.

Ingen finansiell modell, rekommendation, scorecard, kurszon, sannolikhet eller annan låst uppgift får ändras.

## Avgränsning

- Behåll en enda implementation: `MetaDeepDive`, renderad på `/analyser/meta`.
- Behåll `published: false`, direktåtkomlig route och `noindex, nofollow`.
- Behåll exkludering från analysarkiv, sök, relaterade analyser, sitemap och RSS.
- Återanvänd etablerade analyskomponenter och Inwidos läsmönster, utan att göra en generell v11-mall eller en separat preview-sida.
- Bygg endast med redan låst analysinnehåll och tidigare verifierade Meta-fakta. Inga nya estimat, modelliterationer, värderingsantaganden eller ny research.

## Läsarupplevelse

Sidan använder Inwidos övergripande rytm:

1. **Hero** med bolagsnamn, börs/ticker/datum, kärnfråga och fyra nyckeltal: rekommendation, totalrating, tolvmånadersvärde och sannolikhetsvägt femårsvärde.
2. **Sticky sektionsnavigering** som länkar till analysens huvuddelar.
3. **Artikelkolumn** med tydliga sektionsskal, korta pedagogiska textblock, tabeller och visuella faktarutor.
4. **Desktop-sidebar** med ticker, börs, sektor, kursobservation, risknivå och metodnot om illustrativ EV.
5. **Analysdisclaimer och nästa analys** enligt befintligt komponentmönster.

Meta ska få en egen blå/lila accent som skiljer den från Inwidos varma gröna/bruna uttryck, samtidigt som typografi, spacing och komponentlogik följer samma etablerade kvalitetsnivå.

## Sektioner och innehåll

Den publika artikeln följer den kanoniska v10-ordningen.

| Sektion | Presentation |
| --- | --- |
| Disclaimer | Befintlig analysdisclaimer och tydlig estimatmarkering. |
| Snabböversikt | Nyckeltal, risknivå, tolvmånaders- och femårszon. |
| Investeringstes på 30 sekunder | Tre kort med attraktivitet, central risk och bekräftelse. |
| Företagsöversikt och ledning | Faktaruta för verksamhet, ledning, kapitalstruktur och aktieantalets riktning. |
| Affärsmodell och intäktsflöde | Meta-specifikt flöde från annonsör till Family of Apps, med Reality Labs som separat förlustspår; Q2-segmenttabell och KPI-faktarutor. |
| Konkurrensfördelar, bransch, peers och SWOT | Moat-kort, kvalitativ peerjämförelse med Alphabet, Pinterest och Snap samt fyrfältig SWOT. |
| Finansiell utveckling och vinstkvalitet | Femårshistorik, FCF-definition, capex/FCF-förklaring, NTM-modell och normaliseringsnot. |
| Scorecard | De sju låsta v10-dimensionerna, delpoäng och totalerna 16/20, 9/15 och 25/35. |
| Fundamental värdering | NTM-värdering, illustrativ EV/EBIT-metod, bear/base/bull och sannolikhetsvägd värdering. |
| Tolvmånaders- och femårszoner | De låsta zongränserna, handlingsnivåerna och horisontskillnaden. |
| Potentiella kursdrivare | Mätbara bekräftande triggers med tydlig tidshorisont. |
| Riskprofil, stresstest och tesbrytare | Riskmatris, minst tre låsta stresstester och tydliga mätbara tesbrytare. |
| Bevakningsplan | Rapportkalender och vilka KPI:er, marginaler, capex och FCF-signal som ska följas. |
| Slutsats och investeringsbeslut | Den låsta BEVAKA-bedömningen med saklig sammanfattning. |

## Komponentgränser

`MetaDeepDive` blir en sammansatt artikel, inte en enda komprimerad JSX-rad. Lokala, välavgränsade konstanter och små presentatonskomponenter används för hero-statistik, tabeller, faktarutor, Meta-flöde, peer/SWOT, riskmatris och beslutszoner.

Gemensamma komponenter återanvänds där de redan passar: `AnalysisDisclaimer`, `FinancialFlow`, `FinancialTable`, `MetricCard`, `SectionHeader`, `RatingBox`, `SwotGrid`, `AlertBox`, `EditorialCallout`, `VerdictBox` och `NextAnalysisButton`. En ny generell v11-datamall ingår inte i detta arbete.

## Data- och modellintegritet

All text och alla siffror hämtas från den befintliga låsta Meta-analysen och modellunderlaget. Särskilt ska följande vara konsekventa över hela sidan:

- BEVAKA, 25/35, 16/20 och 9/15.
- Kurs 556,71 USD den 31 juli 2026, NTM-VPA 30,52 USD och tolvmånadersvärde 612,50 USD.
- Bear/base/bull: 30 % / 50 % / 20 %, slutmultiplar 18× / 22× / 26×, scenario-VPA 33,39 / 49,78 / 62,62 USD och totalvärden 611,44 / 1 107,87 / 1 643,40 USD.
- Sannolikhetsvägt totalvärde 1 066,05 USD och CAGR 12,73 %.
- Juridiska kostnader återläggs inte i base; avgångskostnaden återläggs.
- Aktieantalet beskrivs som ökande i samtliga scenarier, eftersom SBC-utspädningen överstiger återköpta aktier.

## Felhantering och publicering

En okänd analys-slug ska fortsatt hanteras av den befintliga `Analysis`-sidan. Meta är åtkomlig direkt på `/analyser/meta`, men osynlig på alla publika upptäcktsytor så länge `published: false`. Den enda publiceringsåtgärden efter godkännande ska vara att ändra denna flagga till `true`.

## Verifiering

- Utöka det riktade Meta-testet med krav på den kompletta strukturens nyckelsektioner och den låsta modelldatan.
- Säkerställ fortsatt route-stöd för `/analyser/meta`, `noindex, nofollow` och filtrering från listor/sök/RSS.
- Kör typkontroll och produktionsbygge.
- Granska den renderade artikeln på desktop och mobil för navigering, tabellscrollning, hierarki och konsistenta värden.

## Icke-mål

- Ingen ny research eller faktainsamling.
- Ingen ny estimat-, scenario- eller värderingsrunda.
- Ingen ändring av publiceringsflaggan.
- Ingen plattformsgeneralisering eller migrering av andra analyser.
