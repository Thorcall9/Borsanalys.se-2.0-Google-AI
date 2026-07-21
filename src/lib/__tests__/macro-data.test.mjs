import assert from "node:assert/strict";
import { normalizeMacroResponse } from "../macroData.ts";

const live = normalizeMacroResponse([
  {
    key: "US10Y",
    value: 4.29,
    trend: "flat",
    updatedAt: "2026-07-20T20:00:00.000Z",
    source: "alphavantage",
  },
]);

assert.equal(live.US10Y.source, "alphavantage");
assert.equal(live.US10Y.isStale, false);
assert.deepEqual(normalizeMacroResponse([]), {});
assert.deepEqual(normalizeMacroResponse({ US10Y: { value: "4.29" } }), {});
console.log("macro-data tests passed");
