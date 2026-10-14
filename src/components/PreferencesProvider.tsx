"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextLocale = isLocale(storedLocale)
      ? storedLocale
      : detectBrowserLocale(navigator.languages?.length ? navigator.languages : navigator.language);
    const nextTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
    setLocaleState(nextLocale);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    applyLocale(nextLocale);
    if (!isLocale(storedLocale)) {
      localStorage.setItem(LOCALE_KEY, nextLocale);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_KEY, l);
    applyLocale(l);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const t: Messages = messages[locale];

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
