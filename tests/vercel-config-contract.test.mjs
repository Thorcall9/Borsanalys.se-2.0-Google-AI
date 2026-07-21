import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

test("Vercel function includeFiles values use the schema-supported string form", async () => {
  const config = JSON.parse(
    await fs.readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  );

  assert.equal(typeof config.functions["api/sitemap.ts"].includeFiles, "string");
});
