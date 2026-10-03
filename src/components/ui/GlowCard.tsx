"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ease } from "@/lib/motion";
import { StarIcon } from "@/components/ui/icons";

/* Grid wrapper: feeds the cursor position to every card so nearby borders light up */
export function GlowGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    ref.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={`group/grid ${className}`}>
      {children}
    </div>
  );
}

/* Card: 3D entrance, hover tilt, inner spotlight, shared border glow */
type GlowCardProps = {
  title: string;
  description: string;
  delay?: number;
  className?: string;
};

export function GlowCard({ title, description, delay = 0, className = "" }: GlowCardProps) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: ease.out }}
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      <motion.article
        data-card
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative isolate flex h-full min-h-[256px] flex-col justify-center overflow-hidden rounded-[24px] p-6"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#183528_0%,#0e241c_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_0%,rgb(150_135_60/0.3),transparent_70%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/[0.05]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.85),transparent_45%)] p-px opacity-0 transition-opacity duration-500 [mask-clip:content-box,border-box] [mask-composite:exclude] [mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] [-webkit-mask-composite:xor] group-hover/grid:opacity-100"
        />

        <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
          <StarIcon className="size-4" />
        </span>
        <h3 className="mt-8 font-display text-[22px] font-medium leading-[1.25] text-primary xl:text-[26px]">
          {title}
        </h3>
        <p className="mt-4 text-[15px] leading-snug text-primary/85">{description}</p>
      </motion.article>
    </motion.div>
  );
}