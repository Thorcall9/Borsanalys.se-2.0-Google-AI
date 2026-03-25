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
    bull: 'bg-primary/5 border-primary/20 text-primary',
    base: 'bg-primary/5 border-primary/20 text-primary',
    bear: 'bg-red-500/5 border-red-500/20 text-red-500'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {scenarios.map((s, i) => (
        <div key={i} className={`p-10 rounded-[2.5rem] border shadow-xl shadow-black/5 transition-all hover:scale-[1.02] duration-500 ${colors[s.type]}`}>
          <div className="text-5xl mb-6">{s.icon}</div>
          <div className="text-xl font-black tracking-tighter uppercase mb-1">{s.title}</div>
          <div className="text-[10px] font-black opacity-50 mb-8 uppercase tracking-widest">Sannolikhet: {s.probability}</div>
          <div className="text-5xl font-black tracking-tighter leading-none mb-2">{s.price}</div>
          <div className="text-sm font-black opacity-50 mb-8">{s.change}</div>
          <p className="text-sm leading-relaxed opacity-80 font-medium italic">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
