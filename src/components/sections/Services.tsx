"use client";

import {
  ArrowUpRight,
  Brush,
  Database,
  LayoutDashboard,
  Magnet,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

type Service = {
  icon: LucideIcon;
  title: string;
  text: string;
  tags: string[];
  featured?: boolean;
  visual?: "pipeline" | "funnel";
  className?: string;
};

type ServiceGroup = {
  id: string;
  label: string;
  title: string;
  text: string;
  services: Service[];
};

const GROUPS: ServiceGroup[] = [
  {
    id: "sviluppo",
    label: "Sviluppo & Software",
    title: "Costruiamo gli strumenti",
    text: "Siti, e-commerce e software su misura che fanno girare la tua azienda.",
    services: [
      {
        icon: Database,
        title: "CRM su Misura",
        text: "Clienti, trattative, preventivi e follow-up in un unico posto. Un CRM costruito sui tuoi processi, non il contrario: il tuo team lavora meglio e non perde più nessuna opportunità.",
        tags: ["Pipeline vendite", "Anagrafiche", "Preventivi", "Report"],
        featured: true,
        visual: "pipeline",
        className: "md:col-span-2 lg:row-span-2",
      },
      {
        icon: LayoutDashboard,
        title: "Web App Gestionali",
        text: "Software aziendali accessibili da ogni dispositivo: magazzino, commesse, scadenze, controlli qualità e portali clienti.",
        tags: ["Dashboard", "Permessi utenti", "Mobile"],
        featured: true,
        className: "md:col-span-2",
      },
      {
        icon: MonitorSmartphone,
        title: "Web Design",
        text: "Siti moderni, veloci e pensati per convertire i visitatori in clienti. Design su misura per il tuo brand.",
        tags: ["UI/UX", "Responsive"],
      },
      {
        icon: ShoppingBag,
        title: "E-commerce",
        text: "Negozi online performanti e sicuri: pagamenti, spedizioni e gestione ordini senza pensieri.",
        tags: ["Pagamenti", "Catalogo"],
      },
      {
        icon: Workflow,
        title: "Automazioni & Integrazioni",
        text: "Colleghiamo i tuoi strumenti ed eliminiamo le attività ripetitive: fatturazione, email, notifiche, sincronizzazioni.",
        tags: ["API", "Workflow"],
        className: "lg:col-span-2",
      },
      {
        icon: ShieldCheck,
        title: "Manutenzione & Supporto",
        text: "Aggiornamenti, backup, sicurezza e assistenza continua. Il tuo progetto sempre al massimo.",
        tags: ["Backup", "Sicurezza"],
        className: "lg:col-span-2",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & Crescita",
    title: "Portiamo i clienti",
    text: "Tutto ciò che fa un'agenzia di marketing: visibilità, contatti e vendite misurabili.",
    services: [
      {
        icon: Magnet,
        title: "Lead Generation",
        text: "Campagne e landing page progettate per portarti contatti qualificati, non semplici visite. Ogni richiesta arriva tracciata e pronta per il tuo commerciale.",
        tags: ["Landing page", "Funnel", "Tracciamento", "CRM"],
        featured: true,
        visual: "funnel",
        className: "md:col-span-2 lg:row-span-2",
      },
      {
        icon: Share2,
        title: "Gestione Social Media",
        text: "Piano editoriale, contenuti, grafiche e community management su Instagram, Facebook, LinkedIn e TikTok.",
        tags: ["Piano editoriale", "Contenuti", "Community"],
        featured: true,
        className: "md:col-span-2",
      },
      {
        icon: Megaphone,
        title: "Advertising",
        text: "Campagne Google Ads e Meta Ads ottimizzate ogni settimana per massimizzare il ritorno sull'investimento.",
        tags: ["Google Ads", "Meta Ads"],
      },
      {
        icon: Search,
        title: "SEO & Visibilità",
        text: "Posizionamento organico su Google e scheda Google Business per farti trovare quando i clienti ti cercano.",
        tags: ["Google", "Local SEO"],
      },
      {
        icon: Brush,
        title: "Branding & Identità",
        text: "Logo, palette, tipografia e identità visiva coerente che ti distingue dalla concorrenza.",
        tags: ["Logo", "Visual identity"],
        className: "lg:col-span-2",
      },
      {
        icon: Mail,
        title: "Email Marketing & Contenuti",
        text: "Newsletter, automazioni email e contenuti che trasformano i contatti in clienti e i clienti in clienti fedeli.",
        tags: ["Newsletter", "Copywriting"],
        className: "lg:col-span-2",
      },
    ],
  },
];

export function Services() {
  return (
    <section id="servizi" className="relative py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid items-end gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>I Nostri Servizi</Eyebrow>
            <SplitReveal
              as="h2"
              text={"Tutto ciò di cui la tua\nazienda ha bisogno."}
              highlight={["azienda"]}
              className="font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink min-[400px]:text-4xl sm:text-6xl"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-lg text-base leading-relaxed text-ink/65 sm:text-lg lg:ml-auto">
              Non solo siti web. Siamo un&apos;<span className="text-ink">agenzia digitale e di marketing</span>: costruiamo
              gli strumenti che fanno girare la tua azienda e portiamo i clienti che la fanno crescere.
            </p>
          </Reveal>
        </div>

        <div className="space-y-14 sm:space-y-20">
          {GROUPS.map((g, gi) => (
            <div key={g.id} id={g.id} className="scroll-mt-28">
              <Reveal>
                <div className="mb-5 flex flex-col gap-2 border-t border-ink/[0.09] pt-6 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-bang-ink">0{gi + 1}</span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">{g.label}</p>
                      <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{g.title}</h3>
                    </div>
                  </div>
                  <p className="max-w-sm pl-9 text-sm leading-relaxed text-ink/55 sm:pl-0 sm:text-right">{g.text}</p>
                </div>
              </Reveal>

              <div className="grid gap-3 sm:gap-4 md:auto-rows-[minmax(250px,auto)] md:grid-cols-2 lg:grid-cols-4">
                {g.services.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.06} className={cn("h-full", s.className)}>
                    <SpotlightCard className="h-full" tilt={!s.featured}>
                      <ServiceBody service={s} index={i} />
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBody({ service: s, index }: { service: Service; index: number }) {
  const Icon = s.icon;
  const big = Boolean(s.visual);
  return (
    <div className={cn("flex h-full flex-col p-5 sm:p-7", big && "sm:p-9")}>
      <div className={cn("flex items-start justify-between", s.featured ? "mb-5 sm:mb-6" : "mb-4 sm:mb-6")}>
        <span
          className={cn(
            "grid place-items-center rounded-2xl transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110",
            s.featured ? "h-12 w-12 bg-bang text-ink sm:h-14 sm:w-14" : "h-11 w-11 border border-ink/10 bg-ink/[0.05] text-bang-ink sm:h-12 sm:w-12",
          )}
        >
          <Icon className={s.featured ? "h-6 w-6" : "h-5 w-5"} />
        </span>
        <span className="font-mono text-xs text-ink/40">0{index + 1}</span>
      </div>

      {s.featured && (
        <span className="mb-3 inline-flex w-fit rounded-full border border-bang/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-bang-ink">
          Specialità Webbang
        </span>
      )}

      <h3 className={cn("font-display font-bold tracking-tight text-ink", big ? "text-[1.75rem] sm:text-4xl" : "text-xl sm:text-2xl")}>
        {s.title}
      </h3>
      <p className={cn("mt-2.5 leading-relaxed text-ink/60 sm:mt-3", big ? "text-[15px] sm:text-lg" : "text-sm")}>{s.text}</p>

      {s.visual === "pipeline" && <MiniPipeline />}
      {s.visual === "funnel" && <MiniFunnel />}

      <div className="mt-auto flex items-end justify-between gap-3 pt-5 sm:pt-6">
        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="rounded-full bg-ink/[0.05] px-2.5 py-1 text-[11px] text-ink/60">
              {t}
            </span>
          ))}
        </div>
        <a
          href="#contatti"
          aria-label={`Parliamo di ${s.title}`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/70 transition-all duration-300 group-hover:border-bang group-hover:bg-bang group-hover:text-ink"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </div>
    </div>
  );
}

function MiniPipeline() {
  const cols = [
    { name: "Nuovi", cards: ["Bianchi S.p.A.", "Studio Verdi"] },
    { name: "Trattativa", cards: ["Hotel Aurora", "Ferri & Co."] },
    { name: "Chiusi", cards: ["Pasticceria Neri"] },
  ];
  return (
    <div className="mt-6 grid grid-cols-3 gap-1.5 sm:mt-7 sm:gap-2.5">
      {cols.map((c, ci) => (
        <div key={c.name} className="min-w-0 rounded-xl border border-ink/[0.08] bg-surface/60 p-1.5 sm:p-2.5">
          <p className="mb-2 truncate px-0.5 font-mono text-[9px] uppercase tracking-wider text-ink/50 sm:text-[10px]">{c.name}</p>
          <div className="space-y-1.5">
            {c.cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + ci * 0.15 + i * 0.1 }}
                className={cn(
                  "rounded-lg px-1.5 py-1.5 text-[10px] leading-tight sm:px-2 sm:text-[11px]",
                  ci === 2 ? "bg-bang font-semibold text-ink" : "bg-ink/[0.06] text-ink/75",
                )}
              >
                {card}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniFunnel() {
  const steps = [
    { name: "Visite", value: "12.400", width: "100%" },
    { name: "Lead", value: "620", width: "68%" },
    { name: "Clienti", value: "84", width: "40%" },
  ];
  return (
    <div className="mt-6 space-y-1.5 sm:mt-7 sm:space-y-2.5">
      {steps.map((st, i) => (
        <div key={st.name} className="flex justify-center">
          <motion.div
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: st.width, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "flex items-center justify-between gap-2 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 sm:py-2.5",
              i === 2 ? "bg-bang text-ink" : "border border-ink/[0.08] bg-surface/60 text-ink/75",
            )}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider opacity-70 sm:text-[10px]">{st.name}</span>
            <span className={cn("text-[11px] sm:text-xs", i === 2 && "font-semibold")}>{st.value}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
