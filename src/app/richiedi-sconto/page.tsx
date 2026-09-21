import type { Metadata } from "next";
import { OfferLanding } from "@/components/landing/OfferLanding";
import { offer, OFFER_PATH } from "@/lib/site";

const title = `Sconto ${offer.discount}% in fattura — Richiedi l'adesione`;
const description = `Siti web, e-commerce, CRM e web app su misura. Compila il modulo: se la pratica viene approvata applichiamo subito uno sconto del ${offer.discount}% in fattura.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: OFFER_PATH },
  openGraph: {
    title: `Webbang — Sconto ${offer.discount}% in fattura sul tuo progetto digitale`,
    description,
    url: OFFER_PATH,
    type: "website",
    locale: "it_IT",
    siteName: "Webbang",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RichiediScontoPage() {
  return <OfferLanding />;
}
