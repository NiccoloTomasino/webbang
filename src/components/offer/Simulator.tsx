"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { offer } from "@/lib/site";
import { cn, formatEuro } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAY = 100 - offer.discount;
const MIN = 2000;
const MAX = 30000;

export function Simulator({ className }: { className?: string }) {
  const [price, setPrice] = useState(8000);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pay = Math.round((price * PAY) / 100);
  const save = price - pay;

  const paySpring = useSpring(useMotionValue(pay), { stiffness: 120, damping: 20 });
  const saveSpring = useSpring(useMotionValue(save), { stiffness: 120, damping: 20 });
  const payText = useTransform(paySpring, (v) => formatEuro(v));
  const saveText = useTransform(saveSpring, (v) => formatEuro(v));

  useEffect(() => {
    paySpring.set(pay);
    saveSpring.set(save);
  }, [pay, save, paySpring, saveSpring]);

  const pct = ((price - MIN) / (MAX - MIN)) * 100;

  return (
    <div ref={ref} className={cn("rounded-3xl border border-ink/10 bg-surface/70 p-5 backdrop-blur sm:p-7", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 sm:text-xs">Simula il tuo risparmio</p>
        <span className="shrink-0 rounded-full bg-bang px-2.5 py-1 text-[11px] font-bold text-ink">−{offer.discount}%</span>
      </div>

      <label htmlFor="sim-price" className="text-sm text-ink/65">
        Valore del progetto
      </label>
      <p className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" aria-live="polite">
        {formatEuro(price)}
      </p>

      <input
        id="sim-price"
        type="range"
        min={MIN}
        max={MAX}
        step={500}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/[0.07] accent-bang [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-bang [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#FFD60A] sm:[&::-webkit-slider-thumb]:h-6 sm:[&::-webkit-slider-thumb]:w-6"
        style={{ background: `linear-gradient(to right, #FFD60A ${pct}%, rgba(11,11,13,0.12) ${pct}%)` }}
      />
      <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/45">
        <span>{formatEuro(MIN)}</span>
        <span>{formatEuro(MAX)}+</span>
      </div>

      <div className="mt-5 flex h-12 overflow-hidden rounded-2xl text-xs font-bold sm:h-14 sm:text-sm">
        <motion.div
          className="flex items-center justify-center whitespace-nowrap bg-ink text-paper"
          initial={{ width: "50%" }}
          animate={{ width: inView ? `${PAY}%` : "50%" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {PAY}% Tu
        </motion.div>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden whitespace-nowrap bg-bang text-ink">
          <span aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_10px,rgba(0,0,0,0.06)_10px_20px)]" />
          <span className="relative">{offer.discount}% Sconto</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="min-w-0 rounded-2xl border border-ink/[0.09] bg-ink/[0.04] p-3.5 sm:p-4">
          <p className="text-xs text-ink/55">Paghi solo</p>
          <motion.p className="font-display text-xl font-extrabold tabular-nums text-ink min-[400px]:text-2xl sm:text-3xl">
            {payText}
          </motion.p>
        </div>
        <div className="min-w-0 rounded-2xl border border-bang/30 bg-bang/10 p-3.5 sm:p-4">
          <p className="text-xs text-bang-ink/80">Risparmi</p>
          <motion.p className="font-display text-xl font-extrabold tabular-nums text-bang-ink min-[400px]:text-2xl sm:text-3xl">
            {saveText}
          </motion.p>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink/45">
        Esempio indicativo. Lo sconto viene applicato in fattura solo a seguito dell&apos;approvazione della pratica.
      </p>
    </div>
  );
}
