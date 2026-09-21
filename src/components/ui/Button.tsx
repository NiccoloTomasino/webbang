"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "dark";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 sm:px-7 sm:py-4 sm:text-[15px]";

const variants: Record<Variant, string> = {
  primary: "bg-bang text-ink shadow-[0_0_0_0_rgba(255,214,10,0.5)] hover:shadow-[0_10px_40px_-8px_rgba(255,214,10,0.55)]",
  ghost: "border border-white/15 text-white hover:border-bang/60",
  dark: "bg-ink text-white hover:text-ink",
};

const fill: Record<Variant, string> = {
  primary: "bg-white",
  ghost: "bg-bang",
  dark: "bg-bang",
};

function Inner({ children, variant, icon }: { children: ReactNode; variant: Variant; icon: boolean }) {
  return (
    <>
      {/* riempimento circolare al passaggio del mouse */}
      <span
        aria-hidden
        className={cn(
          "absolute left-1/2 top-full h-[260%] w-[140%] -translate-x-1/2 rounded-[50%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[62%]",
          fill[variant],
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-300",
          variant === "ghost" && "group-hover:text-ink",
          variant === "dark" && "group-hover:text-ink",
        )}
      >
        {children}
        {icon && (
          <span className="relative h-4 w-4 overflow-hidden">
            <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-4 group-hover:translate-x-4" />
            <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        )}
      </span>
    </>
  );
}

export function Button({
  variant = "primary",
  icon = true,
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; icon?: boolean }) {
  return (
    <Magnetic strength={0.25}>
      <button type="button" className={cn(base, variants[variant], className)} {...rest}>
        <Inner variant={variant} icon={icon}>
          {children}
        </Inner>
      </button>
    </Magnetic>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  icon = true,
  className,
  children,
  ...rest
}: ComponentProps<"a"> & { variant?: Variant; icon?: boolean }) {
  return (
    <Magnetic strength={0.25}>
      {href?.startsWith("/") ? (
        <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
          <Inner variant={variant} icon={icon}>
            {children}
          </Inner>
        </Link>
      ) : (
        <a href={href} className={cn(base, variants[variant], className)} {...rest}>
          <Inner variant={variant} icon={icon}>
            {children}
          </Inner>
        </a>
      )}
    </Magnetic>
  );
}
