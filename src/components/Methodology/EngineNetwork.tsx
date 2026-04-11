import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { METHODOLOGY_STEPS } from './data';

interface EngineNetworkProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

export const EngineNetwork: React.FC<EngineNetworkProps> = ({ activeStage }) => {
  // Desktop positions for the 8 nodes relative to center
  const desktopNodes = [
    { x: -350, y: -220 }, // I
    { x: -450, y: -80 },  // II
    { x: -450, y: 80 },   // III
    { x: -350, y: 220 },  // IV
    { x: 350, y: -220 },  // V
    { x: 450, y: -80 },   // VI
    { x: 450, y: 80 },    // VII
    { x: 350, y: 220 },   // VIII
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {/* SVG Canvas for lines */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ left: '50%', top: '50%' }}>
        <defs>
          <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {desktopNodes.map((pos, i) => {
          const isActive = activeStage === i;
          return (
            <motion.line
              key={`line-${i}`}
              x1={0}
              y1={0}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? '#60A5FA' : '#1E293B'}
              strokeWidth={isActive ? 2 : 1.5}
              filter={isActive ? 'url(#glow-line)' : ''}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: activeStage >= 0 ? 1 : 0, 
                opacity: activeStage >= 0 ? (isActive ? 1 : 0.3) : 0 
              }}
              transition={{ duration: 1 }}
            />
          );
        })}

        {/* Small energy pulse for active line */}
        {activeStage >= 0 && activeStage <= 7 && (
          <motion.circle
            r="3"
            fill="#C8A96B"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              cx: [0, desktopNodes[activeStage].x],
              cy: [0, desktopNodes[activeStage].y]
            }}
            transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            style={{ filter: "drop-shadow(0 0 5px rgba(200, 169, 107, 0.8))" }}
          />
        )}
      </svg>

      {/* Nodes */}
      {METHODOLOGY_STEPS.map((step, i) => {
        const pos = desktopNodes[i];
        const isActive = activeStage === i;
        const isPassed = activeStage > i;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: activeStage >= 0 ? (isActive ? 1 : 0.4) : 0,
              scale: isActive ? 1.15 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 flex flex-col items-center"
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              margin: '-16px 0 0 -16px' // 16px is half of w-8 h-8
            }}
          >
            {/* The Node dot */}
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isActive 
                ? 'border-[#60A5FA] bg-[#60A5FA]/10 shadow-[0_0_20px_rgba(96,165,250,0.4)]' 
                : isPassed
                  ? 'border-[#C8A96B]/30 bg-[#C8A96B]/5'
                  : 'border-[#1E293B] bg-[#07111A]'
            }`}>
              <span className={`text-[10px] font-black ${isActive ? 'text-[#60A5FA]' : 'text-[#E5E7EB]/40'}`}>
                {step.id}
              </span>
            </div>
            
            {/* Title below node */}
            <div className={`absolute top-10 whitespace-nowrap text-[10px] uppercase tracking-[0.1em] font-medium transition-colors duration-500 ${
              isActive ? 'text-[#E5E7EB] drop-shadow-md' : 'text-[#E5E7EB]/30'
            }`}>
              {step.title}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
