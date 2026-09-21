import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Immagine di anteprima per la condivisione (WhatsApp, social, email). */
export function renderOgImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: "64px 72px",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,214,10,0.35), rgba(255,214,10,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#FFD60A",
              color: "#050505",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            !
          </div>
          <span>
            web<span style={{ color: "#FFD60A" }}>bang</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#FFD60A",
              color: "#050505",
              fontSize: 28,
              fontWeight: 800,
              padding: "10px 22px",
              borderRadius: 999,
              marginBottom: 28,
            }}
          >
            {kicker}
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>{title}</div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.65)", marginTop: 24, maxWidth: 900 }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
