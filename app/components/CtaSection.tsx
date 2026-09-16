import { IconArrowRight, IconPhone } from "./icons";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-clay via-terracotta to-clay-dark px-8 py-14 text-center text-cream sm:px-12 lg:py-20">
        <div className="pointer-events-none absolute inset-0 pattern-dots opacity-15" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-saffron/30 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Готовы попробовать вкус Mubarak?
          </h2>
          <p className="mt-4 text-lg text-cream/85">
            Оформите первый заказ онлайн и получите бонусы на счёт лояльности.
            Доставим горячим за 30 минут.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-semibold text-clay-dark shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Заказать сейчас
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+996700000000"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              <IconPhone className="h-5 w-5" />
              +996 700 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
