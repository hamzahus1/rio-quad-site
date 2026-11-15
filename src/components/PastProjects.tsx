"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

const OFFERINGS = [
  {
    key: "quads" as const,
    image: "/images/work/rio-quad/shot-08.jpg",
  },
  {
    key: "buggies" as const,
    image: "/images/work/rio-quad/shot-01.jpg",
  },
  {
    key: "sunset" as const,
    image: "/images/work/rio-quad/shot-02.jpg",
  },
  {
    key: "private" as const,
    image: "/images/work/rio-quad/shot-06.jpg",
  },
] as const;

export function PastProjects() {
  const { t, tf } = usePreferences();
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const extrasUrl =
    "https://wa.me/212629516370?text=" +
    encodeURIComponent(t.extrasWhatsApp);

  return (
    <div className="mt-12 flex flex-col gap-2">
      <p className="text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C] dark:text-white/45">
        {t.whatYouGet}
      </p>
      <div className="flex flex-col">
        {OFFERINGS.map((item) => {
          const copy = t.offerings[item.key];
          const hovered = hoverKey === item.key;
          const open = expanded === item.key;

          return (
            <div
              key={item.key}
              className="border-b border-gray-100 dark:border-white/10"
            >
              <button
                type="button"
                className="group flex w-full items-center gap-3 py-3 text-start"
                onMouseEnter={() => setHoverKey(item.key)}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey(item.key)}
                onBlur={() => setHoverKey(null)}
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(hover: hover) and (pointer: fine)")
                      .matches
                  ) {
                    return;
                  }
                  setExpanded((k) => (k === item.key ? null : item.key));
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: hovered ? 56 : 0,
                    opacity: hovered ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="relative hidden h-10 shrink-0 overflow-hidden rounded-lg sm:block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={item.image}
                    alt=""
                    animate={{ scale: hovered ? 1 : 1.12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-10 w-14 max-w-none object-cover"
                    draggable={false}
                  />
                </motion.div>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[14px] font-medium tracking-[-0.32px] transition-colors duration-200 ${
                      hovered
                        ? "text-[#FF2B00]"
                        : "text-[#1f1f1f] dark:text-white"
                    }`}
                  >
                    {copy.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-[1.4] text-gray-500 dark:text-white/45 sm:mt-0">
                    {copy.detail}
                  </span>
                </span>
              </button>

              {/* Touch: expand under row */}
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="mobile-preview"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="overflow-hidden sm:hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={copy.name}
                      className="mb-3 aspect-[16/10] w-full rounded-xl object-cover"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}

        <p className="py-3 text-center text-[12px] leading-[1.45] text-gray-400 sm:text-[13px] dark:text-white/35">
          {tf(t.openDaily, { hours: site.hours })} ·{" "}
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-2 hover:text-gray-600 dark:decoration-white/20 dark:hover:text-white/70"
          >
            {tf(t.googleRating, {
              rating: site.rating,
              count: site.reviewCount,
            })}
          </a>
        </p>

        <a
          href={extrasUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex w-full items-stretch gap-3 overflow-hidden rounded-2xl bg-gray-50 p-2 pe-3 transition-colors hover:bg-gray-100 active:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 sm:gap-3.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work/rio-quad/shot-02.jpg"
            alt=""
            className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover sm:h-[96px] sm:w-[96px]"
          />
          <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-0.5 sm:gap-2 sm:py-1">
            <span className="text-[14px] font-semibold tracking-[-0.3px] text-[#111] dark:text-white">
              {t.extrasTitle}
            </span>
            <span className="text-[12px] leading-[1.4] tracking-[-0.2px] text-[#6b6b6b] sm:text-[13px] dark:text-white/55">
              {t.extrasPrompt}
            </span>
            <span className="inline-flex h-8 w-fit max-w-full items-center gap-2 truncate rounded-full bg-[#1f1f1f] px-3 text-[11px] font-semibold text-white sm:h-[32px] sm:px-3.5 sm:text-[12px] dark:bg-white dark:text-[#111]">
              <CartIcon />
              <span className="truncate">{t.extrasCta}</span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 5h2l2.2 10.2a2 2 0 002 1.6h7.6a2 2 0 001.95-1.55L20 8H7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.25" fill="currentColor" />
      <circle cx="17" cy="20" r="1.25" fill="currentColor" />
    </svg>
  );
}
