import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gauge, Loader2, Info, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface FearAndGreedData {
  value: number;
  classification: string;
  previousClose?: number;
  oneWeekAgo?: number;
  oneMonthAgo?: number;
  oneYearAgo?: number;
}

export default function FearAndGreedGauge() {
  const [data, setData] = useState<FearAndGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/market-sentiment");
        if (!response.ok) throw new Error("Kunde inte hämta data");
        
        const rawData = await response.json();
        // The RapidAPI response format for v1/fgi is: { fgi: { now: { value: 45, valueText: "Neutral" }, ... } }
        if (rawData.fgi && rawData.fgi.now) {
          setData({
            value: rawData.fgi.now.value,
            classification: rawData.fgi.now.valueText,
            previousClose: rawData.fgi.previousClose?.value,
            oneWeekAgo: rawData.fgi.oneWeekAgo?.value,
            oneMonthAgo: rawData.fgi.oneMonthAgo?.value,
            oneYearAgo: rawData.fgi.oneYearAgo?.value,
          });
        }
      } catch (err) {
        console.error("Fear & Greed Fetch Error:", err);
        setError("Kunde inte hämta sentimentdata just nu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (val: number) => {
    if (val <= 25) return "text-red-600";
    if (val <= 45) return "text-orange-500";
    if (val <= 55) return "text-amber-400";
    if (val <= 75) return "text-emerald-400";
    return "text-emerald-500";
  };

  const getBgColor = (val: number) => {
    if (val <= 25) return "bg-red-600";
    if (val <= 45) return "bg-orange-500";
    if (val <= 55) return "bg-amber-400";
    if (val <= 75) return "bg-emerald-400";
    return "bg-emerald-500";
  };

  // Calculate rotation for the needle (0-100 maps to -90 to 90 degrees)
  const rotation = data ? (data.value / 100) * 180 - 90 : -90;

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-[2.5rem] p-8 h-[400px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Hämtar Marknadens Puls...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card border border-border rounded-[2.5rem] p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
        <p className="text-sm font-bold text-muted-foreground">{error || "Data saknas"}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-black/5 flex flex-col relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">SENTIMENT</div>
          <h3 className="text-2xl font-black tracking-tighter">Fear & Greed Index</h3>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Gauge size={20} />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-4">
        {/* Gauge Background SVG */}
        <svg viewBox="0 0 200 120" className="w-full max-w-[280px]">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" /> {/* Red-600 */}
              <stop offset="25%" stopColor="#f97316" /> {/* Orange-500 */}
              <stop offset="50%" stopColor="#fbbf24" /> {/* Amber-400 */}
              <stop offset="75%" stopColor="#34d399" /> {/* Emerald-400 */}
              <stop offset="100%" stopColor="#10b981" /> {/* Emerald-500 */}
            </linearGradient>
          </defs>
          
          {/* Main Arc */}
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="12" 
            className="text-muted/30"
            strokeLinecap="round"
          />
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="url(#gaugeGradient)" 
            strokeWidth="12" 
            strokeLinecap="round"
            strokeDasharray="251.32"
            strokeDashoffset={251.32 - (data.value / 100) * 251.32}
            className="transition-all duration-1000 ease-out"
          />

          {/* Needle */}
          <motion.g 
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <line x1="100" y1="100" x2="100" y2="35" stroke="currentColor" strokeWidth="3" className="text-foreground" strokeLinecap="round" />
            <circle cx="100" cy="100" r="6" fill="currentColor" className="text-foreground" />
          </motion.g>

          {/* Labels */}
          <text x="20" y="115" fontSize="8" fontWeight="900" textAnchor="middle" className="fill-muted-foreground uppercase tracking-widest">Fear</text>
          <text x="100" y="115" fontSize="8" fontWeight="900" textAnchor="middle" className="fill-muted-foreground uppercase tracking-widest">Neutral</text>
          <text x="180" y="115" fontSize="8" fontWeight="900" textAnchor="middle" className="fill-muted-foreground uppercase tracking-widest">Greed</text>
        </svg>

        <div className="mt-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-5xl font-black tracking-tighter ${getStatusColor(data.value)}`}
          >
            {data.value}
          </motion.div>
          <div className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">
            {data.classification}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
          <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Förra veckan</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">{data.oneWeekAgo || "--"}</span>
            {data.oneWeekAgo && (
              data.value > data.oneWeekAgo ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-red-500" />
            )}
          </div>
        </div>
        <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
          <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Förra månaden</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">{data.oneMonthAgo || "--"}</span>
            {data.oneMonthAgo && (
              data.value > data.oneMonthAgo ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-red-500" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
        <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center text-primary flex-shrink-0">
          <Info size={14} />
        </div>
        <p className="text-[11px] font-bold leading-relaxed text-muted-foreground italic">
          {data.value < 40 ? "Marknaden är rädd. Historiskt sett har detta varit tillfällen då fynd kan göras." : 
           data.value > 60 ? "Marknaden är girig. Var försiktig med att jaga uppgångar i överköpta lägen." :
           "Marknaden är i balans. Fokusera på bolagsspecifika fundamenta snarare än makro-sentiment."}
        </p>
      </div>
    </motion.div>
  );
}
