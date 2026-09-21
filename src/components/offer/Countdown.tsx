"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOfferDeadline } from "./useOfferDeadline";

const EASE = [0.22, 1, 0.36, 1] as const;

const UNITS = [
  { key: "days", label: "Giorni" },
  { key: "hours", label: "Ore" },
  { key: "minutes", label: "Minuti" },
  { key: "seconds", label: "Secondi" },
] as const;

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inset-0 animate-ping rounded-full bg-bang" />
      <span className="relative h-2 w-2 rounded-full bg-bang" />
    </span>
  );
}

/** Countdown completo, in card. */
export function Countdown({ className }: { className?: string }) {
  const state = useOfferDeadline();

  return (
    <div className={cn("rounded-3xl border border-white/10 bg-ink/70 p-5 backdrop-blur sm:p-7", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="flex items-center gap-2 text-sm text-white/55">
          <LiveDot /> Adesioni aperte fino al
        </p>
        <p className="font-display text-base font-bold text-white sm:text-lg">
          {state ? state.label : " "}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {UNITS.map((u) => {
          const value = state ? state.remaining[u.key] : 0;
          return (
            <div key={u.key} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-1 py-3 text-center">
              <div className="relative h-8 overflow-hidden sm:h-10">
                <motion.p
                  key={value}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-[28px] font-extrabold leading-8 tabular-nums text-white sm:text-4xl sm:leading-10"
                >
                  {String(value).padStart(2, "0")}
                </motion.p>
              </div>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-white/35 sm:text-[10px]">{u.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-white/35">
        Le adesioni vengono raccolte a turni di 10 giorni.
      </p>
    </div>
  );
}

/** Versione compatta: "Scade tra 3g 12h 05m". */
export function CountdownInline({ className, prefix = "Scade tra" }: { className?: string; prefix?: string }) {
  const state = useOfferDeadline();
  const r = state?.remaining;
  return (
    <span className={cn("inline-flex items-center gap-2 tabular-nums", className)}>
      <LiveDot />
      <span>
        {prefix}{" "}
        <strong className="font-semibold text-white">
          {r ? `${r.days}g ${String(r.hours).padStart(2, "0")}h ${String(r.minutes).padStart(2, "0")}m` : "—"}
        </strong>
      </span>
    </span>
  );
}

/** Solo la data: "20 settembre". */
export function DeadlineLabel() {
  const state = useOfferDeadline();
  return <>{state ? state.label : "…"}</>;
}
