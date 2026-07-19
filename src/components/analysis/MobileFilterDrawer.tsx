import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import FilterPanel from './FilterPanel';
import type { FilterContentType, SortOption } from '../../hooks/useAnalysisFilters';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeFilterCount: number;
  // Filter props (pass-through to FilterPanel)
  searchTerm: string;
  onSearchChange: (value: string) => void;
  contentType: FilterContentType;
  onContentTypeChange: (value: FilterContentType) => void;
  selectedSector: string;
  onSectorChange: (value: string) => void;
  sectors: string[];
  selectedRecommendation: string;
  onRecommendationChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  onClearAll: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onToggle,
  onClose,
  activeFilterCount,
  searchTerm,
  onSearchChange,
  contentType,
  onContentTypeChange,
  selectedSector,
  onSectorChange,
  sectors,
  selectedRecommendation,
  onRecommendationChange,
  sortOption,
  onSortChange,
  onClearAll,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap: return focus to trigger on close
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Trigger Button – visible only on mobile */}
      <button
        ref={triggerRef}
        onClick={onToggle}
        aria-label={`Öppna filter${activeFilterCount > 0 ? ` (${activeFilterCount} aktiva)` : ''}`}
        aria-expanded={isOpen}
        className="lg:hidden flex items-center gap-2 px-5 py-3 bg-muted/30 border border-border rounded-2xl text-sm font-black uppercase tracking-widest hover:border-primary/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filter
        {activeFilterCount > 0 && (
          <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] font-black">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
              aria-hidden="true"
            />

            {/* Sheet */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Filterinställningar"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] lg:hidden bg-card border-t border-border rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-black tracking-tight">Filtrera analyser</h2>
                <button
                  onClick={onClose}
                  aria-label="Stäng filterpanelen"
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter content */}
              <div className="px-6 py-6">
                <FilterPanel
                  searchTerm={searchTerm}
                  onSearchChange={onSearchChange}
                  contentType={contentType}
                  onContentTypeChange={onContentTypeChange}
                  selectedSector={selectedSector}
                  onSectorChange={onSectorChange}
                  sectors={sectors}
                  selectedRecommendation={selectedRecommendation}
                  onRecommendationChange={onRecommendationChange}
                  sortOption={sortOption}
                  onSortChange={onSortChange}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border flex gap-4">
                <button
                  onClick={onClearAll}
                  className="flex-1 px-4 py-3 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors rounded-2xl border border-border hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Rensa alla
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Visa resultat
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
