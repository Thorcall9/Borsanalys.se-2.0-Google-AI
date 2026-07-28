import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type QueryDocumentSnapshot,
  type Timestamp,
} from 'firebase/firestore';

import { db, handleFirestoreError, OperationType } from '../firebase';
import type { HouseCalculatorInput } from '../lib/savingsGoalMath';

export interface SavingsGoal extends HouseCalculatorInput {
  id: string;
  uid: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

type SavingsGoalWrite = Omit<SavingsGoal, 'id' | 'uid' | 'createdAt' | 'updatedAt'>;

function assertUid(uid: string) {
  if (!uid || !uid.trim()) {
    throw new Error('A uid is required for savings goal operations.');
  }
}

function assertGoalId(goalId: string) {
  if (!goalId || !goalId.trim()) {
    throw new Error('A goalId is required for savings goal operations.');
  }
}

function getSavingsGoalsCollection(uid: string) {
  return collection(db, 'users', uid, 'savingsGoals');
}

function getSavingsGoalDocument(uid: string, goalId: string) {
  return doc(db, 'users', uid, 'savingsGoals', goalId);
}

function normalizeTimestamp(value: Timestamp | Date | null | undefined) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value.toDate === 'function') {
    return value.toDate();
  }

  return null;
}

function mapSavingsGoal(snapshot: QueryDocumentSnapshot) {
  const data = snapshot.data() as Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt?: Timestamp | Date | null;
    updatedAt?: Timestamp | Date | null;
  };

  return {
    id: snapshot.id,
    uid: data.uid,
    name: data.name,
    homePrice: data.homePrice,
    downPaymentPercent: data.downPaymentPercent,
    currentSavings: data.currentSavings,
    monthlySaving: data.monthlySaving,
    annualReturn: data.annualReturn,
    mortgageRate: data.mortgageRate,
    amortizationRate: data.amortizationRate,
    horizonYears: data.horizonYears,
    createdAt: normalizeTimestamp(data.createdAt),
    updatedAt: normalizeTimestamp(data.updatedAt),
  } satisfies SavingsGoal;
}

export async function listSavingsGoals(uid: string): Promise<SavingsGoal[]> {
  assertUid(uid);

  const path = `users/${uid}/savingsGoals`;

  try {
    const snapshot = await getDocs(query(getSavingsGoalsCollection(uid), orderBy('updatedAt', 'desc')));
    return snapshot.docs.map(mapSavingsGoal);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function createSavingsGoal(uid: string, goal: SavingsGoalWrite): Promise<string> {
  assertUid(uid);

  const path = `users/${uid}/savingsGoals`;

  try {
    const documentReference = await addDoc(getSavingsGoalsCollection(uid), {
      ...goal,
      uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return documentReference.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateSavingsGoal(uid: string, goalId: string, goal: SavingsGoalWrite): Promise<void> {
  assertUid(uid);
  assertGoalId(goalId);

  const path = `users/${uid}/savingsGoals/${goalId}`;

  try {
    await updateDoc(getSavingsGoalDocument(uid, goalId), {
      ...goal,
      uid,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteSavingsGoal(uid: string, goalId: string): Promise<void> {
  assertUid(uid);
  assertGoalId(goalId);

  const path = `users/${uid}/savingsGoals/${goalId}`;

  try {
    await deleteDoc(getSavingsGoalDocument(uid, goalId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
