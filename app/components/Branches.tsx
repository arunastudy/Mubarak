import { IconMapPin, IconClock, IconArrowRight, IconStore } from "./icons";
import type { Dictionary } from "../i18n/dictionaries";

export function Branches({ dict }: { dict: Dictionary["branches"] }) {
  return (
    <section id="branches" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            {dict.label}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-lg text-espresso/70">{dict.subtitle}</p>
        </div>
        <a
          href="#branches"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-espresso/15 bg-white px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-clay/30 hover:text-clay"
        >
          {dict.viewMap}
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.items.map((branch) => (
          <article
            key={branch.name}
            className="group flex flex-col rounded-3xl border border-espresso/8 bg-white/70 p-6 transition-all hover:-translate-y-1 hover:border-clay/20 hover:shadow-xl hover:shadow-espresso/5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                <IconStore className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-espresso/60">
                {branch.city}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-espresso">
              {branch.name}
            </h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-espresso/65">
              <IconMapPin className="h-4 w-4 shrink-0 text-clay" />
              {branch.address}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-espresso/65">
              <IconClock className="h-4 w-4 shrink-0 text-clay" />
              {branch.hours}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
