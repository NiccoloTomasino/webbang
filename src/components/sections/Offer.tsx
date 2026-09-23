"use client";

import { ArrowRight, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { offer, OFFER_PATH } from "@/lib/site";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Countdown } from "@/components/offer/Countdown";
import { Simulator } from "@/components/offer/Simulator";
import { CoverageCard, EligibilityCard, HowItWorks } from "@/components/offer/OfferInfo";

const PAY = 100 - offer.discount;

export function Offer() {
  return (
    <section id="iniziativa" className="relative overflow-hidden py-16 sm:py-28">
      <div aria-hidden className="absolute left-1/2 top-40 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-bang/[0.09] blur-[100px] sm:h-[700px] sm:w-[1100px] sm:blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-bang/20 bg-gradient-to-b from-paper-2 to-paper px-4 py-8 sm:rounded-[2.5rem] sm:p-10 lg:p-16">
          <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-6 select-none font-display text-[11rem] font-extrabold leading-none tracking-tighter text-stroke-bang opacity-[0.12] sm:-bottom-16 sm:text-[24rem]"
          >
            60%
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="px-1 sm:px-0">
              <Eyebrow>Iniziativa Esclusiva Webbang</Eyebrow>
              <SplitReveal
                as="h2"
                text={`Digitalizza la tua impresa.\nPaghi solo il ${PAY}%.`}
                highlight={[`${PAY}%`]}
                className="font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink min-[400px]:text-4xl sm:text-6xl"
              />
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:mt-6 sm:text-lg">
                  Webbang ha lanciato un&apos;iniziativa per accompagnare le imprese nella trasformazione digitale.
                  Se aderisci e la tua <span className="text-ink">pratica viene approvata</span> tramite
                  l&apos;apposito modulo, ti applichiamo uno{" "}
                  <span className="box-decoration-clone rounded bg-bang px-1.5 py-0.5 font-semibold text-ink">
                    sconto immediato in fattura del {offer.discount}%
                  </span>
                  . Tu paghi solo il restante {PAY}%. Nessun rimborso da attendere: lo sconto è già scalato in fattura.
                </p>
              </Reveal>

              <Reveal delay={0.3} className="mt-8 sm:mt-10">
                <HowItWorks />
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <Reveal delay={0.1}>
                <Simulator />
              </Reveal>
              <Reveal delay={0.2}>
                <Countdown />
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="relative mt-10 flex flex-col items-center gap-4 text-center sm:mt-14">
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <Link
                href={OFFER_PATH}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-bang px-6 py-4 font-display text-lg font-bold text-ink shadow-[0_20px_60px_-15px_rgba(255,214,10,0.6)] sm:inline-flex sm:w-auto sm:px-10 sm:py-5 sm:text-xl"
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ink/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <FileCheck2 className="relative hidden h-5 w-5 sm:block" />
                <span className="relative">Verifica la Tua Idoneità</span>
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <p className="text-sm text-ink/55">Compilazione gratuita · Risposta entro 24h · Nessun impegno</p>
          </Reveal>
        </div>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
          <Reveal>
            <EligibilityCard className="h-full" />
          </Reveal>
          <Reveal delay={0.1}>
            <CoverageCard className="h-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
