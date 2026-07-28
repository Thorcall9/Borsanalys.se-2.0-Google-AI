import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { User as UserIcon, Settings, LogOut, Shield, Mail, Calendar } from "lucide-react";
import Watchlist from "../components/community/Watchlist";
import SavedAnalyses from "../components/community/SavedAnalyses";
import ChecklistOverview from "../components/community/ChecklistOverview";
import RecentPublications from "../components/community/RecentPublications";
import { normalizeProfileInput } from "../lib/profile";
import { SavingsGoalDashboard } from "../components/house/SavingsGoalDashboard";

export default function Profile() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({ displayName: "", photoURL: "" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const startEditing = () => {
    setProfileForm({ displayName: user.displayName || "", photoURL: user.photoURL || "" });
    setProfileError(null);
    setProfileNotice(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setProfileError(null);
    setIsEditing(false);
  };

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileError(null);
    setProfileNotice(null);
    try {
      const normalized = normalizeProfileInput(profileForm);
      await updateUserProfile(normalized);
      setProfileNotice("Profilen är uppdaterad.");
      setIsEditing(false);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Profilen kunde inte uppdateras.");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <aside className="w-full md:w-80 space-y-6">
          <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm">
            <div className="relative inline-block mb-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ""} className="w-24 h-24 rounded-full border-4 border-background shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-background shadow-lg">
                  <UserIcon size={40} />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary border-4 border-background rounded-full" title="Online" />
            </div>
            <h2 className="text-2xl font-serif font-bold tracking-tight">{user.displayName || "Medlem"}</h2>
            <p className="text-muted-foreground text-sm mb-6">{user.email}</p>

            {isEditing ? (
              <form onSubmit={saveProfile} className="space-y-4 text-left">
                <div>
                  <label htmlFor="profile-display-name" className="mb-1.5 block text-xs font-bold text-muted-foreground">Visningsnamn</label>
                  <input
                    id="profile-display-name"
                    value={profileForm.displayName}
                    onChange={(event) => setProfileForm((current) => ({ ...current, displayName: event.target.value }))}
                    maxLength={80}
                    required
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="profile-photo-url" className="mb-1.5 block text-xs font-bold text-muted-foreground">Profilbildens URL</label>
                  <input
                    id="profile-photo-url"
                    type="url"
                    value={profileForm.photoURL}
                    onChange={(event) => setProfileForm((current) => ({ ...current, photoURL: event.target.value }))}
                    placeholder="https://…"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="profile-email" className="mb-1.5 block text-xs font-bold text-muted-foreground">E-post</label>
                  <input id="profile-email" value={user.email || ""} readOnly disabled className="w-full cursor-not-allowed rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground" />
                  <p className="mt-1 text-[11px] text-muted-foreground">E-postadressen är kopplad till ditt konto och kan inte ändras här.</p>
                </div>
                {profileError && <p role="alert" className="text-sm font-medium text-red-600">{profileError}</p>}
                <div className="flex flex-wrap gap-2">
                  <button type="submit" disabled={savingProfile} className="flex-1 rounded-xl bg-primary px-3 py-2.5 text-xs font-black text-primary-foreground hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
                    {savingProfile ? "Sparar…" : "Spara ändringar"}
                  </button>
                  <button type="button" onClick={cancelEditing} disabled={savingProfile} className="rounded-xl border border-border px-3 py-2.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary disabled:opacity-60">
                    Avbryt
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <button onClick={startEditing} className="w-full py-2 bg-primary/10 text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Settings size={16} /> Redigera profil
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 bg-red-500/10 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <LogOut size={16} /> Logga ut
                </button>
                {profileNotice && <p role="status" className="pt-1 text-xs font-bold text-primary">{profileNotice}</p>}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-serif font-bold text-sm uppercase tracking-widest text-muted-foreground">Kontoinformation</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={16} className="text-primary" />
                <span className="text-muted-foreground">Medlem (Gratis)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-primary" />
                <span className="text-muted-foreground">Medlem sedan {new Date(user.metadata.creationTime || "").toLocaleDateString('sv-SE')}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-9">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight">Min översikt</h1>
            <p className="mt-2 text-muted-foreground">Samla nästa steg, bevakade bolag och analyser på ett ställe.</p>
          </div>

          <ChecklistOverview />
          <SavingsGoalDashboard uid={user.uid} />

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold tracking-tight">Bevakade bolag</h2>
                <p className="mt-1 text-sm text-muted-foreground">Håll koll på bolagen du vill läsa mer om.</p>
              </div>
            </div>
            <Watchlist />
          </section>

          <RecentPublications />

          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-bold tracking-tight">Sparade analyser</h2>
              <p className="mt-1 text-sm text-muted-foreground">Snabblänkar till dina bokmärkta analyser.</p>
            </div>
            <SavedAnalyses limit={4} />
          </section>

          <section className="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Uppgradera till Premium</h3>
                <p className="text-muted-foreground text-sm">Få tillgång till exklusiva analyser och avancerade verktyg.</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
              Utforska Premium
            </button>
          </section>

        </main>
      </div>
    </div>
  );
}
