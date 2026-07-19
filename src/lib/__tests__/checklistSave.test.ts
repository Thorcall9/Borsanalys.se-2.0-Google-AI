import assert from "node:assert/strict";
import test from "node:test";
import { CHECKLIST_SAVE_PERCENT, CHECKLIST_SAVE_STEPS, getLeaveDialogCopy } from "../checklistSave.ts";

test("exposes the four checklist save progress steps in order", () => {
  assert.deepEqual(CHECKLIST_SAVE_STEPS.map((step) => step.title), [
    "Besvara checklistan",
    "Granska resultatet",
    "Skapa gratis konto",
    "Checklistan sparas",
  ]);
  assert.equal(CHECKLIST_SAVE_STEPS.filter((step) => step.state === "complete").length, 2);
  assert.equal(CHECKLIST_SAVE_STEPS.find((step) => step.state === "active")?.title, "Skapa gratis konto");
  assert.equal(CHECKLIST_SAVE_STEPS.find((step) => step.state === "upcoming")?.title, "Checklistan sparas");
});

test("uses the requested approximate progress percentage", () => {
  assert.equal(CHECKLIST_SAVE_PERCENT, 75);
});

test("describes a retained local draft without claiming it is permanently saved", () => {
  assert.equal(getLeaveDialogCopy(true), "Checklistan finns tillfälligt kvar i den här webbläsaren, men sparas inte på din medlemssida och kan inte öppnas från en annan enhet. Den kan försvinna om webbläsardata rensas.");
  assert.equal(getLeaveDialogCopy(false), "Dina svar raderas när du lämnar sidan utan att spara.");
});
