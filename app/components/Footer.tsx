import { Logo } from "./Logo";
import { IconMapPin, IconPhone, IconClock, IconSend, IconGlobe } from "./icons";
import type { Dictionary } from "../i18n/dictionaries";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const copyright = dict.copyright.replace(
    "{year}",
    new Date().getFullYear().toString()
  );

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {dict.description}
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-cream/70">
              <p className="flex items-center gap-2.5">
                <IconMapPin className="h-4 w-4 text-saffron" />
                {dict.address}
              </p>
              <p className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 text-saffron" />
                {dict.phone}
              </p>
              <p className="flex items-center gap-2.5">
                <IconClock className="h-4 w-4 text-saffron" />
                {dict.hours}
              </p>
            </div>
          </div>

          {dict.columns.map((col) => (
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
          <p className="text-sm text-cream/50">{copyright}</p>
          <div className="flex items-center gap-3">
            <a
              href="#top"
              aria-label={dict.telegramAria}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-saffron hover:text-espresso"
            >
              <IconSend className="h-4 w-4" />
            </a>
            <a
              href="#top"
              aria-label={dict.siteAria}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-saffron hover:text-espresso"
            >
              <IconGlobe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
