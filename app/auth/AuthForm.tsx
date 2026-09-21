"use client";

import { useActionState, useState } from "react";
import { IconArrowRight, IconGoogle } from "../components/icons";
import type { Dictionary } from "../i18n/dictionaries";
import { authAction } from "./actions";
import { initialAuthState, type AuthErrorCode, type AuthMode } from "./auth-state";

type AuthFormProps = {
  dict: Dictionary["auth"];
  /** Вкладка, открытая при заходе на страницу (?mode=register). */
  initialMode: AuthMode;
  /** Ошибка из ?error=… — например, неудачный возврат от Google. */
  initialError?: AuthErrorCode;
  /** Куда вернуть гостя после входа. */
  nextPath: string;
  minPasswordLength: number;
  /** false, если в .env нет ключей Google — тогда кнопка неактивна. */
  googleEnabled: boolean;
};

export function AuthForm({
  dict,
  initialMode,
  initialError,
  nextPath,
  minPasswordLength,
  googleEnabled,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(authAction, initialAuthState);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  // Переключение вкладки прячет ошибку от предыдущей попытки: она относилась
  // к другой форме. Новая отправка снова показывает ошибки.
  const [errorHidden, setErrorHidden] = useState(false);

  const isRegister = mode === "register";
  const copy = isRegister ? dict.register : dict.login;
  const errorCode = errorHidden ? undefined : (state.error ?? initialError);
  const error = errorCode
    ? dict.errors[errorCode].replace("{min}", String(minPasswordLength))
    : undefined;

  function switchMode(next: AuthMode) {
    if (next === mode) return;
    setMode(next);
    setErrorHidden(true);
  }

  return (
    <>
      <div
        className="mb-7 grid grid-cols-2 gap-1 rounded-2xl bg-cream-100 p-1"
        role="group"
        aria-label={dict.badge}
      >
        {(["login", "register"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => switchMode(value)}
            aria-pressed={mode === value}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              mode === value
                ? "bg-white text-espresso shadow-sm shadow-espresso/5"
                : "text-espresso/55 hover:text-espresso"
            }`}
          >
            {dict.tabs[value]}
          </button>
        ))}
      </div>

      <h1 className="font-display text-2xl font-bold tracking-tight text-espresso">
        {copy.title}
      </h1>
      <p className="mt-1.5 mb-6 text-sm leading-relaxed text-espresso/60">
        {copy.subtitle}
      </p>

      <form
        action={formAction}
        onSubmit={() => setErrorHidden(false)}
        className="space-y-4"
        noValidate
      >
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="next" value={nextPath} />

        {isRegister && (
          <Field key="name" label={dict.fields.name} htmlFor="auth-name">
            <input
              id="auth-name"
              name="name"
              type="text"
              autoComplete="given-name"
              required
              disabled={pending}
              placeholder={dict.fields.namePlaceholder}
              className={inputClass}
            />
          </Field>
        )}

        <Field key="email" label={dict.fields.email} htmlFor="auth-email">
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={pending}
            aria-describedby={error ? "auth-error" : undefined}
            placeholder={dict.fields.emailPlaceholder}
            className={inputClass}
          />
        </Field>

        <Field
          key="password"
          label={dict.fields.password}
          htmlFor="auth-password"
          hint={
            isRegister
              ? dict.fields.passwordHint.replace("{min}", String(minPasswordLength))
              : undefined
          }
        >
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            minLength={isRegister ? minPasswordLength : undefined}
            disabled={pending}
            aria-describedby={error ? "auth-error" : undefined}
            placeholder={dict.fields.passwordPlaceholder}
            className={inputClass}
          />
        </Field>

        <div aria-live="polite">
          {error && (
            <p
              id="auth-error"
              role="alert"
              className="rounded-xl border border-clay/25 bg-clay/8 px-4 py-3 text-sm font-medium text-clay-dark"
            >
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
              />
              {dict.pending}
            </>
          ) : (
            <>
              {copy.submit}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Вход через Google — под инпутами, после разделителя. */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-espresso/10" />
        <span className="text-xs font-medium uppercase tracking-widest text-espresso/40">
          {dict.or}
        </span>
        <span className="h-px flex-1 bg-espresso/10" />
      </div>

      {googleEnabled ? (
        <a
          href={`/api/auth/google?next=${encodeURIComponent(nextPath)}`}
          className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-espresso/15 bg-white px-5 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-cream-100"
        >
          <IconGoogle className="h-5 w-5" />
          {dict.google}
        </a>
      ) : (
        <p className="rounded-xl border border-saffron/40 bg-saffron/10 px-4 py-3 text-center text-sm text-espresso/70">
          {dict.googleUnavailable}
        </p>
      )}

      {isRegister && (
        <p className="mt-5 text-center text-xs leading-relaxed text-espresso/45">
          {dict.legal}
        </p>
      )}
    </>
  );
}

const inputClass =
  "w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-espresso outline-none transition-colors placeholder:text-espresso/35 focus:border-clay focus:ring-2 focus:ring-clay/20 disabled:opacity-60";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-espresso">
          {label}
        </label>
        {hint && <span className="text-xs text-espresso/45">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
