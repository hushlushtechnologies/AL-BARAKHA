"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ease, fadeUp } from "@/lib/motion";
import { contact, socials, whatsappUrl, youtubeUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import {
  ChatIcon,
  ChevronDown,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/icons";

/* ───────────── Content ───────────── */

const faqs = [
  {
    q: "What services does Afaq Al Barakha Investment provide?",
    a: "We provide investment planning, advisory services, wealth management, risk management, portfolio diversification, and access to selected investment opportunities across different sectors.",
  },
  {
    q: "Who can work with Afaq Al Barakha Investment?",
    a: "We work with individuals, families, and businesses, from first-time investors to experienced investors looking to grow, protect, or restructure their wealth.",
  },
  {
    q: "Do you provide investment services across the UAE?",
    a: "Yes. We are based in Dubai and support clients across the UAE, including Dubai, Abu Dhabi, and Sharjah, with access to opportunities in key sectors of the UAE economy.",
  },
  {
    q: "How do you assess an investment opportunity?",
    a: "Every opportunity is reviewed for its market conditions, growth potential, risk exposure, and fit with your financial goals and risk profile before it is recommended.",
  },
  {
    q: "Do you help with portfolio diversification and risk management?",
    a: "Yes. We help structure portfolios across suitable asset classes and apply disciplined risk management to balance growth with capital protection.",
  },
  {
    q: "How can I start an investment consultation with Afaq Al Barakha?",
    a: "Simply fill in the enquiry form above, call us, or message us on WhatsApp. An advisor will contact you to understand your goals and schedule your consultation.",
  },
];

const instagram = socials.find((s) => s.name === "Instagram");
const facebook = socials.find((s) => s.name === "Facebook");

const socialLinks = [
  { name: "Instagram", handle: instagram?.handle ?? "Instagram", href: instagram?.href ?? "#", Icon: InstagramIcon },
  { name: "Facebook", handle: facebook?.handle ?? "Facebook", href: facebook?.href ?? "#", Icon: FacebookIcon },
  { name: "WhatsApp", handle: contact.phone, href: whatsappUrl, Icon: ChatIcon },
  { name: "YouTube", handle: "Afaq Al Barakha", href: youtubeUrl, Icon: YouTubeIcon },
];

/* Structured data so Google can show these as rich results */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: ease.out } },
};

/* ───────────── Section ───────────── */

export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const ringScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 1.05]);

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-title"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 xl:pb-[180px] xl:pt-[60px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h2 id="faq-title" className="sr-only">
        Frequently Asked Questions
      </h2>

      {/* ── Background ring ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[52%] top-1/2 w-[800px] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[1000px] xl:w-[1100px]">
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
                sizes="(min-width: 1280px) 1100px, (min-width: 768px) 1000px, 800px"
                className="h-auto w-full opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute -bottom-[10%] -right-[10%] size-[900px] bg-[radial-gradient(closest-side,rgb(16_120_80/0.3),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-site grid gap-14 xl:grid-cols-[322px_1fr] xl:gap-[62px]">
        {/* ── Left: logo + socials ── */}
        <div className="order-2 xl:order-none xl:self-end">
          <Reveal>
            <Image
              src="/logo-white.png"
              alt="Afaq Al Barakha Investment"
              width={172}
              height={90}
              className="h-auto w-[150px] xl:w-[172px]"
            />
          </Reveal>

          <div className="mt-12 rounded-[18px] border border-white/[0.06] bg-[linear-gradient(180deg,rgb(10_26_20/0.85),rgb(4_12_9/0.85))] px-6 py-7 backdrop-blur-sm">
            <Stagger gap={0.08}>
              <ul className="flex flex-col gap-8">
                {socialLinks.map(({ name, handle, href, Icon }) => (
                  <motion.li key={name} variants={fadeUp}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name}: ${handle}`}
                      className="group flex items-center gap-4 text-lg text-primary transition-colors duration-300 hover:text-brand-light"
                    >
                      <span className="flex size-10 items-center justify-center rounded-lg border border-white/[0.06] bg-ink/40 transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                        <span className="flex size-6 items-center justify-center rounded-md bg-brand-light text-white shadow-[0_0_0_0_rgb(35_226_155/0)] transition-shadow duration-500 group-hover:shadow-[0_6px_18px_-4px_rgb(35_226_155/0.7)]">
                          <Icon className="size-4" />
                        </span>
                      </span>
                      {handle}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </Stagger>
          </div>
        </div>

        {/* ── Right: accordion ── */}
        <Stagger gap={0.08} className="order-1 xl:order-none">
          <ul className="flex flex-col gap-5">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                index={i}
                question={item.q}
                answer={item.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}

/* ───────────── Accordion item ───────────── */

type FaqItemProps = {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

function FaqItem({ index, question, answer, open, onToggle }: FaqItemProps) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <motion.li variants={fromRight}>
      <div
        className={`group overflow-hidden rounded-[18px] border backdrop-blur-sm transition-[border-color,box-shadow] duration-500 ease-premium ${
          open
            ? "border-brand-light/25 bg-[linear-gradient(180deg,rgb(16_44_34/0.85),rgb(6_18_14/0.85))] shadow-[0_20px_50px_-25px_rgb(35_226_155/0.4)]"
            : "border-white/[0.06] bg-[linear-gradient(180deg,rgb(10_26_20/0.85),rgb(4_12_9/0.85))] hover:border-white/15"
        }`}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full items-center gap-3 px-5 py-4 text-left md:gap-4 md:px-10"
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm tabular-nums text-gold transition-[background-color,box-shadow] duration-500 ${
                open ? "bg-gold-surface ring-1 ring-gold/40" : "bg-ink/60"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-display text-base font-medium text-primary md:text-lg">
              {question}
            </span>
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-ink/50 transition-colors duration-500 ${
                open ? "text-brand-light" : "text-primary group-hover:text-brand-light"
              }`}
            >
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.5, ease: ease.out }}
                className="flex"
              >
                <ChevronDown className="size-5" />
              </motion.span>
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.5, ease: ease.out },
                  opacity: { duration: 0.4, delay: 0.1 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.4, ease: ease.inOut },
                  opacity: { duration: 0.2 },
                },
              }}
              className="overflow-hidden"
            >
              <p className="pb-6 pl-[4.75rem] pr-6 text-[15px] leading-snug text-primary/85 md:pl-[6.25rem] md:pr-24">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}