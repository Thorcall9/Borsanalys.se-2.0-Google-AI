import { LockKeyhole, Sparkles } from 'lucide-react';

export interface MemberPlanPreviewProps {
  onUnlock: () => void;
}

export function MemberPlanPreview({ onUnlock }: MemberPlanPreviewProps) {
  return (
    <aside
      className="relative overflow-hidden rounded-3xl bg-[#123f2d] p-6 text-[#fffaf0] shadow-sm sm:p-8"
      aria-labelledby="member-plan-preview-heading"
    >
      <div className="pointer-events-none absolute inset-x-6 bottom-6 top-28 grid grid-cols-8 items-end gap-2 opacity-35" aria-hidden="true">
        {[32, 40, 38, 52, 60, 68, 80, 94].map((height, index) => (
          <span key={index} className="rounded-t bg-[#cfe0c7]" style={{ height: `${height}%` }} />
        ))}
      </div>

      <div className="relative z-10 space-y-5">
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
            Exempel på en personlig plan – dina siffror och ett möjligt kapital från nuvarande hem visas först efter inloggning.
          </p>
        </div>

        <div className="max-w-xl rounded-2xl border border-[#cfe0c7]/20 bg-[#0d3022]/60 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#cfe0c7]">Exempel · Huskapital</p>
              <p className="mt-1 font-serif text-2xl font-bold">987 000 kr</p>
            </div>
            <p className="text-right text-sm font-bold text-[#f1a06b]">86 %<span className="block text-xs font-normal text-[#dbe7d6]">mot målet</span></p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#fffaf0]/20">
            <span className="block h-full w-[86%] rounded-full bg-[#f1a06b]" />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#dbe7d6]">
            <span>personliga prognos, sparmål och årsöversikt</span>
            <span>166 700 kr kvar</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#fffaf0] px-5 py-3 text-sm font-bold text-[#123f2d] transition-colors hover:bg-[#f1a06b]"
        >
          <Sparkles size={16} aria-hidden="true" />
          Logga in och skapa din plan
        </button>
      </div>
    </aside>
  );
}
