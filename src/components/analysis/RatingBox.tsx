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
  accentColor = "#1a3c6e" 
}: RatingBoxProps) {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">{title}</div>
        <div className="flex gap-1">
          {[...Array(maxRating)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < rating ? accentColor : "transparent"} 
              className={i < rating ? "" : "text-gray-200"}
              style={{ color: i < rating ? accentColor : undefined }}
            />
          ))}
        </div>
      </div>
      {description && (
        <div className="text-sm italic text-gray-600">
          <strong className="text-[#1a1a1a] not-italic">{rating}/{maxRating}</strong> — {description}
        </div>
      )}
    </div>
  );
}
