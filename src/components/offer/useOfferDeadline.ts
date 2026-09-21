"use client";

import { useEffect, useState } from "react";
import { getOfferDeadline, getRemaining } from "@/lib/offer";

type State = ReturnType<typeof getOfferDeadline> & { remaining: ReturnType<typeof getRemaining> };

function compute(): State {
  const now = Date.now();
  const d = getOfferDeadline(now);
  return { ...d, remaining: getRemaining(d.deadline, now) };
}

/**
 * Scadenza corrente dell'iniziativa, aggiornata ogni secondo.
 * Restituisce `null` al primo render (la pagina è statica: l'ora vera la conosce solo il browser).
 */
export function useOfferDeadline() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const tick = () => setState(compute());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return state;
}
