import { useEffect, useState, type RefObject } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from './useDialogFocus';

export interface CapitalUpdateSheetProps {
  open: boolean;
  currentCapital: number;
  isSaving?: boolean;
  fallbackFocusRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
  onSave: (amount: number) => void;
}

const formatter = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 });

export function CapitalUpdateSheet({ open, currentCapital, isSaving = false, fallbackFocusRef, onClose, onSave }: CapitalUpdateSheetProps) {
  const [amount, setAmount] = useState(String(currentCapital));
  const dialogRef = useDialogFocus<HTMLElement>(open, fallbackFocusRef);

  useEffect(() => { if (open) setAmount(String(currentCapital)); }, [currentCapital, open]);
  if (!open) return null;
  const numericAmount = Number(amount.replace(/\s/g, '').replace(',', '.'));

  return (
    <div className="fixed inset-0 z-[210] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Stäng kapitaluppdatering" onClick={onClose} className="absolute inset-0 bg-[#123f31]/35 backdrop-blur-sm" />
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="capital-update-title" tabIndex={-1} className="relative w-full max-w-lg rounded-t-[2rem] bg-[#fffaf0] p-6 shadow-2xl sm:rounded-[2rem] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">Snabb uppdatering</p><h2 id="capital-update-title" className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Uppdatera huskapital</h2></div>
          <button type="button" onClick={onClose} disabled={isSaving} className="rounded-xl p-2 text-[#52705f] hover:bg-[#f4eee2]" aria-label="Stäng"><X size={20} /></button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#627168]">Det här sparar en punkt i er utveckling. Det ska ta mindre än tio sekunder.</p>
        <div className="mt-6 rounded-2xl bg-[#f4eee2] p-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#52705f]">Nuvarande kapital</p><p className="mt-1 font-serif text-2xl font-bold text-[#123f31]">{formatter.format(currentCapital)} kr</p></div>
        <label htmlFor="capital-update-amount" className="mt-5 block"><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#52705f]">Nytt totalt kapital</span><span className="mt-2 flex overflow-hidden rounded-2xl border border-[#ded3c0] bg-white shadow-sm focus-within:border-[#23694f] focus-within:ring-2 focus-within:ring-[#23694f]/15"><input id="capital-update-amount" data-dialog-initial-focus value={amount} inputMode="numeric" onChange={(event) => setAmount(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-4 text-lg font-bold text-[#123f31] outline-none" /><span className="flex items-center px-4 text-sm font-bold text-[#52705f]">kr</span></span></label>
        <button type="button" disabled={isSaving || !Number.isFinite(numericAmount) || numericAmount < 0} onClick={() => onSave(numericAmount)} className="mt-7 w-full rounded-2xl bg-[#123f31] px-4 py-4 text-sm font-bold text-[#fffaf0] transition hover:bg-[#1b5542] disabled:opacity-60">{isSaving ? 'Sparar…' : 'Spara uppdatering'}</button>
      </section>
    </div>
  );
}
