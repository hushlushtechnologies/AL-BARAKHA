 "use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeroTags } from "./HeroTags";
import { HeroCards } from "./HeroCards";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="relative pb-24 pt-36 lg:pb-32 lg:pt-52 2xl:pt-[270px]"
    >
      <div className="container-site relative">
        <HeroTags />

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative mx-auto flex flex-col items-center text-center"
        >
          <h1 id="hero-title" className="font-display text-display font-semibold text-primary">
            <TextReveal lines={["Build, Protect &", "Grow Your Wealth"]} delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: ease.out }}
            className="mt-8 max-w-[600px] text-base text-primary/90 md:text-lg md:leading-snug"
          >
            Strategic Investment opportunities, expert advisory, Risk Management and Long term
            financial planning for a more secure tomorrow
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: ease.out }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          >
            <Link href="/#services" className="btn-primary px-6 py-3  md:text-lg">
              Explore Our Service
            </Link>
            <Link href="/enquiry" className="btn-outline px-6 py-3  md:text-lg">
              Speak With An Advisor
            </Link>
          </motion.div>
        </motion.div>

        <HeroCards />
      </div>
    </section>
  );
}