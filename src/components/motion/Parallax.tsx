"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function Parallax({ children, offset = 80, className }: {
  children: React.ReactNode; offset?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}