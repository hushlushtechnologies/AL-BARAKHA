"use client";

import { motion } from "motion/react";
import { stagger } from "@/lib/motion";

export function Stagger({ children, className, gap = 0.08 }: {
  children: React.ReactNode; className?: string; gap?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
// Children use: <motion.div variants={fadeUp}>…</motion.div>