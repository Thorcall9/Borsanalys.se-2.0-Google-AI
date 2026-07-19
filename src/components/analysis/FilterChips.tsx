import React from 'react';
import { X } from 'lucide-react';
import type { FilterChip as FilterChipType } from '../../hooks/useAnalysisFilters';

interface FilterChipsProps {
  chips: FilterChipType[];
  onClearAll: () => void;
}

export default function FilterChips({ chips, onClearAll }: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-border">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={chip.onRemove}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
              e.preventDefault();
              chip.onRemove();
            }
          }}
          role="button"
          aria-label={`Ta bort filter: ${chip.label}`}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          {chip.label}
          <X size={12} aria-hidden="true" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        aria-label="Rensa alla filter"
        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1"
      >
        Rensa alla filter
      </button>
    </div>
  );
}
