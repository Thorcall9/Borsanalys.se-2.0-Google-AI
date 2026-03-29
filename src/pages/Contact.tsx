import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, ChevronRight } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSent(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
      {/* Header */}
      <div className="max-w-4xl space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-black uppercase tracking-[0.4em] text-primary"
        >
          Kontakt
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]"
        >
          Hör av dig <br /> <span className="text-primary">till oss.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl"
        >
          Har du frågor om våra analyser, förslag på bolag vi borde titta på eller vill du bara prata investeringar? Vi svarar så fort vi kan.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5">
                <Mail size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter">E-post</h3>
                <p className="text-sm text-muted-foreground font-medium">För alla ärenden och frågor:</p>
                <a href="mailto:carl@borsanalys.se" className="text-primary font-black hover:underline block text-lg tracking-tight">
                  carl@borsanalys.se
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5">
                <Clock size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter">Svarstid</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">Vi strävar efter att svara på alla mejl inom 24 timmar på vardagar.</p>
              </div>
            </div>
          </div>

          <div className="p-12 bg-muted/30 border border-border rounded-[3rem] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-3xl font-black tracking-tighter relative z-10">Vanliga frågor</h3>
            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary">Hur ofta uppdateras analyserna?</h4>
                <p className="text-base text-muted-foreground font-medium leading-relaxed">Vi uppdaterar våra analyser löpande vid kvartalsrapporter och vid större händelser i bolagen.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-sm uppercase tracking-widest text-primary">Kan jag önska en analys?</h4>
                <p className="text-base text-muted-foreground font-medium leading-relaxed">Absolut! Skicka ett mejl till oss med bolaget du är intresserad av så lägger vi till det i vår bevakningslista.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-card border border-border rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-black/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 px-2">Namn</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-muted/30 border border-border rounded-2xl p-5 focus:border-primary outline-none transition-all font-medium text-lg shadow-inner"
                  placeholder="Ditt namn"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 px-2">E-post</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-muted/30 border border-border rounded-2xl p-5 focus:border-primary outline-none transition-all font-medium text-lg shadow-inner"
                  placeholder="din@mejl.se"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 px-2">Ärende</label>
              <div className="relative">
                <select className="w-full bg-muted/30 border border-border rounded-2xl p-5 focus:border-primary outline-none transition-all font-medium text-lg shadow-inner appearance-none">
                  <option>Allmän fråga</option>
                  <option>Analysönskemål</option>
                  <option>Teknisk support</option>
                  <option>Samarbete</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ChevronRight size={20} className="rotate-90" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 px-2">Meddelande</label>
              <textarea 
                required
                rows={5}
                className="w-full bg-muted/30 border border-border rounded-2xl p-5 focus:border-primary outline-none transition-all font-medium text-lg shadow-inner resize-none"
                placeholder="Hur kan vi hjälpa dig?"
              />
            </div>
            <div className="space-y-4">
              <motion.button 
                disabled={isSubmitting || isSent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-6 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-4 ${
                  isSent 
                    ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                    : "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90"
                }`}
              >
                {isSubmitting ? "Skickar..." : isSent ? "Skickat!" : "Skicka meddelande"} 
                {!isSubmitting && !isSent && <MessageSquare size={20} />}
              </motion.button>
              {isSent && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm font-bold text-emerald-500"
                >
                  Tack för ditt meddelande! Vi hör av oss så snart vi kan.
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
