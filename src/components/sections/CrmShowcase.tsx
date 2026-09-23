"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import {
  AlertTriangle,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  Layers,
  Mail,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { OFFER_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES: { icon: LucideIcon; title: string; text: string; panel: () => ReactNode; url: string }[] = [
  {
    icon: Users,
    title: "Clienti e vendite in un'unica vista",
    text: "Anagrafiche, trattative, preventivi e storico contatti centralizzati. Sai sempre a che punto è ogni opportunità e chi deve fare cosa.",
    panel: PipelinePanel,
    url: "crm/pipeline",
  },
  {
    icon: Workflow,
    title: "Processi che vanno da soli",
    text: "Automatizziamo le attività ripetitive: documenti generati in automatico, notifiche al team, email ai clienti, sincronizzazione con i tuoi strumenti.",
    panel: AutomationPanel,
    url: "automazioni",
  },
  {
    icon: ShieldCheck,
    title: "Controlli e scadenze sotto controllo",
    text: "Checklist, verifiche qualità, scadenze e approvazioni con avvisi automatici. Niente più post-it, nessuna scadenza dimenticata.",
    panel: ControlsPanel,
    url: "controlli",
  },
  {
    icon: BarChart3,
    title: "Decisioni con dati in tempo reale",
    text: "Dashboard chiare con i numeri che contano davvero: fatturato, marginalità, produttività. Prendi decisioni basate sui dati, non sulle sensazioni.",
    panel: ReportPanel,
    url: "report",
  },
];

export function CrmShowcase() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(FEATURES.length - 1, Math.max(0, Math.floor(v * FEATURES.length)));
    setActive(i);
  });

  const Panel = FEATURES[active].panel;

  return (
    <section id="software" className="relative overflow-x-clip py-16 sm:py-28">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-24">
          <Eyebrow>CRM & Web App su Misura</Eyebrow>
          <SplitReveal
            as="h2"
            text={"Tutta la tua azienda.\nSotto controllo. In un click."}
            highlight={["controllo"]}
            className="font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink min-[400px]:text-4xl sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/65 sm:mt-7 sm:text-lg">
              Creiamo CRM e web app che <span className="text-ink">semplificano i processi</span>,{" "}
              <span className="text-ink">automatizzano i controlli</span> e rendono la tua azienda{" "}
              <span className="text-bang-ink">più efficiente</span>. Software costruito intorno a come lavori tu.
            </p>
          </Reveal>
        </div>

        {/* Desktop: sticky scroll */}
        <div ref={stickyRef} className="relative hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="flex min-h-[70vh] items-center">
                <motion.div
                  animate={{ opacity: active === i ? 1 : 0.25, x: active === i ? 0 : -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="mb-5 flex items-center gap-4">
                    <span
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-500",
                        active === i ? "bg-bang text-ink" : "bg-ink/[0.05] text-ink/60",
                      )}
                    >
                      <f.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm text-ink/45">0{i + 1} / 0{FEATURES.length}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink xl:text-4xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/65">{f.text}</p>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-[calc(50vh-250px)] h-[500px]">
              <div className="absolute -inset-10 rounded-full bg-bang/10 blur-[100px]" aria-hidden />
              <AppWindow url={FEATURES[active].url} progress={active}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="h-full"
                  >
                    <Panel />
                  </motion.div>
                </AnimatePresence>
              </AppWindow>
            </div>
          </div>
        </div>

        {/* Mobile/tablet: blocchi in sequenza */}
        <div className="space-y-14 lg:hidden">
          {FEATURES.map((f, i) => {
            const P = f.panel;
            return (
              <Reveal key={f.title}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bang text-ink">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-ink/45">0{i + 1} / 0{FEATURES.length}</span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{f.title}</h3>
                <p className="mb-6 mt-3 leading-relaxed text-ink/65">{f.text}</p>
                <div className="h-[440px] sm:h-[460px]">
                  <AppWindow url={f.url} progress={i}>
                    <P />
                  </AppWindow>
                </div>
              </Reveal>
            );
          })}
        </div>

        <BeforeAfter />

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-ink/65">Anche i CRM e le web app rientrano nell&apos;iniziativa sconto 60%.</p>
          <LinkButton href={OFFER_PATH}>Voglio semplificare la mia azienda</LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- finestra app ---------- */

function AppWindow({ children, url, progress }: { children: ReactNode; url: string; progress: number }) {
  const nav = [Gauge, Users, Workflow, ShieldCheck, BarChart3];
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_40px_100px_-35px_rgba(11,11,13,0.35)]">
      <div className="flex items-center gap-2 border-b border-ink/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
        <span className="h-2.5 w-2.5 rounded-full bg-bang/80" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-ink/[0.05] px-3 py-1 font-mono text-[10px] text-ink/55 sm:ml-3 sm:text-[11px]">
          gestionale.tuaazienda.it/<span className="text-bang-ink">{url}</span>
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[56px_1fr]">
        <div className="hidden flex-col items-center gap-2.5 border-r border-ink/[0.08] py-4 sm:flex">
          {nav.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-xl transition-colors duration-500",
                i === progress + 1 ? "bg-bang text-ink" : "text-ink/45",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>
        <div className="min-h-0 overflow-hidden p-3.5 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

function PanelTitle({ title, sub, right }: { title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
      <div className="min-w-0">
        <p className="font-display text-base font-bold leading-tight text-ink sm:text-lg">{title}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-ink/55 sm:text-xs">{sub}</p>
      </div>
      {right}
    </div>
  );
}

/* ---------- pannelli ---------- */

function PipelinePanel() {
  const cols = [
    { name: "Nuovi lead", color: "bg-ink/25", items: [["Bianchi S.p.A.", "4.500 €"], ["Studio Verdi", "2.200 €"], ["Gallo Impianti", "7.800 €"]] },
    { name: "Preventivo", color: "bg-sky-400", items: [["Hotel Aurora", "12.000 €"], ["Ferri & Co.", "3.400 €"]] },
    { name: "Trattativa", color: "bg-orange-400", items: [["Autoriparazioni Sole", "5.900 €"]] },
    { name: "Vinti", color: "bg-bang", items: [["Pasticceria Neri", "3.100 €"], ["Logistica Po", "18.500 €"]] },
  ];
  return (
    <div className="flex h-full flex-col">
      <PanelTitle
        title="Pipeline vendite"
        sub="8 opportunità attive · 57.400 € in trattativa"
        right={<span className="shrink-0 whitespace-nowrap rounded-full bg-bang px-3 py-1 text-[11px] font-bold text-ink">+ Nuovo</span>}
      />
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2.5 sm:grid-cols-4">
        {cols.map((c, ci) => (
          <div key={c.name} className={cn("rounded-2xl bg-ink/[0.035] p-2.5", ci > 1 && "max-sm:hidden")}>
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", c.color)} />
              <p className="truncate text-[11px] font-semibold text-ink/70">{c.name}</p>
            </div>
            <div className="space-y-2">
              {c.items.map(([n, v], i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + ci * 0.1 + i * 0.07, ease: EASE }}
                  className={cn(
                    "rounded-xl border p-2.5",
                    ci === 3 ? "border-bang/40 bg-bang/10" : "border-ink/[0.08] bg-paper-2",
                  )}
                >
                  <p className="truncate text-[11px] font-semibold text-ink">{n}</p>
                  <p className={cn("mt-0.5 text-[10px]", ci === 3 ? "text-bang-ink" : "text-ink/55")}>{v}</p>
                  <div className="mt-2 flex -space-x-1.5">
                    {[0, 1].slice(0, (i % 2) + 1).map((a) => (
                      <span key={a} className="h-4 w-4 rounded-full border border-ink/10 bg-gradient-to-br from-ink/25 to-ink/8" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationPanel() {
  const steps: { icon: LucideIcon; label: string; sub: string }[] = [
    { icon: ShoppingCart, label: "Nuovo ordine ricevuto", sub: "Trigger · e-commerce" },
    { icon: FileText, label: "Genera fattura e DDT", sub: "Automatico · 0,4s" },
    { icon: Package, label: "Avvisa il magazzino", sub: "Notifica al team" },
    { icon: Mail, label: "Email di conferma al cliente", sub: "Con tracking spedizione" },
  ];
  return (
    <div className="flex h-full flex-col">
      <PanelTitle
        title="Flusso: gestione ordini"
        sub="Eseguito 1.284 volte questo mese"
        right={
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Attivo
          </span>
        }
      />
      <div className="relative flex-1">
        <div className="absolute bottom-6 left-[20px] top-6 w-px bg-ink/[0.07] sm:left-[22px]" aria-hidden />
        <motion.div
          aria-hidden
          className="absolute left-[20px] top-6 w-px origin-top bg-bang sm:left-[22px]"
          initial={{ height: 0 }}
          animate={{ height: "calc(100% - 48px)" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        />
        <div className="relative space-y-2 sm:space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.35, ease: EASE }}
              className="flex items-center gap-3"
            >
              <motion.span
                className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border sm:h-11 sm:w-11"
                initial={{ backgroundColor: "#ffffff", borderColor: "rgba(11,11,13,0.12)", color: "rgba(11,11,13,0.55)" }}
                animate={{ backgroundColor: "#FFD60A", borderColor: "#FFD60A", color: "#0b0b0d" }}
                transition={{ delay: 0.45 + i * 0.35, duration: 0.3 }}
              >
                <s.icon className="h-4 w-4" />
              </motion.span>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-ink/[0.08] bg-ink/[0.04] px-3 py-2 sm:px-3.5 sm:py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink">{s.label}</p>
                  <p className="truncate text-[10px] text-ink/55">{s.sub}</p>
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.35, type: "spring", stiffness: 400 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-bang-ink" />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="mt-3 flex items-center gap-2 rounded-xl bg-bang/10 px-3 py-2 text-[11px] leading-snug text-bang-ink sm:mt-4 sm:px-3.5 sm:py-2.5"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" /> 42 ore di lavoro manuale risparmiate questo mese
        </motion.div>
      </div>
    </div>
  );
}

function ControlsPanel() {
  const rows = [
    { label: "Verifica qualità lotto #2291", owner: "Produzione", status: "ok" },
    { label: "Rinnovo certificazione ISO", owner: "Amministrazione", status: "warn" },
    { label: "Manutenzione mezzi aziendali", owner: "Logistica", status: "ok" },
    { label: "Scadenza pagamento fornitore", owner: "Contabilità", status: "late" },
    { label: "Approvazione ordine > 5.000 €", owner: "Direzione", status: "wait" },
  ] as const;
  const badge = {
    ok: { t: "Completato", c: "bg-emerald-500/12 text-emerald-700", i: Check },
    warn: { t: "Tra 5 giorni", c: "bg-bang/15 text-bang-ink", i: Clock },
    late: { t: "Scaduto", c: "bg-red-500/12 text-red-700", i: AlertTriangle },
    wait: { t: "Da approvare", c: "bg-sky-500/12 text-sky-700", i: Layers },
  };
  return (
    <div className="flex h-full flex-col">
      <PanelTitle
        title="Controlli & scadenze"
        sub="Settimana corrente · 92% completato"
        right={
          <div className="relative h-11 w-11">
            <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(11,11,13,0.1)" strokeWidth="4" />
              <motion.circle
                cx="18" cy="18" r="15" fill="none" stroke="#FFD60A" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 0.92 }} transition={{ duration: 1.2, ease: EASE }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-ink">92%</span>
          </div>
        }
      />
      <div className="space-y-1.5 sm:space-y-2">
        {rows.map((r, i) => {
          const b = badge[r.status];
          return (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 sm:gap-3 sm:py-2.5",
                r.status === "late" ? "border-red-500/30 bg-red-500/[0.06]" : "border-ink/[0.08] bg-ink/[0.035]",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">{r.label}</p>
                <p className="text-[10px] text-ink/55">{r.owner}</p>
              </div>
              <span className={cn("flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold", b.c)}>
                <b.i className="h-3 w-3" /> {b.t}
              </span>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 flex items-center gap-2 rounded-xl border border-bang/30 bg-paper-2 px-3.5 py-2.5 text-[11px] text-ink/75"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-bang" />
          <span className="relative h-2 w-2 rounded-full bg-bang" />
        </span>
        Avviso inviato automaticamente al responsabile
      </motion.div>
    </div>
  );
}

function ReportPanel() {
  const bars = [42, 55, 48, 66, 72, 61, 80, 76, 88, 94, 86, 100];
  const months = ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"];
  return (
    <div className="flex h-full flex-col">
      <PanelTitle title="Report direzionale" sub="Aggiornato in tempo reale" />
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          { l: "Fatturato", v: "1,24 M€", d: "+18%" },
          { l: "Margine", v: "32,4%", d: "+4,1pt" },
          { l: "Produttività", v: "+27%", d: "vs 2025" },
        ].map((k, i) => (
          <motion.div
            key={k.l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={cn("rounded-xl p-3", i === 0 ? "bg-bang text-ink" : "border border-ink/[0.08] bg-ink/[0.04]")}
          >
            <p className={cn("text-[10px]", i === 0 ? "text-ink/60" : "text-ink/55")}>{k.l}</p>
            <p className={cn("font-display text-base font-bold sm:text-lg", i === 0 ? "text-ink" : "text-ink")}>{k.v}</p>
            <p className={cn("text-[10px] font-semibold", i === 0 ? "text-ink/70" : "text-bang-ink")}>{k.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-ink/[0.08] bg-ink/[0.03] p-3">
        <p className="mb-2 text-[11px] font-semibold text-ink/70">Fatturato mensile</p>
        <div className="flex min-h-0 flex-1 items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <motion.div
                className={cn("w-full rounded-t-md", i === bars.length - 1 ? "bg-bang" : "bg-ink/12")}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.2 + i * 0.04, duration: 0.8, ease: EASE }}
              />
              <span className="font-mono text-[9px] text-ink/45">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- prima / dopo ---------- */

function BeforeAfter() {
  const before = [
    "Fogli Excel sparsi e versioni diverse",
    "Informazioni perse tra email e WhatsApp",
    "Controlli manuali e scadenze dimenticate",
    "Nessuna visione d'insieme sui numeri",
  ];
  const after = [
    "Un'unica piattaforma, accessibile ovunque",
    "Processi automatici e team allineato",
    "Avvisi e controlli che lavorano per te",
    "Dashboard con i dati in tempo reale",
  ];
  return (
    <div className="mt-24 grid gap-4 md:grid-cols-2 lg:mt-32">
      <Reveal className="rounded-3xl border border-ink/[0.08] bg-surface p-7 sm:p-9">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Prima</p>
        <ul className="space-y-4">
          {before.map((t) => (
            <li key={t} className="flex items-center gap-3 text-ink/55 line-through decoration-ink/20">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink/[0.05]">
                <X className="h-3.5 w-3.5 text-ink/55" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.15} className="relative overflow-hidden rounded-3xl bg-bang p-7 text-ink sm:p-9">
        <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[28px] border-ink/[0.06]" />
        <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">Dopo, con Webbang</p>
        <ul className="relative space-y-4">
          {after.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 font-semibold"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper">
                <Check className="h-3.5 w-3.5 text-bang-ink" strokeWidth={3} />
              </span>
              {t}
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
