import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { useAuth } from "../contexts/AuthContext";

export interface ProgressSection {
  id: string;
  number?: string;
  title: string;
}

export type AnalysisContentType = "analysis" | "report-commentary" | "market-update" | "guide" | "other";

export interface ProgressOptions {
  sections?: ProgressSection[];
  analysisSlug?: string;
  contentType?: AnalysisContentType;
  nextTitle?: string;
  nextHref?: string;
  label?: "analys" | "guide";
  companyName?: string;
  ticker?: string;
}

export interface ProgressSnapshot {
  percent: number;
  activeId?: string;
  sections: ProgressSection[];
  activeIndex: number;
}

const thresholdNames = [
  [25, "analysis_progress_25"],
  [50, "analysis_progress_50"],
  [70, "analysis_progress_70"],
  [90, "analysis_progress_90"],
  [100, "analysis_progress_100"],
] as const;
const panelEventNames = {
  expanded: "progress_panel_expanded",
  collapsed: "progress_panel_collapsed",
} as const;
const memoryTrackedEvents = new Set<string>();

function viewportCategory() {
  if (typeof window === "undefined") return "unknown";
  if (window.innerWidth < 640) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
}

function safeTrack(name: string, data: Record<string, string | number | boolean | null>) {
  try { track(name, data); } catch { /* Analytics must never affect reading. */ }
}

function trackOnce(key: string, name: string, data: Record<string, string | number | boolean | null>) {
  if (memoryTrackedEvents.has(key)) return;
  try {
    const storageKey = `analysis-progress-event:${key}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");
  } catch { /* Continue without storage when it is unavailable. */ }
  memoryTrackedEvents.add(key);
  safeTrack(name, data);
}

function discoverSections(explicitSections?: ProgressSection[]) {
  if (typeof document === "undefined") return explicitSections || [];
  const marked = Array.from(document.querySelectorAll<HTMLElement>("[data-analysis-section]"));
  const nodes = marked.length ? marked : Array.from(document.querySelectorAll<HTMLElement>("main section, main [id], main h2"))
    .filter((node) => !node.closest("[data-analysis-section]") && (node.matches("h2") || node.querySelector("h2, h3")))
    .filter((node, index, candidates) => !candidates.some((candidate, candidateIndex) => candidateIndex !== index && candidate.contains(node)));
  const seen = new Set<string>();
  return nodes.reduce<ProgressSection[]>((result, node, index) => {
    const id = node.id || `analysis-section-${index + 1}`;
    if (!node.id) node.id = id;
    if (seen.has(id)) return result;
    seen.add(id);
    result.push({
      id,
      number: node.dataset.sectionIndex || explicitSections?.[index]?.number,
      title: node.dataset.sectionTitle || node.querySelector("h2, h3")?.textContent?.trim() || explicitSections?.[index]?.title || `Sektion ${index + 1}`,
    });
    return result;
  }, []);
}

export function useAnalysisProgress({ sections: explicitSections, analysisSlug, contentType = "analysis" }: ProgressOptions = {}): ProgressSnapshot {
  const [sections, setSections] = useState<ProgressSection[]>(explicitSections || []);
  const [percent, setPercent] = useState(0);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const reportedThresholds = useRef(new Set<number>());

  const syncSections = useCallback(() => {
    const next = discoverSections(explicitSections);
    setSections((previous) => next.length === previous.length && next.every((item, index) => item.id === previous[index]?.id && item.title === previous[index]?.title) ? previous : next);
    return next;
  }, [explicitSections]);

  useEffect(() => {
    const nextSections = syncSections();
    const content = document.querySelector<HTMLElement>("[data-analysis-content]") || document.querySelector<HTMLElement>("main");
    if (!content) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.5] });
    nextSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = content.getBoundingClientRect();
        const contentTop = rect.top + window.scrollY;
        const contentHeight = Math.max(1, rect.height - window.innerHeight * 0.35);
        const position = window.scrollY + window.innerHeight * 0.35 - contentTop;
        const nextPercent = Math.min(100, Math.max(0, Math.round((position / contentHeight) * 100)));
        setPercent(nextPercent);
        thresholdNames.forEach(([threshold, eventName]) => {
          if (nextPercent >= threshold && !reportedThresholds.current.has(threshold)) {
            reportedThresholds.current.add(threshold);
            trackOnce(`${analysisSlug || window.location.pathname}:${eventName}`, eventName, { analysis_slug: analysisSlug || null, content_type: contentType, progress_percentage: nextPercent, logged_in: Boolean((window as any).__analysisLoggedIn), viewport_category: viewportCategory() });
          }
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); cancelAnimationFrame(frame); };
  }, [analysisSlug, contentType, syncSections]);

  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === activeId));
  return { percent, activeId, sections, activeIndex };
}

export function progressStatus(activeIndex: number, percent: number, title?: string) {
  if (percent >= 100) return "Analysen är genomläst";
  if (title?.toLowerCase().includes("bransch") || title?.toLowerCase().includes("moat")) return "Nu granskas branschen och konkurrensfördelarna";
  if (title?.toLowerCase().includes("finansiell")) return "Nu kommer bolagets finansiella kvalitet";
  if (title?.toLowerCase().includes("scorecard")) return "Halvvägs – dags för det sammanvägda scorecardet";
  if (title?.toLowerCase().includes("värdering")) return "Nu kommer värderingen och kursscenarierna";
  if (title?.toLowerCase().includes("kursdrivare")) return "Vilka faktorer kan driva aktien framåt?";
  if (title?.toLowerCase().includes("risk")) return "Nu granskas de viktigaste riskerna";
  if (title?.toLowerCase().includes("tesföränd")) return "Vad skulle förändra investeringscaset?";
  if (title?.toLowerCase().includes("investeringsbeslut")) return "Slutsatsen – så ser helhetsbedömningen ut";
  if (percent >= 90) return "Nästan klar";
  if (percent >= 70) return "Bra jobbat – slutsatsen återstår";
  if (percent >= 50) return "Halvvägs – värderingen närmar sig";
  if (percent >= 25) return "Du närmar dig den finansiella analysen";
  return "Du har påbörjat analysen";
}

interface ProgressBarProps { percent: number; label?: string; }
function ProgressBar({ percent, label = "Läsprogression" }: ProgressBarProps) {
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div>;
}

function SectionList({ snapshot, onNavigate }: { snapshot: ProgressSnapshot; onNavigate: (id: string) => void }) {
  return <div className="space-y-1">{snapshot.sections.map((section, index) => {
    const active = snapshot.activeId === section.id;
    const complete = index < snapshot.activeIndex || snapshot.percent >= 100;
    return <button key={section.id} onClick={() => onNavigate(section.id)} className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-primary/10 text-foreground" : complete ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"}`}><span className="mr-2 inline-flex w-5 justify-center font-black">{complete ? <Check size={12} className="text-primary" /> : section.number || index + 1}</span>{section.title}</button>;
  })}</div>;
}

export function DesktopAnalysisProgress({ snapshot }: { snapshot: ProgressSnapshot }) {
  const active = snapshot.sections[snapshot.activeIndex];
  return <div className="mb-6 border-b border-border px-8 pb-6"><div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground"><span>Läsprogression</span><span className="text-foreground">{snapshot.percent}%</span></div><ProgressBar percent={snapshot.percent} /><div className="mt-3 text-[10px] font-bold leading-relaxed text-muted-foreground">{active && snapshot.sections.length ? `Del ${snapshot.activeIndex + 1} av ${snapshot.sections.length} · ${active.title}` : "Läsprogression"}</div><p className="mt-1 text-[10px] text-muted-foreground/70">{progressStatus(snapshot.activeIndex, snapshot.percent, active?.title)}</p></div>;
}

export default function AnalysisProgressExperience({ analysisSlug, contentType = "analysis", nextTitle, nextHref, label = "analys", companyName, ticker }: ProgressOptions) {
  const { user } = useAuth();
  const snapshot = useAnalysisProgress({ analysisSlug, contentType });
  const [expanded, setExpanded] = useState(false);
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); setExpanded(false); };
  const active = snapshot.sections[snapshot.activeIndex];
  const toggle = () => { setExpanded((value) => { const action = value ? "collapsed" : "expanded"; trackOnce(`${analysisSlug || window.location.pathname}:${panelEventNames[action]}`, panelEventNames[action], { analysis_slug: analysisSlug || null, content_type: contentType, progress_percentage: snapshot.percent, logged_in: Boolean((window as any).__analysisLoggedIn), viewport_category: viewportCategory() }); return !value; }); };
  useEffect(() => {
    (window as any).__analysisLoggedIn = Boolean(user);
  }, [user]);
  return <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-border bg-card/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"><div className="mx-auto max-w-xl"><div className="mb-1 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground"><span>{snapshot.percent}% läst</span><span>Del {snapshot.sections.length ? snapshot.activeIndex + 1 : "—"} av {snapshot.sections.length || "—"}</span></div><ProgressBar percent={snapshot.percent} /><div className="mt-2 flex items-center justify-between gap-3"><span className="truncate text-xs font-bold text-foreground">{active?.title || progressStatus(snapshot.activeIndex, snapshot.percent)}</span><button onClick={toggle} aria-expanded={expanded} aria-controls="analysis-progress-sections" className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-3 py-2 text-[10px] font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{expanded ? "Dölj delar" : "Visa analysens delar"}{expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}</button></div>{nextHref && <a href={nextHref} className="mt-2 block truncate text-right text-[10px] font-black uppercase tracking-widest text-primary">Nästa {label}: {nextTitle}</a>}{expanded && <div id="analysis-progress-sections" className="mt-3 max-h-[45vh] overflow-y-auto border-t border-border pt-2"><SectionList snapshot={snapshot} onNavigate={navigate} /></div>}</div></div>;
}
