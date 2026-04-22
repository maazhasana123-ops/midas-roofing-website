"use client";

import * as React from "react";
import Image from "next/image";
import { Award, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeItem {
  icon: React.ElementType;
  label: string;
}

const badges: BadgeItem[] = [
  { icon: ShieldCheck, label: "Certified Installation" },
  { icon: Award, label: "Preferred Contractor" },
  { icon: CheckCircle2, label: "Manufacturer Warranty" },
];

const StatBadge = ({ icon: Icon, label }: BadgeItem) => (
  <div className="flex items-center gap-2 text-xs text-cream/55 font-jakarta font-medium">
    <Icon className="h-3.5 w-3.5 text-gold/70 flex-shrink-0" />
    <span>{label}</span>
  </div>
);

export const OwensCorningCard = ({ className }: { className?: string }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-dark-card p-8 md:flex-row md:gap-16 md:p-12",
        "transition-all duration-700",
        hovered && "border-gold/20 shadow-gold",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background radial glow — gold tinted on hover */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[400px] w-[400px] rounded-full transition-opacity duration-700",
          "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,168,76,0.12)_0%,transparent_100%)]",
          hovered ? "opacity-100" : "opacity-40"
        )}
      />

      {/* ── Left: Text Content ── */}
      <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3.5 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[10px] font-jakarta font-semibold tracking-[0.14em] uppercase">
            Preferred Contractor
          </span>
        </div>

        <h2 className="font-jakarta font-bold text-3xl md:text-4xl text-cream tracking-tight leading-tight">
          Owens Corning<br />
          <span className="gold-shimmer">Preferred Contractor</span>
        </h2>

        <p className="mt-3 text-sm text-cream/50 font-inter leading-relaxed max-w-sm">
          Midas Roofing is an officially certified Owens Corning Preferred
          Contractor — meaning stricter standards, factory-backed warranties,
          and premium materials on every roof we touch.
        </p>

        {/* Stat badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          {badges.map((b) => (
            <StatBadge key={b.label} icon={b.icon} label={b.label} />
          ))}
        </div>

        {/* Star row */}
        <div className="mt-5 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 text-yellow-400"
                fill="currentColor"
              />
            ))}
          </div>
          <span className="text-xs text-cream/40 font-jakarta">
            Top-rated by Owens Corning
          </span>
        </div>
      </div>

      {/* ── Right: 3-D Logo Card ── */}
      <div className="z-10 flex-shrink-0 [perspective:900px]">
        <div
          className={cn(
            "group relative h-52 w-52 md:h-60 md:w-60 transition-all duration-500 ease-out [transform-style:preserve-3d]",
            hovered
              ? "[transform:rotateY(-18deg)_rotateX(12deg)_scale(1.06)]"
              : "[transform:rotateY(-6deg)_rotateX(4deg)_scale(1)]"
          )}
        >
          {/* Back depth layers */}
          <div className="absolute h-full w-full rounded-3xl bg-white/[0.04] [transform:translateZ(-28px)]" />
          <div className="absolute h-full w-full rounded-3xl bg-white/[0.025] [transform:translateZ(-14px)]" />

          {/* Gold glow ring */}
          <div
            className={cn(
              "absolute -inset-1 rounded-3xl transition-opacity duration-500",
              "bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.3)_0%,transparent_75%)]",
              hovered ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Main face */}
          <div className="absolute flex h-full w-full items-center justify-center rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] [transform:translateZ(0px)]">
            <Image
              src="/images/owens-corning.png"
              alt="Owens Corning Preferred Contractor"
              width={180}
              height={180}
              className="h-2/3 w-2/3 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
