import React from 'react';
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AlertBoxProps {
  type: 'info' | 'risk' | 'signal' | 'warning';
  title?: string;
  message?: string;
  children?: React.ReactNode;
}

export default function AlertBox({ type, title, message, children }: AlertBoxProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info size={18} className="text-blue-600" />
    },
    risk: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertTriangle size={18} className="text-red-600" />
    },
    signal: {
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      text: 'text-primary',
      icon: <CheckCircle2 size={18} className="text-primary" />
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: <AlertCircle size={18} className="text-amber-600" />
    }
  };

  const style = styles[type];

  return (
    <div className={`flex gap-4 p-5 rounded-xl border ${style.bg} ${style.border} my-6`}>
      <div className="mt-0.5 flex-shrink-0">
        {style.icon}
      </div>
      <div className={`text-sm leading-relaxed ${style.text}`}>
        {title && <div className="font-black uppercase tracking-widest text-[10px] mb-1">{title}</div>}
        {message && <p>{message}</p>}
        {children}
      </div>
    </div>
  );
}
