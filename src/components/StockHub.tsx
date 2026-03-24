import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  Newspaper, 
  FileText, 
  Info,
  ChevronRight,
  ArrowUpRight,
  Globe,
  Briefcase,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { stocks } from '../data/stocks';
import { analyses } from '../data/analyses';

interface LiveData {
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  pe: number | null;
  yield: number | null;
  marketCap: number | null;
  name: string;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  volume: number | null;
  eps: number | null;
  currentPrice?: number | null;
  targetPrice?: number | null;
}

export default function StockHub() {
  const { slug } = useParams<{ slug: string }>();
  const stock = slug ? stocks[slug] : null;
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stock?.yahooTicker) {
      const fetchLiveData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/stocks/${stock.yahooTicker}`);
          
          let data;
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error(`Invalid JSON from server for ${stock.yahooTicker}. Body:`, text.substring(0, 200));
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            throw new Error('Invalid JSON response from server');
          }
          
          if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
          }
          
          setLiveData(data);
        } catch (err: any) {
          console.error('Error fetching live data:', err);
          setError(err.message || 'Kunde inte hämta live-data');
        } finally {
          setLoading(false);
        }
      };

      fetchLiveData();
    }
  }, [stock?.yahooTicker]);

  // Find analyses related to this stock
  const relatedAnalyses = Object.values(analyses).filter(a => 
    a.slug.includes(slug || '') || a.ticker === stock?.ticker
  );

  if (!stock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Bolaget hittades inte</h1>
          <p className="text-muted mb-8 text-lg">Vi har ännu inte lagt till information om detta bolag.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline font-bold">
            Gå tillbaka till startsidan <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const formatMarketCap = (val: number | null) => {
    if (val === null) return 'N/A';
    if (val >= 1e12) return `${(val / 1e12).toFixed(2)} T`;
    if (val >= 1e9) return `${(val / 1e9).toFixed(1)} B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(1)} M`;
    return val.toLocaleString();
  };

  const displayPrice = liveData 
    ? `${liveData.price.toLocaleString()} ${liveData.currency}`
    : stock.stats.price;

  const displayChange = liveData
    ? `${liveData.changePercent > 0 ? '+' : ''}${liveData.changePercent.toFixed(2)}%`
    : stock.stats.change;

  const isUp = liveData ? liveData.changePercent > 0 : stock.stats.change.startsWith('+');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 ${stock.logoColor} rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg`}>
              {stock.ticker[0]}
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground leading-none">{stock.name}</h1>
              <div className="text-[10px] font-mono text-muted tracking-widest mt-1 uppercase">
                {stock.ticker} · {stock.market}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
              {loading && <Loader2 size={14} className="animate-spin text-primary" />}
              {!loading && liveData && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-primary/10 text-primary text-[8px] font-mono font-bold rounded border border-primary/20 uppercase tracking-tighter">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  Live
                </span>
              )}
              <div className="text-2xl font-serif font-bold text-foreground">{displayPrice}</div>
            </div>
            <div className={`text-xs font-mono ${isUp ? 'text-success' : 'text-danger'}`}>
              {isUp ? '▲' : '▼'} {displayChange}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Info & Stats */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] font-mono tracking-[0.3em] text-muted uppercase">Om Bolaget</h2>
                {error && <span className="text-[10px] text-danger font-mono uppercase">{error}</span>}
              </div>
              <p className="text-lg text-muted leading-relaxed font-light">
                {stock.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-muted uppercase mb-1">Börsvärde</div>
                  <div className="text-xl font-serif font-bold text-foreground">
                    {liveData ? formatMarketCap(liveData.marketCap) : stock.stats.marketCap}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-muted uppercase mb-1">P/E (LTM)</div>
                  <div className="text-xl font-serif font-bold text-foreground">
                    {liveData ? (liveData.pe ? liveData.pe.toFixed(1) : 'N/A') : stock.stats.pe}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-muted uppercase mb-1">Sektor</div>
                  <div className="text-xl font-serif font-bold text-foreground">{stock.sector}</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-muted uppercase mb-1">Direktavk.</div>
                  <div className="text-xl font-serif font-bold text-foreground">
                    {liveData && liveData.yield !== null ? `${(liveData.yield * 100).toFixed(2)}%` : stock.stats.yield}
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Metrics */}
            {liveData && (
              <section className="p-8 bg-section-alt border border-border rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[11px] font-mono tracking-[0.3em] text-muted uppercase">Fler Nyckeltal (Live)</h2>
                  <span className="text-[9px] font-mono text-muted uppercase">Källa: Yahoo Finance</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">52-veckors Högsta</div>
                    <div className="text-lg font-serif font-bold text-foreground">{liveData.fiftyTwoWeekHigh?.toLocaleString()} {liveData.currency}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">52-veckors Lägsta</div>
                    <div className="text-lg font-serif font-bold text-foreground">{liveData.fiftyTwoWeekLow?.toLocaleString()} {liveData.currency}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">Volym</div>
                    <div className="text-lg font-serif font-bold text-foreground">{liveData.volume?.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">Vinst per aktie (EPS)</div>
                    <div className="text-lg font-serif font-bold text-foreground">{liveData.eps?.toFixed(2)} {liveData.currency}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">Valuta</div>
                    <div className="text-lg font-serif font-bold text-foreground">{liveData.currency}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted uppercase tracking-wider">Marknad</div>
                    <div className="text-lg font-serif font-bold text-foreground">{stock.market}</div>
                  </div>
                  {liveData.targetPrice && (
                    <div className="space-y-1">
                      <div className="text-[10px] text-primary uppercase tracking-wider font-bold">Riktkurs (Snitt)</div>
                      <div className="text-lg font-serif font-bold text-primary">{liveData.targetPrice.toFixed(2)} {liveData.currency}</div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Key Metrics Chart */}
            <section>
              <h2 className="text-[11px] font-mono tracking-[0.3em] text-muted uppercase mb-6">Finansiell Trend</h2>
              <div className="p-6 bg-white border border-border rounded-2xl shadow-sm">
                {stock.financialData ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <AreaChart data={stock.financialData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                        <XAxis 
                          dataKey="year" 
                          stroke="#999" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <YAxis 
                          stroke="#999" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `${value} ${stock.financialUnit || ''}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          itemStyle={{ fontSize: '12px' }}
                          formatter={(value, name) => [`${value} ${stock.financialUnit || ''}`, name]}
                        />
                        <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          name="Omsättning"
                          stroke="#10b981" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorRevenue)" 
                          baseLine={0}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="profit" 
                          name="Vinst"
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorProfit)" 
                          baseLine={0}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="aspect-[21/9] flex items-center justify-center text-muted italic text-sm">
                    Finansiell data saknas för detta bolag.
                  </div>
                )}
              </div>
            </section>

            {/* Recent Analyses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] font-mono tracking-[0.3em] text-muted uppercase">Senaste Analyser</h2>
                <Link to="/analys" className="text-[10px] font-mono text-primary hover:underline uppercase tracking-widest">Visa alla</Link>
              </div>
              <div className="space-y-4">
                {relatedAnalyses.length > 0 ? (
                  relatedAnalyses.map((analysis) => (
                    <Link 
                      key={analysis.slug}
                      to={`/analys/${analysis.slug}`}
                      className="group block p-6 bg-white border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">Analys</div>
                          <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{analysis.title}</h3>
                          <p className="text-sm text-muted mt-2 line-clamp-1">{analysis.summary}</p>
                        </div>
                        <ArrowUpRight className="text-muted group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 bg-section-alt border border-dashed border-border rounded-2xl text-center">
                    <p className="text-muted text-sm">Inga analyser publicerade än för detta bolag.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-12">
            
            {/* Quick Actions */}
            <section className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                Investment Case
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                {relatedAnalyses.length > 0 
                  ? relatedAnalyses[0].motivation?.substring(0, 150) + '...'
                  : `Vi bevakar ${stock.name} noga och kommer snart publicera en fullständig analys av bolagets framtidsutsikter.`}
              </p>
              {relatedAnalyses.length > 0 ? (
                <Link 
                  to={`/analys/${relatedAnalyses[0].slug}`}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-light transition-colors"
                >
                  Läs Fullständig Analys
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <button className="w-full py-3 bg-muted/10 text-muted font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                  Analys kommer snart
                </button>
              )}
            </section>

            {/* News Feed (Mocked for now) */}
            <section>
              <h2 className="text-[11px] font-mono tracking-[0.3em] text-muted uppercase mb-6">Senaste Nytt</h2>
              <div className="space-y-6">
                {[
                  { title: `${stock.name} rapporterar starkare siffror än väntat`, date: '2 timmar sedan' },
                  { title: `Analytiker ser fortsatt uppsida i ${stock.ticker}`, date: '1 dag sedan' },
                  { title: `Insiderköp i ${stock.name} väcker intresse`, date: '3 dagar sedan' }
                ].map((item, i) => (
                  <div key={i} className="border-b border-border pb-4 last:border-0">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">{item.date}</div>
                    <h4 className="text-sm font-medium text-foreground hover:text-primary cursor-pointer transition-colors">{item.title}</h4>
                  </div>
                ))}
              </div>
            </section>

            {/* Company Details */}
            <section className="p-6 bg-white border border-border rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Sektor</span>
                <span className="text-foreground font-medium">{stock.sector}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Marknad</span>
                <span className="text-foreground font-medium">{stock.market}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Hemsida</span>
                <a href="#" className="text-primary hover:underline flex items-center gap-1 font-medium">
                  Besök <Globe size={10} />
                </a>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}
