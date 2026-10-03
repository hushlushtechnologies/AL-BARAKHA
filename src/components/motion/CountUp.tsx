"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

    if (reduce) {
      el.textContent = format(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}