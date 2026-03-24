import React from 'react';

interface ProgressBarProps {
  label: string;
  val: string;
  progress: number;
  accentColor?: string;
}

export default function ProgressBar({ label, val, progress, accentColor = "#76B900" }: ProgressBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="font-mono text-[#1a1a1a]">{val}</span>
      </div>
      <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${progress}%`, backgroundColor: accentColor }} 
        />
      </div>
    </div>
  );
}
