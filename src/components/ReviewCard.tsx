import { Star } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-bang text-bang-ink" : "fill-ink/10 text-ink/12")} />
      ))}
    </span>
  );
}

export function ReviewCard({ review: r, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl border border-ink/[0.08] bg-surface p-5 transition-colors duration-300 hover:border-bang/30 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <Stars rating={r.rating} />
        <span className="truncate rounded-full bg-bang/10 px-2.5 py-1 text-[11px] font-medium text-bang-ink">{r.service}</span>
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/75">“{r.text}”</blockquote>
      <figcaption className="mt-5 flex items-start gap-3 border-t border-ink/[0.08] pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bang font-display text-sm font-bold text-ink">
          {r.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{r.name}</span>
          <span className="block text-xs leading-snug text-ink/55">
            {r.role} · {r.company}, {r.city}
          </span>
        </span>
        <span className="hidden shrink-0 font-mono text-[10px] text-ink/45 sm:block">{r.date}</span>
      </figcaption>
    </figure>
  );
}
