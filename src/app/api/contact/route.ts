import { discountRequestSchema, COMPANY_SIZES } from "@/lib/schemas";
import {
  alreadyProcessed,
  clientIp,
  forgetProcessed,
  isRateLimited,
  rowsToHtml,
  sendNotification,
} from "@/lib/notify";

export async function POST(req: Request) {
  if (isRateLimited(`contact:${clientIp(req)}`)) {
    return Response.json({ esito: "limite" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = discountRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ esito: "dati", issues: parsed.error.issues }, { status: 400 });
  }
  const d = parsed.data;
  const richiestaId =
    typeof body?.richiestaId === "string" ? body.richiestaId.slice(0, 64) : undefined;

  // Honeypot compilato → fingiamo successo senza inviare nulla
  if (d.aziendaRiferimento) return Response.json({ esito: "inviata" });
  // Retry di una richiesta già ricevuta → nessun doppione
  if (alreadyProcessed(richiestaId)) return Response.json({ esito: "inviata" });

  const size = COMPANY_SIZES.find((s) => s.value === d.companySize)?.label ?? d.companySize;

  const result = await sendNotification({
    subject: `🟡 Nuova richiesta Sconto 60% — ${d.companyName}`,
    replyTo: d.email,
    html: rowsToHtml("Nuova richiesta — Iniziativa Sconto 60%", [
      ["Azienda", d.companyName],
      ["Settore", d.sector],
      ["Dimensione", size],
      ["Regione", d.region],
      ["Comune", d.city],
      ["P.IVA", d.vatNumber],
      ["Tipo progetto", d.projectTypes],
      ["Ha già un sito", d.hasWebsite === "yes" ? "Sì" : "No"],
      ["Sito attuale", d.currentWebsite],
      ["Descrizione", d.projectDescription],
      ["Referente", d.fullName],
      ["Email", d.email],
      ["Telefono", d.phone],
      ["Preferenza contatto", d.contactPreference],
      ["Come ci ha trovato", d.howDidYouFind],
      ["ID richiesta", richiestaId],
    ]),
  });

  if (!result.ok) {
    forgetProcessed(richiestaId);
    return Response.json(
      { esito: result.reason === "not-configured" ? "non-inviata" : "incerto" },
      { status: 502 },
    );
  }
  return Response.json({ esito: "inviata" });
}
