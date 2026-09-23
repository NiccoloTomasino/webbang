"use client";

import { motion } from "motion/react";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Servizi",
    links: [
      ["CRM su Misura", "/#servizi"],
      ["Web App Gestionali", "/#software"],
      ["Web Design", "/#servizi"],
      ["E-commerce", "/#servizi"],
      ["Lead Generation", "/#marketing"],
      ["Social Media", "/#marketing"],
      ["SEO & Visibilità", "/#marketing"],
    ],
  },
  {
    title: "Agenzia",
    links: [
      ["Sconto 60%", "/#iniziativa"],
      ["Metodo", "/#processo"],
      ["Testimonianze", "/#testimonianze"],
      ["Contatti", "/#contatti"],
      ["Richiedi lo sconto", "/richiedi-sconto"],
    ],
  },
  {
    title: "Legale",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Cookie Policy", "/privacy#cookie"],
    ],
  },
];

function SocialIcon({ name }: { name: "instagram" | "linkedin" | "facebook" }) {
  const paths = {
    instagram:
      "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8.1a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.1-9.4a1.2 1.2 0 100 2.3 1.2 1.2 0 000-2.3z",
    linkedin:
      "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.4 4.2 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.5H3.6V9h3.5v11.5z",
    facebook:
      "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.08] pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Siti web, e-commerce, CRM e web app su misura. Trasformiamo le imprese attraverso il digitale: design
              premium, tecnologia avanzata e supporto continuo.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-ink/70 transition hover:text-bang-ink">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
              <p className="flex items-center gap-2 text-ink/70">
                <MapPin className="h-4 w-4" /> {site.address}
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              {(["instagram", "linkedin", "facebook"] as const).map((s) => (
                <a
                  key={s}
                  href={site.social[s]}
                  aria-label={s}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink/70 transition hover:-translate-y-1 hover:border-bang hover:bg-bang hover:text-ink"
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-2 text-sm text-ink/70 transition hover:text-ink"
                      >
                        <span className="h-px w-0 bg-bang transition-all duration-300 group-hover:w-3" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/[0.08] py-6 text-xs text-ink/50 sm:flex-row">
          <p>
            © {year} {site.name} — Tutti i diritti riservati
          </p>
          <a href="#top" className="group flex items-center gap-2 transition hover:text-bang-ink">
            Torna su
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 transition group-hover:-translate-y-1 group-hover:border-bang">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* wordmark gigante */}
      <div aria-hidden className="relative -mb-[3vw] select-none overflow-hidden">
        <motion.p
          initial={{ y: "60%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display text-[23vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink/[0.07]"
        >
          web<span className="text-bang/45">bang</span>
        </motion.p>
      </div>
    </footer>
  );
}
