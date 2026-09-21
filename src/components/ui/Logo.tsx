import { cn } from "@/lib/utils";

/** Logo Webbang: burst giallo + wordmark. */
export function BangMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      <path
        d="M20 1.5l4.1 8.3 8.9-3.1-2.6 9 8.1 4.3-8.1 4.3 2.6 9-8.9-3.1L20 38.5l-4.1-8.3-8.9 3.1 2.6-9L1.5 20l8.1-4.3-2.6-9 8.9 3.1z"
        fill="#FFD60A"
      />
      <path d="M17.2 11.5h5.6l-1 11h-3.6z M20 24.8a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2z" fill="#050505" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex select-none items-center gap-2.5", className)}>
      <BangMark className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[180deg] group-hover:scale-110" />
      <span className="font-display text-[22px] font-extrabold leading-none tracking-tight text-white">
        web<span className="text-bang">bang</span>
      </span>
    </span>
  );
}
