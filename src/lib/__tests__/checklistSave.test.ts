import assert from "node:assert/strict";
import test from "node:test";
import { CHECKLIST_SAVE_PERCENT, CHECKLIST_SAVE_STEPS, getLeaveDialogCopy } from "../checklistSave.ts";

test("exposes the four checklist save progress steps in order", () => {
  assert.deepEqual(CHECKLIST_SAVE_STEPS.map((step) => step.title), [
    "Besvara checklistan",
    "Granska resultatet",
    "Skapa gratis konto",
    "Sparad på ditt konto",
  ]);
  assert.equal(CHECKLIST_SAVE_STEPS.filter((step) => step.state === "complete").length, 2);
  assert.equal(CHECKLIST_SAVE_STEPS.find((step) => step.state === "active")?.title, "Skapa gratis konto");
  assert.equal(CHECKLIST_SAVE_STEPS.find((step) => step.state === "upcoming")?.title, "Sparad på ditt konto");
});

test("uses the requested approximate progress percentage", () => {
  assert.equal(CHECKLIST_SAVE_PERCENT, 75);
});

test("describes a retained local draft without claiming it is permanently saved", () => {
  assert.equal(getLeaveDialogCopy(true), "Checklistan finns kvar tillfälligt i den här webbläsaren, men sparas inte på ditt konto och kan inte öppnas från en annan enhet.");
  assert.equal(getLeaveDialogCopy(false), "Dina svar raderas när du lämnar sidan utan att spara.");
});
