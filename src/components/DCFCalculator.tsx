import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Info, 
  ArrowRight,
  RefreshCcw,
  HelpCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function DCFCalculator() {
  const [currentFCF, setCurrentFCF] = useState(100);
  const [growthRate, setGrowthRate] = useState(10);
  const [discountRate, setDiscountRate] = useState(10);
  const [terminalGrowth, setTerminalGrowth] = useState(2);
  const [years, setYears] = useState(10);
  const [netDebt, setNetDebt] = useState(0);
  const [sharesOutstanding, setSharesOutstanding] = useState(100);

  const dcfData = useMemo(() => {
    let projections = [];
    let cumulativePV = 0;
    let currentYearFCF = currentFCF;

    for (let i = 1; i <= years; i++) {
      currentYearFCF = currentYearFCF * (1 + growthRate / 100);
      const pv = currentYearFCF / Math.pow(1 + discountRate / 100, i);
      cumulativePV += pv;
      
      projections.push({
        year: `År ${i}`,
        fcf: Math.round(currentYearFCF),
        pv: Math.round(pv),
      });
    }

    // Terminal Value
    const terminalValue = (currentYearFCF * (1 + terminalGrowth / 100)) / (discountRate / 100 - terminalGrowth / 100);
    const pvTerminalValue = terminalValue / Math.pow(1 + discountRate / 100, years);
    
    const enterpriseValue = cumulativePV + pvTerminalValue;
    const equityValue = enterpriseValue - netDebt;
    const fairValuePerShare = equityValue / sharesOutstanding;

    return {
      projections,
      enterpriseValue: Math.round(enterpriseValue),
      equityValue: Math.round(equityValue),
      fairValuePerShare: fairValuePerShare.toFixed(2),
      pvCashFlows: Math.round(cumulativePV),
      pvTerminalValue: Math.round(pvTerminalValue)
    };
  }, [currentFCF, growthRate, discountRate, terminalGrowth, years, netDebt, sharesOutstanding]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-1 space-y-6">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Calculator className="text-emerald-500" size={20} />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">DCF-Antaganden</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Nuvarande FCF (Mkr)</label>
              <input 
                type="number" 
                value={currentFCF}
                onChange={(e) => setCurrentFCF(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Tillväxttakt (%)</label>
                <span className="text-emerald-500 font-mono text-xs">{growthRate}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Avkastningskrav (%)</label>
                <span className="text-emerald-500 font-mono text-xs">{discountRate}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="20" 
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Evig Tillväxt (%)</label>
                <span className="text-emerald-500 font-mono text-xs">{terminalGrowth}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1"
                value={terminalGrowth}
                onChange={(e) => setTerminalGrowth(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Nettoskuld</label>
                <input 
                  type="number" 
                  value={netDebt}
                  onChange={(e) => setNetDebt(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Antal aktier</label>
                <input 
                  type="number" 
                  value={sharesOutstanding}
                  onChange={(e) => setSharesOutstanding(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
          <div className="flex items-start gap-3">
            <Info className="text-emerald-500 shrink-0" size={18} />
            <p className="text-xs text-gray-400 leading-relaxed">
              DCF (Discounted Cash Flow) beräknar ett bolags nuvärde genom att diskontera framtida kassaflöden. 
              Detta är den mest teoretiskt korrekta metoden för att värdera ett bolag.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 space-y-8">
        {/* Fair Value Card */}
        <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-[0.3em] mb-4">Beräknat Motiverat Värde</h3>
            <div className="text-6xl font-serif font-bold text-white mb-2">
              {dcfData.fairValuePerShare} <span className="text-2xl font-sans text-emerald-500">kr</span>
            </div>
            <p className="text-gray-400 text-sm">per aktie baserat på dina antaganden</p>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
          <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Projicerade Kassaflöden (Mkr)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={dcfData.projections}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="year" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="fcf" name="Fritt Kassaflöde" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pv" name="Nuvärde (PV)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <div className="text-xs font-mono text-gray-500 uppercase mb-2">Enterprise Value</div>
            <div className="text-2xl font-serif font-bold text-white">{dcfData.enterpriseValue} Mkr</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">PV av Kassaflöden</span>
                <span className="text-gray-300">{dcfData.pvCashFlows} Mkr</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">PV av Terminalvärde</span>
                <span className="text-gray-300">{dcfData.pvTerminalValue} Mkr</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <div className="text-xs font-mono text-gray-500 uppercase mb-2">Equity Value</div>
            <div className="text-2xl font-serif font-bold text-white">{dcfData.equityValue} Mkr</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Enterprise Value</span>
                <span className="text-gray-300">{dcfData.enterpriseValue} Mkr</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Nettoskuld</span>
                <span className="text-gray-300">{netDebt} Mkr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
