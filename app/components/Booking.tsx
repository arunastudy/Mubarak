import {
  IconCalendar,
  IconUsers,
  IconClock,
  IconMapPin,
  IconArrowRight,
  IconCheck,
} from "./icons";

const zones = [
  { name: "Зал", desc: "Уютная основная зона", seats: "до 6 гостей" },
  { name: "Терраса", desc: "Свежий воздух и вид", seats: "до 8 гостей" },
  { name: "VIP", desc: "Отдельная комната", seats: "до 12 гостей" },
];

export function Booking() {
  return (
    <section id="booking" className="relative overflow-hidden bg-cream-100/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-saffron/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            Бронирование
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            Забронируйте стол за минуту
          </h2>
          <p className="mt-4 max-w-lg text-lg text-espresso/70">
            Выберите филиал, зону и время, укажите число гостей и при желании
            закажите блюда заранее. Подтверждение придёт в SMS и Telegram.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="rounded-2xl border border-espresso/8 bg-white/70 p-5"
              >
                <p className="font-display text-lg font-bold text-espresso">
                  {zone.name}
                </p>
                <p className="mt-1 text-sm text-espresso/60">{zone.desc}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-forest">
                  <IconUsers className="h-4 w-4" />
                  {zone.seats}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#booking"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-forest-800"
          >
            Забронировать сейчас
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Reservation preview card */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-espresso/8 bg-white p-6 shadow-2xl shadow-espresso/10">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold text-espresso">
                Новое бронирование
              </p>
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
                Подтверждено
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <Row icon={IconMapPin} label="Филиал" value="Mubarak · Центр" />
              <Row icon={IconCalendar} label="Дата" value="Сб, 20 сентября" />
              <Row icon={IconClock} label="Время" value="19:30 — 21:30" />
              <Row icon={IconUsers} label="Гостей" value="4 гостя · Терраса" />
            </div>

            <div className="mt-5 rounded-2xl bg-cream-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-espresso/60">Предзаказ</span>
                <span className="text-sm font-semibold text-espresso">
                  Плов, манты, чай
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-espresso/10 pt-2">
                <span className="text-sm text-espresso/60">Депозит</span>
                <span className="font-display text-base font-bold text-espresso">
                  1 000 сом
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-forest px-4 py-3 text-cream">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/15">
                <IconCheck className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium">
                Подтверждение отправлено в Telegram
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-espresso/8 pb-3">
      <span className="flex items-center gap-2.5 text-sm text-espresso/60">
        <Icon className="h-5 w-5 text-clay" />
        {label}
      </span>
      <span className="text-sm font-semibold text-espresso">{value}</span>
    </div>
  );
}
