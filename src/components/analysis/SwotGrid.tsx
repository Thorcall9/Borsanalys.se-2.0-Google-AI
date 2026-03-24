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
    { key: 'strengths', title: 'STYRKOR', color: 'text-emerald-600', items: data.strengths },
    { key: 'weaknesses', title: 'SVAGHETER', color: 'text-red-600', items: data.weaknesses },
    { key: 'opportunities', title: 'MÖJLIGHETER', color: 'text-blue-600', items: data.opportunities },
    { key: 'threats', title: 'HOT', color: 'text-amber-600', items: data.threats },
  ];

  return (
    <div className="bg-white border border-black/5 rounded-xl overflow-hidden shadow-sm">
      {title && (
        <div className="p-4 bg-black/5 border-b border-black/5 text-[11px] font-mono tracking-widest uppercase text-gray-400">
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.key} className="p-5 border border-black/5">
            <div className={`font-serif text-sm font-bold tracking-widest mb-3 ${cat.color}`}>
              {cat.title}
            </div>
            <ul className="space-y-2">
              {cat.items.map((item, i) => (
                <li key={i} className="text-[12px] text-gray-600 flex gap-2">
                  <span className="text-gray-400">—</span>
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
