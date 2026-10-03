"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";

type Props = { word: string; className?: string };

export function BigWord({ word, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.4", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <motion.div style={reduce ? undefined : { x }} className="flex justify-center whitespace-nowrap">
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "40%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: ease.out }}
            className="inline-block bg-[linear-gradient(180deg,rgb(51_176_130/0.28),rgb(51_176_130/0.06))] bg-clip-text font-display text-[clamp(2.5rem,8.4vw,10.5rem)] font-bold uppercase leading-none text-transparent [font-stretch:75%]"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}