import React from "react";
import { ArrowRight, BarChart3, CalendarDays, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { analyses } from "../../data/analyses";
import { getLatestPublications } from "../../lib/profileOverview";
import { CONTENT_TYPE_LABELS } from "../../hooks/useAnalysisFilters";

export default function RecentPublications() {
  const publications = getLatestPublications(Object.values(analyses), 3);

  return (
    <section className="space-y-4" aria-labelledby="recent-publications-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="recent-publications-title" className="text-3xl font-serif font-bold tracking-tight">Senaste analyser och rapportkommentarer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Det senaste publicerade innehållet från Börsanalys.se.</p>
        </div>
        <Link to="/analys" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          Se alla analyser <ArrowRight size={15} />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm divide-y divide-border">
        {publications.map((item, index) => {
          const isReport = item.contentType === "report-commentary";
          const isPrimary = index === 0;
          return (
            <Link key={item.slug} to={`/analys/${item.slug}`} className={`group flex items-center gap-4 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${isPrimary ? "recent-publication-primary" : "recent-publication-secondary"}`}>
              <div className={`flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ${isPrimary ? "h-12 w-12" : "h-10 w-10"}`}>
                {isReport ? <FileText size={18} /> : <BarChart3 size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary ${isPrimary ? "md:text-[11px]" : ""}`}>
                  <span>{CONTENT_TYPE_LABELS[item.contentType as keyof typeof CONTENT_TYPE_LABELS] || "Analys"}</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground">{item.ticker}</span>
                </div>
                <h3 className={`mt-1 truncate font-black text-foreground group-hover:text-primary ${isPrimary ? "text-base md:text-lg" : "text-sm"}`}>{item.listTitle || item.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays size={12} /> Publicerad {new Date(item.date).toLocaleDateString("sv-SE")}</p>
              </div>
              <ArrowRight size={17} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
