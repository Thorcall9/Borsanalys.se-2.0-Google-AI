import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceUrl = new URL(
  "../src/components/analysis/ABBDeepDive.tsx",
  import.meta.url,
);

test("ABB analysis scopes the warm reading palette to its root", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(source, /const ABB_READING_THEME/);
  assert.match(source, /"--background": "#f6f4f1"/);
  assert.match(source, /"--foreground": "#211d1a"/);
  assert.match(source, /"--card": "#fffdfa"/);
  assert.match(source, /"--card-foreground": "#211d1a"/);
  assert.match(source, /"--border": "#dedbd6"/);
  assert.match(source, /"--muted": "#ebe7e2"/);
  assert.match(source, /"--muted-foreground": "#625c56"/);
  assert.match(source, /"--section-alt": "#f1eee9"/);
  assert.match(
    source,
    /className="min-h-screen bg-background font-sans text-foreground pt-16"\s+style=\{ABB_READING_THEME\}/,
  );
  assert.doesNotMatch(
    source,
    /\bdark:/,
    "ABB reading view must not inherit explicit dark-mode overrides",
  );
});
