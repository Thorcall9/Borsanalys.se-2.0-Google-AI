import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24">
      {/* Header */}
      <div className="max-w-3xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold"
        >
          Kontakt
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-none"
        >
          Hör av dig <br /> <span className="italic text-muted">till oss.</span>
        </motion.h1>
        <p className="text-xl text-muted leading-relaxed">
          Har du frågor om våra analyser, förslag på bolag vi borde titta på eller vill du bara prata investeringar? Vi svarar så fort vi kan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h3 className="font-serif font-bold text-xl">E-post</h3>
              <p className="text-sm text-muted">För alla ärenden och frågor:</p>
              <a href="mailto:carl@borsanalys.se" className="text-primary font-bold hover:underline">
                carl@borsanalys.se
              </a>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h3 className="font-serif font-bold text-xl">Svarstid</h3>
              <p className="text-sm text-muted">Vi strävar efter att svara på alla mejl inom 24 timmar på vardagar.</p>
            </div>
          </div>

          <div className="p-8 bg-section-alt rounded-3xl space-y-4">
            <h3 className="font-serif font-bold text-2xl">Vanliga frågor</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm">Hur ofta uppdateras analyserna?</h4>
                <p className="text-xs text-muted mt-1">Vi uppdaterar våra analyser löpande vid kvartalsrapporter och vid större händelser i bolagen.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm">Kan jag önska en analys?</h4>
                <p className="text-xs text-muted mt-1">Absolut! Skicka ett mejl till oss med bolaget du är intresserad av så lägger vi till det i vår bevakningslista.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="bg-white border border-border rounded-[2rem] p-8 md:p-12 shadow-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted">Namn</label>
                <input 
                  type="text" 
                  className="w-full bg-section-alt border border-border rounded-xl p-4 focus:border-primary outline-none transition-colors"
                  placeholder="Ditt namn"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted">E-post</label>
                <input 
                  type="email" 
                  className="w-full bg-section-alt border border-border rounded-xl p-4 focus:border-primary outline-none transition-colors"
                  placeholder="din@mejl.se"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted">Ärende</label>
              <select className="w-full bg-section-alt border border-border rounded-xl p-4 focus:border-primary outline-none transition-colors appearance-none">
                <option>Allmän fråga</option>
                <option>Analysönskemål</option>
                <option>Teknisk support</option>
                <option>Samarbete</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted">Meddelande</label>
              <textarea 
                rows={5}
                className="w-full bg-section-alt border border-border rounded-xl p-4 focus:border-primary outline-none transition-colors resize-none"
                placeholder="Hur kan vi hjälpa dig?"
              />
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
              Skicka meddelande <MessageSquare size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
