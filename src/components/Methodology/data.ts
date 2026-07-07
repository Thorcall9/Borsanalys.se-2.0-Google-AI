export interface MethodologyStep {
  id: string; // I - VII
  title: string;
  summary: string;
  points: string[];
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: "I",
    title: "Företagsöversikt",
    summary: "Vi analyserar affärsidén, ledningens historik och ägarstruktur för att säkerställa att bolaget drivs av rätt personer med rätt incitament.",
    points: [
      "Hur tjänar bolaget sina pengar?",
      "Finns en historik av värdeskapande kapitalallokering?",
      "Är incitamentsstrukturerna i linje med aktieägarnas mål?"
    ]
  },
  {
    id: "II",
    title: "Affärsmodell",
    summary: "En djupgående genomgång av intäktsmodellen, kostnadsdrivarna och hur skalbar och kapitallätt verksamheten är.",
    points: [
      "Är intäktsmodellen återkommande och förutsägbar?",
      "Hur kapitalintensiv är tillväxten?",
      "Kan marginaler förbättras med ökad skala?"
    ]
  },
  {
    id: "III",
    title: "Konkurrensfördelar",
    summary: "Bedömning av bolagets vallgravar och strukturella moat. Hur skyddad är vinstmaskinen mot nya utmanare och prispress?",
    points: [
      "Har bolaget strukturell pricing power?",
      "Bygger vinsterna på nätverkseffekter eller skalfördelar?",
      "Hur ser hotbilden ut från disruptiva konkurrenter?"
    ]
  },
  {
    id: "IV",
    title: "Finansiell Utveckling",
    summary: "En stenhård genomgång av siffrorna: tillväxt, kassaflöde och vinstkvalitet. Vi ser bortom redovisningskosmetik och letar efter varningsflaggor.",
    points: [
      "Är tillväxten organisk och bevisat lönsam?",
      "Hur stark är FCF-konverteringen relativt redovisad vinst?",
      "Finns det dolda skulder eller aggressiv bokföring?"
    ]
  },
  {
    id: "V",
    title: "Fundamental Värdering",
    summary: "Är aktien objektivt billig eller dyr? Vi modellerar tre scenarier (Bull/Base/Bear) och beräknar kurszoner för 12 månader och 5 år.",
    points: [
      "Vad ger normaliserat P/E och EV/EBIT för kursmål?",
      "Vilken CAGR prisar dagens kurs in?",
      "Var ligger köpvärd zon med tillräcklig säkerhetsmarginal?"
    ]
  },
  {
    id: "VI",
    title: "Potentiella Kursdrivare",
    summary: "Identifiering av konkreta katalysatorer och triggers. Vi letar efter asymmetriska händelser som kan driva kursen på 12–24 månaders sikt.",
    points: [
      "Vilka rapporter eller lanseringar kan flytta aktien?",
      "Vad säger analytikerkonsensus och insidertransaktioner?",
      "Finns M&A-optioner eller nya geografier att expandera till?"
    ]
  },
  {
    id: "VII",
    title: "Riskprofil",
    summary: "Vi stress-testar caset och letar efter det som kan gå fel – från branschspecifika hot till makroekonomiska fallgropar och finansiella risker.",
    points: [
      "Vad är worst-case-scenariot för kärnaffären?",
      "Finns farlig kund- eller geografikoncentration?",
      "Hur motståndskraftigt är bolaget mot ränte- och valutatryck?"
    ]
  },
  {
    id: "VIII",
    title: "Verdict",
    summary: "Här sammanställs de 7 dimensionerna till en totalpoäng. Vår algoritm utmynnar i ett konkret investeringsutlåtande.",
    points: [
      "Viktning av fundamental vs teknisk data",
      "Beräkning av asymmetrisk risk/reward",
      "Generering av slutlig rating"
    ]
  },
  {
    id: "IX",
    title: "Scenarios",
    summary: "Sannolikhetsviktad förväntad avkastning visualiserad genom tre marknadsklimat.",
    points: [
      "Bull Case: Optimistiska tillväxtantaganden",
      "Base Case: Mest troliga utveckling",
      "Bear Case: Worst-case scenarion"
    ]
  }
];
