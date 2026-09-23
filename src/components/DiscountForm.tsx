"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Loader2,
  Rocket,
  UserRound,
} from "lucide-react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { forwardRef, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  COMPANY_SIZES,
  CONTACT_PREFERENCES,
  HOW_FOUND,
  PROJECT_TYPES,
  REGIONS,
  SECTORS,
  STEP_FIELDS,
  discountRequestSchema,
  type DiscountRequest,
} from "@/lib/schemas";
import { offer, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BangMark } from "@/components/ui/Logo";

const STEPS = [
  { id: 1, label: "L'Azienda", icon: Building2 },
  { id: 2, label: "Il Progetto", icon: Rocket },
  { id: 3, label: "I Tuoi Dati", icon: UserRound },
];

const RETRY_DELAYS = [0, 1500, 4000];

type ErrorKind = "incerto" | "dati" | "limite" | "fallito";

const ERROR_MESSAGES: Record<ErrorKind, string> = {
  incerto: `Non siamo riusciti a confermare l'invio: la richiesta potrebbe essere arrivata lo stesso. Puoi premere "Riprova" senza timore — se è già arrivata non creerai un doppione — oppure scriverci a ${site.email}.`,
  dati: `Alcuni dati non sono stati accettati. Controlla i campi e riprova, oppure scrivici a ${site.email}.`,
  limite: `Abbiamo ricevuto troppe richieste ravvicinate da questa connessione. Riprova tra qualche minuto, oppure scrivici a ${site.email}.`,
  fallito: `Non siamo riusciti a inviare la richiesta. Riprova tra qualche minuto oppure scrivici a ${site.email}: ci basta il nome dell'azienda per aprire la pratica.`,
};

/* ---------- campi stilizzati ---------- */

const fieldBase =
  "w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-base text-ink sm:text-sm placeholder-ink/40 shadow-[inset_0_1px_2px_rgba(11,11,13,0.04)] transition-all duration-200 focus:border-bang-deep focus:outline-none focus:ring-2 focus:ring-bang/35";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(({ className, ...p }, ref) => (
  <input ref={ref} className={cn(fieldBase, className)} {...p} />
));
Input.displayName = "Input";

const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(
  ({ className, children, ...p }, ref) => (
    <div className="relative">
      <select ref={ref} className={cn(fieldBase, "cursor-pointer appearance-none pr-10", className)} {...p}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/55" />
    </div>
  ),
);
Select.displayName = "Select";

function Label({ children, required, htmlFor }: { children: ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink/75">
      {children}
      {required && <span className="ml-1 text-bang-ink">*</span>}
    </label>
  );
}

function Optional() {
  return <span className="ml-1 font-normal text-ink/45">(opzionale)</span>;
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-xs text-red-600"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Choice({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border text-sm transition-all duration-200",
        selected
          ? "border-bang/60 bg-bang/[0.12] text-ink shadow-[inset_0_0_0_1px_rgba(255,214,10,0.25)]"
          : "border-ink/[0.09] bg-ink/[0.04] text-ink/70 hover:border-ink/16 hover:text-ink/75",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ---------- form ---------- */

export function DiscountForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("incerto");
  const [submitting, setSubmitting] = useState(false);
  const requestId = useRef<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<DiscountRequest>({
    resolver: zodResolver(discountRequestSchema),
    defaultValues: { projectTypes: [], privacy: false, contactPreference: "" },
    mode: "onTouched",
  });

  const hasWebsite = useWatch({ control, name: "hasWebsite" });
  const contactPreference = useWatch({ control, name: "contactPreference" });

  // riporta in vista l'inizio del modulo solo se l'utente l'ha superato (es. su mobile)
  const scrollTop = () => {
    const el = topRef.current;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    if (lenis) lenis.scrollTo(el, { offset: -16 });
    else el.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step - 1]);
    if (ok) {
      setDirection(1);
      setStep((s) => s + 1);
      scrollTop();
    }
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
    scrollTop();
  };

  const onSubmit = async (data: DiscountRequest) => {
    setSubmitting(true);
    requestId.current ??=
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const body = JSON.stringify({ ...data, richiestaId: requestId.current });

    let kind: ErrorKind = "incerto";
    for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt++) {
      if (RETRY_DELAYS[attempt]) await new Promise((r) => setTimeout(r, RETRY_DELAYS[attempt]));
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 20_000);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          signal: ctrl.signal,
        });
        if (res.ok) {
          setStatus("success");
          setSubmitting(false);
          scrollTop();
          return;
        }
        if (res.status === 429) {
          kind = "limite";
          break;
        }
        if (res.status < 500) {
          kind = "dati";
          break;
        }
        const json = await res.json().catch(() => null);
        kind = json?.esito === "non-inviata" ? "fallito" : "incerto";
      } catch {
        kind = "incerto";
      } finally {
        clearTimeout(timer);
      }
    }
    setErrorKind(kind);
    setStatus("error");
    setSubmitting(false);
    scrollTop();
  };

  const progress = status === "success" ? 100 : ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div ref={topRef} className="relative">
      {/* Header */}
      <div className="border-b border-ink/[0.09] px-5 pb-5 pt-6 sm:px-8 sm:pt-7">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <BangMark className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bang-ink sm:text-[11px]">
              Iniziativa Webbang · −{offer.discount}%
            </p>
            <h2 className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
              Richiedi lo Sconto in Fattura
            </h2>
            <p className="mt-0.5 text-xs text-ink/55">Bastano 2 minuti · risposta entro 24 ore</p>
          </div>
        </div>

        {status === "idle" && (
          <>
            <div className="flex items-center justify-between">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        backgroundColor: done || active ? "#FFD60A" : "rgba(11,11,13,0.06)",
                        color: done || active ? "#0b0b0d" : "rgba(11,11,13,0.45)",
                        scale: active ? 1.08 : 1,
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full"
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                    </motion.div>
                    <span
                      className={cn(
                        "hidden text-xs font-semibold sm:inline",
                        active ? "text-ink" : "text-ink/55",
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs font-semibold text-ink/75 sm:hidden">
              Passo {step} di {STEPS.length} · <span className="text-bang-ink">{STEPS[step - 1].label}</span>
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.06] sm:mt-4">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-bang-deep to-bang"
                animate={{ width: `${Math.max(progress, 6)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </>
        )}
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-7">
        {status === "success" && <SuccessState />}

        {status === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-ink">
              {errorKind === "incerto" ? "Invio non confermato" : "Errore nell'invio"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-ink/65">
              {ERROR_MESSAGES[errorKind]}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-full bg-bang px-6 py-3 text-sm font-semibold text-ink transition hover:bg-bang-deep"
            >
              Riprova
            </button>
          </motion.div>
        )}

        {status === "idle" && (
          <form
            noValidate
            onSubmit={(e) => {
              // Invio con "Enter" negli step intermedi = passa allo step successivo
              if (step < STEPS.length) {
                e.preventDefault();
                void next();
                return;
              }
              void handleSubmit(onSubmit)(e);
            }}
          >
            {/* honeypot */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Non compilare questo campo
                <input tabIndex={-1} autoComplete="off" {...register("aziendaRiferimento")} />
              </label>
            </div>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5"
                >
                  {step === 1 && (
                    <>
                      <div>
                        <Label required htmlFor="companyName">Nome Azienda</Label>
                        <Input id="companyName" placeholder="es. Rossi e Figli S.r.l." autoComplete="organization" {...register("companyName")} />
                        <FieldError message={errors.companyName?.message} />
                      </div>
                      <div>
                        <Label required htmlFor="sector">Settore di attività</Label>
                        <Select id="sector" defaultValue="" {...register("sector")}>
                          <option value="" disabled>Seleziona il settore</option>
                          {SECTORS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </Select>
                        <FieldError message={errors.sector?.message} />
                      </div>
                      <div>
                        <Label required>Dimensione aziendale</Label>
                        <Controller
                          name="companySize"
                          control={control}
                          render={({ field }) => (
                            <div className="grid grid-cols-2 gap-2.5">
                              {COMPANY_SIZES.map((s) => (
                                <Choice
                                  key={s.value}
                                  selected={field.value === s.value}
                                  onClick={() => field.onChange(s.value)}
                                  className="px-3.5 py-3 text-left"
                                >
                                  <span className="block font-semibold">{s.label}</span>
                                  <span className="block text-xs opacity-60">{s.desc}</span>
                                </Choice>
                              ))}
                            </div>
                          )}
                        />
                        <FieldError message={errors.companySize?.message} />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label required htmlFor="region">Regione</Label>
                          <Select id="region" defaultValue="" {...register("region")}>
                            <option value="" disabled>Seleziona</option>
                            {REGIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </Select>
                          <FieldError message={errors.region?.message} />
                        </div>
                        <div>
                          <Label required htmlFor="city">Comune</Label>
                          <Input id="city" placeholder="es. Torino" autoComplete="address-level2" {...register("city")} />
                          <FieldError message={errors.city?.message} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="vatNumber">Partita IVA <Optional /></Label>
                        <Input id="vatNumber" placeholder="es. 12345678901" inputMode="numeric" {...register("vatNumber")} />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <Label required>Tipo di progetto</Label>
                        <p className="-mt-1 mb-3 text-xs text-ink/50">Puoi selezionare più opzioni</p>
                        <Controller
                          name="projectTypes"
                          control={control}
                          render={({ field }) => (
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                              {PROJECT_TYPES.map((t) => {
                                const selected = field.value?.includes(t);
                                return (
                                  <Choice
                                    key={t}
                                    selected={!!selected}
                                    onClick={() =>
                                      field.onChange(
                                        selected ? field.value.filter((v) => v !== t) : [...(field.value ?? []), t],
                                      )
                                    }
                                    className="flex items-center gap-2.5 px-3.5 py-3 text-left"
                                  >
                                    <span
                                      className={cn(
                                        "grid h-4 w-4 shrink-0 place-items-center rounded-md border transition-all",
                                        selected ? "border-bang bg-bang" : "border-ink/16",
                                      )}
                                    >
                                      {selected && <Check className="h-3 w-3 text-ink" strokeWidth={3.5} />}
                                    </span>
                                    <span className="text-xs font-medium leading-tight">{t}</span>
                                  </Choice>
                                );
                              })}
                            </div>
                          )}
                        />
                        <FieldError message={errors.projectTypes?.message} />
                      </div>
                      <div>
                        <Label required>Hai già un sito web?</Label>
                        <Controller
                          name="hasWebsite"
                          control={control}
                          render={({ field }) => (
                            <div className="flex gap-3">
                              {[
                                { value: "yes", label: "Sì, ce l'ho" },
                                { value: "no", label: "No, è il primo" },
                              ].map((o) => (
                                <Choice
                                  key={o.value}
                                  selected={field.value === o.value}
                                  onClick={() => field.onChange(o.value)}
                                  className="flex-1 py-3 font-semibold"
                                >
                                  {o.label}
                                </Choice>
                              ))}
                            </div>
                          )}
                        />
                        <FieldError message={errors.hasWebsite?.message} />
                      </div>
                      <AnimatePresence initial={false}>
                        {hasWebsite === "yes" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <Label htmlFor="currentWebsite">URL sito attuale</Label>
                            <Input id="currentWebsite" type="url" placeholder="https://www.tuosito.it" {...register("currentWebsite")} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div>
                        <Label htmlFor="projectDescription">Descrivi il tuo progetto <Optional /></Label>
                        <textarea
                          id="projectDescription"
                          rows={4}
                          placeholder="Cosa vorresti ottenere? Quali processi vorresti semplificare? Hai riferimenti specifici?"
                          className={cn(fieldBase, "resize-none")}
                          {...register("projectDescription")}
                        />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div>
                        <Label required htmlFor="fullName">Nome e Cognome</Label>
                        <Input id="fullName" placeholder="Mario Rossi" autoComplete="name" {...register("fullName")} />
                        <FieldError message={errors.fullName?.message} />
                      </div>
                      <div>
                        <Label required htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="mario@azienda.it" autoComplete="email" {...register("email")} />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div>
                        <Label required>Come preferisci essere contattato?</Label>
                        <Controller
                          name="contactPreference"
                          control={control}
                          render={({ field }) => (
                            <div className="flex gap-2.5">
                              {CONTACT_PREFERENCES.map((c) => (
                                <Choice
                                  key={c}
                                  selected={field.value === c}
                                  onClick={() => field.onChange(c)}
                                  className="min-h-11 flex-1 py-2.5 font-semibold"
                                >
                                  {c}
                                </Choice>
                              ))}
                            </div>
                          )}
                        />
                        <FieldError message={errors.contactPreference?.message} />
                      </div>
                      <div>
                        <Label required={contactPreference === "WhatsApp" || contactPreference === "Telefono"} htmlFor="phone">
                          Telefono / WhatsApp
                          {contactPreference !== "WhatsApp" && contactPreference !== "Telefono" && <Optional />}
                        </Label>
                        <Input id="phone" type="tel" placeholder="es. 333 123 4567" autoComplete="tel" {...register("phone")} />
                        <FieldError message={errors.phone?.message} />
                      </div>
                      <div>
                        <Label htmlFor="howDidYouFind">Come ci hai trovato? <Optional /></Label>
                        <Select id="howDidYouFind" defaultValue="" {...register("howDidYouFind")}>
                          <option value="">Seleziona</option>
                          {HOW_FOUND.map((h) => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </Select>
                      </div>

                      <div className="rounded-2xl border border-bang/20 bg-bang/[0.06] p-4 text-xs leading-relaxed text-ink/70">
                        Inviando questo modulo richiedi di aderire all&apos;iniziativa Webbang. Se la pratica viene
                        approvata, applicheremo uno <strong className="text-bang-ink">sconto immediato del {offer.discount}% in fattura</strong>.
                        Nessun addebito e nessun impegno — ti contatteremo entro 24 ore.
                      </div>

                      <div>
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/70">
                          <input type="checkbox" className="peer sr-only" {...register("privacy")} />
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-ink/16 transition peer-checked:border-bang peer-checked:bg-bang peer-focus-visible:ring-2 peer-focus-visible:ring-bang/50 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                            <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3.5} />
                          </span>
                          <span>
                            Ho letto l&apos;
                            <Link href="/privacy" target="_blank" className="text-bang-ink underline-offset-2 hover:underline">
                              informativa privacy
                            </Link>{" "}
                            e acconsento al trattamento dei dati per essere ricontattato.
                          </span>
                        </label>
                        <FieldError message={errors.privacy?.message} />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigazione */}
            <div className="mt-8 flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-2 rounded-full border border-ink/10 px-5 py-3 text-sm font-semibold text-ink/75 transition hover:border-ink/20 hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" /> Indietro
                </button>
              )}
              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={next}
                  className="group ml-auto flex items-center gap-2 rounded-full bg-bang px-6 py-3 text-sm font-semibold text-ink transition hover:bg-bang-deep"
                >
                  Avanti
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="group ml-auto flex items-center gap-2 rounded-full bg-bang px-6 py-3 text-sm font-bold text-ink transition hover:bg-bang-deep disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Invio in corso…
                    </>
                  ) : (
                    <>
                      Richiedi lo Sconto {offer.discount}%
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative py-10 text-center">
      <div className="relative mx-auto mb-7 grid h-24 w-24 place-items-center">
        {/* raggi dell'esplosione */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-1 w-6 origin-left rounded-full bg-bang"
            style={{ rotate: i * 30 }}
            initial={{ x: 0, opacity: 1, scaleX: 0.2 }}
            animate={{ x: 70, opacity: 0, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          />
        ))}
        <motion.div
          className="grid h-24 w-24 place-items-center rounded-full bg-bang"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
        >
          <Check className="h-11 w-11 text-ink" strokeWidth={3} />
        </motion.div>
      </div>
      <h3 className="mb-3 font-display text-3xl font-extrabold text-ink">Richiesta Inviata!</h3>
      <p className="mx-auto mb-8 max-w-sm text-base leading-relaxed text-ink/65">
        Abbiamo ricevuto la tua richiesta. Un nostro consulente ti contatterà entro{" "}
        <strong className="text-ink">24 ore</strong> per verificare la pratica e l&apos;applicazione dello
        sconto del {offer.discount}%.
      </p>
      <Link
        href="/"
        className="inline-block rounded-full border border-ink/12 bg-ink/[0.07] px-6 py-3 font-semibold text-ink transition hover:bg-ink/12"
      >
        Scopri Webbang
      </Link>
    </motion.div>
  );
}
