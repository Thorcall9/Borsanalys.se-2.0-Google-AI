import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Mail, Facebook, Apple, Loader2, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    loginWithGoogle, 
    loginWithFacebook,
    loginWithApple,
    loginWithMicrosoft,
    loginWithEmail,
    signUpWithEmail
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        if (!displayName) {
          throw new Error('Namn krävs för att skapa konto');
        }
        await signUpWithEmail(email, password, displayName);
      }
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl shadow-black/20 overflow-y-auto max-h-[90vh]"
          >
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/2" />

            <button
              onClick={closeLoginModal}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tighter">
                  {mode === 'login' ? 'Välkommen tillbaka' : 'Skapa konto'}
                </h2>
                <p className="text-muted-foreground font-medium">
                  {mode === 'login' 
                    ? 'Logga in för att spara dina analyser och bevakningar.' 
                    : 'Börja din resa mot bättre investeringar idag.'}
                </p>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={loginWithGoogle}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-bold border border-border hover:bg-gray-50 transition-all group text-sm"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Google
                </button>

                <button
                  onClick={loginWithFacebook}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:bg-[#166fe5] transition-all group text-sm"
                >
                  <Facebook size={16} className="group-hover:scale-110 transition-transform" />
                  Facebook
                </button>

                <button
                  onClick={loginWithApple}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all group text-sm"
                >
                  <Apple size={16} className="group-hover:scale-110 transition-transform" />
                  Apple
                </button>

                <button
                  onClick={loginWithMicrosoft}
                  className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-bold border border-border hover:bg-gray-50 transition-all group text-sm"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Fortsätt med Microsoft
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-card px-4 text-muted-foreground">Eller e-post</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs font-bold">
                    {error}
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Namn</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Ditt namn"
                        className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">E-post</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@epost.se"
                      className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Lösenord</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    mode === 'login' ? 'Logga in' : 'Skapa konto'
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  {mode === 'login' ? 'Inget konto? Skapa ett här' : 'Har du redan ett konto? Logga in'}
                </button>
              </div>

              <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
                Genom att logga in godkänner du våra <br />
                <Link to="/villkor" onClick={closeLoginModal} className="underline hover:text-primary transition-colors">Användarvillkor</Link> och <Link to="/integritet" onClick={closeLoginModal} className="underline hover:text-primary transition-colors">Integritetspolicy</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
