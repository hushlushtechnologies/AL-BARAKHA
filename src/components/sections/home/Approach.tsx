 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ease, fadeUp } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { AwardIcon, StarIcon } from "@/components/ui/icons";

/* ───────────── Data ───────────── */

const steps = [
  {
    title: "Understand",
    description: "Learn the client's goals, priorities and investment expectations",
  },
  {
    title: "Assess",
    description: "Review opportunities, risks, market conditions and financial positions",
  },
  {
    title: "Strategize",
    description: "Build a tailored investment approach aligned with long term objectives",
  },
  {
    title: "Monitor",
    description: "Track performance, adapt to market changes and guide ongoing decisions",
  },
];

const principles = [
  { title: "Disciplined Process", subtitle: "Structured. Measurable. Purposeful." },
  { title: "Risk Aware Decisions", subtitle: "Protecting today. Building tomorrow." },
  { title: "Tailored Strategy", subtitle: "Personalized to your unique goals" },
  { title: "Long Term Focus", subtitle: "Creating sustainable value" },
];

/*
  Timeline geometry in container coordinates (1280 × 520 at xl).
  The path extends past both container edges so it spans the full screen.
  Each node is an exact point on the path.
*/
const NODES = [
  { x: 10, y: 347 },
  { x: 360, y: 347 },
  { x: 738, y: 336 },
  { x: 1028, y: 155 },
];

const PATH =
  "M -700 640 C -450 560, -180 420, 10 347 C 100 322, 190 318, 260 322 C 300 325, 330 340, 360 347 C 420 360, 480 362, 560 358 C 640 354, 700 344, 738 336 C 820 316, 880 290, 940 230 C 980 190, 1005 168, 1028 155 C 1060 132, 1095 108, 1140 88 C 1220 52, 1290 40, 1350 44 C 1420 50, 1470 52, 1540 48 C 1620 44, 1800 30, 2000 10";

/* ───────────── Section ───────────── */

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const totalRef = useRef(0);

  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1280px)");

  const [fractions, setFractions] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const activeCount = reduce ? steps.length : active;

  // Arc rotation across the section
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const arcRotate = useTransform(sectionProgress, [0, 1], [-12, 12]);

  // Line progress
  const { scrollYProgress: drawn } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const headX = useMotionValue(NODES[0].x);
  const headY = useMotionValue(NODES[0].y);
  const headOpacity = useTransform(drawn, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  // Where each node sits along the path (0–1), measured once
  useEffect(() => {
    const path = measureRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    totalRef.current = total;

    setFractions(
      NODES.map((node) => {
        let lo = 0;
        let hi = total;
        for (let i = 0; i < 30; i++) {
          const mid = (lo + hi) / 2;
          if (path.getPointAtLength(mid).x < node.x) lo = mid;
          else hi = mid;
        }
        return hi / total;
      })
    );
  }, [desktop]);

  // Move the glowing tip + activate steps the line has reached
  useMotionValueEvent(drawn, "change", (v) => {
    const path = measureRef.current;
    if (path && totalRef.current) {
      const point = path.getPointAtLength(v * totalRef.current);
      headX.set(point.x);
      headY.set(point.y);
    }
    if (fractions.length) {
      const reached = fractions.filter((f) => v >= f).length;
      setActive((a) => Math.max(a, reached));
    }
  });

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-title"
      className="relative isolate overflow-hidden pb-24 pt-24 xl:pb-[110px] xl:pt-[230px]"
    >
      {/* ── Background: bottom half of the hero arc ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 w-[900px] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[1200px] xl:w-[1300px]">
          <motion.div style={reduce ? undefined : { rotate: arcRotate }}>
            <Image
              src="/images/hero/arc.png"
              alt=""
              width={1500}
              height={1500}
              sizes="(min-width: 1280px) 1300px, (min-width: 768px) 1200px, 900px"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        {/* Soft green glow on the right, behind Monitor */}
        <div className="absolute -right-[10%] top-[30%] size-[900px] bg-[radial-gradient(closest-side,rgb(16_120_80/0.35),transparent)]" />

        {/* Blend edges */}
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-site">
        {/* ── Header ── */}
        <div className="relative z-10 max-w-[680px]">
          <h2 id="approach-title" className="font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["How We Approach Investment"]} inView />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 text-base text-primary/90 md:text-lg md:leading-snug">
              At Afaq Al Barakha, we follow a disciplined, risk-aware, long term investment methodology
              to help our clients build, protect, and grow wealth with confidence
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-8">
            <Link href="/enquiry" className="btn-primary px-6 py-3">
              Book a Consultation
            </Link>
          </Reveal>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative mt-20 xl:-mt-14 xl:h-[520px]">
          {/* Desktop curve */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1280 520"
            className="pointer-events-none absolute left-0 top-0 hidden h-[520px] w-[1280px] overflow-visible xl:block"
          >
            <defs>
              <filter id="approach-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* Measuring path (invisible) */}
            <path ref={measureRef} d={PATH} fill="none" stroke="none" />

            {/* Faint track */}
            <path d={PATH} fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="2" />

            {/* Glow + line */}
            <motion.path
              d={PATH}
              fill="none"
              stroke="#23e29b"
              strokeOpacity="0.45"
              strokeWidth="8"
              filter="url(#approach-glow)"
              style={{ pathLength: reduce ? 1 : drawn }}
            />
            <motion.path
              d={PATH}
              fill="none"
              stroke="#1fc98a"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : drawn }}
            />

            {/* Nodes */}
            {NODES.map((n, i) => {
              const on = i < activeCount;
              return (
                <g key={i}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    fill="#23e29b"
                    initial={false}
                    animate={on ? { r: [7, 18], opacity: [0.5, 0] } : { r: 0, opacity: 0 }}
                    transition={on ? { duration: 1.8, repeat: Infinity, ease: "easeOut" } : { duration: 0.2 }}
                  />
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    initial={false}
                    animate={{ r: on ? 7 : 3, fill: on ? "#5ff0bf" : "#1b4d3b" }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    style={{ filter: on ? "drop-shadow(0 0 6px #23e29b)" : "none" }}
                  />
                </g>
              );
            })}

            {/* Glowing tip */}
            {!reduce && (
              <motion.circle
                cx={headX}
                cy={headY}
                r="5"
                fill="#bfffe6"
                style={{ opacity: headOpacity, filter: "drop-shadow(0 0 8px #23e29b)" }}
              />
            )}
          </svg>

          {/* Mobile vertical track */}
          <span aria-hidden="true" className="absolute bottom-0 left-[14px] top-0 w-px bg-white/10 xl:hidden" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : drawn }}
            className="absolute bottom-0 left-[14px] top-0 w-px origin-top bg-brand-light xl:hidden"
          />

          <ol className="relative flex flex-col gap-14 xl:absolute xl:inset-0 xl:block">
            {steps.map((step, i) => (
              <Step key={step.title} step={step} node={NODES[i]} active={i < activeCount} desktop={desktop} />
            ))}
          </ol>
        </div>

        {/* ── Principles ── */}
        <Stagger
          gap={0.1}
          className="mt-24 grid gap-8 sm:grid-cols-2 xl:mt-[160px] xl:grid-cols-[repeat(4,auto)] xl:justify-between"
        >
          {principles.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="flex items-center gap-4">
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-brand/40 text-brand-light shadow-[inset_0_-4px_10px_0_rgb(35_226_155/0.2)]">
                <AwardIcon className="size-6" />
              </span>
              <div>
                <p className="max-w-[170px] font-display text-lg font-medium leading-tight text-primary">
                  {item.title}
                </p>
                <p className="mt-2 max-w-[180px] text-sm leading-snug text-primary/85">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────────── Step ───────────── */

type StepProps = {
  step: { title: string; description: string };
  node: { x: number; y: number };
  active: boolean;
  desktop: boolean;
};

function Step({ step, node, active, desktop }: StepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const on = desktop ? active : inView;

  return (
    <li
      ref={ref}
      style={{ "--x": `${node.x - 10}px`, "--y": `${node.y - 154}px` } as React.CSSProperties}
      className="relative pl-12 xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:w-[290px] xl:pl-0"
    >
      {/* Mobile dot on the vertical track */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[9px] top-[34px] size-3 rounded-full bg-brand-glow shadow-[0_0_12px_#23e29b] xl:hidden"
        initial={false}
        animate={{ scale: on ? 1 : 0 }}
        transition={{ duration: 0.4, ease: ease.out }}
      />

      {/* Orb */}
      <motion.div
        initial={false}
        animate={
          on
            ? { opacity: 1, scale: 1, boxShadow: "0 0 50px -6px rgba(35,226,155,0.45)" }
            : { opacity: 0.35, scale: 0.9, boxShadow: "0 0 0px 0px rgba(35,226,155,0)" }
        }
        transition={{ duration: 0.8, ease: ease.out }}
        className="flex size-20 items-center justify-center rounded-full border border-white/[0.06] bg-[radial-gradient(circle_at_70%_25%,#2c6b52_0%,#0f2a20_45%,#07120e_100%)] xl:size-[122px]"
      >
        <motion.span
          initial={false}
          animate={{ rotate: on ? 0 : -72 }}
          transition={{ duration: 0.9, ease: ease.out }}
        >
          <StarIcon className="size-8 text-brand-glow xl:size-10" />
        </motion.span>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={false}
        animate={{ opacity: on ? 1 : 0.25, y: on ? 0 : 12 }}
        transition={{ duration: 0.8, delay: on ? 0.15 : 0, ease: ease.out }}
        className="mt-6 xl:mt-[80px]"
      >
        <h3 className="font-display text-[22px] font-medium text-primary xl:text-[26px]">{step.title}</h3>
        <p className="mt-3 max-w-[280px] text-[15px] leading-snug text-primary/85">{step.description}</p>
      </motion.div>
    </li>
  );
}