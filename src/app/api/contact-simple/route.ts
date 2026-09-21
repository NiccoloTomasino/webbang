import { simpleContactSchema } from "@/lib/schemas";
import { clientIp, isRateLimited, rowsToHtml, sendNotification } from "@/lib/notify";

export async function POST(req: Request) {
  if (isRateLimited(`simple:${clientIp(req)}`)) {
    return Response.json({ esito: "limite" }, { status: 429 });
  }

  const parsed = simpleContactSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ esito: "dati", issues: parsed.error.issues }, { status: 400 });
  }
  const d = parsed.data;
  if (d.aziendaRiferimento) return Response.json({ esito: "inviata" });

  const result = await sendNotification({
    subject: `✉️ Nuovo messaggio dal sito — ${d.name}`,
    replyTo: d.email,
    html: rowsToHtml("Nuovo messaggio dal sito", [
      ["Nome", d.name],
      ["Email", d.email],
      ["Messaggio", d.message],
    ]),
  });

  if (!result.ok) return Response.json({ esito: "non-inviata" }, { status: 502 });
  return Response.json({ esito: "inviata" });
}
