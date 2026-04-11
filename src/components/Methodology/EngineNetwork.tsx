import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { METHODOLOGY_STEPS } from './data';

interface EngineNetworkProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

const STEP_RANGE = 0.08; 
const START_PROGRESS = 0.05; // Start earlier to prevent skipping I and II

const NetworkLine: React.FC<{ index: number; pos: { x: number; y: number }; scrollYProgress: MotionValue<number>; isSynthesizing: boolean; activeStage: number }> = ({ index, pos, scrollYProgress, isSynthesizing, activeStage }) => {
  const start = START_PROGRESS + index * STEP_RANGE;
  const end = START_PROGRESS + (index + 1) * STEP_RANGE;
  
  const isSpecial = index >= 8;
  const baseColor = isSpecial ? '#C8A96B' : '#60A5FA';

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0, 1, 1, 0]
  );

  const shouldCollapse = activeStage > index || (isSynthesizing && index < 8);

  return (
    <React.Fragment>
      <motion.line
        x1={0} y1={0} 
        animate={{ 
          x2: shouldCollapse ? 0 : pos.x, 
          y2: shouldCollapse ? 0 : pos.y,
          opacity: shouldCollapse ? 0 : 1
        }}
        stroke={baseColor}
        strokeWidth={2}
        style={{ opacity: isSynthesizing ? 0 : opacity }}
        filter="url(#glow-line)"
      />
      
      {/* Active Beam Pulse */}
      {!shouldCollapse && (
        <motion.line
          x1={0} y1={0} x2={pos.x} y2={pos.y}
          stroke={isSpecial ? "rgba(200, 169, 107, 0.5)" : "url(#beam-gradient)"}
          strokeWidth="6"
          style={{ opacity: isSynthesizing ? 0 : opacity }}
          initial={{ strokeDasharray: "20, 100", strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </React.Fragment>
  );
};

const NetworkNode: React.FC<{ index: number; pos: { x: number; y: number }; step: any; scrollYProgress: MotionValue<number>; isSynthesizing: boolean; activeStage: number }> = ({ index, pos, step, scrollYProgress, isSynthesizing, activeStage }) => {
  const start = START_PROGRESS + index * STEP_RANGE;
  const end = START_PROGRESS + (index + 1) * STEP_RANGE;
  
  const isSpecial = index >= 8;
  const baseColor = isSpecial ? '#C8A96B' : '#60A5FA';

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress, 
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0.7, 1.3, 1.3, 0.7]
  );

  const shouldCollapse = activeStage > index || (isSynthesizing && index < 8);

  return (
    <motion.div
      animate={{
        x: shouldCollapse ? 0 : pos.x,
        y: shouldCollapse ? 0 : pos.y,
        opacity: shouldCollapse ? [null, 0] : 1,
        scale: shouldCollapse ? 0.1 : 1,
      }}
      style={{
        opacity: isSynthesizing ? 0 : opacity,
        scale: isSynthesizing ? 0 : scale,
        left: `calc(50% - 24px)`,
        top: `calc(50% - 24px)`,
      }}
      transition={{ duration: shouldCollapse ? 0.6 : 0.4, ease: "circIn" }}
      className="absolute z-50 flex flex-col items-center"
    >
      {/* 100% SOLID IRONCLAD BUBBLE */}
      <div className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-[0_0_60px_#000] transition-colors duration-500"
           style={{ 
             borderColor: baseColor, 
             backgroundColor: '#000000', // PURE BLACK
             opacity: 1 
           }}>
        <span className="text-[16px] font-mono tracking-tighter font-black z-10" style={{ color: baseColor }}>
          {step.id}
        </span>
        
        {/* Glow - ONLY OUTSIDE */}
        <div className="absolute -inset-4 rounded-full blur-2xl opacity-40 pointer-events-none" 
             style={{ backgroundColor: baseColor }} />

        <motion.div
          animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: baseColor }}
        />
      </div>
      
      <div className="absolute top-14 whitespace-nowrap text-[12px] md:text-[14px] font-mono uppercase tracking-[0.3em] font-black text-white translate-y-1"
           style={{ textShadow: '2px 2px 4px #000, -2px -2px 4px #000, 0 0 10px #000' }}>
        {step.title}
      </div>
    </motion.div>
  );
};

export const EngineNetwork: React.FC<EngineNetworkProps> = ({ activeStage, scrollYProgress }) => {
  const desktopNodes = [
    { x: -350, y: -320 }, // I
    { x: -480, y: -160 }, // II
    { x: -540, y: 0 },    // III
    { x: -480, y: 160 },  // IV
    { x: -350, y: 320 },  // V
    { x: 350, y: -320 },  // VI
    { x: 480, y: -160 },  // VII
    { x: 540, y: 0 },     // VIII
    { x: 480, y: 160 },   // IX (Special: Gold)
    { x: 350, y: 320 },   // X (Special: Gold)
  ];

  const isSynthesizing = activeStage === 8 || activeStage === 9; // During verdict and scenarios we can collapse earlier parts

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block overflow-visible">
      <div className="opacity-[0.05] absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <svg className="absolute inset-0 w-full h-full overflow-visible z-10" style={{ left: '50%', top: '50%' }}>
        <defs>
          <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {desktopNodes.map((pos, i) => (
          <NetworkLine 
            key={`line-${i}`} 
            index={i} 
            pos={pos} 
            scrollYProgress={scrollYProgress} 
            isSynthesizing={false} // We handle collapse via local activeStage logic
            activeStage={activeStage}
          />
        ))}
      </svg>

      {METHODOLOGY_STEPS.map((step, i) => (
        <NetworkNode 
          key={step.id} 
          index={i} 
          pos={desktopNodes[i]} 
          step={step} 
          scrollYProgress={scrollYProgress} 
          isSynthesizing={false} 
          activeStage={activeStage}
        />
      ))}
    </div>
  );
};
