import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { METHODOLOGY_STEPS } from './data';

interface EngineNetworkProps {
  activeStage: number;
  scrollYProgress: MotionValue<number>;
}

const STEP_RANGE = 0.075;
const START_PROGRESS = 0.15;

const NetworkLine: React.FC<{ index: number; pos: { x: number; y: number }; scrollYProgress: MotionValue<number>; isSynthesizing: boolean }> = ({ index, pos, scrollYProgress, isSynthesizing }) => {
  const start = START_PROGRESS + index * STEP_RANGE;
  const end = START_PROGRESS + (index + 1) * STEP_RANGE;
  
  // Opacity curve: Fades in, stays at 1, fades out
  // We give it a little overlap padding for smoothness
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0, 1, 1, 0]
  );

  const isActive = useTransform(scrollYProgress, [start, end], [true, true]); // Simplified check

  return (
    <React.Fragment>
      <motion.line
        x1={0} y1={0} x2={pos.x} y2={pos.y}
        stroke="#60A5FA"
        strokeWidth={1.5}
        style={{ opacity: isSynthesizing ? 0 : opacity }}
        filter="url(#glow-line)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Active Beam Pulse */}
      <motion.line
        x1={0} y1={0} x2={pos.x} y2={pos.y}
        stroke="url(#beam-gradient)"
        strokeWidth="4"
        style={{ opacity: isSynthesizing ? 0 : opacity }}
        initial={{ strokeDasharray: "20, 100", strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: -100 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </React.Fragment>
  );
};

const NetworkNode: React.FC<{ index: number; pos: { x: number; y: number }; step: any; scrollYProgress: MotionValue<number>; isSynthesizing: boolean }> = ({ index, pos, step, scrollYProgress, isSynthesizing }) => {
  const start = START_PROGRESS + index * STEP_RANGE;
  const end = START_PROGRESS + (index + 1) * STEP_RANGE;
  
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress, 
    [start - 0.02, start + 0.01, end - 0.01, end + 0.02],
    [0.8, 1.2, 1.2, 0.8]
  );

  return (
    <motion.div
      animate={{
        x: isSynthesizing ? 0 : pos.x,
        y: isSynthesizing ? 0 : pos.y,
        opacity: isSynthesizing ? [null, 0] : 1, // Stay visible while collapsing then fade
        scale: isSynthesizing ? 0.2 : 1,
      }}
      style={{
        opacity: isSynthesizing ? 1 : opacity,
        scale: isSynthesizing ? 1 : scale,
        left: `calc(50% - 16px)`,
        top: `calc(50% - 16px)`,
      }}
      transition={{ duration: isSynthesizing ? 0.6 : 0.4, ease: "circIn" }}
      className="absolute z-20 flex flex-col items-center"
    >
      <div className="w-8 h-8 rounded-full border border-[#60A5FA] bg-[#07111A] flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.6)]">
        <span className="text-[10px] font-mono tracking-tighter text-[#60A5FA] font-black">
          {step.id}
        </span>
        <motion.div
          animate={{ scale: 1.4, opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-[#60A5FA]"
        />
      </div>
      
      <div className="absolute top-10 whitespace-nowrap text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] font-black text-white translate-y-1 drop-shadow-md">
        {step.title}
      </div>
    </motion.div>
  );
};

export const EngineNetwork: React.FC<EngineNetworkProps> = ({ activeStage, scrollYProgress }) => {
  const desktopNodes = [
    { x: -380, y: -240 }, // I
    { x: -480, y: -90 },  // II
    { x: -480, y: 90 },   // III
    { x: -380, y: 240 },  // IV
    { x: 380, y: -240 },  // V
    { x: 480, y: -90 },   // VI
    { x: 480, y: 90 },    // VII
    { x: 380, y: 240 },   // VIII
  ];

  const isSynthesizing = activeStage === 8;

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
            isSynthesizing={isSynthesizing} 
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
          isSynthesizing={isSynthesizing} 
        />
      ))}
    </div>
  );
};
