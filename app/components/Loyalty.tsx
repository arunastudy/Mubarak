import { IconCrown, IconGift, IconSparkles } from "./icons";

const tiers = [
  {
    name: "Bronze",
    cashback: "3%",
    ring: "from-[#b07a4b] to-[#8a5a2f]",
    perks: "Старт программы",
  },
  {
    name: "Silver",
    cashback: "5%",
    ring: "from-[#b9c0c9] to-[#8b939c]",
    perks: "Персональные скидки",
  },
  {
    name: "Gold",
    cashback: "8%",
    ring: "from-[#e6bf5a] to-[#c8992f]",
    perks: "Подарок на день рождения",
  },
  {
    name: "Platinum",
    cashback: "12%",
    ring: "from-[#4a5568] to-[#1f2733]",
    perks: "Закрытые мероприятия",
  },
];

export function Loyalty() {
  return (
    <section
      id="loyalty"
      className="relative overflow-hidden bg-gradient-to-br from-forest to-forest-800 py-20 text-cream lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-10" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-clay/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-saffron">
            <IconSparkles className="h-4 w-4" />
            Программа лояльности
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Чем чаще заходите — тем больше выгода
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            Копите кешбэк и бонусы, получайте скидки, подарки ко дню рождения и
            приглашайте друзей по реферальной программе.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-3xl border border-cream/10 bg-cream/5 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.ring} text-cream shadow-lg`}
              >
                <IconCrown className="h-6 w-6" />
              </span>
              <p className="mt-5 font-display text-xl font-bold">{tier.name}</p>
              <p className="mt-3 font-display text-4xl font-bold text-saffron">
                {tier.cashback}
              </p>
              <p className="text-sm text-cream/60">кешбэк с каждого заказа</p>
              <p className="mt-4 border-t border-cream/10 pt-4 text-sm text-cream/80">
                {tier.perks}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-3xl border border-cream/10 bg-cream/5 p-6 text-center sm:flex-row sm:text-left">
          <IconGift className="h-8 w-8 text-saffron" />
          <p className="text-cream/85">
            <span className="font-bold text-cream">Приведите друга</span> — и вы
            оба получите бонусы на первый заказ.
          </p>
        </div>
      </div>
    </section>
  );
}
