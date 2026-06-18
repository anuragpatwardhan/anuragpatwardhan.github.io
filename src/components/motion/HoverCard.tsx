"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
