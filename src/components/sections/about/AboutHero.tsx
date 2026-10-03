 "use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ease } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Particles } from "@/components/motion/Particles";
import { HeroTags } from "@/components/sections/home/hero/HeroTags";

// 👇 Change this to match your exported file (name + extension)
const HERO_BG = "/images/about/hero-wave.png";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll: background grows + fades, content drifts up + fades
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse depth: background moves against the cursor, particles with it
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, [-1, 1], [24, -24]);
  const bgY = useTransform(sy, [-1, 1], [16, -16]);
  const dotsX = useTransform(sx, [-1, 1], [-40, 40]);
  const dotsY = useTransform(sy, [-1, 1], [-24, 24]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      aria-labelledby="about-hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pb-24 pt-48 lg:min-h-[1100px] lg:pb-[145px] 2xl:min-h-[1225px]"
    >
      {/* ── Background image + particles ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: ease.out }}
          className="absolute inset-0"
        >
          {/* Scroll */}
          <motion.div
            style={reduce ? undefined : { scale: bgScale, opacity: bgOpacity }}
            className="absolute inset-0"
          >
            {/* Mouse */}
            <motion.div
              style={reduce ? { scale: 1.05 } : { x: bgX, y: bgY, scale: 1.05 }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_BG}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={90}
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles on top of the image */}
        <motion.div style={reduce ? undefined : { x: dotsX, y: dotsY }} className="absolute inset-0">
          <Particles count={60} className="size-full" />
        </motion.div>

        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-ink to-transparent" />
      </div>

      {/* ── Floating tags ── */}
      <div className="container-site pointer-events-none absolute inset-x-0 top-[250px] 2xl:top-[323px]">
        <div className="relative">
          <HeroTags />
        </div>
      </div>

      {/* ── Content ── */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-site relative flex flex-col items-center text-center"
      >
        <h1
          id="about-hero-title"
          className="font-display text-display font-semibold leading-[1.3] text-primary [text-shadow:0_2px_30px_rgb(1_4_3/0.6)]"
        >
          <TextReveal
            lines={["Building Wealth with Strategy.", "Protecting Value for Tomorrow."]}
            delay={0.4}
            stagger={0.06}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: ease.out }}
          className="mt-8 max-w-[980px] text-base text-primary/90 [text-shadow:0_1px_16px_rgb(1_4_3/0.7)] md:text-lg md:leading-snug"
        >
          Afaq Al Barakha Investment is a Dubai-based investment company helping individuals and
          businesses build, protect, and grow wealth through strategic investment planning, structured
          opportunities, risk management, and long-term financial guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: ease.out }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link href="/#services" className="btn-primary px-6 py-3 text-base md:text-lg">
            Explore Our Service
          </Link>
          <Link href="/enquiry" className="btn-outline px-6 py-3 text-base md:text-lg">
            Speak With An Advisor
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}