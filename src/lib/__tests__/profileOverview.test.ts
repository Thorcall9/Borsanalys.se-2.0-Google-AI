import assert from "node:assert/strict";
import test from "node:test";
import {
  getAnsweredCount,
  getLatestPublications,
  getStartedChecklists,
  type SavedChecklistLike,
} from "../profileOverview.ts";

const checklist = (overrides: Partial<SavedChecklistLike> = {}): SavedChecklistLike => ({
  id: 1,
  companyName: "Volvo",
  ticker: "VOLV-B",
  status: "started",
  updatedAt: "2026-07-18T10:00:00.000Z",
  answers: { q1: "yes", q2: "uncertain" },
  ...overrides,
});

test("filters out completed checklists from the profile overview", () => {
  assert.deepEqual(
    getStartedChecklists([checklist(), checklist({ id: 2, status: "completed" })]).map((item) => item.id),
    [1],
  );
});

test("counts only answers belonging to the twelve checklist questions", () => {
  assert.equal(getAnsweredCount({ q1: "yes", q2: "no", q99: "yes", q3: undefined }), 2);
});

test("returns the latest three publications using updatedAt before date", () => {
  const publications = [
    { slug: "old", title: "Old", date: "2026-07-19", updatedAt: "2026-07-19" },
    { slug: "latest", title: "Latest", date: "2026-07-17", updatedAt: "2026-07-20" },
    { slug: "middle", title: "Middle", date: "2026-07-18" },
    { slug: "fourth", title: "Fourth", date: "2026-07-16" },
  ].map((item) => item as never);

  assert.deepEqual(getLatestPublications(publications, 3).map((item) => item.slug), ["latest", "old", "middle"]);
});
