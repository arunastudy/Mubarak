import {
  IconTruck,
  IconBag,
  IconUtensils,
  IconWallet,
  IconQr,
  IconCheck,
  type IconType,
} from "./icons";
import type { Dictionary } from "../i18n/dictionaries";

const orderMeta: { icon: IconType; featured?: boolean }[] = [
  { icon: IconTruck, featured: true },
  { icon: IconBag },
  { icon: IconUtensils },
];

export function OrderTypes({ dict }: { dict: Dictionary["orderTypes"] }) {
  return (
    <section id="delivery" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay">
          {dict.label}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-4 text-lg text-espresso/70">{dict.subtitle}</p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {orderMeta.map(({ icon: Icon, featured }, i) => {
          const item = dict.items[i];
          return (
            <article
              key={item.title}
              className={`relative flex flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1 ${
                featured
                  ? "bg-gradient-to-br from-forest to-forest-800 text-cream shadow-2xl shadow-forest/25"
                  : "border border-espresso/8 bg-white/70 text-espresso"
              }`}
            >
              {featured && (
                <span className="absolute right-6 top-6 rounded-full bg-saffron px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-espresso">
                  {dict.featuredBadge}
                </span>
              )}
              <span
                className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl ${
                  featured ? "bg-cream/15 text-saffron" : "bg-clay/10 text-clay"
                }`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">
                {item.title}
              </h3>
              <p
                className={`mt-2 leading-relaxed ${
                  featured ? "text-cream/75" : "text-espresso/65"
                }`}
              >
                {item.text}
              </p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        featured ? "bg-saffron text-espresso" : "bg-forest text-cream"
                      }`}
                    >
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className={featured ? "text-cream/90" : "text-espresso/80"}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Payment methods */}
      <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl border border-espresso/8 bg-white/70 p-7 sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <IconWallet className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-espresso">
              {dict.paymentTitle}
            </p>
            <p className="text-sm text-espresso/60">{dict.paymentSubtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {dict.payments.map((method, i) => (
            <span
              key={method}
              className="inline-flex items-center gap-1.5 rounded-full border border-espresso/10 bg-cream px-3.5 py-1.5 text-sm font-medium text-espresso/75"
            >
              {i === 0 && <IconQr className="h-4 w-4 text-clay" />}
              {method}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
