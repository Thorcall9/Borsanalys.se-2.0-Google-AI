import {
  type QueryDocumentSnapshot,
  type Timestamp,
} from 'firebase/firestore';

import { handleFirestoreError, loadFirebaseFirestore, OperationType } from '../firebase';
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
    const firestore = await loadFirebaseFirestore();
    const goalsCollection = firestore.collection(firestore.db, 'users', uid, 'savingsGoals');
    const snapshot = await firestore.getDocs(firestore.query(goalsCollection, firestore.orderBy('updatedAt', 'desc')));
    return snapshot.docs.map(mapSavingsGoal);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function createSavingsGoal(uid: string, goal: SavingsGoalWrite): Promise<string> {
  assertUid(uid);

  const path = `users/${uid}/savingsGoals`;

  try {
    const firestore = await loadFirebaseFirestore();
    const goalsCollection = firestore.collection(firestore.db, 'users', uid, 'savingsGoals');
    const documentReference = await firestore.addDoc(goalsCollection, {
      ...goal,
      uid,
      createdAt: firestore.serverTimestamp(),
      updatedAt: firestore.serverTimestamp(),
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
    const firestore = await loadFirebaseFirestore();
    const goalDocument = firestore.doc(firestore.db, 'users', uid, 'savingsGoals', goalId);
    await firestore.updateDoc(goalDocument, {
      ...goal,
      uid,
      updatedAt: firestore.serverTimestamp(),
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
    const firestore = await loadFirebaseFirestore();
    const goalDocument = firestore.doc(firestore.db, 'users', uid, 'savingsGoals', goalId);
    await firestore.deleteDoc(goalDocument);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
