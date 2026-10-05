 "use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks, ctaLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { ArrowRight } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isActive: (href: string) => boolean;
};

export function MobileMenu({ open, onClose, onNavigate, isActive }: Props) {
  const lenis = useLenis();

  // Lock scrolling and allow Escape to close
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: ease.inOut }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-32 lg:hidden"
        >
          {/* Brand gradient: deep green at the top fading into ink */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#07100c_0%,#0a2219_45%,#010403_100%)]"
          />

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-brand-mid/30 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-brand/40 blur-[120px]"
          />

          <nav aria-label="Mobile" className="relative">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: ease.out }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => onNavigate(e, link.href)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4"
                      >
                        <span className="text-sm tabular-nums text-muted">0{i + 1}</span>
                        <span
                          className={`font-display text-4xl font-semibold transition-colors duration-300 ${
                            active ? "text-brand-light" : "text-primary group-hover:text-brand-light"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: ease.out }}
            className="relative mt-auto pt-10"
          >
            <Link
              href={ctaLink.href}
              onClick={(e) => onNavigate(e, ctaLink.href)}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gold bg-gold-surface px-6 py-4 text-base text-primary"
            >
              {ctaLink.label}
              <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}