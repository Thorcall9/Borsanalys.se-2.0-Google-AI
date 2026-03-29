import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Twitter, Linkedin, Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-background border-t border-border px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 space-y-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/20">
              <TrendingUp size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tighter text-foreground">
              Börsanalys<span className="text-primary">.se</span>
            </span>
          </Link>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed font-medium">
            Professionella aktieanalyser drivna av data och AI. Vi hjälper moderna investerare att fatta välgrundade beslut genom objektivitet och precision.
          </p>
          <div className="flex gap-6">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <Linkedin size={18} />
            </button>
            <a href="mailto:carl@borsanalys.se" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Plattform</div>
          <ul className="space-y-4 text-sm font-bold text-muted-foreground">
            <li><Link to="/analys" className="hover:text-primary transition-colors">Analyser</Link></li>
            <li><Link to="/guider" className="hover:text-primary transition-colors">Guider</Link></li>
            <li><Link to="/skola" className="hover:text-primary transition-colors">Börsskola</Link></li>
            <li><Link to="/marknad" className="hover:text-primary transition-colors">Marknad</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Verktyg</div>
          <ul className="space-y-4 text-sm font-bold text-muted-foreground">
            <li><Link to="/verktyg/rantakalkylator" className="hover:text-primary transition-colors">Ränta-på-ränta</Link></li>
            <li><Link to="/verktyg/malsparandekalkylator" className="hover:text-primary transition-colors">Målsparande</Link></li>
            <li><Link to="/om-oss" className="hover:text-primary transition-colors">Om oss</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Håll dig uppdaterad</div>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Få de senaste analyserna och marknadsinsikterna direkt i din inkorg.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-postadress" 
              disabled={status === 'loading' || status === 'success'}
              className="bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                status === 'success' 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20'
              }`}
            >
              {status === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 size={16} />
              ) : (
                "Prenumerera"
              )}
            </button>
            {status === 'error' && (
              <p className="text-[10px] text-red-500 font-bold px-1">Något gick fel. Försök igen.</p>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest">
          © 2026 Börsanalys.se — Precision i varje analys
        </div>
        <div className="flex gap-10">
          <Link to="/integritet" className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest hover:text-primary transition-colors">Integritetspolicy</Link>
          <Link to="/villkor" className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest hover:text-primary transition-colors">Användarvillkor</Link>
        </div>
      </div>
    </footer>
  );
}
