"use client";

import { useState } from "react";
import { site } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

export function Faq() {
  const { t } = usePreferences();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-16 flex flex-col gap-2">
      <p className="text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C] dark:text-white/45">
        {t.beforeYouRide}
      </p>
      <div className="flex flex-col">
        {t.faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="border-b border-gray-100 dark:border-white/10"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="pr-4 text-[14px] font-medium tracking-[-0.32px] text-[#1f1f1f] dark:text-white">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 text-gray-400 transition-transform dark:text-white/40 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="pb-4 text-[14px] leading-[1.5] tracking-[-0.32px] text-[#8C8C8C] dark:text-white/50">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <p className="text-[14px] tracking-[-0.32px] text-[#8C8C8C] dark:text-white/45">
          {t.stillUnsure}
        </p>
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
        >
          <span className="inline-flex h-[34px] items-center justify-center rounded-full bg-gray-50 px-4 text-[14px] font-semibold text-[#1f1f1f] transition-colors hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
            {t.askWhatsApp}
          </span>
        </a>
      </div>
    </div>
  );
}
