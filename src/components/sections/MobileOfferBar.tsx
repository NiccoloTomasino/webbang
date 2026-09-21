"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { offer, OFFER_PATH } from "@/lib/site";
import { CountdownInline } from "@/components/offer/Countdown";

/** Barra fissa in basso su mobile/tablet con il rimando alla pagina dello sconto. */
export function MobileOfferBar() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.9));

  // nascosta quando è già visibile la sezione offerta o i contatti/footer
  useEffect(() => {
    const targets = ["iniziativa", "contatti"].map((id) => document.getElementById(id));
    const footer = document.querySelector("footer");
    const els = [...targets, footer].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBlocked(visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const show = pastHero && !blocked;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/85 py-2 pl-5 pr-2 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <span className="min-w-0 text-xs text-white/60">
              <span className="block font-semibold text-white">Sconto {offer.discount}% in fattura</span>
              <CountdownInline className="text-[11px]" />
            </span>
            <Link href={OFFER_PATH} className="shrink-0 rounded-full bg-bang px-5 py-3 text-sm font-bold text-ink">
              Richiedi
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
