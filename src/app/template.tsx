"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: ease.out }}
    >
      {children}
    </motion.main>
  );
}