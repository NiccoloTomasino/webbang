import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Webbang — Richiedi lo sconto del 60% in fattura";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Iniziativa Webbang · −60%",
    title: "Il tuo progetto digitale con il 60% di sconto in fattura.",
    subtitle: "Compila il modulo in 2 minuti: ti ricontattiamo entro 24 ore.",
  });
}
