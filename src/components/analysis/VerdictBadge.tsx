import React from 'react';
import { RECOMMENDATION_BADGE_CLASSES, type Recommendation } from '../../lib/recommendation';

interface VerdictBadgeProps {
  verdict: Recommendation;
}

export default function VerdictBadge({ verdict }: VerdictBadgeProps) {
  return <div className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${RECOMMENDATION_BADGE_CLASSES[verdict]}`}>{verdict}</div>;
}
