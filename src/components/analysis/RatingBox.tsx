import React from 'react';
import { Star } from 'lucide-react';

interface RatingBoxProps {
  rating: number;
  maxRating?: number;
  title?: string;
  description?: string;
  accentColor?: string;
}

export default function RatingBox({ 
  rating, 
  maxRating = 5, 
  title = "Analytikerbetyg",
  description, 
  accentColor = "#10B981" 
}: RatingBoxProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-xl shadow-black/5">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 mb-4">
        <div className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/50 uppercase leading-tight">{title}</div>
        <div className="flex gap-1.5 flex-shrink-0">
          {[...Array(maxRating)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < rating ? accentColor : "transparent"} 
              className={i < rating ? "text-primary" : "text-muted"}
              style={{ color: i < rating ? accentColor : undefined }}
            />
          ))}
        </div>
      </div>
      {description && (
        <div className="text-sm text-muted-foreground leading-relaxed font-medium">
          <span className="text-foreground font-black mr-2">{rating}/{maxRating}</span> {description}
        </div>
      )}
    </div>
  );
}
