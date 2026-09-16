import {
  IconUtensils,
  IconTruck,
  IconCalendar,
  IconQr,
  IconCrown,
  IconBell,
  type IconType,
} from "./icons";

type Feature = {
  icon: IconType;
  title: string;
  text: string;
  accent: string;
};

const features: Feature[] = [
  {
    icon: IconUtensils,
    title: "Умное онлайн-меню",
    text: "Фото, состав, калории, БЖУ, аллергены, вес и время приготовления — по каждому блюду.",
    accent: "text-clay bg-clay/10",
  },
  {
    icon: IconTruck,
    title: "Быстрая доставка",
    text: "Автораспределение заказов, GPS курьера и точное время прибытия на карте.",
    accent: "text-forest bg-forest/10",
  },
  {
    icon: IconCalendar,
    title: "Бронирование столов",
    text: "Выбор филиала, зоны — зал, терраса или VIP, даты, времени и предзаказ блюд.",
    accent: "text-gold bg-gold/15",
  },
  {
    icon: IconQr,
    title: "QR-заказ за столом",
    text: "Отсканируйте QR на столе — откройте меню, закажите и оплатите счёт без ожидания.",
    accent: "text-clay bg-clay/10",
  },
  {
    icon: IconCrown,
    title: "Программа лояльности",
    text: "Кешбэк, бонусы и подарки ко дню рождения на уровнях Bronze, Silver, Gold и Platinum.",
    accent: "text-forest bg-forest/10",
  },
  {
    icon: IconBell,
    title: "Уведомления",
    text: "Статус заказа и бронирования в реальном времени — push, SMS и Telegram.",
    accent: "text-gold bg-gold/15",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay">
          Возможности
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
          Всё для комфортного заказа
        </h2>
        <p className="mt-4 text-lg text-espresso/70">
          Одна платформа объединяет меню, доставку, бронирование и лояльность —
          в вебе, мобильном приложении и Telegram.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text, accent }) => (
          <article
            key={title}
            className="group rounded-3xl border border-espresso/8 bg-white/70 p-7 transition-all hover:-translate-y-1 hover:border-clay/20 hover:shadow-xl hover:shadow-espresso/5"
          >
            <span
              className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl ${accent}`}
            >
              <Icon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-espresso">
              {title}
            </h3>
            <p className="mt-2.5 leading-relaxed text-espresso/65">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
