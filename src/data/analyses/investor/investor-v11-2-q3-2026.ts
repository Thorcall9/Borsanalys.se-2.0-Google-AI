/**
 * Investor AB — v11.2 NAV_DISCOUNT canonical research dossier.
 * DRAFT / NOT_PUBLISH_READY. Generated 2026-10-16.
 * Never replace the legacy investor-ab analysis until editorial sign-off.
 * All published figures derive from this file, never from the presentation.
 */
export const investorV112 = (() => {
  const sources = {
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
  ] as const;

  const marketReference = { price: 405.8, currency: "SEK", asOf: "2026-09-30", sourceId: sources.q3.id, claimId: "F05" } as const;
  const valuationDate = "2028-12-31";
  const years = (Date.parse(valuationDate + "T00:00:00Z") - Date.parse(marketReference.asOf + "T00:00:00Z")) / 86400000 / 365.25;
  const startingNav = 411;
  // Editorial scenario inputs; NOT Investor guidance, and NOT the historical growth figure.
  const rawScenarios = [
    { id: "bear", label: "Bear", probability: 0.30, navCagr: 0.02, terminalDiscount: 0.15, rationale: "Svagt portföljutfall; normaliserad NAV-tillväxt 2 % per år och 15 % substansrabatt." },
    { id: "base", label: "Base", probability: 0.50, navCagr: 0.07, terminalDiscount: 0.07, rationale: "Måttlig NAV-tillväxt 7 % per år med 7 % kvarvarande rabatt." },
    { id: "bull", label: "Bull", probability: 0.20, navCagr: 0.12, terminalDiscount: 0, rationale: "Stark portföljtillväxt 12 % per år och slutvärdering kring NAV." },
  ] as const;

  const scenarios = rawScenarios.map(s => {
    const projectedNav = startingNav * (1 + s.navCagr) ** years;
    return { ...s, valuationDate, projectedNav, fairValue: projectedNav * (1 - s.terminalDiscount), kind: "ASSUMPTION", bridge: "NAV/aktie Q3 × (1 + NAV-CAGR)^år × (1 − slutrabatt)" };
  });
  const weightedFairValue = scenarios.reduce((a, s) => a + s.probability * s.fairValue, 0);
  const totalValuePotential = weightedFairValue / marketReference.price - 1;
  const annualizedValuePotential = (weightedFairValue / marketReference.price) ** (1 / years) - 1;
  const navDelta = 411 - 397;
  const navDeltaPct = navDelta / 397 * 100;
  const discountQ2 = (1 - 402.55 / 397) * 100;
  const discountQ3 = (1 - 405.8 / 411) * 100;

  return {
    analysisId: "investor-ab-v11-2-q3-2026",
    companyId: "INVESTOR_AB",
    ticker: "INVE-B.ST",
    version: { versionId: "INVESTOR_2026Q3_V11_2_DRAFT_001", parentVersionId: null, immutable: true, createdAt: "2026-10-16", status: "NOT_PUBLISH_READY" },
    templateVersion: "11.2",
    analysisDate: "2026-10-16",
    sourceCutoffDate: "2026-10-16",
    valuationModelType: "NAV_DISCOUNT",
    valuationDate,
    marketReference,
    sourceRefs: sources,
    claims,
    snapshot: { navQ2: 397, navQ3: 411, reportedNavQ2: 354, reportedNavQ3: 359, navDelta, navDeltaPct, discountQ2, discountQ3, totalNavMsekQ2: 1214733, totalNavMsekQ3: 1258016, patrQ2: -3, patrQ3: 15, patrEbitaQ2: 16, patrEbitaQ3: 26, eqtQ2: -2, eqtQ3: 7, leverageQ2: 1.9, leverageQ3: 1.8, historicNavReturn5y: 15.6 },
    valuation: {
      scenarios,
      years,
      startingNav,
      weightedFairValue,
      totalValuePotential,
      annualizedValuePotential,
      probabilitySum: scenarios.reduce((a, s) => a + s.probability, 0),
      valuationChain: ["Justerat NAV per aktie", "Scenariobaserad NAV-tillväxt", "Slutrabatt/premie", "Värde per aktie"],
      priceReturnExcludesFutureDividends: true,
      portfolioNavPathAssumesFutureNavGrowthAfterDistribution: true,
      isAnalystAssumption: true,
    },
    editorial: {
      recommendation: "BEVAKA",
      risk: "MEDEL",
      approval: "DRAFT",
      investmentQuestion: "Kan Investor fortsätta skapa substansvärdestillväxt utan att värderingen av onoterade tillgångar och minskande rabatt urholkar säkerhetsmarginalen?",
      insight: "Q3 visar att Patricia åter blivit drivkraft för NAV. För den långsiktiga aktieägaren väger dock kvaliteten i värdeökningen och framtida substansrabatt tyngre än ett enskilt kvartals totalavkastning.",
      thesis: [
        { id: "T01", status: "På väg", name: "Patricia skapar uthållig operativ värdetillväxt", evidence: "Justerad EBITA-tillväxt steg från 16 % i Q2 till 26 % i Q3, medan 7 % organisk tillväxt i konstant valuta rapporterades för Q3.", next: "Q4: tillväxt, marginal och kassagenerering, separat från multipelförändringar.", claimIds: ["F11","F12","F17"] },
        { id: "T02", status: "På väg", name: "Diversifiering stabiliserar substansvärdet", evidence: "Patricia avkastade +15 % i Q3 mot −3 % i Q2; EQT-värdeförändring var +7 % mot −2 %.", next: "Q4: fortsatt balans mellan noterade innehav, Patricia och EQT.", claimIds: ["F09","F10","F13","F14"] },
        { id: "T03", status: "Utmanad", name: "Värderingen erbjuder uthållig säkerhetsmarginal", evidence: "Vid kvartalsslut Q3 var aktiekursen 405,80 kr mot justerat NAV på 411 kr: endast 1,3 % rabatt.", next: "Pröva historiska substansrabatter och konsekvenserna av Patricias värderingsmetod.", claimIds: ["F01","F05"] },
      ],
      nextCheckpoint: { date: "2027-01-22", label: "Bokslut 2026", sourceId: "INVESTOR_Q2_2026", detail: "Datum enligt Q2-rapportens finansiella kalender; kontrollera om datum ändras." },
    },
    changeTracking: [
      { eventId: "EV2026Q3", comparedTo: "2026-Q2", type: "FACT_DELTA", claimIds: ["F01","F02","F09","F10","F11","F12","F13","F14","F15","F16"], summary: "Q2→Q3: NAV 397→411, Patricia −3→+15, justerad EBITA-tillväxt 16→26, EQT −2→+7, skuld 1,9→1,8." },
      { eventId: "MODEL_INITIAL", comparedTo: null, type: "ASSUMPTION", summary: "Ny separat NAV_DISCOUNT-modell; gamla Investor-analysens P/E och scenarier återanvänds inte." },
    ],
    publicationBlocks: { public: ["snapshot","drivers","insight","theses","scenarios","next_report","sources","method"], member: ["exact_assumptions","valuation_bridge"], futurePremium: [] },
    interactiveValuation: "UNSUPPORTED",
    interactiveReason: "Inget granskat NAV-rabatt/premie-labb är implementerat i v11.2.",
    riskRewardZones: { status: "NOT_APPLICABLE", visibility: "MEMBER", reason: "Ingen godkänd historiskt kalibrerad NAV-värdering och ingen försvarbar zonindelning före kvalitetsgranskning." },
    disclaimer: { centralVersion: "REQUIRES_SITE_CONFIRMATION", shortText: "Informationen är allmän information, inte personlig investeringsrådgivning. Investeringar innebär risk och du kan förlora hela eller delar av ditt kapital. Historisk avkastning är ingen garanti för framtida avkastning.", url: "/villkor" },
    publishGates: { sources: true, navModelMath: Math.abs(scenarios.reduce((a, s) => a + s.probability, 0) - 1) < 1e-10, discountHistoryCalibrated: false, completePrimaryReportReconciled: false, centralDisclaimerVerified: false, memberAccessVerified: false },
  } as const;
})();
