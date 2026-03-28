import React from 'react';

interface SwotGridProps {
  data: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  title?: string;
}

export default function SwotGrid({ data, title }: SwotGridProps) {
  const categories = [
    { key: 'strengths', title: 'Styrkor', color: 'text-primary', items: data.strengths },
    { key: 'weaknesses', title: 'Svagheter', color: 'text-red-500', items: data.weaknesses },
    { key: 'opportunities', title: 'Möjligheter', color: 'text-emerald-500', items: data.opportunities },
    { key: 'threats', title: 'Hot', color: 'text-amber-500', items: data.threats },
  ];

  return (
    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5">
      {title && (
        <div className="px-10 py-6 bg-muted/30 border-b border-border text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/50">
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.key} className="p-10 border border-border/50">
            <div className={`text-sm font-black tracking-widest uppercase mb-6 ${cat.color}`}>
              {cat.title}
            </div>
            <ul className="space-y-4">
              {cat.items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-3 font-medium leading-relaxed">
                  <span className="text-muted-foreground/30">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
