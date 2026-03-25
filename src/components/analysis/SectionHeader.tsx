import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  accentColor?: string;
}

export default function SectionHeader({ number, title, accentColor = "#1e40af" }: SectionHeaderProps) {
  return (
    <div className="flex items-end gap-6 mb-12 pb-6 border-b border-border">
      <span 
        className="text-6xl font-black leading-none opacity-10 tracking-tighter"
        style={{ color: accentColor }}
      >
        {number}
      </span>
      <h2 className="text-2xl font-black tracking-tighter uppercase text-foreground mb-1">
        {title}
      </h2>
    </div>
  );
}
