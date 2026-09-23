"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BangMark } from "@/components/ui/Logo";

const ROW_A = ["Web Design", "E-commerce", "CRM su Misura", "Web App", "Lead Generation", "Social Media", "SEO", "Branding"];
const ROW_B = ["Processi semplificati", "Tutto sotto controllo", "Più efficienza", "Dati in tempo reale", "Zero Excel sparsi"];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 1]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <div ref={ref} className="relative overflow-hidden py-10 sm:py-14" aria-hidden>
      <motion.div style={{ rotate }} className="relative z-10 -mx-10 bg-bang py-4 sm:py-5">
        <div className="flex w-max animate-marquee">
          {[...ROW_A, ...ROW_A, ...ROW_A, ...ROW_A].map((t, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
              {t}
              <BangMark className="h-8 w-8 [&_path:first-child]:fill-ink [&_path:last-child]:fill-bang sm:h-10 sm:w-10" />
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div style={{ rotate: rotate2 }} className="-mx-10 -mt-3 border-y border-ink/10 bg-surface py-4">
        <div className="flex w-max animate-marquee-reverse">
          {[...ROW_B, ...ROW_B, ...ROW_B, ...ROW_B].map((t, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-2xl font-bold uppercase tracking-tight text-stroke sm:text-4xl">
              {t}
              <span className="text-bang-ink">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
