import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  BarController,
  LineController
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  BarController,
  LineController
);

interface ChartCardProps {
  title: string;
  type?: 'bar' | 'line';
  data?: any;
  options?: any;
  height?: number;
  children?: React.ReactNode;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9ca3af', font: { family: 'monospace', size: 10 } }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { color: '#9ca3af', font: { family: 'monospace', size: 10 } }
    }
  }
};

export default function ChartCard({ title, type, data, options = defaultOptions, height = 260, children }: ChartCardProps) {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-6 shadow-sm">
      <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-6">{title}</div>
      <div style={{ height: `${height}px` }}>
        {children ? (
          children
        ) : type === 'bar' ? (
          <Bar options={options} data={data} />
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </div>
  );
}
