import { IconArrowRight, IconFlame, IconStar } from "./icons";

const categories = [
  { name: "Плов", count: "8 видов", tone: "from-clay to-terracotta" },
  { name: "Манты", count: "6 видов", tone: "from-forest to-forest-700" },
  { name: "Шашлыки", count: "12 видов", tone: "from-terracotta to-saffron" },
  { name: "Супы", count: "9 видов", tone: "from-forest-700 to-forest" },
  { name: "Салаты", count: "14 видов", tone: "from-saffron to-gold" },
  { name: "Десерты", count: "10 видов", tone: "from-clay to-clay-dark" },
];

const signatureDishes = [
  {
    name: "Плов по-фергански",
    desc: "Рис девзира, баранина, морковь, зира",
    price: "390",
    weight: "350 г",
    badge: "Хит",
    spicy: false,
  },
  {
    name: "Манты с бараниной",
    desc: "Ручная лепка, сочная начинка, лук",
    price: "280",
    weight: "5 шт · 300 г",
    badge: "Популярное",
    spicy: false,
  },
  {
    name: "Шашлык из баранины",
    desc: "Маринад по-восточному, лаваш, соус",
    price: "340",
    weight: "250 г",
    badge: "Острое",
    spicy: true,
  },
];

export function MenuShowcase() {
  return (
    <section id="menu" className="bg-cream-100/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-clay">
              Меню
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
              Более 200 блюд восточной кухни
            </h2>
            <p className="mt-4 text-lg text-espresso/70">
              Завтраки, супы, плов, манты, шашлыки, кыргызская кухня, десерты и
              напитки — всё готовится из свежих продуктов каждый день.
            </p>
          </div>
          <a
            href="#menu"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-espresso/15 bg-white px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-clay/30 hover:text-clay"
          >
            Открыть всё меню
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Category tiles */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#menu"
              className={`group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${cat.tone} p-4 text-cream shadow-md transition-transform hover:-translate-y-1`}
            >
              <div className="pattern-dots absolute inset-0 opacity-20" />
              <div className="absolute right-3 top-3 h-9 w-9 rounded-full border border-cream/30" />
              <div className="relative">
                <p className="font-display text-lg font-bold">{cat.name}</p>
                <p className="text-xs text-cream/75">{cat.count}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Signature dishes */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {signatureDishes.map((dish) => (
            <article
              key={dish.name}
              className="flex overflow-hidden rounded-3xl border border-espresso/8 bg-white transition-shadow hover:shadow-xl hover:shadow-espresso/5"
            >
              <div className="relative w-28 shrink-0 bg-gradient-to-br from-sand to-cream-100">
                <div className="pattern-dots absolute inset-0 opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-clay shadow-sm">
                    {dish.spicy ? (
                      <IconFlame className="h-7 w-7" />
                    ) : (
                      <IconStar className="h-7 w-7" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold leading-tight text-espresso">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-clay/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-clay">
                    {dish.badge}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-espresso/60">{dish.desc}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs text-espresso/45">{dish.weight}</span>
                  <span className="font-display text-lg font-bold text-espresso">
                    {dish.price}{" "}
                    <span className="text-sm font-medium text-espresso/50">
                      сом
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
