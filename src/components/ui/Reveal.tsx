"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  blur?: boolean;
};

/** Fade + slide-up all'ingresso nel viewport. */
export function Reveal({ delay = 0, y = 32, blur = true, className, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Titolo con reveal parola per parola (maschera dal basso). Su mobile le righe vanno a capo liberamente. */
export function SplitReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  highlight = [],
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlight?: string[];
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const MotionTag = motion[Tag];
  const lines = text.split("\n");
  let index = 0;
  return (
    <MotionTag
      className={cn("block", className)}
      aria-label={text.replace(/\n/g, " ")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {lines.map((line, li) => (
        <span key={li} className="sm:block" aria-hidden>
          {line.split(" ").map((word) => {
            const i = index++;
            const isHighlight = highlight.includes(word.replace(/[.,!?]/g, ""));
            return (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <motion.span
                    className={cn("inline-block will-change-transform", isHighlight && "mark-bang [--mark-offset:0.14em] text-ink", wordClassName)}
                    variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
                    transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal y={16} blur={false} className={cn("mb-5 inline-flex", className)}>
      <span className="inline-flex items-center gap-2 rounded-full border border-bang/25 bg-bang/[0.07] px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bang-ink">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-bang" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-bang" />
        </span>
        {children}
      </span>
    </Reveal>
  );
}
