import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Webbang — Siti web, CRM e web app su misura";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Sconto 60% in fattura",
    title: "Siti web, CRM e web app che fanno BANG.",
    subtitle: "Software su misura per semplificare i processi e avere tutto sotto controllo.",
  });
}
