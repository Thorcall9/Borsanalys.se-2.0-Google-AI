import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);

type FirebaseAuthClient = Pick<typeof import('firebase/auth'),
  | 'onAuthStateChanged'
  | 'signInWithPopup'
  | 'GoogleAuthProvider'
  | 'FacebookAuthProvider'
  | 'OAuthProvider'
  | 'signInWithEmailAndPassword'
  | 'createUserWithEmailAndPassword'
  | 'updateProfile'
  | 'signOut'
> & { auth: import('firebase/auth').Auth };

type FirebaseFirestoreClient = Pick<typeof import('firebase/firestore'),
  | 'doc'
  | 'getDoc'
  | 'setDoc'
  | 'serverTimestamp'
  | 'collection'
  | 'getDocs'
  | 'query'
  | 'where'
  | 'orderBy'
  | 'onSnapshot'
  | 'addDoc'
  | 'deleteDoc'
  | 'increment'
  | 'updateDoc'
  | 'writeBatch'
> & { db: import('firebase/firestore').Firestore };

let authPromise: Promise<FirebaseAuthClient> | null = null;
let firestorePromise: Promise<FirebaseFirestoreClient> | null = null;

export function loadFirebaseAuth() {
  if (!authPromise) {
    authPromise = import('firebase/auth').then((firebaseAuth) => ({
      auth: firebaseAuth.getAuth(app),
      onAuthStateChanged: firebaseAuth.onAuthStateChanged,
      signInWithPopup: firebaseAuth.signInWithPopup,
      GoogleAuthProvider: firebaseAuth.GoogleAuthProvider,
      FacebookAuthProvider: firebaseAuth.FacebookAuthProvider,
      OAuthProvider: firebaseAuth.OAuthProvider,
      signInWithEmailAndPassword: firebaseAuth.signInWithEmailAndPassword,
      createUserWithEmailAndPassword: firebaseAuth.createUserWithEmailAndPassword,
      updateProfile: firebaseAuth.updateProfile,
      signOut: firebaseAuth.signOut,
    }));
  }
  return authPromise;
}

export function loadFirebaseFirestore() {
  if (!firestorePromise) {
    firestorePromise = import('firebase/firestore').then((firestore) => ({
      db: firestore.getFirestore(app, firebaseConfig.firestoreDatabaseId),
      doc: firestore.doc,
      getDoc: firestore.getDoc,
      setDoc: firestore.setDoc,
      serverTimestamp: firestore.serverTimestamp,
      collection: firestore.collection,
      getDocs: firestore.getDocs,
      query: firestore.query,
      where: firestore.where,
      orderBy: firestore.orderBy,
      onSnapshot: firestore.onSnapshot,
      addDoc: firestore.addDoc,
      deleteDoc: firestore.deleteDoc,
      increment: firestore.increment,
      updateDoc: firestore.updateDoc,
      writeBatch: firestore.writeBatch,
    }));
  }
  return firestorePromise;
}

// --- Error Handling ---
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: undefined,
      email: undefined,
      emailVerified: undefined,
      isAnonymous: undefined,
      tenantId: undefined,
      providerInfo: []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default app;
