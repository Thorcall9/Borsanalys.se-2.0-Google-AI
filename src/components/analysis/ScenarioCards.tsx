import React from 'react';

export interface Scenario {
  type: 'bull' | 'base' | 'bear';
  icon: string;
  title: string;
  probability: string;
  price: string;
  change: string;
  description: string;
}

interface ScenarioCardsProps {
  scenarios: Scenario[];
}

export default function ScenarioCards({ scenarios }: ScenarioCardsProps) {
  const colors = {
    bull: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    base: 'bg-blue-50 border-blue-100 text-blue-700',
    bear: 'bg-red-50 border-red-100 text-red-700'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenarios.map((s, i) => (
        <div key={i} className={`p-6 rounded-xl border shadow-sm ${colors[s.type]}`}>
          <div className="text-3xl mb-2">{s.icon}</div>
          <div className="font-serif text-lg font-bold tracking-wider">{s.title}</div>
          <div className="text-[10px] font-mono opacity-70 mb-4 uppercase">Sannolikhet: {s.probability}</div>
          <div className="text-4xl font-serif font-bold leading-none">{s.price}</div>
          <div className="text-xs opacity-70 mt-1 mb-4">{s.change}</div>
          <p className="text-[12px] leading-relaxed opacity-80 italic">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
