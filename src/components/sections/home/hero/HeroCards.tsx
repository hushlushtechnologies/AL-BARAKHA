"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ease } from "@/lib/motion";
import { CountUp } from "@/components/motion/CountUp";
import { AwardIcon, BuildingIcon, StarIcon } from "@/components/ui/icons";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

/* ───────────── Layout + scroll parallax ───────────── */

export function HeroCards() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySides = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div
      ref={ref}
      className="mx-auto mt-20 grid w-full max-w-md gap-6 md:max-w-[1020px] md:grid-cols-3 lg:mt-28 lg:grid-cols-[repeat(3,262px)] lg:justify-between"
    >
      <motion.div style={reduce ? undefined : { y: ySides }}>
        <GrowthCard />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: yMiddle }} className="md:mt-16 md:self-start lg:mt-32">
        <AllocationCard />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: ySides }}>
        <MarketCard />
      </motion.div>
    </div>
  );
}

/* ───────────── Shared card shell ───────────── */

type ShellProps = {
  title: string;
  chip: string;
  icon: React.ReactNode;
  delay?: number;
  tall?: boolean;
  children: React.ReactNode;
};

function CardShell({ title, chip, icon, delay = 0, tall = true, children }: ShellProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: ease.out } }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: ease.out }}
      className={`surface-radial relative flex h-full flex-col rounded-[20px] border border-white/[0.06] p-4 backdrop-blur-2xl transition-colors duration-500 hover:border-brand-light/30 ${
        tall ? "min-h-[392px]" : ""
      }`}
    >
      <h3 className="text-[15px] font-medium text-primary">{title}</h3>
      {children}
      <div className="mt-6 flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 md:mt-auto">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/40 text-brand-light">
          {icon}
        </span>
        <span className="text-[13px] leading-tight text-primary">{chip}</span>
      </div>
    </motion.article>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="mt-8">
      <p className="text-[22px] font-medium text-brand-light">
        <CountUp to={value} decimals={1} prefix="+" suffix="%" />
      </p>
      <p className="mt-1 text-[13px] text-primary/80">{label}</p>
    </div>
  );
}

/* ───────────── Card 1: Growth Performance ───────────── */

const bars = [28, 46, 42, 78, 95, 100];

function GrowthCard() {
  return (
    <CardShell title="Growth Performance" chip="Outperforming Target" icon={<AwardIcon className="size-4" />}>
      <Stat value={12.4} label="Total Return" />
      <div className="mb-6 mt-4 flex justify-between">
        {bars.map((h, i) => (
          <div key={months[i]} className="flex w-8 flex-col items-center gap-3">
            <div className="flex h-[130px] items-end">
              <motion.span
                className="block w-2 origin-bottom rounded-t-[3px] bg-linear-to-t from-brand/30 via-brand-light/80 to-brand-glow"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.08, ease: ease.out }}
              />
            </div>
            <span className="text-[12px] text-primary/80">{months[i]}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* ───────────── Card 2: Asset Allocation ───────────── */

const allocation = [
  { label: "Real Estate", value: 35, color: "#23e29b" },
  { label: "Equities", value: 25, color: "#105646" },
  { label: "Fixed Income", value: 20, color: "#ebb811" },
  { label: "Alternative", value: 12, color: "#a3820f" },
  { label: "Cash", value: 8, color: "#5c4a0a" },
];

function AllocationCard() {
  return (
    <CardShell
      title="Asset Allocation"
      chip="Well Diversified"
      icon={<StarIcon className="size-4" />}
      delay={0.12}
      tall={false}
    >
      <div className="mt-6 flex items-center gap-3">
        <Donut />
        <ul className="flex-1 space-y-2">
          {allocation.map((a, i) => (
            <motion.li
              key={a.label}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: ease.out }}
              className="flex items-center justify-between gap-2 text-[10px] text-primary/90"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: a.color }} />
                {a.label}
              </span>
              <span className="tabular-nums">{a.value}%</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </CardShell>
  );
}

function Donut() {
  const total = allocation.reduce((sum, a) => sum + a.value, 0);
  const gap = 2; // degrees between segments
  let start = -90; // begin at 12 o'clock

  return (
    <div className="relative size-[100px] shrink-0">
      <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
        <circle cx="50" cy="50" r="33" fill="#06110d" />
        {allocation.map((a, i) => {
          const sweep = (a.value / total) * 360;
          const rotation = start;
          start += sweep;
          return (
            <g key={a.label} transform={`rotate(${rotation} 50 50)`}>
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={a.color}
                strokeWidth="14"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: (sweep - gap) / 360 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: ease.out }}
              />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] text-primary/80">AED</span>
        <CountUp to={2.85} decimals={2} suffix="M" className="text-[15px] font-medium text-primary" />
      </div>
    </div>
  );
}

/* ───────────── Card 3: Market Insights ───────────── */

const LINE =
  "M2 100 C 8 70, 14 50, 24 50 S 42 78, 56 76 S 84 44, 98 42 S 124 60, 138 58 S 162 28, 174 26 S 186 38, 194 34 S 216 14, 226 6";
const AREA = `${LINE} L226 110 L2 110 Z`;

const chart: Variants = { hidden: {}, show: {} };
const reveal: Variants = {
  hidden: { width: 0 },
  show: { width: 230, transition: { duration: 1.8, delay: 0.4, ease: ease.inOut } },
};
const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay: 2.1, duration: 0.4, ease: ease.out } },
};

function MarketCard() {
  return (
    <CardShell
      title="Market Insights"
      chip="Positive Outlook for UAE Market"
      icon={<BuildingIcon className="size-4" />}
      delay={0.24}
    >
      <Stat value={8.2} label="Market Growth" />

      <motion.svg
        viewBox="0 0 230 110"
        className="mt-6 h-[110px] w-full overflow-visible"
        variants={chart}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="market-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#23e29b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#23e29b" stopOpacity="0" />
          </linearGradient>
          <clipPath id="market-reveal">
            <motion.rect x="0" y="-10" height="130" variants={reveal} />
          </clipPath>
        </defs>

        {/* vertical grid lines */}
        {months.map((m, i) => (
          <line key={m} x1={2 + i * 44.8} x2={2 + i * 44.8} y1="0" y2="110" stroke="white" strokeOpacity="0.05" />
        ))}

        <g clipPath="url(#market-reveal)">
          <path d={AREA} fill="url(#market-area)" />
          <path d={LINE} fill="none" stroke="#33b082" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* endpoint dot + pulse */}
        <motion.g variants={dot} style={{ originX: "226px", originY: "6px" }}>
          <motion.circle
            cx="226"
            cy="6"
            r="4"
            fill="#23e29b"
            animate={{ r: [4, 10], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
          />
          <circle cx="226" cy="6" r="3.5" fill="#23e29b" />
        </motion.g>
      </motion.svg>

      <div className="mb-6 mt-3 flex justify-between text-[12px] text-primary/80">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </CardShell>
  );
}