"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  detectBrowserLocale,
  fill,
  isLocale,
  locales,
  messages,
  type Locale,
  type Messages,
} from "../i18n/messages";

export type Theme = "light" | "dark";

type Preferences = {
  locale: Locale;
  theme: Theme;
  setLocale: (l: Locale) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: Messages;
  tf: (template: string, vars: Record<string, string | number>) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);

const LOCALE_KEY = "rio-locale";
const THEME_KEY = "rio-theme";

const localeListeners = new Set<() => void>();
const themeListeners = new Set<() => void>();

function emitLocale() {
  localeListeners.forEach((l) => l());
}
function emitTheme() {
  themeListeners.forEach((l) => l());
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function applyLocale(locale: Locale) {
  const root = document.documentElement;
  const meta = locales.find((l) => l.code === locale);
  root.lang = locale;
  root.dir = meta?.dir ?? "ltr";
}

function readLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (isLocale(stored)) return stored;
    const fromDom = document.documentElement.lang;
    if (isLocale(fromDom)) return fromDom;
    return detectBrowserLocale(
      navigator.languages?.length ? navigator.languages : navigator.language,
    );
  } catch {
    return "en";
  }
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    if (document.documentElement.classList.contains("dark")) return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function subscribeLocale(cb: () => void) {
  localeListeners.add(cb);
  return () => localeListeners.delete(cb);
}

function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribeLocale,
    readLocale,
    () => "en",
  );
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    readTheme,
    () => "light",
  );

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem(LOCALE_KEY, l);
    applyLocale(l);
    emitLocale();
  }, []);

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
    emitTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const t: Messages = messages[locale] ?? messages.en;

  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      setTheme,
      toggleTheme,
      t,
      tf: fill,
    }),
    [locale, theme, setLocale, setTheme, toggleTheme, t],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}
