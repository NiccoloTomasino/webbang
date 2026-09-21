/**
 * Configurazione centrale del sito Webbang.
 * Tutti i dati "di business" (contatti, scadenze, numeri) stanno qui,
 * così si aggiornano in un punto solo.
 *
 * ⚠️ I valori marcati DA_VERIFICARE sono segnaposto: vanno confermati
 * o sostituiti con dati reali prima della pubblicazione.
 */

export const site = {
  name: "Webbang",
  domain: "webbang.it", // DA_VERIFICARE
  url: "https://www.webbang.it", // DA_VERIFICARE
  email: "info@webbang.it", // DA_VERIFICARE
  phone: "" as string, // DA_VERIFICARE — lasciare vuoto per nasconderlo
  address: "Strada Torino 43, Orbassano (TO)", // DA_VERIFICARE
  tagline: "Siti web, CRM e web app che fanno BANG.",
  description:
    "Webbang è l'agenzia digitale e di marketing che crea siti web, e-commerce, CRM e web app su misura e fa crescere le imprese con lead generation, social media e advertising. Aderisci all'iniziativa: sconto immediato in fattura del 60%.",
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
  },
} as const;

export const offer = {
  discount: 60,
  /**
   * Scadenza "a finestre": ogni finestra dura `cycleDays` giorni e alla fine
   * si rinnova automaticamente. Tutti i visitatori vedono la stessa scadenza.
   * `cycleStart` è il primo giorno della prima finestra (data italiana).
   */
  cycleDays: 10,
  cycleStart: "2026-09-11",
} as const;

/** Percorso della pagina da condividere con i clienti. Accorciato: /sconto */
export const OFFER_PATH = "/richiedi-sconto";

/** Anno di apertura dell'attività: gli anni di esperienza si aggiornano da soli. */
export const FOUNDED_YEAR = 2021;

/** Numeri mostrati in hero e "Perché sceglierci" (98% e 24h: DA_VERIFICARE) */
export const stats = [
  { value: 500, suffix: "+", label: "Progetti completati" },
  { value: new Date().getFullYear() - FOUNDED_YEAR, suffix: " anni", label: "di esperienza" },
  { value: 98, suffix: "%", label: "Clienti soddisfatti" },
  { value: 24, suffix: "h", label: "Supporto dedicato" },
] as const;

export const navLinks = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/#iniziativa", label: "Sconto 60%" },
  { href: "/#software", label: "CRM & Web App" },
  { href: "/#processo", label: "Metodo" },
  { href: "/#contatti", label: "Contatti" },
] as const;
