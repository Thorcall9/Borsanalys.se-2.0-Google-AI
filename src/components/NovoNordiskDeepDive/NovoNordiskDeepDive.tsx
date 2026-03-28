import React from 'react';

interface NovoNordiskDeepDiveProps {
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
}

export default function NovoNordiskDeepDive({ 
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading 
}: NovoNordiskDeepDiveProps) {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-4">Novo Nordisk Deep Dive</h1>
        <p className="text-muted">Klistra in din analyskod här.</p>
      </div>
    </div>
  );
}
