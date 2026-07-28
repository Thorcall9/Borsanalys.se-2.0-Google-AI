import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const serviceFileUrl = new URL('../src/services/savingsGoalService.ts', import.meta.url);

test('savings goal service builds the member subcollection path under users/{uid}/savingsGoals', async () => {
  const source = await readFile(serviceFileUrl, 'utf8');

  assert.match(source, /loadFirebaseFirestore\(\)/);
  assert.match(source, /firestore\.collection\(firestore\.db,\s*['"]users['"],\s*uid,\s*['"]savingsGoals['"]\)/);
  assert.match(source, /firestore\.doc\(firestore\.db,\s*['"]users['"],\s*uid,\s*['"]savingsGoals['"],\s*goalId\)/);
});

test('savings goal service requires a uid before any Firestore operation', async () => {
  const source = await readFile(serviceFileUrl, 'utf8');

  assert.match(source, /function assertUid\(uid: string\)/);
  assert.match(source, /throw new Error\(['"]A uid is required for savings goal operations\./);
  assert.match(source, /listSavingsGoals\(uid: string\)[\s\S]*assertUid\(uid\)/);
  assert.match(source, /createSavingsGoal\(uid: string,\s*goal: SavingsGoalWrite\)[\s\S]*assertUid\(uid\)/);
  assert.match(source, /updateSavingsGoal\(uid: string,\s*goalId: string,\s*goal: SavingsGoalWrite\)[\s\S]*assertUid\(uid\)/);
  assert.match(source, /deleteSavingsGoal\(uid: string,\s*goalId: string\)[\s\S]*assertUid\(uid\)/);
});
