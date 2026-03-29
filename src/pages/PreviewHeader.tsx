import React from 'react';
import AnalysisHeader from '../components/NovoNordiskDeepDive/AnalysisHeader';

export default function PreviewHeaderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Design Preview: Analysis Header</h1>
          <p className="text-slate-500 text-sm mt-1">Här kan du se den nya premium-designen för analysens toppsektion.</p>
        </div>
        
        <AnalysisHeader />
        
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Design-anteckningar</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span><strong>Hero-band:</strong> Använder #00A86B för att signalera "KÖP" direkt.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span><strong>Whitespace:</strong> Generös padding (p-10) och gap (gap-6) för en luftig känsla.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span><strong>Paywall:</strong> Subtil blur-effekt på riktkursen för att driva konvertering utan att irritera.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span><strong>Typografi:</strong> Inter med olika vikter (font-black, font-bold) för tydlig hierarki.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
