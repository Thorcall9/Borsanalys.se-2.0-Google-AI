import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export default function Card({ title, children, className = "", accentColor = "#1e40af" }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/50 transition-all shadow-xl shadow-black/5 ${className}`}>
      {title && (
        <div 
          className="text-[10px] font-black tracking-[0.2em] uppercase mb-6"
          style={{ color: accentColor }}
        >
          {title}
        </div>
      )}
      <div className="text-base text-muted-foreground leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
}
