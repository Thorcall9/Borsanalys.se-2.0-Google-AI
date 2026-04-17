import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Target, Globe, Shield } from 'lucide-react';

interface Recommendation {
  slug: string;
  title?: string;
  reason?: string;
  label?: string;
}

interface EditorialReadNextProps {
  recommendations: Recommendation[];
  title?: string;
}

export default function EditorialReadNext({ 
  recommendations, 
  title = "Läs nästa analys" 
}: EditorialReadNextProps) {
  if (!recommendations || recommendations.length === 0) return null;

  // Generic icons to avoid license/logo issues
  const getIcon = (index: number) => {
    const icons = [
      <BarChart3 className="text-slate-400" size={20} />,
      <Target className="text-slate-400" size={20} />,
      <Globe className="text-slate-400" size={20} />,
      <Shield className="text-slate-400" size={20} />,
      <TrendingUp className="text-slate-400" size={20} />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="my-16 py-12 border-y border-slate-100 relative overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="flex flex-col gap-8">
        <div className="text-center px-4">
          <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            Handplockade rekommendationer för ett större sammanhang
          </p>
        </div>

        <div className={`grid grid-cols-1 ${recommendations.length > 1 ? 'md:grid-cols-2' : ''} gap-5 md:gap-8`}>
          {recommendations.slice(0, 2).map((rec, idx) => (
            <Link
              key={rec.slug}
              to={`/analys/${rec.slug}`}
              className="group relative flex flex-col p-6 md:p-8 bg-white border border-slate-200 rounded-3xl transition-all duration-300 hover:border-slate-400/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  {getIcon(idx)}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-900 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest">Läs nu</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {rec.label || "Redaktionell matchning"}
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-[#10B981] transition-colors">
                  {rec.title || "Visa analys"}
                </h4>
                {rec.reason && (
                  <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                    {rec.reason}
                  </p>
                )}
              </div>
              
              {/* Subtle border accent on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-900/0 group-hover:bg-[#10B981] rounded-b-3xl transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
