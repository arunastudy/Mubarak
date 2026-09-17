import {
  IconCalendar,
  IconUsers,
  IconClock,
  IconMapPin,
  IconArrowRight,
  IconCheck,
} from "./icons";
import type { Dictionary } from "../i18n/dictionaries";

export function Booking({ dict }: { dict: Dictionary["booking"] }) {
  return (
    <section id="booking" className="relative overflow-hidden bg-cream-100/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-saffron/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            {dict.label}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-espresso/70">
            {dict.subtitle}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {dict.zones.map((zone) => (
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
            {dict.book}
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Reservation preview card */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-espresso/8 bg-white p-6 shadow-2xl shadow-espresso/10">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold text-espresso">
                {dict.cardTitle}
              </p>
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
                {dict.cardStatus}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <Row icon={IconMapPin} label={dict.rowBranch} value={dict.rowBranchValue} />
              <Row icon={IconCalendar} label={dict.rowDate} value={dict.rowDateValue} />
              <Row icon={IconClock} label={dict.rowTime} value={dict.rowTimeValue} />
              <Row icon={IconUsers} label={dict.rowGuests} value={dict.rowGuestsValue} />
            </div>

            <div className="mt-5 rounded-2xl bg-cream-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-espresso/60">{dict.preorder}</span>
                <span className="text-sm font-semibold text-espresso">
                  {dict.preorderValue}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-espresso/10 pt-2">
                <span className="text-sm text-espresso/60">{dict.deposit}</span>
                <span className="font-display text-base font-bold text-espresso">
                  {dict.depositValue}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-forest px-4 py-3 text-cream">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/15">
                <IconCheck className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium">{dict.confirmation}</p>
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
