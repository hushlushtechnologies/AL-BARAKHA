"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle of the screen,
 * or null when none of the watched sections are there.
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;

    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // First matching section in page order wins
        const current = elements.find((el) => visible.has(el.id));
        setActive(current ? current.id : null);
      },
      // A thin band across the middle of the screen
      { rootMargin: "-45% 0px -54% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}