import React from 'react';
import { motion } from 'framer-motion';

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35 } },
};

export default function MotionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }){
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
