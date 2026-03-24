import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer text-white border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">
              Börsanalys<span className="text-primary">.se</span>
            </span>
          </div>
          <p className="text-sm text-white/60 max-w-sm leading-relaxed">
            AI-driven aktieanalys för smartare investeringar. Detaljerade analyser, värderingsmodeller och finansiella verktyg.
          </p>
          <div className="flex gap-4">
            <button className="text-white/40 hover:text-primary transition-colors">
              <Twitter size={20} />
            </button>
            <button className="text-white/40 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </button>
            <a href="mailto:carl@borsanalys.se" className="text-white/40 hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Navigation</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/analys" className="hover:text-primary transition-colors">Analyser</Link></li>
            <li><Link to="/verktyg/rantakalkylator" className="hover:text-primary transition-colors">Ränta-på-ränta kalkylator</Link></li>
            <li><Link to="/verktyg/malsparandekalkylator" className="hover:text-primary transition-colors">Målsparandekalkylator</Link></li>
            <li><Link to="/om-oss" className="hover:text-primary transition-colors">Om oss</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Håll dig uppdaterad</div>
          <p className="text-xs text-white/60 leading-relaxed">
            Prenumerera för att få nyhetsbrev och de senaste analyserna direkt i din mejl.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Din e-post" 
              className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs w-full focus:border-primary outline-none transition-colors"
            />
            <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
              Prenumerera
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          © 2026 Börsanalys.se — Alla rättigheter förbehållna
        </div>
        <div className="flex gap-6">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Integritetspolicy</span>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Användarvillkor</span>
        </div>
      </div>
    </footer>
  );
}
