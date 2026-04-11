import React from "react";
import { motion } from "framer-motion";
import { verdictData } from "./MethodologyContent";

interface MethodologyVerdictProps {
  id: string;
  visible: boolean;
}

export const MethodologyVerdict: React.FC<MethodologyVerdictProps> = ({ id, visible }) => {
  return (
    <div 
      id={id}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center transition-all duration-1000 ${
        visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-xl pointer-events-none"
      }`}
    >
      <div className="bg-card/40 border border-primary/30 backdrop-blur-3xl p-16 rounded-[4rem] shadow-[0_0_100px_rgba(var(--primary-rgb),0.1)] max-w-2xl mx-auto border-t-primary/50 border-l-primary/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-3 bg-primary text-primary-foreground rounded-full text-xs font-black tracking-[0.4em] uppercase shadow-2xl shadow-primary/30">
          Resultat
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-primary">
              {verdictData.title}
            </h4>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
          </div>

          <div className="space-y-2">
            <motion.div 
              animate={visible ? { y: [10, 0], opacity: [0, 1] } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-primary drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
            >
              {verdictData.status.split(": ")[1]}
            </motion.div>
            <div className="text-sm font-black uppercase tracking-[0.3em] opacity-40">
              {verdictData.status.split(": ")[0]}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5">
            <div className="space-y-2">
              <div className="text-4xl font-black tracking-tighter">{verdictData.score}</div>
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground opacity-60">
                Poäng
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black tracking-tighter text-primary">80%</div>
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground opacity-60">
                Data Precision
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
