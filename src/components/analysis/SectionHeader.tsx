import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  accentColor?: string;
}

export default function SectionHeader({ number, title, accentColor = "#10B981" }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mb-12 pb-6 border-b border-border">
      <span 
        className="text-5xl md:text-6xl font-black leading-none opacity-10 tracking-tighter"
        style={{ color: accentColor }}
      >
        {number}
      </span>
      <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-foreground mb-1">
        {title}
      </h2>
    </div>
  );
}
