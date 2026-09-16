import {
  IconSmartphone,
  IconBell,
  IconQr,
  IconSend,
  IconCheck,
  IconClock,
  IconTruck,
} from "./icons";
import { LogoMark } from "./Logo";

const perks = [
  { icon: IconBell, text: "Push-уведомления о статусе заказа" },
  { icon: IconQr, text: "QR-заказ и оплата прямо за столом" },
  { icon: IconClock, text: "Оффлайн-меню и быстрый доступ" },
];

export function AppPromo() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-espresso/8 bg-cream-100/70 p-8 sm:p-12 lg:grid-cols-2 lg:gap-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-clay">
            <IconSmartphone className="h-4 w-4" />
            Приложение · PWA
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            Mubarak всегда под рукой
          </h2>
          <p className="mt-4 max-w-lg text-lg text-espresso/70">
            Установите приложение без App Store прямо из браузера. Заказывайте,
            бронируйте и копите бонусы со смартфона — и получайте заказы через
            Telegram-бот.
          </p>

          <ul className="mt-7 space-y-3.5">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-espresso/80">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-espresso/90"
            >
              <IconSmartphone className="h-5 w-5" />
              Установить приложение
            </a>
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#229ED9] px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              <IconSend className="h-5 w-5" />
              Открыть в Telegram
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto flex justify-center">
          <div className="relative h-[30rem] w-64 rounded-[2.5rem] border-[10px] border-espresso bg-forest shadow-2xl shadow-espresso/25">
            <div className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-cream/20" />
            <div className="flex h-full flex-col p-4 pt-9 text-cream">
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-9 w-9" />
                <div>
                  <p className="font-display text-sm font-bold">Mubarak</p>
                  <p className="text-[0.6rem] text-cream/50">Доставка · Центр</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-cream/10 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cream/60">Заказ #4821</span>
                  <span className="flex items-center gap-1 rounded-full bg-saffron px-2 py-0.5 text-[0.6rem] font-bold text-espresso">
                    <IconTruck className="h-3 w-3" />В пути
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-espresso">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <div className="h-0.5 flex-1 rounded bg-saffron" />
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-espresso">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <div className="h-0.5 flex-1 rounded bg-cream/20" />
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream/15 text-cream/50">
                    <IconTruck className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-2.5 text-center text-xs text-cream/70">
                  Прибудет через <span className="font-bold text-cream">12 мин</span>
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {["Плов по-фергански", "Манты с бараниной", "Чай с чабрецом"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl bg-cream/5 px-3 py-2.5 text-xs"
                    >
                      <span className="text-cream/85">{item}</span>
                      <span className="text-cream/50">×1</span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-auto rounded-2xl bg-clay px-4 py-3 text-center text-sm font-semibold">
                Итого · 1 060 сом
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
