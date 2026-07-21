import assert from "node:assert/strict";
import test from "node:test";
import { getDeepDiveLoader } from "./analysisDeepDiveRegistry.ts";

test("does not resolve an unknown deep dive", () => {
  assert.equal(getDeepDiveLoader("UnknownCompany"), undefined);
});

test("resolves a known deep dive through a dynamic import loader", () => {
  assert.equal(typeof getDeepDiveLoader("Volvo"), "function");
});

test("keeps every existing deep-dive key available", () => {
  const keys = [
    "Nvidia",
    "NovoNordisk",
    "Evolution",
    "Investor",
    "Volvo",
    "Swedbank",
    "NewWave",
    "Ericsson",
    "Handelsbanken",
    "AQGroup",
    "Nibe",
    "Axfood",
    "ABB",
    "Plejd",
  ];

  for (const key of keys) {
    assert.notEqual(getDeepDiveLoader(key), undefined, `Missing deep dive: ${key}`);
  }
});
