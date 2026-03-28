import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TYPES
 */
interface Category {
  id: number;
  title: string;
  side: 'left' | 'right';
  tooltip: string;
  score: number;
  x: number;
  y: number;
}

interface Scenario {
  type: 'Bull' | 'Base' | 'Bear';
  color: string;
  price: string;
  probability: string;
}

/**
 * DATA
 */
const CATEGORIES: Category[] = [
  // Left Side (Qualitative & Strategic)
  {
    id: 1,
    title: 'I. Företagsöversikt',
    side: 'left',
    tooltip: 'Vi analyserar affärsmodellen på djupet, utvärderar ledningens historik och säkerställer att ägarstrukturen gynnar långsiktiga aktieägare.',
    score: 5,
    x: 220,
    y: 120,
  },
  {
    id: 2,
    title: 'II. Strategisk analys & Moat',
    side: 'left',
    tooltip: 'Bedömning av bolagets vallgravar (Moats) och konkurrensfördelar. Hur skyddad är vinstmaskinen mot nya utmanare och marknadstrender?',
    score: 4,
    x: 140,
    y: 280,
  },
  {
    id: 3,
    title: 'V. Tillväxtmotorer & Triggers',
    side: 'left',
    tooltip: 'Identifiering av konkreta katalysatorer. Vi letar efter expansion på nya marknader, innovation och faktorer som kan driva en omvärdering av aktien.',
    score: 5,
    x: 140,
    y: 440,
  },
  {
    id: 4,
    title: 'VII. ESG & Makro',
    side: 'left',
    tooltip: 'Analys av hållbarhetsrisker och hur bolaget påverkas av det makroekonomiska läget, såsom räntor, inflation och geopolitik.',
    score: 3,
    x: 220,
    y: 600,
  },
  // Right Side (Quantitative & Risk)
  {
    id: 5,
    title: 'III. Finansiell analys',
    side: 'right',
    tooltip: 'En stenhård genomgång av siffrorna: Vinsttillväxt, kassaflöde och balansräkningens styrka. Vi ser bortom redovisningskosmetik.',
    score: 4,
    x: 780,
    y: 120,
  },
  {
    id: 6,
    title: 'IV. Värdering & Jämförelse',
    side: 'right',
    tooltip: 'Är aktien billig eller dyr? Vi ställer multiplar som P/E, EV/EBIT och PEG i relation till historiska snitt och relevanta konkurrenter.',
    score: 4,
    x: 860,
    y: 280,
  },
  {
    id: 7,
    title: 'VI. Riskprofil',
    side: 'right',
    tooltip: 'Vi vänder på steken och letar efter det som kan gå fel. Inkluderar branschspecifika hot och finansiella fallgropar.',
    score: 2,
    x: 860,
    y: 440,
  },
  {
    id: 8,
    title: 'VIII. AI-observationer',
    side: 'right',
    tooltip: 'Vår AI skannar miljontals datapunkter, nyhetsflöden och dolda mönster för att identifiera avvikelser som den mänskliga analysen kan missa.',
    score: 5,
    x: 780,
    y: 600,
  },
];

const SCENARIOS: Scenario[] = [
  { type: 'Bull', color: '#16a34a', price: '420 SEK', probability: '25%' },
  { type: 'Base', color: '#b5892a', price: '345 SEK', probability: '50%' },
  { type: 'Bear', color: '#dc2626', price: '210 SEK', probability: '25%' },
];

/**
 * COMPONENT
 */
const Mindmap: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<'summary' | 'scenarios' | null>(null);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalScore = useMemo(() => CATEGORIES.reduce((sum, cat) => sum + cat.score, 0), []);
  const decision = useMemo(() => {
    if (totalScore >= 32) return { label: 'KÖP', color: '#16a34a' };
    if (totalScore >= 24) return { label: 'BEVAKA', color: '#b5892a' };
    return { label: 'AVSTÅ', color: '#dc2626' };
  }, [totalScore]);

  const centerX = 500;
  const centerY = 360;

  return (
    <div className="w-full bg-emerald-50/30 py-12 px-4 md:px-8 font-inter overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900"
          >
            Vår <span className="text-[#10B981]">Analysmetodik</span>
          </motion.h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
            Vi kombinerar mänsklig expertis med AI för att leverera marknadens mest kompletta bolagsanalyser.
          </p>
        </div>

        {/* MINDMAP AREA */}
        <div className="relative min-h-[500px] md:min-h-[800px] flex flex-col items-center">
          {isMobile ? (
            /* MOBILE LAYOUT */
            <div className="w-full grid grid-cols-2 gap-4 mb-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-2">Kvalitativ & Strategisk</h3>
                {CATEGORIES.filter(c => c.side === 'left').map(cat => (
                  <MobileNode key={cat.id} cat={cat} />
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-2 text-right">Kvantitativ & Risk</h3>
                {CATEGORIES.filter(c => c.side === 'right').map(cat => (
                  <MobileNode key={cat.id} cat={cat} />
                ))}
              </div>
            </div>
          ) : (
            /* DESKTOP LAYOUT (SVG) */
            <div className="w-full relative h-[720px]">
              <svg viewBox="0 0 1000 720" className="w-full h-full">
                {/* DRAWING LINES */}
                {CATEGORIES.map(cat => (
                  <motion.path
                    key={`line-${cat.id}`}
                    d={`M ${centerX} ${centerY} L ${cat.x} ${cat.y}`}
                    stroke="#10B981"
                    strokeWidth={hoveredId === cat.id ? 3 : 1.5}
                    strokeOpacity={hoveredId === cat.id ? 0.8 : 0.2}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="transition-all duration-300"
                  />
                ))}

                {/* FLOW LINES TO BOTTOM */}
                <motion.path
                  d="M 220 600 C 220 700, 400 700, 400 720"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeOpacity="0.1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
                <motion.path
                  d="M 780 600 C 780 700, 600 700, 600 720"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeOpacity="0.1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />

                {/* CENTRAL NODE */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r="70"
                    fill="#10B981"
                    animate={{ 
                      boxShadow: ["0 0 0px #10B981", "0 0 30px #10B981", "0 0 0px #10B981"] 
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="drop-shadow-xl"
                  />
                  <text
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    className="text-sm font-black tracking-widest uppercase pointer-events-none"
                  >
                    Börsanalys.se
                  </text>
                </motion.g>

                {/* CATEGORY NODES */}
                {CATEGORIES.map(cat => (
                  <motion.g
                    key={`node-${cat.id}`}
                    onMouseEnter={() => setHoveredId(cat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-help"
                  >
                    <motion.rect
                      x={cat.x - 100}
                      y={cat.y - 30}
                      width="200"
                      height="60"
                      rx="12"
                      fill="white"
                      stroke="#10B981"
                      strokeWidth={hoveredId === cat.id ? 2 : 1}
                      className="transition-all duration-300 shadow-sm"
                      animate={{
                        boxShadow: hoveredId === cat.id ? "0 0 15px rgba(16, 185, 129, 0.3)" : "0 0 0px transparent"
                      }}
                    />
                    <text
                      x={cat.x}
                      y={cat.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#0F172A"
                      className="text-[11px] font-black tracking-tight pointer-events-none"
                    >
                      {cat.title}
                    </text>

                      <AnimatePresence>
                        {hoveredId === cat.id && (
                          <motion.g
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            <rect
                              x={cat.x - 120}
                              y={cat.y + 40}
                              width="240"
                              height="80"
                              rx="8"
                              fill="#064e3b"
                              className="shadow-2xl"
                            />
                            <foreignObject x={cat.x - 110} y={cat.y + 50} width="220" height="60">
                              <p className="text-[10px] text-emerald-100 leading-relaxed font-medium">
                                {cat.tooltip}
                              </p>
                            </foreignObject>
                          </motion.g>
                        )}
                      </AnimatePresence>
                  </motion.g>
                ))}
              </svg>
            </div>
          )}

          {/* SUMMARY BLOCKS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* BLOCK 1: SUMMARY & DECISION */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredBlock('summary')}
              onMouseLeave={() => setHoveredBlock(null)}
              className="bg-white border-2 border-[#10B981] rounded-[2rem] p-8 shadow-xl relative group cursor-help"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[10px] font-black text-[#10B981] uppercase tracking-widest mb-2">Sektion IX</h4>
                  <h3 className="text-2xl font-black tracking-tighter text-slate-900">IX. Sammanfattning & Investeringsbeslut</h3>
                </div>
                <div 
                  className="px-6 py-2 rounded-full text-white font-black text-xs tracking-widest shadow-lg"
                  style={{ backgroundColor: decision.color }}
                >
                  {decision.label}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400">Totalpoäng</span>
                  <span className="text-4xl font-black text-slate-900">{totalScore} <span className="text-sm text-slate-300">/ 40</span></span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(totalScore / 40) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#10B981]"
                  />
                </div>
              </div>

              <AnimatePresence>
                {hoveredBlock === 'summary' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute -top-24 left-0 right-0 bg-emerald-950 text-white p-4 rounded-xl text-xs font-medium leading-relaxed shadow-2xl z-50"
                  >
                    Här sammanställs de 8 kategorierna till en totalpoäng (0–40). Analysen utmynnar i ett konkret investeringsutlåtande: Köp, Bevaka eller Avstå.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* BLOCK 2: SCENARIOS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => setHoveredBlock('scenarios')}
              onMouseLeave={() => setHoveredBlock(null)}
              className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-xl relative group cursor-help"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-slate-100" />
                <h4 className="text-[10px] font-black text-[#B5892A] uppercase tracking-widest">Sektion X</h4>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 text-center mb-8">X. Scenarier (Bull, Base & Bear Case)</h3>

              <div className="grid grid-cols-3 gap-4">
                {SCENARIOS.map(s => (
                  <div key={s.type} className="text-center">
                    <div 
                      className="text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{ color: s.color }}
                    >
                      {s.type}
                    </div>
                    <div className="text-lg font-black text-slate-900 tracking-tight">{s.price}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{s.probability} Sannolikhet</div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {hoveredBlock === 'scenarios' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute -top-24 left-0 right-0 bg-emerald-950 text-white p-4 rounded-xl text-xs font-medium leading-relaxed shadow-2xl z-50"
                  >
                    Vi räknar alltid på tre framtider. Genom att visualisera optimistiska och pessimistiska scenarier får du en realistisk bild av potential kontra risk.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SUB-COMPONENTS
 */
const MobileNode: React.FC<{ cat: Category }> = ({ cat }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-900 tracking-tight">{cat.title}</span>
        <span className="text-[10px] font-black text-[#10B981]">{cat.score}/5</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-[9px] text-slate-500 mt-2 font-medium leading-relaxed overflow-hidden"
          >
            {cat.tooltip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mindmap;
