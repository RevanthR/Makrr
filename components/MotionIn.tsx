"use client";

import { Children } from "react";
import { motion } from "framer-motion";

const variants = {
  up: {
    hidden: { opacity: 0, y: 52 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const spring = { type: "spring", stiffness: 200, damping: 26 };
const smooth = { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] };

type MotionInProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "scale" | "fade";
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
};

export function MotionIn({
  children,
  className = "",
  variant = "up",
  stagger = 0,
  delay = 0,
  amount = 0.06,
  once = true,
}: MotionInProps) {
  const v = variants[variant];
  const useStagger = stagger > 0;

  const transitionUp = variant === "up" ? { ...smooth, delay } : { ...spring, delay };

  if (useStagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={{
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {Children.map(children, (child) => (
          <motion.div
            variants={v}
            transition={variant === "up" ? smooth : spring}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={v}
      transition={transitionUp}
    >
      {children}
    </motion.div>
  );
}
