"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { fadeUp } from "@/lib/motion";
import { contact, footerLinks, socials } from "@/lib/site";
import { useSmoothNav } from "@/lib/use-smooth-nav";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import {
  ArrowRight,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";

const socialIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
};

/* Underline that draws in from the left on hover */
const linkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 ease-premium hover:bg-[length:100%_1px] hover:text-brand-light";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const onNavigate = useSmoothNav();
  const year = new Date().getFullYear();

  // Content rises into place as the footer scrolls in
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <footer ref={ref} className="relative isolate overflow-hidden">
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={reduce ? undefined : { scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/services/bg-top.png"
            alt=""
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-bottom"
          />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-ink to-transparent" />
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="container-site pb-16 pt-24 xl:pb-[110px] xl:pt-[115px]"
      >
        <div className="xl:px-16">
          {/* Brand */}
           {/* Brand: crest image + real-text tagline */}
          <Reveal>
            <Link
              href="/"
              onClick={(e) => onNavigate(e, "/")}
              aria-label="Afaq Al Barakha Investment, go to homepage"
              className="inline-flex flex-col items-center"
            >
              <Image
                src="/logo-mark.svg"
                alt=""
                width={76}
                height={74}
                unoptimized
                className="h-auto w-[64px] xl:w-[76px]"
              />
              <span className="mt-1.5 whitespace-nowrap bg-[linear-gradient(90deg,#C78811_0.02%,#F5D124_61.61%,#C58510_123.21%)] bg-clip-text font-serif text-[9px] font-semibold uppercase leading-none tracking-[0.26em] text-transparent xl:text-[10px]">
                Albarakha Investment
              </span>
            </Link>
          </Reveal>

          <h2 className="mt-12 font-display text-h2 font-semibold text-primary">
            <TextReveal lines={["Ready to Explore?"]} inView />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[520px] text-lg leading-snug text-primary md:text-[22px]">
              Afaq Al Barakha Investment is a Dubai-based investment firm dedicated to creating
              sustainable growth, securing wealth and unlocking opportunities across the UAE and beyond
            </p>
          </Reveal>

          {/* Columns */}
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FooterColumn title="Explore">
              {footerLinks.explore.map((link) => (
                <motion.li key={link.href + link.label} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={(e) => onNavigate(e, link.href)}
                    className={`text-[17px] text-primary/90 ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </FooterColumn>

            <FooterColumn title="Resources">
              {footerLinks.resources.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={(e) => onNavigate(e, link.href)}
                    className={`text-[17px] text-primary/90 ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact Us" gap="gap-6">
              <motion.li variants={fadeUp}>
                <ContactRow href={contact.phoneHref} icon={<PhoneIcon className="size-5" />}>
                  {contact.phone}
                </ContactRow>
              </motion.li>
              <motion.li variants={fadeUp}>
                <ContactRow href={`mailto:${contact.email}`} icon={<MailIcon className="size-5" />}>
                  {contact.email}
                </ContactRow>
              </motion.li>
              <motion.li variants={fadeUp}>
                <ContactRow href={contact.mapsUrl} external icon={<PinIcon className="size-5" />}>
                  <address className="not-italic">
                    {contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </ContactRow>
              </motion.li>
            </FooterColumn>
          </div>

          {/* Socials */}
          <div className="mt-20 flex flex-col items-center">
            <Reveal>
              <h3 className="font-display text-xl font-medium text-primary">Follow Us</h3>
            </Reveal>
            <Stagger gap={0.1} className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-6">
              {socials.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <motion.a
                    key={s.name}
                    variants={fadeUp}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.name}: ${s.handle}`}
                    className="group flex items-center gap-4 text-primary/90 transition-colors duration-300 hover:text-brand-light"
                  >
                    <span className="flex size-7 items-center justify-center rounded-md bg-brand-light text-white transition-[translate,box-shadow] duration-500 ease-premium group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_-6px_rgb(35_226_155/0.7)]">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[17px]">{s.handle}</span>
                  </motion.a>
                );
              })}
            </Stagger>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06] bg-ink/70 backdrop-blur-sm">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-primary/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Afaq Al Barakha Investment. All Rights Reserved. Designed by:{" "}
            <span className="text-primary">Hush Lush Technologies</span>
          </p>

          <div className="flex items-center gap-6">
            <nav aria-label="Legal" className="flex items-center gap-3">
              <Link href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms-and-conditions" className={linkClass}>
                Terms &amp; Conditions
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
              aria-label="Back to top"
              className="group flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-primary transition-colors duration-300 hover:border-brand-light hover:text-brand-light"
            >
              <ArrowRight className="size-4 -rotate-90 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── Pieces ───────────── */

function FooterColumn({
  title,
  children,
  gap = "gap-5",
}: {
  title: string;
  children: React.ReactNode;
  gap?: string;
}) {
  return (
    <div>
      <Reveal>
        <h3 className="font-display text-xl font-medium text-primary">{title}</h3>
      </Reveal>
      <Stagger gap={0.07}>
        <ul className={`mt-8 flex flex-col ${gap}`}>{children}</ul>
      </Stagger>
    </div>
  );
}

function ContactRow({
  href,
  icon,
  external,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-5 text-[17px] text-primary/90 transition-colors duration-300 hover:text-brand-light"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-primary transition-[background-color,color,box-shadow] duration-500 ease-premium group-hover:bg-brand/50 group-hover:text-brand-light group-hover:shadow-[0_0_24px_-4px_rgb(35_226_155/0.5)]">
        {icon}
      </span>
      <span>{children}</span>
    </a>
  );
}