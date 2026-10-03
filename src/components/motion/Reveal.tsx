"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({ children, variants = fadeUp, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}