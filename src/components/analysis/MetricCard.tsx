import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  valueColor?: string;
}

export default function MetricCard({ label, value, trend, valueColor = "text-foreground" }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all shadow-xl shadow-black/5 group">
      <div className="text-[10px] font-black text-muted-foreground/50 tracking-[0.2em] uppercase mb-4">
        {label}
      </div>
      <div className={`text-4xl font-black tracking-tighter group-hover:text-primary transition-colors ${valueColor}`}>
        {value}
      </div>
      {trend && (
        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-4 pt-4 border-t border-border/50">
          {trend}
        </div>
      )}
    </div>
  );
}
