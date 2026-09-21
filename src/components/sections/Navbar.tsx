"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, offer, OFFER_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { CountdownInline } from "@/components/offer/Countdown";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 2 && !menuOpen);
  });

  // blocca lo scroll della pagina sotto il menu mobile
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, lenis]);

  const closeMenu = () => {
    lenis?.start(); // deve ripartire prima che Lenis gestisca il click sull'ancora
    document.body.style.overflow = "";
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "mx-auto mt-2 flex max-w-7xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-500 sm:mt-3 sm:py-2.5 sm:pl-5 sm:pr-3",
            scrolled || menuOpen
              ? "mx-2 border border-white/[0.08] bg-ink/75 backdrop-blur-xl sm:mx-6 xl:mx-auto"
              : "mx-2 border border-transparent sm:mx-6 xl:mx-auto",
          )}
        >
          <a href="#top" aria-label="Webbang — torna all'inizio" onClick={closeMenu}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principale">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span className="absolute inset-0 translate-y-full text-bang transition-transform duration-300 group-hover:translate-y-0">
                    {l.label}
                  </span>
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href={OFFER_PATH}
              className="inline-flex h-10 items-center rounded-full bg-bang px-4 text-sm font-bold text-ink transition hover:bg-white sm:h-11 sm:px-5"
            >
              <span className="sm:hidden">−{offer.discount}%</span>
              <span className="hidden sm:inline">Richiedi −{offer.discount}%</span>
            </Link>
            <button
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={menuOpen}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 sm:h-11 sm:w-11 lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-white transition-all duration-300",
                  menuOpen ? "rotate-45" : "-translate-y-1.5",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-white transition-all duration-300",
                  menuOpen ? "-rotate-45" : "translate-y-1.5",
                )}
              />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="fixed left-0 top-0 h-[2px] w-full origin-left bg-bang"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-24 lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-50" />
            <nav className="relative flex flex-col" aria-label="Menu mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-[2rem] font-bold leading-tight text-white active:text-bang"
                >
                  <span className="font-mono text-xs text-bang">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-auto pt-8"
            >
              <div className="mb-3 flex justify-center text-sm text-white/55">
                <CountdownInline prefix="Adesioni aperte ancora per" />
              </div>
              <Link
                href={OFFER_PATH}
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-bang py-4 text-base font-bold text-ink"
              >
                Richiedi lo Sconto {offer.discount}%
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
