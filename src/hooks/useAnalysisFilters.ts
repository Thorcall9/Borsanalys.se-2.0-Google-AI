import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnalysisData, ContentType } from '../types/analysis';

// ─── Content type definitions ───────────────────────────────────────────────

export type FilterContentType = 'all' | ContentType;
export type SortOption = 'latest' | 'updated' | 'upside' | 'score';

export const CONTENT_TYPE_LABELS: Record<FilterContentType, string> = {
  all: 'Alla',
  analysis: 'Analyser',
  'report-comment': 'Rapportkommentarer',
};

export const SORT_LABELS: Record<SortOption, string> = {
  latest: 'Senast publicerad',
  updated: 'Senast uppdaterad',
  upside: 'Högst uppsida',
  score: 'Högst totalpoäng',
};

// ─── Recommendation normalization ───────────────────────────────────────────

const BUY_VARIANTS = ['STARKT KÖP', 'KÖP', 'SVAGT KÖP', 'STRONG BUY', 'BUY'];
const HOLD_VARIANTS = ['NEUTRAL', 'BEHÅLL', 'AVVAKTA', 'HOLD'];
const WATCH_VARIANTS = ['BEVAKA', 'WATCH'];
const SELL_VARIANTS = ['SÄLJ', 'SELL', 'STARKT SÄLJ'];

export function normalizeRecommendation(raw: string): string {
  const upper = raw.toUpperCase().trim();
  if (BUY_VARIANTS.includes(upper)) return 'KÖP';
  if (HOLD_VARIANTS.includes(upper)) return 'AVVAKTA';
  if (WATCH_VARIANTS.includes(upper)) return 'BEVAKA';
  if (SELL_VARIANTS.includes(upper)) return 'SÄLJ';
  return upper;
}

// ─── Score parsing ──────────────────────────────────────────────────────────

export function parseTotalScore(raw?: string): number {
  if (!raw) return -Infinity;
  // Handle "24/35" format → percentage
  if (raw.includes('/')) {
    const [num, den] = raw.split('/').map(s => parseFloat(s.trim()));
    if (!isNaN(num) && !isNaN(den) && den > 0) return (num / den) * 100;
    return -Infinity;
  }
  const parsed = parseFloat(raw.replace(',', '.'));
  return isNaN(parsed) ? -Infinity : parsed;
}

// ─── Sorting ────────────────────────────────────────────────────────────────

function sortAnalyses(list: AnalysisData[], sort: SortOption): AnalysisData[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'latest':
        return (b.date || '').localeCompare(a.date || '');
      case 'updated':
        return (b.updatedAt || b.date || '').localeCompare(a.updatedAt || a.date || '');
      case 'upside': {
        const aUp = a.upside ?? -Infinity;
        const bUp = b.upside ?? -Infinity;
        return bUp - aUp;
      }
      case 'score': {
        return parseTotalScore(b.totalScore) - parseTotalScore(a.totalScore);
      }
      default:
        return 0;
    }
  });
}

// ─── Filter chip type ───────────────────────────────────────────────────────

export type FilterChip = {
  label: string;
  key: string;
  onRemove: () => void;
};

// ─── URL param keys ─────────────────────────────────────────────────────────

const PARAM_TYPE = 'typ';
const PARAM_CATEGORY = 'category';
const PARAM_RECOMMENDATION = 'recommendation';
const PARAM_SORT = 'sort';
const PARAM_SEARCH = 'q';

const URL_TYPE_TO_CONTENT_TYPE: Record<string, FilterContentType> = {
  analys: 'analysis',
  rapportkommentar: 'report-comment',
};
const CONTENT_TYPE_TO_URL_TYPE: Partial<Record<FilterContentType, string>> = {
  analysis: 'analys',
  'report-comment': 'rapportkommentar',
};
const VALID_SORT_OPTIONS: SortOption[] = ['latest', 'updated', 'upside', 'score'];
const VALID_RECOMMENDATIONS = ['Alla', 'KÖP', 'BEVAKA', 'AVVAKTA', 'SÄLJ'];

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAnalysisFilters(allAnalyses: AnalysisData[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  // Read initial state from URL params
  const getInitialType = (): FilterContentType => {
    const raw = searchParams.get(PARAM_TYPE);
    return raw && URL_TYPE_TO_CONTENT_TYPE[raw]
      ? URL_TYPE_TO_CONTENT_TYPE[raw]
      : 'all';
  };

  const getInitialSort = (): SortOption => {
    const raw = searchParams.get(PARAM_SORT);
    return raw && VALID_SORT_OPTIONS.includes(raw as SortOption)
      ? (raw as SortOption)
      : 'latest';
  };

  const getInitialCategory = (): string => {
    return searchParams.get(PARAM_CATEGORY) || 'Alla';
  };

  const getInitialRecommendation = (): string => {
    const raw = searchParams.get(PARAM_RECOMMENDATION);
    if (!raw) return 'Alla';
    const upper = raw.toUpperCase();
    return VALID_RECOMMENDATIONS.includes(upper) ? upper : 'Alla';
  };

  const getInitialSearch = (): string => {
    return searchParams.get(PARAM_SEARCH) || '';
  };

  // State
  const [contentType, setContentType] = useState<FilterContentType>(getInitialType);
  const [searchTerm, setSearchTerm] = useState(getInitialSearch);
  const [selectedSector, setSelectedSector] = useState(getInitialCategory);
  const [selectedRecommendation, setSelectedRecommendation] = useState(getInitialRecommendation);
  const [sortOption, setSortOption] = useState<SortOption>(getInitialSort);

  // Rehydrate state when the browser back/forward buttons change the URL.
  useEffect(() => {
    setContentType(getInitialType());
    setSearchTerm(getInitialSearch());
    setSelectedSector(getInitialCategory());
    setSelectedRecommendation(getInitialRecommendation());
    setSortOption(getInitialSort());
  }, [searchParams]);

  // Available sectors derived from data
  const sectors = useMemo(() => {
    const sectorSet = new Set(allAnalyses.map(a => a.sector));
    return ['Alla', ...Array.from(sectorSet).sort()];
  }, [allAnalyses]);

  // Sync state to URL params (skip initial mount to avoid unnecessary history entry)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (contentType !== 'all') {
      params.set(PARAM_TYPE, CONTENT_TYPE_TO_URL_TYPE[contentType] || '');
    }
    if (selectedSector !== 'Alla') params.set(PARAM_CATEGORY, selectedSector);
    if (selectedRecommendation !== 'Alla') params.set(PARAM_RECOMMENDATION, selectedRecommendation.toLowerCase());
    if (sortOption !== 'latest') params.set(PARAM_SORT, sortOption);
    if (searchTerm) params.set(PARAM_SEARCH, searchTerm);

    setSearchParams(params);
  }, [contentType, searchTerm, selectedSector, selectedRecommendation, sortOption, setSearchParams]);

  // Filter logic
  const filteredAnalyses = useMemo(() => {
    const now = new Date();
    const searchLower = searchTerm.toLowerCase();

    const filtered = allAnalyses.filter(a => {
      // Hide future scheduled posts
      if (a.date) {
        const isFuture = a.date.includes('T')
          ? new Date(a.date) > now
          : new Date(a.date + 'T00:00:00') > now;
        if (isFuture) return false;
      }

      // Content type filter
      if (contentType !== 'all') {
        if (a.contentType !== contentType) return false;
      }

      // Search filter
      if (searchLower) {
        const matchesSearch =
          a.title.toLowerCase().includes(searchLower) ||
          a.ticker.toLowerCase().includes(searchLower) ||
          (a.listTitle && a.listTitle.toLowerCase().includes(searchLower)) ||
          a.sector.toLowerCase().includes(searchLower) ||
          (a.tags && a.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        if (!matchesSearch) return false;
      }

      // Sector filter
      if (selectedSector !== 'Alla' && a.sector !== selectedSector) return false;

      // Recommendation filter
      if (selectedRecommendation !== 'Alla') {
        const normalized = normalizeRecommendation(a.recommendation);
        if (normalized !== selectedRecommendation) return false;
      }

      return true;
    });

    return sortAnalyses(filtered, sortOption);
  }, [allAnalyses, contentType, searchTerm, selectedSector, selectedRecommendation, sortOption]);

  // Active filter count (excludes search as it has its own visible input)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (contentType !== 'all') count++;
    if (selectedSector !== 'Alla') count++;
    if (selectedRecommendation !== 'Alla') count++;
    if (sortOption !== 'latest') count++;
    if (searchTerm) count++;
    return count;
  }, [contentType, selectedSector, selectedRecommendation, sortOption, searchTerm]);

  // Active filter chips
  const activeFilterChips = useMemo((): FilterChip[] => {
    const chips: FilterChip[] = [];
    if (searchTerm) {
      chips.push({ label: `"${searchTerm}"`, key: 'search', onRemove: () => setSearchTerm('') });
    }
    if (contentType !== 'all') {
      chips.push({
        label: CONTENT_TYPE_LABELS[contentType],
        key: 'contentType',
        onRemove: () => setContentType('all'),
      });
    }
    if (selectedSector !== 'Alla') {
      chips.push({ label: selectedSector, key: 'sector', onRemove: () => setSelectedSector('Alla') });
    }
    if (selectedRecommendation !== 'Alla') {
      chips.push({
        label: selectedRecommendation,
        key: 'recommendation',
        onRemove: () => setSelectedRecommendation('Alla'),
      });
    }
    if (sortOption !== 'latest') {
      chips.push({
        label: SORT_LABELS[sortOption],
        key: 'sort',
        onRemove: () => setSortOption('latest'),
      });
    }
    return chips;
  }, [searchTerm, contentType, selectedSector, selectedRecommendation, sortOption]);

  // Clear all filters
  const clearAll = useCallback(() => {
    setContentType('all');
    setSearchTerm('');
    setSelectedSector('Alla');
    setSelectedRecommendation('Alla');
    setSortOption('latest');
  }, []);

  return {
    // State
    contentType,
    searchTerm,
    selectedSector,
    selectedRecommendation,
    sortOption,
    // Setters
    setContentType,
    setSearchTerm,
    setSelectedSector,
    setSelectedRecommendation,
    setSortOption,
    // Derived
    sectors,
    filteredAnalyses,
    resultCount: filteredAnalyses.length,
    activeFilterCount,
    activeFilterChips,
    clearAll,
  };
}
