import { useEffect, useRef } from 'react';
import { LockKeyhole } from 'lucide-react';
import { SavingsGoalDashboard } from '../components/house/SavingsGoalDashboard';
import { useAuth } from '../contexts/AuthContext';

export default function Huskapital() {
  const { user, loading, openLoginModal } = useAuth();
  const loginRequested = useRef(false);

  useEffect(() => {
    if (loading || user || loginRequested.current) return;
    loginRequested.current = true;
    openLoginModal();
  }, [loading, openLoginModal, user]);

  useEffect(() => {
    if (user) loginRequested.current = false;
  }, [user]);

  if (loading) {
    return <div className="flex min-h-[65vh] items-center justify-center bg-[#f7f4ed]"><div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d8cdbb] border-t-[#123f31]" aria-label="Laddar Huskapital" /></div>;
  }

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#f7f4ed] px-6 py-16">
        <section className="mx-auto max-w-lg rounded-[2rem] border border-[#ded3c0] bg-[#fffaf0] p-8 text-center shadow-[0_24px_70px_-45px_rgba(18,63,49,0.6)] sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6eedf] text-[#23694f]"><LockKeyhole size={22} aria-hidden="true" /></div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">Personlig bostadsresa</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Logga in för att öppna Huskapital</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#627168]">Här sparas er plan, kapitalhistorik och vägen till nästa bostad.</p>
          <button type="button" onClick={openLoginModal} className="mt-6 rounded-2xl bg-[#123f31] px-5 py-3 text-sm font-bold text-[#fffaf0] hover:bg-[#1b5542]">Logga in eller skapa konto</button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ed] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <SavingsGoalDashboard uid={user.uid} />
      </div>
    </main>
  );
}
