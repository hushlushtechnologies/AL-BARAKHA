"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { GlowCard, GlowGrid } from "@/components/ui/GlowCard";

const principles = [
  {
    title: "Strategic Thinking",
    description:
      "Every investment begins with a clear strategy. We assess objectives, opportunities, market conditions, and long-term potential before building an investment direction.",
  },
  {
    title: "Diversification",
    description:
      "We believe strong portfolios should not depend on a single opportunity. Diversification across suitable assets and investment categories helps create greater balance and resilience.",
  },
  {
    title: "Risk Awareness",
    description:
      "Growth and risk must be considered together. We evaluate potential exposure, identify key risks, and structure investment decisions with capital protection in mind.",
  },
  {
    title: "Long-Term Perspective",
    description:
      "We focus beyond short-term market movement. Our investment approach is designed around sustainable growth, wealth preservation, and long-term financial objectives.",
  },
];

export function Discipline() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="discipline"
      aria-labelledby="discipline-title"
      className="relative isolate overflow-hidden py-24 xl:pb-[140px] xl:pt-[230px]"
    >
      {/* Faint glow behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-[65%] -z-10 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(16_86_70/0.22),transparent)]"
      />

      <div className="container-site">
        {/* ── Header ── */}
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <h2 id="discipline-title" className="font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["A Disciplined Approach to", "Sustainable Growth"]} inView />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 text-base text-primary/90 md:text-lg md:leading-snug">
              At Afaq Al Barakha Investment, we believe successful investing is built on clear
              objectives, informed decisions, disciplined risk management, and a long-term perspective.
            </p>
          </Reveal>
        </div>

        {/* ── Cards + photo ── */}
        <div className="mt-16 grid gap-6 xl:mt-[100px] xl:grid-cols-[628px_1fr] xl:gap-x-[53px]">
          <GlowGrid className="grid gap-6 sm:grid-cols-2 lg:gap-[41px]">
            {principles.map((p, i) => (
              <GlowCard
                key={p.title}
                title={p.title}
                description={p.description}
                delay={((i % 2) + Math.floor(i / 2)) * 0.1}
              />
            ))}
          </GlowGrid>

          {/* Photo: unclipped wrapper drives the children */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative h-[380px] overflow-hidden rounded-[24px] sm:h-[480px] xl:h-auto xl:min-h-[555px]"
          >
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { scale: 1.25 },
                show: { scale: 1, transition: { duration: 1.8, ease: ease.out } },
              }}
            >
              <motion.div
                style={reduce ? { scale: 1.15 } : { y: imageY, scale: 1.15 }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/about/team-desk.jpg"
                  alt="Advisors planning investments together at a shared desk"
                  fill
                  sizes="(min-width: 1280px) 560px, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
                />
              </motion.div>
            </motion.div>

            {/* Curtain: opens from the cards' side */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 origin-right bg-ink"
              variants={{
                hidden: { scaleX: 1 },
                show: { scaleX: 0, transition: { duration: 1.2, delay: 0.2, ease: ease.inOut } },
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}