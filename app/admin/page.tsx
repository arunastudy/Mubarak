import type { Metadata } from "next";
import { getSession } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Вход в админку",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Чтение cookie делает страницу динамической — нужного нам поведения.
  const session = await getSession();

  // Подсказки по настройке: видны только на этой странице и не раскрывают
  // значения переменных, только факт их отсутствия.
  const missingEnv = [
    ["TELEGRAM_BOT_TOKEN", process.env.TELEGRAM_BOT_TOKEN],
    ["TELEGRAM_ADMIN_CHAT_ID", process.env.TELEGRAM_ADMIN_CHAT_ID],
    ["ADMIN_EMAIL", process.env.ADMIN_EMAIL],
    ["ADMIN_PASSWORD", process.env.ADMIN_PASSWORD],
    ["AUTH_SECRET", process.env.AUTH_SECRET],
  ]
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name as string);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-bold tracking-tight text-espresso">
            Mubarak
          </p>
          <p className="mt-1 text-sm uppercase tracking-widest text-clay">
            Панель управления
          </p>
        </div>

        <div className="rounded-3xl border border-espresso/8 bg-white p-7 shadow-xl shadow-espresso/5">
          {session ? (
            <div className="space-y-5 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-2xl">
                ✓
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-espresso">
                  Вход выполнен
                </h1>
                <p className="mt-1 text-sm text-espresso/70">{session.email}</p>
              </div>
              <p className="rounded-xl bg-cream-100 px-4 py-3 text-sm text-espresso/70">
                Двухфакторная проверка пройдена. Сама админка ещё не создана.
              </p>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-espresso/15 px-5 py-3 text-sm font-semibold text-espresso/70 transition-colors hover:bg-cream-100"
                >
                  Выйти
                </button>
              </form>
            </div>
          ) : (
            <>
              <h1 className="font-display text-xl font-bold text-espresso">
                Вход для администратора
              </h1>
              <p className="mt-1 mb-6 text-sm text-espresso/60">
                После пароля придёт 6-значный код в Telegram.
              </p>

              {missingEnv.length > 0 && (
                <p className="mb-5 rounded-xl border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-espresso/80">
                  Не заданы в <code className="font-mono">.env</code>:{" "}
                  <span className="font-semibold">{missingEnv.join(", ")}</span>
                </p>
              )}

              <LoginForm />
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-espresso/45">
          Доступ только для сотрудников Mubarak
        </p>
      </div>
    </main>
  );
}
