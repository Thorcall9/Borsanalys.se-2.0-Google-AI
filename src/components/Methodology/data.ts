export interface MethodologyStep {
  id: string; // I - VIII
  title: string;
  summary: string;
  points: string[];
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: "I",
    title: "Företagsöversikt",
    summary: "Vi analyserar affärsmodellen på djupet, utvärderar ledningens historik och säkerställer att ägarstrukturen gynnar långsiktiga aktieägare.",
    points: [
      "Hur tjänar bolaget sina pengar?",
      "Finns det en historik av värdeskapande kapitalallokering?",
      "Är incitamentsstrukturerna i linje med aktieägarnas mål?"
    ]
  },
  {
    id: "II",
    title: "Strategisk analys & Moat",
    summary: "Bedömning av bolagets vallgravar och konkurrensfördelar. Hur skyddad är vinstmaskinen mot nya utmanare?",
    points: [
      "Har bolaget strukturell pricing power?",
      "Bygger vinsterna på nätverkseffekter eller scale?",
      "Hur ser hotbilden ut från disruptiva teknologier?"
    ]
  },
  {
    id: "III",
    title: "Finansiell analys",
    summary: "En stenhård genomgång av siffrorna: Vinsttillväxt, kassaflöde och balansräkningens styrka. Vi ser bortom redovisningskosmetik.",
    points: [
      "Är tillväxten organisk och bevisat lönsam?",
      "Hur bedöms kvaliteten i det operativa kassaflödet?",
      "Finns det dolda skulder eller aggressiv bokföring?"
    ]
  },
  {
    id: "IV",
    title: "Värdering & Jämförelse",
    summary: "Är aktien objektivt billig eller dyr? Vi ställer prislappen i relation till historiska snitt och tillväxtmål.",
    points: [
      "Vad är bolagets 'fair value' i ett DCF-scenario?",
      "Hur förhåller sig EV/EBIT till närmaste peer-group?",
      "Kan en varaktig marginalexpansion driva uppvärdering?"
    ]
  },
  {
    id: "V",
    title: "Tillväxtmotorer & Triggers",
    summary: "Identifiering av konkreta katalysatorer. Vi letar efter asymmetriska triggers och underliggande innovation.",
    points: [
      "Vilka lanseringar kan driva marknadsförväntningarna?",
      "Finns operationell hävstång som snabbt kan dubbla EBIT?",
      "Undersöks uppsida via M&A eller nya geografier?"
    ]
  },
  {
    id: "VI",
    title: "Riskprofil",
    summary: "Vi stress-testar caset och letar efter det som kan gå fel, från branschspecifika hot till finansiella fallgropar.",
    points: [
      "Vad är worst-case-scenariot för kärnaffären?",
      "Finns farlig kundkoncentration eller leverantörsberoende?",
      "Riskerar regulatoriska ingripanden krossa vallgraven?"
    ]
  },
  {
    id: "VII",
    title: "ESG & Makro",
    summary: "Analys av hållbarhetsintegrering och motståndskraften mot skiftande makroekonomiska klimat.",
    points: [
      "Leder bolagets omställning till en faktisk konkurrensfördel?",
      "Går kostnadsökningar att skicka vidare vid inflation?",
      "Finns ohälsosam känslighet för räntechocker?"
    ]
  },
  {
    id: "VIII",
    title: "AI-observationer",
    summary: "Vår AI skannar miljontals datapunkter, nyhetsflöden och dolda mönster för att fånga avvikelser människan missar.",
    points: [
      "Svarar marknaden asymmetriskt på fundamental data?",
      "Ser vi mönster kring insynsköp eller ökad blankning?",
      "Kvantitativ sentiment-analys av bolagets kommunikation."
    ]
  }
];
