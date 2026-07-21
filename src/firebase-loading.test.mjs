import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const firebaseSource = await readFile(new URL("./firebase.ts", import.meta.url), "utf8");
const authContextSource = await readFile(new URL("./contexts/AuthContext.tsx", import.meta.url), "utf8");
const viteConfigSource = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");

test("keeps Firebase Auth and Firestore out of the eager firebase module", () => {
  assert.doesNotMatch(firebaseSource, /import\s+{[^}]+}\s+from ['"]firebase\/(auth|firestore)['"]/s);
  assert.match(firebaseSource, /import\(['"]firebase\/auth['"]\)/);
  assert.match(firebaseSource, /import\(['"]firebase\/firestore['"]\)/);
});

test("auth context uses the lazy Firebase clients", () => {
  assert.match(authContextSource, /loadFirebaseAuth/);
  assert.match(authContextSource, /loadFirebaseFirestore/);
  assert.doesNotMatch(authContextSource, /import\s+{[^}]+}\s+from ['"]firebase\/firestore['"]/s);
});

test("does not force Firebase Auth and Firestore into the eager vendor chunk", () => {
  assert.doesNotMatch(viteConfigSource, /'vendor-firebase'\s*:\s*\[[^\]]*firebase\/(auth|firestore)/s);
});
