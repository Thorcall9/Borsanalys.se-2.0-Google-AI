import React from 'react';
import { Search, Filter, TrendingUp, ArrowUpDown } from 'lucide-react';
import {
  FilterContentType,
  SortOption,
  CONTENT_TYPE_LABELS,
  SORT_LABELS,
} from '../../hooks/useAnalysisFilters';
import { RECOMMENDATION_FILTER_OPTIONS } from '../../lib/recommendation';

interface FilterPanelProps {
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
}

const CONTENT_TYPES: FilterContentType[] = ['all', 'analysis', 'report-commentary', 'market-update'];
export default function FilterPanel({
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
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/80"
          size={20}
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Sök bolag, ticker eller analys..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Sök bland analyser"
          className="w-full bg-muted/30 border border-border rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg font-medium"
        />
      </div>

      {/* Content Type – Segmented Control */}
      <div
        role="group"
        aria-label="Innehållstyp"
        className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-muted/30 p-1.5 sm:grid-cols-4"
      >
        {CONTENT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={contentType === type}
            onClick={() => onContentTypeChange(type)}
            className={`min-w-0 break-words rounded-xl px-3 py-3 text-[9px] font-black uppercase leading-tight tracking-[0.06em] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-[11px] sm:leading-normal sm:tracking-widest ${
              contentType === type
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {CONTENT_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Dropdowns Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sector */}
        <div className="relative group flex-1">
          <select
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            aria-label="Filtrera efter kategori"
            className="w-full appearance-none bg-muted/30 border border-border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-black uppercase tracking-widest cursor-pointer"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Filter
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 pointer-events-none group-hover:text-primary transition-colors"
            size={16}
            aria-hidden="true"
          />
        </div>

        {/* Recommendation */}
        <div className="relative group flex-1">
          <select
            value={selectedRecommendation}
            onChange={(e) => onRecommendationChange(e.target.value)}
            aria-label="Filtrera efter rekommendation"
            className="w-full appearance-none bg-muted/30 border border-border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-black uppercase tracking-widest cursor-pointer"
          >
            {RECOMMENDATION_FILTER_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <TrendingUp
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 pointer-events-none group-hover:text-primary transition-colors"
            size={16}
            aria-hidden="true"
          />
        </div>

        {/* Sort */}
        <div className="relative group flex-1">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sortera analyser"
            className="w-full appearance-none bg-muted/30 border border-border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-black uppercase tracking-widest cursor-pointer"
          >
            {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ArrowUpDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 pointer-events-none group-hover:text-primary transition-colors"
            size={16}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
