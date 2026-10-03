"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { whatsappUrl } from "@/lib/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ChatIcon } from "@/components/ui/icons";

/*
  Desktop arc: a circle (radius ≈ 580px at 1920×712) centred on the image's right side.
  Expressed as ellipse percentages so it scales with the image box.
  Hidden and shown shapes share the same structure so Motion can morph them.
*/
const DESKTOP = {
  imgHidden: "ellipse(0% 0% at 100% 50%)",
  img: "ellipse(66.5% 81.5% at 66.5% 50%)",
  rimHidden: "ellipse(calc(0% + 0px) calc(0% + 0px) at 100% 50%)",
  rim: "ellipse(calc(66.5% + 3px) calc(81.5% + 3px) at 66.5% 50%)",
};

const MOBILE = {
  imgHidden: "inset(100% 0% 0% 0% round 24px)",
  img: "inset(0% 0% 0% 0% round 24px)",
  rimHidden: "inset(100% 0% 0% 0% round 24px)",
  rim: "inset(100% 0% 0% 0% round 24px)", // no rim on mobile
};

export function Consultation() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const shape = desktop ? DESKTOP : MOBILE;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="consultation"
      aria-labelledby="consultation-title"
      className="surface-linear relative isolate overflow-hidden pb-16 lg:pb-0"
    >
      {/* Soft glow behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-1/2 -z-10 size-[800px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(16_86_70/0.3),transparent)]"
      />

      {/* ── Content ── */}
      <div className="container-site relative z-10 py-24 lg:flex lg:min-h-[712px] lg:items-center lg:py-32">
        <div className="lg:max-w-[52%] xl:max-w-[590px]">
          <h2
            id="consultation-title"
            className="font-display text-display font-semibold leading-[1.3] text-primary"
          >
            <TextReveal lines={["Schedule Your", "Investment", "Consultation"]} inView />
          </h2>

          <Reveal delay={0.35}>
            <p className="mt-10 text-base text-primary/90 md:text-lg md:leading-snug lg:mt-12">
              Speak with our experts and discover how Afaq Al Barakha Investment can help you achieve
              your financial goals with clarity, confidence, and a long term strategy
            </p>
          </Reveal>

          <Reveal delay={0.5} className="mt-8 flex flex-wrap gap-4 sm:gap-6">
            <Link href="/enquiry" className="btn-primary px-6 py-3">
              Book a Consultation
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline group px-6 py-3"
            >
              <ChatIcon className="size-5 transition-transform duration-500 ease-premium group-hover:-rotate-12" />
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>
      </div>

      {/* ── Arc image ──
          The wrapper is never clipped, so it detects visibility and drives the children. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-4 h-[320px] sm:h-[420px] md:mx-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[42%] xl:w-[45.4%]"
      >
        {/* Green rim (glow sits outside the clip so it stays visible) */}
        <div className="absolute inset-0 [filter:drop-shadow(0_0_14px_rgb(35_226_155/0.55))]">
          <motion.div
            className="absolute inset-0 bg-brand-light"
            variants={{
              hidden: { clipPath: shape.rimHidden },
              show: { clipPath: shape.rim, transition: { duration: 1.4, ease: ease.inOut } },
            }}
          />
        </div>

        {/* Photo */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          variants={{
            hidden: { clipPath: shape.imgHidden },
            show: {
              clipPath: shape.img,
              transition: { duration: 1.4, delay: 0.1, ease: ease.inOut },
            },
          }}
        >
          <motion.div
            style={reduce ? { scale: 1.1 } : { y: imageY, scale: 1.15 }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { scale: 1.25 },
                show: { scale: 1, transition: { duration: 1.8, ease: ease.out } },
              }}
            >
              <Image
                src="/images/consultation/office-views.png"
                alt="Luxury office overlooking the Dubai skyline at dusk"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-left"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}