"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease, fadeUp } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { AwardIcon } from "@/components/ui/icons";

const paragraphs = [
  "Afaq Al Barakha Investment is a Dubai-based investment company focused on helping individuals and businesses build, protect, and grow their wealth through thoughtful investment strategies and structured financial solutions.",
  "Our approach combines market understanding, investment planning, portfolio diversification, risk management, and ongoing advisory to support better financial decisions and sustainable long-term growth.",
  "Rather than focusing only on short-term returns, we aim to create strategies that balance growth, stability, and capital protection — helping our clients move forward with greater clarity and confidence.",
];

const pillars = [
  {
    title: "Build Wealth",
    description: "Identify and structure opportunities designed for sustainable financial growth.",
  },
  {
    title: "Protect Capital",
    description: "Apply disciplined risk management and diversification to strengthen investment resilience.",
  },
  {
    title: "Grow with Purpose",
    description:
      "Create long-term strategies aligned with financial goals, opportunities, and changing market conditions.",
  },
];

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Ring: extra rotation + scale while scrolling through
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ringRotate = useTransform(sectionProgress, [0, 1], [-30, 30]);
  const ringScale = useTransform(sectionProgress, [0, 0.4, 1], [0.85, 1, 1.05]);

  // Photo parallax
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(imageProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      aria-labelledby="about-intro-title"
      className="relative isolate overflow-hidden py-24 xl:pb-[150px] xl:pt-[227px]"
    >
      {/* ── Background ring ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 w-[800px] max-w-none -translate-x-[45%] -translate-y-1/2 md:w-[1000px] xl:w-[1150px]">
          <motion.div style={reduce ? undefined : { rotate: ringRotate, scale: ringScale }}>
            <motion.div
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/images/hero/arc.png"
                alt=""
                width={1500}
                height={1500}
                sizes="(min-width: 1280px) 1150px, (min-width: 768px) 1000px, 800px"
                className="h-auto w-full opacity-90"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Soft glow bottom-right */}
        <div className="absolute -bottom-[10%] -right-[10%] size-[900px] bg-[radial-gradient(closest-side,rgb(16_120_80/0.3),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-site">
        <div className="grid gap-12 xl:grid-cols-[1fr_490px] xl:gap-[50px]">
          {/* ── Text ── */}
          <div className="max-w-[740px]">
            <h2 id="about-intro-title" className="font-display text-h2 font-semibold text-primary">
              <TextReveal lines={["Strategic Investment.", "Long-Term Value."]} inView />
            </h2>

            <div className="mt-10 space-y-6">
              {paragraphs.map((text, i) => (
                <Reveal key={i} delay={0.25 + i * 0.12}>
                  <p className="text-base text-primary/90 md:text-lg md:leading-snug">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.65} className="mt-8">
              <Link href="/enquiry" className="btn-primary px-6 py-3">
                Connect With Us
              </Link>
            </Reveal>
          </div>

          {/* ── Photo ──
              Unclipped wrapper detects visibility and drives the children. */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative h-[340px] overflow-hidden rounded-[24px] sm:h-[420px] xl:h-[442px]"
          >
            {/* Zoom-out on reveal */}
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { scale: 1.25 },
                show: { scale: 1, transition: { duration: 1.8, ease: ease.out } },
              }}
            >
              {/* Scroll parallax */}
              <motion.div
                style={reduce ? { scale: 1.15 } : { y: imageY, scale: 1.15 }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/about/office-lounge.png"
                  alt="Afaq Al Barakha Investment office lounge in Dubai"
                  fill
                  sizes="(min-width: 1280px) 490px, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
                />
              </motion.div>
            </motion.div>

            {/* Curtain: opens from the text side */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 origin-right bg-ink"
              variants={{
                hidden: { scaleX: 1 },
                show: { scaleX: 0, transition: { duration: 1.2, delay: 0.15, ease: ease.inOut } },
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10"
            />
          </motion.div>
        </div>

        {/* ── Pillars ── */}
        <Stagger
          gap={0.12}
          className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:mt-24 xl:max-w-[920px]"
        >
          {pillars.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="flex items-center gap-4">
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-brand/40 text-brand-light shadow-[inset_0_-4px_10px_0_rgb(35_226_155/0.2)]">
                <AwardIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-primary">{item.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-snug text-primary/85">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}