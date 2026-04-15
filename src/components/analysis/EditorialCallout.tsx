import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface EditorialCalloutProps {
  slug: string;
  title: string;
  label: string;
  text: string;
  cta: string;
  accentColor: string;
}

export default function EditorialCallout({ 
  slug, 
  title, 
  label, 
  text, 
  cta, 
  accentColor 
}: EditorialCalloutProps) {
  return (
    <FadeIn delay={100}>
      <div 
        className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
        style={{ borderLeft: `6px solid ${accentColor}` }}
      >
        {/* Subtle background glow */}
        <div 
          className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex-1 relative z-10">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{label}</div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
            {text}
          </p>
        </div>
        
        <Link 
          to={`/analys/${slug}`} 
          className="whitespace-nowrap bg-slate-900 text-white px-8 py-4 rounded-2xl text-sm font-black hover:bg-slate-800 transition-all flex items-center gap-3 group/btn shadow-lg shadow-black/5 hover:shadow-black/10 hover:-translate-y-0.5"
        >
          {cta}
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </FadeIn>
  );
}
