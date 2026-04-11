export interface MethodologyStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const methodologySteps: MethodologyStep[] = [
  {
    id: "step-1",
    number: "I",
    title: "Företagsöversikt",
    description: "Vi analyserar affärsmodellen på djupet, utvärderar ledningens historik och säkerställer att ägarstrukturen gynnar långsiktiga aktieägare."
  },
  {
    id: "step-2",
    number: "II",
    title: "Strategisk analys & Moat",
    description: "Bedömning av bolagets vallgravar (Moats) och konkurrensfördelar. Hur skyddad är vinstmaskinen mot nya utmanare?"
  },
  {
    id: "step-3",
    number: "III",
    title: "Finansiell analys",
    description: "En stenhård genomgång av siffrorna: Vinsttillväxt, kassaflöde och balansräkningens styrka. Vi ser bortom redovisningskosmetik."
  },
  {
    id: "step-4",
    number: "IV",
    title: "Värdering & Jämförelse",
    description: "Är aktien billig eller dyr? Vi ställer multiplar som P/E, EV/EBIT och PEG i relation till historiska snitt och konkurrenter."
  },
  {
    id: "step-5",
    number: "V",
    title: "Tillväxtmotorer & Triggers",
    description: "Identifiering av konkreta katalysatorer. Vi letar efter expansion på nya marknader och innovation."
  },
  {
    id: "step-6",
    number: "VI",
    title: "Riskprofil",
    description: "Vi vänder på steken och letar efter det som kan gå fel. Inkluderar branschspecifika hot och finansiella fallgropar."
  },
  {
    id: "step-7",
    number: "VII",
    title: "ESG & Makro",
    description: "Analys av hållbarhetsrisker och hur bolaget påverkas av det makroekonomiska läget (räntor, inflation)."
  },
  {
    id: "step-8",
    number: "VIII",
    title: "AI-observationer",
    description: "Vår AI skannar miljontals datapunkter, nyhetsflöden och dolda mönster för att identifiera avvikelser som människan missar."
  }
];

export const verdictData = {
  title: "Sammanfattning & Verdict",
  status: "CONFIRMED: KÖP",
  score: "32 / 40",
  percentage: "Totalpoäng (80%)"
};

export const scenarioData = [
  {
    label: "Bull Case",
    price: "420 SEK",
    probability: "25%",
    color: "text-green-500"
  },
  {
    label: "Base Case",
    price: "345 SEK",
    probability: "50%",
    color: "text-primary"
  },
  {
    label: "Bear Case",
    price: "210 SEK",
    probability: "25%",
    color: "text-red-500"
  }
];
