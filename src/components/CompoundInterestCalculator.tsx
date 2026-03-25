import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Wallet, PieChart, ArrowRight, Info } from "lucide-react";

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(8);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const results = [];
    let balance = initialAmount;
    let totalContribution = initialAmount;
    const rate = interestRate / 100 / 12;

    for (let i = 0; i <= years; i++) {
      results.push({
        year: i,
        total: Math.round(balance),
        contribution: Math.round(totalContribution),
        interest: Math.round(balance - totalContribution),
      });

      if (i < years) {
        for (let m = 0; m < 12; m++) {
          balance = (balance + monthlyContribution) * (1 + rate);
          totalContribution += monthlyContribution;
        }
      }
    }
    setData(results);
  }, [initialAmount, monthlyContribution, years, interestRate]);

  const finalData = data[data.length - 1] || { total: 0, contribution: 0, interest: 0 };

  const quickRates = [5, 7, 8, 10, 12];

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
              <h3 className="text-2xl font-serif font-bold tracking-tight">Inställningar</h3>
              <p className="text-sm text-muted-foreground">Justera parametrarna för att se din framtida förmögenhet.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                  <span>Startkapital</span>
                  <span className="text-primary">{initialAmount.toLocaleString()} kr</span>
                </label>
                <input 
                  type="range"
                  min="0"
                  max="1000000"
                  step="5000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <input 
                  type="number" 
                  value={initialAmount} 
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                  <span>Månadssparande</span>
                  <span className="text-primary">{monthlyContribution.toLocaleString()} kr</span>
                </label>
                <input 
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <input 
                  type="number" 
                  value={monthlyContribution} 
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">År</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Avkastning (%)</label>
                  <input 
                    type="number" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Snabba val (Avkastning)</label>
                <div className="flex flex-wrap gap-2">
                  {quickRates.map(rate => (
                    <button
                      key={rate}
                      onClick={() => setInterestRate(rate)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${interestRate === rate ? 'bg-primary text-white' : 'bg-white border border-border text-muted-foreground hover:border-primary/50'}`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Chart */}
        <div className="lg:col-span-8 p-8 md:p-10 space-y-10">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-section-alt rounded-2xl border border-border/50 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                <Wallet size={14} className="text-primary" /> Inbetalt kapital
              </div>
              <div className="text-2xl font-serif font-bold">
                {finalData.contribution.toLocaleString()} kr
              </div>
            </div>
            <div className="p-6 bg-section-alt rounded-2xl border border-border/50 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                <TrendingUp size={14} className="text-success" /> Ränta-på-ränta
              </div>
              <div className="text-2xl font-serif font-bold text-success">
                + {finalData.interest.toLocaleString()} kr
              </div>
            </div>
            <div className="p-6 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/70 font-bold">
                <PieChart size={14} /> Slutbelopp
              </div>
              <div className="text-2xl font-serif font-bold">
                {finalData.total.toLocaleString()} kr
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                Tillväxtresa <Info size={14} className="text-muted-foreground" />
              </h4>
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Inbetalt
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" /> Ränta
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorContribution" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
                    dataKey="contribution" 
                    stackId="1"
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorContribution)" 
                    name="Inbetalt kapital"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="interest" 
                    stackId="1"
                    stroke="#10B981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorInterest)" 
                    name="Ränta-på-ränta"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight Box */}
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4 items-start">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-bold">Visste du?</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Efter {years} år utgör räntan {Math.round((finalData.interest / finalData.total) * 100)}% av ditt totala kapital. Ju längre du sparar, desto mer kraftfull blir ränta-på-ränta effekten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
