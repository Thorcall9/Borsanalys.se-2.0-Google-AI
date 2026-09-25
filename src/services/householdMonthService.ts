import { handleFirestoreError, loadFirebaseFirestore, OperationType } from '../firebase';
import { validHouseholdMonth, type HouseholdMonth } from '../lib/householdMonth';

export async function listHouseholdMonths(uid: string): Promise<HouseholdMonth[]> {
  if (!uid.trim()) throw new Error('Du behöver vara inloggad.');
  const path = `users/${uid}/householdMonths`;
  try {
    const firestore = await loadFirebaseFirestore();
    const snapshot = await firestore.getDocs(firestore.collection(firestore.db, 'users', uid, 'householdMonths'));
    return snapshot.docs.map((doc) => ({ month: doc.id, ...doc.data() } as HouseholdMonth))
      .filter(validHouseholdMonth).sort((a, b) => b.month.localeCompare(a.month));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function saveHouseholdMonth(uid: string, entry: HouseholdMonth): Promise<void> {
  if (!uid.trim() || !validHouseholdMonth(entry)) throw new Error('Kontrollera beloppen och försök igen.');
  const path = `users/${uid}/householdMonths/${entry.month}`;
  try {
    const firestore = await loadFirebaseFirestore();
    const { month, ...amounts } = entry;
    await firestore.setDoc(firestore.doc(firestore.db, 'users', uid, 'householdMonths', month), {
      ...amounts, updatedAt: firestore.serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
