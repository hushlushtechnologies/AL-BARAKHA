"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease, fadeUp } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ArrowRight, AwardIcon, StarIcon } from "@/components/ui/icons";

const pillars = [
  {
    title: "Strategic Investment Planning",
    description:
      "Identify opportunities, create tailored strategies, and optimize your portfolio for sustainable growth",
    href: "/about",
    featured: true,
  },
  {
    title: "Risk Managed Solutions",
    description:
      "Protect your wealth with disciplined risk management and diversified investment approaches",
    href: "/about",
  },
  {
    title: "Long Term Financial Growth",
    description:
      "Build lasting wealth through structured solutions and a long term perspective for future generations",
    href: "/about",
  },
];

const trust = [
  { title: "Based in UAE", subtitle: "A Global Investment Hub" },
  { title: "Serving Across the UAE", subtitle: "Individuals, Families & Businesses" },
  { title: "Tailored Investment Guidance", subtitle: "Personalized. Strategic. Trusted." },
];

 export function Pillars() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(imageProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
        id="intro"
      aria-labelledby="pillars-title"
      className="relative scroll-mt-32 pb-24 pt-24 lg:pb-32 lg:pt-56"
    >
      <div className="container-site grid gap-[14px] xl:grid-cols-[1fr_294px]">
        {/* ── Left column ── */}
        <div>
          <h2 id="pillars-title" className="max-w-[720px] font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["Building, protecting, and Growing", "Wealth with Purpose"]} inView />
          </h2>

          <Reveal delay={0.3}>
            <p className="mt-10 max-w-[720px] text-base text-primary/90 md:text-lg md:leading-snug">
              Afaq Al Barakha Investment helps individuals and businesses build, protect, and grow their
              wealth through strategic investment opportunities, structured solutions, risk management,
              and long term financial planning
            </p>
          </Reveal>

          <Reveal delay={0.45} className="mt-8 flex flex-wrap gap-4 sm:gap-6">
            <Link href="/about" className="btn-primary px-6 py-3  ">
              Discover More
            </Link>
            <Link href="/enquiry" className="btn-outline px-6 py-3  ">
              Connect with Us
            </Link>
          </Reveal>

          <Stagger gap={0.12} className="mt-16 grid gap-[14px] md:grid-cols-3 lg:mt-[78px]">
            {pillars.map((p) => (
              <PillarCard key={p.title} {...p} />
            ))}
          </Stagger>
        </div>
         {/* ── Office image ── */}
        <div
          ref={imageRef}
          className="relative mt-10 h-[420px] overflow-hidden rounded-[24px] md:h-[520px] xl:mt-0 xl:h-auto xl:min-h-[600px]"
        >
          {/* Zoom-out on reveal */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.35 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.8, delay: 0.2, ease: ease.out }}
          >
            {/* Scroll parallax */}
            <motion.div
              style={reduce ? { scale: 1.2 } : { y: imageY, scale: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/office.png"
                alt="Afaq Al Barakha Investment office lounge in the UAE"
                fill
                sizes="(min-width: 1280px) 294px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Curtain reveal */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-ink"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.2, ease: ease.inOut }}
          />
        </div>
      </div>

      {/* ── Trust strip ── */}
      <Stagger
        gap={0.12}
        className="container-site mt-16 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-16 lg:mt-[66px] xl:gap-x-[75px]"
      >
        {trust.map((item) => (
          <motion.div key={item.title} variants={fadeUp} className="flex items-center gap-4">
            <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-brand/40 text-brand-light shadow-[inset_0_-4px_10px_0_rgb(35_226_155/0.2)]">
              <AwardIcon className="size-6" />
            </span>
            <div>
              <p className="text-lg font-medium text-primary">{item.title}</p>
              <p className="mt-1 text-sm text-primary/85">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
/* ───────────── Card ───────────── */

type PillarProps = {
  title: string;
  description: string;
  href: string;
  featured?: boolean;
};

function PillarCard({ title, description, href, featured }: PillarProps) {
  // Cursor-following spotlight
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMove}
      className="group relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-[24px] border border-white/[0.05] p-6 transition-[translate,border-color] duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-light/25 lg:min-h-[375px]"
    >
      {/* Base dark gradient */}
      <span aria-hidden="true" className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#0e231c_0%,#0a1612_100%)]" />
      {/* Olive glow at the top */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_45%_at_55%_0%,rgb(150_135_60/0.28),transparent_70%)]"
      />
      {/* Green active/hover state */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-[linear-gradient(180deg,#173a2c_0%,#245d46_100%)] transition-opacity duration-700 ease-premium ${
          featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      {/* Spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgb(51_176_130/0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="flex size-9 items-center justify-center rounded-full bg-ink/60 text-brand-light transition-transform duration-500 ease-premium group-hover:rotate-[72deg]">
        <StarIcon className="size-4" />
      </span>

      <h3 className="mt-10 font-display text-[22px] font-medium leading-[1.25] text-primary xl:text-[26px]">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-snug text-primary/85">{description}</p>

      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-brand-light after:absolute after:inset-0 after:content-['']"
      >
        Learn More <span className="sr-only">about {title}</span>
        <ArrowRight className="size-5 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
      </Link>
    </motion.article>
  );
}