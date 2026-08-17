export type VolvoClaimClass = "FACT" | "DERIVED" | "ASSUMPTION" | "ANALYSIS";

type SourceRef = {
  id: string;
  title: string;
  publishedDate: string;
  publisher: string;
  kind: "primary" | "secondary";
  documentHash?: string;
  locator?: string;
};

type VolvoClaim = {
  claimId: string;
  class: VolvoClaimClass;
  status: "DECISION_GRADE" | "NOT_DECISION_GRADE";
  text: string;
  effectiveDate: string;
  sourceRefs: string[];
  formula?: string;
  notes?: string;
};

const sources: SourceRef[] = [
  { id: "VOLVO-AR-2024", title: "Volvokoncernen Årsredovisning 2024", publishedDate: "2025-02-26", publisher: "AB Volvo", kind: "primary", documentHash: "555813f19db4b85f3d39ebef4c624f20f855e7734b18d706b8b6291d6e86ae5f", locator: "Finansiella rapporter och flerårsöversikt" },
  { id: "VOLVO-Q1-2025", title: "Volvokoncernen rapport över det första kvartalet 2025", publishedDate: "2025-04-23", publisher: "AB Volvo", kind: "primary", documentHash: "4f847fda7213ddf3890ac0d796c6e9e636eff5593cfa1181ff284251cabd2161", locator: "s. 2–3" },
  { id: "VOLVO-Q2-2025", title: "Volvokoncernen rapport över det andra kvartalet 2025", publishedDate: "2025-07-17", publisher: "AB Volvo", kind: "primary", documentHash: "c94cb789f19145b6b74db8fb332be205d58b766a907d152769371c082051dc57", locator: "s. 2–3" },
  { id: "VOLVO-Q3-2025", title: "Volvokoncernen rapport över det tredje kvartalet 2025", publishedDate: "2025-10-17", publisher: "AB Volvo", kind: "primary", documentHash: "e0590500d5aa76b00413a2c589f23d0b3f9e692fced02ba9235c3ce1d3e9820d", locator: "s. 2–3" },
  { id: "VOLVO-Q4-2025", title: "Volvokoncernen rapport över det fjärde kvartalet och helåret 2025", publishedDate: "2026-01-28", publisher: "AB Volvo", kind: "primary", documentHash: "670927c538a2c54604a24795f4e99461735a2484bb7be017699f3fb2a29db64f", locator: "s. 2–3" },
  { id: "VOLVO-AR-2025", title: "Volvokoncernen Årsredovisning 2025", publishedDate: "2026-02-25", publisher: "AB Volvo", kind: "primary", documentHash: "24fa5e1dd713a135736c19e52d8e9a0b86cb1da081761eeea2dca3308cb2c747", locator: "s. 18–23 och 223–229" },
  { id: "VOLVO-Q1-2026", title: "Volvokoncernen rapport över det första kvartalet 2026", publishedDate: "2026-04-24", publisher: "AB Volvo", kind: "primary", documentHash: "648b9e27684ac9ca5239f153f10ce810bcd114126b9cf2e69f93964a20292e24", locator: "s. 2–4" },
  { id: "VOLVO-Q2-2026", title: "Volvokoncernen rapport över det andra kvartalet 2026", publishedDate: "2026-07-17", publisher: "AB Volvo", kind: "primary", documentHash: "5b52ad737a95997128f912ef8cceacd04ce2fbbc0f0f553e107cb494e6f25d0b", locator: "s. 2–4, 9–17 och 34–35" },
  { id: "VOLVO-Q2-2026-PRESENTATION", title: "Volvo Group Q2 2026 presentation material", publishedDate: "2026-07-17", publisher: "AB Volvo", kind: "primary", documentHash: "a110ab97a1a04ee008a6806df3cfad5276464c997a6e8133ddabb91e95343470", locator: "Presentationsmaterial; används som visuell kontroll, inte ensam för beslutskritiska claims" },
  { id: "MARKET-2026-08-10", title: "VOLV B historisk stängningskurs", publishedDate: "2026-08-10", publisher: "S&P Global Market Intelligence via StockAnalysis / Investing.com", kind: "secondary", locator: "Stängningskurs 354,60 SEK den 10 augusti 2026; verifierad mot användarens Börsdata-bilder" },
  { id: "BORSDATA-IMAGES-2026-08-10", title: "Börsdata-skärmbilder för VOLV B", publishedDate: "2026-08-10", publisher: "Börsdata / användarunderlag", kind: "secondary", locator: "R12 Q2 2026 och historik för omsättning, EBIT, vinst, EPS och balansmått" },
];

const claims: VolvoClaim[] = [
  { claimId: "VOLVO-F-001", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 omsättning var 126 273 Mkr, +3 % rapporterat och +7 % organiskt.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-002", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 justerat rörelseresultat var 14 783 Mkr och justerad rörelsemarginal 11,7 %.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-003", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 resultat per aktie var 5,10 kr och operativt kassaflöde i Industriverksamheten 5 837 Mkr.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-004", class: "FACT", status: "DECISION_GRADE", text: "Industriverksamhetens finansiella nettoställning exklusive pensioner och leasing var 34,7 mdkr vid Q2 2026.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-005", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 ökade serviceförsäljningen organiskt 7 % för koncernen och 10 % inom Lastbilar.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-006", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 ökade lastbilsorderingången 33 % till 63 412 enheter; Nordamerika ökade 122 %, medan leveranserna där minskade 6 %.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-007", class: "FACT", status: "DECISION_GRADE", text: "Lastbilars justerade rörelsemarginal förbättrades till 11,2 % i Q2 2026 från 10,3 %.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-008", class: "FACT", status: "DECISION_GRADE", text: "Anläggningsmaskiners justerade rörelsemarginal var 14,4 %, Bussars 8,2 % och Volvo Pentas 16,7 % i Q2 2026.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-009", class: "FACT", status: "DECISION_GRADE", text: "Q2 2026 innehöll en CARB-relaterad kostnad på 1 829 Mkr och en positiv Flexis-effekt på 405 Mkr, vilka exkluderades från justerat resultat.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-010", class: "FACT", status: "DECISION_GRADE", text: "Efter balansdagen väntas en IEEPA-återbetalning i Q3 2026 kompensera en prognostiserad negativ tullpåverkan på 1,1 mdkr.", effectiveDate: "2026-07-17", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-011", class: "FACT", status: "DECISION_GRADE", text: "2025 omsatte koncernen 479 183 Mkr, hade justerad rörelsemarginal 10,7 %, EPS 16,94 kr och industriellt operativt kassaflöde 21,8 mdkr.", effectiveDate: "2025-12-31", sourceRefs: ["VOLVO-Q4-2025", "VOLVO-AR-2025"] },
  { claimId: "VOLVO-F-012", class: "FACT", status: "DECISION_GRADE", text: "Serviceförsäljningen var 124 mdkr 2025, 26 % av koncernomsättningen, och hade vuxit 13 % per år i genomsnitt under fem år.", effectiveDate: "2025-12-31", sourceRefs: ["VOLVO-AR-2025"] },
  { claimId: "VOLVO-F-013", class: "FACT", status: "DECISION_GRADE", text: "Volvo hade 2 033 miljoner utestående aktier vid Q2 2026.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q2-2026"] },
  { claimId: "VOLVO-F-014", class: "FACT", status: "DECISION_GRADE", text: "VOLV B stängde på 354,60 kr den 10 augusti 2026.", effectiveDate: "2026-08-10", sourceRefs: ["MARKET-2026-08-10", "BORSDATA-IMAGES-2026-08-10"] },
  { claimId: "VOLVO-D-001", class: "DERIVED", status: "DECISION_GRADE", text: "LTM Q2 2026 omsättning var 471 534 Mkr.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q4-2025", "VOLVO-Q2-2025", "VOLVO-Q2-2026"], formula: "FY2025 479 183 + H1 2026 237 038 − H1 2025 244 687" },
  { claimId: "VOLVO-D-002", class: "DERIVED", status: "DECISION_GRADE", text: "LTM Q2 2026 justerat rörelseresultat var 51 426 Mkr, motsvarande 10,9 % marginal.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q4-2025", "VOLVO-Q2-2025", "VOLVO-Q2-2026"], formula: "51 218 + 26 950 − 26 742; dividerat med 471 534" },
  { claimId: "VOLVO-D-003", class: "DERIVED", status: "DECISION_GRADE", text: "LTM Q2 2026 EPS var cirka 17,62 kr och industriellt operativt kassaflöde 23,85 mdkr.", effectiveDate: "2026-06-30", sourceRefs: ["VOLVO-Q4-2025", "VOLVO-Q2-2025", "VOLVO-Q2-2026"], formula: "EPS: 16,94 + 9,19 − 8,51. Kassaflöde: 21,837 + 6,269 − 4,257." },
  { claimId: "VOLVO-A-001", class: "ASSUMPTION", status: "DECISION_GRADE", text: "Base 2028: omsättning 530 mdkr, justerad rörelsemarginal 11,5 %, nettot av finansposter −0,5 mdkr, skatt 25,5 %, minoritet −0,05 mdkr, 2,033 md aktier och P/E 15x.", effectiveDate: "2028-12-31", sourceRefs: ["VOLVO-F-005", "VOLVO-F-006", "VOLVO-D-002"], notes: "Normaliserad intjäningsnivå med uthållig marginal; multipeln innehåller en begränsad kvalitetspremie, men ingen full strukturell rerating." },
  { claimId: "VOLVO-A-002", class: "ASSUMPTION", status: "DECISION_GRADE", text: "Bear 2028: omsättning 460 mdkr, justerad rörelsemarginal 9,0 %, finansnetto −1,0 mdkr, skatt 25,5 %, minoritet −0,05 mdkr, 2,033 md aktier och P/E 13x.", effectiveDate: "2028-12-31", sourceRefs: ["VOLVO-AR-2025", "VOLVO-Q2-2026"], notes: "Uthålligt svagare intjäningsnivå där service inte fullt kompenserar för lägre volymer, sämre kapacitetsutnyttjande och svagare mix." },
  { claimId: "VOLVO-A-003", class: "ASSUMPTION", status: "DECISION_GRADE", text: "Bull 2028: omsättning 570 mdkr, justerad rörelsemarginal 12,5 %, finansnetto −0,25 mdkr, skatt 25,5 %, minoritet −0,05 mdkr, 2,033 md aktier och P/E 15x.", effectiveDate: "2028-12-31", sourceRefs: ["VOLVO-AR-2025", "VOLVO-Q2-2026"], notes: "Uthålligt starkare intjäningsnivå med högre serviceandel, bättre mix och starkare marknadsposition, utan antagande om en tillfällig cykeltopp." },
  { claimId: "VOLVO-D-004", class: "DERIVED", status: "DECISION_GRADE", text: "Bear/Base/Bull ger 192/332/390 kr per aktie och sannolikhetsvägt värde 309 kr.", effectiveDate: "2028-12-31", sourceRefs: ["VOLVO-A-001", "VOLVO-A-002", "VOLVO-A-003"], formula: "EPS = (((omsättning × marginal) + finansnetto) × (1 − skatt) − minoritet) / aktier; värde = EPS × P/E; viktning 25/55/20 %." },
  { claimId: "VOLVO-D-005", class: "DERIVED", status: "DECISION_GRADE", text: "Från 354,60 kr till 308,58 kr är kursvärdepotentialen exklusive utdelningar −13,0 % och annualiserad kursvärdepotential exklusive utdelningar −5,6 % till 2028-12-31.", effectiveDate: "2026-08-10", sourceRefs: ["VOLVO-F-014", "VOLVO-D-004"], formula: "308,5775/354,60−1; annualiserat över 874 dagar / 365,25 = 2,39288 år." },
  { claimId: "VOLVO-D-007", class: "ANALYSIS", status: "DECISION_GRADE", text: "Risk/reward-zonerna använder 240 kr som gräns för attraktiv och 290 kr som gräns för svag risk/reward. Vid 240 kr är annualiserad kursvärdepotential exklusive utdelningar 11,07 % och Bear-nedsidan 19,94 %; vid 290 kr är motsvarande siffror 2,63 % och 33,74 %. Gränserna är en redaktionell risksyntes, inte automatiska följder av en upp-/nedsideratio eller noll i värdepotential.", effectiveDate: "2026-08-10", sourceRefs: ["VOLVO-F-004", "VOLVO-F-005", "VOLVO-F-006", "VOLVO-D-004", "VOLVO-D-005"], formula: "Annualiserad värdepotential(P) = (308,5775/P)^(1/(874/365,25))−1. Bear-nedsida(P) = min(192,14/P−1, 0). Utdelningar ingår inte." },
  { claimId: "VOLVO-A-004", class: "ASSUMPTION", status: "NOT_DECISION_GRADE", text: "Illustrativa kontantutdelningar 2027E/2028E: Bear 7,00/7,50 kr, Base 10,50/12,50 kr och Bull 13,00/16,00 kr per aktie.", effectiveDate: "2026-08-12", sourceRefs: ["VOLVO-F-003", "VOLVO-F-004", "VOLVO-D-003"], notes: "Scenarioantaganden baserade på kassaflöde och kapitalbuffert, inte bolagets guidning. Extrautdelningar är särskilt osäkra." },
  { claimId: "VOLVO-D-006", class: "DERIVED", status: "NOT_DECISION_GRADE", text: "Med illustrativa kontantutdelningar blir slutvärdena Bear/Base/Bull 206,64/354,95/418,85 kr och sannolikhetsvägt slutvärde 330,65 kr.", effectiveDate: "2028-12-31", sourceRefs: ["VOLVO-D-004", "VOLVO-A-004"], formula: "Slutvärde = terminalvärde + utdelningar 2027E–2028E. Viktning: 25/55/20 %. Totalavkastning beräknas från 354,60 kr utan återinvestering av utdelningar." },
  { claimId: "VOLVO-N-001", class: "ANALYSIS", status: "DECISION_GRADE", text: "Serviceaffären och förbättrad orderbild stärker motståndskraften, men återhämtningen måste bevisas genom leveranser, marginal och kassaflöde. Den låsta EPS-bryggan och terminalvärderingen ger ett sannolikhetsvägt värde under referenskursen.", effectiveDate: "2026-08-11", sourceRefs: ["VOLVO-F-005", "VOLVO-F-006", "VOLVO-D-002", "VOLVO-D-005"] },
  { claimId: "VOLVO-N-002", class: "ANALYSIS", status: "DECISION_GRADE", text: "Rekommendationen är AVSTÅ med MEDEL risk: bolaget är intressant, men dagens kurs ligger över den sannolikhetsvägda värderingen och erbjuder därför inte tillräcklig säkerhetsmarginal för ett nytt köp.", effectiveDate: "2026-08-15", sourceRefs: ["VOLVO-F-004", "VOLVO-D-004", "VOLVO-D-005"] },
];

export const VOLVO_Q2_2026_DOSSIER = {
  schemaVersion: "11.2",
  analysisId: "volvo-b-2026-08-10-v11-2",
  companyId: "ab-volvo",
  security: { name: "AB Volvo ser. B", ticker: "VOLV-B.ST", currency: "SEK" },
  analysisDate: "2026-08-10",
  sourceCutoffDate: "2026-08-10",
  marketReference: { price: 354.6, currency: "SEK", asOf: "2026-08-10", sourceRef: "MARKET-2026-08-10" },
  valuationDate: "2028-12-31",
  valuationYearLabel: "2028E",
  valuationModelType: "earnings_multiple",
  interactiveValuation: "supported",
  interactiveReason: "Omsättning, normaliserad justerad rörelsemarginal och P/E är tydliga och ekonomiskt meningsfulla scenarioinputs.",
  scenarios: [
    { id: "bear", probability: 0.25, fairValue: 192.14, keyAssumptions: { revenueSekBn: 460, adjustedOperatingMarginPct: 9, pe: 13 } },
    { id: "base", probability: 0.55, fairValue: 331.95, keyAssumptions: { revenueSekBn: 530, adjustedOperatingMarginPct: 11.5, pe: 15 } },
    { id: "bull", probability: 0.2, fairValue: 389.85, keyAssumptions: { revenueSekBn: 570, adjustedOperatingMarginPct: 12.5, pe: 15 } },
  ],
  weightedFairValue: 308.5775,
  weightedTotalValuePotential: -0.129787084,
  weightedAnnualizedValuePotential: -0.05644084269031768,
  recommendation: "AVSTÅ",
  risk: "MEDEL",
  theses: [
    { thesisId: "service-buffer", status: "progressing", thesis: "Serviceaffären ska hålla koncernens justerade marginal över 10 % genom cykeln.", latestEvidenceClaimIds: ["VOLVO-F-005", "VOLVO-D-002"], nextEvidence: "Q3 justerad marginal minst 10 % och fortsatt positiv organisk servicetillväxt.", nextReportCheckpoint: { eventType: "Q3 2026", expectedWindow: "2026-10-23" } },
    { thesisId: "north-america-conversion", status: "unconfirmed", thesis: "Den nordamerikanska orderingången ska konverteras till leveranser utan ny marginalpress.", latestEvidenceClaimIds: ["VOLVO-F-006", "VOLVO-F-007"], nextEvidence: "Positiv leveranstillväxt i Nordamerika och lastbilsmarginal minst 10 %.", nextReportCheckpoint: { eventType: "Q3 2026", expectedWindow: "2026-10-23" } },
    { thesisId: "cash-and-capital", status: "challenged", thesis: "Kassaflöde och nettokassa ska ge fortsatt handlingsutrymme efter utdelningar och investeringar.", latestEvidenceClaimIds: ["VOLVO-F-003", "VOLVO-F-004", "VOLVO-D-003"], nextEvidence: "Industriverksamhetens nettokassa över 30 mdkr och förbättrat rullande operativt kassaflöde.", nextReportCheckpoint: { eventType: "Q3 2026", expectedWindow: "2026-10-23" } },
  ],
  riskRewardZones: {
    status: "APPROVED",
    visibility: "MEMBER",
    method: "Fasta redaktionella zoner från Volvos sannolikhetsvägda värde, realistiska Bear-scenario, medelrisk, cykliska exponering och tesstatus. De avser kursvärde exklusive utdelningar och är inte personliga råd.",
    valuationDate: "2028-12-31",
    canonicalRefs: { weightedFairValue: "VOLVO-D-004", annualizedValuePotential: "VOLVO-D-005", bearFairValue: "VOLVO-D-004", risk: "VOLVO-N-002", marketReference: "VOLVO-F-014" },
    boundaries: [
      { boundaryId: "attractive-threshold", canonicalPrice: { value: 240, currency: "SEK" }, annualizedValuePotential: 0.11074845838940717, bearDownside: -0.1994166666666667, risk: "MEDEL", rationale: "Här finns fortfarande cirka 11 % annualiserad kursvärdepotential exklusive utdelningar medan nedsidan till ett realistiskt Bear är knappt 20 %. Det ger tillräcklig kompensation för Volvos cykliska risk, trots att service och nettokassa dämpar den.", derivedClaimIds: ["VOLVO-D-007"] },
      { boundaryId: "weak-threshold", canonicalPrice: { value: 290, currency: "SEK" }, annualizedValuePotential: 0.026288271904811644, bearDownside: -0.33744827586206905, risk: "MEDEL", rationale: "Här återstår bara cirka 2,6 % annualiserad kursvärdepotential exklusive utdelningar, medan nedsidan till ett realistiskt Bear är cirka 34 %. Serviceaffär och nettokassa ger stöd, men inte tillräckligt för att kompensera för kvarvarande cykel- och tesrisk.", derivedClaimIds: ["VOLVO-D-007"] },
    ],
    zones: [
      { zone: "ATTRACTIVE", priceInterval: { min: null, max: 240, currency: "SEK", minInclusive: false, maxInclusive: false }, boundaryRefs: ["attractive-threshold"], rationale: "Tillräcklig säkerhetsmarginal för Volvos medelrisk och cykliska exponering, även när order ännu ska omvandlas till leveranser, marginal och kassaflöde.", derivedClaimIds: ["VOLVO-D-007"], presentation: { title: "Attraktiv risk/reward", priceLabel: "Under 240 kr", annualPotentialLabel: "Cirka +11,1 %/år eller högre", bearDownsideLabel: "Bear-nedsida: cirka −20 % eller mindre" } },
      { zone: "BALANCED", priceInterval: { min: 240, max: 290, currency: "SEK", minInclusive: true, maxInclusive: false }, boundaryRefs: ["attractive-threshold", "weak-threshold"], rationale: "Serviceaffär och nettokassa ger stöd, men ersättningen för Bear-nedsida och kvarvarande cykelrisk blir successivt mindre.", derivedClaimIds: ["VOLVO-D-007"], presentation: { title: "Balanserad risk/reward", priceLabel: "240–290 kr", annualPotentialLabel: "Cirka +11,1 till +2,6 %/år", bearDownsideLabel: "Bear-nedsida: cirka −20 till −34 %" } },
      { zone: "WEAK", priceInterval: { min: 290, max: null, currency: "SEK", minInclusive: true, maxInclusive: false }, boundaryRefs: ["weak-threshold"], rationale: "Begränsad säkerhetsmarginal: återstående kursvärdepotential exklusive utdelningar är för låg i relation till realistisk Bear-nedsida och kvarvarande tesrisk.", derivedClaimIds: ["VOLVO-D-007"], presentation: { title: "Svag risk/reward", priceLabel: "Från 290 kr", annualPotentialLabel: "Cirka +2,6 %/år eller lägre", bearDownsideLabel: "Bear-nedsida: minst cirka −34 %" } },
    ],
    recalculationDependencies: ["VOLVO-D-004", "VOLVO-D-005", "VOLVO-N-002", "VOLVO-F-014"],
    supportsUserScenarioRecalculation: true,
  },
  sources,
  claims,
  accessLevel: "PUBLIC",
  disclaimer: { centralDisclaimerVersion: "v11.2-2026-08", shortDisclaimerId: "standard-short-v11.2", fullDisclaimerUrl: "/villkor" },
  version: { versionId: "volvo-q2-2026-v7", parentVersionId: "volvo-q2-2026-v6", createdAt: "2026-08-17", author: "Börsanalys.se / Codex research", status: "PUBLISH_READY", immutable: true },
  changeTracking: [
    { fieldPath: "analysis", oldValueRef: null, newValueRef: "volvo-q2-2026-v1", reason: "Ny separat v11.2-analys; äldre Volvo-analys lämnas oförändrad.", claimIds: ["VOLVO-N-002"], changedBy: "Codex", changedAt: "2026-08-10" },
    { fieldPath: "valuation", oldValueRef: "volvo-q2-2026-v1", newValueRef: "volvo-q2-2026-v2", reason: "Låst EPS-brygga och terminalmultiplar 13x/15x/15x; scenariodefinitioner för uthållig intjäning tillagda.", claimIds: ["VOLVO-A-001", "VOLVO-A-002", "VOLVO-A-003", "VOLVO-D-004", "VOLVO-D-005"], changedBy: "Codex", changedAt: "2026-08-11" },
    { fieldPath: "valuation", oldValueRef: "volvo-q2-2026-v2", newValueRef: "volvo-q2-2026-v3", reason: "Låsta sannolikheter 25/55/20 och språk/visning för justerad marginalhistorik, EPS-brygga, utdelningsavgränsning och Nordamerika uppdaterade.", claimIds: ["VOLVO-D-004", "VOLVO-D-005", "VOLVO-N-001", "VOLVO-N-002"], changedBy: "Codex", changedAt: "2026-08-11" },
    { fieldPath: "valuation.illustrativeTotalReturn", oldValueRef: null, newValueRef: "volvo-q2-2026-v4", reason: "Illustrativ totalavkastning med kontantutdelningar visas separat från låst kursvärdering; huvudvärdet 309 kr och kursvärdepotentialen exklusive utdelningar är oförändrade.", claimIds: ["VOLVO-A-004", "VOLVO-D-006"], changedBy: "Codex", changedAt: "2026-08-12" },
    { fieldPath: "recommendation", oldValueRef: "BEVAKA", newValueRef: "AVSTÅ", reason: "Sannolikhetsvägt värde på 309 kr ligger under referenskursen 354,60 kr. Rekommendationen tydliggör att modellen inte ger tillräcklig säkerhetsmarginal för ett nytt köp.", claimIds: ["VOLVO-N-002", "VOLVO-D-004", "VOLVO-D-005"], changedBy: "Codex", changedAt: "2026-08-15" },
    { fieldPath: "valuation.riskRewardZones", oldValueRef: null, newValueRef: "volvo-q2-2026-v6", reason: "Godkända MEMBER-zoner har lagts ovanpå befintlig canonical värdering. Annualiseringen har samtidigt korrigerats till v11.2:s 365,25-dagarskonvention utan ändring i avrundad publik visning.", claimIds: ["VOLVO-D-004", "VOLVO-D-005", "VOLVO-D-007", "VOLVO-N-002"], changedBy: "Codex", changedAt: "2026-08-17" },
    { fieldPath: "valuation.riskRewardZones", oldValueRef: "volvo-q2-2026-v6", newValueRef: "volvo-q2-2026-v7", reason: "Zongränserna har omprövats som risk/reward-syntes exklusive utdelningar. De mekaniska gränserna vid lika upp-/nedsida respektive noll potential ersätts av 240/290 kr, med hänsyn till cyklisk exponering, servicebuffert, balansräkning och ej bekräftade teser.", claimIds: ["VOLVO-D-004", "VOLVO-D-005", "VOLVO-D-007", "VOLVO-N-002"], changedBy: "Codex", changedAt: "2026-08-17" },
  ],
} as const;
