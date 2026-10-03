"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks, ctaLink } from "@/lib/site";
 
import { ArrowRight } from "@/components/ui/icons";
import { ease } from "@/lib/motion";
import { MobileMenu } from "./MobileMenu";
 

const HEADER_OFFSET = -110; // keeps section titles clear of the fixed header

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Hide on scroll down, show on scroll up, compact after leaving the top
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 160);
  });

  const isActive = useCallback(
    (href: string) => {
      if (href.includes("#")) return false;
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Smooth-scroll to sections when already on the right page
  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [path, hash] = href.split("#");
      if (hash && pathname === (path || "/")) {
        e.preventDefault();
        lenis?.scrollTo(`#${hash}`, { offset: HEADER_OFFSET, duration: 1.4 });
        history.replaceState(null, "", `#${hash}`);
      }
      setMenuOpen(false);
    },
    [pathname, lenis]
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? "-120%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Dark fade behind the header once scrolled */}
        <div
          aria-hidden="true"
       className={`pointer-events-none absolute inset-0 -bottom-10 bg-linear-to-b from-ink via-ink/80 to-transparent transition-opacity duration-500 ${
  scrolled && !menuOpen ? "opacity-100" : "opacity-0"
}`}
        />

        <div
          className={`container-site relative flex items-center justify-between transition-[padding] duration-500 ease-premium ${
            scrolled ? "py-4" : "pb-4 pt-6 lg:pt-12 2xl:pt-[75px]"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavigate(e, "/")}
            aria-label="Afaq, go to homepage"
            className="relative shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Afaq Albarakha Investment"
              width={142}
              height={75}
              priority
              className={`h-auto transition-[width] duration-500 ease-premium ${
                scrolled ? "w-[100px] lg:w-[115px]" : "w-[110px] lg:w-[142px]"
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <motion.nav
            aria-label="Main"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: ease.out }}
          className="hidden items-center rounded-full border border-white/[0.06] bg-surface p-1.5 backdrop-blur-xl lg:flex"
          >
            <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: ease.out }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavigate(e, link.href)}
                      onMouseEnter={() => setHovered(link.href)}
                      aria-current={active ? "page" : undefined}
                      className={`relative z-10 block rounded-full px-6 py-2.5 text-base transition-colors duration-300 ${
                        active ? "text-primary" : "text-primary/60 hover:text-primary"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border-b-[3px] border-brand-light bg-brand shadow-[inset_0_-6px_12px_0_rgb(35_226_155/0.6),inset_0_2px_4px_0_#0b5b46]"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
                        />
                      )}
                      {hovered === link.href && !active && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.05]"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: ease.out }}
              className="ml-16 xl:ml-24"
            >
              <Link
                href={ctaLink.href}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold bg-gold-surface px-6 py-2.5 text-base text-primary transition-shadow duration-500 hover:shadow-[0_0_32px_-6px_rgb(235_184_17/0.55)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-[320%]"
                />
                <span className="relative">{ctaLink.label}</span>
                <ArrowRight className="relative size-5 transition-transform duration-500 ease-premium group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-primary"
                animate={menuOpen ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-primary"
                animate={menuOpen ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Rendered outside the header so the transformed header doesn't trap the fixed overlay */}
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onNavigate={handleNavigate}
        isActive={isActive}
      />
    </>
  );
}