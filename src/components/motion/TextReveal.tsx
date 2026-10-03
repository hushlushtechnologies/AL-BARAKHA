 "use client";

import { motion, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

type Props = {
  lines: string[];
  delay?: number;
  stagger?: number;
  inView?: boolean;
  className?: string;
};

const word: Variants = {
  hidden: { y: "110%" },
  show: (d: number) => ({
    y: 0,
    transition: { duration: 1, delay: d, ease: ease.out },
  }),
};

export function TextReveal({ lines, delay = 0, stagger = 0.07, inView = false, className }: Props) {
  let index = 0;

  // Observe the whole block (never clipped), not individual words
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.5 } }
    : { animate: "show" };

  return (
    <motion.span className={`block ${className ?? ""}`} initial="hidden" {...trigger}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((w, wi) => {
              const d = delay + index++ * stagger;
              return (
                <span
                  key={wi}
                  className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <motion.span className="inline-block" variants={word} custom={d}>
                    {w}
                    {wi < words.length - 1 && "\u00A0"}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
}