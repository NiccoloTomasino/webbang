import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy e Cookie Policy",
  robots: { index: false },
};

/**
 * ⚠️ DA_VERIFICARE — Testo segnaposto.
 * Far redigere/validare l'informativa da un consulente privacy (GDPR) prima della pubblicazione.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
      <div className="mb-12 flex items-center justify-between">
        <Link href="/" aria-label="Torna alla home">
          <Logo />
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-white/55 transition hover:text-bang">
          <ArrowLeft className="h-4 w-4" /> Torna al sito
        </Link>
      </div>

      <article className="space-y-6 leading-relaxed text-white/65 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-white [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white">
        <h1>Informativa Privacy</h1>
        <p>
          Ai sensi del Regolamento UE 2016/679 (GDPR), {site.name} informa che i dati personali forniti tramite i moduli
          presenti sul sito sono trattati esclusivamente per rispondere alle richieste inviate e per la gestione della
          pratica di adesione all&apos;iniziativa sconto.
        </p>
        <h2>Titolare del trattamento</h2>
        <p>
          {site.name} — {site.address} — {site.email}
        </p>
        <h2>Dati raccolti e finalità</h2>
        <p>
          Nome, email, telefono, dati aziendali e informazioni sul progetto, utilizzati per ricontattarti, valutare la
          pratica e formulare un preventivo. I dati non vengono ceduti a terzi né usati per finalità di marketing senza
          consenso esplicito.
        </p>
        <h2>Conservazione</h2>
        <p>I dati sono conservati per il tempo necessario a gestire la richiesta e gli eventuali obblighi di legge.</p>
        <h2>Diritti dell&apos;interessato</h2>
        <p>
          Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione o limitazione dei tuoi dati scrivendo a{" "}
          {site.email}.
        </p>
        <h2 id="cookie">Cookie</h2>
        <p>
          Il sito utilizza solo cookie tecnici necessari al funzionamento. La mappa di Google viene caricata solo su tua
          esplicita richiesta.
        </p>
      </article>
    </main>
  );
}
