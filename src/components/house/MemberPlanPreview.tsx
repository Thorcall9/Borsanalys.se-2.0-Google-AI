import { LockKeyhole, Sparkles } from 'lucide-react';

export interface MemberPlanPreviewProps {
  onUnlock: () => void;
}

export function MemberPlanPreview({ onUnlock }: MemberPlanPreviewProps) {
  return (
    <aside
      className="relative overflow-hidden rounded-3xl bg-[#123f2d] p-6 text-[#fffaf0] shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7"
      aria-labelledby="member-plan-preview-heading"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#cfe0c7]">För medlemmar</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fffaf0]/10 text-[#f1a06b]">
            <LockKeyhole size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="max-w-xl">
          <h3 id="member-plan-preview-heading" className="font-serif text-3xl font-bold leading-tight">
            Så här ser din plan ut som medlem
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#dbe7d6]">
            Exempel på en personlig plan med personliga prognos, sparmål och årsöversikt – dina siffror och ett möjligt kapital från nuvarande hem visas först efter inloggning.
          </p>
        </div>

      </div>
      <div className="relative z-10 mt-5 shrink-0 sm:mt-0">
        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#fffaf0] px-5 py-3 text-sm font-bold text-[#123f2d] transition-colors hover:bg-[#f1a06b]"
        >
          <Sparkles size={16} aria-hidden="true" />
          Logga in och spara din plan
        </button>
      </div>
    </aside>
  );
}
