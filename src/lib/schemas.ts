import { z } from "zod";

export const SECTORS = [
  "Commercio e Retail",
  "Ristorazione e Food",
  "Turismo e Hospitality",
  "Artigianato e Manifattura",
  "Servizi Professionali",
  "Sanità e Benessere",
  "Immobiliare",
  "Edilizia e Impiantistica",
  "Logistica e Trasporti",
  "Agricoltura",
  "Tecnologia",
  "Altro",
] as const;

export const COMPANY_SIZES = [
  { value: "freelance", label: "Libero professionista", desc: "Solo" },
  { value: "micro", label: "Micro impresa", desc: "< 10 dipendenti" },
  { value: "small", label: "Piccola impresa", desc: "10 – 50 dipendenti" },
  { value: "medium", label: "Media impresa", desc: "50 – 250 dipendenti" },
] as const;

export const REGIONS = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
] as const;

export const PROJECT_TYPES = [
  "Sito Istituzionale / Vetrina",
  "E-commerce / Negozio Online",
  "CRM su Misura",
  "Web App Gestionale",
  "Automazione Processi",
  "Prenotazioni Online",
  "Portfolio / Blog",
  "Restyling Sito Esistente",
] as const;

export const CONTACT_PREFERENCES = ["Email", "WhatsApp", "Telefono"] as const;

export const HOW_FOUND = [
  "Google",
  "Social Media",
  "Passaparola / Referral",
  "Fiera o Evento",
  "Pubblicità online",
  "Altro",
] as const;

export const discountRequestSchema = z
  .object({
    // Step 1 — L'azienda
    companyName: z.string().trim().min(2, "Inserisci il nome della tua azienda").max(120),
    sector: z.string().min(1, "Seleziona il settore"),
    companySize: z.string().min(1, "Seleziona la dimensione aziendale"),
    region: z.string().min(1, "Seleziona la regione"),
    city: z.string().trim().min(2, "Inserisci il comune").max(80),
    vatNumber: z.string().trim().max(20).optional(),
    // Step 2 — Il progetto
    projectTypes: z.array(z.string()).min(1, "Seleziona almeno un tipo di progetto"),
    hasWebsite: z.enum(["yes", "no"], { error: "Seleziona un'opzione" }),
    currentWebsite: z.string().trim().max(200).optional(),
    projectDescription: z.string().trim().max(2000).optional(),
    // Step 3 — I tuoi dati
    fullName: z.string().trim().min(2, "Inserisci nome e cognome").max(100),
    email: z.email("Inserisci un'email valida"),
    contactPreference: z.string().min(1, "Seleziona la preferenza"),
    phone: z.string().trim().max(30).optional(),
    howDidYouFind: z.string().optional(),
    privacy: z.boolean().refine((v) => v === true, {
      message: "Devi confermare di aver letto l'informativa privacy",
    }),
    // Honeypot anti-spam: deve restare vuoto
    aziendaRiferimento: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.contactPreference === "WhatsApp" || data.contactPreference === "Telefono") &&
      (!data.phone || data.phone.replace(/\s/g, "").length < 6)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: `Inserisci un numero per il contatto via ${data.contactPreference}`,
      });
    }
  });

export type DiscountRequest = z.infer<typeof discountRequestSchema>;

export const STEP_FIELDS: (keyof DiscountRequest)[][] = [
  ["companyName", "sector", "companySize", "region", "city", "vatNumber"],
  ["projectTypes", "hasWebsite", "currentWebsite", "projectDescription"],
  ["fullName", "email", "contactPreference", "phone", "howDidYouFind", "privacy"],
];

export const simpleContactSchema = z.object({
  name: z.string().trim().min(2, "Inserisci nome e cognome").max(100),
  email: z.email("Inserisci un'email valida"),
  message: z.string().trim().min(10, "Scrivi almeno qualche parola").max(3000),
  aziendaRiferimento: z.string().optional(),
});

export type SimpleContact = z.infer<typeof simpleContactSchema>;
