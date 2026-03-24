import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Info, TrendingUp, DollarSign } from "lucide-react";

export default function DividendCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [dividendYield, setDividendYield] = useState<number>(4);
  const [dividendGrowth, setDividendGrowth] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [reinvest, setReinvest] = useState<boolean>(true);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);

  const calculateData = () => {
    let balance = initialInvestment;
    let totalDividends = 0;
    let currentYield = dividendYield / 100;
    const data = [];

    for (let i = 0; i <= years; i++) {
      const annualDividend = balance * currentYield;
      data.push({
        year: i,
        balance: Math.round(balance),
        annualDividend: Math.round(annualDividend),
      });

      if (i < years) {
        totalDividends += annualDividend;
        balance += monthlyContribution * 12;
        if (reinvest) {
          balance += annualDividend;
        }
        currentYield = currentYield * (1 + dividendGrowth / 100);
      }
    }
    return data;
  };

  const data = calculateData();
  const finalBalance = data[data.length - 1].balance;
  const finalAnnualDividend = data[data.length - 1].annualDividend;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="text-primary" size={24} />
            <h3 className="text-xl font-serif font-bold">Inställningar</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Initialt Kapital (SEK)</label>
              <input 
                type="number" 
                value={initialInvestment} 
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Månadssparande (SEK)</label>
              <input 
                type="number" 
                value={monthlyContribution} 
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Direktavk. (%)</label>
                <input 
                  type="number" 
                  value={dividendYield} 
                  onChange={(e) => setDividendYield(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Utdeln.tillväxt (%)</label>
                <input 
                  type="number" 
                  value={dividendGrowth} 
                  onChange={(e) => setDividendGrowth(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Antal år</label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>1 år</span>
                <span className="text-primary font-bold">{years} år</span>
                <span>50 år</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setReinvest(!reinvest)}
                className={`w-12 h-6 rounded-full transition-all relative ${reinvest ? 'bg-primary' : 'bg-muted'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${reinvest ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-sm font-medium">Återinvestera utdelning</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4">
          <Info className="text-primary shrink-0" size={20} />
          <p className="text-xs text-muted leading-relaxed">
            Denna kalkylator visar kraften i utdelningstillväxt och återinvestering. Genom att välja bolag som höjer sin utdelning kan din "yield on cost" bli mycket hög över tid.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-section-alt border border-border rounded-2xl p-8 space-y-2">
            <div className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} className="text-primary" /> Slutligt Portföljvärde
            </div>
            <div className="text-4xl font-serif font-bold text-primary">
              {finalBalance.toLocaleString()} <span className="text-lg">SEK</span>
            </div>
          </div>
          <div className="bg-section-alt border border-border rounded-2xl p-8 space-y-2">
            <div className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-2">
              <DollarSign size={14} className="text-primary" /> Årlig Utdelning År {years}
            </div>
            <div className="text-4xl font-serif font-bold text-primary">
              {finalAnnualDividend.toLocaleString()} <span className="text-lg">SEK</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border bg-section-alt">
            <h4 className="font-serif font-bold">Prognos per år</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-muted border-b border-border">År</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-muted border-b border-border text-right">Portföljvärde</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-muted border-b border-border text-right">Årlig Utdelning</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-muted border-b border-border text-right">Månadlig Utdelning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === years).map((row) => (
                  <tr key={row.year} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-sm">År {row.year}</td>
                    <td className="p-4 font-mono text-sm text-right font-bold">{row.balance.toLocaleString()} kr</td>
                    <td className="p-4 font-mono text-sm text-right text-success font-bold">{row.annualDividend.toLocaleString()} kr</td>
                    <td className="p-4 font-mono text-sm text-right text-muted">{Math.round(row.annualDividend / 12).toLocaleString()} kr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
