import React, { useEffect, useState } from "react";
import { ArrowRight, ClipboardCheck, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAnsweredCount, getStartedChecklists, type SavedChecklistLike } from "../../lib/profileOverview";

export default function ChecklistOverview() {
  const { user } = useAuth();
  const [items, setItems] = useState<SavedChecklistLike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/stock-checklists", { headers: { Authorization: `Bearer ${token}` } });
        if (!response.ok) throw new Error("Checklistorna kunde inte läsas in.");
        const data = await response.json();
        if (!cancelled) setItems(getStartedChecklists(data));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Checklistorna kunde inte läsas in.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <section className="space-y-4" aria-labelledby="checklist-overview-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="checklist-overview-title" className="text-3xl font-serif font-bold tracking-tight">{items.length > 0 ? "Checklistor att fortsätta" : "Dina aktiechecklistor"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{items.length > 0 ? "Fortsätt där du slutade i din bolagsgenomgång." : "Testa ett bolag med våra 12 frågor före nästa aktieköp."}</p>
        </div>
        {items.length > 0 && (
          <Link to="/mina-checklistor" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            Visa alla checklistor <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {loading ? (
          <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground"><Loader2 size={16} className="animate-spin" /> Läser in checklistor…</div>
        ) : error ? (
          <p role="alert" className="p-6 text-sm text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <div className="p-8 text-center">
            <ClipboardCheck size={28} className="mx-auto mb-3 text-primary/60" />
            <p className="text-sm text-muted-foreground">Du har inga påbörjade checklistor.</p>
            <Link to="/aktiechecklista" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              Starta en checklista <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => {
              const answered = getAnsweredCount(item.answers);
              return (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <h3 className="font-black text-foreground">{item.companyName}{item.ticker ? <span className="ml-2 text-sm font-bold text-muted-foreground">{item.ticker}</span> : null}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{answered} av 12 besvarade · senast ändrad {new Date(item.updatedAt).toLocaleDateString("sv-SE")}</p>
                    <div className="mt-3 h-1.5 w-48 max-w-full overflow-hidden rounded-full bg-muted" aria-label={`${answered} av 12 frågor besvarade`}>
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(answered / 12) * 100}%` }} />
                    </div>
                  </div>
                  <Link to={`/aktiechecklista?checklistId=${item.id}`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-black uppercase tracking-wider text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Fortsätt <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
