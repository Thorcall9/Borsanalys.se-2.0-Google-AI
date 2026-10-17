/**
 * Investor AB / v11.2 – RESEARCH CALIBRATION v2 (2026-10-17)
 * RESEARCH DRAFT. Historical quarterly aggregates imported from internally compiled
 * Investor original reports. Not all older report tables independently re-reconciled.
 * No Montrose/ibindex data or third-party historical database is reproduced.
 *
 * IMPORTANT: Projecting asset returns is NOT forecasting reported NAV per share.
 * The bridge explicitly includes leverage, central cost and cash distributions;
 * future dividend amounts are ASSUMPTIONS, not Investor forecasts.
 */
export const investorHistoricalDiscounts = {
  definition: "1 - totalt börsvärde (A+B) / justerat NAV, samma balansdag",
  source: "Investor AB års-/kvartalsrapporter; originalreferenser i intern historisk arbetsbok",
  sampleFrequency: "Kvartalsslut (5 år) respektive bokslut (10 år)",
  verification: "PARTIAL_SOURCE_RECONCILIATION",
  quarterly: [
    ["2021-09-30",682398,580741,"INV-2021Q3"],
    ["2021-12-31",760962,711230,"INV-2021AR"],
    ["2022-03-31",684107,649333,"INV-2022Q2"],
    ["2022-06-30",610490,534397,"INV-2022Q2"],
    ["2022-09-30",626292,510961,"INV-2022FY"],
    ["2022-12-31",673250,584163,"INV-2022FY"],
    ["2023-03-31",723621,637575,"INV-2023Q2"],
    ["2023-06-30",773060,660496,"INV-2023Q2"],
    ["2023-09-30",760319,639678,"INV-2023FY"],
    ["2023-12-31",818386,712694,"INV-2023FY"],
    ["2024-03-31",915109,819914,"INV-2024Q1"],
    ["2024-06-30",969376,885675,"INV-2024Q2"],
    ["2024-09-30",986271,957246,"INV-DATA"],
    ["2024-12-31",969756,895926,"INV-DATA"],
    ["2025-03-31",944387,913642,"INV-DATA"],
    ["2025-06-30",960650,857021,"INV-DATA"],
    ["2025-09-30",1027960,900334,"INV-DATA"],
    ["2025-12-31",1087082,1009998,"INV-2025AR"],
    ["2026-03-31",1125062,1081360,"INV-2026Q1"],
    ["2026-06-30",1214733,1225307,"INV-2026Q2"],
    ["2026-09-30",1258016,1234030,"INV-2026Q3"],
  ] as const,
  annual: [
    ["2016-12-31",340183,259119,"INV-2017FY"],
    ["2017-12-31",384747,284048,"INV-2021AR"],
    ["2018-12-31",372004,288107,"INV-2021AR"],
    ["2019-12-31",485019,389770,"INV-2021AR"],
    ["2020-12-31",546385,458345,"INV-2021AR"],
    ["2021-12-31",760962,711230,"INV-2021AR"],
    ["2022-12-31",673250,584163,"INV-2025AR"],
    ["2023-12-31",818386,712694,"INV-2025AR"],
    ["2024-12-31",969756,895926,"INV-2025AR"],
    ["2025-12-31",1087082,1009998,"INV-2025AR"],
  ] as const,
};

const toDiscount = (row: readonly [string,number,number,string]) => 1 - row[2] / row[1];
const summarize = (rows: readonly (readonly [string,number,number,string])[]) => {
  const sorted=rows.map(toDiscount).sort((a,b)=>a-b);
  const n=sorted.length;
  const median=n%2?sorted[(n-1)/2]:(sorted[n/2-1]+sorted[n/2])/2;
  return { count:n, average:sorted.reduce((a,b)=>a+b,0)/n,median,
    min:sorted[0], max:sorted[n-1],premiumCount:sorted.filter(x=>x<0).length };
};
const q = investorHistoricalDiscounts.quarterly;
export const investorDiscountStats = {
  threeYears:summarize(q.slice(-13)),
  fiveYears:summarize(q),
  tenYearEnds:summarize(investorHistoricalDiscounts.annual),
  note:"Fem- och treårssiffrorna är kvartalsbaserade; tio år är endast tio årsslut. Ingen daglig percentil kan härledas.",
};
export const investorResearchSources = {
  q3:"https://www.investorab.com/sv/investerare-media/rapporter-presentationer/2026",
  history:"https://www.investorab.com/sv/investerare-media/finansiell-data",
  history2025:"https://mb.cision.com/Main/1084/4327123/4009054.pdf",
  dividend:"https://www.investorab.com/sv/bolagsstyrning/aarsstaemma/aarsstaemma-2026",
  postBalance:"https://news.cision.com/investor/r/investor-acquires-shares-in-eqt-from-wallenberg-investments,c4409702",
  price:"https://stockanalysis.com/quote/sto/INVE.B/history/",
} as const;

const dayYears = (a:string,b:string) =>
  (Date.parse(b+"T00:00:00Z")-Date.parse(a+"T00:00:00Z"))/86400000/365.25;
const discountWeights = { listed:0.74,patricia:0.19,eqt:0.07 } as const;
const leverageReference = 0.018;
const centralAnnualDrag = 0.003; // ASSUMPTION: combined operating/financing drag as share of NAV.
export const investorDividendSchedule = [
  { date:"2026-11-12", amount:1.60, status:"FACT" as const, sourceId:"INVESTOR_AGM_2026" },
  { date:"2027-05-15", amount:4.00, status:"ASSUMPTION" as const, sourceId:"ANALYST_DIVIDEND_ASSUMPTION" },
  { date:"2027-11-12", amount:1.60, status:"ASSUMPTION" as const, sourceId:"ANALYST_DIVIDEND_ASSUMPTION" },
  { date:"2028-05-15", amount:4.00, status:"ASSUMPTION" as const, sourceId:"ANALYST_DIVIDEND_ASSUMPTION" },
  { date:"2028-11-12", amount:1.60, status:"ASSUMPTION" as const, sourceId:"ANALYST_DIVIDEND_ASSUMPTION" },
] as const;
export const investorScenarioInputs = [
  { id:"bear",label:"Bear",probability:0.30, listedReturn:-0.05,patriciaReturn:-0.08,eqtReturn:-0.10,terminalDiscount:0.16,
    rationale:"Pressade börsmultiplar och onoterade värderingar samtidigt som marknadsrabatten normaliseras upp.",
    drivers:["Fallande noterade innehav","Operativ press och omvärdering i Patricia","Rabatten vidgas till 16 %"] },
  { id:"base",label:"Base",probability:0.50, listedReturn:0.08,patriciaReturn:0.10,eqtReturn:0.08,terminalDiscount:0.075,
    rationale:"Måttlig portföljavkastning efter normalisering, plus återgång mot närliggande treårsmedian för rabatten.",
    drivers:["Noterade innehav utvecklas stabilt","Patricia skapar operativt värde utan kraftig multipeluppgång","Slutrabatt 7,5 %"] },
  { id:"bull",label:"Bull",probability:0.20, listedReturn:0.13,patriciaReturn:0.16,eqtReturn:0.15,terminalDiscount:-0.03,
    rationale:"Bred lönsam tillväxt och hög marknadstilltro; en premie på 3 % är ett positivt stressutfall, inte ett historiskt normalutfall.",
    drivers:["Stark noterad portfölj","Uthållig vinst- och kassaflödesökning i Patricia","3 % premie mot justerat NAV"] },
] as const;

export function buildInvestorForecast(args:{ navStart:number,navDate:string,price:number,priceDate:string,valuationDate:string }) {
  const navYears=dayYears(args.navDate,args.valuationDate);
  const priceYears=dayYears(args.priceDate,args.valuationDate);
  const paid=investorDividendSchedule.filter(x=>x.date>args.priceDate && x.date<=args.valuationDate);
  const dividends=paid.reduce((a,b)=>a+b.amount,0);
  const scenarios=investorScenarioInputs.map(input=>{
    const grossAssetReturn=discountWeights.listed*input.listedReturn +
      discountWeights.patricia*input.patriciaReturn + discountWeights.eqt*input.eqtReturn;
    const navTotalReturnCagr=grossAssetReturn/(1-leverageReference)-centralAnnualDrag;
    const navBeforeDividends=args.navStart*Math.pow(1+navTotalReturnCagr,navYears);
    const projectedDistributionDrag=paid.reduce((a,b)=>a+b.amount*Math.pow(1+navTotalReturnCagr,dayYears(b.date,args.valuationDate)),0);
    const projectedNav=navBeforeDividends-projectedDistributionDrag;
    const fairValue=projectedNav*(1-input.terminalDiscount);
    const pricePotential=fairValue/args.price-1;
    const priceCagr=Math.pow(fairValue/args.price,1/priceYears)-1;
    const totalReturnCash=(fairValue+dividends)/args.price-1;
    const annualizedTotalReturnCash=Math.pow((fairValue+dividends)/args.price,1/priceYears)-1;
    return { ...input, kind:"ASSUMPTION" as const, valuationDate:args.valuationDate,
      grossAssetReturn,centralAnnualDrag,navTotalReturnCagr,
      navYears, navBeforeDividends,projectedDistributionDrag,projectedNav,
      fairValue,pricePotential,priceCagr,totalReturnCash,annualizedTotalReturnCash,dividends,
      navCagr:navTotalReturnCagr,
      bridge:"Justerat NAV × (1 + viktad tillgångsavkastning justerad för nettobelåning och central drag)^tid − framtida utdelningar (uppräknat till slutdatum) → slut-NAV × (1 − rabatt/premie)"};
  });
  // Terminal NAV sensitivity is a pure DERIVED bridge; not a trading recommendation.
  const base=scenarios.find(s=>s.id==="base")!;
  const discountSensitivity=[-0.03,0,0.05,0.075,0.10,0.15].map(terminalDiscount=>{
    const terminalPrice=base.projectedNav*(1-terminalDiscount);
    const cashTsr=(terminalPrice+dividends)/args.price-1;
    return {terminalDiscount,terminalPrice,cashTsr,annualizedCashTsr:Math.pow(1+cashTsr,1/priceYears)-1};
  });
  const weightedFairValue=scenarios.reduce((a,b)=>a+b.fairValue*b.probability,0);
  const weightedCashReturn=(weightedFairValue+dividends)/args.price-1;
  return {scenarios,discountSensitivity,weightedFairValue,years:priceYears,navYears,dividends,
    totalValuePotential:weightedFairValue/args.price-1,
    annualizedValuePotential:Math.pow(weightedFairValue/args.price,1/priceYears)-1,
    illustrativeCashTotalReturn:weightedCashReturn,
    illustrativeCashAnnualizedReturn:Math.pow(1+weightedCashReturn,1/priceYears)-1,
    probabilitySum:scenarios.reduce((a,b)=>a+b.probability,0),
    startingNav:args.navStart,terminalMethod:"NAV_DISCOUNT" as const,
    weights:discountWeights,leverageReference,centralAnnualDrag,
    distributionTreatment:"Cash distributions deducted from NAV on each forecast payment date, without reinvestment; timing dates in 2027–2028 are assumptions."};
}
