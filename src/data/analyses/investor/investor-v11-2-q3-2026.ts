/**
 * Investor AB — v11.2 NAV_DISCOUNT canonical research dossier.
 * DRAFT / NOT_PUBLISH_READY. Generated 2026-10-16.
 * Never replace the legacy investor-ab analysis until editorial sign-off.
 * All published figures derive from this file, never from the presentation.
 */
import { buildInvestorForecast, investorDiscountStats, investorDividendSchedule, investorHistoricalDiscounts, investorResearchSources } from "./investor-research-v11-2-2026";

export const investorV112 = (() => {
  const sources = {
    market: { id:"INVE_B_2026_10_16",label:"Investor B – stängningskurs 16 oktober 2026",issued:"2026-10-16",periodEnd:"2026-10-16",url:investorResearchSources.price,locations:"Historical stock price, 16 October",classification:"SECONDARY" },
    dividend: { id:"INVESTOR_AGM_2026",label:"Investor – årsstämman 7 maj 2026, beslutad utdelning",issued:"2026-05-07",periodEnd:"2026-11-12",url:investorResearchSources.dividend,locations:"Utdelning 5,60 kr; 1,60 kr i november 2026",classification:"PRIMARY" },
    eqtTransaction: { id:"INVESTOR_EQT_POSTBALANCE_2026",label:"Investor köper EQT-aktier från Wallenberg Investments",issued:"2026-10-16",periodEnd:"2026-10-16",url:investorResearchSources.postBalance,locations:"Pressmeddelande 16 oktober 2026",classification:"PRIMARY" },
    historical: { id:"INVESTOR_HISTORICAL",label:"Investor – finansiella data/årsrapporter",issued:"2026-10-17",periodEnd:"2026-09-30",url:investorResearchSources.history,locations:"Kvartalsslut, jämförbara definierade justerade NAV och börsvärden; historiskt källregister",classification:"PRIMARY" },
    q3: {
      id: "INVESTOR_Q3_2026",
      label: "Investor AB – Interim Management Statement January–September 2026",
      issued: "2026-10-16",
      periodEnd: "2026-09-30",
      url: "https://attachment.news.eu.nasdaq.com/a44d54330fb24dadda116fabd09d0ac01",
      locations: "s. 2 (financial information), s. 4 (NAV-uppställning)",
      classification: "PRIMARY",
    },
    q2: {
      id: "INVESTOR_Q2_2026",
      label: "Investor AB – Interim report January–June 2026",
      issued: "2026-07-16",
      periodEnd: "2026-06-30",
      url: "https://attachment.news.eu.nasdaq.com/a9787a85fa3ab61bd444ea10dd512a474",
      locations: "s. 2 (financial information), s. 4 (NAV-uppställning)",
      classification: "PRIMARY",
    },
  } as const;

  const claims = [
    { id: "F01", kind: "FACT", statement: "Justerat NAV per aktie Q3: 411 SEK", value: 411, unit: "SEK/share", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Financial information", period: "2026-09-30" },
    { id: "F02", kind: "FACT", statement: "Justerat NAV per aktie Q2: 397 SEK", value: 397, unit: "SEK/share", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Financial information", period: "2026-06-30" },
    { id: "F03", kind: "FACT", statement: "Q3 redovisat NAV per aktie: 359 SEK", value: 359, unit: "SEK/share", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Financial information", period: "2026-09-30" },
    { id: "F04", kind: "FACT", statement: "Q2 redovisat NAV per aktie: 354 SEK", value: 354, unit: "SEK/share", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Financial information", period: "2026-06-30" },
    { id: "F05", kind: "FACT", statement: "Q3 aktiekurs Investor B på balansdagen: 405,80 SEK", value: 405.8, unit: "SEK/share", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Share price (B-share)", period: "2026-09-30" },
    { id: "F06", kind: "FACT", statement: "Q2 aktiekurs Investor B på balansdagen: 402,55 SEK", value: 402.55, unit: "SEK/share", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Share price (B-share)", period: "2026-06-30" },
    { id: "F07", kind: "FACT", statement: "Justerat NAV Q3: 1 258 016 MSEK", value: 1258016, unit: "MSEK", sourceId: "INVESTOR_Q3_2026", locator: "s. 2 och 4", period: "2026-09-30" },
    { id: "F08", kind: "FACT", statement: "Justerat NAV Q2: 1 214 733 MSEK", value: 1214733, unit: "MSEK", sourceId: "INVESTOR_Q2_2026", locator: "s. 2 och 4", period: "2026-06-30" },
    { id: "F09", kind: "FACT", statement: "Patricia Industries totalavkastning Q3: +15 %", value: 15, unit: "%", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F10", kind: "FACT", statement: "Patricia Industries totalavkastning Q2: −3 %", value: -3, unit: "%", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Highlights", period: "2026-Q2" },
    { id: "F11", kind: "FACT", statement: "Patricias större dotterbolag: justerad EBITA-tillväxt Q3 +26 %", value: 26, unit: "% y/y", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F12", kind: "FACT", statement: "Patricias större dotterbolag: justerad EBITA-tillväxt Q2 +16 %", value: 16, unit: "% y/y", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Highlights", period: "2026-Q2" },
    { id: "F13", kind: "FACT", statement: "EQT-värdeförändring Q3: +7 %", value: 7, unit: "%", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F14", kind: "FACT", statement: "EQT-värdeförändring Q2: −2 %", value: -2, unit: "%", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Highlights", period: "2026-Q2" },
    { id: "F15", kind: "FACT", statement: "Q3 skuldsättningsgrad: 1,8 %", value: 1.8, unit: "%", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-09-30" },
    { id: "F16", kind: "FACT", statement: "Q2 skuldsättningsgrad: 1,9 %", value: 1.9, unit: "%", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Highlights", period: "2026-06-30" },
    { id: "F17", kind: "FACT", statement: "Patricia större dotterbolags organiska tillväxt i konstant valuta Q3: 7 %", value: 7, unit: "% y/y", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F18", kind: "FACT", statement: "Mölnlyckes organiska omsättningstillväxt Q3: 5 %", value: 5, unit: "% y/y", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F19", kind: "FACT", statement: "Andel av totala justerade tillgångar: noterade innehav 74 %, Patricia 19 %, EQT 7 %", value: [74,19,7], unit: "%", sourceId: "INVESTOR_Q3_2026", locator: "s. 4, Net asset value overview", period: "2026-09-30" },
    { id: "F20", kind: "FACT", statement: "Justerat NAV, 5-årig annualiserad total utveckling inklusive återlagd utdelning: 15,6 %", value: 15.6, unit: "%/year", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Overview performance", period: "5 years to 2026-09-30" },
    { id: "F21", kind: "FACT", statement: "Investor B totalavkastning Q3: +1 %", value: 1, unit: "%", sourceId: "INVESTOR_Q3_2026", locator: "s. 2, Highlights", period: "2026-Q3" },
    { id: "F22", kind: "FACT", statement: "Investor B totalavkastning Q2: +15 %", value: 15, unit: "%", sourceId: "INVESTOR_Q2_2026", locator: "s. 2, Highlights", period: "2026-Q2" },
    { id:"F23",kind:"FACT",statement:"Investor B slutkurs 16 oktober 2026: 422,60 kr",value:422.6,unit:"SEK/share",sourceId:"INVE_B_2026_10_16",locator:"Historical Price 2026-10-16",period:"2026-10-16" },
    { id:"F24",kind:"FACT",statement:"Utdelning fastställd till 5,60 kr/aktie 2026, varav 1,60 kr återstår i november",value:1.6,unit:"SEK/share",sourceId:"INVESTOR_AGM_2026",locator:"Utdelning",period:"2026-11-12" },
    { id:"F25",kind:"FACT",statement:"Investor köpte 12,5 miljoner aktier i EQT för 282,70 kr/aktie 16 oktober 2026",value:12500000,unit:"shares",sourceId:"INVESTOR_EQT_POSTBALANCE_2026",locator:"Press release 2026-10-16",period:"2026-10-16" },
    { id:"F26",kind:"FACT",statement:"Investor äger efter affären 14,98 % av EQT AB",value:14.98,unit:"%",sourceId:"INVESTOR_EQT_POSTBALANCE_2026",locator:"Press release 2026-10-16",period:"2026-10-16" },
    { id:"F27",kind:"FACT",statement:"Investor noterade innehav totalavkastning Q3 2026 +1 %",value:1,unit:"%",sourceId:"INVESTOR_Q3_2026",locator:"Highlights",period:"2026-Q3" },
    { id:"F28",kind:"FACT",statement:"Investor Q3 bruttokassa 29 460 MSEK, skuldportföljens genomsnittliga löptid 8,4 år",value:[29460,8.4],unit:"MSEK,years",sourceId:"INVESTOR_Q3_2026",locator:"Highlights",period:"2026-09-30" },
  ] as const;

  const marketReference = { price:422.60,currency:"SEK",asOf:"2026-10-16",sourceId:sources.market.id,claimId:"F23" } as const;
  const valuationDate = "2028-12-31";
  const forecast = buildInvestorForecast({navStart:411,navDate:"2026-09-30",price:marketReference.price,priceDate:marketReference.asOf,valuationDate});
  const { scenarios,weightedFairValue,totalValuePotential,annualizedValuePotential,years } = forecast;
  const startingNav = 411;
  const navDelta = 411 - 397;
  const navDeltaPct = navDelta / 397 * 100;
  const discountQ2 = (1 - 402.55 / 397) * 100; // B-share diagnostic; NOT official A+B discount.
  const discountQ3 = (1 - 405.8 / 411) * 100; // B-share diagnostic; NOT official A+B discount.
  const discountABQ2 = (1-1225307/1214733)*100;
  const discountABQ3 = (1-1234030/1258016)*100;

  return {
    analysisId: "investor-ab-v11-2-q3-2026",
    companyId: "INVESTOR_AB",
    ticker: "INVE-B.ST",
    version: { versionId: "INVESTOR_2026Q3_V11_2_DRAFT_002", parentVersionId: "INVESTOR_2026Q3_V11_2_DRAFT_001", immutable: true, createdAt: "2026-10-16", status: "NOT_PUBLISH_READY" },
    templateVersion: "11.2",
    analysisDate: "2026-10-17",
    sourceCutoffDate: "2026-10-17",
    valuationModelType: "NAV_DISCOUNT",
    valuationDate,
    marketReference,
    sourceRefs: sources,
    claims,
    snapshot: { navQ2: 397, navQ3: 411, reportedNavQ2: 354, reportedNavQ3: 359, navDelta, navDeltaPct, discountQ2, discountQ3, discountABQ2, discountABQ3, currentBPremiumVsStaleNav:(marketReference.price/411-1)*100, totalNavMsekQ2: 1214733, totalNavMsekQ3: 1258016, patrQ2: -3, patrQ3: 15, patrEbitaQ2: 16, patrEbitaQ3: 26, eqtQ2: -2, eqtQ3: 7, leverageQ2: 1.9, leverageQ3: 1.8, historicNavReturn5y: 15.6 },
    valuation: {
      ...forecast,
      scenarios,
      years,
      startingNav,
      weightedFairValue,
      totalValuePotential,
      annualizedValuePotential,
      probabilitySum: forecast.probabilitySum,
      valuationChain: ["Justerat NAV 30/9", "Viktad avkastning för Noterade/Patricia/EQT", "Central kostnad och nettobelåning", "Prognostiserade utdelningar", "Slutrabatt eller premie", "Slutkurs och totalavkastning"],
      priceReturnExcludesFutureDividends: true,
      portfolioNavPathAssumesFutureNavGrowthAfterDistribution: true,
      isAnalystAssumption: true,
      dividendSchedule:investorDividendSchedule,
      dividendCashNote:"Antagna framtida utdelningar 2027–2028 behandlas som kontantutdelning utan återinvestering; den faktiskt beslutade novemberutdelningen 2026 inkluderas.",
      methodWarning:"Tillgångsgruppernas avkastning, central drag och framtida utdelningar är preliminära redaktionella antaganden. Ingen full bolagsvis kassaflödesprognos.",
    },
    discountHistory:{...investorDiscountStats,definition:investorHistoricalDiscounts.definition,verification:investorHistoricalDiscounts.verification,periodStatsNotDaily:true},
    disclosure:{postBalanceEqt:{shares:12500000,price:282.7,considerationSek:12500000*282.7,ownershipPercent:14.98,sourceId:sources.eqtTransaction.id,claimIds:["F25","F26"]},
      navDefinition:"Justerat NAV inkluderar estimerade marknadsvärden för större Patricia-innehav; redovisat NAV följer redovisningsprinciper för dessa och får inte tolkas som samma värdebegrepp.",
      officialDiscountDefinition:"1 - börsvärde för A+B / justerat NAV vid samma balansdag",
      shareholderDiscountDefinition:"1 - B-aktiens slutkurs / avrundat justerat NAV per aktie vid samma balansdag"},

    editorial: {
      recommendation: "BEVAKA",
      risk: "MEDEL_HÖG",
      recommendationRationale:"Bevaka preliminärt: sannolikhetsvägt terminalvärde och kontantutdelningar måste väga upp en negativ bear-svans, värderingsrisk och skillnader mellan dagens kurs och balansdagens NAV. Varken köp-/säljzon eller regelbaserad rekommendation är godkänd.",
      riskRationale:"Brett noterade innehav men aktiemarknadsrisk, modellosäkerhet i Patricia, EQT- och valutaexponering samt substansrabattens samvariation. Bear-nedsida ska visas öppet.",
      approval: "DRAFT",
      investmentQuestion: "Kan Investor fortsätta skapa substansvärdestillväxt utan att värderingen av onoterade tillgångar och minskande rabatt urholkar säkerhetsmarginalen?",
      insight: "Under Q3 bidrog Patricia starkt till NAV-ökningen, samtidigt som Noterade Bolag utgör störst del av tillgångarna. För framtida avkastning är samspelet mellan portföljernas intjäningsförmåga, framtida utdelningar och substansrabatt viktigare än ett enskilt kvartal.",
      thesis: [
        { id: "T01", status: "På väg", name: "Patricia skapar uthållig operativ värdetillväxt", evidence: "Justerad EBITA-tillväxt steg från 16 % i Q2 till 26 % i Q3, medan 7 % organisk tillväxt i konstant valuta rapporterades för Q3.", next: "Q4: tillväxt, marginal och kassagenerering, separat från multipelförändringar.", claimIds: ["F11","F12","F17"] },
        { id: "T02", status: "På väg", name: "Diversifiering stabiliserar substansvärdet", evidence: "Patricia avkastade +15 % i Q3 mot −3 % i Q2; EQT-värdeförändring var +7 % mot −2 %.", next: "Q4: fortsatt balans mellan noterade innehav, Patricia och EQT.", claimIds: ["F09","F10","F13","F14"] },
        { id: "T03", status: "Utmanad", name: "Värderingen erbjuder uthållig säkerhetsmarginal", evidence: "Vid Q3:s balansdag gav B-aktiens kurs 1,3 % rabatt mot avrundat NAV, men A+B-börsvärdet gav 1,9 % rabatt. Den senaste kursen 16/10 ligger över rapporterat NAV, vilket inte är aktuellt NAV.", next: "Vid nästa rapport: uppdaterad officiell A+B-rabatt, NAV-utfall samt jämförelse mot motiverat rabattintervall. Tes omprövas om rabatt och NAV faller utanför Base-banden.", claimIds: ["F01","F05"] },
      ],
      nextCheckpoint: { date: "2027-01-22", label: "Bokslut 2026", sourceId: "INVESTOR_Q2_2026", detail: "Datum enligt tidigare rapportens kalender; kontrollera på Investor innan publicering." },
    },
    changeTracking: [
      { eventId: "EV2026Q3", comparedTo: "2026-Q2", type: "FACT_DELTA", claimIds: ["F01","F02","F09","F10","F11","F12","F13","F14","F15","F16"], summary: "Q2→Q3: NAV 397→411, Patricia −3→+15, justerad EBITA-tillväxt 16→26, EQT −2→+7, skuld 1,9→1,8." },
      { eventId: "MODEL_INITIAL", comparedTo: null, type: "ASSUMPTION", summary: "Ny separat NAV_DISCOUNT-modell; gamla Investor-analysens P/E och scenarier återanvänds inte." },
      { eventId:"MODEL_002",comparedTo:"INVESTOR_2026Q3_V11_2_DRAFT_001",type:"MODEL_REVISION",summary:"Fem AI-granskningar utvärderade. Modell ombyggd med noterade/Patricia/EQT-tillgångsavkastning, NAV-avdrag för framtida kontantutdelning, daterad 16/10-kurs, framtida TSR och historisk rabattkalibrering. Nya antaganden, fortsatt NOT_PUBLISH_READY." },
    ],
    publicationBlocks: { public: ["snapshot","drivers","insight","theses","scenarios","next_report","sources","method"], member: ["exact_assumptions","valuation_bridge"], futurePremium: [] },
    interactiveValuation: "UNSUPPORTED",
    interactiveReason: "Inget granskat NAV-rabatt/premie-labb är implementerat i v11.2.",
    riskRewardZones: { status: "NOT_APPLICABLE", visibility: "MEMBER", reason: "Ingen godkänd historiskt kalibrerad NAV-värdering och ingen försvarbar zonindelning före kvalitetsgranskning." },
    disclaimer: { centralVersion: "REQUIRES_SITE_CONFIRMATION", shortText: "Informationen är allmän information, inte personlig investeringsrådgivning. Investeringar innebär risk och du kan förlora hela eller delar av ditt kapital. Historisk avkastning är ingen garanti för framtida avkastning.", url: "/villkor" },
    publishGates: { sources: true, navModelMath: Math.abs(scenarios.reduce((a, s) => a + s.probability, 0) - 1) < 1e-10, discountHistoryCalibrated: false, completePrimaryReportReconciled: false, bottomUpOperatingModelsValidated:false, historicalSeriesFullyReconciled:false, riskDecisionThresholdsApproved:false, fullDividendCoverageValidated:false, centralDisclaimerVerified: false, memberAccessVerified: false },
  } as const;
})();
