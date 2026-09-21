/**
 * ⚠️ DA_VERIFICARE — Recensioni.
 * Prima della pubblicazione ogni testo va approvato dal cliente indicato
 * (le recensioni non reali sono vietate dal Codice del Consumo / Direttiva Omnibus).
 */
export type Review = {
  name: string;
  role: string;
  company: string;
  city: string;
  service: string;
  rating: 4 | 5;
  date: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Manuela Centanni",
    role: "Titolare",
    company: "Agriturismo nelle Langhe",
    city: "Cuneo",
    service: "Sito + prenotazioni",
    rating: 5,
    date: "Agosto 2026",
    text: "Avevamo un sito vecchio che non aggiornavamo da anni e le prenotazioni arrivavano quasi solo per telefono. Lo abbiamo rifatto con il calendario delle disponibilità e adesso buona parte delle richieste arriva dal sito. Con lo sconto in fattura la spesa è stata sostenibile anche per una realtà piccola come la nostra.",
  },
  {
    name: "Noemi Maggio",
    role: "Titolare",
    company: "Boutique di abbigliamento",
    city: "Torino",
    service: "E-commerce",
    rating: 5,
    date: "Luglio 2026",
    text: "Ero scettica sull'e-commerce perché temevo di non riuscire a gestirlo da sola. Mi hanno fatto un negozio semplice da aggiornare e mi hanno spiegato tutto con calma, anche dopo la consegna. Quando ho un dubbio rispondono sempre, anche su WhatsApp.",
  },
  {
    name: "Davide Ferraris",
    role: "Responsabile amministrativo",
    company: "Impresa di impianti elettrici",
    city: "Asti",
    service: "Web app gestionale",
    rating: 5,
    date: "Giugno 2026",
    text: "Gestivamo preventivi e interventi su tre fogli Excel diversi e ogni settimana saltava qualcosa. Il gestionale che ci hanno sviluppato fa esattamente quello che ci serviva: scadenze, interventi e preventivi in un posto solo. Il primo mese c'è stato da abituarsi, poi nessuno è più tornato indietro.",
  },
  {
    name: "Chiara Bonetto",
    role: "Titolare",
    company: "Studio odontoiatrico",
    city: "Pinerolo",
    service: "Sito web",
    rating: 4,
    date: "Maggio 2026",
    text: "Sito nuovo con richiesta appuntamenti online, tempi rispettati e nessuna sorpresa rispetto al preventivo. Unico appunto: alcune foto le abbiamo dovute rifare noi perché quelle che avevamo non andavano bene, ma il risultato finale ci piace molto.",
  },
  {
    name: "Stefano Rinaldi",
    role: "Titolare",
    company: "Officina meccanica",
    city: "Chieri",
    service: "CRM su misura",
    rating: 5,
    date: "Luglio 2026",
    text: "Pensavo che un CRM fosse roba da grandi aziende. Adesso ho l'elenco clienti con lo storico dei lavori e i promemoria per tagliandi e revisioni partono da soli. Non devo più ricordarmi tutto a memoria e i clienti apprezzano di essere avvisati.",
  },
  {
    name: "Francesca Gallo",
    role: "Responsabile marketing",
    company: "Azienda alimentare",
    city: "Alba",
    service: "Restyling + SEO",
    rating: 5,
    date: "Aprile 2026",
    text: "Ci hanno seguito nel restyling del sito e nel posizionamento su Google. Dopo qualche mese abbiamo iniziato a ricevere richieste da distributori che ci avevano trovato cercando online, cosa che prima non succedeva. Team preparato e disponibile.",
  },
  {
    name: "Roberto Galli",
    role: "Direttore operativo",
    company: "Azienda di trasporti",
    city: "Novara",
    service: "Portale clienti",
    rating: 5,
    date: "Marzo 2026",
    text: "Ci serviva un portale dove i clienti potessero vedere lo stato delle spedizioni senza chiamarci ogni giorno. Funziona bene e le telefonate in ufficio sono calate parecchio. Buona la comunicazione durante tutto lo sviluppo, con aggiornamenti ogni settimana.",
  },
  {
    name: "Elisa Morandi",
    role: "Titolare",
    company: "Centro estetico",
    city: "Moncalieri",
    service: "Sito + prenotazioni",
    rating: 5,
    date: "Agosto 2026",
    text: "Sito e prenotazioni online pronti in poche settimane. Mi è piaciuto che mi abbiano spiegato bene come funzionava la pratica per lo sconto prima di firmare qualsiasi cosa. Li ho già consigliati a due colleghe.",
  },
];

export const averageRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
