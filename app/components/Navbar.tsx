"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { IconMenu, IconClose, IconArrowRight, IconGlobe } from "./icons";

const links = [
  { href: "#menu", label: "Меню" },
  { href: "#delivery", label: "Доставка" },
  { href: "#booking", label: "Бронирование" },
  { href: "#loyalty", label: "Лояльность" },
  { href: "#branches", label: "Филиалы" },
];

const languages = ["RU", "KY", "EN"] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<(typeof languages)[number]>("RU");

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/8 bg-cream/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="Mubarak — на главную">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-espresso/70 transition-colors hover:bg-espresso/5 hover:text-espresso"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center rounded-full border border-espresso/10 bg-white/60 p-0.5 sm:flex">
            <IconGlobe className="ml-2 mr-1 h-4 w-4 text-espresso/40" />
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === code
                    ? "bg-forest text-cream"
                    : "text-espresso/50 hover:text-espresso"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href="#menu"
            className="group hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-cream shadow-sm shadow-clay/20 transition-all hover:bg-clay-dark hover:shadow-md sm:inline-flex"
          >
            Заказать
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 text-espresso lg:hidden"
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-espresso/8 bg-cream lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-espresso/80 hover:bg-espresso/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-clay px-5 py-3 text-base font-semibold text-cream"
              >
                Заказать сейчас
                <IconArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
