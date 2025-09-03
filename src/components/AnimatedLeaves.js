"use client";
import { motion } from "framer-motion";

const LeafIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>
);

export const FloatingLeaves = () => {
  const leaves = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf}
          className="absolute text-green-200/20"
          initial={{
            x: -100,
            y:
              typeof window !== "undefined"
                ? Math.random() * window.innerHeight
                : 0,
            rotate: 0,
          }}
          animate={{
            x: typeof window !== "undefined" ? window.innerWidth + 100 : 1000,
            y:
              typeof window !== "undefined"
                ? Math.random() * window.innerHeight
                : 500,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          <LeafIcon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
};

export const HoverLeaf = ({ children, className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
    <motion.div
      className="absolute -top-2 -right-2 text-green-400/60"
      initial={{ rotate: 0, scale: 0 }}
      whileHover={{ rotate: 15, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <LeafIcon className="w-4 h-4" />
    </motion.div>
  </motion.div>
);
