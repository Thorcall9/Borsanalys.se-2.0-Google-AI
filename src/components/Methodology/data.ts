export interface MethodologyStep {
  id: string;
  title: string;
  summary: string;
  points: string[];
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: "I",
    title: "Företagsöversikt",
    summary: "Vi börjar med bolagets position, nisch, ägarbild och övergripande kvalitet innan siffrorna vägs in.",
    points: [
      "Är bolaget begripligt och tydligt positionerat?",
      "Finns nettokassa, historik och styrning som stödjer caset?",
      "Är kvaliteten tillräckligt hög för att motivera fortsatt analys?"
    ]
  },
  {
    id: "II",
    title: "Affärsmodell",
    summary: "Vi bedömer hur bolaget tjänar pengar, hur kapitallätt modellen är och hur stabil intäktsbasen framstår.",
    points: [
      "Är modellen skalbar utan tung kapitalbindning?",
      "Finns lojal kundbas och återkommande köpbeteende?",
      "Saknas kontrakterade intäkter eller andra stabiliserande mekanismer?"
    ]
  },
  {
    id: "III",
    title: "Konkurrensfördelar",
    summary: "Vi prövar om varumärke, kunddata, distribution och direktkundsrelation skapar ett verkligt försvar.",
    points: [
      "Har bolaget en differentierad position i sin nisch?",
      "Ger D2C-modellen data- och marginalfördelar?",
      "Är konkurrensfördelarna starka nog när tillväxten bromsar?"
    ]
  },
  {
    id: "IV",
    title: "Finansiell utveckling",
    summary: "Vi analyserar marginaler, kassaflöde, balansräkning och om vinsten backas upp av verklig kassagenerering.",
    points: [
      "Är bruttomarginal och rörelsemarginal fortsatt starka?",
      "Konverteras vinsten till fritt kassaflöde?",
      "Finns lager- eller rörelsekapitalrisk som försvagar kvaliteten?"
    ]
  },
  {
    id: "V",
    title: "Fundamental värdering",
    summary: "Vi jämför kursen med 12-månadersankare, multiplar och 5-årig känslighet för att se om säkerhetsmarginalen räcker.",
    points: [
      "Är dagens P/E rimligt mot tillväxttakten?",
      "Hur ser Base-case ut mot aktuell kurs?",
      "Krävs multipelåterhämtning för acceptabel avkastning?"
    ]
  },
  {
    id: "VI",
    title: "Potentiella kursdrivare",
    summary: "Vi identifierar konkreta triggers som kan flytta caset från kvalitet till tydligare uppsida.",
    points: [
      "Kan lokal valutatillväxt återaccelerera över 10 %?",
      "Kan kursen falla till en nivå med bättre säkerhetsmarginal?",
      "Finns marginal-, lager- eller återköpssignaler som stärker tesen?"
    ]
  },
  {
    id: "VII",
    title: "Risker",
    summary: "Vi stressar de viktigaste riskerna: värdering, DACH-inbromsning, lager, valuta och exekvering.",
    points: [
      "Vad händer om DACH fortsätter bromsa?",
      "Hur känslig är aktien för multipelkontraktion?",
      "Finns operativa risker som kan urholka kassaflödet?"
    ]
  },
  {
    id: "VIII",
    title: "Verdict",
    summary: "Här sammanställs de sju kategorierna till 25/35 poäng. Slutsatsen blir ett kvalitetscase där värderingen fortfarande kräver disciplin.",
    points: [
      "Kvalitet: stark",
      "Värdering: krävande",
      "Slutsats: bevaka"
    ]
  },
  {
    id: "IX",
    title: "Scenarios",
    summary: "Scenarioanalysen visar hur avkastningen påverkas av multipel, tillväxt och om marknaden accepterar en högre värdering.",
    points: [
      "Bull: multipelåterhämtning",
      "Base: konservativt 12-månadersankare",
      "Bear: lägre multipel"
    ]
  }
];
