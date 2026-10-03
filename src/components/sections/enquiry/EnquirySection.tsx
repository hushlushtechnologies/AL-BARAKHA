"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { contact, mapsEmbedUrl, whatsappUrl } from "@/lib/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { EnquiryForm } from "./EnquiryForm";

const BG_WORD = "CONTACT US";

export function EnquirySection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section
      ref={ref}
      aria-labelledby="enquiry-title"
      className="relative isolate overflow-hidden pb-24 pt-40 xl:pb-[270px] xl:pt-[330px]"
    >
      {/* ── Background glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          className="absolute -left-[15%] -top-[10%] size-[1200px] bg-[radial-gradient(closest-side,rgb(16_120_80/0.45),transparent)] will-change-transform"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -right-[5%] -top-[25%] size-[750px] rounded-full bg-[radial-gradient(closest-side,rgb(1_4_3/0.85),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(180deg,rgb(8_40_30/0.6),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-ink to-transparent" />
      </div>

      {/* ── Giant background word ── */}
        
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[170px] -z-10 hidden md:block xl:top-[215px]"
      >
        <motion.div style={reduce ? undefined : { x: wordX }} className="flex justify-center">
          {BG_WORD.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: ease.out }}
className="inline-block bg-[linear-gradient(180deg,rgb(51_176_130/0.2)_0%,rgb(51_176_130/0.05)_100%)] bg-clip-text font-display text-[clamp(6rem,11vw,12rem)] font-bold leading-none text-transparent"            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="container-site relative">
        <div className="mx-auto grid max-w-[1024px] gap-16 xl:grid-cols-[478px_480px] xl:justify-between">
          {/* ── Left: heading + contact ── */}
          <div>
            <h1 id="enquiry-title" className="font-display text-h2 font-semibold text-primary">
              <TextReveal lines={["Let’s Talk About Your", "Next Investment Move."]} delay={0.3} />
            </h1>

            <ul className="mt-12 flex flex-col gap-[15px]">
              <ContactCard href={whatsappUrl} external title="Get Connected on WhatsApp" delay={0.6} />
              <ContactCard href={contact.phoneHref} title="Call Us On" detail={contact.phone} delay={0.7} />
              <ContactCard href={`mailto:${contact.email}`} title="Mail ID" detail={contact.email} delay={0.8} />
              <ContactCard
                href={contact.mapsUrl}
                external
                title="Get Direction"
                detail={contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                delay={0.9}
              />
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: ease.out }}
              className="mt-[15px] h-[185px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.04]"
            >
              <iframe
                title="Afaq Al Barakha Investment office location"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0 [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(0.9)]"
              />
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contact card ───────────── */

type ContactCardProps = {
  href: string;
  title: string;
  detail?: React.ReactNode;
  external?: boolean;
  delay: number;
};

function ContactCard({ href, title, detail, external, delay }: ContactCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: ease.out }}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex min-h-[85px] items-center justify-between gap-6 rounded-[14px] border border-white/[0.06] bg-[linear-gradient(180deg,rgb(16_44_34/0.75),rgb(8_24_19/0.75))] px-6 py-5 backdrop-blur-sm transition-[border-color,translate] duration-500 ease-premium hover:-translate-y-0.5 hover:border-brand-light/30"
      >
        <div>
          <p className="text-lg font-medium text-primary">{title}</p>
          {detail && <div className="mt-2 text-[15px] leading-snug text-primary/90">{detail}</div>}
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/70 text-primary transition-[background-color,border-color,color] duration-500 ease-premium group-hover:border-brand-light group-hover:bg-brand-light group-hover:text-ink">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-premium group-hover:rotate-45" />
        </span>
      </a>
    </motion.li>
  );
}