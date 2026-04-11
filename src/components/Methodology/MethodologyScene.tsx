import React, { useEffect, useState } from "react";
import { MethodologyCore } from "./MethodologyCore";
import { MethodologyNode } from "./MethodologyNode";
import { methodologySteps } from "./MethodologyContent";
import { motion, AnimatePresence } from "framer-motion";

interface MethodologySceneProps {
  activeStepIndex: number; // -1 for none, 0-7 for individual steps, 8 for synthesis, 9+ for scenarios
  isSynthesis: boolean;
  isScenario: boolean;
}

export const MethodologyScene: React.FC<MethodologySceneProps> = ({ 
  activeStepIndex, 
  isSynthesis, 
  isScenario 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Define node positions (percentage-based)
  // Left side: Steps I, II, III, IV
  // Right side: Steps V, VI, VII, VIII
  // Adjust X-offset for mobile to "scale down" the network towards the center
  const xOffset = isMobile ? 15 : 25;
  const nodePositions = [
    { x: 50 - xOffset, y: 25 }, { x: 50 - xOffset - 5, y: 40 }, { x: 50 - xOffset - 5, y: 60 }, { x: 50 - xOffset, y: 75 },
    { x: 50 + xOffset, y: 25 }, { x: 50 + xOffset + 5, y: 40 }, { x: 50 + xOffset + 5, y: 60 }, { x: 50 + xOffset, y: 75 }
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* SVG Connections Container */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodePositions.map((pos, index) => {
          const isActive = activeStepIndex === index;
          const isFaded = activeStepIndex !== -1 && activeStepIndex !== index && !isSynthesis;
          
          return (
            <motion.line
              key={`line-${index}`}
              x1="50" y1="50"
              x2={pos.x} y2={pos.y}
              stroke="currentColor"
              strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isScenario ? 0 : 1, 
                opacity: isScenario ? 0 : (isActive ? 0.8 : (isFaded ? 0.05 : 0.2)),
                color: isActive ? "var(--primary)" : "var(--border)"
              }}
              transition={{ duration: 1 }}
              className={isActive ? "text-primary" : "text-border"}
            />
          );
        })}
      </svg>

      {/* Central Core */}
      <MethodologyCore 
        id="methodology-core" 
        active={activeStepIndex >= 0 || isSynthesis} 
      />

      {/* Nodes */}
      {!isSynthesis && !isScenario && nodePositions.map((pos, index) => (
        <MethodologyNode
          key={methodologySteps[index].id}
          id={methodologySteps[index].id}
          number={methodologySteps[index].number}
          title={methodologySteps[index].title}
          active={activeStepIndex === index}
          position={pos}
        />
      ))}

      {/* Background Pulse for Active Step */}
      <AnimatePresence>
        {activeStepIndex >= 0 && activeStepIndex < 8 && !isSynthesis && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            key={`pulse-${activeStepIndex}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          >
            <div 
              className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
              style={{ 
                left: `${nodePositions[activeStepIndex].x}%`, 
                top: `${nodePositions[activeStepIndex].y}%` 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
