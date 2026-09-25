# RVRC Holding – Grundanalys v11.2

*Denna analys är en redaktionell bedömning baserad på offentligt tillgänglig information och utgör inte personlig investeringsrådgivning. Analysen är framtagen i informationssyfte och ska inte ses som en uppmaning att köpa eller sälja värdepapper. Börsanalys.se har inget tillstånd från Finansinspektionen att lämna investeringsrådgivning. Alla investeringsbeslut fattas på läsarens eget ansvar och efter egen bedömning. Historisk avkastning är ingen garanti för framtida avkastning.*

```json
{
  "slug": "revolutionrace-v11-2-2026-09",
  "name": "RVRC Holding AB (RevolutionRace)",
  "ticker": "RVRC",
  "isin": "SE0015962485",
  "date": "2026-09-24",
  "author": "Carl Fredrik Thor",
  "status": "PUBLISH_READY",
  "method": "Normaliserad EPS × P/E",
  "secondaryCheck": "EV/EBIT med scenarioanpassad EV→equity-brygga",
  "tertiaryCheck": "Analytikerkonsensus",
  "evEbitConfidence": "MEDIUM",
  "recommendation": "KÖP",
  "risk": "MEDEL_HÖG",
  "marketReference": 49.22,
  "marketReferenceDate": "2026-09-23",
  "valuationDate": "2029-06-30",
  "weightedTerminalValue": 73.1,
  "totalValuePotential": 0.485,
  "annualizedPotential": 0.153,
  "hurdleRate": 0.12,
  "scenarios": {
    "bear": {"probability": 0.30, "eps": 3.50, "pe": 13, "value": 45.5},
    "base": {"probability": 0.55, "eps": 5.00, "pe": 16, "value": 80.0},
    "bull": {"probability": 0.15, "eps": 5.71, "pe": 18, "value": 102.8}
  },
  "evEbitCrossCheck": {
    "classification": "ASSUMPTION",
    "purpose": "Sekundär värderingskontroll, ej komponent i sannolikhetsvägt huvudvärde",
    "bear": {"ebitMsek": 488, "evEbit": 10, "enterpriseValueMsek": 4880, "netCashMsek": 100, "nciPutMsek": -75, "equityValueMsek": 4905, "dilutedSharesMillion": 105.58, "valuePerShare": 46.5},
    "base": {"ebitMsek": 681, "evEbit": 12, "enterpriseValueMsek": 8172, "netCashMsek": 400, "nciPutMsek": -100, "equityValueMsek": 8472, "dilutedSharesMillion": 106.05, "valuePerShare": 79.9},
    "bull": {"ebitMsek": 784, "evEbit": 14, "enterpriseValueMsek": 10976, "netCashMsek": 550, "nciPutMsek": -125, "equityValueMsek": 11401, "dilutedSharesMillion": 106.55, "valuePerShare": 107.0}
  },
  "priceZones": {
    "attractiveMax": 53.4,
    "balancedMin": 53.4,
    "balancedMax": 60.6,
    "weakMin": 60.6
  },
  "riskRewardZones": {
    "status": "APPROVED",
    "visibility": "MEMBER",
    "valuationDate": "2029-06-30"
  }
}
```

## Investeringsbeslut

**KÖP | MEDEL_HÖG risk**

Referenskursen är **49,22 kr** per 23 september 2026. Det sannolikhetsvägda terminalvärdet till 30 juni 2029 är cirka **73,1 kr**, vilket motsvarar ungefär **15,3 % annualiserad värdepotential** över cirka 2,77 år.

Detta är inte ett påstående om att RVRC är ”värt 73 kr idag”. 73,1 kr är ett sannolikhetsvägt framtida terminalvärde baserat på tre explicita scenarier.

## Metod och epistemisk status

**Huvudmetod:** normaliserad EPS × P/E.

**Sekundär värderingskontroll:** EV/EBIT med explicit scenarioanpassad EV→equity-brygga.

**Tertiär kontroll:** analytikerkonsensus.

EV/EBIT bedöms ha **MEDIUM confidence** eftersom den fullständiga post-ICANIWILL-balansräkningen ännu inte har rapporterats. Osäkerheten hanteras genom scenarioanpassad nettokassa och separat känslighetsanalys för NCI/put. Rimliga variationer i dessa poster förändrar inte värderingsslutsatsen. Confidence är Börsanalys.se:s egen bedömning, inte ett externt mått.

Extern prognos sammanställd av MarketScreener indikerar cirka 84 MSEK nettoskuld FY26/27 och cirka 222 MSEK nettokassa FY27/28. Prognosraden för *Net Debt* visade 84,1 respektive −222 MSEK vid kontroll den 25 september 2026: [MarketScreener, RVRC Holding – Forecast Balance Sheet](https://in.marketscreener.com/quote/stock/RVRC-HOLDING-AB-124007874/finances/). Detta är en föränderlig extern prognos, inte rapporterade balansräkningsvärden eller bolagsguidning. Nästa rapport används för att ersätta modellerad opening net debt och M&A-relaterade poster med rapporterade värden och pröva om EV/EBIT-confidence kan höjas från MEDIUM mot HIGH.

## Scenarioanalys

| Scenario | Sannolikhet | EPS FY28/29 | P/E | Terminalvärde |
|---|---:|---:|---:|---:|
| Bear | 30 % | 3,50 kr | 13x | 45,5 kr |
| Base | 55 % | 5,00 kr | 16x | 80,0 kr |
| Bull | 15 % | 5,71 kr | 18x | 102,8 kr |

Det sannolikhetsvägda terminalvärdet blir:

`0,30 × 45,5 + 0,55 × 80,0 + 0,15 × 102,8 = 73,07 kr`

avrundat till **73,1 kr**.

### EV/EBIT – sekundär värderingskontroll

| EV→equity-brygga | Bear | Base | Bull |
|---|---:|---:|---:|
| EBIT FY28/29 | 488 MSEK | 681 MSEK | 784 MSEK |
| EV/EBIT | 10× | 12× | 14× |
| Enterprise value | 4 880 MSEK | 8 172 MSEK | 10 976 MSEK |
| Nettokassa | +100 MSEK | +400 MSEK | +550 MSEK |
| NCI / put-antagande | −75 MSEK | −100 MSEK | −125 MSEK |
| Equity value | 4 905 MSEK | 8 472 MSEK | 11 401 MSEK |
| Diluted shares | 105,58 miljoner | 106,05 miljoner | 106,55 miljoner |
| EV/EBIT-värde/aktie | 46,5 kr | 79,9 kr | 107,0 kr |
| P/E-värde/aktie | 45,5 kr | 80,0 kr | 102,8 kr |

P/E är huvudmetoden. EV/EBIT är en sekundär kontroll. Metoderna delar samma operationella prognoser och är därför inte helt oberoende. EV/EBIT-multiplarna och EV→equity-bryggan ger däremot en separat kontroll av kapitalstruktur och enterprise-multipel. Framtida EBIT, multiplar, nettokassa och NCI/put är **ASSUMPTION** i Börsanalys.se:s modell, inte bolagsguidning eller analytikerkonsensus. EV och equity value samt värden per aktie är **DERIVED** från dessa inputs. Värdet 73,1 kr härleds enbart ur P/E-scenarierna och blandas inte med EV/EBIT-värdena.

#### Vad händer om balansräkningen avviker? (medlemsfördjupning)

| Base-nettokassa | EV/EBIT-värde/aktie |
|---|---:|
| 250 MSEK | cirka 78,5 kr |
| 400 MSEK | cirka 79,9 kr |
| 550 MSEK | cirka 81,3 kr |

Ett fel på ±150 MSEK i Base-nettokassan flyttar värdet med endast cirka ±1,4 kr per aktie. Balansräkningsosäkerheten är därför inte längre tillräckligt stor för att göra EV/EBIT oanvändbar. ±1× EV/EBIT i Base motsvarar däremot cirka ±6,4 kr per aktie. Multipelvalet är därför betydligt viktigare för EV/EBIT-värdet än mindre avvikelser i den modellerade nettokassan.

### Bear

Bear bygger på att kärn-RVRC inte återaccelererar på det sätt som Base kräver, att den operationella hävstången blir svagare och att marknaden fortsätter kräva rabatt. **45,5 kr är ett terminalvärde, inte ett kursgolv.** Om Bear börjar materialiseras tidigt kan aktien under perioden handlas betydligt lägre än terminalvärdet. Den kortsiktiga nedsidesrisken ska därför inte beskrivas som enbart avståndet från 49,22 till 45,5 kr.

### Base

Base förutsätter en återacceleration i kärn-RVRC från nuvarande ungefär **3–5 % momentum till cirka 7 % redan FY26/27 och därefter cirka 9–10 %**. Detta är ett aktivt scenarioantagande, inte en extrapolering av nuvarande trend.

Base använder **16x P/E** med MEDIUM confidence. Multipeln ligger under de senaste historiska nivåerna kring 17–18x trots bättre operationella antaganden i scenariot. Historiken ska dock inte tolkas som stöd för att RVRC automatiskt förtjänar 17–18x: dessa multiplar kan själva ha innehållit förväntningar om en återacceleration som ännu inte materialiserats. Att återanvända dem rakt av skulle riskera att kapitalisera samma optimism en gång till.

### Bull

Bull kräver tydlig evidens för att både kärn-RVRC och ICANIWILL utvecklas starkare än Base, samtidigt som marginaler och kassakonvertering håller. Bull har lägst empiriskt stöd av de tre scenarierna och därför också lägst sannolikhetsvikt. 18x P/E ska inte uppgraderas enbart för att aktiekursen faller.

## ICANIWILL och kvaliteten på tillväxten

ICANIWILL förbättrar koncernens tillväxtprofil men skapar samtidigt en viktig analysrisk: högre rapporterad koncerntillväxt kan dölja fortsatt svag organisk utveckling i kärn-RVRC. Därför ska kommande rapporter alltid bryta ned:

- organisk/kärn-RVRC-tillväxt,
- ICANIWILL-tillväxt,
- koncerntillväxt efter konsolidering.

Headline-tillväxt får inte ensam användas som bevis för att kärntesen har stärkts.

## M&A, earn-out och balansräkning

Finansiell nettoskuld och M&A-relaterade åtaganden behandlas separat. Villkorad köpeskilling, eventuell put/call för återstående ägarandel och finansnetto får inte blandas ihop med den finansiella nettoskulden utan explicit brygga.

Earn-out kan redan vara redovisad som skuld enligt förvärvsredovisningen och får därför inte mekaniskt dras av en andra gång i EV→equity-bryggan. Eventuell diskonteringsupprullning/tidsvärdeseffekt i den villkorade köpeskillingen ska dessutom behandlas som en separat finansnettopost när den kan verifieras.

Den modellerade nettokassan vid värderingsdatum är cirka **100 / 400 / 550 MSEK** i Bear / Base / Bull. Detta är scenarioestimat, inte rapporterad guidance. Ekonomisk effekt från återstående 9,9 % / NCI-put modelleras separat till cirka **75 / 100 / 125 MSEK** i Bear / Base / Bull. NCI/put-siffrorna är **ASSUMPTION med LOW confidence**, inte rapporterade fakta. Exakt redovisning och framtida lösenpris samt slutlig earn-out-redovisning är ännu inte fullt kända. Rimliga variationer i dessa poster är enligt känslighetsanalysen inte tillräckligt stora för att förändra investeringsbeslutet.

## Risk/reward och priszoner

Priszonerna härleds från det sannolikhetsvägda terminalvärdet och förutbestämda avkastningskrav, inte genom att först välja en attraktiv aktiekurs och därefter motivera den.

Med terminalvärde **73,1 kr** och cirka **2,77 år** till värderingsdatum gäller:

- **ATTRAKTIV: ≤ cirka 53,4 kr** — motsvarar minst cirka 12 % annualiserad värdepotential.
- **BALANSERAD: cirka 53,4–60,6 kr** — motsvarar cirka 7–12 % annualiserad värdepotential.
- **SVAG: > cirka 60,6 kr** — under cirka 7 % annualiserad värdepotential givet oförändrad tes.

**Viktig regel:** priszonen får aldrig ensam uppgradera rekommendationen om den fundamentala tesen har försämrats. Ett lägre pris är inte automatiskt högre säkerhetsmarginal om framtida vinster samtidigt revideras ned.

## Varför marknaden kan prisa aktien lågt

Den låga värderingen ska inte automatiskt tolkas som felprissättning. Fyra konkurrerande förklaringar ska hållas levande:

**A. Stale konsensus.** Estimat kan ligga efter den senaste operationella utvecklingen.

**B. ICANIWILL-/integrationsrabatt.** Marknaden kan kräva rabatt för genomförande-, balansräknings- och kapitalallokeringsrisk efter förvärvet.

**C. Ex-growth i kärn-RVRC.** Den låga multipeln kan vara rationell om kärnverksamheten har gått från strukturell tillväxt till låg ensiffrig tillväxt.

**D. Överdriven multipelkontraktion.** Marknaden kan ha blivit för pessimistisk och diskontera en permanent försämring som inte materialiseras.

D är residualhypotesen och ska inte bli default bara för att aktien ser billig ut. Stöd för B och C försvagar D tills faktisk data visar motsatsen.

## Q1-scorecard – förutbestämda uppdateringsregler

Nästa rapport ska inte tolkas fritt i efterhand. Följande dimensioner ska bedömas separat:

1. **Kärn-RVRC organisk tillväxt** – acceleration, oförändrat eller ytterligare inbromsning.
2. **ICANIWILL** – tillväxt, lönsamhet och tecken på integrations-/kapitalallokeringsrisk.
3. **Marginal** – stödjer utfallet Bear, Base eller Bull-trappan?
4. **Kassakonvertering och balansräkning** – bekräftar eller falsifierar rapporterade värden den modellerade EV→equity-bryggan, och kan EV/EBIT-confidence höjas från MEDIUM mot HIGH?
5. **Tyskland/DACH** – tydlig återacceleration eller fortsatt svaghet?
6. **Koncerntillväxtens kvalitet** – hur mycket kommer från kärn-RVRC respektive ICANIWILL?

**Ingen tydlig signal:** om rapporten är blandad och inga tydliga regimtriggers dominerar ska prioren **30/55/15** i huvudsak lämnas oförändrad. Modellen ska inte tvinga fram en sannolikhetsförflyttning bara för att ny kvartalsdata publicerats.

Sannolikhetsmassan ska alltid summera till 100 %. Blandade signaler ska flytta massa mellan scenarier enligt samma förutbestämda logik, inte genom ad hoc-omvärdering.

## Centrala risker

Den viktigaste modellrisken är att Base kräver en relativt snabb återacceleration i kärn-RVRC trots att den senaste observerade utvecklingen varit svagare. Därtill kommer integrations- och kapitalallokeringsrisk i ICANIWILL, osäkerhet kring M&A-relaterade åtaganden, möjlig multipelkontraktion och risken att headline-tillväxt förbättras utan att den organiska kvaliteten gör det.

Riskklassningen är därför **MEDEL_HÖG**, trots ett attraktivt centralestimat för annualiserad avkastning.

## Slutsats

Vid **49,22 kr** ligger aktien under den här modellens 12-procentiga hurdle-rate-gräns på cirka **53,4 kr**. Det sannolikhetsvägda terminalvärdet är **73,1 kr** och den implicita annualiserade värdepotentialen cirka **15,3 %** till 30 juni 2029.

Det räcker för **KÖP**, men rekommendationen bygger inte på att nedsidan skulle vara begränsad till Bear-terminalvärdet 45,5 kr. Den bygger på kombinationen av scenariofördelning, terminalvärde, tidshorisont och ett explicit avkastningskrav.

**Canonical status:** `PUBLISH_READY`  
**EV/EBIT:** sekundär värderingskontroll, MEDIUM confidence
**Rekommendation:** **KÖP**  
**Risk:** **MEDEL_HÖG**
