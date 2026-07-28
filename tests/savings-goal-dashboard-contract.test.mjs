import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const dashboardFileUrl = new URL('../src/components/house/SavingsGoalDashboard.tsx', import.meta.url);
const cardFileUrl = new URL('../src/components/house/SavingsGoalCard.tsx', import.meta.url);
const profileFileUrl = new URL('../src/pages/Profile.tsx', import.meta.url);
const refreshFileUrl = new URL('../src/services/savingsGoalRefresh.ts', import.meta.url);
const dialogFocusFileUrl = new URL('../src/components/house/useDialogFocus.ts', import.meta.url);

test('savings dashboard is UID-scoped, refreshable after CRUD, and manages dialog focus accessibly', async () => {
  const [dashboard, refresh, dialogFocus] = await Promise.all([
    readFile(dashboardFileUrl, 'utf8'),
    readFile(refreshFileUrl, 'utf8'),
    readFile(dialogFocusFileUrl, 'utf8'),
  ]);

  assert.match(dashboard, /interface SavingsGoalDashboardProps[\s\S]*uid: string/);
  assert.match(dashboard, /listSavingsGoals\(uid\)/);
  assert.match(dashboard, /createSavingsGoal\(uid,/);
  assert.match(dashboard, /updateSavingsGoal\(uid,/);
  assert.match(dashboard, /deleteSavingsGoal\(uid,/);
  assert.match(dashboard, /role="alertdialog"/);
  assert.match(dashboard, /aria-modal="true"/);
  assert.match(dashboard, /useDialogFocus(?:<HTMLElement>)?\(true(?:, [^)]+)?\)/);
  assert.match(dashboard, /data-dialog-initial-focus/);
  assert.match(dashboard, /subscribeToSavingsGoalRefresh/);
  assert.match(dashboard, /notifySavingsGoalRefresh\(uid\)/);
  assert.match(refresh, /export function subscribeToSavingsGoalRefresh/);
  assert.match(refresh, /export async function notifySavingsGoalRefresh\(uid: string\)/);
  assert.match(dialogFocus, /previouslyFocusedElement/);
  assert.match(dialogFocus, /event\.key !== 'Tab'/);
  assert.match(dialogFocus, /event\.shiftKey/);
  assert.match(dialogFocus, /focusableElements\[0\]\.focus\(\)/);
  assert.match(dialogFocus, /focusableElements\.at\(-1\)\?\.focus\(\)/);
  assert.match(dialogFocus, /data-dialog-initial-focus/);
});

test('savings dashboard restores dialog focus to a stable control after refresh unmounts the trigger', async () => {
  const [dashboard, dialogFocus] = await Promise.all([
    readFile(dashboardFileUrl, 'utf8'),
    readFile(dialogFocusFileUrl, 'utf8'),
  ]);

  assert.match(dashboard, /const createGoalButtonRef = useRef<HTMLButtonElement>\(null\)/);
  assert.match(dashboard, /ref=\{createGoalButtonRef\}/);
  assert.match(dashboard, /fallbackFocusRef=\{createGoalButtonRef\}/);
  assert.match(dialogFocus, /fallbackFocusRef\?: RefObject<HTMLElement \| null>/);
  assert.match(dialogFocus, /if \(trigger\?\.isConnected\) \{\s*trigger\.focus\(\);\s*\} else if \(fallbackFocusRef\?\.current\?\.isConnected\) \{\s*fallbackFocusRef\.current\.focus\(\);\s*\}/);
});

test('savings goal card exposes labelled progress and goal-specific actions', async () => {
  const card = await readFile(cardFileUrl, 'utf8');

  assert.match(card, /calculateHousePreview/);
  assert.match(card, /Kontantinsats/);
  assert.match(card, /role="progressbar"/);
  assert.match(card, /aria-valuemin=\{0\}/);
  assert.match(card, /aria-valuemax=\{100\}/);
  assert.match(card, /aria-valuenow=\{progress\}/);
  assert.match(card, /aria-label=\{`Sparprogress för \$\{goal\.name\}`\}/);
  assert.match(card, /aria-controls="active-savings-goal-summary"/);
  assert.match(card, /aria-label=\{`Visa \$\{goal\.name\} som aktivt mål`\}/);
  assert.match(card, /aria-label=\{`Redigera \$\{goal\.name\}`\}/);
  assert.match(card, /aria-label=\{`Ta bort \$\{goal\.name\}`\}/);
  assert.match(card, /Redigera/);
  assert.match(card, /Ta bort/);
  assert.match(card, /Visa mål/);
});

test('Profile places the savings dashboard before watchlist and saved analyses', async () => {
  const profile = await readFile(profileFileUrl, 'utf8');
  const dashboardIndex = profile.indexOf('<SavingsGoalDashboard');
  const watchlistIndex = profile.indexOf('<Watchlist');
  const savedAnalysesIndex = profile.indexOf('<SavedAnalyses');

  assert.match(profile, /import \{ SavingsGoalDashboard \} from ['"]\.\.\/components\/house\/SavingsGoalDashboard['"];/);
  assert.notEqual(dashboardIndex, -1);
  assert.ok(dashboardIndex < watchlistIndex);
  assert.ok(dashboardIndex < savedAnalysesIndex);
});
