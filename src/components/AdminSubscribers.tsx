import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Calendar, Loader2, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const ADMIN_EMAIL = 'carl.fredrik.thor@gmail.com';

export const AdminSubscribers: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (user?.email !== ADMIN_EMAIL) {
      setLoading(false);
      return;
    }

    const fetchSubscribers = async () => {
      try {
        const response = await fetch('/api/admin/subscribers');
        if (!response.ok) {
          throw new Error('Kunde inte hämta prenumeranter');
        }
        const data = await response.json();
        setSubscribers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Åtkomst nekad</h1>
          <p className="text-muted-foreground">Du har inte behörighet att se denna sida.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">Prenumeranter</h1>
              <p className="text-muted-foreground font-medium">Lista över alla som anmält sig via Neon-databasen.</p>
            </div>
          </div>

          {error ? (
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 flex flex-col items-center text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Ett fel uppstod</h2>
              <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
              <p className="text-xs font-mono bg-red-500/10 p-4 rounded-xl text-red-500">
                Kontrollera att DATABASE_URL är konfigurerad och att tabellen 'subscribers' finns i Neon.
              </p>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-20 rounded-3xl border border-dashed border-border flex flex-col items-center text-center">
              <Mail className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-bold mb-2">Inga prenumeranter än</h2>
              <p className="text-muted-foreground">Dina framtida läsare kommer att dyka upp här.</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">E-post</th>
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                        <td className="px-8 py-6 font-bold">{sub.email}</td>
                        <td className="px-8 py-6 text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(sub.created_at).toLocaleDateString('sv-SE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-muted/30 border-t border-border flex justify-between items-center">
                <span className="text-sm font-bold text-muted-foreground">Totalt antal:</span>
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-black">{subscribers.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
