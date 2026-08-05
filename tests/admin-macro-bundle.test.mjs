import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const admin = await readFile(new URL("../api/admin.ts", import.meta.url), "utf8");

assert.match(admin, /import\s+\{\s*updateAllMacroData\s*\}\s+from\s+["']\.\.\/src\/lib\/macroUpdater\.ts["']/);
assert.doesNotMatch(admin, /await import\(['"]\.\.\/src\/lib\/macroUpdater\.ts['"]\)/);

console.log("admin macro updater uses a statically traceable serverless import");
