type environmentType = "developement" | "production";

export function errorLogger(err: unknown): void {
  const environment: environmentType = import.meta.env.VITE_ENV;
  if (environment === "developement") console.error(err);
}
