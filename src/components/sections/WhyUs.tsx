"use client";

import { Gauge, HeartHandshake, Rocket, ShieldCheck } from "lucide-react";
import { stats } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Qualità garantita",
    text: "Ogni progetto viene testato su tutti i dispositivi prima della consegna. Zero compromessi.",
  },
  {
    icon: Rocket,
    title: "Consegna rapida",
    text: "Rispettiamo le scadenze concordate. Il tuo progetto online nei tempi previsti, senza sorprese.",
  },
  {
    icon: Gauge,
    title: "Tecnologia moderna",
    text: "Next.js, React e cloud: prestazioni top, sicurezza e software pronto a crescere con te.",
  },
  {
    icon: HeartHandshake,
    title: "Supporto continuo",
    text: "Siamo sempre al tuo fianco per aggiornamenti, problemi tecnici o nuove funzionalità.",
  },
];

export function WhyUs() {
  return (
    <section id="chi-siamo" className="relative py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Perché Sceglierci</Eyebrow>
            <SplitReveal
              as="h2"
              text={"Numeri che parlano\nda soli."}
              highlight={["soli"]}
              className="font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white min-[400px]:text-4xl sm:text-6xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/55 sm:mt-6 sm:text-lg">
                Non facciamo solo siti web. Costruiamo strumenti digitali che portano risultati concreti e misurabili
                al tuo business.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-10 sm:gap-x-6 sm:gap-y-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i} className="border-l-2 border-bang pl-4 sm:pl-5">
                  <p className="whitespace-nowrap font-display text-[2.1rem] font-extrabold tracking-tight text-white min-[400px]:text-4xl sm:text-5xl">
                    <Counter to={s.value} />
                    <span className="text-bang">{s.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-white/45">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-12" : ""}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <span className="mb-5 grid h-12 w-12 sm:mb-10 sm:h-14 sm:w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-bang transition-all duration-500 group-hover:bg-bang group-hover:text-ink">
                      <r.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{r.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{r.text}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
