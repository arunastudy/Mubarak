import {
  IconUtensils,
  IconTruck,
  IconCalendar,
  IconQr,
  IconCrown,
  IconBell,
  type IconType,
} from "./icons";
import type { Dictionary } from "../i18n/dictionaries";

const featureMeta: { icon: IconType; accent: string }[] = [
  { icon: IconUtensils, accent: "text-clay bg-clay/10" },
  { icon: IconTruck, accent: "text-forest bg-forest/10" },
  { icon: IconCalendar, accent: "text-gold bg-gold/15" },
  { icon: IconQr, accent: "text-clay bg-clay/10" },
  { icon: IconCrown, accent: "text-forest bg-forest/10" },
  { icon: IconBell, accent: "text-gold bg-gold/15" },
];

export function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay">
          {dict.label}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-4 text-lg text-espresso/70">{dict.subtitle}</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureMeta.map(({ icon: Icon, accent }, i) => {
          const item = dict.items[i];
          return (
            <article
              key={item.title}
              className="group rounded-3xl border border-espresso/8 bg-white/70 p-7 transition-all hover:-translate-y-1 hover:border-clay/20 hover:shadow-xl hover:shadow-espresso/5"
            >
              <span
                className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl ${accent}`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-espresso">
                {item.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-espresso/65">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
