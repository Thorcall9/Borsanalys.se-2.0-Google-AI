import React from "react";
import { motion } from "framer-motion";

interface MethodologyCoreProps {
  id: string;
  active: boolean;
  pulseScale?: number;
}

export const MethodologyCore: React.FC<MethodologyCoreProps> = ({ id, active, pulseScale = 1 }) => {
  return (
    <div 
      id={id}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer pulse rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[300px] h-[300px] border border-primary/20 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full"
        />

        {/* Central Engine Core */}
        <div className={`relative w-48 h-48 rounded-full bg-background border-4 transition-all duration-1000 flex flex-col items-center justify-center overflow-hidden shadow-2xl ${
          active ? "border-primary shadow-[0_0_60px_rgba(var(--primary-rgb),0.2)]" : "border-border/50 shadow-black/40"
        }`}>
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          
          {/* Animated lines/circuitry (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
            <motion.path
              d="M100,20 L100,50 M100,150 L100,180 M20,100 L50,100 M150,100 L180,100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary"
            />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary/30" />
          </svg>

          <div className="z-10 text-center">
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Engine</span>
            <span className="block text-2xl font-black tracking-tighter leading-none">2.0</span>
          </div>

          <div className="absolute bottom-6 z-10">
            <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">börsanalys.se</span>
          </div>
        </div>
      </div>
    </div>
  );
};
