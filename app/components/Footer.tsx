import { Logo } from "./Logo";
import { IconMapPin, IconPhone, IconClock, IconSend, IconGlobe } from "./icons";

const columns = [
  {
    title: "Меню",
    links: ["Плов", "Манты", "Шашлыки", "Супы", "Десерты", "Напитки"],
  },
  {
    title: "Сервис",
    links: ["Доставка", "Самовывоз", "Бронирование", "QR-заказ", "Лояльность"],
  },
  {
    title: "Компания",
    links: ["О нас", "Филиалы", "Акции", "Вакансии", "Контакты", "FAQ"],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Цифровая сеть чайхан Mubarak — восточная и кыргызская кухня,
              доставка, бронирование и программа лояльности в одном месте.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-cream/70">
              <p className="flex items-center gap-2.5">
                <IconMapPin className="h-4 w-4 text-saffron" />
                Бишкек, пр. Чуй, 128
              </p>
              <p className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 text-saffron" />
                +996 700 000 000
              </p>
              <p className="flex items-center gap-2.5">
                <IconClock className="h-4 w-4 text-saffron" />
                Ежедневно · 09:00 — 00:00
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-cream/90">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-cream/60 transition-colors hover:text-saffron"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 sm:flex-row">
          <p className="text-sm text-cream/50">
            © {new Date().getFullYear()} Mubarak Chaikhana. Все права защищены.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#top"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-saffron hover:text-espresso"
            >
              <IconSend className="h-4 w-4" />
            </a>
            <a
              href="#top"
              aria-label="Сайт"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-saffron hover:text-espresso"
            >
              <IconGlobe className="h-4 w-4" />
            </a>
            <div className="ml-2 flex items-center gap-1.5 text-xs font-medium text-cream/50">
              <span className="rounded px-2 py-1 text-saffron">RU</span>
              <span className="rounded px-2 py-1 hover:text-cream">KY</span>
              <span className="rounded px-2 py-1 hover:text-cream">EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
