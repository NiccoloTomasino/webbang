"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { offer, OFFER_PATH } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";

export function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [80, 40]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  return (
    <section ref={ref} className="px-3 py-12 sm:px-6 sm:py-20">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative mx-auto max-w-[1400px] overflow-hidden bg-bang px-5 py-14 text-ink sm:px-12 sm:py-28"
      >
        <motion.div
          aria-hidden
          style={{ x: x1 }}
          className="pointer-events-none absolute -top-6 left-0 whitespace-nowrap font-display text-[9rem] font-extrabold uppercase leading-none tracking-tighter text-ink/[0.06] sm:text-[14rem]"
        >
          Bang! Bang! Bang! Bang!
        </motion.div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">Inizia oggi</p>
          <h2 className="font-display text-[2.1rem] font-extrabold leading-[1] tracking-[-0.035em] min-[400px]:text-4xl sm:text-7xl">
            Pronto a far fare BANG alla tua impresa?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-ink/70 sm:mt-6 sm:text-lg">
            Consulenza gratuita e preventivo senza impegno. Aderisci all&apos;iniziativa e, se la pratica viene approvata,
            risparmi il {offer.discount}% direttamente in fattura.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center sm:mt-10 [&>div]:w-full min-[400px]:[&>div]:w-auto [&_a]:w-full">
            <LinkButton variant="dark" href={OFFER_PATH}>
              Richiedi lo Sconto {offer.discount}%
            </LinkButton>
            <LinkButton
              href="#contatti"
              variant="ghost"
              className="border-ink/25 text-ink hover:border-ink [&>span:first-child]:bg-ink [&>span:last-child]:group-hover:text-bang"
            >
              Scrivici ora
            </LinkButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
