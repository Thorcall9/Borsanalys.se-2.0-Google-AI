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
    <div className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-black/5">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/50 uppercase">{title}</div>
        <div className="flex gap-1.5">
          {[...Array(maxRating)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
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
