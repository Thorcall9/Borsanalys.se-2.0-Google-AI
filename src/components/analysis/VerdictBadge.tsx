import React from 'react';

interface VerdictBadgeProps {
  verdict: string;
}

export default function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const getColors = (v: string) => {
    switch (v.toUpperCase()) {
      case 'KÖP':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'AVVAKTA':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'SÄLJ':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${getColors(verdict)}`}>
      {verdict}
    </div>
  );
}
