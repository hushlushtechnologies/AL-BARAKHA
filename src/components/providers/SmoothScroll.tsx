"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

const HEADER_OFFSET = -110;

/* Resets Lenis on every page change:
   - normal links → jump to the top instantly
   - links with a hash (e.g. /#services from another page) → jump to that section */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    // Let the new page render and measure before scrolling
    const frame = requestAnimationFrame(() => {
      lenis.resize();

      const hash = window.location.hash;
      const target = hash ? document.querySelector(hash) : null;

      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, immediate: true, force: true });
      } else {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}