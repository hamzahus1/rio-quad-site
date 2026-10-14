"use client";

import { useEffect, useRef, useState } from "react";
import { locales } from "../i18n/messages";
import { usePreferences } from "./PreferencesProvider";

export function HeaderControls() {
  const { locale, setLocale, theme, toggleTheme, t } = usePreferences();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-gray-100 p-1 dark:bg-white/10">
      <div ref={rootRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t.language}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-transparent px-2.5 text-[12px] font-semibold leading-none text-[#1f1f1f] transition-colors hover:bg-white sm:gap-1.5 sm:px-3 dark:text-white dark:hover:bg-[#1f1f1f]"
        >
          <GlobeIcon />
          <span className="uppercase tracking-wide">{current.short}</span>
          <span className="hidden sm:inline">
            <ChevronIcon open={open} />
          </span>
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label={t.language}
            className="absolute end-0 top-[calc(100%+6px)] z-50 min-w-[168px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-[#171717]"
          >
            {locales.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[13px] transition-colors ${
                      active
                        ? "bg-gray-50 font-semibold text-[#111] dark:bg-white/10 dark:text-white"
                        : "text-[#444] hover:bg-gray-50 dark:text-white/70 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8C8C8C] dark:text-white/35">
                      {l.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <button
        type="button"
        aria-label={theme === "dark" ? t.themeLight : t.themeDark}
        onClick={toggleTheme}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-transparent text-[#1f1f1f] transition-colors hover:bg-white dark:text-white dark:hover:bg-[#1f1f1f]"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="block"
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="block"
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
