import React from "react";
import { motion } from "framer-motion";

interface MethodologyNodeProps {
  id: string;
  number: string;
  title: string;
  active: boolean;
  position: { x: number; y: number };
}

export const MethodologyNode: React.FC<MethodologyNodeProps> = ({ 
  id, 
  number, 
  title, 
  active, 
  position 
}) => {
  return (
    <div 
      id={id}
      className={`absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl border-2 flex flex-col items-center justify-center min-w-[140px] text-center backdrop-blur-md z-20 ${
        active 
          ? "bg-primary/20 border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] scale-110" 
          : "bg-background/40 border-border/50 opacity-40 scale-95"
      }`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span className={`text-[10px] font-black font-mono tracking-widest mb-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
        STEG {number}
      </span>
      <span className={`text-xs font-bold uppercase tracking-tighter leading-none max-w-[120px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {title}
      </span>
      
      {/* Node connectivity point */}
      <div className={`absolute w-2 h-2 rounded-full -bottom-1 left-1/2 -translate-x-1/2 transition-colors duration-500 ${active ? "bg-primary" : "bg-border"}`} />
    </div>
  );
};
