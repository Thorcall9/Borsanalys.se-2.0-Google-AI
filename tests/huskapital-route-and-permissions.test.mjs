import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('Huskapital is a dedicated signed-in product route', async () => {
  const [app, page] = await Promise.all([
    read('../src/App.tsx'),
    read('../src/pages/Huskapital.tsx'),
  ]);

  assert.match(app, /lazy\(\(\) => import\("\.\/pages\/Huskapital"\)\)/);
  assert.match(app, /path="\/huskapital"/);
  assert.match(page, /useAuth\(\)/);
  assert.match(page, /openLoginModal\(\)/);
  assert.match(page, /<SavingsGoalDashboard uid=\{user\.uid\}/);
  assert.match(page, /Logga in för att öppna Huskapital/);
});

test('profile only links to Huskapital and no longer embeds its dashboard', async () => {
  const profile = await read('../src/pages/Profile.tsx');

  assert.doesNotMatch(profile, /<SavingsGoalDashboard/);
  assert.match(profile, /to="\/huskapital"/);
  assert.match(profile, /Öppna Huskapital/);
});

test('public calculator remains public and offers a continuation to Huskapital', async () => {
  const calculator = await read('../src/pages/HouseCalculator.tsx');

  assert.match(calculator, /<HouseCalculator onSave=\{handleSave\}/);
  assert.match(calculator, /to="\/huskapital"/);
  assert.match(calculator, /Följ utvecklingen i Huskapital/);
});

test('Vercel serves the Huskapital SPA route on direct loads', async () => {
  const vercel = JSON.parse(await read('../vercel.json'));
  const rewrites = vercel.rewrites.map(({ source, destination }) => `${source} -> ${destination}`);

  assert.ok(rewrites.includes('/huskapital -> /index.html'));
  assert.ok(rewrites.includes('/huskapital/ -> /index.html'));
});

test('Firestore rules keep goals and history private to their owning user', async () => {
  const rules = await read('../firestore.rules');

  assert.match(rules, /match \/savingsGoals\/\{goalId\}[\s\S]*allow read: if isOwner\(userId\)/);
  assert.match(rules, /match \/capitalHistory\/\{entryId\} \{\s*allow read, create: if isOwner\(userId\);\s*\}/);
});

test('production UI never formats internal Firestore details for users', async () => {
  const [firebase, boundary, dashboard, loginModal] = await Promise.all([
    read('../src/firebase.ts'),
    read('../src/components/ErrorBoundary.tsx'),
    read('../src/components/house/SavingsGoalDashboard.tsx'),
    read('../src/components/LoginModal.tsx'),
  ]);

  assert.match(firebase, /console\.error\('Firestore Error:/);
  assert.doesNotMatch(firebase, /throw new Error\(JSON\.stringify\(errInfo\)\)/);
  assert.doesNotMatch(boundary, /Firestore-fel/);
  assert.match(dashboard, /Din bostadsplan kunde inte laddas just nu\. Försök igen\./);
  assert.doesNotMatch(loginModal, /err instanceof Error \? err\.message/);
  assert.match(loginModal, /Inloggningen kunde inte slutföras just nu\. Försök igen\./);
});
