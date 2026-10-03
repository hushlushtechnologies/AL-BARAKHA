"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { StarIcon } from "@/components/ui/icons";

type Opportunity = { title: string; description: string };

const lightCards: Opportunity[] = [
  {
    title: "Income-Generating Assets",
    description: "Build reliable income streams through high quality revenue generating assets",
  },
  {
    title: "Growth Opportunities",
    description: "Invest in high potential sectors and ventures that drive sustainable, long term growth",
  },
];

const darkCards: Opportunity[] = [
  {
    title: "Real Estate Investment",
    description:
      "Access prime Real Estate opportunities across the UAE with strong growth potential and long term value",
  },
  {
    title: "Business Investment",
    description: "Invest in established and emerging businesses across key sectors of the UAE economy",
  },
  {
    title: "Structured Investment",
    description: "Tailored investment structures designed for stability and capital protection",
  },
];
 export function Opportunities() {
  const sectionRef = useRef<HTMLElement>(null);
  const suitRef = useRef<HTMLDivElement>(null);
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

  // Suit parallax
  const { scrollYProgress: suitProgress } = useScroll({
    target: suitRef,
    offset: ["start end", "end start"],
  });
  const suitY = useTransform(suitProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      id="opportunities"
      aria-labelledby="opportunities-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink pb-24 xl:pb-[118px] xl:pt-[126px]"
    >
      {/* ── Desktop background: split + arcs in one image ── */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { clipPath: splitClip }}
        className="pointer-events-none absolute inset-0 -z-10 hidden xl:block"
      >
        <motion.div style={reduce ? undefined : { scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/opportunities/bg.png"
            alt=""
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div className="container-site relative grid xl:grid-cols-[314px_1fr_314px]">
        {/* ── Heading (mobile: first, on white) ── */}
        <div className="order-1 -mx-4 bg-white px-4 pt-20 md:-mx-8 md:px-8 xl:order-none xl:col-span-2 xl:col-start-1 xl:row-start-2 xl:mx-0 xl:bg-transparent xl:px-0 xl:pt-0">
          <h2
            id="opportunities-title"
            className="max-w-[600px] font-display text-h2 font-semibold text-ink"
          >
            <TextReveal
              lines={["Opportunities Built for", "Growth, Income, and Long", "Term Value"]}
              inView
            />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-[600px] text-base text-ink/90 md:text-lg md:leading-snug">
              Curated investment opportunities for individuals and businesses across the UAE. Designed
              to build wealth today and create a more secure tomorrow
            </p>
          </Reveal>
        </div>

        {/* ── Light cards ── */}
        <div className="order-2 -mx-4 grid gap-6 bg-white px-4 pb-20 pt-12 sm:grid-cols-2 md:-mx-8 md:px-8 xl:order-none xl:col-start-1 xl:row-start-1 xl:mx-0 xl:mt-[111px] xl:grid-cols-1 xl:content-start xl:bg-transparent xl:px-0 xl:pb-0 xl:pt-0">
          {lightCards.map((card, i) => (
            <OpportunityCard key={card.title} {...card} tone="light" index={i} />
          ))}
        </div>

        {/* ── Suit ── */}
        <div
          ref={suitRef}
          className="order-3 flex justify-center py-16 xl:order-none xl:col-start-2 xl:row-start-1 xl:items-start xl:py-0 xl:pt-[74px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: ease.out }}
            className="w-[280px] sm:w-[340px] xl:w-[410px]"
          >
            <motion.div style={reduce ? undefined : { y: suitY }}>
              <Image
                src="/images/opportunities/suit.png"
                alt="Tailored suit, half black and half white, on a mannequin"
                width={820}
                height={1230}
                sizes="(min-width: 1280px) 410px, 340px"
                className="h-auto w-full drop-shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Dark cards ── */}
        <div className="order-4 grid gap-6 sm:grid-cols-2 xl:order-none xl:col-start-3 xl:row-start-1 xl:grid-cols-1 xl:gap-[41px]">
          {darkCards.map((card, i) => (
            <OpportunityCard key={card.title} {...card} tone="dark" index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Card ───────────── */

type CardProps = Opportunity & { tone: "light" | "dark"; index: number };

function OpportunityCard({ title, description, tone, index }: CardProps) {
  const light = tone === "light";

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: light ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay: index * 0.12, ease: ease.out }}
      onMouseMove={handleMove}
      className={`group relative isolate flex min-h-[256px] flex-col overflow-hidden rounded-[24px] p-6 transition-[translate,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1.5 ${
        light
          ? "hover:shadow-[0_24px_48px_-20px_rgb(16_86_70/0.4)]"
          : "border border-white/[0.05] hover:border-brand-light/25"
      }`}
    >
      {/* Base gradient */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-20 ${
          light
            ? "bg-[linear-gradient(180deg,#bcd9c8_0%,#cfe4d7_100%)]"
            : "bg-[linear-gradient(180deg,#183528_0%,#0e241c_100%)]"
        }`}
      />
      {/* Top glow */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          light
            ? "bg-[radial-gradient(60%_45%_at_55%_0%,rgb(236_245_190/0.9),transparent_70%)]"
            : "bg-[radial-gradient(70%_45%_at_50%_0%,rgb(150_135_60/0.3),transparent_70%)]"
        }`}
      />
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          light
            ? "bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(255_255_255/0.4),transparent_60%)]"
            : "bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.18),transparent_60%)]"
        }`}
      />

      <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
        <StarIcon className="size-4" />
      </span>

      <h3
        className={`mt-10 font-display text-[22px] font-medium leading-[1.25] xl:text-[26px] ${
          light ? "text-ink" : "text-primary"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-4 text-[15px] leading-snug ${light ? "text-ink/85" : "text-primary/85"}`}>
        {description}
      </p>
    </motion.article>
  );
}