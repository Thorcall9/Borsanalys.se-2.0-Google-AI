import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";
import { Target, TrendingUp, Calendar, Percent, Wallet, ArrowRight, Info } from "lucide-react";

export default function GoalSavingsCalculator() {
  const [goal, setGoal] = useState(1000000);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const r = interestRate / 100 / 12;
    const n = years * 12;
    
    const fvInitial = initialAmount * Math.pow(1 + r, n);
    const needed = Math.max(0, goal - fvInitial);
    
    let pmt = 0;
    if (r === 0) {
      pmt = needed / n;
    } else {
      pmt = (needed * r) / (Math.pow(1 + r, n) - 1);
    }
    
    setMonthlyContribution(pmt);

    const newData = [];
    let currentBalance = initialAmount;
    for (let i = 0; i <= years; i++) {
      newData.push({
        year: i,
        balance: Math.round(currentBalance),
        goal: goal
      });
      
      if (i < years) {
        for (let j = 0; j < 12; j++) {
          currentBalance = (currentBalance + pmt) * (1 + r);
        }
      }
    }
    setData(newData);
  }, [goal, years, interestRate, initialAmount]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Inputs Sidebar */}
        <div className="lg:col-span-4 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border bg-section-alt/30">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold tracking-tight">Målsparande</h3>
              <p className="text-sm text-muted">Räkna ut vad som krävs för att nå din drömsiffra.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted font-bold">
                  <span>Ditt sparmål</span>
                  <span className="text-primary">{goal.toLocaleString()} kr</span>
                </label>
                <input 
                  type="range"
                  min="10000"
                  max="10000000"
                  step="50000"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <input 
                  type="number" 
                  value={goal} 
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted font-bold">
                  <span>Startkapital</span>
                  <span className="text-primary">{initialAmount.toLocaleString()} kr</span>
                </label>
                <input 
                  type="number" 
                  value={initialAmount} 
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted font-bold">Tid (år)</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted font-bold">Avkastning (%)</label>
                  <input 
                    type="number" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Chart */}
        <div className="lg:col-span-8 p-8 md:p-10 space-y-10">
          {/* Result Card */}
          <div className="p-8 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/70 font-bold">Månadssparande som krävs</div>
              <div className="text-5xl font-serif font-bold">
                {Math.round(monthlyContribution).toLocaleString()} kr
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                För att nå ditt mål på {goal.toLocaleString()} kr inom {years} år med en årlig avkastning på {interestRate}% behöver du spara detta belopp varje månad.
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                Vägen till målet <Info size={14} className="text-muted" />
              </h4>
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Prognos
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 border-t border-dashed border-muted" /> Mål
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalanceGoal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#A3A3A3" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `År ${val}`}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#A3A3A3" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "12px" }}
                    itemStyle={{ padding: "2px 0" }}
                    labelStyle={{ fontWeight: "bold", marginBottom: "8px", color: "#171717" }}
                    formatter={(val: number) => [`${val.toLocaleString()} kr`]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBalanceGoal)" 
                    name="Prognos"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="goal" 
                    stroke="#A3A3A3" 
                    strokeDasharray="5 5" 
                    dot={false} 
                    name="Mål"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
