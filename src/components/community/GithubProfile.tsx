import React, { useState, useEffect } from "react";
import { Github, Star, GitFork, Users, Book, ExternalLink, Loader2 } from "lucide-react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
}

interface GithubProfileProps {
  token: string;
}

export default function GithubProfile({ token }: GithubProfileProps) {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch User Profile
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        
        if (!userResponse.ok) throw new Error("Kunde inte hämta GitHub-profil");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch Top Repositories
        const reposResponse = await fetch("https://api.github.com/user/repos?sort=updated&per_page=6", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        
        if (!reposResponse.ok) throw new Error("Kunde inte hämta GitHub-repositorier");
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (err: any) {
        console.error("GitHub API error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm text-muted font-mono uppercase tracking-widest">Hämtar GitHub-data...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl text-center">
        <p className="text-red-500 text-sm font-bold mb-2">Ett fel uppstod</p>
        <p className="text-xs text-muted">{error || "Kunde inte ladda profil"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-section-alt/50 p-6 rounded-3xl border border-border/50">
        <img src={user.avatar_url} alt={user.name} className="w-20 h-20 rounded-2xl shadow-md" />
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h3 className="text-xl font-serif font-bold">{user.name || user.login}</h3>
            <span className="text-xs font-mono text-muted">@{user.login}</span>
          </div>
          <p className="text-sm text-muted max-w-xl">{user.bio || "Ingen biografi tillgänglig."}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Users size={14} className="text-primary" />
              <span>{user.followers} följare</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Book size={14} className="text-primary" />
              <span>{user.public_repos} repos</span>
            </div>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Visa på GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-mono uppercase tracking-widest text-muted font-bold">Senaste Repositorier</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold group-hover:text-primary transition-colors truncate pr-4">{repo.name}</h5>
                {repo.language && (
                  <span className="text-[10px] px-2 py-0.5 bg-section-alt rounded-full font-mono text-muted">
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted line-clamp-2 mb-4 h-8">
                {repo.description || "Ingen beskrivning."}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
                <div className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
