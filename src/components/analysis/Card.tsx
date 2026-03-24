import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export default function Card({ title, children, className = "", accentColor = "#76B900" }: CardProps) {
  return (
    <div className={`bg-white border border-black/5 rounded-xl p-6 hover:border-black/10 transition-colors shadow-sm ${className}`}>
      {title && (
        <div 
          className="text-[11px] font-mono tracking-widest uppercase mb-4"
          style={{ color: accentColor }}
        >
          {title}
        </div>
      )}
      <div className="text-sm text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
