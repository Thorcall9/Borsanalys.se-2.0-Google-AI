export type ChecklistAnswer = "yes" | "uncertain" | "no";
export type ChecklistStatus = "started" | "completed";

export interface ChecklistQuestion {
  id: string;
  category: string;
  categoryTitle: string;
  question: string;
  help: string;
}

export interface ChecklistDraft {
  companyName: string;
  ticker: string;
  sourceAnalysisSlug?: string;
  answers: Record<string, ChecklistAnswer | undefined>;
  notes: Record<string, string>;
  status: ChecklistStatus;
}

export const CHECKLIST_TEASER_QUESTIONS = [
  "Vilken tillväxt och lönsamhet krävs för att dagens värdering ska vara rimlig?",
  "Vilka är de tre största riskerna – och vad skulle visa att investeringscaset har försvagats?",
  "Köper du efter egen analys eller för att aktien har stigit och andra pratar om den?",
] as const;

export const STOCK_CHECKLIST_QUESTIONS: ChecklistQuestion[] = [
  { id: "q1", category: "A", categoryTitle: "Förstå investeringen", question: "Kan jag förklara hur bolaget tjänar pengar?", help: "Jag förstår vilka produkter eller tjänster som driver intäkter och vinst." },
  { id: "q2", category: "A", categoryTitle: "Förstå investeringen", question: "Förstår jag varför kunderna väljer bolaget framför konkurrenterna?", help: "Det kan exempelvis handla om pris, varumärke, teknik, distribution, nätverkseffekter eller höga byteskostnader." },
  { id: "q3", category: "A", categoryTitle: "Förstå investeringen", question: "Vet jag vad som ska driva bolagets framtida tillväxt?", help: "Tillväxten bör bygga på konkreta drivkrafter och inte enbart på historisk utveckling." },
  { id: "q4", category: "B", categoryTitle: "Kontrollera kvaliteten", question: "Har omsättning och vinst utvecklats stabilt över tid?", help: "Bedöm utvecklingen över flera år och inte bara det senaste kvartalet." },
  { id: "q5", category: "B", categoryTitle: "Kontrollera kvaliteten", question: "Omvandlas vinsten till kassaflöde?", help: "Bolaget bör generera faktiska kassaflöden och vinsten bör inte främst bestå av redovisningseffekter." },
  { id: "q6", category: "B", categoryTitle: "Kontrollera kvaliteten", question: "Har bolaget en hanterbar skuldsättning?", help: "Räntor, amorteringar och refinansiering bör inte utgöra ett oproportionerligt hot mot verksamheten." },
  { id: "q7", category: "B", categoryTitle: "Kontrollera kvaliteten", question: "Använder ledningen aktieägarnas kapital på ett rimligt sätt?", help: "Bedöm förvärv, investeringar, återköp, utdelningar och annan kapitalallokering." },
  { id: "q8", category: "C", categoryTitle: "Bedöm priset", question: "Vilka antaganden krävs för att dagens värdering ska vara rimlig?", help: "Bedöm vilken tillväxt, lönsamhet och framtida avkastning som marknaden redan verkar prisa in." },
  { id: "q9", category: "C", categoryTitle: "Bedöm priset", question: "Har jag jämfört värderingen med bolagets historik och relevanta konkurrenter?", help: "Ta hänsyn till skillnader i tillväxt, lönsamhet, finansiell risk och affärskvalitet." },
  { id: "q10", category: "C", categoryTitle: "Bedöm priset", question: "Finns det en rimlig säkerhetsmarginal?", help: "Investeringen bör kunna ge en acceptabel avkastning även om utvecklingen blir svagare än huvudscenariot." },
  { id: "q11", category: "D", categoryTitle: "Testa beslutet", question: "Vilka är de tre största riskerna?", help: "Beskriv vad som kan gå fel och vilka signaler som skulle visa att investeringscaset försvagas." },
  { id: "q12", category: "D", categoryTitle: "Testa beslutet", question: "Köper jag efter analys eller på grund av känslor?", help: "Beslutet bör inte främst bygga på kursuppgång, rädsla att missa tåget, sociala medier eller en enskild rekommendation." },
];

export const CHECKLIST_DISCLAIMER = "Aktiechecklistan är ett informations- och reflektionsverktyg och utgör inte personlig investeringsrådgivning eller en rekommendation att köpa eller sälja värdepapper. Alla investeringsbeslut fattas på eget ansvar.";

export function completedCount(draft: ChecklistDraft) {
  return STOCK_CHECKLIST_QUESTIONS.filter((question) => Boolean(draft.answers[question.id])).length;
}

export function checklistSummary(draft: ChecklistDraft) {
  const groups = {
    thoughtful: STOCK_CHECKLIST_QUESTIONS.filter((question) => draft.answers[question.id] === "yes"),
    investigate: STOCK_CHECKLIST_QUESTIONS.filter((question) => draft.answers[question.id] === "uncertain"),
    warning: STOCK_CHECKLIST_QUESTIONS.filter((question) => draft.answers[question.id] === "no"),
  };
  return {
    ...groups,
    counts: { thoughtful: groups.thoughtful.length, investigate: groups.investigate.length, warning: groups.warning.length },
    answered: completedCount(draft),
  };
}

export function emptyChecklist(companyName = "", ticker = "", sourceAnalysisSlug?: string): ChecklistDraft {
  return { companyName, ticker, sourceAnalysisSlug, answers: {}, notes: {}, status: "started" };
}
