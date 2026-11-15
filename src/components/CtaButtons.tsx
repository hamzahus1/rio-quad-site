"use client";

import { motion } from "framer-motion";
import { site } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

export function CtaButtons() {
  const { t } = usePreferences();

  return (
    <div className="mt-2 flex w-full flex-row flex-wrap items-center gap-2 sm:gap-3">
      <motion.a
        href="/book"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full bg-[#FF2B00] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#e52600] sm:h-[34px] sm:flex-none sm:px-4 sm:text-[14px] dark:bg-[#FF2B00] dark:text-white dark:hover:bg-[#e52600]"
      >
        {t.bookTour}
      </motion.a>
      <motion.a
        href={site.googleLocationUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-gray-50 px-5 text-[15px] font-semibold text-[#1f1f1f] transition-colors hover:bg-gray-100 sm:h-[34px] sm:flex-none sm:px-4 sm:text-[14px] dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      >
        {t.locationCta}
      </motion.a>
    </div>
  );
}
