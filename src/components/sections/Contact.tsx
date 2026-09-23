"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, FileText, Loader2, Mail, MapPin, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { simpleContactSchema, type SimpleContact } from "@/lib/schemas";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";

const field =
  "peer w-full rounded-2xl border border-ink/12 bg-surface px-4 pb-3 pt-6 text-ink placeholder-transparent shadow-[inset_0_1px_2px_rgba(11,11,13,0.04)] transition focus:border-bang-deep focus:outline-none focus:ring-2 focus:ring-bang/35";
const floating =
  "pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-ink/55 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-bang-ink";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showMap, setShowMap] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SimpleContact>({ resolver: zodResolver(simpleContactSchema) });

  const onSubmit = async (data: SimpleContact) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact-simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const mapQuery = encodeURIComponent(site.address);

  return (
    <section id="contatti" className="relative py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Contattaci</Eyebrow>
            <SplitReveal
              as="h2"
              text={"Parliamo del\ntuo progetto."}
              highlight={["progetto."]}
              className="font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink min-[400px]:text-4xl sm:text-6xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65 sm:mt-6 sm:text-lg">
                Hai un&apos;idea, un processo da semplificare o vuoi saperne di più? Scrivici — ti risponderemo entro un
                giorno lavorativo.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 space-y-3 sm:mt-10">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-ink/[0.08] bg-surface p-4 transition hover:border-bang/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-bang text-ink transition group-hover:rotate-[-8deg]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink/55">Email</span>
                  <span className="block font-semibold text-ink">{site.email}</span>
                </span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-ink/[0.08] bg-surface p-4 transition hover:border-bang/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-ink/10 text-bang-ink transition group-hover:rotate-[-8deg]">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-ink/55">Sede</span>
                  <span className="block font-semibold text-ink">{site.address}</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3 text-sm text-ink/70">
                {[
                  { i: Clock, t: "Risposta garantita entro 24 ore lavorative" },
                  { i: Sparkles, t: "Consulenza iniziale gratuita e senza impegno" },
                  { i: FileText, t: "Preventivo dettagliato in 48 ore" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-bang-ink" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.35} className="mt-8 overflow-hidden rounded-2xl border border-ink/[0.08] bg-surface">
              {showMap ? (
                <iframe
                  title={`Webbang — ${site.address}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-64 w-full grayscale invert-[0.92] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex flex-col items-start gap-3 p-5">
                  <p className="text-sm font-semibold text-ink">Come raggiungerci</p>
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="rounded-full border border-ink/12 px-4 py-2 text-sm text-ink transition hover:border-bang hover:text-bang-ink"
                  >
                    Mostra la mappa
                  </button>
                  <p className="text-xs text-ink/50">
                    La mappa è fornita da Google. Si carica solo se la richiedi tu, così nessun dato viene inviato a
                    Google senza il tuo consenso.
                  </p>
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[2rem] border border-ink/[0.09] bg-surface p-6 sm:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-bang/10 blur-3xl" />
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                      className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-bang"
                    >
                      <CheckCircle2 className="h-10 w-10 text-ink" />
                    </motion.span>
                    <h3 className="font-display text-3xl font-bold text-ink">Messaggio inviato!</h3>
                    <p className="mt-3 max-w-xs text-ink/65">
                      Grazie per averci scritto. Ti risponderemo entro un giorno lavorativo.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 rounded-full border border-ink/12 px-5 py-2.5 text-sm text-ink transition hover:border-bang hover:text-bang-ink"
                    >
                      Invia un altro messaggio
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="relative space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="mb-2 font-display text-2xl font-bold text-ink">Scrivici un messaggio</h3>
                    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                      <input tabIndex={-1} autoComplete="off" {...register("aziendaRiferimento")} />
                    </div>

                    <div>
                      <div className="relative">
                        <input id="c-name" placeholder="Nome e Cognome" autoComplete="name" className={field} {...register("name")} />
                        <label htmlFor="c-name" className={floating}>Nome e Cognome</label>
                      </div>
                      {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <input id="c-email" type="email" placeholder="Email" autoComplete="email" className={field} {...register("email")} />
                        <label htmlFor="c-email" className={floating}>Email</label>
                      </div>
                      {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <textarea
                          id="c-message"
                          rows={6}
                          placeholder="Il tuo messaggio"
                          className={cn(field, "resize-none")}
                          {...register("message")}
                        />
                        <label htmlFor="c-message" className={floating}>Raccontaci del tuo progetto o fai una domanda…</label>
                      </div>
                      {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
                    </div>

                    {status === "error" && (
                      <p className="rounded-xl border border-red-500/30 bg-red-50 p-3 text-sm text-red-700" role="alert">
                        Si è verificato un errore. Riprova o scrivici direttamente a {site.email}.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-bang py-4 font-semibold text-ink transition hover:bg-bang-deep disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Invio in corso…
                        </>
                      ) : (
                        <>
                          Invia messaggio
                          <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-ink/50">
                      I dati che inserisci ci servono solo per risponderti. Leggi l&apos;
                      <Link href="/privacy" className="text-bang-ink hover:underline">
                        informativa privacy
                      </Link>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
