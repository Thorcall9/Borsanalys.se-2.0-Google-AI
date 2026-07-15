import React from 'react';
import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';

export interface Scenario {
  type: 'bull' | 'base' | 'bear';
  icon?: string;
  title: string;
  probability: string;
  price: string;
  change: string;
  valueLabel?: string;
  changeLabel?: string;
  description: string;
}

interface ScenarioCardsProps {
  scenarios: Scenario[];
}

export default function ScenarioCards({ scenarios }: ScenarioCardsProps) {
  const colors = {
    bull: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600',
    base: 'bg-slate-500/5 border-slate-400/25 text-slate-600 dark:text-slate-300',
    bear: 'bg-red-500/5 border-red-500/20 text-red-500'
  };

  const iconWrapColors = {
    bull: 'bg-emerald-500/10 border-emerald-500/20',
    base: 'bg-slate-500/10 border-slate-400/20',
    bear: 'bg-red-500/10 border-red-500/20'
  };

  const ScenarioIcon = ({ type }: { type: Scenario['type'] }) => {
    const iconClass = "h-7 w-7";
    if (type === 'bull') return <TrendingUp className={iconClass} strokeWidth={1.8} />;
    if (type === 'bear') return <TrendingDown className={iconClass} strokeWidth={1.8} />;
    return <BarChart3 className={iconClass} strokeWidth={1.8} />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {scenarios.map((s, i) => (
        <div key={i} className={`p-10 rounded-[2.5rem] border shadow-xl shadow-black/5 transition-all hover:scale-[1.02] duration-500 ${colors[s.type]}`}>
          <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ${iconWrapColors[s.type]}`}>
            <ScenarioIcon type={s.type} />
          </div>
          <div className="text-xl font-black tracking-tighter uppercase mb-1">{s.title}</div>
          <div className="text-[10px] font-black opacity-50 mb-8 uppercase tracking-widest">Sannolikhet: {s.probability}</div>
          {s.valueLabel && (
            <div className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">
              {s.valueLabel}
            </div>
          )}
          <div className="text-5xl font-black tracking-tighter leading-none mb-2">{s.price}</div>
          <div className="text-sm font-black opacity-50 mb-8">
            {s.changeLabel ? `${s.changeLabel}: ${s.change}` : s.change}
          </div>
          <p className="text-sm leading-relaxed opacity-80 font-medium italic">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
