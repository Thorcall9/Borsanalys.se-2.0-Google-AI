import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  accentColor?: string;
}

export default function SectionHeader({ number, title, accentColor = "#1a3c6e" }: SectionHeaderProps) {
  return (
    <div className="flex items-end gap-4 mb-8 pb-4 border-b border-black/5">
      <span 
        className="font-serif text-4xl font-bold leading-none opacity-30"
        style={{ color: accentColor }}
      >
        {number}
      </span>
      <h2 className="font-serif text-2xl font-bold tracking-wider uppercase text-[#1a1a1a]">
        {title}
      </h2>
    </div>
  );
}
