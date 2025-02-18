'use client';
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  // Start with undefined size so server and client render the same initially
  const [windowSize, setWindowSize] = useState<WindowSize | undefined>(
    undefined
  );

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleWindowSize(); 

    window.addEventListener('resize', handleWindowSize);

    return () => window.removeEventListener('resize', handleWindowSize);
  }, []);
  
  return windowSize ?? { width: 1920, height: 1200 }; 
}
