"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { StarIcon } from "@/components/ui/icons";

export function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Background sweeps in from the left as the section enters
  const { scrollYProgress: enter } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.25"],
  });
  const splitClip = useTransform(enter, [0, 1], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  // Background settles from a slight zoom while scrolling through
  const { scrollYProgress: through } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(through, [0, 1], [1.08, 1]);

  return (
    <section
      ref={sectionRef}
      id="mission-vision"
      aria-labelledby="mission-title"
      className="relative isolate overflow-hidden bg-ink pb-24 xl:pb-[160px] xl:pt-[255px]"
    >
      {/* ── Desktop background: split + arcs + globe (all in one image) ── */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { clipPath: splitClip }}
        className="pointer-events-none absolute inset-0 -z-10 hidden xl:block"
      >
        <motion.div style={reduce ? undefined : { scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/about/mission-bg.png"
            alt=""
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div className="container-site relative z-10 grid xl:grid-cols-2 xl:gap-x-[210px]">
        {/* ── Heading (mobile: on white) ── */}
        <div className="order-1 -mx-4 bg-white px-4 pt-20 md:-mx-8 md:px-8 xl:order-none xl:col-start-1 xl:row-start-1 xl:mx-0 xl:bg-transparent xl:px-0 xl:pt-0">
          <h2 id="mission-title" className="max-w-[620px] font-display text-h2 font-semibold text-ink">
            <TextReveal
              lines={["Creating Smarter Investment", "Decisions for a Stronger", "Future"]}
              inView
            />
          </h2>
        </div>

        {/* ── Mission (mobile: on white) ── */}
        <div className="order-2 -mx-4 bg-white px-4 pb-20 pt-12 md:-mx-8 md:px-8 xl:order-none xl:col-start-1 xl:row-start-2 xl:mx-0 xl:mt-[470px] xl:bg-transparent xl:px-0 xl:pb-0 xl:pt-0">
          <GlassCard tone="light" title="Our Mission" from={-40}>
            <p>
              To help individuals and businesses build, protect, and grow their wealth through strategic
              investment planning, structured opportunities, disciplined risk management, and long-term
              financial guidance.
            </p>
            <p>
              We aim to simplify complex investment decisions and provide solutions that are aligned with
              each client&apos;s goals, risk profile, and future ambitions.
            </p>
          </GlassCard>
        </div>

        {/* ── Vision (mobile: on dark) ── */}
        <div className="order-3 pt-16 xl:order-none xl:col-start-2 xl:row-start-2 xl:mt-[470px] xl:pt-0">
          <GlassCard tone="dark" title="Our Vision" from={40} delay={0.15}>
            <p>
              To become a trusted investment partner across the UAE, recognized for responsible
              investment thinking, long-term value creation, and a commitment to helping clients make
              informed financial decisions with confidence.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Glass card ───────────── */

type GlassCardProps = {
  tone: "light" | "dark";
  title: string;
  from: number;
  delay?: number;
  children: React.ReactNode;
};

function GlassCard({ tone, title, from, delay = 0, children }: GlassCardProps) {
  const light = tone === "light";

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: from, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay, ease: ease.out }}
      onMouseMove={handleMove}
      className={`group relative isolate flex min-h-[303px] flex-col justify-center overflow-hidden rounded-[24px] p-6 backdrop-blur-md transition-[translate,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1.5 ${
        light
          ? "hover:shadow-[0_24px_48px_-20px_rgb(16_86_70/0.4)]"
          : "border border-white/[0.05] hover:border-brand-light/25"
      }`}
    >
      {/* Frosted base */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-20 ${
          light
            ? "bg-[linear-gradient(180deg,rgb(188_217_200/0.85)_0%,rgb(200_225_212/0.8)_100%)]"
            : "bg-[linear-gradient(180deg,rgb(24_53_40/0.85)_0%,rgb(14_36_28/0.85)_100%)]"
        }`}
      />
      {/* Top glow */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          light
            ? "bg-[radial-gradient(45%_40%_at_35%_0%,rgb(236_245_190/0.9),transparent_70%)]"
            : "bg-[radial-gradient(45%_40%_at_50%_0%,rgb(150_135_60/0.35),transparent_70%)]"
        }`}
      />
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          light
            ? "bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgb(255_255_255/0.4),transparent_60%)]"
            : "bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.18),transparent_60%)]"
        }`}
      />

      <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
        <StarIcon className="size-4" />
      </span>

      <h3
        className={`mt-8 font-display text-[24px] font-medium xl:text-[26px] ${
          light ? "text-ink" : "text-primary"
        }`}
      >
        {title}
      </h3>
      <div
        className={`mt-4 space-y-5 text-[15px] leading-snug ${light ? "text-ink/85" : "text-primary/85"}`}
      >
        {children}
      </div>
    </motion.article>
  );
}