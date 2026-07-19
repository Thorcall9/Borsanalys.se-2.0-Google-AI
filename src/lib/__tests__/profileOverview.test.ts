import assert from "node:assert/strict";
import test from "node:test";
import {
  getLatestChecklist,
  getLatestContent,
  getAnsweredCount,
  getLatestPublications,
  getStartedChecklists,
  getWatchlistActions,
  normalizeTicker,
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
    { slug: "latest", title: "Latest", date: "2026-07-17", updatedAt: "2026-07-20", updatedAtIsEditorial: true },
    { slug: "middle", title: "Middle", date: "2026-07-18" },
    { slug: "fourth", title: "Fourth", date: "2026-07-16" },
  ].map((item) => item as never);

  assert.deepEqual(getLatestPublications(publications, 3).map((item) => item.slug), ["latest", "old", "middle"]);
});

test("normalizes ticker punctuation, spaces, and case consistently", () => {
  assert.equal(normalizeTicker(" axfo-b.st "), "AXFOBST");
  assert.equal(normalizeTicker("AXFOBST"), "AXFOBST");
});

test("selects the latest editorial content for the same normalized ticker", () => {
  const content = [
    { slug: "old", ticker: "AXFO-B.ST", date: "2026-07-10", contentType: "analysis" },
    { slug: "report", ticker: " axfo-b.st ", date: "2026-07-16", contentType: "report-commentary" },
    { slug: "technical-update", ticker: "AXFOBST", date: "2026-07-01", updatedAt: "2026-07-20", contentType: "analysis" },
  ].map((item) => item as never);

  assert.equal(getLatestContent(content, "AXFOBST")?.slug, "report");
});

test("selects the latest checklist by ticker and never falls back to company name", () => {
  const checklists = [
    checklist({ id: 1, ticker: "AXFO-B.ST", updatedAt: "2026-07-10" }),
    checklist({ id: 2, ticker: " axfo bst ", updatedAt: "2026-07-18" }),
    checklist({ id: 3, ticker: null, companyName: "Axfood AB", updatedAt: "2026-07-20" }),
  ];

  assert.equal(getLatestChecklist(checklists, "AXFOBST")?.id, 2);
  assert.equal(getLatestChecklist([checklist({ id: 3, ticker: null, companyName: "Axfood AB" })], "AXFOBST"), null);
});

test("returns no more than two contextual actions for a watchlist row", () => {
  const actions = getWatchlistActions({
    ticker: "AXFOBST",
    companyName: "Axfood AB",
    latestContent: { slug: "axfood-q2-2026", title: "Axfood Q2 2026", date: "2026-07-16", contentType: "report-commentary" },
    checklist: checklist({ id: 2, status: "started" }),
  });

  assert.deepEqual(actions.map((action) => action.label), ["Läs senaste", "Fortsätt"]);
  assert.ok(actions.every((action) => action.to));
});
