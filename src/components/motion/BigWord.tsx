 "use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";

type Props = { word: string; className?: string };

export function BigWord({ word, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const tablet = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.4", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const words = word.split(" ");
  let index = 0; // running letter count, for a continuous stagger across words

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <motion.div
        // Sideways drift only where the word fits on one line
        style={!reduce && tablet ? { x } : undefined}
        className="flex flex-wrap justify-center gap-x-[0.25em] font-display text-[clamp(2.75rem,14vw,4.5rem)] font-bold uppercase leading-[0.95] [font-stretch:75%] md:flex-nowrap md:text-[clamp(4rem,8.4vw,10.5rem)] md:leading-none"
      >
        {words.map((w, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap">
            {w.split("").map((char) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  initial={{ y: "40%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: ease.out }}
                  className="inline-block bg-[linear-gradient(180deg,rgb(51_176_130/0.28),rgb(51_176_130/0.06))] bg-clip-text text-transparent"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.div>
    </div>
  );
}