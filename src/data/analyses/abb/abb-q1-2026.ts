import { AnalysisData } from "../../../types/analysis.js";

export const abb2026: AnalysisData = {
  slug: "abb-q1-2026",
  title: "ABB Ltd",
  listTitle: "ABB Ltd - Q1 2026",
  ticker: "ABB.ST",
  deepDiveComponent: "ABB" as any,
  market: "NASDAQ STOCKHOLM LARGE CAP",
  sector: "Industrivaror & Tjänster",
  recommendation: "BEVAKA",
  price: "991 kr",
  pe: "38.66",
  yield: "0.0112",
  marketCap: "1 778 mdkr",
  date: "2026-06-16",
  summary:
    "Schweizisk-svensk elektrifierings- och automationsjätte med rekordorderingång och strukturell medvind från AI-datacenter och elnätsuppgraderingar. P/E på 38,7x är 44 % över historiskt snitt - konsensus redan inprisat. Bevaka till bättre ingångspris.",

  investmentCase:
    "ABB är exponerat mot tre av de starkaste industriella megatrenderna: AI-infrastruktur, elektrifiering och energieffektivisering. Electrification-segmentet, som står för cirka 60 % av orderingången, växte 44 % jämförbart i Q1 2026.",

  financialAnalysis:
    "Omsättning 2025 (SEK): 324 206 Mkr (-7,3 % pga valuta; rekordår i USD). TTM: 336 545 Mkr. EBIT TTM: 57 354 Mkr (marginal 17,0 %). ROE: 29 %. ROCE: 27,2 %. Nettoskuld/EBITDA: 0,3x.",

  valuation:
    "P/E 38,7x vs historiskt snitt 26,9x (+44 % premie). EV/EBITDA 21,3x. EV/EBIT 24,3x. Direktavkastning 1,12 %. Konsensus EPS 2026e 31,37 SEK x forward P/E 31,6x = 991 SEK - ingen uppsida på konsensus.",

  risks: [
    "Värdering: P/E 38,7x är 44 % över historiskt snitt - multipelkompression om tillväxten normaliseras",
    "Engångsjusterad marginal: 2,5 pp av Q1-marginalen kom från fastighetsvinster - underliggande ca 21 %",
    "Valutarisk: SEK-omsättningen föll 7,3 % 2025 trots rekordresultat i USD",
    "Bruttomarginalpress: -2,9 pp i Q1 på grund av orealiserade FX- och råvaruhedgar",
    "Cyklicitet: Motion och Automation exponerade mot industrikonjunktur",
    "Datacenterberoende: Electrification drivs till stor del av AI-investeringar",
    "Gamesa-utspädning: Förvärvet är marginalutspädande under hela 2026",
    "Robotics-avyttring: Förändrar segmentstrukturen H2 2026",
  ],

  conclusion:
    "ABB är ett kvalitetsbolag med strukturell medvind men ett högt pris. Baskursen (878 SEK) ligger under nuläget. Bevaka till 800-850 SEK eller tills uthållig marginal >22 % utan engångsstöd bekräftas.",

  geography: "Global - EMEA, Asien-Stillahavsregionen, Nord- och Sydamerika",
  employees: "105 000+",
  managementOverview:
    "VD Morten Wierod. Fokus på kärnverksamhet, disciplinerad kapitalallokering och ökad förvärvstakt.",
  ownershipStructure:
    "Spritt ägande. Cevian Capital, BlackRock och Fidelity bland de större institutionella ägarna.",

  strengths: [
    "Global marknadsledare inom elektrifiering och automation",
    "Orderbok på 27,5 md USD (+22 % jämförbart) - mer än 1 års omsättning",
    "ROCE 27,2 % och nettoskuld/EBITDA 0,3x - exceptionell balansräkning",
    "Strukturell medvind: AI-datacenter, elnätsuppgraderingar, e-mobilitet",
  ],
  weaknesses: [
    "P/E 38,7x ger minimal säkerhetsmarginal vid normalisering",
    "Bruttomarginalen sjönk 2,9 pp i Q1 - kostnadstryck under ytan",
    "Direktavkastning 1,12 % - oattraktiv för utdelningsinvesterare",
    "SEK-omsättning volatil pga USD-rapportering",
  ],
  opportunities: [
    "Fortsatt acceleration av datacenter- och elnätsinvesteringar globalt",
    "Marginalexpansion om Gamesa-integration lyckas",
    "Förvärvskapacitet vid nettoskuld/EBITDA 0,3x",
    "Robotics-avyttring frigör fokus och kapital",
  ],
  threats: [
    "Avmattning i AI-capex slår direkt mot Electrification",
    "Geopolitik och handelstullar stör leveranskedjor",
    "Konkurrens från Siemens, Schneider, Eaton",
    "Kronförstärkning ger negativa SEK-translationseffekter",
  ],

  scenarios: [
    {
      type: "bull",
      label: "Bull",
      value: "1 208 SEK",
      change: "+22 %",
      probability: "25 %",
      description:
        "EPS 34,51 SEK (+10 % vs konsensus) x P/E 35x. Electrification behåller tvåsiffrig ordertillväxt och marginal >22 % utan engångsstöd bekräftas.",
    },
    {
      type: "base",
      label: "Bas",
      value: "878 SEK",
      change: "-11 %",
      probability: "50 %",
      description:
        "EPS 31,37 SEK (konsensus) x P/E 28x. P/E normaliseras mot historiken. Bra bolag men avkastningen styrs av ingångsvärderingen.",
    },
    {
      type: "bear",
      label: "Bear",
      value: "587 SEK",
      change: "-41 %",
      probability: "25 %",
      description:
        "EPS 26,66 SEK (-15 % vs konsensus) x P/E 22x. Cyklisk press på Motion/Automation, marginalpress och multipelkompression mot historisk bottennivå.",
    },
  ],

  totalScore: "25.5",
  rating: "73",
  targetPrice: "878",
  buyZone: "800-850 SEK",
};
