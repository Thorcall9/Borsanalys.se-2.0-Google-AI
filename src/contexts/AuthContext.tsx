import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { loadFirebaseAuth, loadFirebaseFirestore } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  openSignupModal: () => void;
  loginModalMode: 'login' | 'signup';
  closeLoginModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  updateUserProfile: (profile: { displayName: string; photoURL: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login');
  const [, setProfileVersion] = useState(0);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const initializeAuth = async () => {
      try {
        const { auth, onAuthStateChanged } = await loadFirebaseAuth();
        if (cancelled) return;

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const { db, doc, getDoc, setDoc, serverTimestamp } = await loadFirebaseFirestore();
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                createdAt: serverTimestamp(),
                role: 'user'
              });
            }
          }
          if (!cancelled) {
            setUser(currentUser);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Firebase auth initialization failed:', error);
        if (!cancelled) setLoading(false);
      }
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(initializeAuth, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(initializeAuth, 1000);
    }

    return () => {
      cancelled = true;
      unsubscribe();
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const openLoginModal = () => { setLoginModalMode('login'); setIsLoginModalOpen(true); };
  const openSignupModal = () => { setLoginModalMode('signup'); setIsLoginModalOpen(true); };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginWithGoogle = async () => {
    const { auth, signInWithPopup, GoogleAuthProvider } = await loadFirebaseAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      closeLoginModal();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const loginWithFacebook = async () => {
    const { auth, signInWithPopup, FacebookAuthProvider } = await loadFirebaseAuth();
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      closeLoginModal();
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const loginWithApple = async () => {
    const { auth, signInWithPopup, OAuthProvider } = await loadFirebaseAuth();
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
      closeLoginModal();
    } catch (error) {
      console.error('Apple login failed:', error);
    }
  };

  const loginWithMicrosoft = async () => {
    const { auth, signInWithPopup, OAuthProvider } = await loadFirebaseAuth();
    const provider = new OAuthProvider('microsoft.com');
    try {
      await signInWithPopup(auth, provider);
      closeLoginModal();
    } catch (error) {
      console.error('Microsoft login failed:', error);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const { auth, signInWithEmailAndPassword } = await loadFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      closeLoginModal();
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const { auth, createUserWithEmailAndPassword, updateProfile } = await loadFirebaseAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      const { db, doc, setDoc, serverTimestamp } = await loadFirebaseFirestore();
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        photoURL: null,
        createdAt: serverTimestamp(),
        role: 'user'
      });

      closeLoginModal();
    } catch (error) {
      console.error('Email sign up failed:', error);
      throw error;
    }
  };

  const updateUserProfile = async ({ displayName, photoURL }: { displayName: string; photoURL: string }) => {
    const { auth, updateProfile } = await loadFirebaseAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Du måste vara inloggad för att ändra profilen.');

    await updateProfile(currentUser, { displayName, photoURL: photoURL || null });
    const { db, doc, setDoc } = await loadFirebaseFirestore();
    await setDoc(doc(db, 'users', currentUser.uid), {
      displayName,
      photoURL: photoURL || null,
    }, { merge: true });
    setProfileVersion((version) => version + 1);
  };

  const logout = async () => {
    try {
      const { auth, signOut } = await loadFirebaseAuth();
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoginModalOpen, 
      openLoginModal,
      openSignupModal,
      loginModalMode,
      closeLoginModal, 
      loginWithGoogle, 
      loginWithFacebook,
      loginWithApple,
      loginWithMicrosoft,
      loginWithEmail,
      signUpWithEmail,
      updateUserProfile,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
