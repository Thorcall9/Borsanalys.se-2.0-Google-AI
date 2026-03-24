import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  valueColor?: string;
}

export default function MetricCard({ label, value, trend, valueColor = "text-[#1a1a1a]" }: MetricCardProps) {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 transition-colors shadow-sm">
      <div className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-2">
        {label}
      </div>
      <div className={`text-3xl font-serif font-bold ${valueColor}`}>
        {value}
      </div>
      {trend && (
        <div className="text-[11px] font-mono text-gray-500 mt-1">
          {trend}
        </div>
      )}
    </div>
  );
}
