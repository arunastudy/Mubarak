// Тип и начальное значение состояния формы логина.
//
// Держим их отдельно от actions.ts: файл с "use server" может экспортировать
// только async-функции, поэтому объект initialLoginState там жить не может.
// См. https://nextjs.org/docs/messages/invalid-use-server-value

export type LoginState = {
  /** Какой шаг показывать в форме. */
  step: "credentials" | "code";
  error?: string;
  notice?: string;
  /** email, прошедший первый шаг. */
  email?: string;
};

export const initialLoginState: LoginState = { step: "credentials" };
