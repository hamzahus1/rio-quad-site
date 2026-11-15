"use client";

import Link from "next/link";
import { site } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

/** Fixed bottom book bar · phones only */
export function MobileBookBar() {
  const { t } = usePreferences();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="pointer-events-auto border-t border-black/5 bg-background/90 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl dark:border-white/10">
        <div className="mx-auto flex max-w-lg gap-2">
          <Link
            href="/book"
            prefetch
            className="inline-flex h-12 min-w-0 flex-[1.15] items-center justify-center rounded-full bg-[#FF2B00] px-4 text-[15px] font-semibold text-white active:bg-[#e52600]"
          >
            {t.bookTour}
          </Link>
          <a
            href={site.googleLocationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-gray-100 px-4 text-center text-[14px] font-semibold leading-tight text-[#1f1f1f] dark:bg-white/10 dark:text-white"
          >
            {t.locationCtaMobile}
          </a>
        </div>
      </div>
    </div>
  );
}
