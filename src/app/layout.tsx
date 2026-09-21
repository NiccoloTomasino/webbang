import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Webbang — Siti Web, CRM e Web App su Misura | Sconto 60% in Fattura",
    template: "%s — Webbang",
  },
  description: site.description,
  keywords: [
    "agenzia web",
    "creazione siti web",
    "crm su misura",
    "web app aziendali",
    "software gestionale personalizzato",
    "e-commerce",
    "digitalizzazione imprese",
    "agenzia di marketing",
    "lead generation",
    "gestione social media",
    "sconto 60% sito web",
  ],
  openGraph: {
    title: "Webbang — Il digitale che fa BANG. Paghi solo il 40%.",
    description:
      "Siti web, e-commerce, CRM e web app su misura. Aderisci all'iniziativa: sconto immediato in fattura del 60%.",
    locale: "it_IT",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Webbang — Il digitale che fa BANG. Paghi solo il 40%.",
    description: "Siti web, CRM e web app su misura con sconto immediato in fattura del 60%.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
