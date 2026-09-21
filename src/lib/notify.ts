import "server-only";

/**
 * Invio notifiche email delle richieste.
 *
 * Usa l'API REST di Resend se sono presenti le variabili:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * In sviluppo, senza configurazione, la richiesta viene solo stampata in console.
 */

type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export async function sendNotification(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Webbang <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[webbang] Email non configurata — anteprima:\n${opts.subject}\n${opts.html}`);
      return { ok: true };
    }
    console.error("[webbang] RESEND_API_KEY o CONTACT_TO_EMAIL mancanti");
    return { ok: false, reason: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: opts.subject,
        html: opts.html,
        reply_to: opts.replyTo,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("[webbang] Errore provider email", res.status, await res.text());
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[webbang] Errore invio email", err);
    return { ok: false, reason: "provider-error" };
  }
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function rowsToHtml(title: string, rows: [string, unknown][]) {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 12px;color:#111">${escapeHtml(Array.isArray(v) ? v.join(", ") : v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif"><h2 style="background:#0a0a0a;color:#FFD60A;padding:16px 20px;margin:0">${escapeHtml(title)}</h2><table style="border-collapse:collapse;width:100%;max-width:640px">${body}</table></div>`;
}

/* Rate limit e idempotenza best-effort (per istanza). */
const hits = new Map<string, number[]>();
export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

const seen = new Map<string, number>();
export function alreadyProcessed(id: string | undefined) {
  if (!id) return false;
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > 60 * 60_000) seen.delete(k);
  if (seen.has(id)) return true;
  seen.set(id, now);
  return false;
}
export function forgetProcessed(id: string | undefined) {
  if (id) seen.delete(id);
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
