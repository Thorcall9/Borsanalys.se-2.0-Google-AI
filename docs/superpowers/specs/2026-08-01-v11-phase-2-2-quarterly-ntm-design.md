# v11 Fas 2.2 – Quarterly NTM Engine

## Syfte

Fas 2.2 sammanställer exakt fyra sammanhängande kvartal till ett spårbart NTM-resultat. Den återanvänder Fas 2.1 för varje enskild `FinancialPeriodResult`; den innehåller inga bolagsspecifika regler eller en egen beräkningsmotor.

## Kontrakt

`QuarterlyFinancialInputSet` binder en periodberäkning till `analysisId`, `companyId` och `modelRevisionId`. `calculateNTMFinancialModel` sorterar kvartalen deterministiskt, validerar identitet och följd, och returnerar både de fyra periodresultaten och ett `NTMFinancialResult`.

Beloppsmått summeras. Utspätt aktieantal är ett dagviktat genomsnitt av kvartalens periodkonsistenta utspädda aktieantal. NTM EPS och FCF per aktie räknas från aggregerat nettoresultat respektive FCF dividerat med detta NTM-aktieantal. Kvartalsvisa per-aktie-tal summeras aldrig.

`aggregationTrace` sparar ingående kvartal, definition, ingångsvärden, metod och utfall för varje NTM-mått. Primärvärden kommer endast från Fas 2.1:s kontextval; kontrolldefinitioner kan därför inte hamna i `primaryValuesByMetric`.

## Avgränsning

Ingen databas, Prisma-migration, femårsmodell, scenario, värdering, KPI/tes, rapportjämförelse, AI eller UI ingår.
