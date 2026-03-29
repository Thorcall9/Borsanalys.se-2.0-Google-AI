import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay + 30);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'none' : 'translateY(8px)', 
        transition: 'all 0.35s ease' 
      }}
    >
      {children}
    </div>
  );
}
