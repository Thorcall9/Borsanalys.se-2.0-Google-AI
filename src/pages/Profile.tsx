import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { User as UserIcon, Settings, LogOut, Shield, Mail, Calendar, Github, CheckCircle2, ExternalLink } from "lucide-react";
import Watchlist from "../components/community/Watchlist";
import GithubProfile from "../components/community/GithubProfile";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const [githubToken, setGithubToken] = useState<string | null>(localStorage.getItem("github_token"));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      if (!event.origin.endsWith('.run.app') && !event.origin.includes('localhost')) {
        return;
      }
      
      if (event.data?.type === 'GITHUB_AUTH_SUCCESS') {
        const token = event.data.token;
        setGithubToken(token);
        localStorage.setItem("github_token", token);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectGithub = async () => {
    try {
      const response = await fetch('/api/auth/github/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      window.open(url, 'github_oauth', 'width=600,height=700');
    } catch (error) {
      console.error('GitHub connection error:', error);
      alert('Kunde inte starta GitHub-koppling. Kontrollera att GITHUB_CLIENT_ID är konfigurerat.');
    }
  };

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
            <h2 className="text-2xl font-serif font-bold tracking-tight">{user.displayName}</h2>
            <p className="text-muted-foreground text-sm mb-6">{user.email}</p>
            
            <div className="space-y-2">
              <button className="w-full py-2 bg-primary/10 text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors">
                <Settings size={16} /> Redigera profil
              </button>
              <button 
                onClick={logout}
                className="w-full py-2 bg-red-500/10 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={16} /> Logga ut
              </button>
            </div>
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
        <main className="flex-1 space-y-12">
          {githubToken && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif font-bold tracking-tight">GitHub-profil</h2>
                <p className="text-sm text-muted-foreground">Din utvecklaraktivitet synkad</p>
              </div>
              <GithubProfile token={githubToken} />
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold tracking-tight">Min Bevakningslista</h2>
              <p className="text-sm text-muted-foreground">Håll koll på dina favoritaktier</p>
            </div>
            <Watchlist />
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

          <section className="bg-card border border-border rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#24292e] rounded-2xl flex items-center justify-center text-white">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">GitHub-koppling</h3>
                  <p className="text-muted-foreground text-sm">Koppla ditt konto för att synka din utvecklarprofil.</p>
                </div>
              </div>
              {githubToken ? (
                <div className="flex items-center gap-2 text-primary font-bold">
                  <CheckCircle2 size={20} />
                  Kopplad
                </div>
              ) : (
                <button 
                  onClick={handleConnectGithub}
                  className="px-6 py-2 bg-[#24292e] text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center gap-2"
                >
                  <Github size={18} /> Koppla GitHub
                </button>
              )}
            </div>
            {githubToken && (
              <div className="p-4 bg-section-alt rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground">
                  Ditt GitHub-konto är nu kopplat. Vi kan nu hämta data från din profil för att anpassa din upplevelse.
                </p>
                <button 
                  onClick={() => {
                    setGithubToken(null);
                    localStorage.removeItem("github_token");
                  }}
                  className="mt-3 text-xs text-red-500 hover:underline"
                >
                  Koppla ifrån
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
