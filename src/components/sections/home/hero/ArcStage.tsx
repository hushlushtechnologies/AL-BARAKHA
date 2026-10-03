"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";

export function ArcStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress across Hero + Pillars combined
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.9, 0.3]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Shared arc */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: ease.out }}
          className="absolute left-1/2 top-[110px] w-[900px] max-w-none -translate-x-1/2 md:w-[1200px] lg:top-[160px] lg:w-[1500px]"
        >
          <motion.div style={reduce ? undefined : { rotate, scale, opacity }}>
            <Image
              src="/images/hero/arc.png"
              alt=""
              width={1500}
              height={1500}
              priority
              sizes="(min-width: 1024px) 1500px, (min-width: 768px) 1200px, 900px"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        {/* Breathing glow behind the hero headline */}
        <motion.div
          className="absolute left-1/2 top-[300px] size-[600px] -translate-x-1/2 rounded-full bg-brand-mid/20 blur-[140px]"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fade out at the bottom of Pillars */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-ink to-transparent" />
      </div>

      {children}
    </div>
  );
}