import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const AnimatedCount = ({
  value,
  padding = 2,
  duration = 0.8,
}: {
  value: number;
  padding?: number;
  duration?: number;
}) => {
  const displayValues = value.toString().padStart(padding, '0').split('');

  return (
    <AnimatePresence>
      {displayValues.map((n, i) => (
        <motion.span
          key={i}
          className="inline-block tabular-nums"
          initial={{
            y: 12,
            filter: 'blur(12px)',
            opacity: 0,
          }}
          animate={{
            y: 0,
            filter: 'blur(0px)',
            opacity: 1,
          }}
          exit={{
            y: -12,
            filter: 'blur(12px)',
            opacity: 0,
          }}
          transition={{ type: 'spring', bounce: 0.35, duration: duration }}
        >
          {n}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};

export default AnimatedCount;
