import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Vänligen ange en giltig e-postadress.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Tack för din anmälan!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Något gick fel. Försök igen senare.');
      }
    } catch (error) {
      console.error('Newsletter Signup Error:', error);
      setStatus('error');
      setMessage('Kunde inte ansluta till servern. Kontrollera din anslutning.');
    }
  };

  return (
    <section className="py-32 bg-card border-y border-border overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Mail className="w-3 h-3" />
                <span>Veckobrev</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">Håll dig steget före <br /> <span className="text-primary">marknaden</span></h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Få våra mest exklusiva analyser och marknadsuppdateringar direkt i din inkorg. Varje söndag, helt gratis.
              </p>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col sm:flex-row items-center gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress" 
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-8 py-6 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg shadow-2xl shadow-black/5 font-medium disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'idle' ? { scale: 1.05, y: -2 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.95 } : {}}
                  className={`w-full sm:w-auto sm:absolute sm:right-3 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                    status === 'success' 
                      ? 'bg-green-500 text-white shadow-green-500/30' 
                      : 'bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90'
                  } disabled:opacity-100`}
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <>
                      Prenumerera
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
              
              <AnimatePresence mode="wait">
                {message && (
                  <motion.p
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 text-sm font-bold px-8 ${
                      status === 'error' ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-6 text-[11px] font-bold text-muted-foreground/80 text-center lg:text-left px-8 uppercase tracking-widest">
                Genom att prenumerera godkänner du vår integritetspolicy. Inget spam, bara värde.
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};
