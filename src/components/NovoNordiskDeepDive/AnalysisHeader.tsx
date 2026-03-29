import React, { useState } from 'react';
import { Lock, AlertTriangle, Star } from 'lucide-react';

// --- Types ---
interface AnalysisCategory {
  name: string;
  score: number;
  max: number;
  hasWarning?: boolean;
}

// --- Mock Data ---
const categories: AnalysisCategory[] = [
  { name: "Affärsmodell", score: 5, max: 5 },
  { name: "Strategisk Moat", score: 4, max: 5 },
  { name: "Finansiell", score: 4, max: 5 },
  { name: "Värdering", score: 4, max: 5 },
  { name: "Tillväxt", score: 3, max: 5 },
  { name: "Risk", score: 2, max: 5, hasWarning: true },
  { name: "ESG & Makro", score: 4, max: 5 },
  { name: "AI-obs.", score: 3, max: 5 },
];

const tabs = [
  { id: 'oversikt', label: 'Översikt' },
  { id: 'finansiell', label: 'Finansiell' },
  { id: 'vardering', label: 'Värdering' },
  { id: 'strategi', label: 'Strategi & Risk' },
  { id: 'scenarier', label: 'Scenarier' },
];

// --- Sub-components ---

const RatingDots = ({ score, max }: { score: number; max: number }) => {
  return (
    <div className="flex gap-1 ml-2">
      {[...Array(max)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < score 
              ? (score >= 4 ? 'bg-[#00A86B]' : 'bg-slate-400') 
              : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
};

export default function AnalysisHeader() {
  const [activeTab, setActiveTab] = useState('oversikt');

  const handleUnlock = () => {
    console.log("Öppna inloggning/betalvägg");
  };

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#00A86B] text-white py-6 md:py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Assessment */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#00A86B] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-black tracking-tighter">KÖP</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Novo Nordisk A/S
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">NOVO-B • NVO</span>
                <span className="text-sm font-medium opacity-90">Läkemedel • Diabetes & Fetma • Nasdaq Köpenhamn & NYSE</span>
              </div>
            </div>
          </div>

          {/* Right: Total Score */}
          <div className="flex flex-col items-start md:items-end w-full md:w-64">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tighter">33/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '82.5%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">82,5 % – Stark kvalitetsaktie</span>
          </div>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="w-full bg-slate-50 border-b border-slate-100 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
              <div className="text-2xl font-black text-slate-900">~DKK 236</div>
              <span className="text-xs text-slate-500 mt-1 block">Mars 2026 estimat</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
              <div className="text-2xl font-black text-slate-900">~DKK 1 050 Mdr</div>
              <span className="text-xs text-red-500 font-bold mt-1 block">−62% från ATH</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E 2026E</span>
              <div className="text-2xl font-black text-slate-900">~10,4x</div>
              <span className="text-xs text-[#00A86B] font-bold mt-1 block">Historiskt lågt</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Direktavk.</span>
              <div className="text-2xl font-black text-slate-900">~4,8%</div>
              <span className="text-xs text-slate-500 mt-1 block">2026 estimat</span>
            </div>

            {/* PAYWALL */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#00A86B]/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Riktkurs</span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-black text-slate-900 blur-[4px] select-none">395 kr</div>
                  <Lock size={16} className="text-[#00A86B]" />
                </div>
                <p className="text-[10px] leading-tight text-slate-500 mt-2 mb-4">Logga in för att se vår riktkurs och motivering</p>
                <button 
                  onClick={handleUnlock}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5b] text-white text-[11px] font-black py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Lås upp riktkurs
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#00A86B]">
                <Star size={80} fill="currentColor" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. ANALYSIS CATEGORIES */}
      <div className="w-full py-8 px-6 md:px-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                className="flex items-center bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm hover:border-[#00A86B]/30 transition-colors"
              >
                {cat.hasWarning && <AlertTriangle size={14} className="text-amber-500 mr-2" />}
                <span className="text-xs font-bold text-slate-600">{cat.name}</span>
                <span className={`text-xs font-black ml-2 ${cat.score >= 4 ? 'text-[#00A86B]' : 'text-slate-500'}`}>
                  {cat.score}/{cat.max}
                </span>
                <RatingDots score={cat.score} max={cat.max} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. TAB NAVIGATION */}
      <div className="w-full px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-6 text-sm font-bold tracking-tight transition-all relative whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-[#00A86B]' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00A86B] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
