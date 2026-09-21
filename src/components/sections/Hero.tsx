"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Bell, CheckCircle2, Check, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { offer, OFFER_PATH, stats } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORDS = ["Siti Web", "CRM", "Web App", "E-commerce", "Gestionali"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(255,214,10,0.13), transparent 60%)`;
  const tiltX = useTransform(sy, [0, 1], [6, -6]);
  const tiltY = useTransform(sx, [0, 1], [-8, 8]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="noise relative isolate overflow-hidden pb-12 pt-24 sm:pt-36 lg:min-h-[100svh] lg:pb-24"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* Sfondo */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-bang/10 blur-[90px] sm:h-[520px] sm:w-[900px] sm:blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        {/* Testo */}
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-xs text-white/70 backdrop-blur sm:mb-7"
          >
            <span className="rounded-full bg-bang px-2.5 py-1 font-bold text-ink">−{offer.discount}%</span>
            Sconto immediato in fattura<span className="hidden min-[400px]:inline">&nbsp;per chi aderisce</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.2rem,10.4vw,4.75rem)] lg:text-[clamp(3rem,5.6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                Creiamo
              </motion.span>
            </span>
            <span className="relative block h-[1.05em] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={WORDS[wordIndex]}
                  className="absolute left-0 top-0 block whitespace-nowrap text-bang"
                  initial={{ y: "100%", opacity: 0, rotateX: -60 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="sr-only">Siti Web, CRM, Web App, E-commerce e Gestionali</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              >
                che fanno{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">BANG!</span>
                  <motion.svg
                    aria-hidden
                    viewBox="0 0 300 30"
                    className="absolute -bottom-1 left-0 z-0 h-[0.28em] w-full"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M4 20 C 60 6, 140 4, 296 14"
                      stroke="#FFD60A"
                      strokeWidth="9"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
                    />
                  </motion.svg>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:mt-7 sm:text-lg"
          >
            Siamo l&apos;agenzia digitale che unisce <strong className="font-semibold text-white">design premium</strong> e{" "}
            <strong className="font-semibold text-white">software su misura</strong>: siti che convertono, CRM e web app
            che semplificano i processi e ti danno il controllo totale della tua azienda.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.65 } } }}
            className="mt-6 grid gap-2.5 text-[15px] text-white/70 sm:text-sm"
          >
            {[
              "Siti web ed e-commerce che trasformano i visitatori in clienti",
              "CRM e gestionali su misura per avere tutto sotto controllo",
              "Supporto continuo post-lancio incluso",
            ].map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bang/15">
                  <Check className="h-3 w-3 text-bang" strokeWidth={3} />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center sm:mt-9 [&_a]:w-full min-[400px]:[&_a]:w-auto [&>div]:w-full min-[400px]:[&>div]:w-auto"
          >
            <LinkButton href={OFFER_PATH}>Richiedi lo Sconto {offer.discount}%</LinkButton>
            <LinkButton href="#servizi" variant="ghost">
              Scopri i Servizi
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: visualY }} className="relative [perspective:1400px]">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
          >
            <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="[transform-style:preserve-3d]">
              <HeroDashboard />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Statistiche */}
      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8 lg:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative border-white/[0.07] px-5 py-6 sm:px-6 sm:py-7 [&:not(:last-child)]:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b"
            >
              <p className="whitespace-nowrap font-display text-[2rem] font-extrabold tracking-tight text-white min-[400px]:text-4xl sm:text-5xl">
                <Counter to={s.value} duration={2 + i * 0.2} />
                <span className="text-bang">{s.suffix}</span>
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/40">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- mockup dashboard animata ---------- */

function HeroDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const notifications = [
    { icon: Bell, title: "Nuovo lead dal sito", sub: "Rossi S.r.l. · Preventivo e-commerce" },
    { icon: CheckCircle2, title: "Pratica approvata", sub: "Sconto 60% applicato in fattura" },
    { icon: TrendingUp, title: "Obiettivo mensile raggiunto", sub: "Vendite online +18% vs mese scorso" },
  ];
  const n = notifications[tick % notifications.length];

  return (
    <div className="relative mx-auto max-w-[560px] pt-14 [transform-style:preserve-3d] sm:pt-0">
      {/* finestra principale */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,214,10,0.05)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-bang/80" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-white/40">
            app.tuaazienda.it/dashboard
          </span>
        </div>

        <div className="grid grid-cols-[1fr] min-[400px]:grid-cols-[52px_1fr]">
          <div className="hidden flex-col items-center gap-3 border-r border-white/[0.06] py-4 min-[400px]:flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-7 w-7 rounded-lg ${i === 0 ? "bg-bang" : "bg-white/[0.05]"}`}
              />
            ))}
          </div>

          <div className="space-y-3 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">Panoramica</p>
                <p className="whitespace-nowrap font-display text-base font-bold text-white sm:text-lg">Buongiorno, Marco 👋</p>
              </div>
              <span className="whitespace-nowrap rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                ● Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { l: "Fatturato", v: 128, s: "k€", d: "+24%" },
                { l: "Lead", v: 342, s: "", d: "+31%" },
                { l: "Ordini", v: 1280, s: "", d: "+12%" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
                  <p className="text-[10px] text-white/40">{k.l}</p>
                  <p className="font-display text-base font-bold text-white sm:text-lg">
                    <Counter to={k.v} duration={2.4} />
                    {k.s}
                  </p>
                  <p className="text-[10px] font-semibold text-bang">{k.d}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-white/70">Andamento vendite</p>
                <p className="font-mono text-[10px] text-white/35">Ultimi 12 mesi</p>
              </div>
              <svg viewBox="0 0 300 90" className="h-24 w-full" aria-hidden>
                <defs>
                  <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFD60A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFD60A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 45, 70].map((y) => (
                  <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
                ))}
                <motion.path
                  d="M0 78 C 25 74, 40 60, 60 62 S 95 48, 120 50 S 160 30, 185 36 S 225 18, 250 20 S 285 8, 300 6 L 300 90 L 0 90 Z"
                  fill="url(#hero-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                />
                <motion.path
                  d="M0 78 C 25 74, 40 60, 60 62 S 95 48, 120 50 S 160 30, 185 36 S 225 18, 250 20 S 285 8, 300 6"
                  fill="none"
                  stroke="#FFD60A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.9, ease: EASE }}
                />
                <motion.circle
                  cx="300"
                  cy="6"
                  r="4"
                  fill="#FFD60A"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ delay: 2.6, duration: 0.5 }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-5 items-end gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              {[55, 80, 40, 95, 70].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="flex h-14 w-full items-end">
                    <motion.div
                      className={`w-full rounded-md ${i === 3 ? "bg-bang" : "bg-white/15"}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1.2 + i * 0.08, ease: EASE }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-white/30">
                    {["Nuovi", "Contatt.", "Prev.", "Tratt.", "Chiusi"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* notifica flottante */}
      <div className="absolute left-0 top-0 w-[min(250px,68%)] sm:-left-10 sm:-top-12 sm:w-[250px]" style={{ transform: "translateZ(60px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tick % notifications.length}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass flex items-center gap-3 rounded-2xl p-3 shadow-2xl"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bang text-ink">
              <n.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-white">{n.title}</span>
              <span className="block truncate text-[10px] text-white/50">{n.sub}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* sticker sconto */}
      <motion.div
        className="absolute -right-2 -top-3 sm:-right-8 sm:-top-8"
        style={{ z: 90 }}
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.4 }}
      >
        <div className="relative grid h-24 w-24 place-items-center sm:h-32 sm:w-32">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
            <path
              d="M50 0l7 13 14-6 1 15 15 1-6 14 13 7-13 7 6 14-15 1-1 15-14-6-7 13-7-13-14 6-1-15-15-1 6-14L0 50l13-7-6-14 15-1 1-15 14 6z"
              fill="#FFD60A"
            />
          </svg>
          <div className="relative text-center leading-none text-ink">
            <p className="font-display text-lg font-extrabold sm:text-2xl">−{offer.discount}%</p>
            <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wider sm:text-[9px]">in fattura</p>
          </div>
        </div>
      </motion.div>

      {/* card task */}
      <motion.div
        className="glass absolute -bottom-8 right-2 hidden w-[210px] rounded-2xl p-3.5 shadow-2xl min-[400px]:block sm:-right-6"
        style={{ z: 50 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 0.6 },
          y: { delay: 2.2, duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">Attività di oggi</p>
        {["Controllo scadenze", "Invio preventivi", "Report settimanale"].map((t, i) => (
          <div key={t} className="flex items-center gap-2 py-1">
            <motion.span
              className="grid h-4 w-4 place-items-center rounded-[5px] border border-white/20"
              initial={{ backgroundColor: "rgba(255,214,10,0)" }}
              animate={{ backgroundColor: "rgba(255,214,10,1)", borderColor: "rgba(255,214,10,1)" }}
              transition={{ delay: 2.4 + i * 0.5, duration: 0.3 }}
            >
              <Check className="h-3 w-3 text-ink" strokeWidth={3.5} />
            </motion.span>
            <span className="text-[11px] text-white/70">{t}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
