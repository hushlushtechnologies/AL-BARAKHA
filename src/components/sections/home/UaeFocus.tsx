"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease, fadeUp } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CountUp } from "@/components/motion/CountUp";
import { StarIcon } from "@/components/ui/icons";

/* ───────────── Data ───────────── */

type Stat =
  | { kind: "number"; value: number; suffix: string; label: string }
  | { kind: "word"; word: string; label: string };

const stats: Stat[] = [
  { kind: "number", value: 3, suffix: "", label: "Key Emirate Markets" },
  { kind: "number", value: 50, suffix: "+", label: "Strategic Locations" },
  { kind: "number", value: 10, suffix: "+", label: "High Growth Sectors" },
  { kind: "word", word: "Stronger", label: "A More Prosperous UAE" },
];

const emirates = [
  {
    name: "Sharjah",
    tagline: "Emerging Markets. Culture. New Opportunities.",
    image: "/images/uae/sharjah.png",
    alt: "Sharjah skyline and waterfront at dusk",
  },
  {
    name: "Abu Dhabi",
    tagline: "Stability. Sustainability. Long Term Growth.",
    image: "/images/uae/abu-dhabi.png",
    alt: "Sheikh Zayed Grand Mosque in Abu Dhabi",
  },
  {
    name: "Dubai",
    tagline: "Innovation. Business. Global Opportunities.",
    image: "/images/uae/dubai.png",
    alt: "Burj Al Arab on the Dubai coastline",
  },
];

/* Panel shapes (same point count so Motion can morph between them) */
const HIDDEN = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
const SLANT = "polygon(0% 0%, 100% 0%, 78% 100%, 0% 100%)";
const STRAIGHT = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/* ───────────── Section ───────────── */

export function UaeFocus() {
  return (
    <section
      id="uae-focus"
      aria-labelledby="uae-title"
      className="relative isolate overflow-hidden py-24 xl:pb-[170px] xl:pt-[230px]"
    >
      {/* Faint glow behind the stats */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(16_86_70/0.2),transparent)]"
      />

      <div className="container-site">
        {/* ── Header ── */}
        <div className="mx-auto flex max-w-[740px] flex-col items-center text-center">
          <h2 id="uae-title" className="font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["UAE Wide", "Investment Focus"]} inView />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 text-base text-primary/90 md:text-lg md:leading-snug">
              From established markets to emerging opportunities, Afaq Al Barakha Investment focuses on
              high potential sectors across the UAE, connecting investors with long term value
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/#opportunities" className="btn-primary px-6 py-3">
              Explore Opportunities
            </Link>
            <Link href="/enquiry" className="btn-outline px-6 py-3">
              Book a Consultation
            </Link>
          </Reveal>
        </div>

        {/* ── Stats ── */}
        <Stagger
          gap={0.12}
          className="mx-auto mt-16 grid max-w-[1036px] grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 xl:mt-[100px]"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex flex-col items-center text-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow shadow-[0_0_24px_-4px_rgb(35_226_155/0.4)]">
                <StarIcon className="size-4" />
              </span>
              <p className="mt-8 font-display text-[36px] font-medium leading-none text-brand-light md:text-[44px]">
                {stat.kind === "number" ? (
                  <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
                ) : (
                  <TextReveal lines={[stat.word]} inView delay={0.3} />
                )}
              </p>
              <p className="mt-6 max-w-[140px] text-base leading-snug text-primary">{stat.label}</p>
            </motion.div>
          ))}
        </Stagger>

        {/* ── Emirates ── */}
        <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8 xl:ml-auto xl:mt-[145px] xl:max-w-[1130px] xl:gap-[34px]">
          {emirates.map((emirate, i) => (
            <EmirateCard key={emirate.name} {...emirate} index={i} slanted={i < emirates.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Emirate card ───────────── */

type EmirateProps = (typeof emirates)[number] & { index: number; slanted: boolean };

 

function EmirateCard({ name, tagline, image, alt, index, slanted }: EmirateProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  const delay = index * 0.2;

  return (
    // The article is never clipped, so it reliably detects visibility
    // and drives every child animation through variants
    <motion.article
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="group relative h-[200px] md:h-[167px]"
    >
      {/* Image panel: wipes open into its slanted shape */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: HIDDEN },
          show: {
            clipPath: slanted ? SLANT : STRAIGHT,
            transition: { duration: 1.2, delay, ease: ease.inOut },
          },
        }}
      >
        {/* Left fade into the dark background */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_45%)]">
          {/* Zoom-out on reveal */}
          <motion.div
            className="absolute inset-0"
            variants={{
              hidden: { scale: 1.3 },
              show: { scale: 1, transition: { duration: 1.6, delay, ease: ease.out } },
            }}
          >
            {/* Sideways drift on scroll */}
            <motion.div
              style={reduce ? { scale: 1.15 } : { x: drift, scale: 1.15 }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          show: { opacity: 1, x: 0, transition: { duration: 0.9, delay: delay + 0.5, ease: ease.out } },
        }}
        className="relative z-10 flex h-full flex-col justify-center pl-4 md:pl-0"
      >
        <h3 className="font-display text-[22px] font-medium uppercase tracking-wide text-primary xl:text-[24px]">
          {name}
        </h3>
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-0 bg-brand-light transition-[width] duration-500 ease-premium group-hover:w-16"
        />
        <p className="mt-3 max-w-[260px] text-[15px] leading-snug text-primary/90 xl:text-base">{tagline}</p>
      </motion.div>
    </motion.article>
  );
}