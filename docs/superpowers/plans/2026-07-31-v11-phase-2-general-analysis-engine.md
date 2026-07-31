# V11 Fas 2: generell analysmotor med Meta som pilot

> **Status:** Planerad. Ingen implementation, migration eller databasförändring ingår i detta dokument.

## Mål

Bygg en återanvändbar analysmotor där kod beskriver hur fakta, antaganden, estimat, KPI:er, teser, scenarier, värdering och rapportutfall behandlas. Meta Platforms är den första kompletta konfigurationen och testpiloten, inte en specialbyggd motor.

En ny emittent ska kunna läggas till med konfiguration och godkända revisionsobjekt, utan ny kärnlogik.

## Styrande gränser

- Data först, slutsats sedan. Rapporterade fakta, beräknade observationsmått, bolagsguidning, konsensus, AI-förslag och manuellt godkända egna estimat är separata värdeursprung.
- Godkända v11-snapshots är enda jämförelseunderlag för framtida rapporter.
- AI får extrahera, strukturera, jämföra och skriva ett källbundet utkast, men får aldrig godkänna fakta, estimat, tesstatus, värdering, rekommendation eller publicering.
- DCF, WACC och terminalvärde ingår inte i ordinarie värderingsmotor och får aldrig väljas automatiskt.
- Varje persistent objekt måste direkt förbättra analyskvalitet, automationssäkerhet, redaktionell effektivitet eller granskningsbarhet.
- Fas 1.1 Snapshot Hardening planeras separat och får inte blockera Fas 2. Fas 2 får dock endast använda godkända snapshotdata som referens.

## Ansvarsgräns: generell kod kontra bolagsspecifik konfiguration

| Generell kärnkod | Bolagsspecifik konfiguration eller godkända revisionsobjekt |
|---|---|
| Shared Financial Definitions och beräkningsmotorer | FinancialDefinitions, rapportvaluta, enheter, perioder och branschspecifika mått |
| KPI- och Trigger Engine | KPIProfile, metric-definitioner, trösklar och triggertexter |
| Investment Thesis Engine | Teser, beroenden, bekräftelse- och brytvillkor |
| NTM-, femårs- och scenarioengine | Antaganden, egna estimat, bear/base/bull-inputs och sannolikheter |
| Valuation Engine | Tillåtna värderingsmetoder, multiplar, primary/control bridges och observationsmått |
| Report Comparison och Editorial Action | Materialitetströsklar och redaktionella policyer |
| Source-bound AI Drafting-kontrakt | Godkända redaktionella mallar, språk och bolagsspecifik kontext |

Fas 2 börjar med befintliga generiska `V11ObjectRevision`-payloads för konfigurationsdata. En ny relationsmodell eller migration får föreslås först när databehovet är bevisat och godkänt separat.

## Gemensamma ekonomiska definitioner

Ett enda definitionslager ska användas av både NTM- och femårsmodellen:

- `revenue`: rapporterad omsättning i vald rapportvaluta och period.
- `ebitReported`: rapporterat rörelseresultat.
- `ebitAdjusted`: beräknat observationsmått med explicita, godkända justeringar; aldrig blandat med rapporterad EBIT.
- `netFinancialItems`: finansnetto med tydlig teckenkonvention.
- `profitBeforeTax`, `tax`, `netIncome` och `dilutedWeightedAverageShares`.
- `eps = netIncome / dilutedWeightedAverageShares`.
- `operatingCashFlow`, `capex`, leasingbehandling och `freeCashFlow` enligt en godkänd definition.
- `fcfPerShare` och `fcfConversion = freeCashFlow / netIncome` när nämnaren är meningsfull.

Varje definition har enhet, valuta, periodtyp, `valueOrigin`, status, motivering och avvikelsetrösklar. Procent lagras som decimaler. Valuta och enhet lagras separat.

## Leveransordning och TDD

### 1. Kontrakt och finansiella definitioner

Skriv först tester för periodobjekt (kvartal, helår, LTM och point-in-time), värdeursprung, valuta/enhet, teckenregler och härledda nyckeltal. Implementera rena deterministiska funktioner efter att testerna faller.

**Acceptanstester:**

- Samma indata ger samma resultat oberoende av objektordning.
- Rapporterade och justerade värden kan inte ersätta varandra.
- EPS, FCF per aktie och FCF-konvertering är matematiskt korrekta och avvisar ogiltiga nämnare.
- NTM och femårsmodellen använder exakt samma definitionsobjekt.

### 2. Minimal KPI- och Trigger Engine

Inför endast fyra generella kontrakt: `MetricDefinition`, `MetricObservation`, `KPIProfile` och `TriggerRule`. En observation innehåller källa, sida/sektion, datum/period, value origin och verification status.

Triggerutvärderingen är deterministisk och returnerar träff, riktning, avvikelse, berörd KPI och källor. Den ändrar aldrig en tes eller ett estimat själv.

**Acceptanstester:**

- En KPI jämförs endast med kompatibel period, valuta och enhet.
- Positiv och negativ tröskel kan träffas, medan gränsfall är reproducerbara.
- En trigger med saknade eller konfliktande fakta returnerar begränsat resultat, inte påhittad slutsats.

### 3. Investment Thesis Engine

En tes är en mätbar hypotes med `status` (exempelvis proposed, confirmed, weakened eller broken), redaktionell `confidence` (high/medium/low), beroende av KPI:er och fakta samt positiva/negativa triggers. Motorn returnerar observationer om vilken evidens som stärker eller försvagar tesen. Endast redaktören kan skapa revision som ändrar godkänd tesstatus.

**Acceptanstester:**

- Stärkt, försvagad och bruten tes visas med sina exakta evidens- och triggerreferenser.
- AI-förslag får inte sätta approved status.
- Avsaknad av KPI-täckning ger `insufficient-evidence`, inte falsk bekräftelse.

### 4. Kvartalsvis NTM Engine

Modellen består av Q3 2026–Q2 2027 för Meta-piloten, men tar alltid en godtycklig följd av fyra kvartalsperioder. Den bygger radvis från omsättning till EBIT, finansnetto, skatt, nettoresultat, utspätt aktieantal och VPA. CFO, capex och FCF beräknas parallellt.

**Acceptanstester:**

- Varje scenario har en synlig brygga och VPA kan återberäknas från komponenterna.
- Normaliserad skatt används när en specificerad engångsskatt annars skulle förvränga NTM.
- Uppdaterad rapporterad Q3-data påverkar endast beroende rader och lämnar godkända baslinjeobjekt oförändrade.

### 5. Årlig Five-Year Engine

Motorn beräknar fem års resultat- och kassaflödesbrygga: omsättning, EBIT, finansnetto, skatt, nettoresultat, aktieantal, VPA, CFO, capex, FCF, FCF per aktie, återköp/utspädning och nominella utdelningar per år. VPA får aldrig vara en frikopplad inmatning.

**Acceptanstester:**

- VPA återberäknas från nettoresultat och utspätt aktieantal varje år.
- FCF kan inte bli en dold restpost; leasingbehandling följer samma definition som NTM.
- Återköp minskar endast aktieantal när dess finansiering och period är explicit definierade.

### 6. Bear/Base/Bull Scenario Engine

Scenarier samlar godkända antaganden och ger fullständig resultat- och kassaflödesutdata. Scenario-motorn validerar att bear/base/bull är separata scenarion och att sannolikheter är explicita men inte låtsas vara objektiva.

**Acceptanstester:**

- Varje scenario härleds till sina assumptionIds och källor.
- Sannolikheter summerar till 1 när sannolikhetsvägning väljs.
- Sannolikhetsvägt slutvärde och sannolikhetsvägd scenario-CAGR redovisas som olika mått.

### 7. Valuation Engine

Tillåt P/E, EV/EBIT, P/B-ROE, EPRA NAV, P/FFO, NAV-rabatt och EV/Sales. `primaryBridge` ger preliminärt bear/base/bull-värde, `controlBridges` visar indikativa kontrollvärden och diskrepans, och `valuationObservations` kan vara historiska eller peer-relaterade utan riktkurs.

P/E och per-aktie-bryggor får inte använda aktieantal två gånger. EV/EBIT och EV/Sales använder utspätt aktieantal vid konvertering till värde per aktie och kan vara kontroll även vid nettokassa.

**Acceptanstester:**

- Otillåten metod, DCF, WACC eller terminalvärde avvisas.
- P/E-värde kan räknas om från VPA och multipel.
- EV-kontroll visar marknadsvärde, relevant skuld, kassa/marknadsnoterade värdepapper och explicit leasingbehandling.
- Motorn ger aldrig rekommendation mekaniskt från en multipel.

### 8. Report Comparison och Editorial Action

En ny rapports validerade fakta jämförs enbart med senast manuellt godkänd immutable snapshot. Motorn beräknar KPI-, estimat-, FCF- och tesavvikelser mot sparade trösklar. `MaterialityAssessment` är en förklarande, härledd bedömning med sparade delkomponenter; den är inte en självständig sanningskälla eller automatiskt publiceringsbeslut.

Motorn föreslår endast `no-publication`, `report-commentary`, `market-update`, `manual-assessment` eller `full-reanalysis-recommended`. Den senare skapar aldrig automatiskt en ny grundanalys.

**Acceptanstester:**

- Liten isolerad KPI-avvikelse föreslår report-commentary eller no-publication enligt konfiguration.
- Flera materiella avvikelser eller en bruten huvudtes föreslår manuell bedömning eller full reanalysis rekommenderad med motivering.
- Förvärv och annan bolagshändelse kan föreslå market-update utan att skriva om grundanalysen.

### 9. Source-bound AI Drafting

Rå PDF-text får bara användas av extraktionssteget. Drafting-kontraktet tar endast validerade fakta, jämförelser, härledd klassificering, godkänd snapshotdata och source references. Utdata är ett redigerbart utkast med varje central siffra länkad till källa/sektion och tydlig markering av osäkerhet.

**Acceptanstester:**

- Payload med råtext eller opålitliga AI-estimat avvisas.
- Utkast saknar rätt att godkänna, publicera eller mutera analysobjekt.
- Blockerande valideringsfel förhindrar utkast; warnings syns men kan tillåta begränsad sammanfattning.

## Meta som referensimplementation

Meta-konfigurationen används för att testa motorernas generalitet, inte för att lägga in Meta-regler i kärnkoden.

| Konfiguration | Meta-pilot |
|---|---|
| KPIProfile | Family DAP, annonsvisningar, genomsnittligt annonspris, omsättning, EBIT-marginal, capex/omsättning, FCF, FCF-konvertering, likvida medel/skuld |
| FinancialDefinitions | Rapporterad och delvis justerad EBIT, capex inklusive leasing enligt vald definition, normaliserad skatt och utspätt aktieantal |
| InvestmentTheses | AI förbättrar annonsrelevans och avkastningen på AI/datacenterinvesteringar blir mätbar utan permanent försvagad FCF-konvertering |
| ScenarioInputs | Bear/base/bull med omsättning, marginal, skatt, aktieantal, CFO/capex och återköp/utdelning |
| ValuationConfiguration | P/E som primary bridge, EV/EBIT som control bridge, tillåtna multiplar och explicit leasingbehandling |
| MaterialityThresholds | Avvikelser för omsättning, EBIT/marginal, EPS, capex, FCF, balansräkning och AI-monetisering |

Det syntetiska Q3-testet ska visa omsättnings-, EBIT/marginal-, EPS-, capex-, FCF- och FCF-konverteringsavvikelse, träffade KPI-triggers, påverkade teser, preliminärt omräknad NTM och femårsmodell, värderingspåverkan, föreslagen redaktionell åtgärd och ett källbundet utkast. Inget av detta får ändra den godkända snapshoten, estimaten eller rekommendationen.

## Återanvändningsbevis

| Bolag | Konfiguration som byts | Samma kärnmotor |
|---|---|---|
| Inwido | Orderingång, organisk tillväxt, operationell EBITA, nettoskuld/EBITDA, ROIC och förvärvsintegration; P/E/EV-EBIT | Period-, KPI-, scenario-, värderings- och rapportjämförelsemotorer |
| Saab | Orderbok, book-to-bill, leveransmix, EBIT-marginal, kassakonvertering och rörelsekapital; P/E/EV-EBIT | Samma definitioner, triggers, teser och editorial action-kontrakt |
| Investor | Substansvärde, NAV-rabatt, portföljvärdeförändring, utdelning och belåning; NAV-rabatt/P/B-ROE | Samma revisions-, scenario-, valuation bridge- och rapportjämförelsemotorer |

Ingen av dessa emittenter ska kräva en ny motor eller bolagsspecifik gren i kärnkoden.

## Definition of Done

Fas 2-piloten är klar när ett syntetiskt nytt Meta-kvartal, efter validerad faktaextraktion, automatiskt och reproducerbart visar:

1. utfall mot godkänd snapshot för omsättning, EBIT/marginal, VPA, capex, FCF och FCF-konvertering;
2. träffade KPI-triggers och evidens för berörda investeringsteser;
3. preliminär NTM- och femårsomräkning från samma finansiella definitioner;
4. scenario- och värderingspåverkan med P/E som primary bridge och EV/EBIT som kontroll;
5. en spårbar föreslagen editorial action;
6. ett redigerbart, källbundet AI-utkast;
7. inga automatiska ändringar av godkända fakta, estimat, teser, värdering, rekommendation, snapshot eller publicering; och
8. ett konfigurationstest som visar att Inwido, Saab och Investor kan modelleras genom konfiguration utan ny kärnkod.

## Utanför scope

- UI och publiceringsflöde.
- Automatisk godkännande, rekommendation, riktkurs eller publicering.
- Automatisk skapande/ersättning av grundanalys.
- DCF, WACC, terminalvärde eller annan otillåten värderingsmetod.
- Produktionsexekvering av AI-anrop och leverantörsval.
- Ändring av befintliga snapshots eller Fas 1-tabeller.
- Implementering av Snapshot Hardening (Fas 1.1).
