"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { ease } from "@/lib/motion";
import { BigWord } from "@/components/motion/BigWord";

export type LegalSection = {
  heading: string;
  body: React.ReactNode[];
};

type Props = {
  word: string;
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ word, title, updated, sections }: Props) {
  const articleRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Reading progress across the article
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start 0.6", "end 0.8"],
  });

  return (
    // overflow-clip (not hidden) so the sticky progress bar keeps working
    <section aria-labelledby="legal-title" className="relative isolate overflow-clip pb-24 xl:pb-[160px]">
      {/* ── Reading progress ── */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none sticky top-0 z-[60] h-0">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-[2px] origin-left bg-linear-to-r from-brand-light to-brand-glow shadow-[0_0_12px_rgb(35_226_155/0.6)]"
          />
        </div>
      )}

      {/* ── Background glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          className="absolute -left-[15%] -top-[10%] size-[1200px] bg-[radial-gradient(closest-side,rgb(16_120_80/0.45),transparent)] will-change-transform"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -right-[5%] -top-[20%] size-[750px] rounded-full bg-[radial-gradient(closest-side,rgb(1_4_3/0.85),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[900px] bg-[linear-gradient(180deg,rgb(8_40_30/0.6),transparent)]" />
      </div>

      <div className="container-site pt-40 xl:pt-[240px]">
        <h1 id="legal-title" className="sr-only">
          {title}
        </h1>

        <BigWord word={word} />

        <div ref={articleRef} className="mx-auto mt-16 max-w-[900px] xl:mt-[90px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: ease.out }}
            className="text-sm uppercase tracking-[0.2em] text-brand-light"
          >
            Last updated: {updated}
          </motion.p>

          <ol className="mt-10 flex flex-col gap-12">
            {sections.map((section, i) => (
              <motion.li
                key={section.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: ease.out }}
              >
                <h2 className="flex items-baseline gap-3 font-display text-lg font-medium text-primary md:text-xl">
                  <span className="tabular-nums text-brand-light">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-[1.75] text-primary/85 md:text-lg">
                               {section.body.map((block, j) =>
                    typeof block === "string" ? <p key={j}>{block}</p> : <div key={j}>{block}</div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}