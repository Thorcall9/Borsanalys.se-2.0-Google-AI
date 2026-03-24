export interface TerminologyEntry {
  id: string;
  title: string;
  category: "Värdering" | "Lönsamhet" | "Strategi" | "Grundläggande";
  description: string;
  explanation: string;
  formula?: string;
  example: {
    company: string;
    value: string;
    context: string;
  };
}

export const terminology: TerminologyEntry[] = [
  {
    id: "pe-ratio",
    title: "P/E-tal",
    category: "Värdering",
    description: "Priset på aktien dividerat med vinsten per aktie.",
    explanation: "P/E står för Price/Earnings. Det visar hur många årsvinster marknaden värderar bolaget till. Ett högt P/E-tal kan betyda att marknaden förväntar sig hög tillväxt, medan ett lågt kan tyda på att bolaget är undervärderat eller har problem.",
    formula: "Aktiekurs / Vinst per aktie (EPS)",
    example: {
      company: "Evolution AB",
      value: "9,95x",
      context: "Evolution handlas just nu till ett historiskt lågt P/E-tal, vilket innebär att du betalar knappt 10 kronor för varje krona bolaget tjänar."
    }
  },
  {
    id: "roe",
    title: "ROE (Eget kapital)",
    category: "Lönsamhet",
    description: "Avkastning på eget kapital.",
    explanation: "Return on Equity (ROE) mäter hur effektivt ett bolag använder ägarnas pengar för att skapa vinst. Det är ett av de viktigaste måtten för att bedöma kvaliteten på ett bolags affärsmodell.",
    formula: "Nettoresultat / Eget kapital",
    example: {
      company: "Investor AB",
      value: "Stark historik",
      context: "Investor fokuserar på att öka substansvärdet, vilket i praktiken är deras sätt att maximera avkastningen på det egna kapitalet över tid."
    }
  },
  {
    id: "ebitda",
    title: "EBITDA",
    category: "Lönsamhet",
    description: "Rörelseresultat före avskrivningar.",
    explanation: "EBITDA står för Earnings Before Interest, Taxes, Depreciation, and Amortization. Det används ofta för att se det operativa kassaflödet i en verksamhet innan bokföringsmässiga poster som avskrivningar påverkar resultatet.",
    example: {
      company: "Evolution AB",
      value: "66,1%",
      context: "Evolution har en extremt hög EBITDA-marginal, vilket visar att deras kärnverksamhet är otroligt lönsam."
    }
  },
  {
    id: "moat",
    title: "Moat (Vallgrav)",
    category: "Strategi",
    description: "Hållbara konkurrensfördelar.",
    explanation: "Begreppet populariserades av Warren Buffett och syftar på ett bolags förmåga att skydda sina vinster från konkurrenter. Det kan vara ett starkt varumärke, nätverkseffekter eller teknologiskt försprång.",
    example: {
      company: "Alphabet (Google)",
      value: "Sökdominans",
      context: "Googles enorma marknadsandel inom sök skapar en vallgrav som är nästan omöjlig för konkurrenter att överbrygga."
    }
  }
];
