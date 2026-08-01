# V11 Fas 2.1 — Shared Financial Definitions: designspecifikation

> **Status:** Godkänd och låst för planering. Ingen implementation, migration eller databasåtgärd ingår i detta dokument.

## Syfte och avgränsning

Fas 2.1 skapar ett gemensamt, generellt definitionslager för ekonomiska mått. Lagret används senare av NTM-modellen, femårsmodellen, KPI-motorn, rapportjämförelsen och värderingen. Det ska inte innehålla bolagsspecifik logik eller göra en Meta-motor.

Fas 2.1 omfattar Revenue, EBIT, Adjusted EBIT, Financial Result, Tax, Net Income, Diluted Shares, EPS, Operating Cash Flow, Capex, FCF och FCF/share. FCF-conversion, KPI-, tes-, scenario-, värderings- och rapportjämförelsebeteende är uttryckligen utanför scope tills senare Fas 2-delar.

Ingen Prisma-migration behövs. Definitioner och modellval lagras som godkända, versionerade `V11ObjectRevision.payload`-objekt och använder befintlig approval- och revisionshistorik.

## Designprinciper

- Beräknade definitioner refererar alltid till exakta `inputDefinitionIds`, aldrig till ett fritt metric-namn.
- `unit`, `currency` och `scale` är separata fält. Exempel: `unit: 'currency'`, `currency: 'SEK'`, `scale: 'millions'`.
- Skalor inom samma unit och valuta normaliseras deterministiskt. Valutor konverteras aldrig i Fas 2.1.
- Rapporterad EBIT och Adjusted EBIT är olika mått. Justerad EBIT ersätter aldrig rapporterad EBIT.
- Alla beräkningar returnerar både värden och fullständig, deterministisk `calculationTrace`.
- Definitionsgrafen måste vara acyklisk; både direkta och indirekta cykler avvisas.
- En stabil definition väljs som primär först av en separat, godkänd modellkonfiguration. En definition har ingen permanent `primary`-flagga.

## Värderepresentation och teckenkonventioner

```ts
type FinancialUnit = 'currency' | 'shares' | 'ratio' | 'currency-per-share';
type FinancialScale = 'ones' | 'thousands' | 'millions' | 'billions';

type FinancialValue = {
  value: number;
  unit: FinancialUnit;
  currency: string | null;
  scale: FinancialScale;
};
```

`currency` måste vara ISO 4217 när unit är `currency` eller `currency-per-share`, och måste vara `null` för `shares` och `ratio`. `scale` beskriver endast storleksordning och påverkar aldrig vilken valuta eller enhet ett värde har.

Konventioner:

| Mått | Tecken och regel |
|---|---|
| Revenue, EBIT, OCF, Net Income | Positiva vid positivt bidrag/resultat. |
| Financial Result | Signerat: finansiell intäkt är positiv, finansiell kostnad negativ. |
| Tax | Signerat: skattekostnad är negativ, skatteförmån positiv. |
| Capex | Positivt investeringsutflöde. |
| FCF | `Operating Cash Flow - Capex`. |
| Diluted Shares | Strikt positivt antal utspädda, vägda genomsnittsaktier. |
| EPS och FCF/share | Beräknas med samma valuta och skala som täljaren, dividerat med antal aktier. |

## FinancialDefinition

En `FinancialDefinition` är ett stabilt semantiskt kontrakt för ett mått och lagras som ett versionerat `financial-definition`-objekt.

```ts
type FinancialMetric =
  | 'revenue' | 'ebit_reported' | 'ebit_adjusted' | 'financial_result'
  | 'tax' | 'net_income' | 'diluted_shares' | 'eps'
  | 'operating_cash_flow' | 'capex' | 'free_cash_flow' | 'fcf_per_share';

type CalculationRule = 'reported-input' | 'sum' | 'subtract' | 'divide' | 'adjusted-ebit';

type FinancialDefinition = {
  definitionId: string;
  metric: FinancialMetric;
  name: string;
  output: { unit: FinancialUnit; currency: string | null; scale: FinancialScale };
  allowedPeriodKinds: Array<'quarter' | 'fiscal-year'>;
  calculationRule: CalculationRule;
  inputDefinitionIds: string[];
  adjustmentComponents: EbitAdjustmentComponent[];
  rationale: string;
};
```

Regler:

- `reported-input` har inga `inputDefinitionIds`.
- `sum` har minst två inputDefinitionIds.
- `subtract` och `divide` har exakt två inputDefinitionIds i deklarerad ordning.
- `adjusted-ebit` har exakt ett första inputDefinitionId för rapporterad EBIT och minst en explicit justeringsdefinition därefter.
- `adjustmentComponents` är tom för alla andra regler och innehåller minst en explicit signerad komponent för `adjusted-ebit`.
- En beräknad definition får bara använda kompatibla unit, currency och perioder. Kompatibel skala normaliseras innan beräkning.
- `definitionId` är den stabila logiska identiteten. Ändrat beräkningssätt eller inputgraf skapas som ny revision; väsentligt ändrad semantik ska använda ett nytt definitionId.

### Explicit justerad EBIT

En adjusted-EBIT-definition innehåller signerade komponenter:

```ts
type EbitAdjustmentComponent = {
  adjustmentId: string;
  amount: FinancialValue;
  rationale: string;
  evidenceIds: string[];
  recurrenceAssessment: 'one-off' | 'recurring' | 'uncertain';
};
```

Engångskostnad återläggs som positiv komponent. Engångsintäkt tas bort som negativ komponent. En komponent utan rationale, evidens eller recurrence assessment är ogiltig. Justerad EBIT är ett beräknat observationsmått med egna käll- och beroendereferenser.

## Definitionsgraf och beräkningsresultat

`validateDefinitionGraph(definitions)` bygger en riktad graf från varje beräknad definition till dess `inputDefinitionIds` och avvisar:

- okända inputDefinitionIds,
- self-reference,
- direkt cykel, och
- indirekt cykel.

`calculateFinancialPeriodResult` tar ett godkänt definitionsset och värden per definitionId för en kompatibel period. Det returnerar:

```ts
type FinancialPeriodResult = {
  period: Period;
  valuesByDefinitionId: Record<string, FinancialValue>;
  calculationTrace: Array<{
    definitionId: string;
    rule: CalculationRule;
    output: FinancialValue;
    inputs: Array<{ definitionId: string; value: FinancialValue }>;
    dependencyIds: string[];
  }>;
};
```

`calculationTrace` sorteras i topologisk, deterministisk ordning och ska kunna reproducera varje resultat utan dold affärslogik. Flera values för samma metric är tillåtna endast om deras definitioner är olika. En senare selection väljer då vilket värde som används av en modell.

## FinancialModelDefinitionSelection

Modellvalet är generellt, versionerat och godkänt separat från definitionen:

```ts
type FinancialModelContext = 'ntm' | 'five-year';

type FinancialModelDefinitionSelection = {
  context: FinancialModelContext;
  metric: FinancialMetric;
  primaryDefinitionId: string;
  controlDefinitionIds: string[];
  rationale: string;
};
```

Regler:

1. En konfiguration får högst ha en selection per kombination av `context` och `metric`.
2. Varje selection har exakt ett `primaryDefinitionId`.
3. Primärdefinition och kontrollmått måste finnas bland godkända definitioner, ha samma metric och vara kompatibla med kontexten.
4. Primärdefinition får inte förekomma bland kontrollmåtten och kontrollmått får inte dupliceras.
5. NTM och femårsmodell kräver vardera exakt en selection för `free_cash_flow` innan dessa modeller byggs.
6. Om NTM och femår väljer olika FCF-primärdefinition krävs uttrycklig rationale i båda selections och funktionen returnerar `FCF_DEFINITION_COMPARABILITY_WARNING`.
7. Alternativa definitioner används enbart som kontrollmått. De blandas aldrig in i den primära beräkningsserien.
8. Ändrat `primaryDefinitionId` är en ny `V11ObjectRevision` med approvalstatus `proposed`. Endast redaktör kan godkänna den, efter att beroendedefinitionerna godkänts.

Fas 2.1 använder denna generella modell främst för FCF, men den är avsiktligt återanvändbar för andra mått där exempelvis rapporterad och justerad definition behöver väljas i senare motorer.

## Meta som konfigurationsbevis

Meta får konfiguration, inte specialkod:

| Definition | Mått | Roll i NTM/femår |
|---|---|---|
| `meta-fcf-including-finance-lease-principal` | free_cash_flow | Primär: CFO minus capex inklusive finance-lease principal payments. |
| `meta-fcf-excluding-finance-lease-principal` | free_cash_flow | Kontroll: CFO minus capex exklusive dessa betalningar. |

Samma primärdefinition ska väljas i båda contexts. Om en framtida redaktionellt godkänd modell väljer olika definitioner syns jämförbarhetsvarningen i dess resultat och i framtida rapportjämförelse.

## TDD-acceptansfall

1. Definitioner refererar beräkningsinput med definitionId och avvisar metric-baserade genvägar.
2. Direkta och indirekta definitionscykler avvisas.
3. Beräkning normaliserar tusen/miljoner/miljarder inom samma unit och currency.
4. Beräkning avvisar olika unit eller currency; ingen valutakonvertering sker.
5. Adjusted EBIT använder signerade, godkända komponenter och avvisar komponenter utan rationale, evidenceIds eller recurrence assessment.
6. `FinancialPeriodResult` ger samma values och calculationTrace oberoende av ordningen på inputobjekt.
7. Flera definitioner för samma metric avvisas som modellinput om godkänd selection saknas.
8. Selection avvisar saknad primärdefinition, dubbel selection för samma context/metric, okänd definition, primärdefinition bland controls och fel metric.
9. Skilda FCF-primärdefinitioner för NTM/femår returnerar varning och kräver tydliga motiveringar.
10. Ändrad primärdefinition blir proposed revision och kan inte godkännas av AI.

## Utanför scope

- Prisma-migration, schemaändring och databasåtgärd.
- Snapshot Hardening och omskrivning av snapshots.
- NTM-, femårs-, scenario- och valuation engine.
- KPI Engine, Investment Thesis Engine, Trigger Engine, Report Comparison och Editorial Action.
- AI-extraktion eller AI-utkast.
- Valutakonvertering, DCF, WACC och terminalvärde.
