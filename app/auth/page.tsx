import type { Metadata } from "next";
import Link from "next/link";
import { MIN_PASSWORD_LENGTH, getCurrentUser, userDisplayName } from "@/lib/auth";
import { isGoogleConfigured, safeNextPath } from "@/lib/google-oauth";
import { Logo } from "../components/Logo";
import { IconArrowRight, IconCheck } from "../components/icons";
import { getDictionary, getLocale } from "../i18n/dictionaries";
import { AuthForm } from "./AuthForm";
import { logoutAction } from "./actions";
import { authErrorFromUrl, type AuthMode } from "./auth-state";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.auth.badge,
    // Страница входа не нужна в поиске.
    robots: { index: false, follow: false },
  };
}

/** Из ?a=1&a=2 берём первое значение. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthPage({ searchParams }: PageProps<"/auth">) {
  const params = await searchParams;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  // Чтение cookie делает страницу динамической — это и нужно.
  const user = await getCurrentUser();

  const nextPath = safeNextPath(first(params.next));
  const mode: AuthMode = first(params.mode) === "register" ? "register" : "login";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-5 py-12">
      <div
        aria-hidden="true"
        className="pattern-dots pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-7 flex flex-col items-center gap-3 text-center"
          aria-label={dict.nav.homeAria}
        >
          <Logo />
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-clay">
            {dict.auth.badge}
          </span>
        </Link>

        <div className="rounded-3xl border border-espresso/8 bg-white p-7 shadow-xl shadow-espresso/5 sm:p-8">
          {user ? (
            <div className="space-y-5 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                <IconCheck className="h-6 w-6" />
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-espresso">
                  {dict.auth.session.title}
                </h1>
                <p className="mt-1 text-sm text-espresso/60">
                  {userDisplayName(user) || user.email}
                </p>
              </div>

              <Link
                href="/"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-800"
              >
                {dict.auth.session.home}
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-espresso/15 px-5 py-3 text-sm font-semibold text-espresso/70 transition-colors hover:bg-cream-100"
                >
                  {dict.auth.session.logout}
                </button>
              </form>
            </div>
          ) : (
            <AuthForm
              dict={dict.auth}
              initialMode={mode}
              initialError={authErrorFromUrl(first(params.error))}
              nextPath={nextPath}
              minPasswordLength={MIN_PASSWORD_LENGTH}
              googleEnabled={isGoogleConfigured()}
            />
          )}
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-medium text-espresso/50 transition-colors hover:text-espresso"
        >
          {dict.auth.backHome}
        </Link>
      </div>
    </main>
  );
}
