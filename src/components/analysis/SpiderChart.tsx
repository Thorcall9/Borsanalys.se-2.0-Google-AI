import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SpiderChartProps {
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro: number;
    aiObservationer: number;
  };
  accentColor?: string;
}

export default function SpiderChart({ scores, accentColor = "#1a3c6e" }: SpiderChartProps) {
  const data = [
    { subject: 'Affärsmodell', A: scores.affarsmodell, fullMark: 5 },
    { subject: 'Moat', A: scores.strategiskMoat, fullMark: 5 },
    { subject: 'Finans', A: scores.finansiellKvalitet, fullMark: 5 },
    { subject: 'Värdering', A: scores.vardering, fullMark: 5 },
    { subject: 'Tillväxt', A: scores.tillvaxtutsikter, fullMark: 5 },
    { subject: 'Riskprofil', A: scores.riskprofil, fullMark: 5 },
    { subject: 'ESG/Makro', A: scores.esgMakro, fullMark: 5 },
    { subject: 'AI-obs', A: scores.aiObservationer, fullMark: 5 },
  ];

  return (
    <div className="w-full h-[350px] md:h-[450px] bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center">
      <div className="text-[11px] font-mono tracking-widest text-muted uppercase mb-6 text-center font-bold">
        Strategisk Profil & Kvalitetsbetyg
      </div>
      <div className="w-full flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(0,0,0,0.05)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 600, className: "text-muted-foreground" }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 5]} 
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: '1px solid rgba(0,0,0,0.05)',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
            <Radar
              name="Betyg"
              dataKey="A"
              stroke={accentColor}
              fill={accentColor}
              fillOpacity={0.3}
              strokeWidth={2}
              label={{ 
                fill: accentColor, 
                fontSize: 12, 
                fontWeight: 800,
                position: 'top',
                offset: 10
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex gap-4 text-[10px] font-mono text-muted uppercase">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
          <span>Analytikerbetyg (1-5)</span>
        </div>
      </div>
    </div>
  );
}
