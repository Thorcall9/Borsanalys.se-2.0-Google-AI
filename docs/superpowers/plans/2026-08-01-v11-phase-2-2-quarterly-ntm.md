# TDD-plan: v11 Fas 2.2 – Quarterly NTM Engine

1. Skriv tester för fyra kvartal, följdvalidering, identitet, valuta och primärdefinition.
2. Skriv test för beloppssummering, dagviktat aktieantal samt härledda NTM EPS och FCF per aktie.
3. Implementera en tunn NTM-aggregator som anropar Fas 2.1 för varje kvartal.
4. Skriv test för deterministisk sortering och komplett period-/aggregeringstrace.
5. Verifiera att kontroll-FCF inte exponeras som primärt NTM-värde och att hela v11-sviten är grön.
