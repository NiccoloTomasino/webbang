import { offer } from "@/lib/site";

const DAY = 86_400_000;

/**
 * Calcola la scadenza corrente dell'iniziativa.
 * Le finestre terminano alle 22:00 UTC (mezzanotte in estate, 23:00 in inverno),
 * così l'ultimo giorno utile è sempre lo stesso giorno di calendario in Italia.
 */
export function getOfferDeadline(now = Date.now()) {
  const [y, m, d] = offer.cycleStart.split("-").map(Number);
  const cycle = offer.cycleDays * DAY;
  const firstEnd = Date.UTC(y, m - 1, d) + cycle - 2 * 3_600_000;
  const cyclesPassed = now < firstEnd ? 0 : Math.floor((now - firstEnd) / cycle) + 1;
  const deadline = firstEnd + cyclesPassed * cycle;
  const lastDay = new Date(deadline - 1000);
  return {
    deadline,
    /** es. "20 settembre" */
    label: new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", timeZone: "Europe/Rome" }).format(lastDay),
  };
}

export function getRemaining(deadline: number, now = Date.now()) {
  const diff = Math.max(0, deadline - now);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
