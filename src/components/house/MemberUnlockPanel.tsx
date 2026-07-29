import { motion } from 'framer-motion';
import { LockKeyhole, Save, Sparkles } from 'lucide-react';

export interface MemberUnlockPanelProps {
  isAuthenticated: boolean;
  onUnlock: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export function MemberUnlockPanel({ isAuthenticated, onUnlock, onSave, isSaving }: MemberUnlockPanelProps) {
  if (isAuthenticated) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-foreground">Full prognos är upplåst</p>
          <p className="mt-1 text-sm text-muted-foreground">Spara dina förutsättningar och följ utvecklingen på din profilsida.</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} aria-hidden="true" />
          {isSaving ? 'Sparar…' : 'Spara mitt husmål'}
        </button>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-section-alt/50 p-6"
      aria-label="Låst årsprognos"
    >
      <div className="pointer-events-none absolute inset-x-6 bottom-20 top-24 grid grid-cols-8 items-end gap-2 opacity-40 blur-[1px]" aria-hidden="true">
        {[35, 42, 38, 53, 58, 68, 80, 96].map((height, index) => (
          <span key={index} className="rounded-t bg-primary/45" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="relative z-10 max-w-xl space-y-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LockKeyhole size={19} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold">Se din fulla årsprognos</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Som medlem får du din personliga prognos, sparmål och årsöversikt samt kan spara ditt husmål för att följa det senare.
          </p>
        </div>
        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Sparkles size={16} aria-hidden="true" />
          Logga in för att se hela prognosen
        </button>
      </div>
    </motion.section>
  );
}
