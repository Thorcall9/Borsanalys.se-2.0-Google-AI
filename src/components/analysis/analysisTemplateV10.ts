export interface AnalysisTemplateSection {
  id: string;
  number: string;
  title: string;
}

export const V10_ANALYSIS_SECTIONS: AnalysisTemplateSection[] = [
  { id: "company-management", number: "I", title: "Företag & ledning" },
  { id: "business-model", number: "II", title: "Affärsmodell" },
  { id: "industry-moat", number: "III", title: "Bransch & moat" },
  { id: "financial-quality", number: "IV", title: "Finansiell kvalitet" },
  { id: "scorecard", number: "V", title: "Scorecard" },
  { id: "fundamental-valuation", number: "VI", title: "Fundamental värdering" },
  { id: "catalysts", number: "VII", title: "Kursdrivare" },
  { id: "risks", number: "VIII", title: "Risker" },
  { id: "thesis-changers", number: "IX", title: "Tesförändrare" },
  { id: "investment-decision", number: "X", title: "Investeringsbeslut" },
];
