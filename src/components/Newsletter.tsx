import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

interface NewsletterProps {
  variant?: "inline" | "card";
}

export default function Newsletter({ variant = "card" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const path = `newsletter_subscriptions/${email.toLowerCase()}`;
      await setDoc(doc(db, "newsletter_subscriptions", email.toLowerCase()), {
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
      });
      
      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Newsletter error:", err);
      setError("Något gick fel. Försök igen senare.");
      // We don't necessarily want to crash the whole app with handleFirestoreError here,
      // but we can log it properly.
      try {
        handleFirestoreError(err, OperationType.WRITE, `newsletter_subscriptions/${email}`);
      } catch (e) {
        // Silent catch to prevent crash but ensure logging happened
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3"
            >
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-postadress" 
                required
                className="flex-grow px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:border-primary/50 transition-all text-sm"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Prenumerera <Send size={16} /></>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 text-success font-bold py-3"
            >
              <CheckCircle2 size={20} /> Tack! Du är nu anmäld.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section className="bg-section-alt border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Nyhetsbrev</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Få våra analyser direkt i din inkorg</h2>
          <p className="text-muted leading-relaxed">
            Varje vecka skickar vi ut en sammanfattning av de senaste analyserna, guiderna och marknadstrenderna. Helt gratis.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-muted uppercase tracking-widest ml-1">E-postadress</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="namn@exempel.se" 
                    required
                    className="w-full px-4 py-4 bg-section-alt border border-border rounded-xl focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Börja prenumerera <Send size={18} /></>
                  )}
                </button>
                {error && (
                  <p className="text-xs text-red-500 text-center">{error}</p>
                )}
                <p className="text-[10px] text-center text-muted">
                  Genom att prenumerera godkänner du vår integritetspolicy. Du kan avbryta när som helst.
                </p>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold">Välkommen ombord!</h3>
                  <p className="text-sm text-muted">Vi har skickat ett bekräftelsemejl till din adress.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
