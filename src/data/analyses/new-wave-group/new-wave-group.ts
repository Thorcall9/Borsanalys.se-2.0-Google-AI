import { AnalysisData } from "../../../types/analysis";

export const newWaveGroup: AnalysisData = {
  slug: "new-wave-group",
  title: "New Wave Group",
  ticker: "NEWA-B.ST",
  market: "Large Cap Stockholm",
  sector: "Sällanköpsvaror",
  recommendation: "KÖP",
  price: "116,40 kr",
  pe: "15.2",
  yield: "2,6%",
  marketCap: "15,4 Bkr",
  summary: "New Wave Group är en tillväxtmaskin som under Torsten Janssons ledning har förvandlats från ett svenskt profilbolag till en global utmanare inom sport, fritid och gåvor. Med varumärken som Craft och Cutter & Buck i spetsen, och en aggressiv satsning på Teamwear i USA, står bolaget inför en ny fas av expansion. Värderingen ser attraktiv ut givet historisk lönsamhet och framtida tillväxtpotential.",
  businessModel: "Koncernen designar, förvärvar och utvecklar varumärken inom profilsektorn och detaljhandelsmarknaden. Strategin bygger på att kontrollera hela kedjan från design till distribution, med fokus på att bygga starka marknadspositioner genom både organisk tillväxt och strategiska förvärv. Verksamheten är uppdelad i tre segment: Företag, Sport & Fritid samt Gåvor & Heminredning.",
  date: "2026-04-10",
  investmentCase: "Investeringscaset i New Wave vilar på tre pelare: 1) Den enorma potentialen i Teamwear-satsningen i USA, 2) Skalfördelar i logistik och inköp som driver marginaler, och 3) En historiskt skicklig ledning med Torsten Jansson som huvudägare. Bolaget har visat prov på extrem resiliens och förmåga att vinna marknadsandelar även i tuffare konjunkturer.",
  marketOverview: "Marknaden för profilkläder och sportutrustning i USA är mångdubbelt större än den europeiska. New Wave har genom förvärvet av Cutter & Buck fått en perfekt plattform för att rulla ut Craft i Nordamerika. Inom sportsegmentet ser vi en strukturell trend mot mer aktiv livsstil vilket gynnar varumärken med hög funktionalitet.",
  growth: "Tillväxtmålet är 10-20% per år, varav hälften ska vara organisk. Under 2025 passerade man 10 miljarder i omsättning. Framöver är det främst USA-expansionen och en starkare digital närvaro som ska driva siffrorna. Förvärv förblir en central del av DNA:t för att addera nya produktkategorier eller geografier.",
  financialAnalysis: "New Wave har de senaste åren lyft sin rörelsemarginal till nivåer över det historiska snittet, drivet av bättre produktmix och effektivare lagerhantering. Soliditeten är stark (över 50%), vilket ger utrymme för fortsatta förvärv. Kassaflödet är säsongsbetonat men stabilt över tid.",
  competitiveAdvantages: [
    "Stark ägarledd kultur med Torsten Jansson i spetsen",
    "Djup vertikal integration i distributionskedjan",
    "Bred portfölj av komplementära varumärken (Craft, Cutter & Buck, Sagaform)",
    "Betydande skalfördelar inom logistik och inköp",
    "Etablerad plattform i USA för vidare expansion"
  ],
  risks: [
    "Beroende av konsumenternas och företagens inköpsvilja",
    "Råvaru- och fraktkostnadsfluktuationer",
    "Valutarisk (särskilt USD/SEK)",
    "Hög lagernivå som krävs för god servicegrad binder kapital"
  ],
  valuation: "Vid nuvarande kurs handlas New Wave till ett P/E-tal runt 15, vilket är i linje med historiska snitt men attraktivt givet den högre lönsamhetsnivå bolaget nu opererar på. Direktavkastningen på ca 2,6% kryddas av goda utsikter för utdelningstillväxt.",
  conclusion: "Vi ser New Wave Group som ett högkvalitativt tillväxtbolag med en tydlig väg framåt. Kombinationen av stark ledning, internationell expansion och en rimlig värdering gör att vi sätter en köprekommendation med sikte på fortsatt överavkastning.",
  esg: "Bolaget arbetar aktivt med hållbarhet genom 'New Wave Group Sustainability', med fokus på klimatpåverkan i produktion och kemikaliehantering. Man är medlem i Amfori BSCI för att säkerställa goda arbetsvillkor i leverantörsledet.",
  aiObservations: "Operativa data visar på en gradvis förbättring av lagereffektiviteten genom AI-driven prognostisering. USA-marknaden visar tidiga tecken på att Craft vinner mark hos större idrottsförbund.",
  employees: "ca 2 500",
  geography: "Global närvaro med huvudkontor i Kosta, Sverige. Största marknader är USA och Norden.",
  managementOverview: "Torsten Jansson — Grundare och CEO: En av Sveriges mest välrenommerade entreprenörer. Göran Härstedt — Vice CEO: Lång erfarenhet av strategiska förvärv inom koncernen.",
  ownershipStructure: "Torsten Jansson är majoritetsägare via bolag, vilket garanterar en långsiktighet och stark linjering med aktieägarnas intressen.",
  strengths: [
    "Extremt stark entreprenörsdriven ledning",
    "Världsledande funktionsvarumärken som Craft",
    "Stark balansräkning för M&A",
    "Hög leveransprecision tack vare bra lagerstyrning"
  ],
  weaknesses: [
    "Exponering mot sårbar detaljhandel i vissa segment",
    "Hög kapitalbindning i lager",
    "Tidigare beroende av specifika distributionskontrakt"
  ],
  opportunities: [
    "Skalning av Teamwear-konceptet i Nordamerika",
    "Digital direktförsäljning (D2C) ökar marginaler",
    "Ytterligare förvärv inom sportsegmentet"
  ],
  threats: [
    "Fördjupad lågkonjunktur som dämpar företagsgåvor",
    "Intensiv konkurrens från globala jättar som Nike/Adidas",
    "Logistikstörningar i globala flöden"
  ],
  scenarios: [
    { label: "Bull Case", value: "165 kr", change: "+42%", type: "bull", description: "Snabbare genombrott i USA och Craft blir marknadsledande inom Teamwear." },
    { label: "Base Case", value: "135 kr", change: "+16%", type: "base", description: "Stabil tillväxt enligt mål och bibehållna marginaler." },
    { label: "Bear Case", value: "90 kr", change: "-23%", type: "bear", description: "Svag konsumtion och marginalpress pga ökad konkurrens." },
  ],
  scores: {
    affarsmodell: 5,
    strategiskMoat: 4,
    finansiellKvalitet: 4,
    vardering: 4,
    tillvaxtutsikter: 5,
    riskprofil: 3,
    esgMakro: 3,
    aiObservationer: 4
  },
  deepDiveComponent: "NewWave"
};
