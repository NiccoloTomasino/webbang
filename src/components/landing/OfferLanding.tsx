"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Database,
  LayoutDashboard,
  Mail,
  MonitorSmartphone,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { offer, site } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { DiscountForm } from "@/components/DiscountForm";
import { Logo } from "@/components/ui/Logo";
import { Eyebrow, Reveal } from "@/components/ui/Reveal";
import { Countdown, CountdownInline, DeadlineLabel } from "@/components/offer/Countdown";
import { Simulator } from "@/components/offer/Simulator";
import { CoverageCard, EligibilityCard, HowItWorks } from "@/components/offer/OfferInfo";
import { ReviewCard } from "@/components/ReviewCard";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAY = 100 - offer.discount;

export function OfferLanding() {
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const heroCtaVisible = useInView(heroCtaRef);
  const formVisible = useInView(formRef, { margin: "0px 0px -30% 0px" });
  const showStickyBar = !heroCtaVisible && !formVisible;

  return (
    <>
      <LandingHeader />

      <main className="overflow-x-clip">
        {/* ---------- HERO ---------- */}
        <section className="noise relative isolate overflow-hidden pb-14 pt-6 sm:pb-20 sm:pt-10">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="bg-grid mask-radial absolute inset-0" />
            <div className="absolute -top-32 left-1/2 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-bang/15 blur-[90px] sm:h-[520px] sm:w-[900px] sm:blur-[140px]" />
          </div>

          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.05] py-1.5 pl-1.5 pr-3.5 text-xs text-ink/75 sm:text-sm"
              >
                <span className="shrink-0 rounded-full bg-bang px-2.5 py-1 text-xs font-bold text-ink">−{offer.discount}%</span>
                <span className="truncate">Iniziativa Webbang · sconto in fattura</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="font-display text-[2.35rem] font-extrabold leading-[1] tracking-[-0.035em] text-ink min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[4.1rem]"
              >
                Il tuo progetto digitale con il{" "}
                <span className="relative inline-block text-ink">
                  {offer.discount}% di sconto
                  <motion.svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-3 w-full">
                    <motion.path
                      d="M3 14 C 70 4, 180 2, 297 10"
                      stroke="#FFD60A"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                    />
                  </motion.svg>
                </span>{" "}
                in fattura.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg"
              >
                Siti web, e-commerce, CRM e web app su misura. Aderisci all&apos;iniziativa: se la tua pratica viene
                approvata applichiamo subito uno <strong className="font-semibold text-ink">sconto del {offer.discount}% direttamente in fattura</strong>.
                Tu paghi solo il {PAY}%.
              </motion.p>

              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
                className="mt-6 grid gap-2.5 text-[15px] text-ink/75"
              >
                {["Richiesta gratuita e senza impegno", "Risposta entro 24 ore lavorative", "Sconto applicato subito, nessun rimborso da attendere"].map((t) => (
                  <motion.li
                    key={t}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bang">
                      <Check className="h-3 w-3 text-ink" strokeWidth={3.5} />
                    </span>
                    {t}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                ref={heroCtaRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#modulo"
                  className="group flex items-center justify-center gap-2 rounded-full bg-bang px-7 py-4 text-base font-bold text-ink shadow-[0_15px_50px_-15px_rgba(255,214,10,0.7)] transition hover:bg-bang-deep"
                >
                  Compila il modulo
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#come-funziona"
                  className="flex items-center justify-center rounded-full border border-ink/12 px-7 py-4 text-base font-semibold text-ink transition hover:border-bang hover:text-bang-ink"
                >
                  Come funziona
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-5 text-center text-sm text-ink/60 sm:text-left"
              >
                <CountdownInline prefix="Adesioni aperte ancora per" />
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="flex flex-col gap-3"
            >
              <PriceCard />
              <Countdown className="hidden lg:block" />
            </motion.div>
          </div>
        </section>

        {/* ---------- COME FUNZIONA ---------- */}
        <section id="come-funziona" className="scroll-mt-6 py-12 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionTitle eyebrow="Come funziona" title="Tre passaggi, zero complicazioni." />
            <Reveal delay={0.1}>
              <HowItWorks large />
            </Reveal>
          </div>
        </section>

        {/* ---------- MODULO ---------- */}
        <section id="modulo" ref={formRef} className="relative scroll-mt-4 py-12 sm:py-20">
          <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[400px] max-w-3xl rounded-full bg-bang/[0.07] blur-[100px]" />
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="px-1 sm:px-0 lg:sticky lg:top-10 lg:self-start">
              <Eyebrow>Modulo di adesione</Eyebrow>
              <h2 className="font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
                Richiedi lo sconto in <span className="text-bang-ink">2 minuti</span>.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/65">
                Raccontaci chi sei e cosa vorresti realizzare. Verifichiamo la pratica e ti ricontattiamo noi.
              </p>

              <ol className="mt-7 hidden space-y-4 lg:block">
                {[
                  ["Invii il modulo", "Ricevi subito la conferma a schermo."],
                  ["Ti ricontattiamo entro 24 ore", "Verifichiamo insieme requisiti e obiettivi."],
                  ["Preventivo con lo sconto applicato", `Se la pratica è approvata, in fattura paghi solo il ${PAY}%.`],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-bang/40 font-mono text-xs text-bang-ink">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{t}</span>
                      <span className="block text-sm text-ink/55">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-7 hidden rounded-2xl border border-ink/[0.08] bg-surface p-4 text-sm text-ink/65 lg:block">
                Preferisci scriverci?{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-bang-ink hover:underline">
                  {site.email}
                </a>
              </div>
            </div>

            <Reveal y={40}>
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface shadow-[0_40px_120px_-30px_rgba(255,214,10,0.25)] sm:rounded-3xl">
                <DiscountForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- DETTAGLI ---------- */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="px-1 sm:px-0">
              <SectionTitle eyebrow="Tutti i dettagli" title="Cosa puoi realizzare con lo sconto." />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[
                { icon: MonitorSmartphone, t: "Sito web", d: "Vetrina moderna e veloce, pensata per portarti contatti." },
                { icon: ShoppingBag, t: "E-commerce", d: "Negozio online con pagamenti e gestione ordini." },
                { icon: Database, t: "CRM su misura", d: "Clienti, preventivi e vendite sotto controllo." },
                { icon: LayoutDashboard, t: "Web app gestionale", d: "Processi, scadenze e controlli in un'unica piattaforma." },
              ].map((s, i) => (
                <Reveal key={s.t} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-ink/[0.08] bg-surface p-4 sm:p-6">
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-bang text-ink sm:mb-6 sm:h-12 sm:w-12">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold leading-tight text-ink sm:text-xl">{s.t}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/60 sm:mt-2 sm:text-sm">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
              <Reveal className="lg:row-span-1">
                <Simulator className="h-full bg-surface" />
              </Reveal>
              <Reveal delay={0.08}>
                <EligibilityCard className="h-full" />
              </Reveal>
              <Reveal delay={0.16}>
                <CoverageCard className="h-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- RECENSIONI ---------- */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionTitle eyebrow="Chi ha già aderito" title="Imprese come la tua, già online." />
          </div>
          <div className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:px-8 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {[REVIEWS[0], REVIEWS[7], REVIEWS[2]].map((r) => (
              <ReviewCard key={r.name} review={r} className="w-[85vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none" />
            ))}
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <SectionTitle eyebrow="Domande frequenti" title="Hai qualche dubbio?" center />
            <Faq />
          </div>
        </section>

        {/* ---------- CTA FINALE ---------- */}
        <section className="px-3 pb-12 pt-4 sm:px-6 sm:pb-20">
          <Reveal>
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-bang px-6 py-12 text-center text-ink sm:rounded-[2.5rem] sm:py-20">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border-[24px] border-ink/[0.06] sm:h-72 sm:w-72 sm:border-[40px]" />
              <Sparkles className="mx-auto mb-4 h-7 w-7" />
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Adesioni aperte fino al <DeadlineLabel />.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-ink/70 sm:text-lg">
                Bastano 2 minuti. Nessun costo e nessun impegno: ti ricontattiamo entro 24 ore.
              </p>
              <a
                href="#modulo"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-base font-bold text-ink transition hover:text-bang-ink sm:w-auto"
              >
                Compila il modulo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <LandingFooter />
      <StickyBar show={showStickyBar} />
    </>
  );
}

/* ---------- componenti di pagina ---------- */

function LandingHeader() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      <Link href="/" aria-label="Webbang — vai al sito">
        <Logo />
      </Link>
      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-ink/60 md:inline">
          <CountdownInline />
        </span>
        <a
          href={`mailto:${site.email}`}
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink/75 transition hover:border-bang hover:text-bang-ink sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
          aria-label={`Scrivici a ${site.email}`}
        >
          <Mail className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Hai domande? Scrivici</span>
        </a>
        {site.phone && (
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            aria-label="Chiamaci"
            className="grid h-10 w-10 place-items-center rounded-full bg-bang text-ink"
          >
            <Phone className="h-4 w-4" />
          </a>
        )}
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, center = false }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={cn("mb-7 sm:mb-10", center && "text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

function PriceCard() {
  const rows: { label: string; value: ReactNode; strike?: boolean; accent?: boolean }[] = [
    { label: "Prezzo del progetto", value: "100%", strike: true },
    { label: "Sconto in fattura", value: `−${offer.discount}%`, accent: true },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-bang/25 bg-gradient-to-b from-paper-2 to-paper p-5 sm:p-7">
      <div aria-hidden className="pointer-events-none absolute -right-4 -top-8 font-display text-[9rem] font-extrabold leading-none text-stroke-bang opacity-20 sm:text-[11rem]">
        %
      </div>
      <p className="relative mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 sm:text-xs">Come si calcola</p>
      <div className="relative space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15, ease: EASE }}
            className="flex items-center justify-between rounded-2xl border border-ink/[0.08] bg-ink/[0.04] px-4 py-3"
          >
            <span className="text-sm text-ink/70">{r.label}</span>
            <span
              className={cn(
                "font-display text-xl font-bold",
                r.strike && "text-ink/55 line-through decoration-bang decoration-2",
                r.accent && "text-bang-ink",
              )}
            >
              {r.value}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 16 }}
          className="flex items-center justify-between rounded-2xl bg-bang px-4 py-4 text-ink"
        >
          <span className="text-sm font-semibold">Paghi solo</span>
          <span className="font-display text-4xl font-extrabold tracking-tight">{PAY}%</span>
        </motion.div>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "Quanto costa fare la richiesta?",
    a: "Niente. La compilazione del modulo è gratuita e non ti impegna in alcun modo.",
  },
  {
    q: "Come viene applicato lo sconto del 60%?",
    a: `Se la pratica viene approvata, lo sconto viene applicato direttamente in fattura: sul preventivo concordato paghi solo il ${100 - offer.discount}%. Non ci sono rimborsi da attendere.`,
  },
  {
    q: "Quanto tempo serve per avere una risposta?",
    a: "Ti ricontattiamo entro 24 ore lavorative per verificare insieme i requisiti e capire di cosa hai bisogno.",
  },
  {
    q: "Per quali progetti vale lo sconto?",
    a: "Per la realizzazione di siti web, e-commerce, CRM, web app gestionali, automazioni e integrazioni, comprese SEO base e formazione all'uso.",
  },
  {
    q: "Chi può aderire?",
    a: "Imprese con sede legale o operativa in Italia, micro, piccole e medie imprese e liberi professionisti con Partita IVA attiva.",
  },
  {
    q: "E se la pratica non viene approvata?",
    a: "Non hai nessun costo e nessun obbligo: sei libero di decidere se procedere comunque oppure no.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2.5">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.04} y={16} blur={false}>
            <div className={cn("rounded-2xl border bg-surface transition-colors", isOpen ? "border-bang/30" : "border-ink/[0.08]")}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className="text-[15px] font-semibold text-ink sm:text-base">{f.q}</span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen ? "rotate-45 border-bang bg-bang text-ink" : "border-ink/12 text-ink/70",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/65 sm:px-6">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-ink/[0.08] pb-[calc(6rem+env(safe-area-inset-bottom))] pt-8 sm:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-ink/55 sm:flex-row sm:px-8">
        <Link href="/">
          <Logo className="scale-90" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/" className="transition hover:text-bang-ink">
            Scopri Webbang
          </Link>
          <Link href="/privacy" className="transition hover:text-bang-ink">
            Privacy
          </Link>
          <a href={`mailto:${site.email}`} className="transition hover:text-bang-ink">
            {site.email}
          </a>
        </div>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}

function StickyBar({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="flex items-center justify-between gap-3 rounded-full border border-ink/10 bg-surface/85 py-2 pl-5 pr-2 shadow-[0_-10px_40px_-10px_rgba(11,11,13,0.25)] backdrop-blur-xl">
            <span className="min-w-0 text-xs text-ink/70">
              <span className="block font-semibold text-ink">Sconto {offer.discount}% in fattura</span>
              <CountdownInline className="text-[11px]" />
            </span>
            <a href="#modulo" className="shrink-0 rounded-full bg-bang px-5 py-3 text-sm font-bold text-ink">
              Compila
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
