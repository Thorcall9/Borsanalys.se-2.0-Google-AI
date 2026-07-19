import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, CheckCircle2, Circle, Loader2, X } from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../contexts/AuthContext";
import {
  CHECKLIST_DISCLAIMER,
  ChecklistAnswer,
  ChecklistDraft,
  checklistSummary,
  completedCount,
  emptyChecklist,
  STOCK_CHECKLIST_QUESTIONS,
} from "../data/stockChecklist";
import { track } from "@vercel/analytics/react";
import { CHECKLIST_SAVE_PERCENT, CHECKLIST_SAVE_STEPS, getLeaveDialogCopy } from "../lib/checklistSave";

const DRAFT_KEY = "stock-checklist-draft-v1";
const answerLabels: Record<ChecklistAnswer, string> = { yes: "Ja", uncertain: "Osäker", no: "Nej" };
const safeTrack = (name: string, data: Record<string, string | number | boolean | null>) => { try { track(name, data); } catch {} };
const trackedSaveEvents = new Set<string>();
const trackOnce = (key: string, name: string, data: Record<string, string | number | boolean | null>) => {
  if (trackedSaveEvents.has(key)) return;
  try {
    const storageKey = `checklist-save-event:${key}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");
  } catch {}
  trackedSaveEvents.add(key);
  safeTrack(name, data);
};

function ChecklistResult({ draft }: { draft: ChecklistDraft }) {
  const summary = checklistSummary(draft);
  const sections = [
    { title: "Genomtänkt", key: "thoughtful" as const, className: "border-primary/20 bg-primary/5" },
    { title: "Behöver undersökas", key: "investigate" as const, className: "border-amber-500/30 bg-amber-500/5" },
    { title: "Varningssignaler", key: "warning" as const, className: "border-red-500/25 bg-red-500/5" },
  ];
  return <section aria-labelledby="checklist-result" className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8">
    <div><p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Din sammanfattning</p><h2 id="checklist-result" className="mt-2 text-2xl font-black tracking-tight">Vad behöver du ta med dig?</h2><p className="mt-2 text-sm text-muted-foreground">Det här är en neutral sammanställning av dina svar – inte ett betyg eller en rekommendation.</p></div>
    <div className="grid gap-3 md:grid-cols-3">{sections.map((section) => <div key={section.key} className={`rounded-2xl border p-4 ${section.className}`}><div className="flex items-end justify-between gap-3"><span className="text-sm font-black">{section.title}</span><span className="text-3xl font-black">{summary.counts[section.key]}</span></div><ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">{summary[section.key].slice(0, 3).map((question) => <li key={question.id}>• {question.question}</li>)}{summary[section.key].length > 3 && <li>+ {summary[section.key].length - 3} till</li>}{summary[section.key].length === 0 && <li>Inga svar i denna grupp ännu.</li>}</ul></div>)}</div>
    <p className="text-sm leading-relaxed text-muted-foreground">Gå igenom framför allt frågorna i “Behöver undersökas” och “Varningssignaler” innan du fattar ett beslut. En genomtänkt analys behöver också följas upp när ny information kommer.</p>
  </section>;
}

function SavePrompt({ onContinue, onSave, saving }: { onContinue: () => void; onSave: () => void; saving: boolean }) {
  return <section className="rounded-3xl border border-primary/20 bg-primary/5 p-5 md:p-8" aria-labelledby="checklist-save-title">
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">NÄSTA STEG</p>
    <h2 id="checklist-save-title" className="mt-2 text-2xl font-black tracking-tight">Bra jobbat – checklistan är klar</h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Du har besvarat alla 12 frågor. Skapa ett gratis konto för att spara checklistan och kunna uppdatera den senare.</p>
    <div className="mt-6" aria-label="Din progression">
      <div className="flex items-center justify-between gap-3 text-sm font-black"><span>Din progression</span><span className="text-primary">{CHECKLIST_SAVE_PERCENT} % klart</span></div>
      <div role="progressbar" aria-valuenow={CHECKLIST_SAVE_PERCENT} aria-valuemin={0} aria-valuemax={100} aria-label={`${CHECKLIST_SAVE_PERCENT} procent av checklistans sparflöde klart`} className="mt-3 h-2 overflow-hidden rounded-full bg-background/80"><div className="h-full rounded-full bg-primary" style={{ width: `${CHECKLIST_SAVE_PERCENT}%` }} /></div>
      <ol className="mt-5 grid gap-3 md:grid-cols-4">
        {CHECKLIST_SAVE_STEPS.map((step) => <li key={step.title} className="flex items-start gap-2 text-xs leading-relaxed">
          {step.state === "complete" ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" /> : step.state === "active" ? <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground" aria-hidden="true">●</span> : <Circle size={16} className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
          <span className={step.state === "active" ? "font-black text-foreground" : "text-muted-foreground"}><span className="sr-only">{step.state === "complete" ? "Klar: " : step.state === "active" ? "Aktivt steg: " : "Kommande: "}</span>{step.title}</span>
        </li>)}
      </ol>
    </div>
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-wider text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-wait disabled:opacity-60">{saving && <Loader2 size={14} className="animate-spin" />}Slutför och spara gratis</button>
      <button type="button" onClick={onContinue} disabled={saving} className="rounded-xl px-2 py-3 text-xs font-black uppercase tracking-wider text-muted-foreground underline-offset-4 hover:bg-primary/5 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">Fortsätt utan att spara</button>
    </div>
  </section>;
}

function LeaveWithoutSavingDialog({ hasLocalDraft, onSave, onConfirm, onCancel }: { hasLocalDraft: boolean; onSave: () => void; onConfirm: () => void; onCancel: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onCancel(); return; }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [onCancel]);

  return <div className="fixed inset-0 z-[220] flex items-center justify-center px-4 py-6" role="presentation">
    <button type="button" aria-label="Stäng dialog" onClick={onCancel} className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm" />
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="leave-checklist-title" aria-describedby="leave-checklist-description" tabIndex={-1} className="relative z-10 w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl md:p-8">
      <button type="button" onClick={onCancel} aria-label="Stäng dialog" className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18} /></button>
      <h2 id="leave-checklist-title" className="pr-8 text-2xl font-black tracking-tight">Vill du lämna utan att spara?</h2>
      <p id="leave-checklist-description" className="mt-3 text-sm leading-relaxed text-muted-foreground">{getLeaveDialogCopy(hasLocalDraft)}</p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onConfirm} className="rounded-xl border border-border px-4 py-3 text-xs font-black uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Lämna utan att spara</button>
        <button type="button" onClick={onSave} className="rounded-xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-wider text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Spara checklistan gratis</button>
      </div>
    </div>
  </div>;
}

export default function StockChecklist() {
  const [params] = useSearchParams();
  const { user, loading: authLoading, openSignupModal, isLoginModalOpen } = useAuth();
  const [draft, setDraft] = useState<ChecklistDraft>(() => emptyChecklist(params.get("bolag") || "", params.get("ticker") || "", params.get("analys") || undefined));
  const [completed, setCompleted] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [hasLocalDraft, setHasLocalDraft] = useState(true);
  const [saving, setSaving] = useState(false);
  const [signupFlowStarted, setSignupFlowStarted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const checklistId = params.get("checklistId");

  useEffect(() => { try { const stored = window.localStorage.getItem(DRAFT_KEY); if (stored && !checklistId) setDraft((current) => ({ ...current, ...JSON.parse(stored) })); } catch {} }, [checklistId]);
  useEffect(() => { safeTrack("checklist_started", { company: params.get("bolag") || null, ticker: params.get("ticker") || null }); }, []);
  useEffect(() => { if (!checklistId) { try { window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch {} } }, [draft, checklistId]);
  useEffect(() => {
    if (!checklistId || !user) return;
    let cancelled = false;
    user.getIdToken().then((token) => fetch(`/api/stock-checklists?id=${encodeURIComponent(checklistId)}`, { headers: { Authorization: `Bearer ${token}` } })).then((response) => response.ok ? response.json() : Promise.reject(new Error("Kunde inte läsa checklistan."))).then((entry) => { if (!cancelled) { setDraft({ companyName: entry.companyName, ticker: entry.ticker || "", sourceAnalysisSlug: entry.sourceAnalysisSlug || undefined, answers: entry.answers || {}, notes: entry.notes || {}, status: entry.status || "started" }); setCompleted(entry.status === "completed"); safeTrack("checklist_reopened", { checklist_id: checklistId, company: entry.companyName, ticker: entry.ticker || null }); } }).catch((error) => { if (!cancelled) setLoadError(error.message); });
    return () => { cancelled = true; };
  }, [checklistId, user]);
  useEffect(() => { if (!user || !showSavePrompt || authLoading) return; setSaving(true); user.getIdToken().then((token) => fetch("/api/stock-checklists", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(draft) })).then((response) => response.ok ? response.json() : Promise.reject(new Error("Checklistan kunde inte sparas just nu."))).then(() => { try { window.localStorage.removeItem(DRAFT_KEY); } catch {} setShowSavePrompt(false); safeTrack("checklist_signup_completed", { company: draft.companyName, ticker: draft.ticker || null }); safeTrack("checklist_saved", { company: draft.companyName, ticker: draft.ticker || null, status: draft.status, logged_in: true }); }).catch((error) => setLoadError(error.message)).finally(() => setSaving(false)); }, [user, authLoading, showSavePrompt]);
  useEffect(() => {
    if (!completed || user || !showSavePrompt) return;
    trackOnce(`${window.location.pathname}:checklist_save_progress_viewed`, "checklist_save_progress_viewed", {
      company_name: draft.companyName,
      ticker: draft.ticker || null,
      source: "checklist_result",
      authenticated: false,
      answers_completed: completedCount(draft),
      has_notes: Object.values(draft.notes).some(Boolean),
      draft_storage_type: "localStorage",
    });
  }, [completed, user, showSavePrompt, draft]);
  useEffect(() => { if (!isLoginModalOpen) setSignupFlowStarted(false); }, [isLoginModalOpen]);

  const categories = useMemo(() => Array.from(new Set(STOCK_CHECKLIST_QUESTIONS.map((question) => question.category))), []);
  const answered = completedCount(draft);
  const updateAnswer = (id: string, answer: ChecklistAnswer) => { setDraft((current) => ({ ...current, answers: { ...current.answers, [id]: answer } })); safeTrack("checklist_question_answered", { question_id: id, answer, company: draft.companyName, ticker: draft.ticker || null }); };
  const updateNote = (id: string, note: string) => setDraft((current) => ({ ...current, notes: { ...current.notes, [id]: note } }));
  const finish = () => { if (answered < STOCK_CHECKLIST_QUESTIONS.length) return; setDraft((current) => ({ ...current, status: "completed" })); setCompleted(true); setShowSavePrompt(true); safeTrack("checklist_completed", { company: draft.companyName, ticker: draft.ticker || null, answered_questions: answered }); };
  const startSave = () => { if (!user && signupFlowStarted) return; safeTrack("checklist_save_cta_clicked", { company_name: draft.companyName, ticker: draft.ticker || null, source: "checklist_save_progress", authenticated: Boolean(user), answers_completed: completedCount(draft), has_notes: Object.values(draft.notes).some(Boolean), draft_storage_type: "localStorage" }); safeTrack("checklist_signup_started", { company: draft.companyName, ticker: draft.ticker || null }); if (user) setShowSavePrompt(true); else { setSignupFlowStarted(true); setShowSavePrompt(true); openSignupModal(); } };
  const openLeaveDialog = () => {
    let localDraftExists = false;
    try { localDraftExists = Boolean(window.localStorage.getItem(DRAFT_KEY)); } catch {}
    setHasLocalDraft(localDraftExists);
    setShowLeaveDialog(true);
    safeTrack("checklist_leave_without_saving_clicked", { company_name: draft.companyName, ticker: draft.ticker || null, authenticated: false, answers_completed: completedCount(draft), has_notes: Object.values(draft.notes).some(Boolean), draft_storage_type: localDraftExists ? "localStorage" : "none" });
    trackOnce(`${window.location.pathname}:checklist_leave_dialog_viewed`, "checklist_leave_dialog_viewed", { company_name: draft.companyName, ticker: draft.ticker || null, authenticated: false, answers_completed: completedCount(draft), has_notes: Object.values(draft.notes).some(Boolean), draft_storage_type: localDraftExists ? "localStorage" : "none" });
  };
  const saveFromLeaveDialog = () => { setShowLeaveDialog(false); startSave(); };
  const confirmLeaveWithoutSaving = () => { setShowLeaveDialog(false); setShowSavePrompt(false); safeTrack("checklist_leave_confirmed", { company_name: draft.companyName, ticker: draft.ticker || null, authenticated: false, answers_completed: completedCount(draft), has_notes: Object.values(draft.notes).some(Boolean), draft_storage_type: hasLocalDraft ? "localStorage" : "none" }); };
  const cancelLeaveWithoutSaving = () => { setShowLeaveDialog(false); safeTrack("checklist_leave_cancelled", { company_name: draft.companyName, ticker: draft.ticker || null, authenticated: false, answers_completed: completedCount(draft), has_notes: Object.values(draft.notes).some(Boolean), draft_storage_type: hasLocalDraft ? "localStorage" : "none" }); };

  return <><SEO title="Aktiechecklista – 12 frågor före ett aktieköp" description="En neutral aktiechecklista med 12 frågor om affärsmodell, kvalitet, värdering och risk." canonical="/aktiechecklista" />
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="max-w-3xl"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Börsanalys.se:s aktiechecklista</p><h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Innan du köper nästa aktie</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Ett enkelt sätt att testa om du förstår investeringen, kvaliteten, priset och riskerna.</p></div>
      {loadError && <div role="alert" className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-700 dark:text-red-300">{loadError}</div>}
      <section className="mt-10 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8"><div className="grid gap-5 md:grid-cols-[1fr_180px]"><label className="text-sm font-bold">Bolag<input value={draft.companyName} onChange={(event) => setDraft((current) => ({ ...current, companyName: event.target.value }))} placeholder="Exempel: Axfood" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary" /></label><label className="text-sm font-bold">Ticker <span className="font-normal text-muted-foreground">(valfritt)</span><input value={draft.ticker} onChange={(event) => setDraft((current) => ({ ...current, ticker: event.target.value.toUpperCase() }))} placeholder="AXFO" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium uppercase outline-none focus-visible:ring-2 focus-visible:ring-primary" /></label></div><div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground"><span>{answered} av {STOCK_CHECKLIST_QUESTIONS.length} frågor besvarade</span><div className="h-2 w-32 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${(answered / STOCK_CHECKLIST_QUESTIONS.length) * 100}%` }} /></div></div></section>
      <div className="mt-8 space-y-5">{categories.map((category) => { const questions = STOCK_CHECKLIST_QUESTIONS.filter((question) => question.category === category); return <section key={category} className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8"><div className="mb-6 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">{category}</span><h2 className="text-2xl font-black tracking-tight">{questions[0].categoryTitle}</h2></div><div className="space-y-7">{questions.map((question, index) => <article key={question.id} className="border-t border-border pt-6 first:border-t-0 first:pt-0"><h3 className="text-base font-black leading-snug">{question.id.slice(1)}. {question.question}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{question.help}</p><div role="radiogroup" aria-label={question.question} className="mt-4 flex flex-wrap gap-2">{(Object.keys(answerLabels) as ChecklistAnswer[]).map((answer) => <button key={answer} type="button" role="radio" aria-checked={draft.answers[question.id] === answer} onClick={() => updateAnswer(question.id, answer)} className={`rounded-xl border px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${draft.answers[question.id] === answer ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}>{answerLabels[answer]}</button>)}</div><label className="mt-3 block text-xs font-bold text-muted-foreground">Anteckning (valfritt)<textarea value={draft.notes[question.id] || ""} onChange={(event) => updateNote(question.id, event.target.value)} rows={2} maxLength={2000} placeholder="Vad vill du undersöka vidare?" className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary" /></label></article>)}</div></section>; })}</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-muted-foreground">Du kan ändra dina svar när som helst.</p><button type="button" disabled={answered < STOCK_CHECKLIST_QUESTIONS.length} onClick={finish} className="rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-wider text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Visa sammanfattning</button></div>
      {completed && <div className="mt-8 space-y-5"><ChecklistResult draft={draft} />{showSavePrompt && !user && <SavePrompt saving={saving} onContinue={openLeaveDialog} onSave={startSave} />}{user && !showSavePrompt && <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">Checklistan är klar. <Link to="/mina-checklistor" className="font-bold text-primary underline">Se dina sparade checklistor</Link></div>}</div>}
      {showLeaveDialog && !user && <LeaveWithoutSavingDialog hasLocalDraft={hasLocalDraft} onSave={saveFromLeaveDialog} onConfirm={confirmLeaveWithoutSaving} onCancel={cancelLeaveWithoutSaving} />}
      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{CHECKLIST_DISCLAIMER}</p>
      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Check size={14} className="text-primary" /> Dina svar sparas lokalt i webbläsaren tills du väljer att spara dem.</div>
    </main></>;
}
