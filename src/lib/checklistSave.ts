export const CHECKLIST_SAVE_PERCENT = 75;

export const CHECKLIST_SAVE_STEPS = [
  { title: "Besvara checklistan", state: "complete" as const },
  { title: "Granska resultatet", state: "complete" as const },
  { title: "Skapa gratis konto", state: "active" as const },
  { title: "Checklistan sparas", state: "upcoming" as const },
];

export function getLeaveDialogCopy(hasLocalDraft: boolean) {
  return hasLocalDraft
    ? "Checklistan finns tillfälligt kvar i den här webbläsaren, men sparas inte på din medlemssida och kan inte öppnas från en annan enhet. Den kan försvinna om webbläsardata rensas."
    : "Dina svar raderas när du lämnar sidan utan att spara.";
}
