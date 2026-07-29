import type { QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { handleFirestoreError, loadFirebaseFirestore, OperationType } from '../firebase';

export interface HousingCapitalHistoryEntry {
  id: string;
  amount: number;
  previousAmount: number | null;
  createdAt: Date | null;
}

function normalizeTimestamp(value: Timestamp | Date | null | undefined) {
  if (!value) return null;
  if (value instanceof Date) return value;
  return typeof value.toDate === 'function' ? value.toDate() : null;
}

function assertIdentifiers(uid: string, goalId: string) {
  if (!uid.trim() || !goalId.trim()) throw new Error('A uid and goalId are required for capital history.');
}

function mapEntry(snapshot: QueryDocumentSnapshot): HousingCapitalHistoryEntry {
  const data = snapshot.data() as { amount: number; previousAmount?: number; createdAt?: Timestamp | Date | null };
  return { id: snapshot.id, amount: data.amount, previousAmount: typeof data.previousAmount === 'number' ? data.previousAmount : null, createdAt: normalizeTimestamp(data.createdAt) };
}

export async function listHousingCapitalHistory(uid: string, goalId: string): Promise<HousingCapitalHistoryEntry[]> {
  assertIdentifiers(uid, goalId);
  const path = `users/${uid}/savingsGoals/${goalId}/capitalHistory`;
  try {
    const firestore = await loadFirebaseFirestore();
    const history = firestore.collection(firestore.db, 'users', uid, 'savingsGoals', goalId, 'capitalHistory');
    const snapshot = await firestore.getDocs(firestore.query(history, firestore.orderBy('createdAt', 'asc')));
    return snapshot.docs.map(mapEntry);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function addHousingCapitalHistory(uid: string, goalId: string, amount: number): Promise<void> {
  assertIdentifiers(uid, goalId);
  const path = `users/${uid}/savingsGoals/${goalId}/capitalHistory`;
  try {
    const firestore = await loadFirebaseFirestore();
    const history = firestore.collection(firestore.db, 'users', uid, 'savingsGoals', goalId, 'capitalHistory');
    await firestore.addDoc(history, { amount, createdAt: firestore.serverTimestamp() });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function saveHousingCapitalUpdate(uid: string, goalId: string, previousAmount: number, amount: number): Promise<void> {
  assertIdentifiers(uid, goalId);
  const path = `users/${uid}/savingsGoals/${goalId}`;
  try {
    const firestore = await loadFirebaseFirestore();
    const goalDocument = firestore.doc(firestore.db, 'users', uid, 'savingsGoals', goalId);
    const history = firestore.collection(firestore.db, 'users', uid, 'savingsGoals', goalId, 'capitalHistory');
    const historyDocument = firestore.doc(history);
    const batch = firestore.writeBatch(firestore.db);
    batch.update(goalDocument, { currentSavings: amount, updatedAt: firestore.serverTimestamp() });
    batch.set(historyDocument, { amount, previousAmount, createdAt: firestore.serverTimestamp() });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
