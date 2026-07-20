import React from "react";

export default function MarketBackdrop() {
  return (
    <svg
      className="market-backdrop"
      viewBox="0 0 720 420"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="market-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.48" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id="market-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#10b981" stopOpacity="0.05" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M0 340 C110 316 180 330 255 272 S385 245 452 186 S570 130 720 38" fill="none" stroke="url(#market-fade)" strokeWidth="2" />
      <path d="M24 336 L98 300 L150 307 L205 268 L254 280 L307 224 L354 244 L405 190 L455 198 L505 130 L556 151 L611 74 L661 88 L710 26" fill="none" stroke="url(#market-line)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {[
        [84, 292, 34, 10], [125, 266, 52, 9], [175, 282, 38, 10], [227, 239, 60, 10],
        [282, 205, 46, 11], [334, 218, 54, 10], [390, 166, 48, 11], [442, 145, 66, 10],
        [512, 99, 54, 10], [566, 68, 66, 11], [635, 38, 50, 10],
      ].map(([x, y, height, width]) => (
        <g key={`${x}-${y}`} opacity="0.34">
          <line x1={x + width / 2} y1={y - 12} x2={x + width / 2} y2={y + height + 14} stroke="currentColor" strokeWidth="1" />
          <rect x={x} y={y} width={width} height={height} rx="3" fill="currentColor" opacity="0.32" />
        </g>
      ))}
      <circle cx="710" cy="26" r="8" fill="#10b981" opacity="0.18" />
      <circle cx="710" cy="26" r="3.5" fill="#10b981" opacity="0.65" />
    </svg>
  );
}
