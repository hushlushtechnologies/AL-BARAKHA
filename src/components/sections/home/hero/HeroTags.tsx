"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

const tags = [
  { label: "Strategic Investment", position: "left-0 top-0", delay: 1.0, float: 6 },
  { label: "Trusted Experience", position: "left-16 top-[88px]", delay: 1.1, float: 7.5 },
  { label: "Long Term Value", position: "right-0 top-0", delay: 1.05, float: 6.5 },
  { label: "Sustainable Growth", position: "right-16 top-[88px]", delay: 1.15, float: 8 },
];

export function HeroTags() {
  return (
    <ul className="pointer-events-none absolute inset-x-0 top-0 hidden xl:block">
      {tags.map((tag) => (
        <motion.li
          key={tag.label}
          className={`absolute ${tag.position}`}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: tag.delay, ease: ease.out }}
        >
          <motion.span
            className="block rounded-full border border-white/[0.06] bg-ink/50 px-5 py-2.5 text-[13px] text-primary shadow-[inset_0_-1px_0_0_rgb(51_176_130/0.25)] backdrop-blur-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: tag.float, repeat: Infinity, ease: "easeInOut", delay: tag.delay }}
          >
            {tag.label}
          </motion.span>
        </motion.li>
      ))}
    </ul>
  );
}