import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  accentColor?: string;
}

export default function SectionHeader({ number, title, accentColor = "#10B981" }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div 
        className="min-w-[32px] px-2.5 w-auto whitespace-nowrap h-8 rounded-lg text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 font-serif"
        style={{ backgroundColor: accentColor }}
      >
        {number}
      </div>
      <h2 className="text-base md:text-lg font-black tracking-tight text-slate-900 uppercase">
        {title}
      </h2>
    </div>
  );
}
