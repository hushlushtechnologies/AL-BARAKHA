"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function useSmoothNav(offset = -110) {
  const pathname = usePathname();
  const lenis = useLenis();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [path, hash] = href.split("#");
      if (hash && pathname === (path || "/")) {
        e.preventDefault();
        lenis?.scrollTo(`#${hash}`, { offset, duration: 1.4 });
        history.replaceState(null, "", `#${hash}`);
      }
    },
    [pathname, lenis, offset]
  );
}