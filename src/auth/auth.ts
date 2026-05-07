const AUTH_KEY = "retire-ten-vault:admin-auth";
const SESSION_DAYS = 7;
const DEFAULT_PASSWORD = "barrybrooksby";

const env = import.meta.env as Record<string, string | undefined>;

const getConfiguredPassword = (): string => {
  const v = env.VITE_ADMIN_PASSWORD;
  return v && v.trim().length > 0 ? v : DEFAULT_PASSWORD;
};

export const isUsingDefaultPassword = (): boolean => {
  const v = env.VITE_ADMIN_PASSWORD;
  return !v || v.trim().length === 0;
};

export const isAuthed = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as { ts?: number };
    if (typeof data.ts !== "number") return false;
    const age = Date.now() - data.ts;
    return age >= 0 && age < SESSION_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

export const login = (password: string): boolean => {
  if (password !== getConfiguredPassword()) return false;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ts: Date.now() }));
  return true;
};

export const logout = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
};
