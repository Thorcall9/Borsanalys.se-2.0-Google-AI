import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let auth: any = null;
let initError: any = null;

try {
  const apps = getApps();
  if (!apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.trim()
      : undefined;

    if (privateKey) {
      while (privateKey.startsWith('"') || privateKey.startsWith("'")) {
        privateKey = privateKey.substring(1).trim();
      }
      while (privateKey.endsWith('"') || privateKey.endsWith("'")) {
        privateKey = privateKey.slice(0, -1).trim();
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      initializeApp();
    }
  }
  auth = getAuth();
} catch (err: any) {
  console.error("Firebase Admin initialization failed:", err);
  initError = err;
}

export { auth, initError };


