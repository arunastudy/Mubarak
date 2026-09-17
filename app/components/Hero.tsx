import {
  IconArrowRight,
  IconStar,
  IconStore,
  IconTruck,
  IconClock,
  IconLeaf,
} from "./icons";
import { LogoMark } from "./Logo";
import type { Dictionary } from "../i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute inset-0 pattern-dots opacity-40" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-clay">
            <IconLeaf className="h-4 w-4" />
            {dict.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl">
            {dict.titleLead}
            <span className="relative whitespace-nowrap text-clay">
              {" "}
              Mubarak
            </span>
            <br />
            {dict.titleBrandTail}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/70">
            {dict.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 text-base font-semibold text-cream shadow-lg shadow-clay/25 transition-all hover:bg-clay-dark"
            >
              {dict.orderFood}
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-espresso/15 bg-white/70 px-7 py-3.5 text-base font-semibold text-espresso transition-colors hover:border-espresso/30 hover:bg-white"
            >
              {dict.bookTable}
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className="h-4 w-4"
                    fill="currentColor"
                    stroke="none"
                  />
                ))}
              </div>
              <span className="text-sm text-espresso/70">
                <span className="font-bold text-espresso">4.9</span> ·{" "}
                {dict.reviews}
              </span>
            </div>
            <div className="h-8 w-px bg-espresso/10" />
            <div className="flex items-center gap-2.5 text-sm text-espresso/70">
              <IconStore className="h-5 w-5 text-forest" />
              <span>
                <span className="font-bold text-espresso">9+</span>{" "}
                {dict.branches}
              </span>
            </div>
            <div className="h-8 w-px bg-espresso/10" />
            <div className="flex items-center gap-2.5 text-sm text-espresso/70">
              <IconClock className="h-5 w-5 text-forest" />
              <span>{dict.deliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            {/* Plate rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-forest to-forest-800 shadow-2xl shadow-forest/30" />
            <div className="absolute inset-6 rounded-full border border-cream/10" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-clay via-terracotta to-saffron opacity-90" />
            <div className="absolute inset-12 rounded-full pattern-dots opacity-20" />

            {/* Center emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-full bg-cream/95 shadow-xl backdrop-blur">
                <LogoMark className="h-16 w-16" />
                <span className="font-display text-lg font-bold text-espresso">
                  {dict.since}
                </span>
              </div>
            </div>

            {/* Floating card: delivery */}
            <div className="absolute -left-4 top-10 flex animate-floaty items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl ring-1 ring-espresso/5 sm:-left-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay">
                <IconTruck className="h-6 w-6" />
              </span>
              <div className="pr-1">
                <p className="text-xs text-espresso/50">{dict.cardOrderLabel}</p>
                <p className="text-sm font-bold text-espresso">
                  {dict.cardOrderStatus}
                </p>
              </div>
            </div>

            {/* Floating card: rating */}
            <div className="absolute -right-2 bottom-12 flex animate-floaty items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl ring-1 ring-espresso/5 [animation-delay:1.5s] sm:-right-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <IconStar className="h-6 w-6" fill="currentColor" stroke="none" />
              </span>
              <div className="pr-1">
                <p className="text-sm font-bold text-espresso">
                  {dict.cardRatingTitle}
                </p>
                <p className="text-xs text-espresso/50">{dict.cardRatingSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
