import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockPriceBadgeProps {
  ticker: string;
}

interface PriceData {
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export const StockPriceBadge: React.FC<StockPriceBadgeProps> = ({ ticker }) => {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/stocks/${ticker}`);
        
        let result;
        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch (e) {
          console.error(`Invalid JSON from server for ${ticker}. Body:`, text.substring(0, 200));
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          throw new Error('Invalid JSON response from server');
        }
        
        if (!response.ok) {
          throw new Error(result.error || `HTTP error! status: ${response.status}`);
        }

        setData({
          price: result.currentPrice || result.price,
          change: result.change || 0,
          changePercent: result.changePercent || 0,
          currency: result.currency
        });
      } catch (error: any) {
        console.error(`Error fetching price for ${ticker}:`, error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [ticker]);

  if (loading) return <div className="h-4 w-16 bg-black/5 animate-pulse rounded" />;
  if (!data) return null;

  const isPositive = data.change >= 0;

  return (
    <div className="flex flex-col items-end">
      <div className="font-serif font-bold text-sm">
        {data.price.toLocaleString()} <span className="text-[10px] font-sans font-normal text-muted">{data.currency}</span>
      </div>
      <div className={`flex items-center gap-0.5 text-[10px] font-mono font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
      </div>
    </div>
  );
};
