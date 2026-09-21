"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Cursor } from "@/components/ui/Cursor";

export function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!reduced && (
        <ReactLenis
          root
          options={{ lerp: 0.1, anchors: { offset: -80 }, smoothWheel: true }}
        />
      )}
      <ScrollReset />
      {children}
      <Cursor />
    </MotionConfig>
  );
}

/** Al cambio pagina riporta lo scroll in cima (Lenis mantiene la posizione precedente). */
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}
