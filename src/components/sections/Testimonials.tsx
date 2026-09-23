"use client";

import { useRef, useState } from "react";
import { averageRating, REVIEWS } from "@/lib/reviews";
import { stats } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/Reveal";
import { ReviewCard, Stars } from "@/components/ReviewCard";

const ROW_A = REVIEWS.filter((_, i) => i % 2 === 0);
const ROW_B = REVIEWS.filter((_, i) => i % 2 === 1);

export function Testimonials() {
  const rating = averageRating.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section id="testimonianze" className="relative overflow-hidden py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid items-end gap-8 sm:mb-14 lg:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Testimonianze</Eyebrow>
            <SplitReveal
              as="h2"
              text={"Cosa dicono\ni nostri clienti."}
              highlight={["clienti."]}
              className="font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink min-[400px]:text-4xl sm:text-6xl"
            />
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 rounded-3xl border border-ink/[0.08] bg-surface p-4 sm:gap-5 sm:p-5">
              <p className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">{rating}</p>
              <div>
                <Stars rating={Math.round(averageRating)} />
                <p className="mt-1.5 text-sm text-ink/65">Media di {REVIEWS.length} recensioni dei clienti</p>
                <p className="text-xs text-ink/50">
                  {stats[0].value}
                  {stats[0].suffix} progetti completati
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Desktop/tablet: due file che scorrono in direzioni opposte */}
      <div className="mask-fade-x hidden space-y-4 md:block">
        <MarqueeRow reviews={ROW_A} />
        <MarqueeRow reviews={ROW_B} reverse />
      </div>

      {/* Mobile: carosello a scorrimento con aggancio */}
      <MobileCarousel />
    </section>
  );
}

function MarqueeRow({ reviews, reverse = false }: { reviews: typeof REVIEWS; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]",
            reverse ? "animate-[marquee-single_70s_linear_infinite_reverse]" : "animate-[marquee-single_70s_linear_infinite]",
          )}
        >
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} className="w-[400px]" />
          ))}
        </div>
      ))}
    </div>
  );
}

function MobileCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 12)));
  };

  const goTo = (i: number) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 12), behavior: "smooth" });
  };

  return (
    <div className="md:hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((r) => (
          <ReviewCard key={r.name} review={r} className="w-[85vw] max-w-[360px] shrink-0 snap-start" />
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-1.5" role="tablist" aria-label="Scegli recensione">
        {REVIEWS.map((r, i) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Recensione di ${r.name}`}
            onClick={() => goTo(i)}
            className="grid h-6 place-items-center px-0.5"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-bang" : "w-1.5 bg-ink/14",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
