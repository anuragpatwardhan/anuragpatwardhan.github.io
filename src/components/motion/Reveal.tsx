"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  once = true,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
