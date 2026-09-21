"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    time: "1 giorno",
    title: "Consulenza gratuita",
    text: "Analizziamo insieme il tuo business, gli obiettivi e i processi da semplificare. Una call conoscitiva senza impegno.",
  },
  {
    time: "3–7 giorni",
    title: "Strategia & Design",
    text: "Progettiamo architettura, esperienza utente e design. Presentiamo i mockup e li affiniamo fino alla perfezione.",
  },
  {
    time: "2–6 settimane",
    title: "Sviluppo",
    text: "Costruiamo sito, CRM o web app con tecnologie moderne: veloce, sicuro e ottimizzato per ogni dispositivo.",
  },
  {
    time: "2–3 giorni",
    title: "Test & Ottimizzazione",
    text: "Testiamo ogni funzionalità su ogni dispositivo e browser. Ottimizziamo velocità, SEO e accessibilità.",
  },
  {
    time: "Ongoing",
    title: "Lancio & Supporto",
    text: "Andiamo online e restiamo al tuo fianco: formazione del team, supporto post-lancio e manutenzione continua.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" className="relative py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-24">
          <Eyebrow>Come Lavoriamo</Eyebrow>
          <SplitReveal
            as="h2"
            text={"Il nostro metodo,\npasso dopo passo."}
            highlight={["metodo,"]}
            className="font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white min-[400px]:text-4xl sm:text-6xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 text-base text-white/55 sm:mt-6 sm:text-lg">
              Un processo collaudato per portare il tuo progetto dall&apos;idea alla realtà, con trasparenza totale in
              ogni fase.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mx-auto max-w-5xl">
          {/* linea verticale */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2" aria-hidden />
          <motion.div
            aria-hidden
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-bang via-bang to-bang/0 md:left-1/2"
            style={{ height: lineHeight }}
          />

          <ol className="space-y-6 md:space-y-4">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative grid md:grid-cols-2 md:gap-16">
                  {/* nodo */}
                  <motion.span
                    className="absolute left-5 top-6 z-10 grid h-10 w-10 -translate-x-1/2 md:h-12 md:w-12 place-items-center rounded-full border border-white/15 bg-ink font-display text-sm font-bold text-white md:left-1/2"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1, backgroundColor: "#FFD60A", color: "#050505", borderColor: "#FFD60A" }}
                    viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                    transition={{ duration: 0.4 }}
                  >
                    {i + 1}
                  </motion.span>

                  <Reveal
                    className={cn("pl-12 md:pl-0", right ? "md:col-start-2" : "md:text-right")}
                    y={40}
                  >
                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-2 p-5 transition-colors duration-500 hover:border-bang/30 sm:p-7",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -top-6 font-display text-[7rem] font-extrabold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-bang/[0.08]",
                          right ? "-right-2" : "-right-2 md:right-auto md:-left-2",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="relative inline-flex rounded-full bg-bang/10 px-3 py-1 font-mono text-[11px] font-medium text-bang">
                        {s.time}
                      </span>
                      <h3 className="relative mt-3 font-display text-xl font-bold tracking-tight text-white sm:mt-4 sm:text-3xl">
                        {s.title}
                      </h3>
                      <p className="relative mt-2.5 text-[15px] leading-relaxed text-white/50 sm:mt-3 sm:text-base">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
