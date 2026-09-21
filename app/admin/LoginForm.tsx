"use client";

import { useActionState, useEffect, useRef } from "react";
import { loginAction } from "./actions";
import { initialLoginState } from "./login-state";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialLoginState);
  const codeInputRef = useRef<HTMLInputElement>(null);

  // При переходе на шаг кода ставим курсор в поле ввода.
  useEffect(() => {
    if (state.step === "code") codeInputRef.current?.focus();
  }, [state.step]);

  const isCodeStep = state.step === "code";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="intent" value={isCodeStep ? "code" : "credentials"} />

      {isCodeStep ? (
        <>
          <p className="text-sm text-espresso/70">
            Мы отправили 6-значный код в Telegram-бот{" "}
            <span className="font-semibold text-espresso">@mubarak_admin_bot</span>.
          </p>

          <Field label="Код из Telegram" htmlFor="code">
            <input
              ref={codeInputRef}
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              required
              disabled={pending}
              aria-describedby={state.error ? "login-error" : undefined}
              placeholder="000000"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-espresso outline-none transition-colors placeholder:text-espresso/25 focus:border-clay focus:ring-2 focus:ring-clay/20 disabled:opacity-60"
            />
          </Field>

          <Messages error={state.error} notice={state.notice} />

          <div className="flex gap-3">
            <SubmitButton pending={pending}>Подтвердить</SubmitButton>
            <button
              type="submit"
              name="intent"
              value="cancel"
              disabled={pending}
              className="rounded-xl border border-espresso/15 px-4 py-3 text-sm font-semibold text-espresso/70 transition-colors hover:bg-cream-100 disabled:opacity-60"
            >
              Назад
            </button>
          </div>
        </>
      ) : (
        <>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              disabled={pending}
              aria-describedby={state.error ? "login-error" : undefined}
              placeholder="admin@mubarak.kg"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-espresso outline-none transition-colors placeholder:text-espresso/35 focus:border-clay focus:ring-2 focus:ring-clay/20 disabled:opacity-60"
            />
          </Field>

          <Field label="Пароль" htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
              aria-describedby={state.error ? "login-error" : undefined}
              placeholder="••••••••"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-espresso outline-none transition-colors placeholder:text-espresso/35 focus:border-clay focus:ring-2 focus:ring-clay/20 disabled:opacity-60"
            />
          </Field>

          <Messages error={state.error} notice={state.notice} />

          <SubmitButton pending={pending} full>
            Получить код в Telegram
          </SubmitButton>
        </>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-espresso"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Messages({ error, notice }: { error?: string; notice?: string }) {
  if (!error && !notice) return null;

  return (
    <div aria-live="polite">
      {error ? (
        <p
          id="login-error"
          role="alert"
          className="rounded-xl border border-clay/25 bg-clay/8 px-4 py-3 text-sm font-medium text-clay-dark"
        >
          {error}
        </p>
      ) : (
        <p className="rounded-xl border border-forest/20 bg-forest/8 px-4 py-3 text-sm font-medium text-forest">
          {notice}
        </p>
      )}
    </div>
  );
}

function SubmitButton({
  pending,
  full,
  children,
}: {
  pending: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${full ? "w-full" : "flex-1"} inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
          />
          Отправка…
        </>
      ) : (
        children
      )}
    </button>
  );
}
