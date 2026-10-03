 "use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { StarIcon } from "@/components/ui/icons";

/* ───────────── Data ───────────── */

type Service = { title: string; description: string };
type Img = { src: string; alt: string };
type Tile = { type: "card"; service: Service } | { type: "image"; image: Img };
type Row =
  | { kind: "split"; service: Service; image: Img; reverse?: boolean }
  | { kind: "masonry"; columns: Tile[][] };

const img = (file: string, alt: string): Img => ({ src: `/images/services/${file}`, alt });
const card = (service: Service): Tile => ({ type: "card", service });
const photo = (image: Img): Tile => ({ type: "image", image });

const S = {
  strategic: {
    title: "Strategic Investment Planning",
    description: "Create tailored investment strategies aligned with your goals and risk profile",
  },
  growth: {
    title: "Wealth Growth Strategies",
    description: "Identify opportunities across global and local markets to grow your wealth sustainably",
  },
  diversification: {
    title: "Portfolio Diversification",
    description: "Build resilient portfolios across multiple asset classes to reduce risk and enhance returns",
  },
  longTerm: {
    title: "Long Term Financial Planning",
    description: "Plan for a more secure tomorrow with structured long term financial strategies",
  },
  assessment: {
    title: "Investment Opportunity Assessment",
    description: "Evaluate high potential opportunities with expert insight and market intelligence",
  },
  risk: {
    title: "Risk Managed Investment Solutions",
    description: "Protect and grow your wealth with disciplined risk management approaches",
  },
  consultation: {
    title: "Investment Consultation",
    description: "Get personalized advice from our experienced investment professionals",
  },
  review: {
    title: "Portfolio Review",
    description: "Assess and optimize your existing investments for better performance",
  },
  research: {
    title: "Market Research & Analysis",
    description: "Access in-depth market insights to make informed investment decisions",
  },
  wealth: {
    title: "Wealth Management",
    description: "Comprehensive wealth management solutions for individuals, families and businesses",
  },
} satisfies Record<string, Service>;

const rows: Row[] = [
  {
    kind: "split",
    service: S.strategic,
    image: img("planning-tablet.png", "Advisors reviewing investment charts on a tablet"),
  },
  {
    kind: "split",
    reverse: true,
    service: S.growth,
    image: img("growth-silhouette.png", "Silhouette of a woman at sunset beside a rising bar graph"),
  },
  {
    kind: "split",
    service: S.diversification,
    image: img("diversification-tablet.png", "Portfolio allocation charts presented on a tablet"),
  },
  {
    kind: "masonry",
    columns: [
      [photo(img("building-growth.png", "Modern office building with a rising growth arrow")), card(S.assessment)],
      [card(S.longTerm), photo(img("long-term-planning.png", "Card reading Long-Term Planning"))],
      [photo(img("office-handshake.png", "Business handshake in an office with financial dashboards")), card(S.risk)],
    ],
  },
  {
    kind: "masonry",
    columns: [
      [card(S.consultation), photo(img("consultation-meeting.png", "Two advisors discussing data on a laptop"))],
      [photo(img("research-dashboard.png", "Analyst pointing at market research charts")), card(S.research)],
      [card(S.review), photo(img("team-review.png", "Team reviewing a portfolio on a tablet"))],
    ],
  },
  {
    kind: "split",
    reverse: true,
    service: S.wealth,
    image: img("wealth-coins.png", "Watering a plant growing from stacks of gold coins"),
  },
];

/* ───────────── Section ───────────── */

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Gentle opposite drift of the two backgrounds while scrolling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const topY = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [120, -60]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative isolate scroll-mt-24 overflow-hidden pb-24 pt-24 lg:pb-40 lg:pt-44"
    >
      {/* ── Backgrounds: top (green) + bottom (gold) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Top image, fades out downward */}
        <motion.div
          style={reduce ? undefined : { y: topY }}
          className="absolute inset-x-0 top-0 [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
        >
          <Image
            src="/images/services/bg-top.png"
            alt=""
            width={1920}
            height={2000}
            sizes="100vw"
            quality={85}
            className="h-auto min-h-[900px] w-full object-cover"
          />
        </motion.div>

        {/* Bottom image, fades out upward */}
        <motion.div
          style={reduce ? undefined : { y: bottomY }}
          className="absolute inset-x-0 bottom-0 [mask-image:linear-gradient(to_top,black_65%,transparent)]"
        >
          <Image
            src="/images/services/bg-bottom.png"
            alt=""
            width={1920}
            height={2000}
            sizes="100vw"
            quality={85}
            className="h-auto min-h-[900px] w-full object-cover"
          />
        </motion.div>

        {/* Blend into neighbouring sections */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-site">
        {/* ── Header ── */}
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <h2 id="services-title" className="font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["Investment Service Built", "for Long Term Value"]} inView />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 text-base text-primary/90 md:text-lg md:leading-snug">
              Afaq Al Barakha delivers strategic investment planning, advisory insights, wealth
              management and risk-aware solutions for individuals and businesses across the UAE
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/about" className="btn-primary px-6 py-3">
              Explore All Services
            </Link>
            <Link href="/enquiry" className="btn-outline px-6 py-3">
              Book a Consultation
            </Link>
          </Reveal>
        </div>

        {/* ── Banner + rows ── */}
        <div className="mx-auto mt-20 max-w-[1024px] lg:mt-36">
          <FeatureBanner />
          <div className="mt-20 flex flex-col gap-16 lg:gap-[100px]">
            {rows.map((row, i) =>
              row.kind === "split" ? (
                <SplitRow key={i} {...row} />
              ) : (
                <MasonryRow key={i} columns={row.columns} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Feature banner ───────────── */

function FeatureBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, ease: ease.out }}
      className="relative isolate grid items-center gap-8 overflow-hidden rounded-[24px] border border-white/[0.06] p-6 md:p-10 lg:min-h-[284px] lg:grid-cols-[1fr_340px_1fr]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#123a2b_0%,#1a3a2b_50%,#3b3a1d_100%)]"
      />
      {/* Slow light sweep */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/3 -z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/[0.06] to-transparent"
        animate={{ x: ["0%", "450%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      />

      <div>
        <h3 className="font-display text-[22px] font-medium leading-[1.25] text-primary xl:text-[26px]">
          Investment Planning <br className="hidden lg:block" />
          for a Brighter Future
        </h3>
        <p className="mt-4 max-w-[260px] text-[15px] leading-snug text-primary/85">
          Personalized strategies to help you build, protect and grow your wealth across global markets
        </p>
      </div>

      <BannerChart />

      <Link href="/enquiry" className="btn-primary justify-self-start px-6 py-3 lg:justify-self-end">
        Get Started
      </Link>
    </motion.div>
  );
}

const B_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const B_LINE =
  "M4 112 C 14 100, 22 84, 34 86 S 52 100, 64 92 S 84 64, 98 70 S 116 88, 130 80 S 150 56, 164 62 S 182 78, 196 66 S 214 30, 230 34 S 250 50, 262 40 S 288 22, 300 16 S 312 8, 316 6";
const B_AREA = `${B_LINE} L316 120 L4 120 Z`;

const reveal: Variants = {
  hidden: { width: 0 },
  show: { width: 320, transition: { duration: 1.8, delay: 0.5, ease: ease.inOut } },
};
const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay: 2.2, duration: 0.4, ease: ease.out } },
};

function BannerChart() {
  return (
    <div className="rounded-xl border border-white/10 bg-ink/30 px-4 pb-3 pt-4 backdrop-blur-sm">
      <motion.svg
        viewBox="0 0 320 120"
        className="h-[120px] w-full overflow-visible"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="banner-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#23e29b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#23e29b" stopOpacity="0" />
          </linearGradient>
          <clipPath id="banner-reveal">
            <motion.rect x="0" y="-10" height="140" variants={reveal} />
          </clipPath>
        </defs>

        {B_MONTHS.map((m, i) => {
          const x = 4 + i * (312 / 7);
          return <line key={m} x1={x} x2={x} y1="0" y2="120" stroke="white" strokeOpacity="0.06" />;
        })}

        <g clipPath="url(#banner-reveal)">
          <path d={B_AREA} fill="url(#banner-area)" />
          <path d={B_LINE} fill="none" stroke="#33b082" strokeWidth="2" strokeLinecap="round" />
        </g>

        <motion.g variants={dot} style={{ originX: "316px", originY: "6px" }}>
          <motion.circle
            cx="316"
            cy="6"
            r="4"
            fill="#23e29b"
            animate={{ r: [4, 10], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 2.6 }}
          />
          <circle cx="316" cy="6" r="3.5" fill="#23e29b" />
        </motion.g>
      </motion.svg>

      <div className="mt-2 flex justify-between text-[11px] text-primary/80">
        {B_MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Split row: card + wide image ───────────── */

function SplitRow({ service, image, reverse }: { service: Service; image: Img; reverse?: boolean }) {
  return (
    <div
      className={`grid gap-6 md:gap-8 lg:gap-[47px] ${
        reverse ? "md:grid-cols-[1fr_minmax(0,314px)]" : "md:grid-cols-[minmax(0,314px)_1fr]"
      }`}
    >
      <ServiceCard
        {...service}
        x={reverse ? 40 : -40}
        className={`min-h-[300px] lg:min-h-[374px] ${reverse ? "md:order-2" : ""}`}
      />
      <ImageTile
        image={image}
        from={reverse ? "right" : "left"}
        sizes="(min-width: 1024px) 663px, (min-width: 768px) 60vw, 100vw"
        className={`h-[260px] md:h-auto md:min-h-[320px] lg:min-h-[374px] ${reverse ? "md:order-1" : ""}`}
      />
    </div>
  );
}

/* ───────────── Masonry row: 3 columns, middle moves opposite ───────────── */

function MasonryRow({ columns }: { columns: Tile[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const outer = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const middle = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const parallax = desktop && !reduce;

  return (
    <div
      ref={ref}
      className="grid gap-6 md:grid-cols-3 lg:grid-cols-[repeat(3,314px)] lg:justify-between lg:gap-x-0"
    >
      {columns.map((column, ci) => (
        <motion.div
          key={ci}
          style={parallax ? { y: ci === 1 ? middle : outer } : undefined}
          className="flex flex-col gap-6 lg:gap-[25px]"
        >
          {column.map((tile) =>
            tile.type === "card" ? (
              <ServiceCard
                key={tile.service.title}
                {...tile.service}
                delay={ci * 0.1}
                className="min-h-[300px] lg:h-[374px]"
              />
            ) : (
              <ImageTile
                key={tile.image.src}
                image={tile.image}
                sizes="(min-width: 1024px) 314px, (min-width: 768px) 33vw, 100vw"
                className="h-[240px] md:h-[200px] lg:h-[278px]"
              />
            )
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────── Service card ───────────── */

type CardProps = Service & { className?: string; delay?: number; x?: number };

function ServiceCard({ title, description, className = "", delay = 0, x = 0 }: CardProps) {
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, x, y: x ? 0 : 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: ease.out }}
      onMouseMove={handleMove}
      className={`group relative isolate flex flex-col justify-center overflow-hidden rounded-[24px] border border-white/[0.05] p-6 transition-[translate,border-color] duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-light/25 ${className}`}
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="flex size-9 items-center justify-center rounded-full bg-[#0d3a2c] text-brand-glow transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
        <StarIcon className="size-4" />
      </span>
      <h3 className="mt-6 font-display text-[22px] font-medium leading-[1.25] text-primary xl:text-[26px]">
        {title}
      </h3>
      <p className="mt-4 max-w-[260px] text-[15px] leading-snug text-primary/85">{description}</p>
    </motion.article>
  );
}

/* ───────────── Image tile: curtain + zoom + parallax ───────────── */

type ImageTileProps = {
  image: Img;
  sizes: string;
  className?: string;
  from?: "bottom" | "left" | "right";
};

function ImageTile({ image, sizes, className = "", from = "bottom" }: ImageTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const vertical = from === "bottom";
  const origin = { bottom: "origin-top", left: "origin-right", right: "origin-left" }[from];

  return (
    <div ref={ref} className={`group relative overflow-hidden rounded-[24px] ${className}`}>
      {/* Zoom-out on reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: ease.out }}
      >
        {/* Scroll parallax */}
        <motion.div style={reduce ? { scale: 1.18 } : { y, scale: 1.18 }} className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
          />
        </motion.div>
      </motion.div>

      {/* Curtain */}
      <motion.div
        aria-hidden="true"
        className={`absolute inset-0 bg-ink ${origin}`}
        initial={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        whileInView={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, delay: 0.1, ease: ease.inOut }}
      />

      {/* Subtle inner edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
    </div>
  );
}