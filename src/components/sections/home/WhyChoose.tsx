"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { StarIcon } from "@/components/ui/icons";

const reasons = [
  {
    title: "UAE Market Understanding",
    description: "Deep knowledge of the UAE and GCC markets, with access to exclusive opportunities",
  },
  {
    title: "Strategic Investment Approach",
    description: "Data-driven strategies tailored to your financial goals",
  },
  {
    title: "Risk Aware Planning",
    description: "We prioritize capital protection with well structured, risk managed solutions",
  },
  {
    title: "Diversified Opportunities",
    description:
      "Access to a wide range of asset classes across real estate, business, and income generating investments",
  },
  {
    title: "Long Term Perspective",
    description: "Focused on sustainable growth and long term wealth creation",
  },
  {
    title: "Ongoing Advisory",
    description: "Continuous guidance and portfolio reviews to keep you ahead in a changing market",
  },
];

export function WhyChoose() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Feed the cursor position to every card so nearby borders light up too
  const handleGridMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden py-24 xl:pb-[140px] xl:pt-[230px]"
    >
      {/* Faint glow behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[60%] -z-10 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(16_86_70/0.25),transparent)]"
      />

      <div className="container-site">
        {/* ── Header ── */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <h2 id="why-title" className="font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["Why Choose", "Afaq Al Barakha"]} inView />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 text-base text-primary/90 md:text-lg md:leading-snug">
              We combine market insight, strategic thinking, and a long term perspective to create
              investment solutions that deliver real value. Our commitment is to your growth, security,
              and financial success
            </p>
          </Reveal>
        </div>

        {/* ── Cards ── */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMove}
          className="group/grid mx-auto mt-16 grid max-w-[1024px] gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[41px] xl:mt-[100px]"
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} {...reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Card ───────────── */

type CardProps = { title: string; description: string; index: number };

function ReasonCard({ title, description, index }: CardProps) {
  const reduce = useReducedMotion();

  // 3D tilt on hover
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  // Diagonal wave: top-left first, bottom-right last
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: (col + row) * 0.1, ease: ease.out }}
      style={{ transformPerspective: 1200 }}
    >
      <motion.article
        data-card
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative isolate flex h-full min-h-[256px] flex-col justify-center overflow-hidden rounded-[24px] p-6"
      >
        {/* Base gradient */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#183528_0%,#0e241c_100%)]"
        />
        {/* Olive glow at the top */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_0%,rgb(150_135_60/0.3),transparent_70%)]"
        />
        {/* Inner spotlight (hovered card only) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Resting border */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/[0.05]"
        />
        {/* Border glow (lights up across the whole grid) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.85),transparent_45%)] p-px opacity-0 transition-opacity duration-500 [mask-clip:content-box,border-box] [mask-composite:exclude] [mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] [-webkit-mask-composite:xor] group-hover/grid:opacity-100"
        />

        <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
          <StarIcon className="size-4" />
        </span>
        <h3 className="mt-10 font-display text-[22px] font-medium leading-[1.25] text-primary xl:text-[26px]">
          {title}
        </h3>
        <p className="mt-4 text-[15px] leading-snug text-primary/85">{description}</p>
      </motion.article>
    </motion.div>
  );
}