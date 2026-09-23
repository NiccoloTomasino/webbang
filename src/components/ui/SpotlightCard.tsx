"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card con bagliore che segue il mouse + leggero tilt 3D. */
export function SpotlightCard({
  children,
  className,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 150, damping: 20 });
  const ry = useSpring(0, { stiffness: 150, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,214,10,0.22), transparent 45%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(245,180,0,0.85), transparent 60%)`;

  return (
    <motion.div
      className={cn(
        "group relative rounded-3xl bg-surface p-px shadow-card transition-shadow duration-500 hover:shadow-card-lg [transform-style:preserve-3d]",
        className,
      )}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        if (tilt) {
          rx.set(((py / r.height) - 0.5) * -6);
          ry.set(((px / r.width) - 0.5) * 6);
        }
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
        rx.set(0);
        ry.set(0);
      }}
    >
      {/* bordo luminoso */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: border }}
      />
      <div className="absolute inset-0 rounded-3xl border border-ink/[0.08]" aria-hidden />
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}
