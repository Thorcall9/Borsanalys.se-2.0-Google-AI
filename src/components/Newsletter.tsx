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
    <section className="homepage-section border-y border-border bg-section-alt">
      <div className="homepage-container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Mail className="h-4 w-4" />
                <span>Veckobrev</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Få Börsanalys.se i inkorgen</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
                Veckans viktigaste analyser och rapportkommentarer, samlade i ett kort nyhetsbrev.
              </p>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col items-center gap-3 sm:flex-row">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress" 
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-xl border border-border bg-background px-5 py-3.5 text-base font-medium transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.95 } : {}}
                  className={`primary-action w-full px-5 py-2.5 sm:absolute sm:right-1.5 sm:w-auto ${
                    status === 'success' 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-500'
                      : ''
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
                      status === 'error' ? 'text-red-500' : 'text-emerald-500'
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-5 text-center text-xs text-muted-foreground lg:text-left">
                Genom att prenumerera godkänner du vår integritetspolicy.
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};
