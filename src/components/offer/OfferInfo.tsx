"use client";

import { motion } from "motion/react";
import { Check, ClipboardCheck, FileCheck2, Receipt } from "lucide-react";
import { offer } from "@/lib/site";
import { cn } from "@/lib/utils";

export const ELIGIBILITY = [
  "Imprese con sede legale o operativa in Italia",
  "Micro, piccole e medie imprese (PMI)",
  "Liberi professionisti con P.IVA attiva",
  "Pratica approvata tramite il modulo di adesione",
];

export const COVERAGE = [
  "Progettazione e design di siti web ed e-commerce",
  "Sviluppo di CRM e web app gestionali su misura",
  "Automazioni e integrazioni con i tuoi strumenti",
  "SEO base, ottimizzazione performance e formazione",
];

export const STEPS = [
  { icon: ClipboardCheck, title: "Compila il modulo", text: "2 minuti, gratis e senza impegno" },
  { icon: FileCheck2, title: "Verifichiamo la pratica", text: "Risposta entro 24 ore lavorative" },
  { icon: Receipt, title: `−${offer.discount}% in fattura`, text: "Sconto applicato subito, niente attese" },
];

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("mt-5 space-y-3 sm:mt-6", className)}>
      {items.map((t, i) => (
        <motion.li
          key={t}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.07 }}
          className="flex items-start gap-3 text-[15px] leading-snug text-white/75 sm:text-base"
        >
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bang">
            <Check className="h-3 w-3 text-ink" strokeWidth={3.5} />
          </span>
          {t}
        </motion.li>
      ))}
    </ul>
  );
}

export function EligibilityCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-white/[0.07] bg-ink-2 p-6 sm:p-9", className)}>
      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Chi può aderire?</h3>
      <p className="mt-2 text-sm text-white/45">
        L&apos;iniziativa è riservata alle imprese e ai professionisti che superano la verifica della pratica.
      </p>
      <CheckList items={ELIGIBILITY} />
    </div>
  );
}

export function CoverageCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-white/[0.07] bg-ink-2 p-6 sm:p-9", className)}>
      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Lo sconto si applica a</h3>
      <p className="mt-2 text-sm text-white/45">Su tutti i servizi di realizzazione del progetto digitale.</p>
      <CheckList items={COVERAGE} />
    </div>
  );
}

export function HowItWorks({ className, large = false }: { className?: string; large?: boolean }) {
  return (
    <ol className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          className={cn(
            "relative flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:block",
            large && "sm:p-6",
          )}
        >
          <div className="flex shrink-0 items-center justify-between sm:mb-3">
            <span
              className={cn(
                "grid place-items-center rounded-xl bg-bang/15 text-bang",
                large ? "h-11 w-11" : "h-10 w-10 sm:h-9 sm:w-9",
              )}
            >
              <s.icon className="h-4 w-4" />
            </span>
            <span className="hidden font-mono text-xs text-white/25 sm:inline">0{i + 1}</span>
          </div>
          <div className="min-w-0">
            <p className={cn("font-semibold text-white", large ? "text-base sm:text-lg" : "text-sm")}>{s.title}</p>
            <p className="mt-0.5 text-xs text-white/45 sm:mt-1">{s.text}</p>
          </div>
          <span className="ml-auto font-mono text-xs text-white/25 sm:hidden">0{i + 1}</span>
        </li>
      ))}
    </ol>
  );
}
