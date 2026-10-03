import type { Variants, Transition } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1],      // premium "expo-out" feel
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const t = (duration = 0.8, delay = 0): Transition => ({
  duration,
  delay,
  ease: ease.out,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: t() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t(1) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: t(1) },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});